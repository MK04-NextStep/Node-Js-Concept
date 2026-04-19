const logger = require("../Utils/logger")

class NewError extends Error{
    constructor(message, status){
        super(message);
        statusCode: this.status
        Error.captureStackTrace(this, this.constructor);
    }
}

function checkError(err, req, res, next) {

    logger.error({
        message: err.message,
        stack: err.stack,
        route: req.url,
        method: req.method
    })

    return res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "internal server error"
    })
}

module.exports = { NewError, checkError}