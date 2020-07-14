import {getUserInfo} from "../_user/netlify";
import {getRandomQuote} from "./random";
import {initShareByEmail, submitEmail} from "./share";
import {displayWarning, displaySuccess} from "./message";

//md5 hash of email address of quote owner
let userId;
let sourceId;
let currentQuote;
let userInfo;

const quoteMessageSelector = "#quote-modal-message";

function showLoading() {
  $("#quote-modal-more").addClass("loading");
}

function cancelLoading() {
  $("#quote-modal-more").removeClass("loading");
}

function showQuote(q) {
  //persist for shareByEmail
  currentQuote = q;

  let html = `
    <blockquote>
      ${q.quote}
      <footer>
        <a href="${q.url}" title="Go to the source" target="_blank">
          ~ ${q.citation}
        </a>
      </footer>
    </blockquote>
    `;

  $("#quote-modal-content").html(html);
  cancelLoading();
}

export function quoteUserId(id) {
  userId = id;
}

export function initQuoteDisplay(selector, constants) {

  sourceId = constants.sourceId;
  userId = constants.quoteManagerId;

  //quote modal settings
  $("#quote-modal")
    .modal({
      allowMultiple: true,
      dimmerSettings: {opacity: 0.3},
      blurring: true,
      autofocus: false,
      centered: true,
      duration: 400,
      closable: false,
      observeChanges: true,
      transition: "fade up",
      // Share by email
      onApprove: function() {
        return false;
      },
      //More button
      onDeny: function() {
        return true;
      }
    });

  //must be signed in to share
  userInfo = getUserInfo();

  //if we're not in development add share to facebook button
  if (location.origin.includes("christmind")) {
    $("#quote-modal-facebook").removeClass("hidden");
  }

  //share available only to signed in users
  if (userInfo) {
    //initialize quote share
    initShareByEmail(constants);

    //share modal settings
    $("#share-modal").modal({
      allowMultiple: true,
      dimmerSettings: {opacity: 0.3},
      blurring: true,
      centered: true,
      duration: 400,
      closable: false,
      transition: "fade up",
      onApprove: function() {
        console.log("send email");
        return submitEmail(currentQuote);
      },
      onDeny: function() {
        console.log("cancel send email");
        return true;
      }
    });

    $("#share-modal").modal("attach events", "#quote-modal-share");

    //show email share button
    $("#quote-modal-share").removeClass("hidden");

    //see if user has quotes defined
    if (userInfo.userId !== constants.quoteManagerId) {
    }
  }

  //get another quote
  $("#quote-modal-more").on("click", function(e) {
    showLoading();
    getRandomQuote(userId, sourceId)
      .then((resp) => {
        showQuote(resp);
      });
  });

  //share quote to FB
  $("#quote-modal-facebook").on("click", function(e) {

    let q = currentQuote;

    let options = {
      method: "share",
      hashtag: "#christmind",
      quote: `${q.quote}\n${q.citation}`,
      href: `${location.origin.includes("localhost")?"https://www.christmind.info":location.origin}${q.url}`
    };
    FB.ui(options, function(){});

  });

  //quote button click handler
  $(selector).on("click", function(e) {

    getRandomQuote(userId, sourceId)
      .then((resp) => {
        showQuote(resp);
      });

    $("#quote-modal").modal("show");
    showLoading();
  });

}

