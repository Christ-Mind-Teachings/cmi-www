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
  loadEmailList();

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
      let selectHtml = makeMaillistSelect(maillist);

      $("#maillist-select").html(selectHtml);
      $("#maillist-address-list.dropdown").dropdown();
    })
    .catch(err => {
      notify.error(`${getString("error:e10")}: ${err}`);
    });
}

/*
*/
export function shareByEmail(quote, citation, url) {
  shareInfo = {citation, quote, url};

  //show input form
  $(".hide.email-share-dialog-wrapper").removeClass("hide");
}
