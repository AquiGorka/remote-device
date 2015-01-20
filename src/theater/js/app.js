(function () {

	// init router with modules
	router.init([
		new ConnectModule(),
		new DeviceModule()
	]);

	// start remote device theater
	Theater
		// if there are no puupets left show connect module
		.on('puppet-disconnect-all', function () {
			router.routeToModuleId('connect');
		})
		// when connected as theater, route to connect puppet module
		.on('connect', function () {
			//console.log('Theater: connected as theater');
	        //
			router.routeToModuleId('connect');
		})
		// connect to server
		.connect({host: 'http://127.0.0.1:6677'});

})();
