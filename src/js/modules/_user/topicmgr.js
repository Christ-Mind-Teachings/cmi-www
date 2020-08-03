import notify from "toastr";
import axios from "axios";
import {getNoteUrl as getUrl, getBookmarkText, getTopics, getBookmarks} from "./net";
import {getUserInfo} from "./netlify";
import intersectionWith from "lodash/intersectionWith";
import differenceWith from "lodash/differenceWith";
import uniqWith from "lodash/uniqWith";
import globals from "../../globals";
import bmnet from "../_bookmark/bmnet";

let sourceInfo = {
  title: {
    "10": "The Way of Mastery",
    "16": "Polish Way of Mastery",
    "11": "The Impersonal Life",
    "12": "ACIM Sparkley Edition",
    "13": "The Raj Material",
    "14": "A Course Of Love",
    "15": "ACIM Original Edition"
  },
  "0": [
    {
      "value": "*",
      "name": "-- Select Source --"
    }
  ],
  "12": [
    {
      "value": "*",
      "name": "All Books"
    },
    {
      "value": "122",
      "name": "Text"
    },
    {
      "value": "123",
      "name": "Workbook for Students"
    },
    {
      "value": "124",
      "name": "Manual for Teachers"
    },
    {
      "value": "121",
      "name": "Preface"
    }
  ],
  "15": [
    {
      "value": "*",
      "name": "All Books"
    },
    {
      "value": "151",
      "name": "Text"
    },
    {
      "value": "152",
      "name": "Workbook for Students"
    },
    {
      "value": "153",
      "name": "Manual for Teachers"
    }
  ],
  "14": [
    {
      "value": "*",
      "name": "All Books"
    },
    {
      "value": "1404",
      "name": "The Course"
    },
    {
      "value": "1402",
      "name": "The Treatises"
    },
    {
      "value": "1403",
      "name": "The Dialogues"
    }
  ],
  "11": [
    {
      "value": "*",
      "name": "All Books"
    }
  ],
  "13": [
    {
      "value": "*",
      "name": "All Books"
    },
    {
      "value": "1301",
      "name": "You Are the Answer"
    },
    {
      "value": "1302",
      "name": "Graduation"
    },
    {
      "value": "1303",
      "name": "ACIM Study Group 2002"
    },
    {
      "value": "1304",
      "name": "ACIM Study Group 2003"
    },
    {
      "value": "1305",
      "name": "ACIM Study Group 2004"
    },
    {
      "value": "1306",
      "name": "ACIM Study Group 2005"
    },
    {
      "value": "1307",
      "name": "ACIM Study Group 2006"
    },
    {
      "value": "1308",
      "name": "ACIM Study Group 2007"
    },
    {
      "value": "1309",
      "name": "ACIM Study Group 2008"
    },
    {
      "value": "1310",
      "name": "ACIM Study Group 2009"
    },
    {
      "value": "1311",
      "name": "ACIM Study Group 2010"
    },
    {
      "value": "1312",
      "name": "ACIM Study Group 2011"
    },
    {
      "value": "1313",
      "name": "ACIM Study Group 2012"
    },
    {
      "value": "1314",
      "name": "ACIM Study Group 2013"
    },
    {
      "value": "1315",
      "name": "ACIM Study Group 2014"
    },
    {
      "value": "1316",
      "name": "ACIM Study Group 2015"
    },
    {
      "value": "1317",
      "name": "ACIM Study Group 2016"
    },
    {
      "value": "1318",
      "name": "ACIM Study Group 2017"
    },
    {
      "value": "1319",
      "name": "ACIM Study Group 2018"
    }
  ],
  "10": [
    {
      "value": "*",
      "name": "All Books"
    },
    {
      "value": "101",
      "name": "The Jeshua Letters"
    },
    {
      "value": "102",
      "name": "The Way of the Servant"
    },
    {
      "value": "103",
      "name": "The Early Years"
    },
    {
      "value": "104",
      "name": "The Way of the Heart"
    },
    {
      "value": "105",
      "name": "The Way of Transformation"
    },
    {
      "value": "106",
      "name": "The Way of Knowing"
    }
  ],
  "16": [
    {
      "value": "*",
      "name": "All Books"
    },
    {
      "value": "1601",
      "name": "The Jeshua Letters"
    },
    {
      "value": "1602",
      "name": "The Way of the Servant"
    },
    {
      "value": "1606",
      "name": "The Early Years"
    },
    {
      "value": "1603",
      "name": "The Way of the Heart"
    },
    {
      "value": "1604",
      "name": "The Way of Transformation"
    },
    {
      "value": "1605",
      "name": "The Way of Knowing"
    }
  ]
};

