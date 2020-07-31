import axios from "axios";
import globals from "../../globals";

export function getMailList(userId) {
  return new Promise((resolve, reject) => {
    axios.get(`${globals.user2}/mailList/${userId}`)
      .then((response) => {
        let mailList = response.data.mailList;
        resolve(mailList);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export function sendMail(mailInfo) {
  return new Promise((resolve, reject) => {
    axios.post(globals.share, mailInfo)
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


