import mongoose from "mongoose";

const ArticleCatSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article",
      },
    ],
  },
 
  {
    timestamps: true,
  }
);

const ArticleCat = mongoose.model("ArticleCat", ArticleCatSchema);

export default ArticleCat;
