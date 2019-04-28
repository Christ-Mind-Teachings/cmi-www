/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"transcript": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/js";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~page~profile~transcript","vendors~transcript","page~profile~transcript"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../cmi-audio/dist/capture/capture.css":
/*!*********************************************!*\
  !*** ../cmi-audio/dist/capture/capture.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../cmi-www/node_modules/mini-css-extract-plugin/dist/loader.js!../../../cmi-www/node_modules/css-loader/dist/cjs.js!./capture.css */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/capture/capture.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../cmi-www/node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../cmi-audio/dist/capture/capture.js":
/*!********************************************!*\
  !*** ../cmi-audio/dist/capture/capture.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return require(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }

      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) s(r[o]);

  return s;
})({
  1: [function (_dereq_, module, exports) {
    'use strict';

    mejs.i18n.en['mejs.capture'] = 'Show/Hide Audio Capture Markers';
    Object.assign(mejs.MepDefaults, {
      capture: null
    });
    Object.assign(MediaElementPlayer.prototype, {
      buildcapture: function buildcapture(player, controls, layers, media) {
        var t = this,
            captureTitle = mejs.Utils.isString(t.options.captureText) ? t.options.captureText : mejs.i18n.t('mejs.capture'),
            button = document.createElement('div');
        button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'capture-button ' + t.options.classPrefix + 'capture';
        button.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + captureTitle + '" aria-label="' + captureTitle + '" tabindex="0"></button>';
        t.addControlElement(button, 'capture');
        button.addEventListener('click', function () {
          var event = mejs.Utils.createEvent('capture', media);
          media.dispatchEvent(event);
        });
      }
    });
  }, {}]
}, {}, [1]);

/***/ }),

/***/ "../cmi-audio/dist/jump-forward/jump-forward.css":
/*!*******************************************************!*\
  !*** ../cmi-audio/dist/jump-forward/jump-forward.css ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../cmi-www/node_modules/mini-css-extract-plugin/dist/loader.js!../../../cmi-www/node_modules/css-loader/dist/cjs.js!./jump-forward.css */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/jump-forward/jump-forward.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../cmi-www/node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../cmi-audio/dist/jump-forward/jump-forward.js":
/*!******************************************************!*\
  !*** ../cmi-audio/dist/jump-forward/jump-forward.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return require(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }

      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) s(r[o]);

  return s;
})({
  1: [function (_dereq_, module, exports) {
    'use strict';

    mejs.i18n.en['mejs.time-jump-forward'] = ['Jump forward 1 second', 'Jump forward %1 seconds'];
    Object.assign(mejs.MepDefaults, {
      jumpForwardInterval: 30,
      jumpForwardText: null
    });
    Object.assign(MediaElementPlayer.prototype, {
      buildjumpforward: function buildjumpforward(player, controls, layers, media) {
        var t = this,
            defaultTitle = mejs.i18n.t('mejs.time-jump-forward', t.options.jumpForwardInterval),
            forwardTitle = mejs.Utils.isString(t.options.jumpForwardText) ? t.options.jumpForwardText.replace('%1', t.options.jumpForwardInterval) : defaultTitle,
            button = document.createElement('div');
        button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'jump-forward-button';
        button.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + forwardTitle + '" aria-label="' + forwardTitle + '" tabindex="0">' + t.options.jumpForwardInterval + '</button>';
        t.addControlElement(button, 'jumpforward');
        button.addEventListener('click', function () {
          var duration = !isNaN(media.duration) ? media.duration : t.options.jumpForwardInterval;

          if (duration) {
            var current = media.currentTime === Infinity ? 0 : media.currentTime;
            media.setCurrentTime(Math.min(current + t.options.jumpForwardInterval, duration));
            this.querySelector('button').blur();
          }
        });
      }
    });
  }, {}]
}, {}, [1]);

/***/ }),

/***/ "../cmi-audio/dist/nextp/nextp.css":
/*!*****************************************!*\
  !*** ../cmi-audio/dist/nextp/nextp.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../cmi-www/node_modules/mini-css-extract-plugin/dist/loader.js!../../../cmi-www/node_modules/css-loader/dist/cjs.js!./nextp.css */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/nextp/nextp.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../cmi-www/node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../cmi-audio/dist/nextp/nextp.js":
/*!****************************************!*\
  !*** ../cmi-audio/dist/nextp/nextp.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return require(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }

      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) s(r[o]);

  return s;
})({
  1: [function (_dereq_, module, exports) {
    'use strict';

    mejs.i18n.en['mejs.nextp'] = 'Next Paragraph';
    Object.assign(mejs.MepDefaults, {
      nextpText: null
    });
    Object.assign(MediaElementPlayer.prototype, {
      buildnextp: function buildnextp(player, controls, layers, media) {
        var t = this,
            nextpTitle = mejs.Utils.isString(t.options.nextpText) ? t.options.nextpText : mejs.i18n.t('mejs.nextp'),
            button = document.createElement('div');
        button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'nextp-button ' + t.options.classPrefix + 'nextp';
        button.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + nextpTitle + '" aria-label="' + nextpTitle + '" tabindex="0"></button>';
        t.addControlElement(button, 'nextp');
        button.addEventListener('click', function () {
          if (player.paused) {
            return;
          }

          var event = mejs.Utils.createEvent('nextp', media);
          media.dispatchEvent(event);
        });
      }
    });
  }, {}]
}, {}, [1]);

/***/ }),

/***/ "../cmi-audio/dist/prevp/prevp.css":
/*!*****************************************!*\
  !*** ../cmi-audio/dist/prevp/prevp.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../cmi-www/node_modules/mini-css-extract-plugin/dist/loader.js!../../../cmi-www/node_modules/css-loader/dist/cjs.js!./prevp.css */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/prevp/prevp.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../cmi-www/node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../cmi-audio/dist/prevp/prevp.js":
/*!****************************************!*\
  !*** ../cmi-audio/dist/prevp/prevp.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return require(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }

      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) s(r[o]);

  return s;
})({
  1: [function (_dereq_, module, exports) {
    'use strict';

    mejs.i18n.en['mejs.prevp'] = 'Previous Paragraph';
    Object.assign(mejs.MepDefaults, {
      prevpText: null
    });
    Object.assign(MediaElementPlayer.prototype, {
      buildprevp: function buildprevp(player, controls, layers, media) {
        var t = this,
            prevpTitle = mejs.Utils.isString(t.options.prevpText) ? t.options.prevpText : mejs.i18n.t('mejs.prevp'),
            button = document.createElement('div');
        button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'prevp-button ' + t.options.classPrefix + 'prevp';
        button.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + prevpTitle + '" aria-label="' + prevpTitle + '" tabindex="0"></button>';
        t.addControlElement(button, 'prevp');
        button.addEventListener('click', function () {
          if (player.paused) {
            return;
          }

          var event = mejs.Utils.createEvent('prevp', media);
          media.dispatchEvent(event);
        });
      }
    });
  }, {}]
}, {}, [1]);

/***/ }),

/***/ "../cmi-audio/dist/ptoggle/ptoggle.css":
/*!*********************************************!*\
  !*** ../cmi-audio/dist/ptoggle/ptoggle.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../cmi-www/node_modules/mini-css-extract-plugin/dist/loader.js!../../../cmi-www/node_modules/css-loader/dist/cjs.js!./ptoggle.css */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/ptoggle/ptoggle.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../cmi-www/node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../cmi-audio/dist/ptoggle/ptoggle.js":
