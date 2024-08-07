import express from "express";
import {
  signup,
  signin,
  logoutUser,
  //signinCookie,
  refreshToken,
  revokeToken,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
//router.post('/signincookie', signinCookie);
router.post("/signin", signin);
router.post("/signout", logoutUser);
//router.post("/logout", revokeToken);
router.post("/refreshtoken", refreshToken);
router.post("/revoketoken", revokeToken);

export default router;
