import axios from "axios";
import globals from "../../globals";

/**
 * Get saved search results as array
 *
 * @param {string} userId - md5 hash of userId
 * @param {string} sourceId - source identifier
 *
 */
export function getSearchResults(userId, sourceId) {
  return new Promise((resolve, reject) => {
    axios.get(`${globals.user}/searchResults/${userId}/${sourceId}`)
      .then((response) => {
        let results = response.data.response;
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Save search result to db
 *
 * @param {string} userId - md5 hash of userId
 * @param {string} sid - source identifier
 * @return {object} searchResult - search result
 *
 */
export function putSearchResult(userId, sourceId, result) {

  let body = {
    userId: userId,
    sid: sourceId,
    searchResult: result
  };

  return new Promise((resolve, reject) => {
    //console.log("putSearchResult body: %o", body);
    axios.post(`${globals.user}/searchResult`, body)
      .then((response) => { resolve(response.data.response); })
      .catch((err) => { reject(err); });
  });
}

/**
 * Get list of saved searches
 *
 * @param {string} userId - md5 hash of userId
 * @param {string} sourceId - source identifier
 *
 */
export function getSearchResultsList(userId, sourceId) {
  return new Promise((resolve, reject) => {
    axios.get(`${globals.user}/searchResultsList/${userId}/${sourceId}`)
      .then((response) => {
        let results = response.data.response;
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * Get search result by id
 *
 * @param {string} userId - md5 hash of userId
 * @param {string} sourceId - source identifier
 * @param {string} uniqueId - search id
 *
 */
export function getSearchResult(userId, sourceId, uniqueId) {
  return new Promise((resolve, reject) => {
    axios.get(`${globals.user}/searchResult/${userId}/${sourceId}/${uniqueId}`)
      .then((response) => {
        let results = response.data.response;
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

