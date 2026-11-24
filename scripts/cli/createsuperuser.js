import 'dotenv/config'; 
import inquirer from 'inquirer';
import { sql } from '../../src/config/db/db.js';
import bcrypt from "bcrypt";

async function createSuperUser(name, email, password, role = 'admin') {
    await sql`INSERT INTO users (name, email, password, role, createdat, updatedat) 
        VALUES (${name}, ${email}, ${password}, ${role}, ${new Date()}, ${new Date()})`
}

inquirer.prompt([
    {
        "type": "input",
        "name": "name",
        "message": "write your name"
    },
    {
        "type": "input",
        "name": "email",
        "message": "write your email"
    },
    {
        "type": "password",
        "name": "password",
        "message": "create a password"
    }
]).then(async (res) => {
    const passwordHash = bcrypt.hashSync(res.password, 10)
    try {
        await createSuperUser(
        res.name,
        res.email,
        passwordHash
        )
        console.log(`Superuser criado: ${ res.name }`)
    } catch (err) {
        console.log(`Error: ${err.message}`)
        process.exitCode = 1
    } finally {
        await sql.end()
    }
})
