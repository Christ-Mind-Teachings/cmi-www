(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["profile~transcript"],{

/***/ "./src/js/globals.js":
/*!***************************!*\
  !*** ./src/js/globals.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
  Global constants
*/
/* harmony default export */ __webpack_exports__["default"] = ({
  acolManager: "acol.enable@christmind.info",
  cmiUserId: "05399539cca9ac38db6db36f5c770ff1",
  sources: "/public/config/sources.json",
  user: "https://kkdlxunoe7.execute-api.us-east-1.amazonaws.com/latest",
  acol: "https://kkdlxunoe7.execute-api.us-east-1.amazonaws.com/latest/acol/access",
  search: "https://x5rigstpd2.execute-api.us-east-1.amazonaws.com/latest/search"
});

/***/ }),

/***/ "./src/js/modules/_ajax/annotation.js":
/*!********************************************!*\
  !*** ./src/js/modules/_ajax/annotation.js ***!
  \********************************************/
/*! exports provided: getAnnotations, getTopicSummaries, updateAnnotation, postAnnotation, getAnnotation, deleteAnnotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAnnotations", function() { return getAnnotations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTopicSummaries", function() { return getTopicSummaries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateAnnotation", function() { return updateAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postAnnotation", function() { return postAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAnnotation", function() { return getAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteAnnotation", function() { return deleteAnnotation; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "./src/js/globals.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__);



/*
 * Format paraKey so it contains 3 decimal positions
 */

function formatKey(key) {
  if (typeof key !== "string") {
    key = key.toString(10);
  }

  let decimalPos = key.indexOf("."); //invalid key, but return it anyway.

  if (decimalPos === -1) {
    return `${key}.001`;
  }

  let intPart = key.substr(0, decimalPos);
  let decimalPart = key.substr(decimalPos + 1);
  let padding = decimalPart.length === 2 ? "0" : decimalPart.length === 1 ? "00" : "";
  return `${intPart}.${decimalPart}${padding}`;
}
/***
 * Get array of annotations from server, add a numeric pid to each item, and
 * parse stringified selectedText.
 *
 *
 * @param {string} userId - md5 has of email address of owner
 * @param {string} key - teaching id (sourceId) for origin of annotations,
 *                       at least two digits, more to restrict by book
 * @param {string} topicValue - optional, return annotations containing topicValue only
 *
 * Return array of annotations.
 * {
 *   annotation: {
 *     Comment: <string>,
 *     rangeStart: <string>,
 *     rangeEnd: <string>,
 *     [selectedText]: <object>,
 *     [aid]: <string>
 *     topicList: [{value, topic},...],
 *     userId: <string>,
 *     creationDate: <string>
 *   }, 
 *   userId: <string>,
 *   paraKey: <string>,
 *   creationDate: <string>,
 *   pid: <number>
 * }
 */


function getAnnotations(userId, key, topicValue = "") {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/queryAnnotation/${userId}/${key}`).then(response => {
      let bmList = response.data.response;
      bmList.forEach(b => {
        //numeric pid, not representative of key
        // - used to find annotations for a given paragraph
        b.pid = parseInt(b.annotation.rangeStart.substring(1), 10); //add userId and creationDate to annotation, this is used by the
        //bookmark navigator

        b.annotation.userId = b.userId;
        b.annotation.creationDate = b.creationDate; //parse selectedText JSON object

        if (b.annotation.selectedText) {
          b.annotation.selectedText = JSON.parse(b.annotation.selectedText);
        }
      }); // filter by topicValue

      if (topicValue.length > 0) {
        bmList = bmList.filter(b => {
          if (b.annotation.topicList) {
            let found = b.annotation.topicList.findIndex(t => t.value === topicValue);
            return found > -1;
          }

          return false;
        });
      } //sort bookmarks by numeric pid


      bmList.sort((a, b) => {
        return a.paraKey - b.paraKey;
      });
      resolve(bmList);
    }).catch(err => {
      reject(err);
    });
  });
}
/**
 * Get topic summaries for bookmarks by key (portion of paraKey) and topic name.
 *
 * @param {string} key - sourceId (2 chars) or more of paraKey
 * @param {string} topicValue - topic name (without spaces)
 * @param {string} userId - md5 hash of bookmark creators email address
 * @returns {array} - object of paraKey and summary text
 */

function getTopicSummaries(key, topicValue, userId) {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/querySummariesByTopic/${userId}/${key}/${topicValue}`).then(response => {
      let bmList = response.data.response;
      let summary = [];
      bmList.forEach(b => {
        let topic = b.annotation.topicList.find(t => t.value === topicValue);
        summary.push({
          paraKey: b.paraKey,
          pid: b.annotation.rangeStart,
          summary: topic.summary
        });
      }); //sort bookmarks by numeric pid

      summary.sort((a, b) => {
        return a.paraKey - b.paraKey;
      });
      resolve({
        topicTotal: response.data.topicTotal,
        summary: summary
      });
    }).catch(err => {
      reject(err);
    });
  });
}
/*
 * Called by topicmanager
 */

function updateAnnotation(bookmark) {
  let clone = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default()(bookmark);

  if (clone.annotation.selectedText) {
    if (typeof clone.annotation.selectedText !== "string") {
      //convert selectedText to JSON
      clone.annotation.selectedText = JSON.stringify(clone.annotation.selectedText);
    }
  }

  return postAnnotation(clone.userId, clone.paraKey, clone.creationDate, clone.annotation);
}
/*
 * Save annotation to DynamoDb
 */

function postAnnotation(userId, paraKey, creationDate, annotation) {
  if (typeof creationDate !== "string") {
    creationDate = creationDate.toString(10);
  }

  if (typeof paraKey !== "string") {
    paraKey = paraKey.toString(10);
  }

  let body = {
    userId: userId,
    paraKey: paraKey,
    creationDate: creationDate,
    annotation: annotation
  };
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/annotation`, body).then(response => {
      resolve(response.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}
/*
 * Get annotation from server, add userId and creationDate to the annotation,
 * parse stringified selectedText.
 *
 * Return annotation only.
 */

function getAnnotation(userId, paraKey, creationDate) {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/annotation/${userId}/${formatKey(paraKey)}/${creationDate}`).then(response => {
      console.log("getAnnotation: %o", response);
      let r = response.data.response; //annotation not found

      if (!r.userId) {
        resolve({});
        return;
      }

      r.annotation.userId = r.userId;
      r.annotation.creationDate = r.creationDate;

      if (r.annotation.selectedText) {
        r.annotation.selectedText = JSON.parse(r.annotation.selectedText);
      }

      resolve(r.annotation);
    }).catch(err => {
      reject(err);
    });
  });
}
/*
 * Delete annotation
 */

function deleteAnnotation(userId, paraKey, creationDate) {
  if (typeof creationDate !== "string") {
    creationDate.toString(10);
  }

  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/annotation/${userId}/${formatKey(paraKey)}/${creationDate}`).then(response => {
      resolve(response.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}

/***/ }),

/***/ "./src/js/modules/_ajax/share.js":
/*!***************************************!*\
  !*** ./src/js/modules/_ajax/share.js ***!
  \***************************************/
/*! exports provided: getMailList, putMailList, sendMail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMailList", function() { return getMailList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putMailList", function() { return putMailList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendMail", function() { return sendMail; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "./src/js/globals.js");


function getMailList(userId) {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/mailList/${userId}`).then(response => {
      resolve(response.data.mailList);
    }).catch(err => {
      reject(err);
    });
  });
}
function putMailList(userId, list) {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/mailList`, list).then(response => {
      resolve(response.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}
function sendMail(mailInfo) {
  console.log('mailInfo: %o', mailInfo);
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/share`, mailInfo).then(response => {
      if (response.status === 200) {
        resolve("success");
      } else {
        resolve(response.data.message);
      }
    }).catch(error => {
      reject(error);
    });
  });
}

/***/ }),

/***/ "./src/js/modules/_ajax/topics.js":
/*!****************************************!*\
  !*** ./src/js/modules/_ajax/topics.js ***!
  \****************************************/
/*! exports provided: getTopicList, putTopicList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTopicList", function() { return getTopicList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putTopicList", function() { return putTopicList; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "./src/js/globals.js");


/**
 * @param {string} userId - md5 hash of userId
 * @param {string} sourceId - two digit source identifier
 * @return {array} topics - topicList
 *
 */

function getTopicList(userId, sourceId) {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/topicList/${userId}/${sourceId}`).then(response => {
      let topics = response.data.topics;
      resolve(topics);
    }).catch(err => {
      reject(err);
    });
  });
}
/*
 * Save topicList to DynamoDb
 */

function putTopicList(userId, sourceId, topicList) {
  let body = {
    userId: userId,
    sourceId: sourceId,
    topicList: topicList
  };
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/topicList`, body).then(response => {
      resolve(response.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}

/***/ }),

/***/ "./src/js/modules/_bookmark/annotate.js":
/*!**********************************************!*\
  !*** ./src/js/modules/_bookmark/annotate.js ***!
  \**********************************************/
/*! exports provided: getLink, initialize, getUserInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLink", function() { return getLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserInput", function() { return getUserInput; });
/* harmony import */ var _bmnet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bmnet */ "./src/js/modules/_bookmark/bmnet.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bookmark */ "./src/js/modules/_bookmark/bookmark.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/range */ "./node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _navigator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navigator */ "./src/js/modules/_bookmark/navigator.js");
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clipboard */ "./src/js/modules/_bookmark/clipboard.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");








 //teaching specific constants, assigned at initialization

let teaching = {};

function getAnnotationForm() {
  let form = _language_lang__WEBPACK_IMPORTED_MODULE_7__["__lang"]`
    <form name="annotation" id="annotation-form" class="ui form">
      <input class="hidden-field" type="text" readonly="" name="status">
      <input class="hidden-field" type="text" readonly="" name="creationDate">
      <input class="hidden-field" type="text" name="aid" readonly>
      <input class="hidden-field" type="text" readonly="" name="rangeStart">
      <div class="fields">
        <div class="three wide field">
          <input id="rangeEnd" type="text" name="rangeEnd" maxlength="4" placeholder="${"label:end"}">
        </div>
        <div id="available-topics" class="twelve wide field"></div>
        </div>
      </div>
      <div class="field">
        <input type="text" name="Comment" placeholder="${"label:comment"}">
      </div>
      <div class="field">
        <input type="text" name="newTopics" placeholder="${"label:newtopic"}">
      </div>
      <div class="field">
        <textarea name="Note" placeholder="${"label:notes"}" rows="3"></textarea>
      </div>
      <div class="fields">
        <button class="annotation-submit ui green button" type="submit">${"action:submit"}</button>
        <button class="annotation-cancel ui red basic button">${"action:cancel"}</button>
        <button class="annotation-share ui green disabled basic button">${"action:share"}</button>
        <button class="annotation-note ui blue basic button">${"label:links"}</button>
        <div class="twelve wide field">
          <button class="annotation-delete ui red disabled right floated button">${"action:delete"}</button>
        </div>
      </div>
    </form>
    <div class="note-and-links hide">
      <table id="bookmark-link-table" class="ui selectable celled table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>${"label:linkref"}</th>
            <th>${"label:link"}</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="bookmark-link-list">
        </tbody>
      </table>
      <form name="linkForm" id="link-form" class="ui form">
        <div class="fields">
          <div class="ten wide field">
            <input required type="text" placeholder="${"label:linknote"}" name="reference">
          </div>
          <div class="five wide field">
            <input required type="text" placeholder="${"label:link"}" name="link">
          </div>
          <button title="add or update" data-index="-1" type="submit" class="green ui icon button">
            <i class="plus circle icon"></i>
          </button>
          <button title="clear fields" type="reset" class="yellow ui icon button">
            <i class="minus circle icon"></i>
          </button>
        </div>
      </form>
    </div>
  `;
  return form;
}

let linkArray = [];
function getLink(index) {
  return linkArray[index];
}

function populateTable(links) {
  return `
    ${links.map((item, index) => _language_lang__WEBPACK_IMPORTED_MODULE_7__["__lang"]`
      <tr data-index="${index}">
        <td title="${"action:delete"}" class="delete-link-item"><i class="red trash alternate icon"></i></td>
        <td title="${"action:edit"}" class="edit-link-item"><i class="yellow pencil alternate icon"></i></td>
        <td data-name="reference">${item.reference}</td>
        <td data-name="link">${formatLink(item.link)}</td>
        <td title="${"action:follow"}" class="follow-link-item"><i class="green share icon"></i></td>
      </tr>
    `).join("")}
  `;
}

function getIndex() {
  let value = $("#link-form [type='submit']").data("index");
  return parseInt(value, 10);
}

function setIndex(index) {
  $("#link-form [type='submit']").data("index", index);
}

function makeTableRow(item, index) {
  return _language_lang__WEBPACK_IMPORTED_MODULE_7__["__lang"]`
    <tr data-index="${index}">
      <td title="${"action:delete"}" class="delete-link-item"><i class="red trash alternate icon"></i></td>
      <td title="${"action:edit"}" class="edit-link-item"><i class="yellow pencil alternate icon"></i></td>
      <td data-name="reference">${item.reference}</td>
      <td data-name="link">${item.link}</td>
      <td title="${"action:follow"}" class="follow-link-item"><i class="green share icon"></i></td>
    </tr>
  `;
}

function validateLink(pid, link) {
  let rawLink;
  let pKey = teaching.keyInfo.genParagraphKey(pid);

  try {
    rawLink = JSON.parse(link);
  } catch (error) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m3"));
    return false;
  }

  if (!rawLink.aid || !rawLink.desc || !rawLink.key || !rawLink.userId) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m4"));
    return false;
  }

  if (rawLink.key === pKey) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m5"));
    return false;
  }

  return true;
}
/*
 * format link for display in annotation form
 */


function formatLink(link) {
  let raw = JSON.parse(link);
  let display = `${raw.desc.source}:${raw.desc.book}:${raw.desc.unit}`; //WOM has questions

  if (raw.desc.question) {
    display = `${display}:${raw.desc.question}:${raw.desc.pid}`;
  } else {
    display = `${display}:${raw.desc.pid}`;
  }

  return display;
}

function createLinkHandlers() {
  //add
  $(".transcript").on("submit", "#link-form", function (e) {
    e.preventDefault(); //get state; new or edit

    let index = getIndex();
    let state = index === -1 ? "new" : "edit"; //get link values from form

    let form = $("#link-form").form("get values"); //validate link

    let pid = $(".annotate-wrapper p.cmiTranPara").attr("id");

    if (!validateLink(pid, form.link)) {
      return;
    }

    let linkDisplay = formatLink(form.link);

    if (state === "new") {
      linkArray.push({
        reference: form.reference,
        link: form.link,
        deleted: false
      });
      let row = makeTableRow({
        reference: form.reference,
        link: linkDisplay
      }, linkArray.length - 1);
      $("#bookmark-link-list").append(row);
    } else {
      //update array
      linkArray[index] = {
        reference: form.reference,
        link: form.link,
        deleted: false
      }; //update table

      $(`tr[data-index="${index}"] > td[data-name="reference"]`).text(linkArray[index].reference);
      $(`tr[data-index="${index}"] > td[data-name="link"]`).text(linkDisplay);
      setIndex(-1);
    }

    $("#link-form").form("clear");
  }); //delete; link deleted from bookmark link array

  $(".transcript").on("click", "#bookmark-link-list td.delete-link-item", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let parent = $(this).parent();
    let index = parseInt(parent.attr("data-index"), 10); //mark deleted item from linkArray

    linkArray[index].deleted = true; //remove item from table

    parent.remove(); //console.log("after delete: link %o", linkArray);
  }); //edit

  $(".transcript").on("click", "#bookmark-link-list td.edit-link-item", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let index = parseInt($(this).parent().attr("data-index"), 10);
    $("#link-form").form("set values", linkArray[index]);
    setIndex(index);
  });
}

function noteToggle() {
  $(".transcript").on("click", "#annotation-form .annotation-note", function (e) {
    e.preventDefault();
    console.log("note button clicked");
    let nal = $(".note-and-links");

    if (nal.hasClass("hide")) {
      nal.removeClass("hide");
    } else {
      nal.addClass("hide");
    }
  });
}

const wrapper = `
  <div class="annotate-wrapper ui raised segment"></div>`;

function generateHorizontalList(listArray) {
  if (!listArray || listArray.length === 0) {
    return `
      <div class="item">
        <em>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m6")}</em>
      </div>
    `;
  }

  return `
    ${listArray.map(item => `
      <div class="item">
        <em>${item.topic}</em>
      </div>
    `).join("")}
  `;
}

function generateExtraList(annotation) {
  let extras = [];

  if (annotation.Note) {
    extras.push("N");
  }

  if (annotation.links) {
    extras.push(`L${annotation.links.length}`);
  }

  if (extras.length === 0) {
    return `
      <div class="item">
        <i class="bookmark outline icon"></i>
      </div>
    `;
  }

  return `
    ${extras.map(item => `
      <div class="item">
        ${genExtrasItem(item)}
      </div>
    `).join("")}
  `;
}

function genExtrasItem(item) {
  let icon;

  if (item === "N") {
    icon = "<i class='align justify icon'></i>";
  } else if (item.startsWith("L")) {
    let length = item.substr(1);
    icon = `<i class="linkify icon"></i>[${length}]`;
  }

  return `${icon}`;
}

function generateComment(comment) {
  if (!comment) {
    return Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m7");
  } else {
    return comment;
  }
}
/*
  Populate form fields
  args:
    pid: the paragraph id of the annotation
    aid: the id of associated highlighted text
    annotation: user data for existing annotations
  */


function initializeForm(pid, aid, annotation) {
  let form = $("#annotation-form");
  let linkform = $("#link-form"); //set link array to empty

  linkArray = []; //a new annotation

  if (!annotation) {
    form.form("set values", {
      status: "new",
      rangeStart: pid,
      rangeEnd: pid,
      aid: aid
    });
  } else {
    let topicSelect = [];

    if (annotation.topicList) {
      topicSelect = annotation.topicList.map(t => t.value);
    }

    if (annotation.links) {
      linkArray = annotation.links;
      let html = populateTable(linkArray);
      $("#bookmark-link-list").html(html);
    }

    form.form("set values", {
      status: "update",
      rangeStart: annotation.rangeStart,
      rangeEnd: annotation.rangeEnd,
      aid: annotation.aid,
      creationDate: annotation.creationDate,
      Comment: annotation.Comment,
      Note: annotation.Note,
      topicList: topicSelect
    });
  }

  document.getElementById("rangeEnd").focus();
}

function getFormData() {
  return $("#annotation-form").form("get values");
} //returns true if annotation form is open


function annotationFormOpen(currentPid) {
  let selector = $(".transcript .annotation-edit");

  if (selector.length > 0) {
    let pid = selector.first(1).attr("id"); //if currentPid === pid user clicked hidden link in editor, we just exit w/o notice

    if (currentPid !== pid) {
      toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(_language_lang__WEBPACK_IMPORTED_MODULE_7__["__lang"]`${"annotate:m8"} ${pid}. ${"annotate:m9"}`);
    }

    return true;
  }

  return false;
}

function bookmarkNavigatorActive() {
  if ($(".transcript").hasClass("bookmark-navigator-active")) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m10"));
    return true;
  }

  return false;
}

function editAnnotation(pid, aid, annotation) {
  let rangeStart = parseInt(annotation.rangeStart.substr(1), 10);
  let rangeEnd = parseInt(annotation.rangeEnd.substr(1), 10); //add class 'annotation-edit' to paragraphs so they can be wrapped

  if (rangeStart !== rangeEnd) {
    let annotationRange = lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(rangeStart, rangeEnd + 1);

    for (let i = 0; i < annotationRange.length; i++) {
      $(`#p${annotationRange[i]}`).addClass("annotation-edit");
    }
  } else {
    $(`#${pid}`).addClass("annotation-edit");
  } //.disable-selection will prevent text selection during annotation creation/edit


  addSelectionGuard();
  $(".annotation-edit").wrapAll(wrapper);
  $(".annotate-wrapper").prepend(getAnnotationForm());
  $(".annotation-delete.disabled").removeClass("disabled");
  $(".annotation-share.disabled").removeClass("disabled");
  getTopicList(pid, aid, annotation);
}
/*
  Support for creating annotations with no associated selected text
*/


