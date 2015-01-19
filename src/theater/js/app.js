(function () {

	// init router with modules
	router.init([
		new ConnectModule(),
		new DeviceModule()
	]);

	// start remote device theater
	Theater
		// when connected as theater init route to connect puppet module
		.on('connect', function () {
			//console.log('Theater: connected as theater');
	        //
			router.routeToModuleId('connect-puppet');
		})
		// connect to server
		.connect({host: 'http://127.0.0.1:6677'});

})();
