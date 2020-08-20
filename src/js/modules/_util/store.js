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

