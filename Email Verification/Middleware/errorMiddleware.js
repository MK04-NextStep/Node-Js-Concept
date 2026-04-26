const logger = require('../Util/logger')

class NewError extends Error{
    constructor (message, status){
        super(message);
        this.statusCode = status;

        Error.captureStackTrace(this, this.constuctor)
    }
}

let errorMiddleware = (err, req, res, next) => {
    let status = err.statusCode || 500;
    let message = err.message || "Internal Server Error";
    logger.error({
        message,
        stack: err.stack,
        route: req.url,
        method: req.method
    })
    return res.status(status).json({
        success: false,
        message
    })
}

module.exports = { NewError, errorMiddleware }