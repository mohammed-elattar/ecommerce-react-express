import express from 'express';
import { authUser } from '../controllers/userController.js';

const Router = express.Router();
Router.post('/login', authUser);

export default Router;
