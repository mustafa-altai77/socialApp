const Joi = require('joi')
const { objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    middle_name: Joi.string().allow('', null),
    last_name: Joi.string().required(),
    gender: Joi.string().allow('', null, 'Male', 'Female'),
    image_url: Joi.string().allow('', null),
    nationality: Joi.string().allow('', null),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
}

const userById = {
  body: Joi.object().keys({
    first_name: Joi.string(),
    middle_name: Joi.string().allow('', null),
    last_name: Joi.string(),
    gender: Joi.string().allow('', null, 'Male', 'Female'),
    image_url: Joi.string().allow('', null),
    nationality: Joi.string().allow('', null),
    email: Joi.string().email(),
    password: Joi.string(),
  })
}

module.exports = {
  createUser,
  userById
}
