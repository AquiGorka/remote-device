"use strict";

var util = require("util");
var events = require("events");
var ip = require("ip");

var clients = [];

var Clients = function () {
	events.EventEmitter.call(this);
};

util.inherits(Clients, events.EventEmitter);

Clients.prototype.emitAll = function (event, data) {
	clients.forEach(function (client) {
		client.emit(event, data);
	});
	return this;
};
Clients.prototype.setup = function (io) {
	var that = this;
	io.on('connection', function (socket) {
		// this is a client
		clients.push(socket);
		// events
		// get ip
		socket.on('get-ip', function () {
			//console.log('Server: Client asked for ip: ', ip.address());
			socket.emit('got-ip', ip.address());
		});
		// remove client if disconnected
		socket.on('disconnect', function () {
			clients.splice(clients.indexOf(socket), 1);
		});
	});
	//
	return this;
};

module.exports = new Clients();
