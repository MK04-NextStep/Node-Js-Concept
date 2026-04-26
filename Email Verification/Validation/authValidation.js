const {body} = require('express-validator');

let emailValidation = 
    body("email").trim()
    .notEmpty().withMessage("Email should not be empty")
    .isEmail().withMessage("Invalid email")

let passwordValidation =
   body("password").trim()
   .notEmpty().withMessage("Password is required")
   .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
   }).withMessage(" Password must have uppercase, lowercase, number and symbol")

let authValidation = [ emailValidation, passwordValidation]

module.exports = {authValidation, emailValidation, passwordValidation}