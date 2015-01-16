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
