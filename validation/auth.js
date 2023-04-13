import { body } from "express-validator";

export const userValidation = [
  body("email", "Email should be a type of 'email'").isEmail(),
  body("password", "Password should be min 6 symbols").isLength({
    min: 6,
  }),
  body("userName", "Name should be min 6 symbols").isLength({ min: 3 }),
];
