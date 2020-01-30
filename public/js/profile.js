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

/***/ "./src/js/modules/_user/email.js":
/*!***************************************!*\
  !*** ./src/js/modules/_user/email.js ***!
  \***************************************/
/*! exports provided: loadEmailListTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadEmailListTable", function() { return loadEmailListTable; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "./src/js/globals.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
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

    if (status === "Add") {
      maillist.push({
        first: formData.first,
        last: formData.last,
        address: formData.address
      });
      let row = makeTableRow(formData, maillist.length - 1); //append row to table

      $("#email-list-table").append(row);
      enableSave();
      console.log("after Add: maillist: %o", maillist);
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


function loadEmailListTable() {
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_3__["getUserInfo"])();

  if (!userInfo) {
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.warning("You must be signed in to edit your email list");
    return;
  }

  let api = `${userInfo.userId}/maillist`;
  $(".sync.icon").addClass("loading");
  axios__WEBPACK_IMPORTED_MODULE_0___default()(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/${api}`).then(response => {
    $(".sync.icon.loading").removeClass("loading");
    maillist = response.data.maillist;
    let html = populateTable(maillist);
    $("#email-list-table").html(html);
    createEventHandlers();
  }).catch(err => {
    $(".sync.icon.loading").removeClass("loading");
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.error("Error getting email list: ", err);
  });
}
/*
  Save changes to maillist to database
*/

