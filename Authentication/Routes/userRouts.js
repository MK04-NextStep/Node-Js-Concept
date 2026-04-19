const express = require('express');
const userController = require('../Controller/userController');
const validation = require("../Validator/validator");
const asyncHandler = require('../Utils/asyncHandler');
const verifyToken = require('../MIddleware/authMiddleware')
const {loginLimit, registerLimit} = require('../MIddleware/rateLimitMiddleware')

const route = express.Router();

route.get("/", verifyToken, userController.getUser);

route.post("/login", loginLimit, validation, asyncHandler(userController.loginUser));
route.post("/register", registerLimit, validation, asyncHandler(userController.registerUser));

module.exports = route;