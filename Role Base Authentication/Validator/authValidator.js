const { body, query } = require('express-validator');

const emailValidation = 
    body("email").trim().
    notEmpty().withMessage("Email Required")
    .isEmail().withMessage("Need correct Email")

const passwordValidation = 
    body("password").trim().
    notEmpty().withMessage("Password Required")
    .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumber: 1,
        minSymbol: 1
    }).withMessage("Password should be strong")

const nameValidation = 
    body("name").trim().optional()
    .matches(/^[a-zA-zZ]+$/).withMessage("Name should be correct")

const validation = [
    emailValidation, passwordValidation, nameValidation
]

module.exports = {
    emailValidation,
    passwordValidation,
    nameValidation,
    validation
}