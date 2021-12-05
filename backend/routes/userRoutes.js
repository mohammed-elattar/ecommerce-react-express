import express from 'express';
import {
  authUser,
  getUserProfile,
  register,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const Router = express.Router();
Router.post('/login', authUser);
Router.post('/register', register);
Router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default Router;
