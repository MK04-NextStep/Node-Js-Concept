const user = require('../Model/userModel');
const mongoose = require('mongoose');
require('dotenv').config();

let connectDB = () => {
    return mongoose.connect(process.env.DB_URL)
}

module.exports = connectDB;
