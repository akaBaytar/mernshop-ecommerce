import express from 'express';

import {
  authUser,
  deleteUser,
  getAllUsers,
  getUser,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controller/user.js';

import { admin, protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/').get(protect, admin, getAllUsers).post(registerUser);
router.post('/logout', logoutUser);
router.post('/login', authUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUser)
  .put(protect, admin, updateUser);

export default router;
