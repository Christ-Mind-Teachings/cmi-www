
//const searchEndpoint = "https://d9lsdwxpfg.execute-api.us-east-1.amazonaws.com/latest/wom";
//import axios from "axios";
import {searchSource} from "../_ajax/search";
import {getSearchResult, getSearchResultsList, putSearchResult} from "../_ajax/searchResults";
import {getUserInfo} from "../_user/netlify";

//import {storeGet, storeSet} from "www/modules/_util/store";
import { initShow, showSavedQuery, showSearchResults } from "./show";
import {showSearchMatch} from "../_util/url";
import { initNavigator } from "./navigator";
import notify from "toastr";

//search modal
const uiSearchModal = ".search.ui.modal";
const uiOpenSearchModal = ".search-modal-open";
const uiSearchForm = "#search";
const uiSearchSource = "#search .source";
const uiSearchString = "#search input";
const uiSavedSearchSelect = "#saved-search-select";
const uiSearchInputIcon = "#search .ui.icon.input";
const uiModalOpacity = 0.5;

//search modal message box
const uiSearchMessage = ".ui.search.message";
const uiSearchMessageHeader = ".search-message.header";
const uiSearchMessageBody = ".search-message-body";

//search message id's
const SEARCHING = Symbol("searching");
const SEARCH_RESULT = Symbol("search_result");
const SEARCH_ERROR = Symbol("search_error");
const SAVED_SEARCH_ERROR = Symbol("saved_search_error");
const SAVED_SEARCH = Symbol("saved_search");
const GET_SAVED_SEARCH = Symbol("get_saved_search");
const GET_SAVED_SEARCH_RESULT = Symbol("get_saved_search_result");

//global vars for module
let g_userInfo;
let g_sourceInfo;
let g_savedSearchDescriptions;

function displaySearchMessage(msgId, arg1, arg2, arg3) {
  switch(msgId) {
    case SEARCHING:
      $(uiSearchInputIcon).addClass("loading");
      $(uiSearchString).attr("disabled", true);
      $(uiSearchMessage).addClass("purple");
      $(uiSearchMessageHeader).text(`${g_sourceInfo.gs("search:s11", "Search Started")}...`);
      $(uiSearchMessageBody).html(`<p>${g_sourceInfo.gs("search:s12", "Searching for")} <em>${arg2}</em></p>`);
      break;
    case GET_SAVED_SEARCH:
      //$(uiSearchInputIcon).addClass("loading");
      $(uiSavedSearchSelect).addClass("disabled loading");
      $(uiSearchMessage).addClass("green");
      $(uiSearchMessageHeader).text(`${g_sourceInfo.gs("search:s13", "Please wait")}...`);
      $(uiSearchMessageBody).html(`<p>${g_sourceInfo.gs("search:s14", "Waiting for saved search")}: <em>${arg2}</em></p>`);
      break;
    case SAVED_SEARCH:
      //arg1: source, arg2: query string, arg3: count
      $(uiSearchMessageHeader).text(g_sourceInfo.gs("search:s10", "Last Search Result"));
      $(uiSearchMessageBody).html(`<p>${g_sourceInfo.gs("search:s12", "Search for")} <em>${arg2}</em> ${g_sourceInfo.gs("search:s15", "from")} <em>${arg1}</em> ${g_sourceInfo.gs("search:s7", "found")} ${arg3} ${g_sourceInfo.gs("search:s8", "matches")}</p>`);
      break;
    case SEARCH_RESULT:
      $(uiSearchInputIcon).removeClass("loading");
      $(uiSearchString).attr("disabled", false);
      $(uiSearchMessage).removeClass("purple").removeClass("negative");

      //clear input only if matches were found
      if (arg3 > 0) {
        $(uiSearchString).val("");
      }

      $(uiSearchMessageHeader).text(g_sourceInfo.gs("search:s16", "Search Result"));
      $(uiSearchMessageBody).html(`<p>${g_sourceInfo.gs("search:s19", "Search for")} <em>${arg2}</em> ${g_sourceInfo.gs("search:s7", "found")} ${arg3} ${g_sourceInfo.gs("search:s8", "matches")}</p>`);
      break;
    case GET_SAVED_SEARCH_RESULT:
      $(uiSavedSearchSelect).removeClass("disabled loading");
      $(uiSearchString).attr("disabled", false);
      $(uiSearchMessage).removeClass("green").removeClass("negative");

      //clear input only if matches were found
      $(uiSavedSearchSelect).dropdown("clear", true);
      break;
    case SEARCH_ERROR:
      $(uiSearchInputIcon).removeClass("loading");
      $(uiSearchString).attr("disabled", false);
      $(uiSearchMessage).removeClass("purple").addClass("negative");

      $(uiSearchMessageHeader).text(g_sourceInfo.gs("search:s17", "Search Error"));
      $(uiSearchMessageBody).html(`<p>${arg1}</p>`);
      break;
    case SAVED_SEARCH_ERROR:
      $(uiSearchSearchSelect).removeClass("loading");
      $(uiSearchString).attr("disabled", false);
      $(uiSavedSearchSelect).removeClass("disabled");
      $(uiSearchMessage).removeClass("green").addClass("negative");

      $(uiSearchMessageHeader).text(g_sourceInfo.gs("search:s18", "Saved Search Error"));
      $(uiSearchMessageBody).html(`<p>${arg1}</p>`);
      break;
    default:
      break;
  }
}

