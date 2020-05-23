import axios from "axios";

const uiNotesModal = ".notes.ui.modal";
const uiOpenNotesModal = ".notes-modal-open";
const uiModalOpacity = 0.5;

//about notes
let notes;

function showNote(noteName) {
  const note = notes[noteName];

  if (notes.__current__ !== noteName) {
    if (note.title) {
      $(".notes.modal .notes-title").text(note.title);
    }

    if (note.image) {
      $(".notes.modal .notes-image").attr("src", note.image);
    }

    if (note.content) {
      $(".notes.modal .notes-content").html(note.content);
    }
  }
  notes.__current__ = noteName;
  $(uiNotesModal).modal("show");
}

export function initialize(info = {}) {
  //info about notes; image, url, title
  notes = info;
  notes["__current__"] = "__nonote";

  //dialog settings
  $(uiNotesModal).modal({
    dimmerSettings: {opacity: uiModalOpacity},
    observeChanges: true
  });

  $(uiOpenNotesModal).on("click", (e) => {
    e.preventDefault();
    let noteName = $(e.currentTarget).attr("data-note");

    if (!notes[noteName]) {
      console.log("Note %s not found in notes configuration", noteName);
      return;
    }

    if (!notes[noteName].contents) {
      //console.log("requesting note: %s", noteName);
      axios({
        method: "get",
        url: notes[noteName].url,
        responseType: "text"
      }).then(response => {
        //console.log("Note response: %s", response.data);
        notes[noteName].content = response.data;
        showNote(noteName);
      }).catch(err => {
        console.error("Error fetching note: %s", noteName, err);
      });
    }
    else {
      showNote(noteName);
    }
  });

}
