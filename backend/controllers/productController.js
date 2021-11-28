import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

export const listProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }

  return res.status(404).json({ message: 'Product Not Found' });
});
