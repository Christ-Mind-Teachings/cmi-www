import {getAnnotations} from "../_db/annotation"; 
import {putTopicList} from "../_db/topics";
import {getUserInfo} from "../_user/netlify";
import {storeGet, storeSet} from "../_util/store"
import {BookmarkLocalStore} from "./localStore";

import notify from "toastr";
import net, {netInit}  from "./bmnet";
import differenceWith from "lodash/differenceWith";
import cloneDeep from "lodash/cloneDeep";
import startCase from "lodash/startCase";
import { showBookmark } from "../_util/url";
import {initNavigator} from "./navigator";
import list from "./list";
import topics from "./topics";
import {
  markSelection,
  getSelection,
  deleteNewSelection,
  deleteSelection,
  initialize as selectInit,
  updateHighlightColor,
  updateSelectionTopicList
} from "./selection";
import {getLink} from "./annotate";
import { createLinkListener, getLinkHref } from "../_link/setup";
import {getString} from "../_language/lang";

//teaching specific constants, assigned at initialization
let teaching = {};

//manages bookmark store for bookmarks on page
export let localStore;

export function getTeachingInfo() {
  return teaching;
}

function formatLink(link) {
  let raw = JSON.parse(link.link);
  let href = getLinkHref(raw);

  let display = `${raw.desc.source}:${raw.desc.book}:${raw.desc.unit}`;

  //WOM has questions
  if (raw.desc.question) {
    display = `${display}:${raw.desc.question}:${raw.desc.pid}`;
  }
  else {
    display = `${display}:${raw.desc.pid}`;
  }
  return `<a class="item" href="${href}">${link.reference}[${display}]</a>`;
}

//generate html for bookmark links
function generateLinkList(links) {
  return `
    ${links.map((item) => `
      ${formatLink(item)}
    `).join("")}
  `;
}

//add bookmark topics to bookmark selected text to support
//selective display of highlight based on topic
function addTopicsAsClasses(bookmark) {
  if (bookmark.topicList && bookmark.topicList.length > 0) {
    let topicList = bookmark.topicList.reduce((result, topic) => {
      if (typeof topic === "object") {
        return `${result} ${topic.value}`;
      }
      return `${result} ${topic}`;
    }, "");

    $(`[data-annotation-id="${bookmark.aid}"]`).addClass(topicList);
  }
}

function addNoteHighlight(pid, bm) {
  $(`#p${pid} > span.pnum`)
    .addClass("has-annotation")
    .attr("data-aid", bm.creationDate);

  //mark all paragraphs in bookmark with class .note-style-bookmark
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
  } while(start <= end);
}

/*
  Add linkify icon after bookmark so user can click to view links
*/
export function setQuickLinks(bm, type) {
  if (bm.links) {
    $(`[data-aid="${bm.creationDate}"]`)
      .after(`<i data-link-aid="${bm.creationDate}" data-type="${type}" class="small bm-link-list linkify icon"></i>`);
  }
}

/*
  Bookmark link click handler. Links are placed on both note and selected text
  bookmarks. When clicked, get the bookmark and display a list of links defined
  in the bookmark. User can optionally click a  link.
*/
function initBmLinkHandler() {
  $(".transcript").on("click", ".bm-link-list.linkify", function(e) {
    e.preventDefault();

    let type = $(this).attr("data-type");
    let pid = $(this).parent("p").attr("id");
    let aid;

    if (type === "note") {
      aid = parseInt($(this).prev("span").attr("data-aid"), 10);
    }
    else if (type === "highlight") {
      aid = parseInt($(this).prev("mark").attr("data-aid"), 10);
    }
    
    //bookmark wont be found if it is still being created
    let bkmrk = localStore.getItem(pid, aid);

    //sometimes the annotation won't be found because it is being created, so just return
    if (!bkmrk) {
      return;
    }

    let linkList = generateLinkList(bkmrk.annotation.links);
    $(".bm-link-list-popup").html(linkList);
    $(this)
      .popup({popup: ".bm-link-info.popup", hoverable: true, on: "click"})
      .popup("show");

  });
}