/*
 * Mark saved search results as not modified.
 */
function resetModifiedFlag() {
  const queryResult = g_sourceInfo.getValue("srchResults");

  if (queryResult && queryResult.modified) {
    queryResult.modified = false;
    g_sourceInfo.setValue("srchResults", queryResult);
  }
}

/*
 * Execute search query
 *
 * args:
 *  query: the search string
 *  exact: when true, limit results to exact matches
 *         eg: return devil but not devilish
 */
async function search(query, exact=false) {
  let searchBody = {
    source: g_sourceInfo.sid,
    strict: exact,
    query: query,
    width: 30,
    authorization: "guest"
  };

  //check for acol authorization
  //The search API gives full acol search access only when authorization="acol"
  if (g_sourceInfo.sid === "acol" && g_userInfo && g_userInfo.roles && g_userInfo.roles.includes("acol")) {
    searchBody.authorization = "acol";
  }

  //console.log("searchBody: %o", searchBody);
  try {
    let result = await searchSource(searchBody);
    displaySearchMessage(SEARCH_RESULT, "", `"${result.queryTransformed}"`, result.count);
    if (result.count > 0) {
      showSearchResults(result, result.queryTransformed);
    }
    else {
      notify.info(`${g_sourceInfo.gs("search:s19", "Search for")} "${result.queryTransformed}" ${g_sourceInfo.gs("search:s20", "didn't find any matches")}`);
    }
    document.getElementById("search-input-field").focus();
  }
  catch(error) {
    console.error("search error: %o", error);
    displaySearchMessage(SEARCH_ERROR, error.message);
  }
}

async function getSavedSearch(savedId) {
  //let userInfo = getUserInfo();

  try {
    //let result = await getSearchResult(g_userInfo.userId, "wom", savedId);
    let result = await getSearchResult(g_userInfo.userId, g_sourceInfo.sid, savedId);
    displaySearchMessage(GET_SAVED_SEARCH_RESULT, "", `"${result.query}"`, result.count);
    if (result.count > 0) {

      //update modified list in local store
      g_sourceInfo.setValue("srchResults", result);

      //disable show description button
      $("#search .show-desc").addClass("disabled");

      //show query results
      showSavedQuery();
    }
    else {
      notify.info(`${g_sourceInfo.gs("search:s5", "Saved Search")} "${result.name}" ${g_sourceInfo.gs("search:s26", "doesn't have any matches. This should not happen.")}`);
    }
    document.getElementById("search-input-field").focus();
  }
  catch(error) {
    console.error("saved search error: %o", error);
    displaySearchMessage(SAVED_SEARCH_ERROR, error.message);
  }
}

