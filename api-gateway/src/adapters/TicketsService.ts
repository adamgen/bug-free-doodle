import config from "config";
import got from "got";

const USERS_SERVICE_URI = <string>config.get("USERS_SERVICE_URI");

export interface Ticket {
  id: string;
  movieId: string;
  availableTickets: number;
  ticketsLeft: number;
  dateAndTIme: Date;
  price: number;
}

export default class TicketsService {
  static async createTicket({
    movieId,
    availableTickets,
    ticketsLeft,
    dateAndTIme,
    price,
  }: {
    movieId: string;
    availableTickets: number;
    ticketsLeft: number;
    dateAndTIme: Date;
    price: number;
  }) {
    const body: any = await got
      .post(`${USERS_SERVICE_URI}/ticket/`, {
        json: { movieId, availableTickets, ticketsLeft, dateAndTIme, price },
      })
      .json();

    return body.ticket;
  }

  static async getTicket({
    ticketId,
  }: {
    ticketId: string;
  }): Promise<Ticket | null> {
    const body = await got
      .get(`${USERS_SERVICE_URI}/tickets/${ticketId}`)
      .json();
    if (!body) return null;
    return <Ticket>body;
  }
}
