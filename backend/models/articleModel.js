import mongoose from "mongoose";

const ArticleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    abstract: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    lastModifyDate: {
      type: Date,
    },
    createdUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ArticleCat",
      },
    ],
    iLikes: [
      {
        iLikeId: { type: mongoose.Types.ObjectId, ref: "User" },
        iLikeLastModify: { type: Date },
      },
    ],
    iDisLikes: [
      {
        iDisLikeId: { type: mongoose.Types.ObjectId, ref: "User" },
        iDisLikeLastModify: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