function noteHandler() {
  $(".transcript").on("click", "p.cmiTranPara > span.pnum", function (e) {
    e.preventDefault();
    let pid = $(this).parent("p").attr("id"); //we're already editing this annotation

    if (annotationFormOpen() || bookmarkNavigatorActive()) {
      return;
    }

    let bkmrk = _bookmark__WEBPACK_IMPORTED_MODULE_2__["localStore"].getItem(pid); //we found a note - so edit it

    if (bkmrk) {
      editAnnotation(pid, undefined, bkmrk.annotation);
      return;
    } //disable text selection while annotation form is open


    addSelectionGuard(); //new note for paragraph

    $(`#${pid}`).addClass("annotation-edit annotation-note");
    $(".annotation-edit").wrapAll(wrapper);
    $(".annotate-wrapper").prepend(getAnnotationForm());
    getTopicList(pid);
  });
}

function hoverNoteHandler() {
  $(".transcript").on("mouseenter", ".has-annotation", function (e) {
    e.preventDefault(); //if bookmark highlights are hidden, return without showing popup

    if ($(".transcript").hasClass("hide-bookmark-highlights")) {
      $(this).popup("hide").popup("destroy");
      return;
    }

    let aid = $(this).data("aid");
    let pid = $(this).parent("p").attr("id"); //bookmark wont be found if it is still being created

    let bkmrk = _bookmark__WEBPACK_IMPORTED_MODULE_2__["localStore"].getItem(pid, aid);

    if (!bkmrk) {
      return;
    }

    let annotation = bkmrk.annotation;
    let topicList = generateHorizontalList(annotation.topicList);
    let comment = generateComment(annotation.Comment);
    let extraHtml = generateExtraList(annotation);
    $(".annotation-information .topic-list").html(topicList);
    $(".annotation-information .range").html(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("label:range")}: ${annotation.rangeStart}/${annotation.rangeEnd}`);
    $(".annotation-information .description").html(`${comment}`);
    $(".annotation-information .extra").html(extraHtml);
    $(this).popup({
      popup: ".annotation-information.popup",
      hoverable: true
    }).popup("show"); //create link

    let link = createBookmarkLink(pid, aid);
    $("#popup-button").attr("data-clipboard-text", link);
    _clipboard__WEBPACK_IMPORTED_MODULE_5__["default"].register("#popup-button"); //set focus on button so pressing Enter will click the button

    $("#popup-button").focus();
  });
}
/*
 * Show popup containing info about the bookmark when mouse hovers over
 * selectedText.
 */


function hoverHandler() {
  $(".transcript").on("mouseenter", "[data-annotation-id]", function (e) {
    e.preventDefault();
    let aid = $(this).attr("data-annotation-id");
    let pid = $(this).parent("p").attr("id");
    let realAid = $(this).data("aid"); //don't know why this happens

    if (!pid) {
      console.log("hoverHandler: pid not found");
      return;
    } //disable hover if highlights are hidden


    if ($(".transcript").hasClass("hide-bookmark-highlights")) {
      $(this).popup("hide").popup("destroy");
      return;
    } //disable hover if highlights are selectively hidden, filtered


    if ($(".transcript").hasClass("topic-filter-active")) {
      if (!$(this).hasClass("show")) {
        $(this).popup("hide").popup("destroy");
        return;
      }
    } //disable popup for paragraphs being edited


    if ($(`#${pid}`).hasClass("annotation-edit")) {
      $(`#${pid} [data-annotation-id]`).each(function () {
        $(this).popup("hide").popup("destroy");
      });
      return;
    } //disable popup for paragraphs wrapped in segment div


    if ($(`#${pid}`).hasClass("selected-annotation")) {
      $(`#${pid} [data-annotation-id]`).each(function () {
        $(this).popup("hide").popup("destroy");
      });
      return;
    } //disable popup for shared annotations


    if ($(this).hasClass("shared")) {
      $(this).popup("hide").popup("destroy");
      return;
    } //get bookmark from local store


    let bkmrk = _bookmark__WEBPACK_IMPORTED_MODULE_2__["localStore"].getItem(pid, aid); //sometimes the annotation won't be found because it is being created, so just return

    if (!bkmrk) {
      return;
    }

    let annotation = bkmrk.annotation;
    let topicList = generateHorizontalList(annotation.topicList);
    let comment = generateComment(annotation.Comment);
    let extraHtml = generateExtraList(annotation);
    $(".annotation-information .topic-list").html(topicList);
    $(".annotation-information .range").html(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("label:range")}: ${annotation.rangeStart}/${annotation.rangeEnd}`);
    $(".annotation-information .description").html(`${comment}`);
    $(".annotation-information .extra").html(extraHtml);
    $(this).popup({
      popup: ".annotation-information.popup",
      hoverable: true
    }).popup("show"); //create link

    let link = createBookmarkLink(pid, realAid);
    $("#popup-button").attr("data-clipboard-text", link);
    _clipboard__WEBPACK_IMPORTED_MODULE_5__["default"].register("#popup-button"); //set focus on button so pressing Enter will click the button

    $("#popup-button").focus();
  });
}
/*
 * Create a link reference to a CMI bookmark
 *
 * Format: pageKey.000:aid:uid
 */


function createBookmarkLink(pid, aid) {
  let pKey = teaching.keyInfo.genParagraphKey(pid);
  let keyInfo = teaching.keyInfo.describeKey(pKey);
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();
  let link = {
    userId: userInfo.userId,
    key: pKey,
    aid: aid,
    desc: keyInfo
  };
  return JSON.stringify(link);
}
/*
 * Click handler for the button press on annotation popups.
 */


function getReferenceHandler() {
  $("body").on("click", "#popup-button", function (e) {
    //for selected text bookmarks
    $("mark.visible").popup("hide"); //for note style bookmarks

    $(".pnum.has-annotation.visible").popup("hide");
  });
}

function editHandler() {
  $(".transcript").on("click", "[data-annotation-id]", function (e) {
    e.preventDefault();
    let aid = $(this).attr("data-annotation-id");
    let pid = $(this).parent("p").attr("id"); //pid can be undefined when selected content is emphasized <em>

    if (pid === undefined) {
      pid = $(this).parents("p").attr("id");
    } //we're already editing this annotation


    if (annotationFormOpen(pid) || bookmarkNavigatorActive()) {
      return;
    } //disable edit if highlights are hidden


    if ($(".transcript").hasClass("hide-bookmark-highlights")) {
      return;
    } //disable edit if highlights are selectively hidden, filtered


    if ($(".transcript").hasClass("topic-filter-active")) {
      if (!$(this).hasClass("show")) {
        return;
      }
    } //disable edit for shared annotations


    if ($(this).hasClass("shared")) {
      return;
    } //hide this popup


    $(this).popup("hide"); //show this highlight, all others are hidden

    $(this).addClass("show");
    let bkmrk = _bookmark__WEBPACK_IMPORTED_MODULE_2__["localStore"].getItem(pid, aid);
    editAnnotation(pid, aid, bkmrk.annotation);
  });
}
/*
 * Enable text selection by removing .disable-selection unless
 * .user is present. This means user has explicitly disabled
 * text selection.
 */


function removeSelectionGuard() {
  let guard = $("div.transcript.ui.disable-selection:not(.user)");

  if (guard.length > 0) {
    //console.log("removing selection guard");
    guard.removeClass("disable-selection");
  }
}
/*
 * Disable text selection when annotation form is open
 */


function addSelectionGuard() {
  let guard = $("div.transcript.ui");

  if (!guard.hasClass("disable-selection")) {
    //console.log("adding selection guard");
    guard.addClass("disable-selection");
  }
}

function submitHandler() {
  $(".transcript").on("submit", "#annotation-form", function (e) {
    e.preventDefault(); //enable text selection, disabled when annotation form open

    removeSelectionGuard(); //1. Create new topic begins here

    let formData = getFormData(); //topicList contains topic strings but we want the topic object
    //get it from the select option tag

    if (formData.topicList.length > 0) {
      let topicObjectArray = formData.topicList.map(tv => {
        let topic = $(`#annotation-topic-list > [value='${tv}']`).text();
        return {
          value: tv,
          topic: topic
        };
      });
      formData.topicList = topicObjectArray;
    }

    unwrap(); //remove class "show" added when form was displayed

    $(`[data-annotation-id="${formData.aid}"]`).removeClass("show"); //this is a note annotation, no selected text, add page title to formData
    //if ($(".transcript .annotation-edit").hasClass("annotation-note")) {

    if ($(".transcript .annotation-edit").hasClass("note-style-bookmark")) {
      formData.bookTitle = $("#book-title").text();
    } //get links from annotation


    let links = linkArray.filter(l => l.deleted === false);

    if (links.length > 0) {
      formData.links = links;
    } else {
      //check for deleted links
      let deleted = linkArray.filter(l => l.deleted === true); //links were deleted so remove linkify icon from page if this is not a new annotation

      if (deleted.length > 0 && formData.creationDate.length > 0) {
        $(`i[data-link-aid="${formData.creationDate}"]`).remove();
      }
    }

    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].submit(formData);
    $(".transcript .annotation-edit").removeClass("annotation-edit annotation-note");
  });
}
/*
  Handle cancel button pressed on annotation form
*/


function cancelHandler() {
  $(".transcript").on("click", "#annotation-form .annotation-cancel", function (e) {
    e.preventDefault(); //enable text selection, disabled when annotation form open

    removeSelectionGuard();
    let formData = getFormData();
    unwrap(); //remove class "show" added when form was displayed

    $(`[data-annotation-id="${formData.aid}"]`).removeClass("show");
    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].cancel(formData);
    $(".transcript .annotation-edit").removeClass("annotation-edit");
  });
}
/*
  Handle share button pressed on annotation form
*/


function shareHandler() {
  $(".transcript").on("click", "#annotation-form .annotation-share", function (e) {
    e.preventDefault();
    let formData = getFormData();
    unwrap(); //remove class "show" added when form was displayed

    $(`[data-annotation-id="${formData.aid}"]`).removeClass("show"); //annotation.cancel(formData);

    $(".transcript .annotation-edit").removeClass("annotation-edit");
    let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();

    if (!userInfo) {
      userInfo = {
        userId: "xxx"
      };
    } //this is really the annotation-id not the aid


    let annotation_id = formData.aid;
    let aid;
    let rangeArray = [formData.rangeStart, formData.rangeEnd];
    let numericRange = rangeArray.map(r => parseInt(r.substr(1), 10));
    let pid = rangeArray[0]; //get the real aid

    if (annotation_id.length > 0) {
      aid = $(`[data-annotation-id="${annotation_id}"]`).attr("data-aid");
      $(`[data-annotation-id="${annotation_id}"]`).addClass("show"); //aid is undefined when new annotations are shared, the real aid is the annotation
      //creationDate. If aid is undefined try to get the creationDate from local store

      if (!aid) {
        aid = _bookmark__WEBPACK_IMPORTED_MODULE_2__["localStore"].getCreationDate(annotation_id);
        $(`[data-annotation-id="${annotation_id}"]`).attr("data-aid", aid);
      }
    } else {
      aid = $(`#${pid} > span.pnum`).attr("data-aid");
    }

    let url = `${location.origin}${location.pathname}?as=${pid}:${aid}:${userInfo.userId}`;
    let annotationRange = lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(numericRange[0], numericRange[1] + 1);
    let header2;

    if (userInfo.userId === "xxx") {
      header2 = `
        <h4 class="ui left floated header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m11")}" class="red window close outline icon"></i>
          <div class="content">
            ${formData.Comment}
          </div>
        </h4>
        <h4 class="ui right floated header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:closewin")}" class="share-annotation window close icon"></i>
        </h4>
      `;
    } else {
      header2 = `
        <h4 class="ui left floated header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:fbshare")}" class="share-annotation facebook icon"></i>
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:emailshare")}" class="share-annotation envelope outline icon"></i>
          <i data-clipboard-text="${url}" title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:cp2clip")}" class="share-annotation linkify icon"></i>
          <div class="content">
            ${formData.Comment}
          </div>
        </h4>
        <h4 class="ui right floated header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:closewin")}" class="share-annotation window close icon"></i>
        </h4>
      `;
    }

    for (let i = 0; i < annotationRange.length; i++) {
      if (i === 0) {
        $(`#p${annotationRange[i]}`).addClass("selected-annotation clearBoth");
      } else {
        $(`#p${annotationRange[i]}`).addClass("selected-annotation");
      }
    }

    $(".selected-annotation").wrapAll("<div class='selected-annotation-wrapper ui clearing raised segment'></div>");
    $(".selected-annotation-wrapper").prepend(header2);

    if (userInfo.userId !== "xxx") {
      _clipboard__WEBPACK_IMPORTED_MODULE_5__["default"].register(".share-annotation.linkify");
    }
  }); //init click handler for FB and email share dialog

  Object(_navigator__WEBPACK_IMPORTED_MODULE_4__["initShareDialog"])("annotate.js");
}
/*
  bookmark deleted
*/


function deleteHandler() {
  $(".transcript").on("click", "#annotation-form .annotation-delete", function (e) {
    e.preventDefault(); //enable text selection, disabled when annotation form open

    removeSelectionGuard();
    let formData = getFormData();
    unwrap(); //add links to formData so the linkify icon can be removed

    let links = linkArray;

    if (links.length > 0) {
      formData.links = links;
    }

    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].delete(formData);
    $(".transcript .annotation-edit").removeClass("annotation-edit");
  });
}
/*
  initialize annotation event handlers
*/


function initialize(constants) {
  if (constants) {
    teaching = constants;
  } else {
    teaching = Object(_bookmark__WEBPACK_IMPORTED_MODULE_2__["getTeachingInfo"])();
  }

  submitHandler();
  cancelHandler();
  shareHandler();
  deleteHandler();
  editHandler();
  noteHandler();
  hoverHandler();
  noteToggle();
  createLinkHandlers();
  getReferenceHandler();
  hoverNoteHandler();
}
/*
  Display annotation form
  args:
    highlight - highlighted text object
  */

function getUserInput(highlight) {
  //don't allow multiple annotation forms to be open at the same time
  // - if open cancel the highlight
  if (annotationFormOpen(highlight.pid) || bookmarkNavigatorActive()) {
    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].cancel({
      aid: highlight.id
    });
    return;
  } //.disable-selection will prevent text selection during annotation creation/edit


  addSelectionGuard();
  $(`#${highlight.pid}`).addClass("annotation-edit");
  $(".annotation-edit").wrapAll(wrapper); //$(".annotate-wrapper").prepend(form);

  $(".annotate-wrapper").prepend(getAnnotationForm());
  getTopicList(highlight.pid, highlight.id); //show this highlight, all others are hidden

  $(`[data-annotation-id="${highlight.id}"]`).addClass("show");
}
/*
  remove annotation form
*/

function unwrap() {
  $(".annotate-wrapper > form").remove();
  $(".annotate-wrapper > .note-and-links").remove();
  $(".annotation-edit").unwrap();
} //generate the option element of a select statement


function generateOption(topic) {
  if (typeof topic === "object") {
    return `<option value="${topic.value}">${topic.topic}</option>`;
  } else {
    return `<option value="${topic}">${topic}</option>`;
  }
}

function makeTopicSelect(topics) {
  return `
    <select name="topicList" id="annotation-topic-list" multiple="" class="search ui dropdown">
      <option value="">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("label:selecttopic")}</option>
      ${topics.map(topic => `${generateOption(topic)}`).join("")}
    </select>
  `;
}

function getTopicList(pid, aid, data) {
  //get topics from server or local storage
  _bmnet__WEBPACK_IMPORTED_MODULE_0__["default"].fetchTopics().then(response => {
    let selectHtml = makeTopicSelect(response.topics);
    $("#available-topics").html(selectHtml); //init annotation form components

    $("select.dropdown").dropdown(); //init form

    initializeForm(pid, aid, data);
  }).catch(error => {
    console.error("topic fetch error: ", error);
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m12")}: ${error}`);
  });
}

/***/ }),

/***/ "./src/js/modules/_bookmark/bmnet.js":
/*!*******************************************!*\
  !*** ./src/js/modules/_bookmark/bmnet.js ***!
  \*******************************************/
/*! exports provided: netInit, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "netInit", function() { return netInit; });
/* harmony import */ var _ajax_annotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_ajax/annotation */ "./src/js/modules/_ajax/annotation.js");
/* harmony import */ var _ajax_topics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_ajax/topics */ "./src/js/modules/_ajax/topics.js");
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bookmark */ "./src/js/modules/_bookmark/bookmark.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/*
  Bookmark data implementation

  Bookmarks for signed in users are queried from and stored to the server. See the
  cmi-api/bookmark repository for API.

  For signed in users, when a transcript page is loaded bookmarks are queried from the server
  and stored locally. Bookmarks for users not signed in are stored only to local storage.

  Operations for create, modify, and delete are performed locally and sent to the server
  for signed in users.
*/








var teaching = {};
function netInit(constants) {
  teaching = constants;
}
/*
 * Persist annotation to DynamoDb
 *
 * Args:
 *  annotation: required
 *  pageKey: passed by topicmanager.js only
 *  addToLocalStorage: passed as false by topicmanager
 *
 * LocalStorage is updated when addToLocalStorage = true, otherwise
 * not. It's not needed when called by topicmanager.
 *
 * New annotations are recognized when annotation.creationDdate is null
 */

function postAnnotation(annotation, pageKey, addToLocalStorage = true) {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();
  let calledByTopicMgr = true; //the annotation creation data; aka creationDate, annotationId, aid

  let now = Date.now(); //this is critical, things get messed up if we don't do this

  let serverAnnotation = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default()(annotation); //modified is added by topicmgr.js

  if (serverAnnotation.modified) {
    delete serverAnnotation.modified;
  }

  let wrapFunction;

  if (serverAnnotation.selectedText) {
    //don't save wrap() to db but we do need it so save it and put
    //it back before we save it to local store
    wrapFunction = serverAnnotation.selectedText.wrap;
    delete serverAnnotation.selectedText.wrap; //selectedText is already stringified when called by topicmgr.js

    if (typeof serverAnnotation.selectedText !== "string") {
      if (!serverAnnotation.selectedText.aid) {
        serverAnnotation.selectedText.aid = now.toString(10);
      } //convert selectedText to JSON


      serverAnnotation.selectedText = JSON.stringify(serverAnnotation.selectedText);
    }
  }

  let creationDate = serverAnnotation.creationDate ? serverAnnotation.creationDate : now;

  if (!pageKey) {
    pageKey = teaching.keyInfo.genParagraphKey(serverAnnotation.rangeStart);
  }

  Object(_ajax_annotation__WEBPACK_IMPORTED_MODULE_0__["postAnnotation"])(userInfo.userId, pageKey, creationDate, serverAnnotation).then(resp => {
    if (addToLocalStorage) {
      if (serverAnnotation.selectedText) {
        serverAnnotation.selectedText = JSON.parse(serverAnnotation.selectedText);

        if (wrapFunction) {
          serverAnnotation.selectedText.wrap = wrapFunction;
        }
      }

      try {
        _bookmark__WEBPACK_IMPORTED_MODULE_3__["localStore"].addItem(userInfo.userId, pageKey, creationDate, serverAnnotation);
      } catch (err) {
        console.error(`Error saving annotation to localStore: ${err}`);
      }
    }
  }).catch(err => {
    console.error(`Error saving annotation: ${err}`);
    toastr__WEBPACK_IMPORTED_MODULE_4___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("error:e1"));
  });
  return creationDate;
}
/*
  Delete the annotation 'creationDate' for bookmark 'pid'
*/


