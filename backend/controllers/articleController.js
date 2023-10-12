import asyncHandler from "express-async-handler";
//import User from "../models/userModel.js";
//import Role from "../models/roleModel.js";
import db from "../models/index.js";
import User from "../models/userModel.js";

const Article = db.article;

const getAllArticles = asyncHandler(async (req, res) => {
  const articles = await Article.find()
    .populate({
      path: "createdUser",
      match: {},
      select: "firstName lastName -_id",
    })
    .exec();
  if (articles) {
    const myArticles = articles.map((article) => {
      return {
        id: article._id,
        title: article.title,
        content: article.content,
        createdDate: article.createdDate,
        lastModifyDate: article.lastModifyDate,
        createdUser: article.firstname + " " + article.lastname,
      };
    });

    res.status(200).json(myArticles);
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});
const getArticleById = asyncHandler(async (req, res) => {
  //console.log(req.params.id);
  const article = await Article.findById(req.params.id)
    .populate({
      path: "createdUser",
      match: {},
      select: "firstname lastname _id", //"name -_id",
    })
    .exec();
  if (article) {
    const myArticle = {
      id: user._id,
      content: article.content,
      createdDate: article.createdDate,
      lastModifyDate: article.lastModifyDate,
      createdUser: article.firstname + " " + article.lastname,
    };

    res.status(200).json(myArticle);
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

const createArticle = asyncHandler(async (req, res) => {
  const { title, content, userid } = req.body;

  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const article = new Article({
    title,
    content,
    lastModifyDate: Date.now(),
    createdUser: user._id,
  });
  article.save().then((a) => {
    res.send({ message: "Article was Added successfully!" });
  });
});

const updateArticle = asyncHandler(async (req, res) => {
  const { id, title, content } = req.body;
  const article = await Article.findById(id);

  if (!article) {
    res.status(404);
    throw new Error("Article not found");
  }

  if (article) {
    article.title = title;
    article.content = content;
    article.save().then((a) => {
      res.send({ message: "Article was updated successfully!" });
    });
  }
});

const deleteArticle = asyncHandler(async (req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then((article) => {
      if (!article) {
        return res.status(404).send({ message: "Article not found" });
      }
      res.send({ message: "Article was deleted successfully!" });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

export {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
};
