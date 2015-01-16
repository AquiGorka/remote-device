"use strict";

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ip = require("ip");

// prepare relay
io.on('connection', function(socket) {
	//
	console.log('user connected');
	//
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
	// events
	socket.on('puppet', function (data) {
		console.log('puppet sent: ' + JSON.stringify(data));
		socket.broadcast.emit('theater', data);
	});
	socket.on('puppet-connect', function () {
		console.log('puppet connected');
		socket.broadcast.emit('puppet-connect');
	});
	socket.on('get-ip', function () {
		console.log('theater asked for ip: ', ip.address());
		socket.emit('got-ip', ip.address() );
	});
});

// socket server
http.listen(6677, function () {
	console.log('listening on *:6677');
});

// http requests
app.use(express.static(__dirname + '/')); 