import express from 'express';
import {
  authUser,
  getUserProfile,
  getUsers,
  register,
  updateUserProfile,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const Router = express.Router();
Router.post('/login', authUser);
Router.route('/').get(protect, admin, getUsers);
Router.post('/register', register);
Router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default Router;
