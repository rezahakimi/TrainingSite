import express from "express";
import {
  registerUser,
  updateUser,
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";
import { protect } from "../middleware/authWithCookieMiddleware.js";
import {
  verifyToken,
  isAdmin,
  isModerator,
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* router
  .route("/profile")
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile); */
  router.route("/:id").get(getUserById);
  router.route("/").get(getAllUsers);
  router.route("/").post(registerUser);
  router.route("/").patch(updateUser);

router.route("/all").get(allAccess);

router.route("/user").get(verifyToken, userBoard);

router.route("/mod").get([verifyToken, isModerator], moderatorBoard);

router.route("/admin").get([verifyToken, isAdmin], adminBoard);

export default router;
