/* eslint no-console: off */

import "../vendor/semantic/semantic.min.js";

//common modules
import {showParagraph, loadStart} from "./modules/_util/url";
import auth from "./modules/_user/netlify";
import fb from "./modules/_util/facebook";
import {initTranscriptPage} from "./modules/_page/startup";

import {loadConfig} from "./modules/_config/config";
import {bookmarkStart} from "./modules/_bookmark/start";
import search from "./modules/_search/search";
import toc, {getBookId} from "./modules/_contents/toc";
import audio from "./modules/_audio/audio";
import about from "./modules/_about/about";

import contact from "./modules/_forms/contact";
import {initialize as acqVideoInit} from "./modules/_video/acq";

$(document).ready(() => {

  loadStart();
  initTranscriptPage();
  auth.initialize();
  fb.initialize();
  about.initialize();
  contact.initialize("acq-contact-form");
  acqVideoInit();

  //load config file and do initializations that depend on a loaded config file
  loadConfig(getBookId())
    .then((result) => {
      search.initialize();

      /*
        result of 0 indicates no contents config found
        - toc, and audio depend on config file
      */
      if (result !== 0) {
        toc.initialize("transcript");
        audio.initialize();
      }
      showParagraph();
      bookmarkStart("transcript");

      if ($(".disable-paragraph-marker").length > 0) {
        $(".toggle-paragraph-markers").eq(0).trigger("click");
      }
    })
    .catch((error) => {
      //report error to the user - somehow
      console.error(error);
    });
});
