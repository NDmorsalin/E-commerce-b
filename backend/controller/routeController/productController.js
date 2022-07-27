/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
// external dependency
// const mongoose= require('mongoose')
const createHttpError = require('http-errors');
const Product = require('../../model/productModel');
const ApiFeature = require('../../utils/apiFeature');
const catchAsyncError = require('../../middleware/common/catchAsyncError');

const getAllProducts = catchAsyncError(async (req, res, next) => {
    const apiFeature = new ApiFeature(Product, req.query).search().filter();

    const product = await apiFeature.query;
    res.status(200).json({
        status: 'success',
        product,
    });
});

const getSingleProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        product,
    });
});

// Admin
const addNewProduct = catchAsyncError(async (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        stock: req.body.stock,
        user: req.user.id,
    });

    await product.save();
    res.status(200).json({
        status: 'success',
        product,
    });
});

// Admin
const updateProduct = catchAsyncError(async (req, res, next) => {
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
                stock: req.body.stock,
                ratings: req.body.ratings,
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
});

// Admin
const deleteSingleProduct = catchAsyncError(async (req, res, next) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
        status: 'successfully deleted one product',
        deletedProduct,
    });
});
// Admin
const deleteAllProduct = catchAsyncError(async (req, res, next) => {
    const deleteAllProducts = await Product.deleteMany();
    res.status(200).json({
        status: 'successfully deleted All products',
        deleteAllProducts,
    });
});

// create or update review
const createProductsReview = catchAsyncError(async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user.id.toString()
    );

    console.log({ product, isReviewed });

    if (isReviewed) {
        product.reviews.forEach((rev) => {
            if (rev.user.toString() === req.user.id.toString()) {
                rev.rating = Number(rating);
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });
    res.status(200).json({
        status: 'Successful',
        product,
    });
});

// get all review
const getAllReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(createHttpError(404, 'Product not found'));
    }

    res.status(200).json({
        status: 'success',
        review: product.reviews,
    });
});

// get all review
const deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(createHttpError(404, 'Product not found'));
    }
    const reviews = product.reviews.filter((rev) => rev.id !== req.query.reviewId);

    let avg = 0;
    reviews.forEach((rev) => {
        avg += rev.rating;
    });
    const ratings = Number(avg / reviews.length);

    const updateReviewProduct = await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings: Number.isNaN(ratings) ? 0 : ratings,
            numOfReviews: reviews.length,
        },
        {
            new: true,
        }
    );

    res.status(200).json({
        status: 'success',
        review: product.reviews,
        updateReviewProduct,
    });
});
module.exports = {
    getAllProducts,
    getSingleProduct,
    addNewProduct,
    updateProduct,
    deleteSingleProduct,
    deleteAllProduct,
    createProductsReview,
    deleteReview,
    getAllReview,
};
