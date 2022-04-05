import { Request, Response, NextFunction } from "express";

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("b", req.cookies);

    res.clearCookie("ACCESS_TOKEN");

    next();
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { logout };