function deleteAnnotation(pid, creationDate) {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();
  return new Promise(async (resolve, reject) => {
    const paraKey = teaching.keyInfo.genParagraphKey(pid);

    try {
      let response = await Object(_ajax_annotation__WEBPACK_IMPORTED_MODULE_0__["deleteAnnotation"])(userInfo.userId, paraKey, creationDate);
      let result = _bookmark__WEBPACK_IMPORTED_MODULE_3__["localStore"].deleteItem(userInfo.userId, paraKey, creationDate);
      resolve(result.remaining);
    } catch (err) {
      reject(err);
    }
  });
}
/*
  Fetch Indexing topics
  args: force=true, get topics from server even when we have them cached

  topics are cached for 2 hours (1000 * 60sec * 60min * 2) before being requested
  from server
*/


function fetchTopics() {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();
  let topics = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("bmTopics"); //keep topics in cache for 2 hours

  const retentionTime = 60 * 1000 * 60 * 2;
  return new Promise((resolve, reject) => {
    if (topics && topics.lastFetchDate + retentionTime > Date.now()) {
      resolve(topics);
      return;
    }

    let sourceId = teaching.sourceId.toString(10); //user signed in, we need to get topics from server

    Object(_ajax_topics__WEBPACK_IMPORTED_MODULE_1__["getTopicList"])(userInfo.userId, sourceId).then(topicList => {
      let topicInfo = {
        lastFetchDate: Date.now(),
        topics: topicList
      };
      Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeSet"])("bmTopics", topicInfo);
      resolve(topicInfo);
    }).catch(error => {
      console.error("Error fetching topicList: ", error);
      reject(error);
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  fetchTopics: fetchTopics,
  deleteAnnotation: deleteAnnotation,
  postAnnotation: postAnnotation
});

/***/ }),

/***/ "./src/js/modules/_bookmark/bookmark.js":
/*!**********************************************!*\
  !*** ./src/js/modules/_bookmark/bookmark.js ***!
  \**********************************************/
/*! exports provided: localStore, getTeachingInfo, processBookmark, setQuickLinks, initBookmarkFeature, annotation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "localStore", function() { return localStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeachingInfo", function() { return getTeachingInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processBookmark", function() { return processBookmark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setQuickLinks", function() { return setQuickLinks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBookmarkFeature", function() { return initBookmarkFeature; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "annotation", function() { return annotation; });
/* harmony import */ var _ajax_annotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_ajax/annotation */ "./src/js/modules/_ajax/annotation.js");
/* harmony import */ var _ajax_topics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_ajax/topics */ "./src/js/modules/_ajax/topics.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var _localStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./localStore */ "./src/js/modules/_bookmark/localStore.js");
/* harmony import */ var _util_sanitize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_util/sanitize */ "./src/js/modules/_util/sanitize.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _bmnet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bmnet */ "./src/js/modules/_bookmark/bmnet.js");
/* harmony import */ var lodash_differenceWith__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash/differenceWith */ "./node_modules/lodash/differenceWith.js");
/* harmony import */ var lodash_differenceWith__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_differenceWith__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lodash_startCase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash/startCase */ "./node_modules/lodash/startCase.js");
/* harmony import */ var lodash_startCase__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash_startCase__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _util_url__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../_util/url */ "./src/js/modules/_util/url.js");
/* harmony import */ var _navigator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./navigator */ "./src/js/modules/_bookmark/navigator.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./list */ "./src/js/modules/_bookmark/list.js");
/* harmony import */ var _topics__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./topics */ "./src/js/modules/_bookmark/topics.js");
/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./selection */ "./src/js/modules/_bookmark/selection.js");
/* harmony import */ var _annotate__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./annotate */ "./src/js/modules/_bookmark/annotate.js");
/* harmony import */ var _util_cmi__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../_util/cmi */ "./src/js/modules/_util/cmi.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");


















 //teaching specific constants, assigned at initialization

let teaching = {}; //manages bookmark store for bookmarks on page

let localStore;
function getTeachingInfo() {
  return teaching;
}
let counter = new Map();

function getCount(pid) {
  let count = counter.get(pid);

  if (typeof count === "undefined") {
    counter.set(pid, 0);
    return 0;
  } else {
    count += 1;
    counter.set(pid, count);
    return count;
  }
}

function loadSelectedTextBookmark(bm, sharePid) {
  $(`#p${bm.pid} > span.pnum`).addClass("has-bookmark");
  Object(_selection__WEBPACK_IMPORTED_MODULE_15__["markSelection"])(bm.annotation.selectedText, getCount(bm.pid), sharePid);
  addTopicsAsClasses(bm.annotation);
  setQuickLinks(bm.annotation, "highlight");
}

function loadNoteStyleBookmark(bm) {
  addNoteHighlight(bm.pid, bm.annotation);
  setQuickLinks(bm.annotation, "note");
}

function loadBookmark(bm, sharePid) {
  let type = bm.annotation.selectedText ? "selectedText" : "note";
  type === "selectedText" ? loadSelectedTextBookmark(bm) : loadNoteStyleBookmark(bm);
}

function createSelectedTextBookmark(bm, count) {
  $(`#p${bm.pid} > span.pnum`).addClass("has-bookmark");
  Object(_selection__WEBPACK_IMPORTED_MODULE_15__["markSelection"])(bm.annotation.selectedText, count);
  addTopicsAsClasses(bm.annotation);
  setQuickLinks(bm.annotation, "highlight"); //add creationDate

  $(`[data-annotation-id="${bm.annotation.aid}"]`).attr("data-aid", bm.creationDate);
}

function createNoteStyleBookmark(bm) {
  addNoteHighlight(bm.pid, bm.annotation);
  setQuickLinks(bm.annotation, "note"); //add creationDate

  $(`#${bm.annotation.rangeStart} > span.pnum`).attr("data-aid", bm.creationDate);
}

function deleteSelectedTextBookmark(bm) {
  Object(_selection__WEBPACK_IMPORTED_MODULE_15__["deleteSelection"])(bm.annotation.aid);
}

function deleteNoteStyleBookmark(bm) {
  removeNoteHighlight(bm);
}

function createBookmark(bm, count) {
  let type = bm.annotation.selectedText ? "selectedText" : "note";
  type === "selectedText" ? createSelectedTextBookmark(bm, count) : createNoteStyleBookmark(bm);
}

function deleteBookmark(bm, remainingCount) {
  let type = bm.annotation.selectedText ? "selectedText" : "note";
  type === "selectedText" ? deleteSelectedTextBookmark(bm) : deleteNoteStyleBookmark(bm);

  if (bm.annotation.links) {
    $(`i[data-link-aid="${bm.creationDate}"]`).remove();
  }

  if (remainingCount === 0) {
    $(`#${bm.annotation.rangeStart} > span.pnum`).removeClass("has-bookmark");
  }
}
/**
 * Process each bookmark loaded, created, updated, or deleted
 * - process includes highlighting selected text and note paragraphs,
 *   setting quick links and filtering by topic
 */


function processBookmark(status, bm, arg) {
  switch (status) {
    case "loaded":
      loadBookmark(bm, arg);
      break;

    case "created":
      createBookmark(bm, arg);
      break;

    case "updated":
      Object(_selection__WEBPACK_IMPORTED_MODULE_15__["updateSelectionTopicList"])(bm.annotation);
      updateNoteHighlight(bm);
      break;

    case "deleted":
      deleteBookmark(bm, arg);
      break;
  }
}

function formatLink(link) {
  let raw = JSON.parse(link.link);
  let href = getLinkHref(raw);
  let display = `${raw.desc.source}:${raw.desc.book}:${raw.desc.unit}`; //WOM has questions

  if (raw.desc.question) {
    display = `${display}:${raw.desc.question}:${raw.desc.pid}`;
  } else {
    display = `${display}:${raw.desc.pid}`;
  }

  return `<a class="item" href="${href}">${link.reference}[${display}]</a>`;
} //generate html for bookmark links


function generateLinkList(links) {
  return `
    ${links.map(item => `
      ${formatLink(item)}
    `).join("")}
  `;
} // --------------- begin Bookmark DOM -------------------------

/**
 * Add classes to selectedText bookmarks for each topic
 *
 * @param <object> - the annotation
 */


function addTopicsAsClasses(bookmark) {
  if (bookmark.topicList && bookmark.topicList.length > 0) {
    let topicList = bookmark.topicList.reduce((result, topic) => {
      return `${result} ${topic.value}`;
    }, "");
    $(`[data-annotation-id="${bookmark.aid}"]`).addClass(topicList);
  }
}
/*
 * Remove note highlight and add it back in case the range
 * has changed in the updated bookmark
 */


function updateNoteHighlight(bm) {
  //return in not a note style bookmark
  if (bm.annotation.selectedText) {
    return;
  }

  let start = parseInt(bm.annotation.rangeStart.substr(1), 10);
  let end = parseInt(bm.annotation.rangeEnd.substr(1), 10);
  let pid = start;
  let done = false; //remove current highlight

  do {
    $(`#p${start}`).removeClass("note-style-bookmark");
    $(`#p${start}`).removeClass("note-style-bookmark-start");

    if ($(`#p${start}`).hasClass("note-style-bookmark-end")) {
      $(`#p${start}`).removeClass("note-style-bookmark-end");
      done = true;
    }

    start++;
  } while (!done); //add new highlight


  start = pid;

  do {
    $(`#p${start}`).addClass("note-style-bookmark");

    if (start === pid) {
      $(`#p${start}`).addClass("note-style-bookmark-start");
    }

    if (start === end) {
      $(`#p${start}`).addClass("note-style-bookmark-end");
    }

    start++;
  } while (start <= end);
}

function addNoteHighlight(pid, bm) {
  $(`#p${pid} > span.pnum`).addClass("has-annotation").attr("data-aid", bm.creationDate); //mark all paragraphs in bookmark with class .note-style-bookmark

  let end = parseInt(bm.rangeEnd.substr(1), 10);
  let start = pid;

  do {
    $(`#p${start}`).addClass("note-style-bookmark");

    if (start === pid) {
      $(`#p${start}`).addClass("note-style-bookmark-start");
    }

    if (start === end) {
      $(`#p${start}`).addClass("note-style-bookmark-end");
    }

    start++;
  } while (start <= end);
}

function removeNoteHighlight(bm) {
  //remove mark from paragraph
  $(`#${bm.annotation.rangeStart} > span.pnum`).removeClass("has-annotation"); //remove all paragraphs in bookmark with class .note-style-bookmark

  let end = parseInt(bm.annotation.rangeEnd.substr(1), 10);
  let start = parseInt(bm.annotation.rangeStart.substr(1), 10);
  let pid = start;

  do {
    $(`#p${start}`).removeClass("note-style-bookmark");

    if (start === pid) {
      $(`#p${start}`).removeClass("note-style-bookmark-start");
    }

    if (start === end) {
      $(`#p${start}`).removeClass("note-style-bookmark-end");
    }

    start++;
  } while (start <= end);
}
/*
  Add linkify icon after bookmark so user can click to view links
*/


function setQuickLinks(bm, type) {
  if (bm.links) {
    $(`[data-aid="${bm.creationDate}"]`).eq(-1).after(`<i data-link-aid="${bm.creationDate}" data-type="${type}" class="small bm-link-list linkify icon"></i>`);
  }
} // --------------- end Bookmark DOM -------------------------

/*
  Bookmark link click handler. Links are placed on both note and selected text
  bookmarks. When clicked, get the bookmark and display a list of links defined
  in the bookmark. User can optionally click a  link.
*/

function initBmLinkHandler() {
  $(".transcript").on("click", ".bm-link-list.linkify", function (e) {
    e.preventDefault();
    let type = $(this).attr("data-type");
    let pid = $(this).parent("p").attr("id");
    let aid;

    if (type === "note") {
      //aid = parseInt($(this).prev("span").attr("data-aid"), 10);
      aid = $(this).prev("span").attr("data-aid");
    } else if (type === "highlight") {
      //aid = parseInt($(this).prev("mark").attr("data-annotation-id"), 10);
      aid = $(this).prev("mark").attr("data-annotation-id");
    } //bookmark wont be found if it is still being created


    let bkmrk = localStore.getItem(pid, aid); //sometimes the annotation won't be found because it is being created, so just return

    if (!bkmrk) {
      return;
    }

    let linkList = generateLinkList(bkmrk.annotation.links);
    $(".bm-link-list-popup").html(linkList);
    $(this).popup({
      popup: ".bm-link-info.popup",
      hoverable: true,
      on: "click"
    }).popup("show");
  });
}
/*
  Clean up form values and prepare to send to API
*/


function createAnnotation(formValues) {
  let annotation = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_9___default()(formValues);
  annotation.rangeStart = annotation.rangeStart.trim();
  annotation.rangeEnd = annotation.rangeEnd.trim();

  if (!annotation.rangeEnd.startsWith("p")) {
    annotation.rangeEnd = `p${annotation.rangeEnd}`;
  } //delete empty fields


  if (annotation.Comment === "") {
    delete annotation.Comment;
  } else {
    annotation.Comment = Object(_util_sanitize__WEBPACK_IMPORTED_MODULE_5__["purify"])(annotation.Comment);
  }

  if (annotation.Note === "") {
    delete annotation.Note;
  } else {
    annotation.Note = Object(_util_sanitize__WEBPACK_IMPORTED_MODULE_5__["purify"])(annotation.Note);
  }

  if (annotation.creationDate === "") {
    delete annotation.creationDate;
  }

  if (annotation.aid === "") {
    delete annotation.aid;
  } else {
    annotation.selectedText = Object(_selection__WEBPACK_IMPORTED_MODULE_15__["getSelection"])(annotation.aid); //make sure rangeEnd === rangeStart for selected text bookmarks

    annotation.rangeEnd = annotation.rangeStart;

    if (annotation.creationDate) {
      annotation.selectedText.aid = annotation.creationDate.toString(10);
    }

    delete annotation.textId;
  }

  if (annotation.topicList.length === 0) {
    delete annotation.topicList;
  }

  delete annotation.newTopics;
  delete annotation.hasAnnotation; // add summary from any topic into the annotation

  if (annotation.status === "update") {
    let bkmrk = localStore.getItem(annotation.rangeStart, annotation.aid);
    bkmrk.annotation.topicList.forEach(i => {
      if (i.summary) {
        let topic = annotation.topicList.find(t => t.value === i.value);

        if (topic) {
          topic.summary = i.summary;
        }
      }
    }); // console.log("annotation: %o", annotation);
    // console.log("bookmark: %o", bkmrk);
  } //persist the bookmark


  _bmnet__WEBPACK_IMPORTED_MODULE_7__["default"].postAnnotation(annotation);
}
/*
  new topics entered on the annotation form are formatted
  to keep only alpha chars and comma. Commas are used to delimit
  topics.

  Topics are converted from string to array and first character is
  uppercased.

  Multi word topics are supported. Each word is capitalized and the topic
  is formatted as an object like so:

    {value: "HolySpirit", topic: "Holy Spirit"}
*/


function formatNewTopics({
  newTopics
}) {
  //only allow digits, alpha chars (including Polish chars) and comma's and spaces
  let topics = newTopics.replace(/[^a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ, ]/g, "");

  if (!topics || topics === "") {
    return [];
  } //remove leading and trailing comma's


  topics = topics.replace(/^,*/, "");
  topics = topics.replace(/,*$/, "");
  let newTopicArray = topics.split(",");
  newTopicArray = newTopicArray.map(t => t.trim());
  newTopicArray = newTopicArray.map(t => lodash_startCase__WEBPACK_IMPORTED_MODULE_10___default()(t));
  newTopicArray = newTopicArray.map(t => {
    if (/ /.test(t)) {
      return {
        value: t.replace(/ /g, ""),
        topic: t
      };
    } else {
      return {
        value: t,
        topic: t
      };
    }
  });
  return newTopicArray;
}
/*
  Add new topics entered by user on annotation form to topic list
  and store locally and on the server
  - then create and submit new annotation
*/


function addToTopicList(newTopics, formValues) {
  //Check for new topics already in topic list
  _bmnet__WEBPACK_IMPORTED_MODULE_7__["default"].fetchTopics().then(topicList => {
    //remove duplicate topics from and return the rest in difference[]
    let newUniqueTopics = lodash_differenceWith__WEBPACK_IMPORTED_MODULE_8___default()(newTopics, topicList.topics, (n, t) => {
      return t.value === n.value;
    }); //these are the new topics

    if (newUniqueTopics.length > 0) {
      //add new topics to topic list
      let newTopicList = topicList.topics.concat(newUniqueTopics); //sort topic list

      newTopicList.sort((a, b) => {
        let aValue, bValue; //objects have value and topic keys, sort them by topic

        aValue = a.topic.toLowerCase();
        bValue = b.topic.toLowerCase();

        if (aValue < bValue) {
          return -1;
        }

        if (aValue > bValue) {
          return 1;
        }

        return 0;
      }); //update local storage

      topicList.topics = newTopicList;
      Object(_util_store__WEBPACK_IMPORTED_MODULE_3__["storeSet"])("bmTopics", topicList);
      let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])();
      let sourceId = `${teaching.sourceId}`; //write the new list to the db

      Object(_ajax_topics__WEBPACK_IMPORTED_MODULE_1__["putTopicList"])(userInfo.userId, sourceId, newTopicList); //add new topics to this annotations topicList

      formValues.topicList = formValues.topicList.concat(newUniqueTopics); //add newTopics to formValues for posting to server

      formValues.newTopics = newUniqueTopics; //post the bookmark

      createAnnotation(formValues);
    }
  }).catch(err => {
    throw new Error(`bookmark.js:addToTopicList() error: ${err}`);
  });
} //toggle selected text highlights


function highlightHandler() {
  $(".toggle-bookmark-highlight").on("click", function (e) {
    e.preventDefault();
    let el = $(".transcript");

    if (el.hasClass("hide-bookmark-highlights")) {
      el.removeClass("hide-bookmark-highlights");
      $(".toggle-bookmark-highlight").text("Hide Highlighted Text");
    } else {
      el.addClass("hide-bookmark-highlights");
      $(".toggle-bookmark-highlight").text("Show Highlighted Text");
    }
  });
}
/*
 * Turn off/on bookmark creation feature. When feature is enabled users cannot select
 * and copy text from transcript
 */


function bookmarkFeatureHandler() {
  $("#bookmark-toggle-disable-selection").on("click", function (e, show) {
    e.preventDefault();
    let showMessage = true;

    if (show !== "undefined") {
      showMessage = show === "false" ? false : true;
    }

    let el = $(".transcript");

    if (el.hasClass("disable-selection") && el.hasClass("user")) {
      Object(_language_lang__WEBPACK_IMPORTED_MODULE_18__["getString"])("menu:m1", true, "Disable Bookmark Creation").then(value => {
        el.removeClass("disable-selection user");
        $(".toggle-bookmark-selection").text(value);
        $("#bookmark-dropdown-menu > span  i.bookmark-corner-icon").addClass("hide");

        if (showMessage) {
          toastr__WEBPACK_IMPORTED_MODULE_6___default.a.success("Bookmark Creation Enabled");
        }

        Object(_util_store__WEBPACK_IMPORTED_MODULE_3__["storeSet"])("bmCreation", "enabled");
      });
    } else {
      Object(_language_lang__WEBPACK_IMPORTED_MODULE_18__["getString"])("menu:m2", true, "Enable Bookmark Creation").then(value => {
        el.addClass("disable-selection user");
        $(".toggle-bookmark-selection").text(value);
        $("#bookmark-dropdown-menu > span  i.bookmark-corner-icon").removeClass("hide");

        if (showMessage) {
          toastr__WEBPACK_IMPORTED_MODULE_6___default.a.success("Bookmark Creation Disabled");
        }

        Object(_util_store__WEBPACK_IMPORTED_MODULE_3__["storeSet"])("bmCreation", "disabled");
      });
    }
  });
}
/*
 * The bookmark feature is initially enabled. Check local storage to see if
 * it has been disabled by the user. If so, disable it on page load.
 *
 * If the user has not set bookmark creation default it to disabled. I think
 * many users may want to copy text but can't because the bookmark dialog displays
 * on text selection. They don't try to figure out why and stop using the site.
 */


function initializeBookmarkFeatureState() {
  let state = Object(_util_store__WEBPACK_IMPORTED_MODULE_3__["storeGet"])("bmCreation");

  if (state && state === "enabled") {
    return;
  } //set to disabled


  $("#bookmark-toggle-disable-selection").trigger("click", "false");
}
/**
 * Get and activate annotations for the current page.
 *
 * @params {string} sharePid - is not null when bookmark is shared on page.
 */