let bookmarks = {};
let topics = {};
let modified = {};

function generateTopicList(topics) {
  return (`
    <div class="ui list">
      ${topics.map((t) => `
        <div class="item">
          ${t.topic}
        </div>
      `).join("")}
    </div>
  `);
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
    ${listArray.map((item) => `
      <div class="item">
        <em>${flat?item:item.topic}</em>
      </div>
    `).join("")}
  `;
}

function generateContent(content) {
  return (`
    ${content.map((p) => `
      <p>
        ${p.text}
      </p>
    `).join("")}
  `);
}

function generateSection(bm) {
  return (`
    <div class="ui vertical segment">
      <div class="ui small header bookmark-header">
        <a id="${bm.bookmark.creationDate}" target="_blank" href="${bm.mgr.url}?v=${bm.mgr.pid}&key=${bm.id}">${bm.mgr.title?bm.mgr.title:bm.mgr.url}</a>
        <br/>
        <div class="ui horizontal bulleted link list">
          ${generateHorizontalList(bm.bookmark.topicList)}
        </div>
        ${bm.mgr.comment?"<br/>":""}
        ${bm.mgr.comment?bm.mgr.comment:""}
      </div>
      ${generateContent(bm.mgr.content)}
      <p ${bm.mgr.type !== "note"?`class='cmi-manage-quote ${bm.bookmark.quote?"in-database":""} ${bm.bookmark.creationDate}'`:""}>
        ~${bm.id}${bm.mgr.type === "note"?"":`:${bm.bookmark.creationDate}:${bm.bookmark.rangeStart}`}
      </p>
    </div>
  `);
}

function generateBookmarkTextHtml(bookmarks, topicManager) {
  return (`
    <p>
      <button class="hide-headers ui primary button">Hide Headers</button>
    </p>
    <p>
      ${sourceInfo.title[topicManager.source]}<br/>
      ${bookmarks.length} Bookmarks include topics: <em>${topicManager.topicArray.join(" / ")}</em> <br/>
      ${new Date().toLocaleString()}
    </p>
    ${bookmarks.map(bookmark => `${generateSection(bookmark)}`).join("")}
  `);
}

function generateBookmarkText(bookmarks, topicManager) {
  let promises = getBookmarkText(bookmarks);

  Promise.all(promises).then(responses => {
    //console.log("promise.all: %o", responses);
    let html = generateBookmarkTextHtml(responses, topicManager);
    $("#activity-report").html(html);
  });
}

function makeTopicSelect(topics) {
  return (`
    ${topics.map(topic => `<div class="item ${topic.deleted?" deleted":""}" data-value="${topic.deleted?"*":""}${topic.value}">${topic.deleted?"*":""}${topic.topic}</div>`).join("")}
  `);
}

function makeBookSelectNew(books) {
  return (`
    ${books.map(book => `<option value="${book.value}">${book.name}</option>`).join("")}
  `);
}

function getFormData() {
  return $("#topic-manager").form("get values");
}

function initForm() {
  $("#source-list").dropdown();
  $("#book-list1.dropdown").dropdown();
  $("#topicSelect").dropdown();

  $("#activity-report").on("click", ".hide-headers", function(e) {
    if ($(this).hasClass("hide")) {
      $(this).removeClass("hide").html("Hide Headers");
      $("#activity-report .bookmark-header").removeClass("hide");
    }
    else {
      $(this).addClass("hide").html("Show Headers");
      $("#activity-report .bookmark-header").addClass("hide");
    }
  });

  //delete confirmation modal
  $("#confirmDelete").modal({
    closable  : false,
    onDeny    : function() {
      notify.info("Delete Canceled.");
      //$("#topicSelect").dropdown("clear");
    },
    onApprove : function() {
      let topicManager = getFormData();
      let deleted = filterTopics(topicManager.topicList);

      //clear selected topics
      $("#topicSelect").dropdown("clear");
      if (deleted.length === 0) {
        notify.info("No topic(s) selected.");
        return;
      }

      //mark topics as deleted
      markTopicsDeleted(topicManager.source, deleted);

      //find bookmarks with deleted topics
      let bookmarksWithDeletedTopics = getBookmarksByTopic(topicManager.source, deleted);
      //console.log("matches: %o", bookmarksWithDeletedTopics);

      //remove deleted topics from bookmarks
      if (bookmarksWithDeletedTopics.length > 0) {
        deleteBookmarkTopics(topicManager.source, bookmarksWithDeletedTopics, deleted);
      }

      //update topics select control
      let html = makeTopicSelect(topics[topicManager.source]);
      $("#topic-list").html(html);

      notify.success("Topics Deleted.");
    }
  });

  $("#source-list").on("change", function() {
    let topicManager = getFormData();

    //clear topic list
    $("#topicsLabel").text("Topics (0)");

    //let sourceId = e.target.selectedOptions[0].value;
    let sourceId = topicManager.source;

    let html = makeBookSelectNew(sourceInfo[sourceId]);
    $("#book-list1").html(html);

    //clear activity report
    clearActivityReport();

    //enable Get Bookmarks button
    $("#getBookmarksButton").removeAttr("disabled");

    //disable buttons until topics have been loaded
    $("#deleteTopicsButton").attr("disabled","");
    $("#renameTopicButton").attr("disabled","");
    $("#findFriendsButton").attr("disabled","");
    $("#displayBookmarksButton").attr("disabled","");

    $("#bookmarksLabel").text("Bookmarks (0)");

    //clear topic dropdown
    if ($("#topic-list > div").length > 0) {
      $("#topic-list").html("");
      $("#topicSelect").dropdown("clear");
      $("#topicsLabel").text("Topics (0)");
    }
  });

  $("#getBookmarksButton").on("click", function(e) {
    let topicManager = getFormData();

    if (topicManager.source === "0") {
      notify.info("To start, first select a source");
      return;
    }

    //disable button until source is changed
    $("#getBookmarksButton").attr("disabled","");

    $("#topic-manager").addClass("loading");

    //get topics for source
    if (!topics[topicManager.source]) {
      getTopics(userInfo.userId, topicManager.source).then(response => {
        topics[topicManager.source] = response.data.topics;

        //add "All Topics" topic
        topics[topicManager.source].unshift({value: "<>", topic: "< All Topics >"});

        let html = makeTopicSelect(response.data.topics);
        $("#topic-list").html(html);
        $("#topicsLabel").text(`Topics (${response.data.topics.length})`);
        notify.success(`${topics[topicManager.source].length} topics loaded`);

        $("#deleteTopicsButton").removeAttr("disabled");
        $("#renameTopicButton").removeAttr("disabled");
        $("#findFriendsButton").removeAttr("disabled");
        $("#displayBookmarksButton").removeAttr("disabled");
      });
    }
    else {
      let html = makeTopicSelect(topics[topicManager.source]);
      $("#topic-list").html(html);
      $("#topicsLabel").text(`Topics (${topics[topicManager.source].length})`);
      notify.success(`${topics[topicManager.source].length} topics loaded`);

      $("#deleteTopicsButton").removeAttr("disabled");
      $("#renameTopicButton").removeAttr("disabled");
      $("#findFriendsButton").removeAttr("disabled");
      $("#displayBookmarksButton").removeAttr("disabled");
    }

    //get bookmarks for source
    if (!bookmarks[topicManager.source]) {
      getBookmarks(userInfo.userId, topicManager.source).then(response => {
        bookmarks[topicManager.source] = response.data.response;
        $("#bookmarksLabel").text(`Bookmarks (${bookmarks[topicManager.source].length})`);
        notify.success(`${bookmarks[topicManager.source].length} bookmarks loaded`);

        $("#topic-manager").removeClass("loading");

        //add modified indicator, set to false
        bookmarks[topicManager.source].forEach(i => {
          i.modified = false;
        });
      });
    }
    else {
      $("#topic-manager").removeClass("loading");
      $("#bookmarksLabel").text(`Bookmarks (${bookmarks[topicManager.source].length})`);
      notify.success(`${bookmarks[topicManager.source].length} bookmarks loaded`);
    }
  });

  $("#deleteTopicsButton").on("click", function() {
    let topicManager = getFormData();

    let deleted = filterTopics(topicManager.topicList);
    if (deleted.length === 0) {
      $("#topicSelect").dropdown("clear");
      notify.info("No topic(s) selected.");
      return;
    }

    $("#topicsToDelete").html(`<em>${topicManager.topicList}</em>`);
    $("#confirmDelete").modal("show");
  });

  /*
   * Not yet implemented
   */
  $("#renameTopicButton").on("click", function() {
    let topicManager = getFormData();

    if (topicManager.topicList.length === 0) {
      notify.info("Select topic to be renamed.");
      return;
    }

    if (topicManager.topicList.length > 1) {
      notify.info("Select only ONE topic to be renamed.");
      return;
    }
  });

  $("#findFriendsButton").on("click", function() {
    let topicManager = getFormData();
    let topicArray = filterTopics(topicManager.topicList);

    //don't all the 'All Topics' topic
    topicArray = topicArray.filter(t => {
      if (t === "<>") {
        return false;
      }
      return true;
    });

    if (topicArray.length === 0) {
      notify.info("Select at least one topic.");
      return;
    }

    //find bookmarks containing selected topics
    let matches = findMatches(topicManager.source, topicManager.book, topicArray);

    //get topics from matches but don't include those in topicArray
    let friends = [];
    matches.forEach((bm) => {
      let diff = differenceWith(bm.bookmark.topicList, topicArray, (v1, v2) => {
        if (v1.value === v2) {
          return true;
        }
        return false;
      });
      friends = friends.concat(diff);
    });

    //remove duplicates
    friends = uniqWith(friends, (v1, v2) => {
      if (v1.value === v2.value) {
        return true;
      }
      return false;
    });

    //sort
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

  $("#displayBookmarksButton").on("click", function() {
    let topicManager = getFormData();
    let topicArray = filterTopics(topicManager.topicList);

    if (topicArray.length === 0) {
      notify.info("Select at least one topic.");
      return;
    }

    let matches = findMatches(topicManager.source, topicManager.book, topicArray);

    if (matches.length === 0) {
      notify.info("No bookmarks contain selected topics");
      clearActivityReport();
      return;
    }

    //generated html
    topicManager.topicArray = topicArray;
    generateBookmarkText(matches, topicManager);

  });

  /*
   * Write changes to database
   */
  $("#applyChangesButton").on("click", function() {
    let modified = getModifiedBookmarks();
    //console.log("modified: %o", modified);

    //update database
    modified.forEach(m => {
      delete m.annotation.modified;
      bmnet.postAnnotation(m.annotation, m.key, false);
    });

    clearModified();
    notify.success("Modifications Saved");
  });
}

function initManageQuoteEventHandler() {

  /*
   * Open quote editor, query database for quote and populate
   * editor when found. Allow user to update, delete, or add
   * quote to database
   */
  $("#activity-report").on("click", ".cmi-manage-quote", function(e) {
    e.stopPropagation();
    e.preventDefault();

    let userInfo = getUserInfo();
    if (!userInfo) {
      return;
    }

    /*
    if (!userInfo.roles.includes("quote-manager")) {
      console.log("not quote-manager");
      return;
    }
    */

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
    quoteInfo.url = getUrl(parakey); 
    quoteInfo.citation = $(`#${annotationId}`).text().trim();

    //console.log("quoteInfo: %o", quoteInfo);

    //open quote editor, query from database and populate form,
    //allow user to edit, delete or cancel
    $(this).append(getQuoteForm());
    initQuoteForm(quoteInfo);
  });

  //submit button
  $("#activity-report").on("click", "#quote-editor-form .quote-submit", function(e) {
    e.stopPropagation();
    e.preventDefault();

    let info = $("#quote-editor-form").form("get values");
    let action = $(this).text().startsWith("Add") ? "Added" : "Updated";

    let url = `${globals.quote}/quote`;
    let postBody = {
      userId: info.userId,
      quoteId: `${info.parakey}:${info.annotationId}`,
      pid: info.pid,
      quote: info.quote,
      url: info.url,
      citation: info.citation
    };

    removeQuoteEditor();
    clearQuoteEditorOpen();

    axios.post(url, postBody).then((resp) => {
      notify.info(`Quote ${action}`);
      markAsInDB(info.parakey, info.annotationId);
    });
  });

  //cancel button
  $("#activity-report").on("click", "#quote-editor-form .quote-cancel", function(e) {
    e.stopPropagation();
    e.preventDefault();

    removeQuoteEditor();
    clearQuoteEditorOpen();
  });

  //cancel button
  $("#activity-report").on("click", "#quote-editor-form .quote-delete", function(e) {
    e.stopPropagation();
    e.preventDefault();

    let info = $("#quote-editor-form").form("get values");
    let url = `${globals.quote}/quote/${info.userId}/${info.parakey}:${info.annotationId}`;

    axios.delete(url).then((response) => {
      notify.info("Quote deleted from database");
      markAsNotInDB(info.parakey, info.annotationId);
    })
    .catch((error) => {
      notify.error(`failed to delete quote: ${error.message}`); 
    });

    removeQuoteEditor();
    clearQuoteEditorOpen();
  });
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
function markAsInDB(key, aid, modified = true) {
  let sourceId = key.substring(0,2);

  if (modified) {
    markModified(sourceId, key);
    markQuotedState(key, aid, true);
  }

  $(`.${aid}`).addClass("in-database");
}

