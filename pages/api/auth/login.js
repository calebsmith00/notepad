require('dotenv').config()
import dbConfig from '../../../utilities/mysql'
const bcrypt = require('bcrypt')
const mysql = require('mysql-await')
const jwt = require('jsonwebtoken')

async function authenticate(username, password) {
    let token = "";
    const connection = mysql.createConnection(dbConfig)

    connection.on('error', (err) => console.log(err))

    let sql = 'SELECT username, password FROM users WHERE username = ?'
    let result = await connection.awaitQuery(sql, username)
    if (result[0] && result[0].password) {
            let validLogin = await bcrypt.compare(password, result[0].password)

            if (validLogin) {
                token = await jwt.sign(username, process.env.JSON_SECRET)
            }
    } else {
        console.log('Invalid login')
    }

    return token
}

export default function handler(req, res) {
    let username = req.body.username
    let password = req.body.password

    
    if (req.method === "POST") {
        authenticate(username, password).then(token => {
            res.status(200).json({ token })
        })
    } else {
        res.status(200).json({})
    }
}