async function getPageBookmarks(sharePid) {
  let pageKey = teaching.keyInfo.genPageKey();
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])();

  if (!userInfo) {
    return;
  }

  try {
    //query annotations from database
    let bmList = await Object(_ajax_annotation__WEBPACK_IMPORTED_MODULE_0__["getAnnotations"])(userInfo.userId, pageKey); //store annotations locally

    localStore = new _localStore__WEBPACK_IMPORTED_MODULE_4__["BookmarkLocalStore"](bmList, sharePid);

    if (bmList.length > 0) {
      Object(_topics__WEBPACK_IMPORTED_MODULE_14__["bookmarksLoaded"])();
    }
  } catch (err) {
    console.error(err); //Notify error 
  }
}
/*
  initialize transcript page
*/


function initTranscriptPage(sharePid, constants) {
  //bookmarks are supported only for signed in users
  // this should work for users not signed in
  let topicInfo = Object(_util_url__WEBPACK_IMPORTED_MODULE_11__["showTopicBookmark"])();

  if (topicInfo) {
    Object(_navigator__WEBPACK_IMPORTED_MODULE_12__["initTopicNavigator"])(topicInfo, constants);
  }

  if (!Object(_user_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])()) return; // disable bookmarks when topic navigator is active
  // - bookmarks are enabled when the navigator is closed

  if (!topicInfo) {
    initBookmarkFeature(sharePid, constants);
  } //setup bookmark navigator if requested


  let pid = Object(_util_url__WEBPACK_IMPORTED_MODULE_11__["showBookmark"])();

  if (pid) {
    Object(_navigator__WEBPACK_IMPORTED_MODULE_12__["initNavigator"])(pid, constants);
  }
}

function initBookmarkFeature(sharePid, constants) {
  //get existing bookmarks for page
  getPageBookmarks(sharePid); //add support for text selection

  Object(_selection__WEBPACK_IMPORTED_MODULE_15__["initialize"])(constants); //show/hide bookmark highlights

  highlightHandler(); //disable/enable bookmark creation feature

  bookmarkFeatureHandler();
  initializeBookmarkFeatureState(); //setup bookmark link listener

  createLinkListener(_annotate__WEBPACK_IMPORTED_MODULE_16__["getLink"]);
  initBmLinkHandler();
}
const annotation = {
  /*
    This is called when user submits data from annotation form.
    args:
      formData: annotation form data
  */
  submit(formData) {
    let newTopics = formatNewTopics(formData); //add new topics to topic list and create annotation

    if (newTopics.length > 0) {
      addToTopicList(newTopics, formData);
    } else {
      //post the bookmark
      createAnnotation(formData);
    }
  },

  //user pressed cancel on annotation form
  cancel(formData) {
    //no creationDate means a new annotation that hasn't been stored
    if (!formData.creationDate && formData.aid) {
      Object(_selection__WEBPACK_IMPORTED_MODULE_15__["deleteNewSelection"])(formData.aid);
    }
  },

  //delete annotation
  async delete(formData) {
    //if annotation has selected text unwrap and delete it

    /*
    if (formData.aid) {
      deleteSelection(formData.aid);
    }
    else {
      //remove mark from paragraph
      $(`#${formData.rangeStart} > span.pnum`).removeClass("has-annotation");
       //remove all paragraphs in bookmark with class .note-style-bookmark
      let end = parseInt(formData.rangeEnd.substr(1), 10);
      let start = parseInt(formData.rangeStart.substr(1), 10);
      let pid = start;
      do {
        $(`#p${start}`).removeClass("note-style-bookmark");
        if (start === pid) {
          $(`#p${start}`).removeClass("note-style-bookmark-start");
        }
        if (start === end) {
          $(`#p${start}`).removeClass("note-style-bookmark-end");
        }
        start++;
      } while(start <= end);
    }
     //if annotation has links, remove the linkify icon
    if (formData.links) {
      $(`i[data-link-aid="${formData.creationDate}"]`).remove();
    }
    */
    //mark as having no annotations if all have been deleted
    try {
      await _bmnet__WEBPACK_IMPORTED_MODULE_7__["default"].deleteAnnotation(formData.rangeStart, formData.creationDate);
      /*
      if (remainingAnnotations === 0) {
        $(`#${formData.rangeStart} > span.pnum`).removeClass("has-bookmark");
      }
      */
    } catch (err) {
      throw new Error(err);
    }
  }

};

function getLinkHref(link) {
  let url = Object(_util_cmi__WEBPACK_IMPORTED_MODULE_17__["getUrlByPageKey"])(link.key);

  if (location.pathname === url) {
    return `#${link.desc.pid}`;
  }

  return `${url}?v=${link.desc.pid}`;
}

function createLinkListener(getLink) {
  $(".transcript").on("click", "td.follow-link-item", function (e) {
    e.preventDefault(); //get link info

    let index = $(this).parent("tr").attr("data-index");
    let linkInfo = getLink(index); //build url

    let link = JSON.parse(linkInfo.link); //console.log("url: %s", url);

    location.href = getLinkHref(link);
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function (pid, constants) {
    teaching = constants; //provide teaching constants to bmnet

    Object(_bmnet__WEBPACK_IMPORTED_MODULE_7__["netInit"])(teaching);

    if ($(".transcript").length) {
      //this is a transcript page
      initTranscriptPage(pid, constants);
    } //initialize bookmark list modal - available on all pages


    _list__WEBPACK_IMPORTED_MODULE_13__["default"].initialize(constants);
  }
});

/***/ }),

/***/ "./src/js/modules/_bookmark/clipboard.js":
/*!***********************************************!*\
  !*** ./src/js/modules/_bookmark/clipboard.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clipboard */ "./node_modules/clipboard/dist/clipboard.js");
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clipboard__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");


 //var clipboard;

var clipboard = new Map();

function setEvents(clip) {
  clip.on("success", e => {
    //console.log("e.text: %s", e.text);
    if (e.text.indexOf("tocbook") > -1) {
      //modal dialog is displayed so notify won't work
      $(".toc.modal > .message").html(`<p>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("clip:url")}</p>`);
      setTimeout(() => {
        $(".toc.modal > .message > p").remove();
      }, 2000);
    } else {
      toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("clip:link"));
    }

    e.clearSelection();
  });
  clip.on("error", () => {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("error:e3"));
  });
}

function createInstance(selector) {
  var object = new clipboard__WEBPACK_IMPORTED_MODULE_0___default.a(selector);
  setEvents(object);
  return object;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  register: function (selector) {
    let clip = clipboard.get(selector);

    if (!clip) {
      clip = createInstance(selector);
      clipboard.set(selector, clip);
    }

    return clip;
  },
  destroy: function (selector) {
    let clip = clipboard.get(selector);

    if (clip) {
      clip.destroy();
      clipboard.delete(selector);
    }
  }
});

/***/ }),

/***/ "./src/js/modules/_bookmark/list.js":
/*!******************************************!*\
  !*** ./src/js/modules/_bookmark/list.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ajax_annotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_ajax/annotation */ "./src/js/modules/_ajax/annotation.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/flatten */ "./node_modules/lodash/flatten.js");
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_flatten__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/uniqWith */ "./node_modules/lodash/uniqWith.js");
/* harmony import */ var lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/*
 * _bookmark/list.js
 *
 * Manaage bookmark display modal dialog.
 *
 * Query bookmarks by sourceId and format data for display in
 * sorted order by book, chapter, and paragraph.
 *
 * Bookmarks are stored in local storage to avoid having to query
 * each time list is displayed unless bookmarks have been added,
 * deleted, or updated.
 *
 * Stored bookmarks are used by _bookmark/navigator.js to navigate
 * through the list of bookmarks.
 *
 * Requires that _includes/componetns/bookmark-modal.html is included
 * on page. Modal open on click of .bookmark.ui.modal.
 *
 */







const uiBookmarkModal = ".bookmark.ui.modal";
const uiOpenBookmarkModal = ".bookmark-modal-open";
const uiModalOpacity = 0.5; //teaching specific constants

let teaching = {}; //generate the option element of a select statement

function generateOption(topic) {
  if (typeof topic === "object") {
    return `<option value="${topic.value}">${topic.topic}</option>`;
  }

  return `<option value="${topic}">${topic}</option>`;
} //generate select html for Topics


function makeTopicSelect(topics) {
  return `
    <label>Filter Topic(s)</label>
    <select name="topicList" id="bookmark-topic-list" multiple="" class="search ui dropdown">
      <option value="">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("label:selecttopic")}</option>
      ${topics.map(topic => `${generateOption(topic)}`).join("")}
    </select>
  `;
}

function generateHorizontalList(listArray) {
  if (!listArray || listArray.length === 0) {
    return Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("annotate:m13");
  }

  return `
    <div class="ui horizontal bulleted list">
      ${listArray.map(item => `
        <div class="item">
          <em>${typeof item === "object" ? item.topic : item}</em>
        </div>
      `).join("")}
    </div>
  `;
}

function generateParagraphList(pid, bkmk, url, pTopicList) {
  if (bkmk.length === 0) {
    return `
      <div class="bookmark-item item"> <!-- ${pid} -->
        <i class="bookmark icon"></i>
        <div class="content">
          <div class="header">
            <a href="${url}?bkmk=${pid}">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("label:para")}: ${pid}</a>
          </div>
        </div>
      </div> <!-- item: ${pid} -->
    `;
  }

  let topicString = pTopicList.reduce((result, item) => {
    if (typeof item === "object") {
      return `${result} ${item.value}`;
    }

    return `${result} ${item}`;
  }, "");
  return `
    <div class="${topicString} bookmark-item item"> <!-- ${pid} -->
      <i class="bookmark icon"></i>
      <div class="content">
        <div class="header">
          <a href="${url}?bkmk=${pid}">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("label:para")}: ${pid}</a>
        </div>
        <div class="list">
          ${bkmk.map(annotation => `
            <div class="item"> <!-- item: ${annotation.rangeStart}/${annotation.rangeEnd} -->
              <i class="right triangle icon"></i>
              <div class="content">
                <div class="header">
                  ${generateHorizontalList(annotation.topicList)}
                </div>
                <div class="description">
                  ${annotation.Comment ? annotation.Comment : Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("annotate:m7")}
                </div>
              </div>
            </div> <!-- item: ${annotation.rangeStart}/${annotation.rangeEnd} -->
          `).join("")}
        </div>
      </div>
    </div> <!-- item: ${pid} -->
  `;
}

function generateBookmarksForPage(bookmarks, url) {
  let html = ""; //loop over all paragraphs containing bookmarks

  for (let pid in bookmarks) {
    //omit topic list keys
    if (!pid.startsWith("tpList")) {
      let paragraphId = `p${(parseInt(pid, 10) - 1).toString(10)}`;
      html += generateParagraphList(paragraphId, bookmarks[pid], url, bookmarks[`tpList${pid}`]);
    }
  }

  return html;
}

function generatePageTitle(page) {
  let title = `${page.title}`;

  if (page.subTitle) {
    title = `${title}: ${page.subTitle}`;
  }

  return title;
}

function generateBookmarksForBookPages(pages) {
  return `
    ${pages.map(page => `
      <div class="item"> <!-- item: ${page.title} -->
        <i class="file icon"></i>
        <div class="content">
          <div class="header">
            ${generatePageTitle(page)}
          </div>
          <div class="list">
            ${generateBookmarksForPage(page.bookmarks, page.url)}
          </div>
        </div>
      </div>
    `).join("")}
  `;
}

function generateBookmarkList(books) {
  if (books.length === 0) {
    return _language_lang__WEBPACK_IMPORTED_MODULE_6__["__lang"]`
      <h2 class="ui center aligned icon header">
        <i class="circular bookmark icon"></i>
        ${"bmlist:header"}
      </h2>
      <p>
        ${"bmlist:intro"}
      </p>
      <ul>
        <li>${"bmlist:item1"}</li>
        <li>${"bmlist:item2"}</li>
      </ul>
      <p>
        ${"bmlist:link"}
      </p>
    `;
  }

  return `
    ${books.map(book => `
      <div data-bid="${book.bookId}" class="item"> <!-- item: ${book.bookId} -->
        <div class="right floated content">
          <div data-book="${book.bookId}" class="green ui small button">Open</div>
        </div>
        <i class="book icon"></i>
        <div class="content">
          <div class="${book.bookId}-header header">
            ${book.bookTitle}
          </div>
          <div id="${book.bookId}-list" class="hide-bookmarks list">
            ${generateBookmarksForBookPages(book.pages)}
          </div>
        </div>
      </div> <!-- item: ${book.bookId} -->
    `).join("")}
  `;
}
/*
  The argument is an array of pages containing bookmarks. Create a new
  array with one entry per book with an array of pages for that book
*/


function combinePages(pages) {
  let books = {};
  let bookArray = []; //rearrange the data into a single object per page

  pages.forEach(page => {
    if (!books[page.bookId]) {
      books[page.bookId] = {};
      books[page.bookId].bookId = page.bookId;
      books[page.bookId].bookTitle = page.bookTitle;

      if (page.subTitle) {
        books[page.bookId].subTitle = page.subTitle;
      }

      books[page.bookId].pages = [];
    }

    let pageInfo = {
      pageKey: page.pageKey,
      title: page.title,
      url: page.url,
      bookmarks: page.data
    };

    if (page.subTitle) {
      pageInfo.subTitle = page.subTitle;
    }

    books[page.bookId].pages.push(pageInfo);
  }); //copy from books to bookArray keeping the original order

  pages.forEach(page => {
    if (books[page.bookId]) {
      bookArray.push(books[page.bookId]);
      delete books[page.bookId];
    }
  });
  let allTopics = []; //add a list of all topics used for each bookmark

  bookArray.forEach(book => {
    book.pages.forEach(page => {
      for (let pid in page.bookmarks) {
        //console.log(page.bookmarks[pid]);
        if (page.bookmarks[pid].length > 0) {
          let tpl = page.bookmarks[pid].map(annotation => {
            if (annotation.topicList) {
              return annotation.topicList;
            } else {
              //bookmark has no topics
              return [];
            }
          }); //collect all topics used for modal dropdown select control

          let uniqueArray = lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5___default()(lodash_flatten__WEBPACK_IMPORTED_MODULE_4___default()(tpl), (a, b) => {
            if (a.value === b.value) {
              return true;
            }

            return false;
          });
          page.bookmarks[`tpList${pid}`] = uniqueArray;
          allTopics.push(uniqueArray);
        }
      }
    });
  });
  let flatTopics = lodash_flatten__WEBPACK_IMPORTED_MODULE_4___default()(allTopics);
  let sortedFlatTopics = flatTopics.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    } else if (a.value > b.value) {
      return 1;
    }

    return 0;
  });
  let allUniqueTopics = lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5___default()(sortedFlatTopics, (a, b) => {
    if (a.value === b.value) {
      return true;
    }

    return false;
  });
  return {
    bookArray,
    topics: allUniqueTopics
  };
}
/*
  set bookmark modal form to previous state
*/


function restoreModalState() {
  let {
    modal
  } = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("bmModal", {
    modal: {
      filter: false
    }
  }); //bookmarkModalState("get");

  let form = $("#bookmark-filter-form");
  console.log("modal: ", modal);

  if (modal.filter) {
    form.form("set value", "topicList", modal.topics);
    $(".bookmark-filter-submit").trigger("click", {
      init: true
    });
  }
}

function filterResetHandler() {
  //clear filter
  $(".bookmark-filter-reset").on("click", function (e) {
    e.preventDefault();
    let form = $("#bookmark-filter-form");
    form.form("clear");
    let hiddenBookmarkItems = $(".cmi-bookmark-list .hide-bookmark-item.bookmark-item");
    hiddenBookmarkItems.each(function () {
      $(this).removeClass("hide-bookmark-item");
    }); //keep track of the state of the bookmark Modal

    let bookmarkModalInfo = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("bmModal", {
      modal: {
        filter: false
      }
    }); //bookmarkModalState("get");
    //update book title to reflect number of bookmarks

    $("[data-bid]").each(function () {
      let bid = $(this).data("bid");
      $(`.${bid}-header`).text(`${bookmarkModalInfo[bid].header} (${bookmarkModalInfo[bid].count})`);
    });
    bookmarkModalInfo["modal"].filter = false;
    delete bookmarkModalInfo["modal"].topics;
    Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeSet"])("bmModal", bookmarkModalInfo); //bookmarkModalState("set", bookmarkModalInfo);
  });
}

function filterSubmitHandler() {
  //apply topic filter
  $(".bookmark-filter-submit").on("click", function (e, data) {
    e.preventDefault();
    let form = $("#bookmark-filter-form");
    let topics = form.form("get value", "topicList");
    let topicRegExp = new RegExp(`\\b(${topics.join("|")})\\b`);

    if (topics.length === 0) {
      return;
    }

    let bookmarkItems = $(".cmi-bookmark-list .bookmark-item");
    bookmarkItems.each(function () {
      let classList = $(this).attr("class");

      if (classList.match(topicRegExp)) {
        //the bookmark could be hidden from a previous filter, so just remove the class
        //in case it's there
        $(this).removeClass("hide-bookmark-item");
      } else {
        $(this).addClass("hide-bookmark-item");
      }
    }); //keep track of the state of the bookmark Modal

    let bookmarkModalInfo = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("bmModal", {
      modal: {
        filter: false
      }
    }); //bookmarkModalState("get");

    let fullTopic = topics.map(t => {
      return {
        value: t,
        topic: $(`#bookmark-topic-list > [value='${t}']`).text()
      };
    }); //if we have data we're initializing and so we don't need to save state

    if (!data) {
      bookmarkModalInfo["modal"].filter = true;
      bookmarkModalInfo["modal"].topics = topics;
      bookmarkModalInfo["modal"].fullTopic = fullTopic;
      Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeSet"])("bmModal", bookmarkModalInfo); //bookmarkModalState("set", bookmarkModalInfo);
    }

    $("[data-bid]").each(function () {
      let bid = $(this).data("bid");
      let filtered = $(`[data-bid="${bid}"] .bookmark-item.hide-bookmark-item`).length;
      let remaining = bookmarkModalInfo[bid].count - filtered; //update title to reflect number of bookmarks shown after filter applied

      $(`.${bid}-header`).html(`${bookmarkModalInfo[bid].header} (<span class="bookmark-filter-color">${remaining}</span>/${bookmarkModalInfo[bid].count})`);
    });
  });
} //set click listener to open/close book level bookmarks


function openCloseHandler() {
  $(".cmi-bookmark-list").on("click", "[data-book]", function (e) {
    e.stopPropagation();
    let bookId = $(this).attr("data-book");
    let bookList = $(`#${bookId}-list`);

    if (bookList.hasClass("hide-bookmarks")) {
      bookList.removeClass("hide-bookmarks");
      $(this).text("Close").removeClass("green").addClass("yellow");
    } else {
      bookList.removeClass("yellow").addClass("green hide-bookmarks");
      $(this).text("Open").removeClass("yellow").addClass("green");
    }
  });
}
/*
  This is called each time the user displays the bookmark list
  - the first time it's called we need to generate html for all bookmarks
  - subsequent calls will regenerate html only if bookmarks have been added
    or deleted since the last time html was generated.
*/


