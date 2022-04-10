import TicketService from "#root/adapters/TicketsService";

interface Args {
  showId: string;
  imdbApiId: string;
  seatId: number;
  isTaken: boolean;
}

const createUserResolver = async (
  obj: any,
  { showId, imdbApiId, seatId, isTaken }: Args
) => {
  return await TicketService.setTicket({ showId, imdbApiId, seatId, isTaken });
};

export default createUserResolver;
