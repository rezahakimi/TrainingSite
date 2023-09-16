import jwt from 'jsonwebtoken';

const generateTokenWithCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

const generateToken = (res, userId) =>{
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    algorithm: "HS256",
    allowInsecureKeySizes: true,
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
}
export {generateToken, generateTokenWithCookie};