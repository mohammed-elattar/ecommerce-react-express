import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getTopProducts,
  listProducts,
  updateProduct,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const Router = express.Router();
Router.route('/top').get(getTopProducts);
Router.route('/').get(listProducts).post(protect, admin, createProduct);
Router.route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
Router.route('/:id/reviews').post(protect, createProductReview);
export default Router;
