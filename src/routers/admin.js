const express = require('express')
const usersControllers = require('../controllers/user-controllers')
const { authMiddleware, ensureAdmin } = require('../middlewares/auth-middlewares')

const adminRouter = express.Router()

adminRouter.get('/users', authMiddleware, ensureAdmin, usersControllers.users)
adminRouter.get('/users/:id', authMiddleware, ensureAdmin, usersControllers.getUser)

adminRouter.post('/users', authMiddleware, ensureAdmin, usersControllers.postUser)
adminRouter.put('/users/:id', authMiddleware, ensureAdmin, usersControllers.putUser)

adminRouter.delete('/users/:id', authMiddleware, ensureAdmin, usersControllers.deleteUser)


module.exports = adminRouter