function populateModal(bookmarks) {
  let initialCall = true;
  let html;
  let info = [];
  /*
    We need to populate the modal html if it hasn't been done yet or
    if a bookmark has been added or changed since we last did it.
    - check if we need to do it.
  */

  let lbd = $(".cmi-bookmark-list").attr("data-lbd");

  if (lbd) {
    //check if it is different from that found in booimarks
    lbd = parseInt(lbd, 10);

    if (lbd === bookmarks.lastBuildDate) {
      //don't need to update
      return;
    } else {
      initialCall = false;
    }
  } //record time bookmark was last generated


  $(".cmi-bookmark-list").attr("data-lbd", bookmarks.lastBuildDate); //get page info for each page with bookmarks

  for (let pageKey in bookmarks) {
    if (pageKey !== "lastFetchDate" && pageKey !== "lastBuildDate") {
      info.push(teaching.getPageInfo(pageKey, bookmarks[pageKey]));
    }
  } //we have an array of bookmarks, each element represents a page


  Promise.all(info).then(responses => {
    let {
      bookArray,
      topics
    } = combinePages(responses); //console.log("unique topics: %o", topics);
    //generate html and attach to modal dialog

    html = generateBookmarkList(bookArray);
    $(".cmi-bookmark-list").html(html);
    let select = makeTopicSelect(topics);
    $("#bookmark-modal-topic-select").html(select);
    $("#bookmark-topic-list").dropdown();
    $("#bookmark-modal-loading").removeClass("active").addClass("disabled");
    let bookmarkModalInfo = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("bmModal", {
      modal: {
        filter: false
      }
    }); //bookmarkModalState("get");
    //get number of bookmarks for each book

    $("[data-bid]").each(function () {
      let info = {};
      let bid = $(this).data("bid");
      info.count = $(`[data-bid="${bid}"] .bookmark-item`).length;
      info.header = $(`.${bid}-header`).text().trim(); //update title to reflect number of bookmarks

      $(`.${bid}-header`).text(`${info.header} (${info.count})`);
      bookmarkModalInfo[bid] = info;
    }); //only do this the first time 

    if (initialCall) {
      Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeSet"])("bmModal", bookmarkModalInfo); //bookmarkModalState("set", bookmarkModalInfo);

      openCloseHandler();
      filterSubmitHandler();
      filterResetHandler(); //restore past state if needed

      restoreModalState();
    }
  }).catch(err => {
    console.error(err);
  });
}
/*
 * Build bookmark list:
 *  { pageKey: {pid: [], pid2:[] }
 *
 *  Store result in local storage
 */


function buildBookmarkListFromServer(response) {
  let bookmarks = {};
  response.forEach(b => {
    let [pageKey, pKey] = b.paraKey.split(".");
    pKey = parseInt(pKey, 10) + "";

    if (!bookmarks[pageKey]) {
      bookmarks[pageKey] = {};
    }

    if (!bookmarks[pageKey][pKey]) {
      bookmarks[pageKey][pKey] = [];
    }

    bookmarks[pageKey][pKey].push(b.annotation);
  });
  bookmarks.lastFetchDate = Date.now();
  bookmarks.lastBuildDate = Date.now();
  Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeSet"])("bmList", bookmarks);
  return bookmarks;
}
/*
 * Query db for bookmarks by sourceId. Check for valid list of bookmarks in
 * local storage first. If not found go to database.
 */


async function queryBookmarks(key) {
  const retentionTime = 1000 * 60 * 60 * 8; //eight hours of milliseconds

  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])(); //check for bookmarks stored in local storage

  let bookmarkList = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("bmList", {
    modal: {
      filter: false
    }
  }); //getBookmarkList();

  if (bookmarkList) {
    let expireDate = bookmarkList.lastFetchDate + retentionTime; //if list has not expired or been invalidated resolve and return
    //otherwise query the server

    if (Date.now() < expireDate) {
      if (bookmarkList.lastBuildDate > 0) {
        populateModal(bookmarkList);
        return;
      }
    }
  }

  try {
    let bmList = await Object(_ajax_annotation__WEBPACK_IMPORTED_MODULE_0__["getAnnotations"])(userInfo.userId, key);
    let bookmarks = buildBookmarkListFromServer(bmList);
    populateModal(bookmarks);
  } catch (err) {
    console.error(err);
    toastr__WEBPACK_IMPORTED_MODULE_3___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("error:e4"));
  }
}
/*
  We query bookmarks just once per day and whenever bookmarks have changed
*/


function initList() {
  const {
    sourceId
  } = teaching.keyInfo.getKeyInfo();
  queryBookmarks(sourceId);
}

function initBookmarkModal() {
  $(uiBookmarkModal).modal({
    dimmerSettings: {
      opacity: uiModalOpacity
    },
    autofocus: false,
    centered: true,
    duration: 400,
    inverted: true,
    observeChanges: true,
    transition: "horizontal flip",
    onShow: function () {
      //console.log("calling initList()");
      initList();
    },
    onVisible: function () {},
    onHidden: function () {}
  });
  $(uiOpenBookmarkModal).on("click", e => {
    e.preventDefault(); //populateBookmarkModal(uiBookmarkModalDiv);

    $(uiBookmarkModal).modal("show");
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function (constants) {
    teaching = constants;
    initBookmarkModal();
  }
});

/***/ }),

/***/ "./src/js/modules/_bookmark/localStore.js":
/*!************************************************!*\
  !*** ./src/js/modules/_bookmark/localStore.js ***!
  \************************************************/
/*! exports provided: BookmarkLocalStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookmarkLocalStore", function() { return BookmarkLocalStore; });
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/difference */ "./node_modules/lodash/difference.js");
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_difference__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _topics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./topics */ "./src/js/modules/_bookmark/topics.js");
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bookmark */ "./src/js/modules/_bookmark/bookmark.js");
/*
 * Local storage for bookmarks on page. 
 *
 * All bookmarks on current page are added when the page is loaded and this
 * cache is kept up to date with bookmark updates, deletions and creations.
 *
 * The local store is referenced for display of popup when cursor is hovered over
 * bookmarks on the page, when a bookmark is edited or shared.
 *
 * We don't use the browsers local store because we don't need to persist bookmarks
 * accross pages.
 */




/**
 * Convert paragraphKey from number to String and add
 * zero's if needed so decimal part contains 3 digits.
 */

function toString(paraKey) {
  let pk = `${paraKey}`;
  let decimalPos = pk.indexOf(".");

  if (decimalPos > -1) {
    let fpart = pk.substring(decimalPos + 1); //console.log("pk: %s, fpart: %s", pk, fpart);

    switch (fpart.length) {
      case 1:
        pk = `${pk}00`;
        break;

      case 2:
        pk = `${pk}0`;
        break;

      case 3:
        // format is correct
        break;

      default:
        // Houston, we've got a problem
        // console.err(`paragraph key format error: ${pk}`);
        break;
    }
  } // console.log("pk returned: %s", pk);


  return pk;
}

class BookmarkLocalStore {
  /**
   * Add list of bookmarks on page to this.list and add the topics for each
   * bookmark to the topics Map. Increment count to record the number of references
   * to each topic.
   *
   * @constructor
   * @param {array} bmList - array of bookmarks on page
   */
  constructor(bmList, sharePid) {
    this.list = bmList;
    this.topics = new Map();
    this.topicsModified = false;
    this.sharePid = sharePid; //load topics from bmList in to topic Map

    this._initTopics();
  }
  /**
   * Add topic to Map if not present, set count to 1. If present
   * increment count by 1.
   *
   * @params <object> newTopic - {value: "topicNospaces", topic: "might have spaces"}
   */


  _incrementTopic(newTopic, initializing = false) {
    //get number of topics before updating
    let size = this.topics.size;
    let key = newTopic.value; //if newTopic is not in topics, add it and set count to 1

    if (!this.topics.has(key)) {
      newTopic.count = 1;
      this.topics.set(key, newTopic);
      this.topicsModified = true;
    } else {
      let savedTopic = this.topics.get(key);
      savedTopic.count += 1;
      this.topics.set(key, savedTopic);
    } //this is the first topic on the page so we
    //need to initialize topics modal (for filtering page topics)


    if (size === 0 && !initializing) {
      Object(_topics__WEBPACK_IMPORTED_MODULE_2__["bookmarksLoaded"])();
    }
  }
  /**
   * Decrement or remove topic from topic Map
   * @param {object} - topic
   * @returns {boolean} {remainingCount: <number>, modified: <boolean>}
   */


  _decrementTopic(topic) {
    let key = topic.value;
    let modified = false; //unexpected

    if (!this.topics.has(key)) {
      return;
    }

    let trackedTopicValue = this.topics.get(key); //no more bookmarks on page with this topic

    if (trackedTopicValue.count === 1) {
      this.topics.delete(key);
      this.topicsModified = true;
    } else {
      //decrement count and store value
      trackedTopicValue.count -= 1;
      this.topics.set(key, trackedTopicValue);
    } //if the last topic on the page has been deleted remove
    //access to topic filter


    if (this.topics.size === 0) {
      Object(_topics__WEBPACK_IMPORTED_MODULE_2__["noMoreBookmarks"])();
    }
  }
  /*
   * Load bookmark topics into Map. This is used to selectively
   * display bookmarks on page by given topic. Load topics only
   * for selectedText annotations.
   */


  _initTopics() {
    this.list.forEach(b => {
      Object(_bookmark__WEBPACK_IMPORTED_MODULE_3__["processBookmark"])("loaded", b, this.sharePid);

      if (!b.annotation.selectedText) {
        return;
      }

      if (b.annotation.topicList && b.annotation.topicList.length > 0) {
        b.annotation.topicList.forEach(topic => {
          this._incrementTopic(topic, true);
        });
      }
    });
    this.topicsModified = true;
  }
  /*
   * A list of bookmarks, formated for display in the bookmark modal,
   * is stored in the browsers local storage. When bookmarks are added,
   * updated or deleted this list must be recreated.
   *
   * This invalidates the list because it knows about all bookmark changes.
   */


  _invalidateBmList() {
    let bmList = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("bmList"); //this is not expected

    if (!bmList) return; //invalidate list

    bmList.lastBuildDate = 0;
    Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeSet"])("bmList", bmList);
    return;
  }
  /*
   * Returns unique topics used by page annotations
   */


  getTopics() {
    return this.topics;
  }
  /**
   * Get state of topic array
   *
   * @returns {boolean} true if topics have be added or removed
   */


  get topicRefreshNeeded() {
    return this.topicsModified;
  }
  /*
   * Set state of topic refresh needed flag
   */


  set topicRefreshNeeded(value) {
    this.topicsModified = value;
  }
  /*
   * Find the bookmark with aid and return its creationDate
   */


  getCreationDate(aid) {
    let bkmrk = this.list.find(b => {
      if (b.annotation.aid && b.annotation.aid === aid) {
        return true;
      }

      return false;
    });

    if (bkmrk) {
      return bkmrk.creationDate;
    } //return undefined


    return bkmrk;
  }
  /**
   * Get bookmark for pid with aid.
   *
   * Only annotations with selectedText have aid. Note style
   * annotation don't but they do have creationDate so check
   * aid against creationDate if annotation.aid is not present.
   *
   * @param {string} pid - paragraph Id starting with "p"
   * @param {string} aid - uuid, only present with selectedText
   * @return {object} - or undefined 
   */


  getItem(pid, aid) {
    let id = parseInt(pid.substr(1), 10); //get array of bookmarks for pid

    let bms = this.list.filter(b => {
      return b.pid === id;
    });
    let bm = bms.find(b => {
      if (aid) {
        if (b.annotation.aid) {
          return b.annotation.aid === aid;
        }

        return b.annotation.creationDate == aid;
      }

      return typeof b.annotation.aid === "undefined";
    });
    return bm;
  }
  /**
   * Add or update annotation to the list. Update topic Map
   * accordingly.
   *
   * @param {string} - userId
   * @param {string} - paraKey
   * @param {string} - creationDate
   * @param {object} - annotation (the bookmark)
   */


  addItem(userId, paraKey, creationDate, annotation) {
    let pid = annotation.rangeStart;
    let id = parseInt(pid.substr(1), 10);

    if (typeof paraKey === "number") {
      paraKey = toString(paraKey);
    }

    if (annotation.status === "new") {
      annotation.creationDate = creationDate;
      let bkmrk = {
        userId: userId,
        paraKey: `${paraKey}`,
        creationDate: `${creationDate}`,
        pid: id,
        annotation: annotation
      };
      this.list.push(bkmrk); //add topics to topic Map for selectedText bookmarks

      if (bkmrk.annotation.selectedText && bkmrk.annotation.topicList) {
        bkmrk.annotation.topicList.forEach(i => {
          this._incrementTopic(i);
        });
      } //item has been added so invalidate bmList


      this._invalidateBmList(); //get number of bookmarks on paragraph


      let bms = this.list.filter(b => {
        return b.pid === id;
      }); //process new bookmark

      Object(_bookmark__WEBPACK_IMPORTED_MODULE_3__["processBookmark"])("created", bkmrk, bms.length - 1);
    } else {
      //this is an update
      let pKey = `${paraKey}`;
      let cDate = `${creationDate}`;
      let index = this.list.findIndex(i => {
        return i.paraKey === pKey && i.creationDate === cDate;
      });
      if (index === -1) throw new Error("localStore: addItem:update: bookmark to update not found in list"); //update topic Map if needed

      if (annotation.selectedText) {
        let newTopicList = [];
        let oldTopicList = [];

        if (annotation.topicList) {
          let newTL = annotation.topicList.reduce((result, topic) => {
            return `${result} ${topic.value}`;
          }, "");
          newTL = newTL.trim();
          newTopicList = newTL.split(" ");
        }

        if (this.list[index].annotation.topicList) {
          let oldTL = this.list[index].annotation.topicList.reduce((result, topic) => {
            return `${result} ${topic.value}`;
          }, "");
          oldTL = oldTL.trim();
          oldTopicList = oldTL.split(" ");
        }

        let addedTopics = lodash_difference__WEBPACK_IMPORTED_MODULE_1___default()(newTopicList, oldTopicList);
        let deletedTopics = lodash_difference__WEBPACK_IMPORTED_MODULE_1___default()(oldTopicList, newTopicList); //add topics is any have been added

        addedTopics.forEach(i => {
          //find topic in new annotation
          let topic = annotation.topicList.find(t => {
            return t.value === i;
          });

          this._incrementTopic(topic);
        }); //delete topics if any have been deleted

        deletedTopics.forEach(i => {
          //find topic in old annotation
          let topic = this.list[index].annotation.topicList.find(t => {
            return t.value === i;
          });

          this._decrementTopic(topic);
        });
      } //update annotation in local store


      this.list[index].annotation = annotation; //process updated bookmark

      Object(_bookmark__WEBPACK_IMPORTED_MODULE_3__["processBookmark"])("updated", this.list[index]);
    }
  }
  /**
   * Delete bookmark from list
   *
   * @param {string} userId
   * @param {string} paraKey
   * @param {string} creationDate
   * @return {object} {remainingCount: null || number left, modified: boolean}
   *
   */


  deleteItem(userId, paraKey, creationDate) {
    if (typeof paraKey !== "string") {
      paraKey = `${paraKey}`;
    }

    if (typeof creationDate !== "string") {
      creationDate = `${creationDate}`;
    }

    let index = this.list.findIndex(i => {
      if (i.userId === userId && i.paraKey === paraKey && i.creationDate === creationDate) {
        return true;
      }

      return false;
    }); //if item found, delete it from local store and get count remaining
    //bookmarks on paragraph

    let topicsModified = false;

    if (index > -1) {
      let bkmrk = this.list[index];
      let pid = bkmrk.pid; //delete topics from topic Map

      if (this.list[index].annotation.topicList) {
        this.list[index].annotation.topicList.forEach(i => {
          topicsModified = this._decrementTopic(i) || topicsModified;
        });
      } //delete item


      this.list.splice(index, 1); //item has been deleted so invalidate bmList

      this._invalidateBmList(); //get remaining bookmarks on paragraph


      let bms = this.list.filter(b => {
        return b.pid === pid;
      }); //process deleted bookmark

      Object(_bookmark__WEBPACK_IMPORTED_MODULE_3__["processBookmark"])("deleted", bkmrk, bms.length);
      return {
        remainingCount: bms.length,
        modified: topicsModified
      };
    }

    return {
      remainingCount: null,
      modified: topicsModified
    };
  }
  /*
   * Return the number of bookmarks for pid and exclude
   * bookmark with aid from the count.
   *
   * @param {string} pid - paragraph Id
   * @param {string} aid - annotation to exclude from count
   * @return {number}
   */


  itemCount(pid, aid) {
    if (!aid) {
      return 0;
    }

    let id = parseInt(pid.substr(1), 10);
    let bms = this.list.filter(b => {
      return b.pid === id;
    });
    let count = bms.reduce((count, b) => {
      if (b.annotation.aid && b.annotation.aid !== aid) {
        count = count + 1;
      }

      return count;
    }, 0);
    return count;
  }

}

/***/ }),

/***/ "./src/js/modules/_bookmark/navigator.js":
/*!***********************************************!*\
  !*** ./src/js/modules/_bookmark/navigator.js ***!
  \***********************************************/
/*! exports provided: initShareDialog, initNavigator, initTopicNavigator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initShareDialog", function() { return initShareDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initNavigator", function() { return initNavigator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initTopicNavigator", function() { return initTopicNavigator; });
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/intersection */ "./node_modules/lodash/intersection.js");
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_intersection__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/intersectionWith */ "./node_modules/lodash/intersectionWith.js");
/* harmony import */ var lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/range */ "./node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scroll-into-view */ "./node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bookmark */ "./src/js/modules/_bookmark/bookmark.js");
/* harmony import */ var _shareByEmail__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shareByEmail */ "./src/js/modules/_bookmark/shareByEmail.js");
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./clipboard */ "./src/js/modules/_bookmark/clipboard.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");










 //teaching specific constants

let teaching = {};
let shareEventListenerCreated = false;
let gPageKey;

function generateHorizontalList(listArray) {
  if (!listArray || listArray.length === 0) {
    return Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("annotate:m13");
  }

  return `
    <div class="ui horizontal bulleted list">
      ${listArray.map(item => `
        <div class="item">
          <em>${typeof item === "object" ? item.topic : item}</em>
        </div>
      `).join("")}
    </div>
  `;
}
/*
  generate html for annotation
  args: annotation - annotation object
        topics - filter array

  if topics.length > 0 then generate html only for
  annotations that have topics found in the filter array
*/


function generateAnnotation(annotation, topics = []) {
  let match;

  if (!annotation.topicList) {
    annotation.topicList = [];
  } // console.log("annotation: %o", annotation);
  //convert annotation topics list into string array


  let topicList = annotation.topicList.map(topic => {
    return topic.value;
  });

  if (topics.length > 0) {
    match = lodash_intersection__WEBPACK_IMPORTED_MODULE_1___default()(topicList, topics);
  }

  if (topics.length === 0 || match.length > 0) {
    return `
      <div class="item"> <!-- item: ${annotation.rangeStart}/${annotation.rangeEnd} -->
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="header">
            ${generateHorizontalList(annotation.topicList)}
          </div>
          <div class="description">
            <button class="annotation-item ui icon basic button" data-range="${annotation.rangeStart}/${annotation.rangeEnd}" data-aid="${annotation.aid}" data-creationDate="${annotation.creationDate}" >
              <i class="share square icon"></i>
              ${annotation.Comment ? annotation.Comment : Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("annotate:m7")}
            </button>
            <!--
            <a title="Click to share" data-aid="${annotation.aid}" data-creationDate="${annotation.creationDate}" class="annotation-item" data-range="${annotation.rangeStart}/${annotation.rangeEnd}">
              ${annotation.Comment ? annotation.Comment : Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("annotate:m7")}
            </a>
            -->
          </div>
        </div>
      </div> <!-- item: ${annotation.rangeStart}/${annotation.rangeEnd} -->
    `;
  } else {
    return `<!-- annotation filtered: ${topics.join(" ")} -->`;
  }
}

function generateBookmark(actualPid, bkmk, topics, label) {
  return `
    <div class="ui list">
      <div class="item">
        <i class="bookmark icon"></i>
        <div class="content">
          <div class="header">
            ${label}: ${actualPid}
          </div>
          <div class="list">
            ${bkmk.map(annotation => `
              ${generateAnnotation(annotation, topics)}
            `).join("")}
          </div>
        </div>
      </div>
    </div>
 `;
}
/*
  returns the url for the first annotation of the arg bookmark
  Note: deleted annotations are empty arrays so skip over them.
*/


