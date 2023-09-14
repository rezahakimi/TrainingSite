import mongoose from 'mongoose';
import Role from "../models/roleModel.js";
import User from "../models/userModel.js";

mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;

db.ROLES = ["user", "admin", "moderator"];

export default db;