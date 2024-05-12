const mongoose = require('mongoose')
const { toJSON, paginate, deletion } = require('./plugins')

const likeSchema = new mongoose.Schema({
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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

likeSchema.plugin(toJSON)
likeSchema.plugin(paginate)
likeSchema.plugin(deletion)

module.exports = mongoose.model('likes', likeSchema)
