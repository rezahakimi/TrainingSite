import asyncHandler from "express-async-handler";
import db from "../models/index.js";

const ArticleCat = db.articleCat;

const getAllArticleCats = asyncHandler(async (req, res) => {
  const articleCats = await ArticleCat.find()
    .exec();
  if (articleCats) {
    const myArticleCats = articleCats.map((a) => {
      return {
        id: a._id,
        title: a.title
          };
    });

    res.status(200).json(myArticleCats);
  } else {
    res.status(404);
    throw new Error("ArticleCats not found");
  }
});
const getArticleCatById = asyncHandler(async (req, res) => {
  //console.log(req.params.id);
  const a = await ArticleCat.findById(req.params.id)
    .exec();
  if (a) {
    const myArticleCat = {
      id: a._id,
      title: a.title,
    };

    res.status(200).json(myArticleCat);
  } else {
    res.status(404);
    throw new Error("ArticleCat not found");
  }
});

const createArticleCat = asyncHandler(async (req, res) => {
  try {
    const { title } = req.body;

    const articleCat = new ArticleCat({
      title,
    });
    await articleCat.save();

    res.send({ message: "ArticleCat was Added successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

const updateArticleCat = asyncHandler(async (req, res) => {
  const { id, title } = req.body;
  const articleCat = await ArticleCat.findById(id);

  if (!articleCat) {
    res.status(404);
    throw new Error("ArticleCat not found");
  }

  if (articleCat) {
    articleCat.title = title;
    articleCat.save().then((a) => {
      res.send({ message: "ArticleCat was updated successfully!" });
    });
  }
});

const deleteArticleCat = asyncHandler(async (req, res) => {
  try {
    const articleCat = await ArticleCat.findById(req.params.id);
    if (!articleCat) {
      return res.status(404).send({ message: "Article not found" });
    }
    const articleCatId = articleCat._id;
    /* const user = await User.findById(article.createdUser);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    } */
    await ArticleCat.findByIdAndDelete(articleCatId);
    /* await User.findByIdAndUpdate(user._id, {
      $pull: { articles: articleId },
  });  */  
  
  /* Article.findByIdAndDelete(req.params.id)
    .then((article) => {
      
    })
    .catch((error) => {
      res.status(500).
      send(error);
    }); */
    res.send({ message: "ArticleCat was deleted successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export {
  createArticleCat,
  deleteArticleCat,
  getAllArticleCats,
  getArticleCatById,
  updateArticleCat,
};
