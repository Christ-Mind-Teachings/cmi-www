import {getAnnotations} from "../_ajax/annotation";
import {storeSet} from "../_util/store"

function generateSegment(summaryElement) {
  // <a href="${summaryElement.url}" target="_blank"><i class="linkify icon"></i></a>
  return (`
    <div class="ui segment">
      <p><a href="${summaryElement.url}" title="${summaryElement.title}" target="_blank"><i class="linkify icon"></i></a> ${summaryElement.summary}</p>
    </div>
  `);
}

function generateSummaryList(summaryArray) {
  return (`
    ${summaryArray.map(s => `${generateSegment(s)}`).join("")}
  `);
}

/*
 * Build bookmark list for bookmark navigation:
 *  { pageKey: {pid: [], pid2:[] }
 *
 *  Store result in local storage
 */
function buildBookmarkListFromServer(response) {
  let bookmarks = {};

  response.forEach((b) => {
    let [pageKey, pKey] = b.paraKey.split(".");
    pKey = parseInt(pKey, 10) + "";

    if (!bookmarks[pageKey]) {
      bookmarks[pageKey] = {};
    }

    if (!bookmarks[pageKey][pKey]) {
      bookmarks[pageKey][pKey] = [];
    }
    bookmarks[pageKey][pKey].push(b.annotation);
  });

  // console.log("bookmarks: %o", bookmarks);
  storeSet("topicList", bookmarks);
}

/**
 * Get summarized text from annotation topics by topic value
 *
 * @param {string} ownerId = md5 hash of email address of annotation owner
 */
export async function getTopicList(ownerId, keyInfo) {
  let key = $("body").attr("data-key");
  let topic = $("body").attr("data-topic");

  try {
    // let {topicTotal, summary} = await getTopicSummaries(key, topic, ownerId);
    let topicList = await getAnnotations(ownerId, key, topic);

    // format for navigation and store in local storage
    buildBookmarkListFromServer(topicList);

    let summary = [];

    // find all topics with summary
    topicList.forEach((b) => {
      let topicItem = b.annotation.topicList.find(t => t.value === topic);
      let title;

      if (b.annotation.selectedText) {
        title = b.annotation.selectedText.title;
      }
      else {
        title = b.annotation.bookTitle;
      }

      if (topicItem.summary) {
        summary.push({title: title, paraKey: b.paraKey, pid: b.annotation.rangeStart, summary: topicItem.summary});
      }
    });

    summary.forEach(s => {
      s.url = `${keyInfo.getUrl(s.paraKey, true)}?tnav=${s.pid}&topic=${topic}`; 
    });

    console.log("summary: %o", summary);

    let html = generateSummaryList(summary);
    $(".topic-summary-list").html(html);

  }
  catch(err) {
    console.log("error: %s", err);
  }

}

