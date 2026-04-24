const jstoken = require('jsonwebtoken')
require('dotenv').config();

let tokenGenerator = (id, role) => {
    let accessToken = jstoken.sign({id, role}, process.env.JWT_SECRET_KEY, {expiresIn: "7d"})
    return accessToken;
}

module.exports = tokenGenerator;