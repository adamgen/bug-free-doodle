import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../model/User";
import { v4 as uuidv4 } from "uuid";
import { JWTgenerateToken } from "../utils/jwt.utils";
import request from "supertest";

interface UserPayload {
  id: string;
  email: string;
}

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const id = uuidv4().toString();
    const newUser = await User.create({
      id,
      email,
      password,
    });
    const accessToken = JWTgenerateToken(newUser.id.toString(), newUser.email);

    const payload = jwt.verify(accessToken, "Secret");

    res
      .cookie("ACCESS_TOKEN", accessToken)
      .status(200)
      .json({ user: payload || null });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);

    const user: User | null = await User.findOne({ where: { email: email } });

    if (user != null && (await user.verifyPassword(password))) {
      const accessToken = JWTgenerateToken(user.id.toString(), user.email);
      const payload: any = jwt.verify(accessToken, "Secret");
      payload["accessToken"] = accessToken;
      // for test
      // res.cookie("ACCESS_TOKEN", accessToken).status(200).json(accessToken);

      // req.session = {
      //   jwt: accessToken,
      // };
      // console.log({ user: payload || null });

      res
        .cookie("ACCESS_TOKEN", accessToken)
        .status(200)
        .json({ user: payload || null });
    } else {
      return res
        .status(400)
        .json({ message: "The username or password is incorrect" });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// const currentToken = async (req: any, res: Response, next: NextFunction) => {
//   // if (!req.session?.jwt) {
//   //   return next();
//   // }

//   try {
//     console.log(req.cookies);
//     const payload = jwt.verify(req.cookies["ACCESS_TOKEN"], "Secret");
//     req.currentUser = payload;
//     // console.log(req.currentUser);
//     res.send({ user: req.currentUser || null });

//     // res
//     // .cookie("ACCESS_TOKEN", accessToken)
//     // .status(200)
//     // .json({ user: payload || null });
//   } catch (err: any) {
//     if (err.message.trim() === "invalid signature".trim()) {
//       return res.status(400).json({ message: "invalid signature" });
//     }
//     console.log(err);
//     return res.status(500).json({ message: "some problem" });
//     throw err;
//   }
// };

const currentUser = async (req: any, res: Response, next: NextFunction) => {
  // if (!req.session?.jwt) {
  //   return next();
  // }

  try {
    // console.log(
    //   "ttt############################################",
    //   req.body,
    //   req.cookies
    // );
    const payload = jwt.verify(req.params.accessToken, "Secret");
    req.currentUser = payload;
    // console.log(req.currentUser);
    res.send({ user: req.currentUser || null });
  } catch (err: any) {
    if (err.message.trim() === "invalid signature".trim()) {
      return res.status(400).json({ message: "invalid signature" });
    }
    console.log(err);
    return res.status(500).json({ message: "some problem" });
    throw err;
  }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await console.log("a", req.cookies);

    res.send({});
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      await user.destroy().then(function () {
        return res.status(200).json({
          message: "User deleted.",
        });
      });
    } else {
      res.send({ message: "user not exists" });
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

export default {
  login,
  logout,
  removeUser,
  currentUser,
  // currentToken,
  register,
  validationToken,
};

//FIXME
// const payload = jwt.verify(req.cookies["ACCESS_TOKEN"], "Secret");
