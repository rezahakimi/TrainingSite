import mongoose from "mongoose";

const ArticleCatSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const ArticleCat = mongoose.model("ArticleCat", ArticleCatSchema);

export default ArticleCat;
