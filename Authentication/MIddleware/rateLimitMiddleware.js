const rateLimit = require('express-rate-limit')

const loginLimit = rateLimit({
    windowMs: 1*60*1000, //1 min
    max: 5,
    message: {
        sucess: false,
        message: "Too many login attempts. try after one minute"
    },
    standardHeaders: true,
    legacyHeaders: false
});

const registerLimit = rateLimit({
    windowMs: 10*60*1000,
    max: 100,
    message: {
        success: false,
        message: "Too many accounts created. Try again later"
    }
})

const apiLimit = rateLimit({
    windowMs: 15*60*1000,
    max: 100,
    message: {
        success: false,
        message: "Too many requests. Please try again later"
    }
})

module.exports = {
    loginLimit,
    registerLimit,
    apiLimit
}