"use strict";

var server = (function () {

	var express = require('express');
	var server = express();
	var http = require('http').Server(server);
	var io = require('socket.io')(http);

	// socket server
	http.listen(6677, function () {
		console.log('Server: listening on *:6677');
	});

	// http requests
	server.use(express.static(__dirname + '/../'));
	
	return {
		getIO: function () {
			return io;
		}
	};

})();


/************/
/* THEATERS */
/************/

var theaters = (function () {

	var io = server.getIO();
	var ip = require("ip");
	var clients = [];

	io.on('connection', function (socket) {
		// this client is a theater
		socket.on('theater-connect', function () {
			if (clients.indexOf(socket) === -1) {
				clients.push(socket);
				// let client know we accept it as theater
				socket.emit('theater-connect');
				// let client know if there are any puppets already connected
				//console.log('Server: Puppets length: ', puppets.getAll().length);
				if (puppets.getAll().length) {
					socket.emit('puppet-connect');
				}
				// setup
				socket.on('get-ip', function () {
					//console.log('Server: Theater asked for ip: ', ip.address());
					socket.emit('got-ip', ip.address());
				});
			}
		});
		// remove theater form array if disconnected
		socket.on('disconnect', function () {
			//clients.splice(clients.indexOf(socket), 1);
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
		// this client is our puppet
		socket.on('puppet-connect', function () {
			//console.log('Server: client wants to become a puppet: ', puppets.getAll().length);
			if (clients.length === 0) {
				clients.push(socket);
				//console.log('Server: Let theaters know of puppet', puppets.getAll().length);
				// let client know we accept it as puppet
				socket.emit('puppet-connect');
				// let theaters know we accepted a puppet
				theaters.emit('puppet-connect');
			}
		});
		// events
		// remove puppets form array if disconnected
		// if there are no more puppets left let theaters know
		socket.on('disconnect', function () {
			clients.splice(clients.indexOf(socket), 1);
			//
			if (clients.length === 0) {
				theaters.emit('puppet-disconnect-all');
			}
		});
		// relay data to theaters
		socket.on('data', function (data) {
			theaters.emit('data', data);
		});
	});

	return {
		getAll: function () {
			return clients;
		}
	};

})();