/*
 * Run search query or get saved search. If both query and saved search
 * are specified run the query only.
 */
function runQuery(query, savedSearchId, exact=false) {
  if (query.length > 0) {
    search(query, exact);
  }
  else {
    getSavedSearch(savedSearchId);
  }
}

function initTranscriptPage() {
  let displayPid = showSearchMatch();
  if (displayPid) {
    initNavigator(displayPid, g_sourceInfo);
  }
}

/*
 * Make list of saved searches for select.
 */
function makeList(savedSearches) {

  //save descriptions
  g_savedSearchDescriptions = {};
  savedSearches.forEach(i => {
    g_savedSearchDescriptions[i.uniqueId] = {desc:i.desc, name:i.name, count:i.count};
  });

  //console.log("descriptions: %o", savedSearchDescriptions);

  return savedSearches.map(s => `
          <div class="item" data-value="${s.uniqueId}">${s.name} (${s.count})</div>
        `).join("");
}

function updateSavedSearchList() {
  //userInfo is global to this module
  if (g_userInfo) {
    getSearchResultsList(g_userInfo.userId, g_sourceInfo.sid)
      .then((response) => {
        //console.log("getSearchResultsList: %o", response);

        if (response.length > 0) {
          let html = makeList(response);
          $("#saved-search-select .menu").html(html);
          $("#saved-search-select").removeClass("disabled");
          $("#saved-search-select .default.text").text(`${g_sourceInfo.gs("search:s21", "You Have")} ${response.length} ${g_sourceInfo.gs("search:s22", "Saved Search(es)")}`);

          //enable saved search dropdown
          $("#saved-search-select").dropdown({
            onChange: function(value, text, choice) {
              //console.log("saved search changed. val: %s", value);
              if (value.length > 0) {
                $("#search .show-desc").attr("data-id", value).removeClass("disabled");
              }
              else {
                $("#search .show-desc").addClass("disabled");
              }
            }
          });
        }
        else {
          $("#saved-search-select .default.text").text(g_sourceInfo.gs("search:s23", "You Have No Saved Searches"));
        }
      })
      .catch((err) => {
        console.log("error getSearchResultsList: %o", err);
      });
  }
  else {
    $("#saved-search-select .default.text").text(g_sourceInfo.gs("search:s24", "Sign In to Save Searches"));
  }
}

