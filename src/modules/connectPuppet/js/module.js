var ConnectModule = (function () {
    "use stric";

    var localIp;

    var ConnectModule = function () {}.mixWith(Module);

    ConnectModule.prototype._init = function () {
        this.super()._init('connect-puppet');
    };
    ConnectModule.prototype.show = function () {
        //
        this.super().show();

        // subscribe to puppet connect event
        // get local IP to share connection address
        RemoteDeviceJS
            .on('puppet-connect', function () {
                //console.log('routing to device module');
                router.routeToModuleId('device');
            })
            .getIp()
                .then(function (ip) {
                    $('#connectModule').html('http://' + ip + ':6677')
                });
    };

    return ConnectModule;

})();