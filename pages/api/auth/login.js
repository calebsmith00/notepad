const bcrypt = require('bcrypt')
import dbConfig from '../../../utilities/mysql'
const mysql = require('mysql-await')

async function fetchUser(username) {
    const connection = mysql.createConnection(dbConfig)

    connection.on('error', (err) => console.error(`Connection error ${err.code}`))

    let sql = 'SELECT username FROM users WHERE username = ?'
    let result = await connection.awaitQuery(sql, username)

    connection.awaitEnd()

    return result[0] ? result[0].username : false
}

async function comparePassword(password, hash) {
    let passwordMatches = await bcrypt.compare(password, hash)

    return passwordMatches;
}

async function authenticate(username, password) {
    let validLogin = false;
    let userExists = await fetchUser(username)
    const connection = mysql.createConnection(dbConfig)

    connection.on('error', (err) => console.log(err))

    if (userExists) {
        let sql = 'SELECT password FROM users WHERE username = ?'
        let result = await connection.awaitQuery(sql, username)

        if (result[0])
            validLogin = await comparePassword(password, result[0].password)
    } else {
        console.log('Invalid login')
    }

    return validLogin
}

export default function handler(req, res) {
    let username = req.body.username
    let password = req.body.password

    if (req.method === "POST") {
        authenticate(username, password).then(hasAccount => {
            res.status(200).json({
                hasAccount
            })
        })
    } else {
        res.status(200).json({})
    }
}