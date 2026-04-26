const { NewError } = require('../Middleware/errorMiddleware')
const services = require('../Service/userService');
const validateRequest = require('../Util/validationResult')
const logger = require('../Util/logger')

const register = async (req, res, next) => {
    validateRequest(req);
    let { email, password } = req.body;
    let newUser = await services.registerService(email, password);
    logger.info("Registeration Successful", { userId: newUser._id })
    res.json({
        success: true,
        data: {
            _id: newUser._id,
            email: newUser.email,
        }
    })
}

const login = async (req, res, next) => {
    validateRequest(req);
    let { email, password } = req.body;
    let existUser = await services.loginService(email, password)
    logger.info("OTP generated", { userId: existUser._id })
    res.json({
        success: true,
        message: "OTP has been sent",
        tempUserId: existUser._id
    })
}

let verifyOTP = async (req, res, next) => {
    let { tempUserId, otp } = req.body;
    if (!otp || !tempUserId) {
        logger.warn("Invalid OTP", { userId: tempUserId })
        return next(new NewError("Invalid OTP", 400))
    }
    let { existUser, accessToken } = await services.verifyOTPService(otp, tempUserId)
    logger.info("Login Successfully", { userId: existUser._id })
    res.json({
        success: true,
        data: {
            _id: existUser._id,
            email: existUser.email,
            accessToken
        }
    })
}

let EmailVerification = async (req, res, next) => {
    validateRequest(req)
    let { email } = req.body;
    let { existUser, token } = await services.EmailVerificationService(email);
    logger.info("Verification link sent successfully", { email: email })
    if (existUser && token) {
        return res.json({
            success: true,
            message: "verification link is send to email"
        })
    }
}

let verifyUser = async (req, res, next) => {
    let { token } = req.params;
    if (!token) {
        return next(new NewError("Invalid Token", 401));
    }
    let existUser = await services.verifyUserService(token, req.ip)
    logger.info("Email verified Successfully", { userId: existUser._id })
    res.json({
        success: true,
        message: "Email verified successfully"
    })
}

module.exports = { register, login, EmailVerification, verifyUser, verifyOTP }