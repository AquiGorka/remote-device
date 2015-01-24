var Puppet = (function () {
	"use strict";

	var socket;
	
	var Puppet = function () {}.mixWith(Observable);

	Puppet.prototype.connect = function (options) {
		//
		socket = io(options.host);
		//
		this._setup();
		//
		return this;
	};
	Puppet.prototype.emit = function (event, data) {
		socket.emit(event, data);
	};
	Puppet.prototype.getIp = function () {
		if (socket) {
			return new Promise(function (fulfill, reject) {
				socket.once('got-ip', fulfill);
				socket.emit('get-ip');
			});
		} else {
			return Promise.reject();
		}
		
	};
	Puppet.prototype._setup = function () {
		var that = this;
		// am I accepted as puppet?
		socket.on('puppet-accept', function () {
			//console.log('Puppet: Accepted as puppet');
			socket.emit('room-join', {'room': 'standalone'});
			//
			that._observers.notify('connect');
		});
		// tell the server I want to connect as puppet
		socket.on('connect', function () {
			socket.emit('puppet-connect');
		});
	};

	return new Puppet();

})();