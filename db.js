const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
    
    try {
          const conn = await mongoose.connect(process.env.MONGO_URI)
          console.log(`MongoDB connected ${conn.connection.host}`.cyan)
    } catch (error) {
        console.log(error)
        process.exist(1)
    }
}
module.exports = connectDB