const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("Databse connected")
    }catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;