import dbConfig from './mysql'
const mysql = require('mysql-await')
const bcrypt = require('bcrypt')
require('dotenv').config()

const saltRounds = 10

async function UserExists(username, email) {
    let connection = mysql.createConnection(dbConfig)
    connection.on('error', err => console.error(err))

    let usernameSQL = 'SELECT username FROM users WHERE username = ?'
    let usernameResult = await connection.awaitQuery(usernameSQL, username)
    let emailSQL = 'SELECT email FROM users WHERE email = ?'
    let emailResult = await connection.awaitQuery(emailSQL, email)

    if (usernameResult[0] || emailResult[0]) {
        return true
    }

    connection.awaitEnd()
    return false
}

async function HashPassword(password) {
    if (password && password.length >= 8) {
        let hash = await bcrypt.hash(password, saltRounds)

        if (hash) return hash
    } 
}

export { UserExists, HashPassword }