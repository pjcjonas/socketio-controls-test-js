const { time } = require('console');
var express = require('express');
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');

// Create the express app
var app = express();
var server = http.Server(app);
var io = socketIO(server);

// Init the app server port
app.set('port', 5000);
app.use('/', express.static('public'));
app.use('/scripts', express.static(__dirname + '/node_modules/'));

// Start the server
server.listen(5000, () => {
    console.log('Server is listening on http://localhost:5000');
});


/**
 * WEB SOCKET HANDLERS
 */
var players = {};
io.on('connection', (socket) => {
    socket.on('new player', () => {
        console.log(socket.id);
        players[socket.id] = {
            x:300,
            y:300
        };
    });

    socket.on('movement', (data) => {
        let player = players[socket.id] || {};
        console.log(data);
        if(data.left){
            player.x -= 5;
        }
        if(data.up){
            player.y -= 5;
        }
        if(data.right){
            player.x += 5;
        }
        if(data.down){
            player.y += 5;
        }
    })
});


// TODO - DELETE AS THIS IS FOR TESTING ONLY
setInterval(function() {
    io.sockets.emit('state', players);
}, 1000 / 60);