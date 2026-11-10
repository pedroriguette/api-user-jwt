const sql = require("./db")


const createUsersTable = async () => {
    return await sql`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
        updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
    )`
}

const selectAllUsers = async () => {
    const users = await sql`SELECT * FROM users`
    return users
}

const insertUser = async (name, email, password, role, createdAt, updatedAt) => {
    const newUser = await sql`INSERT INTO users 
        (name, email, password, role, createdAt, updatedAt) 
        VALUES (${name}, ${email}, ${password}, ${role}, ${createdAt}, ${updatedAt}) RETURNING *`
    return newUser[0]
}

const selectUserByEmail = async (email) => {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`
    return user[0]
}

const selectUserById = async (id) => {
    const user = await sql`SELECT * FROM users WHERE id = ${id}`
    return user[0]
}


module.exports = { createUsersTable, selectAllUsers, insertUser, selectUserByEmail, selectUserById }