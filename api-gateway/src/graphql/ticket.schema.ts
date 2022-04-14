import { gql } from "apollo-server-express";

const schema = gql`
  scalar Date

  type Ticket {
    id: ID!
    showId: String!
    imdbApiId: String!
    seatId: Int!
    isTaken: Boolean!
  }

  input TicketsInit {
    ticketAmount: Int!
    imdbApiId: String!
  }

  type Show {
    id: ID!
    dateAndTIme: Date!
    price: Int!
  }

  type Mutation {
    setTicket(id: ID!, isTaken: Boolean!): Ticket!
    createShow(dateAndTIme: Date!, price: Int!, ticketsInit: TicketsInit): Show!
    editShow(dateAndTIme: Date!, price: Int!, ticketsInit: TicketsInit): Show!
  }

  type Query {
    Shows: [Show!]!
    Show(showId: ID!): Show
    Tickets(showId: ID!): [Ticket!]!
    Ticket(ticketId: ID!): Ticket
    getAvailableTicket(showId: ID!): Int!
    isSoldOut(showId: ID!): Boolean!
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
