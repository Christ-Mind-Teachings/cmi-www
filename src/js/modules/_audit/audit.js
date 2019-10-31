import globals from "../../globals";
import axios from "axios";
import {getUserInfo} from "../_user/netlify";

export function searchAudit(source, query, count, error) {
  const api = `${globals.audit}/audit/search`;
  const userInfo = getUserInfo();

  const body = {
    userId: "guest",
    count: count,
    query: query,
    source: source
  };

  if (userInfo) {
    body.userId = userInfo.email;
  }

  if (error) {
    body.error = error;
  }

  axios.post(api, body)
    .catch((err) => {
      console.error(`searchAudit error: ${err}`);
    });
}
