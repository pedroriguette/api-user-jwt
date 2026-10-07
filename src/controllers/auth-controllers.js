const HttpError = require("../errors/HttpErros");
const usersModel = require("../models/users-model");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const validateEmail = require("../validations");


const authControllers = {
    register: (req, res) => {
        const { name, email, password } = req.body
        const emailExist = usersModel.getUserByEmail(email)
        const validEmail = validateEmail(email)

        if (validEmail instanceof HttpError) return res.status(400).json({ message: "The email must be xxxx@xxx.xxx" })
        if (emailExist) return res.status(404).json({ message: "try other email!" })

        const newUser = usersModel.createUser(name, email, password)
        res.status(201).json({ ...newUser, password: undefined })
    },

    login: (req, res) => {
        const { email, password } = req.body
        const user = usersModel.getUserByEmail(email)
        if (!user) return res.status(404).json({ message: "Email Not Found" })
        const isValidPassword = bcrypt.compareSync(password, user.password)
        if (!isValidPassword) return res.status(400).json({ message: "Password is not valid" })

        const token = jwt.sign({ id: user.id, username: user.name }, process.env.JWT_KEY)

        res.status(201).json({ token })
    }
}

module.exports = authControllers