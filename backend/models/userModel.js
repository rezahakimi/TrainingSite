import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    profileImg: {
      type: String,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
      },
    ],
    articles: [{ type: mongoose.Types.ObjectId, ref: "Article" }],
    friends: [
      {
        friendId: { type: mongoose.Types.ObjectId, ref: "User" },
        iAapplied: {
          //من درخواست داده ام
          type: Boolean,
        },
        confirmRequest: {
          type: Boolean,
        },
        friendRequestDate: {
          type: Date,
        },
        friendAcceptDate: {
          type: Date,
        },
      },
    ],
    comments: [{ type: mongoose.Types.ObjectId, ref: "ArticleComment" }],
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);

export default User;
