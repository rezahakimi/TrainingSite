import express from "express";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getAllArticlesByCategory,
  getArticleById,
  updateArticle,
  iLikeArticle,
  iDisLikeArticle,
  getUsersLikeArticle,
  getUsersDisLikeArticle,
  getUserLikeArticle,
  //getAllArticleCats,
} from "../controllers/articleController.js";

const router = express.Router();

router.route("/cat/:id").get(getAllArticlesByCategory);
router.route("/:id").get(getArticleById);
router.route("/").get(getAllArticles);
router.route("/").post(createArticle);
router.route("/").patch(updateArticle);
router.route("/:id").delete(deleteArticle);
router.route("/like/:id").patch(iLikeArticle);
router.route("/dislike/:id").patch(iDisLikeArticle);
router.route("/like/:id").get(getUsersLikeArticle);
router.route("/dislike/:id").get(getUsersDisLikeArticle);
router.route("/like/:articleid/:userid").get(getUserLikeArticle);

export default router;
