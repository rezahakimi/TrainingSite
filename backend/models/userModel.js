import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/* 
1. CREATE USER SCHEMA
*/
const UserSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
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

/* 
2. SET SCHEMA OPTION
*/
UserSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    delete ret.password;
    //delete ret.tokens;
    return ret;
  },
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

/* 
3. ATTACH MIDDLEWARE
*/
// Encrypt password using bcrypt
UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

/* 
4. ATTACH CUSTOM STATIC METHODS
*/
/*
UserSchema.statics.findByCredentials = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user)
      throw new CustomError(
          "Wrong credentials!",
          400,
          "Email or password is wrong!"
      );
  const passwdMatch = await bcrypt.compare(password, user.password);
  if (!passwdMatch)
      throw new CustomError(
          "Wrong credentials!!",
          400,
          "Email or password is wrong!"
      );
  return user;
};
*/

/* 
5. ATTACH CUSTOM INSTANCE METHODS
*/
/*
UserSchema.methods.generateAccessToken = function () {
  const user = this;

  // Create signed access token
  const accessToken = jwt.sign(
      {
          _id: user._id.toString(),
          fullName: `${user.firstName} ${user.lastName}`,
          email: user.email,
      },
      ACCESS_TOKEN.secret,
      {
          expiresIn: ACCESS_TOKEN.expiry,
      }
  );

  return accessToken;
};
*/

/* 
6. COMPILE MODEL FROM SCHEMA
*/
const User = mongoose.model("User", UserSchema);

export default User;
