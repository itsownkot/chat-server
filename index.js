const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
// const route = require("./route");
const { addUser, getRoomUsers, removeUser } = require("./users");

const app = express();

app.use(cors());
// app.use(route);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origins: "https://chat-server-uviq.onrender.com",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }) => {
    socket.join(room);

    const { user, isExist } = addUser({ name, room });
    const messageToUser = isExist
      ? `long time no see ${user.name}`
      : `hello ${user.name}`;

    socket.emit("message", {
      data: { user: { name: "Admin" }, message: messageToUser },
    });
    socket.broadcast.to(user.room).emit("message", {
      data: { user: { name: "Admin" }, message: `${user.name} has joined` },
    });

    io.to(room).emit("room", { data: { users: getRoomUsers(room) } });
  });

  socket.on("sendMessage", ({ message, searchParams: { name, room } }) => {
    io.to(room).emit("message", { data: { user: { name }, message } });
  });

  socket.on("leaveRoom", ({ searchParams }) => {
    const { room, name } = removeUser(searchParams);
    io.to(room).emit("message", {
      data: { user: { name: "Admin" }, message: `${name} has gone` },
    });
    io.to(room).emit("room", { data: { users: getRoomUsers(room) } });
  });

  io.on("disconnect", () => {
    console.log("disconnect");
  });
});

server.listen(5000, () => {
  console.log("server is running");
});
