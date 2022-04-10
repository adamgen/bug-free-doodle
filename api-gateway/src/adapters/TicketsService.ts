import config from "config";
import got from "got";

const TICKETS_SERVICE_URI = <string>config.get("TICKETS_SERVICE_URI");

export interface Show {
  dateAndTIme: Date;
  price: number;
}

interface TicketsInit {
  ticketAmount: number;
  imdbApiId: string;
}

export interface Ticket {
  ticketsInit: TicketsInit;
  id: string;
  movieId: string;
  availableTickets: number;
  ticketsLeft: number;
  dateAndTIme: Date;
  price: number;
}

export default class TicketsService {
  static async createShow({
    ticketsInit,
    dateAndTIme,
    price,
  }: {
    ticketsInit: TicketsInit;
    dateAndTIme: Date;
    price: number;
  }) {
    console.log("t", dateAndTIme, price, ticketsInit);
    const body: any = await got
      .post(`${TICKETS_SERVICE_URI}/show/`, {
        json: { dateAndTIme, price, ticketsInit },
      })
      .json();
    console.log(body);

    return body.show;
  }

  static async setTicket({
    showId,
    imdbApiId,
    seatId,
    isTaken,
  }: {
    showId: string;
    imdbApiId: string;
    seatId: number;
    isTaken: boolean;
  }) {
    const body: any = await got
      .post(`${TICKETS_SERVICE_URI}/ticket/`, {
        json: { showId, imdbApiId, seatId, isTaken },
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
      .get(`${TICKETS_SERVICE_URI}/tickets/${ticketId}`)
      .json();
    if (!body) return null;
    return <Ticket>body;
  }
}
