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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/mergeduplicatelayerstyles.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/mergeduplicatelayerstyles.js":
/*!************************************************!*\
  !*** ./resources/mergeduplicatelayerstyles.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
var globalMergeSession;
var globalStyleDisplayed = 0;
var isLoadingStyleData = false;
var includeLibrariesSetting = false;

window.DrawStylesList = function (mergeSession, includeLibraries) {
  window.postMessage("nativeLog", "WV - Drawing duplicate styles list");
  globalMergeSession = mergeSession;
  includeLibrariesSetting = includeLibraries;
  if (includeLibraries != null) document.getElementById('chkIncludeLibraries').checked = includeLibrariesSetting;
  if (globalStyleDisplayed >= globalMergeSession.length) globalStyleDisplayed = 0;
  var lstDuplicateStyles = document.getElementById('lstDuplicateStyles');
  var btnMerge = document.getElementById('btnMerge');
  var inner = "";
  var checkedCounter = 0;

  for (var i = 0; i < globalMergeSession.length; i++) {
    var hasSelection = globalMergeSession[i].selectedIndex >= 0;
    var labelFor = hasSelection ? "for=\"duplicatedStyleCheck".concat(i, "\"") : "";
    var checked = hasSelection && !globalMergeSession[i].isUnchecked ? "checked" : "";
    var handler = hasSelection ? "onclick=\"onSelectedStyleCheckChanged(".concat(i, ")\"") : "";
    var isSelected = i == globalStyleDisplayed;
    var selected = isSelected ? "selected" : "";
    if (hasSelection && !globalMergeSession[i].isUnchecked) checkedCounter++;
    var checkbox = "<div class=\"squareCheckbox\">\n      <input type=\"checkbox\" ".concat(checked, " id=\"duplicatedStyleCheck").concat(i, "\" ").concat(handler, "/>\n      <label ").concat(labelFor, "></label>\n      <span>").concat(mergeSession[i].layerStyleWithDuplicates.name, "</span>\n    </div>");
    inner += "<div id=\"duplicatedStyle".concat(i, "\" onclick=\"onSelectedStyleChanged(").concat(i, ")\" class=\"leftPanelListItem alignVerticalCenter ").concat(selected, "\">").concat(checkbox, " </div>");
  }

  window.postMessage("nativeLog", "WV - Drawing left panel style list");
  lstDuplicateStyles.innerHTML = inner;
  btnMerge.disabled = checkedCounter == 0;
  document.getElementById('lblIncludeLibraries').innerHTML = checkedCounter != 0 ? "Include all enabled libraries layer styles (you may lose the current selection)" : "Include all enabled libraries layer styles";
  DrawStyleList(globalStyleDisplayed);
};

window.onSelectedStyleCheckChanged = function (index) {
  window.postMessage("nativeLog", "WV - Include style changed");
  globalMergeSession[index].isUnchecked = !globalMergeSession[index].isUnchecked;
  DrawStylesList(globalMergeSession);
  DrawStyleList(globalStyleDisplayed);
};

window.onSelectedStyleChanged = function (index) {
  window.postMessage("nativeLog", "WV - Left panel list selected style changed");

  if (!isLoadingStyleData) {
    for (var i = 0; i < globalMergeSession.length; i++) {
      var otherDiv = document.getElementById("duplicatedStyle" + i);
      otherDiv.className = "leftPanelListItem alignVerticalCenter";
    }

    var selectedDiv = document.getElementById("duplicatedStyle" + index);
    selectedDiv.className = "leftPanelListItem alignVerticalCenter selected";

    if (!globalMergeSession[index].isProcessed) {
      isLoadingStyleData = true;
      window.postMessage("GetSelectedStyleData", index);
      document.getElementById('listOfStyles').className = "movingYFadeInitialState workZone movingYFadeOut";
      document.getElementById('workZoneTitle').className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeOut";
      window.ShowProgress("");
    } else DrawStyleList(index);
  }
};

window.ShowProgress = function (message) {
  window.postMessage("nativeLog", "WV - Show progress");
  document.getElementById('progressLayer').className = "progressCircle offDownCenter fadeIn";
  document.getElementById('loadingMessage').innerHTML = message;
  document.getElementById('listOfStyles').className = "movingYFadeInitialState movingYFadeOut";
};

window.HideProgress = function () {
  window.postMessage("nativeLog", "WV - Hide progress");
  document.getElementById('progressLayer').className = "progressCircle offDownCenter fadeOut";
};

window.ReDrawAfterGettingData = function (symbolData, index) {
  window.postMessage("nativeLog", "WV - Redraw after getting style data");
  globalMergeSession[index].isProcessed = true;
  isLoadingStyleData = false;

  for (var i = 0; i < globalMergeSession[index].layerStyleWithDuplicates.duplicates.length; i++) {
    globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].thumbnail = symbolData.duplicates[i].thumbnail;
  }

  window.HideProgress(100);
  DrawStyleList(index);
  document.getElementById('listOfStyles').className = "movingYFadeInitialState workZone movingYFadeIn";
  document.getElementById('workZoneTitle').className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeIn";
};

window.onStyleClicked = function (index, selectedStyle) {
  window.postMessage("nativeLog", "WV - Style clicked. Updating selection status.");

  for (var i = 0; i < globalMergeSession[selectedStyle].layerStyleWithDuplicates.duplicates.length; i++) {
    var otherCheck = document.getElementById("duplicateItemCheck" + i);
    otherCheck.checked = false;
    var otherDiv = document.getElementById("duplicateItem" + i);
    otherDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter";
  }

  var selectedCheck = document.getElementById("duplicateItemCheck" + index);
  selectedCheck.checked = true;
  var selectedDiv = document.getElementById("duplicateItem" + index);
  selectedDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected";
  globalMergeSession[selectedStyle].isUnchecked = false;
  globalMergeSession[selectedStyle].selectedIndex = index;
  DrawStylesList(globalMergeSession);
};

window.DrawStyleList = function (index) {
  window.postMessage("nativeLog", "WV - Drawing styles");
  globalStyleDisplayed = index;
  var inner = "";

  for (var i = 0; i < globalMergeSession[index].layerStyleWithDuplicates.duplicates.length; i++) {
    window.postMessage("nativeLog", "WV --- Drawing style: " + globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].name);
    var isSelected = globalMergeSession[index].selectedIndex == i;
    var selected = isSelected ? "selected" : "";
    var checked = isSelected ? "checked" : "";
    var checkbox = "<div class=\"colAuto roundCheckbox\">\n      <input type=\"checkbox\" ".concat(checked, " id=\"duplicateItemCheck").concat(i, "\"/>\n      <label></label>\n    </div>");
    var contrastMode = globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].contrastMode ? "bgContrastMode" : "";

    if (!globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].isHidden) {
      inner += "<div id=\"duplicateItem".concat(i, "\" class=\"thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ").concat(selected, "\" onclick=\"onStyleClicked(").concat(i, ", ").concat(index, ")\">\n                ").concat(checkbox, "\n                <div class=\"colAvailable verticalLayout thumbnailData\" id=\"duplicateItemThumbnail").concat(i, "\" >\n                  <div class=\"rowAvailable padded ").concat(contrastMode, "\"><div class=\"thumbnail\" style='background-image:url(\"data:image/png;base64,").concat(globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].thumbnail, "\")'></div></div>\n                  <div class=\"rowAuto primaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].name, " (").concat(globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].libraryName, ")</span></div>\n                  <div class=\"rowAuto secondaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].description, "</span></div>\n                  <div class=\"rowAuto secondaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].numInstances, " instances - Used in ").concat(globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].numOverrides, " overrides</span></div>\n                  <div class=\"rowAuto secondaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].id, "</span></div>\n                  <div class=\"rowAuto secondaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].isHidden, "</span></div>\n                </div>\n              </div>");
    }
  }

  var resultsTitle = document.getElementById("resultsTitle");
  var resultsDescription = document.getElementById("resultsDescription");
  resultsTitle.innerHTML = globalMergeSession[index].layerStyleWithDuplicates.name;
  resultsDescription.innerHTML = "There are " + globalMergeSession[index].layerStyleWithDuplicates.duplicates.filter(function (el) {
    return !el.isHidden;
  }).length + " styles with this name. The style you decide to keep will be applied to all layers & overrides using any of the discarded styles, and the discarded styles will be removed from the local file.";
  var listOfStyles = document.getElementById('listOfStyles');
  listOfStyles.innerHTML = inner;
  listOfStyles.className = "movingYFadeInitialState workZone movingYFadeIn";
  window.postMessage("nativeLog", "WV - Completed drawing styles");
};

window.cancelAssignation = function () {
  window.postMessage('Cancel');
};

document.getElementById('chkIncludeLibraries').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Include libraries changed");
  window.postMessage('RecalculateDuplicates', document.getElementById('chkIncludeLibraries').checked);
});
document.getElementById('btnCancel').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Cancel");
  cancelAssignation();
});
document.getElementById('btnMerge').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Execute merge");
  window.postMessage('ExecuteMerge', globalMergeSession);
});

/***/ })

/******/ });
//# sourceMappingURL=resources_mergeduplicatelayerstyles.js.map