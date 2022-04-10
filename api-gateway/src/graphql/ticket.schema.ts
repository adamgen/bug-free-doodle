import { gql } from "apollo-server-express";

const schema = gql`
  scalar Date

  type Ticket {
    id: ID!
    showId: String!
    imdbApiID: String!
    seatId: Int!
    isTaken: Boolean!
  }

  type Show {
    id: ID!
    dateAndTIme: Date!
    price: Int!
  }

  type Mutation {
    createTicket(
      showId: String!
      imdbApiID: String!
      seatId: Int!
      isTaken: Boolean!
    ): Ticket!
    createShow(dateAndTIme: Date!, price: Int!): Show!
  }

  type Query {
    Shows: [Show!]!
    Show(showId: ID!): Show
    Tickets: [Ticket!]!
    Ticket(ticketId: ID!): Ticket
  }
`;

export default schema;

//TODO
// Update/remove movie
// Update/removec ticket
