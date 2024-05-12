const mongoose = require('mongoose')

// To store the Tokens
const tokensSchema = new mongoose.Schema({
    blacklisted: {
        type: Boolean,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
})

module.exports = mongoose.model('tokens', tokensSchema)