function getBookmarkUrl(bookmarks, pageKey, pid, topic) {
  let url;
  let bookmark = bookmarks[pageKey][pid];
  let selectedText = bookmark[0].selectedText;

  if (selectedText) {
    // topic navigator
    if (topic.length > 0) {
      url = `${bookmark[0].selectedText.url}?tnav=${bookmark[0].rangeStart}&topic=${topic}`;
    } else {
      url = `${bookmark[0].selectedText.url}?bkmk=${bookmark[0].rangeStart}`;
    }
  } else {
    //we have a bookmark with no selected text, have to get the url in another way
    if (topic.length > 0) {
      url = `${teaching.env === "integration" ? teaching.url_prefix : ""}${teaching.keyInfo.getUrl(pageKey)}?tnav=${bookmark[0].rangeStart}&topic=${topic}`;
    } else {
      url = `${teaching.env === "integration" ? teaching.url_prefix : ""}${teaching.keyInfo.getUrl(pageKey)}?bkmk=${bookmark[0].rangeStart}`;
    }
  } //console.log("url: %s", url);


  return url;
}

function getNextPageUrl(pos, pageList, filterList, bookmarks, topic) {
  if (pos > pageList.length) {
    return Promise.resolve(null);
  }

  let found = false;
  let pagePos;
  let pid;

  outer: for (pagePos = pos; pagePos < pageList.length; pagePos++) {
    let pageMarks = bookmarks[pageList[pagePos]];

    for (pid in pageMarks) {
      for (let a = 0; a < pageMarks[pid].length; a++) {
        //no filter in effect
        if (!filterList || filterList.length === 0) {
          found = true;
          break outer;
        } else {
          //compare the filter topic (a) with bookmark topics ({value, topic})
          let match = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2___default()(filterList, pageMarks[pid][a].topicList || [], (a, b) => {
            if (a === b.value) {
              return true;
            }

            return false;
          });

          if (match.length > 0) {
            found = true;
            break outer;
          }
        }
      }
    }
  }

  return new Promise(resolve => {
    if (found) {
      let pageKey = pageList[pagePos];
      let url = getBookmarkUrl(bookmarks, pageKey, pid, topic); //it's possible the url was not found so check for that

      if (url) {
        //console.log("next url: %s", url);
        resolve(url);
        return;
      } else {
        resolve(null);
      }
    } else {
      //console.log("next url is null");
      resolve(null);
    } //console.log("next url: null");

  });
}

function getPrevPageUrl(pos, pageList, filterList, bookmarks, topic) {
  if (pos < 0) {
    return Promise.resolve(null);
  }

  let found = false;
  let pagePos;
  let pid;

  outer: for (pagePos = pos; pagePos >= 0; pagePos--) {
    let pageMarks = bookmarks[pageList[pagePos]];

    for (pid in pageMarks) {
      for (let a = 0; a < pageMarks[pid].length; a++) {
        //no filter in effect
        if (!filterList || filterList.length === 0) {
          found = true;
          break outer;
        } else {
          let match = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2___default()(filterList, pageMarks[pid][a].topicList || [], (a, b) => {
            if (a === b.value) {
              return true;
            }

            return false;
          });

          if (match.length > 0) {
            found = true;
            break outer;
          }
        }
      }
    }
  }

  return new Promise(resolve => {
    if (found) {
      let pageKey = pageList[pagePos];
      let url = getBookmarkUrl(bookmarks, pageKey, pid, topic); //console.log("prev url is %s", url);

      resolve(url);
    } else {
      //console.log("prev url is null");
      resolve(null);
    }
  });
}

function getNextPrevUrl(pageKey, bookmarks, bmModal, topic) {
  let pages = Object.keys(bookmarks);
  let pos = pages.indexOf("lastFetchDate");
  let urls = {
    next: null,
    prev: null
  };

  if (pos > -1) {
    pages.splice(pos, 1);
  }

  pos = pages.indexOf(pageKey);

  if (pos === -1) {
    return Promise.reject("bookmark not found");
  } //console.log("current page: %s", pageKey);


  let nextPromise = getNextPageUrl(pos + 1, pages, bmModal ? bmModal["modal"].topics : bmModal, bookmarks, topic);
  let prevPromise = getPrevPageUrl(pos - 1, pages, bmModal ? bmModal["modal"].topics : bmModal, bookmarks, topic);
  return Promise.all([prevPromise, nextPromise]);
}
/*
  Given the postion (currentPos) in pageMarks of the current pid, find the previous
  one. Return the actualPid or null.

  Omit bookmarks that don't have at least one topic found in topics[]. If topics[]
  has no data then no filtering is done.

  args:
    currentPos - position in pageMarks of the current paragraph
    pageMarks - an array of paragraph keys with bookmarks
    pageBookmarks - bookmarks found on the page
    topics - an array of topics by which to filter bookmarks
*/


function getPreviousPid(currentPos, pageMarks, pageBookmarks, topics) {
  //there is no previous bookmark
  if (currentPos < 1) {
    return null;
  } //no filtering


  if (topics.length === 0) {
    return `p${(parseInt(pageMarks[currentPos - 1], 10) - 1).toString(10)}`;
  } else {
    //topic filtering - look through all previous paragraphs for the first one
    //containing an annotation found in topics[]
    for (let newPos = currentPos - 1; newPos >= 0; newPos--) {
      let bookmark = pageBookmarks[pageMarks[newPos]];

      for (let i = 0; i < bookmark.length; i++) {
        if (bookmark[i].topicList && bookmark[i].topicList.length > 0) {
          let inter = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2___default()(bookmark[i].topicList, topics, (a, b) => {
            if (a.value === b) {
              return true;
            }

            return false;
          });

          if (inter.length > 0) {
            //we found a bookmark containing a topic in the topicList
            return `p${(parseInt(pageMarks[newPos], 10) - 1).toString(10)}`;
          }
        }
      }
    } //there are no remaining bookmarks with a topic in topics


    return null;
  }
}
/*
  Given the postion (currentPos) in pageMarks of the current pid, find the next
  one. Return the actualPid or null.

  Omit bookmarks that don't have at least one topic found in topics[]. If topics[]
  has no data then no filtering is done.

  args:
    currentPos - position in pageMarks of the current paragraph
    pageMarks - an array of paragraph keys with bookmarks
    pageBookmarks - bookmarks found on the page
    topics - an array of topics by which to filter bookmarks
*/


function getNextPid(currentPos, pageMarks, pageBookmarks, topics) {
  //there is "no" next bookmark
  if (currentPos + 1 === pageMarks.length) {
    return null;
  } //no filtering


  if (topics.length === 0) {
    return `p${(parseInt(pageMarks[currentPos + 1], 10) - 1).toString(10)}`;
  } else {
    //topic filtering - look through all previous paragraphs for the first one
    //containing an annotation found in topics[]
    for (let newPos = currentPos + 1; newPos < pageMarks.length; newPos++) {
      let bookmark = pageBookmarks[pageMarks[newPos]];

      for (let i = 0; i < bookmark.length; i++) {
        if (bookmark[i].topicList && bookmark[i].topicList.length > 0) {
          let inter = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2___default()(bookmark[i].topicList, topics, (a, b) => {
            if (a.value === b) {
              return true;
            }

            return false;
          });

          if (inter.length > 0) {
            //we found a bookmark containing a topic in the topicList
            return `p${(parseInt(pageMarks[newPos], 10) - 1).toString(10)}`;
          }
        }
      }
    } //there are no remaining bookmarks with a topic in topics


    return null;
  }
}
/*
  args: pageKey - identifies the current page
        pid - paragraph id
        allBookmarks - an array of all bookmarks
        bmModal - contains topics for filtering
        whoCalled - when the function is called by a click handler the value is
                    either "previous" or "next". When "previous", a new value
                    for previous bookmark needs to be determind, ditto for "next"

  Note: the value of pid is the actual paragraph id and not the key which is pid + 1.
  Bookmark info is stored according to key so we increment the pid to access the data
*/


function getCurrentBookmark(pageKey, actualPid, allBookmarks, bmModal, whoCalled) {
  let pidKey;
  let topics = [];
  let filterTopics;

  if (bmModal && bmModal["modal"].filter) {
    topics = bmModal["modal"].topics;
    filterTopics = generateHorizontalList(bmModal["modal"].fullTopic);
  } //convert pid to key in bookmark array


  pidKey = (parseInt(actualPid.substr(1), 10) + 1).toString(10);
  let paragraphBookmarks = allBookmarks[pageKey][pidKey]; // console.log("paragraphBookmarks: %o", paragraphBookmarks);
  //the current bookmark (actualPid) does not exist
  //this would happen where url includes ?bkmk=p3 and p3 does not have a bookmark

  if (!paragraphBookmarks) {
    return false;
  }

  Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("label:para", true).then(label => {
    let html = generateBookmark(actualPid, paragraphBookmarks, topics, label);
    $("#bookmark-content").html(html);
  });

  if (filterTopics) {
    $("#filter-topics-section").removeClass("hide");
    $(".bookmark-navigator-filter").html(filterTopics);
  } else {
    $("#filter-topics-section").addClass("hide");
  }

  $(".bookmark-navigator-header-book").text($("#book-title").text()); //$("#bookmark-content").html(html);
  //get links to next and previous bookmarks on the page

  let pageMarks = Object.keys(allBookmarks[pageKey]);
  let pos = pageMarks.indexOf(pidKey); //if topic filtering is enabled

  let prevActualPid;
  let nextActualPid;
  prevActualPid = getPreviousPid(pos, pageMarks, allBookmarks[pageKey], topics);
  nextActualPid = getNextPid(pos, pageMarks, allBookmarks[pageKey], topics);
  $(".bookmark-navigator .current-bookmark").attr("data-pid", `${actualPid}`); //console.log("prev: %s, next: %s", prevActualPid, nextActualPid);
  //set previous to inactive

  Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("action:prev", true).then(resp => {
    if (!prevActualPid) {
      $(".bookmark-navigator .previous-bookmark").addClass("inactive");
      $(".bookmark-navigator .previous-bookmark").html(`<i class='up arrow icon'></i>${resp}`);
    } else {
      //add data-pid attribute to link for previous bkmk
      $(".bookmark-navigator .previous-bookmark").attr("data-pid", prevActualPid);
      $(".bookmark-navigator .previous-bookmark").removeClass("inactive");
      $(".bookmark-navigator .previous-bookmark").html(`<i class="up arrow icon"></i> ${resp} (${prevActualPid})`);
    }
  });
  Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("action:next", true).then(resp => {
    if (!nextActualPid) {
      $(".bookmark-navigator .next-bookmark").addClass("inactive");
      $(".bookmark-navigator .next-bookmark").html(`<i class='down arrow icon'></i> ${resp}`);
    } else {
      //add data-pid attribute to link for next bkmk
      $(".bookmark-navigator .next-bookmark").attr("data-pid", nextActualPid);
      $(".bookmark-navigator .next-bookmark").removeClass("inactive");
      $(".bookmark-navigator .next-bookmark").html(`<i class="down arrow icon"></i> ${resp} (${nextActualPid})`);
    }
  }); // Highlight paragraph for topic navigator
  // if there's more than one annotation for the current paragraph we
  // use the first one to highlight

  if (whoCalled === "topic") {
    let {
      rangeStart,
      rangeEnd,
      creationDate
    } = paragraphBookmarks[0];
    highlightParagraph(actualPid, rangeStart, rangeEnd, creationDate);
  }

  return true;
}
/*
  Setup the bookmark navigator for the page.
  arg: pid - paragraph id.
*/


function bookmarkManager(actualPid) {
  let sourceId = teaching.keyInfo.getSourceId();
  let pageKey = teaching.keyInfo.genPageKey().toString(10);
  let bmList = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("bmList");
  let bmModal = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("bmModal");

  if (bmList) {
    //store globally
    gPageKey = pageKey; //get previous and next url's

    getNextPrevUrl(pageKey, bmList, bmModal, "").then(responses => {
      //console.log("next/prev urls: ", responses);
      //set prev and next hrefs
      if (responses[0] !== null) {
        $(".bookmark-navigator .previous-page").attr({
          "href": responses[0]
        });
      } else {
        $(".bookmark-navigator .previous-page").addClass("inactive").removeAttr("href");
      }

      if (responses[1] !== null) {
        $(".bookmark-navigator .next-page").attr({
          "href": responses[1]
        });
      } else {
        $(".bookmark-navigator .next-page").addClass("inactive").removeAttr("href");
      } //identify current bookmark in navigator
      //returns false if actualPid does not contain a bookmark


      if (!getCurrentBookmark(pageKey, actualPid, bmList, bmModal, "bookmark")) {
        Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("fragment:f1", true).then(value => {
          toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(_language_lang__WEBPACK_IMPORTED_MODULE_10__["__lang"]`${value} ${actualPid} ${"fragment:f2"}`);
        });
        return;
      } //init navigator controls


      initClickListeners("bookmark"); //indicate bookmark navigator is active by adding class to ./transcript

      $(".transcript").addClass("bookmark-navigator-active"); //show the navigator and scroll

      $(".bookmark-navigator-wrapper").removeClass("hide-bookmark-navigator");
      setTimeout(scrollIntoView, 250, actualPid, "bookmarkManager");
    }).catch(err => {
      console.error(err);

      if (err === "bookmark not found") {
        Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("fragment:f1", true).then(v => {
          toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(`${v} ${actualPid} ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("fragment:f2")}`);
        });
      }
    });
  } else {//console.log(teaching.bm_list_store);
  }
}
/*
  Setup the bookmark topic navigator for the page.
  arg: pid - paragraph id.
*/


function bookmarkTopicManager(topicInfo, constants) {
  let sourceId = teaching.keyInfo.getSourceId();
  let pageKey = teaching.keyInfo.genPageKey().toString(10);
  let topicList = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("topicList");
  let bmModal = null;

  if (topicList) {
    // get topic name and update navigator
    let keys = Object.keys(topicList[pageKey]);
    let first = topicList[pageKey][keys[0]][0].topicList.find(t => t.value === topicInfo.topic);
    console.log("keys: %o, topiclist: %o", keys, first);

    if (first) {
      $(".bookmark-navigator").prepend(`<h4 class="ui header"><div class="content">Topic: ${first.topic}</div></h4>`);
    } //store globally


    gPageKey = pageKey; //get previous page and next page url's

    getNextPrevUrl(pageKey, topicList, bmModal, topicInfo.topic).then(responses => {
      //console.log("next/prev urls: ", responses);
      //set prev and next hrefs
      if (responses[0] !== null) {
        $(".bookmark-navigator .previous-page").attr({
          "href": responses[0]
        });
      } else {
        $(".bookmark-navigator .previous-page").addClass("inactive").removeAttr("href");
      }

      if (responses[1] !== null) {
        $(".bookmark-navigator .next-page").attr({
          "href": responses[1]
        });
      } else {
        $(".bookmark-navigator .next-page").addClass("inactive").removeAttr("href");
      } //identify current bookmark in navigator
      //returns false if actualPid does not contain a bookmark


      if (!getCurrentBookmark(pageKey, topicInfo.pid, topicList, bmModal, "topic")) {
        Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("fragment:f1", true).then(value => {
          toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(_language_lang__WEBPACK_IMPORTED_MODULE_10__["__lang"]`${value} ${actualPid} ${"fragment:f2"}`);
        });
        return;
      } //init navigator controls


      initClickListeners("topic", constants); //indicate bookmark navigator is active by adding class to ./transcript

      $(".transcript").addClass("bookmark-navigator-active"); //show the navigator and scroll

      $(".bookmark-navigator-wrapper").removeClass("hide-bookmark-navigator");
      setTimeout(scrollIntoView, 250, topicInfo.pid, "bookmarkTopicManager");
    }).catch(err => {
      console.error(err);

      if (err === "bookmark not found") {
        Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("fragment:f1", true).then(v => {
          toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(`${v} ${actualPid} ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("fragment:f2")}`);
        });
      }
    });
  } else {//console.log(teaching.bm_list_store);
  }
}
/*
  Update previous and next bookmark links on navigator.

  args:
    pid: the actual pid to display
    update: either "previous", or "next" depending on what click handler called the function
    type: "bookmark" or "topic"
*/


function updateNavigator(pid, update, type) {
  //console.log("updateNavigator, pid: %s, update: %s", pid, update);
  let bmList;
  let bmModal;

  if (type === "bookmark") {
    bmList = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("bmList");
    bmModal = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("bmModal");
  } else {
    bmList = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("topicList");
    bmModal = null;
  }

  getCurrentBookmark(gPageKey, pid, bmList, bmModal, type);
}
/*
  An annotation is selected and the user can choose from sharing options. This dialog
  is set up by adding the .selected-annotation class.

  It is cleared here thus removing the share dialog
*/


function clearSelectedAnnotation() {
  let selected = $(".selected-annotation"); //remove dialog

  if (selected.length > 0) {
    $(".selected-annotation-wrapper > .header").remove();
    selected.unwrap().removeClass("selected-annotation");
    $(".bookmark-selected-text.show").removeClass("show"); //clear text selection guard applied whey bookmark is edited
    // if .user exists then guard is user initiated and we don't clear it

    let guard = $("div.transcript.ui.disable-selection:not(.user)");

    if (guard.length > 0) {
      //console.log("removing selection guard");
      guard.removeClass("disable-selection");
    }
  }
}

function scrollComplete(message, type) {//console.log(`${message}: ${type}`);
}

function scrollIntoView(id, caller) {
  scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(id), {
    align: {
      top: 0.2
    }
  }, type => {
    scrollComplete(`scroll from bookmark navigator ${caller}(${id})`, type);
  });
}
/**
 * Format bookmark text to share by email or Facebook.
 *
 * @param {string} channel - either 'email' or 'facebook'
 * @param {string} text - the text to format
 * @returns {string} the formatted text
 */


function formatToShare(channel, text) {
  let separator = channel === "email" ? "@@" : "\n\n"; //remove unwanted characters

  text = text.replace(/[^\x20-\x7E]/g, " "); //replace multiple spaces with one

  text = text.replace(/ {2,}/g, " "); //insert separator characters in front of paragraph numbers

  text = text.replace(/\(p\d*\)/g, m => {
    return `${separator}${m}`;
  }); //split into array to remove a empty first element

  let pArray = text.split(separator);

  if (pArray[0].length === 0) {
    pArray.shift();
  } //wrap paragraphs with <p></p> and join


  if (channel === "email") {
    text = pArray.reduce((current, p) => {
      return `${current}\n<p>${p}</p>`;
    }, "");
  } else {
    text = pArray.join("\n");
  }

  return text;
}
/*
  Click handler for FB and email share dialog. This can be called from this
  module when the bookmark navigator is active or from annotate.js when
  the share button is clicked from the annotation edit dialog.
*/


function initShareDialog(source) {
  if (shareEventListenerCreated) {
    return;
  } //share icon click handler


  $(".transcript").on("click", ".selected-annotation-wrapper .share-annotation", function (e) {
    e.preventDefault();
    let annotation = $(".selected-annotation-wrapper mark.show");
    let userInfo;
    let pid, aid, text;

    if ($(this).hasClass("close")) {
      clearSelectedAnnotation();
      return;
    }

    userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_9__["getUserInfo"])();

    if (!userInfo) {
      toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("annotate:m14"));
      return;
    }

    let url = $(".selected-annotation-wrapper i[data-clipboard-text]").attr("data-clipboard-text"); //check for intermittent error in url

    let pos = url.indexOf("undefined");
    let channel;

    if ($(this).hasClass("facebook")) {
      channel = "facebook";
    } else if ($(this).hasClass("envelope")) {
      channel = "email";
    } else if ($(this).hasClass("linkify")) {
      if (pos > -1) {
        //Houston, we've got a problem
        toastr__WEBPACK_IMPORTED_MODULE_5___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("error:e5"));
        return;
      } //work is already done


      channel = "clipboard";
      return;
    }

    pid = $(".selected-annotation-wrapper p").attr("id"); //this is a Note style annotation because it has no selectedText
    // - get the text of all <p> siblings to .selected-annotation-wrapper

    if (annotation.length === 0) {
      text = $(".selected-annotation-wrapper > p").text();
      text = formatToShare(channel, text);
    } else {
      text = annotation.text().replace(/\n/, " ");
    } //console.log("share text: %s", text);


    let srcTitle = $("#src-title").text();
    let bookTitle = $("#book-title").text();
    let citation = `~ ${srcTitle}: ${bookTitle}`;

    if (channel === "facebook") {
      if (pos > -1) {
        //Houston, we've got a problem
        toastr__WEBPACK_IMPORTED_MODULE_5___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("error:e5"));
        return;
      }

      let options = {
        method: "share",
        hashtag: "#christmind",
        quote: `${text}\n${citation}`,
        href: url
      };
      FB.ui(options, function () {});
    } else if (channel === "email") {
      if (pos > -1) {
        //Houston, we've got a problem
        toastr__WEBPACK_IMPORTED_MODULE_5___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("error:e5"));
        return;
      }

      Object(_shareByEmail__WEBPACK_IMPORTED_MODULE_7__["shareByEmail"])(text, citation, url);
    }
  });
  shareEventListenerCreated = true;
}