/*
  Clean up form values and prepare to send to API
*/
function createAnnotation(formValues) {
  //console.log("createAnnotation");

  let annotation = cloneDeep(formValues);

  annotation.rangeStart = annotation.rangeStart.trim();
  annotation.rangeEnd = annotation.rangeEnd.trim();

  if (!annotation.rangeEnd.startsWith("p")) {
    annotation.rangeEnd = `p${annotation.rangeEnd}`;
  }

  //delete empty fields
  if (annotation.Comment === "") {
    delete annotation.Comment;
  }

  if (annotation.Note === "") {
    delete annotation.Note;
  }

  if (annotation.creationDate === "") {
    delete annotation.creationDate;
  }

  if (annotation.aid === "") {
    delete annotation.aid;
  }
  else {
    annotation.selectedText = getSelection(annotation.aid);

    if (annotation.creationDate) {
      annotation.selectedText.aid = annotation.creationDate.toString(10);
    }
    delete annotation.textId;
  }

  if (annotation.topicList.length === 0) {
    delete annotation.topicList;
  }

  //keep track of topics added or deleted
  updateSelectionTopicList(annotation);

  delete annotation.newTopics;
  delete annotation.hasAnnotation;

  //persist the bookmark
  net.postAnnotation(annotation);
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
function formatNewTopics({newTopics}) {

  //only allow digits, alpha chars (including Polish chars) and comma's and spaces
  let topics = newTopics.replace(/[^a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ, ]/g, "");

  if (!topics || topics === "") {
    return [];
  }

  //remove leading and trailing comma's
  topics = topics.replace(/^,*/, "");
  topics = topics.replace(/,*$/, "");

  let newTopicArray = topics.split(",");
  newTopicArray = newTopicArray.map(t => t.trim());
  newTopicArray = newTopicArray.map(t => startCase(t));

  newTopicArray = newTopicArray.map(t => {
    if (/ /.test(t)) {
      return {value: t.replace(/ /g, ""), topic: t};
    }
    else {
      return { value: t, topic: t};
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
  net.fetchTopics()
    .then((topicList) => {
      //remove duplicate topics from and return the rest in difference[]
      let newUniqueTopics = differenceWith(newTopics, topicList.topics, (n,t) => {
        return t.value === n.value;
      });

      //these are the new topics
      if (newUniqueTopics.length > 0) {
        //add new topics to topic list
        let newTopicList = topicList.topics.concat(newUniqueTopics);

        //sort topic list
        newTopicList.sort((a, b) => {
          let aValue, bValue;

          //objects have value and topic keys, sort them by topic
          aValue = a.topic.toLowerCase();
          bValue = b.topic.toLowerCase();

          if (aValue < bValue) {
            return -1;
          }

          if (aValue > bValue) {
            return 1;
          }

          return 0;
        });

        //update local storage
        topicList.topics = newTopicList;
        storeSet("bmTopics", topicList);

        let userInfo = getUserInfo();
        let sourceId = teaching.getKeyInfo().sourceId;

        //write the new list to the db
        putTopicList(userInfo.userId, sourceId, newTopicList);

        //add new topics to this annotations topicList
        formValues.topicList = formValues.topicList.concat(newUniqueTopics);

        //add newTopics to formValues for posting to server
        formValues.newTopics = newUniqueTopics;

        //post the bookmark
        createAnnotation(formValues);
      }
    })
    .catch((err) => {
      throw new Error(`bookmark.js:addToTopicList() error: ${err}`);
    });
}

//toggle selected text highlights
function highlightHandler() {
  $(".toggle-bookmark-highlight").on("click", function(e) {
    e.preventDefault();
    let el = $(".transcript");

    if (el.hasClass("hide-bookmark-highlights")) {
      el.removeClass("hide-bookmark-highlights");
      $(".toggle-bookmark-highlight").text("Hide Highlighted Text");
    }
    else {
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
  $("#bookmark-toggle-disable-selection").on("click", function(e) {
    e.preventDefault();

    let el = $(".transcript");

    if (el.hasClass("disable-selection") && el.hasClass("user")) {
      getString("menu:m1", true).then(value => {
        el.removeClass("disable-selection user");
        $(".toggle-bookmark-selection").text(value);
        storeSet("bmCreation", "enabled");
      });
    }
    else {
      getString("menu:m2", true).then(value => {
        el.addClass("disable-selection user");
        $(".toggle-bookmark-selection").text(value);
        storeSet("bmCreation", "disabled");
      });
    }
  });
}

/*
 * The bookmark feature is initially enabled. Check local storage to see if
 * it has been disabled by the user. If so, disable it on page load.
 */
function initializeBookmarkFeatureState() {
  let state = storeGet("bmCreation");

  if (state && state === "disabled") {
    //console.log("triggering selection guard disable");
    $("#bookmark-toggle-disable-selection").trigger("click");
  }
}

/*
 * Get Annotations for page for signed in users. SelectedText annotations
 * are converted to objects by JSON.parse() and the set of annotations
 * are sorted by pid (without the 'p')
 *
 * Args: fn: function to call for annotation s
 *       arg: arg to pass to function as second argument ie fn(b, arg)
 */
async function getPageBookmarks(sharePid) {
  let pageKey = teaching.keyInfo.genPageKey();
  let userInfo = getUserInfo();

  //call fn with empty object
  if (!userInfo) {
    return;
  }

  function processAnnotations(bmList, sharePid) {
    let count = 0;
    let hasBookmark = false;
    let lastOne = bmList.length - 1;

    //check for no results
    if (bmList.length === 0) return;

    let prevBm;
    bmList.forEach((bm, idx) => {

      //if there's a change in paragraph
      if (prevBm && bm.pid !== prevBm.pid) {
        if (hasBookmark) {
          $(`#p${prevBm.pid} > span.pnum`).addClass("has-bookmark"); }
        count = 0;
        hasBookmark = false;
      }

      if (bm.annotation.selectedText) {
        markSelection(bm.annotation.selectedText, count, sharePid);
        addTopicsAsClasses(bm.annotation);
        setQuickLinks(bm.annotation, "highlight");
        topics.add(bm.annotation);
        count++;
        hasBookmark = true;
      }
      else {
        addNoteHighlight(bm.pid, bm.annotation);
        setQuickLinks(bm.annotation, "note");
      }

      if (idx === lastOne && hasBookmark) {
        $(`#p${bm.pid} > span.pnum`).addClass("has-bookmark");
      }
      else {
        prevBm = bm;
      }
    });

    topics.bookmarksLoaded();
  }

  try {
    let bmList = await getAnnotations(userInfo.userId, pageKey);

    //set global variable
    localStore = new BookmarkLocalStore(bmList);
    processAnnotations(bmList, sharePid);
  }
  catch(err) {
    console.error(err);
    //Notify error 
  }
}

/*
  initialize transcript page
*/
function initTranscriptPage(sharePid, constants) {

  //get existing bookmarks for page
  getPageBookmarks(sharePid);

  //add support for text selection
  selectInit(constants);

  //show/hide bookmark highlights
  highlightHandler();

  //disable/enable bookmark creation feature
  bookmarkFeatureHandler();
  initializeBookmarkFeatureState();

  //setup bookmark link listener
  createLinkListener(getLink);
  initBmLinkHandler();

  //setup bookmark navigator if requested
  let pid = showBookmark();
  if (pid) {
    initNavigator(pid, teaching);
  }
}

export const annotation = {
  /*
    This is called when user submits data from annotation form.
    args:
      formData: annotation form data
  */
  submit(formData) {
    let newTopics = formatNewTopics(formData);

    //add new topics to topic list and create annotation
    if (newTopics.length > 0) {
      addToTopicList(newTopics, formData);
    }
    else {
      //post the bookmark
      createAnnotation(formData);
    }

    //mark paragraph as having bookmark
    if (!formData.aid) {
      //bookmark has no selected text
      $(`#${formData.rangeStart} > span.pnum`).addClass("has-annotation");

      //mark all paragraphs in bookmark with class .note-style-bookmark
      let end = parseInt(formData.rangeEnd.substr(1), 10);
      let start = parseInt(formData.rangeStart.substr(1), 10);
      let pid = start;
      do {
        $(`#p${start}`).addClass("note-style-bookmark");
        if (start === pid) {
          $(`#p${start}`).addClass("note-style-bookmark-start");
        }
        if (start === end) {
          $(`#p${start}`).addClass("note-style-bookmark-end");
        }
        start++;
      } while(start <= end);
    }
    else {
      $(`#${formData.rangeStart} > span.pnum`).addClass("has-bookmark");

      //this is a new annotation
      if (formData.creationDate === "") {
        let annotationCount = localStore.itemCount(formData.rangeStart, formData.aid);
        updateHighlightColor(formData.aid, annotationCount);
      }
    }
  },

  //user pressed cancel on annotation form
  cancel(formData) {
    //no creationDate means a new annotation that hasn't been stored
    if (!formData.creationDate && formData.aid) {
      deleteNewSelection(formData.aid);
    }
  },

  //delete annotation
  async delete(formData) {
    //if annotation has selected text unwrap and delete it
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

    //mark as having no annotations if all have been deleted
    try {
      let remainingAnnotations = await net.deleteAnnotation(formData.rangeStart, formData.creationDate);

      if (remainingAnnotations === 0) {
        $(`#${formData.rangeStart} > span.pnum`).removeClass("has-bookmark");
      }

      //delete topics from the page topic list
      topics.delete(formData);
    }
    catch(err) {
      throw new Error(err);
    }
  }
};

export default {
  initialize: function(pid, constants) {
    teaching = constants;

    //provide teaching constants to bmnet
    netInit(teaching);

    if ($(".transcript").length) {
      //this is a transcript page
      initTranscriptPage(pid, constants);
    }

    //initialize bookmark list modal - available on all pages
    list.initialize(constants);
  }
};
