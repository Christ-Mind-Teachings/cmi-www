import notify from "toastr";
import uniq from "lodash/uniq";

let g_sourceInfo;

/*******************************************************/

/*
  for a given page, combine all matches into an array
*/
function munge(bookMatches) {
  let keyLength = g_sourceInfo.keyInfo.getKeyInfo().keyLength;
  let combined = [];
  let count = 0;

  for (const match of bookMatches) {
    if (!combined[count]) {
      combined[count] = {
        unit: match.unit,
        book: match.book,
        pageKey: match.key.substr(0, keyLength),
        m: [{ref: match.ref, location: match.location, context: match.context}]
      };
    }
    else if (combined[count].unit !== match.unit) {
      count++;
      combined[count] = {
        unit: match.unit,
        book: match.book,
        pageKey: match.key.substr(0, keyLength),
        m: [{ref: match.ref, location: match.location, context: match.context}]
      };
    }
    else {
      combined[count].m.push({ref: match.ref, location: match.location, context: match.context});
    }
  }
  return combined;
}

//get unique pageKeys from query results and
function getPageKeys(data) {
  let keyLength = g_sourceInfo.keyInfo.getKeyInfo().keyLength;
  let keys = data.map(m => m.key.substr(0, keyLength));
  return uniq(keys);
}

/*
 * Returns Promise
 */
function prepareSearchResults(data) {
  const books = g_sourceInfo.keyInfo.getBooks();
  let query = data.queryTransformed;
  let pageInfoPromises = [];

  return new Promise((resolve, reject) => {

    //get array of all unique page info - promises
    for (let b = 0; b < books.length; b++) {
      let bid = books[b];
      if (data[bid]) {
        let pageKeys = getPageKeys(data[bid]);
        for (const pageKey of pageKeys) {
          pageInfoPromises.push(g_sourceInfo.getPageInfo(pageKey));
        }
      }
    }

    Promise.all(pageInfoPromises)
      .then((responses) => {
        let pageInfo = {};
        let titleArray = {};

        //console.log("responses: %o", responses);

        //organize pageInfo
        for (const page of responses) {
          let {bookTitle, title, subTitle, url} = page;

          if (subTitle) {
            title = `${title}: ${subTitle}`;
          }

          pageInfo[page.pageKey] = {title, url};

          if (!titleArray[page.bookId]) {
            titleArray[page.bookId] = bookTitle;
          }
        }

        let matches = {};

        //generate html for search hits
        for (let bid of books) {
          if (data[bid]) {
            matches[bid] = munge(data[bid]);
          }
        }

        let searchObj = buildSearchResultsObject(query, data.count, titleArray, pageInfo, matches, data);
        resolve(searchObj);
      })
      .catch((error) => {
        console.error("Error: %s", error.message);
        reject(error);
      });
  });
}

/*
 * Build object of search results to save in local store
 */
function buildSearchResultsObject(queryString, matchCount, titleArray, pageInfo, data, originalResult) {
  const books = g_sourceInfo.keyInfo.getBooks();
  let keyLength = g_sourceInfo.keyInfo.getKeyInfo().keyLength;

  //don't save if there were no matches
  if (matchCount === 0) {
    return {
      query: "",
      count: 0,
      strict: false,
      titleArray: [],
      pageInfo: [],
      data: {},
      flat: []
    };
  }

  //flatten the query result to simplify access by query navigator on transcript pages
  let flatMatches = [];
  for (const bid of books) {
    if (originalResult[bid]) {
      for (const match of originalResult[bid]) {
        let pageKey = match.key.substr(0, keyLength);
        let m = { key: pageKey, url: `/${match.book}/${match.unit}/`, location: match.location};
        flatMatches.push(m);
      }
    }
  }

  return {
    query: queryString,
    count: matchCount,
    strict: originalResult.strict,
    titleArray: titleArray,
    pageInfo: pageInfo,
    data: data,
    flat: flatMatches
  };
}

