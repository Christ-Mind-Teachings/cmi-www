/*
  Set up submit handler for contact forms
*/

import notify from "toastr";
import {getUserInfo} from "../_user/netlify";

function createSubmitHandler($form) {
  let userInfo = getUserInfo();

  //init form fields for signed in users
  if (userInfo) {
    $form.form("set values", {
      name: userInfo.name,
      email: userInfo.email
    });
  }

  //submit handler
  $form.submit(function(e) {
    e.preventDefault();
    //console.log("submit pressed");

    let $form = $(this);
    let formData = $form.form("get values");
    let validationError = false;

    //form validation
    if (formData.name.trim().length === 0) {
      notify.warning("Please enter your name.");
      validationError = true;
    }
    if (formData.email.trim().length === 0) {
      notify.warning("Please enter your email address.");
      validationError = true;
    }
    if (formData.message.trim().length === 0) {
      notify.warning("Please enter a message.");
      validationError = true;
    }

    if (validationError) {
      return false;
    }

    //send to netlify
    $.post($form.attr("action"), $form.serialize())
      .done(function() {
        notify.success("Thank you!");
      })
      .fail(function(e) {
        notify.error("Sorry, there was a failure to communicate!");
      });
  });
}

export default {

  initialize: function(formName) {
    let $form = $(`form#${formName}`);

    if ($form.length > 0) {
      createSubmitHandler($form);
      console.log("Form %s initialized.", formName);
    }
  }
};
