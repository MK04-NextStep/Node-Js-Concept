const { NewError } = require('../Middleware/errorMiddleware');
const { validationResult } = require('express-validator')
const tokenGenerator = require('../Util/tokenGenerator');
const logger = require('../Util/logger');

let register = async (req, res, next) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
        throw new NewError(err.array()[0].msg, 400)
    }

    let data = req.body;
    let existUser = await user.findOne({ email: data.email });
    if (existUser) {
        throw new NewError("Account already exist. Please login instead", 400)
    }
    let hashPass = await bcrypt.hash(data.password, 10);
    let newUser = await user.create({ ...data, password: hashPass })

    logger.info(" New User registered", {userId: newUser._id})
    res.json({
        success: true,
        data: {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role
        }
    })
}

let login = async (req, res, next) => {
    let err = validationResult(req);
    if (!err.isEmpty()) {
        throw new NewError(err.array()[0].msg, 400)
    }
    let { email, password } = req.body;
    let existUser = await user.findOne({ email: email }).select("+password")
    if (!existUser) {
        logger.warn("Logged In failed", {email})
        throw new NewError("Invalid credentials", 401)
    }

    let correctPasswoard = await bcrypt.compare(password, existUser.password);
    if (!correctPasswoard) {
        throw new NewError("Invalid credentials", 401)
    }
    let token = tokenGenerator(existUser._id, existUser.role)

    logger.info("User logged In successfully", { userId: existUser._id, role: existUser.role})
    res.json({
        success: true,
        data: {
            _id: existUser._id,
            name: existUser.name,
            email: existUser.email,
            role: existUser.role
        },
        token: token
    })
}

module.exports = { login, register }

