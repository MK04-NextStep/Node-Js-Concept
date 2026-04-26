const logger = require('../Util/logger');

const loggerMiddleware = (req, res, next) => {
    logger.info("Incoming Request", {
        route: req.url,
        ip: req.ip,
        method: req.method
    });
    next();
}

module.exports = loggerMiddleware;