import User from '../models/User.js';

// @desc      auth user & get token
// @route     POST /api/v1/users/login
// @access    public
const authUser = async (req, res) => {
  res.send('auth user');
};

// @desc      register user
// @route     POST /api/v1/users
// @access    public
const registerUser = async (req, res) => {
  res.send('register user');
};

// @desc      logout user & clear cookie
// @route     POST /api/v1/users/logout
// @access    private
const logoutUser = async (req, res) => {
  res.send('logout user');
};

// @desc      get user profile
// @route     GET /api/v1/users/profile
// @access    private
const getUserProfile = async (req, res) => {
  res.send('get user profile');
};

// @desc      update user profile
// @route     PUT /api/v1/users/profile
// @access    private
const updateUserProfile = async (req, res) => {
  res.send('update user profile');
};

// @desc      get all users
// @route     GET /api/v1/users
// @access    private | admin
const getAllUsers = async (req, res) => {
  res.send('get all users');
};

// @desc      get user
// @route     GET /api/v1/users/:id
// @access    private | admin
const getUser = async (req, res) => {
  res.send('get user by id');
};

// @desc      update user
// @route     PUT /api/v1/users/:id
// @access    private | admin
const updateUser = async (req, res) => {
  res.send('update user');
};

// @desc      delete user
// @route     GET /api/v1/users/:id
// @access    private | admin
const deleteUser = async (req, res) => {
  res.send('delete user');
};

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
