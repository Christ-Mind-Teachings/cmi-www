import axios from "axios";
import globals from "../../globals";

/*
 * Get all quoteId's for userId and key
 *  where key is the first two or more positions of the page key
 *  ie, 10: WOM, etc
 *
 *  OLD CODE
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
 *
 * OLD CODE
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

/*
 * Get quote data from database. What returns doesn not contain a formatted
 * url of the source.
 */
export function getQuoteData(userId, paraKey, creationDate) {
  let url = `${globals.user2}/quoteData/${userId}/${paraKey}/${creationDate}`;

  return new Promise((resolve, reject) => {
    axios.get(url).then((resp) => {
      resolve(resp.data.quote);
    }).catch((err) => {
      reject(err);
    });
  });
}

export function putQuote(quote) {
  let url = `${globals.user2}/quote`;

  return new Promise((resolve, reject) => {
    axios.post(url, quote).then((resp) => {
      resolve(resp.data.response);
    }).catch((err) => {
      reject(err);
    });
  });
}

export function deleteQuote(userId, paraKey, creationDate) {
  let url = `${globals.user2}/quote/${userId}/${paraKey}/${creationDate}`;

  return new Promise((resolve, reject) => {
    axios.delete(url).then((resp) => {
      resolve(resp.data.response);
    }).catch((err) => {
      reject(err);
    });
  });
}




