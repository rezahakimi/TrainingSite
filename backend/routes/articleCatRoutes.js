import express from "express";
import {
    createArticleCat,
    deleteArticleCat,
    getAllArticleCats,
    getArticleCatById,
    updateArticleCat,
} from "../controllers/articleCatController.js";

const router = express.Router();

  router.route("/:id").get(getArticleCatById);
  router.route("/").get(getAllArticleCats);
  router.route("/").post(createArticleCat);
  router.route("/").patch(updateArticleCat);
  router.route("/:id").delete(deleteArticleCat);

export default router;
