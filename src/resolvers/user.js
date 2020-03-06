import { user } from "../models";

const Query = {
  users: (parent, args) => {
    return user.find();
  },
  user: (parent, args) => {
    return user.findById(args.id);
  }
};

const Mutation = {};

export default {
  Query,
  Mutation
};
