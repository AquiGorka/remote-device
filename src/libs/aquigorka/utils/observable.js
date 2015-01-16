var Observable = (function () {
    "use stric";

    var subscribe = function(that, anObserver, eventName) {
        var observer = anObserver;
        if(eventName) {
            observer = function(anEventName, that, extra1, extra2, extra3) {
                if(eventName == anEventName) {
                    anObserver(that, extra1, extra2, extra3);
                }
            };
        }
        that._observers.push(observer);
        return observer;
    };

    var Observable = function () {
        this.cleanObservers();
        return this;
    };

    Observable.prototype.cleanObservers = function() {
        var that = this;
        this._observers = [];
        this._observers.notify = function(eventName, extra1, extra2, extra3) {
            this.forEach(function(anObserver) {
                if(typeof anObserver == 'function') {
                    anObserver(eventName, that, extra1, extra2, extra3);
                }
                else {
                    anObserver.notify(eventName, that, extra1, extra2, extra3);
                }
            });
            return that;
        };
        return this;
    };
    Observable.prototype.off = function () {
        // alias
        return this.cleanObservers();
    };
    Observable.prototype.on = function (event, observer) {
        // alias
        return this.subscribe(observer, event);
    };
    Observable.prototype.once = function (event, observer) {
        // alias
        return this.subscribeOnce(observer, event);
    };
    Observable.prototype.subscribe = function(anObserver, eventName) {
        subscribe(this, anObserver, eventName);
        return this;
    };
    Observable.prototype.subscribeOnce = function(anObserver, eventName) {
        var that = this;
        var obs = subscribe(this, function() {
            if(typeof anObserver == 'function') {
                anObserver.apply(this, arguments);
            }
            else {
                anObserver.notify.apply(anObserver, that, arguments);
            }
            //that._observers.remove(obs);
            that._observers[that._observers.indexOf(obs)] = function () {};
        }, eventName);
        return this;
    };

    return Observable;

})();