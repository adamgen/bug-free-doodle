import { gql } from "apollo-server-express";

const schema = gql`
  scalar Date

  type Order {
    id: ID!
    userId: String!
    ticketId: String!
  }

  type Mutation {
    createOrder(ticketId: String!): Order!
  }

  type Query {
    orders: [Order!]!
  }
`;

export default schema;

// ordersByUser(): [Order!]!
// type Order {
//   id: ID!
//   userId: String!
//   ticketId: String!
//   user: User!
//   ticket: Ticket!
// }
