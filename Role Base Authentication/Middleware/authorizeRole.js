const jstoken = require('jsonwebtoken')
const { NewError } = require('./errorMiddleware')

let authorizeRole = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user?.role)){
            return next(new NewError("Unauthorized Access", 403))
        }
        next();
    }
}

module.exports = authorizeRole;