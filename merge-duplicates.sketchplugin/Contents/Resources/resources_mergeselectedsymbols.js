/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/mergeselectedsymbols.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/mergeselectedsymbols.js":
/*!*******************************************!*\
  !*** ./resources/mergeselectedsymbols.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// disable the context menu (eg. the right click menu) to have a more native feel
// document.addEventListener('contextmenu', (e) => {
//   e.preventDefault()
// })
var globalMergeSession;
var globalSelectedSymbol = -1;
var globalNumberOfSymbolsInDocument = 0;
var globalView = 1;

window.LaunchMerge = function (numberOfSymbols) {
  globalNumberOfSymbolsInDocument = numberOfSymbols;

  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', GetSymbols);
  } else {
    GetSymbols();
  }
};

window.GetSymbols = function () {
  setTimeout(function () {
    var message = "We're loading thumbnails...";
    if (globalNumberOfSymbolsInDocument > 10) message = "We're loading thumbnails...<br/><br/>Wop, you have " + globalNumberOfSymbolsInDocument + " symbols here! 🙈<br/> This may take a while...";
    window.ShowProgress(message);
    window.postMessage('GetSymbolData');
  }, 200);
};

window.ShowProgress = function (message) {
  document.getElementById('progressLayer').className = "progressCircle offDownCenter fadeIn";
  document.getElementById('loadingMessage').innerHTML = message;
  document.getElementById('listOfSymbols').className = "movingYFadeInitialState movingYFadeOut" + (globalView == 0 ? " cardsView" : "");
};

window.HideProgress = function () {
  document.getElementById('progressLayer').className = "progressCircle offDownCenter fadeOut";
};

window.onSymbolClicked = function (index) {
  var symbolWithDuplicates = globalMergeSession[0];
  var btnMerge = document.getElementById('btnMerge');

  for (var i = 0; i < symbolWithDuplicates.duplicates.length; i++) {
    var otherCheck = document.getElementById("duplicateItemCheck" + i);
    otherCheck.checked = false;
    var otherDiv = document.getElementById("duplicateItem" + i);
    otherDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter";
    symbolWithDuplicates.duplicates[i].isSelected = false;
  }

  var selectedCheck = document.getElementById("duplicateItemCheck" + index);
  selectedCheck.checked = true;
  var selectedDiv = document.getElementById("duplicateItem" + index);
  selectedDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected";
  btnMerge.disabled = false;
  symbolWithDuplicates.duplicates[index].isSelected = true;
  globalSelectedSymbol = index;
  DrawSymbolList(globalMergeSession);
};

window.DrawSymbolList = function (mergeSession) {
  window.HideProgress();
  globalMergeSession = mergeSession;
  var symbolWithDuplicates = globalMergeSession[0];
  var inner = "";

  for (var i = 0; i < symbolWithDuplicates.duplicates.length; i++) {
    var selected = symbolWithDuplicates.duplicates[i].isSelected ? "selected" : "";
    var checked = symbolWithDuplicates.duplicates[i].isSelected ? "checked" : "";
    var checkbox = "<div class=\"colAuto roundCheckbox\">\n      <input type=\"checkbox\" ".concat(checked, " id=\"duplicateItemCheck").concat(i, "\"/>\n      <label></label>\n    </div>");
    inner += "<div id=\"duplicateItem".concat(i, "\" class=\"thumbnailContainer symbolPreview alignVerticalCenter ").concat(selected, "\" onclick=\"onSymbolClicked(").concat(i, ")\">\n                ").concat(checkbox, "\n                <div class=\"colAvailable verticalLayout thumbnailData\" id=\"duplicateItemThumbnail").concat(i, "\" >\n                  <div class=\"rowAvailable thumbnail\" style='background-image:url(\"").concat(symbolWithDuplicates.duplicates[i].thumbnail, "\")'></div>\n                  <div class=\"rowAuto primaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(symbolWithDuplicates.duplicates[i].name, " (").concat(symbolWithDuplicates.duplicates[i].libraryName, ")</span></div>\n                  <div class=\"rowAuto secondaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(symbolWithDuplicates.duplicates[i].numInstances, " instances - Used in ").concat(symbolWithDuplicates.duplicates[i].numOverrides, " overrides</span></div>\n                </div>\n                </div>\n              </div>");
  }

  var resultsTitle = document.getElementById("resultsTitle");
  var resultsDescription = document.getElementById("resultsDescription");
  resultsTitle.innerHTML = "Merging selected symbols";
  resultsDescription.innerHTML = "You're about to merge this symbols. Choose the one you want to keep and press OK. The other symbols will be removed, and all of their instances will be replaced by the one you chose to keep.";
  document.getElementById("viewSelector").classList.remove("notDisplayed");
  var listOfSymbols = document.getElementById('listOfSymbols');
  listOfSymbols.innerHTML = inner;
  listOfSymbols.className = "scrollable movingYFadeInitialState workZone movingYFadeIn" + (globalView == 0 ? " cardsView" : "");
};

window.cancelAssignation = function () {
  window.postMessage('Cancel');
};

document.getElementById('btnCancel').addEventListener("click", function () {
  cancelAssignation();
});
document.getElementById('btnMerge').addEventListener("click", function () {
  window.postMessage('ExecuteMerge', globalMergeSession, globalSelectedSymbol);
});
document.getElementById('btnCardView').addEventListener("click", function () {
  globalView = 0;
  document.getElementById('listOfSymbols').classList.add("cardsView");
  document.getElementById('btnListView').classList.remove("selected");
  document.getElementById('btnCardView').classList.add("selected");
});
document.getElementById('btnListView').addEventListener("click", function () {
  globalView = 1;
  document.getElementById('listOfSymbols').classList.remove("cardsView");
  document.getElementById('btnCardView').classList.remove("selected");
  document.getElementById('btnListView').classList.add("selected");
});

/***/ })

/******/ });
//# sourceMappingURL=resources_mergeselectedsymbols.js.map