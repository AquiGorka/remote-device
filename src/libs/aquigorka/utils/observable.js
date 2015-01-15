/*
!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Module=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
    "use strict";
*/
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
/*
    module.exports = Observable;
    
},{}]},{},[1])(1)
});
*/