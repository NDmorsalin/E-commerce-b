/* eslint-disable consistent-return */
const createHttpError = require('http-errors');
const Order = require('../../model/orderModel');
const catchAsyncError = require('../../middleware/common/catchAsyncError');
const updateStock = require('../../utils/updateStock');

// eslint-disable-next-line no-unused-vars
const newOrder = catchAsyncError(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        orderStatus,
    } = req.body;
    const order = new Order({
        shippingInfo,
        orderItems,
        user: req.user.id,
        paymentInfo,
        paidAt: Date.now(),
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        orderStatus,
    });

    await order.save();

    res.status(200).json({
        status: 'success',
        order,
    });
});

// get logged in user all orders / my orders
const getMyOrder = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    if (!orders) {
        return next(createHttpError(404, 'you do not create any order yet'));
    }

    res.status(200).json({
        status: 'success',
        orders,
    });
});

// get logged in user single order
const getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(createHttpError(404, 'you do not create any order yet'));
    }

    res.status(200).json({
        status: 'success',
        order,
    });
});

// get all orders --Admin
const getAllOrder = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    if (!orders) {
        return next(createHttpError(404, 'Nobody do not create any order yet'));
    }

    let totalAmount = 0;
    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        status: 'success',
        orders,
        totalAmount,
    });
});

// update single orders status --Admin
const updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    console.log(order);
    if (!order) {
        return next(createHttpError(404, 'Nobody do not create any order yet'));
    }

    if (order.orderStatus === 'delivered') {
        return next(createHttpError(400, 'you have already delivered this order'));
    }
    if (order.orderStatus === 'processing') {
        order.orderItems.forEach(async (or) => {
            await updateStock(or.product, or.quantity);
        });
    }

    order.orderStatus = req.body.orderStatus;

    if (req.body.orderStatus === 'delivered') {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        order,
    });
});

// delete  order --Admin
const deleteOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
        return next(createHttpError(404, 'order not found to delete'));
    }

    res.status(200).json({
        status: 'success',
        message: 'Order is deleted successfully',
        order,
    });
});

module.exports = {
    newOrder,
    getMyOrder,
    getSingleOrder,
    getAllOrder,
    updateOrder,
    deleteOrder,
};
