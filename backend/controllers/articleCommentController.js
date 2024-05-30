import asyncHandler from "express-async-handler";
import db from "../models/index.js";
import Article from "../models/articleModel.js";
import User from "../models/userModel.js";

const ArticleComment = db.articleComment;

const getArticleCommentById = asyncHandler(async (req, res) => {
  //console.log(req.params.id);
  const ac = await ArticleComment.findById(req.params.id)
    .populate({
      path: "articleId",
      //select: "",
      populate: {
        path: "createdUser", // in blogs, populate comments
        match: {},
        select: "firstname lastname _id", //"name -_id",
      },
    })
    .populate({
      path: "userId",
      match: {},
      select: "firstname lastname _id", //"name -_id",
    })
    .exec();
  if (ac) {
    const myArticleComment = {
      id: ac._id,
      articleId: ac.articleId._id,
      comment: ac.comment,
      articleCreateUserId: ac.articleId.createdUser._id,
      articleCreateFullName:
        ac.articleId.createdUser.firstname +
        " " +
        ac.articleId.createdUser.lastname,
      commentCreateUserId: ac.userId._id,
      commentCreateFullName: ac.userId.firstname + " " + ac.userId.lastname,
      accept: ac.accept,
      deleted: ac.deleted,
    };

    res.status(200).json(myArticleComment);
  } else {
    res.status(404);
    throw new Error("ArticleComment not found");
  }
});

const getArticleComentsByArticleId = asyncHandler(async (req, res) => {
  //console.log(req.params.id);
  const acs = await ArticleComment.find({
    articleId: req.params.articleid,
    accept: { $eq: req.query.accept },
  })
    .populate({
      path: "articleId",
      //select: "",
      populate: {
        path: "createdUser", // in blogs, populate comments
        match: {},
        select: "firstname lastname _id", //"name -_id",
      },
    })
    .populate({
      path: "userId",
      match: {},
      select: "firstname lastname _id", //"name -_id",
    })
    .exec();
  if (acs) {
    const myArticleComments = acs.map((ac) => {
      return {
        id: ac._id,
        articleId: ac.articleId._id,
        comment: ac.comment,
        articleCreateUserId: ac.articleId.createdUser._id,
        articleCreateFullName:
          ac.articleId.createdUser.firstname +
          " " +
          ac.articleId.createdUser.lastname,
        commentCreateUserId: ac.userId._id,
        commentCreateFullName: ac.userId.firstname + " " + ac.userId.lastname,
        accept: ac.accept,
        deleted: ac.deleted,
      };
    });

    res.status(200).json({ articlePostsData: myArticleComments });
  } else {
    res.status(404);
    throw new Error("ArticleComment not found");
  }
});

const createArticleComment = asyncHandler(async (req, res) => {
  try {
    const { articleId, userId, comment } = req.body;
    const article = await Article.findById(articleId);
    const user = await User.findById(userId);

    if (!article) {
      res.status(404);
      throw new Error("Article not found");
    }

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const articleComment = new ArticleComment({
      articleId,
      userId,
      comment,
      commentCreatedDate: Date.now(),
      accept: false,
      deleted: false,
    });
    await articleComment.save();
    article.comments.push(articleComment);
    await article.save();
    user.comments.push(articleComment);
    await user.save();

    res.send({ message: "ArticleComment was Added successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

const updateArticleComment = asyncHandler(async (req, res) => {
  try {
    const { articleCommentId, accept, deleted } = req.body;
    const articleComment = await ArticleComment.findById(articleCommentId);

    if (!articleComment) {
      res.status(404);
      throw new Error("ArticleComment not found");
    }

    if (articleComment) {
      articleComment.accept = accept;
      articleComment.deleted = deleted;
    }

    await articleComment.save();

    res.send({ message: "ArticleComment was Update successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export {
  createArticleComment,
  updateArticleComment,
  getArticleCommentById,
  getArticleComentsByArticleId,
};
