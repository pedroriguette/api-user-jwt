const jwt = require('jsonwebtoken')
const usersModel = require('../models/users-model')


const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header required' })
    }

    const token = authHeader.split(' ')[1]
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_KEY)
        const user = usersModel.getUserById(verifyToken.id)
        if (!user) return res.status(404).json({ message: "Invalid User" })
        req.authenticatedUser = user
        next()
    } catch {
        return res.status(401).json({ message: 'Invalid Token' })
    }
}

const ensureAdmin = (req, res, next) => {
    if (req.authenticatedUser.role === 'admin') {
        next()
    }
    res.status(401).json({ message: 'Not authorization' })
}

module.exports = { authMiddleware, ensureAdmin }