import {pageDriver, pageNavigationDriver, transcriptDriver} from "../_util/driver";

function createClickHandlers() {
  //help menu
  $("#help-menu").on("click", "div.item", function(e) {
    e.preventDefault();

    if ($(this).hasClass("page-tour")) {
      console.log("pageDriver");
      pageDriver();
    }

    if ($(this).hasClass("page-navtour")) {
      //console.log("page Nav Driver");
      pageNavigationDriver();
    }

    if ($(this).hasClass("transcript-tour")) {
      //console.log("transcriptDriver");
      transcriptDriver();
    }

    if ($(this).hasClass("about-src")) {
      location.href = "/about/";
    }

    if ($(this).hasClass("read-documentation")) {
      if (location.hostname === "localhost") {
        location.href = "http://localhost:9999/acq/quick/";
      }
      else {
        location.href = "/acq/quick/";
      }
    }

    if ($(this).hasClass("view-documentation")) {
      if (location.hostname === "localhost") {
        location.href = "http://localhost:9999/acq/video/";
      }
      else {
        location.href = "/acq/video/";
      }
    }

    if ($(this).hasClass("contact-me")) {
      if (location.hostname === "localhost") {
        location.href = "http://localhost:9999/acq/contact/";
      }
      else {
        location.href = "/acq/contact/";
      }
    }

    if ($(this).hasClass("profile-management")) {
      if (location.hostname === "localhost") {
        location.href = "http://localhost:9999/profile/email/";
      }
      else {
        location.href = "/profile/email/";
      }
    }
  });

  //quick links
  $("#quick-links").on("click", "div.item", function(e) {
    e.preventDefault();

    let href = $(this).attr("data-href");
    //console.log("quick links href: %s", href);
    location.href = href;
  });
}

export default {
  initialize() {
    createClickHandlers();
  }
};
