import { Request, Response, NextFunction } from "express";
import { User } from "../model/User";
import { v4 as uuidv4 } from "uuid";
import hashPassword from "../utils/hashPassword";
import { JWTgenerateToken } from "../utils/jwt.utils";
import request from "supertest";

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const id = uuidv4().toString();
    const newUser = await User.create({
      id,
      email,
      password: hashPassword(password),
    });
    const accessToken = JWTgenerateToken(newUser.id.toString(), newUser.email);

    res.cookie("ACCESS_TOKEN", accessToken).status(200).json("success");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user: User | null = await User.findOne({ where: { email: email } });

    if (user != null && user.verifyPassword(password)) {
      const accessToken = JWTgenerateToken(user.id.toString(), user.email);

      // for test
      // res.cookie("ACCESS_TOKEN", accessToken).status(200).json(accessToken);

      res.cookie("ACCESS_TOKEN", accessToken).status(200).json("success");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const validationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findByPk(req.params.userId);

    //TODO validate email

    // console.log(user);
    // return res.status(200).json({
    //   message: user,
    // });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { login, register, validationToken };
