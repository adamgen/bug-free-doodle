import { gql } from "apollo-server-express";

const schema = gql`
  scalar Date

  type User {
    id: ID!
    email: String!
    isAdmin: Boolean!
  }

  type UserSession {
    user: User!
  }

  type Mutation {
    createUser(email: String!, password: String!): User!
    updateUser(email: String!, password: String, isAdmin: Boolean!): User!
    removeUser: String!
    createUserSession(email: String!, password: String!): UserSession!
    deleteUserSession(me: Boolean!): Boolean!
  }

  type Query {
    userSession(me: Boolean!): UserSession
  }
`;

export default schema;

// type UserSession {
//   user: User!
// }
