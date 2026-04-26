const model = require('../Model/userModel');
const { NewError } = require('../Middleware/errorMiddleware')
const crypto = require('crypto')
const bcrypt = require('bcrypt')
const logger = require('../Util/logger');
const sendEmail = require('../Util/sendEmail');
const generateToken = require('../Util/generateToken')

const registerService = async (email, password) => {
    let existUser = await model.findOne({ email: email });
    if (existUser) {
        throw new NewError("User Already exist", 409)
    }
    let hashedPass = await bcrypt.hash(password, 10);
    let newUser = await model.create({ email: email, password: hashedPass })
    return newUser;
}

const loginService = async (email, password) => {
    let existUser = await model.findOne({ email }).select("+password");
    if (!existUser) {
        throw new NewError("Invalid Credentials", 401);
    }
    if (existUser.isVerified === false) {
        logger.warn("Login Failed - email verification required", { email })
        throw new NewError("Email verification required", 400)
    }
    let isPassword = await bcrypt.compare(password, existUser.password)
    if (!isPassword) {
        throw new NewError("Invalid Credentials", 401);
    }
    let otp = crypto.randomInt(100000, 1000000).toString();
    let hashedOtp = crypto.createHash("sha256").update(otp).digest("hex")
    existUser.otp = hashedOtp;
    existUser.toObjecttpExpiry = Date.now() + 5 * 60 * 1000;
    await existUser.save();
    await sendEmail(
        existUser.email, "OTP Verification",
        `<h3> OTP for login </h3>
        <h4>${otp}</h4>`
    )
    return existUser;
}

let verifyOTPService = async (otp, tempUserId) => {
    let hashedOTP = crypto.createHash("sha256").update(otp).digest("hex")
    let existUser = await model.findOne({ _id: tempUserId }).select("+otp")
    if (!existUser || !existUser.otp) {
        throw new NewError("Invalid Credentials", 400)
    }
    if (existUser.otpBlockTime && existUser.otpBlockTime > Date.now()) {
        logger.warn("Blocked user attempted OTP verification", { userId: tempUserId })
        throw new NewError("Please try later", 400)
    }
    if (Date.now() > existUser.otpExpiry) {
        throw new NewError("Expired", 400)
    }
    if (existUser.otp !== hashedOTP) {
        existUser.otpAttempt += 1;
        await existUser.save();
        throw new NewError("Invalid OTP", 400)
    }
    if (existUser.otpAttempt >= 5) {
        existUser.otpBlockTime = Date.now() + 10 * 60 * 1000;
        await existUser.save()
        logger.error("Otp verification failed - too many attempts", { userId: tempUserId })
        throw new NewError("Try after sometime", 400)
    }
    existUser.otpBlockTime = undefined
    existUser.otpAttempt = 0;
    existUser.otp = undefined;
    existUser.otpExpiry = undefined;
    await existUser.save();
    let accessToken = generateToken(existUser._id);
    return { existUser, accessToken };
}

let EmailVerificationService = async (email) => {
    let existUser = await model.findOne({ email });
    if (!existUser) {
        throw new NewError("Invalid Credentials", 401)
    }
    if (Date.now() - existUser.lastVerificationTime < 60 * 1000) {
        logger.warn("Email Verification cooldown active", { userId: existUser._id })
        throw new NewError("Please wait for a minute before requesting again", 401)
    }
    let token = crypto.randomBytes(32).toString("hex");
    let hashedToken = crypto.createHash("sha256").update(token).digest("hex")
    existUser.lastVerificationTime = Date.now();
    existUser.verificationToken = hashedToken;
    existUser.verificationTokenExpiry = Date.now() + 10 * 60 * 1000;
    await existUser.save()
    if (existUser.isVerified === true) {
        return res.json({
            success: true,
            message: "Email already verified"
        })
    }
    const verificationLink = `${process.env.BASE_URL}/api/auth/verifyemail/${token}`;
    await sendEmail(
        existUser.email,
        "Verify Your Email",
        `<h3>Click below to verify your email:</h3>
        <a href="${verificationLink}">Verify Email</a>`
    )
    return { existUser, token }
}

let verifyUserService = async (token, ip) => {
    let hashedToken = crypto.createHash("sha256").update(token).digest("hex")
    let existUser = await model.findOne({
        verificationToken: hashedToken,
        verificationTokenExpiry: { $gt: Date.now() }
    });
    if (!existUser) {
        throw new NewError("Invalid Credentials", 401)
    }
    existUser.isVerified = true;
    existUser.verificationToken = undefined;
    existUser.verificationTokenExpiry = undefined;
    await existUser.save();
    return existUser
}

module.exports = {
    registerService, loginService, verifyOTPService,
    EmailVerificationService, verifyUserService
}