/*
 * Local storage for bookmarks on page. 
 *
 * All bookmarks on current page are added when the page is loaded and this
 * cache is kept up to date with bookmark updates, deletions and creations.
 *
 * The local store is referenced for display of popup when cursor is hovered over
 * bookmarks on the page, when a bookmark is edited or shared.
 *
 * We don't use the browsers local store because we don't need to persist bookmarks
 * accross pages.
 */

import {storeGet, storeSet} from "../_util/store";
import difference from "lodash/difference";
import {noMoreBookmarks, bookmarksLoaded} from "./topics";
import {processBookmark} from "./bookmark";

/**
 * Convert paragraphKey from number to String and add
 * zero's if needed so decimal part contains 3 digits.
 */
function toString(paraKey) {
  let pk = `${paraKey}`;
  let decimalPos = pk.indexOf(".");

  if (decimalPos > -1) {
    let fpart = pk.substring(decimalPos + 1);
    //console.log("pk: %s, fpart: %s", pk, fpart);
    switch (fpart.length) {
      case 1:
        pk = `${pk}00`;
        break;
      case 2:
        pk = `${pk}0`;
        break;
      case 3:
        // format is correct
        break;
      default:
        // Houston, we've got a problem
        // console.err(`paragraph key format error: ${pk}`);
        break;
    }
  }
  // console.log("pk returned: %s", pk);

  return pk;
}

export class BookmarkLocalStore {
  /**
   * Add list of bookmarks on page to this.list and add the topics for each
   * bookmark to the topics Map. Increment count to record the number of references
   * to each topic.
   *
   * @constructor
   * @param {array} bmList - array of bookmarks on page
   */
  constructor(bmList, sharePid) {
    this.list = bmList;
    this.topics = new Map();
    this.topicsModified = false;
    this.sharePid = sharePid;

    //load topics from bmList in to topic Map
    this._initTopics();
  }

  /**
   * Add topic to Map if not present, set count to 1. If present
   * increment count by 1.
   *
   * @params <object> newTopic - {value: "topicNospaces", topic: "might have spaces"}
   */
  _incrementTopic(newTopic, initializing = false) {
    //get number of topics before updating
    let size = this.topics.size;
    let key = newTopic.value;

    //if newTopic is not in topics, add it and set count to 1
    if (!this.topics.has(key)) {
      newTopic.count = 1;
      this.topics.set(key, newTopic);
      this.topicsModified = true;
    }
    else {
      let savedTopic = this.topics.get(key);
      savedTopic.count += 1;
      this.topics.set(key, savedTopic);
    }

    //this is the first topic on the page so we
    //need to initialize topics modal (for filtering page topics)
    if (size === 0 && !initializing) {
      bookmarksLoaded();
    }
  }

  /**
   * Decrement or remove topic from topic Map
   * @param {object} - topic
   * @returns {boolean} {remainingCount: <number>, modified: <boolean>}
   */
  _decrementTopic(topic) {
    let key = topic.value;
    let modified = false;

    //unexpected
    if (!this.topics.has(key)) {
      return;
    }

    let trackedTopicValue = this.topics.get(key);

    //no more bookmarks on page with this topic
    if (trackedTopicValue.count === 1) {
      this.topics.delete(key);
      this.topicsModified = true;
    }
    else {
      //decrement count and store value
      trackedTopicValue.count -= 1;
      this.topics.set(key, trackedTopicValue);
    }

    //if the last topic on the page has been deleted remove
    //access to topic filter
    if (this.topics.size === 0) {
      noMoreBookmarks();
    }
  }

  /*
   * Load bookmark topics into Map. This is used to selectively
   * display bookmarks on page by given topic. Load topics only
   * for selectedText annotations.
   */
  _initTopics() {
    this.list.forEach((b) => {
      processBookmark("loaded", b, this.sharePid);
      if (!b.annotation.selectedText) {
        return;
      }
      if (b.annotation.topicList && b.annotation.topicList.length > 0) {
        b.annotation.topicList.forEach((topic) => {
          this._incrementTopic(topic, true);
        });
      }
    });

    this.topicsModified = true;
  }

  /*
   * A list of bookmarks, formated for display in the bookmark modal,
   * is stored in the browsers local storage. When bookmarks are added,
   * updated or deleted this list must be recreated.
   *
   * This invalidates the list because it knows about all bookmark changes.
   */
  _invalidateBmList() {
    let bmList = storeGet("bmList");

    //this is not expected
    if (!bmList) return;

    //invalidate list
    bmList.lastBuildDate = 0;
    storeSet("bmList", bmList);

    return;
  }

  /*
   * Returns unique topics used by page annotations
   */
  getTopics() {
    return this.topics;
  }

  /**
   * Get state of topic array
   *
   * @returns {boolean} true if topics have be added or removed
   */
  get topicRefreshNeeded() {
    return this.topicsModified;
  }

  /*
   * Set state of topic refresh needed flag
   */
  set topicRefreshNeeded(value) {
    this.topicsModified = value;
  }

  /*
   * Find the bookmark with aid and return its creationDate
   */
  getCreationDate(aid) {
    let bkmrk = this.list.find((b) => {
      if (b.annotation.aid && b.annotation.aid === aid) {
        return true;
      }
      return false;
    });

    if (bkmrk) {
      return bkmrk.creationDate;
    }

    //return undefined
    return bkmrk;
  }

