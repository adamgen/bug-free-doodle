import TicketsService from "#root/adapters/TicketsService";
import { ResolverContext } from "#root/graphql/types";
interface Args {
  ticketId: string;
}

import config from "config";
import got from "got";

const TICKETS_SERVICE_URI = <string>config.get("TICKETS_SERVICE_URI");

export interface Ticket {
  id: string;
  showId: string;
  dateAndTIme: Date;
  price: number;
}

const ticketResolver = {
  ticket: async (args: Args) => {
    let id: any = args.ticketId;
    console.log("a", id);
    const body: any = await got
      .get(`${TICKETS_SERVICE_URI}/ticket/${id}`)
      .json();
    if (!body) return null;

    console.log("b", body);
    return <Ticket>body.ticket;
  },
};

// const ticketResolver = {
//   ticket: async (args: Args) => {
//     // console.log("ttt", userSession.user.accessToken);
//     // console.log("aab", args.ticketId);

//     let id: any = args.ticketId;
//     console.log("a", id);
//     return TicketsService.getTicket(id);
//   },
// };

export default ticketResolver;
