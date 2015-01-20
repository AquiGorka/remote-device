"use strict";

/**********/
/* SERVER */
/**********/

var server = (function () {

	var express = require('express');
	var server = express();
	var http = require('http').Server(server);
	var io = require('socket.io')(http);

	// socket server
	http.listen(6677);

	// http requests
	server.use(express.static(__dirname + '/../'));

	//
	console.log('Server ON : *:6677');
	
	return {
		getIO: function () {
			return io;
		}
	};

})();

/***********/
/* CLIENTS */
/***********/
var everyone = (function () {

	var io = server.getIO();
	var ip = require("ip");
	var clients = [];
	
	io.on('connection', function (socket) {
		// this is a client
		clients.push(socket);
		// events
		socket.on('get-ip', function () {
			//console.log('Server: Client asked for ip: ', ip.address());
			socket.emit('got-ip', ip.address());
		});
		// remove client from array if disconnected
		socket.on('disconnect', function () {
			clients.splice(clients.indexOf(socket), 1);
		});
	});

	return {
		emit: function (event, data) {
			clients.forEach(function (client) {
				client.emit(event, data);
			});
		}
	}

})();

/************/
/* THEATERS */
/************/
var theaters = (function () {

	var io = server.getIO();
	var clients = [];

	io.on('connection', function (socket) {
		//
		socket.on('theater-connect', function () {
			//console.log('Server: client wants to become a theater: ', clients.length);
			if (clients.indexOf(socket) === -1) {
				clients.push(socket);
				// let client know we accept it as theater
				socket.emit('theater-connect');
			}
			// remove theater from array if disconnected
			socket.on('disconnect', function () {
				clients.splice(clients.indexOf(socket), 1);
			});
		});
	});

	return {
		emit: function (event, data) {
			clients.forEach(function (client) {
				client.emit(event, data);
			});
		}
	}

})();


/***********/
/* PUPPETS */
/***********/
var puppets = (function () {

	var io = server.getIO();
	var clients = [];

	io.on('connection', function (socket) {
		//
		socket.on('puppet-connect', function () {
			//console.log('Server: client wants to become a puppet: ', clients.length);
			if (clients.indexOf(socket) === -1) {
				clients.push(socket);
				// let client know we accept it as puppet
				socket.emit('puppet-connect');
				// let theaters know we accepted a puppet
				moderator.emit('puppet-connect');
			}
			// events
			// remove puppets from array if disconnected
			// if there are no more puppets left let theaters know
			socket.on('disconnect', function () {
				clients.splice(clients.indexOf(socket), 1);
			});
			// send data to moderator
			socket.on('data', function (data) {
				data.puppetIndex = clients.indexOf(socket);
				moderator.emit('puppet-data', data);
			});
		});
	});

	return {
		emit: function (event, data) {
			clients.forEach(function (client) {
				client.emit(event, data);
			});
		},
		getAll: function () {
			return clients;
		}
	};

})();


/*************/
/* MODERATOR */
/*************/
var moderator = (function () {

	var io = server.getIO();
	var clients = [];

	io.on('connection', function (socket) {
		// this client is our moderator
		socket.on('moderator-connect', function () {
			//console.log('Server: client wants to become the moderator: ', clients.length);
			if (clients.length === 0) {
				clients.push(socket);
				// let client know we accept it as moderator
				socket.emit('moderator-connect');
			}
			// events
			// remove moderator from array if disconnected
			// if there are connected puppets we ask them to take on the role of moderator
			// if there are no connected puppets we let theaters know
			socket.on('disconnect', function () {
				clients = [];
				// se use next tick to ensure clients have been spliced; this way it doesn't matter who received the disconnect event first
				process.nextTick(function () {
					//
					if (puppets.getAll().length > 0) {
						puppets.getAll()[0].emit('moderator-connect');
					} else {
						theaters.emit('puppet-disconnect-all');
					}
				});
				
			});
			// send data to theaters
			socket.on('theaters-data', function (data) {
				theaters.emit(data.event, data.data);
			});
			// send data to puppets
			socket.on('puppets-data', function (data) {
				puppets.emit(data.event, data.data);
			});
			// send data to everyone
			socket.on('clients-data', function (data) {
				everyone.emit(data.event, data.data);
			});
		});
	});

	return {
		emit: function (event, data) {
			clients.forEach(function (client) {
				client.emit(event, data);
			});
		}
	};

})();

