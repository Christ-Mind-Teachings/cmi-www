/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"profile": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/js";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"vendors~page~profile~transcript","vendors~profile","page~profile~transcript"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

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
    early2: ["xxx", "/chap02qa", "/chap03qa", "/chap08qa", "/chap09qa"],
    acq: ["xxx", "path", "advice", "contact"]
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
const books = ["tjl", "wos", "early", "woh", "wot", "wok", "acq"];
const bookIds = ["xxx", ...books];
const acq = ["xxx", "welcome", "wom", "web"];
const tjl = ["xxx", "ack", "foreword", "chap01", "chap02", "chap03", "chap04", "chap05", "chap06", "chap07", "chap08", "chap09", "chap10", "chap11", "chap12", "epilogue"];
const wos = ["xxx", "foreword", "preface", "chap01", "chap02", "chap03", "chap04", "afterwords", "epilog", "prayer"];
const early = ["xxx", "ble", "c2s", "hoe", "ign", "com", "dbc", "dth", "fem", "gar", "hea", "hoi", "hsp", "joy1", "joy2", "lht", "moa", "mot", "wak", "wlk"];
const contents = {
  acq: acq,
  tjl: tjl,
  wos: wos,
  early: early
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

/***/ "./src/js/modules/_user/email.js":
/*!***************************************!*\
  !*** ./src/js/modules/_user/email.js ***!
  \***************************************/
/*! exports provided: loadEmailListTable */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadEmailListTable", function() { return loadEmailListTable; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "./src/js/globals.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _user_netlify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_user/netlify */ "./src/js/modules/_user/netlify.js");
/*
  Email list management - for sharing bookmarks via email
*/



 //module global list of email addresses

let maillist = [];

function makeTableRow(item, index) {
  return `
    <tr data-index="${index}">
      <td class="delete-maillist-item"><i class="trash alternate icon"></i></td>
      <td class="edit-maillist-item"><i class="pencil alternate icon"></i></td>
      <td data-name="first">${item.first}</td>
      <td data-name="last">${item.last}</td>
      <td data-name="address">${item.address}</td>
    </tr>
  `;
}

function populateTable(maillist) {
  return `
    ${maillist.map((item, index) => `
      <tr data-index="${index}">
        <td class="delete-maillist-item"><i class="trash alternate icon"></i></td>
        <td class="edit-maillist-item"><i class="pencil alternate icon"></i></td>
        <td data-name="first">${item.first}</td>
        <td data-name="last">${item.last}</td>
        <td data-name="address">${item.address}</td>
      </tr>
    `).join("")}
  `;
}

function enableSave() {
  //enable save to database button
  $("button.save-to-database").removeClass("disabled");
}

function createEventHandlers() {
  //delete
  $("#email-list-table").on("click", ".delete-maillist-item", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let parent = $(this).parent();
    let index = parseInt(parent.attr("data-index"), 10); //mark deleted item from maillist

    maillist[index].deleted = true; //remove item from table

    parent.remove();
    enableSave(); //console.log("after delete: maillist %o", maillist);
  }); //edit

  $("#email-list-table").on("click", "td.edit-maillist-item", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let index = parseInt($(this).parent().attr("data-index"), 10);
    $("#addto-maillist-form").form("set values", maillist[index]);
    $("#add-or-update").text("Update").attr("data-index", index);
    $(".addto-maillist-dialog-wrapper.hide").removeClass("hide");
  }); //add to list

  $("button.add-name-to-maillist").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $("#add-or-update").text("Add");
    $(".addto-maillist-dialog-wrapper.hide").removeClass("hide");
  }); //save changes

  $("button.save-to-database").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(".addto-maillist-dialog-wrapper").addClass("hide");
    saveChanges();
  }); //submit

  $("form[name='addtomaillist']").on("submit", function (e) {
    e.preventDefault();
    e.stopPropagation();
    let status = $("#add-or-update").text();
    let formData = $("#addto-maillist-form").form("get values");

    if (status === "Add") {
      maillist.push({
        first: formData.first,
        last: formData.last,
        address: formData.address
      });
      let row = makeTableRow(formData, maillist.length - 1); //append row to table

      $("#email-list-table").append(row);
      enableSave();
      console.log("after Add: maillist: %o", maillist);
    } //update
    else {
        let index = parseInt($("#add-or-update").attr("data-index"), 10); //update array

        maillist[index] = {
          first: formData.first,
          last: formData.last,
          address: formData.address
        }; //update table

        $(`tr[data-index="${index}"] > td[data-name="first"]`).text(maillist[index].first);
        $(`tr[data-index="${index}"] > td[data-name="last"]`).text(maillist[index].last);
        $(`tr[data-index="${index}"] > td[data-name="address"]`).text(maillist[index].address); //close form

        $(".addto-maillist-dialog-wrapper").addClass("hide");
        enableSave(); //console.log("after Update: maillist: %o", maillist);
      }

    $("#addto-maillist-form").form("clear");
  }); //close

  $(".addto-maillist-cancel").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(".addto-maillist-dialog-wrapper").addClass("hide");
  });
}
/*
  Run only if page has class="manage-email-list"
*/