function saveChanges() {
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_3__["getUserInfo"])();
  let api = "maillist";
  let newList = maillist.filter(item => !item.deleted);
  console.log("newList: %o", newList);
  let body = {
    userId: userInfo.userId,
    addressList: newList
  };
  $(".sync.icon").addClass("loading");
  axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/${api}`, body).then(response => {
    $(".sync.icon.loading").removeClass("loading");

    if (response.data.message === "OK") {
      toastr__WEBPACK_IMPORTED_MODULE_2___default.a.info(`Saved! ${response.data.response}`);
      $("button.save-to-database").addClass("disabled");
    }
  }).catch(err => {
    $(".sync.icon.loading").removeClass("loading");
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.error(err);
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ "./src/js/modules/_user/net.js":
/*!*************************************!*\
  !*** ./src/js/modules/_user/net.js ***!
  \*************************************/
/*! exports provided: getConfig, getTopics, getBookmarks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTopics", function() { return getTopics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBookmarks", function() { return getBookmarks; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "./src/js/globals.js");


function getConfig(key) {
  let url = _globals__WEBPACK_IMPORTED_MODULE_1__["default"][key];

  if (!url) {
    throw `key: ${key} not found in globals`;
  }

  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url);
}
function getTopics(userId, sourceId) {
  let url = _globals__WEBPACK_IMPORTED_MODULE_1__["default"]["topicsEndPoint"];

  if (!url) {
    throw `key: topicsEndPoint not found in globals`;
  }

  url = `${url}/user/${userId}/topics/${sourceId}`;
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url);
}
function getBookmarks(userId, sourceId) {
  let url = _globals__WEBPACK_IMPORTED_MODULE_1__["default"]["bookmarkApi"];

  if (!url) {
    throw "key: 'bookmarkApi' not found in globals";
  }

  url = `${url}/bookmark/query/${userId}/${sourceId}`;
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url);
}

/***/ }),

/***/ "./src/js/modules/_user/topicmgr.js":
/*!******************************************!*\
  !*** ./src/js/modules/_user/topicmgr.js ***!
  \******************************************/
/*! exports provided: initializeTopicManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeTopicManager", function() { return initializeTopicManager; });
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./net */ "./src/js/modules/_user/net.js");
/* harmony import */ var _netlify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/intersectionWith */ "./node_modules/lodash/intersectionWith.js");
/* harmony import */ var lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_3__);




let sourceInfo = {
  "0": [{
    "value": "*",
    "name": "-- Select Source --"
  }],
  "12": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "text",
    "name": "Text"
  }, {
    "value": "workbook",
    "name": "Workbook for Students"
  }, {
    "value": "manual",
    "name": "Manual for Teachers"
  }, {
    "value": "preface",
    "name": "Preface"
  }],
  "14": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "course",
    "name": "The Course"
  }, {
    "value": "treatises",
    "name": "The Treatises"
  }, {
    "value": "dialogues",
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
    "value": "yaa",
    "name": "You Are the Answer"
  }, {
    "value": "grad",
    "name": "Graduation"
  }, {
    "value": "acim",
    "name": "ACIM Study Group"
  }],
  "10": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "tjl",
    "name": "The Jeshua Letters"
  }, {
    "value": "wos",
    "name": "The Way of the Servant"
  }, {
    "value": "early",
    "name": "The Early Years"
  }, {
    "value": "woh",
    "name": "The Way of the Heart"
  }, {
    "value": "wot",
    "name": "The Way of Transformation"
  }, {
    "value": "wok",
    "name": "The Way of Knowing"
  }]
};
let bookmarks = {};
let topics = {};
let topicsLoaded = false;
let sourceValue = "0";

function makeTopicSelect(topics) {
  return `
    ${topics.map(topic => `<option value="${topic.value}">${topic.topic}</option>`).join("")}
  `;
}

function makeBookSelectNew(books) {
  return `
    ${books.map(book => `<option value="${book.value}">${book.name}</option>`).join("")}
  `;
}

function getFormData() {
  return $("#topic-manager").form("get values");
}

function initForm() {
  $("#book-list1.dropdown").dropdown();
  $("#topic-list.dropdown").dropdown();
  $("#source-list").on("change", function (e) {
    let topicManager = getFormData(); //if user has topics selected, they must be deleted before
    //source can be changed.

    if (topicsLoaded && topicManager.topicList.length > 0) {
      e.preventDefault();
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error("Please delete selected topics before changing Source.");
      $("#topic-manager").form("set value", "source", sourceValue);
      return false;
    }

    let sourceId = e.target.selectedOptions[0].value;
    sourceValue = e.target.selectedOptions[0].text;
    let html = makeBookSelectNew(sourceInfo[sourceId]);
    $("#book-list1").html(html); //enable Get Bookmarks button

    $("#getBookmarksButton").removeAttr("disabled"); //disable buttons until topics have been loaded

    $("#deleteTopicsButton").attr("disabled", "");
    $("#renameTopicButton").attr("disabled", "");
    $("#displayBookmarksButton").attr("disabled", "");
    $("#bookmarksLabel").text("Bookmarks (0)"); //clear topic dropdown

    if (topicsLoaded) {
      let resetTopics = makeTopicSelect([{
        "value": "*",
        topic: "-- Select Source --"
      }]);
      $("#topic-list").html(resetTopics);
      $("#topicsLabel").text("Topics (0)");
    }
  });
  $("#getBookmarksButton").on("click", function (e) {
    let topicManager = getFormData();

    if (topicManager.source === "0") {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("To start, first select a source");
      return;
    }

    let userInfo = Object(_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])();

    if (!userInfo) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error("You must be signed in to use this page");
      return;
    } //disable button until source is changed


    $("#getBookmarksButton").attr("disabled", "");
    $("#topic-manager").addClass("loading"); //get topics for source

    if (!topics[topicManager.source]) {
      Object(_net__WEBPACK_IMPORTED_MODULE_1__["getTopics"])(userInfo.userId, topicManager.source).then(response => {
        topics[topicManager.source] = response.data.topics;
        let html = makeTopicSelect(response.data.topics);
        $("#topic-list").html(html);
        $("#topicsLabel").text(`Topics (${response.data.topics.length})`);
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${topics[topicManager.source].length} topics loaded`);
        topicsLoaded = true;
        $("#deleteTopicsButton").removeAttr("disabled");
        $("#renameTopicButton").removeAttr("disabled");
        $("#displayBookmarksButton").removeAttr("disabled");
      });
    } else {
      let html = makeTopicSelect(topics[topicManager.source]);
      $("#topic-list").html(html);
      $("#topicsLabel").text(`Topics (${topics[topicManager.source].length})`);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${topics[topicManager.source].length} topics loaded`);
      $("#deleteTopicsButton").removeAttr("disabled");
      $("#renameTopicButton").removeAttr("disabled");
      $("#displayBookmarksButton").removeAttr("disabled");
    } //get bookmarks for source


    if (!bookmarks[topicManager.source]) {
      Object(_net__WEBPACK_IMPORTED_MODULE_1__["getBookmarks"])(userInfo.userId, topicManager.source).then(response => {
        bookmarks[topicManager.source] = response.data.response;
        $("#bookmarksLabel").text(`Bookmarks (${bookmarks[topicManager.source].length})`);
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${bookmarks[topicManager.source].length} bookmarks loaded`);
        $("#topic-manager").removeClass("loading");
      });
    } else {
      $("#topic-manager").removeClass("loading");
      $("#bookmarksLabel").text(`Bookmarks (${bookmarks[topicManager.source].length})`);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${bookmarks[topicManager.source].length} bookmarks loaded`);
    }
  });
  $("#deleteTopicsButton").on("click", function () {
    let topicManager = getFormData();

    if (topicManager.topicList.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Select topic(s) to be deleted.");
      return;
    }
  });
  $("#renameTopicButton").on("click", function () {
    let topicManager = getFormData();

    if (topicManager.topicList.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Select topic to be renamed.");
      return;
    }

    if (topicManager.topicList.length > 1) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Select only ONE topic to be renamed.");
      return;
    }
  });
  $("#displayBookmarksButton").on("click", function () {
    let topicManager = getFormData();

    if (topicManager.topicList.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Select at least one topic.");
      return;
    }
  });
}

function showBookmarks(sourceInfo, topicsInfo) {
  console.log("sourceInfo: %o", sourceInfo);
  console.log("topicsInfo: %o", topicsInfo); //console.log("bookmarks: %o", bookmarks[sourceInfo.sourceList]);
  //find bookmarks containing selected topics

  bookmarks[sourceInfo.sourceList].forEach(item => {
    item.bookmark.forEach(bmark => {
      let intersection;

      if (bmark.topicList) {
        intersection = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_3___default()(topicsInfo.topicList, bmark.topicList);

        if (intersection.length > 0) {
          console.log(bmark.topicList);
        }
      }
    }); //console.log("bookmark: %o", item);
  });
}

function initializeTopicManager() {
  initForm();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ "./src/js/profile.js":
/*!***************************!*\
  !*** ./src/js/profile.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _vendor_semantic_semantic_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vendor/semantic/semantic.min.js */ "./src/vendor/semantic/semantic.min.js");
/* harmony import */ var _vendor_semantic_semantic_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vendor_semantic_semantic_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_page_startup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/_page/startup */ "./src/js/modules/_page/startup.js");
/* harmony import */ var _modules_bookmark_start__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/_bookmark/start */ "./src/js/modules/_bookmark/start.js");
/* harmony import */ var _modules_search_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/_search/search */ "./src/js/modules/_search/search.js");
/* harmony import */ var _modules_contents_toc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/_contents/toc */ "./src/js/modules/_contents/toc.js");
/* harmony import */ var _modules_user_netlify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _modules_about_about__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/_about/about */ "./src/js/modules/_about/about.js");
/* harmony import */ var _modules_user_email__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/_user/email */ "./src/js/modules/_user/email.js");
/* harmony import */ var _modules_user_topicmgr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/_user/topicmgr */ "./src/js/modules/_user/topicmgr.js");
/* eslint no-console: off */









$(document).ready(() => {
  Object(_modules_page_startup__WEBPACK_IMPORTED_MODULE_1__["initStickyMenu"])();
  Object(_modules_bookmark_start__WEBPACK_IMPORTED_MODULE_2__["bookmarkStart"])("page");
  _modules_search_search__WEBPACK_IMPORTED_MODULE_3__["default"].initialize();
  _modules_user_netlify__WEBPACK_IMPORTED_MODULE_5__["default"].initialize();
  _modules_contents_toc__WEBPACK_IMPORTED_MODULE_4__["default"].initialize("transcript");
  _modules_about_about__WEBPACK_IMPORTED_MODULE_6__["default"].initialize(); //email mgt page

  if ($(".manage-email-list").length === 1) {
    console.log("loading email list table");
    Object(_modules_user_email__WEBPACK_IMPORTED_MODULE_7__["loadEmailListTable"])();
  } //topic mgt page


  if ($(".manage-topic-list").length === 1) {
    console.log("loading topic list table");
    Object(_modules_user_topicmgr__WEBPACK_IMPORTED_MODULE_8__["initializeTopicManager"])();
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

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