const { body } = require("express-validator");

let validation = [
    body("username").trim().escape()
    .notEmpty().withMessage("Username Required")
    .isLength({min: 3, max: 20})
    .withMessage(" Username must be 3-20 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, underscore")
    ,

    body("password").trim()
    .notEmpty().withMessage("Password Required")
    .isLength({ min: 8, max: 25})
    .withMessage("Password must be 8 to 25 characters.")
    .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }).withMessage("Password must includes uppercase, lowercase, number and symbol")
]

module.exports = validation