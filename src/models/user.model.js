const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var pbkdf2 = require('pbkdf2')
const { toJSON, paginate, deletion } = require('./plugins')

const usersSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, },
    middle_name: { type: String, },
    last_name: { type: String, required: true, },
    gender: { type: String },
    country_code: { type: Number },
    mobile: { type: Number },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    nationality: { type: String },
    dob: { type: Date },
    authentication: {
      type: Object,
      required: true,
      private: true, // used by the toJSON plugin
    },
    created_at: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      default: 'Active'
    },
    image_url: {
      type: String
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId
    },
    is_deleted: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  },
)

usersSchema.pre('save', async function (next) {
  // Hash the password before saving the user model
  const user = this
  if (user.isModified('password')) {
    var salt = genRandomString(32);
    var authentication = {
        hash: pbkdf2.pbkdf2Sync(user.password, salt, 872791, 64, 'sha512').toString('hex'),
        token: salt
    }
    user.authentication = authentication
  }
  next()
})

usersSchema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this
  const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY)
  user.tokens = user.tokens.concat({ token })
  // await user.save()
  return token
}

usersSchema.methods.checkIsAdmin = async function () {
  // Generate an auth token for the user
  const user = this
  let isAdmin = false

  if (user.role_ID === '5e2ec39af3185a0b5036ef01') {
    isAdmin = true
  }
  // await user.save()
  return isAdmin
}

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
usersSchema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await Users.findOne({ email }, { first_name: 1, last_name: 1, email: 1, authentication: 1, profile_photo: 1 })

  if (!user) {
    throw new Error({ message: 'Invalid login credentials' })
  }
  if (pbkdf2.pbkdf2Sync(password, user.authentication.token, 872791, 64, 'sha512').toString('hex') == user.authentication.hash) {
    delete user.authentication;
    return user
  } else {
    throw new Error({ message: 'Invalid login credentials' })
  }
}

usersSchema.plugin(toJSON)
usersSchema.plugin(paginate)
usersSchema.plugin(deletion)

const Users = mongoose.model('users', usersSchema)
module.exports = Users
