const createHttpError = require('http-errors');
const Product = require('../../model/productModel');
const Order = require('../../model/orderModel');
const catchAsyncError = require('../../middleware/common/catchAsyncError');

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

const getMyOrder = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find({ user: req.user.id });

    if(!order)
});
module.exports = { newOrder };
