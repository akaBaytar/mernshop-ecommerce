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

const router = express.Router();

router.route('/').get(getAllUsers).post(registerUser);
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUser).put(updateUser);

export default router;
