const express = require('express');
const {
    productValidation,
    productValidationError,
} = require('../middleware/product/productValidation');

const {
    getAllProducts,
    getSingleProduct,
    addNewProduct,
    updateProduct,
    deleteSingleProduct,
    deleteAllProduct,
    createProductsReview,
    getAllReview,
    deleteReview,
} = require('../controller/routeController/productController');
const { isAuthentic, authenticateRole } = require('../middleware/common/auth');

const route = express.Router();

route.get('/product', getAllProducts);
route.get('/product/:id', getSingleProduct);

// Admin
route.post(
    '/product/',
    isAuthentic,
    authenticateRole('admin'),
    productValidation,
    productValidationError,
    addNewProduct
);
route.put('/product/:id', isAuthentic, authenticateRole('admin'), updateProduct);
route.put('/review', isAuthentic, createProductsReview);
route.get('/review', isAuthentic, getAllReview);
route.delete('/review', isAuthentic, deleteReview);
route.delete('/product/:id', isAuthentic, authenticateRole('admin'), deleteSingleProduct);
route.delete('/product', isAuthentic, authenticateRole('admin'), deleteAllProduct);

module.exports = route;
