/*
  Set up submit handler for contact forms
*/

import notify from "toastr";

function createSubmitHandler($form) {
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

    if (validationError) {
      return false;
    }

    //disable submit button
    $("[name='cmi-subscribe'] > button").addClass("disabled");

    //send to netlify
    $.post($form.attr("action"), $form.serialize())
      .done(function() {
        notify.success("Success!");
        $form.form("clear");
        $("[name='cmi-subscribe'] > button").removeClass("disabled");
      })
      .fail(function() {
        notify.error("Sorry, there was a failure to communicate!");
        $("[name='cmi-subscribe'] > button").removeClass("disabled");
      });
  });
}

export default {

  initialize: function() {
    let $form = $(".subscribe.form");

    if ($form.length > 0) {
      createSubmitHandler($form);
      console.log("Subscribe form initialized.");
    }
  }
};
