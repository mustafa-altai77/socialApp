const { Like } = require('../models')
const httpStatus = require('http-status')
const ApiError = require('../utils/ApiError');

/**
 * Create post
 * @param {Object} body
 * @returns {Promise<Post>}
 */
const createLikeforPost = async function (post_id, user_id) {
    try {
        let body = {
            post_id: post_id,
            created_by: user_id,
            user_id: user_id
        }
        return await Like.create(body);
    } catch (err) {
        throw new ApiError(httpStatus.NOT_FOUND, err.message);
    }
}

/**
 * Find post by filter
 * @param {Object} filter
 * @returns {Promise<Post>}
 */
const findLikeByFilter = async (filter, params) => {
    return await Like.findOne(filter, params);
};

module.exports = {
    findLikeByFilter,
    createLikeforPost
};