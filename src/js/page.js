/* eslint no-console: off */
import {storeInit} from "common/modules/_util/store";
import auth from "common/modules/_user/netlify";
import {initStickyMenu, initAnimation} from "common/modules/_page/startup";

//used only for non-english languages
//import {setLanguage} from "common/modules/_language/lang";
//import lang from "./lang";

import toc from "./modules/_contents/toc";
import about from "./modules/_about/about";
import subscribe from "./modules/_forms/subscribe";

import constants from "./constants";

$(() => {
  storeInit(constants);
  initStickyMenu();

  //setLanguage(lang);

  auth.initialize();
  toc.initialize("page");
  about.initialize();

  subscribe.initialize();
  initAnimation(".card > a");
});
