import { ResolverContext } from "#root/graphql/types";
import OrdersService from "#root/adapters/OrdersService";
interface Args {
  orderId: string;
}

const getOrdersResolver = async (
  obj: any,
  { orderId }: Args,
  context: ResolverContext
) => {
  return await OrdersService.getOrder({ orderId });
};

export default getOrdersResolver;
