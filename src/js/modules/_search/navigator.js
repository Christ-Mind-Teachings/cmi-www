/*
  search results query navigator
*/
import scroll from "scroll-into-view";
import notify from "toastr";
//import {storeGet, storeSet} from "../_util/store";
//const page = require("../_config/key");

const SCROLL_INTERVAL = 250;

//source specific settings
let g_sourceInfo;

function scrollComplete(message, type) {
  //console.log(`${message}: ${type}`);
}

/**
 * Remove <mark> highlighting search terms when search navigator closes
 */
function clearMarks() {
  let marks = document.querySelectorAll("mark.show-mark");
  for (let mark of marks) {
    mark.outerHTML = mark.innerHTML;
  }
}

function scrollIntoView(id, caller) {
  scroll(document.getElementById(id), {align: {top: 0.2}}, (type) => {
    scrollComplete(`scroll from search navigator ${caller}(${id})`, type);
  });
}

class PageMatches {
  //constructor(query, start, end, hits) {
  constructor(searchResults, hitPositions, bookId) {
    this.query = searchResults.query;
    this.start = hitPositions.start;
    this.end = hitPositions.end;
    this.count = this.end - this.start + 1;
    this.hits = searchResults.flat;
    this.results = searchResults;
    this.removeCount = 0;
    this.bookId = bookId;
  }

  itemsMarkedForRemoval() {
    //return this.hits.findIndex(e => e.remove) !== -1;
    return this.removeCount > 0;
  }

  setState(location, remove) {
    if (remove) {
      $(".search-navigator .remove-match").html(`<i class="trash restore red icon"></i>${g_sourceInfo.gs("search:s39", "Restore")}`);
      $(`#${location}`).addClass("remove");

      $(".search-navigator .save-changes.button").removeClass("disabled");

      if (this.removeCount > 1) {
        $(".remove-count").text(` (${this.removeCount} ${g_sourceInfo.gs("search:s29", "matches marked")})`);
      }
      else {
        $(".remove-count").text(` (${this.removeCount} ${g_sourceInfo.gs("search:s28", "match marked")})`);
      }
    }
    else {
      $(".search-navigator .remove-match").html(`<i class="trash green icon"></i>${g_sourceInfo.gs("search:s38", "Remove")}`);
      $(`#${location}`).removeClass("remove");

      if (!this.itemsMarkedForRemoval()) {
        $(".search-navigator .save-changes.button").addClass("disabled");
        $(".remove-count").text("");
      }
      else {
        if (this.removeCount > 1) {
          $(".remove-count").text(` (${this.removeCount} ${g_sourceInfo.gs("search:s29", "matches marked")})`);
        }
        else {
          $(".remove-count").text(` (${this.removeCount} ${g_sourceInfo.gs("search:s28", "match marked")})`);
        }
      }
    }
  }

  toggleMatch() {
    //unremove
    if (this.hits[this.current].remove) {
      delete this.hits[this.current].remove;
      this.removeCount--;
      this.setState(this.hits[this.current].location, false);
    }
    else {
      //remove hit, trash restore red icon
      this.hits[this.current].remove = true;
      this.removeCount++;
      this.setState(this.hits[this.current].location, true);
    }
  }

  setStart(current, first) {
    let pid = this.hits[current].location;

    if (first) {
      setTimeout(scrollIntoView, SCROLL_INTERVAL, pid, "setStart(first)");
    }
    else {
      scrollIntoView(pid, "setStart()");

      //remove class current from previous hit
      $(`#${this.hits[this.current].location}`).removeClass("current");

      //update 'Remove' option on navigator to reflect state of current match
      if (this.hits[current].remove) {
        $(".search-navigator .remove-match").html(`<i class="trash restore red icon"></i>${g_sourceInfo.gs("search:s39", "Restore")}`);
      }
      else {
        $(".search-navigator .remove-match").html(`<i class="trash green icon"></i>${g_sourceInfo.gs("search:s38", "Remove")}`);
      }
    }

    //set this.current to current current
    this.current = current;

    //add class current to current
    $(`#${this.hits[this.current].location}`).addClass("current");

    this.setTitle();
  }

