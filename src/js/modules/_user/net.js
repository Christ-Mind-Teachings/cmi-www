import axios from "axios";
import globals from "../../globals";

export function getConfig(key) {
  let url = globals[key];

  if (!url) {
    throw `key: ${key} not found in globals`;
  }

  return axios.get(url);
}

export function getTopics(userId, sourceId) {
  let url = globals["topicsEndPoint"];

  if (!url) {
    throw `key: topicsEndPoint not found in globals`;
  }

  url = `${url}/user/${userId}/topics/${sourceId}`;

  return axios.get(url);
}

export function getBookmarks(userId, sourceId) {
  let url = globals["bookmarkApi"];

  if (!url) {
    throw "key: 'bookmarkApi' not found in globals";
  }

  url = `${url}/bookmark/query/${userId}/${sourceId}`;

  return axios.get(url);
}
