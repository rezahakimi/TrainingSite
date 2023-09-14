import asyncHandler from "express-async-handler";
//import User from "../models/userModel.js";
import {generateToken, generateTokenWithoutCookie} from "../utils/generateToken.js";
//import Role from "../models/roleModel.js";
import db from "../models/index.js";

const User = db.user;
const Role = db.role;

// @desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//////////////////////////////////////////////////////////
const authUserWithTokenHeader = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  User.findOne({
    email: email,
  })
    .populate("roles", "-__v")
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      //var passwordIsValid = bcrypt.compareSync(password, user.password);
      if (user && (user.matchPassword(password))) {
        
       const token = generateTokenWithoutCookie(res, user._id);

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    }
    else{
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});
//////////////////////////////////////////////////////////////
// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, roles } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = new User({
    name,
    email,
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

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

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
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  authUserWithTokenHeader,
};
