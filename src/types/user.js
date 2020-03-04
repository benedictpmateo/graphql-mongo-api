import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ID!
    name: String!
  }

  extend type Query {
    users: [User!]
    user: User!
  }

  extend type Mutation {
    addUser (
      name: String!
    ): User!

    removeUser (
      id: ID!
    ): Message
  }
`