function loadEmailListTable() {
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_3__["getUserInfo"])();

  if (!userInfo) {
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.warning("You must be signed in to edit your email list");
    return;
  }

  let api = `${userInfo.userId}/maillist`;
  $(".sync.icon").addClass("loading");
  axios__WEBPACK_IMPORTED_MODULE_0___default()(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/${api}`).then(response => {
    $(".sync.icon.loading").removeClass("loading");
    maillist = response.data.maillist;
    let html = populateTable(maillist);
    $("#email-list-table").html(html);
    createEventHandlers();
  }).catch(err => {
    $(".sync.icon.loading").removeClass("loading");
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.error("Error getting email list: ", err);
  });
}
/*
  Save changes to maillist to database
*/

function saveChanges() {
  let userInfo = Object(_user_netlify__WEBPACK_IMPORTED_MODULE_3__["getUserInfo"])();
  let api = "maillist";
  let newList = maillist.filter(item => !item.deleted);
  console.log("newList: %o", newList);
  let body = {
    userId: userInfo.userId,
    addressList: newList
  };
  $(".sync.icon").addClass("loading");
  axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(`${_globals__WEBPACK_IMPORTED_MODULE_1__["default"].user}/${api}`, body).then(response => {
    $(".sync.icon.loading").removeClass("loading");

    if (response.data.message === "OK") {
      toastr__WEBPACK_IMPORTED_MODULE_2___default.a.info(`Saved! ${response.data.response}`);
      $("button.save-to-database").addClass("disabled");
    }
  }).catch(err => {
    $(".sync.icon.loading").removeClass("loading");
    toastr__WEBPACK_IMPORTED_MODULE_2___default.a.error(err);
  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ "./src/js/modules/_user/net.js":
/*!*************************************!*\
  !*** ./src/js/modules/_user/net.js ***!
  \*************************************/
/*! exports provided: getConfig, getTopics, getBookmarks, getBookmarkText */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getConfig", function() { return getConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTopics", function() { return getTopics; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBookmarks", function() { return getBookmarks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBookmarkText", function() { return getBookmarkText; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _globals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../globals */ "./src/js/globals.js");



const acimKey = __webpack_require__(/*! acim/modules/_config/key */ "../cmi-acim/src/js/modules/_config/key.js");

const oeKey = __webpack_require__(/*! oe/modules/_config/key */ "../cmi-oe/src/js/modules/_config/key.js");

const acolKey = __webpack_require__(/*! acol/modules/_config/key */ "../cmi-acol/src/js/modules/_config/key.js");

const rajKey = __webpack_require__(/*! raj/modules/_config/key */ "../cmi-raj/src/js/modules/_config/key.js");

const jsbKey = __webpack_require__(/*! jsb/modules/_config/key */ "../cmi-jsb/src/js/modules/_config/key.js");

const womKey = __webpack_require__(/*! wom/modules/_config/key */ "../cmi-wom/src/js/modules/_config/key.js");

const pwomKey = __webpack_require__(/*! pwom/modules/_config/key */ "../cmi-pwom/src/js/modules/_config/key.js");

const ACIMSOURCEID = "12";
const OESOURCEID = "15";
const ACOLSOURCEID = "14";
const RAJSOURCEID = "13";
const WOMSOURCEID = "10";
const PWOMSOURCEID = "16";
const JSBSOURCEID = "11";
function getConfig(key) {
  let url = _globals__WEBPACK_IMPORTED_MODULE_1__["default"][key];

  if (!url) {
    throw `key: ${key} not found in globals`;
  }

  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url);
}
function getTopics(userId, sourceId) {
  let url = _globals__WEBPACK_IMPORTED_MODULE_1__["default"]["topicsEndPoint"];

  if (!url) {
    throw "key: topicsEndPoint not found in globals";
  }

  url = `${url}/user/${userId}/topics/${sourceId}`;
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url);
}
function getBookmarks(userId, sourceId) {
  let url = _globals__WEBPACK_IMPORTED_MODULE_1__["default"]["bookmarkApi"];

  if (!url) {
    throw "key: 'bookmarkApi' not found in globals";
  }

  url = `${url}/bookmark/query/${userId}/${sourceId}`;
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url);
} //transcript Node cache

let htmlCache = {};

function getNoteTranscript(id, url) {
  if (htmlCache[id]) {
    return Promise.resolve(htmlCache[id]);
  }

  const config = {
    responseType: "document"
  };
  return axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url, config).then(response => {
    let transcriptNode = response.data.getElementsByClassName("transcript")[0];
    htmlCache[id] = transcriptNode;
    return Promise.resolve(transcriptNode);
  });
}

function getNoteUrl(key) {
  let url;
  let akey = key + "";

  if (akey.startsWith(ACIMSOURCEID)) {
    url = acimKey.getUrl(key, true);
  }

  if (akey.startsWith(OESOURCEID)) {
    url = oeKey.getUrl(key, true);
  } else if (akey.startsWith(ACOLSOURCEID)) {
    url = acolKey.getUrl(key, true);
  } else if (akey.startsWith(JSBSOURCEID)) {
    url = jsbKey.getUrl(key, true);
  } else if (akey.startsWith(RAJSOURCEID)) {
    url = rajKey.getUrl(key, true);
  } else if (akey.startsWith(WOMSOURCEID)) {
    url = womKey.getUrl(key, true);
  } else if (akey.startsWith(PWOMSOURCEID)) {
    url = pwomKey.getUrl(key, true);
  }

  return url;
}

function getBookmarkText(bookmarks) {
  let promises = bookmarks.map(bm => {
    if (bm.bookmark.selectedText) {
      if (!bm.mgr) {
        bm.mgr = {};
        let st = JSON.parse(bm.bookmark.selectedText);
        bm.mgr.title = st.title;
        bm.mgr.url = st.url;
        bm.mgr.pid = st.pid;
        bm.mgr.content = [{
          pid: st.pid,
          text: st.target.selector[1].exact
        }];
        bm.mgr.comment = bm.bookmark.Comment;
        bm.mgr.note = bm.bookmark.Note;
        bm.mgr.type = "selected";
      }

      return Promise.resolve(bm);
    } //Note style bookmark
    else if (!bm.mgr) {
        let url = getNoteUrl(bm.id);
        bm.mgr = {};
        bm.mgr.type = "note";
        bm.mgr.title = bm.bookmark.bookTitle;
        bm.mgr.url = url;
        bm.mgr.pid = bm.bookmark.rangeStart;
        bm.mgr.comment = bm.bookmark.Comment;
        bm.mgr.note = bm.bookmark.Note; //get 'document' response from axios

        return getNoteTranscript(bm.id, url).then(resp => {
          let paragraphs = resp.getElementsByTagName("p");
          let rangeStart = parseInt(bm.bookmark.rangeStart.substring(1), 10);
          let rangeEnd = parseInt(bm.bookmark.rangeEnd.substring(1), 10);
          bm.mgr.content = [];

          for (let p = rangeStart; p <= rangeEnd; p++) {
            bm.mgr.content.push({
              pid: `p${p}`,
              text: paragraphs[p].textContent
            });
          }

          return Promise.resolve(bm);
        });
      } else {
        return Promise.resolve(bm);
      }
  });
  return promises;
}

/***/ }),

/***/ "./src/js/modules/_user/topicmgr.js":
/*!******************************************!*\
  !*** ./src/js/modules/_user/topicmgr.js ***!
  \******************************************/
/*! exports provided: initializeTopicManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeTopicManager", function() { return initializeTopicManager; });
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! toastr */ "./node_modules/toastr/toastr.js");
/* harmony import */ var toastr__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(toastr__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _net__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./net */ "./src/js/modules/_user/net.js");
/* harmony import */ var _netlify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash/intersectionWith */ "./node_modules/lodash/intersectionWith.js");
/* harmony import */ var lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var lodash_differenceWith__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! lodash/differenceWith */ "./node_modules/lodash/differenceWith.js");
/* harmony import */ var lodash_differenceWith__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash_differenceWith__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/uniqWith */ "./node_modules/lodash/uniqWith.js");
/* harmony import */ var lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5__);






let sourceInfo = {
  title: {
    "10": "The Way of Mastery",
    "16": "Polish Way of Mastery",
    "11": "The Impersonal Life",
    "12": "ACIM Sparkley Edition",
    "13": "The Raj Material",
    "14": "A Course Of Love",
    "15": "ACIM Original Edition"
  },
  "0": [{
    "value": "*",
    "name": "-- Select Source --"
  }],
  "12": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "122",
    "name": "Text"
  }, {
    "value": "123",
    "name": "Workbook for Students"
  }, {
    "value": "124",
    "name": "Manual for Teachers"
  }, {
    "value": "121",
    "name": "Preface"
  }],
  "15": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "151",
    "name": "Text"
  }, {
    "value": "152",
    "name": "Workbook for Students"
  }, {
    "value": "153",
    "name": "Manual for Teachers"
  }],
  "14": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "1404",
    "name": "The Course"
  }, {
    "value": "1402",
    "name": "The Treatises"
  }, {
    "value": "1403",
    "name": "The Dialogues"
  }],
  "11": [{
    "value": "*",
    "name": "All Books"
  }],
  "13": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "1301",
    "name": "You Are the Answer"
  }, {
    "value": "1302",
    "name": "Graduation"
  }, {
    "value": "1303",
    "name": "ACIM Study Group 2002"
  }, {
    "value": "1304",
    "name": "ACIM Study Group 2003"
  }, {
    "value": "1305",
    "name": "ACIM Study Group 2004"
  }, {
    "value": "1306",
    "name": "ACIM Study Group 2005"
  }, {
    "value": "1307",
    "name": "ACIM Study Group 2006"
  }, {
    "value": "1308",
    "name": "ACIM Study Group 2007"
  }, {
    "value": "1309",
    "name": "ACIM Study Group 2008"
  }, {
    "value": "1310",
    "name": "ACIM Study Group 2009"
  }, {
    "value": "1311",
    "name": "ACIM Study Group 2010"
  }, {
    "value": "1312",
    "name": "ACIM Study Group 2011"
  }, {
    "value": "1313",
    "name": "ACIM Study Group 2012"
  }, {
    "value": "1314",
    "name": "ACIM Study Group 2013"
  }, {
    "value": "1315",
    "name": "ACIM Study Group 2014"
  }, {
    "value": "1316",
    "name": "ACIM Study Group 2015"
  }, {
    "value": "1317",
    "name": "ACIM Study Group 2016"
  }, {
    "value": "1318",
    "name": "ACIM Study Group 2017"
  }, {
    "value": "1319",
    "name": "ACIM Study Group 2018"
  }],
  "10": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "101",
    "name": "The Jeshua Letters"
  }, {
    "value": "102",
    "name": "The Way of the Servant"
  }, {
    "value": "103",
    "name": "The Early Years"
  }, {
    "value": "104",
    "name": "The Way of the Heart"
  }, {
    "value": "105",
    "name": "The Way of Transformation"
  }, {
    "value": "106",
    "name": "The Way of Knowing"
  }],
  "16": [{
    "value": "*",
    "name": "All Books"
  }, {
    "value": "1601",
    "name": "The Jeshua Letters"
  }, {
    "value": "1602",
    "name": "The Way of the Servant"
  }, {
    "value": "1606",
    "name": "The Early Years"
  }, {
    "value": "1603",
    "name": "The Way of the Heart"
  }, {
    "value": "1604",
    "name": "The Way of Transformation"
  }, {
    "value": "1605",
    "name": "The Way of Knowing"
  }]
};
let bookmarks = {};
let topics = {};

function generateTopicList(topics) {
  return `
    <div class="ui list">
      ${topics.map(t => `
        <div class="item">
          ${t.topic}
        </div>
      `).join("")}
    </div>
  `;
}

function generateHorizontalList(listArray, flat = false) {
  if (!listArray || listArray.length === 0) {
    return `
      <div class="item">
        <em>Annotation has no topics</em>
      </div>
    `;
  }

  return `
    ${listArray.map(item => `
      <div class="item">
        <em>${flat ? item : item.topic}</em>
      </div>
    `).join("")}
  `;
}

function generateContent(content) {
  return `
    ${content.map(p => `
      <p>
        ${p.text}
      </p>
    `).join("")}
  `;
}

function generateSection(bm) {
  return `
    <div class="ui vertical segment">
      <div class="ui small header bookmark-header">
        <a target="_blank" href="${bm.mgr.url}?v=${bm.mgr.pid}&key=${bm.id}">${bm.mgr.title ? bm.mgr.title : bm.mgr.url}</a>
        <br/>
        <div class="ui horizontal bulleted link list">
          ${generateHorizontalList(bm.bookmark.topicList)}
        </div>
        ${bm.mgr.comment ? "<br/>" : ""}
        ${bm.mgr.comment ? bm.mgr.comment : ""}
      </div>
      ${generateContent(bm.mgr.content)}
      <p>
        ~ ${bm.id}
      </p>
    </div>
  `;
}

function generateBookmarkTextHtml(bookmarks, topicManager) {
  return `
    <p>
      <button class="hide-headers ui primary button">Hide Headers</button>
    </p>
    <p>
      ${sourceInfo.title[topicManager.source]}<br/>
      ${bookmarks.length} Bookmarks include topics: <em>${topicManager.topicArray.join(" / ")}</em> <br/>
      ${new Date().toLocaleString()}
    </p>
    ${bookmarks.map(bookmark => `${generateSection(bookmark)}`).join("")}
  `;
}

function generateBookmarkText(bookmarks, topicManager) {
  let promises = Object(_net__WEBPACK_IMPORTED_MODULE_1__["getBookmarkText"])(bookmarks);
  Promise.all(promises).then(responses => {
    //console.log("promise.all: %o", responses);
    let html = generateBookmarkTextHtml(responses, topicManager);
    $("#activity-report").html(html);
  });
}

function makeTopicSelect(topics) {
  return `
    ${topics.map(topic => `<div class="item ${topic.deleted ? " deleted" : ""}" data-value="${topic.deleted ? "*" : ""}${topic.value}">${topic.deleted ? "*" : ""}${topic.topic}</div>`).join("")}
  `;
}

function makeBookSelectNew(books) {
  return `
    ${books.map(book => `<option value="${book.value}">${book.name}</option>`).join("")}
  `;
}

function getFormData() {
  return $("#topic-manager").form("get values");
}

function initForm() {
  $("#source-list").dropdown();
  $("#book-list1.dropdown").dropdown();
  $("#topicSelect").dropdown();
  $("#activity-report").on("click", ".hide-headers", function (e) {
    if ($(this).hasClass("hide")) {
      $(this).removeClass("hide").html("Hide Headers");
      $("#activity-report .bookmark-header").removeClass("hide");
    } else {
      $(this).addClass("hide").html("Show Headers");
      $("#activity-report .bookmark-header").addClass("hide");
    }
  }); //delete confirmation modal

  $("#confirmDelete").modal({
    closable: false,
    onDeny: function () {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Delete Canceled."); //$("#topicSelect").dropdown("clear");
    },
    onApprove: function () {
      let topicManager = getFormData();
      let deleted = filterTopics(topicManager.topicList); //clear selected topics

      $("#topicSelect").dropdown("clear");

      if (deleted.length === 0) {
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("No topic(s) selected.");
        return;
      } //mark topics as deleted


      markTopicsDeleted(topicManager.source, deleted); //find bookmarks with deleted topics

      let bookmarksWithDeletedTopics = getBookmarksByTopic(topicManager.source, deleted);
      console.log("matches: %o", bookmarksWithDeletedTopics); //remove deleted topics from bookmarks

      if (bookmarksWithDeletedTopics.length > 0) {
        deleteBookmarkTopics(topicManager.source, bookmarksWithDeletedTopics, deleted);
      } //update topics select control


      let html = makeTopicSelect(topics[topicManager.source]);
      $("#topic-list").html(html);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success("Topics Deleted.");
    }
  });
  $("#source-list").on("change", function () {
    let topicManager = getFormData(); //clear topic list

    $("#topicsLabel").text("Topics (0)"); //let sourceId = e.target.selectedOptions[0].value;

    let sourceId = topicManager.source;
    let html = makeBookSelectNew(sourceInfo[sourceId]);
    $("#book-list1").html(html); //clear activity report

    clearActivityReport(); //enable Get Bookmarks button

    $("#getBookmarksButton").removeAttr("disabled"); //disable buttons until topics have been loaded

    $("#deleteTopicsButton").attr("disabled", "");
    $("#renameTopicButton").attr("disabled", "");
    $("#findFriendsButton").attr("disabled", "");
    $("#displayBookmarksButton").attr("disabled", "");
    $("#bookmarksLabel").text("Bookmarks (0)"); //clear topic dropdown

    if ($("#topic-list > div").length > 0) {
      $("#topic-list").html("");
      $("#topicSelect").dropdown("clear");
      $("#topicsLabel").text("Topics (0)");
    }
  });
  $("#getBookmarksButton").on("click", function (e) {
    let topicManager = getFormData();

    if (topicManager.source === "0") {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("To start, first select a source");
      return;
    }

    let userInfo = Object(_netlify__WEBPACK_IMPORTED_MODULE_2__["getUserInfo"])();

    if (!userInfo) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.error("You must be signed in to use this page");
      return;
    } //disable button until source is changed


    $("#getBookmarksButton").attr("disabled", "");
    $("#topic-manager").addClass("loading"); //get topics for source

    if (!topics[topicManager.source]) {
      Object(_net__WEBPACK_IMPORTED_MODULE_1__["getTopics"])(userInfo.userId, topicManager.source).then(response => {
        topics[topicManager.source] = response.data.topics; //add "All Topics" topic

        topics[topicManager.source].unshift({
          value: "<>",
          topic: "< All Topics >"
        });
        let html = makeTopicSelect(response.data.topics);
        $("#topic-list").html(html);
        $("#topicsLabel").text(`Topics (${response.data.topics.length})`);
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${topics[topicManager.source].length} topics loaded`);
        $("#deleteTopicsButton").removeAttr("disabled");
        $("#renameTopicButton").removeAttr("disabled");
        $("#findFriendsButton").removeAttr("disabled");
        $("#displayBookmarksButton").removeAttr("disabled");
      });
    } else {
      let html = makeTopicSelect(topics[topicManager.source]);
      $("#topic-list").html(html);
      $("#topicsLabel").text(`Topics (${topics[topicManager.source].length})`);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${topics[topicManager.source].length} topics loaded`);
      $("#deleteTopicsButton").removeAttr("disabled");
      $("#renameTopicButton").removeAttr("disabled");
      $("#findFriendsButton").removeAttr("disabled");
      $("#displayBookmarksButton").removeAttr("disabled");
    } //get bookmarks for source


    if (!bookmarks[topicManager.source]) {
      Object(_net__WEBPACK_IMPORTED_MODULE_1__["getBookmarks"])(userInfo.userId, topicManager.source).then(response => {
        bookmarks[topicManager.source] = response.data.response;
        $("#bookmarksLabel").text(`Bookmarks (${bookmarks[topicManager.source].length})`);
        toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${bookmarks[topicManager.source].length} bookmarks loaded`);
        $("#topic-manager").removeClass("loading"); //add modified indicator, set to false

        bookmarks[topicManager.source].forEach(i => {
          i.modified = false;
        });
      });
    } else {
      $("#topic-manager").removeClass("loading");
      $("#bookmarksLabel").text(`Bookmarks (${bookmarks[topicManager.source].length})`);
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.success(`${bookmarks[topicManager.source].length} bookmarks loaded`);
    }
  });
  $("#deleteTopicsButton").on("click", function () {
    let topicManager = getFormData();
    let deleted = filterTopics(topicManager.topicList);

    if (deleted.length === 0) {
      $("#topicSelect").dropdown("clear");
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("No topic(s) selected.");
      return;
    }

    $("#topicsToDelete").html(`<em>${topicManager.topicList}</em>`);
    $("#confirmDelete").modal("show");
  });
  $("#renameTopicButton").on("click", function () {
    let topicManager = getFormData();

    if (topicManager.topicList.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Select topic to be renamed.");
      return;
    }

    if (topicManager.topicList.length > 1) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Select only ONE topic to be renamed.");
      return;
    }
  });
  $("#findFriendsButton").on("click", function () {
    let topicManager = getFormData();
    let topicArray = filterTopics(topicManager.topicList); //don't all the 'All Topics' topic

    topicArray = topicArray.filter(t => {
      if (t === "<>") {
        return false;
      }

      return true;
    });

    if (topicArray.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Select at least one topic.");
      return;
    } //find bookmarks containing selected topics


    let matches = findMatches(topicManager.source, topicManager.book, topicArray); //get topics from matches but don't include those in topicArray

    let friends = [];
    matches.forEach(bm => {
      let diff = lodash_differenceWith__WEBPACK_IMPORTED_MODULE_4___default()(bm.bookmark.topicList, topicArray, (v1, v2) => {
        if (v1.value === v2) {
          return true;
        }

        return false;
      });
      friends = friends.concat(diff);
    }); //remove duplicates

    friends = lodash_uniqWith__WEBPACK_IMPORTED_MODULE_5___default()(friends, (v1, v2) => {
      if (v1.value === v2.value) {
        return true;
      }

      return false;
    }); //sort

    friends.sort((v1, v2) => {
      if (v1.value < v2.value) {
        return -1;
      }

      if (v1.value > v2.value) {
        return 1;
      }

      return 0;
    });
    let html = generateTopicList(friends);
    $("#activity-report").html(html);
  });
  $("#displayBookmarksButton").on("click", function () {
    let topicManager = getFormData();
    let topicArray = filterTopics(topicManager.topicList);

    if (topicArray.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("Select at least one topic.");
      return;
    }

    let matches = findMatches(topicManager.source, topicManager.book, topicArray);

    if (matches.length === 0) {
      toastr__WEBPACK_IMPORTED_MODULE_0___default.a.info("No bookmarks contain selected topics");
      clearActivityReport();
      return;
    } //generated html


    topicManager.topicArray = topicArray;
    generateBookmarkText(matches, topicManager);
  });
}

