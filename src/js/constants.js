/*
  Teaching specific data
*/

const keyInfo = require("./modules/_config/key");
import {getPageInfo} from "./modules/_config/config";

export default {
  sid: "www",
  env: "integration",
  lang: "en",
  getPageInfo: getPageInfo,              //list
  keyInfo: keyInfo,                      //list, bmnet
  bm_modal_key: "bm.www.modal",         //list
  bm_creation_state: "bm.www.creation", //bookmark
  bm_list_store: "bm.www.list",         //bmnet
  bm_topic_list: "bm.www.topics",       //bmnet
  bm_modal_store: "bm.www.modal",       //navigator
  url_prefix: "",                  //navigator
  store: {
    bmList: "bm.list",
    bmCreation: "bm.creation",
    bmTopics: "bm.topics",
    bmModal: "bm.modal"
  }
};
