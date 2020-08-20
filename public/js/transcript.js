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
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
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
/******/
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
/******/ 	deferredModules.push([0,"vendors~page~profile~transcript","page~profile~transcript"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

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
          version: "v3.1"
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
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _modules_util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var _vendor_semantic_semantic_min_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../vendor/semantic/semantic.min.js */ "./src/vendor/semantic/semantic.min.js");
/* harmony import */ var _vendor_semantic_semantic_min_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_vendor_semantic_semantic_min_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_util_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/_util/url */ "./src/js/modules/_util/url.js");
/* harmony import */ var _modules_user_netlify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _modules_util_facebook__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/_util/facebook */ "./src/js/modules/_util/facebook.js");
/* harmony import */ var _modules_page_startup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/_page/startup */ "./src/js/modules/_page/startup.js");
/* harmony import */ var _modules_config_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/_config/config */ "./src/js/modules/_config/config.js");
/* harmony import */ var _modules_bookmark_start__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/_bookmark/start */ "./src/js/modules/_bookmark/start.js");
/* harmony import */ var _modules_search_search__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/_search/search */ "./src/js/modules/_search/search.js");
/* harmony import */ var _modules_contents_toc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/_contents/toc */ "./src/js/modules/_contents/toc.js");
/* harmony import */ var _modules_about_about__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/_about/about */ "./src/js/modules/_about/about.js");
/* harmony import */ var _modules_forms_contact__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/_forms/contact */ "./src/js/modules/_forms/contact.js");
/* harmony import */ var _modules_video_acq__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/_video/acq */ "./src/js/modules/_video/acq.js");
/* harmony import */ var _modules_language_lang__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/_language/lang */ "./src/js/modules/_language/lang.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");
/* eslint no-console: off */

 //common modules









 //import audio from "./modules/_audio/audio";





$(document).ready(() => {
  Object(_modules_util_store__WEBPACK_IMPORTED_MODULE_0__["storeInit"])(_constants__WEBPACK_IMPORTED_MODULE_14__["default"]);
  Object(_modules_language_lang__WEBPACK_IMPORTED_MODULE_13__["setLanguage"])(_constants__WEBPACK_IMPORTED_MODULE_14__["default"]);
  Object(_modules_page_startup__WEBPACK_IMPORTED_MODULE_5__["initTranscriptPage"])("pnDisplay");
  _modules_user_netlify__WEBPACK_IMPORTED_MODULE_3__["default"].initialize();
  _modules_util_facebook__WEBPACK_IMPORTED_MODULE_4__["default"].initialize();
  _modules_about_about__WEBPACK_IMPORTED_MODULE_10__["default"].initialize();
  _modules_forms_contact__WEBPACK_IMPORTED_MODULE_11__["default"].initialize("acq-contact-form");
  Object(_modules_video_acq__WEBPACK_IMPORTED_MODULE_12__["initialize"])(); //load config file and do initializations that depend on a loaded config file

  Object(_modules_config_config__WEBPACK_IMPORTED_MODULE_6__["loadConfig"])(Object(_modules_contents_toc__WEBPACK_IMPORTED_MODULE_9__["getBookId"])()).then(result => {
    _modules_search_search__WEBPACK_IMPORTED_MODULE_8__["default"].initialize();
    _modules_contents_toc__WEBPACK_IMPORTED_MODULE_9__["default"].initialize("transcript"); //audio.initialize();

    Object(_modules_util_url__WEBPACK_IMPORTED_MODULE_2__["showParagraph"])();
    Object(_modules_bookmark_start__WEBPACK_IMPORTED_MODULE_7__["bookmarkStart"])("transcript");
  }).catch(error => {
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