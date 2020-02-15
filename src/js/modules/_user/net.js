import axios from "axios";
import globals from "../../globals";

const acimKey = require("acim/modules/_config/key");
const acolKey = require("acol/modules/_config/key");
const rajKey = require("raj/modules/_config/key");
const jsbKey = require("jsb/modules/_config/key");
const womKey = require("wom/modules/_config/key");

const ACIMSOURCEID = "12";
const ACOLSOURCEID = "14";
const RAJSOURCEID = "13";
const WOMSOURCEID = "10";
const JSBSOURCEID = "11";

export function getConfig(key) {
  let url = globals[key];

  if (!url) {
    throw `key: ${key} not found in globals`;
  }

  return axios.get(url);
}

export function getTopics(userId, sourceId) {
  let url = globals["topicsEndPoint"];

  if (!url) {
    throw "key: topicsEndPoint not found in globals";
  }

  url = `${url}/user/${userId}/topics/${sourceId}`;

  return axios.get(url);
}

export function getBookmarks(userId, sourceId) {
  let url = globals["bookmarkApi"];

  if (!url) {
    throw "key: 'bookmarkApi' not found in globals";
  }

  url = `${url}/bookmark/query/${userId}/${sourceId}`;

  return axios.get(url);
}

//transcript Node cache
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

function getNoteUrl(key) {
  let url;
  let akey = key + "";
  if (akey.startsWith(ACIMSOURCEID)) {
    url = acimKey.getUrl(key, true);
  }
  else if (akey.startsWith(ACOLSOURCEID)) {
    url = acolKey.getUrl(key, true);
  }
  else if (akey.startsWith(JSBSOURCEID)) {
    url = jsbKey.getUrl(key, true);
  }
  else if (akey.startsWith(RAJSOURCEID)) {
    url = rajKey.getUrl(key, true);
  }
  else if (akey.startsWith(WOMSOURCEID)) {
    url = womKey.getUrl(key, true);
  }

  return url;
}

export function getBookmarkText(bookmarks) {
  let promises = bookmarks.map(bm => {
    if (bm.bookmark.selectedText) {
      if (!bm.mgr) {
        bm.mgr = {};

        let st = JSON.parse(bm.bookmark.selectedText);
        bm.mgr.title = st.title;
        bm.mgr.url = st.url;
        bm.mgr.pid = st.pid;
        bm.mgr.content = [{pid: st.pid, text: st.target.selector[1].exact}];
        bm.mgr.comment = bm.bookmark.Comment;
        bm.mgr.note = bm.bookmark.Note;
        bm.mgr.type = "selected";
      }
      return Promise.resolve(bm);
    }
    //Note style bookmark
    else if (!bm.mgr) {
      let url = getNoteUrl(bm.id);

      bm.mgr = {};
      bm.mgr.type = "note";
      bm.mgr.title = bm.bookmark.bookTitle;
      bm.mgr.url = url;
      bm.mgr.pid = bm.bookmark.rangeStart;
      bm.mgr.comment = bm.bookmark.Comment;
      bm.mgr.note = bm.bookmark.Note;

      //get 'document' response from axios
      return getNoteTranscript(bm.id, url).then((resp) => {
        let paragraphs = resp.getElementsByTagName("p");
        let rangeStart = parseInt(bm.bookmark.rangeStart.substring(1), 10);
        let rangeEnd = parseInt(bm.bookmark.rangeEnd.substring(1), 10);
        bm.mgr.content = [];

        for (let p = rangeStart; p <= rangeEnd; p++) {
          bm.mgr.content.push({pid: `p${p}`, text: paragraphs[p].textContent});
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
