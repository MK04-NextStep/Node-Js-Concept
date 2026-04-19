const jstoken = require('jsonwebtoken');
require("dotenv").config();

const generateAccessToken= (id) => {

    let acess_token = jstoken.sign({userId: id},process.env.JWT_SECRET_KEY, {expiresIn: "7d"})

    return acess_token;
}

const generateRefreshToken = (id) => {

    let refresh_token = jstoken.sign({ userId: id}, process.env.REFRESH_SECRET_KEY, {
        expiresIn: "7d"
    })

    return refresh_token
}
module.exports = { generateAccessToken, generateRefreshToken };