//external dependency
//const mongoose= require('mongoose')
const Product = require('../../model/productModel')
const getAllProducts = async (req, res, next)=> {

  res.status(300).json({
    status: 'success', title: 'getAllProducts',

  })
}
const getSingleProduct = async (req, res, next)=> {

  res.status(300).json({
    status: 'success', title: 'getSingleProduct'

  })
}
const addNewProduct = async (req, res, next)=> {

  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    categories: req.body.categories,
    pricing: req.body.pricing
  })
  await product.save()
  res.status(300).json({
    status: 'success',
    title: 'addNewProduct,',
    product
  })
}
const updateProduct = async (req, res, next)=> {

  res.status(300).json({
    status: 'success',
    title: 'updateProduct,'
  })
}
const deleteProduct = async (req, res, next)=> {

  res.status(300).json({
    status: 'success',
    title: 'deleteProduct'
  })
}



module.exports = {
  getAllProducts,
  getSingleProduct,
  addNewProduct,
  updateProduct,
  deleteProduct
}