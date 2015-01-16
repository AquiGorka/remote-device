(function () {

	RemoteDeviceJS
		.connect()
		.on('connect', function () {
			console.log('connected');
	        //
			router.init([
				new ConnectModule(),
				new DeviceModule()
			]);

			router.routeToModuleId('connect');
		});

})();
