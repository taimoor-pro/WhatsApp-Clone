import express from "express";
const app = express()


app.get('/api', (req, res) => {
    res.send('hello from simple server :)')
})

export default app