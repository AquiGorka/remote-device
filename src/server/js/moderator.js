"use strict";

var clients = require('./clients.js');
var theaters = require('./theaters.js');
var puppets = require('./puppets.js');

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
						//
						if (puppets.getAll().length > 0) {
							theater.emitAll('puppet-connect');
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
						//
						theaters.emitAll('puppet-connect');
						break;
					case 'data':
						theaters.emitAll(data.event, data.data);
						break;
					case 'disconnect':
						if (puppets.getAll().length === 0) {
							theaters.emitAll('puppet-disconnect-all');
						}
						break;
					
				}						
			});
	}
};
