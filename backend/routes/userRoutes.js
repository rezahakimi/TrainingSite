import express from 'express';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  authUserWithTokenHeader
} from '../controllers/userController.js';
import { protect } from '../middleware/authWithCookieMiddleware.js';

const router = express.Router();

router.post('/signup', registerUser);
router.post('/auth', authUser);
router.post('/login', authUserWithTokenHeader);
router.post('/logout', logoutUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile); 

export default router;