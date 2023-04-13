import createError from "http-errors";
import UserModel from "../../models/User.js";
import { generateTokens, saveToken } from "../../service/tokenService.js";

export default async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user || !user.comparePassword(password)) {
    throw new createError.Unauthorized("Email or password is wrong");
  }

  const { _id, userName } = user;

  const tokens = generateTokens({ id: _id });
  await saveToken(_id, tokens.refreshToken);

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    data: {
      userName,
      email,
      ...tokens,
    },
  });
};
