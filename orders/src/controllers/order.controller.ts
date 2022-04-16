import { Request, Response, NextFunction } from "express";
import { Order } from "../model/Order";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { or } from "sequelize/types";
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
      const status = "active";
      const order = await Order.create({
        id,
        userId,
        ticketId,
        status,
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

const removeOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await Order.findByPk(req.params.id);

    if (order) {
      const resTicket: any = await axios.put(`http://localhost:7002/ticket`, {
        id: order.ticketId,
      });

      const { error, message } = resTicket.data;
      if (error) {
        await order.destroy().then(function () {
          return res.status(200).json({
            message: ["Order deleted.", message],
          });
        });
      } else {
        await order.destroy().then(function () {
          return res.status(200).json({
            message: ["Order deleted.", message],
          });
        });
      }
    } else {
      console.log("tat");

      return res.status(200).json({
        error: true,
        message: "Order not exists.",
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

export default { getOrders, getOrder, addOrder, removeOrder };
// export default { getOrders, getOrder, updateOrder, deleteOrder, addOrder };
