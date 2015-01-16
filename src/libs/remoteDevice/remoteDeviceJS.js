var RemoteDeviceJS = (function () {

	var socket;
	
	var RemoteDeviceJS = function () {}.mixWith(Observable);

	RemoteDeviceJS.prototype.connect = function () {
		var that = this;
		socket = io('http://127.0.0.1:6677');
		socket.on('puppet-connect', function () {
			that._observers.notify('puppet-connect');
		});
		socket.on('puppet', function (data) {
			that._observers.notify('puppet', data);
		});
		socket.on('connect', function () {
			that._observers.notify('theater-connect');
		});
		socket.on('theater', function (data) {
			that._observers.notify('theater', data);
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