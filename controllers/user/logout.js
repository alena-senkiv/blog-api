import TokenModel from "../../models/Token.js";

export default async (req, res) => {
  const { refreshToken } = req.cookies;

  await TokenModel.deleteOne({ refreshToken });
  await res.clearCookie("refreshToken");

  res.status(200).json({
    success: true,
  });
};
