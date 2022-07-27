/* eslint-disable prettier/prettier */
const createHttpError = require('http-errors');
const jwt = require('jsonwebtoken');
const catchAsyncError = require('./catchAsyncError');
const User = require('../../model/userModel');

const isAuthentic = catchAsyncError(async (req, res, next) => {
    const token = req.signedCookies.user;

    if (!token) {
        next(createHttpError(401, 'Please login to access this resource'));
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(id);

    if (!user) {
        next(createHttpError(402, 'User not found please registration again'));
    }
    req.user = user;
    next();
});

const authenticateRole = (...role) => (req, res, next) => {
        if (!role.includes(req.user.role)) {
            next(createHttpError(403, `Role: ${req.user.role} are not allow to access this resource`));
        }

        next();
    };

module.exports = { isAuthentic, authenticateRole };
