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
    createMovie(title: String!, length: Int!, imdbApiID: String!): Movie!
    createTicket(
      movieId: String!
      availableTickets: Int!
      ticketsLeft: Int!
      dateAndTIme: Date!
      price: Int!
    ): Ticket!
  }

  type Query {
    Movies: [Movie!]!
    Movie(movieId: ID!): Movie
    Tickets: [Ticket!]!
    Ticket(ticketId: ID!): Ticket
  }
`;

export default schema;

//TODO
// Update/remove movie
// Update/removec ticket
