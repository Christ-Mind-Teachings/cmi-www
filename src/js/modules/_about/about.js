import {pageDriver, pageNavigationDriver, transcriptDriver} from "../_util/driver";

function createClickHandlers() {
  //help menu
  $("#help-menu").on("click", "div.item", function(e) {
    e.preventDefault();

    if ($(this).hasClass("page-tour")) {
      let prod = !$(this).hasClass("development");
      pageDriver(prod);
    }

    if ($(this).hasClass("page-navtour")) {
      pageNavigationDriver();
    }

    if ($(this).hasClass("transcript-tour")) {
      transcriptDriver();
    }

    if ($(this).hasClass("about-src")) {
      location.href = "/about/";
    }

    if ($(this).hasClass("read-documentation")) {
      location.href = "/acq/quick/";
    }

    if ($(this).hasClass("view-documentation")) {
      location.href = "/acq/video/";
    }

    if ($(this).hasClass("contact-me")) {
      location.href = "/acq/contact/";
    }

  });

  $(".login-menu-option-account").on("click", "div.item", function(e) {
    if ($(this).hasClass("profile-management")) {
      location.href = "/profile/email/";
    }

    if ($(this).hasClass("topic-management")) {
      location.href = "/profile/topicMgt/";
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
