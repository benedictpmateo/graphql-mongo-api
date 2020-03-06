import { gql } from "apollo-server-express";

import message from "./message";
import user from "./user";
import auth from "./auth";

const root = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

export default [root, message, user, auth];
