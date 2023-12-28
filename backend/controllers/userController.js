import asyncHandler from "express-async-handler";
//import User from "../models/userModel.js";
//import Role from "../models/roleModel.js";
import db from "../models/index.js";
import pathConfig from "../config/pathConfig.js";
import fs from "fs";
import path from "path";

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
        id: user._id,
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
const getUserById = asyncHandler(async (req, res) => {
  //console.log(req.params.id);
  const user = await User.findById(req.params.id)
    .populate({
      path: "roles",
      match: {},
      select: "name _id", //"name -_id",
    })
    .exec();
  if (user) {
    const myUsers = {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      roles: user.roles.map((role) => {
        const container = {};
        container.id = role._id;
        container.name = role.name;
        //console.log(container);
        return container;
      }),
      profileImg: user.profileImg,
    };

    res.status(200).json(myUsers);
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
/* const getUserProfile = asyncHandler(async (req, res) => {
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
}); */

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, phone, password, roles } = req.body;
  const imageFileName = req.file ? req.file.filename : null;
  console.log(imageFileName);
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
    profileImg: imageFileName,
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

const updateUser = asyncHandler(async (req, res) => {
  //console.log(req.body);
  const { id, firstname, lastname, phone, roles, changeimage } = req.body;
  //console.log(req.file);
  const imageFileName = req.file ? req.file.filename : null;
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  let prevImageFileName = user.profileImg;

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

  if (user) {
    user.lastname = lastname;
    user.firstname = firstname;
    user.phone = phone;
    if (changeimage === "yes") user.profileImg = imageFileName;

    user.save().then((user) => {
      //console.log(user)
      if (roles) {
        Role.find({
          name: { $in: roles },
        })
          .then((mroles) => {
            user.roles = mroles.map((role) => role._id);
            user.save();
            // .then(res.send({ message: "User was updated successfully!" }));
          })
          .catch((err) => {
            res.status(500).send({ message: err });
          });
      } else {
        Role.findOne({ name: "user" }).then((mrole) => {
          user.roles = [mrole._id];
          user.save();
          // .then(res.send({ message: "User was updated successfully!" }));
        });
      }
      //  console.log(pathConfig.imageProliePath);
      if (prevImageFileName && changeimage === "yes")
        fs.unlink(
          path.join(
            pathConfig.staticFolder +
              "/" +
              pathConfig.imageProliePath +
              prevImageFileName
          ),
          (err) => {
            if (err) console.log(err);
            else {
              console.log("\nDeleted file: example_file.txt");
            }
          }
        );
      res.status(200).json(user);
    });
  }
});

const changePasswordUser = asyncHandler(async (req, res) => {
  const { id, password, confirmpassword } = req.body;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  if (user) {
    if (password === confirmpassword) {
      user.password = password;

      user.save().then((user) => {
        res.status(200).json(user);
      });
    }
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send({ message: "User was deleted successfully!" });
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

const getAllRoles = asyncHandler(async (req, res) => {
  const roles = await Role.find().exec();
  if (roles) {
    const myRoless = roles.map((role) => {
      return {
        id: role._id,
        name: role.name,
      };
    });

    res.status(200).json(myRoless);
  } else {
    res.status(404);
    throw new Error("Roless not found");
  }
});

const getFriends = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const userFriends = await User.findById(id)
    .populate({
      path: "friends",
      match: {},
      select: "firstname _id lastname email phone profileImg", //"name -_id",
    })
    .exec();

  const myFriendss = userFriends.friends.map((u) => {
    return {
      id: u._id,
      firstname: u.firstname,
      lastname: u.lastname,
      email: u.email,
      phone: u.phone,
      profileImg: u.profileImg,
    };
  });

  res.status(200).json(myFriendss);
});

const addFriend = asyncHandler(async (req, res) => {
  const { friendId } = req.body;
  const id = req.params.id;
  if (id === friendId) {
    res.status(404);
    throw new Error("User Not be friend");
  }

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const friend = await User.findById(friendId);
  if (!friend) {
    res.status(404);
    throw new Error("friend not found");
  }
  await User.updateOne({ _id: id }, { $push: { friends: friend._id } });
  1;

  res.send({ message: "User was updated successfully!" });
});

const removeFriend = asyncHandler(async (req, res) => {
  const { friendId } = req.body;
  const id = req.params.id;
  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const friend = await User.findById(friendId);
  if (!friend) {
    res.status(404);
    throw new Error("friend not found");
  }

  const userFriend = User.find({
    friends: { _id: friendId },
  });
  console.log(userFriend);
  if (!userFriend) {
    res.status(404);
    throw new Error("userFriend not found");
  }

  await User.updateOne({ _id: id }, { $pull: { friends: friend._id } });

  res.send({ message: "User was updated successfully!" });
});

export {
  registerUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  changePasswordUser,
  getAllRoles,
  getFriends,
  addFriend,
  removeFriend,
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
};
