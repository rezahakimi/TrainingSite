import mongoose from 'mongoose';
import Role from "../models/roleModel.js";
import User from "../models/userModel.js";
import RefreshTokenModel from "../models/refreshTokenModel.js";
import Article from "../models/articleModel.js";
import ArticleCat from "../models/articleCatModel.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;
db.refreshToken  = RefreshTokenModel;
db.article = Article;
db.articleCat = ArticleCat;

db.ROLES = ["user", "admin", "moderator"];

export default db;