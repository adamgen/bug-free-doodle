import { gql } from "apollo-server-express";

const schema = gql`
  scalar Date

  type Order {
    id: ID!
    userId: String!
    ticketId: String!
    status: String!
    expiresAt: Date!
    user: User!
    ticket: Ticket!
  }

  type Mutation {
    createOrder(
      userId: String!
      ticketId: String!
      status: String!
      expiresAt: Date!
    ): User!
  }

  type Query {
    # ordersForAdmin: [Order!]!
    orders: [Order!]!
  }
`;

export default schema;

// ordersByUser(): [Order!]!
