import * as Mutation from "./Mutation";
import * as Query from "./Query";
import Order from "./orderResolver";
import Show from "./showResolver";
// import UserSession from "./UserSession";

// const resolvers = { Mutation, Query, UserSession };
const resolvers = { Mutation, Query, Order, Show };
// const resolvers = { Mutation, Query };

export default resolvers;
