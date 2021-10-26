import dbConfig from '../../../utilities/mysql'
const mysql = require('mysql-await')
const moment = require('moment')
import { UserExists, HashPassword } from '../../../utilities/authentication'

async function register(username, email, password) {
    let connection = mysql.createConnection(dbConfig)

    connection.on('error', (err) => {
        console.error(`Connection error ${err.code}`)
    })

    // Formats the date for SQL
    let currentDate = moment().format('YYYY-MM-DD HH:mm:ss')
    let values = [username, email, password, currentDate, username, currentDate, username]
    let sql = `INSERT INTO users (username, email, password, created_at, created_by, updated_at, updated_by)
                VALUES (?, ?, ?, ?, ?, ?, ?)
                `
    let doesUserExist = await UserExists(username, email)
    if (!doesUserExist) { 
        let results = connection.awaitQuery(sql, [...values])
        if (results)
            return { error: false, success: true }
    } else {
        return { error: true, errorMsg: 'You already have an account' }
    }

    connection.awaitEnd()
}

export default function handler(req, res) {
    let {username, email, password} = req.body
    if (req.method === "POST") {
        if (req.body) {
            HashPassword(password).then(data => {
                register(username, email, data).then(results => {
                    console.log(results)
                    if (!results.error) {
                        console.log(results)
                        res.status(200).json(results)
                    } else {
                        res.status(200).json(results)
                    }
                })
            })
        }
    } else {
        res.status(200).json({ error: null })
    }
}