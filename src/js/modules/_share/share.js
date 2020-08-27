/*
  NOTE: When an annotation is shared and seen on a computer with bookmarks
        there could be a conflict between the users bookmarks and the shared
        bookmark. Not sure what to do in this case...

        An idea:
        Disable highlighting annotations on the paragraph of the shared annotation.

        Approach:
        Load all bookmarks except that of a shared annotation.
        Add a close button to the shared annotation
        When the close button is pressed then add the omitted bookmark

*/
import {showAnnotation as showAnnotationRequest, loadStart, loadComplete} from "../_util/url";
import {getAnnotation} from "../_ajax/annotation";
import {highlightSkippedAnnotations, highlight} from "../_bookmark/selection";
import range from "lodash/range";
import scroll from "scroll-into-view";
import {getString} from "../_language/lang";
import notify from "toastr";

//const key = require("../_config/key");

//teaching specific constants
let teaching = {};

//persist shared annotation so it can be unwraped when closed
let sharedAnnotation;

/*
  check if user has bookmark that was not highlighted due to shared annotion and
  highlight the bookmarks annotations. This is called if there is a problem getting
  the requested bookmark and when the user closes the share raised segment
*/
function clearSharedAnnotation() {

  //unwrap shared annotation
  if (sharedAnnotation.selectedText) {
    sharedAnnotation.selectedText.wrap.unwrap();
  }

  //remove wrapper
  $("#shared-annotation-wrapper > .header").remove();
  $(".shared-selected-annotation").unwrap();
  $(".selected-annotation").removeClass("shared-selected-annotation");
  $(".bookmark-selected-text.shared").removeClass("shared");

  //highlight user annotations that were skipped because they were on same paragraph as shared annotation
  highlightSkippedAnnotations();
}

function initCloseHandler() {
  $(".share-annotation-close").on("click", function(e) {
    e.preventDefault();
    clearSharedAnnotation();
  });
}

//highlights an annotation by wrapping it in a segment
function wrapRange(annotation) {
  let rangeArray = [annotation.rangeStart, annotation.rangeEnd];
  let numericRange = rangeArray.map((r) => parseInt(r.substr(1),10));
  let annotationRange = range(numericRange[0], numericRange[1] + 1);
  //${annotation.Comment?annotation.Comment:getString("annotate:m7")}
  let header = `
    <h4 class="ui header">
      <i title="${getString("action:close")}" class="share-annotation-close small window close icon"></i>
      <div class="content">
        ${annotation.Comment?annotation.Comment:""}
      </div>
    </h4>
  `;

  for (let i = 0; i < annotationRange.length; i++) {
    $(`#p${annotationRange[i]}`).addClass("shared-selected-annotation");
  }

  $(".shared-selected-annotation").wrapAll("<div id='shared-annotation-wrapper' class='ui raised segment'></div>");
  $("#shared-annotation-wrapper").prepend(header);

  //scroll into view
  scroll(document.getElementById("shared-annotation-wrapper"), {align: {top: 0.2}});
}

/**
  Display shared annotation requested by query parameter "as" ?as=pid:annotationId:userId. This
  is called when the user click 'To The Source' on a shared quote or FB post. The annotation
  could have been created by anyone.

  @returns {promise} pid - resolves to pid number when sharing requested, false otherwise
*/
function showAnnotation() {
  return new Promise(async (resolve, reject) => {
    let info = showAnnotationRequest();
    if (!info) {
      resolve(false);
      return;
    }

    let [pid, aid, uid] = decodeURIComponent(info).split(":");

    //make sure pid exists
    if (!pid) {
      resolve(false);
      return;
    }

    if ($(`#${pid}`).length === 0) {
      resolve(false);
      return;
    }

    let paraKey = teaching.keyInfo.genParagraphKey(pid);

    //show loading indicator
    loadStart();

    /*
      fetch shared bookmark and wrap it in a raised segment
      - if user has a bookmark in the same paragraph as the shared annotation, it will not be highlighted so
        if we fail to get the bookmark or can't find the shared annotation we need to highlight the users
        annotations for the paragraph before returning
    */
    try {
      const annotation = await getAnnotation(uid, paraKey, aid);

      if (!annotation.userId) {
        highlightSkippedAnnotations();
        loadComplete();
        notify.warning("Requested Bookmark was not found");
        resolve(false);
        return;
      }

      let node = document.getElementById(annotation.rangeStart);

      if (annotation.selectedText) {
        highlight(annotation.selectedText, node);
      }

      $(`[data-aid="${aid}"]`).addClass("shared");

      wrapRange(annotation);
      sharedAnnotation = annotation;
      initCloseHandler();
      loadComplete();
    }
    catch(err) {
      loadComplete();
      console.error(err);
      resolve(false);
      return;
    }

    resolve(pid);
  });
}

export default {
  initialize: function(constants) {
    teaching = constants;
    return showAnnotation();
  }
};
