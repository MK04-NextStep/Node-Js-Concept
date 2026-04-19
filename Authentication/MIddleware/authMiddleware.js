const jstoken = require('jsonwebtoken');
const {NewError} = require("../MIddleware/errorMiddleware");
const { generateAccessToken } = require('../Utils/generateToken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    try {
        let accessToken = req.headers.authorization;

        accessToken = accessToken.split(" ")[1];

        if (!accessToken) {
            return next(new NewError("no token provided", 401))
        }

        let userId = jstoken.verify(accessToken, process.env.JWT_SECRET_KEY);
        req.userId = userId.userId;
        
        next();

    } catch (err) {
        return next(new NewError("Invalid token", 401));
    }

}

module.exports = {verifyToken};