const { validationResult } = require("express-validator");
const { registerUserService, loginUserService } = require("../Service/userService");
const { NewError } = require("../MIddleware/errorMiddleware");
const user = require('../Model/userModel')
const logger = require("../Utils/logger")

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

    let {data, token} = await loginUserService(username, password);

    logger.info({
        message: "User logged in successfully",
        username: username
    })

    res.json({
        success: true,
        data: data,
        token: token
    })
}

module.exports = { getUser, registerUser, loginUser }