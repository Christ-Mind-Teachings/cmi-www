/* eslint no-console: off */

import {SourceStore, storeInit} from "common/modules/_util/store";
import {initBareBonesTranscriptPage} from "common/modules/_page/startup";
import {initialize as acqVideoInit} from "common/modules/_video/acq";

import {loadConfig} from "./modules/_config/config";
import about from "./modules/_about/about";
import toc, {getBookId} from "./modules/_contents/toc";
import contact from "./modules/_forms/contact";

import constants from "./constants";

$(document).ready(() => {
  const store = new SourceStore(constants);
  storeInit(constants);
  acqVideoInit();

  //load config file and do initializations that depend on a loaded config file
  loadConfig(getBookId()).then((result) => {
    initBareBonesTranscriptPage(store);
    contact.initialize("acq-contact-form");
    about.initialize();
    toc.initialize("transcript");
  }).catch((error) => {
    console.error(error);
  });
});
