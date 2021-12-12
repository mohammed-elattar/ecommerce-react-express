import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const listProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }

  return res.status(404).json({ message: 'Product Not Found' });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

export { listProducts, getProductById, deleteProduct };
