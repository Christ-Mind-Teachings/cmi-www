/* eslint no-console: off */

import {storeInit} from "./modules/_util/store";
//import "../../public/vendor/semantic/semantic.js";
//import "../vendor/semantic/semantic.min.js";

//common modules
import {showParagraph} from "./modules/_util/url";
import auth from "./modules/_user/netlify";
import fb from "./modules/_util/facebook";
import {initTranscriptPage} from "./modules/_page/startup";

import {loadConfig} from "./modules/_config/config";
import {bookmarkStart} from "./modules/_bookmark/start";
import search from "./modules/_search/search";
import toc, {getBookId} from "./modules/_contents/toc";
import about from "./modules/_about/about";
//import audio from "./modules/_audio/audio";

import contact from "./modules/_forms/contact";
import {initialize as acqVideoInit} from "./modules/_video/acq";

import {setLanguage} from "./modules/_language/lang";
import constants from "./constants";

$(document).ready(() => {
  storeInit(constants);
  setLanguage(constants);
  initTranscriptPage("pnDisplay");
  auth.initialize();
  fb.initialize();
  about.initialize();
  contact.initialize("acq-contact-form");
  acqVideoInit();

  //load config file and do initializations that depend on a loaded config file
  loadConfig(getBookId()).then((result) => {
    search.initialize();
    toc.initialize("transcript");
    //audio.initialize();
    showParagraph();
    bookmarkStart("transcript");
  }).catch((error) => {
    console.error(error);
  });
});
