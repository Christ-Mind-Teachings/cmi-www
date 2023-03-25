import axios from "axios";
import globals from "../../globals";

export function searchSource(parms) {
  return new Promise((resolve, reject) => {
      axios.post(globals.search, parms).then((response) => {
      resolve(response.data);
    }).catch((error) => {
      console.error("search error: %o", error);
      reject(error);
    });
  });
}

