(function () {

	RemoteDeviceJS
		.connect()
		.on('theater-connect', function () {
			//console.log('theater connected');
	        //
			router.init([
				new ConnectModule(),
				new DeviceModule()
			]);

			router.routeToModuleId('connect-puppet');
		});

})();
