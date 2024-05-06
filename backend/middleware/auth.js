import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/User.js';

// protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // read jwt from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized - User token failed.');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized - No user token.');
  }
});

// admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin.');
  }
};

export { protect, admin };