/*!********************************************!*\
  !*** ../cmi-audio/dist/ptoggle/ptoggle.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return require(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }

      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) s(r[o]);

  return s;
})({
  1: [function (_dereq_, module, exports) {
    'use strict';

    mejs.i18n.en['mejs.ptoggle'] = 'Show/Hide Paragraph Jump Markers';
    Object.assign(mejs.MepDefaults, {
      ptoggleText: null
    });
    Object.assign(MediaElementPlayer.prototype, {
      buildptoggle: function buildptoggle(player, controls, layers, media) {
        var t = this,
            ptoggleTitle = mejs.Utils.isString(t.options.ptoggleText) ? t.options.ptoggleText : mejs.i18n.t('mejs.ptoggle'),
            button = document.createElement('div');
        button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'ptoggle-button ' + t.options.classPrefix + 'ptoggle';
        button.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + ptoggleTitle + '" aria-label="' + ptoggleTitle + '" tabindex="0"></button>';
        t.addControlElement(button, 'ptoggle');
        button.addEventListener('click', function () {
          var event = mejs.Utils.createEvent('ptoggle', media);
          media.dispatchEvent(event);
        });
      }
    });
  }, {}]
}, {}, [1]);

/***/ }),

/***/ "../cmi-audio/dist/skip-back/skip-back.css":
/*!*************************************************!*\
  !*** ../cmi-audio/dist/skip-back/skip-back.css ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../cmi-www/node_modules/mini-css-extract-plugin/dist/loader.js!../../../cmi-www/node_modules/css-loader/dist/cjs.js!./skip-back.css */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/skip-back/skip-back.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../cmi-www/node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../cmi-audio/dist/skip-back/skip-back.js":
/*!************************************************!*\
  !*** ../cmi-audio/dist/skip-back/skip-back.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return require(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }

      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) s(r[o]);

  return s;
})({
  1: [function (_dereq_, module, exports) {
    'use strict';

    mejs.i18n.en['mejs.time-skip-back'] = ['Skip back 1 second', 'Skip back %1 seconds'];
    Object.assign(mejs.MepDefaults, {
      skipBackInterval: 30,
      skipBackText: null
    });
    Object.assign(MediaElementPlayer.prototype, {
      buildskipback: function buildskipback(player, controls, layers, media) {
        var t = this,
            defaultTitle = mejs.i18n.t('mejs.time-skip-back', t.options.skipBackInterval),
            skipTitle = mejs.Utils.isString(t.options.skipBackText) ? t.options.skipBackText.replace('%1', t.options.skipBackInterval) : defaultTitle,
            button = document.createElement('div');
        button.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'skip-back-button';
        button.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + skipTitle + '" aria-label="' + skipTitle + '" tabindex="0">' + t.options.skipBackInterval + '</button>';
        t.addControlElement(button, 'skipback');
        button.addEventListener('click', function () {
          var duration = !isNaN(media.duration) ? media.duration : t.options.skipBackInterval;

          if (duration) {
            var current = media.currentTime === Infinity ? 0 : media.currentTime;
            media.setCurrentTime(Math.max(current - t.options.skipBackInterval, 0));
            this.querySelector('button').blur();
          }
        });
      }
    });
  }, {}]
}, {}, [1]);

/***/ }),

/***/ "../cmi-audio/dist/speed/speed.css":
/*!*****************************************!*\
  !*** ../cmi-audio/dist/speed/speed.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../cmi-www/node_modules/mini-css-extract-plugin/dist/loader.js!../../../cmi-www/node_modules/css-loader/dist/cjs.js!./speed.css */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/speed/speed.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../cmi-www/node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "../cmi-audio/dist/speed/speed.js":
/*!****************************************!*\
  !*** ../cmi-audio/dist/speed/speed.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;/*!
 * MediaElement.js
 * http://www.mediaelementjs.com/
 *
 * Wrapper that mimics native HTML5 MediaElement (audio and video)
 * using a variety of technologies (pure JavaScript, Flash, iframe)
 *
 * Copyright 2010-2017, John Dyer (http://j.hn/)
 * License: MIT
 *
 */
(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;
        if (!u && a) return require(o, !0);
        if (i) return i(o, !0);
        var f = new Error("Cannot find module '" + o + "'");
        throw f.code = "MODULE_NOT_FOUND", f;
      }

      var l = n[o] = {
        exports: {}
      };
      t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }

    return n[o].exports;
  }

  var i = typeof require == "function" && require;

  for (var o = 0; o < r.length; o++) s(r[o]);

  return s;
})({
  1: [function (_dereq_, module, exports) {
    'use strict';

    mejs.i18n.en['mejs.speed-rate'] = 'Speed Rate';
    Object.assign(mejs.MepDefaults, {
      speeds: ['2.00', '1.50', '1.25', '1.00', '0.75'],
      defaultSpeed: '1.00',
      speedChar: 'x',
      speedText: null
    });
    Object.assign(MediaElementPlayer.prototype, {
      buildspeed: function buildspeed(player, controls, layers, media) {
        var t = this,
            isNative = t.media.rendererName !== null && /(native|html5)/i.test(t.media.rendererName);

        if (!isNative) {
          return;
        }

        var speeds = [],
            speedTitle = mejs.Utils.isString(t.options.speedText) ? t.options.speedText : mejs.i18n.t('mejs.speed-rate'),
            getSpeedNameFromValue = function getSpeedNameFromValue(value) {
          for (var i = 0, total = speeds.length; i < total; i++) {
            if (speeds[i].value === value) {
              return speeds[i].name;
            }
          }
        };

        var playbackSpeed = void 0,
            defaultInArray = false;

        for (var i = 0, total = t.options.speeds.length; i < total; i++) {
          var s = t.options.speeds[i];

          if (typeof s === 'string') {
            speeds.push({
              name: '' + s + t.options.speedChar,
              value: s
            });

            if (s === t.options.defaultSpeed) {
              defaultInArray = true;
            }
          } else {
            speeds.push(s);

            if (s.value === t.options.defaultSpeed) {
              defaultInArray = true;
            }
          }
        }

        if (!defaultInArray) {
          speeds.push({
            name: t.options.defaultSpeed + t.options.speedChar,
            value: t.options.defaultSpeed
          });
        }

        speeds.sort(function (a, b) {
          return parseFloat(b.value) - parseFloat(a.value);
        });
        t.cleanspeed(player);
        player.speedButton = document.createElement('div');
        player.speedButton.className = t.options.classPrefix + 'button ' + t.options.classPrefix + 'speed-button';
        player.speedButton.innerHTML = '<button type="button" aria-controls="' + t.id + '" title="' + speedTitle + '" ' + ('aria-label="' + speedTitle + '" tabindex="0">' + getSpeedNameFromValue(t.options.defaultSpeed) + '</button>') + ('<div class="' + t.options.classPrefix + 'speed-selector ' + t.options.classPrefix + 'offscreen">') + ('<ul class="' + t.options.classPrefix + 'speed-selector-list"></ul>') + '</div>';
        t.addControlElement(player.speedButton, 'speed');

        for (var _i = 0, _total = speeds.length; _i < _total; _i++) {
          var inputId = t.id + '-speed-' + speeds[_i].value;
          player.speedButton.querySelector('ul').innerHTML += '<li class="' + t.options.classPrefix + 'speed-selector-list-item">' + ('<input class="' + t.options.classPrefix + 'speed-selector-input" type="radio" name="' + t.id + '_speed"') + ('disabled="disabled" value="' + speeds[_i].value + '" id="' + inputId + '"  ') + ((speeds[_i].value === t.options.defaultSpeed ? ' checked="checked"' : '') + '/>') + ('<label for="' + inputId + '" class="' + t.options.classPrefix + 'speed-selector-label') + ((speeds[_i].value === t.options.defaultSpeed ? ' ' + t.options.classPrefix + 'speed-selected' : '') + '">') + (speeds[_i].name + '</label>') + '</li>';
        }

        playbackSpeed = t.options.defaultSpeed;
        player.speedSelector = player.speedButton.querySelector('.' + t.options.classPrefix + 'speed-selector');
        var inEvents = ['mouseenter', 'focusin'],
            outEvents = ['mouseleave', 'focusout'],
            radios = player.speedButton.querySelectorAll('input[type="radio"]'),
            labels = player.speedButton.querySelectorAll('.' + t.options.classPrefix + 'speed-selector-label');

        for (var _i2 = 0, _total2 = inEvents.length; _i2 < _total2; _i2++) {
          player.speedButton.addEventListener(inEvents[_i2], function () {
            mejs.Utils.removeClass(player.speedSelector, t.options.classPrefix + 'offscreen');
            player.speedSelector.style.height = player.speedSelector.querySelector('ul').offsetHeight;
            player.speedSelector.style.top = -1 * parseFloat(player.speedSelector.offsetHeight) + 'px';
          });
        }

        for (var _i3 = 0, _total3 = outEvents.length; _i3 < _total3; _i3++) {
          player.speedSelector.addEventListener(outEvents[_i3], function () {
            mejs.Utils.addClass(this, t.options.classPrefix + 'offscreen');
          });
        }

        for (var _i4 = 0, _total4 = radios.length; _i4 < _total4; _i4++) {
          var radio = radios[_i4];
          radio.disabled = false;
          radio.addEventListener('click', function () {
            var self = this,
                newSpeed = self.value;
            playbackSpeed = newSpeed;
            media.playbackRate = parseFloat(newSpeed);
            player.speedButton.querySelector('button').innerHTML = getSpeedNameFromValue(newSpeed);
            var selected = player.speedButton.querySelectorAll('.' + t.options.classPrefix + 'speed-selected');

            for (var _i5 = 0, _total5 = selected.length; _i5 < _total5; _i5++) {
              mejs.Utils.removeClass(selected[_i5], t.options.classPrefix + 'speed-selected');
            }

            self.checked = true;
            var siblings = mejs.Utils.siblings(self, function (el) {
              return mejs.Utils.hasClass(el, t.options.classPrefix + 'speed-selector-label');
            });

            for (var j = 0, _total6 = siblings.length; j < _total6; j++) {
              mejs.Utils.addClass(siblings[j], t.options.classPrefix + 'speed-selected');
            }
          });
        }

        for (var _i6 = 0, _total7 = labels.length; _i6 < _total7; _i6++) {
          labels[_i6].addEventListener('click', function () {
            var radio = mejs.Utils.siblings(this, function (el) {
              return el.tagName === 'INPUT';
            })[0],
                event = mejs.Utils.createEvent('click', radio);
            radio.dispatchEvent(event);
          });
        }

        player.speedSelector.addEventListener('keydown', function (e) {
          e.stopPropagation();
        });
        media.addEventListener('loadedmetadata', function () {
          if (playbackSpeed) {
            media.playbackRate = parseFloat(playbackSpeed);
          }
        });
      },
      cleanspeed: function cleanspeed(player) {
        if (player) {
          if (player.speedButton) {
            player.speedButton.parentNode.removeChild(player.speedButton);
          }

          if (player.speedSelector) {
            player.speedSelector.parentNode.removeChild(player.speedSelector);
          }
        }
      }
    });
  }, {}]
}, {}, [1]);

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/capture/capture.css":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/capture/capture.css ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/jump-forward/jump-forward.css":
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/jump-forward/jump-forward.css ***!
  \***************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/nextp/nextp.css":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/nextp/nextp.css ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/prevp/prevp.css":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/prevp/prevp.css ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/ptoggle/ptoggle.css":
