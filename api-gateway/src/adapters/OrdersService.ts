import config from "config";
import got from "got";

const ORDERS_SERVICE_URI = <string>config.get("ORDERS_SERVICE_URI");

export interface Order {
  id: string;
  userId: string;
  ticketId: string;
}

export default class OrdersService {
  static async getOrdersByid({
    userId,
  }: {
    userId: string;
  }): Promise<Order | null> {
    // console.log("ttt", userId);

    const { orders } = await got
      .get(`${ORDERS_SERVICE_URI}/order/${userId}`)
      .json();
    if (!orders) return null;
    // console.log(orders);

    return <Order>orders;
  }
  static async createOrder({
    userId,
    ticketId,
  }: {
    userId: string;
    ticketId: string;
  }) {
    const body: any = await got
      .post(`${ORDERS_SERVICE_URI}/order`, {
        json: { userId, ticketId },
      })
      .json();
    console.log(body);
    if (body.error) {
      throw new Error(body.message);
    }

    return body.order;
  }

  static async removeOrder({ id }: { id: string }) {
    console.log(id);
    const body: any = await got
      .delete(`${ORDERS_SERVICE_URI}/order/${id}`)
      .json();
    console.log("Aa", body.message);
    if (body.error) {
      throw new Error(body.message);
    }

    return body.message;
  }

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
