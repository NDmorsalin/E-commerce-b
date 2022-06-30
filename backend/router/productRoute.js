const express = require('express');
const productValidator = require('../middleware/product/productMiddleware.js')

const {
    getAllProducts,
    getSingleProduct,
    addNewProduct,
    updateProduct,
    deleteProduct,
} = require('../controller/routeController/productController');

const route = express.Router();

route.get('/product', getAllProducts);
route.get('/product/:id', getSingleProduct);
route.post('/product/', addNewProduct);
route.put('/product/:id', updateProduct);
route.delete('/product/:id', deleteProduct);

module.exports = route;
