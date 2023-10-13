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
      select: "firstname lastname -_id",
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
        createdUserId: article.createdUser._id,
        createdUser: article.createdUser.firstname + " " + article.createdUser.lastname,
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
      id: article._id,
      content: article.content,
      title: article.title,
      createdDate: article.createdDate,
      lastModifyDate: article.lastModifyDate,
      createdUserId: article.createdUser._id,
      createdUser: article.createdUser.firstname + " " + article.createdUser.lastname,
    };

    res.status(200).json(myArticle);
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

const createArticle = asyncHandler(async (req, res) => {
  try {
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
    await article.save();

    user.articles.push(article);
    await user.save();
    res.send({ message: "Article was Added successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
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
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).send({ message: "Article not found" });
    }
    const articleId = article._id;
    const user = await User.findById(article.createdUser);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    await Article.findByIdAndDelete(articleId );
    await User.findByIdAndUpdate(user._id, {
      $pull: { articles: articleId },
  });    /* Article.findByIdAndDelete(req.params.id)
    .then((article) => {
      
    })
    .catch((error) => {
      res.status(500).
      send(error);
    }); */
    res.send({ message: "Article was deleted successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

export {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
};
