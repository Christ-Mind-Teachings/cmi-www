/*
 * NOTE: This is pre-user2 code. See quotes.js for more recent version.
 */
import axios from "axios";
import notify from "toastr";
import globals from "../../globals";

/*
 * Get all quoteId's for userId and key
 *  where key is the first two or more positions of the page key
 *  ie, 10: WOM, etc
 */
export function getQuoteIds(userId, key) {
  let url = `${globals.quote}/getKeys/${userId}/${key}`;

  return new Promise((resolve, reject) => {
    axios.get(url).then((resp) => {
      resolve(resp.data.response);
      return;
    }).catch((err) => {
      console.error(err);
      reject(err);
      return;
    });
  });
}

/*
 * Get Quote by userId and quoteId
 */
export function getQuote(userId, quoteId) {
  let url = `${globals.quote}/quote/${userId}/${quoteId}`;

  return new Promise((resolve, reject) => {
    axios.get(url).then((resp) => {
      resolve(resp.data.quote);
    }).catch((err) => {
      notify.error("Network error: failed to get quote");
      reject(err);
    });
  });
}

