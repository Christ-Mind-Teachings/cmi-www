/* eslint no-console: off */

import "../vendor/semantic/semantic.min.js";

import {initStickyMenu} from "./modules/_page/startup";
import {bookmarkStart} from "./modules/_bookmark/start";
import search from "./modules/_search/search";
import toc from "./modules/_contents/toc";
import auth from "./modules/_user/netlify";
import about from "./modules/_about/about";

import {loadEmailListTable} from "./modules/_user/email";

$(document).ready(() => {
  initStickyMenu();
  bookmarkStart("page");
  search.initialize();
  auth.initialize();
  toc.initialize("page");
  about.initialize();

  //email mgt page
  if ($(".manage-email-list")) {
    console.log("loading email list table");
    loadEmailListTable();
  }

});

