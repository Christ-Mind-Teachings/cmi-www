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
/*! exports provided: getConfig, getTopics, getBookmarks, getBookmarkText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTopics", function() { return getTopics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBookmarks", function() { return getBookmarks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBookmarkText", function() { return getBookmarkText; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "./src/js/globals.js");



const acimKey = __webpack_require__(/*! acim/modules/_config/key */ "../cmi-acim/src/js/modules/_config/key.js");

const acolKey = __webpack_require__(/*! acol/modules/_config/key */ "../cmi-acol/src/js/modules/_config/key.js");

const rajKey = __webpack_require__(/*! raj/modules/_config/key */ "../cmi-raj/src/js/modules/_config/key.js");

const jsbKey = __webpack_require__(/*! jsb/modules/_config/key */ "../cmi-jsb/src/js/modules/_config/key.js");

const womKey = __webpack_require__(/*! wom/modules/_config/key */ "../cmi-wom/src/js/modules/_config/key.js");

const ACIMSOURCEID = "12";
const ACOLSOURCEID = "14";
const RAJSOURCEID = "13";
const WOMSOURCEID = "10";
const JSBSOURCEID = "11";
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
    throw "key: topicsEndPoint not found in globals";
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
} //transcript Node cache

let htmlCache = {};

function getNoteTranscript(id, url) {
  if (htmlCache[id]) {
    return Promise.resolve(htmlCache[id]);
  }

  const config = {
    responseType: "document"
  };
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url, config).then(response => {
    let transcriptNode = response.data.getElementsByClassName("transcript")[0];
    htmlCache[id] = transcriptNode;
    return Promise.resolve(transcriptNode);
  });
}

function getNoteUrl(key) {
  let url;
  let akey = key + "";

  if (akey.startsWith(ACIMSOURCEID)) {
    url = acimKey.getUrl(key, true);
  } else if (akey.startsWith(ACOLSOURCEID)) {
    url = acolKey.getUrl(key, true);
  } else if (akey.startsWith(JSBSOURCEID)) {
    url = jsbKey.getUrl(key, true);
  } else if (akey.startsWith(RAJSOURCEID)) {
    url = rajKey.getUrl(key, true);
  } else if (akey.startsWith(WOMSOURCEID)) {
    url = womKey.getUrl(key, true);
  }

  return url;
}

function getBookmarkText(bookmarks) {
  let promises = bookmarks.map(bm => {
    if (bm.bookmark.selectedText) {
      if (!bm.mgr) {
        bm.mgr = {};
        let st = JSON.parse(bm.bookmark.selectedText);
        bm.mgr.title = st.title;
        bm.mgr.url = st.url;
        bm.mgr.pid = st.pid;
        bm.mgr.content = [{
          pid: st.pid,
          text: st.target.selector[1].exact
        }];
        bm.mgr.comment = bm.bookmark.Comment;
        bm.mgr.note = bm.bookmark.Note;
        bm.mgr.type = "selected";
      }

      return Promise.resolve(bm);
    } //Note style bookmark
    else if (!bm.mgr) {
        let url = getNoteUrl(bm.id);
        bm.mgr = {};
        bm.mgr.type = "note";
        bm.mgr.title = bm.bookmark.bookTitle;
        bm.mgr.url = url;
        bm.mgr.pid = bm.bookmark.rangeStart;
        bm.mgr.comment = bm.bookmark.Comment;
        bm.mgr.note = bm.bookmark.Note; //get 'document' response from axios

        return getNoteTranscript(bm.id, url).then(resp => {
          let paragraphs = resp.getElementsByTagName("p");
          let rangeStart = parseInt(bm.bookmark.rangeStart.substring(1), 10);
          let rangeEnd = parseInt(bm.bookmark.rangeEnd.substring(1), 10);
          bm.mgr.content = [];

          for (let p = rangeStart; p <= rangeEnd; p++) {
            bm.mgr.content.push({
              pid: `p${p}`,
              text: paragraphs[p].textContent
            });
          }

          return Promise.resolve(bm);
        });
      } else {
        return Promise.resolve(bm);
      }
  });
  return promises;
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
/* harmony import */ var lodash_differenceWith__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/differenceWith */ "./node_modules/lodash/differenceWith.js");
/* harmony import */ var lodash_differenceWith__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_differenceWith__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/uniqWith */ "./node_modules/lodash/uniqWith.js");
/* harmony import */ var lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5__);






