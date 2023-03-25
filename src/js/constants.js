/*
  Teaching specific data
*/

const keyInfo = require("./modules/_config/key");
import {getPageInfo} from "./modules/_config/config";

export default {
  sid: "www",
  env: "integration",
  lang: "en",
  url_prefix: "",                  //navigator
  sourceId: 99,
  getPageInfo: getPageInfo,              //list
  keyInfo: keyInfo,                      //list, bmnet
  store: {
    pnDisplay: "pn.display",
    cfgacq: "cfg.acq",
    cfgprofile: "cfg.profile"
  }
};
