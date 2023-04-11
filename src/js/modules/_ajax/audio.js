/*
 * Ajax functions to support CMI audio.
 */

import axios from "axios";

/**
 * Get audio timing data for the given url.
 *
 * @param {object} si - contains source specific settings
 * @param {string} uri - location of timing data relative to source home url
 * @returns {object} - timing data
 *
 * Timing data is found /public/timing and organized by book ID
 */
export function fetchTimingData(si, uri) {
  return new Promise((resolve, reject) => {
    axios.get(`${si.audio.timingBase}${uri}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

