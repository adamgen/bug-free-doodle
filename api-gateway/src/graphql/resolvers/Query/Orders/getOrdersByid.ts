import OrdersService from "#root/adapters/OrdersService";
import { ResolverContext } from "#root/graphql/types";
interface Args {
  userId: string;
  ticketId: string;
  status: string;
  expiresAt: Date;
}

const getOrdersByIdResolver = async (
  obj: any,

  {}: Args,
  context: any
) => {
  return await OrdersService.getOrdersByid({
    userId: context.userSession.user.id,
  });
};

export default getOrdersByIdResolver;
