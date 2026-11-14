// const { validateEmail } = require("../validations/index.js");
// const { HttpError } = require("../errors/HttpErros.js");
// const { usersModel } = require("../models/users-model.js");
// const bcrypt = require("bcrypt");
// const jwt = require('jsonwebtoken');

import { validateEmail } from "../validations/index.js"
import { HttpError } from "../errors/HttpErros.js"
import { usersModel } from "../models/users-model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'


export const authControllers = {
    register: async (req, res) => {
        const { name, email, password } = req.body
        const emailExist = await usersModel.getUserByEmail(email || "")
        const validEmail = validateEmail(email)

        if (validEmail instanceof HttpError) return res.status(400).json({ message: "The email must be xxxx@xxx.xxx" })
        if (emailExist) return res.status(404).json({ message: "try other email!" })

        const newUser = await usersModel.createUser(name, email, password)
        res.status(201).json({ ...newUser, password: undefined })
    },

    login: async (req, res) => {
        const { email, password } = req.body
        const user = await usersModel.getUserByEmail(email)
        if (!user) return res.status(404).json({ message: "Email Not Found" })
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (!isValidPassword) return res.status(400).json({ message: "Password is not valid" })

        const token = jwt.sign({ id: user.id, username: user.name }, process.env.JWT_KEY)

        res.status(201).json({ token })
    }
}

export default authControllers