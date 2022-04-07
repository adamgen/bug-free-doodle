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
    ): Movie!
    createShow(id: ID!, dateAndTIme: Date!, price: Int!): Show!
  }

  type Query {
    Shows: [Movie!]!
    Show(showId: ID!): Movie
    Tickets: [Ticket!]!
    Ticket(ticketId: ID!): Ticket
  }
`;

export default schema;

//TODO
// Update/remove movie
// Update/removec ticket
