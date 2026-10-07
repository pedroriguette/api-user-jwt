const uuid = require('uuid').v4
const bcrypt = require('bcrypt')


let users = [
    { id: '1', name: "riguette", email: 'riguette12@gmail.com', password: '$2b$10$1k5uRJtqbXGY3b3XYAZvd.CBudHJ9aSCtCWmf6VRIWoCI0zIreFtG', role: 'admin' }
]

const usersModel = {
    getAllUsers: () => {
        return users.map(user => ({ ...user, password: undefined }))
    },

    getUserById: (id) => {
        const user = users.find(user => user.id === id)
        return user ? { ...user, password: undefined } : null
    } ,

    getUserByEmail: (email) => users.find(user => user.email === email),

    createUser: (name, email, password, role = 'standard') => {
        const newUser = {
            id: uuid(),
            name,
            email,
            password: bcrypt.hashSync(password, 10),
            role,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        users.push(newUser)
        return newUser
    },

    updateUser: (id, updatedUser) => {
        const userIndex = users.findIndex(user => user.id === id)
        users[userIndex] = { ...users[userIndex], ...updatedUser, updatedAt: new Date(), password: undefined }
        return users[userIndex]
    },

    deleteUser: (id) => {
        const userIndex = users.findIndex(user => user.id === id)
        if (userIndex !== -1) {
            users.splice(userIndex, 1)
        }
    }
}

module.exports = usersModel