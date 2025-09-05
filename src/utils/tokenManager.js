/* eslint-disable no-unused-vars */
const jwt = require("jsonwebtoken");
const InvariantError = require("../exceptions/InvariantError");

const createTokenManager = ({ accessTokenKey, refreshTokenKey }) => {
  const generateAccessToken = (payload) => {
    return jwt.sign(payload, accessTokenKey, { expiresIn: "15m" });
  };

  const generateRefreshToken = (payload) => {
    return jwt.sign(payload, refreshTokenKey, { expiresIn: "7d" });
  };

  const verifyAccessToken = (token) => {
    try {
      return jwt.verify(token, accessTokenKey);
    } catch (error) {
      throw new InvariantError("Access token is invalid.");
    }
  };

  const verifyRefreshToken = (token) => {
    try {
      return jwt.verify(token, refreshTokenKey);
    } catch (error) {
      throw new InvariantError("Refresh token is invalid.");
    }
  };

  return {
    generateAccessToken, 
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
  };
};

module.exports = createTokenManager;