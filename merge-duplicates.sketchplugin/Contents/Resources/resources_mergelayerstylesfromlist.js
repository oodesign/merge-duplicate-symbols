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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/mergelayerstylesfromlist.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/mergelayerstylesfromlist.js":
/*!***********************************************!*\
  !*** ./resources/mergelayerstylesfromlist.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
var globalLayerStyles;
var globalGroupedLayerStyles;
var mapping = [];
var includeLibrariesSetting = false;

function sortOnKeys(dict) {
  var sorted = [];

  for (var key in dict) {
    sorted[sorted.length] = key;
  }

  sorted.sort();
  var tempDict = {};

  for (var i = 0; i < sorted.length; i++) {
    tempDict[sorted[i]] = dict[sorted[i]];
  }

  return tempDict;
}

var groupBy = function groupBy(key) {
  return function (array) {
    return array.reduce(function (objectsByKeyValue, obj) {
      var value = obj[key];
      refinedValue = value.indexOf("(Master") > 0 ? value.substring(0, value.indexOf("(Master")) : value;
      objectsByKeyValue[refinedValue] = (objectsByKeyValue[refinedValue] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  };
};

window.BuildMapping = function () {
  mapping = [];
  Object.keys(globalGroupedLayerStyles).forEach(function (key) {
    var groupOfStyles = globalGroupedLayerStyles[key];

    for (var i = 0; i < groupOfStyles.length; i++) {
      mapping.push(globalLayerStyles.indexOf(groupOfStyles[i]));
    }
  });
};

window.DrawStyleList = function (layerStyles, includeLibraries) {
  window.postMessage("nativeLog", "WV - Drawing styles grouped list");
  globalLayerStyles = layerStyles;
  includeLibrariesSetting = includeLibraries;
  if (includeLibraries != null) document.getElementById('chkIncludeLibraries').checked = includeLibrariesSetting;
  var groupByLibraryName = groupBy('libraryName');
  var groupedLayerStyles = groupByLibraryName(layerStyles);
  groupedLayerStyles = sortOnKeys(groupedLayerStyles);
  globalGroupedLayerStyles = groupedLayerStyles;
  window.postMessage("nativeLog", "WV - Grouped styles");
  BuildMapping();
  window.postMessage("nativeLog", "WV - Built mapping");
  var inner = "";
  var groupnum = 0;
  var stylenum = 0;
  Object.keys(groupedLayerStyles).forEach(function (key) {
    var groupOfStyles = groupedLayerStyles[key];
    inner += "<div id=\"groupStyleHeader".concat(groupnum, "\" class=\"rowAuto horizontalLayout groupHeader\" onClick=\"onExpanderClicked(").concat(groupnum, ")\">\n                <div class=\"colAvailable alignVerticalCenter\"><span class=\"\">").concat(key, "</span></div>\n                <div class=\"colAuto expanderIcon\">\n                  <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                      \n                      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                          <g id=\"Artboard\">\n                              <path d=\"M17.3273272,9.26005993 C17.7359848,8.888553 18.3684331,8.91866959 18.7399401,9.32732721 C19.0828695,9.70454962 19.0835873,10.2724576 18.7602482,10.6497962 L18.6726728,10.7399401 L12.4999929,16.3514608 L6.32732721,10.7399401 C5.91866959,10.3684331 5.888553,9.73598482 6.26005993,9.32732721 C6.6029894,8.95010479 7.16825947,8.89542621 7.57461521,9.18144646 L7.67267279,9.26005993 L12.499,13.649 L17.3273272,9.26005993 Z\" id=\"Path\" fill=\"#979797\" fill-rule=\"nonzero\"></path>\n                          </g>\n                      </g>\n                  </svg>\n                </div>\n              </div>");
    inner += "<div id=\"groupStyleList".concat(groupnum, "\" class=\"rowAuto expanderContent\">");

    for (var i = 0; i < groupOfStyles.length; i++) {
      var isHidden = groupOfStyles[i].isHidden ? "notDisplayed" : "";
      var checked = groupOfStyles[i].isSelected ? "checked" : "";
      var checkbox = "<div class=\"squareCheckbox\">\n        <input type=\"checkbox\" ".concat(checked, " id=\"chkLayerStyleItem").concat(stylenum, "\"/>\n        <label></label>\n        <span>").concat(groupOfStyles[i].name, "</span>\n      </div>");
      inner += "<div id=\"layerStyleItem".concat(stylenum, "\" onclick=\"onLayerStyleItemChanged(").concat(stylenum, ")\" class=\"leftPanelListItem alignVerticalCenter ").concat(isHidden, "\">").concat(checkbox, " </div>");
      stylenum++;
    }

    inner += "</div>";
    groupnum++;
  });
  window.postMessage("nativeLog", "WV - Drawing left panel style list");
  var lstLayerStyles = document.getElementById('lstLayerStyles');
  lstLayerStyles.innerHTML = inner;
  clearWorkzone();
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
  document.getElementById('resultsPanel').className = "colAuto leftPanel collapsed";
  document.getElementById('workZoneTitle').className = "colAvailable verticalLayout movingYFadeInitialState fadeOut";
  document.getElementById('contentList').className = "rowAvailable listOfStyles fadeOut";
  document.getElementById('btnCancel').className = "notDisplayed";
  document.getElementById('btnMerge').className = "notDisplayed";
  document.getElementById('chkLibraries').className = "notDisplayed";
};

window.onExpanderClicked = function (index) {
  window.postMessage("nativeLog", "WV - Expanding " + index);
  var groupStyleHeader = document.getElementById("groupStyleHeader" + index);
  var groupStyleList = document.getElementById("groupStyleList" + index);

  if (groupStyleHeader.className.toString().indexOf("collapsed") >= 0) {
    groupStyleHeader.className = "rowAuto horizontalLayout groupHeader";
    groupStyleList.className = "rowAuto expanderContent";
  } else {
    groupStyleHeader.className = "rowAuto horizontalLayout groupHeader collapsed";
    groupStyleList.className = "rowAuto expanderContent notDisplayed";
  }
};

window.onLayerStyleItemChanged = function (index) {
  window.postMessage("nativeLog", "WV - Layer style item changed");
  var realIndex = mapping[index];
  globalLayerStyles[realIndex].isSelected = !globalLayerStyles[realIndex].isSelected;
  var selectedDiv = document.getElementById("layerStyleItem" + index);
  var selectedCheck = document.getElementById("chkLayerStyleItem" + index);
  var selected = globalLayerStyles[realIndex].isSelected ? "selected" : "";
  selectedDiv.className = "leftPanelListItem alignVerticalCenter " + selected;
  selectedCheck.checked = globalLayerStyles[realIndex].isSelected;

  for (var i = 0; i < globalLayerStyles.length; i++) {
    globalLayerStyles[i].isChosen = false;
  }

  DrawSelectedStylesList();
};

window.clearWorkzone = function () {
  window.postMessage("nativeLog", "WV - Clear workzone");
  document.getElementById('emptyState').className = "emptyState fadeIn";
  document.getElementById("workZoneTitle").className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeOut";
  listOfStyles.className = "scrollable movingYFadeInitialState workZone movingYFadeOut";
  document.getElementById('lblIncludeLibraries').innerHTML = "Include all enabled libraries styles";
};

window.onStyleClicked = function (index) {
  window.postMessage("nativeLog", "WV - Layer style changed");
  var realIndex = mapping[index];
  var stylenum = 0;
  Object.keys(globalGroupedLayerStyles).forEach(function (key) {
    var groupOfStyles = globalGroupedLayerStyles[key];

    for (var i = 0; i < groupOfStyles.length; i++) {
      if (groupOfStyles[i].isSelected) {
        var otherCheck = document.getElementById("workZoneItemCheck" + stylenum);
        var otherStyle = document.getElementById("workZoneStyle" + stylenum);
        otherCheck.checked = false;
        otherStyle.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter";
      }

      groupOfStyles[i].isChosen = false;
      stylenum++;
    }
  });
  var selectedCheck = document.getElementById("workZoneItemCheck" + index);
  var selectedStyle = document.getElementById("workZoneStyle" + index);
  selectedCheck.checked = true;
  selectedStyle.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected";
  globalLayerStyles[realIndex].isChosen = true;
  var btnMerge = document.getElementById('btnMerge');
  btnMerge.disabled = false;
};

window.DrawSelectedStylesList = function () {
  window.postMessage("nativeLog", "WV - Draw layer styles");
  var inner = "";
  var counter = 0;
  var stylenum = 0;
  Object.keys(globalGroupedLayerStyles).forEach(function (key) {
    var groupOfStyles = globalGroupedLayerStyles[key];

    for (var i = 0; i < groupOfStyles.length; i++) {
      if (groupOfStyles[i].isSelected) {
        var selected = groupOfStyles[i].isChosen ? "selected" : "";
        var checked = groupOfStyles[i].isChosen ? "checked" : "";
        var checkbox = "<div class=\"colAuto roundCheckbox\">\n                          <input type=\"checkbox\" ".concat(checked, " id=\"workZoneItemCheck").concat(stylenum, "\"/>\n                          <label></label>\n                        </div>");
        var contrastMode = groupOfStyles[i].contrastMode ? "bgContrastMode" : "";
        inner += "<div id=\"workZoneStyle".concat(stylenum, "\" class=\"thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ").concat(selected, "\" onclick=\"onStyleClicked(").concat(stylenum, ")\">\n                  ").concat(checkbox, "\n                  <div class=\"colAvailable verticalLayout thumbnailData\" id=\"workZoneStyleThumbnail").concat(stylenum, "\" >\n                    <div class=\"rowAvailable padded ").concat(contrastMode, "\"><div class=\"thumbnail\" style='background-image:url(\"data:image/png;base64,").concat(groupOfStyles[i].thumbnail, "\")'></div></div>\n                    <div class=\"rowAuto primaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(groupOfStyles[i].name, " (").concat(groupOfStyles[i].libraryName, ")</span></div>\n                    <div class=\"rowAuto secondaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(groupOfStyles[i].description, "</span></div>\n                  </div>\n                </div>");
        counter++;
      }

      stylenum++;
    }
  });
  var listOfStyles = document.getElementById('listOfStyles');
  var workZoneTitle = document.getElementById("workZoneTitle");

  if (counter > 0) {
    document.getElementById('emptyState').className = "emptyState fadeOut";
    workZoneTitle.className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeIn";
    listOfStyles.innerHTML = inner;
    listOfStyles.className = "scrollable movingYFadeInitialState workZone movingYFadeIn";
    document.getElementById('lblIncludeLibraries').innerHTML = "Include all enabled libraries styles (you may lose the current selection)";
  } else {
    clearWorkzone();
  }
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
  window.postMessage('ExecuteMerge', globalLayerStyles);
});
document.getElementById('chkIncludeLibraries').addEventListener("click", function () {
  window.postMessage("nativeLog", "WV - Include libraries check changed");
  var check = document.getElementById('chkIncludeLibraries');
  window.postMessage('GetStylesList', check.checked);
});

/***/ })

/******/ });
//# sourceMappingURL=resources_mergelayerstylesfromlist.js.map