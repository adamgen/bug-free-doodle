import { Request, Response, NextFunction } from "express";
import { Order } from "../model/Order";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.userId },
    });
    console.log(orders);
    // get some Orders
    return res.status(200).json({
      orders,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByPk(req.params.id);
    console.log(order);

    // get some Orders
    return res.status(200).json({
      order,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// adding a Order
const addOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, ticketId } = req.body;
    const resTicket: any = await axios.post(`http://localhost:7002/ticket`, {
      id: ticketId,
      isTaken: true,
    });

    console.log(resTicket.data);

    const { error, message } = resTicket.data;
    if (error) {
      return res.status(200).json({
        error,
        message,
      });
    } else {
      const id = uuidv4();
      const order = await Order.create({
        id,
        userId,
        ticketId,
      });
      return res.status(200).json({
        order,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      error,
    });
    // throw error;
  }

  // return response
};

export default { getOrders, getOrder, addOrder };
// export default { getOrders, getOrder, updateOrder, deleteOrder, addOrder };
