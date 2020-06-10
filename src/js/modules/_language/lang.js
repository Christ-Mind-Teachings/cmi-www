/*
 * Support for language translation in code shared by CMI sources. Many modules in cmi-www
 * are used by the other sources and this module supplies translations for prompts and labels
 * that are set programatically.
 */
import axios from "axios";
import notify from "toastr";

const [NOTLOADED, LOADING, LOADED, FAILED] = [0, 1, 2, 3];
let status = NOTLOADED;
let language = {notReady: true};

/*
 * Load language file for prompts set programatically
 *
 * English is the default and stored in /public/lang/en.json.
 * Non english languages are stored in /t/<sid>/public/lang/??.json.
 */
export function setLanguage(constants) {
  let lang = "en";
  let url;

  if (status === LOADED) {
    notify.warning("language already loaded");
    return;
  }

  //loading started
  status = LOADING;

  if (constants.lang) {
    lang = constants.lang;
  }

  url = `/public/lang/${lang}.json`;
  if (lang !== "en" && constants.env === "integration") {
    url = `${constants.url_prefix}${url}`;
  }

  //console.log("requesting lang: %s.json from: %s", lang, url);
  axios.get(url)
    .then((response) => {
      //console.log("language %o", response.data);
      language = response.data;
      status = LOADED;
      console.log("%s loaded", lang);
    })
    .catch((error) => {
      status = FAILED;
      notify.error(`Failed to load language: ${lang}`);
      console.error("language load failed: %o", error);
    });
}

/*
 * Wait for language data to be loaded and return translation
 * for key s:k.
 *
 * If status == LOADING wait for 250ms up to 8 times for the status
 * to change. Bail if it doens't change.
 */
function waitForReady(s, k) {
  return new Promise((resolve, reject) => {
    function wait(s, k, ms, max=8, cnt=0) {
      if (status === LOADING) {
        if (cnt < max) {
          setTimeout(() => wait(s, k, ms, max, cnt+1), ms);
        }
        else {
          console.log("terminating wait at count %s", cnt);
          resolve("timeout");
        }
      }
      else {
        //console.log("Language ready at wait count: %s", cnt);
        resolve(keyValue(s,k));
      }
    }

    //if (language.hasOwnProperty("notReady")) {
    if (status == LOADING) {
      wait(s, k, 250);
    }
    else {
      resolve(keyValue(s,k));
    }
  });
}

/*
 * Get the translation for key [s:k].
 *
 * Return "not loaded" if setLanguage() has not been called, or
 * "loading" or "failed" if the language file is not ready.
 *
 * Return translated value otherwise.
 *
 * Note: if "loading" is return getString() should be called with the second
 * argument "true" so it return a promise and getString() will return the
 * translation when the file is ready.
 */
function keyValue(s, k) {
  if (status === NOTLOADED) {
    return "not loaded";
  }

  if (status !== LOADED) {
    return `${status===LOADING?`loading(${s}:${k})`:`failed(${s}:${k})`}`;
  }

  if (!language[s]) {
    return null;
  }

  if (!k) {
    return language[s];
  }

  if (!language[s][k]) {
    return null;
  }

  return language[s][k];
}

/*
 * Get trnaslation for argument 'key'. Key can be in two parts
 * delimited by a ':'. The second part is optional.
 *
 * When arg: wait is true, getString() returns a promise. Use this
* if getString() returns a value of "loading(s:k)" to wait until
* language file is loaded before requesting a translation.
*/
export function getString(key, wait = false) {
  if (typeof key !== "string") {
    return null;
  }

  let [s,k] = key.split(":");

  if (wait) {
    return waitForReady(s, k);
  }

  return keyValue(s, k);
}

/*
 * This is a tagged template function that populates
 * a template string with values from the language
 * object.
 *
 * Note: This won't work when called before the language
 * file is loaded and ready.
 */
export function __lang(strings, ...values) {
  const tokens = values.map(value => {
    let t = getString(value);
    if (!t) {
      return value;
    }
    return t;
  });

  return strings.reduce((result, string, i) => {
    return `${result}${string}${tokens[i] || ""}`;
  }, "");
}


