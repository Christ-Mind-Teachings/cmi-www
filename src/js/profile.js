/* eslint no-console: off */

import "../vendor/semantic/semantic.min.js";

import {initStickyMenu} from "./modules/_page/startup";
import {bookmarkStart} from "./modules/_bookmark/start";
import search from "./modules/_search/search";
import toc from "./modules/_contents/toc";
import auth from "./modules/_user/netlify";
import about from "./modules/_about/about";

import {loadEmailListTable} from "./modules/_user/email";
import {initializeTopicManager} from "./modules/_user/topicmgr";

import {setLanguage} from "./modules/_language/lang";
import constants from "./constants";

$(document).ready(() => {
  initStickyMenu();
  setLanguage(constants);
  bookmarkStart("page");
  search.initialize();
  auth.initialize();
  toc.initialize("transcript");
  about.initialize();

  //email mgt page
  if ($(".manage-email-list").length === 1) {
    console.log("loading email list table");
    loadEmailListTable();
  }

  //topic mgt page
  if ($(".manage-topic-list").length === 1) {
    console.log("loading topic list table");
    initializeTopicManager();
  }

});

