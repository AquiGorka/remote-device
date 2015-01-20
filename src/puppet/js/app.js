(function () {

	// init router with modules
	router.init([
		new PuppetModule()
	]);

	// if I am the first I'll be the moderator
	Moderator
		// connect to server
		.connect({host: 'http://' + window.location.host});

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
