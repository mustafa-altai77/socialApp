const express = require('express');
const validate = require('../../middlewares/validate');
const { verifyToken } = require("../../middlewares/verifyToken")
const postValidation = require('../../validations/post.validation');
const postController = require('../../controllers/post.controller');
// const auth = require('../../middlewares/auth');

const router = express.Router();
router.use(verifyToken);
router.post('/create_post', validate(postValidation.createPost), postController.createPost);
router
    .route("/like_post/:post_id")
    .put(postController.likePost)
router
    .route("/:post_id")
    .put(validate(postValidation.updatePost), postController.updatePost)
    .delete(validate(postValidation.updatePost), postController.removePost)

module.exports = router;