/*!*****************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/ptoggle/ptoggle.css ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/skip-back/skip-back.css":
/*!*********************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/skip-back/skip-back.css ***!
  \*********************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/speed/speed.css":
/*!*************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js!../cmi-audio/dist/speed/speed.css ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/js/modules/_audio/audio.js":
/*!****************************************!*\
  !*** ./src/js/modules/_audio/audio.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_config/config */ "./src/js/modules/_config/config.js");
/* harmony import */ var _mediaelement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mediaelement */ "./src/js/modules/_audio/mediaelement.js");


const uiPlayerToggle = ".audio-player-toggle";
const uiAudioPlayerToggle = ".audio-player-wrapper"; //show menu option that toggle's display of the audio player

function showAudioPlayerMenuOption() {
  $(".audio-player-toggle.hide").removeClass("hide");
} //set url of mp3 file


function setAudioPlayerSource(url) {
  $(uiPlayerToggle).attr("href", url);
} //toggle display of the audio player


function createAudioPlayerToggleListener() {
  $(uiPlayerToggle).on("click", e => {
    e.preventDefault();
    let $toggle = $(uiAudioPlayerToggle);

    if ($toggle.hasClass("hide")) {
      $toggle.removeClass("hide");
    } else {
      $toggle.addClass("hide");
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  //setup page to play audio if audio available
  initialize: function () {
    let info = Object(_config_config__WEBPACK_IMPORTED_MODULE_0__["getAudioInfo"])(location.pathname); //add audio url to audio player toggle

    if (info.audio) {
      setAudioPlayerSource(`${info.audioBase}${info.audio}`);
      showAudioPlayerMenuOption(); //setup listener for audio-player-toggle

      createAudioPlayerToggleListener(); //initialize audio player

      _mediaelement__WEBPACK_IMPORTED_MODULE_1__["default"].initialize(`${info.audioBase}${info.audio}`, info.timing);
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ "./src/js/modules/_audio/capture.js":
/*!******************************************!*\
  !*** ./src/js/modules/_audio/capture.js ***!
  \******************************************/
/*! exports provided: setCaptureData, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCaptureData", function() { return setCaptureData; });
/* harmony import */ var _captureData__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./captureData */ "./src/js/modules/_audio/captureData.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! store */ "./node_modules/store/dist/store.legacy.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scroll-into-view */ "./node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _focus__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./focus */ "./src/js/modules/_audio/focus.js");
/*
 * 
 * This allows the user to capture the audio playback time at the start of each
 * paragraph. 
 * 
 * Each paragraph under .cmiTranPara, for transcripts containing audio and that have not yet
 * been timed, have a bullseye icon inserted at the beginning. When audio is played, pressing
 * the 'C' on the audio player displays the bullseye.
 * 
 * When clicked, the bullseye becomes a check mark indicating time has been captured. Whe clicked
 * again the check mark becomes a bullseye. Data is stored in local storage while it is being 
 * collected and can be restored if the timing session is interrupted before the data is submitted.
 * 
 * A bullseye is clicked when the audio is transitioning between paragrapsh - in the gap between
 * the previous paragraph and before the current. When all paragraphs have been clicked and the audio
 * ends, the timing submission form if displayed automatically. The user just submits the form and
 * the timing data ends up being emailed to the recipient as configured with Netlify.
 * 
 * If the submit fails, the timing data is stored in local storage and the form is automatically
 * displayed when the page is refreshed or returned to at a later time.
 * 
 * Requirements to capture
 * 
 * 1. be logged in with role of "timer"
 * 2. the transcript is reserved for timing by the one logged in or not reserved
 * 
 */






/*
  if a timer closes the submit form without pressing submit the data 
  will be lost. So we check for this condition and warn them once
*/

let posted = false;
let warned = false;
let captureData;
let audioPlayer;
let audioPlaying = false;
let captureRequested = false;
let captureId = "";
let markerIcon = "bullseye";
const uiTimeCaptureModal = ".timecapture.ui.modal";
const uiModalOpacity = 0.5;
let timingData = null;
let haveTimingData = false;
let editInitialized = false;
/*
  If we have timing data and we haven't initialized then
  request confirmation from user they want to take timing.
  If response is yes
    initialize and
    return true
  if response is no
    return false
  
  If we don't have timing data 
    return true
*/

function initializeEdit() {
  return new Promise((resolve, reject) => {
    if (!haveTimingData) {
      resolve(true);
      return;
    } else {
      if (haveTimingData && editInitialized) {
        resolve(true);
        return;
      } //display modal


      $(".time-edit-modal.ui.modal").modal({
        dimmerSettings: {
          opacity: 0.5
        },
        closable: false,
        onDeny: function () {
          resolve(false);
        },
        onApprove: function () {
          //check current timing has the correct number of data points
          let noOfParagraphs = $("p.cmiTranPara").length;

          if (noOfParagraphs !== timingData.length) {
            toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error("Unexpected number of data points in existing timing data, please inform Rick, Can't capture time until this is resolved.");
            resolve(false);
            return;
          }

          restoreState(); //disable scroll when timing enabled

          Object(_focus__WEBPACK_IMPORTED_MODULE_5__["disableScroll"])();
          editInitialized = true;
          resolve(true);
        }
      }).modal("show");
    }
  });
}
/*
  This function called from focus.js after timing data has been fetched and
  the user is a TIMER. This allows user to modify existing timing data which
  is sometimes needed due to previously inadequate job.
*/


function setCaptureData(data) {
  //console.log("capture: timing data received");
  timingData = data;
}
/*
  save in-progress time capture data
*/

function captureProgress(operation) {
  if (operation === "SAVE") {
    store__WEBPACK_IMPORTED_MODULE_2___default.a.set(`$captureData-${location.pathname}`, captureData.getData());
  } else if (operation === "REMOVE") {
    store__WEBPACK_IMPORTED_MODULE_2___default.a.remove(`$captureData-${location.pathname}`);
  }
}
/*
 * Capture time for a given paragraph - programatically
 * args: o - time stamp, {pid, seconds}
 *       save - boolean, indicates of time should be saved to local store by markParagraph
 */


function autoCapture(o, save = true) {
  captureRequested = true;
  markParagraph(o, save);
}
/*
  mark paragraphs during time collection. 

  Initially the marker is a bullseye or clock, a clock is used when we have
  timing data previously collected, otherwise we use a bullseye.

  When a marker is clicked it becomes a 'check' to indicate time was collected. When
  the 'check' is clicked the data point for that paragraph is deleted and the 
  marker is set to a 'bullseye' to indicate we don't have a time point for the
  paragraph. 
*/


function markParagraph(o, save = true) {
  var pi = $("#" + o.id).children("i.timing"); //console.log("markParagraph: ");

  if (!captureRequested) {
    return;
  } //mark as captured


  if (pi.hasClass(markerIcon)) {
    pi.removeClass(markerIcon).addClass("check");
    captureData.add(o);

    if (save) {
      captureProgress("SAVE");
    }
  } else if (pi.hasClass("bullseye")) {
    pi.removeClass("bullseye").addClass("check");
    captureData.add(o);

    if (save) {
      captureProgress("SAVE");
    }
  } //user clicked a captured paragraph, mark for delete
  else if (pi.hasClass("check")) {
      pi.removeClass("check").addClass("bullseye");
      captureData.remove(o);

      if (save) {
        captureProgress("SAVE");
      }
    }

  captureRequested = false;
}
/*
 * Time capture listener
 * - listen for user click on bullseye or check mark and 
 *   set captureRequested flag
 */


function createListener() {
  //create listener
  $(".transcript.ui.text.container").on("click", "p.cmiTranPara > i.timing.icon", function (e) {
    e.preventDefault();

    if (audioPlaying) {
      captureRequested = true;
      captureId = e.target.parentElement.id;
    } else {
      toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info("Click is ignored when audio is not playing.");
    }
  }); //initialize time capture modal

  $(uiTimeCaptureModal).modal({
    dimmerSettings: {
      opacity: uiModalOpacity
    },
    closable: false,
    onHide: function () {
      if (!posted && !warned) {
        toastr__WEBPACK_IMPORTED_MODULE_1___default.a.warning("Warning, your timing data will be lost if you close the window without submitting the data.", "Your Data Will Be Lost", {
          timeOut: 10000,
          closeButton: true
        });
        warned = true;
        return false;
      }
    }
  }); //time submit form in modal window

  $("#audio-data-form").submit(function (e) {
    e.preventDefault();
    posted = true; //console.log("submit pressed");

    let $form = $(this);
    $.post($form.attr("action"), $form.serialize()).done(function () {
      toastr__WEBPACK_IMPORTED_MODULE_1___default.a.success("Thank you! The data was submitted successfully.");
      $(uiTimeCaptureModal).modal("hide");
      toggleMarkers(); //if there was a previously failed submit - remove it

      store__WEBPACK_IMPORTED_MODULE_2___default.a.remove(`captureData-${location.pathname}`);
    }).fail(function (e) {
      toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error("Sorry, submit failed.");
      $("#audio-data-form .ui.message").addClass("negative").html(`<div class="header">Drat! Your submit failed.</div>
           <p>To re-submit, try to refresh the page or return at a later time.
           The data will not be lost. This form will be displayed the next
           time you visit the page.</p>`);
      $("#audio-form-submit").addClass("disabled"); //store data so we can submit later

      store__WEBPACK_IMPORTED_MODULE_2___default.a.set(`captureData-${location.pathname}`, captureData.getData());
    });
  });
}
/*
 * if data submit previously failed it is stored in Application 
 * local storage. If stored data is found try to submit the data
 * again.
 */


function retrySubmit() {
  let data = store__WEBPACK_IMPORTED_MODULE_2___default.a.get(`captureData-${location.pathname}`);

  if (data) {
    //setting posted = true, prevents the warning message displayed when user exits the modal without
    //submitting data. The warning is not needed when data is being resubmited due to previous failure.
    posted = true;
    captureData.setData(data); //console.log("timing data: ", data);

    $("#captured-audio-data").html(JSON.stringify(data));
    let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_3__["getUserInfo"])(); //if user logged in automatically fill in user info

    if (userInfo) {
      $("#captured-audio-name").val(userInfo.name);
      $("#captured-audio-email").val(userInfo.email);
    }

    $(uiTimeCaptureModal).modal("show");
    return true;
  }

  return false;
}
/*
  Timing data is stored in local storage while timing is in progress. When
  the page is initialized if partial data is found the timing session
  is restored to where it left off.
*/


function recoverPartialSession() {
  let data = store__WEBPACK_IMPORTED_MODULE_2___default.a.get(`$captureData-${location.pathname}`);

  if (data) {
    store__WEBPACK_IMPORTED_MODULE_2___default.a.remove(`$captureData-${location.pathname}`); //record time and park paragraph as timed

    for (let t in data.time) {
      autoCapture(data.time[t]);
    }

    let lastParagraph = data.time[data.time.length - 1]; //console.log("last paragraph: ", lastParagraph);
    //adjust audio play time to last timed paragraph

    audioPlayer.setCurrentTime(lastParagraph.seconds);
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info("Partial audio capture data restored. You can continue timing where you left off."); //scroll last timed paragraph into viewport

    scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(lastParagraph.id)); //indicate previous session was recovered

    return true;
  }

  return false;
}
/*
 * show or hide timing marker (bullseye) 
 */


function toggleMarkers() {
  let el = $(".transcript.ui.text.container");

  if (el.hasClass("hide-timing")) {
    //do we need to initialize edit of existing timing data
    //returns true if capture enabled
    initializeEdit().then(response => {
      if (response) {
        el.removeClass("hide-timing");
      }
    });
  } else {
    el.addClass("hide-timing");
  }
}
/*
  recover from failed timing data submit or incomplete timing session
  if present
*/


function restoreState() {
  //no failed submit found check for partial timing session
  //console.log("restoreState");
  if (!retrySubmit()) {
    //if no partial session was found, just mark first paragraph as selected
    if (!recoverPartialSession()) {
      if (!haveTimingData) {
        //create first data point but don't save in local store since user
        //has not initiated timing
        autoCapture({
          id: "p0",
          seconds: 0
        }, false);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  /*
    The timingData parameter is optional and used when the user is a TIMER and we have
    timing data. In this case we load the timing data and allow the user to collect new
    times
  */
  initialize: function (player, timingData) {
    console.log("capture.init"); //if we support time capture and we already have timing data, mark paragraphs
    //with a clock instead of the bullseye to indicate that we do have data

    if (timingData) {
      haveTimingData = true;
      markerIcon = "clock";
    }

    captureData = new _captureData__WEBPACK_IMPORTED_MODULE_0__["default"](location.pathname);
    captureData.setPlayer(player); //save a local reference to the audio player

    audioPlayer = player; //initially hide capture (bullseye) icon

    $(".transcript.ui.text.container").addClass("hide-timing"); //add bullseye or clock icon to each class without class 'omit'

    $("p.cmiTranPara").each(function () {
      $(this).prepend(`<i class='timing large circular red ${markerIcon} outline icon'></i>`);
    }); //create time capture listeners

    createListener(); //if we don't have timing data call restoreState() otherwise
    //we receive timing data from setCaptureData() and call restoreState()
    //from there after loading the data

    if (!timingData) {
      //check for failed submit or partial timing session
      restoreState();
    } else {
      //notify user if there is a partial timing session
      if (store__WEBPACK_IMPORTED_MODULE_2___default.a.get(`$captureData-${location.pathname}`)) {
        toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info("You have an incomplete timing session. Start time capture to begin where you left off.");
      } else if (store__WEBPACK_IMPORTED_MODULE_2___default.a.get(`captureData-${location.pathname}`)) {
        toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info("You have a complete but unsubmited timing session. Please send us the data.");
        retrySubmit();
      }
    }
  },
  toggleMarkers: toggleMarkers,
  play: function () {
    audioPlaying = true;
  },
  pause: function () {
    audioPlaying = false;
  },

  /*
   * Audio playback ended. If times have been collected for all
   * paragraphs (the bullseye clicked) then display the time capture
   * modal dialog to send the data to Netlify
   */
  ended: function () {
    audioPlaying = false; //if data was not captured, return

    if (haveTimingData && !editInitialized) {
      return;
    } //if we don't have timingData and user, who is a TIMER, did not 
    //capture time there will be one value in the timing array
    else if (!haveTimingData && captureData.length() === 1) {
        captureProgress("REMOVE");
        return;
      }

    let newData = captureData.getData(); //we have previously collected timing data and the user
    //has collected new data
    //- merge the new into the old and submit that

    if (editInitialized) {
      //merge newData into existing timing data if the two arrays are different lengths
      if (timingData.length !== newData.time.length) {
        //assume newData.length < timingData.length
        newData.time.forEach(o => {
          //get paragraph id and convert it into number to index the timingData array
          let idx = parseInt(o.id.substr(1), 10);

          if (timingData[idx]) {
            timingData[idx].prevTime = timingData[idx].seconds;
            timingData[idx].seconds = o.seconds;
          } else {
            //don't expect this!!
            o.somethingFunny = true;
            timingData.push(o);
          }
        }); //assign merged data

        newData.time = timingData;
      } else {//we just use the new data as is
      }
    } //timing complete - remove capture in-progress data


    captureProgress("REMOVE");
    let pCount = $("p.cmiTranPara").length;

    if (pCount !== newData.time.length) {
      //$("#captured-audio-comments").val(`Unexpected: pCount (${pCount}) !== newData.time.length (${newData.time.length})`);
      $("#captured-audio-comments").val(`Incomplete data, there is data for ${newData.time.length} of ${pCount} paragraphs`);
    } //add timing data to form


    $("#captured-audio-data").val(JSON.stringify(newData));
    let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_3__["getUserInfo"])(); //if user logged in automatically fill in user info

    if (userInfo) {
      $("#captured-audio-name").val(userInfo.name);
      $("#captured-audio-email").val(userInfo.email);
      $(uiTimeCaptureModal).modal("show");
    } else {
      $(uiTimeCaptureModal).modal("show");
    }
  },
  //the audio player calls this every 250ms with the
  //current play time
  setCurrentPlaybackTime: function (t) {
    if (captureRequested) {
      markParagraph({
        id: captureId,
        seconds: t
      });
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ "./src/js/modules/_audio/captureData.js":
/*!**********************************************!*\
  !*** ./src/js/modules/_audio/captureData.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CaptureData; });
/* harmony import */ var lodash_findLastIndex__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/findLastIndex */ "./node_modules/lodash/findLastIndex.js");
/* harmony import */ var lodash_findLastIndex__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_findLastIndex__WEBPACK_IMPORTED_MODULE_0__);

class CaptureData {
  constructor(base) {
    this.data = {
      base: base,
      time: []
    };
    this.player = null;
  }

  setPlayer(player) {
    this.player = player;
  }

  setData(o) {
    this.data = o;
  } //called when we already have timing data


  setTimeArray(a) {
    this.data.time = a;
  }

  add(o) {
    this.data.time.push(o);
    return this.data.time.length;
  }

  remove(o) {
    let pos = lodash_findLastIndex__WEBPACK_IMPORTED_MODULE_0___default()(this.data.time, {
      id: o.id
    });

    if (pos === -1) {
      return -1;
    } else {
      this.data.time.splice(pos, 1);
      return this.data.time.length;
    }
  }

  length() {
    return this.data.time.length;
  }

  getData() {
    return this.data;
  }

}

/***/ }),

/***/ "./src/js/modules/_audio/focus.js":
/*!****************************************!*\
  !*** ./src/js/modules/_audio/focus.js ***!
  \****************************************/
/*! exports provided: registerNotify, registerNotifyPlaybackTime, getCurrentParagraph, switchToParagraph, togglePlayFromHere, default, disableScroll */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerNotify", function() { return registerNotify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerNotifyPlaybackTime", function() { return registerNotifyPlaybackTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentParagraph", function() { return getCurrentParagraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "switchToParagraph", function() { return switchToParagraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "togglePlayFromHere", function() { return togglePlayFromHere; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disableScroll", function() { return disableScroll; });
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scroll-into-view */ "./node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_config/config */ "./src/js/modules/_config/config.js");
/* harmony import */ var lodash_findLastIndex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/findLastIndex */ "./node_modules/lodash/findLastIndex.js");
/* harmony import */ var lodash_findLastIndex__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_findLastIndex__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/map */ "./node_modules/lodash/map.js");
/* harmony import */ var lodash_map__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_map__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _capture__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./capture */ "./src/js/modules/_audio/capture.js");
/*
  highlight and scroll paragraph being spoken during audio playback

  Supports:
    play-from-here
*/




 //paragraph timing array assigned on module initialization

let timingData = null;
let notifyParagraphChange = null;
let notifyPlaybackTime = null; //capture.js can disable scroll is timing is enabled

let scrollEnabled = true;

class Ptr {
  constructor(value = -1, pvalue = -1) {
    this.val = value;
    this.pval = pvalue; //previous ptr position
  } //get val


  get ptrVal() {
    return this.val;
  } //set val


  set ptrVal(value) {
    this.val = value; //console.log("set ptr: %s", this.val);
  } //get previous val


  get pVal() {
    return this.pval;
  } //set previous val


  set pVal(value) {
    this.pval = value; //console.log("set prevPtr: %s", this.pval);
  } //increment val


  set inc(value = 1) {
    this.val = this.val + value; //console.log("inc ptr: %s", this.val);
  }

} //pointers to the current and previous paragraphs


const ptr = new Ptr(-1, -1);
let seeking = false;
let ended = false;
let player;
function registerNotify(fn) {
  notifyParagraphChange = fn;
}
function registerNotifyPlaybackTime(fn) {
  notifyPlaybackTime = fn;
}
function getCurrentParagraph() {
  return {
    pid: ptr.val,
    startTime: getTime(ptr.val),
    nextStartTime: getTime(ptr.val + 1)
  };
}
/*
 * init playFromHere
 */

function initializePlayFromHere() {
  //initially hide playmark icon added next
  $(".transcript.ui.text.container").addClass("hide-playmark"); // add 'play' markers to each paragraph

  $("p.cmiTranPara").each(function () {
    $(this).prepend("<i class='playmark play icon'></i>");
  }); //create listener

  $(".transcript.ui.text.container").on("click", "p.cmiTranPara > i.playmark.icon", function (e) {
    e.preventDefault();
    let el = $(this);
    let id = el.parent().attr("id");
    switchToParagraph(id);
  });
}
/*
  called by play-from-here event handlers
*/


function switchToParagraph(p) {
  let time;
  let idx; //console.log("switchToParagraph: %s", p);

  switch (p) {
    case "NEXT":
      if (ptr.val + 1 < timingData.length) {
        time = getTime(ptr.val + 1);
        adjustPlayPosition(ptr.val + 1);
        player.setCurrentTime(time);
      }

      break;

    case "PREV":
      if (ptr.val - 1 >= 0) {
        time = getTime(ptr.val - 1);
        adjustPlayPosition(ptr.val - 1);
        player.setCurrentTime(time);
      }

      break;

    default:
      idx = parseInt(p.substr(1), 10);
      time = getTime(idx); //set new playtime

      if (time > -1) {
        adjustPlayPosition(idx);
        player.setCurrentTime(time);

        if (player.paused) {
          player.play();
        }
      }

      break;
  }
} //remove highlighting from currently highlighted paragraph

function removeCurrentHilight() {
  if (ptr.pval > -1) {
    $("#" + timingData[ptr.pval].id).removeClass("hilight");
  }
}
/*
 * Toggle display of play-from-here controls
 */


function togglePlayFromHere() {
  let el = $(".transcript.ui.text.container");

  if (el.hasClass("hide-playmark")) {
    el.removeClass("hide-playmark");
    return true;
  } else {
    el.addClass("hide-playmark");
    return false;
  }
} //round audio timing data to two decimal places

function round(time) {
  return Math.round(time * 100) / 100;
}

function getIndex(time) {
  let index = lodash_findLastIndex__WEBPACK_IMPORTED_MODULE_2___default()(timingData, o => {
    //console.log(`findLastIndex: checking ${o.id}, ${o.seconds} <= ${time}`);
    return o.seconds <= time;
  }); //console.log("found: %s", index);


  return index;
}

function getTime(idx) {
  if (idx < 0 || idx >= timingData.length) {
    return 60 * 60 * 24; //return a big number
  } else {
    //console.log("getTime(%s)", idx);
    return timingData[idx].seconds;
  }
}

function manageHiLight(current) {
  //initial state of pointer is -1
  if (ptr.val === -1 || current > getTime(ptr.val + 1)) {
    ptr.inc = 1;

    if (!seeking) {
      showNscroll(ptr.val);
    }
  }
}
/*
 * User seeked behind the current play position
 * - adjust hilight accordingly
 */


function adjustPlayPosition(index) {
  //console.log(`adjusting play position to: p${index}`)
  ptr.val = index;
  showNscroll(ptr.val);
}

function showNscroll(idx) {
  var tinfo = timingData[idx]; //console.log("hilight transition at time %s to paragraph %s", current, tinfo.id);
  //scroll into view

  if (scrollEnabled) {
    scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById(tinfo.id));
  }

  if (ptr.pval > -1) {
    $("#" + timingData[ptr.pval].id).removeClass("hilight");
  }

  $("#" + tinfo.id).addClass("hilight");
  ptr.pval = idx;

  if (notifyParagraphChange) {
    notifyParagraphChange({
      pid: tinfo.id,
      startTime: tinfo.seconds,
      nextStartTime: idx < timingData.length ? timingData[idx + 1].seconds : player.duration
    });
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  /*
    args:
      timingDataUri: name of timing data to fetch
      p: reference to the audio player
      userStatus: when equal TIMER send timing data to capture.js
  */
  initialize: function (timingDataUri, p, userStatus) {
    player = p; //load the timing data

    Object(_config_config__WEBPACK_IMPORTED_MODULE_1__["fetchTimingData"])(timingDataUri).then(data => {
      //round timing data to two decimal places
      timingData = lodash_map__WEBPACK_IMPORTED_MODULE_3___default()(data.time, function (value) {
        value.seconds = round(value.seconds);
        return value;
      });
      initializePlayFromHere();

      if (userStatus === "TIMER") {
        Object(_capture__WEBPACK_IMPORTED_MODULE_4__["setCaptureData"])(timingData);
      }
    }).catch(error => {
      console.error("Failed to load timing data: %s, error: ", timingDataUri, error);
    });
  },

  /*
    This is called every 250ms from the audio player and used to adjust the
    highlight whenever a new paragraph has started
  */
  setCurrentPlaybackTime: function (time) {
    if (timingData) {
      manageHiLight(round(time));
    }

    if (notifyPlaybackTime) {
      notifyPlaybackTime(time);
    }
  },

  /*
    called each time the play button is pressed
  */
  play: function () {
    //if ended is true, the audio is being replayed
    // - set pointers and flags to default values
    if (ended) {
      ptr.val = -1;
      ptr.pval = -1;
      seeking = false;
      ended = false; //console.log("audio restarting");
    }
  },

  /* 
    called each time the pause button is pressed
  */
  pause: function () {//console.log("audio paused");
  },

  /*
    When audio has ended we remove highlight from the last paragraph
    and set the ended flag to true. We set the flag so the setSeeked() 
    event, which is called when the audio ends, will exit the function
    without action. If we don't do this, when the audio ends, the transcript
    is scrolled to the top and the first paragraph highlighted.
  */
  ended: function () {
    if (!timingData) {
      return;
    }

    ended = true; //console.log("play ended");
    //remove hilight

    removeCurrentHilight();
  },
  //seeking started
  setSeeking: function () {
    if (!timingData) {
      return;
    } //disable hilight event handling


    seeking = true;
  },

  /*
    Seeking ended, adjust current paragraph and highlighting accordingly
  */
  setSeeked: function (time) {
    if (!timingData) {
      return;
    }

    seeking = false; //setSeeked() is called when audio has ended. We don't want to 
    //do anything in that case

    if (ended) {
      return;
    }

    var index = getIndex(round(time)); //console.log("seeked from %s to %s", ptr.val, index);

    adjustPlayPosition(index);
  }
});
/*
  called by capture when capture of existing timing
  is happening
*/

function disableScroll() {
  scrollEnabled = false;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ "./src/js/modules/_audio/mediaelement.js":
/*!***********************************************!*\
  !*** ./src/js/modules/_audio/mediaelement.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var mediaelement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mediaelement */ "./node_modules/mediaelement/full.js");
/* harmony import */ var mediaelement__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mediaelement__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var mediaelement_build_mediaelementplayer_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mediaelement/build/mediaelementplayer.css */ "./node_modules/mediaelement/build/mediaelementplayer.css");
/* harmony import */ var mediaelement_build_mediaelementplayer_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(mediaelement_build_mediaelementplayer_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var me_plugin_jump_forward_jump_forward_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! me-plugin/jump-forward/jump-forward.css */ "../cmi-audio/dist/jump-forward/jump-forward.css");
/* harmony import */ var me_plugin_jump_forward_jump_forward_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(me_plugin_jump_forward_jump_forward_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var me_plugin_jump_forward_jump_forward__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! me-plugin/jump-forward/jump-forward */ "../cmi-audio/dist/jump-forward/jump-forward.js");
/* harmony import */ var me_plugin_jump_forward_jump_forward__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(me_plugin_jump_forward_jump_forward__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var me_plugin_skip_back_skip_back_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! me-plugin/skip-back/skip-back.css */ "../cmi-audio/dist/skip-back/skip-back.css");
/* harmony import */ var me_plugin_skip_back_skip_back_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(me_plugin_skip_back_skip_back_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var me_plugin_skip_back_skip_back__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! me-plugin/skip-back/skip-back */ "../cmi-audio/dist/skip-back/skip-back.js");
/* harmony import */ var me_plugin_skip_back_skip_back__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(me_plugin_skip_back_skip_back__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var me_plugin_speed_speed_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! me-plugin/speed/speed.css */ "../cmi-audio/dist/speed/speed.css");
/* harmony import */ var me_plugin_speed_speed_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(me_plugin_speed_speed_css__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var me_plugin_speed_speed__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! me-plugin/speed/speed */ "../cmi-audio/dist/speed/speed.js");
/* harmony import */ var me_plugin_speed_speed__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(me_plugin_speed_speed__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var me_plugin_nextp_nextp_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! me-plugin/nextp/nextp.css */ "../cmi-audio/dist/nextp/nextp.css");
/* harmony import */ var me_plugin_nextp_nextp_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(me_plugin_nextp_nextp_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var me_plugin_nextp_nextp__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! me-plugin/nextp/nextp */ "../cmi-audio/dist/nextp/nextp.js");
/* harmony import */ var me_plugin_nextp_nextp__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(me_plugin_nextp_nextp__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var me_plugin_prevp_prevp_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! me-plugin/prevp/prevp.css */ "../cmi-audio/dist/prevp/prevp.css");
/* harmony import */ var me_plugin_prevp_prevp_css__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(me_plugin_prevp_prevp_css__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var me_plugin_prevp_prevp__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! me-plugin/prevp/prevp */ "../cmi-audio/dist/prevp/prevp.js");
/* harmony import */ var me_plugin_prevp_prevp__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(me_plugin_prevp_prevp__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var me_plugin_ptoggle_ptoggle_css__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! me-plugin/ptoggle/ptoggle.css */ "../cmi-audio/dist/ptoggle/ptoggle.css");
/* harmony import */ var me_plugin_ptoggle_ptoggle_css__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(me_plugin_ptoggle_ptoggle_css__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var me_plugin_ptoggle_ptoggle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! me-plugin/ptoggle/ptoggle */ "../cmi-audio/dist/ptoggle/ptoggle.js");
/* harmony import */ var me_plugin_ptoggle_ptoggle__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(me_plugin_ptoggle_ptoggle__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var me_plugin_capture_capture_css__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! me-plugin/capture/capture.css */ "../cmi-audio/dist/capture/capture.css");
/* harmony import */ var me_plugin_capture_capture_css__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(me_plugin_capture_capture_css__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var me_plugin_capture_capture__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! me-plugin/capture/capture */ "../cmi-audio/dist/capture/capture.js");
/* harmony import */ var me_plugin_capture_capture__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(me_plugin_capture_capture__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _focus__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./focus */ "./src/js/modules/_audio/focus.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../_config/config */ "./src/js/modules/_config/config.js");
/* harmony import */ var _capture__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./capture */ "./src/js/modules/_audio/capture.js");
//media elements plugin and css

 //media elements plugins ------














 //-----------------------------






