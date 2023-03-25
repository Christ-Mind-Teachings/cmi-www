/*
 * Store data in local storage. Keys are limited to those found
 * in source constants file.
 */
import store from "store";

let keys = new Map();

/*
 * Get key from keys and throw if not found
*/
function getKey(key) {
  const storeKey = keys.get(key);

  if (!storeKey) {
    throw new Error(`store: key not found: ${key}`);
  }

  return storeKey;
}

/*
 * Set value for key in local storage
 */
export function storeSet(key, value) {
  store.set(getKey(key), value);
}

/*
 * Get value for key from local storage
 */
export function storeGet(key, defaultValue) {
  let value = store.get(getKey(key));

  return value || defaultValue;
}

/*
 * Load 'keys' with acceptable keys for local storage
 * based on the 'store' object in the argument 'config'
*/
export function storeInit(config) {
  let sid = config.sid;

  for (const key in config.store) {
    keys.set(key, `${sid}.${config.store[key]}`);
  }
}

export class SourceStore {
  constructor(config) {
    this.keys = new Map();
    this._sid = config.sid;
    this._prefix = config.url_prefix;

    //search data functions
    this._prepareSearchResults;
    this._generateHTML;

    //wom
    this._keyInfo = config.keyInfo;
    this._getPageInfo = config.getPageInfo;

    for (const key in config.store) {
      this.keys.set(key, `${this._sid}.${config.store[key]}`);
    }
  }

  getKey(key) {
    const storeKey = this.keys.get(key);

    if (!storeKey) {
      throw `SourceStore (${this._sid}): key: ${key} not found`;
    }

    return storeKey;
  }

  set prepareSearchResults(func) {
    this._prepareSearchResults = func;
  }

  get prepareSearchResults() {
    return this._prepareSearchResults;
  }

  set generateHTML(func) {
    this._generateHTML = func;
  }

  get generateHTML() {
    return this._generateHTML;
  }

  get keyInfo() {
    return this._keyInfo;
  }

  get getPageInfo() {
    return this._getPageInfo;
  }

  get prefix() {
    return this._prefix;
  }

  get sid() {
    return this._sid;
  }

  getValue(key, defaultValue) {
    const value = store.get(this.getKey(key));

    return value || defaultValue;
  }

  setValue(key, value) {
    store.set(this.getKey(key), value);
  }

};


