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
    this._lang = config.lang;

    //source specific functions
    this._generateHTML;
    this._keyInfo = config.keyInfo;
    this._getPageInfo = config.getPageInfo;

    //audio support
    this._getReservation = function(url) {return "";};
    this._getAudioInfo = function(url) {return {};};
    this._timingBase;

    if (config.audio) {
      this._timingBase = config.audio.timingBase;
      this._getReservation = config.audio.getReservation;
      this._getAudioInfo = config.audio.getAudioInfo;
    }

    //for language translation
    this._gs = function(key, def) {return def;};

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

  set gs(func) {
    this._gs = func;
  }

  gs(key, def) {
    return this._gs(key, def);
  }

  //check for timer reservation for url
  getReservation(url) {
    return this._getReservation(url);
  }

  //get audio info for url
  getAudioInfo(url) {
    return this._getAudioInfo(url);
  }

  //base uri for timing data
  get timingBase() {
    return this._timingBase;
  }

  set generateHTML(func) {
    this._generateHTML = func;
  }

  get lang() {
    return this._lang;
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


