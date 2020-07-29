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

export class BookmarkLocalStore {
  /*
   * @param {array} bmList - array of bookmarks on page
   */
  constructor(bmList) {
    this.list = bmList;
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
   * Get bookmark for pid with aid.
   *
   * Only annotations with selectedText have aid. Note style
   * annotation don't but they do have creationDate so check
   * aid agains creationDate if annotation.aid is not present.
   *
   * @param {string} pid - paragraph Id starting with "p"
   * @param {string} aid - uuid, only present with selectedText
   * @return {object} - or undefined 
   */
  getItem(pid, aid) {
    let id = parseInt(pid.substr(1), 10);

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

  /*
   * Add bookmark to list
   *
   * @param {string} - userId
   * @param {string} - paraKey
   * @param {string} - creationDate
   * @param {object} - annotation (the bookmark)
   */
  addItem(userId, paraKey, creationDate, annotation) {
    let pid = annotation.rangeStart;
    let id = parseInt(pid.substr(1), 10);
    let bkmrk = {
      userId: userId,
      paraKey: `${paraKey}`,
      creationDate: `${creationDate}`,
      pid: id,
      annotation: annotation
    };
    this.list.push(bkmrk);

    //item has been added so invalidate bmList
    this._invalidateBmList();
  }

  /*
   * Delete bookmark from list
   *
   * @param {string} userId
   * @param {string} paraKey
   * @param {string} creationDate
   * @return {number} - count of remaining bookmarks for paraKey or null if bookmark not found
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
    if (index > -1) {
      let pid = this.list[index].pid;

      //delete item
      this.list.splice(index, 1);

      //item has been deleted so invalidate bmList
      this._invalidateBmList();

      let bms = this.list.filter((b) => {
        return b.pid === pid;
      });

      return bms.length;
    }

    return null;
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


