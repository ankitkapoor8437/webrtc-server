const express = require("express");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

const app = express();
const io = new Server();

const PORT = 8000;
const ServerPORT = 8001;

app.use(bodyParser.json());
io.on("connection", (socket) => { });

app.listen((PORT), () => {
    console.log(`Express server is running on ${PORT}`);
});

io.listen(8001);