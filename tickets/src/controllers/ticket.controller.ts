import { Request, Response, NextFunction } from "express";
import { Ticket } from "../model/Ticket";
import { v4 as uuidv4 } from "uuid";
import hashPassword from "../utils/hashPassword";

const getTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await Ticket.findAll();

    // get some Tickets
    return res.status(200).json({
      message: users,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTicket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await Ticket.findByPk(req.params.id);
    console.log(user);

    // get some Tickets
    return res.status(200).json({
      message: user,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// adding a Ticket
const addTicket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.body);

    const { showId, seatId, isTaken, imdbApiId } = req.body;
    const id = uuidv4();
    const newTicket = await Ticket.create({
      id,
      showId,
      seatId,
      isTaken,
      imdbApiId,
    });

    return res.status(200).json({
      message: newTicket,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  // return response
};

export default { getTickets, getTicket, addTicket };
// export default { getTickets, getTicket, updateTicket, deleteTicket, addTicket };
