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

route.get('/products', getAllProducts);
route.get('/product/:id', getSingleProduct);

// Admin
route.post(
    '/admin/product/',
    isAuthentic,
    authenticateRole('admin'),
    productValidation,
    productValidationError,
    addNewProduct
);

route.put('/admin/product/:id', isAuthentic, authenticateRole('admin'), updateProduct);
route.put('/review', isAuthentic, createProductsReview);
route.get('/review', isAuthentic, getAllReview);
route.delete('/review', isAuthentic, deleteReview);
route.delete('/admin/product/:id', isAuthentic, authenticateRole('admin'), deleteSingleProduct);
route.delete('/admin/product', isAuthentic, authenticateRole('admin'), deleteAllProduct);

module.exports = route;
