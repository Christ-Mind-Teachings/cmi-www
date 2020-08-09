import axios from "axios";
import notify from "toastr";
import globals from "../../globals";
import {getUserInfo} from "../_user/netlify";
import {getString} from "../_language/lang";

//teaching specific constants
let teaching = {};
let shareInfo = {};

//load email list and setup submit and cancel listeners
export function initShareByEmail(constants) {
  teaching = constants;
  //loadEmailList();

  //submit
  $("form[name='emailshare']").on("submit", function(e) {
    e.preventDefault();

    const userInfo = getUserInfo();
    if (!userInfo) {
      notify.warning(getString("annotate:m14"));
      $(".email-share-dialog-wrapper").addClass("hide");
      return;
    }

    let formData = $("#email-share-form").form("get values");

    if (formData.mailList.length === 0 && formData.emailAddresses.length === 0) {
      notify.info(getString("error:e9"));
      return;
    }

    shareInfo.to = "";
    if (formData.mailList.length > 0) {
      shareInfo.to = formData.mailList.join(",");
    }

    if (formData.emailAddresses.length > 0) {
      if (shareInfo.to.length > 0) {
        shareInfo.to = `${shareInfo.to}, ${formData.emailAddresses}`;
      }
      else {
        shareInfo.to = formData.emailAddresses;
      }
    }

    shareInfo.senderName = userInfo.name;
    shareInfo.senderEmail = userInfo.email;
    shareInfo.sid = teaching.sid;
    //console.log("shareInfo: %o", shareInfo);

    //hide form not sure if this will work
    $(".email-share-dialog-wrapper").addClass("hide");

    axios.post(globals.share, shareInfo)
      .then((response) => {
        if (response.status === 200) {
          notify.info(getString("action:emailsent"));
        }
        else {
          notify.info(response.data.message);
        }
      })
      .catch((error) => {
        console.error("share error: %s", error);
      });
  });

  //cancel
  $("form[name='emailshare'] .email-share-cancel").on("click", function(e) {
    e.preventDefault();

    //hide form
    $(".email-share-dialog-wrapper").addClass("hide");
  });
}

//generate the option element of a select statement
function generateOption(item) {
  return `<option value="${item.address}">${item.first} ${item.last}</option>`;
}

/*
 * Call getString() with second arg 'true' so that it returns a promise. This was necessary
 * because the language file might not have been loaded when getString() was called.
 *
 * This is no longer necessary since we don't call this on page load anymore, just when the
 * user requests sharing by email. I didn't change the code to remove promises though, but I
 * could since they are no longer needed.
 */
function makeMaillistSelect(maillist) {
  let listnames = getString("label:listnames", true);
  let selectAddress = getString("label:selectaddress", true);

  return Promise.all([listnames, selectAddress]).then((values) => {
    return (`
      <label>${values[0]}</label>
      <select name="mailList" id="maillist-address-list" multiple="" class="search ui dropdown">
        <option value="">${values[1]}</option>
        ${maillist.map(item => `${generateOption(item)}`).join("")}
      </select>
    `);
  });
}

/*
  Called by initShareByEmail()
  - load only when user signed in, fail silently, it's not an error

  NOTE: WE DON'T CALL THIS ANYMORE. THE CODE has been added to shareByEmail()
*/
function loadEmailList() {
  const userInfo = getUserInfo();

  if (!userInfo) {
    return;
  }

  let maillist = [];
  let api = `${userInfo.userId}/maillist`;

  axios(`${globals.user}/${api}`)
    .then(response => {
      maillist = response.data.maillist;
      return makeMaillistSelect(maillist);
    })
    .then((selectHtml) => {
      $("#maillist-select").html(selectHtml);
      $("#maillist-address-list.dropdown").dropdown();
    })
    .catch(err => {
      notify.error(`${getString("error:e10")}: ${err}`);
    });
}

let mailListLoaded = false;

/*
*/
export function shareByEmail(quote, citation, url) {
  const userInfo = getUserInfo();
  shareInfo = {citation, quote, url};

  //show dialog
  $(".hide.email-share-dialog-wrapper").removeClass("hide");

  //if user not signed in we don't need to load the email list so
  //just show the dialog and return
  if (!userInfo) {
    return;
  }

  //maillist already loaded, show the dialog and return
  if (mailListLoaded) {
    return;
  }

  let maillist = [];
  let api = `${userInfo.userId}/maillist`;

  $(".email-share-loader").addClass("active");

  axios(`${globals.user}/${api}`)
    .then(response => {
      maillist = response.data.maillist;
      return makeMaillistSelect(maillist);
    })
    .then((selectHtml) => {
      $("#maillist-select").html(selectHtml);
      $("#maillist-address-list.dropdown").dropdown();
      mailListLoaded = true;
      $(".email-share-loader").removeClass("active");
    })
    .catch(err => {
      notify.error(`${getString("error:e10")}: ${err}`);
      $(".email-share-loader").removeClass("active");
    });

}

