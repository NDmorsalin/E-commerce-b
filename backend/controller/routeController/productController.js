/* eslint-disable no-unused-vars */
// external dependency
// const mongoose= require('mongoose')
const Product = require('../../model/productModel');

const getAllProducts = async (req, res, next) => {
    const product = await Product.find();
    res.status(300).json({
        status: 'success',
        product,
    });
};

const getSingleProduct = async (req, res, next) => {
    console.log(req.params.id);
    const product = await Product.findById(req.params.id);
    res.status(300).json({
        status: 'success',
        product,
    });
};

// Admin
const addNewProduct = async (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        images: req.body.images,
    });
    await product.save();
    res.status(300).json({
        status: 'success',
        product,
    });
};

// Admin
const updateProduct = async (req, res, next) => {
    res.status(300).json({
        status: 'success',
        title: 'updateProduct,',
    });
};

// Admin
const deleteProduct = async (req, res, next) => {
    res.status(300).json({
        status: 'success',
        title: 'deleteProduct',
    });
};

module.exports = {
    getAllProducts,
    getSingleProduct,
    addNewProduct,
    updateProduct,
    deleteProduct,
};
