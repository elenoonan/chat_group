//server.js 
var express = require('express'); //calling express library
var app = express(); //using function from express library - constructor to make express object
var server = require('http').createServer(app); //calling http library as part of express - creating server
var io = require('socket.io')(server); //calling socket io
var nicknames = []; //array for nicknames for the usernames


app.use(express.static(__dirname + '/public')); //redirect to location of public folder


app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/public/index.html'); //redirects to this index.html page when someone hits the server ULR
});

//connection method is done automatically; everything happens inside this connection until the user disconnects
//when client hits web page, socket io library allocates a client id ... big long number used to push messages to client and identify client when messages are received
io.on('connection', function (client) {
    console.log('client connected'); //for testing that client is connected

    //possible to comment out
    //when a new client connects
    io.clients(function (error, clients) {
        if (error) throw error;
        //send the list of clients out to all the clients
        //client.username = username;
        io.emit('clientList', clients);
        console.log(clients);
    });

    //possible to comment out
    //when server receives clientClicked message, do this
    client.on('clientClicked', function (id) {
        //send a message to just the client whose button was clicked
        io.to(id).emit('youWereClicked');
    });

    //like an event listener listening for incoming messages with label "chat message"
    //msg is the message entered
    //print out the chat message event
    client.on('chat message', function (msg) {
        console.log('MESSAGE: ' + msg + ' CLIENT: ' + client.id + ' NAME: ' + client.nickname); //show message and current client sending message in console 
        //send the message to everyone including sender for now using io.emit (not broadcast.emit)
        io.emit('chat message', client.nickname + ':  ' + msg); //sending message to everyone using "chat message" label sending client nickname plus the message above in function
        //there would have to be an event listener on the client side to handle this message; otherwise it would never get displayed

    });

    //sending array of nicknames to all clients
    //on client side each time someone connects/disconnects the updated list is redisplayed
    function distributeNicknames() {
        io.emit('usernames', nicknames);
    }

    //checking if nickname exists, if not add to list data
    //event listener for submit button on enter user name
    //submit button triggers client to send a message with the new user label
    //this also requires a callback to the client with a boolean to determine whether the user name is already taken by connected user
    //if statement checks list of user names ... if not in list OK but if in list then already exists in current connection
    client.on('new user', function (data, callback) {
        //check if nickname already in array
        if (nicknames.indexOf(data) != -1) {
            callback(false);
        } else {
            callback(true);
            //pairing nickname entered to the client id set by the socket.io server application
            client.nickname = data;
            //adding the nickname to the array of nicknames (if does not already exist)
            nicknames.push(client.nickname);
            //telling clients nicknames
            distributeNicknames();
            //io.emit('usernames', nicknames);
        }
    });

    //ON on either side is LISTENING event listener
    //EMIT is SEND on either side


    //when an existing client disconnects
    //triggers automatically when the browser closes or when user is no longer connected to the server
    client.on('disconnect', function (data) {
        console.log('client disconnected');
        if (!client.nickname) {
            return
        }; //checking if client with nickname exists
        nicknames.splice(nicknames.indexOf(client.nickname), 1); //cuts out the nickname after finding in the index of the array and removes one client out
        distributeNicknames(); //tell clients nicknames again
    });

});

//start our web server and socket.io server listening
server.listen(3000, function () {
    console.log('listening on *:3000');
});
