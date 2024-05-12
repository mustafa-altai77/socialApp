
const express = require('express');
const router = express.Router()

const authRouter = require("./auth.route")
const postRouter = require("./post.route")
const userRoute = require("./user.route")

const defaultRoutes = [
    { path: '/auth', route: authRouter },
    { path: '/post', route: postRouter },
    { path: "/user", route: userRoute },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});


module.exports = router;
