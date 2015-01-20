(function () {

	// init router with modules
	router.init([
		new PuppetModule()
	]);

	// start remote device puppet
	Puppet
		// when connected as puppet, route to puppet module
		.on('connect', function () {
			//console.log('Puppet: connected as puppet');
	        //
			router.routeToModuleId('puppet');
		})
		// connect to server
		.connect({host: 'http://' + window.location.host});

})();
