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
/******/ 		"profile": 0
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
/******/ 	deferredModules.push([1,"vendors~page~profile~transcript","page~profile~transcript"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/modules/_ajax/quotes.js":
/*!****************************************!*\
  !*** ./src/js/modules/_ajax/quotes.js ***!
  \****************************************/
/*! exports provided: getQuoteIds, getQuote, getQuoteData, putQuote, deleteQuote */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQuoteIds", function() { return getQuoteIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQuote", function() { return getQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getQuoteData", function() { return getQuoteData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putQuote", function() { return putQuote; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteQuote", function() { return deleteQuote; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "./src/js/globals.js");


/*
 * Get all quoteId's for userId and key
 *  where key is the first two or more positions of the page key
 *  ie, 10: WOM, etc
 */

function getQuoteIds(userId, key) {
  let url = `${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/quoteKeys/${userId}/${key}`;
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url).then(resp => {
      resolve(resp.data.keys);
      return;
    }).catch(err => {
      console.error(err);
      reject(err);
      return;
    });
  });
}
/**
 * Get Quote by userId and quoteId
 *
 * @param {string} userId - md5 hash of users email address
 * @param {string} quoteId - the paragraph key and creationDate delimited by ":"
 * @returns {object} The requested quote
 */

function getQuote(userId, quoteId) {
  let [paraKey, creationDate] = quoteId.split(":");
  let url = `${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/quote/${userId}/${paraKey}/${creationDate}`;
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url).then(resp => {
      resolve(resp.data.quote);
    }).catch(err => {
      notify.error("Network error: failed to get quote");
      reject(err);
    });
  });
}
/*
 * Get quote data from database. What returns doesn not contain a formatted
 * url of the source.
 */

function getQuoteData(userId, paraKey, creationDate) {
  let url = `${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/quoteData/${userId}/${paraKey}/${creationDate}`;
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url).then(resp => {
      resolve(resp.data.quote);
    }).catch(err => {
      reject(err);
    });
  });
}
function putQuote(quote) {
  let url = `${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/quote`;
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, quote).then(resp => {
      resolve(resp.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}
function deleteQuote(userId, paraKey, creationDate) {
  let url = `${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/quote/${userId}/${paraKey}/${creationDate}`;
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete(url).then(resp => {
      resolve(resp.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}

/***/ }),

/***/ "./src/js/modules/_user/email.js":
/*!***************************************!*\
  !*** ./src/js/modules/_user/email.js ***!
  \***************************************/
/*! exports provided: loadEmailListTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadEmailListTable", function() { return loadEmailListTable; });
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _ajax_share__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_ajax/share */ "./src/js/modules/_ajax/share.js");
/* harmony import */ var _util_sanitize__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_util/sanitize */ "./src/js/modules/_util/sanitize.js");
/*
  Email list management - for sharing bookmarks via email
*/



 //module global list of email addresses

let maillist = [];

function makeTableRow(item, index) {
  return `
    <tr data-index="${index}">
      <td class="delete-maillist-item"><i class="trash alternate icon"></i></td>
      <td class="edit-maillist-item"><i class="pencil alternate icon"></i></td>
      <td data-name="first">${item.first}</td>
      <td data-name="last">${item.last}</td>
      <td data-name="address">${item.address}</td>
    </tr>
  `;
}

function populateTable(maillist) {
  return `
    ${maillist.map((item, index) => `
      <tr data-index="${index}">
        <td class="delete-maillist-item"><i class="trash alternate icon"></i></td>
        <td class="edit-maillist-item"><i class="pencil alternate icon"></i></td>
        <td data-name="first">${item.first}</td>
        <td data-name="last">${item.last}</td>
        <td data-name="address">${item.address}</td>
      </tr>
    `).join("")}
  `;
}

function enableSave() {
  //enable save to database button
  $("button.save-to-database").removeClass("disabled");
}

function createEventHandlers() {
  //delete
  $("#email-list-table").on("click", ".delete-maillist-item", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let parent = $(this).parent();
    let index = parseInt(parent.attr("data-index"), 10); //mark deleted item from maillist

    maillist[index].deleted = true; //remove item from table

    parent.remove();
    enableSave(); //console.log("after delete: maillist %o", maillist);
  }); //edit

  $("#email-list-table").on("click", "td.edit-maillist-item", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let index = parseInt($(this).parent().attr("data-index"), 10);
    $("#addto-maillist-form").form("set values", maillist[index]);
    $("#add-or-update").text("Update").attr("data-index", index);
    $(".addto-maillist-dialog-wrapper.hide").removeClass("hide");
  }); //add to list

  $("button.add-name-to-maillist").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $("#add-or-update").text("Add");
    $(".addto-maillist-dialog-wrapper.hide").removeClass("hide");
  }); //save changes

  $("button.save-to-database").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(".addto-maillist-dialog-wrapper").addClass("hide");
    saveChanges();
  }); //submit

  $("form[name='addtomaillist']").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    let status = $("#add-or-update").text();
    let formData = $("#addto-maillist-form").form("get values");
    formData.first = Object(_util_sanitize__WEBPACK_IMPORTED_MODULE_3__["purify"])(formData.first);
    formData.last = Object(_util_sanitize__WEBPACK_IMPORTED_MODULE_3__["purify"])(formData.last);
    formData.address = Object(_util_sanitize__WEBPACK_IMPORTED_MODULE_3__["purify"])(formData.address);

    if (status === "Add") {
      maillist.push({
        first: formData.first,
        last: formData.last,
        address: formData.address
      });
      let row = makeTableRow(formData, maillist.length - 1); //append row to table

      $("#email-list-table").append(row);
      enableSave();
    } //update
    else {
        let index = parseInt($("#add-or-update").attr("data-index"), 10); //update array

        maillist[index] = {
          first: formData.first,
          last: formData.last,
          address: formData.address
        }; //update table

        $(`tr[data-index="${index}"] > td[data-name="first"]`).text(maillist[index].first);
        $(`tr[data-index="${index}"] > td[data-name="last"]`).text(maillist[index].last);
        $(`tr[data-index="${index}"] > td[data-name="address"]`).text(maillist[index].address); //close form

        $(".addto-maillist-dialog-wrapper").addClass("hide");
        enableSave(); //console.log("after Update: maillist: %o", maillist);
      }

    $("#addto-maillist-form").form("clear");
  }); //close

  $(".addto-maillist-cancel").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(".addto-maillist-dialog-wrapper").addClass("hide");
  });
}
/*
  Run only if page has class="manage-email-list"
*/


