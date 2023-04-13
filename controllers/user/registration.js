import createError from "http-errors";
import { v4 } from "uuid";
import dotenv from "dotenv";
import UserModel from "../../models/User.js";
import mailService from "../../service/mailService.js";
import { generateTokens, saveToken } from "../../service/tokenService.js";

dotenv.config();

export default async (req, res) => {
  const { userName, email, password } = req.body;
  const activationLink = v4();

  const user = await UserModel.findOne({ email });
  if (user) {
    throw new createError.Conflict(`Email ${email} is already exists`);
  }

  const newUser = new UserModel({ userName, email, activationLink });
  newUser.setPassword(password);
  await newUser.save();

  const userId = newUser._id;
  const tokens = generateTokens({ id: userId });
  await saveToken(userId, tokens.refreshToken);

  res.cookie("refreshToken", tokens.refreshToken, {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });

  await mailService(
    email,
    `${process.env.API_URL}/users/activate/${activationLink}`
  );

  res.status(201).json({
    success: true,
    data: {
      userName,
      email,
      ...tokens,
    },
  });
};
