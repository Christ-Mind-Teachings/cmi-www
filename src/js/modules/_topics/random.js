
import axios from "axios";
import globals from "../../globals";

let quoteIds = [];
let usedIds = [];
let quotes = {};

function getRandomInt(max) {
  let idx = Math.floor(Math.random() * Math.floor(max));
  return idx;
}

/*
 * Remove  quoteIds[idx] and add to usedIds
 */
function markAsUsed(idx) {
  //console.log("mark %s as used", idx);
  usedIds.push(quoteIds[idx]);

  //remove item
  quoteIds.splice(idx, 1);
}

function resetUsed() {
  //console.log("reset used quote array");
  quoteIds = usedIds;
  usedIds = [];
}

function getQuote(userId) {
  return new Promise((resolve, reject) => {
    if (quoteIds.length === 0) {
      if (usedIds.length === 0) {
        resolve({}); //no quotes
        return;
      }

      resetUsed();
    }

    let idx = getRandomInt(quoteIds.length);
    let key = quoteIds[idx];

    if (quotes[key]) {
      markAsUsed(idx);
      resolve(quotes[key]);
      return;
    }

    let url = `${globals.quote}/quote/${userId}/${key}`;
    axios.get(url).then((resp) => {
      //console.log("quote: %o", resp.data.quote);
      quotes[key] = resp.data.quote;
      markAsUsed(idx);
      resolve(quotes[key]);
    }).catch((err) => {
      notify.error("Network error: failed to get quote");
      reject(err);
    });
  });
}

function getQuoteIds(userId, key) {
  return new Promise((resolve, reject) => {
    let url = `${globals.quote}/getKeys/${userId}/${key}`;

    axios.get(url).then((resp) => {
      quoteIds = resp.data.response;
      resolve(quoteIds.length);
      return;
    }).catch((err) => {
      console.error(err);
      reject(err);
      return;
    });
  });
}

export function getRandomQuote(userId, key) { 
  return new Promise((resolve, reject) => {

    //check if quoteIds have been loaded
    if (quoteIds.length === 0) {
      getQuoteIds(userId, key).then((resp) => {
        getQuote(userId).then((resp) => {
          resolve(resp);
          return;
        });
      });
    }
    else {
      getQuote(userId).then((resp) => {
        resolve(resp);
        return;
      });
    }
  });
}