async function loadEmailListTable() {
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])();

  if (!userInfo) {
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.warning("You must be signed in to edit your email list");
    setTimeout(() => {
      location.href = "/";
    }, 3 * 1000);
    return;
  }

  let api = `${userInfo.userId}/maillist`;
  $(".sync.icon").addClass("loading");

  try {
    maillist = await Object(_ajax_share__WEBPACK_IMPORTED_MODULE_2__["getMailList"])(userInfo.userId);
    $(".sync.icon.loading").removeClass("loading");
    let html = populateTable(maillist);
    $("#email-list-table").html(html);
    createEventHandlers(); //$("#maillist-table").dataTable();
  } catch (err) {
    $(".sync.icon.loading").removeClass("loading");
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(`Error getting email list: ${err}`);
  }
}
/*
  Save changes to maillist to database
*/

async function saveChanges() {
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])();
  let newList = maillist.filter(item => !item.deleted);
  let body = {
    userId: userInfo.userId,
    mailList: newList
  };

  try {
    $(".sync.icon").addClass("loading");
    let response = await Object(_ajax_share__WEBPACK_IMPORTED_MODULE_2__["putMailList"])(userInfo.userId, body);
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(`Saved! ${response}`);
    $(".sync.icon.loading").removeClass("loading");
    $("button.save-to-database").addClass("disabled");
  } catch (err) {
    $(".sync.icon.loading").removeClass("loading");
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(err);
  }
}

/***/ }),

/***/ "./src/js/modules/_user/source.js":
/*!****************************************!*\
  !*** ./src/js/modules/_user/source.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  title: {
    "10": "The Way of Mastery",
    "11": "The Impersonal Life",
    "12": "ACIM Sparkley Edition",
    "13": "The Raj Material",
    "14": "A Course Of Love",
    "15": "ACIM Original Edition",
    "16": "Droga Mistrzostwa",
    "17": "Choose Only Love",
    "18": "From the Christ Mind"
  },
  "12": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "122",
    "name": "Text"
  }, {
    "value": "123",
    "name": "Workbook for Students"
  }, {
    "value": "124",
    "name": "Manual for Teachers"
  }, {
    "value": "121",
    "name": "Preface"
  }],
  "15": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "151",
    "name": "Text"
  }, {
    "value": "152",
    "name": "Workbook for Students"
  }, {
    "value": "153",
    "name": "Manual for Teachers"
  }],
  "14": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "1404",
    "name": "The Course"
  }, {
    "value": "1402",
    "name": "The Treatises"
  }, {
    "value": "1403",
    "name": "The Dialogues"
  }],
  "11": [{
    "value": "*",
    "name": "All Books"
  }],
  "13": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "1301",
    "name": "You Are the Answer"
  }, {
    "value": "1302",
    "name": "Graduation"
  }, {
    "value": "1303",
    "name": "ACIM Study Group 2002"
  }, {
    "value": "1304",
    "name": "ACIM Study Group 2003"
  }, {
    "value": "1305",
    "name": "ACIM Study Group 2004"
  }, {
    "value": "1306",
    "name": "ACIM Study Group 2005"
  }, {
    "value": "1307",
    "name": "ACIM Study Group 2006"
  }, {
    "value": "1308",
    "name": "ACIM Study Group 2007"
  }, {
    "value": "1309",
    "name": "ACIM Study Group 2008"
  }, {
    "value": "1310",
    "name": "ACIM Study Group 2009"
  }, {
    "value": "1311",
    "name": "ACIM Study Group 2010"
  }, {
    "value": "1312",
    "name": "ACIM Study Group 2011"
  }, {
    "value": "1313",
    "name": "ACIM Study Group 2012"
  }, {
    "value": "1314",
    "name": "ACIM Study Group 2013"
  }, {
    "value": "1315",
    "name": "ACIM Study Group 2014"
  }, {
    "value": "1316",
    "name": "ACIM Study Group 2015"
  }, {
    "value": "1317",
    "name": "ACIM Study Group 2016"
  }, {
    "value": "1318",
    "name": "ACIM Study Group 2017"
  }, {
    "value": "1319",
    "name": "ACIM Study Group 2018"
  }],
  "10": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "101",
    "name": "The Jeshua Letters"
  }, {
    "value": "102",
    "name": "The Way of the Servant"
  }, {
    "value": "103",
    "name": "The Early Years"
  }, {
    "value": "104",
    "name": "The Way of the Heart"
  }, {
    "value": "105",
    "name": "The Way of Transformation"
  }, {
    "value": "106",
    "name": "The Way of Knowing"
  }],
  "16": [{
    "value": "*",
    "name": "Wszystkie książki"
  }, {
    "value": "1601",
    "name": "Listy Jeszuy"
  }, {
    "value": "1602",
    "name": "Droga Sługi"
  }, {
    "value": "1606",
    "name": "Wczesne lata Drogi"
  }, {
    "value": "1603",
    "name": "Droga Serca"
  }, {
    "value": "1604",
    "name": "Droga Przemiany"
  }, {
    "value": "1605",
    "name": "Droga Poznania"
  }],
  "17": [{
    "value": "*",
    "name": "All Books"
  }],
  "18": [{
    "value": "*",
    "name": "All Books"
  }]
});

/***/ }),

/***/ "./src/js/modules/_user/topicmgr.js":
/*!******************************************!*\
  !*** ./src/js/modules/_user/topicmgr.js ***!
  \******************************************/
/*! exports provided: initializeTopicManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeTopicManager", function() { return initializeTopicManager; });
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_cmi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_util/cmi */ "./src/js/modules/_util/cmi.js");
/* harmony import */ var _netlify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _ajax_topics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_ajax/topics */ "./src/js/modules/_ajax/topics.js");
/* harmony import */ var _ajax_annotation__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_ajax/annotation */ "./src/js/modules/_ajax/annotation.js");
/* harmony import */ var _ajax_quotes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_ajax/quotes */ "./src/js/modules/_ajax/quotes.js");
/* harmony import */ var lodash_startCase__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/startCase */ "./node_modules/lodash/startCase.js");
/* harmony import */ var lodash_startCase__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_startCase__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _util_sanitize__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_util/sanitize */ "./src/js/modules/_util/sanitize.js");
/* harmony import */ var _source__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./source */ "./src/js/modules/_user/source.js");







 //Data for each source, sourceId, books, etc


