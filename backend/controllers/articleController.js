import asyncHandler from "express-async-handler";
//import User from "../models/userModel.js";
//import Role from "../models/roleModel.js";
import db from "../models/index.js";
import User from "../models/userModel.js";
import ArticleCat from "../models/articleCatModel.js";
import mongoose from "mongoose";
import ArticleComment from "../models/articleCommentModel.js";

const Article = db.article;

function difference(A, B) {
  const arrA = Array.isArray(A) ? A.map((x) => x.toString()) : [A.toString()];
  const arrB = Array.isArray(B) ? B.map((x) => x.toString()) : [B.toString()];

  const result = [];
  for (const p of arrA) {
    if (arrB.indexOf(p) === -1) {
      result.push(p);
    }
  }

  return result;
}

const getAllArticles = asyncHandler(async (req, res) => {
  const myArticles = await Article.find(
    req.query.userid ? { createdUser: req.query.userid } : {}
  )
    .populate({
      path: "createdUser",
      match: {},
      select: "firstname lastname _id",
    })
    .populate({
      path: "categories",
      match: {},
      select: "title _id",
    })
    .exec();
  if (myArticles) {
    const myArticlesReturn = myArticles.map((a) => {
      return {
        id: a._id,
        title: a.title,
        content: a.content,
        abstract: a.abstract,
        createdDate: a.createdDate,
        lastModifyDate: a.lastModifyDate,
        createdUserId: a.createdUser._id,
        createdUser: a.createdUser.firstname + " " + a.createdUser.lastname,
        categories: a.categories.map((c) => {
          return {
            id: c._id,
            title: c.title,
          };
        }),
      };
    });

    res.status(200).json({ articlesData: myArticlesReturn });
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

const getAllArticlesWithSearch = asyncHandler(async (req, res) => {
  //const { title, content, userid, categories } = req.body;
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5;
  const pageNumber = req.query.page ? parseInt(req.query.page) : 1;
  const search = req.query.search;
  const displayType = req.query.displayType;
  let latestOrderBy = 1;
  let topOrderBy = 1;
  var cSort = {};
  if (displayType === "latest") {
    cSort = { createdDate: -1 };
  } else if (displayType === "top") {
    cSort = { iLikes: -1 };
  }
  //console.log(pageSize);
  /* const articles = await Article.aggregate([
    {
      $facet: {
        metadata: [{ $count: 'totalCount' }],
        data: [{ $skip: (pageNumber - 1) * pageSize }, { $limit: pageSize }],
      },
    },
  ]); 
  
  return res.status(200).json({
      success: true,
      articles: {
        metadata: { totalCount: articles[0].metadata[0].totalCount, page, pageSize },
        data: articles[0].data,
      },
    });
    
    */

  let articlesCount = await Article.count({
    $or: [
      /*{},*/
      {
        title: { $regex: ".*" + search + ".*", $options: "i" },
      },
      {
        abstract: { $regex: ".*" + search + ".*", $options: "i" },
      },
    ],
  });
  const myArticles = await Article.find({
    $or: [
      /*{},*/
      {
        title: { $regex: ".*" + search + ".*", $options: "i" },
      },
      {
        abstract: { $regex: ".*" + search + ".*", $options: "i" },
      },
    ],
  })
    .sort(cSort)
    .skip(pageNumber * pageSize)
    .limit(pageSize)
    .populate({
      path: "createdUser",
      match: {},
      select: "firstname lastname _id",
    })
    .populate({
      path: "categories",
      match: {},
      select: "title _id",
    })
    .exec();
  if (myArticles) {
    const myArticlesReturn = myArticles.map((a) => {
      return {
        id: a._id,
        title: a.title,
        content: a.content,
        abstract: a.abstract,
        createdDate: a.createdDate,
        lastModifyDate: a.lastModifyDate,
        createdUserId: a.createdUser._id,
        createdUser: a.createdUser.firstname + " " + a.createdUser.lastname,
        categories: a.categories.map((c) => {
          return {
            id: c._id,
            title: c.title,
          };
        }),
        iLikesCount: a.iLikes.length,
      };
    });

    res
      .status(200)
      .json({ articlesData: myArticlesReturn, artilcesCount: articlesCount });
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

const getAllArticlesByCategoryWithSearch = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5;
  const pageNumber = req.query.page ? parseInt(req.query.page) : 1;
  const search = req.query.search;
  const displayType = req.query.displayType;
  var cSort = {};
  if (displayType === "latest") {
    cSort = { createdDate: -1 };
  } else if (displayType === "top") {
    cSort = { iLikes: -1 };
  }
  let articlesCount = await Article.count({
    $and: [
      {
        categories: new mongoose.Types.ObjectId(req.params.id),
      },
      {
        $or: [
          /*{},*/
          {
            title: { $regex: ".*" + search + ".*", $options: "i" },
          },
          {
            abstract: { $regex: ".*" + search + ".*", $options: "i" },
          },
        ],
      },
    ],
  });

  const myArticles = await Article.find({
    $and: [
      {
        categories: new mongoose.Types.ObjectId(req.params.id),
      },
      {
        $or: [
          /*{},*/
          {
            title: { $regex: ".*" + search + ".*", $options: "i" },
          },
          {
            abstract: { $regex: ".*" + search + ".*", $options: "i" },
          },
        ],
      },
    ],
  })
    .sort(cSort)
    .skip(pageNumber * pageSize)
    .limit(pageSize)
    .populate({
      path: "createdUser",
      match: {},
      select: "firstname lastname -_id",
    })
    .populate({
      path: "categories",
      match: { _id: req.params.cat },
      select: "title _id",
    })
    .exec();
  if (myArticles) {
    const myArticlesReturn = myArticles.map((a) => {
      return {
        id: a._id,
        title: a.title,
        content: a.content,
        abstract: a.abstract,
        createdDate: a.createdDate,
        lastModifyDate: a.lastModifyDate,
        createdUserId: a.createdUser._id,
        createdUser: a.createdUser.firstname + " " + a.createdUser.lastname,
        categories: a.categories.map((c) => {
          return {
            id: c._id,
            title: c.title,
          };
        }),
        iLikesCount: a.iLikes.length,
      };
    });

    res
      .status(200)
      .json({ articlesData: myArticlesReturn, artilcesCount: articlesCount });
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

const getArticleById = asyncHandler(async (req, res) => {
  //console.log(req.params.id);
  if (!req.params.id) res.send("Params Empty!");
  const a = await Article.findById(req.params.id)
    .populate({
      path: "createdUser",
      match: {},
      select: "firstname lastname _id", //"name -_id",
    })
    .populate({
      path: "categories",
      match: { _id: req.params.cat },
      select: "title _id",
    })
    .exec();
  if (a) {
    const myArticle = {
      id: a._id,
      content: a.content,
      abstract: a.abstract,
      title: a.title,
      createdDate: a.createdDate,
      lastModifyDate: a.lastModifyDate,
      createdUserId: a.createdUser._id,
      createdUser: a.createdUser.firstname + " " + a.createdUser.lastname,
      categories: a.categories.map((c) => {
        return {
          id: c._id,
          title: c.title,
        };
      }),
      iLikes: a.iLikes.map((il) => {
        return {
          id: il._id,
          userId: il.iLikeId,
          userLikeLastModify: il.iLikeLastModify,
        };
      }),
    };

    res.status(200).json(myArticle);
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

const createArticle = asyncHandler(async (req, res) => {
  try {
    const { title, abstract, content, userid, categories } = req.body;

    const user = await User.findById(userid);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    const article = new Article({
      title,
      content,
      abstract,
      lastModifyDate: Date.now(),
      createdUser: user._id,
      categories: categories,
    });
    await article.save();

    user.articles.push(article);
    await user.save();
    await ArticleCat.updateMany(
      { _id: article.categories },
      { $push: { articles: article._id } }
    );
    res.send({ message: "Article was Added successfully!" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

const updateArticle = asyncHandler(async (req, res) => {
  const { id, title, abstract, content, userid, categories } = req.body;
  const article = await Article.findById(id);

  if (!article) {
    res.status(404);
    throw new Error("Article not found");
  }

  const user = await User.findById(userid);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (article) {
    const oldcategories = article.categories;
    article.title = title;
    article.content = content;
    article.abstract = abstract;
    article.createdUser = userid;
    article.categories = categories;

    await article.save();

    if (oldcategories.length > 0) {
      const added = difference(categories, oldcategories);
      const removed = difference(oldcategories, categories);

      await ArticleCat.updateMany(
        { _id: added },
        { $addToSet: { articles: article._id } }
      );
      await ArticleCat.updateMany(
        { _id: removed },
        { $pull: { articles: article._id } }
      );
    } else {
      await ArticleCat.updateMany(
        { _id: categories },
        { $addToSet: { articles: article._id } }
      );
    }

    res.send({ message: "Article was updated successfully!" });
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
    await Article.findByIdAndDelete(articleId);
    await User.findByIdAndUpdate(user._id, {
      $pull: { articles: articleId },
    });
    await ArticleCat.updateMany(
      { _id: article.categories },
      { $pull: { articles: article._id } }
    );
    /* Article.findByIdAndDelete(req.params.id)
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

const iLikeArticle = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const articleId = req.params.id;

  const artilce = await Article.findById(articleId);
  if (!artilce) {
    res.status(404);
    throw new Error("Article not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await artilce.iLikes.map((il) => {
    if (il.iLikeId.toString() === userId) {
      res.status(404);
      throw new Error("User allready like");
    }
  });

  await Article.updateOne(
    { _id: articleId },
    {
      $push: {
        iLikes: {
          iLikeId: userId,
          iLikeLastModify: Date.now(),
        },
      },
    }
  );

  await Article.updateOne(
    { _id: articleId },
    { $pull: { iDisLikes: { iDisLikeId: userId } } }
  );
  res.status(200).send({ message: "User was updated successfully!" });
});

const iDisLikeArticle = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const articleId = req.params.id;

  const artilce = await Article.findById(articleId);
  if (!artilce) {
    res.status(404);
    throw new Error("Article not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await artilce.iDisLikes.map((il) => {
    if (il.iDisLikeId.toString() === userId) {
      res.status(404);
      throw new Error("User allready like");
    }
  });

  await Article.updateOne(
    { _id: articleId },
    { $pull: { iLikes: { iLikeId: userId } } }
  );

  await Article.updateOne(
    { _id: articleId },
    {
      $push: {
        iDisLikes: {
          iDisLikeId: userId,
          iDisLikeLastModify: Date.now(),
        },
      },
    }
  );

  res.status(200).send({ message: "User was updated successfully!" });
});

const getUsersLikeArticle = asyncHandler(async (req, res) => {
  const articleId = req.params.id;

  const article = await Article.findById(articleId);
  if (!article) {
    res.status(404);
    throw new Error("Article not found");
  }

  const myUsersLike = await Promise.all(
    article.iLikes.map(async (il) => {
      const u = await User.findById(il.iLikeId)
        // .select("_id firstname lastname email phone profileImg")
        .exec();

      return {
        id: u._id,
        firstname: u.firstname,
        lastname: u.lastname,
        email: u.email,
        phone: u.phone,
        profileImg: u.profileImg,
      };
    })
  ).then((values) => values.filter((v) => v));

  res.status(200).json(myUsersLike);
});

const getUsersDisLikeArticle = asyncHandler(async (req, res) => {
  const articleId = req.params.id;

  const article = await Article.findById(articleId);
  if (!article) {
    res.status(404);
    throw new Error("Article not found");
  }

  const myUsersDisLike = await Promise.all(
    article.iDisLikes.map(async (il) => {
      const u = await User.findById(il.iDisLikeId)
        // .select("_id firstname lastname email phone profileImg")
        .exec();

      return {
        id: u._id,
        firstname: u.firstname,
        lastname: u.lastname,
        email: u.email,
        phone: u.phone,
        profileImg: u.profileImg,
      };
    })
  ).then((values) => values.filter((v) => v));

  res.status(200).json(myUsersDisLike);
});

const getUserLikeArticle = asyncHandler(async (req, res) => {
  const userId = req.params.userid;
  const articleId = req.params.articleid;

  const article = await Article.findById(articleId);
  if (!article) {
    res.status(404);
    throw new Error("Article not found");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const articleiLikes = //article.iLikes.map(il => book.title)
    await Article.find({
      _id: articleId,
      "iLikes.iLikeId": userId,
    }).exec();
  res.status(200).json(articleiLikes.iLikes);
});

const getArticlesWithNotAcceptPost = asyncHandler(async (req, res) => {
  const userId = req.params.userid;

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const articles = await Article.find({ createdUser: userId });

  const myNotAcceptPost = await Promise.all(
    articles.map(async (a) => {
      //const mya = await Article.findById(a.id)
      return {
        articleId: a._id,
        articleTitle: a.title,
        comments: await Promise.all(
          a.comments.map(async (c) => {
            const ac = await ArticleComment.findOne({
              _id: c._id,
              accept: false,
              deleted: false,
            }).exec();
            if (ac)
              return {
                id: ac._id,
                Comment: ac.comment,
                commentCreatedDate: ac.commentCreatedDate,
                accept: ac.accept,
              };
          })
        ).then((values) => values.filter((v) => v)),
      };
    })
  ).then((values) => values.filter((v) => v));

  res.status(200).json(myNotAcceptPost);
});

export {
  createArticle,
  deleteArticle,
  getAllArticles,
  getAllArticlesWithSearch,
  getArticleById,
  updateArticle,
  getAllArticlesByCategoryWithSearch,
  iLikeArticle,
  iDisLikeArticle,
  getUsersLikeArticle,
  getUsersDisLikeArticle,
  getUserLikeArticle,
  getArticlesWithNotAcceptPost,
};
