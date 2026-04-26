const jstoken = require('jsonwebtoken');
const { NewError } = require("./errorMiddleware")

const authMiddleware = async (req, res, next) => {
    try {
        let accessToken = req.headers.authorization;
        if (!accessToken || !accessToken.startsWith("Bearer ")) {
            return next(new NewError("Invalid Token", 400))
        }
        accessToken = accessToken.split(" ")[1];
        let user = await jstoken.verify(accessToken, process.env.JWT_SECRET_KEY);
        req.userId = user.id;
        next();
    } catch (err) {
        next("Invalid Token", 401)
    }
}

module.exports = authMiddleware