let bookmarks = {};
let topics = {};
let modified = {};
$("button.source-select").on("click", function (e) {
  e.preventDefault();
  let sid = $(this).attr("data-sid");
  let classString = $(this).attr("class");

  if (classString.includes("collapse")) {
    $(this).removeClass("collapse");
    $(this).addClass("show-all");
    $(this).text("Show All");
    collapseRequest(sid);
  }

  if (classString.includes("show-all")) {
    $(this).addClass("collapse");
    $(this).removeClass("show-all");
    $(this).text("Focus");
    manageTopics("close");
    clearActivityReport();
    resetAnnotationActions();
    showAll(sid);
  }

  if (classString.includes("bookmarks")) {
    loadBookmarksRequest(sid, this);
  }
});

function showAll(sid) {
  $("#sourceTable > tbody > tr").each(function () {
    $(this).removeClass("hide");
  });
  removeActions(sid);
}
/*
 * When a row is focused, the data can be operated on. We
 * display buttons at the bottom of the table for that.
 */


function collapseRequest(sid) {
  $("#sourceTable > tbody > tr").each(function () {
    let id = $(this).attr("id");

    if (id !== sid) {
      $(this).addClass("hide");
    }
  });
  showActions(sid);
}

function setData(sid) {
  let topicList = topics[sid];
  $("#topicSelectNew").dropdown("clear");

  if (!topicList) {
    $("#topic-list-new").html("");
    return;
  }

  let html = makeTopicSelect(topicList);
  $("#topic-list-new").html(html);
  $("#manageTopicsButton").removeAttr("disabled").attr("data-sid", sid);
  $("#displayBookmarksButtonNew").removeAttr("disabled").attr("data-sid", sid);
}

function showActions(sid) {
  setData(sid);
  $(".annotation-actions").addClass("hide");
  $("#action-manager").removeClass("hide");
}

function removeActions(sid) {
  $("#action-manager").addClass("hide");
  $("#manageTopicsButton").attr("disabled", "");
  $("#displayBookmarksButtonNew").attr("disabled", "");
  $("#topicTable").addClass("hide");
}

function loadBookmarksRequest(sid, el) {
  //console.log("Load annotations clicked");
  $(el).addClass("loading");
  loadData(sid).then(info => {
    $(`#load-button-${sid}`).html(`Topics: ${info.topics}<br>Annotations: ${info.bookmarks}`);
    $(el).removeClass("loading");

    if (!$("#action-manager").hasClass("hide")) {
      setData(sid);
    }
  }).catch(err => {
    $(el).removeClass("loading");
  });
}

function generateHorizontalList(listArray, bm, flat = false) {
  if (!listArray || listArray.length === 0) {
    return `
      <div class="item">
        <em>Annotation has no topics</em>
      </div>
    `;
  }

  return `
    ${listArray.map(item => `
      <div class="item">
        <em>${flat ? item : `<a class="topic-summary ${item.summary ? "summarized" : ""}" data-creationdate="${bm.creationDate}" data-sid="${bm.paraKey.substring(0, 2)}" data-value="${item.value}" href="#">${item.topic}</a>`}</em>
      </div>
    `).join("")}
  `;
}

function generateContent(content) {
  return `
    ${content.map(p => `
      <p>
        ${p.text}
      </p>
    `).join("")}
  `;
}

function generateSection(bm) {
  return `
    <div class="ui vertical segment bookmark-segment ${bm.mgr.type}">
      <div class="ui small header bookmark-header">
        <a id="${bm.annotation.creationDate}" target="_blank" href="${bm.mgr.url}?v=${bm.mgr.pid}&key=${bm.paraKey}">${bm.mgr.title ? bm.mgr.title : bm.mgr.url}</a>
        <br/>
        <div class="ui horizontal bulleted link list">
          ${generateHorizontalList(bm.annotation.topicList, bm)}
        </div>
        ${bm.mgr.comment ? "<br/>" : ""}
        ${bm.mgr.comment ? bm.mgr.comment : ""}
      </div>
      ${generateContent(bm.mgr.content)}
      <p ${bm.mgr.type !== "note" ? `class='cmi-manage-quote ${bm.annotation.quote ? "in-database" : ""} ${bm.annotation.creationDate}'` : ""}>
        ~${bm.paraKey}${bm.mgr.type === "note" ? "" : `:${bm.annotation.creationDate}:${bm.annotation.rangeStart}`}
      </p>
    </div>
  `;
}

function generateBookmarkTextHtml(bookmarks, topicManager) {
  return `
    <p>
      ${topicManager.source}<br/>
      ${bookmarks.length} Bookmarks include topics: <em>${topicManager.topicArray.join(` ${topicManager.condition} `)}</em> <br/>
      ${new Date().toLocaleString()}
    </p>
    ${bookmarks.map(bookmark => `${generateSection(bookmark)}`).join("")}
  `;
}

function generateBookmarkText(bookmarks, topicManager) {
  let promises = Object(_util_cmi__WEBPACK_IMPORTED_MODULE_1__["getBookmarkText"])(bookmarks);
  Promise.all(promises).then(responses => {
    let html = generateBookmarkTextHtml(responses, topicManager);
    $("#activity-report-controls").remove();
    $("#activity-report").html(html);
  });
}

function generateTopicItem(t) {
  return `
    <div class="item" data-value="${t.value}">${t.topic}</div>
  `;
}

function makeTopicSelect(topics) {
  return `
    <div class="item" data-value="*">** Show All Bookmarks</div>
    ${topics.map(t => `${!t.deleted ? generateTopicItem(t) : ""}`).join("")}
  `;
}
/*
 * Load topics and bookmarks for arg: sid
 */


