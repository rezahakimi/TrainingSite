import mongoose from "mongoose";

const ArticleCommentSchema = mongoose.Schema(
  {
    articleId: { type: mongoose.Types.ObjectId, ref: "Article" },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    /* comments: [
      {
        commentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "ArticleComment",
        },
        comment: {
          type: String,
        },
      },
    ], */
    comment: {
      type: String,
    },
    commentCreatedDate: { type: Date },
    accept: {
      type: Boolean,
    },
  },

  {
    timestamps: true,
  }
);

const ArticleComment = mongoose.model("ArticleComment", ArticleCommentSchema);

export default ArticleComment;
