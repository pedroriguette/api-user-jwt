import { sql } from '../config/db/db.js'

import bcrypt from "bcrypt";

export const usersModel = {
    getAllUsers: async () => {
        const users = await sql`SELECT * FROM users`
        return users
    },

    getUserById: async (id) => {
        const user = await sql`SELECT * FROM users WHERE id = ${id}`
        return user[0]
    },

    getUserByEmail: async (email) => {
        const user = await sql`SELECT * FROM users WHERE email = ${email}`
        return user[0]
    },

    createUser: async (name, email, password, role = 'standard') => {
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await sql`INSERT INTO users 
        (name, email, password, role, createdAt, updatedAt) 
        VALUES (${name}, ${email}, ${passwordHash}, ${role}, ${new Date()}, ${new Date()}) RETURNING *`
        return newUser[0]
    },

    updateUser: async (id, updatedUser) => {
        const newUser = await sql`UPDATE users SET ${sql(updatedUser, 'name', 'email', 'role', 'updatedat')} 
            WHERE id = ${id}`
        return newUser[0]
    },

    deleteUser: async (id) => {
        await sql`DELETE FROM users WHERE id = ${id}`
    }
}