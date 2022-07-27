const express = require('express');
const { newOrder } = require('../controller/routeController/orderController');
const { isAuthentic } = require('../middleware/common/auth');

const router = express.Router();

// create new order
router.post('/order/new', isAuthentic, newOrder);

module.exports = router;
