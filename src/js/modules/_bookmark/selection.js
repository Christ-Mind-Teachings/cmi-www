import notify from "toastr";
import {getUserInfo} from "../_user/netlify";

const textPosition = require("dom-anchor-text-position");
const textQuote = require("dom-anchor-text-quote");
const wrapRange = require("wrap-range-text");

//const uuid = require("uuid/v4");
import { v4 as uuid } from 'uuid';

import {getUserInput, initialize as initAnnotation} from "./annotate";
import isFinite from "lodash/isFinite";
import difference from "lodash/difference";
import {getString} from "../_language/lang";

//all annotations on the page
let pageAnnotations = {};

//all annotations that were not highlighted due to shared annotation conflict
let skippedAnnotations = [];

export function highlightSkippedAnnotations() {
  let sequence = 0;

  if (skippedAnnotations.length === 0) {
    return;
  }

  let node;

  for (let a of skippedAnnotations) {
    let annotation = pageAnnotations[a];
    //console.log("annotation: %o", annotation);

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
export function updateSelectionTopicList(annotation) {
  let topicList;

  //annotation has no selected text
  if (!annotation.aid) {
    return;
  }

  //if no topics and annotation has been updated, check if topic
  //classes exist, delete if so
  if (!annotation.topicList || annotation.topicList.length === 0) {
    //don't need to do anything for new annotations
    if (annotation.status === "new") {
      return;
    }

    //check for topic classes
    let existingClasses = $(`[data-annotation-id="${annotation.aid}"]`).attr("class");
    let classArray = existingClasses.split(" ");

    $(`[data-annotation-id="${annotation.aid}"]`).attr("class", `${classArray[0]} ${classArray[1]}`);

    return;
  }

  //convert annotation topics to a space delimited string
  topicList = annotation.topicList.reduce((result, topic) => {
    return `${result} ${topic.value}`;
  }, "");

  //split topic string into an array
  topicList = topicList.trim();
  let topicListArray = topicList.split(" ");

  //get class attr for annotation and convert to an array
  let existingClasses = $(`[data-annotation-id="${annotation.aid}"]`).attr("class");
  let classArray = existingClasses.split(" ");

  //add first two classes of classArray to topicListArray, these are non topic classes
  if (classArray.length === 1) {
    topicListArray.unshift(classArray[0]);
  }
  else {
    topicListArray.unshift(classArray[1]);
    topicListArray.unshift(classArray[0]);
  }

  //create class list from topicListArray
  topicList = topicListArray.reduce((result, topic) => {
    return `${result} ${topic}`;
  }, "");

  //update class list
  $(`[data-annotation-id="${annotation.aid}"]`).attr("class", topicList);
}

/*
  if the annotation is new then remove the highlight and
  delete from pageAnnotations
*/
export function deleteNewSelection(id) {
  //no id when annotation has no associated text
  if (!id) {
    return;
  }

  let highlite = pageAnnotations[id];

  //new highlite is not associated with a bookmark annotation so it doesn't have an 'aid' attribute
  if (highlite.aid) {
    return;
  }

  //remove highlight
  if (highlite.wrap) {
    highlite.wrap.unwrap();
  }
  else {
    //console.log("deleteNewSelection: no wrap() in selection");
  }

  //delete the annotation
  delete pageAnnotations[id];
}

/*
  unwrap selected text and delete
*/
export function deleteSelection(id) {
  if (!id) {
    return;
  }

  let highlite = pageAnnotations[id];

  if (!highlite) {
    return;
  }

  //remove highlight
  if (highlite.wrap) {
    highlite.wrap.unwrap();
  }

  //delete the annotation
  delete pageAnnotations[id];
}

export function getSelection(id) {
  return pageAnnotations[id];
}

export function updateHighlightColor(id, sequence) {
  let colorClasses = [
    "colorClass1",
    "colorClass2",
    "colorClass3",
    "colorClass4",
    "colorClass5",
    "colorClass6"
  ];
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
export function markSelection(annotation, sequence = 0, sharePid = null) {
  let node = document.getElementById(annotation.pid);

  if (!sharePid || sharePid !== annotation.pid) {
    highlight(annotation, node);
    updateHighlightColor(annotation.id, sequence);
  }
  else if (sharePid) {
    //console.log("highlight of %s skipped due to share", sharePid);
    skippedAnnotations.push(annotation.id);
  }
  pageAnnotations[annotation.id] = annotation;
}

export function updateSelectedText(id, aid) {
  $(`[data-annotation-id="${id}"]`).attr("data-aid", aid);
}

export function highlight(annotation, toNode = document.body) {
  var anno_id = annotation.id;

  if (annotation.target.source) {
    var selectors = annotation.target.selector;
    for (var i = 0 ; i < selectors.length ; i++) {
      var selector = selectors[i];
      var type = selector.type;
      switch (type) {
        case "TextPositionSelector":
          // skip existing marks
          var existing_marks = document.querySelectorAll(`[data-annotation-id="${anno_id}"]`);
          if (existing_marks.length === 0) {
            var mark = document.createElement("mark");
            mark.dataset["annotationId"] = anno_id;

            //the id of the bookmark annotation that contains this annotation
            if (annotation.aid) {
              mark.dataset["aid"] = annotation.aid;
            }
            mark.classList.add("bookmark-selected-text");

            //this sometimes fails and is fixed by adjusting the selector
            var range;
            try {
              range = textPosition.toRange(toNode, selector);
              annotation.wrap = wrapRange(mark, range);
            }
            catch(err) {
              //console.log("adjusting selector.end");
              selector.end--;
              range = textPosition.toRange(toNode, selector);
              annotation.wrap = wrapRange(mark, range);
            }
          }
          break;
      }
    }
  }
}

function getSelectedText(range, fromNode = document.body) {
  if (range.collapsed) return null;

  var textPositionSelector = textPosition.fromRange(fromNode, range);
  Object.assign(textPositionSelector, {type: "TextPositionSelector"});

  var textQuoteSelector = textQuote.fromRange(fromNode, range);
  Object.assign(textQuoteSelector, {type: "TextQuoteSelector"});

  var selectedText = {
    type: "Annotation",
    title: $("#book-title").text(),
    url: location.pathname,
    pid: fromNode.id,
    //pid: range.startContainer.parentNode.id,
    id: uuid(),
    target: {
      type: "SpecificResource",
      source: location.href,
      selector: [
        textPositionSelector,
        textQuoteSelector,
      ]
    }
  };

  return selectedText;
}

/*
  Capture user text selection
*/
export function initialize(constants) {

  $("div.transcript.ui").on("mouseup", function(e) {
    e.preventDefault();

    //bookmarks enabled only for signed in users
    if (!getUserInfo()) {
      return;
    }

    //ignore text selection when disabled by user or when annotation is 
    //being created
    if ($(this).hasClass("disable-selection")) {
      return;
    }

    if (document.getSelection().isCollapsed) {
      return;
    }

    let selObj = document.getSelection(); 

    //Safari calls this function twice for each selection, the second time
    //rangeCount === 0 and type == "None"
    if (selObj.rangeCount === 0) {
      return;
    }

    if (selObj.getRangeAt(0).collapsed) {
      return;
    }

    processSelection(selObj);
  });

  //init annotation input, edit, and delete
  initAnnotation(constants);
}

/*
  create annotation from selected text
*/
function processSelection(selection) {
  let range = selection.getRangeAt(0);

  //new from user2
  if (range.commonAncestorContainer.nodeName === "DIV") {
    notify.info(getString("error:e8"));
    //console.log("multi paragraph selection: start: %s, end: %s", rangeStart, rangeEnd);
    return;
  }

  if (range.startContainer.parentElement.localName === "span") {
    notify.info(getString("error:e6"));
    //console.log("selection includes <p>");
    return;
  }

  //get the paragraph node for the range
  let pNode = range.startContainer;
  while (pNode.nodeName !== "P") {
    pNode = pNode.parentElement;
  }

  //let node = document.getElementById(rangeStart);
  //let node = document.getElementById(pNode.id);

  //create annotation
  let selectedText = getSelectedText(range, pNode);
  if (selectedText) {

    //check if selection contains any part of another selection
    let highlightedText = pNode.getElementsByTagName("mark");
    for (let ht of highlightedText) {
      if (selection.containsNode(ht, true)) {
        notify.info(getString("error:e7"));
        //console.log("overlapping selections");
        return;
      }
    }

    highlight(selectedText, pNode);

    //persist annotation
    pageAnnotations[selectedText.id] = selectedText;
    getUserInput(selectedText);
  }
}
