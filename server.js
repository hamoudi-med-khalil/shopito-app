const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const colors = require('colors')
const { errorHandler } = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 5000
const connectDB = require('./db')

connectDB()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(
    cors({
        origin: ['http://localhost:3000'],
        credentials: true,
    }))








// Routes

app.use('/api/users', require('./routes/userRoute'))
app.use('/api/products', require('./routes/productRoute'))


app.get('/', (req, res) => {
    res.send('Home page....')
})

app.use(errorHandler)


app.listen(PORT, () => console.log(`server start on port ${PORT}`.blue))
