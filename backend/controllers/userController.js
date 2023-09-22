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
  const users = await User.find()
    .populate({
      path: "roles",
      match: {},
      select: "name -_id",
    })
    .exec();
  if (users) {
    const myUsers = users.map((user) => {
      return {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        roles: user.roles.map((role) => role.name),
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

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone, password, roles } = req.body;

  const userExistsEmail = await User.findOne({ email });

  if (userExistsEmail) {
    res.status(400);
    throw new Error("User Email already exists");
  }

  const userExistsPhone = await User.findOne({ phone });

  if (userExistsPhone) {
    res.status(400);
    throw new Error("User Phone already exists");
  }

  if (roles) {
    for (let i = 0; i < roles.length; i++) {
      if (!ROLES.includes(roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${roles[i]} does not exist!`,
        });
        return;
      }
    }
  }

  const user = new User({
    firstname,
    lastname,
    email,
    phone,
    password,
  });

  user.save().then((user) => {
    if (roles) {
      Role.find({
        name: { $in: roles },
      })
        .then((mroles) => {
          user.roles = mroles.map((role) => role._id);
          user
            .save()
            .then(res.send({ message: "User was registered successfully!" }));
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
    } else {
      Role.findOne({ name: "user" }).then((mrole) => {
        user.roles = [mrole._id];
        user
          .save()
          .then(res.send({ message: "User was registered successfully!" }));
      });
    }
  });
  ////////////////////
  /*   if (user) {
      generateToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    } */
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
  registerUser,
  getUserProfile,
  getAllUsers,
  updateUserProfile,
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
};
