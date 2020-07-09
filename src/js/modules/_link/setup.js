const {getUrl: www_getUrl} = require("../_config/key");
const {getUrl: acim_getUrl} = require("acim/modules/_config/key");
const {getUrl: oe_getUrl} = require("oe/modules/_config/key");
const {getUrl: acol_getUrl} = require("acol/modules/_config/key");
const {getUrl: jsb_getUrl} = require("jsb/modules/_config/key");
const {getUrl: raj_getUrl} = require("raj/modules/_config/key");
const {getUrl: wom_getUrl} = require("wom/modules/_config/key");
const {getUrl: pwom_getUrl} = require("pwom/modules/_config/key");

export function getUrl(source, key) {
  let url;
  switch(source) {
    case "acol":
      url = acol_getUrl(key, true);
      break;
    case "acim":
      url = acim_getUrl(key, true);
      break;
    case "acimoe":
      url = oe_getUrl(key, true);
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
    case "pwom":
      url = pwom_getUrl(key, true);
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
  return `${url}?v=${link.desc.pid}`;
}

export function createLinkListener(getLink) {
  $(".transcript").on("click", "td.follow-link-item", function(e) {
    e.preventDefault();

    //get link info
    let index = $(this).parent("tr").attr("data-index");
    let linkInfo = getLink(index);

    //build url
    let link = JSON.parse(linkInfo.link);

    //let url = getUrl(link.desc.source, link.key);

    //console.log("url: %s", url);
    location.href = getLinkHref(link);
  });
}

