import { user } from "../models";
import { AuthenticationError, ValidationError } from "apollo-server-express";

const Query = {
  me: (parent, args, { getUser }) => {
    console.log(getUser());
    return getUser();
  }
};

const Mutation = {
  login: async (parent, { email, password }, { authenticate, login }) => {
    try {
      const data = await authenticate("graphql-local", { email, password });
      await login(data.user);
      return data.user;
    } catch (err) {
      throw new AuthenticationError(err.message);
    }
  },
  register: async (parent, { email, password }, { login }) => {
    try {
      const model = new user({
        email,
        password
      });
      const data = await model.save();
      await login(data);
      return data;
    } catch (err) {
      throw new ValidationError(err.message);
    }
  },
  logout: async (parent, args, { logout }) => {
    await logout();
    return true;
  }
};

export default { Query, Mutation };
