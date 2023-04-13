import { Router } from "express";
import { registration, login, logout } from "../controllers/user/index.js";
import { userValidation } from "../validation/auth.js";
import { ctrlWrapper, validationErrors } from "../middlewares/index.js";

const router = new Router();

router.post(
  "/registration",
  userValidation,
  validationErrors,
  ctrlWrapper(registration)
);
router.post("/login", ctrlWrapper(login));
router.post("/logout", ctrlWrapper(logout));

export default router;
