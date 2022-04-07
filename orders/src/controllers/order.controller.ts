import { Request, Response, NextFunction } from "express";
import { Order } from "../model/Order";
import { v4 as uuidv4 } from "uuid";

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
    console.log(req.body.title);

    const { userId, ticketId, status, expiresAt } = req.body;
    const id = uuidv4();
    const newOrder = await Order.create({
      id,
      userId,
      ticketId,
      status,
      expiresAt,
    });

    return res.status(200).json({
      newOrder,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }

  // return response
};

export default { getOrders, getOrder, addOrder };
// export default { getOrders, getOrder, updateOrder, deleteOrder, addOrder };