function highlightParagraph(pid, rangeStart, rangeEnd, creationDate) {
  let rStart = parseInt(rangeStart.substr(1), 10);
  let rEnd = parseInt(rangeEnd.substr(1), 10); // remove highlight from previous paragraph, if any

  $(".topic-navigator").unwrap();
  $(".topic-navigator").removeClass("topic-navigator");

  for (let i = rStart; i <= rEnd; i++) {
    let p = $(`#p${i}`);

    if (p.parent().is("blockquote")) {
      p.parent().addClass("topic-navigator");
    } else {
      p.addClass("topic-navigator");
    }
  }

  $(".topic-navigator").wrapAll("<div class='navigator-highlight' />");
}
/**
 * Get next and prev paragraph bookmarks.
 *
 * @param {string} type - either "bookmark" or "topic", specifies navitator type
 */


function initClickListeners(type, constants) {
  //previous bookmark
  $(".bookmark-navigator .previous-bookmark").on("click", function (e) {
    e.preventDefault();
    clearSelectedAnnotation();
    let actualPid = $(this).attr("data-pid");
    scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(actualPid), {
      align: {
        top: 0.2
      }
    }, type => {
      scrollComplete(`bookmark navigator previous-bookmark(${actualPid})`, type);
    });
    updateNavigator(actualPid, "previous", type);
  });
  $(".bookmark-navigator .next-bookmark").on("click", function (e) {
    e.preventDefault();
    clearSelectedAnnotation();
    let actualPid = $(this).attr("data-pid");
    scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(actualPid), {
      align: {
        top: 0.2
      }
    }, type => {
      scrollComplete(`bookmark navigator next-bookmark(${actualPid})`, type);
    });
    updateNavigator(actualPid, "next", type);
  });
  $(".bookmark-navigator .current-bookmark").on("click", function (e) {
    e.preventDefault();
    let actualPid = $(this).attr("data-pid");
    scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(actualPid), {
      align: {
        top: 0.2
      }
    }, type => {
      scrollComplete(`bookmark navigator current-bookmark(${actualPid})`, type);
    });
  });
  $(".bookmark-navigator .close-window").on("click", function (e) {
    e.preventDefault();
    clearSelectedAnnotation();
    $(".bookmark-navigator-wrapper").addClass("hide-bookmark-navigator");
    $(".transcript").removeClass("bookmark-navigator-active"); // remove paragraph highlight

    if (type === "topic") {
      $(".topic-navigator").unwrap();
      $(".topic-navigator").removeClass("topic-navigator"); //$(".topic-navigator").removeClass("topic-navigator navigator-highlight navigator-highlight-top navigator-highlight-bottom navigator-highlight-middle");
    } // bookmarks are disabled when the topic navigator is active
    // - enable bookmarks when the user is signed in and the
    //   topic navigator is being closed.


    if (type === "topic" && Object(_user_netlify__WEBPACK_IMPORTED_MODULE_9__["getUserInfo"])()) {
      Object(_bookmark__WEBPACK_IMPORTED_MODULE_6__["initBookmarkFeature"])(false, constants);
    }
  }); //highlights an annotation by wrapping it in a segment

  $(".bookmark-navigator").on("click", ".annotation-item", function (e) {
    e.preventDefault();
    let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_9__["getUserInfo"])(); // allow sharing to signed in users only 

    if (type === "topic") {
      if (!userInfo) return;
    }

    clearSelectedAnnotation();

    if (!userInfo) {
      userInfo = {
        userId: "xxx"
      };
    } //this is the annotation-id on the bookmark in the navigator


    let annotation_id = $(this).attr("data-aid");
    let aid;
    let dataRange = $(this).attr("data-range");
    let rangeArray = dataRange.split("/");
    let pid = rangeArray[0]; //get the aid from the highlight if it exists, won't exist for note level bookmark

    if (annotation_id !== "undefined") {
      aid = $(`[data-annotation-id='${annotation_id}']`).attr("data-aid");
      $(`[data-annotation-id="${aid}"]`).addClass("show");
    } else {
      //this is a note level bookmark, get aid from the pid
      aid = $(`#${pid} > span.pnum`).attr("data-aid");
    } // this can be null when using topic navigator


    if (!aid) {
      aid = $(this).attr("data-creationDate");
    }

    let url = `${location.origin}${location.pathname}?as=${pid}:${aid}:${userInfo.userId}`; // console.log("share url: %s", url);

    let numericRange = rangeArray.map(r => parseInt(r.substr(1), 10));
    let annotationRange = lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(numericRange[0], numericRange[1] + 1);
    let header;

    if (userInfo.userId === "xxx") {
      header = `
        <h4 class="ui header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("annotate:m11")}" class="red window close outline icon"></i>
          <div class="content">
            ${$(this).text()}
          </div>
        </h4>
      `;
    } else {
      header = _language_lang__WEBPACK_IMPORTED_MODULE_10__["__lang"]`
        <h4 class="ui header">
          <i title="${"action:fbshare"}" class="share-annotation facebook icon"></i>
          <i title="${"action:emailshare"}" class="share-annotation envelope outline icon"></i>
          <i data-clipboard-text="${url}" title="${"action:cp2clip"}" class="share-annotation linkify icon"></i>
          <div class="content">
            ${$(this).text()}
          </div>
        </h4>
      `;
    }

    for (let i = 0; i < annotationRange.length; i++) {
      $(`#p${annotationRange[i]}`).addClass("selected-annotation");
    }

    $(".selected-annotation").wrapAll("<div class='selected-annotation-wrapper ui raised segment'></div>");
    $(".selected-annotation-wrapper").prepend(header);

    if (userInfo.userId !== "xxx") {
      _clipboard__WEBPACK_IMPORTED_MODULE_8__["default"].register(".share-annotation.linkify");
    }
  }); //init click events for FB and email sharing

  initShareDialog("bookmark/navigator.js");
}
/*
  User clicked a bookmark link in the bookmark list modal.

  Initialize the bookmark navigator so they can follow the list of bookmarks
*/


function initNavigator(actualPid, constants) {
  teaching = constants;
  bookmarkManager(actualPid);
}
function initTopicNavigator(topicInfo, constants) {
  teaching = constants;
  bookmarkTopicManager(topicInfo, constants);
}

/***/ }),

/***/ "./src/js/modules/_bookmark/selection.js":
/*!***********************************************!*\
  !*** ./src/js/modules/_bookmark/selection.js ***!
  \***********************************************/
/*! exports provided: highlightSkippedAnnotations, updateSelectionTopicList, deleteNewSelection, deleteSelection, getSelection, updateHighlightColor, markSelection, updateSelectedText, highlight, initialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightSkippedAnnotations", function() { return highlightSkippedAnnotations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSelectionTopicList", function() { return updateSelectionTopicList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteNewSelection", function() { return deleteNewSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteSelection", function() { return deleteSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelection", function() { return getSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateHighlightColor", function() { return updateHighlightColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markSelection", function() { return markSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSelectedText", function() { return updateSelectedText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlight", function() { return highlight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
/* harmony import */ var _annotate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./annotate */ "./src/js/modules/_bookmark/annotate.js");
/* harmony import */ var lodash_isFinite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/isFinite */ "./node_modules/lodash/isFinite.js");
/* harmony import */ var lodash_isFinite__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_isFinite__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/difference */ "./node_modules/lodash/difference.js");
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_difference__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");



const textPosition = __webpack_require__(/*! dom-anchor-text-position */ "./node_modules/dom-anchor-text-position/index.js");

const textQuote = __webpack_require__(/*! dom-anchor-text-quote */ "./node_modules/dom-anchor-text-quote/index.js");

const wrapRange = __webpack_require__(/*! wrap-range-text */ "./node_modules/wrap-range-text/index.js"); //const uuid = require("uuid/v4");






 //all annotations on the page

let pageAnnotations = {}; //all annotations that were not highlighted due to shared annotation conflict

let skippedAnnotations = [];
function highlightSkippedAnnotations() {
  let sequence = 0;

  if (skippedAnnotations.length === 0) {
    return;
  }

  let node;

  for (let a of skippedAnnotations) {
    let annotation = pageAnnotations[a]; //console.log("annotation: %o", annotation);
    //all skipped annotations are on the same pid, so get id just once

    if (!node) {
      node = document.getElementById(annotation.pid);
    }

    highlight(annotation, node);
    updateHighlightColor(annotation.id, sequence);
    sequence += 1;
  }
}
/*
 * Add or remove topic classes to html for highlighted annotation
 * topics.
 */

function updateSelectionTopicList(annotation) {
  let topicList; //annotation has no selected text

  if (!annotation.aid) {
    return;
  } //if no topics and annotation has been updated, check if topic
  //classes exist, delete if so


  if (!annotation.topicList || annotation.topicList.length === 0) {
    //don't need to do anything for new annotations
    if (annotation.status === "new") {
      return;
    } //check for topic classes


    let existingClasses = $(`[data-annotation-id="${annotation.aid}"]`).attr("class");
    let classArray = existingClasses.split(" ");
    $(`[data-annotation-id="${annotation.aid}"]`).attr("class", `${classArray[0]} ${classArray[1]}`);
    return;
  } //convert annotation topics to a space delimited string


  topicList = annotation.topicList.reduce((result, topic) => {
    return `${result} ${topic.value}`;
  }, ""); //split topic string into an array

  topicList = topicList.trim();
  let topicListArray = topicList.split(" "); //get class attr for annotation and convert to an array

  let existingClasses = $(`[data-annotation-id="${annotation.aid}"]`).attr("class");
  let classArray = existingClasses.split(" "); //add first two classes of classArray to topicListArray, these are non topic classes

  if (classArray.length === 1) {
    topicListArray.unshift(classArray[0]);
  } else {
    topicListArray.unshift(classArray[1]);
    topicListArray.unshift(classArray[0]);
  } //create class list from topicListArray


  topicList = topicListArray.reduce((result, topic) => {
    return `${result} ${topic}`;
  }, ""); //update class list

  $(`[data-annotation-id="${annotation.aid}"]`).attr("class", topicList);
}
/*
  if the annotation is new then remove the highlight and
  delete from pageAnnotations
*/

function deleteNewSelection(id) {
  //no id when annotation has no associated text
  if (!id) {
    return;
  }

  let highlite = pageAnnotations[id]; //new highlite is not associated with a bookmark annotation so it doesn't have an 'aid' attribute

  if (highlite.aid) {
    return;
  } //remove highlight


  if (highlite.wrap) {
    highlite.wrap.unwrap();
  } else {} //console.log("deleteNewSelection: no wrap() in selection");
  //delete the annotation


  delete pageAnnotations[id];
}
/*
  unwrap selected text and delete
*/

function deleteSelection(id) {
  if (!id) {
    return;
  }

  let highlite = pageAnnotations[id];

  if (!highlite) {
    return;
  } //remove highlight


  if (highlite.wrap) {
    highlite.wrap.unwrap();
  } //delete the annotation


  delete pageAnnotations[id];
}
function getSelection(id) {
  return pageAnnotations[id];
}
function updateHighlightColor(id, sequence) {
  let colorClasses = ["colorClass1", "colorClass2", "colorClass3", "colorClass4", "colorClass5", "colorClass6"];
  $(`[data-annotation-id="${id}"]`).addClass(colorClasses[sequence % 6]);
}
/*
  Highlight selected text
  args:
    annotation: a bookmark annotation with selected text
    sequence: the sequence of this annotation within the paragraph
    sharePid: the pid of a shared bookmark, null otherwise. The pid is highlighted after
              the sharedPid is closed
*/

function markSelection(annotation, sequence = 0, sharePid = null) {
  let node = document.getElementById(annotation.pid);

  if (!sharePid || sharePid !== annotation.pid) {
    highlight(annotation, node);
    updateHighlightColor(annotation.id, sequence);
  } else if (sharePid) {
    //console.log("highlight of %s skipped due to share", sharePid);
    skippedAnnotations.push(annotation.id);
  }

  pageAnnotations[annotation.id] = annotation;
}
function updateSelectedText(id, aid) {
  $(`[data-annotation-id="${id}"]`).attr("data-aid", aid);
}
function highlight(annotation, toNode = document.body) {
  var anno_id = annotation.id;

  if (annotation.target.source) {
    var selectors = annotation.target.selector;

    for (var i = 0; i < selectors.length; i++) {
      var selector = selectors[i];
      var type = selector.type;

      switch (type) {
        case "TextPositionSelector":
          // skip existing marks
          var existing_marks = document.querySelectorAll(`[data-annotation-id="${anno_id}"]`);

          if (existing_marks.length === 0) {
            var mark = document.createElement("mark");
            mark.dataset["annotationId"] = anno_id; //the id of the bookmark annotation that contains this annotation

            if (annotation.aid) {
              mark.dataset["aid"] = annotation.aid;
            }

            mark.classList.add("bookmark-selected-text"); //this sometimes fails and is fixed by adjusting the selector

            var range;

            try {
              range = textPosition.toRange(toNode, selector);
              annotation.wrap = wrapRange(mark, range);
            } catch (err) {
              console.error("highlight catch bloc: err: %o", err);
              console.log("annotation: %o", annotation);
              return false;
              /*
              selector.end--;
              range = textPosition.toRange(toNode, selector);
              annotation.wrap = wrapRange(mark, range);
              */
            }
          }

          break;
      }
    }

    return true;
  }
}

function getSelectedText(range, fromNode = document.body) {
  if (range.collapsed) return null;
  var textPositionSelector = textPosition.fromRange(fromNode, range);
  Object.assign(textPositionSelector, {
    type: "TextPositionSelector"
  });
  var textQuoteSelector = textQuote.fromRange(fromNode, range);
  Object.assign(textQuoteSelector, {
    type: "TextQuoteSelector"
  });
  var selectedText = {
    type: "Annotation",
    title: $("#book-title").text(),
    url: location.pathname,
    pid: fromNode.id,
    //pid: range.startContainer.parentNode.id,
    id: Object(uuid__WEBPACK_IMPORTED_MODULE_2__["v4"])(),
    target: {
      type: "SpecificResource",
      source: location.href,
      selector: [textPositionSelector, textQuoteSelector]
    }
  };
  return selectedText;
}
/*
  Capture user text selection
*/


function initialize(constants) {
  $("div.transcript.ui").on("mouseup", function (e) {
    e.preventDefault(); //bookmarks enabled only for signed in users

    if (!Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])()) {
      return;
    } //ignore text selection when disabled by user or when annotation is 
    //being created


    if ($(this).hasClass("disable-selection")) {
      return;
    }

    if (document.getSelection().isCollapsed) {
      return;
    }

    let selObj = document.getSelection(); //Safari calls this function twice for each selection, the second time
    //rangeCount === 0 and type == "None"

    if (selObj.rangeCount === 0) {
      return;
    }

    if (selObj.getRangeAt(0).collapsed) {
      return;
    }

    processSelection(selObj);
  }); //init annotation input, edit, and delete

  Object(_annotate__WEBPACK_IMPORTED_MODULE_3__["initialize"])(constants);
}
/*
  create annotation from selected text
*/

function processSelection(selection) {
  let range = selection.getRangeAt(0); //new from user2

  if (range.commonAncestorContainer.nodeName === "DIV") {
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("error:e8")); //console.log("multi paragraph selection: start: %s, end: %s", rangeStart, rangeEnd);

    return;
  }

  if (range.startContainer.parentElement.localName === "span") {
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("error:e6")); //console.log("selection includes <p>");

    return;
  } //get the paragraph node for the range


  let pNode = range.startContainer;

  while (pNode.nodeName !== "P") {
    pNode = pNode.parentElement;
  } //let node = document.getElementById(rangeStart);
  //let node = document.getElementById(pNode.id);
  //create annotation


  let selectedText = getSelectedText(range, pNode);

  if (selectedText) {
    //check if selection contains any part of another selection
    let highlightedText = pNode.getElementsByTagName("mark");

    for (let ht of highlightedText) {
      if (selection.containsNode(ht, true)) {
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("error:e7")); //console.log("overlapping selections");

        return;
      }
    } //if highlight fails notify user and return without 
    //creating annotation


    if (!highlight(selectedText, pNode)) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Failed to highlight text. Try a shorter selection.");
      return;
    } //persist annotation


    pageAnnotations[selectedText.id] = selectedText;
    Object(_annotate__WEBPACK_IMPORTED_MODULE_3__["getUserInput"])(selectedText);
  }
}

/***/ }),

/***/ "./src/js/modules/_bookmark/shareByEmail.js":
/*!**************************************************!*\
  !*** ./src/js/modules/_bookmark/shareByEmail.js ***!
  \**************************************************/
/*! exports provided: initShareByEmail, shareByEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initShareByEmail", function() { return initShareByEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shareByEmail", function() { return shareByEmail; });
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/* harmony import */ var _ajax_share__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_ajax/share */ "./src/js/modules/_ajax/share.js");
/* harmony import */ var _util_sanitize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_util/sanitize */ "./src/js/modules/_util/sanitize.js");




 //teaching specific constants

let teaching = {};
let shareInfo = {};
/*
 * format message to wrap pargraphs in <p> tags
 */

function formatMessage(message) {
  message = message.replace(/\n/g, "@@");
  message = message.replace(/@@*/g, "@@");
  let mArray = message.split("@@");
  message = mArray.reduce((current, p) => {
    return `${current}<p>${Object(_util_sanitize__WEBPACK_IMPORTED_MODULE_4__["purify"])(p)}</p>`;
  }, "");
  return message;
}
/*
 * Format recipientArray into a string of email addresses and
 * a structure of recipient variables per Mailgun
 */


function formatRecipientInfo(recipientArray) {
  let addresses = [];
  let info = {};
  recipientArray.forEach(i => {
    let [email, first, last] = i.split(":");
    addresses.push(email);
    info[email] = {
      first: first === "" ? "No First Name" : first,
      last: last === "" ? "No Last Name" : last
    };
  });
  return {
    to: addresses.join(","),
    variables: JSON.stringify(info)
  };
} //load email list and setup submit and cancel listeners


function initShareByEmail(constants) {
  teaching = constants; //loadEmailList();
  //submit

  $("form[name='emailshare']").on("submit", async function (e) {
    e.preventDefault();
    const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])();

    if (!userInfo) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.warning(Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("annotate:m14"));
      $(".email-share-dialog-wrapper").addClass("hide");
      return;
    }

    let formData = $("#email-share-form").form("get values");

    if (formData.mailList.length === 0 && formData.emailAddresses.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("error:e9"));
      return;
    }

    shareInfo.to = "";

    if (formData.mailList.length > 0) {
      let info = formatRecipientInfo(formData.mailList);
      shareInfo.to = info.to;
      shareInfo.variables = info.variables;
    }

    if (formData.emailAddresses.length > 0) {
      if (shareInfo.to.length > 0) {
        shareInfo.to = `${shareInfo.to}, ${formData.emailAddresses}`;
      } else {
        shareInfo.to = formData.emailAddresses;
      }
    }

    shareInfo.senderName = userInfo.name;
    shareInfo.senderEmail = userInfo.email;
    shareInfo.sid = teaching.sid;

    if (formData.emailMessage) {
      shareInfo.message = formatMessage(formData.emailMessage);
    } //hide form


    $(".email-share-dialog-wrapper").addClass("hide");

    try {
      let result = await Object(_ajax_share__WEBPACK_IMPORTED_MODULE_3__["sendMail"])(shareInfo);

      if (result === "success") {
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("action:emailsent"));
      } else {
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(response.data.message);
      }
    } catch (err) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(err);
    }
  }); //cancel

  $("form[name='emailshare'] .email-share-cancel").on("click", function (e) {
    e.preventDefault(); //hide form

    $(".email-share-dialog-wrapper").addClass("hide");
  });
} //generate the option element of a select statement

