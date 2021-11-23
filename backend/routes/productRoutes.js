import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const Router = express.Router();
Router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    const products = await Product.find({});
    res.json(products);
  })
);

Router.get(
  '/:id',
  asyncHandler(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product Not Found' });
    }
  })
);

export default Router;
