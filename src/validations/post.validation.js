const Joi = require('joi')
const { objectId } = require('./custom.validation');

const createPost = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    sub_title: Joi.string().required(),
    content: Joi.string().required(),
    image_url: Joi.string().allow('', null),
  })
}

const updatePost = {
    params: Joi.object().keys({
        post_id: Joi.required().custom(objectId)
    }),
    body: Joi.object().keys({
        title: Joi.string(),
        sub_title: Joi.string(),
        content: Joi.string(),
        image_url: Joi.string().allow('', null),
    })
}

module.exports = {
  createPost,
  updatePost
}
