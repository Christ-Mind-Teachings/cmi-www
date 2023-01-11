import {getQuote} from "../_ajax/quotes";

function _getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/*
 * Manages quotes from more than one user
 *  - Quotes of type RandomQuotes are managed
 */
export class QuoteManager {
  constructor() {
    this.quotes = [];
    this.ptr = -1;
  }

  getRandomQuote() {
    //this can happen when quote dialog is shown on page load
    if (this.ptr === -1) {
      let icon = "<i class='circular inverted green left quote icon'></i>";
      return Promise.resolve( {
        citation: "It should be okay now",
        quote: `Waiting for Quotes to download. Please click the 'Display Another Quote' <span>${icon}</span> button below to continue.`,
        url: "nolink"
      });
    }
    return this.quotes[this.ptr].getRandomQuote();
  }

  getInternalQuoteArray() {
    return this.quotes;
  }

  addQuotes(userQuotes) {
    let length = this.quotes.push(userQuotes);
    this.ptr = length - 1;
  }

  //use quotes from userId
  use(userId) {
    let index = this.quotes.findIndex(q => {
      return q.user === userId;
    });

    if (index > -1) {
      this.ptr = index;
    }
    else {
      throw new Error(`User: ${userId} not found.`);
    }
  }
}

export class RandomQuotes {
  constructor(userName, userId, sourceId) {
    this.quoteIds = [];
    this.usedIds = [];
    this.quotes = {};

    this.userName = userName;
    this.userId = userId;
    this.sourceId = sourceId;
  }

  set qIds(idArray) {
    this.quoteIds = idArray;
  }

  get user() {
    return this.userId;
  }

  get userInfo() {
    return {userName: this.userName, userId: this.userId};
  }

  _resetUsed() {
    this.quoteIds = this.usedIds;
    this.usedIds = [];
  }

  markAsUsed(idx) {
    this.usedIds.push(this.quoteIds[idx]);
    this.quoteIds.splice(idx, 1);
  }

  getRandomQuote() {
    return new Promise((resolve, reject) => {
      if (this.quoteIds.length === 0) {
        if (this.usedIds.length === 0) {
          resolve({}); //no quotes
          return;
        }

        this._resetUsed();
      }

      let idx = _getRandomInt(this.quoteIds.length);
      let key = this.quoteIds[idx];

      if (this.quotes[key]) {
        this.markAsUsed(idx);
        resolve(this.quotes[key]);
        return;
      }

      getQuote(this.userId, key).then((quote) => {
        this.quotes[key] = quote;
        this.markAsUsed(idx);
        resolve(quote);
      });
    });
  }

}
