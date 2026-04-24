const express = require('express');
const operations = require("../Controller/adminContoller")
const authMiddleware = require('../Middleware/authMiddleware')
const authorizeRole = require('../Middleware/authorizeRole')
const isValidator = require("../Validator/userValidator")
const asyncHandler = require("../Util/asyncHandler")

const route = express.Router();

route.get("/profile",authMiddleware, authorizeRole("admin"), asyncHandler(operations.getAdmin));
route.get("/all-users",authMiddleware, authorizeRole("admin"), asyncHandler(operations.getAllUsers))

route.put("/users/:id",authMiddleware,authorizeRole("admin"), isValidator, asyncHandler(operations.updateUser));
route.delete("/users/:id",authMiddleware, authorizeRole("admin"), isValidator, asyncHandler(operations.deleteUser));

module.exports = route;