/*
  Initialize support for search modal window available
  on all pages
*/
function initSearchModal() {

  //look for saved searches
  updateSavedSearchList();

  $(uiSearchModal).modal({
    //debug: true,
    //verbose: true,
    allowMultiple: true,
    dimmerSettings: {opacity: uiModalOpacity},
    observeChanges: true,
    onShow: function() { }
  });

  //Init desc modal
  $(".search-desc.ui.modal").modal({
    allowMultiple: true,
    centered: true,
    closable: false
  });

  $(uiOpenSearchModal).on("click", (e) => {
    e.preventDefault();

    //this was moved from onShow() because modal was not showing correctly
    //when content exceeded page size. Moving it here seems to have solved
    //the problem.
    if ($(".cmi-search-list > h3").length === 0) {
      showSavedQuery();
    }

    $(uiSearchModal).modal("show");
  });

  /*
   * Show saved search description in modal window.
   *
   * Note:
   * This is unexpectedly called when typing <return> from the Enter Search input box and
   * we don't want it to be. I don't know how to prevent it.
   *
   * So, we guard against showsing the description when the user wants to run a query by
   * the two checks below.
   */
  $("#search .show-desc").on("click", function(e) {

    //Check 1. return when buttom is disabled, Event handler not called from button click.
    if ($(this).hasClass("disabled")) {
      return;
    }

    //Check 2. return when query field contains a value, user intends on running a query.
    let query = $("#search").form("get value", "query");
    if (query.length > 0) {
      return;
    }

    e.preventDefault();
    let id = $(this).attr("data-id");
    let ssd = g_savedSearchDescriptions[id];
    //console.log("Showing desc for id: %s, ssd:%o", id, ssd);

    $(".search-desc.ui.modal .header").text(`${g_sourceInfo.gs("search:s5", "Saved Search")}: ${ssd.name}`);
    $(".search-desc.ui.modal .content").html(ssd.desc);
    $(".search-desc.ui.modal").modal("show");
  });

  //Search Submit
  $(uiSearchForm).submit(function(e) {
    e.preventDefault();
    var searchSource = $(uiSearchSource).text();
    var $form = $("#search");
    var searchString = $form.form("get value", "query");
    var exactcb = $form.form("get value", "exact");
    var savedSearch = $form.form("get value", "savedSearch");
    var exact;

    //ignore and return if search string is empty
    if (searchString.length === 0 && savedSearch.length === 0) {
      return;
    }

    //Prevent new search if there are unsaved changes to the current search results.
    if ($(".save-modified-search-list").length > 0) {
      if (!$(".save-modified-search-list").hasClass("disabled")) {
        notify.error(g_sourceInfo.gs("search:s25", "You have unsaved changes to the search list. Save the changes starting a new search."));
        return;
      }
    }

    //save previous search results if modified before running query
    saveModifiedSearchResults();

    //console.log("Search requested: source: %s, string: %s", searchSource, searchString);
    if (searchString.length > 0) {
      displaySearchMessage(SEARCHING, searchSource, searchString);
    }
    else {
      displaySearchMessage(GET_SAVED_SEARCH, searchSource, $("#saved-search-select .text").text());
    }

    //the value of 'exact' is a string on the first call with value 'on'
    //it changes to either true or false if the value is changed on the form
    if (typeof exactcb === "string") {
      exact = exactcb==="on";
    }
    else {
      exact = exactcb;
    }

    //console.log("exact: %s", exact);

    //run search or get saved search
    runQuery(searchString, savedSearch, exact);
  });

  /*
   * Save modified search list
   *
   * Steps
   *  1. Get list of removed search items
   *  2. Remove them from search results
   *  3. Save back to local store
   *  4. If user is signed in save to persistent store
   */
  $(".cmi-search-list").on("click", ".save-modified-search-list", function(e) {
    //console.log("save search list button clicked");
    let queryResult = g_sourceInfo.getValue("srchResults");
    let removedItems = [];

    //get list of removed items
    $(".item-removed").each(function() {
      removedItems.push({
        bid: $(this).attr("data-bid"),
        h: $(this).attr("data-h"),
        m: $(this).attr("data-m")
      });
    });

    //reverse items to delete the last ones first from the array
    removedItems.reverse();

    removedItems.forEach(i => {
      removeSearchItem(i, queryResult);
    });

    //clean up queryResults by removing elements with no results because they were deleted
    Object.keys(queryResult.data).forEach(b => {
      let pagesWithHits = queryResult.data[b].filter(e => {
        return e.m.length > 0;
      });

      if (pagesWithHits.length > 0) {
        if (pagesWithHits.length !== queryResult.data[b].length) {
          queryResult.data[b] = pagesWithHits;
        }
      }
      else {
        delete queryResult.data[b];
      }
    });

    //update hit count
    queryResult.count = queryResult.flat.length;

    //set queryResult as being modified
    queryResult.modified = true;

    //update modified list in local store
    g_sourceInfo.setValue("srchResults", queryResult);

    //reload query results
    showSavedQuery();
  });

  /*
   * Check for unsaved changes to search list and don't let user
   * leave page.
   */
  $(".cmi-search-list").on("click", "a", function(e) {
    //console.log("link clicked");
    if (!$(".save-modified-search-list").hasClass("disabled")) {
      //notify user of unsaved changes
      //notify.error(g_sourceInfo.gs("search:s27", "You have unsaved changes to the search list. Save the changes before leaving the page."));
      $.toast({class: "error",
             message: g_sourceInfo.gs("search:s27", "You have unsaved changes to the search list. Save the changes before leaving the page.")
      });
      return false;
    }
    return true;
  });

  /*
   * Remove match hit handler
   *
   * Show red trash icon for hits to be deleted. Add .item-removed class change icon
   * color to red.
   *
   * Show green trash icon for hits that will not be removed, make sure it doesn't
   * has the .item-removed class
   */
  $(".cmi-search-list").on("click", ".edit-match", function(e) {
    e.preventDefault();

    if ($(this).hasClass("restore")) {
      //unremove item
      $(this).addClass("green").removeClass("red item-removed restore");

      //if no more items are to be removed then disable the save button
      if ($(".item-removed").length === 0) {
        $(".save-modified-search-list").addClass("disabled");

        //indicate search result has been modified
        $(".search.message").removeClass("orange");
      }
    }
    else {
      //remove item
      $(this).addClass("red restore item-removed").removeClass("green");

      //enable save button
      $(".save-modified-search-list").removeClass("disabled");
      $(".search.message").addClass("orange");
    }
  });

  // init exact checkbox on search modal
  $(".ui.exact.checkbox").checkbox("check");

  $("#saved-search-select .menu").on("click", "i.question.icon", function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log("icon clicked: value: %s, id: %s", $(this).parent().parent().text(), $(this).parent().parent().data("value") );
  });

}

