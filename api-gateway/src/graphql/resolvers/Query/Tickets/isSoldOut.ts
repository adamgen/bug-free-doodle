import TicketsService from "#root/adapters/TicketsService";
import { ResolverContext } from "#root/graphql/types";
interface Args {
  showId: string;
}

const ticketResolver = async (obj: any, showId: Args) => {
  const tickets: any = await TicketsService.getTicketsByShowId(showId);
  let isSoldOut = true;
  if (tickets) {
    console.log(
      tickets.map((ticket: any) => {
        if (!ticket.isTaken) {
          isSoldOut = false;
        }
      })
    );
  }

  return isSoldOut;
};

export default ticketResolver;
