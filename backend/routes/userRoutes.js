import express from 'express';
import {
  authUser,
  getUserProfile,
  getUsers,
  register,
  updateUserProfile,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const Router = express.Router();
Router.post('/login', authUser);
Router.post('/register', register);
Router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
Router.route('/').get(protect, admin, getUsers);
Router.route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default Router;
