const { Post } = require('../models')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError');

/**
 * Create post
 * @param {Object} body
 * @returns {Promise<Post>}
 */
const createPost = async function (body, user) {
    try {
        body.created_by = user.id
        return await Post.create(body);
    } catch (err) {
        throw new ApiError(httpStatus.NOT_FOUND, err.message);
    }
}

/**
 * Find post by filter
 * @param {Object} filter
 * @returns {Promise<Post>}
 */
const findPostByFilter = async (filter, params) => {
    return await Post.findOne(filter, params);
};
/**
 * Update post by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const findByIdAndUpdate = async (id, set) => {
    return await Post.findOneAndUpdate({ _id: id }, { $set: set }, { new: true });
};
module.exports = {
    findPostByFilter,
    createPost,
    findByIdAndUpdate
};