var Moderator = (function () {
	"use strict";

	var socket;
	
	var Moderator = function () {}.mixWith(Observable);

	Moderator.prototype.connect = function (options) {
		//
		socket = io(options.host);
		//
		this._setup();
		//
		return this;
	};
	Moderator.prototype.emit = function (event, data) {
		socket.emit(event, data);
	};
	Moderator.prototype._setup = function () {
		var that = this;
		// am I accepted as moderator?
		socket.on('moderator-connect', function () {
			//console.log('moderator: Accepted as moderator');
			that._setupHandlers();
		});
		// tell the server I want to connect as moderator
		socket.on('connect', function () {
			socket.emit('moderator-connect');
		});
	};
	Moderator.prototype._setupHandlers = function () {
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
	};

	return new Moderator();

})();