const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const { User } = require('../models')
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');
const { tokenTypes } = require('../config/tokens');
const config = require('../config/config');
const { Token, } = require('../models');
const jwt = require('jsonwebtoken');
const moment = require('moment');
// const awsService = require("./aws.service")
// const smsService = require("./sms.service")

/**
 * Login
 * @param {string} refreshToken
 * @returns {Promise}
 */
const login = async function (email, password) {
    let user = await User.findBy(body.email, { first_name: 1, last_name: 1, email: 1, password: 1, profile_photo: 1, type: 1, first_time_user: 1 });
    if (!result) {
        throw new Error("Please check your credentials.")
    }
    delete user.password;
    return user
}

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
    const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.remove();
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
    try {
        const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
        const user = await userService.getUserById(refreshTokenDoc.user);
        const decodedToken = jwt.verify(refreshToken, config.jwt.secret)
        if (!user) {
            throw new Error();
        }
        await refreshTokenDoc.remove();
        return tokenService.generateAuthTokens(user);
    } catch (error) {
        // throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
        throw new ApiError(httpStatus.UNAUTHORIZED, error.message);
    }
};
module.exports = {
    login,
    logout,
    refreshAuth
};