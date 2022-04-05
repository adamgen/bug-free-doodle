import { gql } from "apollo-server-express";

const schema = gql`
  scalar Date

  type Movie {
    id: ID!
    title: String!
    length: Int!
    imdbApiID: String!
  }

  type Ticket {
    id: ID!
    movieId: String!
    availableTickets: Int!
    ticketsLeft: Int!
    dateAndTIme: Date!
    price: Int!
  }

  type Mutation {
    createUser(password: String!, email: String!): User!
    createUserSession(password: String!, email: String!): UserSession!
    deleteUserSession(me: Boolean!): Boolean!
  }

  type Query {
    userSession(me: Boolean!): UserSession
  }
`;

export default schema;
