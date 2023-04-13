import createError from "http-errors";
import jwt from "jsonwebtoken";
import TokenModel from "../../models/Token.js";
import { generateTokens, saveToken } from "../../service/tokenService.js";

const { JWT_REFRESH_SECRET } = process.env;

export default async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    throw new createError.Unauthorized();
  }

  const data = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

  const tokenFromDb = await TokenModel.findOne({ refreshToken });

  if (!data || !tokenFromDb) {
    throw new createError.Unauthorized();
  }

  const tokens = generateTokens({ id: data.id });
  await saveToken(data.id, tokens.refreshToken);

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
};
