import User from '../models/User.js';
import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utilities/generateToken.js';

// @desc      auth user & get token
// @route     POST /api/v1/users/login
// @access    public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.status(200).json({
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
  const { name, email, password } = req.body;

  const isUserExists = await User.findOne({ email });

  if (isUserExists) {
    res.status(400);
    throw new Error('User already exists.');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data.');
  }
});

// @desc      logout user & clear cookie
// @route     POST /api/v1/users/logout
// @access    private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expiresIn: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully.' });
});

// @desc      get user profile
// @route     GET /api/v1/users/profile
// @access    private
const getUserProfile = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
});

// @desc      update user profile
// @route     PUT /api/v1/users/profile
// @access    private
const updateUserProfile = asyncHandler(async (req, res) => {
  const id = req.user._id;
  const user = await User.findById(id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.user.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found.');
  }
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
