import express from "express";
import {
    createArticle,
    deleteArticle,
    getAllArticles,
    getArticleById,
    updateArticle,
} from "../controllers/articleController.js";

const router = express.Router();

  router.route("/:id").get(getArticleById);
  router.route("/").get(getAllArticles);
  router.route("/").post(createArticle);
  router.route("/").patch(updateArticle);
  router.route("/:id").delete(deleteArticle);

export default router;
