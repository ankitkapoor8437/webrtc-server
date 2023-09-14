const express = require("express");
const bodyParser = require("body-parser");
const { Server, Socket } = require("socket.io");

const app = express();
const io = new Server(
    {
        cors: true,
    });

const PORT = 8000;
const ServerPORT = 8001;

app.use(bodyParser.json());

const emailToSocketMapping = new Map();

io.on("connection", (socket) => {
    socket.on("join-room", (data) => {
        const { roomId, emailId } = data;
        console.log("User", emailId, "Joined Room", roomId);
        emailToSocketMapping.set(emailId, socket.id);
        socket.join(roomId);
        socket.emit("joined-room", { roomId });
        socket.broadcast.to(roomId).emit("user-joind", { emailId });

    })
});

app.listen((PORT), () => {
    console.log(`Express server is running on ${PORT}`);
});

io.listen(ServerPORT);