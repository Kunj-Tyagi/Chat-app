// To attach socket.io to express we use http module we didn't use app.listen...
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server); //instance of io (input output) or to make new server

// Socket.io
// heree socket means client in world of socket.io we call it socket.
// isss socket ka andarr user ki information hogyi!
// if tum ak user aur mai bhi user toh hamara pass kaffi socket hota haii.

// jaisa hi frontend se connection banata haii backend ke
// When a client connects to the server (e.g., when a user opens a chat page), this 'connection' event is triggered.
// io means jitna bhi mera connection
io.on("connection", (socket) => {
  socket.on("user-message", (message) => {
    io.emit("message",message);//frontend se koi bhi meesage ayee toh ussa baaki users ko send kardo!!
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("./public/index.html"); //To render a file.
});

server.listen(9000, () => {
  console.log(`server is started at 9000`);
});
