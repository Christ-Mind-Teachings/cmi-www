const {getUrl: www_getUrl} = require("../_config/key");
const {getUrl: acim_getUrl} = require("acim/modules/_config/key");
const {getUrl: acol_getUrl} = require("acol/modules/_config/key");
const {getUrl: jsb_getUrl} = require("jsb/modules/_config/key");
const {getUrl: raj_getUrl} = require("raj/modules/_config/key");
const {getUrl: wom_getUrl} = require("wom/modules/_config/key");

import net from "../_bookmark/bmnet";
import globals from "../../globals";
import store from "store";

function getUrl(source, key) {
  let url;
  switch(source) {
    case "acol":
      url = acol_getUrl(key, true);
      break;
    case "acim":
      url = acim_getUrl(key, true);
      break;
    case "jsb":
      url = jsb_getUrl(key, true);
      break;
    case "raj":
      url = raj_getUrl(key, true);
      break;
    case "wom":
      url = wom_getUrl(key, true);
      break;
    case "www":
      url = www_getUrl(key, true);
      break;
    default:
      url = "/invalid/source";
  }

  return url;
}

export function getLinkHref(link) {
  let url = getUrl(link.desc.source, link.key);

  if (location.pathname === url) {
    return `#${link.desc.pid}`;
  }
  return `${url}?link=${link.desc.pid}&aid=${link.aid}`;
}

export function getLinkReturnHref(annotation) {
  let url = annotation.uri;

  if (location.pathname === url) {
    return `#${annotation.rangeStart}`;
  }
  return `${url}?return=${annotation.rangeStart}&aid=${annotation.creationDate}`;
}

/*
  Set up click handler for links clicked from annotation editor and quickLink icon.
*/
export function createLinkListener(getLink) {
  $(".transcript").on("click", "td.follow-link-item > i:not(.disabled)", function(e) {
    e.preventDefault();

    //get link info
    let index = $(this).parents("tr").attr("data-index");
    let linkInfo = getLink(index);

    //build url
    let link = JSON.parse(linkInfo.link);

    //aid of this annotation
    let aid = $(this).parent("td").attr("data-aid");
    let pid = $(this).parent("td").attr("data-pid");

    //get annotation link list and store in local storage so destination
    //page can offer link back and to link to other destinations in annotation.
    let annotation = net.getAnnotation(pid, aid);
    annotation.uri = location.pathname;

    //close bookmark editor
    $(".annotation-cancel").trigger("click");

    //store annotation to local storage
    store.set(globals.linkOriginKey, annotation);

    let href = getLinkHref(link);
    //console.log("td.follow-link-item url: %s, pid: %s", href, aid, pid);
    //console.log("annotation: %o", annotation);
    location.href = href;
  });

  /*
    User clicked link in linkify popup
  */
  $(".bm-link-list-popup").on("click", "a.follow-bm-link", function(e) {
    e.preventDefault();

    //get link info
    let href = $(this).attr("href");
    let aid = $(this).attr("data-aid");
    let pid = $(this).attr("data-pid");

    let annotation = net.getAnnotation(pid, aid);
    annotation.uri = location.pathname;

    //store annotation to local storage
    store.set(globals.linkOriginKey, annotation);

    //close bookmark editor
    $(".annotation-cancel").trigger("click");

    //console.log("follow-bm-item href: %s, aid: %s, pid: %s", href, aid, pid);
    //console.log("annotation: %o", annotation);
    location.href = href;
  });
}
