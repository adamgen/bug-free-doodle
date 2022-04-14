import TicketService from "#root/adapters/TicketsService";

interface Args {
  id: string;
  isTaken: boolean;
}

const createUserResolver = async (obj: any, { id, isTaken }: Args) => {
  return await TicketService.setTicket({
    id,
    isTaken,
  });
};

export default createUserResolver;
