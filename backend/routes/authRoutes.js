import express from 'express';
import {
    signup,
    signin,
  logoutUser,
  signinCookie
} from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signincookie', signinCookie);
router.post('/signin', signin);
router.post('/logout', logoutUser);


export default router;