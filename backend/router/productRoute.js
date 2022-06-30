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
} = require('../controller/routeController/productController');

const route = express.Router();

route.get('/product', getAllProducts);
route.get('/product/:id', getSingleProduct);

// Admin
route.post('/product/', productValidation, productValidationError, addNewProduct);
route.put('/product/:id', updateProduct);
route.delete('/product/:id', deleteSingleProduct);
route.delete('/product', deleteAllProduct);

module.exports = route;
