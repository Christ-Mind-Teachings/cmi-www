/* eslint no-console: off */

import {SourceStore, storeInit} from "common/modules/_util/store";

import toc from "./modules/_contents/toc";
import {initBareBonesTranscriptPage} from "common/modules/_page/startup";
import {loadEmailListTable} from "./modules/_user/email";
import {initializeTopicManager} from "./modules/_user/topicmgr";
import about from "./modules/_about/about";
import constants from "./constants";

$(document).ready(() => {
  const store = new SourceStore(constants);
  storeInit(constants);

  initBareBonesTranscriptPage(store);
  about.initialize();
  toc.initialize("transcript");

  //email mgt page
  if ($(".manage-email-list").length === 1) {
    loadEmailListTable();
  }

  //topic mgt page
  if ($(".manage-topic-list").length === 1) {
    initializeTopicManager();
  }

});

