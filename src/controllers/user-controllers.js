const HttpError = require("../errors/HttpErros")
const usersModel = require("../models/users-model")
const validateEmail = require("../validations")


const usersControllers = {
    users: (req, res) => {
        const users = usersModel.getAllUsers()
        res.status(200).json( users )
    },

    getUser: (req, res) => {
        const { id } = req.params
        const user = usersModel.getUserById(id)
        res.status(200).json({ ...user, password: undefined })
    },

    postUser: (req, res) => {
        const { name, email, password, role } = req.body
        const verificateEmail = validateEmail(email)
        const emailUser = usersModel.getUserByEmail(email)
        if (verificateEmail instanceof HttpError) {
            return res.status(verificateEmail.status).json({ message: verificateEmail.message })
        }
        if (emailUser) return res.status(404).json({ message: "try other email" })
        if (role !== 'admin' && role !== 'standard' ) {
            return res.status(400).json({ message: 'field required: role' })
        }
        
        const newUser = usersModel.createUser(name, email, password, role)
        res.status(201).json({ ...newUser, password: undefined })
    },

    putUser: (req, res) => {
        const { id } = req.params
        const { name, email, role } = req.body
        const userId = usersModel.getUserById(id)
        const emailUser = usersModel.getUserByEmail(email)
        if (emailUser || !email === userId.email) return res.status(404).json({ message: "try other email" })
        const updatedUser = {
            name,
            email,
            role
        }
        const user = usersModel.updateUser(id, updatedUser)
        res.status(201).json(user)
    },

    deleteUser: (req, res) => {
        const { id } = req.params
        const userId = usersModel.getUserById(id)
        if (!userId) return res.status(404).json({ message: "User not found" })
        usersModel.deleteUser(id)
        res.status(204).json()
    }
}

module.exports = usersControllers