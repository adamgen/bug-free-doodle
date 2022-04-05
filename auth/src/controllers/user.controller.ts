import { Request, Response, NextFunction } from "express";
import { User } from "../model/User";
import { v4 as uuidv4 } from "uuid";
import hashPassword from "../utils/hashPassword";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.findAll();

    // get some Users
    return res.status(200).json({
      message: users,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.userId);
    console.log(user);

    // get some Users
    return res.status(200).json({
      message: user,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const removeUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByPk(req.params.userId);
    console.log(user);
    if (user) {
      await user.destroy();
    }
    console.log(user);
    // get some Users
    return res.status(200).json({
      message: user,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// adding a User
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;
    const id = uuidv4();
    const newUser = await User.create({
      id,
      email,
      password: hashPassword(password),
    });

    return res.status(200).json({
      message: newUser,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  // return response
};

export default { getUsers, getUser, addUser, removeUser };
// export default { getUsers, getUser, updateUser, deleteUser, addUser };
