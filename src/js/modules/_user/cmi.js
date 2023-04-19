import {deleteQuote, putQuote, getQuoteData} from "common/modules/_ajax/quotes";
import axios from "axios";

const acimKey = require("acim/modules/_config/key");
const oeKey = require("oe/modules/_config/key");
const acolKey = require("acol/modules/_config/key");
const rajKey = require("raj/modules/_config/key");
const jsbKey = require("jsb/modules/_config/key");
const womKey = require("wom/modules/_config/key");
const pwomKey = require("pwom/modules/_config/key");
const colKey = require("col/modules/_config/key");
const ftcmKey = require("ftcm/modules/_config/key");

const WOMSOURCEID  = "10";
const JSBSOURCEID  = "11";
const ACIMSOURCEID = "12";
const RAJSOURCEID  = "13";
const ACOLSOURCEID = "14";
const OESOURCEID   = "15";
const PWOMSOURCEID = "16";
const COLSOURCEID  = "17";
const FTCMSOURCEID  = "18";

/**
 * Get the url for the page identified by "key"
 *
 * @param {string} key - the page key (paraKey)
 * @returns {string} the url of the page
 */
export function getUrlByPageKey(key) {
  if (typeof key !== "string") {
    key = `${key}`;
  }

  if (key.startsWith(ACIMSOURCEID)) {
    return acimKey.getUrl(key, true);
  }
  if (key.startsWith(OESOURCEID)) {
    return oeKey.getUrl(key, true);
  }
  if (key.startsWith(ACOLSOURCEID)) {
    return acolKey.getUrl(key, true);
  }
  if (key.startsWith(JSBSOURCEID)) {
    return jsbKey.getUrl(key, true);
  }
  if (key.startsWith(RAJSOURCEID)) {
    return rajKey.getUrl(key, true);
  }
  if (key.startsWith(WOMSOURCEID)) {
    return womKey.getUrl(key, true);
  }
  if (key.startsWith(PWOMSOURCEID)) {
    return pwomKey.getUrl(key, true);
  }
  if (key.startsWith(COLSOURCEID)) {
    return colKey.getUrl(key, true);
  }
  if (key.startsWith(FTCMSOURCEID)) {
    return ftcmKey.getUrl(key, true);
  }

  throw new Error(`getUrlByPageKey(${key}): invalid key`);
}

//transcript Node cache used by getBookmarkText()
let htmlCache = {};

function getNoteTranscript(id, url) {
  if (htmlCache[id]) {
    return Promise.resolve(htmlCache[id]);
  }

  const config = {responseType: "document"};
  return axios.get(url, config).then(response => {
    let transcriptNode = response.data.getElementsByClassName("transcript")[0];
    htmlCache[id] = transcriptNode;
    return Promise.resolve(transcriptNode);
  });
}

export function getBookmarkText(bookmarks) {
  let promises = bookmarks.map(bm => {
    if (bm.annotation.selectedText) {
      if (!bm.mgr) {
        bm.mgr = {};

        let st = bm.annotation.selectedText;
        bm.mgr.title = st.title;
        bm.mgr.url = st.url;
        bm.mgr.pid = st.pid;
        bm.mgr.content = [{pid: st.pid, text: st.target.selector[1].exact}];
        bm.mgr.comment = bm.annotation.Comment;
        bm.mgr.note = bm.annotation.Note;
        bm.mgr.type = "selected";
      }
      return Promise.resolve(bm);
    }
    //Note style bookmark
    else if (!bm.mgr) {
      let url = getUrlByPageKey(bm.paraKey);

      bm.mgr = {};
      bm.mgr.type = "note";
      bm.mgr.title = bm.annotation.bookTitle;
      bm.mgr.url = url;
      bm.mgr.pid = bm.annotation.rangeStart;
      bm.mgr.comment = bm.annotation.Comment;
      bm.mgr.note = bm.annotation.Note;

      //get 'document' response from axios
      return getNoteTranscript(bm.paraKey, url).then((resp) => {
        let paragraphs = resp.getElementsByTagName("p");
        let rangeStart = parseInt(bm.annotation.rangeStart.substring(1), 10);
        let rangeEnd = parseInt(bm.annotation.rangeEnd.substring(1), 10);
        bm.mgr.content = [];

        for (let p = rangeStart; p <= rangeEnd; p++) {
          if (paragraphs[p]) {
            bm.mgr.content.push({pid: `p${p}`, text: paragraphs[p].textContent});
          }
          else {
            bm.mgr.content.push({pid: `p${p}`, text: "no data for paragraph"});
          }
        }

        return Promise.resolve(bm);
      });
    }
    else {
      return Promise.resolve(bm);
    }
  });

  return promises;
}

