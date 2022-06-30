const express = require('express');
const { userValidation, userValidationError } = require('../middleware/user/userValidation');

const {
    getAllUser,
    getSingleUser,
    addNewUser,
    updateUser,
    deleteSingleUser,
} = require('../controller/routeController/userController');

const route = express.Router();

route.get('/user', getAllUser);
route.get('/user/:id', getSingleUser);

// Admin
route.post('/user/', userValidation, userValidationError, addNewUser);
route.put('/user/:id', updateUser);
route.delete('/user/:id', deleteSingleUser);

module.exports = route;
