import asyncHandler from "express-async-handler";
//import User from "../models/userModel.js";
//import Role from "../models/roleModel.js";
import db from "../models/index.js";

const User = db.user;
const Role = db.role;
const ROLES = db.ROLES;

const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().populate({
    path: "roles", match: {}, select: "name -_id"}).exec();
  if (users) {
    const myUsers = users.map((user) => {
      return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        roles: user.roles.map((role)=>role.name),
      };
    });

    res.status(200).json(myUsers);
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    //user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  getUserProfile,
  getAllUsers,
  updateUserProfile,
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
};
