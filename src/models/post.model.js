const mongoose = require('mongoose')
const { toJSON, paginate, deletion } = require('./plugins')

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    sub_title: {
        type: {
            en: String,
        },
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image_url: {
        type: String
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
    },
    updated_at: {
        type: Date,
    },
    is_deleted: {
        type: Boolean,
        default: false,
    },
})

postsSchema.plugin(toJSON)
postsSchema.plugin(paginate)
postsSchema.plugin(deletion)

module.exports = mongoose.model('posts', postsSchema)
