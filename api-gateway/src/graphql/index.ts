import userType from "./user.schema";
import ticketType from "./ticket.schema";
import orderType from "./order.schema";

// const types = [userType, ticketType, orderType];
const types = [userType, orderType];

export default types;

// import { mergeTypeDefs } from "@graphql-tools/merge";
// export default mergeTypeDefs(types);
