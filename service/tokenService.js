import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import TokenModel from "../models/Token.js";

dotenv.config();
const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;

export const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
  return { accessToken, refreshToken };
};

export const saveToken = async (userId, refreshToken) => {
  const tokenData = await TokenModel.findOne({ user: userId });
  if (tokenData) {
    tokenData.refreshToken = refreshToken;
    return tokenData.save();
  }

  return await TokenModel.create({ user: userId, refreshToken });
};
