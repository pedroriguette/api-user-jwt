import { authMiddleware, ensureAdmin } from '../middlewares/auth-middlewares.js'
import { usersControllers } from '../controllers/user-controllers.js'
import express from 'express'

const adminRouter = express.Router()
/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *       description: A list of users
 */
adminRouter.get('/users', authMiddleware, ensureAdmin, usersControllers.users)

/**
 * @swagger
 * /admin/users/{id}:
 *   get:
 *     summary: Get a user by ID (Admin only)
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *       description: A user object
 */
adminRouter.get('/users/:id', authMiddleware, ensureAdmin, usersControllers.getUser)

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: Create a new user (Admin only)
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     responses:
 *      201:
 *       description: User created successfully
 */
adminRouter.post('/users', authMiddleware, ensureAdmin, usersControllers.postUser)

/**
 * @swagger
 * /admin/users/{id}:
 *      put:
 *          summary: Update a user by ID (Admin only)
 *          tags:
 *              - Admin 
 *          produces:
 *             - application/json
 *          responses:
 *            200:
 *              description: User updated successfully
 */
adminRouter.put('/users/:id', authMiddleware, ensureAdmin, usersControllers.putUser)

/**
 * @swagger
 * /admin/users/{id}:
 *   delete:
 *     summary: Delete a user by ID (Admin only)
 *     tags:
 *       - Admin
 *     produces:
 *       - application/json
 *     responses:
 *      200:
 *       description: User deleted successfully
 */
adminRouter.delete('/users/:id', authMiddleware, ensureAdmin, usersControllers.deleteUser)


export default adminRouter