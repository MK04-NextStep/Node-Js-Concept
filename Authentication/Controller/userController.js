const { validationResult } = require("express-validator");
const { registerUserService, loginUserService } = require("../Service/userService");
const { NewError } = require("../MIddleware/errorMiddleware");
const user = require('../Model/userModel')
const logger = require("../Utils/logger")
const {generateAccessToken, generateRefreshToken} = require('../Utils/generateToken')
require('dotenv').config();
const cookieParser = require('cookie-parser')
const jstoken = require('jsonwebtoken')

let getUser = async (req, res, next) => {

    let id = req.userId;
    let data = await user.findById( id );

    if(!data){
        return next("no data found", 400);
    }

    res.json({
        success: true,
        data: data
    })
}

let registerUser = async (req, res, next) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
        return next(new NewError(err.array()[0].msg, 400))
    }

    let { username, password } = req.body;
    username = username.toLowerCase();

    let data = await registerUserService(username, password);

    logger.info({
        message: "User registered",
        username: username
    })

    res.json({
        success: true,
        data: data
    });
}

let loginUser = async (req, res, next) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
        return next(new NewError(err.array()[0].msg, 400))
    }

    let { username, password } = req.body;
    username = username.toLowerCase();

    logger.info({
        message: "User Login Attempts",
        username: username
    })

    let data = await loginUserService(username, password);
    let accessToken = generateAccessToken(data._id);
    let refreshToken = generateRefreshToken(data._id);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 7*24*60*60*1000
    })

    logger.info({
        message: "User logged in successfully",
        username: username
    })

    res.json({
        success: true,
        data: data,
        accessToken,
        refreshToken
    })
};

const checkRefreshToken = (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return next(new NewError("No refresh token provided", 401));
        }

        const decoded = jstoken.verify(refreshToken, process.env.REFRESH_SECRET_KEY);

        const newAccessToken = generateAccessToken(decoded.id);

        res.json({
            success: true,
            accessToken: newAccessToken
        });

    } catch (err) {
        return next(new NewError("Invalid token", 401));
    }
};

module.exports = { getUser, registerUser, loginUser, checkRefreshToken }