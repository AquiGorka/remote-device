"use strict";

var clients = require('./clients.js');
var theaters = require('./theaters.js');
var puppets = require('./puppets.js');
var roomManager = require('./roomManager.js');

module.exports = {
	run: function (server) {
		//
		server.start();
		//
		clients.setup(server.getIO());
		//
		theaters
			.setup(server.getIO())
			.on('data', function (theater, data) {
				//console.log('Moderator: Theaters: data: ', data, theater);
				switch (data.event) {
					case 'connect':
						// acccept client as theater
						theater.emit('theater-accept');
						break;
					case 'disconnect':
						roomManager.leaveTheaters(theater);
						break;
					case 'room-join':
						roomManager.joinTheaters(theater, data.data);
						//
						if (roomManager.getPuppets(data.data) && roomManager.getPuppets(data.data).length > 0) {
							theater.emit('puppet-connect');
						}
						break;
				};
			});
		puppets
			.setup(server.getIO())
			.on('data', function (puppet, data) {
				//console.log('Moderator: Puppets: data: ', data, puppet);
				switch (data.event) {
					case 'connect':
						// acccept client as puppet
						puppet.emit('puppet-accept');
						break;
					case 'data':
						roomManager.getRoomsPuppets(puppet).forEach(function (room) {
							roomManager.getTheaters(room).forEach(function (theater) {
								theater.emit(data.event, data.data);
							});
						});
						break;
					case 'disconnect':
						var rooms = roomManager.getRoomsPuppets(puppet);
						//
						roomManager.leavePuppets(puppet);
						//
						rooms.forEach(function (room) {
							if (roomManager.getPuppets(room).length === 0) {
								roomManager.getTheaters(room).forEach(function (theater) {
									theater.emit('puppet-disconnect-all');
								});
							}
						});
						break;
					case 'room-join':
						roomManager.joinPuppets(puppet, data.data);
						//
						roomManager.getTheaters(data.data).forEach(function (theater) {
							theater.emit('puppet-connect');	
						});
						break;
				}						
			});
	}
};
