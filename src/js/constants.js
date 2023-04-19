/**
 * Source specific settings.
 *
 * These are constants for the Library home page. It is the
 * card catalogue for the library.
 *
 * It has no search, audio, or annotation support.
 */

const keyInfo = require("./modules/_config/key");
import {getPageInfo} from "./modules/_config/config";

export default {
  sid: "www",
  env: "integration",
  lang: "en",
  url_prefix: "",
  sourceId: 99,
  getPageInfo: getPageInfo,
  keyInfo: keyInfo,
  store: {
    pnDisplay: "pn.display",
    cfgacq: "cfg.acq",
    cfgprofile: "cfg.profile"
  }
};
