'use strict';

var path = require('path');
var EventProxy = require('eventproxy');
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (client) {
  client.on('join', function(name) {
    console.log(name);
    client.name = name;
  });
  client.on('messages', function(data) {

    var ep = new EventProxy();
    ep.on('error', function(err) {
      throw err;
    });

    io.sockets.emit('messages', {
      name: client.name,
      message: data,
    });
  });
});