function generateOption(item) {
  return `<option value="${item.address}:${item.first}:${item.last}">${item.first} ${item.last}</option>`;
}
/*
 * Call getString() with second arg 'true' so that it returns a promise. This was necessary
 * because the language file might not have been loaded when getString() was called.
 *
 * This is no longer necessary since we don't call this on page load anymore, just when the
 * user requests sharing by email. I didn't change the code to remove promises though, but I
 * could since they are no longer needed.
 */


function makeMaillistSelect(maillist) {
  return new Promise((resolve, reject) => {
    let listnames = Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("label:listnames", true);
    let selectaddress = Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("label:selectaddress", true);
    Promise.all([listnames, selectaddress]).then(resp => {
      resolve(`
        <label>${resp[0]}</label>
        <select name="mailList" id="maillist-address-list" multiple="" class="search ui dropdown">
          <option value="">${resp[1]}</option>
          ${maillist.map(item => `${generateOption(item)}`).join("")}
        </select>
      `);
    });
  });
}
/*
  Called by initShareByEmail()
  - load only when user signed in, fail silently, it's not an error

  NOTE: WE DON'T CALL THIS ANYMORE. THE CODE has been added to shareByEmail()
*/


async function loadEmailList() {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])();
  if (!userInfo) return;

  try {
    let mailList = await Object(_ajax_share__WEBPACK_IMPORTED_MODULE_3__["getMailList"])(userInfo.userId);
    let selectHtml = await makeMaillistSelect(mailList);
    $("#maillist-select").html(selectHtml);
    $("#maillist-address-list.dropdown").dropdown();
  } catch (err) {
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("error:e10")}: ${err}`);
  }
}
/*
 * Show mail list dialog when sharing by email. Load mail list if
 * not already loaded
*/


let mailListLoaded = false;
async function shareByEmail(quote, citation, url) {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])();
  shareInfo = {
    citation,
    quote,
    url
  };
  $(".hide.email-share-dialog-wrapper").removeClass("hide");

  if (!mailListLoaded) {
    try {
      $(".email-share-loader").addClass("active");
      let mailList = await Object(_ajax_share__WEBPACK_IMPORTED_MODULE_3__["getMailList"])(userInfo.userId);
      let selectHtml = await makeMaillistSelect(mailList);
      $("#maillist-select").html(selectHtml);
      $("#maillist-address-list.dropdown").dropdown();
      mailListLoaded = true;
      $(".email-share-loader").removeClass("active");
    } catch (err) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("error:e10")}: ${err}`);
    }
  }
}

/***/ }),

/***/ "./src/js/modules/_bookmark/start.js":
/*!*******************************************!*\
  !*** ./src/js/modules/_bookmark/start.js ***!
  \*******************************************/
/*! exports provided: bookmarkStart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bookmarkStart", function() { return bookmarkStart; });
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bookmark */ "./src/js/modules/_bookmark/bookmark.js");
/* harmony import */ var _shareByEmail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shareByEmail */ "./src/js/modules/_bookmark/shareByEmail.js");
/* harmony import */ var _share_share__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_share/share */ "./src/js/modules/_share/share.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ "./src/js/constants.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_config/config */ "./src/js/modules/_config/config.js");
/*
  Initialize bookmark modules
*/
//bookmark code common to all teachings


 //teaching specific 


 //export function bookmarkStart(pid) {

function bookmarkStart(page) {
  let pid;

  if (page === "transcript") {
    _share_share__WEBPACK_IMPORTED_MODULE_2__["default"].initialize(_constants__WEBPACK_IMPORTED_MODULE_3__["default"]).then(pid => {
      _bookmark__WEBPACK_IMPORTED_MODULE_0__["default"].initialize(pid, _constants__WEBPACK_IMPORTED_MODULE_3__["default"]);
    }); //get page info and set as heading under '?' menu option

    let key = _constants__WEBPACK_IMPORTED_MODULE_3__["default"].keyInfo.genPageKey();
    Object(_config_config__WEBPACK_IMPORTED_MODULE_4__["getPageInfo"])(key).then(info => {
      //console.log("pageInfo: %o", info);
      let title = `${info.source}<br/>${info.bookTitle}`;

      if (info.subTitle) {
        title = `${title}<br/>${info.subTitle}`;
      }

      title = `${title}<br/>${info.title}`;
      $("#transcript-page-info").html(title);
    });
  } else {
    _bookmark__WEBPACK_IMPORTED_MODULE_0__["default"].initialize(pid, _constants__WEBPACK_IMPORTED_MODULE_3__["default"]);
  }

  Object(_shareByEmail__WEBPACK_IMPORTED_MODULE_1__["initShareByEmail"])(_constants__WEBPACK_IMPORTED_MODULE_3__["default"]);
}

/***/ }),

/***/ "./src/js/modules/_bookmark/topics.js":
/*!********************************************!*\
  !*** ./src/js/modules/_bookmark/topics.js ***!
  \********************************************/
/*! exports provided: bookmarksLoaded, noMoreBookmarks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bookmarksLoaded", function() { return bookmarksLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noMoreBookmarks", function() { return noMoreBookmarks; });
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bookmark */ "./src/js/modules/_bookmark/bookmark.js");
/*
 * Keeps track of topics used by page annotations that have selectedText
 *
 * The list of topics is added to the bookmark menu option on transcript pages
 * and allows the user to show only highlighted text of the selected topic.
 *
 * When the user selects a topic, the class .topic-filter-active is added to .transcript
 * and the class .show is added to each highlight containing the selected topic. This works
 * because each highlight contains a class that corresponds to each topic the annotation 
 * contains.
*/


const uiPageTopicsModal = "#page-topics-modal";
const uiOpenPageTopicsModal = "#page-topics-modal-open";
const uiModalOpacity = 0.5; //generate the option element of a select statement

function generateOption(topic) {
  return `<option value="${topic.value}">${topic.topic}</option>`;
} //generate select html for Topics


function makeTopicSelect(topics) {
  return `
    <select name="pageTopicList" id="page-topics-topic-list" class="search ui dropdown">
      <option value="">Choose a topic</option>
      ${topics.map(topic => `${generateOption(topic)}`).join("")}
    </select>
  `;
}

function formatTopic(topic) {
  if (topic === "__reset__") {
    return `<div class='reset-filter item'>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:clearfilter")}</div>`;
  }

  return `<div class="item">${topic}</div>`;
}

function makeTopicSelectElement() {
  let topicMap = _bookmark__WEBPACK_IMPORTED_MODULE_1__["localStore"].getTopics();
  let topicKeys = Array.from(topicMap.keys());
  let topics = topicKeys.map(key => {
    return topicMap.get(key);
  });
  topics.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }

    if (a.value > b.value) {
      return 1;
    }

    return 0;
  });
  return makeTopicSelect(topics);
}

function getTopics() {
  return topics;
}
/*
  Generate html for page topic list and reset listRefreshNeeded indicator
*/


function makeTopicList() {
  let topicMap = _bookmark__WEBPACK_IMPORTED_MODULE_1__["localStore"].getTopics();
  let topicKeys = Array.from(topicMap.keys());
  let topics = topicKeys.map(key => {
    let t = topicMap.get(key);
    return t.topic;
  });
  _bookmark__WEBPACK_IMPORTED_MODULE_1__["localStore"].topicRefreshNeeded = false;

  if (topics.length === 0) {
    return `<div class='ntf item'>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("annotate:m15")}</div>`;
  }

  topics.sort();
  topics.unshift("__reset__");
  return `
    ${topics.map(topic => `${formatTopic(topic)}`).join("")}
  `;
} //topic selection click handler


function topicSelectHandler() {
  $("#topic-menu-item").on("click", "#topic-menu-select > .item", function (e) {
    e.preventDefault(); //class .ntf indicates there are no topics, so just return

    if ($(this).hasClass("ntf")) {
      return;
    }

    let active; //clear the topic filter

    if ($(this).hasClass("reset-filter")) {
      active = $("#topic-menu-select > .active.item"); //check for unexpected condition

      if (active.length === 0) {
        return;
      }

      let activeTopic = active.text();

      if (activeTopic === "Clear Filter") {
        //there is not active filter so return
        return;
      }

      active.removeClass("active"); //remove .show from previously selected highlights

      $(`mark.bookmark-selected-text.${activeTopic}`).removeClass("show"); //remove filter indication from .transcript

      $(".transcript").removeClass("topic-filter-active"); //reset header text

      $("#topic-menu-item").prev(".header").text(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:topicfilter")}: None`);
      $("#topic-menu-item").prev(".header").attr("data-filter", "none");
      return;
    } //filter already active


    if ($(this).hasClass("active")) {
      return;
    } //look for already active filter and remove it


    active = $("#topic-menu-select > .active.item");

    if (active.length > 0) {
      let activeTopic = active.text();
      active.removeClass("active"); //remove .show from previously selected highlights

      $(`mark.bookmark-selected-text.${activeTopic}`).removeClass("show");
    } //mark topic as active


    $(this).addClass("active"); //mark transcript as having an active filter

    $(".transcript").addClass("topic-filter-active"); //add class .show to each highlight containing the selected topic

    let topic = $(this).text(); //check for multi-word topic and remove spaces

    if (/ /.test(topic)) {
      topic = topic.replace(/ /g, "");
    }

    $(`mark.bookmark-selected-text.${topic}`).addClass("show"); //mark menu option as having an active filter

    $("#topic-menu-item").prev(".header").html(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:topicfilter")}: <span class="red">${topic}</span>`);
    $("#topic-menu-item").prev(".header").attr("data-filter", topic);
  });
}
/*
 * Initialize topics modal for filter topics on page
 */


let initialized = false;
function bookmarksLoaded() {
  if (!initialized) {
    initPageTopicsModal();
    initialized = true;
    return;
  }

  $("#bookmark-filter-wrapper").removeClass("hide");
}
/*
 * Hide topics modal, no mor topics on page
 */

function noMoreBookmarks() {
  $("#bookmark-filter-wrapper").addClass("hide");
}
/*
  Get topic select element for page-topic-modal
*/

function getTopicList() {
  if (!_bookmark__WEBPACK_IMPORTED_MODULE_1__["localStore"].topicRefreshNeeded) return;
  let selectHtml = makeTopicSelectElement();
  $("#page-topics-modal-topic-select").html(selectHtml);
  $("#page-topics-topic-list").dropdown();
  $("#page-topics-modal-loading").removeClass("active").addClass("disabled");
  _bookmark__WEBPACK_IMPORTED_MODULE_1__["localStore"].topicRefreshNeeded = false;
}
/*
 * Called by bookmark.js after bookmarks have been loaded on 
 * transcript page.
 */


function initPageTopicsModal() {
  //show topic filter options
  $("#bookmark-filter-wrapper").removeClass("hide"); //init topic filter modal dialog

  $(uiPageTopicsModal).modal({
    dimmerSettings: {
      opacity: uiModalOpacity
    },
    autofocus: false,
    centered: true,
    duration: 400,
    inverted: true,
    observeChanges: true,
    transition: "horizontal flip",
    onShow: function () {
      getTopicList();
    },
    onVisible: function () {},
    onHidden: function () {}
  });
  $(uiOpenPageTopicsModal).on("click", e => {
    e.preventDefault(); //populateBookmarkModal(uiBookmarkModalDiv);

    $(uiPageTopicsModal).modal("show");
  });
  filterSubmitHandler();
  filterResetHandler();
}
/*
  Apply topic filter to bookmarks on page
*/


function filterSubmitHandler() {
  $("#page-topics-filter-submit").on("click", function (e) {
    e.preventDefault();
    let form = $("#page-topics-filter-form");
    let filterTopic = form.form("get value", "pageTopicList");
    let topicTopic = $(`#page-topics-topic-list > [value='${filterTopic}']`).text();
    setTopicFilter({
      value: filterTopic,
      topic: topicTopic
    });
  });
}
/*
  Clear bookmark filter
*/


function filterResetHandler() {
  //clear filter
  $(".page-topics-filter-reset").on("click", function (e) {
    e.preventDefault(); //mark transcript as having an active filter

    if ($(".transcript").hasClass("topic-filter-active")) {
      //clear active filter
      let currentFilter = $("#current-topic-filter").attr("data-filter");
      $(`mark.bookmark-selected-text.${currentFilter}`).removeClass("show");
    }

    $(".transcript").removeClass("topic-filter-active");
    $("#page-topics-topic-list").dropdown("clear"); //clear active filter from menu

    $("#current-topic-filter").html(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:topicfilter")}: None`);
    $("#current-topic-filter").attr("data-filter", ""); //mark bookmark icon green - no filter applied

    $("#bookmark-dropdown-menu > span  i.bookmark-icon").eq(0).removeClass("yellow").addClass("green"); //close the modal
    //$(uiPageTopicsModal).modal("hide");
  });
}
/*
  Show selected text from bookmarks that contain topic. If there is an active filter
  already clear it first.

  Args: topic; show only bookmarks with this topic
*/


function setTopicFilter(topic) {
  //mark transcript as having an active filter
  if ($(".transcript").hasClass("topic-filter-active")) {
    //clear active filter
    let currentFilter = $("#current-topic-filter").attr("data-filter"); //new filter is the same as the current, no need to do anything

    if (currentFilter === topic.value) {
      return;
    }

    $(`mark.bookmark-selected-text.${currentFilter}`).removeClass("show");
  } else {
    $(".transcript").addClass("topic-filter-active");
  }

  $(`mark.bookmark-selected-text.${topic.value}`).addClass("show"); //mark menu option as having an active filter

  $("#current-topic-filter").html(`Topic Filter: <span class="red">${topic.topic}</span>`);
  $("#current-topic-filter").attr("data-filter", topic.value); //mark bookmark icon as yellow - filter is applied

  $("#bookmark-dropdown-menu > span i.bookmark-icon").eq(0).removeClass("green").addClass("yellow"); //close the modal

  $(uiPageTopicsModal).modal("hide");
}

/***/ }),

/***/ "./src/js/modules/_share/share.js":
/*!****************************************!*\
  !*** ./src/js/modules/_share/share.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_util/url */ "./src/js/modules/_util/url.js");
/* harmony import */ var _ajax_annotation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_ajax/annotation */ "./src/js/modules/_ajax/annotation.js");
/* harmony import */ var _bookmark_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_bookmark/selection */ "./src/js/modules/_bookmark/selection.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/range */ "./node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scroll-into-view */ "./node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_6__);
/*
  NOTE: When an annotation is shared and seen on a computer with bookmarks
        there could be a conflict between the users bookmarks and the shared
        bookmark. Not sure what to do in this case...

        An idea:
        Disable highlighting annotations on the paragraph of the shared annotation.

        Approach:
        Load all bookmarks except that of a shared annotation.
        Add a close button to the shared annotation
        When the close button is pressed then add the omitted bookmark

*/






 //const key = require("../_config/key");
//teaching specific constants

let teaching = {}; //persist shared annotation so it can be unwraped when closed

let sharedAnnotation;
/*
  check if user has bookmark that was not highlighted due to shared annotion and
  highlight the bookmarks annotations. This is called if there is a problem getting
  the requested bookmark and when the user closes the share raised segment
*/

function clearSharedAnnotation() {
  //unwrap shared annotation
  if (sharedAnnotation.selectedText) {
    sharedAnnotation.selectedText.wrap.unwrap();
  } //remove wrapper


  $("#shared-annotation-wrapper > .header").remove();
  $(".shared-selected-annotation").unwrap();
  $(".selected-annotation").removeClass("shared-selected-annotation");
  $(".bookmark-selected-text.shared").removeClass("shared"); //highlight user annotations that were skipped because they were on same paragraph as shared annotation

  Object(_bookmark_selection__WEBPACK_IMPORTED_MODULE_2__["highlightSkippedAnnotations"])();
}

function initCloseHandler() {
  $(".share-annotation-close").on("click", function (e) {
    e.preventDefault();
    clearSharedAnnotation();
  });
} //highlights an annotation by wrapping it in a segment


function wrapRange(annotation) {
  let rangeArray = [annotation.rangeStart, annotation.rangeEnd];
  let numericRange = rangeArray.map(r => parseInt(r.substr(1), 10));
  let annotationRange = lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(numericRange[0], numericRange[1] + 1); //${annotation.Comment?annotation.Comment:getString("annotate:m7")}

  let header = `
    <h4 class="ui header">
      <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_5__["getString"])("action:close")}" class="share-annotation-close small window close icon"></i>
      <div class="content">
        ${annotation.Comment ? annotation.Comment : ""}
      </div>
    </h4>
  `;

  for (let i = 0; i < annotationRange.length; i++) {
    $(`#p${annotationRange[i]}`).addClass("shared-selected-annotation");
  }

  $(".shared-selected-annotation").wrapAll("<div id='shared-annotation-wrapper' class='ui raised segment'></div>");
  $("#shared-annotation-wrapper").prepend(header); //scroll into view

  scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById("shared-annotation-wrapper"), {
    align: {
      top: 0.2
    }
  });
}
/**
  Display shared annotation requested by query parameter "as" ?as=pid:annotationId:userId. This
  is called when the user click 'To The Source' on a shared quote or FB post. The annotation
  could have been created by anyone.

  @returns {promise} pid - resolves to pid number when sharing requested, false otherwise
*/


function showAnnotation() {
  return new Promise(async (resolve, reject) => {
    let info = Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["showAnnotation"])();

    if (!info) {
      resolve(false);
      return;
    }

    let [pid, aid, uid] = decodeURIComponent(info).split(":"); //make sure pid exists

    if (!pid) {
      resolve(false);
      return;
    }

    if ($(`#${pid}`).length === 0) {
      resolve(false);
      return;
    }

    let paraKey = teaching.keyInfo.genParagraphKey(pid); //show loading indicator

    Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["loadStart"])();
    /*
      fetch shared bookmark and wrap it in a raised segment
      - if user has a bookmark in the same paragraph as the shared annotation, it will not be highlighted so
        if we fail to get the bookmark or can't find the shared annotation we need to highlight the users
        annotations for the paragraph before returning
    */

    try {
      const annotation = await Object(_ajax_annotation__WEBPACK_IMPORTED_MODULE_1__["getAnnotation"])(uid, paraKey, aid);

      if (!annotation.userId) {
        Object(_bookmark_selection__WEBPACK_IMPORTED_MODULE_2__["highlightSkippedAnnotations"])();
        Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["loadComplete"])();
        toastr__WEBPACK_IMPORTED_MODULE_6___default.a.warning("Requested Bookmark was not found");
        resolve(false);
        return;
      }

      let node = document.getElementById(annotation.rangeStart);

      if (annotation.selectedText) {
        Object(_bookmark_selection__WEBPACK_IMPORTED_MODULE_2__["highlight"])(annotation.selectedText, node);
      }

      $(`[data-aid="${aid}"]`).addClass("shared");
      wrapRange(annotation);
      sharedAnnotation = annotation;
      initCloseHandler();
      Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["loadComplete"])();
    } catch (err) {
      Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["loadComplete"])();
      console.error(err);
      resolve(false);
      return;
    }

    resolve(pid);
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function (constants) {
    teaching = constants;
    return showAnnotation();
  }
});

/***/ }),

/***/ "./src/js/modules/_util/sanitize.js":
/*!******************************************!*\
  !*** ./src/js/modules/_util/sanitize.js ***!
  \******************************************/
/*! exports provided: purify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "purify", function() { return purify; });
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_0__);

function purify(dirty) {
  return dompurify__WEBPACK_IMPORTED_MODULE_0___default.a.sanitize(dirty, {
    SAFE_FOR_JQUERY: true
  });
}

/***/ })

}]);
//# sourceMappingURL=profile~transcript.js.map