"use strict";

var RoomManager = function () {
	this._rooms = [];
};

RoomManager.prototype._add = function (room) {
	this._rooms.push(room);
	this._rooms[room] = [];
	return this;
};
RoomManager.prototype.get = function (room) {
	var res = [];
	if (this._rooms && this._rooms[room]) {
		res = this._rooms[room];
	}
	return res;
};
RoomManager.prototype.getRooms = function (client) {
	var that = this;
	return this._rooms.filter(function (room) {
		return that._rooms[room].indexOf(client) > -1;
	});
};
RoomManager.prototype.join = function (client, room) {
	if (this._rooms.indexOf(room) === -1) {
		this._add(room);
	}
	if (this._rooms[room].indexOf(client) === -1) {
		this._rooms[room].push(client);
	}
	return this;
};
RoomManager.prototype.leave = function (client) {
	var that = this;
	this.getRooms(client).forEach(function (roomName) {
		that._rooms[roomName] = that._rooms[roomName].filter(function (anotherClient) {
			return anotherClient !== client;
		});
		if (that._rooms[roomName].length === 0) {
			that._remove(roomName);
		}
	});
	return this;
};
RoomManager.prototype._remove = function (room) {
	this._rooms.splice(this._rooms.indexOf(room), 1);
	return this;
};

var puppets = new RoomManager();
var theaters = new RoomManager();

module.exports = {
	getPuppets: function (room) {
		return puppets.get(room);
	},
	getTheaters: function (room) {
		return theaters.get(room);
	},
	getRoomsPuppets: function (puppet) {
		return puppets.getRooms(puppet);
	},
	getRoomsTheaters: function (theater) {
		return theaters.getRooms(theater);
	},
	joinPuppets: function (client, room) {
		puppets.join(client, room);
		return this;
	},
	joinTheaters: function (client, room) {
		theaters.join(client, room);
		return this;
	},
	leavePuppets: function (client) {
		puppets.leave(client);
		return this;
	},
	leaveTheaters: function (client) {
		theaters.leave(client);
		return this;
	}
};
