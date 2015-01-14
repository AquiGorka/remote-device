"use strict";

var Module = require('../../../libs/aquigorka/module/module'),
	Utils = require('../../../libs/aquigorka/utils/utils');

var DeviceModule = function () {}.mixWith(Module);

DeviceModule.prototype._init = function () {
	this.super()._init('device');
};
DeviceModule.prototype.show = function () {
	console.log('Device Module Show');
	this.content = 'Device';
	this.super().show();
};

module.exports = DeviceModule;