/*
 * Indicate bookmark is not in the quote db and
 * mark as modified
 */
function markAsNotInDB(key, aid) {
  let sourceId = key.substring(0,2);

  markModified(sourceId, key);
  markQuotedState(key, aid, false);
  $(`.${aid}`).removeClass("in-database");
}

function initQuoteForm(info) {
  let form = $("#quote-editor-form");
  let url = `${globals.quote}/quotedata/${info.userId}/${info.parakey}:${info.annotationId}`;

  $("#quote-editor-form").addClass("loading");
  axios.get(url).then((response) => {
    //console.log("query resp: %o", response);
    if (response.data.quote) {
      info.database = response.data.quote.quote;

      //quote is in db so allow user to delete it
      $("#quote-editor-form .quote-delete").removeClass("disabled");
      $("#quote-editor-form button.quote-submit").text("Update Quote");
      markAsInDB(info.parakey, info.annotationId, false);
    }
    $("#quote-editor-form").removeClass("loading");
    form.form("set values", info);
  }).catch((error) => {
    $("#quote-editor-form").removeClass("loading");
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
  }

  //filter matched bookmarks if user restricted by book
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
        topic.deleted = true;
        //console.log("deleted topic: %o", topic);
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
  }

  //return all bookmarks
  if (topics.includes("<>")) {
    wildcard = true;
  }

  bookmarks[source].forEach((item) => {
    item.bookmark.forEach((bmark) => {
      if (wildcard) {
        matches.push({id: item.id, bookmark: bmark});
      }
      else {
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
            matches.push({id: item.id, bookmark: bmark});
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
  bookmarks[source].forEach((item) => {
    item.bookmark.forEach((bmark) => {
      let intersection;
      if (bmark.topicList) {
        intersection = intersectionWith(topics, bmark.topicList, function(t, bt) {
          if (t === bt.value) {
            return true;
          }
          return false;
        });
        if (intersection.length > 0) {
          matches.push({id: item.id, bookmark: bmark});
        }
      }
    });
  });
  return matches;
}

/*
 * Find modified bookmarks
 * - sources with modified bookmarks are in the global modified array,
 * - paragraphs with modified bookmarks are marked modified: true
 * - annotations in paragraphs are marked modified: true
 */
function getModifiedBookmarks() {
  let matches = [];
  let modifiedSources = Object.keys(modified);

  modifiedSources.forEach(sid => {
    //gather paragraphs with modified annotations
    let modifiedParagraphs = bookmarks[sid].filter(para => {
      return para.modified;
    });

    modifiedParagraphs.forEach(p => {
      let modifiedAnnotations = p.bookmark.filter(a => {
        return a.modified;
      });

      modifiedAnnotations.forEach(e => {
        matches.push({sid: sid, key: p.id, annotation: e}); 
      });
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
      let topicListCount = item.bookmark.topicList.length;
      //mark topics deleted
      item.bookmark.topicList.forEach(t => {
        if (topics.includes(t.value)) {
          t.deleted = true;
        }
      });
      //make a deletedTopicList on the annotation for topics marked deleted
      // as history
      item.bookmark.deletedTopicList = item.bookmark.topicList.filter(t => {
        if (t.deleted) {
          return true;
        }
        return false;
      });
      //filter topics marked deleted from topicList
      item.bookmark.topicList = item.bookmark.topicList.filter(t => {
        if (!t.deleted) {
          return true;
        }
        delete t.deleted;
        return false;
      });

      //check if there has been a change
      if (topicListCount !== item.bookmark.topicList.length) {
        //mark annotation as modified
        item.bookmark.modified = true;
      }
    }
    markModified(sourceId, item.id);
  });
}

/*
 * Mark bookmark paragraph as modified
 */
function markModified(sourceId, bookmarkId) {
  let bkmrkId = bookmarkId;
  if (typeof bookmarkId === "string") {
    bkmrkId = parseFloat(bookmarkId);
  }

  let b = bookmarks[sourceId].find(i => {
    if (i.id === bkmrkId) {
      return true;
    }
    return false;
  });

  if (b) {
    b.modified = true;
    markSourceModified(sourceId);
    $("#applyChangesButton").removeAttr("disabled");
  }
}

function markSourceModified(sid) {
  if (!modified[sid]) {
    modified[sid] = {modified: true};
  }
}

function clearModified() {
  let modifiedSources = Object.keys(modified);

  modifiedSources.forEach(sid => {
    bookmarks[sid].forEach(para => {
      delete para.modified;
    });
  });

  //clear modified object
  modified = {};

  $("#applyChangesButton").attr("disabled", "");
}

function markQuotedState(parakey, annotationId, state) {
  let sourceId = parakey.substring(0,2);
  let numericKey = parseFloat(parakey);
  let naid = parseInt(annotationId, 10);
  let b = bookmarks[sourceId].find(i => {
    if (i.id === numericKey) {
      return true;
    }
    return false;
  });

  if (b) {
    b.modified = true;
  }
  else {
    notify.error("markQuotedState(): paragraph not found");
    console.error("parakey: %s, annotationId: %s", parakey, annotationId);
    return;
  }
  
  let bookmark = b.bookmark.find((bmkark) => {
    if (bmkark.creationDate === naid) {
      return true;
    }
    return false;
  });

  //mark annotation as in quote databas and as modified
  if (bookmark) {
    bookmark.quote = state;
    bookmark.modified = true;
    //console.log("bookmark: %o", bookmark);
  }
  else {
    notify.error("markQuotedState(): bookmark not found");
    console.error("parakey: %s, annotationId: %s", parakey, annotationId);
  }
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
    let unsavedChanges = $("#applyChangesButton").attr("disabled") !== "disabled";
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

export function initializeTopicManager() {
  let userInfo = getUserInfo();

  if (!userInfo) {
    notify.warning("You must be signed in to edit your email list");
    setTimeout(() => {
      location.href = "/";
    }, 3 * 1000);
    return;
  }

  initForm();
  initManageQuoteEventHandler();
  checkForUnsavedChanges();
}

