import TicketsService from "#root/adapters/TicketsService";

interface TicketsInit {
  ticketAmount: number;
  imdbApiId: string;
}

interface Args {
  ticketsInit: TicketsInit;
  dateAndTIme: Date;
  price: number;
}

const createUserResolver = async (
  obj: any,
  { dateAndTIme, price, ticketsInit }: Args
) => {
  return await TicketsService.createShow({
    ticketsInit,
    dateAndTIme,
    price,
  });
};

export default createUserResolver;
