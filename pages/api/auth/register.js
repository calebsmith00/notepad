export default function handler(req, res) {
    if (req.method === "POST") {
        console.log(req.body)
        res.status(200).json({ error: null, post: 'success' })
    } else {
        res.status(200).json({ error: null })
    }
}