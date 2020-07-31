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
import {getString} from "../_language/lang";
import {localStore} from "./bookmark";

const uiPageTopicsModal = "#page-topics-modal";
const uiOpenPageTopicsModal = "#page-topics-modal-open";
const uiModalOpacity = 0.5;

//generate the option element of a select statement
function generateOption(topic) {
  return `<option value="${topic.value}">${topic.topic}</option>`;
}

//generate select html for Topics
function makeTopicSelect(topics) {
  return (`
    <select name="pageTopicList" id="page-topics-topic-list" class="search ui dropdown">
      ${topics.map(topic => `${generateOption(topic)}`).join("")}
    </select>
  `);
}

function formatTopic(topic) {
  if (topic === "__reset__") {
    return `<div class='reset-filter item'>${getString("label:clearfilter")}</div>`;
  }
  return `<div class="item">${topic}</div>`;
}

function makeTopicSelectElement() {
  let topicMap = localStore.getTopics();
  let topicKeys = Array.from(topicMap.keys());
  let topics = topicKeys.map(key => {
    return topicMap.get(key);
  });

  topics.sort((a,b) => {
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
  let topicMap = localStore.getTopics();
  let topicKeys = Array.from(topicMap.keys());
  let topics = topicKeys.map(key => {
    let t = topicMap.get(key);
    return t.topic;
  });

  localStore.topicRefreshNeeded = false;

  if (topics.length === 0) {
    return `<div class='ntf item'>${getString("annotate:m15")}</div>`;
  }
  topics.sort();
  topics.unshift("__reset__");

  return `
    ${topics.map(topic => `${formatTopic(topic)}`).join("")}
  `;
}

//topic selection click handler
function topicSelectHandler() {
  $("#topic-menu-item").on("click", "#topic-menu-select > .item", function(e) {
    e.preventDefault();

    //class .ntf indicates there are no topics, so just return
    if ($(this).hasClass("ntf")) {
      return;
    }

    let active;

    //clear the topic filter
    if ($(this).hasClass("reset-filter")) {
      active = $("#topic-menu-select > .active.item");

      //check for unexpected condition
      if (active.length === 0) {
        return;
      }
      let activeTopic = active.text();

      if (activeTopic === "Clear Filter") {
        //there is not active filter so return
        return;
      }

      active.removeClass("active");

      //remove .show from previously selected highlights
      $(`mark.bookmark-selected-text.${activeTopic}`).removeClass("show");

      //remove filter indication from .transcript
      $(".transcript").removeClass("topic-filter-active");

      //reset header text
      $("#topic-menu-item").prev(".header").text(`${getString("label:topicfilter")}: None`);
      $("#topic-menu-item").prev(".header").attr("data-filter", "none");

      return;
    }

    //filter already active
    if ($(this).hasClass("active")) {
      return;
    } 

    //look for already active filter and remove it
    active = $("#topic-menu-select > .active.item");
    if (active.length > 0) {
      let activeTopic = active.text();
      active.removeClass("active");

      //remove .show from previously selected highlights
      $(`mark.bookmark-selected-text.${activeTopic}`).removeClass("show");
    }

    //mark topic as active
    $(this).addClass("active");

    //mark transcript as having an active filter
    $(".transcript").addClass("topic-filter-active");

    //add class .show to each highlight containing the selected topic
    let topic = $(this).text();

    //check for multi-word topic and remove spaces
    if (/ /.test(topic)) {
      topic = topic.replace(/ /g, "");
    }

    $(`mark.bookmark-selected-text.${topic}`).addClass("show");

    //mark menu option as having an active filter
    $("#topic-menu-item").prev(".header").html(`${getString("label:topicfilter")}: <span class="red">${topic}</span>`);
    $("#topic-menu-item").prev(".header").attr("data-filter", topic);
  });
}

export function bookmarksLoaded() {
  initPageTopicsModal();
}

/*
  Get topic select element for page-topic-modal
*/
function getTopicList() {
  if (!localStore.topicRefreshNeeded) return;
  let selectHtml = makeTopicSelectElement();

  $("#page-topics-modal-topic-select").html(selectHtml);
  $("#page-topics-topic-list").dropdown();

  $("#page-topics-modal-loading").removeClass("active").addClass("disabled");
  localStore.topicRefreshNeeded = false;
}

function initPageTopicsModal() {
  $(uiPageTopicsModal)
    .modal({
      dimmerSettings: {opacity: uiModalOpacity},
      autofocus: false,
      centered: true,
      duration: 400,
      inverted: true,
      observeChanges: true,
      transition: "horizontal flip",
      onShow: function() {
        getTopicList();
      },
      onVisible: function() {
      },
      onHidden: function() {
      }
    });

  $(uiOpenPageTopicsModal).on("click", (e) => {
    e.preventDefault();

    //populateBookmarkModal(uiBookmarkModalDiv);
    $(uiPageTopicsModal).modal("show");
  });

  filterSubmitHandler();
  filterResetHandler();
}

/*
  Apply topic filter to bookmarks on page
*/
function filterSubmitHandler() {
  $("#page-topics-filter-submit").on("click", function(e) {
    e.preventDefault();
    let form = $("#page-topics-filter-form");
    let filterTopic = form.form("get value", "pageTopicList");

    let topicTopic = $(`#page-topics-topic-list > [value='${filterTopic}']`).text();
    setTopicFilter({value: filterTopic, topic: topicTopic});
  });
}

/*
  Clear bookmark filter
*/
function filterResetHandler() {
  //clear filter
  $(".page-topics-filter-reset").on("click", function(e) {
    e.preventDefault();

    //mark transcript as having an active filter
    if ($(".transcript").hasClass("topic-filter-active")) {
      //clear active filter
      let currentFilter = $("#current-topic-filter").attr("data-filter");

      $(`mark.bookmark-selected-text.${currentFilter}`).removeClass("show");
    }

    $(".transcript").removeClass("topic-filter-active");

    //clear active filter from menu
    $("#current-topic-filter").html(`${getString("label:topicfilter")}: None`);
    $("#current-topic-filter").attr("data-filter", "");

    //mark bookmark icon green - no filter applied
    $("#bookmark-dropdown-menu > span > i").eq(0).removeClass("yellow").addClass("green");

    //close the modal
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
    let currentFilter = $("#current-topic-filter").attr("data-filter");

    //new filter is the same as the current, no need to do anything
    if (currentFilter === topic.value) {
      return;
    }

    $(`mark.bookmark-selected-text.${currentFilter}`).removeClass("show");
  }
  else {
    $(".transcript").addClass("topic-filter-active");
  }

  $(`mark.bookmark-selected-text.${topic.value}`).addClass("show");

  //mark menu option as having an active filter
  $("#current-topic-filter").html(`Topic Filter: <span class="red">${topic.topic}</span>`);
  $("#current-topic-filter").attr("data-filter", topic.value);

  //mark bookmark icon as yellow - filter is applied
  $("#bookmark-dropdown-menu > span > i").eq(0).removeClass("green").addClass("yellow");

  //close the modal
  $(uiPageTopicsModal).modal("hide");
}
