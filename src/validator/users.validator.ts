import { check, body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { User } from "../model/User";

const createUser = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .trim()
    .isLength({ min: 6, max: 20 })
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .withMessage(
      "Password must be between 6 and 20 characters, at least one uppercase letter, one lowercase letter and one number "
    ),
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user: User | null = await User.findOne({ where: { email: email } });
    if (user) {
      return res.status(400).send({ message: "User already exists" });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

export default { createUser };

// .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
