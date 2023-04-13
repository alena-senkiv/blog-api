import { Router } from "express";
import {
  create,
  update,
  remove,
  getAll,
  getOne,
} from "../controllers/post/index.js";
import { postValidation } from "../validation/post.js";
import { ctrlWrapper, validationErrors } from "../middlewares/index.js";

const router = new Router();

router.post("/", postValidation, validationErrors, ctrlWrapper(create));
router.delete("/:id", ctrlWrapper(remove));
router.patch("/:id", ctrlWrapper(update));
router.get("/", ctrlWrapper(getAll));
router.get("/:id", ctrlWrapper(getOne));

export default router;
