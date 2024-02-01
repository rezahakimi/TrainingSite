import asyncHandler from "express-async-handler";
import db from "../models/index.js";
import Article from "../models/articleModel.js";

const ArticleComment = db.articleComment;

const getArticleComentByArticleId = asyncHandler(async (req, res) => {
  //console.log(req.params.id);
  const ac = await ArticleComment.find({
    articleId: req.params.articleid,
  }).exec();
  if (ac) {
    const myArticleComment = {
      id: ac._id,
      articleId: ac.articleId,
      comments: ac.comments,
    };

    res.status(200).json(myArticleComment);
  } else {
    res.status(404);
    throw new Error("ArticleComment not found");
  }
});

const createArticleComment = asyncHandler(async (req, res) => {
  try {
    const { articleId, commentId, comment } = req.body;
    const article = await Article.findById(articleId);

    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }
    if (commentId) {
    } else {
      const articleComment = new ArticleComment({
        articleId,
        comments: [comment],
        commentCreatedDate: Date.now(),
        accept: false,
      });
      await articleComment.save();
      article.comments.push(articleComment);
      await article.save();
    }
    res.send({ message: "ArticleComment was Added successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

/* const updateArticleCat = asyncHandler(async (req, res) => {
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
}); */

export { createArticleComment, getArticleComentByArticleId };
