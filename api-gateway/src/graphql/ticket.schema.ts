import { gql } from "apollo-server-express";

const schema = gql`
  scalar Date

  type Ticket {
    id: ID!
    showId: String!
    seatId: Int!
    isTaken: Boolean!
  }

  type Show {
    id: ID!
    dateAndTIme: Date!
    price: Int!
    imdbApiId: String!
    ticketAmount: Int!
    isSoldOut: Boolean
  }

  type Mutation {
    # setTicket(id: ID!, isTaken: Boolean!): Ticket!
    createShow(
      dateAndTIme: Date!
      price: Int!
      imdbApiId: String!
      ticketAmount: Int!
    ): Show!
    editShow(
      dateAndTIme: Date!
      price: Int!
      imdbApiId: String!
      ticketAmount: Int!
    ): Show!
    removeShow(id: ID!): String!
  }

  type Query {
    Shows: [Show!]!
    Show(id: ID!): Show
    Tickets(showId: ID!): [Ticket!]!
    Ticket(id: ID!): Ticket
  }
`;

export default schema;

//TODO
// Update/remove movie
// Update/removec ticket
// # createTicket(
//   #   showId: String!
//   #   imdbApiId: String!
//   #   seatId: Int!
//   #   isTaken: Boolean!
//   # ): Ticket!
// getAvailableTicket(showId: ID!): Int!
// isSoldOut(showId: ID!): Boolean!
//  type TicketsInformation {
//    availableTickets: Int!
//   ticketsLeft: Int!
//  }
// isSoldOut(showId: ID!): Boolean!
