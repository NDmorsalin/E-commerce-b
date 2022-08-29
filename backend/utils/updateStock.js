const Product = require('../model/productModel');

const updateStock = async (productId, OrderQuantity) => {
    const product = await Product.findById(productId);
    product.stock -= OrderQuantity;
    await product.save({ validateBeforeSave: false });
    console.log(product);
    return product;
};

module.exports = updateStock;
