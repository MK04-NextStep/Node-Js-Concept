const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        min: 8,
        max: 25
    },
    refreshToken: {
        type: String
    }
})

const user = mongoose.model(
    "user",
    userSchema
)

module.exports = user;