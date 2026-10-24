require('dotenv').config()

const express = require('express')
const authRouter = require('./routers/auth')
const adminRouter = require('./routers/admin')

const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/admin', adminRouter)
const options = {
    "definition": {
        "openapi": '3.0.0',
        "info": {
            "title": 'Hello World',
            "version": '1.0.0',
        },
        "servers": [
            {
                "url": "http://localhost:3000"
            }
        ],
        "security": [{ "BearerAuth": [] }]
    },
    "apis": ['./src/routers/*.js'],
    "components": {
        "securitySchemes": {
            "BearerAuth": {
                "type": "http",
                "scheme": "bearer",
                "bearerFormat": "JWT"
            }
        }
    } // files containing annotations as above
    
}
const openapiSpecification = swaggerJsdoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))


const PORT = process.env.PORT
app.listen(PORT, console.log(`Start Server in http://localhost:${PORT}`))