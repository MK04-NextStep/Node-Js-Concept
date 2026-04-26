const mongoose = require('mongoose')

let connectDB = () => {
    return mongoose.connect(process.env.DB_URL)
}

module.exports = connectDB;