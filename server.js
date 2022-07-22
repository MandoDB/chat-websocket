const express = require("express");
const app = express();
server = require('http').createServer(app),
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

var server = server.listen((process.env.PORT || 5000), function () {
    console.log("Server is running on http://localhost:3000");
});

//static stylesheets
app.use(express.static(__dirname + "/"));


var io = require('socket.io')(server);

io.on('connection', function (socket) {
    var me;


    socket.on('login', function (user) {
        me = user;
        socket.emit("fadeOutLogin");
        socket.broadcast.emit("isLog");

    });
    socket.on('newMessage', function(message, user) {
        socket.emit("messageSelf", message);
        socket.broadcast.emit("messageOut", message, me);
    });
})
