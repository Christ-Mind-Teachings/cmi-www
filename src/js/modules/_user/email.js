/*
  Email list management - for sharing bookmarks via email
*/
import notify from "toastr";

import {getUserInfo} from "common/modules/_user/netlify";
import {getMailList, putMailList} from "common/modules/_ajax/share";
import {purify} from "common/modules/_util/sanitize";

//module global list of email addresses
let maillist = [];

function makeTableRow(item, index) {
  return `
    <tr data-index="${index}">
      <td class="delete-maillist-item"><i class="trash alternate icon"></i></td>
      <td class="edit-maillist-item"><i class="pencil alternate icon"></i></td>
      <td data-name="first">${item.first}</td>
      <td data-name="last">${item.last}</td>
      <td data-name="address">${item.address}</td>
    </tr>
  `;
}

function populateTable(maillist) {
  return `
    ${maillist.map((item, index) => `
      <tr data-index="${index}">
        <td class="delete-maillist-item"><i class="trash alternate icon"></i></td>
        <td class="edit-maillist-item"><i class="pencil alternate icon"></i></td>
        <td data-name="first">${item.first}</td>
        <td data-name="last">${item.last}</td>
        <td data-name="address">${item.address}</td>
      </tr>
    `).join("")}
  `;
}

function enableSave() {
  //enable save to database button
  $("button.save-to-database").removeClass("disabled");
}

function createEventHandlers() {
  //delete
  $("#email-list-table").on("click", ".delete-maillist-item", function(e) {
    e.stopPropagation();
    e.preventDefault();
    let parent = $(this).parent();
    let index = parseInt(parent.attr("data-index"), 10);

    //mark deleted item from maillist
    maillist[index].deleted = true;

    //remove item from table
    parent.remove();
    enableSave();

    //console.log("after delete: maillist %o", maillist);
  });

  //edit
  $("#email-list-table").on("click", "td.edit-maillist-item", function(e) {
    e.stopPropagation();
    e.preventDefault();
    let index = parseInt($(this).parent().attr("data-index"), 10);

    $("#addto-maillist-form").form("set values", maillist[index]);
    $("#add-or-update").text("Update").attr("data-index", index);
    $(".addto-maillist-dialog-wrapper.hide").removeClass("hide");
  });

  //add to list
  $("button.add-name-to-maillist").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    $("#add-or-update").text("Add");
    $(".addto-maillist-dialog-wrapper.hide").removeClass("hide");
  });

  //save changes
  $("button.save-to-database").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".addto-maillist-dialog-wrapper").addClass("hide");
    saveChanges();
  });

  //submit
  $("form[name='addtomaillist']").on("submit", function(e) {
    e.preventDefault();
    e.stopPropagation();

    let status = $("#add-or-update").text();
    let formData = $("#addto-maillist-form").form("get values");

    formData.first = purify(formData.first);
    formData.last = purify(formData.last);
    formData.address = purify(formData.address);

    if (status === "Add") {
      maillist.push({first: formData.first, last: formData.last, address: formData.address});
      let row = makeTableRow(formData, maillist.length - 1);

      //append row to table
      $("#email-list-table").append(row);
      enableSave();
    }
    //update
    else {
      let index = parseInt($("#add-or-update").attr("data-index"), 10);

      //update array
      maillist[index] = {first: formData.first, last: formData.last, address: formData.address};

      //update table
      $(`tr[data-index="${index}"] > td[data-name="first"]`).text(maillist[index].first);
      $(`tr[data-index="${index}"] > td[data-name="last"]`).text(maillist[index].last);
      $(`tr[data-index="${index}"] > td[data-name="address"]`).text(maillist[index].address);

      //close form
      $(".addto-maillist-dialog-wrapper").addClass("hide");
      enableSave();
      //console.log("after Update: maillist: %o", maillist);
    }

    $("#addto-maillist-form").form("clear");
  });

  //close
  $(".addto-maillist-cancel").on("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(".addto-maillist-dialog-wrapper").addClass("hide");
  });
}

/*
  Run only if page has class="manage-email-list"
*/
export async function loadEmailListTable() {
  let userInfo = getUserInfo();

  if (!userInfo) {
    notify.warning("You must be signed in to edit your email list");
    setTimeout(() => {
      location.href = "/";
    }, 3 * 1000);
    return;
  }
  let api = `${userInfo.userId}/maillist`;

  $(".sync.icon").addClass("loading");

  try {
    maillist = await getMailList(userInfo.userId);

    $(".sync.icon.loading").removeClass("loading");

    let html = populateTable(maillist);
    $("#email-list-table").html(html);

    createEventHandlers();
    //$("#maillist-table").dataTable();
  }
  catch(err) {
    $(".sync.icon.loading").removeClass("loading");
    notify.error(`Error getting email list: ${err}`);
  }
}

/*
  Save changes to maillist to database
*/
async function saveChanges() {
  let userInfo = getUserInfo();
  let newList = maillist.filter(item => !item.deleted);

  let body = {
    userId: userInfo.userId,
    mailList: newList
  };

  try {
    $(".sync.icon").addClass("loading");
    let response = await putMailList(userInfo.userId, body);
    notify.info(`Saved! ${response}`);
    $(".sync.icon.loading").removeClass("loading");
    $("button.save-to-database").addClass("disabled");
  }
  catch(err) {
    $(".sync.icon.loading").removeClass("loading");
    notify.error(err);
  }
}

