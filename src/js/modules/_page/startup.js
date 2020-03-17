import {TweenMax} from "gsap";

export function initTranscriptPage() {
  initStickyMenu();
  labelParagraphs();
  createParagraphNumberToggleListener();
}

/*
 * For all transcript paragraphs -
 *   That are not footnotes and that don't have class .omit
 *
 * Assign id="p + paragraph number" and class="cmiTranPara"
 *
 * This is used for bookmarks and audio playback and also represent
 * paragraphs that are indexed for search
 *
 * This code is specific to transcript pages but included in
 * common.js because bookmarks and playfromhere features depend
 * on paragraphs having class cmiTranPara.
 */
function labelParagraphs() {
  var count = 0;
  var omit = 0;
  var transcriptParagraphs = $(".transcript p");

  if (transcriptParagraphs.length === 0) {
    return;
  }

  //add .cmiTranPara, #id and paragraph numbers to each paragraph that doesn't have .omit
  transcriptParagraphs.each(function(idx) {
    //skip omitted paragraphs (they are omitted in the markdown file)
    if ($(this).hasClass("omit")) {
      omit++;
      return;
    }

    //skip footnote paragraphs
    if ($(this).parents("div.footnotes").length > 0) {
      //console.log("footnote paragraph");
      return;
    }
    count++;
    $(this)
      .attr("id", "p" + idx)
      .addClass("cmiTranPara")
      .prepend(`<span class='pnum'>(p${idx})&nbsp;</span>`);

  });

  //log number of not omitted paragraphs
  //-- used to verify search indexing
  //console.log("page: number of paragraphs: %s", count + omit);
  //console.log("conf: number of paragraphs: %s", config.unit.pNum);
}

//create listener to toggle display of paragraph numbers
function createParagraphNumberToggleListener() {
  $(".toggle-paragraph-markers").on("click", function(e) {
    e.preventDefault();
    let el = $(".transcript.ui.text.container");
    if (el.hasClass("hide-pnum")) {
      el.removeClass("hide-pnum");
    }
    else {
      el.addClass("hide-pnum");
    }
  });
}

/*
  Fix main menu to top of page when scrolled
*/
export function initStickyMenu() {
  // fix main menu to page on passing
  $(".main.menu").visibility({
    type: "fixed"
  });

  // show dropdown on hover
  $(".main.menu  .ui.dropdown").dropdown({
    on: "hover"
  });
}

export function initAnimation(selector = "[data-book]") {
  let delay = 0.2;
  $("#page-contents").on("mouseover", selector, function(e) {
    TweenMax.to($(this), delay, {className: "+=gsap-hover"});
    TweenMax.to($(this), delay, {scale: "1.1"});
  });
  $("#page-contents").on("mouseout", selector, function(e) {
    TweenMax.to($(this), delay, {className: "-=gsap-hover"});
    TweenMax.to($(this), delay, {scale: "1.0"});
  });
}
