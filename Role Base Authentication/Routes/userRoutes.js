const express = require('express');
const {getUser, resetPassword, verifyEmail} = require('../Controller/userController')
const {emailValidation, passwordValidation} = require("../Validator/authValidator")
const authMiddleware = require('../Middleware/authMiddleware');
const asyncHandler = require('../Util/asyncHandler');


const route = express.Router();

route.get('/',authMiddleware, asyncHandler(getUser));

route.post('/forget-password',emailValidation, asyncHandler(verifyEmail));

route.put('/reset-password/:token',passwordValidation, asyncHandler(resetPassword))

module.exports = route;