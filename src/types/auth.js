import { gql } from "apollo-server-express";

export default gql`
  type JWT {
    token: String!
  }

  extend type Query {
    me: User
  }

  extend type Mutation {
    login(email: String!, password: String!): User
    register(email: String!, password: String!): User
    logout: Boolean
  }
`;
