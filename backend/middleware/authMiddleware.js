import jwt from "jsonwebtoken";
import db from "../models/index.js";
import RefreshToken from "../models/refreshTokenModel.js";

const User = db.user;
const Role = db.role;

const { TokenExpiredError } = jwt;

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized! Access Token was expired!" });
  }

  return res.sendStatus(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  //let token = req.headers["x-access-token"];
  const authHeader = req.header("Authorization");
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).send({ message: "bearer token is not valid." });

  const accessTokenParts = authHeader.split(" ");
  const token = accessTokenParts[1];
  if (!token) {
    return res.status(401).send({ message: "No token provided!" });
  }

  const cookies = req.cookies;
  if (!cookies["refreshToken"]) {
    return res.status(403).send({ message: "No refresh token provided!" });
  }
  jwt.verify(token, process.env.AUTH_ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return catchError(err, res);
    }
    RefreshToken.findOne({ user: decoded.userId }).then((refreshToken) => {
      if (refreshToken == null) {
        return res
          .status(403)
          .send({ message: "Unauthorized! Not refresh token" });
      }
      User.findById(decoded.userId).then((user) => {
        if (!user) {
          res.status(403).send({ message: "Unauthorized! User not found" });
        }
      });
      req.userId = decoded.userId;
      next();
    });
  });
};

const isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .exec()
    .then((user) => {
      Role.find({
        _id: { $in: user.roles },
      })
        .then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }

          res.status(403).send({ message: "Require Admin Role!" });
          return;
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

const isModerator = (req, res, next) => {
  User.findById(req.userId)
    .exec()
    .then((user) => {
      Role.find({
        _id: { $in: user.roles },
      })
        .then((roles) => {
          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }

          res.status(403).send({ message: "Require Moderator Role!" });
          return;
        })
        .catch((err) => {
          res.status(500).send({ message: err });
        });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

export { verifyToken, isAdmin, isModerator };
