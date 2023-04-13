import { body } from "express-validator";

export const postValidation = [
  body("title", "Title should be min 3 symbols").isLength({ min: 3 }),
  body("text", "Text should be min 5 symbols").isLength({ min: 5 }),
  body("imageUrl").isURL(),
];
