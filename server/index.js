const express = require("express");
const { Server } = require("socket.io");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();

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

app.get("/", (req, res) => {
  res.json("hello");
});

io.on("connect", (socket) => {});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server listening on port 5000`)
);
