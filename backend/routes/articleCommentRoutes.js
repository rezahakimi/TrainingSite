import express from "express";
import {
  createArticleComment,
  getArticleComentByArticleId,
  updateArticleComment,
  getArticleCommentById,
} from "../controllers/articleCommentController.js";

const router = express.Router();

router.route("/article/:articleid").get(getArticleComentByArticleId);
router.route("/:id").get(getArticleCommentById);
router.route("/").post(createArticleComment);
router.route("/").patch(updateArticleComment);
// router.route("/:id").delete(deleteArticleCat);

export default router;