  /**
   * Get bookmark for pid with aid.
   *
   * Only annotations with selectedText have aid. Note style
   * annotation don't but they do have creationDate so check
   * aid against creationDate if annotation.aid is not present.
   *
   * @param {string} pid - paragraph Id starting with "p"
   * @param {string} aid - uuid, only present with selectedText
   * @return {object} - or undefined 
   */
  getItem(pid, aid) {
    let id = parseInt(pid.substr(1), 10);

    //get array of bookmarks for pid
    let bms = this.list.filter((b) => {
      return b.pid === id;
    });

    let bm = bms.find((b) => {
      if (aid) {
        if (b.annotation.aid) {
          return b.annotation.aid === aid;
        }
        return b.annotation.creationDate == aid;
      }
      return typeof b.annotation.aid === "undefined";
    });

    return bm;
  }

  /**
   * Add or update annotation to the list. Update topic Map
   * accordingly.
   *
   * @param {string} - userId
   * @param {string} - paraKey
   * @param {string} - creationDate
   * @param {object} - annotation (the bookmark)
   */

  addItem(userId, paraKey, creationDate, annotation) {
    let pid = annotation.rangeStart;
    let id = parseInt(pid.substr(1), 10);

    if (typeof paraKey === "number") {
      paraKey = toString(paraKey);
    }

    if (annotation.status === "new") {
      annotation.creationDate = creationDate;
      let bkmrk = {
        userId: userId,
        paraKey: `${paraKey}`,
        creationDate: `${creationDate}`,
        pid: id,
        annotation: annotation,
      };
      this.list.push(bkmrk);

      //add topics to topic Map for selectedText bookmarks
      if (bkmrk.annotation.selectedText && bkmrk.annotation.topicList) {
        bkmrk.annotation.topicList.forEach((i) => {
          this._incrementTopic(i);
        });
      }

      //item has been added so invalidate bmList
      this._invalidateBmList();

      //get number of bookmarks on paragraph
      let bms = this.list.filter((b) => {
        return b.pid === id;
      });

      //process new bookmark
      processBookmark("created", bkmrk, bms.length - 1);
    }
    else { //this is an update
      let pKey = `${paraKey}`;
      let cDate = `${creationDate}`;
      let index = this.list.findIndex((i) => {
        return (i.paraKey === pKey && i.creationDate === cDate);
      });

      if (index === -1) throw new Error("localStore: addItem:update: bookmark to update not found in list");

      //update topic Map if needed
      if (annotation.selectedText) {
        let newTopicList = [];
        let oldTopicList = [];
        if (annotation.topicList) {
          let newTL = annotation.topicList.reduce((result, topic) => {
            return `${result} ${topic.value}`;
          }, "");

          newTL = newTL.trim();
          newTopicList = newTL.split(" ");
        }
        if (this.list[index].annotation.topicList) {
          let oldTL = this.list[index].annotation.topicList.reduce((result, topic) => {
            return `${result} ${topic.value}`;
          }, "");

          oldTL = oldTL.trim();
          oldTopicList = oldTL.split(" ");
        }

        let addedTopics = difference(newTopicList, oldTopicList);
        let deletedTopics = difference(oldTopicList, newTopicList);

        //add topics is any have been added
        addedTopics.forEach((i) => {
          //find topic in new annotation
          let topic = annotation.topicList.find((t) => {
            return t.value === i;
          });
          this._incrementTopic(topic);
        });

        //delete topics if any have been deleted
        deletedTopics.forEach((i) => {
          //find topic in old annotation
          let topic = this.list[index].annotation.topicList.find((t) => {
            return t.value === i;
          });
          this._decrementTopic(topic);    
        });
      }

      //update annotation in local store
      this.list[index].annotation = annotation;

      //process updated bookmark
      processBookmark("updated", this.list[index]);
    }
  }

  /**
   * Delete bookmark from list
   *
   * @param {string} userId
   * @param {string} paraKey
   * @param {string} creationDate
   * @return {object} {remainingCount: null || number left, modified: boolean}
   *
   */
  deleteItem(userId, paraKey, creationDate) {
    if (typeof paraKey !== "string") {
      paraKey = `${paraKey}`;
    }

    if (typeof creationDate !== "string") {
      creationDate = `${creationDate}`;
    }

    let index = this.list.findIndex((i) => {
      if (i.userId === userId && i.paraKey === paraKey && i.creationDate === creationDate) {
        return true;
      }
      return false;
    });

    //if item found, delete it from local store and get count remaining
    //bookmarks on paragraph
    let topicsModified = false;
    if (index > -1) {
      let bkmrk = this.list[index];
      let pid = bkmrk.pid;

      //delete topics from topic Map
      if (this.list[index].annotation.topicList) {
        this.list[index].annotation.topicList.forEach((i) => {
          topicsModified = this._decrementTopic(i) || topicsModified;    
        });
      }

      //delete item
      this.list.splice(index, 1);

      //item has been deleted so invalidate bmList
      this._invalidateBmList();

      //get remaining bookmarks on paragraph
      let bms = this.list.filter((b) => {
        return b.pid === pid;
      });

      //process deleted bookmark
      processBookmark("deleted", bkmrk, bms.length);

      return {remainingCount: bms.length, modified: topicsModified};
    }

    return {remainingCount: null, modified: topicsModified};
  }

  /*
   * Return the number of bookmarks for pid and exclude
   * bookmark with aid from the count.
   *
   * @param {string} pid - paragraph Id
   * @param {string} aid - annotation to exclude from count
   * @return {number}
   */
  itemCount(pid, aid) {
    if (!aid) {
      return 0;
    }

    let id = parseInt(pid.substr(1), 10);

    let bms = this.list.filter((b) => {
      return b.pid === id;
    });

    let count = bms.reduce((count, b) => {
      if (b.annotation.aid && b.annotation.aid !== aid) {
        count = count + 1;
      }
      return count;
    }, 0);

    return count; 
  }
}


