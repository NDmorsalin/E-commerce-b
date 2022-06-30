/* eslint-disable no-unused-vars */
// external dependency
// const mongoose= require('mongoose')
const bcrypt = require('bcrypt');
const User = require('../../model/userModel');

const getAllUser = async (req, res, next) => {
    try {
        const allUser = await User.find();
        res.status(300).json({
            status: 'success',
            allUser,
        });
    } catch (error) {
        res.status(500).json({
            error: {
                common: {
                    msg: error.message,
                },
            },
        });
    }
};

const getSingleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(300).json({
            status: 'success',
            user,
        });
    } catch (error) {
        res.status(500).json({
            error: {
                common: {
                    msg: error.message,
                },
            },
        });
    }
};

// Admin
const addNewUser = async (req, res, next) => {
    try {
        // hash password
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const userObj = {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            avatar: req.body.avatar,
            role: req.body.role,
        };
        // generate jwt token

        const user = new User({
            ...userObj,
            password: hashPassword,
        });

        await User.save();
        res.status(300).json({
            status: 'success',
            User,
        });
    } catch (error) {
        res.status(500).json({
            error: {
                common: {
                    msg: error.message,
                },
            },
        });
    }
};

// Admin
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    category: req.body.category,
                    price: req.body.price,
                    images: req.body.images,
                },
            },
            { new: true }
        );
        res.status(300).json({
            status: 'success',
            updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            error: {
                common: {
                    msg: error.message,
                },
            },
        });
    }
};

// Admin
const deleteSingleUser = async (req, res, next) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'successfully deleted one User',
            deletedUser,
        });
    } catch (error) {
        res.status(500).json({
            error: {
                common: {
                    msg: error.message,
                },
            },
        });
    }
};
// Admin

module.exports = {
    getAllUser,
    getSingleUser,
    addNewUser,
    updateUser,
    deleteSingleUser,
};