  async setTitle() {
    let pos = this.current - this.start + 1;
    try {
      let sf = await g_sourceInfo.gs("search:s9", "Search for", true);
      let of = await g_sourceInfo.gs("search:s15", "of", true);
      let title = `${sf} <em>${this.query}</em> (${pos} ${of} ${this.count})`;
      $(".search-navigator-header-query").html(title);
    }
    catch(err) {
      console.error("Error waiting for translated values");
      $(".search-navigator-header-query").html(`Translation Error`);
    }

  }

  /*
    Move to previous match or last match if we're on the first one
  */
  setPrevious() {
    //no where to go if there's only one match on the page
    if (this.start === this.end) {
      return;
    }
    let pos = this.current - 1;

    if (pos < this.start) {
      pos = this.end;
    }

    this.setStart(pos);
  }

  /*
    Move to next match position or the first if we're on the last
  */
  setNext() {
    //no where to go if there's only one match on the page
    if (this.start === this.end) {
      return;
    }
    let pos = this.current + 1;

    if (pos > this.end) {
      pos = this.start;
    }

    this.setStart(pos);
  }

  showCurrent() {
    let pid = this.hits[this.current].location;
    scroll(document.getElementById(pid), {align: {top: 0.2}});
  }
}

//hilight terms on page for current search
function markSearchHits(searchHits, start, end, query, state) {
  let markFailure = 0;

  //Note: this regex wont find a string within a string - only finds
  //matches that begin on a word boundary
  //var regex = new RegExp("(?:^|\\b)(" + searchData.query + ")(?:$|\\b)", "gim");
  let regex = new RegExp("(?:^|\\b)(" + query + ")(?:$|\\b|)", "gim");
  for (let i = start; i <= end; i++) {
    let id = searchHits[i].location;
    let el = document.getElementById(id);

    // a data error is indicated by el == null
    if (!el) {
      markFailure++;
      continue;
    }
    let content = el.innerHTML;

    //remove newline chars in content - they can prevent the
    //query string from being highlighted
    content = content.replace(/[\r\n]/gm," ");
    if (state === "show") {
      el.innerHTML = content.replace(regex, "<mark class='show-mark'>$1</mark>");
    }
    else {
      el.innerHTML = content.replace(regex, "<mark class='hide-mark'>$1</mark>");
    }

    //test if query was highlighted
    if (el.innerHTML === content) {
      console.log("Regex did not match: \"%s\" for %s", query, id);
      markFailure++;
    }
  }

  return markFailure;
}

