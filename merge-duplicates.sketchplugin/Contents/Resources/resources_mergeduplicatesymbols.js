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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/mergeduplicatesymbols.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/mergeduplicatesymbols.js":
/*!********************************************!*\
  !*** ./resources/mergeduplicatesymbols.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
var globalMergeSession;
var globalSymbolDisplayed = 0;
var isLoadingSymbolData = false;
var globalNumberOfSymbolsInDocument = 0;
var globalNumberOfSymbolsInLibraries = 0;
var globalNumberOfInstancesInDocument = 0;
var globalView = 1;
var includeLibrariesSetting = false;

window.LaunchMerge = function (numberOfLocalSymbols, numberOfLibrarySymbols, numberOfInstancesInDocument, includeLibraries) {
  globalNumberOfSymbolsInDocument = numberOfLocalSymbols;
  globalNumberOfSymbolsInLibraries = numberOfLibrarySymbols;
  globalNumberOfInstancesInDocument = numberOfInstancesInDocument;
  includeLibrariesSetting = includeLibraries;

  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', GetSymbols);
  } else {
    GetSymbols();
  }
};

window.GetSymbols = function () {
  window.postMessage("nativeLog", "WV - Get symbols");
  document.getElementById('chkIncludeLibraries').checked = includeLibrariesSetting;
  setTimeout(function () {
    var message = "We're looking for duplicates...";

    if (globalNumberOfSymbolsInDocument + globalNumberOfSymbolsInLibraries > 500 || globalNumberOfInstancesInDocument > 5000) {
      var andLinkedLibraries = globalNumberOfSymbolsInLibraries > 0 ? "(and " + globalNumberOfSymbolsInLibraries + " in linked libraries)" : "";
      message = "We're looking for duplicates...<br/><br/>Wow, you have " + globalNumberOfSymbolsInDocument + " symbols here " + andLinkedLibraries + "! 🙈<br/> This may take a while... Wanna go get a coffee?";
    }

    window.ShowProgress(message);
    window.postMessage('RecalculateDuplicates');
  }, 200);
};

window.DrawDuplicateSymbols = function (mergeSession) {
  window.postMessage("nativeLog", "WV - Drawing duplicate symbols list");
  window.HideProgress();
  globalMergeSession = mergeSession;
  if (globalSymbolDisplayed >= globalMergeSession.length) globalSymbolDisplayed = 0;
  var lstDuplicateSymbols = document.getElementById('lstDuplicateSymbols');
  var btnMerge = document.getElementById('btnMerge');
  var inner = "";
  var checkedCounter = 0;

  if (globalMergeSession.length > 0) {
    for (var i = 0; i < globalMergeSession.length; i++) {
      var hasSelection = globalMergeSession[i].selectedIndex >= 0;
      var labelFor = hasSelection ? "for=\"duplicatedSymbolCheck".concat(i, "\"") : "";
      var checked = hasSelection && !globalMergeSession[i].isUnchecked ? "checked" : "";
      var handler = hasSelection ? "onclick=\"onSelectedSymbolCheckChanged(".concat(i, ")\"") : "";
      var isSelected = i == globalSymbolDisplayed;
      var selected = isSelected ? "selected" : "";
      if (hasSelection && !globalMergeSession[i].isUnchecked) checkedCounter++;
      var checkbox = "<div class=\"squareCheckbox\">\n      <input type=\"checkbox\" ".concat(checked, " id=\"duplicatedSymbolCheck").concat(i, "\" ").concat(handler, "/>\n      <label ").concat(labelFor, "></label>\n      <span>").concat(mergeSession[i].symbolWithDuplicates.name, "</span>\n    </div>");
      inner += "<div id=\"duplicatedSymbol".concat(i, "\" onclick=\"onSelectedSymbolChanged(").concat(i, ")\" class=\"leftPanelListItem alignVerticalCenter ").concat(selected, "\">").concat(checkbox, " </div>");
    }

    window.postMessage("nativeLog", "WV - Drawing left panel symbol list");
    lstDuplicateSymbols.innerHTML = inner;
    btnMerge.disabled = checkedCounter == 0;
    document.getElementById('lblIncludeLibraries').innerHTML = checkedCounter != 0 ? "Include all enabled libraries symbols (you may lose the current selection)" : "Include all enabled libraries symbols";
    DrawSymbolList(globalSymbolDisplayed);
    ShowLayout();
  } else {
    HideLayout(true, false);
  }
};

window.ShowLayout = function (index) {
  window.postMessage("nativeLog", "WV - Show layout");
  document.getElementById('resultsPanel').className = "colAuto leftPanel";
  document.getElementById('btnCancel').className = "btnSecondary";
  document.getElementById('btnMerge').className = "btnPrimary";
  document.getElementById('chkLibraries').className = "roundCheckbox";
  document.getElementById('btnOK').className = "notDisplayed";
};

window.HideLayout = function (showEmptyState, showProgressCircle) {
  window.postMessage("nativeLog", "WV - Hide layout");
  if (showEmptyState) document.getElementById('emptyState').className = "emptyState fadeIn";

  if (showProgressCircle) {
    document.getElementById('progressCircle').className = "progressCircle offDownCenter fadeIn";
  }

  document.getElementById('resultsPanel').className = "colAuto leftPanel collapsed";
  document.getElementById('workZoneTitle').className = "colAvailable verticalLayout movingYFadeInitialState fadeOut";
  document.getElementById('contentList').className = "rowAvailable listOfStyles fadeOut";
  document.getElementById('btnCancel').className = "notDisplayed";
  document.getElementById('btnMerge').className = "notDisplayed";
  document.getElementById('chkLibraries').className = "notDisplayed";
  document.getElementById('btnOK').className = "btnPrimary";
};

window.onSelectedSymbolCheckChanged = function (index) {
  window.postMessage("nativeLog", "WV - Include symbol changed");
  globalMergeSession[index].isUnchecked = !globalMergeSession[index].isUnchecked;
  DrawDuplicateSymbols(globalMergeSession);
  DrawSymbolList(globalSymbolDisplayed);
};

window.onSelectedSymbolChanged = function (index) {
  window.postMessage("nativeLog", "WV - Left panel list selected symbol changed");

  if (!isLoadingSymbolData) {
    for (var i = 0; i < globalMergeSession.length; i++) {
      var otherDiv = document.getElementById("duplicatedSymbol" + i);
      otherDiv.className = "leftPanelListItem alignVerticalCenter";
    }

    var selectedDiv = document.getElementById("duplicatedSymbol" + index);
    selectedDiv.className = "leftPanelListItem alignVerticalCenter selected";

    if (!globalMergeSession[index].isProcessed) {
      isLoadingSymbolData = true;
      window.postMessage("GetSelectedSymbolData", index);
      document.getElementById('listOfSymbols').className = "movingYFadeInitialState workZone movingYFadeOut" + (globalView == 0 ? " cardsView" : "");
      document.getElementById('workZoneTitle').className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeOut";
      window.ShowProgress("");
    } else DrawSymbolList(index);
  }
};

window.ShowProgress = function (message) {
  window.postMessage("nativeLog", "WV - Show progress");
  document.getElementById('progressLayer').className = "progressCircle offDownCenter fadeIn";
  document.getElementById('loadingMessage').innerHTML = message;
  document.getElementById('listOfSymbols').className = "movingYFadeInitialState movingYFadeOut" + (globalView == 0 ? " cardsView" : "");
};

window.HideProgress = function () {
  window.postMessage("nativeLog", "WV - Hide progress");
  document.getElementById('progressLayer').className = "progressCircle offDownCenter fadeOut";
};

window.ReDrawAfterGettingData = function (symbolData, index) {
  window.postMessage("nativeLog", "WV - Redraw after getting symbol data");
  globalMergeSession[index].isProcessed = true;
  isLoadingSymbolData = false;

  for (var i = 0; i < globalMergeSession[index].symbolWithDuplicates.duplicates.length; i++) {
    globalMergeSession[index].symbolWithDuplicates.duplicates[i].thumbnail = symbolData.duplicates[i].thumbnail;
    globalMergeSession[index].symbolWithDuplicates.duplicates[i].symbolInstances = symbolData.duplicates[i].symbolInstances;
    globalMergeSession[index].symbolWithDuplicates.duplicates[i].numInstances = symbolData.duplicates[i].numInstances;
    globalMergeSession[index].symbolWithDuplicates.duplicates[i].symbolOverrides = symbolData.duplicates[i].symbolOverrides;
    globalMergeSession[index].symbolWithDuplicates.duplicates[i].numOverrides = symbolData.duplicates[i].numOverrides;
  }

  window.HideProgress(100);
  DrawSymbolList(index);
  document.getElementById('listOfSymbols').className = "movingYFadeInitialState workZone movingYFadeIn" + (globalView == 0 ? " cardsView" : "");
  document.getElementById('workZoneTitle').className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeIn";
};

window.ShowMergeProgress = function (progress) {
  HideLayout(false, true);
};

window.UpdateMergeProgress = function (progress, message, message2) {
  window.postMessage("nativeLog", "WV - Update progress: " + progress);
  document.getElementById('progressRing').setProgress(progress);
  document.getElementById('mergeloadingMessage').innerHTML = message;
  document.getElementById('mergeloadingMessage2').innerHTML = message2;
};

window.onSymbolClicked = function (index, selectedSymbol) {
  window.postMessage("nativeLog", "WV - Symbol clicked. Updating selection status.");

  for (var i = 0; i < globalMergeSession[selectedSymbol].symbolWithDuplicates.duplicates.length; i++) {
    var otherCheck = document.getElementById("duplicateItemCheck" + i);
    otherCheck.checked = false;
    var otherDiv = document.getElementById("duplicateItem" + i);
    otherDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter";
  }

  var selectedCheck = document.getElementById("duplicateItemCheck" + index);
  selectedCheck.checked = true;
  var selectedDiv = document.getElementById("duplicateItem" + index);
  selectedDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected";
  globalMergeSession[selectedSymbol].isUnchecked = false;
  globalMergeSession[selectedSymbol].selectedIndex = index;
  DrawDuplicateSymbols(globalMergeSession);
};

window.DrawSymbolList = function (index) {
  window.postMessage("nativeLog", "WV - Drawing symbols");
  globalSymbolDisplayed = index;
  var inner = "";

  for (var i = 0; i < globalMergeSession[index].symbolWithDuplicates.duplicates.length; i++) {
    window.postMessage("nativeLog", "WV --- Drawing symbol: " + globalMergeSession[index].symbolWithDuplicates.duplicates[i].name);
    var isSelected = globalMergeSession[index].selectedIndex == i;
    var selected = isSelected ? "selected" : "";
    var checked = isSelected ? "checked" : "";
    var checkbox = "<div class=\"colAuto roundCheckbox\">\n      <input type=\"checkbox\" ".concat(checked, " id=\"duplicateItemCheck").concat(i, "\"/>\n      <label></label>\n    </div>");
    inner += "<div id=\"duplicateItem".concat(i, "\" class=\"thumbnailContainer symbolPreview  alignVerticalCenter ").concat(selected, "\" onclick=\"onSymbolClicked(").concat(i, ", ").concat(index, ")\">\n                ").concat(checkbox, "\n                <div class=\"colAvailable verticalLayout thumbnailData\" id=\"duplicateItemThumbnail").concat(i, "\" >\n                  <div class=\"rowAvailable thumbnail\" style='background-image:url(\"data:image/png;base64,").concat(globalMergeSession[index].symbolWithDuplicates.duplicates[i].thumbnail, "\")'></div>\n                  <div class=\"rowAuto primaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(globalMergeSession[index].symbolWithDuplicates.duplicates[i].numInstances, " instances - Used in ").concat(globalMergeSession[index].symbolWithDuplicates.duplicates[i].numOverrides, " overrides</span></div>\n                  <div class=\"rowAuto secondaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(globalMergeSession[index].symbolWithDuplicates.duplicates[i].libraryName, "</span></div>\n                </div>\n              </div>");
  }

  var resultsTitle = document.getElementById("resultsTitle");
  var resultsDescription = document.getElementById("resultsDescription");
  resultsTitle.innerHTML = globalMergeSession[index].symbolWithDuplicates.name;
  resultsDescription.innerHTML = "There are " + globalMergeSession[index].symbolWithDuplicates.duplicates.length + " symbols with this name. Choose the one you want to keep and press OK. The other symbols will be removed, and all of their instances will be replaced by the one you chose to keep.";
  document.getElementById("viewSelector").classList.remove("notDisplayed");
  var listOfSymbols = document.getElementById('listOfSymbols');
  listOfSymbols.innerHTML = inner;
  listOfSymbols.className = "movingYFadeInitialState workZone movingYFadeIn" + (globalView == 0 ? " cardsView" : "");
  window.postMessage("nativeLog", "WV - Completed drawing symbols");
};

document.getElementById('chkIncludeLibraries').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Include libraries check changed");
  window.ShowProgress("");
  window.postMessage('RecalculateDuplicates', document.getElementById('chkIncludeLibraries').checked);
});

window.cancelAssignation = function () {
  window.postMessage('Cancel');
};

document.getElementById('btnCancel').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Cancel");
  cancelAssignation();
});
document.getElementById('btnMerge').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Execute merge");
  window.postMessage('ExecuteMerge', globalMergeSession);
});
document.getElementById('btnOK').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - OK-Close");
  cancelAssignation();
});
document.getElementById('btnCardView').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Changed to cards view");
  globalView = 0;
  document.getElementById('listOfSymbols').classList.add("cardsView");
  document.getElementById('btnListView').classList.remove("selected");
  document.getElementById('btnCardView').classList.add("selected");
});
document.getElementById('btnListView').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Change to list view");
  globalView = 1;
  document.getElementById('listOfSymbols').classList.remove("cardsView");
  document.getElementById('btnCardView').classList.remove("selected");
  document.getElementById('btnListView').classList.add("selected");
});

/***/ })

/******/ });
//# sourceMappingURL=resources_mergeduplicatesymbols.js.map