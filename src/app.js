import express from 'express'
import { pool } from './db.js'
import { PORT } from './config.js'

const app = express()

app.get('/', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM users')
    res.json(rows)
    //res.send('Welcome to Server')
})

app.get('/ping', async (req, res) => {
    const [result] = await pool.query(`SELECT "pong" as RESULT;`)
    res.json(result[0])
})

app.get('/create', async(req, res) => {
    const cant = await pool.query('SELECT COUNT (*) FROM users')
    const result = await pool.query('INSERT INTO users(name) VALUE ("Ariel")')
    res.send(cant[0])
    //res.redirect('/')
})

app.listen(PORT)
console.log('server on port', PORT)