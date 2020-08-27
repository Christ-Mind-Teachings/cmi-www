import notify from "toastr";
import {getUserInfo} from "../_user/netlify";
import {getString} from "../_language/lang";
import {sendMail, getMailList} from "../_ajax/share";
import {purify} from "../_util/sanitize";

//teaching specific constants
let teaching = {};
let shareInfo = {};

/*
 * format message to wrap pargraphs in <p> tags
 */
function formatMessage(message) {
  message = message.replace(/\n/g, "@@");
  message = message.replace(/@@*/g, "@@");

  let mArray = message.split("@@");

  message = mArray.reduce((current, p) => {
    return `${current}<p>${purify(p)}</p>`;
  }, "");

  return message;
}

//load email list and setup submit and cancel listeners
export function initShareByEmail(constants) {
  teaching = constants;
  loadEmailList();

  //submit
  $("form[name='emailshare']").on("submit", async function(e) {
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

    if (formData.emailMessage) {
      shareInfo.message = formatMessage(formData.emailMessage);
    }

    //hide form not sure if this will work
    $(".email-share-dialog-wrapper").addClass("hide");

    try {
      let result = await sendMail(shareInfo);
      if (result === "success") {
        notify.info(getString("action:emailsent"));
      }
      else {
        notify.info(response.data.message);
      }
    }
    catch(err) {
      notify.error(err);
    }
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
  return new Promise((resolve, reject) => {
    let listnames = getString("label:listnames", true);
    let selectaddress = getString("label:selectaddress", true);

    Promise.all([listnames, selectaddress]).then((resp) => {
      resolve(`
        <label>${resp[0]}</label>
        <select name="mailList" id="maillist-address-list" multiple="" class="search ui dropdown">
          <option value="">${resp[1]}</option>
          ${maillist.map(item => `${generateOption(item)}`).join("")}
        </select>
      `);
    });
  });
}

/*
  Called by initShareByEmail()
  - load only when user signed in, fail silently, it's not an error

  NOTE: WE DON'T CALL THIS ANYMORE. THE CODE has been added to shareByEmail()
*/
async function loadEmailList() {
  const userInfo = getUserInfo();
  if (!userInfo) return;

  try {
    let mailList = await getMailList(userInfo.userId);
    let selectHtml = await makeMaillistSelect(mailList);

    $("#maillist-select").html(selectHtml);
    $("#maillist-address-list.dropdown").dropdown();
  }
  catch(err) {
    notify.error(`${getString("error:e10")}: ${err}`);
  }
}

/*
*/
export function shareByEmail(quote, citation, url) {
  const userInfo = getUserInfo();
  shareInfo = {citation, quote, url};

  //show dialog
  $(".hide.email-share-dialog-wrapper").removeClass("hide");
}

