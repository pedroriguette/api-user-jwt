import { usersModel } from "../models/users-model.js"
import { HttpError } from "../errors/HttpErros.js"
import { validateEmail } from "../validations/index.js"

// const { usersModel } = require("../models/users-model.js")
// const { HttpError } = require("../errors/HttpErros.js")
// const { validateEmail } = require("../validations/index.js")


export const usersControllers = {
    users: async (req, res) => {
        const users = (await usersModel.getAllUsers()).map(
            user => ({ ...user, password: undefined }))
 
        res.status(200).json( users )
    },

    getUser: async (req, res) => {
        const { id } = req.params
        const user = await usersModel.getUserById(id)
        if (!user) return res.status(404).json({ message: "User not found" })
        res.status(200).json({ ...user, password: undefined })
    },

    postUser: async (req, res) => {
        const { name, email, password, role } = req.body
        const verificateEmail = validateEmail(email)
        const emailUser = await usersModel.getUserByEmail(email)
        if (verificateEmail instanceof HttpError) {
            return res.status(verificateEmail.status).json({ message: verificateEmail.message })
        }
        if (emailUser) return res.status(404).json({ message: "try other email" })
        if (role !== 'admin' && role !== 'standard' ) {
            return res.status(400).json({ message: 'field required: role' })
        }
        
        const newUser = await usersModel.createUser(name, email, password, role)
        res.status(201).json({ ...newUser, password: undefined })
    },

    putUser: async(req, res) => {
        const { id } = req.params
        const { name, email, role } = req.body
        const user = await usersModel.getUserById(id)
        const emailExist = await usersModel.getUserByEmail(email || '')
        if (!user) return res.status(404).json({ message: "User not found" })
        if (!name && !email && !role) return res.status(400).json({ message: 'Choice one or more fields to update' })
        if (emailExist && email !== user.email) return res.status(409).json({ message: "try other email" })
        const newUser = {
            name: name ? name : user.name,
            email: email ? email : user.email,
            role: role ? role : user.role,
            createdAt: user.createdat,
            updatedAt: new Date()
        }
        await usersModel.updateUser(id, { ...user, ...newUser })
        res.status(200).json(newUser)
    },

    deleteUser: async (req, res) => {
        const { id } = req.params
        const userId = await usersModel.getUserById(id)
        if (!userId) return res.status(404).json({ message: "User not found" })
        await usersModel.deleteUser(id)
        res.status(204).json()
    }
}

export default usersControllers