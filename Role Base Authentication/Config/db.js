const user = require('../Model/userModel');
const mongoose = require('mongoose');
require('dotenv').config();

let connectDB = () => {
    mongoose.connect(process.env.DB_URL)
    .then((res) => console.log("Database Connected"))
    .catch((err) => console.log("Database Not Connected", err))
}

module.exports = connectDB;
