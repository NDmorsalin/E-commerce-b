/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
// external dependency
// const mongoose= require('mongoose')
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const crypto = require('crypto');
const cloudinary = require('cloudinary');
const generateCookie = require('../../lib/generateCookie');
const catchAsyncError = require('../../middleware/common/catchAsyncError');
const User = require('../../model/userModel');
const sendEmail = require('../../utils/sendEmail');
// get user Details
const getUserDetails = catchAsyncError(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        user: req.user,
    });
});

const register = catchAsyncError(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        crop: 'scale',
    });
    console.log(myCloud);
    // hash password
    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const userObj = {
        ...req.body,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    };
    // create user
    const user = new User({
        ...userObj,
        password: hashPassword,
    });

    // generate jwt token and Cookie
    generateCookie('user', { id: user.id }, res);

    await user.save();

    res.status(200).json({
        status: 'success',
        user,
    });
});

// Login
const login = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        next(createHttpError(400, 'Please enter email or password'));
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        next(createHttpError(401, 'Your email or password is invalid'));
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
        next(createHttpError(401, 'Your email or password is invalid'));
    }

    const token = generateCookie('user', { id: user?.id }, res);

    res.status(200).json({
        status: 'success',
        message: 'you are logged in',
        token,
        user,
    });
});

// Logout
const logout = catchAsyncError(async (req, res, next) => {
    res.clearCookie('user', null);
    res.status(200).json({
        status: 'success',
        message: 'You are logout successfully',
    });
});

// Forget Password
const forgetPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        next(createHttpError(404, 'User is not found'));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/password/reset/${resetToken}`;

    const message = `your reset password token is \n\n ${resetPasswordUrl} \n\n if you are not send this request please Ignore it`;

    try {
        await sendEmail({
            email: user.email,
            message,
            subject: 'E-commerce password reset',
        });

        res.status(200).json({
            status: 'success',
            message: `An Email is send to ${user.email}`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        console.log(error);
        next(createHttpError(500, error.message));
    }
});
// resetPassword
const resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        next(createHttpError(400, 'Your reset password token is invalid or it is expired'));
    }
    if (req.body.password !== req.body.confirmPassword) {
        next(createHttpError(400, 'Your reset password dose not match'));
    }
    user.password = await bcrypt.hash(req.body.password, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    const token = generateCookie('user', { id: user?.id }, res);

    res.status(200).json({
        status: 'success',
        message: 'you are logged in',
        token,
        user,
    });
});

// update password
const updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    const isOldPassTrue = await bcrypt.compare(req.body.oldPassword, user.password);

    if (!isOldPassTrue) {
        return next(createHttpError(400, 'Your old password is wrong'));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(createHttpError(400, 'Your  password dose not match'));
    }

    user.password = await bcrypt.hash(req.body.password, 10);
    await user.save();
    res.status(200).json({
        status: 'success',
        user,
    });
});

const updateProfile = catchAsyncError(async (req, res, next) => {
    const { id } = req.user;
    const updatedUser = await User.findByIdAndUpdate(
        id,
        {
            $set: {
                name: req.body.name,
                email: req.body.email,
            },
        },
        { new: true }
    );

    // todo we will add cloudinary later

    res.status(200).json({
        status: 'success',
        updatedUser,
    });
});

// getReviewedUser
const getReviewedUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id).select('avatar');

    console.log(user);
    res.status(200).json({
        status: 'success',
        user,
    });
});

// Get all user (Admin)
const getAllUser = catchAsyncError(async (req, res, next) => {
    const allUser = await User.find();
    console.log(allUser);
    res.status(200).json({
        status: 'success',
        allUser,
    });
});

// Get Single user (Admin)
const getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(createHttpError(404, 'user is not found'));
    }
    res.status(200).json({
        status: 'success',
        user,
    });
});

// Get Update user role (Admin)
const updateUserProfile = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(
        id,
        {
            $set: {
                name: req.body.name,
                email: req.body.email,
                role: req.body.role,
                avatar: req.body.avatar,
            },
        },
        { new: true }
    );
    if (!updatedUser) {
        return next(createHttpError(404, 'User is not found'));
    }
    // todo we will add cloudinary later

    res.status(200).json({
        status: 'success',
        updatedUser,
    });
});

// Delete User Admin
const deleteUser = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
        return next(createHttpError(404, 'User not found'));
    }
    // todo we will Remove cloudinary later
    res.status(200).json({
        status: 'successfully deleted one User',
        deletedUser,
    });
});

module.exports = {
    getAllUser,
    getUserDetails,
    getReviewedUser,
    register,
    login,
    forgetPassword,
    logout,
    updatePassword,
    updateProfile,
    resetPassword,
    getSingleUser,
    deleteUser,
    updateUserProfile,
};
