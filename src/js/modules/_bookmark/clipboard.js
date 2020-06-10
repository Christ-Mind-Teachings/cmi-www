import Clipboard from "clipboard";
import notify from "toastr";
import {getString} from "../_language/lang";

//var clipboard;
var clipboard = new Map();

function setEvents(clip) {
  clip.on("success", (e) => {
    //console.log("e.text: %s", e.text);
    if (e.text.indexOf("tocbook") > -1) {
      //modal dialog is displayed so notify won't work
      $(".toc.modal > .message").html(`<p>${getString("clip:url")}</p>`);
      setTimeout(() => {
        $(".toc.modal > .message > p").remove();
      }, 2000);
    }
    else {
      notify.info(getString("clip:link"));
    }
    e.clearSelection();
  });

  clip.on("error", () => {notify.info(getString("error:e3"));});
}

function createInstance(selector) {
  var object = new Clipboard(selector);
  setEvents(object);
  return object;
}

export default {
  register: function(selector) {
    let clip = clipboard.get(selector);
    if (!clip) {
      clip = createInstance(selector);
      clipboard.set(selector, clip);
    }
    return clip;
  },
  destroy: function(selector) {
    let clip = clipboard.get(selector);
    if (clip) {
      clip.destroy();
      clipboard.delete(selector);
    }
  }
};
