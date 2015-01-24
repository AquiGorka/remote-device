var Theater = (function () {
	"use strict";

	var socket;
	
	var Theater = function () {}.mixWith(Observable);

	Theater.prototype.connect = function (options) {
		//
		socket = io(options.host);
		//
		this._setup();
		//
		return this;
	};
	Theater.prototype.getIp = function () {
		if (socket) {
			return new Promise(function (fulfill, reject) {
				socket.once('got-ip', fulfill);
				socket.emit('get-ip');
			});
		} else {
			return Promise.reject();
		}
		
	};
	Theater.prototype._setup = function () {
		var that = this;
		// am I an accepted theater?
		socket.on('theater-accept', function () {
			//console.log('Theater: Accepted as theater');
			// listen to data sent to theater(s)
			socket.on('data', function (data) {
				that._observers.notify('data', data);
			});
			// listen to puppet connect event
			socket.on('puppet-connect', function () {
				//console.log('Theater: There is at least 1 puppet connected');
				that._observers.notify('puppet-connect');
			});
			// listen to all puppets disconnected event
			socket.on('puppet-disconnect-all', function () {
				//console.log('Theater: All puppets have been disconnected');
				that._observers.notify('puppet-disconnect-all');
			});
			//
			that._observers.notify('connect');
		});
		// tell the server I want to connect as theater
		socket.on('connect', function () {
			socket.emit('theater-connect');
		});	
	};

	return new Theater();

})();