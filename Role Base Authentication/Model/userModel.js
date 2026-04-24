const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 1
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 25,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        lowercase: true
    },
    resetToken: {
        type: String,
        select: false
    },
    resetTokenExpiry : {
        type: Date,
        select: false
    }
})

const user = mongoose.model(
    "user",
    userSchema
)

module.exports = user;