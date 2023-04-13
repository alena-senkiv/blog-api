import { Router } from "express";
import {
  getUserInfo,
  activate,
  refreshToken,
} from "../controllers/user/index.js";
import { ctrlWrapper } from "../middlewares/index.js";

const router = new Router();

router.get("/activate/:link", ctrlWrapper(activate));
router.get("/refresh", ctrlWrapper(refreshToken));
router.get("/myinfo", ctrlWrapper(getUserInfo));

export default router;
