import axios from "axios";
import globals from "../../globals";
import cloneDeep from "lodash/cloneDeep";

/*
 * Format paraKey so it contains 3 decimal positions
 */
function formatKey(key) {
  if (typeof key !== "string") {
    key = key.toString(10);
  }

  let decimalPos = key.indexOf(".");

  //invalid key, but return it anyway.
  if (decimalPos === -1) {
    return `${key}.001`;
  }

  let intPart = key.substr(0, decimalPos);
  let decimalPart = key.substr(decimalPos + 1);
  let padding = decimalPart.length === 2 ? "0" : decimalPart.length === 1 ? "00" : "";

  return `${intPart}.${decimalPart}${padding}`;
}

/*
 * Get array of annotations from server, add a numeric pid to each item, and
 * parse stringified selectedText.
 *
 * Return array of annotations.
 * {
 *   annotation: {
 *     Comment: <string>,
 *     rangeStart: <string>,
 *     rangeEnd: <string>,
 *     [selectedText]: <object>,
 *     [aid]: <string>
 *     topicList: [{value, topic},...],
 *     userId: <string>,
 *     creationDate: <string>
 *   }, 
 *   userId: <string>,
 *   paraKey: <string>,
 *   creationDate: <string>,
 *   pid: <number>
 * }
 */
export function getAnnotations(userId, key) {
  return new Promise((resolve, reject) => {
    axios.get(`${globals.user2}/queryAnnotation/${userId}/${key}`)
      .then((response) => {
        let bmList = response.data.response;

        bmList.forEach((b) => {
          //numeric pid, not representative of key
          // - used to find annotations for a given paragraph
          b.pid = parseInt(b.annotation.rangeStart.substring(1), 10);

          //add userId and creationDate to annotation, this is used by the
          //bookmark navigator
          b.annotation.userId = b.userId;
          b.annotation.creationDate = b.creationDate;

          //parse selectedText JSON object
          if (b.annotation.selectedText) {
            b.annotation.selectedText = JSON.parse(b.annotation.selectedText);
          }
        });

        //sort bookmarks by numeric pid
        bmList.sort((a,b) => {
          return a.paraKey - b.paraKey;
        });
        resolve(bmList);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/*
 * Called by topicmanager
 */
export function updateAnnotation(bookmark) {
  let clone = cloneDeep(bookmark);

  if (clone.annotation.selectedText) {
    if (typeof clone.annotation.selectedText !== "string") {
      //convert selectedText to JSON
      clone.annotation.selectedText = JSON.stringify(clone.annotation.selectedText);
    }
  }

  return postAnnotation(clone.userId, clone.paraKey, clone.creationDate, clone.annotation);
}

/*
 * Save annotation to DynamoDb
 */
export function postAnnotation(userId, paraKey, creationDate, annotation) {
  if (typeof creationDate !== "string") {
    creationDate = creationDate.toString(10);
  }
  if (typeof paraKey !== "string") {
    paraKey = paraKey.toString(10);
  }

  let body = {
    userId: userId,
    paraKey: paraKey,
    creationDate: creationDate,
    annotation: annotation
  };

  return new Promise((resolve, reject) => {
    axios.post(`${globals.user2}/annotation`, body)
      .then((response) => { resolve(response.data.response); })
      .catch((err) => { reject(err); });
  });
}

/*
 * Get annotation from server, add userId and creationDate to the annotation,
 * parse stringified selectedText.
 *
 * Return annotation only.
 */
export function getAnnotation(userId, paraKey, creationDate) {
  return new Promise((resolve, reject) => {
    axios.get(`${globals.user2}/annotation/${userId}/${formatKey(paraKey)}/${creationDate}`)
      .then((response) => {
        console.log("getAnnotation: %o", response);
        let r = response.data.response;

        //annotation not found
        if (!r.userId) {
          resolve({});
          return;
        }

        r.annotation.userId = r.userId;
        r.annotation.creationDate = r.creationDate;

        if (r.annotation.selectedText) {
          r.annotation.selectedText = JSON.parse(r.annotation.selectedText);
        }

        resolve(r.annotation);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/*
 * Delete annotation
 */
export function deleteAnnotation(userId, paraKey, creationDate) {
  if (typeof creationDate !== "string") {
    creationDate.toString(10);
  }

  return new Promise((resolve, reject) => {
    axios.delete(`${globals.user2}/annotation/${userId}/${formatKey(paraKey)}/${creationDate}`)
      .then((response) => {
        resolve(response.data.response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
