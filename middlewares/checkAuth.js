import createError from "http-errors";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";

const { JWT_SECRET } = process.env;

export default async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  try {
    if (bearer !== "Bearer") {
      throw new createError.Unauthorized("Not authorized");
    }
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await UserModel.findById(id);
    if (!user || !user.token) {
      throw new createError.Unauthorized("Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    if (error.message === "invalid signature") {
      error.status = 401;
    }
    next(error);
  }
};