/*
  This is called after successful audio player initialization
*/

function setEventListeners(player, userStatus, haveTimingData) {
  //console.log("userStatus: %s, haveTimingData: %s", userStatus, haveTimingData !== undefined);
  let capture = false; //initialize focus

  if (haveTimingData) {
    _focus__WEBPACK_IMPORTED_MODULE_17__["default"].initialize(haveTimingData, player, userStatus); //play from here toggle

    $(".mejs__ptoggle").addClass("mejs-ptoggle-hidden");
  } //initialize time capture and, if we have timing data, time capture editing


  if (userStatus === "TIMER") {
    capture = true;
    _capture__WEBPACK_IMPORTED_MODULE_20__["default"].initialize(player, haveTimingData);
  }
  /*
    seems to be called only once with readyState = 3 or 4
     Have this here to research a way to indicate when audio is ready to be played
    - eg: could indicate load and clear the indicator when this event is called
  player.media.addEventListener("canplay", function() {
    console.log("Media ready for playing: readyState: %s", player.readyState);
  });
  */

  /*
    Communicate current audio playback time to focus and capture
  */


  player.media.addEventListener("timeupdate", function () {
    var time = player.getCurrentTime();

    if (haveTimingData) {
      _focus__WEBPACK_IMPORTED_MODULE_17__["default"].setCurrentPlaybackTime(time);
    }

    if (capture) {
      _capture__WEBPACK_IMPORTED_MODULE_20__["default"].setCurrentPlaybackTime(time);
    }
  });
  /*
   * play has started.
  */

  player.media.addEventListener("playing", function () {
    if (haveTimingData) {
      _focus__WEBPACK_IMPORTED_MODULE_17__["default"].play();
    }

    if (capture) {
      _capture__WEBPACK_IMPORTED_MODULE_20__["default"].play();
    }
  });
  /*
    * Notify focus or timeCapture audio playback has ended
    */

  player.media.addEventListener("ended", function () {
    if (haveTimingData) {
      _focus__WEBPACK_IMPORTED_MODULE_17__["default"].ended();
    }

    if (capture) {
      _capture__WEBPACK_IMPORTED_MODULE_20__["default"].ended();
    }
  });
  player.media.addEventListener("pause", function () {
    if (haveTimingData) {
      _focus__WEBPACK_IMPORTED_MODULE_17__["default"].pause();
    }

    if (capture) {
      _capture__WEBPACK_IMPORTED_MODULE_20__["default"].pause();
    }
  });

  if (haveTimingData) {
    player.media.addEventListener("ptoggle", function () {
      if (Object(_focus__WEBPACK_IMPORTED_MODULE_17__["togglePlayFromHere"])()) {
        $(".mejs__ptoggle").addClass("mejs-ptoggle-visible").removeClass("mejs-ptoggle-hidden");
      } else {
        $(".mejs__ptoggle").addClass("mejs-ptoggle-hidden").removeClass("mejs-ptoggle-visible");
      }
    });
    /* don't think we need this when we have timing data
    //get notified when seek start
    player.media.addEventListener("seeking", function() {
      var time = player.getCurrentTime();
      focus.setSeeking(time);
    });
     //get notified when seek ended
    player.media.addEventListener("seeked", function() {
      var time = player.getCurrentTime();
      focus.setSeeked(time);
    });
    */

    player.media.addEventListener("prevp", function () {
      Object(_focus__WEBPACK_IMPORTED_MODULE_17__["switchToParagraph"])("PREV");
    });
    player.media.addEventListener("nextp", function () {
      Object(_focus__WEBPACK_IMPORTED_MODULE_17__["switchToParagraph"])("NEXT");
    });
  }

  if (capture) {
    //Audio player control that shows/hides time capture icon
    player.media.addEventListener("capture", function () {
      _capture__WEBPACK_IMPORTED_MODULE_20__["default"].toggleMarkers();
    });
  }
}
/*
  A user is either a LISTENER or a TIMER. TIMER's are logged in and have a role of "timer",
  additionally, if there is a reservation the timer is a timer only when the reservation
  is for him.
*/