/*
  Set up listeners for search navigator links
  args: matches - keeps track of page specific search hits
*/
function initClickListeners(matches) {

  //previous search
  $(".search-navigator .previous-match").on("click.navigator", function(e) {
    e.preventDefault();
    matches.setPrevious();
  });

  $(".search-navigator .next-match").on("click.navigator", function(e) {
    e.preventDefault();
    matches.setNext();
  });

  $(".search-navigator .current-match").on("click.navigator", function(e) {
    e.preventDefault();
    matches.showCurrent();
  });

  $(".search-navigator .remove-match").on("click.navigator", function(e) {
    e.preventDefault();
    matches.toggleMatch();
  });

  $(".search-navigator .close-window").on("click.navigator", function(e) {
    e.preventDefault();

    if (matches.itemsMarkedForRemoval()) {
      notify.error(g_sourceInfo.gs("search:s30", "Save changes before closing Navigator."));
      return;
    }

    //reset Remove/Restore link in case navigator opens again
    $(".search-navigator .save-changes.button").addClass("disabled");
    $(".search-navigator .remove-match").html(`<i class="trash green icon"></i>${g_sourceInfo.gs("search:s38", "Remove")}`);

    $(".search-navigator-wrapper").addClass("hide-search-navigator");
    $(".transcript").removeClass("search-navigator-active");

    //remove .current from current paragraph
    $(`#${matches.hits[matches.current].location}`).removeClass("current");

    clearMarks();
  });

  $(".search-navigator a.remove-hit-check").on("click.navigator", function(e) {

    if (matches.itemsMarkedForRemoval()) {
      notify.error(g_sourceInfo.gs("search:s31", "Save changes before leaving page."));
      return false;
    }

    return true;
  });

  /*
   * Update matches object and save to local store
   */
  $(".search-navigator .save-changes.button").on("click.navigator", function(e) {
    //use filter to get removed items
    let removedArray = matches.results.flat.filter((e,i) => {
      if (e.remove) {
        e.bid = matches.bookId;
        e.idx = i;

        //make sure remove and current classes are removed
        $(`#${e.location}`).removeClass("remove current");
      }

      return e.remove;
    });

    //reverse array so we delete items from the back to the front
    removedArray.reverse();

    //all element of removedArray have the same bookId and pageKey
    let bid = removedArray[0].bid;
    let key = removedArray[0].key;

    //find the hits to be removed
    let pageHits = matches.results.data[bid].filter((e,i) => {
      if ( e.pageKey === key) {
        e.index = i;
        return true;
      }
      return false;
    });

    //console.log("removed: %o", removedArray);
    //console.log("pageHits: %o", pageHits);

    //remove from data and flat arrays in matches
    removedArray.forEach(e => {
      let index = pageHits[0].m.findIndex(i => {return e.location === i.location;});

      if (index > -1) {
        //remove array item from matches data array
        pageHits[0].m.splice(index,1);

        //remove array item from matches flat aray
        matches.results.flat.splice(e.idx, 1);
      }
    });

    let newPid = "";

    //clean up: remove page from data array if it has no hits
    if (pageHits[0].m.length === 0) {
      matches.results.data[bid].splice(pageHits[0].index, 1);

      //clean up: remove book if it has no hits
      if (matches.results.data[bid].length === 0) {
        delete matches.results.data[bid];
      }
    }
    else {
      //get first hit on page to use to reset navigator
      newPid = pageHits[0].m[0].location;
    }

    //update hit count
    matches.results.count = matches.results.flat.length;

    //notify user
    if (matches.removeCount > 1) {
      notify.info(`${matches.removeCount} ${g_sourceInfo.gs("search:s32", "Matches Removed")}!`);
    }
    else {
      notify.info(`1 ${g_sourceInfo.gs("search:s33", "Match Removed")}!`);
    }

    //reset removeCount
    matches.removeCount = 0;

    //mark results as modified
    // - this will cause the results to be persisted before a new query is run
    matches.results.modified = true;

    //update modified list in local store
    //storeSet("srchResults", matches.results);
    g_sourceInfo.setValue("srchResults", matches.results);

    //display next search hit on page if any or show the search modal
    if (newPid !== "") {
      //there are more matches on the page so close and reset navigator
      $(".search-navigator .close-window").trigger("click");

      //remove all navigator event handlers
      $(".search-navigator .previous-match").off("click.navigator");
      $(".search-navigator .next-match").off("click.navigator");
      $(".search-navigator .current-match").off("click.navigator");
      $(".search-navigator .remove-match").off("click.navigator");
      $(".search-navigator .close-window").off("click.navigator");
      $(".search-navigator a.remove-hit-check").off("click.navigator");
      $(".search-navigator .save-changes.button").off("click.navigator");

      //reset search navigator
      initControls(newPid);
    }
    else if (!$(".search-navigator a.next-page").hasClass("inactive")) {
      //this does not work - don't know why!!
      //$(".search-navigator a.next-page").trigger("click");

      let href = $(".search-navigator a.next-page").attr("href");
      //console.log("href: %s", href);

      //this works, yay!
      location.href=`${location.origin}${href}`;
    }
    else {
      //open search dialog
      $(".search-navigator .close-window").trigger("click");
      $("#search-modal-open").trigger("click");
    }
  });
}