function clearActivityReport() {
  $("#activity-report").html("");
}
/*
 * Search through bookmarks by source and filter by book for topics
 */


function findMatches(source, book, topics) {
  let matches = getBookmarksWithAllTopic(source, topics);

  if (matches.length === 0) {
    return matches;
  } //filter matched bookmarks if user restricted by book


  if (book !== "*") {
    matches = matches.filter(bm => {
      let bmid = bm.id + "x";
      return bmid.startsWith(book);
    });
  }

  return matches;
}
/*
 * Given a comma separated string of user selected topics, filter deleted
 * topics and return an array.
 */


function filterTopics(topicString) {
  let topicArray = topicString.split(",").filter(item => {
    if (item === "") {
      return false;
    }

    if (item.startsWith("*")) {
      return false;
    }

    return true;
  });
  return topicArray;
}
/*
 * Mark topics as deleted
 * Args: source: Source Id
 *       deletedTopics: array of deleted topics
 */


function markTopicsDeleted(source, deletedTopics) {
  topics[source].forEach(topic => {
    deletedTopics.forEach(dt => {
      if (dt !== "<>" && dt === topic.value) {
        topic.deleted = true; //console.log("deleted topic: %o", topic);
      }
    });
  });
}
/*
 * Find bookmarks containing ALL topics
 * Args: source: Source Id
 *       topics: array of topics
 */


