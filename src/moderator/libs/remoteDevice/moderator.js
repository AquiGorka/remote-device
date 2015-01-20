"use strict";

var io = require('socket.io-client');

var socket;

module.exports = {
	connect: function (options) {
		//
		socket = io(options.host);
		//
		this.setup();
		//
		return this;
	},
	emit: function (event, data) {
		socket.emit(event, data);
	},
	setup: function () {
		var that = this;
		// am I accepted as moderator?
		socket.on('moderator-connect', function () {
			//console.log('Moderator: Accepted as moderator');
			that.setupHandlers();
		});
		// tell the server I want to connect as moderator
		socket.on('connect', function () {
			socket.emit('moderator-connect');
		});
	},
	setupHandlers: function () {
		socket.on('theater-connect', function () {
			//...
		});
		socket.on('theater-data', function (data) {
			//...
		});
		socket.on('puppet-connect', function () {
			socket.emit('theaters-data', {event: 'puppet-connect', data:{}});
		});
		socket.on('puppet-data', function (data) {
			socket.emit('theaters-data', {event: 'data', data: data});
		});
	}
};