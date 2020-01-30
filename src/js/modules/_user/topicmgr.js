import notify from "toastr";
import {getConfig, getTopics, getBookmarks} from "./net";
import {getUserInfo} from "./netlify";
import intersectionWith from "lodash/intersectionWith";

let sourceInfo = {
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
      "value": "text",
      "name": "Text"
    },
    {
      "value": "workbook",
      "name": "Workbook for Students"
    },
    {
      "value": "manual",
      "name": "Manual for Teachers"
    },
    {
      "value": "preface",
      "name": "Preface"
    }
  ],
  "14": [
    {
      "value": "*",
      "name": "All Books"
    },
    {
      "value": "course",
      "name": "The Course"
    },
    {
      "value": "treatises",
      "name": "The Treatises"
    },
    {
      "value": "dialogues",
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
      "value": "yaa",
      "name": "You Are the Answer"
    },
    {
      "value": "grad",
      "name": "Graduation"
    },
    {
      "value": "acim",
      "name": "ACIM Study Group"
    }
  ],
  "10": [
    {
      "value": "*",
      "name": "All Books"
    },
    {
      "value": "tjl",
      "name": "The Jeshua Letters"
    },
    {
      "value": "wos",
      "name": "The Way of the Servant"
    },
    {
      "value": "early",
      "name": "The Early Years"
    },
    {
      "value": "woh",
      "name": "The Way of the Heart"
    },
    {
      "value": "wot",
      "name": "The Way of Transformation"
    },
    {
      "value": "wok",
      "name": "The Way of Knowing"
    }
  ]
};

let bookmarks = {};
let topics = {};
let topicsLoaded = false;
let sourceValue = "0";

function makeTopicSelect(topics) {
  return (`
    ${topics.map(topic => `<option value="${topic.value}">${topic.topic}</option>`).join("")}
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
  $("#book-list1.dropdown").dropdown();
  $("#topic-list.dropdown").dropdown();

  $("#source-list").on("change", function(e) {
    let topicManager = getFormData();

    //if user has topics selected, they must be deleted before
    //source can be changed.
    if (topicsLoaded && topicManager.topicList.length > 0) {
      e.preventDefault();

      notify.error("Please delete selected topics before changing Source.");
      $("#topic-manager").form("set value", "source", sourceValue);
      return false;
    }

    let sourceId = e.target.selectedOptions[0].value;
    sourceValue = e.target.selectedOptions[0].text;

    let html = makeBookSelectNew(sourceInfo[sourceId]);
    $("#book-list1").html(html);

    //enable Get Bookmarks button
    $("#getBookmarksButton").removeAttr("disabled");

    //disable buttons until topics have been loaded
    $("#deleteTopicsButton").attr("disabled","");
    $("#renameTopicButton").attr("disabled","");
    $("#displayBookmarksButton").attr("disabled","");

    $("#bookmarksLabel").text("Bookmarks (0)");

    //clear topic dropdown
    if (topicsLoaded) {
      let resetTopics = makeTopicSelect([{"value": "*", topic:"-- Select Source --"}]);
      $("#topic-list").html(resetTopics);
      $("#topicsLabel").text("Topics (0)");
    }
  });

  $("#getBookmarksButton").on("click", function(e) {
    let topicManager = getFormData();

    if (topicManager.source === "0") {
      notify.info("To start, first select a source");
      return;
    }

    let userInfo = getUserInfo();
    if (!userInfo) {
      notify.error("You must be signed in to use this page");
      return;
    }

    //disable button until source is changed
    $("#getBookmarksButton").attr("disabled","");

    $("#topic-manager").addClass("loading");

    //get topics for source
    if (!topics[topicManager.source]) {
      getTopics(userInfo.userId, topicManager.source).then(response => {
        topics[topicManager.source] = response.data.topics;

        let html = makeTopicSelect(response.data.topics);
        $("#topic-list").html(html);
        $("#topicsLabel").text(`Topics (${response.data.topics.length})`);
        notify.success(`${topics[topicManager.source].length} topics loaded`);

        topicsLoaded = true;
        $("#deleteTopicsButton").removeAttr("disabled");
        $("#renameTopicButton").removeAttr("disabled");
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
      $("#displayBookmarksButton").removeAttr("disabled");
    }

    //get bookmarks for source
    if (!bookmarks[topicManager.source]) {
      getBookmarks(userInfo.userId, topicManager.source).then(response => {
        bookmarks[topicManager.source] = response.data.response;
        $("#bookmarksLabel").text(`Bookmarks (${bookmarks[topicManager.source].length})`);
        notify.success(`${bookmarks[topicManager.source].length} bookmarks loaded`);

        $("#topic-manager").removeClass("loading");
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

    if (topicManager.topicList.length === 0) {
      notify.info("Select topic(s) to be deleted.");
      return;
    }
  });

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

  $("#displayBookmarksButton").on("click", function() {
    let topicManager = getFormData();

    if (topicManager.topicList.length === 0) {
      notify.info("Select at least one topic.");
      return;
    }
  });
}

function showBookmarks(sourceInfo, topicsInfo) {
  console.log("sourceInfo: %o", sourceInfo);
  console.log("topicsInfo: %o", topicsInfo);
  //console.log("bookmarks: %o", bookmarks[sourceInfo.sourceList]);

  //find bookmarks containing selected topics
  bookmarks[sourceInfo.sourceList].forEach((item) => {
    item.bookmark.forEach((bmark) => {
      let intersection;
      if (bmark.topicList) {
        intersection = intersectionWith(topicsInfo.topicList, bmark.topicList);
        if (intersection.length > 0) {
          console.log(bmark.topicList);
        }
      }
    });
    //console.log("bookmark: %o", item);
  });
}

export function initializeTopicManager() {
  initForm();
}

