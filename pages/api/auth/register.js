const bcrypt = require('bcrypt')
const saltRounds = 10

async function hashPassword(password) {
    if (password && password.length >= 8) {
        let hash = await bcrypt.hash(password, saltRounds)

        if (hash) return hash
    } 
}

export default function handler(req, res) {
    if (req.method === "POST") {
        if (req.body) {
            hashPassword(req.body.password).then(data => console.log(data))
        }
        res.status(200).json({ error: null, post: 'success' })
    } else {
        res.status(200).json({ error: null })
    }
}