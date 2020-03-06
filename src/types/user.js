import { gql } from "apollo-server-express";

export default gql`
  type User {
    id: ID!
    email: String!
    password: String!
  }

  extend type Query {
    users: [User!]
    user(id: ID!): User
  }
`;
