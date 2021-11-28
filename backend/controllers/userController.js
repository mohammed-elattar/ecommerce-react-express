import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

export const authUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken({ id: user._id }),
    });
  }

  res.status(401);
  throw new Error('invalid user name or password');
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken({ id: user._id }),
    });
  }

  res.status(404);
  throw new Error('user not found');
});