function loadData(sid) {
  let userInfo = Object(_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])();
  return new Promise((resolve, reject) => {
    let tList = Object(_ajax_topics__WEBPACK_IMPORTED_MODULE_3__["getTopicList"])(userInfo.userId, sid).then(topicList => {
      topics[sid] = topicList;
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${topics[sid].length} topics loaded`);
    }).catch(err => {
      console.error("error fetching topicList: %s", err);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(err);
      reject(err);
      return;
    });
    let bList = Object(_ajax_annotation__WEBPACK_IMPORTED_MODULE_4__["getAnnotations"])(userInfo.userId, sid).then(bmList => {
      bookmarks[sid] = bmList; //initialize to not modified

      bookmarks[sid].forEach(i => {
        i.modified = false;
      });
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${bookmarks[sid].length} bookmarks loaded`);
    }).catch(err => {
      console.error("error fetching bookmarks: %s", err);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(err);
      reject(err);
      return;
    });
    Promise.all([tList, bList]).then(responses => {
      let info = {
        topics: topics[sid].length,
        bookmarks: bookmarks[sid].length
      };
      resolve(info);
    });
  });
}

function generateTableRow(sid, t, index) {
  return `
    <tr data-sid="${sid}" data-index="${index}"> 
      <td class="edit-topic-item"><i class="pencil alternate icon"></i></td>
      <td class="delete-topic-item"><i class="trash alternate icon"></i></td>
      <td class="topic">${t.topic}</td>
    </tr>
  `;
}

function generateTopicTableData(sid) {
  return `
    ${topics[sid].map((t, index) => `
      ${!t.deleted ? generateTableRow(sid, t, index) : ""}`).join("")}
  `;
}
/*
 * Search through bookmarks by source and filter by book for topics
 */


function findMatchesNew(sid, book, topicList, condition) {
  let topicArray = topicList.split(","); //look for topic of "*", this means to include all bookmarks (don't filter by topic)

  let filterByTopic = !topicArray.includes("*");
  let matches = []; //find all bookmarks containing topics in topicArray
  //- if condition === "OR" a match is found when the bookmark contains one or more
  //  topics in topicArray
  // - if condition === "AND" a match is found when the bookmark contans each topic
  //   in topicArray

  if (filterByTopic) {
    bookmarks[sid].forEach(b => {
      let btl = b.annotation.topicList;
      let count = 0;

      if (btl && btl.length > 0) {
        for (let tf = 0; tf < topicArray.length; tf++) {
          let index = btl.findIndex(bt => bt.value === topicArray[tf]);

          if (condition === "OR") {
            if (index > -1) {
              matches.push(b);
              break;
            }
          } //condition === "AND"
          else if (index > -1) {
              count++;
            }
        }

        if (count === topicArray.length && condition === "AND") {
          matches.push(b);
        }
      }
    });
  } else {
    matches = bookmarks[sid];
  } //filter matched bookmarks if user restricted by book, "*" means matches
  //are not filterd by book


  if (book !== "*") {
    matches = matches.filter(bm => bm.paraKey.startsWith(book));
  }

  return matches;
}
/**
 * Create a topic from string. Topics are objects: {value: "", topic: ""}. The topic
 * attribute can contain spaces but the value cannot.
 *
 * @param {string} - newTopic
 * @returns {object} new topic
 */


function formatNewTopic(newTopic) {
  let topic = {}; //only allow digits, alpha chars (including Polish chars) and comma's and spaces

  let topicStr = newTopic.replace(/[^a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ, ]/g, "");

  if (!topicStr || topicStr === "") {
    return topic;
  }

  topicStr = topicStr.trim();
  topicStr = lodash_startCase__WEBPACK_IMPORTED_MODULE_6___default()(topicStr);

  if (/ /.test(topicStr)) {
    topic = {
      value: topicStr.replace(/ /g, ""),
      topic: topicStr
    };
  } else {
    topic = {
      value: topicStr,
      topic: topicStr
    };
  }

  return topic;
}
/*
 * Set state of controls when topic manager opens or closes.
 */


function manageTopics(state) {
  if (state === "open") {
    clearActivityReport(); //hide annotation-action controls

    $("#action-manager > .annotation-actions").addClass("hide");
    $("#manageTopicsButton").text("Un-Manage Topics");
    $("#topicTable").removeClass("hide");
  } else if (state === "close") {
    $("#manageTopicsButton").text("Manage Topics");
    $("#topicTable").addClass("hide");
  }
}
/*
 * Remove bookmarks from activity-report and reset
 * controls that operate on bookmarks
 */


function clearActivityReport() {
  $("#activity-report").html("");
  $("#topicSelectNew").dropdown("clear");
  $(".condition-checkbox.default").trigger("click");
  $(".style-checkbox.default").trigger("click");
}

function resetAnnotationActions() {
  //reset style checkbox
  $(".style-checkbox.default").trigger("click"); //reset Show Headers

  if ($("#action-manager > .annotation-actions .hide-headers").hasClass("hide")) {
    $("#action-manager > .annotation-actions .hide-headers").removeClass("hide").html("Hide Headers");
    $("#activity-report .bookmark-header").removeClass("hide");
  } //reset Show Quotes


  if ($("#action-manager > .annotation-actions .hide-quotes").hasClass("hide")) {
    $("#action-manager > .annotation-actions .hide-quotes").removeClass("hide").html("Hide Quotes");
    $("#activity-report .bookmark-segment.hide").removeClass("hide");
    $("#activity-report .bookmark-segment.hide").removeClass("qhide");
  }
}

