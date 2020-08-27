import axios from "axios";
import globals from "../../globals";

/**
 * @param {string} userId - md5 hash of userId
 * @param {string} sourceId - two digit source identifier
 * @return {array} topics - topicList
 *
 */
export function getTopicList(userId, sourceId) {
  return new Promise((resolve, reject) => {
    axios.get(`${globals.user}/topicList/${userId}/${sourceId}`)
      .then((response) => {
        let topics = response.data.topics;
        resolve(topics);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/*
 * Save topicList to DynamoDb
 */
export function putTopicList(userId, sourceId, topicList) {

  let body = {
    userId: userId,
    sourceId: sourceId,
    topicList: topicList
  };

  return new Promise((resolve, reject) => {
    axios.post(`${globals.user}/topicList`, body)
      .then((response) => { resolve(response.data.response); })
      .catch((err) => { reject(err); });
  });
}

