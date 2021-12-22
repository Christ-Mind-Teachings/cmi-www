import {getUserInfo} from "../_user/netlify";
import {RandomQuotes, QuoteManager} from "./randomQuote";
import {initShareByEmail, submitEmail} from "./share";
import {getQuoteIds} from "../_ajax/quotes";
import {getRandomStyle} from "./styles";
import {getString} from "../_language/lang";

const quoteMessageSelector = "#quote-modal-message";
let currentQuote;

function showLoading() {
  $("#quote-modal-more").addClass("loading");
}

function cancelLoading() {
  $("#quote-modal-more").removeClass("loading");
}

function generateOption(item) {
  let userInfo = item.userInfo; 
  return (`
      <option value="${userInfo.userId}">${userInfo.userName}</option>
  `);
}

function buildSelectList(quoteArray) {
  return (`
    <label>Quote Sources</label>
    <select name="quote-source-list" id="user-quote-source-select" class="search ui dropdown">
      ${quoteArray.map(item => `${generateOption(item)}`).join("")}
    </select>
  `);
}

function showQuote(q) {
  //persist for shareByEmail
  currentQuote = q;
  let quote = q.quote;

  if (!q.quote) {
    q.citation = "Make Your Own Quotes";
    q.url = "/acq/quotes";
    quote = "No quotes have been defined yet. Did you know you can define your own? See documentation at the link below.";

    /*
    cancelLoading();
    return;
    */
  }

  if (!quote.includes("<p>")) {
    quote = `<p>${quote}</p>`;
  }

  let html = `
    <blockquote>
      ${quote}
      <footer>
        <a href="${q.url}" title="${getString("quote:g2s")}" target="_blank">
          ~ ${q.citation}
        </a>
      </footer>
    </blockquote>
    `;

  $("#quote-modal-content").html(html).attr("class", `content ${getRandomStyle()}`);
  cancelLoading();
}

function initSelect(qm) {
  let select = buildSelectList(qm.getInternalQuoteArray());
  $("#user-quote-select").html(select);
  $("#user-quote-source-select").on("change", function(e) {
    qm.use($(this).val());
  });
}

function loadQuotes(qm, constants, userInfo) {
  let systemQuoteIds = getQuoteIds(constants.quoteManagerId, constants.sourceId);

  if (userInfo && userInfo.userId !== constants.quoteManagerId) {
    let userQuoteIds = getQuoteIds(userInfo.userId, constants.sourceId);

    Promise.all([systemQuoteIds, userQuoteIds]).then((responses) => {
      let q0 = new RandomQuotes(constants.quoteManagerName, constants.quoteManagerId, constants.sourceId); 
      q0.qIds = responses[0];
      qm.addQuotes(q0);

      if (responses[1].length > 0) {
        //let q1 = new RandomQuotes(userInfo.name, userInfo.userId, constants.sourceId); 
        let q1 = new RandomQuotes("My Quotes", userInfo.userId, constants.sourceId); 
        q1.qIds = responses[1];
        qm.addQuotes(q1);

        //use system quotes to start
        qm.use(constants.quoteManagerId);
        
        //build quote select list
        initSelect(qm);
      }
    });
  }
  else {
    systemQuoteIds.then((ids) => {
      let q = new RandomQuotes(constants.quoteManagerName, constants.quoteManagerId, constants.sourceId); 
      q.qIds = ids;
      qm.addQuotes(q);
    });
  }

  return qm;
}

export function initQuoteDisplay(selector, constants) {

  let qm = new QuoteManager();

  //must be signed in to share
  let userInfo = getUserInfo();

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
  }

  qm = loadQuotes(qm, constants, userInfo);

  //get another quote
  $("#quote-modal-more").on("click", function(e) {
    showLoading();
    qm.getRandomQuote().then((quote) => {
      showQuote(quote);
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

    qm.getRandomQuote().then((quote) => {
      showQuote(quote);
    });

    $("#quote-modal").modal("show");
    showLoading();
  });

}

