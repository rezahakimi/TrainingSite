import express from "express";
import {
  createArticleComment,
  getArticleComentsByArticleId,
  updateArticleComment,
  getArticleCommentById,
} from "../controllers/articleCommentController.js";

const router = express.Router();

router.route("/article/:articleid").get(getArticleComentsByArticleId);
router.route("/:id").get(getArticleCommentById);
router.route("/").post(createArticleComment);
router.route("/").patch(updateArticleComment);
// router.route("/:id").delete(deleteArticleCat);

export default router;
