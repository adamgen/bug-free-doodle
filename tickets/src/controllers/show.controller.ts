import { Request, Response, NextFunction } from "express";
import { Show } from "../model/Show";
import { v4 as uuidv4 } from "uuid";

const getShows = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const shows = await Show.findAll();

    // get some Shows
    return res.status(200).json({
      message: shows,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getShow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const show = await Show.findByPk(req.params.id);
    console.log(show);

    // get some Shows
    return res.status(200).json({
      message: show,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// adding a Show
const addShow = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // console.log(req.body.title);

    const { dateAndTIme, price, ticketsInit } = req.body;
    // console.log(req.body);

    const id = uuidv4();
    const show = await Show.create({
      id,
      dateAndTIme,
      price,
    });
    const showId: any = id;
    await show.initTickets(ticketsInit, showId);
    return res.status(200).json({
      show,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  // return response
};

export default { getShows, getShow, addShow };
// export default { getShows, getShow, updateShow, deleteShow, addShow };
