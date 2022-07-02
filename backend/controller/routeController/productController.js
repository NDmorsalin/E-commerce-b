/* eslint-disable no-unused-vars */
// external dependency
// const mongoose= require('mongoose')
const Product = require('../../model/productModel');
const ApiFeature = require('../../utils/apiFeature');

const getAllProducts = async (req, res, next) => {
    try {
        const apiFeature = new ApiFeature(Product, req.query).search().filter();

        const product = await apiFeature.query;
        res.status(300).json({
            status: 'success',
            product,
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

const getSingleProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(300).json({
            status: 'success',
            product,
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
const addNewProduct = async (req, res, next) => {
    try {
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
const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(
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

        if (!updatedProduct) {
            res.status(404).json({
                status: 'Product not found',
            });
        }

        res.status(300).json({
            status: 'success',
            updatedProduct,
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
const deleteSingleProduct = async (req, res, next) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'successfully deleted one product',
            deletedProduct,
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
const deleteAllProduct = async (req, res, next) => {
    try {
        const deleteAllProducts = await Product.deleteMany();
        res.status(300).json({
            status: 'successfully deleted All products',
            deleteAllProducts,
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

module.exports = {
    getAllProducts,
    getSingleProduct,
    addNewProduct,
    updateProduct,
    deleteSingleProduct,
    deleteAllProduct,
};
