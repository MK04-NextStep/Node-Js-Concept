const jstoken = require('jsonwebtoken');
const NewError = require("../MIddleware/errorMiddleware")
const { JWT_SECRET_KEY } = require('dotenv').config();

const verifyToken = (req, res, next) => {
    try {
        let { token } = req.header.authorization;

        if (!header) {
            return next(new NewError("no header provided", 400));
        }

        token = token.split(" ")[1];

        if(!token){
            return next(new NewError("no token provided", 401))
        }

        let userId = jstoken.verify(token, JWT_SECRET_KEY);
        req.userId = userId;
        next();

    }catch(err){
         return next(new NewError("Invalid token", 401));
    }

}

module.exports = verifyToken;