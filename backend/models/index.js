import mongoose from 'mongoose';
import Role from "../models/roleModel.js";
import User from "../models/userModel.js";
import RefreshTokenModel from "../models/refreshTokenModel.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;
db.refreshToken  = RefreshTokenModel;

db.ROLES = ["user", "admin", "moderator"];

export default db;