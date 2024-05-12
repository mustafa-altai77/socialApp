const Joi = require('joi');

const login = {
    body: Joi.object().keys({
        email: Joi.string().required().allow('', null),
        password: Joi.string().required().allow('', null),
    }),
};

const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};

const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().allow('', null),
        country_code: Joi.string().allow('', null),
        mobile: Joi.string().allow('', null)
    }).min(1)
};

const resetPassword = {
    body: Joi.object().keys({
        token: Joi.string().required(),
        password: Joi.string().required()
    }),
};

module.exports = {
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
};
