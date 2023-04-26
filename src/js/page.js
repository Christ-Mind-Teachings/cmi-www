/* eslint no-console: off */
import {SourceStore, storeInit} from "common/modules/_util/store";
import {initBareBonesHomePage} from "common/modules/_page/startup";

import toc from "./modules/_contents/toc";
import about from "./modules/_about/about";
import subscribe from "./modules/_forms/subscribe";

import constants from "./constants";

$(() => {
  const store = new SourceStore(constants);
  storeInit(constants);

  initBareBonesHomePage(store);
  about.initialize();

  toc.initialize("page");
  subscribe.initialize();
});
