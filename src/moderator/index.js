"use strict";

var Moderator = require('./libs/remoteDevice/moderator.js');

Moderator
	// connect to server
	.connect({host: 'http://127.0.0.1:6677'});

console.log('Moderator ON');