import notify from "toastr";

let g_sourceInfo;

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
            Save Changes
          </button>
          <div class="ui toggle edit checkbox">
            <input type="checkbox" name="public">
            <label>Remove Selected Matches</label>
          </div>
          ${html}`;
}

export async function showSearchResults(data, query) {
  //format data for local storage
  //- this is source specific
  try {
    let results = await g_sourceInfo.prepareSearchResults(data);

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
    notify.error("Error displaying search results, see console for details.");
  }
}

//show saved query result in modal
export function showSavedQuery() {
  //const queryResult = storeGet("srchResults");
  const queryResult = g_sourceInfo.getValue("srchResults");

  if (!queryResult) {
    return;
  }

  //call source specific function to generate search results for saved query
  let html = g_sourceInfo.generateHTML(queryResult);

  $(".cmi-search-list").html(addEditToggle(html));

  //if the result has a uniqueId it's been saved
  if (queryResult.uniqueId) {
    $(".search-message.header").text("Saved Search Result");
    $(".search-message-body").html(`<p>Saved Search <em>${queryResult.query}</em> has ${queryResult.count} matches</p>`);
  }
  else {
    $(".search-message.header").text("Last Search Result");
    $(".search-message-body").html(`<p>Search for <em>${queryResult.query}</em> found ${queryResult.count} matches</p>`);
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
}

export function initShow(si) {
  g_sourceInfo = si;
}


