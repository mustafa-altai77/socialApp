const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { tokenTypes } = require('../config/tokens');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const ObjectId = require('mongoose').Types.ObjectId;
const {
    authService,
    awsService,
    smsService,
    tokenService,
    userService
} = require('../services');
const { User } = require('../models');

const ApiError = require('../utils/ApiError');

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findByCredentials(email, password);
        const tokens = await tokenService.generateAuthTokens(user);
        res.send({ user, tokens });
    } catch (err) {
        res.status(httpStatus.BAD_REQUEST).json({ success: false, message: "Invalid Credentials" });
    }
});

const logout = catchAsync(async (req, res) => {
    try {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
} catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({ success: false, message: err.message });
}
});

const refreshTokens = catchAsync(async (req, res) => {
    try {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ tokens });
} catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({ success: false, message: err.message });
}
});

/* const forgotPassword = catchAsync(async (req, res) => {
    const { email, country_code, mobile } = req.body;
    let params = {};
    if (email) {
        params = {
            email
        }
    } else if (country_code && mobile) {
        params = {
            country_code,
            mobile
        }
    } else {
        res.status(httpStatus.BAD_REQUEST).json({ message: 'Please pass email or mobile number to authenticate' });
    }
    const user = await userService.getUserByFilter(params);
    if (user) {
        const tokens = await tokenService.generateCreatePasswordToken(user);
        if (email) {
            awsService.sendResetPasswordEmail(user, tokens);
            res.send({ message: 'An Email has been sent to the given mail to reset password.' });
        } else {
            smsService.sendResetPasswordSMS(user, tokens);
            res.send({ message: 'An SMS has been sent to the given mobile number to reset password.' });
        }
    } else {
        throw new Error("Please check the credentials you entered.")
    }

});

const resetPassword = catchAsync(async (req, res) => {
    const resetTokenDoc = await tokenService.verifyToken(req.body.token, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetTokenDoc.user);
    if (user) {
        await userService.updatePassword({ _id: user._id }, req.body.password);
        await tokenService.deleteTokenById(resetTokenDoc._id);
        res.status(httpStatus.OK).send({ message: 'Password Updated Successfully.' })
    } else {
        res.status(httpStatus.BAD_REQUEST).json({ message: 'Failed to get user.' });
    }
}); */

module.exports = {
    login,
    logout,
    refreshTokens,
    // forgotPassword,
    // resetPassword,
};
