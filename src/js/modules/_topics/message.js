
/*
 * Display a message in a modal. The modal must have a 
 * <div class="ui message"></div>
 */

/*
 * Display a warning message for duration seconds
 */
export function displayWarning(selector, message, duration=0) {
  $(selector).removeClass("positive").addClass("warning").text(message);

  if (duration > 0) {
    setTimeout(() => {
      $(selector).addClass("hidden").removeClass("warning");
    }, duration * 1000);
  }
}

/*
 * Display a success message for duration seconds
 */
export function displaySuccess(selector, message, duration=5) {
  $(selector).removeClass("hidden").addClass("positive").text(message);

  if (duration > 0) {
    setTimeout(() => {
      $(selector).addClass("hidden").removeClass("positive");
    }, duration * 1000);
  }
}
