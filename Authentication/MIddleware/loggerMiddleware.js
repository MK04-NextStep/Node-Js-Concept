const logger = require('../Utils/logger')

const loggerMiddleware = (req,res,next) => {
    logger.info({
        message: "Incoming Request",
        method: req.method,
        url: req.url,
        ip: req.ip
    });

    next();

};

module.exports = loggerMiddleware;