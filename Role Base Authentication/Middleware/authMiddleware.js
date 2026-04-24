const jstoken = require('jsonwebtoken');
const { NewError } = require('./errorMiddleware');
const logger = require('../Util/logger');

let authMiddleware = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if(!token){
            logger.warn("No token Provided", {ip: req.ip})
            return next(new NewError("unauthorized Access", 401))
        }
        if (!token.startsWith("Bearer ")) {
            logger.warn("Invalid Token", {ip: req.ip})
            return next(new NewError("Unauthorized Access", 401))
        }
        token = token.split(" ")[1];
        let tokenData = jstoken.verify(token, process.env.JWT_SECRET_KEY);

        req.user = {
            userId: tokenData.id,
            role: tokenData.role
        }
        next();
    } catch (err) {
        next(new NewError("Invalid or expired token", 401))
    }
}

module.exports = authMiddleware;