(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["page~profile~transcript"],{

/***/ "../cmi-acim/src/js/modules/_config/key.js":
/*!*************************************************!*\
  !*** ../cmi-acim/src/js/modules/_config/key.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  ACIM: Transcript keys
  - first item starts with 1, not 0
  - a numeric value that represents a specific transcript and represents
    a specific logical ordering.

  - The integer part of the key represent a transcript and the decimal part
    a paragraph within the transcript.
  - The paragraphId is increased by 1 and divided by 1000

  key format: ssbuuuu.ppp
  where: ss: source Id
          b: book Id
       uuuu: unit Id
        ppp: paragraph number - not positional

  NOTE: This module is used by code running in the browser and Node so the
        common.js module system is used
*/
//import indexOf from "lodash/indexOf";
const sprintf = __webpack_require__(/*! sprintf-js */ "../cmi-acim/node_modules/sprintf-js/src/sprintf.js").sprintf; //length of pageKey excluding decimal portion


const keyLength = 7; //Source Id, this must be a unique two digit number

const sourceId = 12;
const sid = "acim";
const prefix = "/t/acim"; //list the books, these correspond to collection names defined in _config.yml
// * order according to how search results and bookmarks should appear

const books = ["preface", "text", "workbook", "manual", "acq"];
const bookIds = ["xxx", ...books]; //list the chapters or parts that make up each book, set the first item to 'xxx'

const acq = ["xxx", "welcome", "acim", "web", "raj"];
const preface = ["xxx", "preface"];
const text = ["xxx", "chap0100", "chap0101", "chap0102", "chap0200", "chap0201", "chap0202", "chap0203", "chap0204", "chap0205", "chap0300", "chap0301", "chap0302", "chap0303", "chap0304", "chap0305", "chap0306", "chap0307", "chap0308", "chap0400", "chap0401", "chap0402", "chap0403", "chap0404", "chap0405", "chap0406", "chap0407", "chap0408", "chap0500", "chap0501", "chap0502", "chap0503", "chap0504", "chap0505", "chap0506", "chap0507", "chap0508", "chap0600", "chap0601", "chap0602", "chap0603", "chap0604", "chap0700", "chap0701", "chap0702", "chap0703", "chap0704", "chap0705", "chap0706", "chap0707", "chap0708", "chap0709", "chap0710", "chap0711", "chap0800", "chap0801", "chap0802", "chap0803", "chap0804", "chap0805", "chap0806", "chap0807", "chap0808", "chap0809", "chap0810", "chap0900", "chap0901", "chap0902", "chap0903", "chap0904", "chap0905", "chap0906", "chap0907", "chap0908", "chap0909", "chap0910", "chap1000", "chap1001", "chap1002", "chap1003", "chap1004", "chap1005", "chap1006", "chap1007", "chap1100", "chap1101", "chap1102", "chap1103", "chap1104", "chap1105", "chap1106", "chap1107", "chap1108", "chap1109", "chap1200", "chap1201", "chap1202", "chap1203", "chap1204", "chap1205", "chap1206", "chap1300", "chap1301", "chap1302", "chap1303", "chap1304", "chap1305", "chap1306", "chap1307", "chap1308", "chap1400", "chap1401", "chap1402", "chap1403", "chap1404", "chap1405", "chap1406", "chap1500", "chap1501", "chap1502", "chap1503", "chap1504", "chap1505", "chap1506", "chap1507", "chap1508", "chap1509", "chap1510", "chap1600", "chap1601", "chap1602", "chap1603", "chap1604", "chap1605", "chap1606", "chap1607", "chap1700", "chap1701", "chap1702", "chap1703", "chap1704", "chap1705", "chap1706", "chap1707", "chap1708", "chap1800", "chap1801", "chap1802", "chap1803", "chap1804", "chap1805", "chap1806", "chap1807", "chap1808", "chap1809", "chap1810", "chap1900", "chap1901", "chap1902", "chap1903", "chap1904", "chap1905", "chap1906", "chap1907", "chap1908", "chap1909", "chap1910", "chap1911", "chap2000", "chap2001", "chap2002", "chap2003", "chap2004", "chap2005", "chap2006", "chap2007", "chap2008", "chap2100", "chap2101", "chap2102", "chap2103", "chap2104", "chap2105", "chap2106", "chap2107", "chap2108", "chap2200", "chap2201", "chap2202", "chap2203", "chap2204", "chap2205", "chap2206", "chap2300", "chap2301", "chap2302", "chap2303", "chap2304", "chap2400", "chap2401", "chap2402", "chap2403", "chap2404", "chap2405", "chap2406", "chap2407", "chap2500", "chap2501", "chap2502", "chap2503", "chap2504", "chap2505", "chap2506", "chap2507", "chap2508", "chap2509", "chap2600", "chap2601", "chap2602", "chap2603", "chap2604", "chap2605", "chap2606", "chap2607", "chap2608", "chap2609", "chap2610", "chap2700", "chap2701", "chap2702", "chap2703", "chap2704", "chap2705", "chap2706", "chap2707", "chap2708", "chap2800", "chap2801", "chap2802", "chap2803", "chap2804", "chap2805", "chap2806", "chap2807", "chap2900", "chap2901", "chap2902", "chap2903", "chap2904", "chap2905", "chap2906", "chap2907", "chap2908", "chap2909", "chap3000", "chap3001", "chap3002", "chap3003", "chap3004", "chap3005", "chap3006", "chap3007", "chap3008", "chap3100", "chap3101", "chap3102", "chap3103", "chap3104", "chap3105", "chap3106", "chap3107"];
const workbook = ["xxx", "introp1", "l001", "l002", "l003", "l004", "l005", "l006", "l007", "l008", "l009", "l010", "l011", "l012", "l013", "l014", "l015", "l016", "l017", "l018", "l019", "l020", "l021", "l022", "l023", "l024", "l025", "l026", "l027", "l028", "l029", "l030", "l031", "l032", "l033", "l034", "l035", "l036", "l037", "l038", "l039", "l040", "l041", "l042", "l043", "l044", "l045", "l046", "l047", "l048", "l049", "l050", "review1", "l051", "l052", "l053", "l054", "l055", "l056", "l057", "l058", "l059", "l060", "l061", "l062", "l063", "l064", "l065", "l066", "l067", "l068", "l069", "l070", "l071", "l072", "l073", "l074", "l075", "l076", "l077", "l078", "l079", "l080", "review2", "l081", "l082", "l083", "l084", "l085", "l086", "l087", "l088", "l089", "l090", "l091", "l092", "l093", "l094", "l095", "l096", "l097", "l098", "l099", "l100", "l101", "l102", "l103", "l104", "l105", "l106", "l107", "l108", "l109", "l110", "review3", "l111", "l112", "l113", "l114", "l115", "l116", "l117", "l118", "l119", "l120", "l121", "l122", "l123", "l124", "l125", "l126", "l127", "l128", "l129", "l130", "l131", "l132", "l133", "l134", "l135", "l136", "l137", "l138", "l139", "l140", "review4", "l141", "l142", "l143", "l144", "l145", "l146", "l147", "l148", "l149", "l150", "l151", "l152", "l153", "l154", "l155", "l156", "l157", "l158", "l159", "l160", "l161", "l162", "l163", "l164", "l165", "l166", "l167", "l168", "l169", "l170", "review5", "l171", "l172", "l173", "l174", "l175", "l176", "l177", "l178", "l179", "l180", "intro181", "l181", "l182", "l183", "l184", "l185", "l186", "l187", "l188", "l189", "l190", "l191", "l192", "l193", "l194", "l195", "l196", "l197", "l198", "l199", "l200", "review6", "l201", "l202", "l203", "l204", "l205", "l206", "l207", "l208", "l209", "l210", "l211", "l212", "l213", "l214", "l215", "l216", "l217", "l218", "l219", "l220", "introp2", "forgiveness", "l221", "l222", "l223", "l224", "l225", "l226", "l227", "l228", "l229", "l230", "salvation", "l231", "l232", "l233", "l234", "l235", "l236", "l237", "l238", "l239", "l240", "world", "l241", "l242", "l243", "l244", "l245", "l246", "l247", "l248", "l249", "l250", "sin", "l251", "l252", "l253", "l254", "l255", "l256", "l257", "l258", "l259", "l260", "body", "l261", "l262", "l263", "l264", "l265", "l266", "l267", "l268", "l269", "l270", "christ", "l271", "l272", "l273", "l274", "l275", "l276", "l277", "l278", "l279", "l280", "holyspirit", "l281", "l282", "l283", "l284", "l285", "l286", "l287", "l288", "l289", "l290", "realworld", "l291", "l292", "l293", "l294", "l295", "l296", "l297", "l298", "l299", "l300", "secondcoming", "l301", "l302", "l303", "l304", "l305", "l306", "l307", "l308", "l309", "l310", "lastjudgement", "l311", "l312", "l313", "l314", "l315", "l316", "l317", "l318", "l319", "l320", "creation", "l321", "l322", "l323", "l324", "l325", "l326", "l327", "l328", "l329", "l330", "ego", "l331", "l332", "l333", "l334", "l335", "l336", "l337", "l338", "l339", "l340", "miracle", "l341", "l342", "l343", "l344", "l345", "l346", "l347", "l348", "l349", "l350", "whatami", "l351", "l352", "l353", "l354", "l355", "l356", "l357", "l358", "l359", "l360", "final", "l361", "epilog"];
const manual = ["xxx", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "chap13", "chap14", "chap15", "chap16", "chap17", "chap18", "chap19", "chap20", "chap21", "chap22", "chap23", "chap24", "chap25", "chap26", "chap27", "chap28", "chap29", "chap30", "chap31"];
const contents = {
  acq: acq,
  preface: preface,
  text: text,
  workbook: workbook,
  manual: manual
};
/*
  return the position of unit in the bid array
    arg: section is passed when bid = text
*/

function getUnitId(t, source, bid, unit, section) {
  if (section) {
    unit = section;
  }

  if (contents[bid]) {
    return contents[bid].indexOf(unit);
  } else {
    throw new Error(`unexpected bookId: ${bid}`);
  }
}
/*
  Return the number of chapters in the book (bid). 
  Subtract one from length because of 'xxx' (fake chapter)
*/


function getNumberOfUnits(bid) {
  if (contents[bid]) {
    return contents[bid].length - 1;
  } else {
    throw new Error(`getNumberOfUnits() unexpected bookId: ${bid}`);
  }
}

function splitUrl(url) {
  let u = url; //remove leading

  u = url.substr(1); //remove trailing '/' if it exists

  if (u[u.length - 1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}

function getSourceId() {
  return sourceId;
}

function getKeyInfo() {
  return {
    sourceId: sourceId,
    keyLength: keyLength
  };
}
/*
  parse bookmarkId into pageKey and paragraphId
  - pid=0 indicates no paragraph id
*/


function parseKey(key) {
  const keyInfo = getKeyInfo();
  let keyString = key;
  let pid = 0;

  if (typeof keyString === "number") {
    keyString = key.toString(10);
  }

  let decimalPos = keyString.indexOf("."); //if no decimal key doesn't include paragraph id

  if (decimalPos > -1) {
    let decimalPart = keyString.substr(decimalPos + 1); //append 0's if decimal part < 3

    switch (decimalPart.length) {
      case 1:
        decimalPart = `${decimalPart}00`;
        break;

      case 2:
        decimalPart = `${decimalPart}0`;
        break;
    }

    pid = parseInt(decimalPart, 10);
  }

  let pageKey = parseInt(keyString.substr(0, keyInfo.keyLength), 10);
  return {
    pid,
    pageKey
  };
}
/*
  Convert url into key
  returns -1 for non-transcript url

  key format: ssbuuIqq.ppp
  where: ss: source Id
          b: book Id
       uuuu: unit Id
        ppp: paragraph number - not positional
*/


function genPageKey(url = location.pathname) {
  let key = {
    sid: sourceId,
    bid: 0,
    uid: 0
  };
  let parts = splitUrl(url); //make sure we have a valid book

  key.bid = bookIds.indexOf(parts[2]);

  if (key.bid === -1) {
    return -1;
  } //get the unitId of the page, return if invalid


  key.uid = getUnitId(...parts);

  if (key.uid === -1) {
    return -1;
  }

  let compositeKey = sprintf("%02s%01s%04s", key.sid, key.bid, key.uid);
  let numericKey = parseInt(compositeKey, 10);
  return numericKey;
}
/* 
  genParagraphKey(paragraphId, key: url || pageKey) 

  args:
    pid: a string representing a transcript paragraph, starts as "p0"..."pnnn"
         - it's converted to number and incremented by 1 then divided by 1000
        pid can also be a number so then we just increment it and divide by 1000

    key: either a url or pageKey returned from genPageKey(), if key
   is a string it is assumed to be a url
*/


function genParagraphKey(pid, key = location.pathname) {
  let numericKey = key;
  let pKey;

  if (typeof pid === "string") {
    pKey = (parseInt(pid.substr(1), 10) + 1) / 1000;
  } else {
    pKey = (pid + 1) / 1000;
  } //if key is a string it represents a url


  if (typeof key === "string") {
    numericKey = genPageKey(key);
  }

  let paragraphKey = numericKey + pKey;
  return paragraphKey;
}
/*
  key format: ssbuuuu.ppp
  where: ss: source Id
          b: book Id
       uuuu: unit Id
        ppp: paragraph number - not positional
*/


function decodeKey(key) {
  let {
    pid,
    pageKey
  } = parseKey(key);
  let pageKeyString = pageKey.toString(10);
  let decodedKey = {
    error: false,
    message: "ok",
    sid: 0,
    bookId: "",
    uid: 0,
    pid: pid - 1
  }; //error, invalid key length

  if (pageKeyString.length !== keyLength) {
    decodedKey.error = true;
    decodedKey.message = `Integer portion of key should have a length of ${keyLength}, key is: ${pageKeyString}`;
    return decodedKey;
  } //check for valid sourceId


  decodedKey.sid = parseInt(pageKeyString.substr(0, 2), 10);

  if (decodedKey.sid !== sourceId) {
    decodedKey.error = true;
    decodedKey.message = `Invalid sourceId: ${decodedKey.sid}, expecting: ${sourceId}`;
    return decodedKey;
  }

  let bid = parseInt(pageKeyString.substr(2, 1), 10);
  decodedKey.bookId = bookIds[bid]; //subtract 1 from key value to get index

  decodedKey.uid = parseInt(pageKeyString.substr(3, 4), 10);
  return decodedKey;
}
/*
 * Convert page key to url
 */


function getUrl(key, withPrefix = false) {
  let decodedKey = decodeKey(key);
  let unit = "invalid";

  if (decodedKey.error) {
    return "/invalid/key/";
  }

  if (contents[decodedKey.bookId]) {
    unit = contents[decodedKey.bookId][decodedKey.uid];

    if (decodedKey.bookId === "text") {
      let chapter = unit.substr(4, 2);
      unit = `${chapter}/${unit}`;
    }
  }

  if (withPrefix) {
    return `${prefix}/${decodedKey.bookId}/${unit}/`;
  }

  return `/${decodedKey.bookId}/${unit}/`;
}
/*
function getUrl(key) {
  let decodedKey = decodeKey(key);
  let unit = "invalid";
  let chapter;

  if (decodedKey.error) {
    return "";
  }

  switch(decodedKey.bookId) {
    case "text":
      unit = text[decodedKey.uid];
      chapter = unit.substr(4,2);
      unit = `${chapter}/${unit}`;
      break;
    case "workbook":
      unit = workbook[decodedKey.uid];
      break;
    case "manual":
      unit = manual[decodedKey.uid];
      break;
    case "preface":
      unit = preface[decodedKey.uid];
      break;
    case "acq":
      unit = acq[decodedKey.uid];
      break;
  }

  return `/${decodedKey.bookId}/${unit}/`;
}
*/


function getBooks() {
  return books;
}
/*
  Describe key in terms of source:book:unit:p
*/


function describeKey(key) {
  let decodedKey = decodeKey(key, false);

  if (decodedKey.error) {
    return {
      key: key,
      error: true,
      source: sid
    };
  }

  let info = {
    key: key,
    source: sid,
    book: decodedKey.bookId,
    unit: contents[decodedKey.bookId][decodedKey.uid]
  };

  if (decodedKey.pid > -1) {
    info.pid = `p${decodedKey.pid}`;
  }

  return info;
}

module.exports = {
  getNumberOfUnits: getNumberOfUnits,
  getBooks: getBooks,
  getSourceId: getSourceId,
  getKeyInfo: getKeyInfo,
  parseKey: parseKey,
  genPageKey: genPageKey,
  genParagraphKey: genParagraphKey,
  decodeKey: decodeKey,
  getUrl: getUrl,
  describeKey: describeKey
};

/***/ }),

/***/ "../cmi-acol/src/js/modules/_config/key.js":
/*!*************************************************!*\
  !*** ../cmi-acol/src/js/modules/_config/key.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  ACOL: Transcript keys
  - first item starts with 1, not 0
  - a numeric value that represents a specific transcript and represents
    a specific logical ordering.

  - The integer part of the key represent a transcript and the decimal part
    a paragraph within the transcript.
  - The paragraphId is increased by 1 and divided by 1000

  key format: ssbbuuu.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
        ppp: paragraph number - not positional

  Using this key structure; these are maximums
    books: 99
    units: 999        //units are chapters that make up a book
    paragraphs: 999   //max number of paragraphs in a unit

  NOTE: This module is used by code running in the browser and Node so the
        common.js module system is used
*/
//import indexOf from "lodash/indexOf";
const sprintf = __webpack_require__(/*! sprintf-js */ "../cmi-acol/node_modules/sprintf-js/src/sprintf.js").sprintf; //source id: each source has a unique id
//WOM = 10
//JSB = 11
//ACIM = 12
//RAJ = 13


const sourceId = 14;
const sid = "acol";
const prefix = "/t/acol"; //length of pageKey excluding decimal portion

const keyLength = 7; //ACOL material books (bid)

const books = ["course", "treatise", "dialog", "acq"];
const bookIds = ["xxx", ...books];
const acq = ["xxx", "welcome", "book", "access"];
const course = ["xxx", "intro", "prelude", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "chap13", "chap14", "chap15", "chap16", "chap17", "chap18", "chap19", "chap20", "chap21", "chap22", "chap23", "chap24", "chap25", "chap26", "chap27", "chap28", "chap29", "chap30", "chap31", "chap32", "learning1"];
const treatise = ["xxx", "t1chap01", "t1chap02", "t1chap03", "t1chap04", "t1chap05", "t1chap06", "t1chap07", "t1chap08", "t1chap09", "t1chap10", "t2chap01", "t2chap02", "t2chap03", "t2chap04", "t2chap05", "t2chap06", "t2chap07", "t2chap08", "t2chap09", "t2chap10", "t2chap11", "t2chap12", "t2chap13", "t3chap01", "t3chap02", "t3chap03", "t3chap04", "t3chap05", "t3chap06", "t3chap07", "t3chap08", "t3chap09", "t3chap10", "t3chap11", "t3chap12", "t3chap13", "t3chap14", "t3chap15", "t3chap16", "t3chap17", "t3chap18", "t3chap19", "t3chap20", "t3chap21", "t3chap22", "t4chap01", "t4chap02", "t4chap03", "t4chap04", "t4chap05", "t4chap06", "t4chap07", "t4chap08", "t4chap09", "t4chap10", "t4chap11", "t4chap12", "learning2"];
const dialog = ["xxx", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "chap13", "chap14", "chap15", "chap16", "chap17", "day01", "day02", "day03", "day04", "day05", "day06", "day07", "day08", "day09", "day10", "day11", "day12", "day13", "day14", "day15", "day16", "day17", "day18", "day19", "day20", "day21", "day22", "day23", "day24", "day25", "day26", "day27", "day28", "day29", "day30", "day31", "day32", "day33", "day34", "day35", "day36", "day37", "day38", "day39", "day40", "epilog", "learning3", "dialog"];
const contents = {
  course: course,
  treatise: treatise,
  dialog: dialog,
  acq: acq
};

function splitUrl(url) {
  let u = url; //remove leading and trailing "/"

  u = url.substr(1); //remove trailing '/' if it exists

  if (u[u.length - 1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}
/*
  return the position of unit in the bid array
*/


function getUnitId(bid, unit) {
  if (contents[bid]) {
    return contents[bid].indexOf(unit);
  } else {
    throw new Error(`unexpected bookId: ${bid}`);
  }
}

function getSourceId() {
  return sourceId;
}

function getKeyInfo() {
  return {
    sourceId: sourceId,
    keyLength: keyLength
  };
}
/*
  parse bookmarkId into pageKey and paragraphId
  - pid=0 indicates no paragraph id
*/


function parseKey(key) {
  const keyInfo = getKeyInfo();
  let keyString = key;
  let pid = 0;

  if (typeof keyString === "number") {
    keyString = key.toString(10);
  }

  let decimalPos = keyString.indexOf("."); //if no decimal key doesn't include paragraph id

  if (decimalPos > -1) {
    let decimalPart = keyString.substr(decimalPos + 1); //append 0's if decimal part < 3

    switch (decimalPart.length) {
      case 1:
        decimalPart = `${decimalPart}00`;
        break;

      case 2:
        decimalPart = `${decimalPart}0`;
        break;
    }

    pid = parseInt(decimalPart, 10);
  }

  let pageKey = parseInt(keyString.substr(0, keyInfo.keyLength), 10);
  return {
    pid,
    pageKey
  };
}
/*
  Convert url into key
  returns -1 for non-transcript url

  key format: ssbbuuu.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
        ppp: paragraph number - not positional
*/


function genPageKey(url = location.pathname) {
  let key = {
    sid: sourceId,
    bid: 0,
    uid: 0,
    qid: 0
  };
  let parts = splitUrl(url); //key.bid = indexOf(bookIds, parts[0]);

  key.bid = bookIds.indexOf(parts[2]);

  if (key.bid === -1) {
    return -1;
  }

  key.uid = getUnitId(parts[2], parts[3]);

  if (key.bid === -1) {
    return -1;
  }

  let compositeKey = sprintf("%02s%02s%03s", key.sid, key.bid, key.uid);
  let numericKey = parseInt(compositeKey, 10);
  return numericKey;
}
/*
  genParagraphKey(paragraphId, key: url || pageKey)

  args:
    pid: a string representing a transcript paragraph, starts as "p0"..."pnnn"
         - it's converted to number and incremented by 1 then divided by 1000
        pid can also be a number so then we just increment it and divide by 1000

    key: either a url or pageKey returned from genPageKey(), if key
   is a string it is assumed to be a url
*/


function genParagraphKey(pid, key = location.pathname) {
  let numericKey = key;
  let pKey;

  if (typeof pid === "string") {
    pKey = (parseInt(pid.substr(1), 10) + 1) / 1000;
  } else {
    pKey = (pid + 1) / 1000;
  } //if key is a string it represents a url


  if (typeof key === "string") {
    numericKey = genPageKey(key);
  }

  let paragraphKey = numericKey + pKey;
  return paragraphKey;
}
/*
  key format: ssbbuuu.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
        ppp: paragraph number - not positional

  Substracting one from the unit does not work for getUrl, don't know
  why we do that. Added a second arg to keep old behavior but when false
  we don't do the subtraction.
*/


function decodeKey(key, subtract = true) {
  let {
    pid,
    pageKey
  } = parseKey(key);
  let pageKeyString = pageKey.toString(10);
  let decodedKey = {
    error: 0,
    message: "ok",
    sid: sourceId,
    bookId: "",
    uid: 0,
    pid: pid - 1
  }; //error, invalid key length

  if (pageKeyString.length !== keyLength) {
    decodedKey.error = true;
    decodedKey.message = `Integer portion of key should have a length of ${keyLength}, key is: ${pageKeyString}`;
    return decodedKey;
  }

  let bid = parseInt(pageKeyString.substr(2, 2), 10);
  decodedKey.bookId = bookIds[bid];

  if (subtract) {
    //substract 1 from key value to get index
    decodedKey.uid = parseInt(pageKeyString.substr(4, 3), 10) - 1;
  } else {
    decodedKey.uid = parseInt(pageKeyString.substr(4, 3), 10);
  }

  return decodedKey;
}

function getBooks() {
  return books;
}
/*
  Return the number of chapters in the book (bid).
  Subtract one from length because of 'xxx' (fake chapter)
*/


function getNumberOfUnits(bid) {
  if (contents[bid]) {
    return contents[bid].length - 1;
  } else {
    throw new Error(`getNumberOfUnits() unexpected bookId: ${bid}`);
  }
}
/*
 * Convert page key to url
 */


function getUrl(key, withPrefix = false) {
  let decodedKey = decodeKey(key, false);
  let unit = "invalid";

  if (decodedKey.error) {
    return "/invalid/key/";
  }

  if (contents[decodedKey.bookId]) {
    unit = contents[decodedKey.bookId][decodedKey.uid];
  }

  if (withPrefix) {
    return `${prefix}/${decodedKey.bookId}/${unit}/`;
  } else {
    return `/${decodedKey.bookId}/${unit}/`;
  }
}
/*
  Describe key in terms of source:book:unit:p
*/


function describeKey(key) {
  let decodedKey = decodeKey(key, false);

  if (decodedKey.error) {
    return {
      key: key,
      error: true,
      source: sid
    };
  }

  let info = {
    key: key,
    source: sid,
    book: decodedKey.bookId,
    unit: contents[decodedKey.bookId][decodedKey.uid]
  };

  if (decodedKey.pid > -1) {
    info.pid = `p${decodedKey.pid}`;
  }

  return info;
}

module.exports = {
  getNumberOfUnits: getNumberOfUnits,
  getBooks: getBooks,
  getSourceId: getSourceId,
  getKeyInfo: getKeyInfo,
  parseKey: parseKey,
  getUnitId: getUnitId,
  getUrl: getUrl,
  genPageKey: genPageKey,
  genParagraphKey: genParagraphKey,
  decodeKey: decodeKey,
  describeKey: describeKey
};

/***/ }),

/***/ "../cmi-col/src/js/modules/_config/key.js":
/*!************************************************!*\
  !*** ../cmi-col/src/js/modules/_config/key.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Transcript keys
  - a numeric value that represents a specific transcript and represents
    a specific logical ordering.
  - first item starts with 1

  - The integer part of the key represent a transcript and the decimal part
    a paragraph within the transcript.
  - The paragraphId is increased by 1 and divided by 1000

  key format: ssbbuuuxx.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
         xx: subunit
        ppp: paragraph number - not positional

  Limits:
    The Library of Christ Mind Teachings is limited to
       99 Sources
       99 Books per source
      999 Units (chapters) per book
       99 Unique Subunits per book
      999 Paragraphs per unit or subunit

  Example: url's
      [/t/sourceId]/bookId/unitId/subunitId/
      - /t/sourceId is omitted in standalone mode

  NOTE: This module is used by code running in the browser and Node so the
        common.js module system is used
*/
const si = __webpack_require__(/*! ./si */ "../cmi-col/src/js/modules/_config/si.js");

const sprintf = __webpack_require__(/*! sprintf-js */ "../cmi-col/node_modules/sprintf-js/src/sprintf.js").sprintf;

const keyLength = 9; //length of pageKey excluding decimal portion

/*
 * The argument is the page url. Use the book id (bid)
 * to find the position of the page in the contents array.
 */

function getUnitId(...urlArray) {
  let bid = getBook(urlArray);
  let {
    unit,
    subunit
  } = getUnitInfo(urlArray);

  if (si.contents[bid]) {
    return si.contents[bid].indexOf(unit);
  }

  throw new Error(`unexpected bookId: ${bid}`);
}
/*
 * Get the position of the subunit from the bid2 array.
 * Return -1 if not found,
 *         0 if there is no subunit
 */


function getSubunitId(...urlArray) {
  let bid = getBook(urlArray);
  let {
    unit,
    subunit
  } = getUnitInfo(urlArray);
  let level2 = `${bid}2`;

  if (!subunit) {
    return 0;
  }

  if (si.contents[level2]) {
    return si.contents[level2].indexOf(`/${subunit}`);
  }

  throw new Error(`unexpected bookId: ${level2}`);
}
/*
 * The url will be either:
 * Integration: /t/pid/bid/uid/[xid/] or
 * Standalone:  /bid/uid/[xid/]
 *
 * Return object containing unit and subunit from url
 */


function getUnitInfo(urlArray) {
  //set values for integration
  let uidPos = 3;
  let subunit;

  if (urlArray[0] !== "t") {
    uidPos = 1;
  } //check for subunit in url


  if (urlArray.length === uidPos + 2) {
    subunit = urlArray[uidPos + 1];
  }

  return {
    unit: urlArray[uidPos],
    subunit: subunit
  };
}
/*
 * Return the number of chapters in the book (bid).
 * Subtract one from length because of 'xxx' (fake chapter)
*/


function getNumberOfUnits(bid) {
  if (si.contents[bid]) {
    return si.contents[bid].length - 1;
  }

  throw new Error(`getNumberOfUnits() unexpected bookId: ${bid}`);
}
/*
 * Split url into an array. Strip leading and trailing
 * '/' characters first so we don't get empty elements
 * in the array.
 */


function splitUrl(url) {
  let u = url; //remove leading

  u = url.substr(1); //remove trailing '/' if it exists

  if (u[u.length - 1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}

function getSourceId() {
  return si.sourceId;
}

function getKeyInfo() {
  return {
    sourceId: si.sourceId,
    keyLength: keyLength
  };
}
/*
 * Parse key into page part and paragraph part. The two are
 * still part of the key.
 *
 * - a paraKey = 0 represent no paraKey in argument.
 */


function parseKey(key) {
  const keyInfo = getKeyInfo();
  let keyString = key;
  let paraKey = 0;

  if (typeof keyString === "number") {
    keyString = key.toString(10);
  }

  let decimalPos = keyString.indexOf("."); //if no decimal key doesn't include paragraph id

  if (decimalPos > -1) {
    let decimalPart = keyString.substr(decimalPos + 1); //append 0's if decimal part < 3

    switch (decimalPart.length) {
      case 1:
        decimalPart = `${decimalPart}00`;
        break;

      case 2:
        decimalPart = `${decimalPart}0`;
        break;
    }

    paraKey = parseInt(decimalPart, 10);
  }

  let pageKey = parseInt(keyString.substr(0, keyInfo.keyLength), 10); //console.log("parseKey: %o", {paraKey, pageKey});

  return {
    paraKey,
    pageKey
  };
}
/*
 * Get bid (book id) from url.
 *
 * We could be running in standalone or integration mode. Integration
 * mode is indicated by urlArray[0] == 't'
 *
 * The url is in this format: [t/sid]/bid/uid/suid, where [t/sid]
 * are present only in integration mode
 */


function getBook(urlArray) {
  if (urlArray[0] === "t") {
    return urlArray[2];
  }

  return urlArray[0];
}
/*
  Convert url into key
  returns -1 for non-transcript url

  key format: ssbbuuuxx.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
         xx: subunit Id
        ppp: paragraph number - not positional
*/


function genPageKey(url = location.pathname) {
  let key = {
    sid: si.sourceId,
    bid: 0,
    uid: 0,
    xid: 0
  };
  let parts = splitUrl(url); //make sure we have a valid book

  key.bid = si.bookIds.indexOf(getBook(parts));

  if (key.bid === -1) {
    return -1;
  } //get the unitId of the page, return if invalid


  key.uid = getUnitId(...parts);

  if (key.uid === -1) {
    return -1;
  } //get the subunitId


  key.xid = getSubunitId(...parts);

  if (key.xid === -1) {
    return -1;
  }

  let compositeKey = sprintf("%02s%02s%03s%02s", key.sid, key.bid, key.uid, key.xid);
  let numericKey = parseInt(compositeKey, 10);
  return numericKey;
}
/*
 * genParagraphKey(paragraphId, key: url || pageKey)
 *
 * args:
 *   pid: a string representing a transcript paragraph, starts as "p0"..."pnnn"
 *        - it's converted to number and incremented by 1 then divided by 1000
 *       pid can also be a number so then we just increment it and divide by 1000
 *
 *   key: either a url or pageKey returned from genPageKey(), if key
 *   is a string it is assumed to be a url
 */


function genParagraphKey(pid, key = location.pathname) {
  let numericKey = key;
  let pKey;

  if (typeof pid === "string") {
    pKey = (parseInt(pid.substr(1), 10) + 1) / 1000;
  } else {
    pKey = (pid + 1) / 1000;
  } //if key is a string it represents a url


  if (typeof key === "string") {
    numericKey = genPageKey(key);
  }

  let paragraphKey = numericKey + pKey;
  return paragraphKey;
}
/*
  key format: ssbbuuuxx.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
         xx: subunit Id
        ppp: paragraph number - not positional
*/


function decodeKey(key) {
  let {
    pid,
    pageKey
  } = parseKey(key);
  let pageKeyString = pageKey.toString(10);
  let decodedKey = {
    error: false,
    key: key,
    message: "ok",
    sid: 0,
    bookId: "",
    uid: 0,
    xid: 0,
    pid: pid ? pid - 1 : -1
  }; //error, invalid key length

  if (pageKeyString.length !== keyLength) {
    decodedKey.error = true;
    decodedKey.message = `Integer portion of key should have a length of ${keyLength}, key is: ${pageKeyString}`;
    return decodedKey;
  } //check for valid sourceId


  decodedKey.sid = parseInt(pageKeyString.substr(0, 2), 10);

  if (decodedKey.sid !== si.sourceId) {
    decodedKey.error = true;
    decodedKey.message = `Invalid sourceId: ${decodedKey.sid}, expecting: ${si.sourceId}`;
    return decodedKey;
  }

  let bid = parseInt(pageKeyString.substr(2, 2), 10);
  decodedKey.bookId = si.bookIds[bid];
  decodedKey.uid = parseInt(pageKeyString.substr(4, 3), 10);
  decodedKey.xid = parseInt(pageKeyString.substr(7, 2), 10); //search is off by 1, so decrement keys, watch for side effects
  //decodedKey.uid = decodedKey.uid - 1;
  //decodedKey.xid = decodedKey.xid - 1;
  //console.log("decodedKey: %o", decodedKey);

  return decodedKey;
}
/*
 * Convert page key to url
 */


function getUrl(key, withPrefix = false) {
  let decodedKey = decodeKey(key);
  let unit;
  let subunit;
  let url = "/invalid/key/";

  if (decodedKey.error) {
    return url;
  }

  if (si.contents[decodedKey.bookId]) {
    unit = si.contents[decodedKey.bookId][decodedKey.uid];

    if (decodedKey.xid > 0) {
      subunit = si.contents[`${decodedKey.bookId}2`][decodedKey.xid];
      url = `/${decodedKey.bookId}/${unit}${subunit}/`;
    } else {
      url = `/${decodedKey.bookId}/${unit}/`;
    }

    if (withPrefix) {
      return `${si.prefix}${url}`;
    }
  }

  return url;
}

function getBooks() {
  return si.books;
}
/*
  Describe key in terms of source:book:unit:p
*/


function describeKey(key) {
  let decodedKey = decodeKey(key, false);

  if (decodedKey.error) {
    return {
      key: key,
      error: true,
      source: si.sid
    };
  }

  let info = {
    key: key,
    source: si.sid,
    book: decodedKey.bookId,
    unit: si.contents[decodedKey.bookId][decodedKey.uid],
    subunit: si.contents[`${decodedKey.bookId}2`][decodedKey.xid]
  };

  if (decodedKey.pid > -1) {
    info.pid = `p${decodedKey.pid}`;
  } //console.log("describeKey: %o", info);


  return info;
}

module.exports = {
  getNumberOfUnits: getNumberOfUnits,
  getBooks: getBooks,
  getSourceId: getSourceId,
  getKeyInfo: getKeyInfo,
  parseKey: parseKey,
  getUnitId: getUnitId,
  genPageKey: genPageKey,
  genParagraphKey: genParagraphKey,
  decodeKey: decodeKey,
  getUrl: getUrl,
  describeKey: describeKey
};

/***/ }),

/***/ "../cmi-col/src/js/modules/_config/si.js":
/*!***********************************************!*\
  !*** ../cmi-col/src/js/modules/_config/si.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  sourceId: 17,
  sid: "col",
  prefix: "/t/col",
  books: ["book1", "book2", "book3", "book4", "book5", "acq"],
  bookIds: ["xxx", "book1", "book2", "book3", "book4", "book5", "acq"],
  contents: {
    book1: ["xxx", "message", "foreword", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "chap13", "chap14", "chap15", "chap16", "chap17", "chap18", "chap19", "chap20", "chap21", "final", "appendix", "clarifications"],
    book2: ["xxx", "message", "prelude", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "chap13", "chap14", "chap15", "chap16", "chap17", "chap18", "chap19", "chap20", "chap21", "final", "clarifications"],
    book3: ["xxx", "origin", "prelude", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "chap13", "chap14", "chap15", "chap16", "chap17", "chap18", "chap19", "chap20", "chap21", "final", "clarifications"],
    book4: ["xxx", "origin", "description", "prelude", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "chap13", "chap14", "chap15", "chap16", "chap17", "chap18", "chap19", "chap20", "chap21", "final", "clarifications"],
    book5: ["xxx", "origin", "description", "prelude", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "chap13", "chap14", "chap15", "chap16", "chap17", "chap18", "chap19", "chap20", "chap21", "final", "clarifications"],
    acq: ["xxx", "about", "origin", "description", "amazon"]
  }
};

/***/ }),

/***/ "../cmi-jsb/src/js/modules/_config/key.js":
/*!************************************************!*\
  !*** ../cmi-jsb/src/js/modules/_config/key.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  JSB: Transcript keys
  - first item starts with 1, not 0
  - a numeric value that represents a specific transcript and represents
    a specific logical ordering.

  - The integer part of the key represent a transcript and the decimal part
    a paragraph within the transcript.
  - The paragraphId is increased by 1 and divided by 1000

  key format: ssbuuIqq.ppp
  where: ss: source Id
          b: book Id
         uu: unit Id
          I: quesiton indicator, 0:no questions 1:questions
         qq: question Id
        ppp: paragraph number - not positional

  NOTE: This module is used by code running in the browser and Node so the
        common.js module system is used
*/
//import indexOf from "lodash/indexOf";
const sprintf = __webpack_require__(/*! sprintf-js */ "../cmi-jsb/node_modules/sprintf-js/src/sprintf.js").sprintf; //source id: each source has a unique id
//WOM = 10
//jsb = 11


const sourceId = 11;
const sid = "jsb";
const prefix = "/t/jsb"; //length of pageKey excluding decimal portion

const keyLength = 8;
const books = ["til", "acq"];
const bookIds = ["xxx", ...books];
const acq = ["xxx", "welcome"];
const til = ["xxx", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "chap13", "chap14", "chap15", "chap16", "chap17", "chap18", "chap18"];
const contents = {
  acq: acq,
  til: til
};

function splitUrl(url) {
  let u = url; //remove leading "/"

  u = url.substr(1); //remove trailing '/' if it exists

  if (u[u.length - 1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}
/*
  return the position of unit in the bid array
*/


function getUnitId(bid, unit) {
  if (contents[bid]) {
    return contents[bid].indexOf(unit);
  } else {
    throw new Error(`unexpected bookId: ${bid}`);
  }
}

function getSourceId() {
  return sourceId;
}

function getKeyInfo() {
  return {
    sourceId: sourceId,
    keyLength: keyLength
  };
}
/*
  parse bookmarkId into pageKey and paragraphId
  - pid=0 indicates no paragraph id
*/


function parseKey(key) {
  const keyInfo = getKeyInfo();
  let keyString = key;
  let pid = 0;

  if (typeof keyString === "number") {
    keyString = key.toString(10);
  }

  let decimalPos = keyString.indexOf("."); //if no decimal key doesn't include paragraph id

  if (decimalPos > -1) {
    let decimalPart = keyString.substr(decimalPos + 1); //append 0's if decimal part < 3

    switch (decimalPart.length) {
      case 1:
        decimalPart = `${decimalPart}00`;
        break;

      case 2:
        decimalPart = `${decimalPart}0`;
        break;
    }

    pid = parseInt(decimalPart, 10);
  }

  let pageKey = parseInt(keyString.substr(0, keyInfo.keyLength), 10);
  return {
    pid,
    pageKey
  };
}
/*
  Convert url into key
  returns -1 for non-transcript url

  key format: ssbuuIqq.ppp
  where: ss: source Id
          b: book Id
         uu: unit Id
          I: question indicator, 0:no questions 1:questions
         qq: question Id
        ppp: paragraph number - not positional
*/


function genPageKey(url = location.pathname) {
  let key = {
    sid: sourceId,
    bid: 0,
    uid: 0,
    hasQuestions: 0,
    qid: 0
  };
  let parts = splitUrl(url); //key.bid = indexOf(bookIds, parts[0]);

  key.bid = bookIds.indexOf(parts[2]);

  if (key.bid === -1) {
    return -1;
  }

  key.uid = getUnitId(parts[2], parts[3]);

  if (key.bid === -1) {
    return -1;
  }

  if (parts.length === 5) {
    key.hasQuestions = 1;
    key.qid = parseInt(parts[4].substr(1), 10);
  }

  let compositeKey = sprintf("%02s%01s%02s%1s%02s", key.sid, key.bid, key.uid, key.hasQuestions, key.qid);
  let numericKey = parseInt(compositeKey, 10);
  return numericKey;
}
/* 
  genParagraphKey(paragraphId, key: url || pageKey) 

  args:
    pid: a string representing a transcript paragraph, starts as "p0"..."pnnn"
         - it's converted to number and incremented by 1 then divided by 1000
        pid can also be a number so then we just increment it and divide by 1000

    key: either a url or pageKey returned from genPageKey(), if key
   is a string it is assumed to be a url
*/


function genParagraphKey(pid, key = location.pathname) {
  let numericKey = key;
  let pKey;

  if (typeof pid === "string") {
    pKey = (parseInt(pid.substr(1), 10) + 1) / 1000;
  } else {
    pKey = (pid + 1) / 1000;
  } //if key is a string it represents a url


  if (typeof key === "string") {
    numericKey = genPageKey(key);
  }

  let paragraphKey = numericKey + pKey;
  return paragraphKey;
}
/*
  key format: ssbuuIqq.ppp
  where: ss: source Id
          b: book Id
         uu: unit Id
          I: question indicator, 0:no questions 1:questions
         qq: question Id
        ppp: paragraph number - not positional
*/


function decodeKey(key) {
  let {
    pid,
    pageKey
  } = parseKey(key);
  let pageKeyString = pageKey.toString(10);
  let decodedKey = {
    error: 0,
    message: "ok",
    sid: sourceId,
    bookId: "",
    uid: 0,
    hasQuestions: false,
    qid: 0,
    pid: pid - 1
  }; //error, invalid key length

  if (pageKeyString.length !== keyLength) {
    decodedKey.error = true;
    decodedKey.message = `Integer portion of key should have a length of ${keyLength}, key is: ${pageKeyString}`;
    return decodedKey;
  }

  let bid = parseInt(pageKeyString.substr(2, 1), 10);
  decodedKey.bookId = bookIds[bid]; //substract 1 from key value to get index

  decodedKey.uid = parseInt(pageKeyString.substr(3, 2), 10) - 1;
  decodedKey.hasQuestions = pageKeyString.substr(5, 1) === "1"; //subtract 1 from key value to get index

  decodedKey.qid = parseInt(pageKeyString.substr(6, 2), 10) - 1;
  return decodedKey;
}

function getBooks() {
  return books;
}
/*
  Return the number of chapters in the book (bid). 
  Subtract one from length because of 'xxx' (fake chapter)
*/


function getNumberOfUnits(bid) {
  if (contents[bid]) {
    return contents[bid].length - 1;
  } else {
    throw new Error(`getNumberOfUnits() unexpected bookId: ${bid}`);
  }
}
/*
 * Convert page key to url
 */


function getUrl(key, withPrefix = false) {
  let decodedKey = decodeKey(key);
  let unit = "invalid";

  if (decodedKey.error) {
    return "/invalid/key/";
  }

  if (contents[decodedKey.bookId]) {
    unit = contents[decodedKey.bookId][decodedKey.uid + 1];
  }

  if (withPrefix) {
    return `${prefix}/${decodedKey.bookId}/${unit}/`;
  }

  return `/${decodedKey.bookId}/${unit}/`;
}
/*
  Describe key in terms of source:book:unit:p
*/


function describeKey(key) {
  let decodedKey = decodeKey(key, false);

  if (decodedKey.error) {
    return {
      key: key,
      error: true,
      source: sid
    };
  }

  let info = {
    key: key,
    source: sid,
    book: decodedKey.bookId,
    unit: contents[decodedKey.bookId][decodedKey.uid + 1]
  };

  if (decodedKey.pid > -1) {
    info.pid = `p${decodedKey.pid}`;
  }

  return info;
}

module.exports = {
  getNumberOfUnits: getNumberOfUnits,
  getUrl: getUrl,
  getBooks: getBooks,
  getSourceId: getSourceId,
  getKeyInfo: getKeyInfo,
  parseKey: parseKey,
  genPageKey: genPageKey,
  genParagraphKey: genParagraphKey,
  decodeKey: decodeKey,
  describeKey: describeKey
};

/***/ }),

/***/ "../cmi-oe/src/js/modules/_config/key.js":
/*!***********************************************!*\
  !*** ../cmi-oe/src/js/modules/_config/key.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  ACIM-oe: Transcript keys
  - first item starts with 1, not 0
  - a numeric value that represents a specific transcript and represents
    a specific logical ordering.

  - The integer part of the key represent a transcript and the decimal part
    a paragraph within the transcript.
  - The paragraphId is increased by 1 and divided by 1000

  key format: ssbuuuu.ppp
  where: ss: source Id
          b: book Id
       uuuu: unit Id
        ppp: paragraph number - not positional

  NOTE: This module is used by code running in the browser and Node so the
        common.js module system is used
*/
//import indexOf from "lodash/indexOf";
const sprintf = __webpack_require__(/*! sprintf-js */ "../cmi-oe/node_modules/sprintf-js/src/sprintf.js").sprintf; //length of pageKey excluding decimal portion


const keyLength = 7; //Source Id, this must be a unique two digit number

const sourceId = 15;
const sid = "acimoe";
const prefix = "/t/acimoe"; //list the books, these correspond to collection names defined in _config.yml
// * order according to how search results and bookmarks should appear

const books = ["text", "workbook", "manual", "acq"];
const bookIds = ["xxx", ...books]; //list the chapters or parts that make up each book, set the first item to 'xxx'

const acq = ["xxx", "welcome", "acim", "cims", "formats", "contact", "timers"]; //removed the "xxx" first element of the array

const text = ["xxx", "forward", "intro", "chap0101", "chap0102", "chap0201", "chap0202", "chap0203", "chap0204", "chap0205", "chap0206", "chap0301", "chap0302", "chap0303", "chap0304", "chap0305", "chap0306", "chap0307", "chap0308", "chap0309", "chap0401", "chap0402", "chap0403", "chap0404", "chap0405", "chap0406", "chap0407", "chap0408", "chap0409", "chap0501", "chap0502", "chap0503", "chap0504", "chap0505", "chap0506", "chap0507", "chap0508", "chap0509", "chap0601", "chap0602", "chap0603", "chap0604", "chap0605", "chap0701", "chap0702", "chap0703", "chap0704", "chap0705", "chap0706", "chap0707", "chap0708", "chap0709", "chap0710", "chap0711", "chap0712", "chap0801", "chap0802", "chap0803", "chap0804", "chap0805", "chap0806", "chap0807", "chap0808", "chap0809", "chap0810", "chap0811", "chap0901", "chap0902", "chap0903", "chap0904", "chap0905", "chap0906", "chap0907", "chap0908", "chap0909", "chap0910", "chap0911", "chap1001", "chap1002", "chap1003", "chap1004", "chap1005", "chap1006", "chap1007", "chap1008", "chap1101", "chap1102", "chap1103", "chap1104", "chap1105", "chap1106", "chap1107", "chap1108", "chap1109", "chap1110", "chap1201", "chap1202", "chap1203", "chap1204", "chap1205", "chap1206", "chap1207", "chap1301", "chap1302", "chap1303", "chap1304", "chap1305", "chap1306", "chap1307", "chap1308", "chap1309", "chap1401", "chap1402", "chap1403", "chap1404", "chap1405", "chap1406", "chap1407", "chap1501", "chap1502", "chap1503", "chap1504", "chap1505", "chap1506", "chap1507", "chap1508", "chap1509", "chap1510", "chap1511", "chap1601", "chap1602", "chap1603", "chap1604", "chap1605", "chap1606", "chap1607", "chap1608", "chap1701", "chap1702", "chap1703", "chap1704", "chap1705", "chap1706", "chap1707", "chap1708", "chap1709", "chap1801", "chap1802", "chap1803", "chap1804", "chap1805", "chap1806", "chap1807", "chap1808", "chap1809", "chap1810", "chap1811", "chap1901", "chap1902", "chap1903", "chap1904", "chap1905", "chap2001", "chap2002", "chap2003", "chap2004", "chap2005", "chap2006", "chap2007", "chap2008", "chap2009", "chap2101", "chap2102", "chap2103", "chap2104", "chap2105", "chap2106", "chap2107", "chap2108", "chap2109", "chap2201", "chap2202", "chap2203", "chap2204", "chap2205", "chap2206", "chap2207", "chap2301", "chap2302", "chap2303", "chap2304", "chap2305", "chap2401", "chap2402", "chap2403", "chap2404", "chap2405", "chap2406", "chap2407", "chap2408", "chap2501", "chap2502", "chap2503", "chap2504", "chap2505", "chap2506", "chap2507", "chap2508", "chap2509", "chap2510", "chap2601", "chap2602", "chap2603", "chap2604", "chap2605", "chap2606", "chap2607", "chap2608", "chap2609", "chap2610", "chap2611", "chap2701", "chap2702", "chap2703", "chap2704", "chap2705", "chap2706", "chap2707", "chap2708", "chap2709", "chap2801", "chap2802", "chap2803", "chap2804", "chap2805", "chap2806", "chap2807", "chap2808", "chap2901", "chap2902", "chap2903", "chap2904", "chap2905", "chap2906", "chap2907", "chap2908", "chap2909", "chap2910", "chap3001", "chap3002", "chap3003", "chap3004", "chap3005", "chap3006", "chap3007", "chap3008", "chap3009", "chap3101", "chap3102", "chap3103", "chap3104", "chap3105", "chap3106", "chap3107", "chap3108"];
const workbook = ["xxx", "introp1", "l001", "l002", "l003", "l004", "l005", "l006", "l007", "l008", "l009", "l010", "l011", "l012", "l013", "l014", "l015", "l016", "l017", "l018", "l019", "l020", "l021", "l022", "l023", "l024", "l025", "l026", "l027", "l028", "l029", "l030", "l031", "l032", "l033", "l034", "l035", "l036", "l037", "l038", "l039", "l040", "l041", "l042", "l043", "l044", "l045", "l046", "l047", "l048", "l049", "l050", "review1", "l051", "l052", "l053", "l054", "l055", "l056", "l057", "l058", "l059", "l060", "l061", "l062", "l063", "l064", "l065", "l066", "l067", "l068", "l069", "l070", "l071", "l072", "l073", "l074", "l075", "l076", "l077", "l078", "l079", "l080", "review2", "l081", "l082", "l083", "l084", "l085", "l086", "l087", "l088", "l089", "l090", "l091", "l092", "l093", "l094", "l095", "l096", "l097", "l098", "l099", "l100", "l101", "l102", "l103", "l104", "l105", "l106", "l107", "l108", "l109", "l110", "review3", "l111", "l112", "l113", "l114", "l115", "l116", "l117", "l118", "l119", "l120", "l121", "l122", "l123", "l124", "l125", "l126", "l127", "l128", "l129", "l130", "l131", "l132", "l133", "l134", "l135", "l136", "l137", "l138", "l139", "l140", "review4", "l141", "l142", "l143", "l144", "l145", "l146", "l147", "l148", "l149", "l150", "l151", "l152", "l153", "l154", "l155", "l156", "l157", "l158", "l159", "l160", "l161", "l162", "l163", "l164", "l165", "l166", "l167", "l168", "l169", "l170", "review5", "l171", "l172", "l173", "l174", "l175", "l176", "l177", "l178", "l179", "l180", "intro181", "l181", "l182", "l183", "l184", "l185", "l186", "l187", "l188", "l189", "l190", "l191", "l192", "l193", "l194", "l195", "l196", "l197", "l198", "l199", "l200", "review6", "l201", "l202", "l203", "l204", "l205", "l206", "l207", "l208", "l209", "l210", "l211", "l212", "l213", "l214", "l215", "l216", "l217", "l218", "l219", "l220", "introp2", "forgiveness", "l221", "l222", "l223", "l224", "l225", "l226", "l227", "l228", "l229", "l230", "salvation", "l231", "l232", "l233", "l234", "l235", "l236", "l237", "l238", "l239", "l240", "world", "l241", "l242", "l243", "l244", "l245", "l246", "l247", "l248", "l249", "l250", "sin", "l251", "l252", "l253", "l254", "l255", "l256", "l257", "l258", "l259", "l260", "body", "l261", "l262", "l263", "l264", "l265", "l266", "l267", "l268", "l269", "l270", "christ", "l271", "l272", "l273", "l274", "l275", "l276", "l277", "l278", "l279", "l280", "holyspirit", "l281", "l282", "l283", "l284", "l285", "l286", "l287", "l288", "l289", "l290", "realworld", "l291", "l292", "l293", "l294", "l295", "l296", "l297", "l298", "l299", "l300", "secondcoming", "l301", "l302", "l303", "l304", "l305", "l306", "l307", "l308", "l309", "l310", "lastjudgement", "l311", "l312", "l313", "l314", "l315", "l316", "l317", "l318", "l319", "l320", "creation", "l321", "l322", "l323", "l324", "l325", "l326", "l327", "l328", "l329", "l330", "ego", "l331", "l332", "l333", "l334", "l335", "l336", "l337", "l338", "l339", "l340", "miracle", "l341", "l342", "l343", "l344", "l345", "l346", "l347", "l348", "l349", "l350", "whatami", "l351", "l352", "l353", "l354", "l355", "l356", "l357", "l358", "l359", "l360", "final", "l361", "l362", "l363", "l364", "l365", "epilog"];
const manual = ["xxx", "intro", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "chap13", "chap14", "chap15", "chap16", "chap17", "chap18", "chap19", "chap20", "chap21", "chap22", "chap23", "chap24", "chap25", "chap26", "chap27", "chap28", "chap29"];
const contents = {
  acq: acq,
  text: text,
  workbook: workbook,
  manual: manual
};
/*
  return the position of unit in the bid array to calculate
  the pageKey.
    arg: section is passed when bid = text
*/

function getUnitId(t, source, bid, unit, section) {
  if (section) {
    unit = section;
  }

  if (contents[bid]) {
    return contents[bid].indexOf(unit);
  } else {
    throw new Error(`unexpected bookId: ${bid}`);
  }
}
/*
  Return the number of chapters in the book (bid).
  Subtract one from length because of 'xxx' (fake chapter)
*/


function getNumberOfUnits(bid) {
  if (contents[bid]) {
    return contents[bid].length - 1;
  } else {
    throw new Error(`getNumberOfUnits() unexpected bookId: ${bid}`);
  }
}

function splitUrl(url) {
  let u = url; //remove leading

  u = url.substr(1); //remove trailing '/' if it exists

  if (u[u.length - 1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}

function getSourceId() {
  return sourceId;
}

function getKeyInfo() {
  return {
    sourceId: sourceId,
    keyLength: keyLength
  };
}
/*
  parse bookmarkId into pageKey and paragraphId
  - pid=0 indicates no paragraph id
*/


function parseKey(key) {
  const keyInfo = getKeyInfo();
  let keyString = key;
  let pid = 0;

  if (typeof keyString === "number") {
    keyString = key.toString(10);
  }

  let decimalPos = keyString.indexOf("."); //if no decimal key doesn't include paragraph id

  if (decimalPos > -1) {
    let decimalPart = keyString.substr(decimalPos + 1); //append 0's if decimal part < 3

    switch (decimalPart.length) {
      case 1:
        decimalPart = `${decimalPart}00`;
        break;

      case 2:
        decimalPart = `${decimalPart}0`;
        break;
    }

    pid = parseInt(decimalPart, 10);
  }

  let pageKey = parseInt(keyString.substr(0, keyInfo.keyLength), 10);
  return {
    pid,
    pageKey
  };
}
/*
  Convert url into key
  returns -1 for non-transcript url

  key format: ssbuuIqq.ppp
  where: ss: source Id
          b: book Id
       uuuu: unit Id
        ppp: paragraph number - not positional
*/


function genPageKey(url = location.pathname) {
  let key = {
    sid: sourceId,
    bid: 0,
    uid: 0
  };
  let parts = splitUrl(url); //make sure we have a valid book

  key.bid = bookIds.indexOf(parts[2]);

  if (key.bid === -1) {
    return -1;
  } //get the unitId of the page, return if invalid


  key.uid = getUnitId(...parts);

  if (key.uid === -1) {
    return -1;
  }

  let compositeKey = sprintf("%02s%01s%04s", key.sid, key.bid, key.uid);
  let numericKey = parseInt(compositeKey, 10);
  return numericKey;
}
/*
  genParagraphKey(paragraphId, key: url || pageKey)

  args:
    pid: a string representing a transcript paragraph, starts as "p0"..."pnnn"
         - it's converted to number and incremented by 1 then divided by 1000
        pid can also be a number so then we just increment it and divide by 1000

    key: either a url or pageKey returned from genPageKey(), if key
   is a string it is assumed to be a url
*/


function genParagraphKey(pid, key = location.pathname) {
  let numericKey = key;
  let pKey;

  if (typeof pid === "string") {
    pKey = (parseInt(pid.substr(1), 10) + 1) / 1000;
  } else {
    pKey = (pid + 1) / 1000;
  } //if key is a string it represents a url


  if (typeof key === "string") {
    numericKey = genPageKey(key);
  }

  let paragraphKey = numericKey + pKey;
  return paragraphKey;
}
/*
  key format: ssbuuuu.ppp
  where: ss: source Id
          b: book Id
       uuuu: unit Id
        ppp: paragraph number - not positional
*/


function decodeKey(key) {
  let {
    pid,
    pageKey
  } = parseKey(key);
  let pageKeyString = pageKey.toString(10);
  let decodedKey = {
    error: false,
    message: "ok",
    sid: 0,
    bookId: "",
    uid: 0,
    pid: pid - 1
  }; //error, invalid key length

  if (pageKeyString.length !== keyLength) {
    decodedKey.error = true;
    decodedKey.message = `Integer portion of key should have a length of ${keyLength}, key is: ${pageKeyString}`;
    return decodedKey;
  } //check for valid sourceId


  decodedKey.sid = parseInt(pageKeyString.substr(0, 2), 10);

  if (decodedKey.sid !== sourceId) {
    decodedKey.error = true;
    decodedKey.message = `Invalid sourceId: ${decodedKey.sid}, expecting: ${sourceId}`;
    return decodedKey;
  }

  let bid = parseInt(pageKeyString.substr(2, 1), 10);
  decodedKey.bookId = bookIds[bid]; //subtract 1 from key value to get index

  decodedKey.uid = parseInt(pageKeyString.substr(3, 4), 10);
  return decodedKey;
}
/*
 * Convert page key to url
 */


function getUrl(key, withPrefix = false) {
  let decodedKey = decodeKey(key);
  let unit = "invalid";

  if (decodedKey.error) {
    return "/invalid/key/";
  }

  if (contents[decodedKey.bookId]) {
    unit = contents[decodedKey.bookId][decodedKey.uid];

    if (decodedKey.bookId === "text") {
      let chapter = unit.substr(4, 2);
      unit = `${chapter}/${unit}`;
    }
  }

  if (withPrefix) {
    return `${prefix}/${decodedKey.bookId}/${unit}/`;
  }

  return `/${decodedKey.bookId}/${unit}/`;
}
/*
function getUrl(key) {
  let decodedKey = decodeKey(key);
  let unit = "invalid";
  let chapter;

  if (decodedKey.error) {
    return "";
  }

  switch(decodedKey.bookId) {
    case "text":
      unit = text[decodedKey.uid];
      chapter = unit.substr(4,2);
      unit = `${chapter}/${unit}`;
      break;
    case "workbook":
      unit = workbook[decodedKey.uid];
      break;
    case "manual":
      unit = manual[decodedKey.uid];
      break;
    case "preface":
      unit = preface[decodedKey.uid];
      break;
    case "acq":
      unit = acq[decodedKey.uid];
      break;
  }

  return `/${decodedKey.bookId}/${unit}/`;
}
*/


function getBooks() {
  return books;
}
/*
  Describe key in terms of source:book:unit:p
*/


function describeKey(key) {
  let decodedKey = decodeKey(key, false);

  if (decodedKey.error) {
    return {
      key: key,
      error: true,
      source: sid
    };
  }

  let info = {
    key: key,
    source: sid,
    book: decodedKey.bookId,
    unit: contents[decodedKey.bookId][decodedKey.uid]
  };

  if (decodedKey.pid > -1) {
    info.pid = `p${decodedKey.pid}`;
  }

  return info;
}

module.exports = {
  getNumberOfUnits: getNumberOfUnits,
  getBooks: getBooks,
  getSourceId: getSourceId,
  getKeyInfo: getKeyInfo,
  parseKey: parseKey,
  getUnitId: getUnitId,
  genPageKey: genPageKey,
  genParagraphKey: genParagraphKey,
  decodeKey: decodeKey,
  getUrl: getUrl,
  describeKey: describeKey
};

/***/ }),

/***/ "../cmi-pwom/src/js/modules/_config/key.js":
/*!*************************************************!*\
  !*** ../cmi-pwom/src/js/modules/_config/key.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  Transcript keys
  - a numeric value that represents a specific transcript and represents
    a specific logical ordering.
  - first item starts with 1

  - The integer part of the key represent a transcript and the decimal part
    a paragraph within the transcript.
  - The paragraphId is increased by 1 and divided by 1000

  key format: ssbbuuuxx.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
         xx: subunit
        ppp: paragraph number - not positional

  Limits:
    The Library of Christ Mind Teachings is limited to
       99 Sources
       99 Books per source
      999 Units (chapters) per book
       99 Unique Subunits per book
      999 Paragraphs per unit or subunit

  Example: url's
      [/t/sourceId]/bookId/unitId/subunitId/
      - /t/sourceId is omitted in standalone mode

  NOTE: This module is used by code running in the browser and Node so the
        common.js module system is used
*/
const si = __webpack_require__(/*! ./si */ "../cmi-pwom/src/js/modules/_config/si.js");

const sprintf = __webpack_require__(/*! sprintf-js */ "../cmi-pwom/node_modules/sprintf-js/src/sprintf.js").sprintf;

const keyLength = 9; //length of pageKey excluding decimal portion

/*
 * The argument is the page url. Use the book id (bid)
 * to find the position of the page in the contents array.
 */

function getUnitId(...urlArray) {
  let bid = getBook(urlArray);
  let {
    unit,
    subunit
  } = getUnitInfo(urlArray);

  if (si.contents[bid]) {
    return si.contents[bid].indexOf(unit);
  }

  throw new Error(`unexpected bookId: ${bid}`);
}
/*
 * Get the position of the subunit from the bid2 array.
 * Return -1 if not found,
 *         0 if there is no subunit
 */


function getSubunitId(...urlArray) {
  let bid = getBook(urlArray);
  let {
    unit,
    subunit
  } = getUnitInfo(urlArray);
  let level2 = `${bid}2`;

  if (!subunit) {
    return 0;
  }

  if (si.contents[level2]) {
    return si.contents[level2].indexOf(`/${subunit}`);
  }

  throw new Error(`unexpected bookId: ${level2}`);
}
/*
 * The url will be either:
 * Integration: /t/pid/bid/uid/[xid/] or
 * Standalone:  /bid/uid/[xid/]
 *
 * Return object containing unit and subunit from url
 */


function getUnitInfo(urlArray) {
  //set values for integration
  let uidPos = 3;
  let subunit;

  if (urlArray[0] !== "t") {
    uidPos = 1;
  } //check for subunit in url


  if (urlArray.length === uidPos + 2) {
    subunit = urlArray[uidPos + 1];
  }

  return {
    unit: urlArray[uidPos],
    subunit: subunit
  };
}
/*
 * Return the number of chapters in the book (bid).
 * Subtract one from length because of 'xxx' (fake chapter)
*/


function getNumberOfUnits(bid) {
  if (si.contents[bid]) {
    return si.contents[bid].length - 1;
  }

  throw new Error(`getNumberOfUnits() unexpected bookId: ${bid}`);
}
/*
 * Split url into an array. Strip leading and trailing
 * '/' characters first so we don't get empty elements
 * in the array.
 */


function splitUrl(url) {
  let u = url; //remove leading

  u = url.substr(1); //remove trailing '/' if it exists

  if (u[u.length - 1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}

function getSourceId() {
  return si.sourceId;
}

function getKeyInfo() {
  return {
    sourceId: si.sourceId,
    keyLength: keyLength
  };
}
/*
 * Parse key into page part and paragraph part. The two are
 * still part of the key.
 *
 * - a paraKey = 0 represent no paraKey in argument.
 */


function parseKey(key) {
  const keyInfo = getKeyInfo();
  let keyString = key;
  let paraKey = 0;

  if (typeof keyString === "number") {
    keyString = key.toString(10);
  }

  let decimalPos = keyString.indexOf("."); //if no decimal key doesn't include paragraph id

  if (decimalPos > -1) {
    let decimalPart = keyString.substr(decimalPos + 1); //append 0's if decimal part < 3

    switch (decimalPart.length) {
      case 1:
        decimalPart = `${decimalPart}00`;
        break;

      case 2:
        decimalPart = `${decimalPart}0`;
        break;
    }

    paraKey = parseInt(decimalPart, 10);
  }

  let pageKey = parseInt(keyString.substr(0, keyInfo.keyLength), 10); //console.log("parseKey: %o", {paraKey, pageKey});

  return {
    paraKey,
    pageKey
  };
}
/*
 * Get bid (book id) from url.
 *
 * We could be running in standalone or integration mode. Integration
 * mode is indicated by urlArray[0] == 't'
 *
 * The url is in this format: [t/sid]/bid/uid/suid, where [t/sid]
 * are present only in integration mode
 */


function getBook(urlArray) {
  if (urlArray[0] === "t") {
    return urlArray[2];
  }

  return urlArray[0];
}
/*
  Convert url into key
  returns -1 for non-transcript url

  key format: ssbbuuuxx.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
         xx: subunit Id
        ppp: paragraph number - not positional
*/


function genPageKey(url = location.pathname) {
  let key = {
    sid: si.sourceId,
    bid: 0,
    uid: 0,
    xid: 0
  };
  let parts = splitUrl(url); //make sure we have a valid book

  key.bid = si.bookIds.indexOf(getBook(parts));

  if (key.bid === -1) {
    return -1;
  } //get the unitId of the page, return if invalid


  key.uid = getUnitId(...parts);

  if (key.uid === -1) {
    return -1;
  } //get the subunitId


  key.xid = getSubunitId(...parts);

  if (key.xid === -1) {
    return -1;
  }

  let compositeKey = sprintf("%02s%02s%03s%02s", key.sid, key.bid, key.uid, key.xid);
  let numericKey = parseInt(compositeKey, 10);
  return numericKey;
}
/*
 * genParagraphKey(paragraphId, key: url || pageKey)
 *
 * args:
 *   pid: a string representing a transcript paragraph, starts as "p0"..."pnnn"
 *        - it's converted to number and incremented by 1 then divided by 1000
 *       pid can also be a number so then we just increment it and divide by 1000
 *
 *   key: either a url or pageKey returned from genPageKey(), if key
 *   is a string it is assumed to be a url
 */


function genParagraphKey(pid, key = location.pathname) {
  let numericKey = key;
  let pKey;

  if (typeof pid === "string") {
    pKey = (parseInt(pid.substr(1), 10) + 1) / 1000;
  } else {
    pKey = (pid + 1) / 1000;
  } //if key is a string it represents a url


  if (typeof key === "string") {
    numericKey = genPageKey(key);
  }

  let paragraphKey = numericKey + pKey;
  return paragraphKey;
}
/*
  key format: ssbbuuuxx.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
         xx: subunit Id
        ppp: paragraph number - not positional
*/


function decodeKey(key) {
  let {
    pid,
    pageKey
  } = parseKey(key);
  let pageKeyString = pageKey.toString(10);
  let decodedKey = {
    error: false,
    key: key,
    message: "ok",
    sid: 0,
    bookId: "",
    uid: 0,
    xid: 0,
    pid: pid ? pid - 1 : -1
  }; //error, invalid key length

  if (pageKeyString.length !== keyLength) {
    decodedKey.error = true;
    decodedKey.message = `Integer portion of key should have a length of ${keyLength}, key is: ${pageKeyString}`;
    return decodedKey;
  } //check for valid sourceId


  decodedKey.sid = parseInt(pageKeyString.substr(0, 2), 10);

  if (decodedKey.sid !== si.sourceId) {
    decodedKey.error = true;
    decodedKey.message = `Invalid sourceId: ${decodedKey.sid}, expecting: ${si.sourceId}`;
    return decodedKey;
  }

  let bid = parseInt(pageKeyString.substr(2, 2), 10);
  decodedKey.bookId = si.bookIds[bid];
  decodedKey.uid = parseInt(pageKeyString.substr(4, 3), 10);
  decodedKey.xid = parseInt(pageKeyString.substr(7, 2), 10); //search is off by 1, so decrement keys, watch for side effects
  //decodedKey.uid = decodedKey.uid - 1;
  //decodedKey.xid = decodedKey.xid - 1;
  //console.log("decodedKey: %o", decodedKey);

  return decodedKey;
}
/*
 * Convert page key to url
 */


function getUrl(key, withPrefix = false) {
  let decodedKey = decodeKey(key);
  let unit;
  let subunit;
  let url = "/invalid/key/";

  if (decodedKey.error) {
    return url;
  }

  if (si.contents[decodedKey.bookId]) {
    unit = si.contents[decodedKey.bookId][decodedKey.uid];

    if (decodedKey.xid > 0) {
      subunit = si.contents[`${decodedKey.bookId}2`][decodedKey.xid];
      url = `/${decodedKey.bookId}/${unit}${subunit}/`;
    } else {
      url = `/${decodedKey.bookId}/${unit}/`;
    }

    if (withPrefix) {
      return `${si.prefix}${url}`;
    }
  }

  return url;
}

function getBooks() {
  return si.books;
}
/*
  Describe key in terms of source:book:unit:p
*/


function describeKey(key) {
  let decodedKey = decodeKey(key, false);

  if (decodedKey.error) {
    return {
      key: key,
      error: true,
      source: si.sid
    };
  }

  let info = {
    key: key,
    source: si.sid,
    book: decodedKey.bookId,
    unit: si.contents[decodedKey.bookId][decodedKey.uid],
    subunit: si.contents[`${decodedKey.bookId}2`][decodedKey.xid]
  };

  if (decodedKey.pid > -1) {
    info.pid = `p${decodedKey.pid}`;
  } //console.log("describeKey: %o", info);


  return info;
}

module.exports = {
  getNumberOfUnits: getNumberOfUnits,
  getBooks: getBooks,
  getSourceId: getSourceId,
  getKeyInfo: getKeyInfo,
  parseKey: parseKey,
  getUnitId: getUnitId,
  genPageKey: genPageKey,
  genParagraphKey: genParagraphKey,
  decodeKey: decodeKey,
  getUrl: getUrl,
  describeKey: describeKey
};

/***/ }),

/***/ "../cmi-pwom/src/js/modules/_config/si.js":
/*!************************************************!*\
  !*** ../cmi-pwom/src/js/modules/_config/si.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  sourceId: 16,
  sid: "pwom",
  prefix: "/t/pwom",
  books: ["lj", "wos", "woh", "wot", "wok", "early", "acq"],
  bookIds: ["xxx", "lj", "wos", "woh", "wot", "wok", "early", "acq"],
  contents: {
    lj: ["xxx", "acknow", "reader", "forwd", "intr", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "eplg"],
    wos: ["xxx", "intr", "chap01", "chap02", "chap03", "chap04", "aftwrd", "eplg", "prayer"],
    woh: ["xxx", "preface", "l01", "l02", "l03", "l04", "l05", "l06", "l07", "l08", "l09", "l10", "l11", "l12"],
    woh2: ["xxx", "/l01qa", "/l02qa", "/l06qa", "/l07qa", "/l08qa", "/l09qa", "/l10qa", "/l11qa", "/l12qa"],
    wot: ["xxx", "preface", "l01", "l02", "l03", "l04", "l05", "l06", "l07", "l08", "l09", "l10", "l11", "l12"],
    wot2: ["xxx", "/l01qa", "/l06qa", "/l07qa", "/l09qa", "/l11qa"],
    wok: ["xxx", "preface", "l01", "l02", "l03", "l04", "l05", "l06", "l07", "l08", "l09", "l10", "l11"],
    wok2: ["xxx", "/l02qa", "/l03qa", "/l04qa", "/l06qa", "/l10qa"],
    early: ["xxx", "intr", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10"],
    early2: ["xxx", "/chap01qa", "/chap02qa", "/chap03qa", "/chap08qa", "/chap09qa"],
    acq: ["xxx", "path", "advice", "video", "contact"]
  }
};

/***/ }),

/***/ "../cmi-raj/src/js/modules/_config/key.js":
/*!************************************************!*\
  !*** ../cmi-raj/src/js/modules/_config/key.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  RAJ: Transcript keys
  - first item starts with 1, not 0
  - a numeric value that represents a specific transcript and represents
    a specific logical ordering.

  - The integer part of the key represent a transcript and the decimal part
    a paragraph within the transcript.
  - The paragraphId is increased by 1 and divided by 1000

  key format: ssbbuuu.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
        ppp: paragraph number - not positional

  NOTE: This module is used by code running in the browser and Node so the
        common.js module system is used
*/
//import indexOf from "lodash/indexOf";
const sprintf = __webpack_require__(/*! sprintf-js */ "../cmi-raj/node_modules/sprintf-js/src/sprintf.js").sprintf; //source id: each source has a unique id
//WOM = 10
//JSB = 11
//ACIM = 12
//RAJ = 13


const sourceId = 13;
const sid = "raj";
const prefix = "/t/raj"; //length of pageKey excluding decimal portion

const keyLength = 7; //Raj material books (bid)

const books = ["yaa", "grad", "sg2002", "sg2003", "sg2004", "sg2005", "sg2006", "sg2007", "sg2008", "sg2009", "sg2010", "sg2011", "sg2012", "sg2013", "sg2014", "sg2015", "sg2016", "sg2017", "sg2018", "acq"];
const bookIds = ["xxx", ...books];
const acq = ["xxx", "welcome", "raj", "download", "web"];
const grad = ["xxx", "g000002", "g000003", "g010491", "g010591", "g011491", "g011591", "g011691", "g011891", "g012091", "g012591", "g012791", "g020291", "g020591", "g020691", "g021291", "g021391", "g021491", "g022091", "g022591", "g030291", "g030891", "g031491", "g031991", "g032091", "g032191", "g032291", "g032591", "g032991"];
const sg2002 = ["xxx", "061202", "073102", "080702", "081402", "082802", "090402", "091102", "091802", "092502", "100202", "101002", "101702", "102402", "103102", "110702", "112102", "120502", "121202", "121902"];
const sg2003 = ["xxx", "010203", "010903", "011603", "012303", "020603", "021303", "022003", "022703", "030603", "031303", "032003", "032703", "040303", "041003", "042403", "050103", "051103", "051803", "052503", "060103", "060803", "061503", "062203", "062903", "070603", "071303", "072003", "072703", "080303", "081003", "081703", "082403", "083103", "090703", "091403", "092103", "092803", "101203", "101903", "102603", "110203", "110903", "111603", "112303", "120703", "121403", "122103"];
const sg2004 = ["xxx", "011104", "011804", "012504", "020104", "020804", "021504", "022204", "030704", "031404", "032804", "040404", "041104", "041804", "042504", "050204", "050904", "051604", "052304", "053004", "061304", "062004", "062704", "071104", "071804", "072504", "080104", "080804", "081504", "082204", "090504", "091204", "091904", "092604", "100304", "101004", "101704", "102404", "110704", "112104", "112804", "120504", "121204", "121904"];
const sg2005 = ["xxx", "010205", "011605", "012305", "013005", "021305", "022005", "030605", "031305", "032705", "040305", "041005", "041705", "042405", "050105", "050805", "052205", "060505", "061205", "061905", "070305", "071005", "071705", "072405", "080705", "081405", "082105", "082805", "090405", "091105", "091805", "100205", "100905", "101605", "102305", "110605", "111305", "112005", "120405", "121105", "121805"];
const sg2006 = ["xxx", "010806", "011506", "012206", "012906", "021206", "022606", "030406", "031106", "031906", "040106", "041506", "042906", "050606", "052006", "052706", "060306", "061006", "061806", "062406", "070106", "071506", "073006", "080506", "081206", "082006", "090206", "090906", "092306", "100706", "101406", "102106", "102806", "111106", "111806", "120206"];
const sg2007 = ["xxx", "081807", "082507", "090907", "091607", "092207", "100607", "101407", "102707", "110307", "111007", "111807", "120807", "121607"];
const sg2008 = ["xxx", "012008", "012708", "021008", "021708", "022408", "030208", "030908", "032508", "033008", "040608", "041308", "042008", "050408", "051808", "052508", "060108", "060808", "061508", "062208", "070608", "071308", "072708", "081708", "083108", "090708", "091408", "092108", "100508", "101908", "102608", "110208", "110908", "112308"];
const sg2009 = ["xxx", "010309", "011009", "011709", "012409", "020709", "022809", "031409", "032809", "040409", "041209", "042509", "050909", "052409", "053109", "060709", "061309", "062009", "071109", "071809", "072509", "080109", "080809", "082909", "090509", "091209", "091909", "092709", "101009", "102409", "103109", "111409", "112209", "112809", "120509", "121909"];
const sg2010 = ["xxx", "010210", "011610", "013010", "020610", "021310", "030610", "032010", "032710", "040310", "041010", "050110", "051510", "052910", "060510", "061210", "061910", "070310", "071010", "071710", "072410", "080710", "082810", "090410", "091110", "092510", "100210", "100910", "101610", "102310", "110610", "111310", "112010", "112710", "120410", "121810"];
const sg2011 = ["xxx", "010111", "010811", "011511", "012211", "020511", "021611", "021911", "031211", "032011", "032611", "040311", "040911", "041611", "042311", "043011", "050711", "051411", "052211", "060411", "061211", "061811", "062611", "070911", "071611", "073011", "080611", "082011", "082711", "090311", "091711", "092411", "100111", "101511", "102311", "110511", "111311", "112611", "120411", "121111", "122011"];
const sg2012 = ["xxx", "010712", "012212", "020512", "021212", "021812", "032412", "033112", "040812", "041512", "042212", "042912", "051212", "052012", "060312", "061712", "072212", "072912", "080412", "081112", "081812", "082712", "090812", "091612", "092312", "093012", "100812", "101412", "102112", "110512", "111212"];
const sg2013 = ["xxx", "042713", "050413", "051113", "052013", "052813", "060213", "060913", "062513", "063013", "070713", "071413", "072113", "080413", "081113", "082513", "090113", "090813", "091513", "092313", "100613", "101513", "102013", "102713", "110313", "112413", "122213", "123013"];
const sg2014 = ["xxx", "010614", "011414", "012814", "020914", "022414", "030914", "041314", "061614", "062914", "091514"];
const sg2015 = ["xxx", "041815", "042515", "050315", "050915", "051715", "060715", "061415", "062115", "062815", "070515", "071315", "072115", "080115", "082315", "091315", "100215", "102115", "110115"];
const sg2016 = ["xxx", "070316", "071616", "080216"];
const sg2017 = ["xxx", "040817", "041617", "042317", "043017", "051217", "060917", "071117", "072317", "092317", "100117", "101717", "120417"];
const sg2018 = ["xxx", "013118", "031118", "081918", "082918"];
const yaa = ["xxx", "acknowledgments", "foreword", "020782", "020882", "020982", "021082", "021182a", "021182b", "021282", "021382", "021482", "021682", "021782", "021882a", "021882b", "021882c", "021982", "022082", "022182a", "022182b", "022382a", "022382b", "022382c", "022482", "022582", "022682a", "022682b", "022682c", "022782", "022882", "030182a", "030182b", "030282", "030382", "030482a", "030482b", "030582a", "030582b", "030682a", "030682b", "030682c", "030682d", "030682e", "030882", "030982", "031082a", "031082b", "031082c", "031182", "031382", "031582", "031982", "032982", "033082", "042782", "042882", "042982", "043082", "050182", "050282", "050382", "050782", "050982", "051082a", "051082b", "051082c", "051182", "051582", "051782", "052882", "053082", "060382", "061082", "061282", "061482", "061982", "062182", "afterword"];
const contents = {
  acq: acq,
  yaa: yaa,
  grad: grad,
  sg2002: sg2002,
  sg2003: sg2003,
  sg2004: sg2004,
  sg2005: sg2005,
  sg2006: sg2006,
  sg2007: sg2007,
  sg2008: sg2008,
  sg2009: sg2009,
  sg2010: sg2010,
  sg2011: sg2011,
  sg2012: sg2012,
  sg2013: sg2013,
  sg2014: sg2014,
  sg2015: sg2015,
  sg2016: sg2016,
  sg2017: sg2017,
  sg2018: sg2018
};

function splitUrl(url) {
  let u = url; //remove leading "/"

  u = url.substr(1); //remove trailing '/' if it exists

  if (u[u.length - 1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}
/*
  return the position of unit in the bid array
*/


function getUnitId(bid, unit) {
  if (contents[bid]) {
    return contents[bid].indexOf(unit);
  } else {
    throw new Error(`unexpected bookId: ${bid}`);
  }
}

function getSourceId() {
  return sourceId;
}

function getKeyInfo() {
  return {
    sourceId: sourceId,
    keyLength: keyLength
  };
}
/*
  parse bookmarkId into pageKey and paragraphId
  - pid=0 indicates no paragraph id
*/


function parseKey(key) {
  const keyInfo = getKeyInfo();
  let keyString = key;
  let pid = 0;

  if (typeof keyString === "number") {
    keyString = key.toString(10);
  }

  let decimalPos = keyString.indexOf("."); //if no decimal key doesn't include paragraph id

  if (decimalPos > -1) {
    let decimalPart = keyString.substr(decimalPos + 1); //append 0's if decimal part < 3

    switch (decimalPart.length) {
      case 1:
        decimalPart = `${decimalPart}00`;
        break;

      case 2:
        decimalPart = `${decimalPart}0`;
        break;
    }

    pid = parseInt(decimalPart, 10);
  }

  let pageKey = parseInt(keyString.substr(0, keyInfo.keyLength), 10);
  return {
    pid,
    pageKey
  };
}
/*
  Convert url into key
  returns -1 for non-transcript url

  key format: ssbuuIqq.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
        ppp: paragraph number - not positional
*/


function genPageKey(url = location.pathname) {
  let key = {
    sid: sourceId,
    bid: 0,
    uid: 0,
    qid: 0
  };
  let parts = splitUrl(url); //key.bid = indexOf(bookIds, parts[0]);

  key.bid = bookIds.indexOf(parts[2]);

  if (key.bid === -1) {
    return -1;
  }

  key.uid = getUnitId(parts[2], parts[3]);

  if (key.bid === -1) {
    return -1;
  }

  let compositeKey = sprintf("%02s%02s%03s", key.sid, key.bid, key.uid);
  let numericKey = parseInt(compositeKey, 10);
  return numericKey;
}
/*
  genParagraphKey(paragraphId, key: url || pageKey)

  args:
    pid: a string representing a transcript paragraph, starts as "p0"..."pnnn"
         - it's converted to number and incremented by 1 then divided by 1000
        pid can also be a number so then we just increment it and divide by 1000

    key: either a url or pageKey returned from genPageKey(), if key
   is a string it is assumed to be a url
*/


function genParagraphKey(pid, key = location.pathname) {
  let numericKey = key;
  let pKey;

  if (typeof pid === "string") {
    pKey = (parseInt(pid.substr(1), 10) + 1) / 1000;
  } else {
    pKey = (pid + 1) / 1000;
  } //if key is a string it represents a url


  if (typeof key === "string") {
    numericKey = genPageKey(key);
  }

  let paragraphKey = numericKey + pKey;
  return paragraphKey;
}
/*
  key format: ssbuuIqq.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
        ppp: paragraph number - not positional
*/


function decodeKey(key) {
  let {
    pid,
    pageKey
  } = parseKey(key);
  let pageKeyString = pageKey.toString(10);
  let decodedKey = {
    error: 0,
    message: "ok",
    sid: sourceId,
    bookId: "",
    uid: 0,
    pid: pid - 1
  }; //error, invalid key length

  if (pageKeyString.length !== keyLength) {
    decodedKey.error = true;
    decodedKey.message = `Integer portion of key should have a length of ${keyLength}, key is: ${pageKeyString}`;
    return decodedKey;
  }

  let bid = parseInt(pageKeyString.substr(2, 2), 10);
  decodedKey.bookId = bookIds[bid]; //subtract 1 from key value to get index

  decodedKey.uid = parseInt(pageKeyString.substr(4, 3), 10) - 1;
  return decodedKey;
}

function getBooks() {
  return books;
}
/*
  Return the number of chapters in the book (bid).
  Subtract one from length because of 'xxx' (fake chapter)
*/


function getNumberOfUnits(bid) {
  if (contents[bid]) {
    return contents[bid].length - 1;
  } else {
    throw new Error(`getNumberOfUnits() unexpected bookId: ${bid}`);
  }
}
/*
 * Convert page key to url
 */


function getUrl(key, withPrefix = false) {
  let decodedKey = decodeKey(key, false);
  let unit = "invalid";

  if (decodedKey.error) {
    return "/invalid/key/";
  }

  if (contents[decodedKey.bookId]) {
    unit = contents[decodedKey.bookId][decodedKey.uid + 1];
  }

  if (withPrefix) {
    return `${prefix}/${decodedKey.bookId}/${unit}/`;
  } else {
    return `/${decodedKey.bookId}/${unit}/`;
  }
}
/*
 * Convert page key to url
function getUrl(key) {
  let decodedKey = decodeKey(key);
  let unit = "invalid";

  if (decodedKey.error) {
    return "/invalid/key/";
  }

  if (contents[decodedKey.bookId]) {
    unit = contents[decodedKey.bookId][decodedKey.uid + 1];
  }

  return `/${decodedKey.bookId}/${unit}/`;
}
 */

/*
  Describe key in terms of source:book:unit:p
*/


function describeKey(key) {
  let decodedKey = decodeKey(key, false);

  if (decodedKey.error) {
    return {
      key: key,
      error: true,
      source: sid
    };
  }

  let info = {
    key: key,
    source: sid,
    book: decodedKey.bookId,
    unit: contents[decodedKey.bookId][decodedKey.uid + 1]
  };

  if (decodedKey.pid > -1) {
    info.pid = `p${decodedKey.pid}`;
  }

  return info;
}

module.exports = {
  getNumberOfUnits: getNumberOfUnits,
  getBooks: getBooks,
  getUrl: getUrl,
  getSourceId: getSourceId,
  getKeyInfo: getKeyInfo,
  parseKey: parseKey,
  getUnitId: getUnitId,
  genPageKey: genPageKey,
  genParagraphKey: genParagraphKey,
  decodeKey: decodeKey,
  describeKey: describeKey
};

/***/ }),

/***/ "../cmi-wom/src/js/modules/_config/key.js":
/*!************************************************!*\
  !*** ../cmi-wom/src/js/modules/_config/key.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  WOM: Transcript keys
  - first item starts with 1, not 0
  - a numeric value that represents a specific transcript and represents
    a specific logical ordering.

  - The integer part of the key represent a transcript and the decimal part
    a paragraph within the transcript.
  - The paragraphId is increased by 1 and divided by 1000

  key format: ssbuuIqq.ppp
  where: ss: source Id
          b: book Id
         uu: unit Id
          I: quesiton indicator, 0:no questions 1:questions
         qq: question Id
        ppp: paragraph number - not positional

  NOTE: This module is used by code running in the browser and Node so the 
        common.js module system is used
*/
//import indexOf from "lodash/indexOf";
const sprintf = __webpack_require__(/*! sprintf-js */ "../cmi-wom/node_modules/sprintf-js/src/sprintf.js").sprintf; //source id: each source has a unique id


const sourceId = 10;
const sid = "wom";
const prefix = "/t/wom"; //length of pageKey excluding decimal portion

const keyLength = 8;
const books = ["tjl", "wos", "early", "woh", "wot", "wok", "acq", "topics"];
const bookIds = ["xxx", ...books];
const acq = ["xxx", "welcome", "wom", "web"];
const tjl = ["xxx", "ack", "foreword", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "epilogue"];
const wos = ["xxx", "foreword", "preface", "chap01", "chap02", "chap03", "chap04", "afterwords", "epilog", "prayer"];
const early = ["xxx", "ble", "c2s", "hoe", "ign", "com", "dbc", "dth", "fem", "gar", "hea", "hoi", "hsp", "joy1", "joy2", "lht", "moa", "mot", "wak", "wlk"];
const topics = ["xxx", "jeshua", "woh", "wohexercises", "wot", "wotexercises", "wok", "wokexercises", "god", "creation", "christmind", "christ", "creator", "purpose", "forgiveness", "selflove", "karma"];
const contents = {
  acq: acq,
  tjl: tjl,
  wos: wos,
  early: early,
  topics: topics
};

function splitUrl(url) {
  let u = url; //remove leading "/"

  u = url.substr(1); //remove trailing '/' if it exists

  if (u[u.length - 1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}
/*
  return the position of unit in the bid array
*/


function getUnitId(bid, unit, fromKey = false) {
  if (bid === "woh" || bid === "wot" || bid === "wok") {
    return parseInt(unit.substr(1), 10);
  }

  if (contents[bid]) {
    return contents[bid].indexOf(unit);
  } else {
    throw new Error(`unexpected bookId: ${bid}`);
  }
}
/*
  Return the unit name given keys bid, uid
*/


function getUnitFromKey(bid, uid) {
  if (bid === "woh" || bid === "wot" || bid === "wok") {
    return sprintf("l%02s", uid);
  }

  if (contents[bid]) {
    return contents[bid][uid];
  } else {
    throw new Error(`unexpected bookId: ${bid}`);
  }
}

function getSourceId() {
  return sourceId;
}

function getKeyInfo() {
  return {
    sourceId: sourceId,
    keyLength: keyLength
  };
}
/*
  parse bookmarkId into pageKey and paragraphId
  - pid=0 indicates no paragraph id
*/


function parseKey(key) {
  const keyInfo = getKeyInfo();
  let keyString = key;
  let pid = 0;

  if (typeof keyString === "number") {
    keyString = key.toString(10);
  }

  let decimalPos = keyString.indexOf("."); //if no decimal key doesn't include paragraph id

  if (decimalPos > -1) {
    let decimalPart = keyString.substr(decimalPos + 1); //append 0's if decimal part < 3

    switch (decimalPart.length) {
      case 1:
        decimalPart = `${decimalPart}00`;
        break;

      case 2:
        decimalPart = `${decimalPart}0`;
        break;
    }

    pid = parseInt(decimalPart, 10);
  }

  let pageKey = parseInt(keyString.substr(0, keyInfo.keyLength), 10);
  return {
    pid,
    pageKey
  };
}
/*
  Convert url into key
  returns -1 for non-transcript url

  key format: ssbuuIqq.ppp
  where: ss: source Id
          b: book Id
         uu: unit Id
          I: question indicator, 0:no questions 1:questions
         qq: question Id
        ppp: paragraph number - not positional
*/


function genPageKey(url = location.pathname) {
  let key = {
    sid: sourceId,
    bid: 0,
    uid: 0,
    hasQuestions: 0,
    qid: 0
  };
  let parts = splitUrl(url); //key.bid = indexOf(bookIds, parts[0]);

  key.bid = bookIds.indexOf(parts[2]);

  if (key.bid === -1) {
    return -1;
  }

  key.uid = getUnitId(parts[2], parts[3]);

  if (key.bid === -1) {
    return -1;
  }

  if (parts.length === 5) {
    key.hasQuestions = 1;
    key.qid = parseInt(parts[4].substr(1), 10);
  }

  let compositeKey = sprintf("%02s%01s%02s%1s%02s", key.sid, key.bid, key.uid, key.hasQuestions, key.qid);
  let numericKey = parseInt(compositeKey, 10);
  return numericKey;
}
/* 
  genParagraphKey(paragraphId, key: url || pageKey) 

  args:
    pid: a string representing a transcript paragraph, starts as "p0"..."pnnn"
         - it's converted to number and incremented by 1 then divided by 1000
        pid can also be a number so then we just increment it and divide by 1000

    key: either a url or pageKey returned from genPageKey(), if key
   is a string it is assumed to be a url
*/


function genParagraphKey(pid, key = location.pathname) {
  let numericKey = key;
  let pKey;

  if (typeof pid === "string") {
    pKey = (parseInt(pid.substr(1), 10) + 1) / 1000;
  } else {
    pKey = (pid + 1) / 1000;
  } //if key is a string it represents a url


  if (typeof key === "string") {
    numericKey = genPageKey(key);
  }

  let paragraphKey = numericKey + pKey;
  return paragraphKey;
}
/*
  key format: ssbuuIqq.ppp
  where: ss: source Id
          b: book Id
         uu: unit Id
          I: question indicator, 0:no questions 1:questions
         qq: question Id
        ppp: paragraph number - not positional

  Added arg 'subtract' to prevent subtraction of uid and qid.
*/


function decodeKey(key, substract = true) {
  let {
    pid,
    pageKey
  } = parseKey(key);
  let pageKeyString = pageKey.toString(10);
  let decodedKey = {
    error: 0,
    message: "ok",
    sid: sourceId,
    bookId: "",
    uid: 0,
    hasQuestions: false,
    qid: 0,
    pid: pid - 1
  }; //error, invalid key length

  if (pageKeyString.length !== keyLength) {
    decodedKey.error = true;
    decodedKey.message = `Integer portion of key should have a length of ${keyLength}, key is: ${pageKeyString}`;
    return decodedKey;
  }

  let bid = parseInt(pageKeyString.substr(2, 1), 10);
  decodedKey.bookId = bookIds[bid]; //substract 1 from key value to get index
  // ** don't know why we subtract from uid and quid **
  // ** genPageKey() doesn't add **

  if (substract) {
    //subtract 1 from key value to get index
    decodedKey.uid = parseInt(pageKeyString.substr(3, 2), 10) - 1;
    decodedKey.qid = parseInt(pageKeyString.substr(6, 2), 10) - 1;
  } else {
    decodedKey.uid = parseInt(pageKeyString.substr(3, 2), 10);
    decodedKey.qid = parseInt(pageKeyString.substr(6, 2), 10);
  }

  decodedKey.hasQuestions = pageKeyString.substr(5, 1) === "1";
  return decodedKey;
}

function getBooks() {
  return books;
}
/*
 * Convert page key to url, this is used to determine url of 
 *  note style bookmarks
 */


function getUrl(key, withPrefix = false) {
  //decode key but don't subtract one from uid and qid
  let decodedKey = decodeKey(key, false);
  let unit = "invalid";
  let question;
  let url = `/${decodedKey.bookId}`;

  if (decodedKey.error) {
    return "/invalid/key/";
  }

  unit = getUnitFromKey(decodedKey.bookId, decodedKey.uid);
  url = `${url}/${unit}/`;

  if (decodedKey.hasQuestions) {
    question = `q${decodedKey.qid}`;
    url = `${url}${question}/`;
  }

  if (withPrefix) {
    return `${prefix}${url}`;
  }

  return url;
}
/*
  Describe key in terms of source:book:unit:p
*/


function describeKey(key) {
  let decodedKey = decodeKey(key, false);

  if (decodedKey.error) {
    return {
      key: key,
      error: true,
      source: sid
    };
  }

  let info = {
    key: key,
    source: sid,
    book: decodedKey.bookId
  };
  info.unit = getUnitFromKey(decodedKey.bookId, decodedKey.uid);

  if (decodedKey.hasQuestions) {
    info.question = `q${decodedKey.qid}`;
  }

  if (decodedKey.pid > -1) {
    info.pid = `p${decodedKey.pid}`;
  }

  return info;
}

module.exports = {
  getBooks: getBooks,
  getSourceId: getSourceId,
  getKeyInfo: getKeyInfo,
  getUrl: getUrl,
  parseKey: parseKey,
  genPageKey: genPageKey,
  genParagraphKey: genParagraphKey,
  decodeKey: decodeKey,
  describeKey: describeKey
};

/***/ }),

/***/ "./src/js/constants.js":
/*!*****************************!*\
  !*** ./src/js/constants.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/_config/config */ "./src/js/modules/_config/config.js");
/*
  Teaching specific data
*/
const keyInfo = __webpack_require__(/*! ./modules/_config/key */ "./src/js/modules/_config/key.js");


/* harmony default export */ __webpack_exports__["default"] = ({
  sid: "www",
  env: "integration",
  lang: "en",
  url_prefix: "",
  //navigator
  sourceId: 99,
  getPageInfo: _modules_config_config__WEBPACK_IMPORTED_MODULE_0__["getPageInfo"],
  //list
  keyInfo: keyInfo,
  //list, bmnet
  store: {
    bmList: "bm.list",
    bmCreation: "bm.creation",
    bmTopics: "bm.topics",
    bmModal: "bm.modal",
    srchResults: "srch.results",
    pnDisplay: "pn.display",
    cfgacq: "cfg.acq",
    cfgprofile: "cfg.profile"
  }
});

/***/ }),

/***/ "./src/js/globals.js":
/*!***************************!*\
  !*** ./src/js/globals.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
  Global constants
*/
/* harmony default export */ __webpack_exports__["default"] = ({
  acolManager: "rmercer33+acol@gmail.com",
  cmiUserId: "05399539cca9ac38db6db36f5c770ff1",
  sources: "/public/config/sources.json",
  user: "https://kkdlxunoe7.execute-api.us-east-1.amazonaws.com/latest",
  acol: "https://kkdlxunoe7.execute-api.us-east-1.amazonaws.com/latest/acol/access",
  search: "https://x5rigstpd2.execute-api.us-east-1.amazonaws.com/latest/search"
});

/***/ }),

/***/ "./src/js/modules/_about/about.js":
/*!****************************************!*\
  !*** ./src/js/modules/_about/about.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_intro__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_util/intro */ "./src/js/modules/_util/intro.js");


function createClickHandlers() {
  //help menu
  $("#help-menu").on("click", "div.item", function (e) {
    e.preventDefault();

    if ($(this).hasClass("page-tour")) {
      let prod = !$(this).hasClass("development");
      Object(_util_intro__WEBPACK_IMPORTED_MODULE_0__["pageDriver"])(prod);
    }

    if ($(this).hasClass("page-navtour")) {
      Object(_util_intro__WEBPACK_IMPORTED_MODULE_0__["pageNavigationDriver"])();
    }

    if ($(this).hasClass("transcript-tour")) {
      Object(_util_intro__WEBPACK_IMPORTED_MODULE_0__["transcriptDriver"])();
    }

    if ($(this).hasClass("about-src")) {
      location.href = "/about/";
    }

    if ($(this).hasClass("read-documentation")) {
      location.href = "/acq/quick/";
    }

    if ($(this).hasClass("view-documentation")) {
      location.href = "/acq/video/";
    }

    if ($(this).hasClass("contact-me")) {
      location.href = "/acq/contact/";
    }
  });
  $(".login-menu-option-account").on("click", "div.item", function (e) {
    if ($(this).hasClass("profile-management")) {
      location.href = "/profile/email/";
    }

    if ($(this).hasClass("topic-management")) {
      location.href = "/profile/topicMgt/";
    }
  }); //quick links

  $("#quick-links").on("click", "div.item", function (e) {
    e.preventDefault();
    let href = $(this).attr("data-href"); //console.log("quick links href: %s", href);

    location.href = href;
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize() {
    createClickHandlers();
  }

});

/***/ }),

/***/ "./src/js/modules/_ajax/annotation.js":
/*!********************************************!*\
  !*** ./src/js/modules/_ajax/annotation.js ***!
  \********************************************/
/*! exports provided: getAnnotations, getTopicSummaries, updateAnnotation, postAnnotation, getAnnotation, deleteAnnotation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAnnotations", function() { return getAnnotations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTopicSummaries", function() { return getTopicSummaries; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateAnnotation", function() { return updateAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "postAnnotation", function() { return postAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAnnotation", function() { return getAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteAnnotation", function() { return deleteAnnotation; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "./src/js/globals.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2__);



/*
 * Format paraKey so it contains 3 decimal positions
 */

function formatKey(key) {
  if (typeof key !== "string") {
    key = key.toString(10);
  }

  let decimalPos = key.indexOf("."); //invalid key, but return it anyway.

  if (decimalPos === -1) {
    return `${key}.001`;
  }

  let intPart = key.substr(0, decimalPos);
  let decimalPart = key.substr(decimalPos + 1);
  let padding = decimalPart.length === 2 ? "0" : decimalPart.length === 1 ? "00" : "";
  return `${intPart}.${decimalPart}${padding}`;
}
/***
 * Get array of annotations from server, add a numeric pid to each item, and
 * parse stringified selectedText.
 *
 *
 * @param {string} userId - md5 has of email address of owner
 * @param {string} key - teaching id (sourceId) for origin of annotations,
 *                       at least two digits, more to restrict by book
 * @param {string} topicValue - optional, return annotations containing topicValue only
 *
 * Return array of annotations.
 * {
 *   annotation: {
 *     Comment: <string>,
 *     rangeStart: <string>,
 *     rangeEnd: <string>,
 *     [selectedText]: <object>,
 *     [aid]: <string>
 *     topicList: [{value, topic},...],
 *     userId: <string>,
 *     creationDate: <string>
 *   }, 
 *   userId: <string>,
 *   paraKey: <string>,
 *   creationDate: <string>,
 *   pid: <number>
 * }
 */


function getAnnotations(userId, key, topicValue = "") {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/queryAnnotation/${userId}/${key}`).then(response => {
      let bmList = response.data.response;
      bmList.forEach(b => {
        //numeric pid, not representative of key
        // - used to find annotations for a given paragraph
        b.pid = parseInt(b.annotation.rangeStart.substring(1), 10); //add userId and creationDate to annotation, this is used by the
        //bookmark navigator

        b.annotation.userId = b.userId;
        b.annotation.creationDate = b.creationDate; //parse selectedText JSON object

        if (b.annotation.selectedText) {
          b.annotation.selectedText = JSON.parse(b.annotation.selectedText);
        }
      }); // filter by topicValue

      if (topicValue.length > 0) {
        bmList = bmList.filter(b => {
          if (b.annotation.topicList) {
            let found = b.annotation.topicList.findIndex(t => t.value === topicValue);
            return found > -1;
          }

          return false;
        });
      } //sort bookmarks by numeric pid


      bmList.sort((a, b) => {
        return a.paraKey - b.paraKey;
      });
      resolve(bmList);
    }).catch(err => {
      reject(err);
    });
  });
}
/**
 * Get topic summaries for bookmarks by key (portion of paraKey) and topic name.
 *
 * @param {string} key - sourceId (2 chars) or more of paraKey
 * @param {string} topicValue - topic name (without spaces)
 * @param {string} userId - md5 hash of bookmark creators email address
 * @returns {array} - object of paraKey and summary text
 */

function getTopicSummaries(key, topicValue, userId) {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/querySummariesByTopic/${userId}/${key}/${topicValue}`).then(response => {
      let bmList = response.data.response;
      let summary = [];
      bmList.forEach(b => {
        let topic = b.annotation.topicList.find(t => t.value === topicValue);
        summary.push({
          paraKey: b.paraKey,
          pid: b.annotation.rangeStart,
          summary: topic.summary
        });
      }); //sort bookmarks by numeric pid

      summary.sort((a, b) => {
        return a.paraKey - b.paraKey;
      });
      resolve({
        topicTotal: response.data.topicTotal,
        summary: summary
      });
    }).catch(err => {
      reject(err);
    });
  });
}
/*
 * Called by topicmanager
 */

function updateAnnotation(bookmark) {
  let clone = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_2___default()(bookmark);

  if (clone.annotation.selectedText) {
    if (typeof clone.annotation.selectedText !== "string") {
      //convert selectedText to JSON
      clone.annotation.selectedText = JSON.stringify(clone.annotation.selectedText);
    }
  }

  return postAnnotation(clone.userId, clone.paraKey, clone.creationDate, clone.annotation);
}
/*
 * Save annotation to DynamoDb
 */

function postAnnotation(userId, paraKey, creationDate, annotation) {
  if (typeof creationDate !== "string") {
    creationDate = creationDate.toString(10);
  }

  if (typeof paraKey !== "string") {
    paraKey = paraKey.toString(10);
  }

  let body = {
    userId: userId,
    paraKey: paraKey,
    creationDate: creationDate,
    annotation: annotation
  };
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/annotation`, body).then(response => {
      resolve(response.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}
/*
 * Get annotation from server, add userId and creationDate to the annotation,
 * parse stringified selectedText.
 *
 * Return annotation only.
 */

function getAnnotation(userId, paraKey, creationDate) {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/annotation/${userId}/${formatKey(paraKey)}/${creationDate}`).then(response => {
      console.log("getAnnotation: %o", response);
      let r = response.data.response; //annotation not found

      if (!r.userId) {
        resolve({});
        return;
      }

      r.annotation.userId = r.userId;
      r.annotation.creationDate = r.creationDate;

      if (r.annotation.selectedText) {
        r.annotation.selectedText = JSON.parse(r.annotation.selectedText);
      }

      resolve(r.annotation);
    }).catch(err => {
      reject(err);
    });
  });
}
/*
 * Delete annotation
 */

function deleteAnnotation(userId, paraKey, creationDate) {
  if (typeof creationDate !== "string") {
    creationDate.toString(10);
  }

  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.delete(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/annotation/${userId}/${formatKey(paraKey)}/${creationDate}`).then(response => {
      resolve(response.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}

/***/ }),

/***/ "./src/js/modules/_ajax/share.js":
/*!***************************************!*\
  !*** ./src/js/modules/_ajax/share.js ***!
  \***************************************/
/*! exports provided: getMailList, putMailList, sendMail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMailList", function() { return getMailList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putMailList", function() { return putMailList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendMail", function() { return sendMail; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "./src/js/globals.js");


function getMailList(userId) {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/mailList/${userId}`).then(response => {
      resolve(response.data.mailList);
    }).catch(err => {
      reject(err);
    });
  });
}
function putMailList(userId, list) {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/mailList`, list).then(response => {
      resolve(response.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}
function sendMail(mailInfo) {
  console.log('mailInfo: %o', mailInfo);
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/share`, mailInfo).then(response => {
      if (response.status === 200) {
        resolve("success");
      } else {
        resolve(response.data.message);
      }
    }).catch(error => {
      reject(error);
    });
  });
}

/***/ }),

/***/ "./src/js/modules/_ajax/topics.js":
/*!****************************************!*\
  !*** ./src/js/modules/_ajax/topics.js ***!
  \****************************************/
/*! exports provided: getTopicList, putTopicList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTopicList", function() { return getTopicList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "putTopicList", function() { return putTopicList; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "./src/js/globals.js");


/**
 * @param {string} userId - md5 hash of userId
 * @param {string} sourceId - two digit source identifier
 * @return {array} topics - topicList
 *
 */

function getTopicList(userId, sourceId) {
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/topicList/${userId}/${sourceId}`).then(response => {
      let topics = response.data.topics;
      resolve(topics);
    }).catch(err => {
      reject(err);
    });
  });
}
/*
 * Save topicList to DynamoDb
 */

function putTopicList(userId, sourceId, topicList) {
  let body = {
    userId: userId,
    sourceId: sourceId,
    topicList: topicList
  };
  return new Promise((resolve, reject) => {
    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/topicList`, body).then(response => {
      resolve(response.data.response);
    }).catch(err => {
      reject(err);
    });
  });
}

/***/ }),

/***/ "./src/js/modules/_bookmark/annotate.js":
/*!**********************************************!*\
  !*** ./src/js/modules/_bookmark/annotate.js ***!
  \**********************************************/
/*! exports provided: getLink, initialize, getUserInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLink", function() { return getLink; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserInput", function() { return getUserInput; });
/* harmony import */ var _bmnet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bmnet */ "./src/js/modules/_bookmark/bmnet.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bookmark */ "./src/js/modules/_bookmark/bookmark.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/range */ "./node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _navigator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./navigator */ "./src/js/modules/_bookmark/navigator.js");
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./clipboard */ "./src/js/modules/_bookmark/clipboard.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");








 //teaching specific constants, assigned at initialization

let teaching = {};

function getAnnotationForm() {
  let form = _language_lang__WEBPACK_IMPORTED_MODULE_7__["__lang"]`
    <form name="annotation" id="annotation-form" class="ui form">
      <input class="hidden-field" type="text" readonly="" name="status">
      <input class="hidden-field" type="text" readonly="" name="creationDate">
      <input class="hidden-field" type="text" name="aid" readonly>
      <input class="hidden-field" type="text" readonly="" name="rangeStart">
      <div class="fields">
        <div class="three wide field">
          <input id="rangeEnd" type="text" name="rangeEnd" maxlength="4" placeholder="${"label:end"}">
        </div>
        <div id="available-topics" class="twelve wide field"></div>
        </div>
      </div>
      <div class="field">
        <input type="text" name="Comment" placeholder="${"label:comment"}">
      </div>
      <div class="field">
        <input type="text" name="newTopics" placeholder="${"label:newtopic"}">
      </div>
      <div class="field">
        <textarea name="Note" placeholder="${"label:notes"}" rows="3"></textarea>
      </div>
      <div class="fields">
        <button class="annotation-submit ui green button" type="submit">${"action:submit"}</button>
        <button class="annotation-cancel ui red basic button">${"action:cancel"}</button>
        <button class="annotation-share ui green disabled basic button">${"action:share"}</button>
        <button class="annotation-note ui blue basic button">${"label:links"}</button>
        <div class="twelve wide field">
          <button class="annotation-delete ui red disabled right floated button">${"action:delete"}</button>
        </div>
      </div>
    </form>
    <div class="note-and-links hide">
      <table id="bookmark-link-table" class="ui selectable celled table">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th>${"label:linkref"}</th>
            <th>${"label:link"}</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="bookmark-link-list">
        </tbody>
      </table>
      <form name="linkForm" id="link-form" class="ui form">
        <div class="fields">
          <div class="ten wide field">
            <input required type="text" placeholder="${"label:linknote"}" name="reference">
          </div>
          <div class="five wide field">
            <input required type="text" placeholder="${"label:link"}" name="link">
          </div>
          <button title="add or update" data-index="-1" type="submit" class="green ui icon button">
            <i class="plus circle icon"></i>
          </button>
          <button title="clear fields" type="reset" class="yellow ui icon button">
            <i class="minus circle icon"></i>
          </button>
        </div>
      </form>
    </div>
  `;
  return form;
}

let linkArray = [];
function getLink(index) {
  return linkArray[index];
}

function populateTable(links) {
  return `
    ${links.map((item, index) => _language_lang__WEBPACK_IMPORTED_MODULE_7__["__lang"]`
      <tr data-index="${index}">
        <td title="${"action:delete"}" class="delete-link-item"><i class="red trash alternate icon"></i></td>
        <td title="${"action:edit"}" class="edit-link-item"><i class="yellow pencil alternate icon"></i></td>
        <td data-name="reference">${item.reference}</td>
        <td data-name="link">${formatLink(item.link)}</td>
        <td title="${"action:follow"}" class="follow-link-item"><i class="green share icon"></i></td>
      </tr>
    `).join("")}
  `;
}

function getIndex() {
  let value = $("#link-form [type='submit']").data("index");
  return parseInt(value, 10);
}

function setIndex(index) {
  $("#link-form [type='submit']").data("index", index);
}

function makeTableRow(item, index) {
  return _language_lang__WEBPACK_IMPORTED_MODULE_7__["__lang"]`
    <tr data-index="${index}">
      <td title="${"action:delete"}" class="delete-link-item"><i class="red trash alternate icon"></i></td>
      <td title="${"action:edit"}" class="edit-link-item"><i class="yellow pencil alternate icon"></i></td>
      <td data-name="reference">${item.reference}</td>
      <td data-name="link">${item.link}</td>
      <td title="${"action:follow"}" class="follow-link-item"><i class="green share icon"></i></td>
    </tr>
  `;
}

function validateLink(pid, link) {
  let rawLink;
  let pKey = teaching.keyInfo.genParagraphKey(pid);

  try {
    rawLink = JSON.parse(link);
  } catch (error) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m3"));
    return false;
  }

  if (!rawLink.aid || !rawLink.desc || !rawLink.key || !rawLink.userId) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m4"));
    return false;
  }

  if (rawLink.key === pKey) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m5"));
    return false;
  }

  return true;
}
/*
 * format link for display in annotation form
 */


function formatLink(link) {
  let raw = JSON.parse(link);
  let display = `${raw.desc.source}:${raw.desc.book}:${raw.desc.unit}`; //WOM has questions

  if (raw.desc.question) {
    display = `${display}:${raw.desc.question}:${raw.desc.pid}`;
  } else {
    display = `${display}:${raw.desc.pid}`;
  }

  return display;
}

function createLinkHandlers() {
  //add
  $(".transcript").on("submit", "#link-form", function (e) {
    e.preventDefault(); //get state; new or edit

    let index = getIndex();
    let state = index === -1 ? "new" : "edit"; //get link values from form

    let form = $("#link-form").form("get values"); //validate link

    let pid = $(".annotate-wrapper p.cmiTranPara").attr("id");

    if (!validateLink(pid, form.link)) {
      return;
    }

    let linkDisplay = formatLink(form.link);

    if (state === "new") {
      linkArray.push({
        reference: form.reference,
        link: form.link,
        deleted: false
      });
      let row = makeTableRow({
        reference: form.reference,
        link: linkDisplay
      }, linkArray.length - 1);
      $("#bookmark-link-list").append(row);
    } else {
      //update array
      linkArray[index] = {
        reference: form.reference,
        link: form.link,
        deleted: false
      }; //update table

      $(`tr[data-index="${index}"] > td[data-name="reference"]`).text(linkArray[index].reference);
      $(`tr[data-index="${index}"] > td[data-name="link"]`).text(linkDisplay);
      setIndex(-1);
    }

    $("#link-form").form("clear");
  }); //delete; link deleted from bookmark link array

  $(".transcript").on("click", "#bookmark-link-list td.delete-link-item", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let parent = $(this).parent();
    let index = parseInt(parent.attr("data-index"), 10); //mark deleted item from linkArray

    linkArray[index].deleted = true; //remove item from table

    parent.remove(); //console.log("after delete: link %o", linkArray);
  }); //edit

  $(".transcript").on("click", "#bookmark-link-list td.edit-link-item", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let index = parseInt($(this).parent().attr("data-index"), 10);
    $("#link-form").form("set values", linkArray[index]);
    setIndex(index);
  });
}

function noteToggle() {
  $(".transcript").on("click", "#annotation-form .annotation-note", function (e) {
    e.preventDefault();
    console.log("note button clicked");
    let nal = $(".note-and-links");

    if (nal.hasClass("hide")) {
      nal.removeClass("hide");
    } else {
      nal.addClass("hide");
    }
  });
}

const wrapper = `
  <div class="annotate-wrapper ui raised segment"></div>`;

function generateHorizontalList(listArray) {
  if (!listArray || listArray.length === 0) {
    return `
      <div class="item">
        <em>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m6")}</em>
      </div>
    `;
  }

  return `
    ${listArray.map(item => `
      <div class="item">
        <em>${item.topic}</em>
      </div>
    `).join("")}
  `;
}

function generateExtraList(annotation) {
  let extras = [];

  if (annotation.Note) {
    extras.push("N");
  }

  if (annotation.links) {
    extras.push(`L${annotation.links.length}`);
  }

  if (extras.length === 0) {
    return `
      <div class="item">
        <i class="bookmark outline icon"></i>
      </div>
    `;
  }

  return `
    ${extras.map(item => `
      <div class="item">
        ${genExtrasItem(item)}
      </div>
    `).join("")}
  `;
}

function genExtrasItem(item) {
  let icon;

  if (item === "N") {
    icon = "<i class='align justify icon'></i>";
  } else if (item.startsWith("L")) {
    let length = item.substr(1);
    icon = `<i class="linkify icon"></i>[${length}]`;
  }

  return `${icon}`;
}

function generateComment(comment) {
  if (!comment) {
    return Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m7");
  } else {
    return comment;
  }
}
/*
  Populate form fields
  args:
    pid: the paragraph id of the annotation
    aid: the id of associated highlighted text
    annotation: user data for existing annotations
  */


function initializeForm(pid, aid, annotation) {
  let form = $("#annotation-form");
  let linkform = $("#link-form"); //set link array to empty

  linkArray = []; //a new annotation

  if (!annotation) {
    form.form("set values", {
      status: "new",
      rangeStart: pid,
      rangeEnd: pid,
      aid: aid
    });
  } else {
    let topicSelect = [];

    if (annotation.topicList) {
      topicSelect = annotation.topicList.map(t => t.value);
    }

    if (annotation.links) {
      linkArray = annotation.links;
      let html = populateTable(linkArray);
      $("#bookmark-link-list").html(html);
    }

    form.form("set values", {
      status: "update",
      rangeStart: annotation.rangeStart,
      rangeEnd: annotation.rangeEnd,
      aid: annotation.aid,
      creationDate: annotation.creationDate,
      Comment: annotation.Comment,
      Note: annotation.Note,
      topicList: topicSelect
    });
  }

  document.getElementById("rangeEnd").focus();
}

function getFormData() {
  return $("#annotation-form").form("get values");
} //returns true if annotation form is open


function annotationFormOpen(currentPid) {
  let selector = $(".transcript .annotation-edit");

  if (selector.length > 0) {
    let pid = selector.first(1).attr("id"); //if currentPid === pid user clicked hidden link in editor, we just exit w/o notice

    if (currentPid !== pid) {
      toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(_language_lang__WEBPACK_IMPORTED_MODULE_7__["__lang"]`${"annotate:m8"} ${pid}. ${"annotate:m9"}`);
    }

    return true;
  }

  return false;
}

function bookmarkNavigatorActive() {
  if ($(".transcript").hasClass("bookmark-navigator-active")) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m10"));
    return true;
  }

  return false;
}

function editAnnotation(pid, aid, annotation) {
  let rangeStart = parseInt(annotation.rangeStart.substr(1), 10);
  let rangeEnd = parseInt(annotation.rangeEnd.substr(1), 10); //add class 'annotation-edit' to paragraphs so they can be wrapped

  if (rangeStart !== rangeEnd) {
    let annotationRange = lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(rangeStart, rangeEnd + 1);

    for (let i = 0; i < annotationRange.length; i++) {
      $(`#p${annotationRange[i]}`).addClass("annotation-edit");
    }
  } else {
    $(`#${pid}`).addClass("annotation-edit");
  } //.disable-selection will prevent text selection during annotation creation/edit


  addSelectionGuard();
  $(".annotation-edit").wrapAll(wrapper);
  $(".annotate-wrapper").prepend(getAnnotationForm());
  $(".annotation-delete.disabled").removeClass("disabled");
  $(".annotation-share.disabled").removeClass("disabled");
  getTopicList(pid, aid, annotation);
}
/*
  Support for creating annotations with no associated selected text
*/


function noteHandler() {
  $(".transcript").on("click", "p.cmiTranPara > span.pnum", function (e) {
    e.preventDefault();
    let pid = $(this).parent("p").attr("id"); //we're already editing this annotation

    if (annotationFormOpen() || bookmarkNavigatorActive()) {
      return;
    }

    let bkmrk = _bookmark__WEBPACK_IMPORTED_MODULE_2__["localStore"].getItem(pid); //we found a note - so edit it

    if (bkmrk) {
      editAnnotation(pid, undefined, bkmrk.annotation);
      return;
    } //disable text selection while annotation form is open


    addSelectionGuard(); //new note for paragraph

    $(`#${pid}`).addClass("annotation-edit annotation-note");
    $(".annotation-edit").wrapAll(wrapper);
    $(".annotate-wrapper").prepend(getAnnotationForm());
    getTopicList(pid);
  });
}

function hoverNoteHandler() {
  $(".transcript").on("mouseenter", ".has-annotation", function (e) {
    e.preventDefault(); //if bookmark highlights are hidden, return without showing popup

    if ($(".transcript").hasClass("hide-bookmark-highlights")) {
      $(this).popup("hide").popup("destroy");
      return;
    }

    let aid = $(this).data("aid");
    let pid = $(this).parent("p").attr("id"); //bookmark wont be found if it is still being created

    let bkmrk = _bookmark__WEBPACK_IMPORTED_MODULE_2__["localStore"].getItem(pid, aid);

    if (!bkmrk) {
      return;
    }

    let annotation = bkmrk.annotation;
    let topicList = generateHorizontalList(annotation.topicList);
    let comment = generateComment(annotation.Comment);
    let extraHtml = generateExtraList(annotation);
    $(".annotation-information .topic-list").html(topicList);
    $(".annotation-information .range").html(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("label:range")}: ${annotation.rangeStart}/${annotation.rangeEnd}`);
    $(".annotation-information .description").html(`${comment}`);
    $(".annotation-information .extra").html(extraHtml);
    $(this).popup({
      popup: ".annotation-information.popup",
      hoverable: true
    }).popup("show"); //create link

    let link = createBookmarkLink(pid, aid);
    $("#popup-button").attr("data-clipboard-text", link);
    _clipboard__WEBPACK_IMPORTED_MODULE_5__["default"].register("#popup-button"); //set focus on button so pressing Enter will click the button

    $("#popup-button").focus();
  });
}
/*
 * Show popup containing info about the bookmark when mouse hovers over
 * selectedText.
 */


function hoverHandler() {
  $(".transcript").on("mouseenter", "[data-annotation-id]", function (e) {
    e.preventDefault();
    let aid = $(this).attr("data-annotation-id");
    let pid = $(this).parent("p").attr("id");
    let realAid = $(this).data("aid"); //don't know why this happens

    if (!pid) {
      console.log("hoverHandler: pid not found");
      return;
    } //disable hover if highlights are hidden


    if ($(".transcript").hasClass("hide-bookmark-highlights")) {
      $(this).popup("hide").popup("destroy");
      return;
    } //disable hover if highlights are selectively hidden, filtered


    if ($(".transcript").hasClass("topic-filter-active")) {
      if (!$(this).hasClass("show")) {
        $(this).popup("hide").popup("destroy");
        return;
      }
    } //disable popup for paragraphs being edited


    if ($(`#${pid}`).hasClass("annotation-edit")) {
      $(`#${pid} [data-annotation-id]`).each(function () {
        $(this).popup("hide").popup("destroy");
      });
      return;
    } //disable popup for paragraphs wrapped in segment div


    if ($(`#${pid}`).hasClass("selected-annotation")) {
      $(`#${pid} [data-annotation-id]`).each(function () {
        $(this).popup("hide").popup("destroy");
      });
      return;
    } //disable popup for shared annotations


    if ($(this).hasClass("shared")) {
      $(this).popup("hide").popup("destroy");
      return;
    } //get bookmark from local store


    let bkmrk = _bookmark__WEBPACK_IMPORTED_MODULE_2__["localStore"].getItem(pid, aid); //sometimes the annotation won't be found because it is being created, so just return

    if (!bkmrk) {
      return;
    }

    let annotation = bkmrk.annotation;
    let topicList = generateHorizontalList(annotation.topicList);
    let comment = generateComment(annotation.Comment);
    let extraHtml = generateExtraList(annotation);
    $(".annotation-information .topic-list").html(topicList);
    $(".annotation-information .range").html(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("label:range")}: ${annotation.rangeStart}/${annotation.rangeEnd}`);
    $(".annotation-information .description").html(`${comment}`);
    $(".annotation-information .extra").html(extraHtml);
    $(this).popup({
      popup: ".annotation-information.popup",
      hoverable: true
    }).popup("show"); //create link

    let link = createBookmarkLink(pid, realAid);
    $("#popup-button").attr("data-clipboard-text", link);
    _clipboard__WEBPACK_IMPORTED_MODULE_5__["default"].register("#popup-button"); //set focus on button so pressing Enter will click the button

    $("#popup-button").focus();
  });
}
/*
 * Create a link reference to a CMI bookmark
 *
 * Format: pageKey.000:aid:uid
 */


function createBookmarkLink(pid, aid) {
  let pKey = teaching.keyInfo.genParagraphKey(pid);
  let keyInfo = teaching.keyInfo.describeKey(pKey);
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();
  let link = {
    userId: userInfo.userId,
    key: pKey,
    aid: aid,
    desc: keyInfo
  };
  return JSON.stringify(link);
}
/*
 * Click handler for the button press on annotation popups.
 */


function getReferenceHandler() {
  $("body").on("click", "#popup-button", function (e) {
    //for selected text bookmarks
    $("mark.visible").popup("hide"); //for note style bookmarks

    $(".pnum.has-annotation.visible").popup("hide");
  });
}

function editHandler() {
  $(".transcript").on("click", "[data-annotation-id]", function (e) {
    e.preventDefault();
    let aid = $(this).attr("data-annotation-id");
    let pid = $(this).parent("p").attr("id"); //pid can be undefined when selected content is emphasized <em>

    if (pid === undefined) {
      pid = $(this).parents("p").attr("id");
    } //we're already editing this annotation


    if (annotationFormOpen(pid) || bookmarkNavigatorActive()) {
      return;
    } //disable edit if highlights are hidden


    if ($(".transcript").hasClass("hide-bookmark-highlights")) {
      return;
    } //disable edit if highlights are selectively hidden, filtered


    if ($(".transcript").hasClass("topic-filter-active")) {
      if (!$(this).hasClass("show")) {
        return;
      }
    } //disable edit for shared annotations


    if ($(this).hasClass("shared")) {
      return;
    } //hide this popup


    $(this).popup("hide"); //show this highlight, all others are hidden

    $(this).addClass("show");
    let bkmrk = _bookmark__WEBPACK_IMPORTED_MODULE_2__["localStore"].getItem(pid, aid);
    editAnnotation(pid, aid, bkmrk.annotation);
  });
}
/*
 * Enable text selection by removing .disable-selection unless
 * .user is present. This means user has explicitly disabled
 * text selection.
 */


function removeSelectionGuard() {
  let guard = $("div.transcript.ui.disable-selection:not(.user)");

  if (guard.length > 0) {
    //console.log("removing selection guard");
    guard.removeClass("disable-selection");
  }
}
/*
 * Disable text selection when annotation form is open
 */


function addSelectionGuard() {
  let guard = $("div.transcript.ui");

  if (!guard.hasClass("disable-selection")) {
    //console.log("adding selection guard");
    guard.addClass("disable-selection");
  }
}

function submitHandler() {
  $(".transcript").on("submit", "#annotation-form", function (e) {
    e.preventDefault(); //enable text selection, disabled when annotation form open

    removeSelectionGuard(); //1. Create new topic begins here

    let formData = getFormData(); //topicList contains topic strings but we want the topic object
    //get it from the select option tag

    if (formData.topicList.length > 0) {
      let topicObjectArray = formData.topicList.map(tv => {
        let topic = $(`#annotation-topic-list > [value='${tv}']`).text();
        return {
          value: tv,
          topic: topic
        };
      });
      formData.topicList = topicObjectArray;
    }

    unwrap(); //remove class "show" added when form was displayed

    $(`[data-annotation-id="${formData.aid}"]`).removeClass("show"); //this is a note annotation, no selected text, add page title to formData
    //if ($(".transcript .annotation-edit").hasClass("annotation-note")) {

    if ($(".transcript .annotation-edit").hasClass("note-style-bookmark")) {
      formData.bookTitle = $("#book-title").text();
    } //get links from annotation


    let links = linkArray.filter(l => l.deleted === false);

    if (links.length > 0) {
      formData.links = links;
    } else {
      //check for deleted links
      let deleted = linkArray.filter(l => l.deleted === true); //links were deleted so remove linkify icon from page if this is not a new annotation

      if (deleted.length > 0 && formData.creationDate.length > 0) {
        $(`i[data-link-aid="${formData.creationDate}"]`).remove();
      }
    }

    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].submit(formData);
    $(".transcript .annotation-edit").removeClass("annotation-edit annotation-note");
  });
}
/*
  Handle cancel button pressed on annotation form
*/


function cancelHandler() {
  $(".transcript").on("click", "#annotation-form .annotation-cancel", function (e) {
    e.preventDefault(); //enable text selection, disabled when annotation form open

    removeSelectionGuard();
    let formData = getFormData();
    unwrap(); //remove class "show" added when form was displayed

    $(`[data-annotation-id="${formData.aid}"]`).removeClass("show");
    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].cancel(formData);
    $(".transcript .annotation-edit").removeClass("annotation-edit");
  });
}
/*
  Handle share button pressed on annotation form
*/


function shareHandler() {
  $(".transcript").on("click", "#annotation-form .annotation-share", function (e) {
    e.preventDefault();
    let formData = getFormData();
    unwrap(); //remove class "show" added when form was displayed

    $(`[data-annotation-id="${formData.aid}"]`).removeClass("show"); //annotation.cancel(formData);

    $(".transcript .annotation-edit").removeClass("annotation-edit");
    let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();

    if (!userInfo) {
      userInfo = {
        userId: "xxx"
      };
    } //this is really the annotation-id not the aid


    let annotation_id = formData.aid;
    let aid;
    let rangeArray = [formData.rangeStart, formData.rangeEnd];
    let numericRange = rangeArray.map(r => parseInt(r.substr(1), 10));
    let pid = rangeArray[0]; //get the real aid

    if (annotation_id.length > 0) {
      aid = $(`[data-annotation-id="${annotation_id}"]`).attr("data-aid");
      $(`[data-annotation-id="${annotation_id}"]`).addClass("show"); //aid is undefined when new annotations are shared, the real aid is the annotation
      //creationDate. If aid is undefined try to get the creationDate from local store

      if (!aid) {
        aid = _bookmark__WEBPACK_IMPORTED_MODULE_2__["localStore"].getCreationDate(annotation_id);
        $(`[data-annotation-id="${annotation_id}"]`).attr("data-aid", aid);
      }
    } else {
      aid = $(`#${pid} > span.pnum`).attr("data-aid");
    }

    let url = `${location.origin}${location.pathname}?as=${pid}:${aid}:${userInfo.userId}`;
    let annotationRange = lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(numericRange[0], numericRange[1] + 1);
    let header2;

    if (userInfo.userId === "xxx") {
      header2 = `
        <h4 class="ui left floated header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m11")}" class="red window close outline icon"></i>
          <div class="content">
            ${formData.Comment}
          </div>
        </h4>
        <h4 class="ui right floated header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:closewin")}" class="share-annotation window close icon"></i>
        </h4>
      `;
    } else {
      header2 = `
        <h4 class="ui left floated header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:fbshare")}" class="share-annotation facebook icon"></i>
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:emailshare")}" class="share-annotation envelope outline icon"></i>
          <i data-clipboard-text="${url}" title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:cp2clip")}" class="share-annotation linkify icon"></i>
          <div class="content">
            ${formData.Comment}
          </div>
        </h4>
        <h4 class="ui right floated header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("action:closewin")}" class="share-annotation window close icon"></i>
        </h4>
      `;
    }

    for (let i = 0; i < annotationRange.length; i++) {
      if (i === 0) {
        $(`#p${annotationRange[i]}`).addClass("selected-annotation clearBoth");
      } else {
        $(`#p${annotationRange[i]}`).addClass("selected-annotation");
      }
    }

    $(".selected-annotation").wrapAll("<div class='selected-annotation-wrapper ui clearing raised segment'></div>");
    $(".selected-annotation-wrapper").prepend(header2);

    if (userInfo.userId !== "xxx") {
      _clipboard__WEBPACK_IMPORTED_MODULE_5__["default"].register(".share-annotation.linkify");
    }
  }); //init click handler for FB and email share dialog

  Object(_navigator__WEBPACK_IMPORTED_MODULE_4__["initShareDialog"])("annotate.js");
}
/*
  bookmark deleted
*/


function deleteHandler() {
  $(".transcript").on("click", "#annotation-form .annotation-delete", function (e) {
    e.preventDefault(); //enable text selection, disabled when annotation form open

    removeSelectionGuard();
    let formData = getFormData();
    unwrap(); //add links to formData so the linkify icon can be removed

    let links = linkArray;

    if (links.length > 0) {
      formData.links = links;
    }

    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].delete(formData);
    $(".transcript .annotation-edit").removeClass("annotation-edit");
  });
}
/*
  initialize annotation event handlers
*/


function initialize(constants) {
  if (constants) {
    teaching = constants;
  } else {
    teaching = Object(_bookmark__WEBPACK_IMPORTED_MODULE_2__["getTeachingInfo"])();
  }

  submitHandler();
  cancelHandler();
  shareHandler();
  deleteHandler();
  editHandler();
  noteHandler();
  hoverHandler();
  noteToggle();
  createLinkHandlers();
  getReferenceHandler();
  hoverNoteHandler();
}
/*
  Display annotation form
  args:
    highlight - highlighted text object
  */

function getUserInput(highlight) {
  //don't allow multiple annotation forms to be open at the same time
  // - if open cancel the highlight
  if (annotationFormOpen(highlight.pid) || bookmarkNavigatorActive()) {
    _bookmark__WEBPACK_IMPORTED_MODULE_2__["annotation"].cancel({
      aid: highlight.id
    });
    return;
  } //.disable-selection will prevent text selection during annotation creation/edit


  addSelectionGuard();
  $(`#${highlight.pid}`).addClass("annotation-edit");
  $(".annotation-edit").wrapAll(wrapper); //$(".annotate-wrapper").prepend(form);

  $(".annotate-wrapper").prepend(getAnnotationForm());
  getTopicList(highlight.pid, highlight.id); //show this highlight, all others are hidden

  $(`[data-annotation-id="${highlight.id}"]`).addClass("show");
}
/*
  remove annotation form
*/

function unwrap() {
  $(".annotate-wrapper > form").remove();
  $(".annotate-wrapper > .note-and-links").remove();
  $(".annotation-edit").unwrap();
} //generate the option element of a select statement


function generateOption(topic) {
  if (typeof topic === "object") {
    return `<option value="${topic.value}">${topic.topic}</option>`;
  } else {
    return `<option value="${topic}">${topic}</option>`;
  }
}

function makeTopicSelect(topics) {
  return `
    <select name="topicList" id="annotation-topic-list" multiple="" class="search ui dropdown">
      <option value="">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("label:selecttopic")}</option>
      ${topics.map(topic => `${generateOption(topic)}`).join("")}
    </select>
  `;
}

function getTopicList(pid, aid, data) {
  //get topics from server or local storage
  _bmnet__WEBPACK_IMPORTED_MODULE_0__["default"].fetchTopics().then(response => {
    let selectHtml = makeTopicSelect(response.topics);
    $("#available-topics").html(selectHtml); //init annotation form components

    $("select.dropdown").dropdown(); //init form

    initializeForm(pid, aid, data);
  }).catch(error => {
    console.error("topic fetch error: ", error);
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("annotate:m12")}: ${error}`);
  });
}

/***/ }),

/***/ "./src/js/modules/_bookmark/bmnet.js":
/*!*******************************************!*\
  !*** ./src/js/modules/_bookmark/bmnet.js ***!
  \*******************************************/
/*! exports provided: netInit, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "netInit", function() { return netInit; });
/* harmony import */ var _ajax_annotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_ajax/annotation */ "./src/js/modules/_ajax/annotation.js");
/* harmony import */ var _ajax_topics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_ajax/topics */ "./src/js/modules/_ajax/topics.js");
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bookmark */ "./src/js/modules/_bookmark/bookmark.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/*
  Bookmark data implementation

  Bookmarks for signed in users are queried from and stored to the server. See the
  cmi-api/bookmark repository for API.

  For signed in users, when a transcript page is loaded bookmarks are queried from the server
  and stored locally. Bookmarks for users not signed in are stored only to local storage.

  Operations for create, modify, and delete are performed locally and sent to the server
  for signed in users.
*/








var teaching = {};
function netInit(constants) {
  teaching = constants;
}
/*
 * Persist annotation to DynamoDb
 *
 * Args:
 *  annotation: required
 *  pageKey: passed by topicmanager.js only
 *  addToLocalStorage: passed as false by topicmanager
 *
 * LocalStorage is updated when addToLocalStorage = true, otherwise
 * not. It's not needed when called by topicmanager.
 *
 * New annotations are recognized when annotation.creationDdate is null
 */

function postAnnotation(annotation, pageKey, addToLocalStorage = true) {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();
  let calledByTopicMgr = true; //the annotation creation data; aka creationDate, annotationId, aid

  let now = Date.now(); //this is critical, things get messed up if we don't do this

  let serverAnnotation = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_5___default()(annotation); //modified is added by topicmgr.js

  if (serverAnnotation.modified) {
    delete serverAnnotation.modified;
  }

  let wrapFunction;

  if (serverAnnotation.selectedText) {
    //don't save wrap() to db but we do need it so save it and put
    //it back before we save it to local store
    wrapFunction = serverAnnotation.selectedText.wrap;
    delete serverAnnotation.selectedText.wrap; //selectedText is already stringified when called by topicmgr.js

    if (typeof serverAnnotation.selectedText !== "string") {
      if (!serverAnnotation.selectedText.aid) {
        serverAnnotation.selectedText.aid = now.toString(10);
      } //convert selectedText to JSON


      serverAnnotation.selectedText = JSON.stringify(serverAnnotation.selectedText);
    }
  }

  let creationDate = serverAnnotation.creationDate ? serverAnnotation.creationDate : now;

  if (!pageKey) {
    pageKey = teaching.keyInfo.genParagraphKey(serverAnnotation.rangeStart);
  }

  Object(_ajax_annotation__WEBPACK_IMPORTED_MODULE_0__["postAnnotation"])(userInfo.userId, pageKey, creationDate, serverAnnotation).then(resp => {
    if (addToLocalStorage) {
      if (serverAnnotation.selectedText) {
        serverAnnotation.selectedText = JSON.parse(serverAnnotation.selectedText);

        if (wrapFunction) {
          serverAnnotation.selectedText.wrap = wrapFunction;
        }
      }

      try {
        _bookmark__WEBPACK_IMPORTED_MODULE_3__["localStore"].addItem(userInfo.userId, pageKey, creationDate, serverAnnotation);
      } catch (err) {
        console.error(`Error saving annotation to localStore: ${err}`);
      }
    }
  }).catch(err => {
    console.error(`Error saving annotation: ${err}`);
    toastr__WEBPACK_IMPORTED_MODULE_4___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_7__["getString"])("error:e1"));
  });
  return creationDate;
}
/*
  Delete the annotation 'creationDate' for bookmark 'pid'
*/


function deleteAnnotation(pid, creationDate) {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();
  return new Promise(async (resolve, reject) => {
    const paraKey = teaching.keyInfo.genParagraphKey(pid);

    try {
      let response = await Object(_ajax_annotation__WEBPACK_IMPORTED_MODULE_0__["deleteAnnotation"])(userInfo.userId, paraKey, creationDate);
      let result = _bookmark__WEBPACK_IMPORTED_MODULE_3__["localStore"].deleteItem(userInfo.userId, paraKey, creationDate);
      resolve(result.remaining);
    } catch (err) {
      reject(err);
    }
  });
}
/*
  Fetch Indexing topics
  args: force=true, get topics from server even when we have them cached

  topics are cached for 2 hours (1000 * 60sec * 60min * 2) before being requested
  from server
*/


function fetchTopics() {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_6__["getUserInfo"])();
  let topics = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("bmTopics"); //keep topics in cache for 2 hours

  const retentionTime = 60 * 1000 * 60 * 2;
  return new Promise((resolve, reject) => {
    if (topics && topics.lastFetchDate + retentionTime > Date.now()) {
      resolve(topics);
      return;
    }

    let sourceId = teaching.sourceId.toString(10); //user signed in, we need to get topics from server

    Object(_ajax_topics__WEBPACK_IMPORTED_MODULE_1__["getTopicList"])(userInfo.userId, sourceId).then(topicList => {
      let topicInfo = {
        lastFetchDate: Date.now(),
        topics: topicList
      };
      Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeSet"])("bmTopics", topicInfo);
      resolve(topicInfo);
    }).catch(error => {
      console.error("Error fetching topicList: ", error);
      reject(error);
    });
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  fetchTopics: fetchTopics,
  deleteAnnotation: deleteAnnotation,
  postAnnotation: postAnnotation
});

/***/ }),

/***/ "./src/js/modules/_bookmark/bookmark.js":
/*!**********************************************!*\
  !*** ./src/js/modules/_bookmark/bookmark.js ***!
  \**********************************************/
/*! exports provided: localStore, getTeachingInfo, processBookmark, setQuickLinks, initBookmarkFeature, annotation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "localStore", function() { return localStore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTeachingInfo", function() { return getTeachingInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "processBookmark", function() { return processBookmark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setQuickLinks", function() { return setQuickLinks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initBookmarkFeature", function() { return initBookmarkFeature; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "annotation", function() { return annotation; });
/* harmony import */ var _ajax_annotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_ajax/annotation */ "./src/js/modules/_ajax/annotation.js");
/* harmony import */ var _ajax_topics__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_ajax/topics */ "./src/js/modules/_ajax/topics.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var _localStore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./localStore */ "./src/js/modules/_bookmark/localStore.js");
/* harmony import */ var _util_sanitize__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_util/sanitize */ "./src/js/modules/_util/sanitize.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _bmnet__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./bmnet */ "./src/js/modules/_bookmark/bmnet.js");
/* harmony import */ var lodash_differenceWith__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash/differenceWith */ "./node_modules/lodash/differenceWith.js");
/* harmony import */ var lodash_differenceWith__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_differenceWith__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! lodash/cloneDeep */ "./node_modules/lodash/cloneDeep.js");
/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var lodash_startCase__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! lodash/startCase */ "./node_modules/lodash/startCase.js");
/* harmony import */ var lodash_startCase__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(lodash_startCase__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _util_url__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../_util/url */ "./src/js/modules/_util/url.js");
/* harmony import */ var _navigator__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./navigator */ "./src/js/modules/_bookmark/navigator.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./list */ "./src/js/modules/_bookmark/list.js");
/* harmony import */ var _topics__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./topics */ "./src/js/modules/_bookmark/topics.js");
/* harmony import */ var _selection__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./selection */ "./src/js/modules/_bookmark/selection.js");
/* harmony import */ var _annotate__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./annotate */ "./src/js/modules/_bookmark/annotate.js");
/* harmony import */ var _util_cmi__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../_util/cmi */ "./src/js/modules/_util/cmi.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");


















 //teaching specific constants, assigned at initialization

let teaching = {}; //manages bookmark store for bookmarks on page

let localStore;
function getTeachingInfo() {
  return teaching;
}
let counter = new Map();

function getCount(pid) {
  let count = counter.get(pid);

  if (typeof count === "undefined") {
    counter.set(pid, 0);
    return 0;
  } else {
    count += 1;
    counter.set(pid, count);
    return count;
  }
}

function loadSelectedTextBookmark(bm, sharePid) {
  $(`#p${bm.pid} > span.pnum`).addClass("has-bookmark");
  Object(_selection__WEBPACK_IMPORTED_MODULE_15__["markSelection"])(bm.annotation.selectedText, getCount(bm.pid), sharePid);
  addTopicsAsClasses(bm.annotation);
  setQuickLinks(bm.annotation, "highlight");
}

function loadNoteStyleBookmark(bm) {
  addNoteHighlight(bm.pid, bm.annotation);
  setQuickLinks(bm.annotation, "note");
}

function loadBookmark(bm, sharePid) {
  let type = bm.annotation.selectedText ? "selectedText" : "note";
  type === "selectedText" ? loadSelectedTextBookmark(bm) : loadNoteStyleBookmark(bm);
}

function createSelectedTextBookmark(bm, count) {
  $(`#p${bm.pid} > span.pnum`).addClass("has-bookmark");
  Object(_selection__WEBPACK_IMPORTED_MODULE_15__["markSelection"])(bm.annotation.selectedText, count);
  addTopicsAsClasses(bm.annotation);
  setQuickLinks(bm.annotation, "highlight"); //add creationDate

  $(`[data-annotation-id="${bm.annotation.aid}"]`).attr("data-aid", bm.creationDate);
}

function createNoteStyleBookmark(bm) {
  addNoteHighlight(bm.pid, bm.annotation);
  setQuickLinks(bm.annotation, "note"); //add creationDate

  $(`#${bm.annotation.rangeStart} > span.pnum`).attr("data-aid", bm.creationDate);
}

function deleteSelectedTextBookmark(bm) {
  Object(_selection__WEBPACK_IMPORTED_MODULE_15__["deleteSelection"])(bm.annotation.aid);
}

function deleteNoteStyleBookmark(bm) {
  removeNoteHighlight(bm);
}

function createBookmark(bm, count) {
  let type = bm.annotation.selectedText ? "selectedText" : "note";
  type === "selectedText" ? createSelectedTextBookmark(bm, count) : createNoteStyleBookmark(bm);
}

function deleteBookmark(bm, remainingCount) {
  let type = bm.annotation.selectedText ? "selectedText" : "note";
  type === "selectedText" ? deleteSelectedTextBookmark(bm) : deleteNoteStyleBookmark(bm);

  if (bm.annotation.links) {
    $(`i[data-link-aid="${bm.creationDate}"]`).remove();
  }

  if (remainingCount === 0) {
    $(`#${bm.annotation.rangeStart} > span.pnum`).removeClass("has-bookmark");
  }
}
/**
 * Process each bookmark loaded, created, updated, or deleted
 * - process includes highlighting selected text and note paragraphs,
 *   setting quick links and filtering by topic
 */


function processBookmark(status, bm, arg) {
  switch (status) {
    case "loaded":
      loadBookmark(bm, arg);
      break;

    case "created":
      createBookmark(bm, arg);
      break;

    case "updated":
      Object(_selection__WEBPACK_IMPORTED_MODULE_15__["updateSelectionTopicList"])(bm.annotation);
      updateNoteHighlight(bm);
      break;

    case "deleted":
      deleteBookmark(bm, arg);
      break;
  }
}

function formatLink(link) {
  let raw = JSON.parse(link.link);
  let href = getLinkHref(raw);
  let display = `${raw.desc.source}:${raw.desc.book}:${raw.desc.unit}`; //WOM has questions

  if (raw.desc.question) {
    display = `${display}:${raw.desc.question}:${raw.desc.pid}`;
  } else {
    display = `${display}:${raw.desc.pid}`;
  }

  return `<a class="item" href="${href}">${link.reference}[${display}]</a>`;
} //generate html for bookmark links


function generateLinkList(links) {
  return `
    ${links.map(item => `
      ${formatLink(item)}
    `).join("")}
  `;
} // --------------- begin Bookmark DOM -------------------------

/**
 * Add classes to selectedText bookmarks for each topic
 *
 * @param <object> - the annotation
 */


function addTopicsAsClasses(bookmark) {
  if (bookmark.topicList && bookmark.topicList.length > 0) {
    let topicList = bookmark.topicList.reduce((result, topic) => {
      return `${result} ${topic.value}`;
    }, "");
    $(`[data-annotation-id="${bookmark.aid}"]`).addClass(topicList);
  }
}
/*
 * Remove note highlight and add it back in case the range
 * has changed in the updated bookmark
 */


function updateNoteHighlight(bm) {
  //return in not a note style bookmark
  if (bm.annotation.selectedText) {
    return;
  }

  let start = parseInt(bm.annotation.rangeStart.substr(1), 10);
  let end = parseInt(bm.annotation.rangeEnd.substr(1), 10);
  let pid = start;
  let done = false; //remove current highlight

  do {
    $(`#p${start}`).removeClass("note-style-bookmark");
    $(`#p${start}`).removeClass("note-style-bookmark-start");

    if ($(`#p${start}`).hasClass("note-style-bookmark-end")) {
      $(`#p${start}`).removeClass("note-style-bookmark-end");
      done = true;
    }

    start++;
  } while (!done); //add new highlight


  start = pid;

  do {
    $(`#p${start}`).addClass("note-style-bookmark");

    if (start === pid) {
      $(`#p${start}`).addClass("note-style-bookmark-start");
    }

    if (start === end) {
      $(`#p${start}`).addClass("note-style-bookmark-end");
    }

    start++;
  } while (start <= end);
}

function addNoteHighlight(pid, bm) {
  $(`#p${pid} > span.pnum`).addClass("has-annotation").attr("data-aid", bm.creationDate); //mark all paragraphs in bookmark with class .note-style-bookmark

  let end = parseInt(bm.rangeEnd.substr(1), 10);
  let start = pid;

  do {
    $(`#p${start}`).addClass("note-style-bookmark");

    if (start === pid) {
      $(`#p${start}`).addClass("note-style-bookmark-start");
    }

    if (start === end) {
      $(`#p${start}`).addClass("note-style-bookmark-end");
    }

    start++;
  } while (start <= end);
}

function removeNoteHighlight(bm) {
  //remove mark from paragraph
  $(`#${bm.annotation.rangeStart} > span.pnum`).removeClass("has-annotation"); //remove all paragraphs in bookmark with class .note-style-bookmark

  let end = parseInt(bm.annotation.rangeEnd.substr(1), 10);
  let start = parseInt(bm.annotation.rangeStart.substr(1), 10);
  let pid = start;

  do {
    $(`#p${start}`).removeClass("note-style-bookmark");

    if (start === pid) {
      $(`#p${start}`).removeClass("note-style-bookmark-start");
    }

    if (start === end) {
      $(`#p${start}`).removeClass("note-style-bookmark-end");
    }

    start++;
  } while (start <= end);
}
/*
  Add linkify icon after bookmark so user can click to view links
*/


function setQuickLinks(bm, type) {
  if (bm.links) {
    $(`[data-aid="${bm.creationDate}"]`).eq(-1).after(`<i data-link-aid="${bm.creationDate}" data-type="${type}" class="small bm-link-list linkify icon"></i>`);
  }
} // --------------- end Bookmark DOM -------------------------

/*
  Bookmark link click handler. Links are placed on both note and selected text
  bookmarks. When clicked, get the bookmark and display a list of links defined
  in the bookmark. User can optionally click a  link.
*/

function initBmLinkHandler() {
  $(".transcript").on("click", ".bm-link-list.linkify", function (e) {
    e.preventDefault();
    let type = $(this).attr("data-type");
    let pid = $(this).parent("p").attr("id");
    let aid;

    if (type === "note") {
      //aid = parseInt($(this).prev("span").attr("data-aid"), 10);
      aid = $(this).prev("span").attr("data-aid");
    } else if (type === "highlight") {
      //aid = parseInt($(this).prev("mark").attr("data-annotation-id"), 10);
      aid = $(this).prev("mark").attr("data-annotation-id");
    } //bookmark wont be found if it is still being created


    let bkmrk = localStore.getItem(pid, aid); //sometimes the annotation won't be found because it is being created, so just return

    if (!bkmrk) {
      return;
    }

    let linkList = generateLinkList(bkmrk.annotation.links);
    $(".bm-link-list-popup").html(linkList);
    $(this).popup({
      popup: ".bm-link-info.popup",
      hoverable: true,
      on: "click"
    }).popup("show");
  });
}
/*
  Clean up form values and prepare to send to API
*/


function createAnnotation(formValues) {
  let annotation = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_9___default()(formValues);
  annotation.rangeStart = annotation.rangeStart.trim();
  annotation.rangeEnd = annotation.rangeEnd.trim();

  if (!annotation.rangeEnd.startsWith("p")) {
    annotation.rangeEnd = `p${annotation.rangeEnd}`;
  } //delete empty fields


  if (annotation.Comment === "") {
    delete annotation.Comment;
  } else {
    annotation.Comment = Object(_util_sanitize__WEBPACK_IMPORTED_MODULE_5__["purify"])(annotation.Comment);
  }

  if (annotation.Note === "") {
    delete annotation.Note;
  } else {
    annotation.Note = Object(_util_sanitize__WEBPACK_IMPORTED_MODULE_5__["purify"])(annotation.Note);
  }

  if (annotation.creationDate === "") {
    delete annotation.creationDate;
  }

  if (annotation.aid === "") {
    delete annotation.aid;
  } else {
    annotation.selectedText = Object(_selection__WEBPACK_IMPORTED_MODULE_15__["getSelection"])(annotation.aid); //make sure rangeEnd === rangeStart for selected text bookmarks

    annotation.rangeEnd = annotation.rangeStart;

    if (annotation.creationDate) {
      annotation.selectedText.aid = annotation.creationDate.toString(10);
    }

    delete annotation.textId;
  }

  if (annotation.topicList.length === 0) {
    delete annotation.topicList;
  }

  delete annotation.newTopics;
  delete annotation.hasAnnotation; // add summary from any topic into the annotation

  if (annotation.status === "update") {
    let bkmrk = localStore.getItem(annotation.rangeStart, annotation.aid);
    bkmrk.annotation.topicList.forEach(i => {
      if (i.summary) {
        let topic = annotation.topicList.find(t => t.value === i.value);

        if (topic) {
          topic.summary = i.summary;
        }
      }
    }); // console.log("annotation: %o", annotation);
    // console.log("bookmark: %o", bkmrk);
  } //persist the bookmark


  _bmnet__WEBPACK_IMPORTED_MODULE_7__["default"].postAnnotation(annotation);
}
/*
  new topics entered on the annotation form are formatted
  to keep only alpha chars and comma. Commas are used to delimit
  topics.

  Topics are converted from string to array and first character is
  uppercased.

  Multi word topics are supported. Each word is capitalized and the topic
  is formatted as an object like so:

    {value: "HolySpirit", topic: "Holy Spirit"}
*/


function formatNewTopics({
  newTopics
}) {
  //only allow digits, alpha chars (including Polish chars) and comma's and spaces
  let topics = newTopics.replace(/[^a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ, ]/g, "");

  if (!topics || topics === "") {
    return [];
  } //remove leading and trailing comma's


  topics = topics.replace(/^,*/, "");
  topics = topics.replace(/,*$/, "");
  let newTopicArray = topics.split(",");
  newTopicArray = newTopicArray.map(t => t.trim());
  newTopicArray = newTopicArray.map(t => lodash_startCase__WEBPACK_IMPORTED_MODULE_10___default()(t));
  newTopicArray = newTopicArray.map(t => {
    if (/ /.test(t)) {
      return {
        value: t.replace(/ /g, ""),
        topic: t
      };
    } else {
      return {
        value: t,
        topic: t
      };
    }
  });
  return newTopicArray;
}
/*
  Add new topics entered by user on annotation form to topic list
  and store locally and on the server
  - then create and submit new annotation
*/


function addToTopicList(newTopics, formValues) {
  //Check for new topics already in topic list
  _bmnet__WEBPACK_IMPORTED_MODULE_7__["default"].fetchTopics().then(topicList => {
    //remove duplicate topics from and return the rest in difference[]
    let newUniqueTopics = lodash_differenceWith__WEBPACK_IMPORTED_MODULE_8___default()(newTopics, topicList.topics, (n, t) => {
      return t.value === n.value;
    }); //these are the new topics

    if (newUniqueTopics.length > 0) {
      //add new topics to topic list
      let newTopicList = topicList.topics.concat(newUniqueTopics); //sort topic list

      newTopicList.sort((a, b) => {
        let aValue, bValue; //objects have value and topic keys, sort them by topic

        aValue = a.topic.toLowerCase();
        bValue = b.topic.toLowerCase();

        if (aValue < bValue) {
          return -1;
        }

        if (aValue > bValue) {
          return 1;
        }

        return 0;
      }); //update local storage

      topicList.topics = newTopicList;
      Object(_util_store__WEBPACK_IMPORTED_MODULE_3__["storeSet"])("bmTopics", topicList);
      let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])();
      let sourceId = `${teaching.sourceId}`; //write the new list to the db

      Object(_ajax_topics__WEBPACK_IMPORTED_MODULE_1__["putTopicList"])(userInfo.userId, sourceId, newTopicList); //add new topics to this annotations topicList

      formValues.topicList = formValues.topicList.concat(newUniqueTopics); //add newTopics to formValues for posting to server

      formValues.newTopics = newUniqueTopics; //post the bookmark

      createAnnotation(formValues);
    }
  }).catch(err => {
    throw new Error(`bookmark.js:addToTopicList() error: ${err}`);
  });
} //toggle selected text highlights


function highlightHandler() {
  $(".toggle-bookmark-highlight").on("click", function (e) {
    e.preventDefault();
    let el = $(".transcript");

    if (el.hasClass("hide-bookmark-highlights")) {
      el.removeClass("hide-bookmark-highlights");
      $(".toggle-bookmark-highlight").text("Hide Highlighted Text");
    } else {
      el.addClass("hide-bookmark-highlights");
      $(".toggle-bookmark-highlight").text("Show Highlighted Text");
    }
  });
}
/*
 * Turn off/on bookmark creation feature. When feature is enabled users cannot select
 * and copy text from transcript
 */


function bookmarkFeatureHandler() {
  $("#bookmark-toggle-disable-selection").on("click", function (e, show) {
    e.preventDefault();
    let showMessage = true;

    if (show !== "undefined") {
      showMessage = show === "false" ? false : true;
    }

    let el = $(".transcript");

    if (el.hasClass("disable-selection") && el.hasClass("user")) {
      Object(_language_lang__WEBPACK_IMPORTED_MODULE_18__["getString"])("menu:m1", true, "Disable Bookmark Creation").then(value => {
        el.removeClass("disable-selection user");
        $(".toggle-bookmark-selection").text(value);
        $("#bookmark-dropdown-menu > span  i.bookmark-corner-icon").addClass("hide");

        if (showMessage) {
          toastr__WEBPACK_IMPORTED_MODULE_6___default.a.success("Bookmark Creation Enabled");
        }

        Object(_util_store__WEBPACK_IMPORTED_MODULE_3__["storeSet"])("bmCreation", "enabled");
      });
    } else {
      Object(_language_lang__WEBPACK_IMPORTED_MODULE_18__["getString"])("menu:m2", true, "Enable Bookmark Creation").then(value => {
        el.addClass("disable-selection user");
        $(".toggle-bookmark-selection").text(value);
        $("#bookmark-dropdown-menu > span  i.bookmark-corner-icon").removeClass("hide");

        if (showMessage) {
          toastr__WEBPACK_IMPORTED_MODULE_6___default.a.success("Bookmark Creation Disabled");
        }

        Object(_util_store__WEBPACK_IMPORTED_MODULE_3__["storeSet"])("bmCreation", "disabled");
      });
    }
  });
}
/*
 * The bookmark feature is initially enabled. Check local storage to see if
 * it has been disabled by the user. If so, disable it on page load.
 *
 * If the user has not set bookmark creation default it to disabled. I think
 * many users may want to copy text but can't because the bookmark dialog displays
 * on text selection. They don't try to figure out why and stop using the site.
 */


function initializeBookmarkFeatureState() {
  let state = Object(_util_store__WEBPACK_IMPORTED_MODULE_3__["storeGet"])("bmCreation");

  if (state && state === "enabled") {
    return;
  } //set to disabled


  $("#bookmark-toggle-disable-selection").trigger("click", "false");
}
/**
 * Get and activate annotations for the current page.
 *
 * @params {string} sharePid - is not null when bookmark is shared on page.
 */


async function getPageBookmarks(sharePid) {
  let pageKey = teaching.keyInfo.genPageKey();
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])();

  if (!userInfo) {
    return;
  }

  try {
    //query annotations from database
    let bmList = await Object(_ajax_annotation__WEBPACK_IMPORTED_MODULE_0__["getAnnotations"])(userInfo.userId, pageKey); //store annotations locally

    localStore = new _localStore__WEBPACK_IMPORTED_MODULE_4__["BookmarkLocalStore"](bmList, sharePid);

    if (bmList.length > 0) {
      Object(_topics__WEBPACK_IMPORTED_MODULE_14__["bookmarksLoaded"])();
    }
  } catch (err) {
    console.error(err); //Notify error 
  }
}
/*
  initialize transcript page
*/


function initTranscriptPage(sharePid, constants) {
  //bookmarks are supported only for signed in users
  // this should work for users not signed in
  let topicInfo = Object(_util_url__WEBPACK_IMPORTED_MODULE_11__["showTopicBookmark"])();

  if (topicInfo) {
    Object(_navigator__WEBPACK_IMPORTED_MODULE_12__["initTopicNavigator"])(topicInfo, constants);
  }

  if (!Object(_user_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])()) return; // disable bookmarks when topic navigator is active
  // - bookmarks are enabled when the navigator is closed

  if (!topicInfo) {
    initBookmarkFeature(sharePid, constants);
  } //setup bookmark navigator if requested


  let pid = Object(_util_url__WEBPACK_IMPORTED_MODULE_11__["showBookmark"])();

  if (pid) {
    Object(_navigator__WEBPACK_IMPORTED_MODULE_12__["initNavigator"])(pid, constants);
  }
}

function initBookmarkFeature(sharePid, constants) {
  //get existing bookmarks for page
  getPageBookmarks(sharePid); //add support for text selection

  Object(_selection__WEBPACK_IMPORTED_MODULE_15__["initialize"])(constants); //show/hide bookmark highlights

  highlightHandler(); //disable/enable bookmark creation feature

  bookmarkFeatureHandler();
  initializeBookmarkFeatureState(); //setup bookmark link listener

  createLinkListener(_annotate__WEBPACK_IMPORTED_MODULE_16__["getLink"]);
  initBmLinkHandler();
}
const annotation = {
  /*
    This is called when user submits data from annotation form.
    args:
      formData: annotation form data
  */
  submit(formData) {
    let newTopics = formatNewTopics(formData); //add new topics to topic list and create annotation

    if (newTopics.length > 0) {
      addToTopicList(newTopics, formData);
    } else {
      //post the bookmark
      createAnnotation(formData);
    }
  },

  //user pressed cancel on annotation form
  cancel(formData) {
    //no creationDate means a new annotation that hasn't been stored
    if (!formData.creationDate && formData.aid) {
      Object(_selection__WEBPACK_IMPORTED_MODULE_15__["deleteNewSelection"])(formData.aid);
    }
  },

  //delete annotation
  async delete(formData) {
    //if annotation has selected text unwrap and delete it

    /*
    if (formData.aid) {
      deleteSelection(formData.aid);
    }
    else {
      //remove mark from paragraph
      $(`#${formData.rangeStart} > span.pnum`).removeClass("has-annotation");
       //remove all paragraphs in bookmark with class .note-style-bookmark
      let end = parseInt(formData.rangeEnd.substr(1), 10);
      let start = parseInt(formData.rangeStart.substr(1), 10);
      let pid = start;
      do {
        $(`#p${start}`).removeClass("note-style-bookmark");
        if (start === pid) {
          $(`#p${start}`).removeClass("note-style-bookmark-start");
        }
        if (start === end) {
          $(`#p${start}`).removeClass("note-style-bookmark-end");
        }
        start++;
      } while(start <= end);
    }
     //if annotation has links, remove the linkify icon
    if (formData.links) {
      $(`i[data-link-aid="${formData.creationDate}"]`).remove();
    }
    */
    //mark as having no annotations if all have been deleted
    try {
      await _bmnet__WEBPACK_IMPORTED_MODULE_7__["default"].deleteAnnotation(formData.rangeStart, formData.creationDate);
      /*
      if (remainingAnnotations === 0) {
        $(`#${formData.rangeStart} > span.pnum`).removeClass("has-bookmark");
      }
      */
    } catch (err) {
      throw new Error(err);
    }
  }

};

function getLinkHref(link) {
  let url = Object(_util_cmi__WEBPACK_IMPORTED_MODULE_17__["getUrlByPageKey"])(link.key);

  if (location.pathname === url) {
    return `#${link.desc.pid}`;
  }

  return `${url}?v=${link.desc.pid}`;
}

function createLinkListener(getLink) {
  $(".transcript").on("click", "td.follow-link-item", function (e) {
    e.preventDefault(); //get link info

    let index = $(this).parent("tr").attr("data-index");
    let linkInfo = getLink(index); //build url

    let link = JSON.parse(linkInfo.link); //console.log("url: %s", url);

    location.href = getLinkHref(link);
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function (pid, constants) {
    teaching = constants; //provide teaching constants to bmnet

    Object(_bmnet__WEBPACK_IMPORTED_MODULE_7__["netInit"])(teaching);

    if ($(".transcript").length) {
      //this is a transcript page
      initTranscriptPage(pid, constants);
    } //initialize bookmark list modal - available on all pages


    _list__WEBPACK_IMPORTED_MODULE_13__["default"].initialize(constants);
  }
});

/***/ }),

/***/ "./src/js/modules/_bookmark/clipboard.js":
/*!***********************************************!*\
  !*** ./src/js/modules/_bookmark/clipboard.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! clipboard */ "./node_modules/clipboard/dist/clipboard.js");
/* harmony import */ var clipboard__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(clipboard__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");


 //var clipboard;

var clipboard = new Map();

function setEvents(clip) {
  clip.on("success", e => {
    //console.log("e.text: %s", e.text);
    if (e.text.indexOf("tocbook") > -1) {
      //modal dialog is displayed so notify won't work
      $(".toc.modal > .message").html(`<p>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("clip:url")}</p>`);
      setTimeout(() => {
        $(".toc.modal > .message > p").remove();
      }, 2000);
    } else {
      toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("clip:link"));
    }

    e.clearSelection();
  });
  clip.on("error", () => {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("error:e3"));
  });
}

function createInstance(selector) {
  var object = new clipboard__WEBPACK_IMPORTED_MODULE_0___default.a(selector);
  setEvents(object);
  return object;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  register: function (selector) {
    let clip = clipboard.get(selector);

    if (!clip) {
      clip = createInstance(selector);
      clipboard.set(selector, clip);
    }

    return clip;
  },
  destroy: function (selector) {
    let clip = clipboard.get(selector);

    if (clip) {
      clip.destroy();
      clipboard.delete(selector);
    }
  }
});

/***/ }),

/***/ "./src/js/modules/_bookmark/list.js":
/*!******************************************!*\
  !*** ./src/js/modules/_bookmark/list.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ajax_annotation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_ajax/annotation */ "./src/js/modules/_ajax/annotation.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/flatten */ "./node_modules/lodash/flatten.js");
/* harmony import */ var lodash_flatten__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_flatten__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/uniqWith */ "./node_modules/lodash/uniqWith.js");
/* harmony import */ var lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/*
 * _bookmark/list.js
 *
 * Manaage bookmark display modal dialog.
 *
 * Query bookmarks by sourceId and format data for display in
 * sorted order by book, chapter, and paragraph.
 *
 * Bookmarks are stored in local storage to avoid having to query
 * each time list is displayed unless bookmarks have been added,
 * deleted, or updated.
 *
 * Stored bookmarks are used by _bookmark/navigator.js to navigate
 * through the list of bookmarks.
 *
 * Requires that _includes/componetns/bookmark-modal.html is included
 * on page. Modal open on click of .bookmark.ui.modal.
 *
 */







const uiBookmarkModal = ".bookmark.ui.modal";
const uiOpenBookmarkModal = ".bookmark-modal-open";
const uiModalOpacity = 0.5; //teaching specific constants

let teaching = {}; //generate the option element of a select statement

function generateOption(topic) {
  if (typeof topic === "object") {
    return `<option value="${topic.value}">${topic.topic}</option>`;
  }

  return `<option value="${topic}">${topic}</option>`;
} //generate select html for Topics


function makeTopicSelect(topics) {
  return `
    <label>Filter Topic(s)</label>
    <select name="topicList" id="bookmark-topic-list" multiple="" class="search ui dropdown">
      <option value="">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("label:selecttopic")}</option>
      ${topics.map(topic => `${generateOption(topic)}`).join("")}
    </select>
  `;
}

function generateHorizontalList(listArray) {
  if (!listArray || listArray.length === 0) {
    return Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("annotate:m13");
  }

  return `
    <div class="ui horizontal bulleted list">
      ${listArray.map(item => `
        <div class="item">
          <em>${typeof item === "object" ? item.topic : item}</em>
        </div>
      `).join("")}
    </div>
  `;
}

function generateParagraphList(pid, bkmk, url, pTopicList) {
  if (bkmk.length === 0) {
    return `
      <div class="bookmark-item item"> <!-- ${pid} -->
        <i class="bookmark icon"></i>
        <div class="content">
          <div class="header">
            <a href="${url}?bkmk=${pid}">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("label:para")}: ${pid}</a>
          </div>
        </div>
      </div> <!-- item: ${pid} -->
    `;
  }

  let topicString = pTopicList.reduce((result, item) => {
    if (typeof item === "object") {
      return `${result} ${item.value}`;
    }

    return `${result} ${item}`;
  }, "");
  return `
    <div class="${topicString} bookmark-item item"> <!-- ${pid} -->
      <i class="bookmark icon"></i>
      <div class="content">
        <div class="header">
          <a href="${url}?bkmk=${pid}">${Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("label:para")}: ${pid}</a>
        </div>
        <div class="list">
          ${bkmk.map(annotation => `
            <div class="item"> <!-- item: ${annotation.rangeStart}/${annotation.rangeEnd} -->
              <i class="right triangle icon"></i>
              <div class="content">
                <div class="header">
                  ${generateHorizontalList(annotation.topicList)}
                </div>
                <div class="description">
                  ${annotation.Comment ? annotation.Comment : Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("annotate:m7")}
                </div>
              </div>
            </div> <!-- item: ${annotation.rangeStart}/${annotation.rangeEnd} -->
          `).join("")}
        </div>
      </div>
    </div> <!-- item: ${pid} -->
  `;
}

function generateBookmarksForPage(bookmarks, url) {
  let html = ""; //loop over all paragraphs containing bookmarks

  for (let pid in bookmarks) {
    //omit topic list keys
    if (!pid.startsWith("tpList")) {
      let paragraphId = `p${(parseInt(pid, 10) - 1).toString(10)}`;
      html += generateParagraphList(paragraphId, bookmarks[pid], url, bookmarks[`tpList${pid}`]);
    }
  }

  return html;
}

function generatePageTitle(page) {
  let title = `${page.title}`;

  if (page.subTitle) {
    title = `${title}: ${page.subTitle}`;
  }

  return title;
}

function generateBookmarksForBookPages(pages) {
  return `
    ${pages.map(page => `
      <div class="item"> <!-- item: ${page.title} -->
        <i class="file icon"></i>
        <div class="content">
          <div class="header">
            ${generatePageTitle(page)}
          </div>
          <div class="list">
            ${generateBookmarksForPage(page.bookmarks, page.url)}
          </div>
        </div>
      </div>
    `).join("")}
  `;
}

function generateBookmarkList(books) {
  if (books.length === 0) {
    return _language_lang__WEBPACK_IMPORTED_MODULE_6__["__lang"]`
      <h2 class="ui center aligned icon header">
        <i class="circular bookmark icon"></i>
        ${"bmlist:header"}
      </h2>
      <p>
        ${"bmlist:intro"}
      </p>
      <ul>
        <li>${"bmlist:item1"}</li>
        <li>${"bmlist:item2"}</li>
      </ul>
      <p>
        ${"bmlist:link"}
      </p>
    `;
  }

  return `
    ${books.map(book => `
      <div data-bid="${book.bookId}" class="item"> <!-- item: ${book.bookId} -->
        <div class="right floated content">
          <div data-book="${book.bookId}" class="green ui small button">Open</div>
        </div>
        <i class="book icon"></i>
        <div class="content">
          <div class="${book.bookId}-header header">
            ${book.bookTitle}
          </div>
          <div id="${book.bookId}-list" class="hide-bookmarks list">
            ${generateBookmarksForBookPages(book.pages)}
          </div>
        </div>
      </div> <!-- item: ${book.bookId} -->
    `).join("")}
  `;
}
/*
  The argument is an array of pages containing bookmarks. Create a new
  array with one entry per book with an array of pages for that book
*/


function combinePages(pages) {
  let books = {};
  let bookArray = []; //rearrange the data into a single object per page

  pages.forEach(page => {
    if (!books[page.bookId]) {
      books[page.bookId] = {};
      books[page.bookId].bookId = page.bookId;
      books[page.bookId].bookTitle = page.bookTitle;

      if (page.subTitle) {
        books[page.bookId].subTitle = page.subTitle;
      }

      books[page.bookId].pages = [];
    }

    let pageInfo = {
      pageKey: page.pageKey,
      title: page.title,
      url: page.url,
      bookmarks: page.data
    };

    if (page.subTitle) {
      pageInfo.subTitle = page.subTitle;
    }

    books[page.bookId].pages.push(pageInfo);
  }); //copy from books to bookArray keeping the original order

  pages.forEach(page => {
    if (books[page.bookId]) {
      bookArray.push(books[page.bookId]);
      delete books[page.bookId];
    }
  });
  let allTopics = []; //add a list of all topics used for each bookmark

  bookArray.forEach(book => {
    book.pages.forEach(page => {
      for (let pid in page.bookmarks) {
        //console.log(page.bookmarks[pid]);
        if (page.bookmarks[pid].length > 0) {
          let tpl = page.bookmarks[pid].map(annotation => {
            if (annotation.topicList) {
              return annotation.topicList;
            } else {
              //bookmark has no topics
              return [];
            }
          }); //collect all topics used for modal dropdown select control

          let uniqueArray = lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5___default()(lodash_flatten__WEBPACK_IMPORTED_MODULE_4___default()(tpl), (a, b) => {
            if (a.value === b.value) {
              return true;
            }

            return false;
          });
          page.bookmarks[`tpList${pid}`] = uniqueArray;
          allTopics.push(uniqueArray);
        }
      }
    });
  });
  let flatTopics = lodash_flatten__WEBPACK_IMPORTED_MODULE_4___default()(allTopics);
  let sortedFlatTopics = flatTopics.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    } else if (a.value > b.value) {
      return 1;
    }

    return 0;
  });
  let allUniqueTopics = lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5___default()(sortedFlatTopics, (a, b) => {
    if (a.value === b.value) {
      return true;
    }

    return false;
  });
  return {
    bookArray,
    topics: allUniqueTopics
  };
}
/*
  set bookmark modal form to previous state
*/


function restoreModalState() {
  let {
    modal
  } = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("bmModal", {
    modal: {
      filter: false
    }
  }); //bookmarkModalState("get");

  let form = $("#bookmark-filter-form");
  console.log("modal: ", modal);

  if (modal.filter) {
    form.form("set value", "topicList", modal.topics);
    $(".bookmark-filter-submit").trigger("click", {
      init: true
    });
  }
}

function filterResetHandler() {
  //clear filter
  $(".bookmark-filter-reset").on("click", function (e) {
    e.preventDefault();
    let form = $("#bookmark-filter-form");
    form.form("clear");
    let hiddenBookmarkItems = $(".cmi-bookmark-list .hide-bookmark-item.bookmark-item");
    hiddenBookmarkItems.each(function () {
      $(this).removeClass("hide-bookmark-item");
    }); //keep track of the state of the bookmark Modal

    let bookmarkModalInfo = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("bmModal", {
      modal: {
        filter: false
      }
    }); //bookmarkModalState("get");
    //update book title to reflect number of bookmarks

    $("[data-bid]").each(function () {
      let bid = $(this).data("bid");
      $(`.${bid}-header`).text(`${bookmarkModalInfo[bid].header} (${bookmarkModalInfo[bid].count})`);
    });
    bookmarkModalInfo["modal"].filter = false;
    delete bookmarkModalInfo["modal"].topics;
    Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeSet"])("bmModal", bookmarkModalInfo); //bookmarkModalState("set", bookmarkModalInfo);
  });
}

function filterSubmitHandler() {
  //apply topic filter
  $(".bookmark-filter-submit").on("click", function (e, data) {
    e.preventDefault();
    let form = $("#bookmark-filter-form");
    let topics = form.form("get value", "topicList");
    let topicRegExp = new RegExp(`\\b(${topics.join("|")})\\b`);

    if (topics.length === 0) {
      return;
    }

    let bookmarkItems = $(".cmi-bookmark-list .bookmark-item");
    bookmarkItems.each(function () {
      let classList = $(this).attr("class");

      if (classList.match(topicRegExp)) {
        //the bookmark could be hidden from a previous filter, so just remove the class
        //in case it's there
        $(this).removeClass("hide-bookmark-item");
      } else {
        $(this).addClass("hide-bookmark-item");
      }
    }); //keep track of the state of the bookmark Modal

    let bookmarkModalInfo = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("bmModal", {
      modal: {
        filter: false
      }
    }); //bookmarkModalState("get");

    let fullTopic = topics.map(t => {
      return {
        value: t,
        topic: $(`#bookmark-topic-list > [value='${t}']`).text()
      };
    }); //if we have data we're initializing and so we don't need to save state

    if (!data) {
      bookmarkModalInfo["modal"].filter = true;
      bookmarkModalInfo["modal"].topics = topics;
      bookmarkModalInfo["modal"].fullTopic = fullTopic;
      Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeSet"])("bmModal", bookmarkModalInfo); //bookmarkModalState("set", bookmarkModalInfo);
    }

    $("[data-bid]").each(function () {
      let bid = $(this).data("bid");
      let filtered = $(`[data-bid="${bid}"] .bookmark-item.hide-bookmark-item`).length;
      let remaining = bookmarkModalInfo[bid].count - filtered; //update title to reflect number of bookmarks shown after filter applied

      $(`.${bid}-header`).html(`${bookmarkModalInfo[bid].header} (<span class="bookmark-filter-color">${remaining}</span>/${bookmarkModalInfo[bid].count})`);
    });
  });
} //set click listener to open/close book level bookmarks


function openCloseHandler() {
  $(".cmi-bookmark-list").on("click", "[data-book]", function (e) {
    e.stopPropagation();
    let bookId = $(this).attr("data-book");
    let bookList = $(`#${bookId}-list`);

    if (bookList.hasClass("hide-bookmarks")) {
      bookList.removeClass("hide-bookmarks");
      $(this).text("Close").removeClass("green").addClass("yellow");
    } else {
      bookList.removeClass("yellow").addClass("green hide-bookmarks");
      $(this).text("Open").removeClass("yellow").addClass("green");
    }
  });
}
/*
  This is called each time the user displays the bookmark list
  - the first time it's called we need to generate html for all bookmarks
  - subsequent calls will regenerate html only if bookmarks have been added
    or deleted since the last time html was generated.
*/


function populateModal(bookmarks) {
  let initialCall = true;
  let html;
  let info = [];
  /*
    We need to populate the modal html if it hasn't been done yet or
    if a bookmark has been added or changed since we last did it.
    - check if we need to do it.
  */

  let lbd = $(".cmi-bookmark-list").attr("data-lbd");

  if (lbd) {
    //check if it is different from that found in booimarks
    lbd = parseInt(lbd, 10);

    if (lbd === bookmarks.lastBuildDate) {
      //don't need to update
      return;
    } else {
      initialCall = false;
    }
  } //record time bookmark was last generated


  $(".cmi-bookmark-list").attr("data-lbd", bookmarks.lastBuildDate); //get page info for each page with bookmarks

  for (let pageKey in bookmarks) {
    if (pageKey !== "lastFetchDate" && pageKey !== "lastBuildDate") {
      info.push(teaching.getPageInfo(pageKey, bookmarks[pageKey]));
    }
  } //we have an array of bookmarks, each element represents a page


  Promise.all(info).then(responses => {
    let {
      bookArray,
      topics
    } = combinePages(responses); //console.log("unique topics: %o", topics);
    //generate html and attach to modal dialog

    html = generateBookmarkList(bookArray);
    $(".cmi-bookmark-list").html(html);
    let select = makeTopicSelect(topics);
    $("#bookmark-modal-topic-select").html(select);
    $("#bookmark-topic-list").dropdown();
    $("#bookmark-modal-loading").removeClass("active").addClass("disabled");
    let bookmarkModalInfo = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("bmModal", {
      modal: {
        filter: false
      }
    }); //bookmarkModalState("get");
    //get number of bookmarks for each book

    $("[data-bid]").each(function () {
      let info = {};
      let bid = $(this).data("bid");
      info.count = $(`[data-bid="${bid}"] .bookmark-item`).length;
      info.header = $(`.${bid}-header`).text().trim(); //update title to reflect number of bookmarks

      $(`.${bid}-header`).text(`${info.header} (${info.count})`);
      bookmarkModalInfo[bid] = info;
    }); //only do this the first time 

    if (initialCall) {
      Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeSet"])("bmModal", bookmarkModalInfo); //bookmarkModalState("set", bookmarkModalInfo);

      openCloseHandler();
      filterSubmitHandler();
      filterResetHandler(); //restore past state if needed

      restoreModalState();
    }
  }).catch(err => {
    console.error(err);
  });
}
/*
 * Build bookmark list:
 *  { pageKey: {pid: [], pid2:[] }
 *
 *  Store result in local storage
 */


function buildBookmarkListFromServer(response) {
  let bookmarks = {};
  response.forEach(b => {
    let [pageKey, pKey] = b.paraKey.split(".");
    pKey = parseInt(pKey, 10) + "";

    if (!bookmarks[pageKey]) {
      bookmarks[pageKey] = {};
    }

    if (!bookmarks[pageKey][pKey]) {
      bookmarks[pageKey][pKey] = [];
    }

    bookmarks[pageKey][pKey].push(b.annotation);
  });
  bookmarks.lastFetchDate = Date.now();
  bookmarks.lastBuildDate = Date.now();
  Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeSet"])("bmList", bookmarks);
  return bookmarks;
}
/*
 * Query db for bookmarks by sourceId. Check for valid list of bookmarks in
 * local storage first. If not found go to database.
 */


async function queryBookmarks(key) {
  const retentionTime = 1000 * 60 * 60 * 8; //eight hours of milliseconds

  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])(); //check for bookmarks stored in local storage

  let bookmarkList = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("bmList", {
    modal: {
      filter: false
    }
  }); //getBookmarkList();

  if (bookmarkList) {
    let expireDate = bookmarkList.lastFetchDate + retentionTime; //if list has not expired or been invalidated resolve and return
    //otherwise query the server

    if (Date.now() < expireDate) {
      if (bookmarkList.lastBuildDate > 0) {
        populateModal(bookmarkList);
        return;
      }
    }
  }

  try {
    let bmList = await Object(_ajax_annotation__WEBPACK_IMPORTED_MODULE_0__["getAnnotations"])(userInfo.userId, key);
    let bookmarks = buildBookmarkListFromServer(bmList);
    populateModal(bookmarks);
  } catch (err) {
    console.error(err);
    toastr__WEBPACK_IMPORTED_MODULE_3___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("error:e4"));
  }
}
/*
  We query bookmarks just once per day and whenever bookmarks have changed
*/


function initList() {
  const {
    sourceId
  } = teaching.keyInfo.getKeyInfo();
  queryBookmarks(sourceId);
}

function initBookmarkModal() {
  $(uiBookmarkModal).modal({
    dimmerSettings: {
      opacity: uiModalOpacity
    },
    autofocus: false,
    centered: true,
    duration: 400,
    inverted: true,
    observeChanges: true,
    transition: "horizontal flip",
    onShow: function () {
      //console.log("calling initList()");
      initList();
    },
    onVisible: function () {},
    onHidden: function () {}
  });
  $(uiOpenBookmarkModal).on("click", e => {
    e.preventDefault(); //populateBookmarkModal(uiBookmarkModalDiv);

    $(uiBookmarkModal).modal("show");
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function (constants) {
    teaching = constants;
    initBookmarkModal();
  }
});

/***/ }),

/***/ "./src/js/modules/_bookmark/localStore.js":
/*!************************************************!*\
  !*** ./src/js/modules/_bookmark/localStore.js ***!
  \************************************************/
/*! exports provided: BookmarkLocalStore */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BookmarkLocalStore", function() { return BookmarkLocalStore; });
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/difference */ "./node_modules/lodash/difference.js");
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_difference__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _topics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./topics */ "./src/js/modules/_bookmark/topics.js");
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bookmark */ "./src/js/modules/_bookmark/bookmark.js");
/*
 * Local storage for bookmarks on page. 
 *
 * All bookmarks on current page are added when the page is loaded and this
 * cache is kept up to date with bookmark updates, deletions and creations.
 *
 * The local store is referenced for display of popup when cursor is hovered over
 * bookmarks on the page, when a bookmark is edited or shared.
 *
 * We don't use the browsers local store because we don't need to persist bookmarks
 * accross pages.
 */




/**
 * Convert paragraphKey from number to String and add
 * zero's if needed so decimal part contains 3 digits.
 */

function toString(paraKey) {
  let pk = `${paraKey}`;
  let decimalPos = pk.indexOf(".");

  if (decimalPos > -1) {
    let fpart = pk.substring(decimalPos + 1); //console.log("pk: %s, fpart: %s", pk, fpart);

    switch (fpart.length) {
      case 1:
        pk = `${pk}00`;
        break;

      case 2:
        pk = `${pk}0`;
        break;

      case 3:
        // format is correct
        break;

      default:
        // Houston, we've got a problem
        // console.err(`paragraph key format error: ${pk}`);
        break;
    }
  } // console.log("pk returned: %s", pk);


  return pk;
}

class BookmarkLocalStore {
  /**
   * Add list of bookmarks on page to this.list and add the topics for each
   * bookmark to the topics Map. Increment count to record the number of references
   * to each topic.
   *
   * @constructor
   * @param {array} bmList - array of bookmarks on page
   */
  constructor(bmList, sharePid) {
    this.list = bmList;
    this.topics = new Map();
    this.topicsModified = false;
    this.sharePid = sharePid; //load topics from bmList in to topic Map

    this._initTopics();
  }
  /**
   * Add topic to Map if not present, set count to 1. If present
   * increment count by 1.
   *
   * @params <object> newTopic - {value: "topicNospaces", topic: "might have spaces"}
   */


  _incrementTopic(newTopic, initializing = false) {
    //get number of topics before updating
    let size = this.topics.size;
    let key = newTopic.value; //if newTopic is not in topics, add it and set count to 1

    if (!this.topics.has(key)) {
      newTopic.count = 1;
      this.topics.set(key, newTopic);
      this.topicsModified = true;
    } else {
      let savedTopic = this.topics.get(key);
      savedTopic.count += 1;
      this.topics.set(key, savedTopic);
    } //this is the first topic on the page so we
    //need to initialize topics modal (for filtering page topics)


    if (size === 0 && !initializing) {
      Object(_topics__WEBPACK_IMPORTED_MODULE_2__["bookmarksLoaded"])();
    }
  }
  /**
   * Decrement or remove topic from topic Map
   * @param {object} - topic
   * @returns {boolean} {remainingCount: <number>, modified: <boolean>}
   */


  _decrementTopic(topic) {
    let key = topic.value;
    let modified = false; //unexpected

    if (!this.topics.has(key)) {
      return;
    }

    let trackedTopicValue = this.topics.get(key); //no more bookmarks on page with this topic

    if (trackedTopicValue.count === 1) {
      this.topics.delete(key);
      this.topicsModified = true;
    } else {
      //decrement count and store value
      trackedTopicValue.count -= 1;
      this.topics.set(key, trackedTopicValue);
    } //if the last topic on the page has been deleted remove
    //access to topic filter


    if (this.topics.size === 0) {
      Object(_topics__WEBPACK_IMPORTED_MODULE_2__["noMoreBookmarks"])();
    }
  }
  /*
   * Load bookmark topics into Map. This is used to selectively
   * display bookmarks on page by given topic. Load topics only
   * for selectedText annotations.
   */


  _initTopics() {
    this.list.forEach(b => {
      Object(_bookmark__WEBPACK_IMPORTED_MODULE_3__["processBookmark"])("loaded", b, this.sharePid);

      if (!b.annotation.selectedText) {
        return;
      }

      if (b.annotation.topicList && b.annotation.topicList.length > 0) {
        b.annotation.topicList.forEach(topic => {
          this._incrementTopic(topic, true);
        });
      }
    });
    this.topicsModified = true;
  }
  /*
   * A list of bookmarks, formated for display in the bookmark modal,
   * is stored in the browsers local storage. When bookmarks are added,
   * updated or deleted this list must be recreated.
   *
   * This invalidates the list because it knows about all bookmark changes.
   */


  _invalidateBmList() {
    let bmList = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("bmList"); //this is not expected

    if (!bmList) return; //invalidate list

    bmList.lastBuildDate = 0;
    Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeSet"])("bmList", bmList);
    return;
  }
  /*
   * Returns unique topics used by page annotations
   */


  getTopics() {
    return this.topics;
  }
  /**
   * Get state of topic array
   *
   * @returns {boolean} true if topics have be added or removed
   */


  get topicRefreshNeeded() {
    return this.topicsModified;
  }
  /*
   * Set state of topic refresh needed flag
   */


  set topicRefreshNeeded(value) {
    this.topicsModified = value;
  }
  /*
   * Find the bookmark with aid and return its creationDate
   */


  getCreationDate(aid) {
    let bkmrk = this.list.find(b => {
      if (b.annotation.aid && b.annotation.aid === aid) {
        return true;
      }

      return false;
    });

    if (bkmrk) {
      return bkmrk.creationDate;
    } //return undefined


    return bkmrk;
  }
  /**
   * Get bookmark for pid with aid.
   *
   * Only annotations with selectedText have aid. Note style
   * annotation don't but they do have creationDate so check
   * aid against creationDate if annotation.aid is not present.
   *
   * @param {string} pid - paragraph Id starting with "p"
   * @param {string} aid - uuid, only present with selectedText
   * @return {object} - or undefined 
   */


  getItem(pid, aid) {
    let id = parseInt(pid.substr(1), 10); //get array of bookmarks for pid

    let bms = this.list.filter(b => {
      return b.pid === id;
    });
    let bm = bms.find(b => {
      if (aid) {
        if (b.annotation.aid) {
          return b.annotation.aid === aid;
        }

        return b.annotation.creationDate == aid;
      }

      return typeof b.annotation.aid === "undefined";
    });
    return bm;
  }
  /**
   * Add or update annotation to the list. Update topic Map
   * accordingly.
   *
   * @param {string} - userId
   * @param {string} - paraKey
   * @param {string} - creationDate
   * @param {object} - annotation (the bookmark)
   */


  addItem(userId, paraKey, creationDate, annotation) {
    let pid = annotation.rangeStart;
    let id = parseInt(pid.substr(1), 10);

    if (typeof paraKey === "number") {
      paraKey = toString(paraKey);
    }

    if (annotation.status === "new") {
      annotation.creationDate = creationDate;
      let bkmrk = {
        userId: userId,
        paraKey: `${paraKey}`,
        creationDate: `${creationDate}`,
        pid: id,
        annotation: annotation
      };
      this.list.push(bkmrk); //add topics to topic Map for selectedText bookmarks

      if (bkmrk.annotation.selectedText && bkmrk.annotation.topicList) {
        bkmrk.annotation.topicList.forEach(i => {
          this._incrementTopic(i);
        });
      } //item has been added so invalidate bmList


      this._invalidateBmList(); //get number of bookmarks on paragraph


      let bms = this.list.filter(b => {
        return b.pid === id;
      }); //process new bookmark

      Object(_bookmark__WEBPACK_IMPORTED_MODULE_3__["processBookmark"])("created", bkmrk, bms.length - 1);
    } else {
      //this is an update
      let pKey = `${paraKey}`;
      let cDate = `${creationDate}`;
      let index = this.list.findIndex(i => {
        return i.paraKey === pKey && i.creationDate === cDate;
      });
      if (index === -1) throw new Error("localStore: addItem:update: bookmark to update not found in list"); //update topic Map if needed

      if (annotation.selectedText) {
        let newTopicList = [];
        let oldTopicList = [];

        if (annotation.topicList) {
          let newTL = annotation.topicList.reduce((result, topic) => {
            return `${result} ${topic.value}`;
          }, "");
          newTL = newTL.trim();
          newTopicList = newTL.split(" ");
        }

        if (this.list[index].annotation.topicList) {
          let oldTL = this.list[index].annotation.topicList.reduce((result, topic) => {
            return `${result} ${topic.value}`;
          }, "");
          oldTL = oldTL.trim();
          oldTopicList = oldTL.split(" ");
        }

        let addedTopics = lodash_difference__WEBPACK_IMPORTED_MODULE_1___default()(newTopicList, oldTopicList);
        let deletedTopics = lodash_difference__WEBPACK_IMPORTED_MODULE_1___default()(oldTopicList, newTopicList); //add topics is any have been added

        addedTopics.forEach(i => {
          //find topic in new annotation
          let topic = annotation.topicList.find(t => {
            return t.value === i;
          });

          this._incrementTopic(topic);
        }); //delete topics if any have been deleted

        deletedTopics.forEach(i => {
          //find topic in old annotation
          let topic = this.list[index].annotation.topicList.find(t => {
            return t.value === i;
          });

          this._decrementTopic(topic);
        });
      } //update annotation in local store


      this.list[index].annotation = annotation; //process updated bookmark

      Object(_bookmark__WEBPACK_IMPORTED_MODULE_3__["processBookmark"])("updated", this.list[index]);
    }
  }
  /**
   * Delete bookmark from list
   *
   * @param {string} userId
   * @param {string} paraKey
   * @param {string} creationDate
   * @return {object} {remainingCount: null || number left, modified: boolean}
   *
   */


  deleteItem(userId, paraKey, creationDate) {
    if (typeof paraKey !== "string") {
      paraKey = `${paraKey}`;
    }

    if (typeof creationDate !== "string") {
      creationDate = `${creationDate}`;
    }

    let index = this.list.findIndex(i => {
      if (i.userId === userId && i.paraKey === paraKey && i.creationDate === creationDate) {
        return true;
      }

      return false;
    }); //if item found, delete it from local store and get count remaining
    //bookmarks on paragraph

    let topicsModified = false;

    if (index > -1) {
      let bkmrk = this.list[index];
      let pid = bkmrk.pid; //delete topics from topic Map

      if (this.list[index].annotation.topicList) {
        this.list[index].annotation.topicList.forEach(i => {
          topicsModified = this._decrementTopic(i) || topicsModified;
        });
      } //delete item


      this.list.splice(index, 1); //item has been deleted so invalidate bmList

      this._invalidateBmList(); //get remaining bookmarks on paragraph


      let bms = this.list.filter(b => {
        return b.pid === pid;
      }); //process deleted bookmark

      Object(_bookmark__WEBPACK_IMPORTED_MODULE_3__["processBookmark"])("deleted", bkmrk, bms.length);
      return {
        remainingCount: bms.length,
        modified: topicsModified
      };
    }

    return {
      remainingCount: null,
      modified: topicsModified
    };
  }
  /*
   * Return the number of bookmarks for pid and exclude
   * bookmark with aid from the count.
   *
   * @param {string} pid - paragraph Id
   * @param {string} aid - annotation to exclude from count
   * @return {number}
   */


  itemCount(pid, aid) {
    if (!aid) {
      return 0;
    }

    let id = parseInt(pid.substr(1), 10);
    let bms = this.list.filter(b => {
      return b.pid === id;
    });
    let count = bms.reduce((count, b) => {
      if (b.annotation.aid && b.annotation.aid !== aid) {
        count = count + 1;
      }

      return count;
    }, 0);
    return count;
  }

}

/***/ }),

/***/ "./src/js/modules/_bookmark/navigator.js":
/*!***********************************************!*\
  !*** ./src/js/modules/_bookmark/navigator.js ***!
  \***********************************************/
/*! exports provided: initShareDialog, initNavigator, initTopicNavigator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initShareDialog", function() { return initShareDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initNavigator", function() { return initNavigator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initTopicNavigator", function() { return initTopicNavigator; });
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/intersection */ "./node_modules/lodash/intersection.js");
/* harmony import */ var lodash_intersection__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_intersection__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/intersectionWith */ "./node_modules/lodash/intersectionWith.js");
/* harmony import */ var lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/range */ "./node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scroll-into-view */ "./node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bookmark */ "./src/js/modules/_bookmark/bookmark.js");
/* harmony import */ var _shareByEmail__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shareByEmail */ "./src/js/modules/_bookmark/shareByEmail.js");
/* harmony import */ var _clipboard__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./clipboard */ "./src/js/modules/_bookmark/clipboard.js");
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");










 //teaching specific constants

let teaching = {};
let shareEventListenerCreated = false;
let gPageKey;

function generateHorizontalList(listArray) {
  if (!listArray || listArray.length === 0) {
    return Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("annotate:m13");
  }

  return `
    <div class="ui horizontal bulleted list">
      ${listArray.map(item => `
        <div class="item">
          <em>${typeof item === "object" ? item.topic : item}</em>
        </div>
      `).join("")}
    </div>
  `;
}
/*
  generate html for annotation
  args: annotation - annotation object
        topics - filter array

  if topics.length > 0 then generate html only for
  annotations that have topics found in the filter array
*/


function generateAnnotation(annotation, topics = []) {
  let match;

  if (!annotation.topicList) {
    annotation.topicList = [];
  } // console.log("annotation: %o", annotation);
  //convert annotation topics list into string array


  let topicList = annotation.topicList.map(topic => {
    return topic.value;
  });

  if (topics.length > 0) {
    match = lodash_intersection__WEBPACK_IMPORTED_MODULE_1___default()(topicList, topics);
  }

  if (topics.length === 0 || match.length > 0) {
    return `
      <div class="item"> <!-- item: ${annotation.rangeStart}/${annotation.rangeEnd} -->
        <i class="right triangle icon"></i>
        <div class="content">
          <div class="header">
            ${generateHorizontalList(annotation.topicList)}
          </div>
          <div class="description">
            <button class="annotation-item ui icon basic button" data-range="${annotation.rangeStart}/${annotation.rangeEnd}" data-aid="${annotation.aid}" data-creationDate="${annotation.creationDate}" >
              <i class="share square icon"></i>
              ${annotation.Comment ? annotation.Comment : Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("annotate:m7")}
            </button>
            <!--
            <a title="Click to share" data-aid="${annotation.aid}" data-creationDate="${annotation.creationDate}" class="annotation-item" data-range="${annotation.rangeStart}/${annotation.rangeEnd}">
              ${annotation.Comment ? annotation.Comment : Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("annotate:m7")}
            </a>
            -->
          </div>
        </div>
      </div> <!-- item: ${annotation.rangeStart}/${annotation.rangeEnd} -->
    `;
  } else {
    return `<!-- annotation filtered: ${topics.join(" ")} -->`;
  }
}

function generateBookmark(actualPid, bkmk, topics, label) {
  return `
    <div class="ui list">
      <div class="item">
        <i class="bookmark icon"></i>
        <div class="content">
          <div class="header">
            ${label}: ${actualPid}
          </div>
          <div class="list">
            ${bkmk.map(annotation => `
              ${generateAnnotation(annotation, topics)}
            `).join("")}
          </div>
        </div>
      </div>
    </div>
 `;
}
/*
  returns the url for the first annotation of the arg bookmark
  Note: deleted annotations are empty arrays so skip over them.
*/


function getBookmarkUrl(bookmarks, pageKey, pid, topic) {
  let url;
  let bookmark = bookmarks[pageKey][pid];
  let selectedText = bookmark[0].selectedText;

  if (selectedText) {
    // topic navigator
    if (topic.length > 0) {
      url = `${bookmark[0].selectedText.url}?tnav=${bookmark[0].rangeStart}&topic=${topic}`;
    } else {
      url = `${bookmark[0].selectedText.url}?bkmk=${bookmark[0].rangeStart}`;
    }
  } else {
    //we have a bookmark with no selected text, have to get the url in another way
    if (topic.length > 0) {
      url = `${teaching.env === "integration" ? teaching.url_prefix : ""}${teaching.keyInfo.getUrl(pageKey)}?tnav=${bookmark[0].rangeStart}&topic=${topic}`;
    } else {
      url = `${teaching.env === "integration" ? teaching.url_prefix : ""}${teaching.keyInfo.getUrl(pageKey)}?bkmk=${bookmark[0].rangeStart}`;
    }
  } //console.log("url: %s", url);


  return url;
}

function getNextPageUrl(pos, pageList, filterList, bookmarks, topic) {
  if (pos > pageList.length) {
    return Promise.resolve(null);
  }

  let found = false;
  let pagePos;
  let pid;

  outer: for (pagePos = pos; pagePos < pageList.length; pagePos++) {
    let pageMarks = bookmarks[pageList[pagePos]];

    for (pid in pageMarks) {
      for (let a = 0; a < pageMarks[pid].length; a++) {
        //no filter in effect
        if (!filterList || filterList.length === 0) {
          found = true;
          break outer;
        } else {
          //compare the filter topic (a) with bookmark topics ({value, topic})
          let match = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2___default()(filterList, pageMarks[pid][a].topicList || [], (a, b) => {
            if (a === b.value) {
              return true;
            }

            return false;
          });

          if (match.length > 0) {
            found = true;
            break outer;
          }
        }
      }
    }
  }

  return new Promise(resolve => {
    if (found) {
      let pageKey = pageList[pagePos];
      let url = getBookmarkUrl(bookmarks, pageKey, pid, topic); //it's possible the url was not found so check for that

      if (url) {
        //console.log("next url: %s", url);
        resolve(url);
        return;
      } else {
        resolve(null);
      }
    } else {
      //console.log("next url is null");
      resolve(null);
    } //console.log("next url: null");

  });
}

function getPrevPageUrl(pos, pageList, filterList, bookmarks, topic) {
  if (pos < 0) {
    return Promise.resolve(null);
  }

  let found = false;
  let pagePos;
  let pid;

  outer: for (pagePos = pos; pagePos >= 0; pagePos--) {
    let pageMarks = bookmarks[pageList[pagePos]];

    for (pid in pageMarks) {
      for (let a = 0; a < pageMarks[pid].length; a++) {
        //no filter in effect
        if (!filterList || filterList.length === 0) {
          found = true;
          break outer;
        } else {
          let match = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2___default()(filterList, pageMarks[pid][a].topicList || [], (a, b) => {
            if (a === b.value) {
              return true;
            }

            return false;
          });

          if (match.length > 0) {
            found = true;
            break outer;
          }
        }
      }
    }
  }

  return new Promise(resolve => {
    if (found) {
      let pageKey = pageList[pagePos];
      let url = getBookmarkUrl(bookmarks, pageKey, pid, topic); //console.log("prev url is %s", url);

      resolve(url);
    } else {
      //console.log("prev url is null");
      resolve(null);
    }
  });
}

function getNextPrevUrl(pageKey, bookmarks, bmModal, topic) {
  let pages = Object.keys(bookmarks);
  let pos = pages.indexOf("lastFetchDate");
  let urls = {
    next: null,
    prev: null
  };

  if (pos > -1) {
    pages.splice(pos, 1);
  }

  pos = pages.indexOf(pageKey);

  if (pos === -1) {
    return Promise.reject("bookmark not found");
  } //console.log("current page: %s", pageKey);


  let nextPromise = getNextPageUrl(pos + 1, pages, bmModal ? bmModal["modal"].topics : bmModal, bookmarks, topic);
  let prevPromise = getPrevPageUrl(pos - 1, pages, bmModal ? bmModal["modal"].topics : bmModal, bookmarks, topic);
  return Promise.all([prevPromise, nextPromise]);
}
/*
  Given the postion (currentPos) in pageMarks of the current pid, find the previous
  one. Return the actualPid or null.

  Omit bookmarks that don't have at least one topic found in topics[]. If topics[]
  has no data then no filtering is done.

  args:
    currentPos - position in pageMarks of the current paragraph
    pageMarks - an array of paragraph keys with bookmarks
    pageBookmarks - bookmarks found on the page
    topics - an array of topics by which to filter bookmarks
*/


function getPreviousPid(currentPos, pageMarks, pageBookmarks, topics) {
  //there is no previous bookmark
  if (currentPos < 1) {
    return null;
  } //no filtering


  if (topics.length === 0) {
    return `p${(parseInt(pageMarks[currentPos - 1], 10) - 1).toString(10)}`;
  } else {
    //topic filtering - look through all previous paragraphs for the first one
    //containing an annotation found in topics[]
    for (let newPos = currentPos - 1; newPos >= 0; newPos--) {
      let bookmark = pageBookmarks[pageMarks[newPos]];

      for (let i = 0; i < bookmark.length; i++) {
        if (bookmark[i].topicList && bookmark[i].topicList.length > 0) {
          let inter = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2___default()(bookmark[i].topicList, topics, (a, b) => {
            if (a.value === b) {
              return true;
            }

            return false;
          });

          if (inter.length > 0) {
            //we found a bookmark containing a topic in the topicList
            return `p${(parseInt(pageMarks[newPos], 10) - 1).toString(10)}`;
          }
        }
      }
    } //there are no remaining bookmarks with a topic in topics


    return null;
  }
}
/*
  Given the postion (currentPos) in pageMarks of the current pid, find the next
  one. Return the actualPid or null.

  Omit bookmarks that don't have at least one topic found in topics[]. If topics[]
  has no data then no filtering is done.

  args:
    currentPos - position in pageMarks of the current paragraph
    pageMarks - an array of paragraph keys with bookmarks
    pageBookmarks - bookmarks found on the page
    topics - an array of topics by which to filter bookmarks
*/


function getNextPid(currentPos, pageMarks, pageBookmarks, topics) {
  //there is "no" next bookmark
  if (currentPos + 1 === pageMarks.length) {
    return null;
  } //no filtering


  if (topics.length === 0) {
    return `p${(parseInt(pageMarks[currentPos + 1], 10) - 1).toString(10)}`;
  } else {
    //topic filtering - look through all previous paragraphs for the first one
    //containing an annotation found in topics[]
    for (let newPos = currentPos + 1; newPos < pageMarks.length; newPos++) {
      let bookmark = pageBookmarks[pageMarks[newPos]];

      for (let i = 0; i < bookmark.length; i++) {
        if (bookmark[i].topicList && bookmark[i].topicList.length > 0) {
          let inter = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_2___default()(bookmark[i].topicList, topics, (a, b) => {
            if (a.value === b) {
              return true;
            }

            return false;
          });

          if (inter.length > 0) {
            //we found a bookmark containing a topic in the topicList
            return `p${(parseInt(pageMarks[newPos], 10) - 1).toString(10)}`;
          }
        }
      }
    } //there are no remaining bookmarks with a topic in topics


    return null;
  }
}
/*
  args: pageKey - identifies the current page
        pid - paragraph id
        allBookmarks - an array of all bookmarks
        bmModal - contains topics for filtering
        whoCalled - when the function is called by a click handler the value is
                    either "previous" or "next". When "previous", a new value
                    for previous bookmark needs to be determind, ditto for "next"

  Note: the value of pid is the actual paragraph id and not the key which is pid + 1.
  Bookmark info is stored according to key so we increment the pid to access the data
*/


function getCurrentBookmark(pageKey, actualPid, allBookmarks, bmModal, whoCalled) {
  let pidKey;
  let topics = [];
  let filterTopics;

  if (bmModal && bmModal["modal"].filter) {
    topics = bmModal["modal"].topics;
    filterTopics = generateHorizontalList(bmModal["modal"].fullTopic);
  } //convert pid to key in bookmark array


  pidKey = (parseInt(actualPid.substr(1), 10) + 1).toString(10);
  let paragraphBookmarks = allBookmarks[pageKey][pidKey]; // console.log("paragraphBookmarks: %o", paragraphBookmarks);
  //the current bookmark (actualPid) does not exist
  //this would happen where url includes ?bkmk=p3 and p3 does not have a bookmark

  if (!paragraphBookmarks) {
    return false;
  }

  Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("label:para", true).then(label => {
    let html = generateBookmark(actualPid, paragraphBookmarks, topics, label);
    $("#bookmark-content").html(html);
  });

  if (filterTopics) {
    $("#filter-topics-section").removeClass("hide");
    $(".bookmark-navigator-filter").html(filterTopics);
  } else {
    $("#filter-topics-section").addClass("hide");
  }

  $(".bookmark-navigator-header-book").text($("#book-title").text()); //$("#bookmark-content").html(html);
  //get links to next and previous bookmarks on the page

  let pageMarks = Object.keys(allBookmarks[pageKey]);
  let pos = pageMarks.indexOf(pidKey); //if topic filtering is enabled

  let prevActualPid;
  let nextActualPid;
  prevActualPid = getPreviousPid(pos, pageMarks, allBookmarks[pageKey], topics);
  nextActualPid = getNextPid(pos, pageMarks, allBookmarks[pageKey], topics);
  $(".bookmark-navigator .current-bookmark").attr("data-pid", `${actualPid}`); //console.log("prev: %s, next: %s", prevActualPid, nextActualPid);
  //set previous to inactive

  Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("action:prev", true).then(resp => {
    if (!prevActualPid) {
      $(".bookmark-navigator .previous-bookmark").addClass("inactive");
      $(".bookmark-navigator .previous-bookmark").html(`<i class='up arrow icon'></i>${resp}`);
    } else {
      //add data-pid attribute to link for previous bkmk
      $(".bookmark-navigator .previous-bookmark").attr("data-pid", prevActualPid);
      $(".bookmark-navigator .previous-bookmark").removeClass("inactive");
      $(".bookmark-navigator .previous-bookmark").html(`<i class="up arrow icon"></i> ${resp} (${prevActualPid})`);
    }
  });
  Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("action:next", true).then(resp => {
    if (!nextActualPid) {
      $(".bookmark-navigator .next-bookmark").addClass("inactive");
      $(".bookmark-navigator .next-bookmark").html(`<i class='down arrow icon'></i> ${resp}`);
    } else {
      //add data-pid attribute to link for next bkmk
      $(".bookmark-navigator .next-bookmark").attr("data-pid", nextActualPid);
      $(".bookmark-navigator .next-bookmark").removeClass("inactive");
      $(".bookmark-navigator .next-bookmark").html(`<i class="down arrow icon"></i> ${resp} (${nextActualPid})`);
    }
  }); // Highlight paragraph for topic navigator
  // if there's more than one annotation for the current paragraph we
  // use the first one to highlight

  if (whoCalled === "topic") {
    let {
      rangeStart,
      rangeEnd,
      creationDate
    } = paragraphBookmarks[0];
    highlightParagraph(actualPid, rangeStart, rangeEnd, creationDate);
  }

  return true;
}
/*
  Setup the bookmark navigator for the page.
  arg: pid - paragraph id.
*/


function bookmarkManager(actualPid) {
  let sourceId = teaching.keyInfo.getSourceId();
  let pageKey = teaching.keyInfo.genPageKey().toString(10);
  let bmList = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("bmList");
  let bmModal = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("bmModal");

  if (bmList) {
    //store globally
    gPageKey = pageKey; //get previous and next url's

    getNextPrevUrl(pageKey, bmList, bmModal, "").then(responses => {
      //console.log("next/prev urls: ", responses);
      //set prev and next hrefs
      if (responses[0] !== null) {
        $(".bookmark-navigator .previous-page").attr({
          "href": responses[0]
        });
      } else {
        $(".bookmark-navigator .previous-page").addClass("inactive").removeAttr("href");
      }

      if (responses[1] !== null) {
        $(".bookmark-navigator .next-page").attr({
          "href": responses[1]
        });
      } else {
        $(".bookmark-navigator .next-page").addClass("inactive").removeAttr("href");
      } //identify current bookmark in navigator
      //returns false if actualPid does not contain a bookmark


      if (!getCurrentBookmark(pageKey, actualPid, bmList, bmModal, "bookmark")) {
        Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("fragment:f1", true).then(value => {
          toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(_language_lang__WEBPACK_IMPORTED_MODULE_10__["__lang"]`${value} ${actualPid} ${"fragment:f2"}`);
        });
        return;
      } //init navigator controls


      initClickListeners("bookmark"); //indicate bookmark navigator is active by adding class to ./transcript

      $(".transcript").addClass("bookmark-navigator-active"); //show the navigator and scroll

      $(".bookmark-navigator-wrapper").removeClass("hide-bookmark-navigator");
      setTimeout(scrollIntoView, 250, actualPid, "bookmarkManager");
    }).catch(err => {
      console.error(err);

      if (err === "bookmark not found") {
        Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("fragment:f1", true).then(v => {
          toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(`${v} ${actualPid} ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("fragment:f2")}`);
        });
      }
    });
  } else {//console.log(teaching.bm_list_store);
  }
}
/*
  Setup the bookmark topic navigator for the page.
  arg: pid - paragraph id.
*/


function bookmarkTopicManager(topicInfo, constants) {
  let sourceId = teaching.keyInfo.getSourceId();
  let pageKey = teaching.keyInfo.genPageKey().toString(10);
  let topicList = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("topicList");
  let bmModal = null;

  if (topicList) {
    // get topic name and update navigator
    let keys = Object.keys(topicList[pageKey]);
    let first = topicList[pageKey][keys[0]][0].topicList.find(t => t.value === topicInfo.topic);
    console.log("keys: %o, topiclist: %o", keys, first);

    if (first) {
      $(".bookmark-navigator").prepend(`<h4 class="ui header"><div class="content">Topic: ${first.topic}</div></h4>`);
    } //store globally


    gPageKey = pageKey; //get previous page and next page url's

    getNextPrevUrl(pageKey, topicList, bmModal, topicInfo.topic).then(responses => {
      //console.log("next/prev urls: ", responses);
      //set prev and next hrefs
      if (responses[0] !== null) {
        $(".bookmark-navigator .previous-page").attr({
          "href": responses[0]
        });
      } else {
        $(".bookmark-navigator .previous-page").addClass("inactive").removeAttr("href");
      }

      if (responses[1] !== null) {
        $(".bookmark-navigator .next-page").attr({
          "href": responses[1]
        });
      } else {
        $(".bookmark-navigator .next-page").addClass("inactive").removeAttr("href");
      } //identify current bookmark in navigator
      //returns false if actualPid does not contain a bookmark


      if (!getCurrentBookmark(pageKey, topicInfo.pid, topicList, bmModal, "topic")) {
        Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("fragment:f1", true).then(value => {
          toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(_language_lang__WEBPACK_IMPORTED_MODULE_10__["__lang"]`${value} ${actualPid} ${"fragment:f2"}`);
        });
        return;
      } //init navigator controls


      initClickListeners("topic", constants); //indicate bookmark navigator is active by adding class to ./transcript

      $(".transcript").addClass("bookmark-navigator-active"); //show the navigator and scroll

      $(".bookmark-navigator-wrapper").removeClass("hide-bookmark-navigator");
      setTimeout(scrollIntoView, 250, topicInfo.pid, "bookmarkTopicManager");
    }).catch(err => {
      console.error(err);

      if (err === "bookmark not found") {
        Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("fragment:f1", true).then(v => {
          toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(`${v} ${actualPid} ${Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("fragment:f2")}`);
        });
      }
    });
  } else {//console.log(teaching.bm_list_store);
  }
}
/*
  Update previous and next bookmark links on navigator.

  args:
    pid: the actual pid to display
    update: either "previous", or "next" depending on what click handler called the function
    type: "bookmark" or "topic"
*/


function updateNavigator(pid, update, type) {
  //console.log("updateNavigator, pid: %s, update: %s", pid, update);
  let bmList;
  let bmModal;

  if (type === "bookmark") {
    bmList = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("bmList");
    bmModal = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("bmModal");
  } else {
    bmList = Object(_util_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])("topicList");
    bmModal = null;
  }

  getCurrentBookmark(gPageKey, pid, bmList, bmModal, type);
}
/*
  An annotation is selected and the user can choose from sharing options. This dialog
  is set up by adding the .selected-annotation class.

  It is cleared here thus removing the share dialog
*/


function clearSelectedAnnotation() {
  let selected = $(".selected-annotation"); //remove dialog

  if (selected.length > 0) {
    $(".selected-annotation-wrapper > .header").remove();
    selected.unwrap().removeClass("selected-annotation");
    $(".bookmark-selected-text.show").removeClass("show"); //clear text selection guard applied whey bookmark is edited
    // if .user exists then guard is user initiated and we don't clear it

    let guard = $("div.transcript.ui.disable-selection:not(.user)");

    if (guard.length > 0) {
      //console.log("removing selection guard");
      guard.removeClass("disable-selection");
    }
  }
}

function scrollComplete(message, type) {//console.log(`${message}: ${type}`);
}

function scrollIntoView(id, caller) {
  scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(id), {
    align: {
      top: 0.2
    }
  }, type => {
    scrollComplete(`scroll from bookmark navigator ${caller}(${id})`, type);
  });
}
/**
 * Format bookmark text to share by email or Facebook.
 *
 * @param {string} channel - either 'email' or 'facebook'
 * @param {string} text - the text to format
 * @returns {string} the formatted text
 */


function formatToShare(channel, text) {
  let separator = channel === "email" ? "@@" : "\n\n"; //remove unwanted characters

  text = text.replace(/[^\x20-\x7E]/g, " "); //replace multiple spaces with one

  text = text.replace(/ {2,}/g, " "); //insert separator characters in front of paragraph numbers

  text = text.replace(/\(p\d*\)/g, m => {
    return `${separator}${m}`;
  }); //split into array to remove a empty first element

  let pArray = text.split(separator);

  if (pArray[0].length === 0) {
    pArray.shift();
  } //wrap paragraphs with <p></p> and join


  if (channel === "email") {
    text = pArray.reduce((current, p) => {
      return `${current}\n<p>${p}</p>`;
    }, "");
  } else {
    text = pArray.join("\n");
  }

  return text;
}
/*
  Click handler for FB and email share dialog. This can be called from this
  module when the bookmark navigator is active or from annotate.js when
  the share button is clicked from the annotation edit dialog.
*/


function initShareDialog(source) {
  if (shareEventListenerCreated) {
    return;
  } //share icon click handler


  $(".transcript").on("click", ".selected-annotation-wrapper .share-annotation", function (e) {
    e.preventDefault();
    let annotation = $(".selected-annotation-wrapper mark.show");
    let userInfo;
    let pid, aid, text;

    if ($(this).hasClass("close")) {
      clearSelectedAnnotation();
      return;
    }

    userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_9__["getUserInfo"])();

    if (!userInfo) {
      toastr__WEBPACK_IMPORTED_MODULE_5___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("annotate:m14"));
      return;
    }

    let url = $(".selected-annotation-wrapper i[data-clipboard-text]").attr("data-clipboard-text"); //check for intermittent error in url

    let pos = url.indexOf("undefined");
    let channel;

    if ($(this).hasClass("facebook")) {
      channel = "facebook";
    } else if ($(this).hasClass("envelope")) {
      channel = "email";
    } else if ($(this).hasClass("linkify")) {
      if (pos > -1) {
        //Houston, we've got a problem
        toastr__WEBPACK_IMPORTED_MODULE_5___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("error:e5"));
        return;
      } //work is already done


      channel = "clipboard";
      return;
    }

    pid = $(".selected-annotation-wrapper p").attr("id"); //this is a Note style annotation because it has no selectedText
    // - get the text of all <p> siblings to .selected-annotation-wrapper

    if (annotation.length === 0) {
      text = $(".selected-annotation-wrapper > p").text();
      text = formatToShare(channel, text);
    } else {
      text = annotation.text().replace(/\n/, " ");
    } //console.log("share text: %s", text);


    let srcTitle = $("#src-title").text();
    let bookTitle = $("#book-title").text();
    let citation = `~ ${srcTitle}: ${bookTitle}`;

    if (channel === "facebook") {
      if (pos > -1) {
        //Houston, we've got a problem
        toastr__WEBPACK_IMPORTED_MODULE_5___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("error:e5"));
        return;
      }

      let options = {
        method: "share",
        hashtag: "#christmind",
        quote: `${text}\n${citation}`,
        href: url
      };
      FB.ui(options, function () {});
    } else if (channel === "email") {
      if (pos > -1) {
        //Houston, we've got a problem
        toastr__WEBPACK_IMPORTED_MODULE_5___default.a.error(Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("error:e5"));
        return;
      }

      Object(_shareByEmail__WEBPACK_IMPORTED_MODULE_7__["shareByEmail"])(text, citation, url);
    }
  });
  shareEventListenerCreated = true;
}

function highlightParagraph(pid, rangeStart, rangeEnd, creationDate) {
  let rStart = parseInt(rangeStart.substr(1), 10);
  let rEnd = parseInt(rangeEnd.substr(1), 10); // remove highlight from previous paragraph, if any

  $(".topic-navigator").unwrap();
  $(".topic-navigator").removeClass("topic-navigator");

  for (let i = rStart; i <= rEnd; i++) {
    let p = $(`#p${i}`);

    if (p.parent().is("blockquote")) {
      p.parent().addClass("topic-navigator");
    } else {
      p.addClass("topic-navigator");
    }
  }

  $(".topic-navigator").wrapAll("<div class='navigator-highlight' />");
}
/**
 * Get next and prev paragraph bookmarks.
 *
 * @param {string} type - either "bookmark" or "topic", specifies navitator type
 */


function initClickListeners(type, constants) {
  //previous bookmark
  $(".bookmark-navigator .previous-bookmark").on("click", function (e) {
    e.preventDefault();
    clearSelectedAnnotation();
    let actualPid = $(this).attr("data-pid");
    scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(actualPid), {
      align: {
        top: 0.2
      }
    }, type => {
      scrollComplete(`bookmark navigator previous-bookmark(${actualPid})`, type);
    });
    updateNavigator(actualPid, "previous", type);
  });
  $(".bookmark-navigator .next-bookmark").on("click", function (e) {
    e.preventDefault();
    clearSelectedAnnotation();
    let actualPid = $(this).attr("data-pid");
    scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(actualPid), {
      align: {
        top: 0.2
      }
    }, type => {
      scrollComplete(`bookmark navigator next-bookmark(${actualPid})`, type);
    });
    updateNavigator(actualPid, "next", type);
  });
  $(".bookmark-navigator .current-bookmark").on("click", function (e) {
    e.preventDefault();
    let actualPid = $(this).attr("data-pid");
    scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById(actualPid), {
      align: {
        top: 0.2
      }
    }, type => {
      scrollComplete(`bookmark navigator current-bookmark(${actualPid})`, type);
    });
  });
  $(".bookmark-navigator .close-window").on("click", function (e) {
    e.preventDefault();
    clearSelectedAnnotation();
    $(".bookmark-navigator-wrapper").addClass("hide-bookmark-navigator");
    $(".transcript").removeClass("bookmark-navigator-active"); // remove paragraph highlight

    if (type === "topic") {
      $(".topic-navigator").unwrap();
      $(".topic-navigator").removeClass("topic-navigator"); //$(".topic-navigator").removeClass("topic-navigator navigator-highlight navigator-highlight-top navigator-highlight-bottom navigator-highlight-middle");
    } // bookmarks are disabled when the topic navigator is active
    // - enable bookmarks when the user is signed in and the
    //   topic navigator is being closed.


    if (type === "topic" && Object(_user_netlify__WEBPACK_IMPORTED_MODULE_9__["getUserInfo"])()) {
      Object(_bookmark__WEBPACK_IMPORTED_MODULE_6__["initBookmarkFeature"])(false, constants);
    }
  }); //highlights an annotation by wrapping it in a segment

  $(".bookmark-navigator").on("click", ".annotation-item", function (e) {
    e.preventDefault();
    let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_9__["getUserInfo"])(); // allow sharing to signed in users only 

    if (type === "topic") {
      if (!userInfo) return;
    }

    clearSelectedAnnotation();

    if (!userInfo) {
      userInfo = {
        userId: "xxx"
      };
    } //this is the annotation-id on the bookmark in the navigator


    let annotation_id = $(this).attr("data-aid");
    let aid;
    let dataRange = $(this).attr("data-range");
    let rangeArray = dataRange.split("/");
    let pid = rangeArray[0]; //get the aid from the highlight if it exists, won't exist for note level bookmark

    if (annotation_id !== "undefined") {
      aid = $(`[data-annotation-id='${annotation_id}']`).attr("data-aid");
      $(`[data-annotation-id="${aid}"]`).addClass("show");
    } else {
      //this is a note level bookmark, get aid from the pid
      aid = $(`#${pid} > span.pnum`).attr("data-aid");
    } // this can be null when using topic navigator


    if (!aid) {
      aid = $(this).attr("data-creationDate");
    }

    let url = `${location.origin}${location.pathname}?as=${pid}:${aid}:${userInfo.userId}`; // console.log("share url: %s", url);

    let numericRange = rangeArray.map(r => parseInt(r.substr(1), 10));
    let annotationRange = lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(numericRange[0], numericRange[1] + 1);
    let header;

    if (userInfo.userId === "xxx") {
      header = `
        <h4 class="ui header">
          <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_10__["getString"])("annotate:m11")}" class="red window close outline icon"></i>
          <div class="content">
            ${$(this).text()}
          </div>
        </h4>
      `;
    } else {
      header = _language_lang__WEBPACK_IMPORTED_MODULE_10__["__lang"]`
        <h4 class="ui header">
          <i title="${"action:fbshare"}" class="share-annotation facebook icon"></i>
          <i title="${"action:emailshare"}" class="share-annotation envelope outline icon"></i>
          <i data-clipboard-text="${url}" title="${"action:cp2clip"}" class="share-annotation linkify icon"></i>
          <div class="content">
            ${$(this).text()}
          </div>
        </h4>
      `;
    }

    for (let i = 0; i < annotationRange.length; i++) {
      $(`#p${annotationRange[i]}`).addClass("selected-annotation");
    }

    $(".selected-annotation").wrapAll("<div class='selected-annotation-wrapper ui raised segment'></div>");
    $(".selected-annotation-wrapper").prepend(header);

    if (userInfo.userId !== "xxx") {
      _clipboard__WEBPACK_IMPORTED_MODULE_8__["default"].register(".share-annotation.linkify");
    }
  }); //init click events for FB and email sharing

  initShareDialog("bookmark/navigator.js");
}
/*
  User clicked a bookmark link in the bookmark list modal.

  Initialize the bookmark navigator so they can follow the list of bookmarks
*/


function initNavigator(actualPid, constants) {
  teaching = constants;
  bookmarkManager(actualPid);
}
function initTopicNavigator(topicInfo, constants) {
  teaching = constants;
  bookmarkTopicManager(topicInfo, constants);
}

/***/ }),

/***/ "./src/js/modules/_bookmark/selection.js":
/*!***********************************************!*\
  !*** ./src/js/modules/_bookmark/selection.js ***!
  \***********************************************/
/*! exports provided: highlightSkippedAnnotations, updateSelectionTopicList, deleteNewSelection, deleteSelection, getSelection, updateHighlightColor, markSelection, updateSelectedText, highlight, initialize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlightSkippedAnnotations", function() { return highlightSkippedAnnotations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSelectionTopicList", function() { return updateSelectionTopicList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteNewSelection", function() { return deleteNewSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteSelection", function() { return deleteSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSelection", function() { return getSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateHighlightColor", function() { return updateHighlightColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "markSelection", function() { return markSelection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSelectedText", function() { return updateSelectedText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "highlight", function() { return highlight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initialize", function() { return initialize; });
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
/* harmony import */ var _annotate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./annotate */ "./src/js/modules/_bookmark/annotate.js");
/* harmony import */ var lodash_isFinite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/isFinite */ "./node_modules/lodash/isFinite.js");
/* harmony import */ var lodash_isFinite__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_isFinite__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/difference */ "./node_modules/lodash/difference.js");
/* harmony import */ var lodash_difference__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_difference__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");



const textPosition = __webpack_require__(/*! dom-anchor-text-position */ "./node_modules/dom-anchor-text-position/index.js");

const textQuote = __webpack_require__(/*! dom-anchor-text-quote */ "./node_modules/dom-anchor-text-quote/index.js");

const wrapRange = __webpack_require__(/*! wrap-range-text */ "./node_modules/wrap-range-text/index.js"); //const uuid = require("uuid/v4");






 //all annotations on the page

let pageAnnotations = {}; //all annotations that were not highlighted due to shared annotation conflict

let skippedAnnotations = [];
function highlightSkippedAnnotations() {
  let sequence = 0;

  if (skippedAnnotations.length === 0) {
    return;
  }

  let node;

  for (let a of skippedAnnotations) {
    let annotation = pageAnnotations[a]; //console.log("annotation: %o", annotation);
    //all skipped annotations are on the same pid, so get id just once

    if (!node) {
      node = document.getElementById(annotation.pid);
    }

    highlight(annotation, node);
    updateHighlightColor(annotation.id, sequence);
    sequence += 1;
  }
}
/*
 * Add or remove topic classes to html for highlighted annotation
 * topics.
 */

function updateSelectionTopicList(annotation) {
  let topicList; //annotation has no selected text

  if (!annotation.aid) {
    return;
  } //if no topics and annotation has been updated, check if topic
  //classes exist, delete if so


  if (!annotation.topicList || annotation.topicList.length === 0) {
    //don't need to do anything for new annotations
    if (annotation.status === "new") {
      return;
    } //check for topic classes


    let existingClasses = $(`[data-annotation-id="${annotation.aid}"]`).attr("class");
    let classArray = existingClasses.split(" ");
    $(`[data-annotation-id="${annotation.aid}"]`).attr("class", `${classArray[0]} ${classArray[1]}`);
    return;
  } //convert annotation topics to a space delimited string


  topicList = annotation.topicList.reduce((result, topic) => {
    return `${result} ${topic.value}`;
  }, ""); //split topic string into an array

  topicList = topicList.trim();
  let topicListArray = topicList.split(" "); //get class attr for annotation and convert to an array

  let existingClasses = $(`[data-annotation-id="${annotation.aid}"]`).attr("class");
  let classArray = existingClasses.split(" "); //add first two classes of classArray to topicListArray, these are non topic classes

  if (classArray.length === 1) {
    topicListArray.unshift(classArray[0]);
  } else {
    topicListArray.unshift(classArray[1]);
    topicListArray.unshift(classArray[0]);
  } //create class list from topicListArray


  topicList = topicListArray.reduce((result, topic) => {
    return `${result} ${topic}`;
  }, ""); //update class list

  $(`[data-annotation-id="${annotation.aid}"]`).attr("class", topicList);
}
/*
  if the annotation is new then remove the highlight and
  delete from pageAnnotations
*/

function deleteNewSelection(id) {
  //no id when annotation has no associated text
  if (!id) {
    return;
  }

  let highlite = pageAnnotations[id]; //new highlite is not associated with a bookmark annotation so it doesn't have an 'aid' attribute

  if (highlite.aid) {
    return;
  } //remove highlight


  if (highlite.wrap) {
    highlite.wrap.unwrap();
  } else {} //console.log("deleteNewSelection: no wrap() in selection");
  //delete the annotation


  delete pageAnnotations[id];
}
/*
  unwrap selected text and delete
*/

function deleteSelection(id) {
  if (!id) {
    return;
  }

  let highlite = pageAnnotations[id];

  if (!highlite) {
    return;
  } //remove highlight


  if (highlite.wrap) {
    highlite.wrap.unwrap();
  } //delete the annotation


  delete pageAnnotations[id];
}
function getSelection(id) {
  return pageAnnotations[id];
}
function updateHighlightColor(id, sequence) {
  let colorClasses = ["colorClass1", "colorClass2", "colorClass3", "colorClass4", "colorClass5", "colorClass6"];
  $(`[data-annotation-id="${id}"]`).addClass(colorClasses[sequence % 6]);
}
/*
  Highlight selected text
  args:
    annotation: a bookmark annotation with selected text
    sequence: the sequence of this annotation within the paragraph
    sharePid: the pid of a shared bookmark, null otherwise. The pid is highlighted after
              the sharedPid is closed
*/

function markSelection(annotation, sequence = 0, sharePid = null) {
  let node = document.getElementById(annotation.pid);

  if (!sharePid || sharePid !== annotation.pid) {
    highlight(annotation, node);
    updateHighlightColor(annotation.id, sequence);
  } else if (sharePid) {
    //console.log("highlight of %s skipped due to share", sharePid);
    skippedAnnotations.push(annotation.id);
  }

  pageAnnotations[annotation.id] = annotation;
}
function updateSelectedText(id, aid) {
  $(`[data-annotation-id="${id}"]`).attr("data-aid", aid);
}
function highlight(annotation, toNode = document.body) {
  var anno_id = annotation.id;

  if (annotation.target.source) {
    var selectors = annotation.target.selector;

    for (var i = 0; i < selectors.length; i++) {
      var selector = selectors[i];
      var type = selector.type;

      switch (type) {
        case "TextPositionSelector":
          // skip existing marks
          var existing_marks = document.querySelectorAll(`[data-annotation-id="${anno_id}"]`);

          if (existing_marks.length === 0) {
            var mark = document.createElement("mark");
            mark.dataset["annotationId"] = anno_id; //the id of the bookmark annotation that contains this annotation

            if (annotation.aid) {
              mark.dataset["aid"] = annotation.aid;
            }

            mark.classList.add("bookmark-selected-text"); //this sometimes fails and is fixed by adjusting the selector

            var range;

            try {
              range = textPosition.toRange(toNode, selector);
              annotation.wrap = wrapRange(mark, range);
            } catch (err) {
              console.error("highlight catch bloc: err: %o", err);
              console.log("annotation: %o", annotation);
              /*
              selector.end--;
              range = textPosition.toRange(toNode, selector);
              annotation.wrap = wrapRange(mark, range);
              */
            }
          }

          break;
      }
    }
  }
}

function getSelectedText(range, fromNode = document.body) {
  if (range.collapsed) return null;
  var textPositionSelector = textPosition.fromRange(fromNode, range);
  Object.assign(textPositionSelector, {
    type: "TextPositionSelector"
  });
  var textQuoteSelector = textQuote.fromRange(fromNode, range);
  Object.assign(textQuoteSelector, {
    type: "TextQuoteSelector"
  });
  var selectedText = {
    type: "Annotation",
    title: $("#book-title").text(),
    url: location.pathname,
    pid: fromNode.id,
    //pid: range.startContainer.parentNode.id,
    id: Object(uuid__WEBPACK_IMPORTED_MODULE_2__["v4"])(),
    target: {
      type: "SpecificResource",
      source: location.href,
      selector: [textPositionSelector, textQuoteSelector]
    }
  };
  return selectedText;
}
/*
  Capture user text selection
*/


function initialize(constants) {
  $("div.transcript.ui").on("mouseup", function (e) {
    e.preventDefault(); //bookmarks enabled only for signed in users

    if (!Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])()) {
      return;
    } //ignore text selection when disabled by user or when annotation is 
    //being created


    if ($(this).hasClass("disable-selection")) {
      return;
    }

    if (document.getSelection().isCollapsed) {
      return;
    }

    let selObj = document.getSelection(); //Safari calls this function twice for each selection, the second time
    //rangeCount === 0 and type == "None"

    if (selObj.rangeCount === 0) {
      return;
    }

    if (selObj.getRangeAt(0).collapsed) {
      return;
    }

    processSelection(selObj);
  }); //init annotation input, edit, and delete

  Object(_annotate__WEBPACK_IMPORTED_MODULE_3__["initialize"])(constants);
}
/*
  create annotation from selected text
*/

function processSelection(selection) {
  let range = selection.getRangeAt(0); //new from user2

  if (range.commonAncestorContainer.nodeName === "DIV") {
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("error:e8")); //console.log("multi paragraph selection: start: %s, end: %s", rangeStart, rangeEnd);

    return;
  }

  if (range.startContainer.parentElement.localName === "span") {
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("error:e6")); //console.log("selection includes <p>");

    return;
  } //get the paragraph node for the range


  let pNode = range.startContainer;

  while (pNode.nodeName !== "P") {
    pNode = pNode.parentElement;
  } //let node = document.getElementById(rangeStart);
  //let node = document.getElementById(pNode.id);
  //create annotation


  let selectedText = getSelectedText(range, pNode);

  if (selectedText) {
    //check if selection contains any part of another selection
    let highlightedText = pNode.getElementsByTagName("mark");

    for (let ht of highlightedText) {
      if (selection.containsNode(ht, true)) {
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_6__["getString"])("error:e7")); //console.log("overlapping selections");

        return;
      }
    }

    highlight(selectedText, pNode); //persist annotation

    pageAnnotations[selectedText.id] = selectedText;
    Object(_annotate__WEBPACK_IMPORTED_MODULE_3__["getUserInput"])(selectedText);
  }
}

/***/ }),

/***/ "./src/js/modules/_bookmark/shareByEmail.js":
/*!**************************************************!*\
  !*** ./src/js/modules/_bookmark/shareByEmail.js ***!
  \**************************************************/
/*! exports provided: initShareByEmail, shareByEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initShareByEmail", function() { return initShareByEmail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "shareByEmail", function() { return shareByEmail; });
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/* harmony import */ var _ajax_share__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_ajax/share */ "./src/js/modules/_ajax/share.js");
/* harmony import */ var _util_sanitize__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_util/sanitize */ "./src/js/modules/_util/sanitize.js");




 //teaching specific constants

let teaching = {};
let shareInfo = {};
/*
 * format message to wrap pargraphs in <p> tags
 */

function formatMessage(message) {
  message = message.replace(/\n/g, "@@");
  message = message.replace(/@@*/g, "@@");
  let mArray = message.split("@@");
  message = mArray.reduce((current, p) => {
    return `${current}<p>${Object(_util_sanitize__WEBPACK_IMPORTED_MODULE_4__["purify"])(p)}</p>`;
  }, "");
  return message;
}
/*
 * Format recipientArray into a string of email addresses and
 * a structure of recipient variables per Mailgun
 */


function formatRecipientInfo(recipientArray) {
  let addresses = [];
  let info = {};
  recipientArray.forEach(i => {
    let [email, first, last] = i.split(":");
    addresses.push(email);
    info[email] = {
      first: first === "" ? "No First Name" : first,
      last: last === "" ? "No Last Name" : last
    };
  });
  return {
    to: addresses.join(","),
    variables: JSON.stringify(info)
  };
} //load email list and setup submit and cancel listeners


function initShareByEmail(constants) {
  teaching = constants; //loadEmailList();
  //submit

  $("form[name='emailshare']").on("submit", async function (e) {
    e.preventDefault();
    const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])();

    if (!userInfo) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.warning(Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("annotate:m14"));
      $(".email-share-dialog-wrapper").addClass("hide");
      return;
    }

    let formData = $("#email-share-form").form("get values");

    if (formData.mailList.length === 0 && formData.emailAddresses.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("error:e9"));
      return;
    }

    shareInfo.to = "";

    if (formData.mailList.length > 0) {
      let info = formatRecipientInfo(formData.mailList);
      shareInfo.to = info.to;
      shareInfo.variables = info.variables;
    }

    if (formData.emailAddresses.length > 0) {
      if (shareInfo.to.length > 0) {
        shareInfo.to = `${shareInfo.to}, ${formData.emailAddresses}`;
      } else {
        shareInfo.to = formData.emailAddresses;
      }
    }

    shareInfo.senderName = userInfo.name;
    shareInfo.senderEmail = userInfo.email;
    shareInfo.sid = teaching.sid;

    if (formData.emailMessage) {
      shareInfo.message = formatMessage(formData.emailMessage);
    } //hide form


    $(".email-share-dialog-wrapper").addClass("hide");

    try {
      let result = await Object(_ajax_share__WEBPACK_IMPORTED_MODULE_3__["sendMail"])(shareInfo);

      if (result === "success") {
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("action:emailsent"));
      } else {
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info(response.data.message);
      }
    } catch (err) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(err);
    }
  }); //cancel

  $("form[name='emailshare'] .email-share-cancel").on("click", function (e) {
    e.preventDefault(); //hide form

    $(".email-share-dialog-wrapper").addClass("hide");
  });
} //generate the option element of a select statement

function generateOption(item) {
  return `<option value="${item.address}:${item.first}:${item.last}">${item.first} ${item.last}</option>`;
}
/*
 * Call getString() with second arg 'true' so that it returns a promise. This was necessary
 * because the language file might not have been loaded when getString() was called.
 *
 * This is no longer necessary since we don't call this on page load anymore, just when the
 * user requests sharing by email. I didn't change the code to remove promises though, but I
 * could since they are no longer needed.
 */


function makeMaillistSelect(maillist) {
  return new Promise((resolve, reject) => {
    let listnames = Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("label:listnames", true);
    let selectaddress = Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("label:selectaddress", true);
    Promise.all([listnames, selectaddress]).then(resp => {
      resolve(`
        <label>${resp[0]}</label>
        <select name="mailList" id="maillist-address-list" multiple="" class="search ui dropdown">
          <option value="">${resp[1]}</option>
          ${maillist.map(item => `${generateOption(item)}`).join("")}
        </select>
      `);
    });
  });
}
/*
  Called by initShareByEmail()
  - load only when user signed in, fail silently, it's not an error

  NOTE: WE DON'T CALL THIS ANYMORE. THE CODE has been added to shareByEmail()
*/


async function loadEmailList() {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])();
  if (!userInfo) return;

  try {
    let mailList = await Object(_ajax_share__WEBPACK_IMPORTED_MODULE_3__["getMailList"])(userInfo.userId);
    let selectHtml = await makeMaillistSelect(mailList);
    $("#maillist-select").html(selectHtml);
    $("#maillist-address-list.dropdown").dropdown();
  } catch (err) {
    toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("error:e10")}: ${err}`);
  }
}
/*
 * Show mail list dialog when sharing by email. Load mail list if
 * not already loaded
*/


let mailListLoaded = false;
async function shareByEmail(quote, citation, url) {
  const userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_1__["getUserInfo"])();
  shareInfo = {
    citation,
    quote,
    url
  };
  $(".hide.email-share-dialog-wrapper").removeClass("hide");

  if (!mailListLoaded) {
    try {
      $(".email-share-loader").addClass("active");
      let mailList = await Object(_ajax_share__WEBPACK_IMPORTED_MODULE_3__["getMailList"])(userInfo.userId);
      let selectHtml = await makeMaillistSelect(mailList);
      $("#maillist-select").html(selectHtml);
      $("#maillist-address-list.dropdown").dropdown();
      mailListLoaded = true;
      $(".email-share-loader").removeClass("active");
    } catch (err) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_2__["getString"])("error:e10")}: ${err}`);
    }
  }
}

/***/ }),

/***/ "./src/js/modules/_bookmark/start.js":
/*!*******************************************!*\
  !*** ./src/js/modules/_bookmark/start.js ***!
  \*******************************************/
/*! exports provided: bookmarkStart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bookmarkStart", function() { return bookmarkStart; });
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bookmark */ "./src/js/modules/_bookmark/bookmark.js");
/* harmony import */ var _shareByEmail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shareByEmail */ "./src/js/modules/_bookmark/shareByEmail.js");
/* harmony import */ var _share_share__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_share/share */ "./src/js/modules/_share/share.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../constants */ "./src/js/constants.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_config/config */ "./src/js/modules/_config/config.js");
/*
  Initialize bookmark modules
*/
//bookmark code common to all teachings


 //teaching specific 


 //export function bookmarkStart(pid) {

function bookmarkStart(page) {
  let pid;

  if (page === "transcript") {
    _share_share__WEBPACK_IMPORTED_MODULE_2__["default"].initialize(_constants__WEBPACK_IMPORTED_MODULE_3__["default"]).then(pid => {
      _bookmark__WEBPACK_IMPORTED_MODULE_0__["default"].initialize(pid, _constants__WEBPACK_IMPORTED_MODULE_3__["default"]);
    }); //get page info and set as heading under '?' menu option

    let key = _constants__WEBPACK_IMPORTED_MODULE_3__["default"].keyInfo.genPageKey();
    Object(_config_config__WEBPACK_IMPORTED_MODULE_4__["getPageInfo"])(key).then(info => {
      //console.log("pageInfo: %o", info);
      let title = `${info.source}<br/>${info.bookTitle}`;

      if (info.subTitle) {
        title = `${title}<br/>${info.subTitle}`;
      }

      title = `${title}<br/>${info.title}`;
      $("#transcript-page-info").html(title);
    });
  } else {
    _bookmark__WEBPACK_IMPORTED_MODULE_0__["default"].initialize(pid, _constants__WEBPACK_IMPORTED_MODULE_3__["default"]);
  }

  Object(_shareByEmail__WEBPACK_IMPORTED_MODULE_1__["initShareByEmail"])(_constants__WEBPACK_IMPORTED_MODULE_3__["default"]);
}

/***/ }),

/***/ "./src/js/modules/_bookmark/topics.js":
/*!********************************************!*\
  !*** ./src/js/modules/_bookmark/topics.js ***!
  \********************************************/
/*! exports provided: bookmarksLoaded, noMoreBookmarks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bookmarksLoaded", function() { return bookmarksLoaded; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "noMoreBookmarks", function() { return noMoreBookmarks; });
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/* harmony import */ var _bookmark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bookmark */ "./src/js/modules/_bookmark/bookmark.js");
/*
 * Keeps track of topics used by page annotations that have selectedText
 *
 * The list of topics is added to the bookmark menu option on transcript pages
 * and allows the user to show only highlighted text of the selected topic.
 *
 * When the user selects a topic, the class .topic-filter-active is added to .transcript
 * and the class .show is added to each highlight containing the selected topic. This works
 * because each highlight contains a class that corresponds to each topic the annotation 
 * contains.
*/


const uiPageTopicsModal = "#page-topics-modal";
const uiOpenPageTopicsModal = "#page-topics-modal-open";
const uiModalOpacity = 0.5; //generate the option element of a select statement

function generateOption(topic) {
  return `<option value="${topic.value}">${topic.topic}</option>`;
} //generate select html for Topics


function makeTopicSelect(topics) {
  return `
    <select name="pageTopicList" id="page-topics-topic-list" class="search ui dropdown">
      <option value="">Choose a topic</option>
      ${topics.map(topic => `${generateOption(topic)}`).join("")}
    </select>
  `;
}

function formatTopic(topic) {
  if (topic === "__reset__") {
    return `<div class='reset-filter item'>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:clearfilter")}</div>`;
  }

  return `<div class="item">${topic}</div>`;
}

function makeTopicSelectElement() {
  let topicMap = _bookmark__WEBPACK_IMPORTED_MODULE_1__["localStore"].getTopics();
  let topicKeys = Array.from(topicMap.keys());
  let topics = topicKeys.map(key => {
    return topicMap.get(key);
  });
  topics.sort((a, b) => {
    if (a.value < b.value) {
      return -1;
    }

    if (a.value > b.value) {
      return 1;
    }

    return 0;
  });
  return makeTopicSelect(topics);
}

function getTopics() {
  return topics;
}
/*
  Generate html for page topic list and reset listRefreshNeeded indicator
*/


function makeTopicList() {
  let topicMap = _bookmark__WEBPACK_IMPORTED_MODULE_1__["localStore"].getTopics();
  let topicKeys = Array.from(topicMap.keys());
  let topics = topicKeys.map(key => {
    let t = topicMap.get(key);
    return t.topic;
  });
  _bookmark__WEBPACK_IMPORTED_MODULE_1__["localStore"].topicRefreshNeeded = false;

  if (topics.length === 0) {
    return `<div class='ntf item'>${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("annotate:m15")}</div>`;
  }

  topics.sort();
  topics.unshift("__reset__");
  return `
    ${topics.map(topic => `${formatTopic(topic)}`).join("")}
  `;
} //topic selection click handler


function topicSelectHandler() {
  $("#topic-menu-item").on("click", "#topic-menu-select > .item", function (e) {
    e.preventDefault(); //class .ntf indicates there are no topics, so just return

    if ($(this).hasClass("ntf")) {
      return;
    }

    let active; //clear the topic filter

    if ($(this).hasClass("reset-filter")) {
      active = $("#topic-menu-select > .active.item"); //check for unexpected condition

      if (active.length === 0) {
        return;
      }

      let activeTopic = active.text();

      if (activeTopic === "Clear Filter") {
        //there is not active filter so return
        return;
      }

      active.removeClass("active"); //remove .show from previously selected highlights

      $(`mark.bookmark-selected-text.${activeTopic}`).removeClass("show"); //remove filter indication from .transcript

      $(".transcript").removeClass("topic-filter-active"); //reset header text

      $("#topic-menu-item").prev(".header").text(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:topicfilter")}: None`);
      $("#topic-menu-item").prev(".header").attr("data-filter", "none");
      return;
    } //filter already active


    if ($(this).hasClass("active")) {
      return;
    } //look for already active filter and remove it


    active = $("#topic-menu-select > .active.item");

    if (active.length > 0) {
      let activeTopic = active.text();
      active.removeClass("active"); //remove .show from previously selected highlights

      $(`mark.bookmark-selected-text.${activeTopic}`).removeClass("show");
    } //mark topic as active


    $(this).addClass("active"); //mark transcript as having an active filter

    $(".transcript").addClass("topic-filter-active"); //add class .show to each highlight containing the selected topic

    let topic = $(this).text(); //check for multi-word topic and remove spaces

    if (/ /.test(topic)) {
      topic = topic.replace(/ /g, "");
    }

    $(`mark.bookmark-selected-text.${topic}`).addClass("show"); //mark menu option as having an active filter

    $("#topic-menu-item").prev(".header").html(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:topicfilter")}: <span class="red">${topic}</span>`);
    $("#topic-menu-item").prev(".header").attr("data-filter", topic);
  });
}
/*
 * Initialize topics modal for filter topics on page
 */


let initialized = false;
function bookmarksLoaded() {
  if (!initialized) {
    initPageTopicsModal();
    initialized = true;
    return;
  }

  $("#bookmark-filter-wrapper").removeClass("hide");
}
/*
 * Hide topics modal, no mor topics on page
 */

function noMoreBookmarks() {
  $("#bookmark-filter-wrapper").addClass("hide");
}
/*
  Get topic select element for page-topic-modal
*/

function getTopicList() {
  if (!_bookmark__WEBPACK_IMPORTED_MODULE_1__["localStore"].topicRefreshNeeded) return;
  let selectHtml = makeTopicSelectElement();
  $("#page-topics-modal-topic-select").html(selectHtml);
  $("#page-topics-topic-list").dropdown();
  $("#page-topics-modal-loading").removeClass("active").addClass("disabled");
  _bookmark__WEBPACK_IMPORTED_MODULE_1__["localStore"].topicRefreshNeeded = false;
}
/*
 * Called by bookmark.js after bookmarks have been loaded on 
 * transcript page.
 */


function initPageTopicsModal() {
  //show topic filter options
  $("#bookmark-filter-wrapper").removeClass("hide"); //init topic filter modal dialog

  $(uiPageTopicsModal).modal({
    dimmerSettings: {
      opacity: uiModalOpacity
    },
    autofocus: false,
    centered: true,
    duration: 400,
    inverted: true,
    observeChanges: true,
    transition: "horizontal flip",
    onShow: function () {
      getTopicList();
    },
    onVisible: function () {},
    onHidden: function () {}
  });
  $(uiOpenPageTopicsModal).on("click", e => {
    e.preventDefault(); //populateBookmarkModal(uiBookmarkModalDiv);

    $(uiPageTopicsModal).modal("show");
  });
  filterSubmitHandler();
  filterResetHandler();
}
/*
  Apply topic filter to bookmarks on page
*/


function filterSubmitHandler() {
  $("#page-topics-filter-submit").on("click", function (e) {
    e.preventDefault();
    let form = $("#page-topics-filter-form");
    let filterTopic = form.form("get value", "pageTopicList");
    let topicTopic = $(`#page-topics-topic-list > [value='${filterTopic}']`).text();
    setTopicFilter({
      value: filterTopic,
      topic: topicTopic
    });
  });
}
/*
  Clear bookmark filter
*/


function filterResetHandler() {
  //clear filter
  $(".page-topics-filter-reset").on("click", function (e) {
    e.preventDefault(); //mark transcript as having an active filter

    if ($(".transcript").hasClass("topic-filter-active")) {
      //clear active filter
      let currentFilter = $("#current-topic-filter").attr("data-filter");
      $(`mark.bookmark-selected-text.${currentFilter}`).removeClass("show");
    }

    $(".transcript").removeClass("topic-filter-active");
    $("#page-topics-topic-list").dropdown("clear"); //clear active filter from menu

    $("#current-topic-filter").html(`${Object(_language_lang__WEBPACK_IMPORTED_MODULE_0__["getString"])("label:topicfilter")}: None`);
    $("#current-topic-filter").attr("data-filter", ""); //mark bookmark icon green - no filter applied

    $("#bookmark-dropdown-menu > span  i.bookmark-icon").eq(0).removeClass("yellow").addClass("green"); //close the modal
    //$(uiPageTopicsModal).modal("hide");
  });
}
/*
  Show selected text from bookmarks that contain topic. If there is an active filter
  already clear it first.

  Args: topic; show only bookmarks with this topic
*/


function setTopicFilter(topic) {
  //mark transcript as having an active filter
  if ($(".transcript").hasClass("topic-filter-active")) {
    //clear active filter
    let currentFilter = $("#current-topic-filter").attr("data-filter"); //new filter is the same as the current, no need to do anything

    if (currentFilter === topic.value) {
      return;
    }

    $(`mark.bookmark-selected-text.${currentFilter}`).removeClass("show");
  } else {
    $(".transcript").addClass("topic-filter-active");
  }

  $(`mark.bookmark-selected-text.${topic.value}`).addClass("show"); //mark menu option as having an active filter

  $("#current-topic-filter").html(`Topic Filter: <span class="red">${topic.topic}</span>`);
  $("#current-topic-filter").attr("data-filter", topic.value); //mark bookmark icon as yellow - filter is applied

  $("#bookmark-dropdown-menu > span i.bookmark-icon").eq(0).removeClass("green").addClass("yellow"); //close the modal

  $(uiPageTopicsModal).modal("hide");
}

/***/ }),

/***/ "./src/js/modules/_config/config.js":
/*!******************************************!*\
  !*** ./src/js/modules/_config/config.js ***!
  \******************************************/
/*! exports provided: getConfig, loadConfig, getPageInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadConfig", function() { return loadConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageInfo", function() { return getPageInfo; });
/* harmony import */ var _util_cmi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_util/cmi */ "./src/js/modules/_util/cmi.js");
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var _status__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./status */ "./src/js/modules/_config/status.js");
//import store from "store";




const transcript = __webpack_require__(/*! ./key */ "./src/js/modules/_config/key.js"); //this is the id used on aws s3 to store audio files


const SOURCE_ID = "www";
const SOURCE = "CMI Library"; //location of configuration files

const configUrl = "/public/config"; //the current configuration, initially null, assigned by getConfig()

let config;
/**
 * Get the configuration file for 'book'. If it's not found in
 * the cache (local storage) then get it from the server and 
 * save it in cache.
 *
 * @param {string} book - the book identifier
 * @param {boolean} assign - true if the config is to be assigned to global config variable
 * @returns {promise}
 */

function getConfig(book, assign = true) {
  let lsKey = `cfg${book}`;
  let url = `${configUrl}/${book}.json`;
  return new Promise((resolve, reject) => {
    Object(_util_cmi__WEBPACK_IMPORTED_MODULE_0__["fetchConfiguration"])(url, lsKey, _status__WEBPACK_IMPORTED_MODULE_2__["status"]).then(resp => {
      if (assign) {
        config = resp;
      }

      resolve(resp);
    }).catch(err => {
      reject(err);
    });
  });
}
/**
 * Load the configuration file for 'book'. If it's not found in
 * the cache (local storage) then get it from the server and 
 * save it in cache.
 *
 * @param {string} book - the book identifier
 * @returns {promise}
 */

function loadConfig(book) {
  let lsKey = `cfg${book}`;
  let url = `${configUrl}/${book}.json`; //"book" is a single page, no configuration

  if (!book) {
    return Promise.resolve(false);
  }

  return new Promise((resolve, reject) => {
    Object(_util_cmi__WEBPACK_IMPORTED_MODULE_0__["fetchConfiguration"])(url, lsKey, _status__WEBPACK_IMPORTED_MODULE_2__["status"]).then(resp => {
      config = resp;
      resolve(true);
    }).catch(error => {
      config = null;
      console.error(error);
      reject(error);
    });
  });
}
/*
  Given a page key, return data from a config file

  returns: book title, page title, url and optionally subtitle.

  args:
    pageKey: a key uniquely identifying a transcript page
    data: optional, data that will be added to the result, used for convenience
*/

function getPageInfo(pageKey, data = false) {
  let decodedKey = transcript.decodeKey(pageKey);
  let info = {
    pageKey: pageKey,
    source: SOURCE,
    bookId: decodedKey.bookId
  };

  if (data) {
    info.data = data;
  }

  return new Promise((resolve, reject) => {
    //get configuration data specific to the bookId
    getConfig(decodedKey.bookId, false).then(data => {
      info.bookTitle = data.title;
      info.title = data.contents[decodedKey.uid].title;
      info.url = `${data.base}${data.contents[decodedKey.uid].url}`;
      resolve(info);
    }).catch(error => {
      reject(error);
    });
  });
}

/***/ }),

/***/ "./src/js/modules/_config/key.js":
/*!***************************************!*\
  !*** ./src/js/modules/_config/key.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
  WWW: Transcript keys
  - first item starts with 1, not 0
  - a numeric value that represents a specific transcript and represents
    a specific logical ordering.

  - The integer part of the key represent a transcript and the decimal part
    a paragraph within the transcript.
  - The paragraphId is increased by 1 and divided by 1000

  key format: ssbbuuu.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
        ppp: paragraph number - not positional

  NOTE: This module is used by code running in the browser and Node so the
        common.js module system is used
*/
//import indexOf from "lodash/indexOf";
const sprintf = __webpack_require__(/*! sprintf-js */ "./node_modules/sprintf-js/src/sprintf.js").sprintf; //source id: each source has a unique id
//WWW = 99 This is the Library


const sourceId = 99;
const sid = "www";
const prefix = ""; //length of pageKey excluding decimal portion

const keyLength = 7; // books (bid)

const books = ["acq", "profile"];
const bookIds = ["xxx", ...books];
const profile = ["xxx", "email", "topicMgt"];
const acq = ["xxx", "welcome", "overview", "quick", "bookmark", "search", "audio", "accounts", "profile", "video", "email", "tech", "contact"];
const contents = {
  acq: acq,
  profile: profile
};

function splitUrl(url) {
  let u = url; //remove leading "/"

  u = url.substr(1); //remove trailing '/' if it exists

  if (u[u.length - 1] === "/") {
    u = u.substr(0, u.length - 1);
  }

  return u.split("/");
}
/*
  return the position of unit in the bid array
*/


function getUnitId(bid, unit) {
  if (contents[bid]) {
    return contents[bid].indexOf(unit);
  } else {
    throw new Error(`unexpected bookId: ${bid}`);
  }
}

function getSourceId() {
  return sourceId;
}

function getKeyInfo() {
  return {
    sourceId: sourceId,
    keyLength: keyLength
  };
}
/*
  parse bookmarkId into pageKey and paragraphId
  - pid=0 indicates no paragraph id
*/


function parseKey(key) {
  const keyInfo = getKeyInfo();
  let keyString = key;
  let pid = 0;

  if (typeof keyString === "number") {
    keyString = key.toString(10);
  }

  let decimalPos = keyString.indexOf("."); //if no decimal key doesn't include paragraph id

  if (decimalPos > -1) {
    let decimalPart = keyString.substr(decimalPos + 1); //append 0's if decimal part < 3

    switch (decimalPart.length) {
      case 1:
        decimalPart = `${decimalPart}00`;
        break;

      case 2:
        decimalPart = `${decimalPart}0`;
        break;
    }

    pid = parseInt(decimalPart, 10);
  }

  let pageKey = parseInt(keyString.substr(0, keyInfo.keyLength), 10);
  return {
    pid,
    pageKey
  };
}
/*
  Convert url into key
  returns -1 for non-transcript url

  key format: ssbuuIqq.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
        ppp: paragraph number - not positional
*/


function genPageKey(url = location.pathname) {
  let key = {
    sid: sourceId,
    bid: 0,
    uid: 0,
    qid: 0
  };
  let parts = splitUrl(url); //key.bid = indexOf(bookIds, parts[0]);

  key.bid = bookIds.indexOf(parts[0]);

  if (key.bid === -1) {
    return -1;
  }

  key.uid = getUnitId(parts[0], parts[1]);

  if (key.bid === -1) {
    return -1;
  }

  let compositeKey = sprintf("%02s%02s%03s", key.sid, key.bid, key.uid);
  let numericKey = parseInt(compositeKey, 10);
  return numericKey;
}
/*
  genParagraphKey(paragraphId, key: url || pageKey)

  args:
    pid: a string representing a transcript paragraph, starts as "p0"..."pnnn"
         - it's converted to number and incremented by 1 then divided by 1000
        pid can also be a number so then we just increment it and divide by 1000

    key: either a url or pageKey returned from genPageKey(), if key
   is a string it is assumed to be a url
*/


function genParagraphKey(pid, key = location.pathname) {
  let numericKey = key;
  let pKey;

  if (typeof pid === "string") {
    pKey = (parseInt(pid.substr(1), 10) + 1) / 1000;
  } else {
    pKey = (pid + 1) / 1000;
  } //if key is a string it represents a url


  if (typeof key === "string") {
    numericKey = genPageKey(key);
  }

  let paragraphKey = numericKey + pKey;
  return paragraphKey;
}
/*
  key format: ssbuuIqq.ppp
  where: ss: source Id
         bb: book Id
        uuu: unit Id
        ppp: paragraph number - not positional
*/


function decodeKey(key) {
  let {
    pid,
    pageKey
  } = parseKey(key);
  let pageKeyString = pageKey.toString(10);
  let decodedKey = {
    error: 0,
    message: "ok",
    sid: sourceId,
    bookId: "",
    uid: 0,
    pid: pid - 1
  }; //error, invalid key length

  if (pageKeyString.length !== keyLength) {
    decodedKey.error = true;
    decodedKey.message = `Integer portion of key should have a length of ${keyLength}, key is: ${pageKeyString}`;
    return decodedKey;
  }

  let bid = parseInt(pageKeyString.substr(2, 2), 10);
  decodedKey.bookId = bookIds[bid]; //subtract 1 from key value to get index

  decodedKey.uid = parseInt(pageKeyString.substr(4, 3), 10) - 1;
  return decodedKey;
}

function getBooks() {
  return books;
}
/*
  Return the number of chapters in the book (bid).
  Subtract one from length because of 'xxx' (fake chapter)
*/


function getNumberOfUnits(bid) {
  if (contents[bid]) {
    return contents[bid].length - 1;
  } else {
    throw new Error(`getNumberOfUnits() unexpected bookId: ${bid}`);
  }
}
/*
 * Convert page key to url
 */


function getUrl(key) {
  let decodedKey = decodeKey(key);
  let unit = "invalid";

  if (decodedKey.error) {
    return "/invalid/key/";
  }

  if (contents[decodedKey.bookId]) {
    unit = contents[decodedKey.bookId][decodedKey.uid + 1];
  }

  return `/${decodedKey.bookId}/${unit}/`;
}
/*
  Describe key in terms of source:book:unit:p
*/


function describeKey(key) {
  let decodedKey = decodeKey(key, false);

  if (decodedKey.error) {
    return {
      key: key,
      error: true,
      source: sid
    };
  }

  let info = {
    key: key,
    source: sid,
    book: decodedKey.bookId,
    unit: contents[decodedKey.bookId][decodedKey.uid]
  };

  if (decodedKey.pid > -1) {
    info.pid = `p${decodedKey.pid}`;
  }

  return info;
}

module.exports = {
  getNumberOfUnits: getNumberOfUnits,
  getBooks: getBooks,
  getSourceId: getSourceId,
  getKeyInfo: getKeyInfo,
  parseKey: parseKey,
  getUnitId: getUnitId,
  genPageKey: genPageKey,
  genParagraphKey: genParagraphKey,
  decodeKey: decodeKey,
  getUrl: getUrl,
  describeKey: describeKey
};

/***/ }),

/***/ "./src/js/modules/_config/status.js":
/*!******************************************!*\
  !*** ./src/js/modules/_config/status.js ***!
  \******************************************/
/*! exports provided: status */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "status", function() { return status; });
const status = {
  acq: "Tue Mar 26 00:01:19 HST 2019",
  profile: "Tue Jan 21 14:24:49 HST 2020"
};

/***/ }),

/***/ "./src/js/modules/_contents/toc.js":
/*!*****************************************!*\
  !*** ./src/js/modules/_contents/toc.js ***!
  \*****************************************/
/*! exports provided: getBookId, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBookId", function() { return getBookId; });
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scroll-into-view */ "./node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_config/config */ "./src/js/modules/_config/config.js");
/* harmony import */ var _config_key__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_config/key */ "./src/js/modules/_config/key.js");
/* harmony import */ var _config_key__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_config_key__WEBPACK_IMPORTED_MODULE_2__);



const uiTocModal = ".toc.ui.modal";
const uiOpenTocModal = ".toc-modal-open";
const uiModalOpacity = 0.5;
/*
  generate toc html for flat config file
*/

function makeContents(base, contents) {
  return `
    <div class="ui relaxed ordered list">
      ${contents.map((content, pidx) => `
        <a data-lid="${pidx + 1}" class="item" href="${base}${content.url}">${content.title}</a>`).join("")}
    </div>
  `;
}
/*
  set next/prev controls on menu for workbook transcripts
*/


function nextPrev(bid, $el) {
  var LAST_ID = _config_key__WEBPACK_IMPORTED_MODULE_2___default.a.getNumberOfUnits(bid);
  let prevId = -1,
      nextId = -1,
      href,
      text;
  let lid = $el.attr("data-lid");
  let lessonId = parseInt(lid, 10); //disable prev control

  if (lessonId === 1) {
    $("#toc-previous-page").addClass("disabled");
  } else {
    $("#toc-previous-page").removeClass("disabled");
    prevId = lessonId - 1;
  } //disable next control


  if (lessonId === LAST_ID) {
    $("#toc-next-page").addClass("disabled");
  } else {
    $("#toc-next-page").removeClass("disabled");
    nextId = lessonId + 1;
  }

  if (prevId > -1) {
    href = $(`a[data-lid="${prevId}"]`).attr("href");
    text = $(`a[data-lid="${prevId}"]`).text(); //set prev tooltip and href

    $("#toc-previous-page > span").attr("data-tooltip", `${text}`);
    $("#toc-previous-page").attr("href", `${href}`);
  }

  if (nextId > -1) {
    href = $(`a[data-lid="${nextId}"]`).attr("href");
    text = $(`a[data-lid="${nextId}"]`).text(); //set prev tooltip and href

    $("#toc-next-page > span").attr("data-tooltip", `${text}`);
    $("#toc-next-page").attr("href", `${href}`);
  }
}
/*
  If we're on a transcript page, highlight the
  current transcript in the list and calc prev and next
  links

  Args:
    bid: bookId, 'text', 'workbook', 'manual'

    Bid is needed in case next and previous are determinded differently depending on book
*/


function highlightCurrentTranscript(bid) {
  if ($(".transcript").length > 0 || $(".profile-page").length > 0) {
    let page = location.pathname;
    let $el = $(`.toc-list a[href='${page}']`); //remove href to deactivate link for current page

    $el.addClass("current-unit").removeAttr("href");

    switch (bid) {
      case "vol":
      case "vol2":
        break;

      default:
        nextPrev(bid, $el);
        break;
    }
  }
} //called for transcript pages


function loadTOC() {
  //console.log("transcript page: loading toc");
  let book = $("#contents-modal-open").attr("data-book").toLowerCase();
  Object(_config_config__WEBPACK_IMPORTED_MODULE_1__["getConfig"])(book).then(contents => {
    $(".toc-image").attr("src", `${contents.image}`);
    $(".toc-title").html(`Table of Contents: <em>${contents.title}</em>`);
    $(".toc-list").html(makeContents(contents.base, contents.contents));
    highlightCurrentTranscript(contents.bid);
  }).catch(error => {
    console.error(error);
    $(".toc-image").attr("src", "/public/img/cmi/toc_modal.png");
    $(".toc-title").html("Table of Contents: <em>Error</em>");
    $(".toc-list").html(`<p>Error: ${error.message}</p>`);
    $(uiTocModal).modal("show");
  });
}
/*
  Calls to this function are valid for transcript pages.
*/


function getBookId() {
  return $(uiOpenTocModal).attr("data-book");
}
/* harmony default export */ __webpack_exports__["default"] = ({
  /*
   * Init the modal dialog with data from JSON file
   * or local storage
   */
  initialize: function (env) {
    //modal dialog settings
    $(uiTocModal).modal({
      dimmerSettings: {
        opacity: uiModalOpacity
      },
      observeChanges: true,
      onVisible: function () {
        let $el = $(".toc-list a.current-unit");
        scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default()($el.get(0), {
          isScrollable: function (target, defaultIsScrollable) {
            return defaultIsScrollable(target) || target.className.includes('scrolling');
          }
        });
      }
    }); //load toc once for transcript pages

    if (env === "transcript") {
      loadTOC();
    }
    /*
     * TOC populated by JSON file from AJAX call if not found
     * in local storage.
     *
     * Read value of data-book attribute to identify name of file
     * with contents.
     */


    $(uiOpenTocModal).on("click", e => {
      e.preventDefault();
      let book = $(e.currentTarget).attr("data-book").toLowerCase(); //load the TOC if we're not on a transcript page

      if (env !== "transcript") {
        Object(_config_config__WEBPACK_IMPORTED_MODULE_1__["getConfig"])(book).then(contents => {
          $(".toc-image").attr("src", `${contents.image}`);
          $(".toc-title").html(`Table of Contents: <em>${contents.title}</em>`);
          $(".toc-list").html(makeContents(contents.base, contents.contents));
          $(uiTocModal).modal("show");
        }).catch(error => {
          console.error(error);
          $(".toc-image").attr("src", "/public/img/cmi/toc_modal.png");
          $(".toc-title").html("Table of Contents: <em>Error</em>");
          $(".toc-list").html(`<p>Error: ${error.message}</p>`);
          $(uiTocModal).modal("show");
        });
      } else {
        $(uiTocModal).modal("show");
      }
    });
  }
});

/***/ }),

/***/ "./src/js/modules/_language/lang.js":
/*!******************************************!*\
  !*** ./src/js/modules/_language/lang.js ***!
  \******************************************/
/*! exports provided: setLanguage, getString, __lang */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLanguage", function() { return setLanguage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getString", function() { return getString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__lang", function() { return __lang; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_1__);
/*
 * Support for language translation in code shared by CMI sources. Many modules in cmi-www
 * are used by the other sources and this module supplies translations for prompts and labels
 * that are set programatically.
 */


const [NOTLOADED, LOADING, LOADED, FAILED] = [0, 1, 2, 3];
let status = NOTLOADED;
let language = {
  notReady: true
};
/*
 * Load language file for prompts set programatically
 *
 * English is the default and stored in /public/lang/en.json.
 * Non english languages are stored in /t/<sid>/public/lang/??.json.
 */

function setLanguage(constants) {
  let lang = "en";
  let url;

  if (status === LOADED) {
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.warning("language already loaded");
    return;
  } //loading started


  status = LOADING;

  if (constants.lang) {
    lang = constants.lang;
  }

  url = `/public/lang/${lang}.json`;

  if (lang !== "en" && constants.env === "integration") {
    url = `${constants.url_prefix}${url}`;
  } //console.log("requesting lang: %s.json from: %s", lang, url);


  axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url).then(response => {
    //console.log("language %o", response.data);
    language = response.data;
    status = LOADED; //console.log("%s loaded", lang);
  }).catch(error => {
    status = FAILED;
    toastr__WEBPACK_IMPORTED_MODULE_1___default.a.error(`Failed to load language: ${lang}`);
    console.error("language load failed: %o", error);
  });
}
/*
 * Wait for language data to be loaded and return translation
 * for key s:k.
 *
 * If status == LOADING wait for 250ms up to 8 times for the status
 * to change. Bail if it doens't change.
 */

function waitForReady(s, k, timeoutValue) {
  return new Promise((resolve, reject) => {
    function wait(s, k, ms, max = 10, cnt = 0) {
      if (status === LOADING) {
        if (cnt <= max) {
          setTimeout(() => wait(s, k, ms, max, cnt + 1), ms);
        } else {
          console.error("timeout waiting for language to load: '%s:%s'", s, k);

          if (timeoutValue) {
            resolve(timeoutValue);
          } else {
            resolve("timeout");
          }

          return;
        }
      } else {
        resolve(keyValue(s, k));
        return;
      }
    }

    if (status == LOADING) {
      wait(s, k, 250);
    } else {
      resolve(keyValue(s, k));
    }
  });
}
/*
 * Get the translation for key [s:k].
 *
 * Return "not loaded" if setLanguage() has not been called, or
 * "loading" or "failed" if the language file is not ready.
 *
 * Return translated value otherwise.
 *
 * Note: if "loading" is return getString() should be called with the second
 * argument "true" so it return a promise and getString() will return the
 * translation when the file is ready.
 */


function keyValue(s, k) {
  let value;

  if (status === NOTLOADED) {
    value = `not loaded(${s}:${k})`;
    console.error(value);
    return value;
  }

  if (status !== LOADED) {
    if (status === LOADING) {
      value = `loading(${s}:${k})`;
      console.error(value);
    } else {
      value = `failed(${s}:${k})`;
      console.error(value);
    }

    return value;
  }

  if (!language[s]) {
    return null;
  }

  if (!k) {
    return language[s];
  }

  if (!language[s][k]) {
    return null;
  }

  return language[s][k];
}
/*
 * Get trnaslation for argument 'key'. Key can be in two parts
 * delimited by a ':'. The second part is optional.
 *
 * When arg: wait is true, getString() returns a promise. Use this
* if getString() returns a value of "loading(s:k)" to wait until
* language file is loaded before requesting a translation.
*/


function getString(key, wait = false, timeoutValue) {
  if (typeof key !== "string") {
    return null;
  }

  let [s, k] = key.split(":");

  if (wait) {
    return waitForReady(s, k, timeoutValue);
  }

  return keyValue(s, k);
}
/*
 * This is a tagged template function that populates
 * a template string with values from the language
 * object.
 *
 * Note: This won't work when called before the language
 * file is loaded and ready.
 */

function __lang(strings, ...values) {
  const tokens = values.map(value => {
    let t = getString(value);

    if (!t) {
      return value;
    }

    return t;
  });
  let newString = strings.reduce((result, string, i) => {
    let token = tokens[i];

    if (typeof token === "undefined") {
      token = "";
    }

    return `${result}${string}${token}`;
  }, "");
  return newString;
}

/***/ }),

/***/ "./src/js/modules/_page/startup.js":
/*!*****************************************!*\
  !*** ./src/js/modules/_page/startup.js ***!
  \*****************************************/
/*! exports provided: initTopicPage, initTranscriptPage, initStickyMenu, initAnimation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initTopicPage", function() { return initTopicPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initTranscriptPage", function() { return initTranscriptPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initStickyMenu", function() { return initStickyMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initAnimation", function() { return initAnimation; });
/* harmony import */ var gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gsap */ "./node_modules/gsap/index.js");
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");


let storeKey;
function initTopicPage() {
  initStickyMenu();
}
function initTranscriptPage(key) {
  //local storage key to save paragraph number display state
  storeKey = key;
  initStickyMenu();
  labelParagraphs();
  setParagraphNumberDisplayState();
  createParagraphNumberToggleListener();
}
/*
 * For all transcript paragraphs -
 *   That are not footnotes and that don't have class .omit
 *
 * Assign id="p + paragraph number" and class="cmiTranPara"
 *
 * This is used for bookmarks and audio playback and also represent
 * paragraphs that are indexed for search
 *
 * This code is specific to transcript pages but included in
 * common.js because bookmarks and playfromhere features depend
 * on paragraphs having class cmiTranPara.
 */

function labelParagraphs() {
  var count = 0;
  var omit = 0;
  var transcriptParagraphs = $(".transcript p");

  if (transcriptParagraphs.length === 0) {
    return;
  } //add .cmiTranPara, #id and paragraph numbers to each paragraph that doesn't have .omit


  transcriptParagraphs.each(function (idx) {
    //skip omitted paragraphs (they are omitted in the markdown file)
    if ($(this).hasClass("omit")) {
      omit++;
      return;
    } //skip footnote paragraphs


    if ($(this).parents("div.footnotes").length > 0) {
      //console.log("footnote paragraph");
      return;
    }

    count++;
    $(this).attr("id", "p" + idx).addClass("cmiTranPara").prepend(`<span class='pnum'>(p${idx})&nbsp;</span>`);
  }); //log number of not omitted paragraphs
  //-- used to verify search indexing
  //console.log("page: number of paragraphs: %s", count + omit);
  //console.log("conf: number of paragraphs: %s", config.unit.pNum);
} //create listener to toggle display of paragraph numbers


function createParagraphNumberToggleListener() {
  $(".toggle-paragraph-markers").on("click", function (e) {
    e.preventDefault();
    let el = $(".transcript.ui.text.container");

    if (el.hasClass("hide-pnum")) {
      el.removeClass("hide-pnum");
      Object(_util_store__WEBPACK_IMPORTED_MODULE_1__["storeSet"])(storeKey, "on");
      setParagraphNumberDisplay("on");
    } else {
      el.addClass("hide-pnum");
      Object(_util_store__WEBPACK_IMPORTED_MODULE_1__["storeSet"])(storeKey, "off");
      setParagraphNumberDisplay("off");
    }
  });
}

function setParagraphNumberDisplay(state) {
  if (state === "on") {
    $(".toggle-paragraph-markers > span .paragraph-corner-icon").addClass("hide");
  } else {
    $(".toggle-paragraph-markers > span .paragraph-corner-icon").removeClass("hide");
  }
}

function setParagraphNumberDisplayState() {
  let toggleAvailable = $(".toggle-paragraph-markers").length === 0 ? false : true;
  let state = Object(_util_store__WEBPACK_IMPORTED_MODULE_1__["storeGet"])(storeKey);
  let el = $(".transcript.ui.text.container");
  let current = el.hasClass("hide-pnum") ? "off" : "on"; //if toggle menu option not available set page to hide paragraph numbers and return

  if (!toggleAvailable) {
    $(".transcript.ui.text.container").addClass("hide-pnum");
    return;
  } //if not set use current value


  if (!state) {
    state = current;
    Object(_util_store__WEBPACK_IMPORTED_MODULE_1__["storeSet"])(storeKey, state);
  }

  if (state !== current) {
    if (state === "on") {
      el.removeClass("hide-pnum");
    } else {
      el.addClass("hide-pnum");
    }
  }

  setParagraphNumberDisplay(state);
}
/*
  Fix main menu to top of page when scrolled
*/


function initStickyMenu() {
  // fix main menu to page on passing
  $(".main.menu").visibility({
    type: "fixed",
    onFixed: function (el) {//console.log("menu is fixed");
    },
    onUnfixed: function (el) {//console.log("menu is un fixed");
    }
  }); // show dropdown on hover

  $(".main.menu  .ui.dropdown").dropdown({
    on: "hover"
  }); // enable tabs on source pages

  $(".source-features > .menu .item").tab();
}
function initAnimation(selector = "[data-book]") {
  let delay = 0.2;
  $("#page-contents").on("mouseover", selector, function (e) {
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to($(this), delay, {
      className: "+=gsap-hover"
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to($(this), delay, {
      scale: "1.1"
    });
  });
  $("#page-contents").on("mouseout", selector, function (e) {
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to($(this), delay, {
      className: "-=gsap-hover"
    });
    gsap__WEBPACK_IMPORTED_MODULE_0__["TweenMax"].to($(this), delay, {
      scale: "1.0"
    });
  });
}

/***/ }),

/***/ "./src/js/modules/_search/navigator.js":
/*!*********************************************!*\
  !*** ./src/js/modules/_search/navigator.js ***!
  \*********************************************/
/*! exports provided: initNavigator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initNavigator", function() { return initNavigator; });
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scroll-into-view */ "./node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_2__);
/*
  search results query navigator
*/




const page = __webpack_require__(/*! ../_config/key */ "./src/js/modules/_config/key.js");

const SCROLL_INTERVAL = 250;

function scrollComplete(message, type) {//console.log(`${message}: ${type}`);
}

function scrollIntoView(id, caller) {
  scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById(id), {
    align: {
      top: 0.2
    }
  }, type => {
    scrollComplete(`scroll from search navigator ${caller}(${id})`, type);
  });
}

class PageMatches {
  constructor(query, start, end, hits) {
    this.query = query;
    this.start = start;
    this.end = end;
    this.count = end - start + 1;
    this.hits = hits;
  }

  setStart(current, first) {
    this.current = current;
    let pid = this.hits[current].location;

    if (first) {
      setTimeout(scrollIntoView, SCROLL_INTERVAL, pid, "setStart(first)");
    } else {
      scrollIntoView(pid, "setStart()");
    }

    this.setTitle();
  }

  setTitle() {
    let pos = this.current - this.start + 1;
    let title = `Search for <em>${this.query}</em> (${pos} of ${this.count})`;
    $(".search-navigator-header-query").html(title);
  }
  /*
    Move to previous match or last match if we're on the first one
  */


  setPrevious() {
    //no where to go if there's only one match on the page
    if (this.start === this.end) {
      return;
    }

    let pos = this.current - 1;

    if (pos < this.start) {
      pos = this.end;
    }

    this.setStart(pos);
  }
  /*
    Move to next match position or the first if we're on the last
  */


  setNext() {
    //no where to go if there's only one match on the page
    if (this.start === this.end) {
      return;
    }

    let pos = this.current + 1;

    if (pos > this.end) {
      pos = this.start;
    }

    this.setStart(pos);
  }

  showCurrent() {
    let pid = this.hits[this.current].location;
    scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById(pid), {
      align: {
        top: 0.2
      }
    });
  }

} //hilight terms on page for current search


function markSearchHits(searchHits, start, end, query, state) {
  let markFailure = 0; //Note: this regex wont find a string within a string - only finds
  //matches that begin on a word boundary
  //var regex = new RegExp("(?:^|\\b)(" + searchData.query + ")(?:$|\\b)", "gim");

  let regex = new RegExp("(?:^|\\b)(" + query + ")(?:$|\\b|)", "gim");

  for (let i = start; i <= end; i++) {
    let id = searchHits[i].location;
    let el = document.getElementById(id); // a data error is indicated by el == null

    if (!el) {
      markFailure++;
      continue;
    }

    let content = el.innerHTML; //remove newline chars in content - they can prevent the
    //query string from being highlighted

    content = content.replace(/[\r\n]/gm, " ");

    if (state === "show") {
      el.innerHTML = content.replace(regex, "<mark class='show-mark'>$1</mark>");
    } else {
      el.innerHTML = content.replace(regex, "<mark class='hide-mark'>$1</mark>");
    } //test if query was highlighted


    if (el.innerHTML === content) {
      console.log("Regex did not match: \"%s\" for %s", query, id);
      markFailure++;
    }
  }

  return markFailure;
}
/*
  Set up listeners for search navigator links
  args: matches - keeps track of page specific search hits
*/


function initClickListeners(matches) {
  //previous search
  $(".search-navigator .previous-match").on("click", function (e) {
    e.preventDefault();
    matches.setPrevious();
  });
  $(".search-navigator .next-match").on("click", function (e) {
    e.preventDefault();
    matches.setNext();
  });
  $(".search-navigator .current-match").on("click", function (e) {
    e.preventDefault();
    matches.showCurrent();
  });
  $(".search-navigator .close-window").on("click", function (e) {
    e.preventDefault();
    $(".search-navigator-wrapper").addClass("hide-search-navigator");
    $(".transcript").removeClass("search-navigator-active");
  });
}
/*
  first and last positions for this pages search hits and
  the next and previous pages.
*/


function findPositions(pid, pageKey, flat) {
  let positions = {
    current: -1,
    //current para with search match
    prev: -1,
    //previous page with search match
    start: -1,
    //first para with match on page
    end: -1,
    //last para with match on page
    next: -1 //next page with search match

  };
  let found = false;

  for (let i = 0; i < flat.length; i++) {
    if (flat[i].key === pageKey) {
      if (flat[i].location === pid) {
        positions.current = i;
      }

      if (!found) {
        //first match on page
        positions.start = i;
        positions.end = i;
        found = true;

        if (i > 0) {
          //the previous page with a match
          positions.prev = i - 1;
        }
      } else {
        //more than one match on the page
        positions.end = i;
      }
    } else if (found) {
      //positions.end = i - 1;
      positions.next = i;
      break;
    }
  } //console.log("positions: %o", positions);


  return positions;
}

function initControls(pid) {
  let lastSearch = Object(_util_store__WEBPACK_IMPORTED_MODULE_1__["storeGet"])("srchResults");

  if (!lastSearch) {
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.warning("There are no search results to show.");
    return;
  } //console.log("lastSearch: %o", lastSearch);


  let pageKey = page.genPageKey();
  let pageKeyString = pageKey.toString(10);
  let bid = page.decodeKey(pageKey).bookId;
  let title = lastSearch.titleArray[bid]; //when ?srch=p2 and p2 does not contain a search hit

  if (!lastSearch.pageInfo[pageKey]) {
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.warning(`There is no search result at ${pid}`);
    return;
  }

  let hitPositions = findPositions(pid, pageKeyString, lastSearch.flat);
  let url; //check that requested search hit is valid

  if (hitPositions.current === -1) {
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.warning(`There is no search result at ${pid}`);
    return;
  }

  if (hitPositions.prev > -1) {
    url = `${lastSearch.flat[hitPositions.prev].url}?srch=${lastSearch.flat[hitPositions.prev].location}`;
    $(".search-navigator .previous-page").attr("href", url);
  } else {
    $(".search-navigator .previous-page").addClass("inactive");
  }

  if (hitPositions.next > -1) {
    url = `${lastSearch.flat[hitPositions.next].url}?srch=${lastSearch.flat[hitPositions.next].location}`;
    $(".search-navigator .next-page").attr("href", url);
  } else {
    $(".search-navigator .next-page").addClass("inactive");
  }

  if (hitPositions.start === hitPositions.end) {
    $(".search-navigator .previous-match").addClass("inactive");
    $(".search-navigator .next-match").addClass("inactive");
  } //set search navigator title


  $(".search-navigator-header-book").text(`${title} - ${lastSearch.pageInfo[pageKey].title}`);
  let matches = new PageMatches(lastSearch.query, hitPositions.start, hitPositions.end, lastSearch.flat); //arg 'true' causes 250ms deplay before calling scroll

  matches.setStart(hitPositions.current, true);
  let markFail = markSearchHits(lastSearch.flat, hitPositions.start, hitPositions.end, lastSearch.query, "show");

  if (markFail) {
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.info(`Failed to highlight ${markFail} search results`);
  }

  initClickListeners(matches); //indicate search navigator is active by adding class to ./transcript

  $(".transcript").addClass("search-navigator-active");
  $(".search-navigator-wrapper").removeClass("hide-search-navigator");
}

function initNavigator(requestedPid) {
  //console.log("init search navigator pid: %s", requestedPid);
  initControls(requestedPid);
}

/***/ }),

/***/ "./src/js/modules/_search/search.js":
/*!******************************************!*\
  !*** ./src/js/modules/_search/search.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _show__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./show */ "./src/js/modules/_search/show.js");
/* harmony import */ var _util_url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_util/url */ "./src/js/modules/_util/url.js");
/* harmony import */ var _navigator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./navigator */ "./src/js/modules/_search/navigator.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_4__);
const searchEndpoint = "https://d9lsdwxpfg.execute-api.us-east-1.amazonaws.com/latest/wom";




 //search modal

const uiSearchModal = ".search.ui.modal";
const uiOpenSearchModal = ".search-modal-open";
const uiSearchForm = "#search";
const uiSearchSource = "#search .source";
const uiSearchString = "#search input";
const uiSearchInputIcon = "#search .ui.icon.input";
const uiModalOpacity = 0.5; //search modal message box

const uiSearchMessage = ".ui.search.message";
const uiSearchMessageHeader = ".search-message.header";
const uiSearchMessageBody = ".search-message-body"; //search message id's

const SOURCE_NOT_SELECTED = Symbol("no_source");
const SOURCE_SELECTED = Symbol("source_selected");
const SEARCHING = Symbol("searching");
const SEARCH_RESULT = Symbol("search_result");
const SEARCH_ERROR = Symbol("search_error");
const SAVED_SEARCH = Symbol("saved_search");

function displaySearchMessage(msgId, arg1, arg2, arg3) {
  switch (msgId) {
    case SOURCE_NOT_SELECTED:
      $(uiSearchMessage).addClass("negative");
      $(uiSearchMessageHeader).text("Search Source Not Selected");
      $(uiSearchMessageBody).html("<p>You forgot to select a search source.</p>");
      break;

    case SOURCE_SELECTED:
      $(uiSearchMessage).removeClass("negative");
      $(uisearchmessageheader).text("search source");
      $(uisearchmessagebody).html(`<p>searching from <em>${arg1}</em></p>`);
      break;

    case SEARCHING:
      $(uiSearchInputIcon).addClass("loading");
      $(uiSearchString).attr("disabled", true);
      $(uiSearchMessage).addClass("purple");
      $(uiSearchMessageHeader).text("Search Started...");
      $(uiSearchMessageBody).html(`<p>Searching for <em>${arg2}</em></p>`);
      break;

    case SAVED_SEARCH:
      //arg1: source, arg2: query string, arg3: count
      $(uiSearchMessageHeader).text("Last Search Result");
      $(uiSearchMessageBody).html(`<p>Search for <em>${arg2}</em> from <em>${arg1}</em> found ${arg3} matches</p>`);
      break;

    case SEARCH_RESULT:
      $(uiSearchInputIcon).removeClass("loading");
      $(uiSearchString).attr("disabled", false);
      $(uiSearchMessage).removeClass("purple").removeClass("negative"); //clear input only if matches were found

      if (arg3 > 0) {
        $(uiSearchString).val("");
      }

      $(uiSearchMessageHeader).text("Search Result");
      $(uiSearchMessageBody).html(`<p>Search for <em>${arg2}</em> found ${arg3} matches</p>`);
      break;

    case SEARCH_ERROR:
      $(uiSearchInputIcon).removeClass("loading");
      $(uiSearchString).attr("disabled", false);
      $(uiSearchMessage).removeClass("purple").addClass("negative");
      $(uiSearchMessageHeader).text("Search Error");
      $(uiSearchMessageBody).html(`<p>${arg1}</p>`);
      break;

    default:
      break;
  }
} //run query


function search(query) {
  let searchBody = {
    query: query,
    width: 30
  };
  axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(searchEndpoint, searchBody).then(response => {
    displaySearchMessage(SEARCH_RESULT, "", query, response.data.count);

    if (response.data.count > 0) {
      Object(_show__WEBPACK_IMPORTED_MODULE_1__["showSearchResults"])(response.data, searchBody.query);
    } else {
      toastr__WEBPACK_IMPORTED_MODULE_4___default.a.info(`Search for ${query} didn't find any matches`);
    }

    document.getElementById("search-input-field").focus();
  }).catch(error => {
    console.error("search error: %o", error);
    displaySearchMessage(SEARCH_ERROR, error.message);
  });
}

function initTranscriptPage() {
  let displayPid = Object(_util_url__WEBPACK_IMPORTED_MODULE_2__["showSearchMatch"])();

  if (displayPid) {
    Object(_navigator__WEBPACK_IMPORTED_MODULE_3__["initNavigator"])(displayPid);
  }
}
/*
  Initialize support for search modal window available
  on all pages
*/


function initSearchModal() {
  $(uiSearchModal).modal({
    dimmerSettings: {
      opacity: uiModalOpacity
    },
    observeChanges: true,
    onShow: function () {
      //load modal with prior query results
      //check if modal already has query results loaded
      if ($(".cmi-search-list > h3").length === 0) {
        Object(_show__WEBPACK_IMPORTED_MODULE_1__["showSavedQuery"])();
      }
    }
  });
  $(uiOpenSearchModal).on("click", e => {
    e.preventDefault();
    $(uiSearchModal).modal("show");
  }); //Search Submit

  $(uiSearchForm).submit(function (e) {
    e.preventDefault();
    var searchSource = $(uiSearchSource).text();
    var searchString = $(uiSearchString).val(); //ignore and return if search string is empty

    if (searchString.length === 0) {
      return;
    } //console.log("Search requested: source: %s, string: %s", searchSource, searchString);


    displaySearchMessage(SEARCHING, searchSource, searchString); //run search

    search(searchString);
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function () {
    if ($(".transcript").length) {
      //this is a transcript page
      initTranscriptPage();
    }

    initSearchModal();
  }
});

/***/ }),

/***/ "./src/js/modules/_search/show.js":
/*!****************************************!*\
  !*** ./src/js/modules/_search/show.js ***!
  \****************************************/
/*! exports provided: showSearchResults, showSavedQuery */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSearchResults", function() { return showSearchResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSavedQuery", function() { return showSavedQuery; });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_config/config */ "./src/js/modules/_config/config.js");
/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/uniq */ "./node_modules/lodash/uniq.js");
/* harmony import */ var lodash_uniq__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_uniq__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_util/store */ "./src/js/modules/_util/store.js");


 //this needs to use require because it is also used by a node app and node doesn't support import

const womInfo = __webpack_require__(/*! ../_config/key */ "./src/js/modules/_config/key.js");

function getUnitName(pageInfo, unitInfo) {
  return pageInfo[unitInfo.pageKey].title;
}

function makeList(bid, title, pageInfo, matchArray) {
  return `
    <h3>${title[bid]} (${matchArray.length})</h3>
    <div class="ui list">
      ${matchArray.map(m => `
        <div class="item">
          <i class="book icon"></i>
          <div class="content">
            <div class="header">
              ${getUnitName(pageInfo, m)} (${m.m.length})
            </div>
            <div class="list">
              ${m.m.map(h => `
                <div class="item">
                  <i class="search icon"></i>
                  <div class="content">
                    <div class="header">
                      <a href="${pageInfo[m.pageKey].url}?srch=${h.location}">Paragraph ${h.location.substr(1)}</a>
                    </div>
                    <div class="description">
                      ${h.context}
                    </div>
                  </div>
                  </div> <!-- item -->
              `).join("")}
            </div> <!-- list -->
          </div>
        </div>
      `).join("")}
    </div> <!-- ui list -->
  `;
}
/*
  for a given page, combine all matches into an array
*/


function munge(bookMatches) {
  let keyLength = womInfo.getKeyInfo().keyLength;
  let combined = [];
  let count = 0;

  for (const match of bookMatches) {
    if (!combined[count]) {
      combined[count] = {
        unit: match.unit,
        book: match.book,
        pageKey: match.key.substr(0, keyLength),
        m: [{
          location: match.location,
          context: match.context
        }]
      };
    } else if (combined[count].unit !== match.unit) {
      count++;
      combined[count] = {
        unit: match.unit,
        book: match.book,
        pageKey: match.key.substr(0, keyLength),
        m: [{
          location: match.location,
          context: match.context
        }]
      };
    } else {
      combined[count].m.push({
        location: match.location,
        context: match.context
      });
    }
  }

  return combined;
} //get unique pageKeys from query results and 


function getPageKeys(data) {
  let keyLength = womInfo.getKeyInfo().keyLength;
  let keys = data.map(m => m.key.substr(0, keyLength));
  return lodash_uniq__WEBPACK_IMPORTED_MODULE_1___default()(keys);
}

function showSearchResults(data, query) {
  const books = womInfo.getBooks();
  let pageInfoPromises = []; //get array of all unique page info - promises

  for (let b = 0; b < books.length; b++) {
    let bid = books[b];

    if (data[bid]) {
      let pageKeys = getPageKeys(data[bid]);

      for (const pageKey of pageKeys) {
        pageInfoPromises.push(Object(_config_config__WEBPACK_IMPORTED_MODULE_0__["getPageInfo"])(pageKey));
      }
    }
  }

  Promise.all(pageInfoPromises).then(responses => {
    let html = "";
    let pageInfo = {};
    let titleArray = {}; //console.log("responses: %o", responses);
    //organize pageInfo

    for (const page of responses) {
      let {
        bookTitle,
        title,
        subTitle,
        url
      } = page;

      if (subTitle) {
        title = `${title}: ${subTitle}`;
      }

      pageInfo[page.pageKey] = {
        title,
        url
      };

      if (!titleArray[page.bookId]) {
        titleArray[page.bookId] = bookTitle;
      }
    }

    let matches = {}; //generate html for search hits

    for (let bid of books) {
      if (data[bid]) {
        matches[bid] = munge(data[bid]);
        html += makeList(bid, titleArray, pageInfo, matches[bid]);
      }
    }

    $(".cmi-search-list").html(html);
    $("#search-results-header").html(`: <em>${query}</em>`);
    saveQueryResults(query, data.count, titleArray, pageInfo, matches, data);
  }).catch(error => {
    console.error("Error: %s", error.message);
  });
} //save the query result so it can be available until replaced by another query

function saveQueryResults(queryString, matchCount, titleArray, pageInfo, data, originalResult) {
  const books = womInfo.getBooks();
  let keyLength = womInfo.getKeyInfo().keyLength; //don't save if there were no matches

  if (matchCount === 0) {
    return;
  } //flatten the query result to simplify access by query navigator on transcript pages


  let flatMatches = [];

  for (const bid of books) {
    if (originalResult[bid]) {
      for (const match of originalResult[bid]) {
        let pageKey = match.key.substr(0, keyLength);
        let m = {
          key: pageKey,
          url: `/${match.book}/${match.unit}/`,
          location: match.location
        };
        flatMatches.push(m);
      }
    }
  }

  Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeSet"])("srchResults", {
    query: queryString,
    count: matchCount,
    titleArray: titleArray,
    pageInfo: pageInfo,
    data: data,
    flat: flatMatches
  });
} //show saved query result in modal


function showSavedQuery() {
  const queryResult = Object(_util_store__WEBPACK_IMPORTED_MODULE_2__["storeGet"])("srchResults");

  if (!queryResult) {
    return;
  }

  const books = womInfo.getBooks();
  let html = ""; //generate html for search hits

  for (let bid of books) {
    if (queryResult.data[bid]) {
      html += makeList(bid, queryResult.titleArray, queryResult.pageInfo, queryResult.data[bid]);
    }
  }

  $(".cmi-search-list").html(html);
  $(".search-message.header").text("Last Search Result");
  $(".search-message-body").html(`<p>Search for <em>${queryResult.query}</em> found ${queryResult.count} matches</p>`);
  $("#search-results-header").html(`: <em>${queryResult.query}</em>`);
}

/***/ }),

/***/ "./src/js/modules/_share/share.js":
/*!****************************************!*\
  !*** ./src/js/modules/_share/share.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_util/url */ "./src/js/modules/_util/url.js");
/* harmony import */ var _ajax_annotation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_ajax/annotation */ "./src/js/modules/_ajax/annotation.js");
/* harmony import */ var _bookmark_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_bookmark/selection */ "./src/js/modules/_bookmark/selection.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/range */ "./node_modules/lodash/range.js");
/* harmony import */ var lodash_range__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_range__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! scroll-into-view */ "./node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_6__);
/*
  NOTE: When an annotation is shared and seen on a computer with bookmarks
        there could be a conflict between the users bookmarks and the shared
        bookmark. Not sure what to do in this case...

        An idea:
        Disable highlighting annotations on the paragraph of the shared annotation.

        Approach:
        Load all bookmarks except that of a shared annotation.
        Add a close button to the shared annotation
        When the close button is pressed then add the omitted bookmark

*/






 //const key = require("../_config/key");
//teaching specific constants

let teaching = {}; //persist shared annotation so it can be unwraped when closed

let sharedAnnotation;
/*
  check if user has bookmark that was not highlighted due to shared annotion and
  highlight the bookmarks annotations. This is called if there is a problem getting
  the requested bookmark and when the user closes the share raised segment
*/

function clearSharedAnnotation() {
  //unwrap shared annotation
  if (sharedAnnotation.selectedText) {
    sharedAnnotation.selectedText.wrap.unwrap();
  } //remove wrapper


  $("#shared-annotation-wrapper > .header").remove();
  $(".shared-selected-annotation").unwrap();
  $(".selected-annotation").removeClass("shared-selected-annotation");
  $(".bookmark-selected-text.shared").removeClass("shared"); //highlight user annotations that were skipped because they were on same paragraph as shared annotation

  Object(_bookmark_selection__WEBPACK_IMPORTED_MODULE_2__["highlightSkippedAnnotations"])();
}

function initCloseHandler() {
  $(".share-annotation-close").on("click", function (e) {
    e.preventDefault();
    clearSharedAnnotation();
  });
} //highlights an annotation by wrapping it in a segment


function wrapRange(annotation) {
  let rangeArray = [annotation.rangeStart, annotation.rangeEnd];
  let numericRange = rangeArray.map(r => parseInt(r.substr(1), 10));
  let annotationRange = lodash_range__WEBPACK_IMPORTED_MODULE_3___default()(numericRange[0], numericRange[1] + 1); //${annotation.Comment?annotation.Comment:getString("annotate:m7")}

  let header = `
    <h4 class="ui header">
      <i title="${Object(_language_lang__WEBPACK_IMPORTED_MODULE_5__["getString"])("action:close")}" class="share-annotation-close small window close icon"></i>
      <div class="content">
        ${annotation.Comment ? annotation.Comment : ""}
      </div>
    </h4>
  `;

  for (let i = 0; i < annotationRange.length; i++) {
    $(`#p${annotationRange[i]}`).addClass("shared-selected-annotation");
  }

  $(".shared-selected-annotation").wrapAll("<div id='shared-annotation-wrapper' class='ui raised segment'></div>");
  $("#shared-annotation-wrapper").prepend(header); //scroll into view

  scroll_into_view__WEBPACK_IMPORTED_MODULE_4___default()(document.getElementById("shared-annotation-wrapper"), {
    align: {
      top: 0.2
    }
  });
}
/**
  Display shared annotation requested by query parameter "as" ?as=pid:annotationId:userId. This
  is called when the user click 'To The Source' on a shared quote or FB post. The annotation
  could have been created by anyone.

  @returns {promise} pid - resolves to pid number when sharing requested, false otherwise
*/


function showAnnotation() {
  return new Promise(async (resolve, reject) => {
    let info = Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["showAnnotation"])();

    if (!info) {
      resolve(false);
      return;
    }

    let [pid, aid, uid] = decodeURIComponent(info).split(":"); //make sure pid exists

    if (!pid) {
      resolve(false);
      return;
    }

    if ($(`#${pid}`).length === 0) {
      resolve(false);
      return;
    }

    let paraKey = teaching.keyInfo.genParagraphKey(pid); //show loading indicator

    Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["loadStart"])();
    /*
      fetch shared bookmark and wrap it in a raised segment
      - if user has a bookmark in the same paragraph as the shared annotation, it will not be highlighted so
        if we fail to get the bookmark or can't find the shared annotation we need to highlight the users
        annotations for the paragraph before returning
    */

    try {
      const annotation = await Object(_ajax_annotation__WEBPACK_IMPORTED_MODULE_1__["getAnnotation"])(uid, paraKey, aid);

      if (!annotation.userId) {
        Object(_bookmark_selection__WEBPACK_IMPORTED_MODULE_2__["highlightSkippedAnnotations"])();
        Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["loadComplete"])();
        toastr__WEBPACK_IMPORTED_MODULE_6___default.a.warning("Requested Bookmark was not found");
        resolve(false);
        return;
      }

      let node = document.getElementById(annotation.rangeStart);

      if (annotation.selectedText) {
        Object(_bookmark_selection__WEBPACK_IMPORTED_MODULE_2__["highlight"])(annotation.selectedText, node);
      }

      $(`[data-aid="${aid}"]`).addClass("shared");
      wrapRange(annotation);
      sharedAnnotation = annotation;
      initCloseHandler();
      Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["loadComplete"])();
    } catch (err) {
      Object(_util_url__WEBPACK_IMPORTED_MODULE_0__["loadComplete"])();
      console.error(err);
      resolve(false);
      return;
    }

    resolve(pid);
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function (constants) {
    teaching = constants;
    return showAnnotation();
  }
});

/***/ }),

/***/ "./src/js/modules/_user/netlify.js":
/*!*****************************************!*\
  !*** ./src/js/modules/_user/netlify.js ***!
  \*****************************************/
/*! exports provided: getUserInfo, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUserInfo", function() { return getUserInfo; });
/* harmony import */ var netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! netlify-identity-widget */ "./node_modules/netlify-identity-widget/build/netlify-identity.js");
/* harmony import */ var netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! md5 */ "./node_modules/md5/md5.js");
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! store */ "./node_modules/store/dist/store.legacy.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _util_url__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_util/url */ "./src/js/modules/_util/url.js");
/* harmony import */ var _language_lang__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_language/lang */ "./src/js/modules/_language/lang.js");
/*eslint no-console: "off" */





let login_state_key = "cmi.login.state";
let userInfo;

function prodUserInfo() {
  if (userInfo) {
    return {
      email: userInfo.email,
      userId: md5__WEBPACK_IMPORTED_MODULE_1___default()(userInfo.email),
      name: userInfo.user_metadata.full_name,
      roles: userInfo.app_metadata.roles,
      avatar_url: userInfo.user_metadata.avatar_url
    };
  }

  return null;
}

function getUserInfo(name) {
  return prodUserInfo();
}
/*
  Modify menubar icons "bookmark" and "sign in" to
  indicate user is signed in
*/

function setAsSignedIn() {
  let userInfo = getUserInfo(); //change sign-in icon to sign-out and change color from red to green

  Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("action:signout", true, "Sign Out").then(resp => {
    /*
    $(".login-menu-option > span")
      .html("<i class='green sign out icon'></i>")
      .attr("data-tooltip", `${resp}: ${userInfo.name}`);
    */
    $(".login-menu-option-guest").addClass("hide");
    $(".login-menu-option-account").removeClass("hide");
    $(".account-signout-option").text(`${resp}: ${userInfo.name}`);
  }); //change bookmark menu icon to green from red

  $(".main.menu a > span > i.bookmark.icon").addClass("green").removeClass("red"); //add color to menu background to further indicate signed in status

  $(".main.menu .ui.text.container").addClass("signed-in"); //reveal profile-management menu option

  $(".hide.profile-management.item").removeClass("hide"); //show menu options for account holders

  $(".requires-signin").removeClass("hide");
}
/*
  Modify menubar icons "bookmark" and "sign in" to
  indicate user is signed in
*/


function setAsSignedOut() {
  //change sign-in icon to sign-out and change color from red to green
  Object(_language_lang__WEBPACK_IMPORTED_MODULE_4__["getString"])("action:signin", true).then(resp => {
    /*
    $(".login-menu-option > span")
      .html("<i class='red sign in icon'></i>")
      .attr("data-tooltip", resp);
    */
    $(".login-menu-option-guest").removeClass("hide");
    $(".login-menu-option-account").addClass("hide");
  }); //change bookmark menu icon to green from red

  $(".main.menu a > span > i.bookmark.icon").addClass("red").removeClass("green"); //removed signed-in class

  $(".main.menu .ui.text.container").removeClass("signed-in"); //hide profile-management menu option

  $(".profile-management.item").addClass("hide"); //hide account users menu options

  $(".requires-signin").addClass("hide");
}
/*
  ACOL restricts access to some content based on the "acol" user role. When the user
  logs in, redirect them to the acol home page if they are currently viewing an acol
  transcript page. This will ensure that the TOC will give them access to all content.

  Otherwise they can just stay where they are on login.
*/


function manageState(state) {
  const acolHome = "/t/acol/";
  let currentState = store__WEBPACK_IMPORTED_MODULE_2___default.a.get(login_state_key) || "init";

  switch (state) {
    case "init":
      //state 'init' on page load
      store__WEBPACK_IMPORTED_MODULE_2___default.a.set(login_state_key, state);
      break;

    case "dialog":
      store__WEBPACK_IMPORTED_MODULE_2___default.a.set(login_state_key, state);
      break;

    case "login":
      if (currentState === "dialog") {
        //refresh the page after login
        //location.href = location.href;
        //if user has "acol" role, refresh page to enable access to all content
        if (userInfo.app_metadata.roles && userInfo.app_metadata.roles.find(r => r === "acol")) {
          //if user is on an acol transcript page
          if (location.pathname.startsWith(acolHome) && location.pathname !== acolHome) {
            //refresh page
            location.href = acolHome;
          }
        }
      }

      store__WEBPACK_IMPORTED_MODULE_2___default.a.set(login_state_key, state);
      break;
  }
}

/* harmony default export */ __webpack_exports__["default"] = ({
  initialize: function () {
    /*
     * if user already logged in, change icon to log out
     */
    netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.on("init", user => {
      manageState("init");
    });
    netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.on("login", login => {
      userInfo = login;
      setAsSignedIn();
      manageState("login");
    });
    netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.on("logout", () => {
      setAsSignedOut();
      userInfo = null;
      location.href = "/";
    });
    netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.on("error", err => {
      console.error("user.on('error'): ", err);
    });
    $(".login-menu-option-account > .menu > .account-signout-option").on("click", e => {
      e.preventDefault(); //console.log("user signout");

      netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.logout();
    });
    /*
     * User Sign In
     */

    $(".login-menu-option-guest").on("click", e => {
      //console.log("user sign in");
      e.preventDefault();
      manageState("dialog");
      netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.open();
    }); //init authentication

    netlify_identity_widget__WEBPACK_IMPORTED_MODULE_0___default.a.init({});
  }
});

/***/ }),

/***/ "./src/js/modules/_util/cmi.js":
/*!*************************************!*\
  !*** ./src/js/modules/_util/cmi.js ***!
  \*************************************/
/*! exports provided: getUrlByPageKey, getBookmarkText, fetchConfiguration */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUrlByPageKey", function() { return getUrlByPageKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBookmarkText", function() { return getBookmarkText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchConfiguration", function() { return fetchConfiguration; });
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ "./src/js/modules/_util/store.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);



const acimKey = __webpack_require__(/*! acim/modules/_config/key */ "../cmi-acim/src/js/modules/_config/key.js");

const oeKey = __webpack_require__(/*! oe/modules/_config/key */ "../cmi-oe/src/js/modules/_config/key.js");

const acolKey = __webpack_require__(/*! acol/modules/_config/key */ "../cmi-acol/src/js/modules/_config/key.js");

const rajKey = __webpack_require__(/*! raj/modules/_config/key */ "../cmi-raj/src/js/modules/_config/key.js");

const jsbKey = __webpack_require__(/*! jsb/modules/_config/key */ "../cmi-jsb/src/js/modules/_config/key.js");

const womKey = __webpack_require__(/*! wom/modules/_config/key */ "../cmi-wom/src/js/modules/_config/key.js");

const pwomKey = __webpack_require__(/*! pwom/modules/_config/key */ "../cmi-pwom/src/js/modules/_config/key.js");

const colKey = __webpack_require__(/*! col/modules/_config/key */ "../cmi-col/src/js/modules/_config/key.js");

const WOMSOURCEID = "10";
const JSBSOURCEID = "11";
const ACIMSOURCEID = "12";
const RAJSOURCEID = "13";
const ACOLSOURCEID = "14";
const OESOURCEID = "15";
const PWOMSOURCEID = "16";
const COLSOURCEID = "17";
/**
 * Get the url for the page identified by "key"
 *
 * @param {string} key - the page key (paraKey)
 * @returns {string} the url of the page
 */

function getUrlByPageKey(key) {
  if (typeof key !== "string") {
    key = `${key}`;
  }

  if (key.startsWith(ACIMSOURCEID)) {
    return acimKey.getUrl(key, true);
  }

  if (key.startsWith(OESOURCEID)) {
    return oeKey.getUrl(key, true);
  }

  if (key.startsWith(ACOLSOURCEID)) {
    return acolKey.getUrl(key, true);
  }

  if (key.startsWith(JSBSOURCEID)) {
    return jsbKey.getUrl(key, true);
  }

  if (key.startsWith(RAJSOURCEID)) {
    return rajKey.getUrl(key, true);
  }

  if (key.startsWith(WOMSOURCEID)) {
    return womKey.getUrl(key, true);
  }

  if (key.startsWith(PWOMSOURCEID)) {
    return pwomKey.getUrl(key, true);
  }

  if (key.startsWith(COLSOURCEID)) {
    return colKey.getUrl(key, true);
  }

  throw new Error(`getUrlByPageKey(${key}): invalid key`);
} //transcript Node cache used by getBookmarkText()

let htmlCache = {};

function getNoteTranscript(id, url) {
  if (htmlCache[id]) {
    return Promise.resolve(htmlCache[id]);
  }

  const config = {
    responseType: "document"
  };
  return axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url, config).then(response => {
    let transcriptNode = response.data.getElementsByClassName("transcript")[0];
    htmlCache[id] = transcriptNode;
    return Promise.resolve(transcriptNode);
  });
}

function getBookmarkText(bookmarks) {
  let promises = bookmarks.map(bm => {
    if (bm.annotation.selectedText) {
      if (!bm.mgr) {
        bm.mgr = {};
        let st = bm.annotation.selectedText;
        bm.mgr.title = st.title;
        bm.mgr.url = st.url;
        bm.mgr.pid = st.pid;
        bm.mgr.content = [{
          pid: st.pid,
          text: st.target.selector[1].exact
        }];
        bm.mgr.comment = bm.annotation.Comment;
        bm.mgr.note = bm.annotation.Note;
        bm.mgr.type = "selected";
      }

      return Promise.resolve(bm);
    } //Note style bookmark
    else if (!bm.mgr) {
        let url = getUrlByPageKey(bm.paraKey);
        bm.mgr = {};
        bm.mgr.type = "note";
        bm.mgr.title = bm.annotation.bookTitle;
        bm.mgr.url = url;
        bm.mgr.pid = bm.annotation.rangeStart;
        bm.mgr.comment = bm.annotation.Comment;
        bm.mgr.note = bm.annotation.Note; //get 'document' response from axios

        return getNoteTranscript(bm.paraKey, url).then(resp => {
          let paragraphs = resp.getElementsByTagName("p");
          let rangeStart = parseInt(bm.annotation.rangeStart.substring(1), 10);
          let rangeEnd = parseInt(bm.annotation.rangeEnd.substring(1), 10);
          bm.mgr.content = [];

          for (let p = rangeStart; p <= rangeEnd; p++) {
            if (paragraphs[p]) {
              bm.mgr.content.push({
                pid: `p${p}`,
                text: paragraphs[p].textContent
              });
            } else {
              bm.mgr.content.push({
                pid: `p${p}`,
                text: "no data for paragraph"
              });
            }
          }

          return Promise.resolve(bm);
        });
      } else {
        return Promise.resolve(bm);
      }
  });
  return promises;
}
/**
  We use book level configuration that is loaded by request via AJAX. Once
  loaded the config is persisted in local storage. A check is made for
  configuration data loaded from local storage to determine if the data needs to
  be reloaded.

  @params {string} url - The url of the config file
  @params {string} lsKey - local storage key (cfgwoh)
  @returns {Promise} The config file
*/

function fetchConfiguration(url, lsKey, configStatus) {
  return new Promise((resolve, reject) => {
    let cfg = Object(_store__WEBPACK_IMPORTED_MODULE_0__["storeGet"])(lsKey); //if config in local storage check if we need to get a fresh copy

    if (cfg && !refreshNeeded(cfg, configStatus)) {
      resolve(cfg);
      return;
    } //get config from server


    axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(url).then(response => {
      response.data.saveDate = configStatus[response.data.bid];
      Object(_store__WEBPACK_IMPORTED_MODULE_0__["storeSet"])(lsKey, response.data);
      resolve(response.data);
    }).catch(err => {
      console.error(err);
      reject(err);
    });
  });
}
/*
  The status constains the save date for each config file. We compare that to the saveDate
  in the locally stored config file. If it's different or doesn't exist we need to get
  a new version.

  return: true - get a new version
          false - use the one we've got
*/

function refreshNeeded(cfg, configStatus) {
  let lastSaveDate = configStatus[cfg.bid];

  if (!cfg.saveDate) {
    cfg.saveDate = lastSaveDate;
    return true; //refresh needed
  }

  if (cfg.saveDate === lastSaveDate) {
    return false; //no refresh needed
  } else {
    //config file has changed, refresh needed
    cfg.saveDate = lastSaveDate;
    return true;
  }
}

/***/ }),

/***/ "./src/js/modules/_util/driver.js":
/*!****************************************!*\
  !*** ./src/js/modules/_util/driver.js ***!
  \****************************************/
/*! exports provided: runFeatureIntro, pageNavigationDriver, transcriptDriver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runFeatureIntro", function() { return runFeatureIntro; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageNavigationDriver", function() { return pageNavigationDriver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transcriptDriver", function() { return transcriptDriver; });
/* harmony import */ var driver_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! driver.js */ "./node_modules/driver.js/dist/driver.min.js");
/* harmony import */ var driver_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(driver_js__WEBPACK_IMPORTED_MODULE_0__);

function runFeatureIntro(stepArray, options) {
  //filter out array elements that are not visible on the page
  let validSteps = stepArray.filter(i => {
    //don't filter elements that start with "!"
    if (i.element[0] === "!") {
      i.element = i.element.substring(1);
      return true;
    }

    let element = i.element.substring(1);
    let el = document.getElementById(element);
    let result = el ? el.offsetParent !== null : false; //if (!result) console.log(`${i.element} filtered from stepArray`);

    return result;
  });

  if (validSteps.length === 0) {
    //console.log("no steps in requested feature introduction");
    return;
  }

  if (!options) {
    options = {
      allowClose: false,
      opacity: 0.5
    };
  }

  const driver = new driver_js__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  driver.defineSteps(validSteps);
  driver.start();
}
/**
 * Generic feature tour for CMI pages
 */

function pageNavigationDriver(sourceTitle) {
  let steps = [{
    element: "#masthead-title",
    popover: {
      title: "Navigation and Features",
      description: "On every page you can click here to display the Library's main page to see all available teachings.",
      position: "bottom"
    }
  }, {
    element: "#page-menu",
    popover: {
      title: "The Menu",
      description: "This is the page menu, it will stick to the top when the page is scrolled (when the tour is over) so it is always available. The menu on other pages is similar but may contain additional features.",
      position: "bottom"
    }
  }, {
    element: "#bookmark-dropdown-menu",
    popover: {
      title: "List Bookmarks",
      description: "Display a list of bookmarks you have created and optionally filter by topic. You can quickly jump to any bookmark. Learn more about bookmarks <a href='/acq/bookmark/'>in the documentation.</a>",
      position: "bottom"
    }
  }, {
    element: "#search-modal-open",
    popover: {
      title: "Search Through All Books",
      description: `Find topics of interest by searching through all <em>${sourceTitle}</em> books. Follow a search match to use the Search Navigator to visit the results directly in the transcript.`,
      position: "bottom"
    }
  }, {
    element: "#quick-links-dropdown-menu",
    popover: {
      title: "Navigate to Another Teaching",
      description: "Quickly jump to one of the other teachings in the Library.",
      position: "bottom"
    }
  }, {
    element: "#help-menu",
    popover: {
      title: "Get Help and Learn About",
      description: "Learn about the teaching and using the features of the site.",
      position: "bottom"
    }
  }, {
    element: "#login-guest-menu-option",
    popover: {
      title: "Create an Account or Sign In",
      description: "Create an account and sign in to the site. It's free and allows you to create bookmarks that you can share via Facebook and keep synchronized between devices.",
      position: "left"
    }
  }, {
    element: "#login-account-menu-option",
    popover: {
      title: "Sign Out and Access Profile",
      description: "A dropdown menu that allows you to sign out and to access account holder features.",
      position: "left"
    }
  }];
  runFeatureIntro(steps);
}
/**
 * Generic tour for transcript pages
 */

function transcriptDriver(sourceTitle) {
  let steps = [];
  steps.push({
    element: "#masthead-title",
    popover: {
      title: "Library of Christ Mind Teachings",
      description: `Click this link to navigate away from <em>${sourceTitle}</em> to the Library's Home page.`,
      position: "bottom"
    }
  });
  steps.push({
    element: "#transcript-header",
    popover: {
      title: "Page Title",
      description: "This title identifies the teaching and transcript found on the page.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#src-title",
    popover: {
      title: `${sourceTitle}`,
      description: `This page is part of <em>${sourceTitle}</em>. Click this link to navigate to ${sourceTitle} Home page.`,
      position: "bottom"
    }
  });
  steps.push({
    element: "#book-title",
    popover: {
      title: "Book Title",
      description: "This identifies the book and chapter of the content on this page.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#bookmark-dropdown-menu",
    popover: {
      title: "Bookmarks",
      description: `You can create a bookmark from highlighted text and associate the bookmark with
      one or more topics. Bookmark creation is disabled when the icon looks like this
      <i class="icons"> <i class="bookmark green icon"></i><i class="corner close icon"></i></i>
      . Learn more about bookmarks <a href='/acq/bookmarks/'>in the documentation.</a>`,
      position: "right"
    }
  });
  steps.push({
    element: "#search-modal-open",
    popover: {
      title: "Search Through All Books",
      description: `Find topics of interest by searching through all ${sourceTitle} books.`,
      position: "bottom"
    }
  });
  steps.push({
    element: "#audio-player-menu-option",
    popover: {
      title: "Listen to the Audio",
      description: "Click the speaker icon to display the audio player and listen along as you read. Hide the player by clicking the icon again.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#pnum-toggle-menu-option",
    popover: {
      title: "Show/Hide Paragraph Markers",
      description: `Show or hide the markers that preceed each paragraph. Markers are hidden when the icon looks
      like this: <i class="icons"><i class="paragraph icon"></i><i class="corner close icon"></i></i>`,
      position: "bottom"
    }
  });
  steps.push({
    element: "#jump-to-top-menu-option",
    popover: {
      title: "Go To Top of Page",
      description: "Quickly jump to the top of the page.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#contents-modal-open",
    popover: {
      title: "Table of Contents",
      description: "View the table of contents and quickly jump to another transcript in the book.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#toc-previous-page",
    popover: {
      title: "Previous Page",
      description: "Go to the previous page. This is disabled when the first page is displayed.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#toc-next-page",
    popover: {
      title: "Next Page",
      description: "Go to the next page. This is disabled when the last page is displayed.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#quick-links-dropdown-menu",
    popover: {
      title: "Navigate to Another Teaching",
      description: "Quickly jump to one of the other teachings in the Library.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#about-dropdown-menu",
    popover: {
      title: "Get Help",
      description: "Learn how to use features of the Library.",
      position: "bottom"
    }
  });
  steps.push({
    element: "#login-guest-menu-option",
    popover: {
      title: "Create an Account or Sign In",
      description: "Create an account and sign in to the site. It's free and allows you to create bookmarks that you can share via Facebook and keep synchronized between devices.",
      position: "left"
    }
  });
  steps.push({
    element: "#login-account-menu-option",
    popover: {
      title: "Sign Out and Access Profile",
      description: "A dropdown menu that allows you to sign out and to access account holder features.",
      position: "left"
    }
  });
  steps.push({
    element: "#transcript-menu",
    popover: {
      title: "Contact Me",
      description: "If you have ideas, encounter errors or difficulty using this site, please let me know by <a href='/acq/contact'>using the Contact Form.</a> Thanks!",
      position: "bottom-center"
    }
  });
  runFeatureIntro(steps);
}

/***/ }),

/***/ "./src/js/modules/_util/intro.js":
/*!***************************************!*\
  !*** ./src/js/modules/_util/intro.js ***!
  \***************************************/
/*! exports provided: pageDriver, pageNavigationDriver, transcriptDriver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageDriver", function() { return pageDriver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pageNavigationDriver", function() { return pageNavigationDriver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transcriptDriver", function() { return transcriptDriver; });
/* harmony import */ var _driver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./driver */ "./src/js/modules/_util/driver.js");

const cmiPageBanner = {
  element: "#masthead-title",
  popover: {
    title: "Navigation and Features",
    description: "On every page you can click on this banner to navigate to the Library's main page and see all available teachings.",
    position: "bottom"
  }
};
const pageMenu = {
  element: "#page-menu",
  popover: {
    title: "The Menu",
    description: "This is the page menu, it will stick to the top when the page is scrolled (when the tour is over) so it is always available. The menu on other pages is similar but may contain additional features.<br/><br/>A brief description of each menu option follows.",
    position: "bottom"
  }
};
const pageMenuBookmarkItem = {
  element: "#bookmark-dropdown-menu",
  popover: {
    title: "List Bookmarks",
    description: "Display a list of bookmarks you have created and optionally filter by topic. You can quickly jump to any bookmark. Learn more about bookmarks in the documentation.",
    position: "bottom"
  }
};
const pageMenuSearchItem = {
  element: "#search-modal-open",
  popover: {
    title: "Search Through All Books",
    description: "Find topics of interest by searching through all ACIM books.",
    position: "bottom"
  }
};
const pageMenuHelpItem = {
  element: "#help-menu",
  popover: {
    title: "Get Help and Learn About",
    description: "Learn about the Library and using the features of the site.",
    position: "bottom"
  }
};
const pageMenuGuestLoginItem = {
  element: "#login-guest-menu-option",
  popover: {
    title: "Sign In/Sign Out",
    description: "Create an account and sign in to the site. It's free and allows you to create bookmarks that you can share via Facebook and keep synchronized between devices.",
    position: "left"
  }
};
const pageMenuAccountLoginItem = {
  element: "#login-account-menu-option",
  popover: {
    title: "Sign In/Sign Out",
    description: "Create an account and sign in to the site. It's free and allows you to create bookmarks that you can share via Facebook and keep synchronized between devices.",
    position: "left"
  }
};
const pageMenuContents = {
  element: "[data-book='acq']",
  popover: {
    title: "Display Table of Contents",
    description: "Click on any image to display the table of contents or navigate directly to the teaching.",
    position: "left"
  }
};
const cmiTranscriptBanner = {
  element: "#masthead-title",
  popover: {
    title: "Library of Christ Mind Teachings",
    description: "This banner identifies the page as being part of the Teachings of Christ Mind Library. Click this link to navigate to the Library's Home page.",
    position: "bottom"
  }
};
const cmiTranscriptSourceTitle = {
  element: "#src-title",
  popover: {
    title: "The Library",
    description: "This identifies the source or section of the library the page is a part of. Click this link to navigate to the section Home page.",
    position: "bottom"
  }
};
const cmiTranscriptBookTitle = {
  element: "#book-title",
  popover: {
    title: "Page Title",
    description: "This identifies the book and section or lesson of the content on this page.",
    position: "bottom"
  }
};
const transcriptMenuBookmarkItem = {
  element: "#bookmark-dropdown-menu",
  popover: {
    title: "Bookmarks",
    description: "You can create a bookmark from highlighted text and associate the bookmark with one or more categories. Learn more about bookmarks by reading the documentation.",
    position: "right"
  }
};
const transcriptMenuSearchItem = {
  element: "#search-modal-open",
  popover: {
    title: "Search Through All Books",
    description: "Find topics of interest by searching through all ACIM books.",
    position: "bottom"
  }
};
const transcriptMenuAudioItem = {
  element: "#audio-player-menu-option",
  popover: {
    title: "Listen to the Audio",
    description: "Click the speaker icon to display the audio player and listen along as you read.",
    position: "bottom"
  }
};
const transcriptMenuParagraphMarkerItem = {
  element: "#pnum-toggle-menu-option",
  popover: {
    title: "Show/Hide Paragraph Markers",
    description: "Show or hide the markers that preceed each paragraph.",
    position: "bottom"
  }
};
const transcriptMenuPageTopItem = {
  element: "#jump-to-top-menu-option",
  popover: {
    title: "Go To Top of Page",
    description: "Quickly jump to the top of the page.",
    position: "bottom"
  }
};
const transcriptMenuContentsItem = {
  element: "#contents-modal-open",
  popover: {
    title: "Table of Contents",
    description: "View the table of contents.",
    position: "bottom"
  }
};
const transcriptMenuPreviousPageItem = {
  element: "#toc-previous-page",
  popover: {
    title: "Previous Page",
    description: "Go to the previous page. This will be disabled when the first page is displayed.",
    position: "bottom"
  }
};
const transcriptMenuNextPageItem = {
  element: "#toc-next-page",
  popover: {
    title: "Next Page",
    description: "Go to the next page. This will be disabled when the last page is displayed.",
    position: "bottom"
  }
};
const transcriptMenuQuickLink = {
  element: "#quick-links-dropdown-menu",
  popover: {
    title: "Quick Links",
    description: "Quickly navigate to other teachings in the Library.",
    position: "bottom"
  }
};
const transcriptMenuHelpItem = {
  element: "#about-dropdown-menu",
  popover: {
    title: "Get Help",
    description: "Learn how to use features of the Library.",
    position: "bottom"
  }
};
const transcriptMenuGuestLoginItem = {
  element: "#login-guest-menu-option",
  popover: {
    title: "Sign In/Sign Out",
    description: "Create an account and sign in or sign out. When you sign in, bookmarks you create will be available on all devices you use to access the library.",
    position: "bottom"
  }
};
const transcriptMenuAccountLoginItem = {
  element: "#login-account-menu-option",
  popover: {
    title: "Sign In/Sign Out",
    description: "Create an account and sign in or sign out. When you sign in, bookmarks you create will be available on all devices you use to access the library.",
    position: "bottom"
  }
};
function pageDriver(prod) {
  let steps = [{
    element: "#source-homepage",
    popover: {
      title: "Library of Christ Mind Teachings",
      description: "Welcome to the Library of Christ Mind Teachings!<br><br>The contents of the library are shown below. Click on a book image to navigate to the home page for that teaching.",
      position: "bottom"
    }
  }, {
    element: "#book-acq",
    popover: {
      title: "Get Acquainted",
      description: "Get Acquainted contains documentation and other useful information about the Library. Click on the image to see the table of contents.",
      position: "top"
    }
  }, {
    element: "#acimoe-christmind-info",
    popover: {
      title: "A Course in Miracles Original Edition",
      description: "The Original Edition of ACIM from the <em>Course in Miracles Society</em>",
      position: "right"
    }
  }, {
    element: "#wom-christmind-info",
    popover: {
      title: "The Way of Mastery",
      description: "The Way of Mastery received by Jon Marc Hammer (Jayem)",
      position: "right"
    }
  }, {
    element: "#acol-christmind-info",
    popover: {
      title: "A Course Of Love",
      description: "A Course Of Love first received by Mari Perron",
      position: "left"
    }
  }, {
    element: "#raj-christmind-info",
    popover: {
      title: "The Raj Material",
      description: "An indepth discussion of A Course in Miracles by Raj through Paul Tuttle",
      position: "right"
    }
  }, {
    element: "#pwom-christmind-info",
    popover: {
      title: "Droga Mistrzostwa",
      description: "A Polish translation of The Way of Mastery",
      position: "right"
    }
  }, {
    element: "#jsb-christmind-info",
    popover: {
      title: "The Impersonal Life",
      description: "A rediscovery of Self received by Joseph Benner, first published in 1914",
      position: "left"
    }
  }, {
    element: "#acim-christmind-info",
    popover: {
      title: "A Course in Miracles Sparkly Edition",
      description: "A slightly different version of ACIM from the Original Edition. This edition is used by Raj.",
      position: "right"
    }
  }];
  Object(_driver__WEBPACK_IMPORTED_MODULE_0__["runFeatureIntro"])(steps);
}
function pageNavigationDriver() {
  let steps = [cmiPageBanner, pageMenu, pageMenuBookmarkItem, pageMenuHelpItem, pageMenuSearchItem, pageMenuGuestLoginItem, pageMenuAccountLoginItem, pageMenuContents];
  Object(_driver__WEBPACK_IMPORTED_MODULE_0__["runFeatureIntro"])(steps);
}
function transcriptDriver() {
  let transcriptDriverSteps = [];
  transcriptDriverSteps.push(cmiTranscriptBanner);
  transcriptDriverSteps.push(cmiTranscriptSourceTitle);
  transcriptDriverSteps.push(cmiTranscriptBookTitle);
  transcriptDriverSteps.push(transcriptMenuBookmarkItem);
  transcriptDriverSteps.push(transcriptMenuSearchItem);
  transcriptDriverSteps.push(transcriptMenuAudioItem);
  transcriptDriverSteps.push(transcriptMenuParagraphMarkerItem);
  transcriptDriverSteps.push(transcriptMenuPageTopItem);
  transcriptDriverSteps.push(transcriptMenuContentsItem);
  transcriptDriverSteps.push(transcriptMenuPreviousPageItem);
  transcriptDriverSteps.push(transcriptMenuNextPageItem);
  transcriptDriverSteps.push(transcriptMenuQuickLink);
  transcriptDriverSteps.push(transcriptMenuHelpItem);
  transcriptDriverSteps.push(transcriptMenuGuestLoginItem);
  transcriptDriverSteps.push(transcriptMenuAccountLoginItem);
  Object(_driver__WEBPACK_IMPORTED_MODULE_0__["runFeatureIntro"])(transcriptDriverSteps);
}

/***/ }),

/***/ "./src/js/modules/_util/sanitize.js":
/*!******************************************!*\
  !*** ./src/js/modules/_util/sanitize.js ***!
  \******************************************/
/*! exports provided: purify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "purify", function() { return purify; });
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dompurify */ "./node_modules/dompurify/dist/purify.js");
/* harmony import */ var dompurify__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dompurify__WEBPACK_IMPORTED_MODULE_0__);

function purify(dirty) {
  return dompurify__WEBPACK_IMPORTED_MODULE_0___default.a.sanitize(dirty, {
    SAFE_FOR_JQUERY: true
  });
}

/***/ }),

/***/ "./src/js/modules/_util/store.js":
/*!***************************************!*\
  !*** ./src/js/modules/_util/store.js ***!
  \***************************************/
/*! exports provided: storeSet, storeGet, storeInit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeSet", function() { return storeSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeGet", function() { return storeGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "storeInit", function() { return storeInit; });
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! store */ "./node_modules/store/dist/store.legacy.js");
/* harmony import */ var store__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(store__WEBPACK_IMPORTED_MODULE_0__);
/*
 * Store data in local storage. Keys are limited to those found
 * in source constants file.
 */

let keys = new Map();
/*
 * Get key from keys and throw if not found
 */

function getKey(key) {
  const storeKey = keys.get(key);

  if (!storeKey) {
    throw new Error(`store: key not found: ${key}`);
  }

  return storeKey;
}
/*
 * Set value for key in local storage
 */


function storeSet(key, value) {
  store__WEBPACK_IMPORTED_MODULE_0___default.a.set(getKey(key), value);
}
/*
 * Get value for key from local storage
 */

function storeGet(key, defaultValue) {
  let value = store__WEBPACK_IMPORTED_MODULE_0___default.a.get(getKey(key));
  return value || defaultValue;
}
/*
 * Load 'keys' with acceptable keys for local storage
 * based on the 'store' object in the argument 'config'
 */

function storeInit(config) {
  let sid = config.sid;

  for (const key in config.store) {
    keys.set(key, `${sid}.${config.store[key]}`);
  }
}

/***/ }),

/***/ "./src/js/modules/_util/url.js":
/*!*************************************!*\
  !*** ./src/js/modules/_util/url.js ***!
  \*************************************/
/*! exports provided: loadComplete, loadStart, showParagraph, showTOC, showTopicBookmark, showBookmark, showSearchMatch, showAnnotation, getUser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadComplete", function() { return loadComplete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadStart", function() { return loadStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showParagraph", function() { return showParagraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showTOC", function() { return showTOC; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showTopicBookmark", function() { return showTopicBookmark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showBookmark", function() { return showBookmark; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showSearchMatch", function() { return showSearchMatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showAnnotation", function() { return showAnnotation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getUser", function() { return getUser; });
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! scroll-into-view */ "./node_modules/scroll-into-view/scrollIntoView.js");
/* harmony import */ var scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(scroll_into_view__WEBPACK_IMPORTED_MODULE_0__);
 //timeout interval before calling scroll

const INTERVAL = 250; // get query string from window.location unless the arg 'qString' is not
// null, in that case it represents the query string

function getQueryString(key, qString) {
  let queryString;

  if (qString) {
    queryString = qString.substring(1);
  } else {
    queryString = window.location.search.substring(1);
  }

  let vars = queryString.split("&");

  for (let i = 0; i < vars.length; i++) {
    let getValue = vars[i].split("=");

    if (getValue[0] === key) {
      return getValue[1];
    }
  }

  return null;
}

function scrollComplete(message, type) {//console.log(`${message}: ${type}`);
}

function scrollIntoView(id, caller) {
  scroll_into_view__WEBPACK_IMPORTED_MODULE_0___default()(document.getElementById(id), {
    align: {
      top: 0.2
    }
  }, type => {
    scrollComplete(`scroll from url.js ${caller}(${id})`, type);
  });
} //remove query string from url


function resetUrl() {
  history.replaceState({}, document.title, location.origin + location.pathname);
} //called when query request is complete


function loadComplete() {
  $("#transcript-page-loading").removeClass("active");
  resetUrl();
} //show loading for long loading steps - like showing annotations

function loadStart() {
  let aInfo = getQueryString("as");

  if (aInfo) {
    $("#transcript-page-loading").addClass("active");
  }
}
/*
  Check for url query string requesting to scroll given paragraph into view
  Syntax: ?v=pid, example: ?v=p20

  Scroll paragraph 20 into view on page load
*/

function showParagraph() {
  let pId = getQueryString("v");

  if (pId) {
    setTimeout(scrollIntoView, INTERVAL, pId, "showParagraph");
    resetUrl();
  }
}
/*
  Check for query string containing ?tocbook. This is a request to display
  the table of contents for the specified book
*/

function showTOC() {
  let book = getQueryString("tocbook");

  if (book) {
    $(`[data-book="${book}"]`).trigger("click");
  }
}
function showTopicBookmark() {
  let pId = getQueryString("tnav");
  let topic = getQueryString("topic");

  if (pId) {
    resetUrl();
    return {
      pid: pId,
      topic: topic
    };
  }

  return null;
}
function showBookmark() {
  let pId = getQueryString("bkmk");

  if (pId) {
    resetUrl();
    return pId;
  }

  return null;
}
function showSearchMatch() {
  let pId = getQueryString("srch");

  if (pId) {
    resetUrl();
    return pId;
  }

  return null;
}
function showAnnotation() {
  let aInfo = getQueryString("as");

  if (aInfo) {
    return aInfo;
  }

  return null;
}
/*
  used for testing
*/

function getUser() {
  let user = getQueryString("user");

  if (user) {
    resetUrl();
    return user;
  }

  return null;
}

/***/ })

}]);
//# sourceMappingURL=page~profile~transcript.js.map