function getBookmarksWithAllTopic(source, topics) {
  let matches = [];
  let wildcard = false;

  if (topics.length === 0) {
    return matches;
  } //return all bookmarks


  if (topics.includes("<>")) {
    wildcard = true;
  }

  bookmarks[source].forEach(item => {
    item.bookmark.forEach(bmark => {
      if (wildcard) {
        matches.push({
          id: item.id,
          bookmark: bmark
        });
      } else {
        if (bmark.topicList && bmark.topicList.length > 0) {
          let index;
          let findCount = 0;
          topics.forEach(t => {
            index = bmark.topicList.findIndex(bt => {
              if (bt.value === t) {
                return true;
              }

              return false;
            });

            if (index > -1) {
              findCount++;
            }
          });

          if (findCount === topics.length) {
            matches.push({
              id: item.id,
              bookmark: bmark
            });
          }
        }
      }
    });
  });
  return matches;
}
/*
 * Find bookmarks containing topics
 * Args: source: Source Id
 *       topics: array of topics
 */


function getBookmarksByTopic(source, topics) {
  //find bookmarks containing selected topics
  let matches = [];
  bookmarks[source].forEach(item => {
    item.bookmark.forEach(bmark => {
      let intersection;

      if (bmark.topicList) {
        intersection = lodash_intersectionWith__WEBPACK_IMPORTED_MODULE_3___default()(topics, bmark.topicList, function (t, bt) {
          if (t === bt.value) {
            return true;
          }

          return false;
        });

        if (intersection.length > 0) {
          matches.push({
            id: item.id,
            bookmark: bmark
          });
        }
      }
    });
  });
  return matches;
}
/*
 * Delete topics in bookmarks if found in the argument array topics
 */


