const express = require('express');
const dotenv = require ('dotenv').config();
const mongoose = require('mongoose')
const cors = require ('cors')
const cookieParser = require('cookie-parser')
const colors = require ('colors')
const connectDB = require('./db')

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(
    cors({
    origin :['http://localhost:3000'],
    credentials: true,
}))

const PORT = process.env.PORT || 5000

app.listen (PORT, () => console.log(`server start on port ${PORT}`.blue))



connectDB()

// Routes

app.get('/', (req, res) => {
    res.send('Home page....')
})