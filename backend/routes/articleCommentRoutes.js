import express from "express";
import {
  createArticleComment,
  //deleteArticleCat,
  getArticleComentByArticleId,
  // updateArticleCat,
} from "../controllers/articleCommentController.js";

const router = express.Router();

router.route("/:articleid").get(getArticleComentByArticleId);
router.route("/").post(createArticleComment);
//router.route("/").patch(updateArticleCat);
// router.route("/:id").delete(deleteArticleCat);

export default router;
