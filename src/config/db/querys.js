import { sql } from "./db.js"


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

const updateUserSet = async (id, user) => {
    const newUser = await sql`UPDATE users SET ${sql(user, 'name', 'email', 'role', 'updatedat')} 
    WHERE id = ${id}`
    return newUser[0]
}

const deleteUserById = async (id) => {
    await sql`DELETE FROM users WHERE id = ${id}`
}

export {
    selectAllUsers,
    insertUser,
    selectUserByEmail,
    selectUserById,
    updateUserSet,
    deleteUserById
}