"use strict";

var util = require("util");
var events = require("events");

var clients = [];

var Theaters = function () {
	events.EventEmitter.call(this);
};

util.inherits(Theaters, events.EventEmitter);

Theaters.prototype.emitAll = function (event, data) {
	clients.forEach(function (client) {
		client.emit(event, data);
	});
	return this;
};
Theaters.prototype.getAll = function () {
	return clients;
};
Theaters.prototype.setup = function (io) {
	var that = this;
	io.on('connection', function (socket) {
		//
		socket.on('theater-connect', function () {
			//console.log('Server: client wants to become a theater: ', clients.length);
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
					event: 'connect'
				});
			});
			//
			socket.on('data', function (data) {
				that.emit('data', socket, {
					event: 'data',
					data: data
				});
			});
		});
	});
	//
	return this;
};

module.exports = new Theaters();


