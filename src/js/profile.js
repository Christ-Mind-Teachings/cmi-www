/* eslint no-console: off */

import {storeInit} from "common/modules/_util/store";
import {initStickyMenu} from "common/modules/_page/startup";
import auth from "common/modules/_user/netlify";
import {setLanguage} from "common/modules/_language/lang";

import toc from "./modules/_contents/toc";
import about from "./modules/_about/about";
import {loadEmailListTable} from "./modules/_user/email";
import {initializeTopicManager} from "./modules/_user/topicmgr";
import constants from "./constants";

$(document).ready(() => {
  storeInit(constants);
  initStickyMenu();
  setLanguage(constants);
  auth.initialize();
  toc.initialize("transcript");
  about.initialize();

  //email mgt page
  if ($(".manage-email-list").length === 1) {
    loadEmailListTable();
  }

  //topic mgt page
  if ($(".manage-topic-list").length === 1) {
    initializeTopicManager();
  }

});

