'use strict';

var io = require('socket.io')(3000);

io.sockets.on('connection', function() {
  console.log('Client connected...');
})
