const express = require("express");
const app = express();
server = require('http').createServer(app),
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

var server = server.listen((process.env.PORT || 5000), function () {
    console.log("Server is running on http://localhost:5000");
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
        var codeCharacter = ["{", "}", "[", "]", "-", "*", "/", "|", "~", "@", "`", "\"", "'", "\\", ">", "<"];

        var message = {
            message: message.message,
        }

        var messageUser = message.message
        
        if(messageUser.length < 0) return;

        for (var i = 0; i < codeCharacter.length; i++) {
            if (message.message.includes(codeCharacter[i])) {
                message.message = messageUser.replace(/./g, "*");
              socket.emit("messageSelf", message);
              socket.broadcast.emit("messageOut", message, me);
              break;
            } else if (i == codeCharacter.length - 1) {
                socket.emit("messageSelf", message);
                socket.broadcast.emit("messageOut", message, me);
            }
          }
    });
})
