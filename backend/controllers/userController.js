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
      select: "name _id",//"name -_id",
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
        container.id= role._id;
        container.name= role.name;
        //console.log(container);
        return container;
      }),
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

const updateUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { id, firstname, lastname, phone, roles } = req.body;
  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
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

  if (user) {
    user.lastname = lastname;
    user.firstname = firstname;
    user.phone = phone;
    user.save().then((user) => {
      //console.log(user)
      if (roles) {
        Role.find({
          name: { $in: roles },
        })
          .then((mroles) => {
            user.roles = mroles.map((role) => role._id);
            user
              .save()
              .then(res.send({ message: "User was updated successfully!" }));
          })
          .catch((err) => {
            res.status(500).send({ message: err });
          });
      } else {
        Role.findOne({ name: "user" }).then((mrole) => {
          user.roles = [mrole._id];
          user
            .save()
            .then(res.send({ message: "User was updated successfully!" }));
        });
      }
    });
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

export {
  registerUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  getAllRoles,
  allAccess,
  userBoard,
  moderatorBoard,
  adminBoard,
};
