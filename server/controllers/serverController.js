const session = require("express-session");
require("dotenv").config();
const RedisStore = require("connect-redis")(session);
const redisClient = require("../redis");
const sessionMiddleware = session({
  secret: process.env.COOKIE_SECRET,
  credentials: true,
  name: "sid",
  store: new RedisStore({ client: redisClient }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: 1000 * 60 * 60 * 24 * 7,
  },
});

const wrap = (expressMiddleware) => (socket, next) =>
  expressMiddleware(socket.request, {}, next);

module.exports = { sessionMiddleware, wrap };
