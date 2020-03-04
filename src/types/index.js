import { gql } from 'apollo-server-express'

import message from './message'
import user from './user'

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`

export default [
  root,
  message,
  user
]