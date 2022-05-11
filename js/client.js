function FadeOutLogin() {

    var pseudo = $("#pseudo").val();

    if ($("#pseudo").val() == "") {
        if (sessionStorage.getItem("invalid") == "false" || !sessionStorage.getItem("invalid")) {
            $(".invalid").append("<p>Veuillez entrer un pseudo</p>");
            sessionStorage.setItem("invalid", "true");
            return;
        } else {
            return;
        }
    }

    socket.emit('login', {
        username: pseudo,
        avatar: "https://www.w3schools.com/w3images/avatar" + (Math.floor(Math.random() * (5 - 2 + 1) + 2)) + ".png"
    })
    socket.on('fadeOutLogin', function () {
        $(".login").fadeOut(1000);
        document.getElementById("chat").style.filter = "blur(0px)";
        //enable textarea
    });
    socket.on('isLog', function() {
        document.getElementById("connected").innerText = parseFloat(document.getElementById("connected").innerText) + 1;
    })
}

jQuery(document).ready(function () {
    (function ($) {

        $("#message-form").submit(function (event) {
            event.preventDefault();
            socket.emit('newMessage', {
                message: $("#message").val()
            });
            $("#message").focus();
            $("#message").val("");
        });

        socket.on('messageSelf', function (message) {
            $('#chatbox').append(
                "<p> <div class=\"self-message\"> <div class=\"user-messsage-content\"> <p>" + message.message + "</p> </div> </div>");
        });

        socket.on('messageOut', function (message, me) {
            document.getElementById('notif').play()
            $('#chatbox').append(" <div class=\"chat-container\"> <div class=\"user-info\"> <div class=\"user-avatar\"> <img src=\"" + me.avatar + "\" alt=\"Avatar\" class=\"avatar\"> </div> <p>" + me.username + "</p> </div> <div class=\"user-message\"> <div class=\"user-messsage-content\"> <p>" + message.message +"</p> </div> </div> </div>");
        });

        socket.on('isDisconnect', function () {
            if(document.getElementById("connected").innerText > 0) {
            document.getElementById("connected").innerText = parseFloat(document.getElementById("connected").innerText) -1;
            } else {
                document.getElementById("connected").innerText = 0;
            }
        });
    })(jQuery);
});

