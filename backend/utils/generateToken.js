import jwt from "jsonwebtoken";

const generateAccessTokenWithCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

const generateAccessToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.AUTH_ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: process.env.AUTH_ACCESS_TOKEN_EXPIRY,
  });
  return token;
};
export { generateAccessToken, generateAccessTokenWithCookie };
