const express = require('express');
const { userValidation, userValidationError } = require('../middleware/user/userValidation');

const {
    getAllUser,
    getSingleUser,
    getUserDetails,
    register,
    login,
    forgetPassword,
    resetPassword,
    logout,
    updatePassword,
    updateProfile,
    deleteUser,
    updateUserProfile,
    getReviewedUser,
} = require('../controller/routeController/userController');
const { isAuthentic, authenticateRole } = require('../middleware/common/auth');

const route = express.Router();

route.post('/register', userValidation, userValidationError, register);

route.post('/login', login);

route.post('/password/forget', forgetPassword);

route.put('/password/reset/:token', resetPassword);

route.get('/me', isAuthentic, getUserDetails);

route.put('/password/update', isAuthentic, updatePassword);

route.put('/me/update', isAuthentic, updateProfile);

route.get('/logout', logout);

// reviews
route.get('/review/user/:id', getReviewedUser);

// admin
route.get('/admin/user', isAuthentic, authenticateRole('admin'), getAllUser);
route.get('/admin/user/:id', isAuthentic, authenticateRole('admin'), getSingleUser);
route.put('/admin/user/:id', isAuthentic, authenticateRole('admin'), updateUserProfile);
route.delete('/admin/user/:id', isAuthentic, authenticateRole('admin'), deleteUser);

module.exports = route;
