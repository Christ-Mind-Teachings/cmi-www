import {storeGet, storeSet} from "../_util/store";
import axios from "axios";

/**
  We use book level configuration that is loaded by request via AJAX. Once
  loaded the config is persisted in local storage. A check is made for
  configuration data loaded from local storage to determine if the data needs to
  be reloaded.

  @params {string} url - The url of the config file
  @params {string} lsKey - local storage key (cfgwoh)
  @returns {Promise} The config file
*/
export function fetchConfiguration(url, lsKey, configStatus) {
  return new Promise((resolve, reject) => {
    let cfg = storeGet(lsKey);

    //if config in local storage check if we need to get a fresh copy
    if (cfg && !refreshNeeded(cfg, configStatus)) {
      resolve(cfg);
      return;
    }

    //get config from server
    axios.get(url)
      .then((response) => {
        response.data.saveDate = configStatus[response.data.bid];
        storeSet(lsKey, response.data);
        resolve(response.data);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
}

/*
  The status constains the save date for each config file. We compare that to the saveDate
  in the locally stored config file. If it's different or doesn't exist we need to get
  a new version.

  return: true - get a new version
          false - use the one we've got
*/
function refreshNeeded(cfg, configStatus) {
  let lastSaveDate = configStatus[cfg.bid];
  if (!cfg.saveDate) {
    cfg.saveDate = lastSaveDate;
    return true; //refresh needed
  }

  if (cfg.saveDate === lastSaveDate) {
    return false; //no refresh needed
  }
  else {
    //config file has changed, refresh needed
    cfg.saveDate = lastSaveDate;
    return true;
  }
}

