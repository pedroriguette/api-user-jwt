import postgres from 'postgres'

const sql = postgres('postgres://username:password@host:port/database', {
    host: process.env.DB_HOST,            // Postgres ip address[s] or domain name[s]
    port: process.env.DB_PORT,          // Postgres server port[s]
    database: process.env.DB_NAME,            // Name of database to connect to
    username: process.env.DB_USER,            // Username of database user
    password: process.env.DB_PASSWORD,            // Password of database user
})// will use psql environment variables



async function createUsersTable() {
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

createUsersTable()

export { sql }

