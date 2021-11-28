import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

export const listProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({});
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product Not Found' });
  }
});
