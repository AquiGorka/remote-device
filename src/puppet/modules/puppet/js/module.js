var PuppetModule = (function () {
	"use strict";

	var data = {
			orientation: {
				alpha: 0,
				beta: 0,
				gamma: 0
			},
			motion: {
				x: 0,
				y: 0,
				z: 0
			}
		};

	var sendData = function () {
		Puppet.emit('data', data);
	};

	var PuppetModule = function () {}.mixWith(Module);

	PuppetModule.prototype._init = function () {
		this.super()._init('puppet');
		//
		gyro.frequency = 1;
	};
	PuppetModule.prototype.hide = function () {
		gyro.stopTracking();
		//
		this.super().hide();
	};
	PuppetModule.prototype.show = function () {
		this.super().show(['puppet']);
		//
		// handlers
		gyro.startTracking(function(o) {
			data = {
				motion: {
					x: o.x,
					y: o.y,
					z: o.z
				},
				orientation: {
					alpha: o.alpha,
					beta: o.beta,
					gamma: o.gamma
				}
			};
			//
			sendData();
		});
	};

	return PuppetModule;

})();