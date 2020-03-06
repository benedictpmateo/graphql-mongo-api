import connectRedis from "connect-redis";
import session from "express-session";
import redis from "redis";
import uuid from "uuid/v4";

const RedisStore = connectRedis(session);
const RedisClient = redis.createClient();

RedisClient.on("error", err => {
  console.log("Redis Error: ", err);
});

export default session({
  genid: req => uuid(),
  store: new RedisStore({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    client: RedisClient,
    ttl: process.env.REDIS_TTL
  }),
  resave: false,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
});
