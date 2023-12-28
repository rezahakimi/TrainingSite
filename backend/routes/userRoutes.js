import express from "express";
import {
  registerUser,
  updateUser,
  changePasswordUser,
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
  getAllUsers,
  getUserById,
  deleteUser,
  getAllRoles,
  addFriend,
  removeFriend,
  getFriends,
} from "../controllers/userController.js";
import { protect } from "../middleware/authWithCookieMiddleware.js";
import {
  verifyToken,
  isAdmin,
  isModerator,
} from "../middleware/authMiddleware.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const DIR = "./public/upload/user-image";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const router = express.Router();

/* router
  .route("/profile")
  .get(protect, getUserProfile)
  .patch(protect, updateUserProfile); */
router.route("/roles").get(getAllRoles);
router.route("/:id").get(getUserById);
router.route("/").get(getAllUsers);
router.route("/").post(upload.single("image"), registerUser);
router.route("/changepassword").post(changePasswordUser);
router.route("/").patch(upload.single("image"), updateUser);
router.route("/:id").delete(deleteUser);
router.route("/friends/:id").get(getFriends);
router.route("/friends/:id").post(addFriend);
router.route("/friends/:id").delete(removeFriend);

router.route("/all").get(allAccess);

router.route("/user").get(verifyToken, userBoard);

router.route("/mod").get([verifyToken, isModerator], moderatorBoard);

router.route("/admin").get([verifyToken, isAdmin], adminBoard);

export default router;
