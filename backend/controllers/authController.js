import asyncHandler from "express-async-handler";
//import User from "../models/userModel.js";
import {
  generateAccessToken,
  generateAccessTokenWithCookie,
} from "../utils/generateToken.js";
//import Role from "../models/roleModel.js";
import db from "../models/index.js";
import jwt from "jsonwebtoken";

const User = db.user;
const Role = db.role;
const RefreshToken = db.refreshToken;
const ROLES = db.ROLES;

const signup = asyncHandler(async (req, res) => {
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

  for (let i = 0; i < roles.length; i++) {
    if (!ROLES.includes(roles[i])) {
      res.status(400).send({
        message: `Failed! Role ${roles[i]} does not exist!`,
      });
      return;
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

const signinCookie = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateAccessTokenWithCookie(res, user._id);

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

const signin = asyncHandler(async (req, res) => {
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
      if (user && user.matchPassword(password)) {
        RefreshToken.findOneAndRemove(
          { user: user._id },
          {
            useFindAndModify: false,
          }
        )
          .exec()
          .then(() => {
            const token = generateAccessToken(res, user._id);
            RefreshToken.createToken(user).then((refreshToken) => {
              var authorities = [];

              for (let i = 0; i < user.roles.length; i++) {
                authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
              }

              res
                .status(200)
                .cookie("refreshToken", refreshToken, {
                  httpOnly: false,
                  sameSite: "None",
                  secure: true,
                  maxAge:
                    parseInt(process.env.AUTH_REFRESH_TOKEN_EXPIRY) * 1000, //24 * 60 * 60 * 1000,
                })
                .json({
                  id: user._id,
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: user.email,
                  phone: user.phone,
                  roles: authorities,
                  accessToken: token,
                  //refreshToken: refreshToken,
                  profileImg: user.profileImg,
                });
            });
          });
      } else {
        return res.status(401).json({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
});

const refreshToken = async (req, res) => {
  // const { refreshToken: requestToken } = req.body;

  //if (requestToken == null) {
  //  return res.status(403).json({ message: "Refresh Token is required!" });
  //}
  const cookies = req.cookies;
  const authHeader = req.header("Authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(404).send({ message: "access token error" });
  }
  const accessTokenParts = authHeader.split(" ");
  const staleAccessTkn = accessTokenParts[1];
  const decodedExpiredAccessTkn = await jwt.verify(
    staleAccessTkn,
    process.env.AUTH_ACCESS_TOKEN_SECRET,
    {
      ignoreExpiration: true,
    }
  );

  if (!cookies["refreshToken"]) {
    RefreshToken.findOneAndRemove({
      user: decodedExpiredAccessTkn.userId,
    })
      .exec()
      .then(() => {
        res.status(403).json({
          message: "Refresh Token is missing!",
        });
      });
    return;
  }
  const requestToken = cookies["refreshToken"];

  //try {
  let refreshToken = await RefreshToken.findOne({ token: requestToken });

  if (!refreshToken) {
    res.status(403).json({ message: "Refresh token is not in database!" });
    return;
  }
  //console.log(refreshToken);

  if (RefreshToken.verifyExpiration(refreshToken)) {
    RefreshToken.findByIdAndRemove(refreshToken._id, {
      useFindAndModify: false,
    })
      .exec()
      .then(() => {
        res.status(403).json({
          message:
            "Refresh token was expired. Please make a new signin request",
        });
        return;
      });
  }

  const newAccessToken = generateAccessToken(res, refreshToken.user._id);
  //jwt.sign({ id: refreshToken.user._id }, config.secret, {
  //  expiresIn: config.jwtExpiration,
  //});
  // console.log(newAccessToken);

  return res
    .status(201)
    .set({ "Cache-Control": "no-store", Pragma: "no-cache" })
    .json({
      accessToken: newAccessToken,
      // refreshToken: refreshToken.token,
    });
  //} catch (err) {
  //  return res.status(500).send({ message: err });
  // }
};

const revokeToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    RefreshToken.findByIdAndRemove(refreshToken._id, {
      useFindAndModify: false,
    })
      .exec()
      .then(() => {
        return res.status(200).json({ message: "Refresh token Revoke" });
      });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Public
const logoutUserCookie = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const logoutUser = async (req, res) => {
  const cookies = req.cookies;
  const refreshTokenCookie = cookies["refreshToken"];
  if (refreshTokenCookie == null) {
    return res.status(200).json({ message: "Refresh Token is required!" });
  }
  const refreshToken = await RefreshToken.findOne({
    token: refreshTokenCookie,
  });
  if (!refreshToken) {
    res.status(403).json({ message: "Refresh token is not in database!" });
    return;
  }

  RefreshToken.findByIdAndRemove(refreshToken._id, {
    useFindAndModify: false,
  })
    .exec()
    .then(() => {
      res.clearCookie("refreshToken", { httpOnly: true });

      res.status(200).json({ message: "Logged out successfully" });
    });

  /* res.cookie("refreshToken", "", {
    httpOnly: true,
    expires: new Date(0),
  }); */
};

export { signup, signin, refreshToken, revokeToken, logoutUser };
