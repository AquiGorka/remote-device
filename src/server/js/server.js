"use strict";

var express = require('express');
var server = express();
var http = require('http').Server(server);
var io = require('socket.io')(http);

module.exports = {
	getIO: function () {
		return io;
	},
	start: function () {
		// socket server
		http.listen(6677);
		// http server
		server.use(express.static(__dirname + '/../../'));
		//
		console.log('Server ON : *:6677');
		//
		return this;
	}
};