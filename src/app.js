"use strict";

var $ = require('jquery'),
    router = require('./libs/aquigorka/router/router'),
    ConnectModule = require('./modules/connect/js/module'),
    DeviceModule = require('./modules/device/js/module');

router.init([
      new ConnectModule(),
      new DeviceModule()
  ]);

router.routeToModuleId('connect');



/*
console.log('Console.log output');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var $ = require('jquery');

// prepare relay
io.on('connection', function(socket) {
	//
	console.log('user connected');
	//
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
	//
	socket.on('puppet', function (data) {
		console.log('puppet sent: ' + JSON.stringify(data));
		$('.content').text(JSON.stringify(data));
	});
});

// start server
http.listen(3000, function () {
	console.log('listening on *:3000');
});


// find out my ip address
var os = require('os');
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0
    ;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
  });
});

// another way
var ip = require("ip");
console.dir ( ip.address() );*/