function initForm() {
  $("#topicSelectNew").dropdown();
  $("#action-manager .ui.radio.checkbox").checkbox();
  $("#condition-toggle").on("change", function (e) {
    let val = $("#condition-toggle label").text();
    $("#condition-toggle label").text(val === "AND" ? "OR" : "AND");
  });
  $("#manageTopicsButton").on("click", function (e) {
    let sid = $(this).attr("data-sid");

    if ($("#topicTable").hasClass("hide")) {
      let html = generateTopicTableData(sid);
      $("#topicTable > tbody").html(html);
      manageTopics("open");
    } else {
      manageTopics("close");
    }
  }); //delete topic

  $("#topicTable").on("click", "td.delete-topic-item", function (e) {
    let index = parseInt($(this).parent().attr("data-index"), 10);
    let sid = $(this).parent().attr("data-sid");
    let deleted = $(this).parent().hasClass("deleted");

    if (deleted) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Topic has been deleted");
      return;
    } //confirm delete request


    let topicToDelete = topics[sid][index];
    $("#confirmDelete > .header").text(`Delete Topic: "${topicToDelete.topic}"?`);
    $("#confirmDelete .actions > .delete-approve").attr("data-sid", sid);
    $("#confirmDelete .actions > .delete-approve").attr("data-index", index);
    $("#confirmDelete").modal("show");
  }); //edit topic

  $("#topicTable").on("click", "td.edit-topic-item", function (e) {
    let index = parseInt($(this).parent().attr("data-index"), 10);
    let sid = $(this).parent().attr("data-sid");
    let deleted = $(this).parent().hasClass("deleted");

    if (deleted) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Topic has been deleted");
      return;
    }

    $("#edit-topic-form").form("set values", {
      sid: sid,
      index: index,
      topic: topics[sid][index].topic,
      oldtopic: topics[sid][index].topic
    });
    $(".edit-topic-dialog-wrapper.hide").removeClass("hide");
  }); //cancel topic edit

  $("#update-topic-cancel").on("click", function (e) {
    e.preventDefault();
    $(".edit-topic-dialog-wrapper").addClass("hide");
  }); //submit topic edit

  $("#update-topic-submit").on("click", function (e) {
    e.preventDefault();
    let form = $("#edit-topic-form").form("get values");
    let index = parseInt(form.index, 10); //if no changes just return

    if (form.topic === form.oldtopic) {
      $(".edit-topic-dialog-wrapper").addClass("hide");
      return;
    } //calculate new topic value, store changes, and apply topic to all related bookmarks


    let newTopic = formatNewTopic(form.topic);
    console.log("old Topic: %o, new Topic: %o", topics[form.sid][index], newTopic); //check if topic already exists

    let found = topics[form.sid].find(t => t.value === newTopic.value);

    if (found) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("That topic already exists.");
      return;
    } //mark topic as modified


    markSourceModified(form.sid, "topicList"); //close the edit topic form

    $(".edit-topic-dialog-wrapper").addClass("hide"); //update topic array with new topic

    let oldTopic = topics[form.sid][index];
    topics[form.sid][index] = newTopic; //update table with new topic

    $(`[data-sid='${form.sid}'][data-index='${form.index}'] > .topic`).text(newTopic.topic); //update topic select

    $(`#topic-list-new > [data-value='${oldTopic.value}']`).attr("data-value", newTopic.value).text(newTopic.topic); //update bookmarks with new topic
    // - find bookmarks with old topic and replace it with new topic

    bookmarks[form.sid].forEach(bm => {
      if (bm.annotation.topicList) {
        let idx = bm.annotation.topicList.findIndex(t => {
          return t.value === oldTopic.value;
        }); //bookmark has topic, replace the old topic and mark the bookmark
        //as being modified

        if (idx > -1) {
          let nt = Object.create({});
          let summary = bm.annotation.topicList[idx].summary;

          if (summary) {
            nt.summary = summary;
          }

          nt.value = newTopic.value;
          nt.topic = newTopic.topic;
          bm.annotation.topicList[idx] = nt;
          bm.modified = true;
          markSourceModified(form.sid, "bookmark");
        }
      }
    });
  });
  $("#displayBookmarksButtonNew").on("click", function (e) {
    e.preventDefault();
    let sid = $(this).attr("data-sid");
    let topicManager = {};
    let actionManager = $("#action-manager").form("get values");

    if (actionManager.topicListNew.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Select one or more topics from the Topic Select List");
      return;
    } //close topics table of open


    manageTopics("close");
    resetAnnotationActions();
    let bookFilter = $(`#book-list${sid} :selected`).val();
    let condition = actionManager.condition === "on" ? "AND" : "OR";
    let matches = findMatchesNew(sid, bookFilter, actionManager.topicListNew, condition);

    if (matches.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("No bookmarks contain selected topics");
      return;
    } //show annotation controls


    $("#action-manager > .annotation-actions").removeClass("hide");
    topicManager.source = _source__WEBPACK_IMPORTED_MODULE_8__["default"].title[sid];
    topicManager.topicArray = actionManager.topicListNew.split(",");
    topicManager.condition = condition;
    topicManager.bookFilter = bookFilter;
    topicManager.sid = sid; //generated html

    generateBookmarkText(matches, topicManager);
  });
  $("#action-manager > .annotation-actions input[type=radio][name=annotationFilter]").on("change", function (e) {
    let form = $("#action-manager").form("get values"); //show all bookmarks

    if (form.annotationFilter === "none") {
      $(".bookmark-segment.hide").removeClass("hide");
    } //show note bookmarks, hide selected
    else if (form.annotationFilter === "note") {
        $(".bookmark-segment.note").removeClass("hide");
        $(".bookmark-segment.selected").addClass("hide");
      } else if (form.annotationFilter === "selected") {
        $(".bookmark-segment.note").addClass("hide"); //don't show bookmarks that have been hidden by Hide Quotes

        $(".bookmark-segment.selected").removeClass("hide");
      }
  });
  $("#action-manager > .annotation-actions").on("click", ".hide-quotes", function (e) {
    if ($(this).hasClass("hide")) {
      $(this).removeClass("hide").html("Hide Quotes");
      $("#activity-report .bookmark-segment.qhide").removeClass("qhide");
    } else {
      let quotesToHide = $("#activity-report .cmi-manage-quote.in-database").parent();
      quotesToHide.addClass("qhide");
      $(this).addClass("hide").html(`Show Quotes (${quotesToHide.length})`);
    }
  });
  $("#action-manager > .annotation-actions").on("click", ".hide-headers", function (e) {
    if ($(this).hasClass("hide")) {
      $(this).removeClass("hide").html("Hide Headers");
      $("#activity-report .bookmark-header").removeClass("hide");
    } else {
      $(this).addClass("hide").html("Show Headers");
      $("#activity-report .bookmark-header").addClass("hide");
    }
  }); //delete topic confirmation modal

  $("#confirmDelete").modal({
    closable: false,
    onDeny: function () {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Delete Canceled.");
    },
    onApprove: function (el) {
      let index = parseInt($(el).attr("data-index"), 10);
      let sid = $(el).attr("data-sid");
      let deletedTopic = topics[sid][index];
      deletedTopic.index = index; //1. mark topic in topic table as deleted

      $(`#topicTable > tbody > [data-sid='${sid}'][data-index='${index}']`).addClass("deleted"); //2. mark topic in topic dropdown select as deleted, change value to "*"

      $(`#topic-list-new > [data-value='${deletedTopic.value}']`).addClass("deleted").attr("data-value", "X"); //3. mark topic as deleted and update topicList when changes are written to db

      topics[sid][index].deleted = true; //topics[sid].splice(index, 1);

      markSourceModified(sid, "topicList"); //4. delete topic from bookmark annotations

      let itemsDeleted = false;
      bookmarks[sid].forEach(bm => {
        if (bm.annotation.topicList) {
          let idx = bm.annotation.topicList.findIndex(t => {
            return t.value === deletedTopic.value;
          }); //bookmark has topic, delete it

          if (idx > -1) {
            bm.annotation.topicList.splice(idx, 1);
            bm.modified = true;
            itemsDeleted = true;
          }
        }
      });

      if (itemsDeleted) {
        markSourceModified(sid, "bookmark");
      }

      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`Topic "${deletedTopic.topic}" Deleted.`);
    }
  });
  /*
   * Write changes to database
   */

  $("#applyChangesButtonNew").on("click", function () {
    //get modified bookmarks
    $(this).addClass("loading");
    let modified = getModified();
    let userInfo = Object(_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])(); //update database

    let results = [];
    modified.bookmarks.forEach(m => {
      delete m.modified;
      delete m.pid;
      results.push(Object(_ajax_annotation__WEBPACK_IMPORTED_MODULE_4__["updateAnnotation"])(m));
    });
    Promise.all(results).then(responses => {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${responses.length} Annotation(s) Updated`); //update modified topics

      results = [];
      modified.topics.forEach(t => {
        let newList = topics[t].filter(t => !t.deleted);
        results.push(Object(_ajax_topics__WEBPACK_IMPORTED_MODULE_3__["putTopicList"])(userInfo.userId, t, newList));
      });
      return Promise.all(results);
    }).then(responses => {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${responses.length} topicList(s) Updated`);
      clearModified();
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success("Modifications Saved");
      $(this).removeClass("loading");
    }).catch(err => {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(`Error updating items: ${err}`);
      console.error(err);
      $(this).removeClass("loading");
    });
  });
}

