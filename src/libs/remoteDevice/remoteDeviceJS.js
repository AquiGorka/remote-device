var RemoteDeviceJS = (function () {

	var socket;
	
	var RemoteDeviceJS = function () {}.mixWith(Observable);

	RemoteDeviceJS.prototype.connect = function () {
		var that = this;
		socket = io('http://127.0.0.1:6677');
		socket.on('connect', function () {
			that._observers.notify('connect');
		});
		socket.on('theater', function () {
			//console.log('data from got-ip event')
			that._observers.notify('update');
		});
		return this;
	};
	RemoteDeviceJS.prototype.getIp = function () {
		return new Promise(function (fulfill, reject) {
			socket.on('got-ip', fulfill);
			socket.emit('get-ip');
		});
	};

	return new RemoteDeviceJS();

})();