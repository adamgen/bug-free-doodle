import { Request, Response, NextFunction } from "express";
import { Ticket } from "../model/Ticket";
import { v4 as uuidv4 } from "uuid";
import hashPassword from "../utils/hashPassword";
import { Op } from "sequelize";
import sequelize from "../config/sequelize";
import { Transaction } from "sequelize";

const getTickets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const tickets = await Ticket.findAll();

    // get some Tickets
    return res.status(200).json({
      message: tickets,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTicketsByShowId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("tas", req.params);

    const { showId } = req.params;
    const tickets = await Ticket.findAndCountAll({
      where: {
        showId: {
          [Op.like]: showId,
        },
      },
    });
    console.log("t", tickets);

    // get some Tickets
    return res.status(200).json({
      tickets,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTicket = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id);
    console.log("tt", ticket);

    // get some Tickets
    return res.status(200).json({
      ticket,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// adding a Ticket
const setTicket = async (req: Request, res: Response, next: NextFunction) => {
  let error = false;
  let message = "";

  try {
    const { id, isTaken } = req.body;
    const result = await sequelize.transaction(async (t) => {
      const ticket: any = await Ticket.findByPk(id, {
        transaction: t,
      });
      console.log(ticket);

      if (ticket.isTaken) {
        error = true;
        message = "The ticket is taken";
        return await ticket.save({ transaction: t });
      } else {
        ticket.isTaken = true;
        error = false;
        message = "The ticket is set";
        return await ticket.save({ transaction: t });
      }
    });

    return res.status(200).json({
      error,
      message,
    });
  } catch (error) {
    console.log("e", error);
    return res.status(200).json({
      test: "t",
    });
    // throw error;
  }

  // return response
};

export default { getTickets, getTicket, setTicket, getTicketsByShowId };
// export default { getTickets, getTicket, updateTicket, deleteTicket, addTicket };

// return res.status(200).json({
//   ticket,
// });
// const setTicket = async (req: Request, res: Response, next: NextFunction) => {
//   try {

//     const { id, isTaken } = req.body;
//     const ticket: any = await Ticket.findByPk(id);

//     ticket.isTaken = isTaken;
//     await ticket.save();

//     return res.status(200).json({
//       ticket,
//     });
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }

//   // return response
// };
