import dotenv from "dotenv";
import UserModel from "../../models/User.js";

dotenv.config();
const { CLIENT_URL } = process.env;

export default async (req, res) => {
  const activationLink = req.params.link;

  console.log(activationLink);

  const user = await UserModel.findOne({ activationLink });
  if (!user) {
    throw new Error("Activation link is incorrect");
  }

  console.log(user);

  user.isActivated = true;
  await user.save();

  console.log(user.isActivated);

  return res.redirect(CLIENT_URL);
};
