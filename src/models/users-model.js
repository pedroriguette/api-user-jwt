import {
    insertUser,
    selectAllUsers,
    selectUserByEmail,
    selectUserById,
    updateUserSet,
    deleteUserById } from '../config/db/querys.js'

import bcrypt from "bcrypt";

export const usersModel = {
    getAllUsers: async () => {
        return await selectAllUsers()
    },

    getUserById: async (id) => {
        const user = await selectUserById(id)
        return user || null
    },

    getUserByEmail: async (email) => {
        const user = await selectUserByEmail(email)
        return user || null
    },

    createUser: async (name, email, password, role = 'standard') => {
        const passwordHash = await bcrypt.hash(password, 10)
        const newUser = await insertUser(
            name,
            email,
            passwordHash,
            role,
            new Date(),
            new Date()
        )
        return newUser
    },

    updateUser: async (id, updatedUser) => {
        const user = await selectUserById(id)
        if (!user) return null
        const newUser = await updateUserSet(id, { ...user, ...updatedUser })
        return newUser
    },

    deleteUser: async (id) => {
        await deleteUserById(id)
    }
}