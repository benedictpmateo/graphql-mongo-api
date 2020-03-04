import { gql } from 'apollo-server-express'

export default gql`
  type Message {
    type: String
    message: String
  }
`