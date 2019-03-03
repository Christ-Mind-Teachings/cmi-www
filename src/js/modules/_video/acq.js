//initialize video in Get Acquainted Guide

export function initialize() {

  //check if we're on acq.video page
  if ($("#acq-video").length === 0) {
    return;
  }

  //embed all videos on page
  $(".ui.embed").embed();
}