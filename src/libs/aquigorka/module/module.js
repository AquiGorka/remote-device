!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Module=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var $ = require('jquery');

var Module = function (id) {
	this.content = '';
	this._init(id);
};

Module.prototype.getId = function () {
	return this._id;
};
Module.prototype.hide = function () {
	$(this.getId() + 'Module').remove();
};
Module.prototype._init = function (id) {
	this._id = id;
};
Module.prototype.onBack = function (callback) {
	callback();
};
Module.prototype.onExit = function (callback) {
	callback();
};
Module.prototype.show = function (params) {
	if ($(this.getId() + 'Module').length === 0) {
		$('#body').append('<section class="module" id="' + this.getId() + 'Module">' + this.content + '</section>');
	}
	//
	if (params && router) {
		router.setParameters(params);
	}
};

module.exports = Module;
},{}]},{},[1])(1)
});