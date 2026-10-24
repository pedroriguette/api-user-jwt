const express = require('express')
const authControllers = require('../controllers/auth-controllers')

const authRouter = express.Router()

/**
 * @swagger
 * /auth/register:
 *     post:
 *      summary: Register a new user
 *      tags:
 *        - Authentication
 *      requestBody:
 *         required: true
 *         content:
 *          application/json:   
 *               schema:
 *                 type: object
 *                 properties:
 *                     name:
 *                        type: string
 *                     email:
 *                        type: string
 *                     password:
 *                        type: string
 *               example:
 *                   name: John Doe
 *                   email: johndoe@gmail.com
 *                   password: securepassword
 *      responses:
 *          201:
 *            description: created
 */
authRouter.post('/register', authControllers.register)
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *            example:
 *              email: johndoe@gmail.com
 *              password: securepassword
 *     responses:
 *       200:
 *         description: success
 */
authRouter.post('/login', authControllers.login)

module.exports = authRouter