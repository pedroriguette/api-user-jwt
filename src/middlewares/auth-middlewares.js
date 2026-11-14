// const jwt = require('jsonwebtoken')
// const usersModel = require('../models/users-model.js')

import jwt from 'jsonwebtoken'
import { usersModel } from '../models/users-model.js'

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header required' })
    }

    const token = authHeader.split(' ')[1]
    try {
        const verifyToken = jwt.verify(token, process.env.JWT_KEY)
        const user = await usersModel.getUserById(verifyToken.id)
        if (!user) return res.status(404).json({ message: "Invalid User" })
        req.authenticatedUser = user
        next()
    } catch {
        return res.status(401).json({ message: 'Invalid Token' })
    }
}

export const ensureAdmin = (req, res, next) => {
    if (req.authenticatedUser.role === 'admin') {
        return next()
    } 
    res.status(401).json({ message: 'Not authorization' })
}

export default { authMiddleware, ensureAdmin }