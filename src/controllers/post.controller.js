const httpStatus = require('http-status')
const catchAsync = require('../utils/catchAsync')
const { postService, likeService } = require('../services')

const createPost = catchAsync(async (req, res) => {
    try {
        let data = await postService.createPost(req.body, req.user);
        res.status(httpStatus.OK).send(data)
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: 'Failed to create user.', details: error.message });
    }
});

const updatePost = catchAsync(async (req, res) => {
    try {
        const post = await postService.findPostByFilter({ _id: req.params.post_id, is_deleted: false }, { title: 1 })
        if (post) {
            let data = await postService.findByIdAndUpdate(req.params.post_id, req.body);
            res.status(httpStatus.OK).send(data)
        } else {
            res.status(httpStatus.BAD_REQUEST).json({ message: 'Failed to create user.', details: 'Post not found.' });

        }
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: 'Failed to create user.', details: error.message });
    }
});

const removePost = catchAsync(async (req, res) => {
    try {
        const post = await postService.findPostByFilter({ _id: req.params.post_id, is_deleted: false }, { title: 1 })
        if (post) {
            let data = await postService.findByIdAndUpdate(req.params.post_id, { is_deleted: true });
            res.status(httpStatus.OK).send('Post deleted successfully.')
        } else {
            res.status(httpStatus.BAD_REQUEST).json({ message: 'Failed to create user.', details: 'Post not found.' });

        }
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: 'Failed to create user.', details: error.message });
    }
});

const likePost = catchAsync(async (req, res) => {
    try {
        const post = await postService.findPostByFilter({ _id: req.params.post_id, is_deleted: false }, { title: 1 })
        if (post) {
            const like = await likeService.findLikeByFilter({ post_id: req.params.post_id, user_id: req.user.id, is_deleted: false }, { post_id: 1 })
            // make is_deleted true to unlike the post
            if (!like) {
                let data = await likeService.createLikeforPost(req.params.post_id, req.user.id);
                res.status(httpStatus.OK).send('Post Liked successfully.')
            } else {
                res.status(httpStatus.BAD_REQUEST).json({ message: 'Failed to create user.', details: 'You are already liked for this post.' });
            }
        } else {
            res.status(httpStatus.BAD_REQUEST).json({ message: 'Failed to create user.', details: 'Post not found.' });

        }
    } catch (error) {
        res.status(httpStatus.BAD_REQUEST).json({ message: 'Failed to create user.', details: error.message });
    }
});

module.exports = {
    createPost,
    updatePost,
    removePost,
    likePost
}