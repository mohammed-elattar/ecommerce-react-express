import express from 'express';
import {
  getProductById,
  listProducts,
} from '../controllers/productController.js';

const Router = express.Router();
Router.get('/', listProducts);
Router.get('/:id', getProductById);

export default Router;
