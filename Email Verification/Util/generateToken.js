const jstoken = require('jsonwebtoken');

const tokenGenerator = ( id) => {
    let accessToken = jstoken.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: "1d"})
    return accessToken;
}

module.exports = tokenGenerator;