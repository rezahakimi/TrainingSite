import asyncHandler from "express-async-handler";
//import User from "../models/userModel.js";
//import Role from "../models/roleModel.js";
import db from "../models/index.js";
import pathConfig from "../config/pathConfig.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";

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
        friendsCount: user.friends.length,
        articlesCount: user.articles.length,
      };
    });

    res.status(200).json(myUsers);
  } else {
    res.status(404);
    throw new Error("Users not found");
  }
});
const getAllUsersWithSearch = asyncHandler(async (req, res) => {
  const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 5;
  const pageNumber = req.query.page ? parseInt(req.query.page) : 1;
  const search = req.query.search;
  const displayType = req.query.displayType;
  var cSort = {};

  if (displayType === "latest") {
    cSort = { createdDate: -1 };
  } else if (displayType === "top") {
    cSort = { iLikes: -1 };
  }
  let myUsersCount = await User.count({
    $or: [
      /*{},*/
      {
        firstname: { $regex: ".*" + search + ".*", $options: "i" },
      },
      {
        lastname: { $regex: ".*" + search + ".*", $options: "i" },
      },
    ],
  });
  const myUsers = await User.find({
    $or: [
      /*{},*/
      {
        firstname: { $regex: ".*" + search + ".*", $options: "i" },
      },
      {
        lastname: { $regex: ".*" + search + ".*", $options: "i" },
      },
    ],
  })
    .sort(cSort)
    .skip(pageNumber * pageSize)
    .limit(pageSize)
    .populate({
      path: "roles",
      match: {},
      select: "name -_id",
    })
    .exec();
  if (myUsers) {
    const myUserssReturn = myUsers.map((user) => {
      return {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        roles: user.roles.map((role) => role.name),
        friendsCount: user.friends.length,
        articlesCount: user.articles.length,
      };
    });

    res
      .status(200)
      .json({ usresData: myUserssReturn, usersCount: myUsersCount });
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

  /*const userFriends = await User.findById(id)
    // .populate({
    //   path: "friends.friendId",
    //   match: { confirmRequest: true },
    //    select:
    //      "firstname _id lastname email phone profileImg iAapplied confirmRequest friendRequestDate friendAcceptDate", //"name -_id",
    // })

      .aggregate([
      {
        $lookup: {
          from: "User",
          localField: "_id",
          foreignField: "friends.friendId",
          as: "ad",
        },
      }, */

  /*     {
        $project: {
          _id: 0,
          firstname: 1,
          friends: {
            $map: {
              input: "$friends",
              as: "reply",
              in: {
                id: "$$reply.friendId",
              },
            },
          },
        },
      }, */

  /* ]) 
    .exec();*/

  //console.log(userFriends);
  const myFriendss = await Promise.all(
    user.friends.map(async (u) => {
      if (u.confirmRequest) {
        const d = await User.findById(u.friendId)
          // .select("_id firstname lastname email phone profileImg")
          .exec();

        return {
          id: d._id,
          firstname: d.firstname,
          lastname: d.lastname,
          email: d.email,
          phone: d.phone,
          profileImg: d.profileImg,
          iAapplied: u.iAapplied,
          confirmRequest: u.confirmRequest,
          friendRequestDate: u.friendRequestDate,
          friendAcceptDate: u.friendAcceptDate,
        };
      }
    })
  ).then((values) => values.filter((v) => v));
  res.status(200).json(myFriendss);
});

const getRequestFriends = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  /*   const userFriends = await User.findById(id)
    .populate({
      path: "friends",
      match: { iAapplied: false, confirmRequest: false },
      select:
        "firstname _id lastname email phone profileImg iAapplied confirmRequest friendRequestDate friendAcceptDate", //"name -_id",
    })
    .exec(); */

  const myFriendss = await Promise.all(
    user.friends.map(async (u) => {
      if (!u.confirmRequest && !u.iAapplied) {
        const d = await User.findById(u.friendId)
          // .select("_id firstname lastname email phone profileImg")
          .exec();

        return {
          id: d._id,
          firstname: d.firstname,
          lastname: d.lastname,
          email: d.email,
          phone: d.phone,
          profileImg: d.profileImg,
          iAapplied: u.iAapplied,
          confirmRequest: u.confirmRequest,
          friendRequestDate: u.friendRequestDate,
          friendAcceptDate: u.friendAcceptDate,
        };
      }
    })
  ).then((values) => values.filter((v) => v));

  res.status(200).json(myFriendss);
});

const requestFriend = asyncHandler(async (req, res) => {
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

  await user.friends.map((f) => {
    if (f.friendId.toString() === friendId) {
      res.status(404);
      throw new Error("friend allready exist");
    }
  });

  await User.updateOne(
    { _id: id },
    {
      $push: {
        friends: {
          friendId: friend._id,
          iAapplied: true,
          confirmRequest: false,
          friendRequestDate: Date.now(),
          friendAcceptDate: Date.now(),
        },
      },
    }
  );

  await User.updateOne(
    { _id: friendId },
    {
      $push: {
        friends: {
          friendId: user._id,
          iAapplied: false,
          confirmRequest: false,
          friendRequestDate: Date.now(),
          friendAcceptDate: Date.now(),
        },
      },
    }
  );
  res.status(200).send({ message: "User was updated successfully!" });
});

const acceptFriend = asyncHandler(async (req, res) => {
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

  await User.updateOne(
    { _id: id, "friends.friendId": friendId },
    {
      $set: {
        "friends.$.confirmRequest": true,
        "friends.$.friendAcceptDate": Date.now(),
      },
    }
  );

  await User.updateOne(
    { _id: friendId, "friends.friendId": id },
    {
      $set: {
        "friends.$.confirmRequest": true,
        "friends.$.friendAcceptDate": Date.now(),
      },
    }
  );

  res.status(200).send({ message: "User was updated successfully!" });
});

const rejectFriend = asyncHandler(async (req, res) => {
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

  if (!userFriend) {
    res.status(404);
    throw new Error("userFriend not found");
  }

  await User.updateOne(
    { _id: id },
    { $pull: { friends: { friendId: friendId } } }
  );
  await User.updateOne(
    { _id: friendId },
    { $pull: { friends: { friendId: id } } }
  );

  res.status(200).send({ message: "User was updated successfully!" });
});

export {
  registerUser,
  deleteUser,
  getAllUsersWithSearch,
  getAllUsers,
  getUserById,
  updateUser,
  changePasswordUser,
  getAllRoles,
  getFriends,
  getRequestFriends,
  acceptFriend,
  requestFriend,
  rejectFriend,
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
};
