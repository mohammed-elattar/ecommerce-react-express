import express from 'express';
import {
  deleteProduct,
  getProductById,
  listProducts,
} from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const Router = express.Router();
Router.get('/', listProducts);
Router.get('/:id', getProductById);
Router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default Router;
