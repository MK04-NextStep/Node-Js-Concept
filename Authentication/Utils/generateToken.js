const jstoken = require('jsonwebtoken');
const { JWT_SECRET_KEY} = require("dotenv").config();

const generateToken= (id) => {

    let token = jstoken.sign({userId: id}, JWT_SECRET_KEY, {expiresIn: "7d"})

    return token;
}

module.exports = generateToken;