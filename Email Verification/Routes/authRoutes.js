const express = require('express')
const {register, login, EmailVerification, verifyUser, verifyOTP} = require('../Controller/authController')
const { authValidation, emailValidation} = require('../Validation/authValidation')
const asyncHandler = require('../Util/asyncHandler')

const route = express.Router();

route.post('/register',authValidation, asyncHandler(register))
route.post('/login',authValidation, asyncHandler(login))
route.post('/verifyemail',emailValidation, asyncHandler(EmailVerification))
route.post('/verifyemail/:token',asyncHandler(verifyUser))
route.post('/verifyOtp', asyncHandler(verifyOTP))

module.exports = route;