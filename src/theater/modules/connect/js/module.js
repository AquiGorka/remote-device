var ConnectModule = (function () {
    "use stric";

    var localIp;

    var ConnectModule = function () {}.mixWith(Module);

    ConnectModule.prototype._init = function () {
        this.super()._init('connect');
    };
    ConnectModule.prototype.show = function () {
        //
        this.super().show(['connect']);
        //
        Theater
            // subscribe to puppet connect event
            .once('puppet-connect', function () {
                //console.log('Theater: route to device module');
                router.routeToModuleId('device');
            })
            // get local IP to share connection address
            .getIp()
                .catch(function (err) {
                    console.warn('Theater: There was an error when asking for server ip to share connection address');
                    throw(err);
                })
                .then(function (ip) {
                    $('#connectModule').html('http://' + ip + ':6677/puppet/index.html')
                });
    };

    return ConnectModule;

})();