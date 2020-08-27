import axios from "axios";
import globals from "../../globals";

export function getMailList(userId) {
  return new Promise((resolve, reject) => {
    axios.get(`${globals.user}/mailList/${userId}`)
      .then((response) => {
        resolve(response.data.mailList);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function putMailList(userId, list) {
  return new Promise((resolve, reject) => {
    axios.post(`${globals.user}/mailList`, list)
      .then(response => {
        resolve(response.data.response);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function sendMail(mailInfo) {
  return new Promise((resolve, reject) => {
    axios.post(`${globals.user}/share`, mailInfo)
      .then((response) => {
        if (response.status === 200) {
          resolve("success");
        }
        else {
          resolve(response.data.message);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}


