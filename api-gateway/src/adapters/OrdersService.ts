import config from "config";
import got from "got";

const ORDERS_SERVICE_URI = <string>config.get("ORDERS_SERVICE_URI");

export interface Order {
  id: string;
  userId: string;
  ticketId: string;
  status: string;
  expiresAt: Date;
}

export default class UsersService {
  static async getOrdersByid({
    userId,
  }: {
    userId: string;
  }): Promise<Order | null> {
    console.log("ttt", userId);

    const { orders } = await got
      .get(`${ORDERS_SERVICE_URI}/order/${userId}`)
      .json();
    if (!orders) return null;
    console.log(orders);

    return <Order>orders;
  }
  //   static async createOrder({
  //     userId,
  //     ticketId,
  //     status,
  //     expiresAt,
  //   }: {
  //     userId: string;
  //     ticketId: string;
  //     status: string;
  //     expiresAt: Date;
  //   }) {
  //     const body: any = await got
  //       .post(`${ORDERS_SERVICE_URI}/order`, {
  //         json: { userId, ticketId, status, expiresAt },
  //       })
  //       .json();
  //     return body.user;
  //   }
  //   static async getOrder({
  //     orderId,
  //   }: {
  //     orderId: string;
  //   }): Promise<Order | null> {
  //     const body = await got.get(`${ORDERS_SERVICE_URI}/order/${orderId}`).json();
  //     if (!body) return null;
  //     return <Order>body;
  //   }
  //   static async getOrders(): Promise<Order | null> {
  //     const body: any = await got.get(`${ORDERS_SERVICE_URI}/order/`).json();
  //     console.log(body);
  //     if (!body) return null;
  //     return body.orders;
  //   }
}
