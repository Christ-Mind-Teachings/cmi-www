import notify from "toastr";
import {getBookmarkText, getUrlByPageKey} from "../_util/cmi";
import {getUserInfo} from "./netlify";
import {getTopicList, putTopicList} from "../_ajax/topics";
import {getAnnotations, updateAnnotation} from "../_ajax/annotation";
import {deleteQuote, putQuote, getQuoteData} from "../_ajax/quotes";
import startCase from "lodash/startCase";
import {purify} from "../_util/sanitize";

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

  loadData(sid).then((info) => {
    $(`#load-button-${sid}`).html(`Topics: ${info.topics}<br>Annotations: ${info.bookmarks}`);
    $(el).removeClass("loading");

    if (!$("#action-manager").hasClass("hide")) {
      setData(sid);
    }

  }).catch((err) => {
    $(el).removeClass("loading");
  });
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
    <div class="ui vertical segment bookmark-segment ${bm.mgr.type}">
      <div class="ui small header bookmark-header">
        <a id="${bm.annotation.creationDate}" target="_blank" href="${bm.mgr.url}?v=${bm.mgr.pid}&key=${bm.paraKey}">${bm.mgr.title?bm.mgr.title:bm.mgr.url}</a>
        <br/>
        <div class="ui horizontal bulleted link list">
          ${generateHorizontalList(bm.annotation.topicList)}
        </div>
        ${bm.mgr.comment?"<br/>":""}
        ${bm.mgr.comment?bm.mgr.comment:""}
      </div>
      ${generateContent(bm.mgr.content)}
      <p ${bm.mgr.type !== "note"?`class='cmi-manage-quote ${bm.annotation.quote?"in-database":""} ${bm.annotation.creationDate}'`:""}>
        ~${bm.paraKey}${bm.mgr.type === "note"?"":`:${bm.annotation.creationDate}:${bm.annotation.rangeStart}`}
      </p>
    </div>
  `);
}

function generateBookmarkTextHtml(bookmarks, topicManager) {
  return (`
    <p>
      ${topicManager.source}<br/>
      ${bookmarks.length} Bookmarks include topics: <em>${topicManager.topicArray.join(` ${topicManager.condition} `)}</em> <br/>
      ${new Date().toLocaleString()}
    </p>
    ${bookmarks.map(bookmark => `${generateSection(bookmark)}`).join("")}
  `);
}

function generateBookmarkText(bookmarks, topicManager) {
  let promises = getBookmarkText(bookmarks);

  Promise.all(promises).then(responses => {
    let html = generateBookmarkTextHtml(responses, topicManager);
    $("#activity-report-controls").remove();
    $("#activity-report").html(html);
  });
}

function generateTopicItem(t) {
  return (`
    <div class="item" data-value="${t.value}">${t.topic}</div>
  `);
}

function makeTopicSelect(topics) {
  return (`
    <div class="item" data-value="*">** Show All Bookmarks</div>
    ${topics.map(t => `${!t.deleted?generateTopicItem(t):""}`).join("")}
  `);
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

      //initialize to not modified
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

function generateTableRow(sid, t, index) {
  return (`
    <tr data-sid="${sid}" data-index="${index}"> 
      <td class="edit-topic-item"><i class="pencil alternate icon"></i></td>
      <td class="delete-topic-item"><i class="trash alternate icon"></i></td>
      <td class="topic">${t.topic}</td>
    </tr>
  `);
}

function generateTopicTableData(sid) {
  return (`
    ${topics[sid].map((t,index) => `
      ${!t.deleted?generateTableRow(sid, t, index):""}`).join("")}
  `);
}

/*
 * Search through bookmarks by source and filter by book for topics
 */
function findMatchesNew(sid, book, topicList, condition) {
  let topicArray = topicList.split(",");

  //look for topic of "*", this means to include all bookmarks (don't filter by topic)
  let filterByTopic = !topicArray.includes("*");
  let matches = [];

  //find all bookmarks containing topics in topicArray
  //- if condition === "OR" a match is found when the bookmark contains one or more
  //  topics in topicArray
  // - if condition === "AND" a match is found when the bookmark contans each topic
  //   in topicArray
  if (filterByTopic) {
    bookmarks[sid].forEach((b) => {
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
          }
          //condition === "AND"
          else if (index > -1) {
            count++;
          }
        }
        if (count === topicArray.length && condition === "AND") {
          matches.push(b);
        }
      }
    });
  }
  else {
    matches = bookmarks[sid];
  }

  //filter matched bookmarks if user restricted by book, "*" means matches
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

/*
 * Set state of controls when topic manager opens or closes.
 */
function manageTopics(state) {
  if (state === "open") {
    clearActivityReport();

    //hide annotation-action controls
    $("#action-manager > .annotation-actions").addClass("hide");
    $("#manageTopicsButton").text("Un-Manage Topics");
    $("#topicTable").removeClass("hide");
  }
  else if (state === "close") {
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
  $(".style-checkbox.default").trigger("click");

  //reset Show Headers
  if ($("#action-manager > .annotation-actions .hide-headers").hasClass("hide") ) {
    $("#action-manager > .annotation-actions .hide-headers").removeClass("hide").html("Hide Headers");
    $("#activity-report .bookmark-header").removeClass("hide");
  }

  //reset Show Quotes
  if ($("#action-manager > .annotation-actions .hide-quotes").hasClass("hide") ) {
    $("#action-manager > .annotation-actions .hide-quotes").removeClass("hide").html("Hide Quotes");
    $("#activity-report .bookmark-segment.hide").removeClass("hide");
    $("#activity-report .bookmark-segment.hide").removeClass("qhide");
  }
}

function initForm() {
  $("#topicSelectNew").dropdown();
  $("#action-manager .ui.radio.checkbox").checkbox();

  $("#condition-toggle").on("change", function(e) {
    let val = $("#condition-toggle label").text();
    $("#condition-toggle label").text(val === "AND" ? "OR" : "AND");
  });

  $("#manageTopicsButton").on("click", function(e) {
    let sid = $(this).attr("data-sid");
    if ($("#topicTable").hasClass("hide")) {
      let html = generateTopicTableData(sid);
      $("#topicTable > tbody").html(html);
      manageTopics("open");
    }
    else {
      manageTopics("close");
    }
  });

  //delete topic
  $("#topicTable").on("click", "td.delete-topic-item", function(e) {
    let index = parseInt($(this).parent().attr("data-index"), 10);
    let sid = $(this).parent().attr("data-sid");
    let deleted = $(this).parent().hasClass("deleted");

    if (deleted) {
      notify.info("Topic has been deleted");
      return;
    }

    //confirm delete request
    let topicToDelete = topics[sid][index];
    $("#confirmDelete > .header").text(`Delete Topic: "${topicToDelete.topic}"?`);
    $("#confirmDelete .actions > .delete-approve").attr("data-sid", sid);
    $("#confirmDelete .actions > .delete-approve").attr("data-index", index);
    $("#confirmDelete").modal("show");
  });

  //edit topic
  $("#topicTable").on("click", "td.edit-topic-item", function(e) {
    let index = parseInt($(this).parent().attr("data-index"), 10);
    let sid = $(this).parent().attr("data-sid");
    let deleted = $(this).parent().hasClass("deleted");

    if (deleted) {
      notify.info("Topic has been deleted");
      return;
    }

    $("#edit-topic-form").form("set values", {
      sid: sid,
      index: index,
      topic: topics[sid][index].topic,
      oldtopic: topics[sid][index].topic
    });
    $(".edit-topic-dialog-wrapper.hide").removeClass("hide");
  });

  //cancel topic edit
  $("#update-topic-cancel").on("click", function(e) {
    e.preventDefault();
    $(".edit-topic-dialog-wrapper").addClass("hide");
  });

  //submit topic edit
  $("#update-topic-submit").on("click", function(e) {
    e.preventDefault();
    let form = $("#edit-topic-form").form("get values");
    let index = parseInt(form.index,10);

    //if no changes just return
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

    //mark topic as modified
    markSourceModified(form.sid, "topicList");

    //close the edit topic form
    $(".edit-topic-dialog-wrapper").addClass("hide");
      
    //update topic array with new topic
    let oldTopic = topics[form.sid][index];
    topics[form.sid][index] = newTopic;

    //update table with new topic
    $(`[data-sid='${form.sid}'][data-index='${form.index}'] > .topic`).text(newTopic.topic);

    //update topic select
    $(`#topic-list-new > [data-value='${oldTopic.value}']`).attr("data-value", newTopic.value).text(newTopic.topic);

    //update bookmarks with new topic
    // - find bookmarks with old topic and replace it with new topic
    bookmarks[form.sid].forEach(bm => {
      if (bm.annotation.topicList) {
        let idx = bm.annotation.topicList.findIndex((t) => {
          return t.value === oldTopic.value;
        });

        //bookmark has topic, replace the old topic and mark the bookmark
        //as being modified
        if (idx > -1) {
          bm.annotation.topicList[idx] = newTopic;
          bm.modified = true;
          markSourceModified(form.sid, "bookmark");
        }
      }
    });
  });

  $("#displayBookmarksButtonNew").on("click", function(e) {
    e.preventDefault();
    let sid = $(this).attr("data-sid");
    let topicManager = {};

    let actionManager = $("#action-manager").form("get values");
    if (actionManager.topicListNew.length === 0) {
      notify.info("Select one or more topics from the Topic Select List");
      return;
    }

    //close topics table of open
    manageTopics("close");
    resetAnnotationActions();

    let bookFilter = $(`#book-list${sid} :selected`).val();

    let condition = actionManager.condition === "on"? "AND" : "OR";
    let matches = findMatchesNew(sid, bookFilter, actionManager.topicListNew, condition);

    if (matches.length === 0) {
      notify.info("No bookmarks contain selected topics");
      return;
    }
    //show annotation controls
    $("#action-manager > .annotation-actions").removeClass("hide");

    topicManager.source = sourceInfo.title[sid];
    topicManager.topicArray = actionManager.topicListNew.split(",");
    topicManager.condition = condition;
    topicManager.bookFilter = bookFilter;

    //generated html
    generateBookmarkText(matches, topicManager);
  });

  $("#action-manager > .annotation-actions input[type=radio][name=annotationFilter]").on("change", function(e) {
    let form = $("#action-manager").form("get values");

    //show all bookmarks
    if (form.annotationFilter === "none") {
      $(".bookmark-segment.hide").removeClass("hide");
    }
    //show note bookmarks, hide selected
    else if (form.annotationFilter === "note") {
      $(".bookmark-segment.note").removeClass("hide");
      $(".bookmark-segment.selected").addClass("hide");
    }
    else if (form.annotationFilter === "selected") {
      $(".bookmark-segment.note").addClass("hide");
      //don't show bookmarks that have been hidden by Hide Quotes
      $(".bookmark-segment.selected").removeClass("hide");
    }
  });

  $("#action-manager > .annotation-actions").on("click", ".hide-quotes", function(e) {
    if ($(this).hasClass("hide")) {
      $(this).removeClass("hide").html("Hide Quotes");
      $("#activity-report .bookmark-segment.qhide").removeClass("qhide");
    }
    else {
      let quotesToHide = $("#activity-report .cmi-manage-quote.in-database").parent();
      quotesToHide.addClass("qhide");
      $(this).addClass("hide").html(`Show Quotes (${quotesToHide.length})`);
    }
  });

  $("#action-manager > .annotation-actions").on("click", ".hide-headers", function(e) {
    if ($(this).hasClass("hide")) {
      $(this).removeClass("hide").html("Hide Headers");
      $("#activity-report .bookmark-header").removeClass("hide");
    }
    else {
      $(this).addClass("hide").html("Show Headers");
      $("#activity-report .bookmark-header").addClass("hide");
    }
  });

  //delete topic confirmation modal
  $("#confirmDelete").modal({
    closable  : false,
    onDeny    : function() {
      notify.info("Delete Canceled.");
    },
    onApprove : function(el) {
      let index = parseInt($(el).attr("data-index"), 10);
      let sid = $(el).attr("data-sid");

      let deletedTopic = topics[sid][index];
      deletedTopic.index = index;

      //1. mark topic in topic table as deleted
      $(`#topicTable > tbody > [data-sid='${sid}'][data-index='${index}']`).addClass("deleted");

      //2. mark topic in topic dropdown select as deleted, change value to "*"
      $(`#topic-list-new > [data-value='${deletedTopic.value}']`).addClass("deleted").attr("data-value", "X");

      //3. mark topic as deleted and update topicList when changes are written to db
      topics[sid][index].deleted = true;
      //topics[sid].splice(index, 1);

      markSourceModified(sid, "topicList");

      //4. delete topic from bookmark annotations
      let itemsDeleted = false;
      bookmarks[sid].forEach(bm => {
        if (bm.annotation.topicList) {
          let idx = bm.annotation.topicList.findIndex((t) => {
            return t.value === deletedTopic.value;
          });

          //bookmark has topic, delete it
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

      notify.success(`Topic "${deletedTopic.topic}" Deleted.`);
    }
  });

  /*
   * Write changes to database
   */
  $("#applyChangesButtonNew").on("click", function() {
    //get modified bookmarks
    $(this).addClass("loading");
    let modified = getModified();
    let userInfo = getUserInfo();

    //update database
    let results = [];
    modified.bookmarks.forEach(m => {
      delete m.modified;
      delete m.pid;
      results.push(updateAnnotation(m));
    });

    Promise.all(results)
      .then((responses) => {
        notify.success(`${responses.length} Annotation(s) Updated`);

        //update modified topics
        results = [];
        modified.topics.forEach(t => {
          let newList = topics[t].filter((t) => !t.deleted);
          results.push(putTopicList(userInfo.userId, t, newList));
        });

        return Promise.all(results);
      }).then((responses) => {
        notify.success(`${responses.length} topicList(s) Updated`);

        clearModified();
        notify.success("Modifications Saved");
        $(this).removeClass("loading");
      }).catch((err) => {
        notify.error(`Error updating items: ${err}`);
        console.error(err);
        $(this).removeClass("loading");
      });
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
    quoteInfo.url = getUrlByPageKey(parakey); 
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

    let postBody = {
      userId: info.userId,
      paraKey: info.parakey,
      creationDate: info.annotationId,
      quote: {
        pid: info.pid,
        quote: purify(info.quote),
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

  return {bookmarks: bookmarksModified, topics: topicListsModified};
}

/*
 * Mark bookmark paragraph as modified
 */
function markModified(paraKey, creationDate, isQuote) {
  let b = bookmarks[paraKey.substring(0,2)].find(i => {
    if (i.paraKey === paraKey && i.creationDate === creationDate) {
      return true;
    }
    return false;
  });

  if (b) {
    b.modified = true;
    b.quote = isQuote;
    markSourceModified(paraKey.substring(0,2), "bookmark");
  }
}

function markSourceModified(sid, kind) {
  if (!modified[sid]) {
    modified[sid] = {[kind]: true};
  }
  else {
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
  });

  //clear modified object
  modified = {};

  $("#applyChangesButtonNew").attr("disabled", "");
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

