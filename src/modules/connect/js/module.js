"use strict";

var Module = require('../../../libs/aquigorka/module/module'),
	Utils = require('../../../libs/aquigorka/utils/utils');

var ConnectModule = function () {}.mixWith(Module);

ConnectModule.prototype._init = function () {
	this.super()._init('connect');
};
ConnectModule.prototype.show = function () {
	console.log('Connect Module Show');
	this.content = 'Connect';
	this.super().show();
};

module.exports = ConnectModule;