import notify from "toastr";
import {getNoteUrl as getUrl, getBookmarkText} from "./net";
import {getUserInfo} from "./netlify";
import intersectionWith from "lodash/intersectionWith";
import differenceWith from "lodash/differenceWith";
import uniqWith from "lodash/uniqWith";
import bmnet from "../_bookmark/bmnet";
import {getTopicList} from "../_db/topics";
import {getAnnotations} from "../_db/annotation";
import {deleteQuote, putQuote, getQuoteData} from "../_db/quotes";
import startCase from "lodash/startCase";

//Data for each source, sourceId, books, etc
import sourceInfo from "./source";

let bookmarks = {};
let topics = {};
let modified = {};

$("button.source-select").on("click", function(e) {
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

    showAll(sid);
  }
  if (classString.includes("bookmarks")) {
    loadBookmarksRequest(sid, this);
  }
});

function showAll(sid) {
  $("#sourceTable > tbody > tr").each(function() {
    $(this).removeClass("hide");
  });

  removeActions(sid);
}

/*
 * When a row is focused, the data can be operated on. We
 * display buttons at the bottom of the table for that.
 */
function collapseRequest(sid) {
  $("#sourceTable > tbody > tr").each(function() {
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
  $("#action-manager").removeClass("hide");
}

function removeActions(sid) {
  $("#action-manager").addClass("hide");
  $("#manageTopicsButton").attr("disabled", "");
  $("#displayBookmarksButtonNew").attr("disabled", "");
  $("#topicTable").addClass("hide");
}

function loadBookmarksRequest(sid, el) {
  console.log("Load annotations clicked");
  $(el).addClass("loading");

  loadData(sid).then((info) => {
    //console.log("loadData: %o", info);
    $(`#load-button-${sid}`).html(`Topics: ${info.topics}<br>Annotations: ${info.bookmarks}`);
    $(el).removeClass("loading");

    if (!$("#action-manager").hasClass("hide")) {
      setData(sid);
    }

  }).catch((err) => {
    $(el).removeClass("loading");
  });
}

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

/*
 * Load topics and bookmarks for arg: sid
 */
function loadData(sid) {
  let userInfo = getUserInfo();

  return new Promise((resolve, reject) => {

    let tList = getTopicList(userInfo.userId, sid).then((topicList) => {
      topics[sid] = topicList;
      notify.success(`${topics[sid].length} topics loaded`);
    }).catch((err) => {
      console.error("error fetching topicList: %s", err);
      notify.error(err);
      reject(err);
      return;
    });

    let bList = getAnnotations(userInfo.userId, sid).then((bmList) => {
      bookmarks[sid] = bmList;
      bookmarks[sid].forEach(i => {
        i.modified = false;
      });
      notify.success(`${bookmarks[sid].length} bookmarks loaded`);
    }).catch((err) => {
      console.error("error fetching bookmarks: %s", err);
      notify.error(err);
      reject(err);
      return;
    });

    Promise.all([tList, bList]).then(responses => {
      let info = {
        topics: topics[sid].length,
        bookmarks: bookmarks[sid].length
      }
      resolve(info);
    });
  });
}

function generateTopicTableData(sid) {
  return (`
    ${topics[sid].map((t,index) => `
      <tr data-sid="${sid}" data-index="${index}"> 
        <td class="edit-topic-item"><i class="pencil alternate icon"></i></td>
        <td class="delete-topic-item"><i class="trash alternate icon"></i></td>
        <td class="topic">${t.topic}</td>
      </tr>
    `).join("")}
  `);
}

/**
 * Create a topic from string. Topics are objects: {value: "", topic: ""}. The topic
 * attribute can contain spaces but the value cannot.
 *
 * @param {string} - newTopic
 * @returns {object} new topic
 */
function formatNewTopic(newTopic) {
  let topic = {};

  //only allow digits, alpha chars (including Polish chars) and comma's and spaces
  let topicStr = newTopic.replace(/[^a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ, ]/g, "");

  if (!topicStr || topicStr === "") {
    return topic
  }

  topicStr = topicStr.trim();
  topicStr = startCase(topicStr);

  if (/ /.test(topicStr)) {
    topic = {value: topicStr.replace(/ /g, ""), topic: topicStr};
  }
  else {
    topic = { value: topicStr, topic: topicStr};
  }

  return topic;
}

function initForm() {
//----------------------- new ----------------------------
  $("#topicSelectNew").dropdown();

  $("#manageTopicsButton").on("click", function(e) {
    let sid = $(this).attr("data-sid");
    if ($("#topicTable").hasClass("hide")) {
      let html = generateTopicTableData(sid);
      $("#topicTable > tbody").html(html);

      $("#topicTable").removeClass("hide");
    }
    else {
      $("#topicTable").addClass("hide");
    }
  });

  //edit topic
  $("#topicTable").on("click", "td.edit-topic-item", function(e) {
    let index = parseInt($(this).parent().attr("data-index"), 10);
    let sid = $(this).parent().attr("data-sid");

    $("#edit-topic-form").form("set values", {
      sid: sid,
      index: index,
      topic: topics[sid][index].topic,
      oldtopic: topics[sid][index].topic
    });
    $(".edit-topic-dialog-wrapper.hide").removeClass("hide");
  });

  //submit topic edit
  $("#update-topic-submit").on("click", function(e) {
    e.preventDefault();
    let form = $("#edit-topic-form").form("get values");
    let index = parseInt(form.index,10);

    if (form.topic === form.oldtopic) {
      $(".edit-topic-dialog-wrapper").addClass("hide");
      return;
    }

    //calculate new topic value, store changes, and apply topic to all related bookmarks
    let newTopic = formatNewTopic(form.topic);
    console.log("old Topic: %o, new Topic: %o", topics[form.sid][index], newTopic);

    //check if topic already exists
    let found = topics[form.sid].find((t)  => t.value === newTopic.value);
    if (found) {
      notify.info("That topic already exists.");
      return;
    }

    //close the edit topic form
    $(".edit-topic-dialog-wrapper").addClass("hide");
      
    //update topic array with new topic
    topics[form.sid][index] = newTopic;

    //update table with new topic
    $(`[data-sid='${form.sid}'][data-index='${form.index}'] > .topic`).text(newTopic.topic);

    //update bookmarks with new topic


  });

//----------------------- new end ----------------------------

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

  $("#getBookmarksButton").on("click", async function(e) {
    return;
    let userInfo = getUserInfo();
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
      try {
        let topicList = await getTopicList(userInfo.userId, topicManager.source);
        topics[topicManager.source] = topicList;

        let html = makeTopicSelect(topicList);
        $("#topic-list").html(html);
        $("#topicsLabel").text(`Topics (${topicList.length})`);
        notify.success(`${topics[topicManager.source].length} topics loaded`);

        $("#deleteTopicsButton").removeAttr("disabled");
        $("#renameTopicButton").removeAttr("disabled");
        $("#findFriendsButton").removeAttr("disabled");
        $("#displayBookmarksButton").removeAttr("disabled");
      }
      catch(err) {
        console.error("error fetching topicList: %s", err);
        notify.error(err);
      }
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
      try {
        let bmList = await getAnnotations(userInfo.userId, topicManager.source);
        bookmarks[topicManager.source] = bmList;

        $("#bookmarksLabel").text(`Bookmarks (${bookmarks[topicManager.source].length})`);
        notify.success(`${bookmarks[topicManager.source].length} bookmarks loaded`);

        $("#topic-manager").removeClass("loading");

        //add modified indicator, set to false
        bookmarks[topicManager.source].forEach(i => {
          i.modified = false;
        });
      }
      catch(err) {
        console.error("error fetching bookmarks: %s", err);
        notify.error(err);
      }
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
  $("#activity-report").on("click", "#quote-editor-form .quote-submit", async function(e) {
    e.stopPropagation();
    e.preventDefault();

    let info = $("#quote-editor-form").form("get values");
    let action = $(this).text().startsWith("Add") ? "Added" : "Updated";

    //let url = `${globals.quote}/quote`;
    let postBody = {
      userId: info.userId,
      paraKey: info.parakey,
      creationDate: info.annotationId,
      quote: {
        pid: info.pid,
        quote: info.quote,
        url: info.url,
        citation: info.citation
      }
    };

    removeQuoteEditor();
    clearQuoteEditorOpen();

    try {
      let response = await putQuote(postBody);
      notify.info(`Quote ${action}`);
      markAsInDB(info.parakey, info.annotationId);
    }
    catch(err) {
      console.error("error posting quote to db: %o", err);
      notify.error(err);
    }
  });

  //cancel button
  $("#activity-report").on("click", "#quote-editor-form .quote-cancel", function(e) {
    e.stopPropagation();
    e.preventDefault();

    removeQuoteEditor();
    clearQuoteEditorOpen();
  });

  //cancel button
  $("#activity-report").on("click", "#quote-editor-form .quote-delete", async function(e) {
    e.stopPropagation();
    e.preventDefault();

    let info = $("#quote-editor-form").form("get values");

    try {
      let response = await deleteQuote(info.userId, info.parakey, info.annotationId);
      notify.info("Quote deleted from database");
      markAsNotInDB(info.parakey, info.annotationId);
    }
    catch(err) {
      notify.error(`failed to delete quote: ${err.message}`); 
    }

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

async function initQuoteForm(info) {
  let form = $("#quote-editor-form");
  //let url = `${globals.quote}/quotedata/${info.userId}/${info.parakey}:${info.annotationId}`;

  $("#quote-editor-form").addClass("loading");
  try {
    let response = await getQuoteData(info.userId, info.parakey, info.annotationId);
    if (response.q) {
      info.database = response.q.quote;
      $("#quote-editor-form .quote-delete").removeClass("disabled");
      $("#quote-editor-form button.quote-submit").text("Update Quote");
      markAsInDB(info.parakey, info.annotationId, false);
    }
    $("#quote-editor-form").removeClass("loading");
    form.form("set values", info);
  }
  catch(err) {
    notify.error(err);
    console.log("Error getting quote from database: %w", err);
  }
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
  if (topics.length === 0) {
    return matches;
  }

  bookmarks[source].forEach((bmark) => {
    if (bmark.annotation.topicList && bmark.annotation.topicList.length > 0) {
      let index;
      let findCount = 0;
      topics.forEach(t => {
        index = bmark.annotation.topicList.findIndex(bt => {
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
        matches.push({id: bmark.paraKey, bookmark: bmark.annotation});
      }
    }
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
  let b = bookmarks[sourceId].find(i => {
    if (i.paraKey === parakey && i.creationDate === annotationId) {
      return true;
    }
    return false;
  });

  if (b) {
    b.modified = true;
    b.quote = state;
  }
  else {
    notify.error("markQuotedState(): paragraph not found");
    console.error("parakey: %s, annotationId: %s", parakey, annotationId);
    return;
  }
  
  /*
  let bookmark = b.bookmark.find((bmkark) => {
    if (bmkark.creationDate === annotationId) {
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
  */
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

