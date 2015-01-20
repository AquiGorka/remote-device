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
		this.content = ''
	};
	PuppetModule.prototype.show = function () {
		this.super().show(['puppet']);
		//
		// handlers
		window.ondevicemotion = function (event) {
			data.motion = {
				x: event.acceleration.x,
				y: event.acceleration.y,
				z: event.acceleration.z
			}
			//
			sendData();
		}
		window.ondeviceorientation = function (event) {
			data.orientation = {
				alpha: event.alpha,
				beta: event.beta,
				gamma: event.gamma
			};
			//
			sendData();
		}
	};

	return PuppetModule;

})();