function getUserStatus() {
  let user = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_18__["getUserInfo"])();

  if (!user) {
    return "LISTENER";
  } //console.log("userInfo: ", user);
  //not all users have a role defined


  if (!user.roles) {
    return "LISTENER";
  }

  let timer = user.roles.find(r => r === "timer");
  let editor = user.roles.find(r => r === "editor");

  if (!timer && !editor) {
    return "LISTENER";
  } //User is a timer, check there is a timing reservation on the page


  let reservation = Object(_config_config__WEBPACK_IMPORTED_MODULE_19__["getReservation"])(location.pathname); //no reservation, the user is a timer

  if (!reservation) {
    return "TIMER";
  } //check if reservation is for the user


  if (reservation === user.email) {
    return "TIMER";
  } //editors can time even if a reservation is held by someone else
  else if (editor) {
      return "TIMER";
    } //user is a timer but does not have a reservation


  return "LISTENER";
}
/*
  Determine audio player controls to use, we enable timing if timing data exists or not.
*/


function assignPlayerFeatures(timingData) {
  let info = {
    status: getUserStatus(),
    features: []
  };

  if (info.status === "LISTENER") {
    if (timingData) {
      info.features = ["playpause", "current", "duration", "prevp", "nextp", "ptoggle"];
    } else {
      info.features = ["playpause", "current", "duration", "skipback", "jumpforward"];
    }
  } //TIMER
  else {
      if (timingData) {
        info.features = ["playpause", "current", "duration", "prevp", "nextp", "ptoggle", "capture", "speed"];
      } else {
        info.features = ["playpause", "current", "duration", "skipback", "jumpforward", "capture", "speed"];
      }
    }

  return info;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  /*
   * initialize audio player:
   *
   * args:
   *  src: url of audio file
   *  timingData: uri of timing data, pass it to focus.js
   */
  initialize: function (src, timingData) {
    //add source of audio file to player
    $("audio.mejs-player").attr("src", src);
    const {
      status,
      features
    } = assignPlayerFeatures(timingData);
    $("#cmi-audio-player").mediaelementplayer({
      pluginPath: "/public/vendor/mediaelement/plugin/",
      skipBackInterval: 15,
      jumpForwardInterval: 15,
      timeFormat: "h:mm:ss",
      features: features,
      error: function (error) {
        toastr__WEBPACK_IMPORTED_MODULE_16___default.a.error("Audio error: ", error);
      },
      success: function (media, node, player) {
        //setup for capture and focus
        setEventListeners(player, status, timingData);
      }
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ "./src/js/modules/_forms/contact.js":
/*!******************************************!*\
  !*** ./src/js/modules/_forms/contact.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/*
  Set up submit handler for contact forms
*/



function createSubmitHandler($form) {
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])(); //init form fields for signed in users

  if (userInfo) {
    $form.form("set values", {
      name: userInfo.name,
      email: userInfo.email
    });
  } //submit handler


  $form.submit(function (e) {
    e.preventDefault(); //console.log("submit pressed");

    let $form = $(this);
    let formData = $form.form("get values");
    let validationError = false; //form validation

    if (formData.name.trim().length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.warning("Please enter your name.");
      validationError = true;
    }

    if (formData.email.trim().length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.warning("Please enter your email address.");
      validationError = true;
    }

    if (formData.message.trim().length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.warning("Please enter a message.");
      validationError = true;
    }

    if (validationError) {
      return false;
    } //send to netlify


    $.post($form.attr("action"), $form.serialize()).done(function () {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success("Thank you!");
    }).fail(function (e) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error("Sorry, there was a failure to communicate!");
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function (formName) {
    let $form = $(`form#${formName}`);

    if ($form.length > 0) {
      createSubmitHandler($form);
      console.log("Form %s initialized.", formName);
    }
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ "./src/js/modules/_util/facebook.js":
/*!******************************************!*\
  !*** ./src/js/modules/_util/facebook.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/*
  facebook sdk support
*/
/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: () => {
    $.ajax({
      url: "//connect.facebook.net/en_US/sdk.js",
      dataType: "script",
      cache: true,
      success: function () {
        FB.init({
          appId: "448658485318107",
          xfbml: true,
          version: "v3.0"
        });
      }
    });
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ "./src/js/modules/_video/acq.js":
/*!**************************************!*\
  !*** ./src/js/modules/_video/acq.js ***!
  \**************************************/
/*! exports provided: initialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
//initialize video in Get Acquainted Guide
function initialize() {
  //check if we're on acq.video page
  if ($("#acq-video").length === 0) {
    return;
  } //embed all videos on page


  $(".ui.embed").embed();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ "./src/js/transcript.js":
/*!******************************!*\
  !*** ./src/js/transcript.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _vendor_semantic_semantic_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vendor/semantic/semantic.min.js */ "./src/vendor/semantic/semantic.min.js");
/* harmony import */ var _vendor_semantic_semantic_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vendor_semantic_semantic_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_util_url__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/_util/url */ "./src/js/modules/_util/url.js");
/* harmony import */ var _modules_user_netlify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _modules_util_facebook__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/_util/facebook */ "./src/js/modules/_util/facebook.js");
/* harmony import */ var _modules_page_startup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/_page/startup */ "./src/js/modules/_page/startup.js");
/* harmony import */ var _modules_config_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/_config/config */ "./src/js/modules/_config/config.js");
/* harmony import */ var _modules_bookmark_start__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/_bookmark/start */ "./src/js/modules/_bookmark/start.js");
/* harmony import */ var _modules_search_search__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/_search/search */ "./src/js/modules/_search/search.js");
/* harmony import */ var _modules_contents_toc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/_contents/toc */ "./src/js/modules/_contents/toc.js");
/* harmony import */ var _modules_audio_audio__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/_audio/audio */ "./src/js/modules/_audio/audio.js");
/* harmony import */ var _modules_about_about__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/_about/about */ "./src/js/modules/_about/about.js");
/* harmony import */ var _modules_forms_contact__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/_forms/contact */ "./src/js/modules/_forms/contact.js");
/* harmony import */ var _modules_video_acq__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/_video/acq */ "./src/js/modules/_video/acq.js");
/* eslint no-console: off */
 //common modules