/*
 * pageKey = page.pageKey;
 * location = item.location;
 */
function removeSearchItem(i, result) {
  let page = result.data[i.bid][i.h];
  let item = page.m[i.m];

  let flatIndex = result.flat.findIndex(e => {
    return e.key === page.pageKey && e.location === item.location;
  });

  if (flatIndex === -1) {
    notify.error("Didn't find index in flat array for removed item. See console.");
    console.log("Item removal error: %o", i);
    return;
  }

  //remove item from flat array (used by search navigator)
  result.flat.splice(flatIndex, 1);

  //remove item from data array (used for displaying search modal)
  result.data[i.bid][i.h].m.splice(i.m, 1);

  //console.log("page: %o", page);
  //console.log("item: %o", item);
  //console.log("findIndex: %s", flatIndex);
}

/*
 * Save modified search to AWS. This is not user initiated, it's called before a new
 * query is executed and saves the old query result set if the user has modified it. No
 * need to save it otherwise because the query can be rerun to recover the results.
 */
async function saveModifiedSearchResults() {
  //can't saved modified results for guest users
  if (!g_userInfo) return;

  const queryResult = g_sourceInfo.getValue("srchResults");

  //if no previous query return
  if (!queryResult) return;

  //if previous query results have not been modified return
  if (!queryResult.modified) return;

  //don't save if there are no matches - user could have deleted them all
  if (queryResult.count === 0) {
    //$(".search.message").removeClass("orange");
    return;
  }

  try {
    //let result = await putSearchResult(g_userInfo.userId, "wom", queryResult);
    let result = await putSearchResult(g_userInfo.userId, g_sourceInfo.sid, queryResult);
    resetModifiedFlag();
    $(".search.message").removeClass("orange");

    //update saved search dropdown
    updateSavedSearchList();

    //console.log("save modified search results: %s", result);
  }
  catch(error) {
    console.error("error saving modified search result: %o", error);
  }
}

export default {
  initialize: function(si) {

    //userInfo and store are global to this module
    g_userInfo = getUserInfo();
    g_sourceInfo = si;

    initShow(si);

    if ($(".transcript").length) {
      //this is a transcript page
      initTranscriptPage();
    }

    initSearchModal();
  }
};

