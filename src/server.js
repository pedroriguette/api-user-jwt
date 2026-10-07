require('dotenv').config()

const express = require('express')
const authRouter = require('./routers/auth')
const adminRouter = require('./routers/admin')

const app = express()

app.use(express.json())

app.use('/auth', authRouter)
app.use('/admin', adminRouter)

const PORT = process.env.PORT
app.listen(PORT, console.log(`Start Server in http://localhost:${PORT}`))