/*******************************************************/

/*
 * Show or hide delete icon in front of search matches
 */
function setUpEditHandler() {
  $(".ui.toggle.edit.checkbox").checkbox({
    onChecked: function() {
      //console.log("checkbox checked");
      $("div.cmi-search-list").addClass("edit");
    },
    onUnchecked: function() {
      //console.log("checkbox unchecked");
      $("div.cmi-search-list").removeClass("edit");
    }
  });
}

function addEditToggle(html) {
  // delete existing checkbox if present
  $(".ui.toggle.edit.checkbox").checkbox("destroy");

  //remove edit class if set
  $("div.cmi-search-list").removeClass("edit");

  return `<button class="ui disabled primary button save-modified-search-list">
            <i class="save outline icon"></i>
            ${g_sourceInfo.gs("search:s1","Save Changes")}
          </button>
          <div class="ui toggle edit checkbox">
            <input type="checkbox" name="public">
            <label>${g_sourceInfo.gs("search:s2", "Select Items to Remove")}</label>
          </div>
          ${html}`;
}

export async function showSearchResults(data, query) {
  //format data for local storage
  //- this is source specific
  try {
    //let results = await g_sourceInfo.prepareSearchResults(data);
    let results = await prepareSearchResults(data);

    //save search results to local store
    g_sourceInfo.setValue("srchResults", results);

    //generate html to display in search modal
    let html = g_sourceInfo.generateHTML(results);

    $(".cmi-search-list").html(addEditToggle(html));
    $("#search-results-header").html(`: <em>${query}</em>`);
    setUpEditHandler();
  }
  catch(err) {
    console.log("showSearchResults error");
    console.error(err);
    notify.error(g_sourceInfo.gs("search:s3","Error displaying search results, see console for details."));
  }
}

//show saved query result in modal
export function showSavedQuery() {
  //const queryResult = storeGet("srchResults");
  const queryResult = g_sourceInfo.getValue("srchResults");

  if (!queryResult) {
    return;
  }

  //record if toggle is checked
  let showToggle = $(".ui.toggle.edit.checkbox").hasClass("checked");

  //call source specific function to generate search results for saved query
  let html = g_sourceInfo.generateHTML(queryResult);

  $(".cmi-search-list").html(addEditToggle(html));

  //if the result has a uniqueId it's been saved
  if (queryResult.uniqueId) {
    $(".search-message.header").text(g_sourceInfo.gs("search:s4","Saved Search Result"));
    $(".search-message-body").html(`<p>${g_sourceInfo.gs("search:s5","Saved Search")} <em>${queryResult.query}</em> ${g_sourceInfo.gs("search:s6", "has")} ${queryResult.count} ${g_sourceInfo.gs("search:s8", "matches")}</p>`);
  }
  else {
    $(".search-message.header").text(g_sourceInfo.gs("search:s10", "Last Search Result"));
    $(".search-message-body").html(`<p>${g_sourceInfo.gs("search:s9", "Search for")} <em>${queryResult.query}</em> ${g_sourceInfo.gs("search:s7", "found")} ${queryResult.count} ${g_sourceInfo.gs("search:s8", "matches")}</p>`);
  }

  $("#search-results-header").html(`: <em>${queryResult.query}</em>`);

  //indicate result has been modified and will be saved when query next changes
  if (queryResult.modified) {
    $(".search.message").addClass("orange");
  }
  //console.log("show search results: strict: %s", queryResult.strict);
  if (queryResult.strict) {
    $(".ui.exact.checkbox").checkbox("check");
  }
  else {
    $(".ui.exact.checkbox").checkbox("uncheck");
  }

  setUpEditHandler();

  //click toggle to reset to previous state
  if (showToggle) {
    $(".ui.toggle.edit.checkbox").checkbox("check");
  }
}

export function initShow(si) {
  g_sourceInfo = si;
}


