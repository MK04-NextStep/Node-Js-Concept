const user = require('../Model/userModel')
const { NewError } = require("../Middleware/errorMiddleware")
const { validationResult } = require('express-validator');
const logger = require('../Util/logger');

let getAdmin = async (req, res, next) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
        throw new NewError(err.array()[0].msg, 400);
    }

    let id = req.user?.userId;
    let existUser = await user.findById(id).select("-password")
    if (!existUser) {
        throw new NewError("No user found", 404)
    }
    res.json({
        success: true,
        data: existUser
    })
}

let getAllUsers = async (req, res, next) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
        throw new NewError(err.array()[0].msg, 400);
    }

    let data = await user.find().select("-password")

    logger.info("Admin fetched all users", {adminId: req.user?.userId})
    res.json({
        success: true,
        data: data
    })
}

let updateUser = async (req, res, next) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
        throw new NewError(err.array()[0].msg, 400)
    }

    let id = req.params.id;
    let data = req.body;
    let existUser = await user.findById(id);
    if (!existUser) {
        throw new NewError("No user found", 404)
    }

    let allowedFields = ["name", "email"];
    let filteredData = {};
    for (let key of allowedFields) {
        if (data[key] !== undefined) {
            filteredData[key] = data[key]
        }
    }

    let updatedUser = await user.findByIdAndUpdate(id,
        { $set: filteredData }, {new: true})

    logger.info("Admin updated user",{
        adminId: req.user?.userId,
        targetId: id
    })
    res.json({
        success: true,
        message: updatedUser
    })
}

let deleteUser = async (req, res, next) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
        throw new NewError(err.array()[0].msg, 400)
    }

    let id = req.params.id;
    if(id === req.user?.userId){
        throw new NewError("Admin cannot delete themselves", 400)
    }

    let existUser = await user.findById(id);
    if (!existUser) {
        throw new NewError("No User found", 404)
    }

    await user.findByIdAndDelete(id);

    logger.warn("Admin deleted User", {
        adminId: req.user?.user,
        targetId: id
    })
    res.json({
        success: true,
        message: "User delete Successfully"
    })
}

module.exports = { getAdmin, getAllUsers, updateUser, deleteUser }