import { ApolloServer } from "apollo-server-express";
import { buildContext } from "graphql-passport";
import bluebird from "bluebird";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import logger from "morgan";
import mongoose from "mongoose";
import path from "path";
import redis from "redis";

// --- App
import passport from "../config/passport";
import resolvers from "./resolvers";
import session from "../config/redis";
import typeDefs from "./types";

const app = express();

/**
 * Bluebird Configuration
 */
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

/**
 * Express Middlewares
 */
app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "../public")));

/**
 * Mongo Client Connection
 */
mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

mongoose.connection.once("open", () => {
  console.log("Connected to database: %s", process.env.MONGODB_URI);
});

/**
 * Apollo Server Configuration
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ctx => buildContext(ctx),
  playground: {
    settings: {
      "request.credentials": "same-origin"
    }
  }
});

server.applyMiddleware({
  app,
  path: "/graphql"
});

export default app;
