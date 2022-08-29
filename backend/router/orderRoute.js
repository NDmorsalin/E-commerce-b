const express = require('express');
const {
    newOrder,
    getMyOrder,
    getSingleOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
} = require('../controller/routeController/orderController');
const { isAuthentic, authenticateRole } = require('../middleware/common/auth');

const router = express.Router();

// create new order
router.post('/order/new', isAuthentic, newOrder);
// get all my order
router.get('/order/me', isAuthentic, getMyOrder); // get all my order
router.get('/order/:id', isAuthentic, getSingleOrder);

/* Admin */

// get all  order
router.get('/admin/order', isAuthentic, authenticateRole('admin'), getAllOrder);
// update order status
router.put('/admin/order/:id', isAuthentic, authenticateRole('admin'), updateOrder);
// update order
router.delete('/admin/order/:id', isAuthentic, authenticateRole('admin'), deleteOrder);

module.exports = router;