function deleteBookmarkTopics(sourceId, bookmarks, topics) {
  bookmarks.forEach(item => {
    if (item.bookmark.topicList && item.bookmark.topicList.length > 0) {
      item.bookmark.topicList.forEach(t => {
        if (topics.includes(t.value)) {
          t.deleted = true;
        }
      });
      item.bookmark.deletedTopicList = item.bookmark.topicList.filter(t => {
        if (t.deleted) {
          return true;
        }

        return false;
      });
      item.bookmark.topicList = item.bookmark.topicList.filter(t => {
        if (!t.deleted) {
          return true;
        }

        delete t.deleted;
        return false;
      });
    }

    markModified(sourceId, item.id);
  });
}

function markModified(sourceId, bookmarkId) {
  let b = bookmarks[sourceId].find(i => {
    if (i.id === bookmarkId) {
      return true;
    }

    return false;
  });

  if (b) {
    b.modified = true;
  }
}

function initializeTopicManager() {
  initForm();
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ "./src/js/profile.js":
/*!***************************!*\
  !*** ./src/js/profile.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _vendor_semantic_semantic_min_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../vendor/semantic/semantic.min.js */ "./src/vendor/semantic/semantic.min.js");
/* harmony import */ var _vendor_semantic_semantic_min_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_vendor_semantic_semantic_min_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_page_startup__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/_page/startup */ "./src/js/modules/_page/startup.js");
/* harmony import */ var _modules_bookmark_start__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/_bookmark/start */ "./src/js/modules/_bookmark/start.js");
/* harmony import */ var _modules_search_search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/_search/search */ "./src/js/modules/_search/search.js");
/* harmony import */ var _modules_contents_toc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/_contents/toc */ "./src/js/modules/_contents/toc.js");
/* harmony import */ var _modules_user_netlify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/_user/netlify */ "./src/js/modules/_user/netlify.js");
/* harmony import */ var _modules_about_about__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/_about/about */ "./src/js/modules/_about/about.js");
/* harmony import */ var _modules_user_email__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/_user/email */ "./src/js/modules/_user/email.js");
/* harmony import */ var _modules_user_topicmgr__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/_user/topicmgr */ "./src/js/modules/_user/topicmgr.js");
/* harmony import */ var _modules_language_lang__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/_language/lang */ "./src/js/modules/_language/lang.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./constants */ "./src/js/constants.js");
/* eslint no-console: off */











