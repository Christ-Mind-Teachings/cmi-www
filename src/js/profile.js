/* eslint no-console: off */

import "../vendor/semantic/semantic.min.js";
import bookmark from "./modules/_bookmark/bookmark";
import search from "./modules/_search/search";
import toc from "./modules/_contents/toc";
import auth from "./modules/_user/netlify";
import about from "./modules/_about/about";
import constants from "./constants";

import {loadEmailListTable} from "./modules/_user/email";

/*
  Fix main menu to top of page when scrolled
*/
function initStickyMenu() {
  // fix main menu to page on passing
  $(".main.menu").visibility({
    type: "fixed"
  });

  //show dropdown on hover
  $(".main.menu  .ui.dropdown").dropdown({
    on: "hover"
  });
}

function setLinks() {
  if (location.hostname === "localhost") {
    $("#www-christmind-info").removeAttr("href");

    $("#acim-christmind-info").attr("href", `http://localhost:${constants.ports.acim}/`);
    $("#wom-christmind-info").attr("href", `http://localhost:${constants.ports.wom}/`);
    $("#raj-christmind-info").attr("href", `http://localhost:${constants.ports.raj}/`);
    $("#jsb-christmind-info").attr("href", `http://localhost:${constants.ports.jsb}/`);
  }
  else if (location.pathname === "/") {
    //remove the link that links to the current page
    $("#www-christmind-info").removeAttr("href");
  }
}

$(document).ready(() => {
  initStickyMenu();
  setLinks();

  bookmark.initialize();
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

