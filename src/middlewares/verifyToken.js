// const jwtDecode = require('jwt-decode');
const jwt = require("jsonwebtoken")
const { Role, User } = require("../models")

async function verifyToken(req, res, next) {
    var header = decodeURI(req?.headers?.authorization ?? req?.cookies?.access_token ?? "");
    if (!header) {
        return res.status(403).send({ message: 'No token provided.' });
    }

    const token = header.split(' ')[1];
    try {
        // const decoded = jwtDecode(token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET, {});
        const user = await User.findById(decoded._id).select('first_name last_name _id email').exec();
        if (Date.now() >= decoded.exp * 1000) {
            return res.status(401).send({ message: 'Token expired.' });
        }
        // const role = await Role.findById(decoded.role_id).select('role_name').exec();
        // const user = await User.findById(decoded._id).select('first_name').exec();
        req.userId = decoded._id;
        req.user = user
        // Role based action if any and throw error
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized.', error: err.message });
    }
}

module.exports = {
    verifyToken
}