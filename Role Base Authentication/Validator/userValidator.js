const {param} = require('express-validator');
const mongoose = require('mongoose');
const { NewError } = require('../Middleware/errorMiddleware');

let isValidator = [
    param("id").notEmpty()
    .withMessage("Id is required")
    .custom((value) => {
        if(!mongoose.Types.ObjectId.isValid(value)){
            throw new Error("Invalid Id format")
        }
        return true
    })
]

module.exports = isValidator;