let sourceInfo = {
  title: {
    "10": "The Way of Mastery",
    "11": "The Impersonal Life",
    "12": "ACIM Sparkley Edition",
    "13": "The Raj Material",
    "14": "A Course Of Love",
    "15": "ACIM Original Edition"
  },
  "0": [{
    "value": "*",
    "name": "-- Select Source --"
  }],
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
  }]
};
let bookmarks = {};
let topics = {};

function generateTopicList(topics) {
  return `
    <div class="ui list">
      ${topics.map(t => `
        <div class="item">
          ${t.topic}
        </div>
      `).join("")}
    </div>
  `;
}

function generateHorizontalList(listArray, flat = false) {
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
        <em>${flat ? item : item.topic}</em>
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
    <div class="ui vertical segment">
      <div class="ui small header bookmark-header">
        <a target="_blank" href="${bm.mgr.url}?v=${bm.mgr.pid}&key=${bm.id}">${bm.mgr.title ? bm.mgr.title : bm.mgr.url}</a>
        <br/>
        <div class="ui horizontal bulleted link list">
          ${generateHorizontalList(bm.bookmark.topicList)}
        </div>
        ${bm.mgr.comment ? "<br/>" : ""}
        ${bm.mgr.comment ? bm.mgr.comment : ""}
      </div>
      ${generateContent(bm.mgr.content)}
    </div>
  `;
}

function generateBookmarkTextHtml(bookmarks, topicManager) {
  return `
    <p>
      <button class="hide-headers ui primary button">Hide Headers</button>
    </p>
    <p>
      ${sourceInfo.title[topicManager.source]}<br/>
      ${bookmarks.length} Bookmarks include topics: <em>${topicManager.topicArray.join(" / ")}</em> <br/>
      ${new Date().toLocaleString()}
    </p>
    ${bookmarks.map(bookmark => `${generateSection(bookmark)}`).join("")}
  `;
}

function generateBookmarkText(bookmarks, topicManager) {
  let promises = Object(_net__WEBPACK_IMPORTED_MODULE_1__["getBookmarkText"])(bookmarks);
  Promise.all(promises).then(responses => {
    //console.log("promise.all: %o", responses);
    let html = generateBookmarkTextHtml(responses, topicManager);
    $("#activity-report").html(html);
  });
}

function makeTopicSelect(topics) {
  return `
    ${topics.map(topic => `<div class="item ${topic.deleted ? " deleted" : ""}" data-value="${topic.deleted ? "*" : ""}${topic.value}">${topic.deleted ? "*" : ""}${topic.topic}</div>`).join("")}
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
  $("#source-list").dropdown();
  $("#book-list1.dropdown").dropdown();
  $("#topicSelect").dropdown();
  $("#activity-report").on("click", ".hide-headers", function (e) {
    if ($(this).hasClass("hide")) {
      $(this).removeClass("hide").html("Hide Headers");
      $("#activity-report .bookmark-header").removeClass("hide");
    } else {
      $(this).addClass("hide").html("Show Headers");
      $("#activity-report .bookmark-header").addClass("hide");
    }
  }); //delete confirmation modal

  $("#confirmDelete").modal({
    closable: false,
    onDeny: function () {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Delete Canceled."); //$("#topicSelect").dropdown("clear");
    },
    onApprove: function () {
      let topicManager = getFormData();
      let deleted = filterTopics(topicManager.topicList); //clear selected topics

      $("#topicSelect").dropdown("clear");

      if (deleted.length === 0) {
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("No topic(s) selected.");
        return;
      } //mark topics as deleted


      markTopicsDeleted(topicManager.source, deleted); //find bookmarks with deleted topics

      let bookmarksWithDeletedTopics = getBookmarksByTopic(topicManager.source, deleted);
      console.log("matches: %o", bookmarksWithDeletedTopics); //remove deleted topics from bookmarks

      if (bookmarksWithDeletedTopics.length > 0) {
        deleteBookmarkTopics(topicManager.source, bookmarksWithDeletedTopics, deleted);
      } //update topics select control


      let html = makeTopicSelect(topics[topicManager.source]);
      $("#topic-list").html(html);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success("Topics Deleted.");
    }
  });
  $("#source-list").on("change", function () {
    let topicManager = getFormData(); //clear topic list

    $("#topicsLabel").text("Topics (0)"); //let sourceId = e.target.selectedOptions[0].value;

    let sourceId = topicManager.source;
    let html = makeBookSelectNew(sourceInfo[sourceId]);
    $("#book-list1").html(html); //clear activity report

    clearActivityReport(); //enable Get Bookmarks button

    $("#getBookmarksButton").removeAttr("disabled"); //disable buttons until topics have been loaded

    $("#deleteTopicsButton").attr("disabled", "");
    $("#renameTopicButton").attr("disabled", "");
    $("#findFriendsButton").attr("disabled", "");
    $("#displayBookmarksButton").attr("disabled", "");
    $("#bookmarksLabel").text("Bookmarks (0)"); //clear topic dropdown

    if ($("#topic-list > div").length > 0) {
      $("#topic-list").html("");
      $("#topicSelect").dropdown("clear");
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
        topics[topicManager.source] = response.data.topics; //add "All Topics" topic

        topics[topicManager.source].unshift({
          value: "<>",
          topic: "< All Topics >"
        });
        let html = makeTopicSelect(response.data.topics);
        $("#topic-list").html(html);
        $("#topicsLabel").text(`Topics (${response.data.topics.length})`);
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${topics[topicManager.source].length} topics loaded`);
        $("#deleteTopicsButton").removeAttr("disabled");
        $("#renameTopicButton").removeAttr("disabled");
        $("#findFriendsButton").removeAttr("disabled");
        $("#displayBookmarksButton").removeAttr("disabled");
      });
    } else {
      let html = makeTopicSelect(topics[topicManager.source]);
      $("#topic-list").html(html);
      $("#topicsLabel").text(`Topics (${topics[topicManager.source].length})`);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${topics[topicManager.source].length} topics loaded`);
      $("#deleteTopicsButton").removeAttr("disabled");
      $("#renameTopicButton").removeAttr("disabled");
      $("#findFriendsButton").removeAttr("disabled");
      $("#displayBookmarksButton").removeAttr("disabled");
    } //get bookmarks for source


    if (!bookmarks[topicManager.source]) {
      Object(_net__WEBPACK_IMPORTED_MODULE_1__["getBookmarks"])(userInfo.userId, topicManager.source).then(response => {
        bookmarks[topicManager.source] = response.data.response;
        $("#bookmarksLabel").text(`Bookmarks (${bookmarks[topicManager.source].length})`);
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${bookmarks[topicManager.source].length} bookmarks loaded`);
        $("#topic-manager").removeClass("loading"); //add modified indicator, set to false

        bookmarks[topicManager.source].forEach(i => {
          i.modified = false;
        });
      });
    } else {
      $("#topic-manager").removeClass("loading");
      $("#bookmarksLabel").text(`Bookmarks (${bookmarks[topicManager.source].length})`);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${bookmarks[topicManager.source].length} bookmarks loaded`);
    }
  });
  $("#deleteTopicsButton").on("click", function () {
    let topicManager = getFormData();
    let deleted = filterTopics(topicManager.topicList);

    if (deleted.length === 0) {
      $("#topicSelect").dropdown("clear");
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("No topic(s) selected.");
      return;
    }

    $("#topicsToDelete").html(`<em>${topicManager.topicList}</em>`);
    $("#confirmDelete").modal("show");
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
  $("#findFriendsButton").on("click", function () {
    let topicManager = getFormData();
    let topicArray = filterTopics(topicManager.topicList); //don't all the 'All Topics' topic

    topicArray = topicArray.filter(t => {
      if (t === "<>") {
        return false;
      }

      return true;
    });

    if (topicArray.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Select at least one topic.");
      return;
    } //find bookmarks containing selected topics


    let matches = findMatches(topicManager.source, topicManager.book, topicArray); //get topics from matches but don't include those in topicArray

    let friends = [];
    matches.forEach(bm => {
      let diff = lodash_differenceWith__WEBPACK_IMPORTED_MODULE_4___default()(bm.bookmark.topicList, topicArray, (v1, v2) => {
        if (v1.value === v2) {
          return true;
        }

        return false;
      });
      friends = friends.concat(diff);
    }); //remove duplicates

    friends = lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5___default()(friends, (v1, v2) => {
      if (v1.value === v2.value) {
        return true;
      }

      return false;
    }); //sort

    friends.sort((v1, v2) => {
      if (v1.value < v2.value) {
        return -1;
      }

      if (v1.value > v2.value) {
        return 1;
      }

      return 0;
    });
    let html = generateTopicList(friends);
    $("#activity-report").html(html);
  });
  $("#displayBookmarksButton").on("click", function () {
    let topicManager = getFormData();
    let topicArray = filterTopics(topicManager.topicList);

    if (topicArray.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Select at least one topic.");
      return;
    }

    let matches = findMatches(topicManager.source, topicManager.book, topicArray);

    if (matches.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("No bookmarks contain selected topics");
      clearActivityReport();
      return;
    } //generated html


    topicManager.topicArray = topicArray;
    generateBookmarkText(matches, topicManager);
  });
}

function clearActivityReport() {
  $("#activity-report").html("");
}
/*
 * Search through bookmarks by source and filter by book for topics
 */


function findMatches(source, book, topics) {
  let matches = getBookmarksWithAllTopic(source, topics);

  if (matches.length === 0) {
    return matches;
  } //filter matched bookmarks if user restricted by book


  if (book !== "*") {
    matches = matches.filter(bm => {
      let bmid = bm.id + "x";
      return bmid.startsWith(book);
    });
  }

  return matches;
}
/*
 * Given a comma separated string of user selected topics, filter deleted
 * topics and return an array.
 */


function filterTopics(topicString) {
  let topicArray = topicString.split(",").filter(item => {
    if (item === "") {
      return false;
    }

    if (item.startsWith("*")) {
      return false;
    }

    return true;
  });
  return topicArray;
}
/*
 * Mark topics as deleted
 * Args: source: Source Id
 *       deletedTopics: array of deleted topics
 */


function markTopicsDeleted(source, deletedTopics) {
  topics[source].forEach(topic => {
    deletedTopics.forEach(dt => {
      if (dt !== "<>" && dt === topic.value) {
        topic.deleted = true; //console.log("deleted topic: %o", topic);
      }
    });
  });
}
/*
 * Find bookmarks containing ALL topics
 * Args: source: Source Id
 *       topics: array of topics
 */


function getBookmarksWithAllTopic(source, topics) {
  let matches = [];
  let wildcard = false;

  if (topics.length === 0) {
    return matches;
  } //return all bookmarks


  if (topics.includes("<>")) {
    wildcard = true;
  }

  bookmarks[source].forEach(item => {
    item.bookmark.forEach(bmark => {
      if (wildcard) {
        matches.push({
          id: item.id,
          bookmark: bmark
        });
      } else {
        if (bmark.topicList && bmark.topicList.length > 0) {
          let index;
          let findCount = 0;
          topics.forEach(t => {
            index = bmark.topicList.findIndex(bt => {
              if (bt.value === t) {
                return true;
              }

              return false;
            });

            if (index > -1) {
              findCount++;
            }
          });

          if (findCount === topics.length) {
            matches.push({
              id: item.id,
              bookmark: bmark
            });
          }
        }
      }
    });
  });
  return matches;
}
/*
 * Find bookmarks containing topics
 * Args: source: Source Id
 *       topics: array of topics
 */


function getBookmarksByTopic(source, topics) {
  //find bookmarks containing selected topics
  let matches = [];
  bookmarks[source].forEach(item => {
    item.bookmark.forEach(bmark => {
      let intersection;

      if (bmark.topicList) {
        intersection = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_3___default()(topics, bmark.topicList, function (t, bt) {
          if (t === bt.value) {
            return true;
          }

          return false;
        });

        if (intersection.length > 0) {
          matches.push({
            id: item.id,
            bookmark: bmark
          });
        }
      }
    });
  });
  return matches;
}
/*
 * Delete topics in bookmarks if found in the argument array topics
 */


function deleteBookmarkTopics(sourceId, bookmarks, topics) {
  bookmarks.forEach(item => {
    if (item.bookmark.topicList && item.bookmark.topicList.length > 0) {
      item.bookmark.topicList.forEach(t => {
        if (topics.includes(t.value)) {
          t.deleted = true;
        }
      });
      item.bookmark.deletedTopicList = item.bookmark.topicList.filter(t => {
        if (t.deleted) {
          return true;
        }

        return false;
      });
      item.bookmark.topicList = item.bookmark.topicList.filter(t => {
        if (!t.deleted) {
          return true;
        }

        delete t.deleted;
        return false;
      });
    }

    markModified(sourceId, item.id);
  });
}

function markModified(sourceId, bookmarkId) {
  let b = bookmarks[sourceId].find(i => {
    if (i.id === bookmarkId) {
      return true;
    }

    return false;
  });

  if (b) {
    b.modified = true;
  }
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