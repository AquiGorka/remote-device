"use strict";

// Array
Array.prototype.find = Array.prototype.find || function(testFunction) {
    return this.filter(testFunction)[0];
};
Array.prototype.remove = function(element) {
    while(this.has(element)) {
        this.splice(this.indexOf(element), 1);
    }
    return this;
};
Array.prototype.has = function(el) {
    return this.indexOf(el) != -1;
};
// Object
Object.getPrototypeObject = function(constructor) {
    var F = function() {};
    F.prototype = constructor.prototype;
    return new F;
};
Object.mix = function() {
    var ret = {};
    for(var i = 0; i < arguments.length; i++) {
        var src = arguments[i];
        for(var propertyName in src) {
            ret[propertyName] = src[propertyName];
        }
    }
    return ret;
};
// Function
Function.prototype.mixWith = function(trait) {
    var originalConstructor = this;
    var Constructor = function() {
    trait.apply(this, arguments);
    originalConstructor.apply(this, arguments);
};
Function.prototype.and = function(callback) {
    return (function(oldFn) {
        return function(a, b, c, d, e, f, g) {
            oldFn(a, b, c, d, e, f, g);
            callback(a, b, c, d, e, f, g);
        };
    })(this);
};
// Constructor
Constructor.prototype = Object.mix(Object.getPrototypeObject(originalConstructor),
    Object.getPrototypeObject(trait));
    Constructor.prototype.super = function() {
        var that = this, ret = {}, parentPrototype = Object.getPrototypeObject(trait);
        for(var superMethodName in parentPrototype) {
            if(typeof parentPrototype[superMethodName] == 'function') {
                ret[superMethodName] = (function(methodName) {
                    return function() {
                        return parentPrototype[methodName].apply(that, arguments);
                    };
                })(superMethodName);
            }
        }
        return ret;
    };
    return Constructor;
};
// String
String.prototype.capitalize = function () {
  return this.substr(0, 1).toUpperCase() + this.substr(1);
};

module.exports = {
    datePrettyFormat: function (time, months) {
        if (!months) {
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        }
        var date = new Date(time),
            diff = ((Date.now() - date.getTime()) / 1000),
            day_diff = Math.floor(diff / 86400);
        if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
            return;
        return day_diff === 0 && (
                diff < 120 && '1m' ||
                diff < 3600 && Math.floor( diff / 60 ) + 'm' ||
                diff < 7200 && '1h' ||
                diff < 86400 && Math.floor( diff / 3600 ) + 'h') ||
            day_diff >= 1 && date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
    }
};