function findBookmark(info) {
  let selectedBookmark = bookmarks[info.sid].find(bm => bm.creationDate === info.creationDate);

  if (!selectedBookmark) {
    console.error("Couldn't find bookmark to summarize. This shouldn't happen.");
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error("Couldn't find bookmark to summarize.");
  }

  return selectedBookmark;
}

function findTopic(bookmark, topicValue) {
  let topic = bookmark.annotation.topicList.find(t => t.value === topicValue);

  if (!topic) {
    console.error("Couldn't find topic to summarize. This shouldn't happen.");
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error("Couldn't find topic to summarize.");
  }

  return topic;
}

function initSummaryForm(info) {
  let form = $("#topic-summary-editor-form"); // find bookmark

  let selectedBookmark = findBookmark(info);

  if (selectedBookmark) {
    //get summary
    let topic = findTopic(selectedBookmark, info.topicValue);

    if (topic && topic.summary) {
      info.summary = topic.summary;
      $("#topic-summary-editor-form .summary-delete").removeClass("disabled");
    }
  }

  form.form("set values", info);
}

function initTopicSummaryEventHandler() {
  $("#activity-report").on("click", ".topic-summary", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let userInfo = Object(_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])();

    if (!userInfo) {
      return;
    }

    if (isTopicSummaryEditorOpen()) {
      return;
    }

    setTopicSummaryEditorOpen();
    let summaryInfo = {};
    summaryInfo.sid = $(this).attr("data-sid");
    summaryInfo.creationDate = $(this).attr("data-creationdate");
    summaryInfo.topicValue = $(this).attr("data-value"); // highlight selected topic

    $(this).addClass("selected");
    $(this).parents(".bookmark-header").append(getTopicSummaryForm());
    initSummaryForm(summaryInfo);
  }); //cancel button

  $("#activity-report").on("click", "#topic-summary-editor-form .summary-cancel", function (e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).parents(".bookmark-header").find(".topic-summary.selected").removeClass("selected");
    removeTopicSummaryEditor();
    clearTopicSummaryEditorOpen();
  }); //submit button

  $("#activity-report").on("click", "#topic-summary-editor-form .summary-submit", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let info = $("#topic-summary-editor-form").form("get values");
    info.summary = info.summary.trim();
    removeTopicSummaryEditor();
    clearTopicSummaryEditorOpen(); // console.log("summary: %s, summary length: %s", info.summary, info.summary.length);

    if (info.summary.length === 0) {
      $(".bookmark-header .topic-summary.selected").removeClass("selected");
      return;
    } // guard against nefarious input


    info.summary = Object(_util_sanitize__WEBPACK_IMPORTED_MODULE_7__["purify"])(info.summary);
    let bookmark = findBookmark(info);

    if (bookmark) {
      let topic = findTopic(bookmark, info.topicValue);

      if (topic) {
        // mark bookmark as summarized
        bookmark.annotation.summarized = true;
        topic.summary = info.summary;
      }
    } // mark bookmark as modified


    bookmark.modified = true;
    markSourceModified(info.sid, "bookmark"); // mark topic as summarized

    $(".bookmark-header .topic-summary.selected").addClass("summarized").removeClass("selected");
  }); // delete button

  $("#activity-report").on("click", ".summary-delete", function (e) {
    e.stopPropagation();
    e.preventDefault(); // console.log("summary delete clicked");

    let info = $("#topic-summary-editor-form").form("get values");
    removeTopicSummaryEditor();
    clearTopicSummaryEditorOpen();
    $(".bookmark-header .topic-summary.selected").removeClass("selected summarized");
    let bookmark = findBookmark(info);

    if (bookmark) {
      let topic = findTopic(bookmark, info.topicValue);

      if (topic) {
        delete topic.summary;
      }

      let summaryExists = bookmark.annotation.topicList.find(t => t.summary);

      if (!summaryExists) {
        bookmark.annotation.summarized = false;
      }
    } // mark bookmark as modified


    bookmark.modified = true;
    markSourceModified(info.sid, "bookmark");
  });
}

