import TicketsService from "#root/adapters/TicketsService";
import { ResolverContext } from "#root/graphql/types";

interface Args {
  id: string;
}

const ticketResolver = {
  isSoldOut: async (args: Args) => {
    const { id } = args;
    console.log("a", id);

    const tickets: any = await TicketsService.getTicketsByShowId({
      showId: id,
    });
    let isSoldOut = true;
    if (tickets) {
      tickets.map((ticket: any) => {
        console.log(ticket);

        if (!ticket.isTaken) {
          isSoldOut = false;
        }
      });
    }

    return isSoldOut;
  },
};

// const ticketResolver = {
//   ticket: async (args: Args) => {
//     // console.log("ttt", currentUser.user.accessToken);
//     // console.log("aab", args.ticketId);

//     let id: any = args.ticketId;
//     console.log("a", id);
//     return TicketsService.getTicket(id);
//   },
// };

export default ticketResolver;
