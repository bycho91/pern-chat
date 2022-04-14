const express = require("express");
const { Server } = require("socket.io");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routers/authRouter");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const redisClient = require("./redis");
const app = express();
const server = require("http").createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: "true",
  },
});

app.use(helmet());
app.use(express.json());
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    credentials: true,
    name: "sid",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.ENVIRONMENT === "production",
      httpOnly: true,
      sameSite: process.env.ENVIRONMENT === "production" ? "none" : "lax",
      expires: 1000 * 60 * 60 * 24 * 7,
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRouter);

io.on("connect", (socket) => {});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server listening on port 5000`)
);
