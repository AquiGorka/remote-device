"use strict";

var util = require("util");
var events = require("events");

var clients = [];

var Puppets = function () {
	events.EventEmitter.call(this);
};

util.inherits(Puppets, events.EventEmitter);

Puppets.prototype.emitAll = function (event, data) {
	clients.forEach(function (client) {
		client.emit(event, data);
	});
	return this;
};
Puppets.prototype.getAll = function () {
	return clients;
};
Puppets.prototype.setup = function (io) {
	var that = this;
	io.on('connection', function (socket) {
		//
		socket.on('puppet-connect', function () {
			//console.log('Server: client wants to become a puppet: ', clients.length);
			if (clients.indexOf(socket) === -1) {
				clients.push(socket);
				//
				that.emit('data', socket, {
					event: 'connect'
				});
			}
			// events
			socket.on('disconnect', function () {
				clients.splice(clients.indexOf(socket), 1);
				//
				that.emit('data', socket, {
					event: 'disconnect'
				});
			});
			//
			socket.on('data', function (data) {
				that.emit('data', socket, {
					event: 'data',
					data: data
				});
			});
			//
			socket.on('room-join', function (data) {
				that.emit('data', socket, {
					event: 'room-join',
					data: data.room
				});
			});
		});
	});
	//
	return this;
};

module.exports = new Puppets();
