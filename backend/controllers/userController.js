import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

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
      token: null,
    });
  }

  res.status(401);
  throw new Error('invalid user name or password');
});
