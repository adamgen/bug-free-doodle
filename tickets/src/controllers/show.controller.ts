import { Request, Response, NextFunction } from "express";
import { Show } from "../model/Show";
import { v4 as uuidv4 } from "uuid";

const getShows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await Show.findAll();

    // get some Shows
    return res.status(200).json({
      message: users,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getShow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await Show.findByPk(req.params.id);
    console.log(user);

    // get some Shows
    return res.status(200).json({
      message: user,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// adding a Show
const addShow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body.title);

    const { dateAndTIme, price } = req.body;
    const id = uuidv4();
    const newShow = await Show.create({
      id,
      dateAndTIme,
      price,
    });

    return res.status(200).json({
      message: newShow,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  // return response
};

export default { getShows, getShow, addShow };
// export default { getShows, getShow, updateShow, deleteShow, addShow };