function initManageQuoteEventHandler() {
  /*
   * Open quote editor, query database for quote and populate
   * editor when found. Allow user to update, delete, or add
   * quote to database
   */
  $("#activity-report").on("click", ".cmi-manage-quote", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let userInfo = Object(_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])();

    if (!userInfo) {
      return;
    }

    if (isQuoteEditorOpen()) {
      return;
    }

    setQuoteEditorOpen();
    let quoteInfo = {};
    let citation = $(this).text().trim();
    let [parakey, annotationId, pid] = citation.substr(1).split(":");
    let quote = $(this).prev("p").text().trim().replace(/\r?\n|\r/g, " ");
    quoteInfo.parakey = parakey;
    quoteInfo.annotationId = annotationId;
    quoteInfo.pid = pid;
    quoteInfo.quote = quote;
    quoteInfo.userId = userInfo.userId;
    quoteInfo.url = Object(_util_cmi__WEBPACK_IMPORTED_MODULE_1__["getUrlByPageKey"])(parakey);
    quoteInfo.citation = $(`#${annotationId}`).text().trim(); //console.log("quoteInfo: %o", quoteInfo);
    //open quote editor, query from database and populate form,
    //allow user to edit, delete or cancel

    $(this).append(getQuoteForm());
    initQuoteForm(quoteInfo);
  }); //submit button

  $("#activity-report").on("click", "#quote-editor-form .quote-submit", async function (e) {
    e.stopPropagation();
    e.preventDefault();
    let info = $("#quote-editor-form").form("get values");
    let action = $(this).text().startsWith("Add") ? "Added" : "Updated";
    let postBody = {
      userId: info.userId,
      paraKey: info.parakey,
      creationDate: info.annotationId,
      quote: {
        pid: info.pid,
        quote: Object(_util_sanitize__WEBPACK_IMPORTED_MODULE_7__["purify"])(info.quote),
        url: info.url,
        citation: info.citation
      }
    };
    removeQuoteEditor();
    clearQuoteEditorOpen();

    try {
      let response = await Object(_ajax_quotes__WEBPACK_IMPORTED_MODULE_5__["putQuote"])(postBody);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(`Quote ${action}`);
      markAsInDB(info.parakey, info.annotationId);
    } catch (err) {
      console.error("error posting quote to db: %o", err);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(err);
    }
  }); //cancel button

  $("#activity-report").on("click", "#quote-editor-form .quote-cancel", function (e) {
    e.stopPropagation();
    e.preventDefault();
    removeQuoteEditor();
    clearQuoteEditorOpen();
  }); //cancel button

  $("#activity-report").on("click", "#quote-editor-form .quote-delete", async function (e) {
    e.stopPropagation();
    e.preventDefault();
    let info = $("#quote-editor-form").form("get values");

    try {
      let response = await Object(_ajax_quotes__WEBPACK_IMPORTED_MODULE_5__["deleteQuote"])(info.userId, info.parakey, info.annotationId);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Quote deleted from database");
      markAsNotInDB(info.parakey, info.annotationId);
    } catch (err) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(`failed to delete quote: ${err.message}`);
    }

    removeQuoteEditor();
    clearQuoteEditorOpen();
  });
}

function removeTopicSummaryEditor() {
  $("#topic-summary-editor-form").remove();
}

function isTopicSummaryEditorOpen() {
  return $("#activity-report").hasClass("topic-summary-editor-open");
}

function setTopicSummaryEditorOpen() {
  $("#activity-report").addClass("topic-summary-editor-open");
}

function clearTopicSummaryEditorOpen() {
  $("#activity-report").removeClass("topic-summary-editor-open");
}

function removeQuoteEditor() {
  $("#quote-editor-form").remove();
}

function isQuoteEditorOpen() {
  return $("#activity-report").hasClass("quote-editor-open");
}

function setQuoteEditorOpen() {
  $("#activity-report").addClass("quote-editor-open");
}

function clearQuoteEditorOpen() {
  $("#activity-report").removeClass("quote-editor-open");
}
/*
 * Indicate bookmark is in quote db and
 * mark bookmark as being modified and in quote db so it can be updated.
 */


function markAsInDB(paraKey, creationDate, modified = true) {
  if (modified) {
    markModified(paraKey, creationDate, true);
  }

  $(`.${creationDate}`).addClass("in-database");
}
/*
 * Indicate bookmark is not in the quote db and
 * mark as modified
 */


function markAsNotInDB(paraKey, creationDate) {
  markModified(paraKey, creationDate, false);
  $(`.${creationDate}`).removeClass("in-database");
}

async function initQuoteForm(info) {
  let form = $("#quote-editor-form");
  $("#quote-editor-form").addClass("loading");

  try {
    let response = await Object(_ajax_quotes__WEBPACK_IMPORTED_MODULE_5__["getQuoteData"])(info.userId, info.parakey, info.annotationId);

    if (response.q) {
      info.database = response.q.quote;
      $("#quote-editor-form .quote-delete").removeClass("disabled");
      $("#quote-editor-form button.quote-submit").text("Update Quote");
      markAsInDB(info.parakey, info.annotationId, false);
    }

    $("#quote-editor-form").removeClass("loading");
    form.form("set values", info);
  } catch (err) {
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(err);
    console.log("Error getting quote from database: %w", err);
  }
}
/*
 * Find modified bookmarks and topicLists
 * - sources with modified bookmarks are in the global modified array,
 * - paragraphs with modified bookmarks are marked modified: true
 * - annotations in paragraphs are marked modified: true
 */


function getModified() {
  let bookmarksModified = [];
  let topicListsModified = [];
  let modifiedSources = Object.keys(modified);
  modifiedSources.forEach(sid => {
    if (modified[sid].bookmark === true) {
      let modifiedAnnotations = bookmarks[sid].filter(para => {
        return para.modified;
      });
      modifiedAnnotations.forEach(e => {
        bookmarksModified.push(e);
      });
    }

    if (modified[sid].topicList === true) {
      topicListsModified.push(sid);
    }
  });
  return {
    bookmarks: bookmarksModified,
    topics: topicListsModified
  };
}
/*
 * Mark bookmark paragraph as modified
 */


function markModified(paraKey, creationDate, isQuote) {
  let b = bookmarks[paraKey.substring(0, 2)].find(i => {
    if (i.paraKey === paraKey && i.creationDate === creationDate) {
      return true;
    }

    return false;
  });

  if (b) {
    b.modified = true;
    b.quote = isQuote;
    markSourceModified(paraKey.substring(0, 2), "bookmark");
  }
}