/*
  first and last positions for this pages search hits and
  the next and previous pages.
*/
function findPositions(pid, pageKey, flat) {
  let positions = {
    current: -1,    //current para with search match
    prev: -1,       //previous page with search match
    start: -1,      //first para with match on page
    end: -1,        //last para with match on page
    next: -1        //next page with search match
  };

  let found = false;

  for (let i = 0; i < flat.length; i++) {
    if (flat[i].key === pageKey) {
      if (flat[i].location === pid) {
        positions.current = i;
      }
      if (!found) {
        //first match on page
        positions.start = i;
        positions.end = i;
        found = true;

        if (i > 0) {
          //the previous page with a match
          positions.prev = i - 1;
        }
      }
      else {
        //more than one match on the page
        positions.end = i;
      }
    }
    else if (found) {
      //positions.end = i - 1;
      positions.next = i;
      break;
    }
  }

  //console.log("positions: %o", positions);
  return positions;
}

function initControls(pid) {
  //let lastSearch = store.get(queryResultName);
  //let lastSearch = storeGet("srchResults");
  let lastSearch = g_sourceInfo.getValue("srchResults");

  if (!lastSearch) {
    notify.warning(g_sourceInfo.gs("search:s34", "There are no search results to show."));
    return;
  }

  //console.log("lastSearch: %o", lastSearch);

  //let pageKey = page.genPageKey();
  let pageKey = g_sourceInfo.keyInfo.genPageKey();
  let pageKeyString = pageKey.toString(10);
  //let bid = page.decodeKey(pageKey).bookId;
  let bid = g_sourceInfo.keyInfo.decodeKey(pageKey).bookId;
  let title = lastSearch.titleArray[bid];

  //when ?srch=p2 and p2 does not contain a search hit
  if (!lastSearch.pageInfo[pageKey]) {
    notify.warning(`${g_sourceInfo.gs("search:s35", "There is no search result at")} ${pid}`);
    return;
  }

  let hitPositions = findPositions(pid, pageKeyString, lastSearch.flat);
  let url;

  //check that requested search hit is valid
  if (hitPositions.current === -1) {
    notify.warning(`${g_sourceInfo.gs("search:s35", "There is no search result at")} ${pid}`);
    return;
  }

  if (hitPositions.prev > -1) {
    url = `${g_sourceInfo.prefix}${lastSearch.flat[hitPositions.prev].url}?srch=${lastSearch.flat[hitPositions.prev].location}`;
    $(".search-navigator .previous-page").attr("href", url);
  }
  else {
    $(".search-navigator .previous-page").addClass("inactive");
  }

  if (hitPositions.next > -1) {
    url = `${g_sourceInfo.prefix}${lastSearch.flat[hitPositions.next].url}?srch=${lastSearch.flat[hitPositions.next].location}`;
    $(".search-navigator .next-page").attr("href", url);
  }
  else {
    $(".search-navigator .next-page").addClass("inactive");
  }

  if (hitPositions.start === hitPositions.end) {
    $(".search-navigator .previous-match").addClass("inactive");
    $(".search-navigator .next-match").addClass("inactive");
  }

  //set search navigator title
  $(".search-navigator-header-book").html(`${title} - ${lastSearch.pageInfo[pageKey].title}<span class=remove-count></span>`);

  //let matches = new PageMatches(lastSearch.query, hitPositions.start, hitPositions.end, lastSearch.flat);
  let matches = new PageMatches(lastSearch, hitPositions, bid);

  //arg 'true' causes 250ms deplay before calling scroll
  matches.setStart(hitPositions.current, true);

  let markFail = markSearchHits(lastSearch.flat, hitPositions.start, hitPositions.end, lastSearch.query, "show");
  if (markFail) {
    notify.info(`${g_sourceInfo.gs("search:s36", "Failed to highlight")} ${markFail} ${g_sourceInfo.gs("search:s37", "search results")}`);
  }
  initClickListeners(matches);

  //indicate search navigator is active by adding class to ./transcript
  $(".transcript").addClass("search-navigator-active");
  $(".search-navigator-wrapper").removeClass("hide-search-navigator");
}

export function initNavigator(requestedPid, si) {
  //console.log("init search navigator pid: %s", requestedPid);
  g_sourceInfo = si;

  initControls(requestedPid);
}

