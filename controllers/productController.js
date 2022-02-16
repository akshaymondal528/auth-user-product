const asyncHandler = require('express-async-handler');
const Products = require('../models/productModel');

// @desc    Get Products
// @route   GET /products
// @access  Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Products.find({ _createdBy: req.user.username });
  res.status(200).json(products);
});

// @desc    Set Products
// @route   POST /products
// @access  Private
const setProducts = asyncHandler(async (req, res) => {
  const { name, description, quantity, price } = req.body;
  if (!name || !description || !quantity || !price) {
    res.status(400);
    throw new Error('Please add all the fields');
  }
  const product = Products.create({
    name,
    description,
    quantity,
    price,
    _createdBy: req.user.username,
  });
  res.status(200).json(req.body);
});

module.exports = {
  getProducts,
  setProducts,
};
