const bcryptjs = require("bcryptjs");

const logger = require("../Utils/logger")
const user = require("../Model/userModel");
const removedPassword = require("../Utils/removePassword")
const { NewError } = require("../MIddleware/errorMiddleware");
const {generateAccessToken, generateRefreshToken} = require('../Utils/generateToken');

const registerUserService = async (username, password) => {
    let existUser = await user.findOne({ username: username });
    if (existUser) {
        throw new NewError("user already existed", 409)
    }

    let hashPass = await bcryptjs.hash(password, 10);
    let newUser = await user.create({ username, password: hashPass });
    let data = removedPassword(newUser);

    return data;
}

const loginUserService = async (username, password) => {
    let existUser = await user.findOne({ username: username });
    if (!existUser) {
        logger.warn({
            message: "Login failed - user not found",
            username
        })
        throw new NewError("no user found", 404);
    }

    let isCorrectPassword = await bcryptjs.compare(password, existUser.password);
    if (!isCorrectPassword) {
        logger.warn({
            message: "Login failed - wrong password",
            username: username
        })
        throw new NewError(" wrong password ", 401);
    }

    let data = removedPassword(existUser);
    return data;
}

module.exports = { registerUserService, loginUserService }