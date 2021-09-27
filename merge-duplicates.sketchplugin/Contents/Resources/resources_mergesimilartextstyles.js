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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/mergesimilartextstyles.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/mergesimilartextstyles.js":
/*!*********************************************!*\
  !*** ./resources/mergesimilartextstyles.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
var globalStylesWithSimilarStyles;
var globalStyleDisplayed = 0;
var globalFiltersAppliedNum = 2;

window.UpdateSettings = function (includeLibraries) {
  if (includeLibraries != null) document.getElementById('chkIncludeLibraries').checked = includeLibraries;
};

window.DrawResultsList = function (stylesWithSimilarStyles) {
  window.postMessage("nativeLog", "WV - Drawing results list");
  globalStylesWithSimilarStyles = stylesWithSimilarStyles;

  if (globalFiltersAppliedNum > 0) {
    document.getElementById('filtersAppliedNum').innerHTML = globalFiltersAppliedNum;
    document.getElementById('filterCounter').className = "filterCounter";
  } else document.getElementById('filterCounter').className = "notDisplayed";

  if (globalStylesWithSimilarStyles.length > 0) {
    var lstResultingStyles = document.getElementById('lstResultingStyles');
    var btnMerge = document.getElementById('btnMerge');
    var inner = "";
    var checkedCounter = 0;

    for (var i = 0; i < globalStylesWithSimilarStyles.length; i++) {
      var hasSelection = globalStylesWithSimilarStyles[i].selectedIndex >= 0;
      var labelFor = hasSelection ? "for=\"resultStyleCheck".concat(i, "\"") : "";
      var checked = hasSelection && !globalStylesWithSimilarStyles[i].isUnchecked ? "checked" : "";
      var handler = hasSelection ? "onclick=\"onSelectedStyleCheckChanged(".concat(i, ")\"") : "";
      var isSelected = i == globalStyleDisplayed;
      var selected = isSelected ? "selected" : "";
      if (hasSelection && !globalStylesWithSimilarStyles[i].isUnchecked) checkedCounter++;
      var checkbox = "<div class=\"squareCheckbox\">\n      <input type=\"checkbox\" ".concat(checked, " id=\"resultStyleCheck").concat(i, "\" ").concat(handler, "/>\n      <label ").concat(labelFor, "></label>\n      <div class=\"text\">").concat(globalStylesWithSimilarStyles[i].referenceStyle.name, "</div>\n    </div>");
      inner += "<div id=\"resultStyle".concat(i, "\" onclick=\"onSelectedStyleChanged(").concat(i, ")\" class=\"leftPanelListItem alignVerticalCenter ").concat(selected, "\">").concat(checkbox, " </div>");
    }

    document.getElementById('resultsPanel').className = "colAuto leftPanel";
    window.postMessage("nativeLog", "WV - Drawing left panel style list");
    lstResultingStyles.innerHTML = inner;
    btnMerge.disabled = checkedCounter == 0;
    document.getElementById('lblIncludeLibraries').innerHTML = checkedCounter != 0 ? "Include all enabled libraries text styles (you may lose the current selection)" : "Include all enabled libraries text styles";
    DrawStyleList(globalStyleDisplayed);
  } else {
    window.postMessage("nativeLog", "WV - No similar styles. Drawing empty state.");
    document.getElementById('resultsPanel').className = "colAuto leftPanel collapsed";
    document.getElementById('listOfStyles').className = "scrollable movingYFadeInitialState workZone movingYFadeOut";
    document.getElementById("workZoneTitle").className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeOut";
    document.getElementById('emptyStateMessage').innerHTML = "We couldn't find any styles that share the selected set of attributes.";
    document.getElementById('emptyState').className = "emptyState fadeIn";
    document.getElementById("resultsTitle").innerHTML = "";
    document.getElementById("resultsDescription").innerHTML = "";
  }
};

window.ShowMergeProgress = function (progress) {
  HideLayout();
  document.getElementById('progressCircle').className = "progressCircle offDownCenter fadeIn";
};

window.UpdateMergeProgress = function (progress, message, message2) {
  document.getElementById('progressRing').setProgress(progress);
  document.getElementById('mergeloadingMessage').innerHTML = message;
  document.getElementById('mergeloadingMessage2').innerHTML = message2;
};

window.HideLayout = function () {
  //window.postMessage("nativeLog", "WV - Hide layout");
  document.getElementById('filterArea').className = "colAuto filterArea verticalLayout hidden";
  document.getElementById('resultsPanel').className = "colAuto leftPanel collapsed";
  document.getElementById('workZoneTitle').className = "colAvailable verticalLayout movingYFadeInitialState fadeOut";
  document.getElementById('contentList').className = "rowAvailable listOfStyles fadeOut";
  document.getElementById('btnCancel').className = "notDisplayed";
  document.getElementById('btnMerge').className = "notDisplayed";
  document.getElementById('chkLibraries').className = "notDisplayed";
};

window.onSelectedStyleCheckChanged = function (index) {
  window.postMessage("nativeLog", "WV - Include style changed");
  globalStylesWithSimilarStyles[index].isUnchecked = !globalStylesWithSimilarStyles[index].isUnchecked;
  DrawStylesList(globalStylesWithSimilarStyles);
  DrawStyleList(globalStyleDisplayed);
};

window.onSelectedStyleChanged = function (index) {
  window.postMessage("nativeLog", "WV - Left panel list selected style changed.");

  for (var i = 0; i < globalStylesWithSimilarStyles.length; i++) {
    var otherDiv = document.getElementById("resultStyle" + i);
    otherDiv.className = "leftPanelListItem alignVerticalCenter";
  }

  var selectedDiv = document.getElementById("resultStyle" + index);
  selectedDiv.className = "leftPanelListItem alignVerticalCenter selected";
  DrawStyleList(index);
};

window.onStyleClicked = function (index, selectedStyle) {
  window.postMessage("nativeLog", "WV - Style clicked. Updating selection status.");

  for (var i = 0; i < globalStylesWithSimilarStyles[selectedStyle].similarStyles.length; i++) {
    var otherCheck = document.getElementById("duplicateItemCheck" + i);
    otherCheck.checked = false;
    var otherDiv = document.getElementById("duplicateItem" + i);
    otherDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter";
  }

  var selectedCheck = document.getElementById("duplicateItemCheck" + index);
  selectedCheck.checked = true;
  var selectedDiv = document.getElementById("duplicateItem" + index);
  selectedDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected";
  globalStylesWithSimilarStyles[selectedStyle].selectedIndex = index;
  DrawResultsList(globalStylesWithSimilarStyles);
};

window.DrawStyleList = function (index) {
  window.postMessage("nativeLog", "WV - Drawing styles");
  globalStyleDisplayed = index;
  var inner = "";

  for (var i = 0; i < globalStylesWithSimilarStyles[index].similarStyles.length; i++) {
    window.postMessage("nativeLog", "WV --- Drawing style: " + globalStylesWithSimilarStyles[index].similarStyles[i].name);
    var isSelected = globalStylesWithSimilarStyles[index].selectedIndex == i;
    var selected = isSelected ? "selected" : "";
    var checked = isSelected ? "checked" : "";
    var checkbox = "<div class=\"colAuto roundCheckbox\">\n      <input type=\"checkbox\" ".concat(checked, " id=\"duplicateItemCheck").concat(i, "\"/>\n      <label></label>\n    </div>");
    var contrastMode = globalStylesWithSimilarStyles[index].similarStyles[i].contrastMode ? "bgContrastMode" : "";
    inner += "<div id=\"duplicateItem".concat(i, "\" class=\"thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ").concat(selected, "\" onclick=\"onStyleClicked(").concat(i, ", ").concat(index, ")\">\n                ").concat(checkbox, "\n                <div class=\"colAvailable verticalLayout thumbnailData\" id=\"duplicateItemThumbnail").concat(i, "\" >\n                  <div class=\"rowAvailable padded ").concat(contrastMode, "\"><div class=\"thumbnail\" style='background-image:url(\"data:image/png;base64,").concat(globalStylesWithSimilarStyles[index].similarStyles[i].thumbnail, "\")'></div></div>\n                  <div class=\"rowAuto primaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(globalStylesWithSimilarStyles[index].similarStyles[i].name, " (").concat(globalStylesWithSimilarStyles[index].similarStyles[i].libraryName, ")</span></div>\n                  <div class=\"rowAuto secondaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(globalStylesWithSimilarStyles[index].similarStyles[i].description, "</span></div>\n                </div>\n              </div>");
  }

  var resultsTitle = document.getElementById("resultsTitle");
  var resultsDescription = document.getElementById("resultsDescription");
  resultsTitle.innerHTML = globalStylesWithSimilarStyles[index].referenceStyle.name;
  resultsDescription.innerHTML = "There are " + globalStylesWithSimilarStyles[index].similarStyles.length + " styles with this same attributes. The style you decide to keep will be applied to all text layers & overrides using any of the discarded styles, and the discarded styles will be removed from the local file.";
  document.getElementById('emptyState').className = "emptyState fadeOut";
  document.getElementById('listOfStyles').innerHTML = inner;
  document.getElementById("workZoneTitle").className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeIn";
  listOfStyles.className = "scrollable movingYFadeInitialState workZone movingYFadeIn";
  window.postMessage("nativeLog", "WV - Completed drawing styles");
};

window.cancelAssignation = function () {
  window.postMessage('Cancel');
};

document.getElementById('btnCancel').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Cancel");
  cancelAssignation();
});
document.getElementById('btnMerge').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Execute merge");
  window.postMessage('ExecuteMerge', globalStylesWithSimilarStyles);
});
document.getElementById('filterHeader').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Show/hide filters");
  onFilterExpanderClicked();
});
document.getElementById('chkIncludeLibraries').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Include libraries check changed");
  onFilterChanged();
});
document.getElementById('btnFindMatchingStyles').addEventListener("click", function () {
  onFilterChanged();
});
document.getElementById('btnEmptyState').addEventListener("click", function () {
  onFilterChanged();
});

window.onFilterChanged = function () {
  window.postMessage("nativeLog", "WV - Find matching styles");
  var includeAllLibraries = document.getElementById('chkIncludeLibraries').checked;
  var checkSameFont = document.getElementById('checkSameFont').checked;
  var checkSameWeight = document.getElementById('checkSameWeight').checked;
  var checkSameSize = document.getElementById('checkSameSize').checked;
  var checkSameColor = document.getElementById('checkSameColor').checked;
  var checkSameParagraphSpacing = document.getElementById('checkSameParagraphSpacing').checked;
  var checkSameLineHeight = document.getElementById('checkSameLineHeight').checked;
  var checkSameAlignment = document.getElementById('checkSameAlignment').checked;
  var checkSameCharacterSpacing = document.getElementById('checkSameCharacterSpacing').checked;
  window.postMessage("RecalculateStyles", includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);
  globalFiltersAppliedNum = 0;
  globalFiltersAppliedNum += checkSameFont ? 1 : 0;
  globalFiltersAppliedNum += checkSameWeight ? 1 : 0;
  globalFiltersAppliedNum += checkSameSize ? 1 : 0;
  globalFiltersAppliedNum += checkSameColor ? 1 : 0;
  globalFiltersAppliedNum += checkSameParagraphSpacing ? 1 : 0;
  globalFiltersAppliedNum += checkSameLineHeight ? 1 : 0;
  globalFiltersAppliedNum += checkSameAlignment ? 1 : 0;
  globalFiltersAppliedNum += checkSameCharacterSpacing ? 1 : 0;
};

window.onFilterExpanderClicked = function () {
  var filterArea = document.getElementById("filterArea");

  if (filterArea.className.toString().indexOf("collapsed") >= 0) {
    filterArea.className = "colAuto filterArea verticalLayout";
  } else {
    filterArea.className = "colAuto filterArea verticalLayout collapsed";
  }
};

/***/ })

/******/ });
//# sourceMappingURL=resources_mergesimilartextstyles.js.map