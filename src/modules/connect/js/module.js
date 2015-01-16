var ConnectModule = (function () {
    "use stric";

    var localIp;

    var ConnectModule = function () {}.mixWith(Module);

    ConnectModule.prototype._init = function () {
        this.super()._init('connect');
    };
    ConnectModule.prototype.show = function () {
        //
        this.super().show();

        // subscribe to puppet connect event
        // get local IP to share connection address
        RemoteDeviceJS
            .on('puppet-connect', function () {
                router.routeToModuleId('device');
            })
            .getIp()
                .then(function (ip) {
                    $('#connectModule').html(ip + ':6677')
                });
    };

    return ConnectModule;

})();