$(document).ready(() => {
  Object(_modules_util_url__WEBPACK_IMPORTED_MODULE_1__["loadStart"])();
  Object(_modules_page_startup__WEBPACK_IMPORTED_MODULE_4__["initTranscriptPage"])();
  _modules_user_netlify__WEBPACK_IMPORTED_MODULE_2__["default"].initialize();
  _modules_util_facebook__WEBPACK_IMPORTED_MODULE_3__["default"].initialize();
  _modules_about_about__WEBPACK_IMPORTED_MODULE_10__["default"].initialize();
  _modules_forms_contact__WEBPACK_IMPORTED_MODULE_11__["default"].initialize("acq-contact-form");
  Object(_modules_video_acq__WEBPACK_IMPORTED_MODULE_12__["initialize"])(); //load config file and do initializations that depend on a loaded config file

  Object(_modules_config_config__WEBPACK_IMPORTED_MODULE_5__["loadConfig"])(Object(_modules_contents_toc__WEBPACK_IMPORTED_MODULE_8__["getBookId"])()).then(result => {
    _modules_search_search__WEBPACK_IMPORTED_MODULE_7__["default"].initialize();
    /*
      result of 0 indicates no contents config found
      - toc, and audio depend on config file
    */

    if (result !== 0) {
      _modules_contents_toc__WEBPACK_IMPORTED_MODULE_8__["default"].initialize("transcript");
      _modules_audio_audio__WEBPACK_IMPORTED_MODULE_9__["default"].initialize();
    }

    Object(_modules_util_url__WEBPACK_IMPORTED_MODULE_1__["showParagraph"])();
    Object(_modules_bookmark_start__WEBPACK_IMPORTED_MODULE_6__["bookmarkStart"])("transcript");

    if ($(".disable-paragraph-marker").length > 0) {
      $(".toggle-paragraph-markers").eq(0).trigger("click");
    }
  }).catch(error => {
    //report error to the user - somehow
    console.error(error);
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ 0:
/*!************************************!*\
  !*** multi ./src/js/transcript.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/transcript.js */"./src/js/transcript.js");


/***/ })

/******/ });
//# sourceMappingURL=transcript.js.map