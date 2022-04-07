import { ResolverContext } from "#root/graphql/types";
import OrdersService from "#root/adapters/OrdersService";
interface Args {
  userId: string;
  ticketId: string;
  status: string;
  expiresAt: Date;
}

const getOrdersResolver = async (
  obj: any,
  args: Args,
  context: ResolverContext
) => {
  return await OrdersService.getOrders();
};

export default getOrdersResolver;
