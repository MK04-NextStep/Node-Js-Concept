const express = require('express');
const {login, register} = require("../Controller/authController")
const validation = require('../Validator/authValidator');
const asyncHandler = require('../Util/asyncHandler');

const route = express.Router();

route.post('/register',validation,asyncHandler(register));
route.post('/login',validation, asyncHandler(login));

module.exports = route;