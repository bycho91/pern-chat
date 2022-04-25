const express = require("express");

const { Server } = require("socket.io");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routers/authRouter");
const { sessionMiddleware, wrap } = require("./controllers/serverController");

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
app.use(sessionMiddleware);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/auth", authRouter);
io.use(wrap(sessionMiddleware));
io.on("connect", (socket) => {
  console.log(socket.request.session.user.username);
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server listening on port 5000`)
);
