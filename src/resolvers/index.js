import auth from "./auth";
import user from "./user";

const __imports__ = [auth, user];

const Query = {};
const Mutation = {};

for (let im of __imports__) {
  Object.assign(Query, im.Query);
  Object.assign(Mutation, im.Mutation);
}

export default {
  Query,
  Mutation
};
