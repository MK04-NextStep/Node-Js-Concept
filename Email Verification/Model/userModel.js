const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        maxlength: 25,
        minlength: 8,
        select: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
        select: false
    },
    verificationTokenExpiry: {
        type: Date,
        default: null
    },
    lastVerificationTime:{
        type: Date,
        default: null
    },
    otp: {
        type: String,
        select: false
    },
    otpExpiry: {
        type: Date,
        default: null
    },
    otpAttempt: {
        type: Number,
        default: 0
    },
    otpBlockTime: {
        type: Date,
        default: null
    },
    lastLoginAt: Date
    
}, {
    timestamps: true
})

let model = mongoose.model(
    "user",
    userSchema
)

module.exports = model;