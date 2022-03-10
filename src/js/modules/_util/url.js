import scroll from "scroll-into-view";

//timeout interval before calling scroll
const INTERVAL = 250;

//save auery string for subsequent calls
let qString = "";

/*
 * Get query string from url and store it incase url is reset
 */
function getQueryString(key) {
  let queryString = window.location.search.substring(1);

  if (queryString.length === 0) {
    queryString = qString;
  }
  else {
    qString = queryString;
  }

  let vars = queryString.split("&");

  for(let i=0; i<vars.length; i++) {
    let getValue = vars[i].split("=");
    if (getValue[0] === key) {
      return getValue[1];
    }
  }
  return null;
}

function scrollComplete(message, type) {
  //console.log(`${message}: ${type}`);
}

function scrollIntoView(id, caller) {
  scroll(document.getElementById(id), {align: {top: 0.2}}, (type) => {
    scrollComplete(`scroll from url.js ${caller}(${id})`, type);
  });
}

//remove query string from url
function resetUrl() {
  history.replaceState({}, document.title, location.origin + location.pathname);
}

//called when query request is complete
export function loadComplete() {
  $("#transcript-page-loading").removeClass("active");
  resetUrl();
}

//show loading for long loading steps - like showing annotations
export function loadStart() {
  let aInfo = getQueryString("as");

  if (aInfo) {
    $("#transcript-page-loading").addClass("active");
  }
}

/*
  Check for url query string requesting to scroll given paragraph into view
  Syntax: ?v=pid, example: ?v=p20

  Scroll paragraph 20 into view on page load
*/
export function showParagraph() {
  let pId = getQueryString("v");
  if (pId) {
    setTimeout(scrollIntoView, INTERVAL, pId, "showParagraph");
    resetUrl();
  }
}

/*
 * When url contains 'ro=<something>' we don't load audio or bookmarks
 */
export function isReadOnly() {
  let value = getQueryString("ro");
  if (value) {
    resetUrl();
    return true;
  }
  return false;
}

export function setBackgroundColor() {
  let value = getQueryString("bc");
  if (value) {
    return value;
  }
}

/*
  Check for query string containing ?tocbook. This is a request to display
  the table of contents for the specified book
*/
export function showTOC() {
  let book = getQueryString("tocbook");
  if (book) {
    $(`[data-book="${book}"]`).trigger("click");
  }
}

/*
 * Open search dialog on page load.
 * - Intended for teaching home page
 */
export function showSearch() {
  let show = getQueryString("search");
  console.log("showSearch %s", show);
  if (show) {
    resetUrl();
    $("#search-modal-open").trigger("click");
  }
}

/*
 * Open quote dialog on page load
 * - Must be used on home pages
 */
export function showQuotes() {
  let show = getQueryString("quotes");
  console.log("showQuotes %s", show);
  if (show) {
    resetUrl();
    setTimeout(() => {
      $("#show-quote-button").trigger("click");
    }, 500);
  }
}

export function showTopicBookmark() {
  let pId = getQueryString("tnav");
  let topic = getQueryString("topic");

  if (pId) {
    resetUrl();
    return {pid: pId, topic: topic};
  }
  return null;
}

export function showBookmark() {
  let pId = getQueryString("bkmk");

  if (pId) {
    resetUrl();
    return pId;
  }
  return null;
}

export function showSearchMatch() {
  let pId = getQueryString("srch");

  if (pId) {
    resetUrl();
    return pId;
  }
  return null;
}

export function showAnnotation() {
  let aInfo = getQueryString("as");

  if (aInfo) {
    return aInfo;
  }
  return null;
}

/*
  used for testing
*/
export function getUser() {
  let user = getQueryString("user");

  if (user) {
    resetUrl();
    return user;
  }

  return null;
}
