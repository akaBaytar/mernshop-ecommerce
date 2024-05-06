import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc      auth user & get token
// @route     POST /api/v1/users/login
// @access    public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // set jwt as http-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password.');
  }
});

// @desc      register user
// @route     POST /api/v1/users
// @access    public
const registerUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

// @desc      logout user & clear cookie
// @route     POST /api/v1/users/logout
// @access    private
const logoutUser = asyncHandler(async (req, res) => {
  res.send('logout user');
});

// @desc      get user profile
// @route     GET /api/v1/users/profile
// @access    private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

// @desc      update user profile
// @route     PUT /api/v1/users/profile
// @access    private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
});

// @desc      get all users
// @route     GET /api/v1/users
// @access    private | admin
const getAllUsers = asyncHandler(async (req, res) => {
  res.send('get all users');
});

// @desc      get user
// @route     GET /api/v1/users/:id
// @access    private | admin
const getUser = asyncHandler(async (req, res) => {
  res.send('get user by id');
});

// @desc      update user
// @route     PUT /api/v1/users/:id
// @access    private | admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

// @desc      delete user
// @route     GET /api/v1/users/:id
// @access    private | admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};
