/*
  Teaching specific data
*/

const keyInfo = require("./modules/_config/key");
import {getPageInfo} from "./modules/_config/config";

export default {
  sid: "WWW",
  getPageInfo: getPageInfo,              //list
  keyInfo: keyInfo,                      //list, bmnet
  bm_modal_key: "bm.www.modal",         //list
  bm_creation_state: "bm.www.creation", //bookmark
  bm_list_store: "bm.www.list",         //bmnet
  bm_topic_list: "bm.www.topics",       //bmnet
  bm_modal_store: "bm.www.modal",       //navigator
  url_prefix: ""                  //navigator
};