function markSourceModified(sid, kind) {
  if (!modified[sid]) {
    modified[sid] = {
      [kind]: true
    };
  } else {
    if (!modified[sid].hasOwnProperty(kind)) {
      modified[sid][kind] = true;
    }
  }

  $("#applyChangesButtonNew").removeAttr("disabled");
}

function clearModified() {
  let modifiedSources = Object.keys(modified);
  modifiedSources.forEach(sid => {
    bookmarks[sid].forEach(para => {
      delete para.modified;
    });
  }); //clear modified object

  modified = {};
  $("#applyChangesButtonNew").attr("disabled", "");
} //rick


function getTopicSummaryForm() {
  let form = `
    <form name="topic-summary-editor" id="topic-summary-editor-form" class="ui form">
      <input class="hidden-field" type="text" readonly name="creationDate">
      <input class="hidden-field" type="text" name="sid" readonly>
      <input class="hidden-field" type="text" name="topicValue" readonly>
      <div class="field">
        <label>Summarized Annotation</label>
        <textarea name="summary" placeholder="No summary yet." rows="5"></textarea>
      </div>
      <div class="fields">
        <button class="summary-submit ui green button" type="submit">Add or Update</button>
        <button class="summary-cancel ui red basic button">Cancel</button>
        <div class="twelve wide field">
          <button class="summary-delete ui red disabled right floated button">Delete</button>
        </div>
      </div>
    </form>
  `;
  return form;
}

function getQuoteForm() {
  let form = `
    <form name="quote-editor" id="quote-editor-form" class="ui form">
      <input class="hidden-field" type="text" readonly name="annotationId">
      <input class="hidden-field" type="text" name="parakey" readonly>
      <input class="hidden-field" type="text" name="pid" readonly>
      <input class="hidden-field" type="text" name="userId" readonly>
      <input class="hidden-field" type="text" name="url" readonly>
      <input class="hidden-field" type="text" name="citation" readonly>
      <div class="field">
        <label>Edit Content for Display as a Quote</label>
        <textarea name="quote" rows="5"></textarea>
      </div>
      <div class="field">
        <label>Quote in Database</label>
        <textarea name="database" readonly placeholder="Not in database." rows="5"></textarea>
      </div>
      <div class="fields">
        <button class="quote-submit ui green button" type="submit">Add Quote</button>
        <button class="quote-cancel ui red basic button">Cancel</button>
        <div class="twelve wide field">
          <button class="quote-delete ui red disabled right floated button">Delete</button>
        </div>
      </div>
    </form>
  `;
  return form;
}

function checkForUnsavedChanges() {
  window.onbeforeunload = function (event) {
    let unsavedChanges = $("#applyChangesButtonNew").attr("disabled") !== "disabled";
    var message;

    if (unsavedChanges) {
      message = "Please click 'Apply' to save your changes.";

      if (typeof event == 'undefined') {
        event = window.event;
      }

      if (event) {
        event.returnValue = message;
      }

      return message;
    }
  };
}

function initializeTopicManager() {
  let userInfo = Object(_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])();

  if (!userInfo) {
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.warning("You must be signed in to edit your email list");
    setTimeout(() => {
      location.href = "/";
    }, 3 * 1000);
    return;
  }

  initForm();
  initManageQuoteEventHandler();
  initTopicSummaryEventHandler();
  checkForUnsavedChanges();
}

/***/ }),

/***/ "./src/js/profile.js":
/*!***************************!*\
  !*** ./src/js/profile.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var _modules_page_startup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/_page/startup */ "./src/js/modules/_page/startup.js");
/* harmony import */ var _modules_bookmark_start__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/_bookmark/start */ "./src/js/modules/_bookmark/start.js");
/* harmony import */ var _modules_search_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/_search/search */ "./src/js/modules/_search/search.js");
/* harmony import */ var _modules_contents_toc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/_contents/toc */ "./src/js/modules/_contents/toc.js");
/* harmony import */ var _modules_user_netlify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _modules_about_about__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/_about/about */ "./src/js/modules/_about/about.js");
/* harmony import */ var _modules_user_email__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/_user/email */ "./src/js/modules/_user/email.js");
/* harmony import */ var _modules_user_topicmgr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/_user/topicmgr */ "./src/js/modules/_user/topicmgr.js");
/* harmony import */ var _modules_language_lang__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/_language/lang */ "./src/js/modules/_language/lang.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");
/* eslint no-console: off */
 //import "../vendor/semantic/semantic.min.js";
//import "../../public/vendor/semantic/semantic.js";











$(document).ready(() => {
  Object(_modules_util_store__WEBPACK_IMPORTED_MODULE_0__["storeInit"])(_constants__WEBPACK_IMPORTED_MODULE_10__["default"]);
  Object(_modules_page_startup__WEBPACK_IMPORTED_MODULE_1__["initStickyMenu"])();
  Object(_modules_language_lang__WEBPACK_IMPORTED_MODULE_9__["setLanguage"])(_constants__WEBPACK_IMPORTED_MODULE_10__["default"]);
  Object(_modules_bookmark_start__WEBPACK_IMPORTED_MODULE_2__["bookmarkStart"])("page");
  _modules_search_search__WEBPACK_IMPORTED_MODULE_3__["default"].initialize();
  _modules_user_netlify__WEBPACK_IMPORTED_MODULE_5__["default"].initialize();
  _modules_contents_toc__WEBPACK_IMPORTED_MODULE_4__["default"].initialize("transcript");
  _modules_about_about__WEBPACK_IMPORTED_MODULE_6__["default"].initialize(); //email mgt page

  if ($(".manage-email-list").length === 1) {
    Object(_modules_user_email__WEBPACK_IMPORTED_MODULE_7__["loadEmailListTable"])();
  } //topic mgt page


  if ($(".manage-topic-list").length === 1) {
    Object(_modules_user_topicmgr__WEBPACK_IMPORTED_MODULE_8__["initializeTopicManager"])();
  }
});

/***/ }),

/***/ 1:
/*!*********************************!*\
  !*** multi ./src/js/profile.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/profile.js */"./src/js/profile.js");


/***/ })

/******/ });
//# sourceMappingURL=profile.js.map