var DeviceModule = (function () {
	"use strict";

	var DeviceModule = function () {}.mixWith(Module);

	DeviceModule.prototype._init = function () {
		this.super()._init('device');
		this.content = 'Device'
	};
	DeviceModule.prototype.show = function () {
		this.super().show();

		// subscribe to update
		RemoteDeviceJS
			.on('update', function (data) {
				console.log(data);
				$('#deviceModule').html(JSON.stringify(data));
			});
	};

	return DeviceModule;

})();