$(document).ready(() => {
  Object(_modules_page_startup__WEBPACK_IMPORTED_MODULE_1__["initStickyMenu"])();
  Object(_modules_language_lang__WEBPACK_IMPORTED_MODULE_9__["setLanguage"])(_constants__WEBPACK_IMPORTED_MODULE_10__["default"]);
  Object(_modules_bookmark_start__WEBPACK_IMPORTED_MODULE_2__["bookmarkStart"])("page");
  _modules_search_search__WEBPACK_IMPORTED_MODULE_3__["default"].initialize();
  _modules_user_netlify__WEBPACK_IMPORTED_MODULE_5__["default"].initialize();
  _modules_contents_toc__WEBPACK_IMPORTED_MODULE_4__["default"].initialize("transcript");
  _modules_about_about__WEBPACK_IMPORTED_MODULE_6__["default"].initialize(); //email mgt page

  if ($(".manage-email-list").length === 1) {
    console.log("loading email list table");
    Object(_modules_user_email__WEBPACK_IMPORTED_MODULE_7__["loadEmailListTable"])();
  } //topic mgt page


  if ($(".manage-topic-list").length === 1) {
    console.log("loading topic list table");
    Object(_modules_user_topicmgr__WEBPACK_IMPORTED_MODULE_8__["initializeTopicManager"])();
  }
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/src/jquery.js")))

/***/ }),

/***/ 1:
/*!*********************************!*\
  !*** multi ./src/js/profile.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/js/profile.js */"./src/js/profile.js");


/***/ })

/******/ });
//# sourceMappingURL=profile.js.map