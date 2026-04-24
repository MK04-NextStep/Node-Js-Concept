let user = require('../Model/userModel')
const { NewError } = require('../Middleware/errorMiddleware')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const tokenGenerator = require('../Util/tokenGenerator')
const crypto = require('crypto')

let getUser = async (req, res, next) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
        throw new NewError(err.array()[0].msg, 400)
    }
    let id = req.user?.userId;
    logger.info("User profile accessed", { userId: id })
    let findUser = await user.findById(id);
    if (!findUser) {
        throw new NewError("User not found", 404)
    }
    res.json({
        success: true,
        data: findUser
    })
}

let verifyEmail = async (req, res, next) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
        throw new NewError(err.array()[0].msg, 400);
    }
    let { email } = req.body;
    logger.info("Password Reset Requested", { email })
    let existUser = await user.findOne({ email });
    if (!existUser) {
        return res.json({
            success: true,
            message: "If email exist, reset link sent"
        })
    }

    let token = crypto.randomBytes(32).toString("hex");
    let hashedToken = crypto
        //sha256 is algorithm
        .createHash("sha256")
        .update(token)
        .digest("hex");
    existUser.resetToken = hashedToken;
    existUser.resetTokenExpiry = Date.now() + 10 * 60 * 1000;
    await existUser.save();

    res.json({
        success: true,
        message: "If email exist, reset link sent",
        link: `${process.env.RESEST_PASSWORD_URL}/user/reset-password/${hashedToken}`
    })
}

let resetPassword = async (req, res, next) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
        throw new NewError(err.array()[0].msg, 400);
    }
    let { hashedToken } = req.params;
    if (!hashedToken) {
        throw new NewError("Invalid or expired token", 400)
    }

    let token = crypto
        .createHash("sha256")
        .update(hashedToken)
        .digest("hex")

    let existUser = await user.findOne({
        resetToken: token,
        resetTokenExpiry: { $gt: Date.now() }
    })
    let { password } = req.body;
    if (!existUser) {
        throw new NewError("Invalid or expired token", 404)
    }
    let hashPass = await bcrypt.hash(password, 10);
    existUser.password = hashPass;
    existUser.resetToken = undefined;
    existUser.resetTokenExpiry = undefined;
    await existUser.save();

    logger.info("Password Reset Successful", {userid: existUser._id})
    res.json({
        success: true,
        message: "Password changed successfully"
    });
};

module.exports = { getUser, resetPassword, verifyEmail }
