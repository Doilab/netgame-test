const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

const colors = [
  "red","blue","green","yellow","purple",
  "orange","cyan","magenta","lime","pink"
];

let players = {}; // socket.id -> {x,y,color}

io.on("connection", (socket) => {

  // 10人制限
  if (Object.keys(players).length >= 10) {
    socket.emit("full");
    socket.disconnect();
    return;
  }

  const color = colors[Object.keys(players).length];

  players[socket.id] = {
    x: 300,
    y: 200,
    color: color
  };

  // 自分の情報を送る
  socket.emit("init", {
    id: socket.id,
    color: color
  });

  // 全員へプレイヤー一覧送信
  io.emit("updatePlayers", players);

  socket.on("move", (data) => {
    if (players[socket.id]) {
      players[socket.id].x = data.x;
      players[socket.id].y = data.y;
      io.emit("updatePlayers", players);
    }
  });

  socket.on("disconnect", () => {
    delete players[socket.id];
    io.emit("updatePlayers", players);
  });
});

server.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});