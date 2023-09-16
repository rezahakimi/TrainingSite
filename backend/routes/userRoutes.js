import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
  getAllUsers,
} from "../controllers/userController.js";
import { protect } from "../middleware/authWithCookieMiddleware.js";
import {
  verifyToken,
  isAdmin,
  isModerator,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/profile")
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile);
  router.route("/users").get(getAllUsers);

router.route("/all").get(allAccess);

router.route("/user").get(verifyToken, userBoard);

router.route("/mod").get([verifyToken, isModerator], moderatorBoard);

router.route("/admin").get([verifyToken, isAdmin], adminBoard);

export default router;
