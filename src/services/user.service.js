const { User } = require('../models')
var pbkdf2 = require('pbkdf2')
var crypto = require('crypto');
const { ObjectId } = require('mongodb')

/**
 * Get user by filter
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const createUser = async (body) => {
    let user = await User.findOne({ email: body.email, is_deleted: false });
    if (user) {
        throw new Error('Already registered by using the given email.')
    }
    var salt = genRandomString(32);
    var authentication = {
        hash: pbkdf2.pbkdf2Sync(body.password, salt, 872791, 64, 'sha512').toString('hex'),
        token: salt
    }
    body.authentication = authentication
    return await User.create(body);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id, project = { password: 0 }) => {
    return await User.findOne({ _id: ObjectId(id) }, project).lean();
};

/**
* Get user by filter
* @param {ObjectId} id
* @returns {Promise<User>}
*/
const getUserByFilter = async (filter, project = { password: 0 }) => {
    return await User.findOne(filter, project).lean();
};

/**
 * Get user by filter
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const findByIdAndUpdate = async (id, set = {}) => {
    return await User.findOneAndUpdate({ _id: ObjectId(id) }, { $set: set }, { new: true });
  };

function genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')/** convert to hexadecimal format */
        .slice(0, length);
    /** return required number of characters */
};

module.exports = {
    createUser,
    getUserById,
    getUserByFilter,
    findByIdAndUpdate
}
