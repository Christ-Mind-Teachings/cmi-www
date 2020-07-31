import notify from "toastr";
import {getUserInfo} from "../_user/netlify";
import {getString} from "../_language/lang";
import {sendMail, getMailList} from "../_db/share";

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
    return `${current}<p>${p}</p>`;
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

function makeMaillistSelect(maillist) {
  return (`
    <label>${getString("label:listnames")}</label>
    <select name="mailList" id="maillist-address-list" multiple="" class="search ui dropdown">
      <option value="">${getString("label:selectaddress")}</option>
      ${maillist.map(item => `${generateOption(item)}`).join("")}
    </select>
  `);
}

/*
  Called by initShareByEmail()
  - load only when user signed in, fail silently, it's not an error
*/
async function loadEmailList() {
  const userInfo = getUserInfo();

  try {
    let mailList = await getMailList(userInfo.userId);
    let selectHtml = makeMaillistSelect(mailList);

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
  shareInfo = {citation, quote, url};

  //show input form
  $(".hide.email-share-dialog-wrapper").removeClass("hide");
}

