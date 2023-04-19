/* eslint no-console: off */

//common modules
import {storeInit} from "common/modules/_util/store";
import {showParagraph} from "common/modules/_util/url";
import auth from "common/modules/_user/netlify";
import {initTranscriptPage} from "common/modules/_page/startup";
import {initialize as acqVideoInit} from "common/modules/_video/acq";

import {loadConfig} from "./modules/_config/config";
import toc, {getBookId} from "./modules/_contents/toc";
import about from "./modules/_about/about";
import contact from "./modules/_forms/contact";

import constants from "./constants";

$(document).ready(() => {
  storeInit(constants);
  initTranscriptPage("pnDisplay");
  auth.initialize();

  about.initialize();
  contact.initialize("acq-contact-form");
  acqVideoInit();

  //load config file and do initializations that depend on a loaded config file
  loadConfig(getBookId()).then((result) => {
    toc.initialize("transcript");
    showParagraph();
  }).catch((error) => {
    console.error(error);
  });
});
