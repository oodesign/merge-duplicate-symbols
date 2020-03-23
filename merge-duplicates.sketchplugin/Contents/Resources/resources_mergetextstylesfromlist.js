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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/mergetextstylesfromlist.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/mergetextstylesfromlist.js":
/*!**********************************************!*\
  !*** ./resources/mergetextstylesfromlist.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
var globalTextStyles;
var globalGroupedTextStyles;
var mapping = [];

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
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
  };
};

window.BuildMapping = function () {
  mapping = [];
  Object.keys(globalGroupedTextStyles).forEach(function (key) {
    var groupOfStyles = globalGroupedTextStyles[key];

    for (var i = 0; i < groupOfStyles.length; i++) {
      mapping.push(globalTextStyles.indexOf(groupOfStyles[i]));
    }
  });
};

window.DrawStyleList = function (textStyles) {
  globalTextStyles = textStyles;
  var groupByLibraryName = groupBy('libraryName');
  var groupedTextStyles = groupByLibraryName(textStyles);
  groupedTextStyles = sortOnKeys(groupedTextStyles);
  globalGroupedTextStyles = groupedTextStyles;
  BuildMapping();
  var inner = "";
  var groupnum = 0;
  var stylenum = 0;
  Object.keys(groupedTextStyles).forEach(function (key) {
    var groupOfStyles = groupedTextStyles[key];
    inner += "<div id=\"groupStyleHeader".concat(groupnum, "\" class=\"rowAuto horizontalLayout groupHeader\" onClick=\"onExpanderClicked(").concat(groupnum, ")\">\n                <div class=\"colAvailable alignVerticalCenter\"><span class=\"\">").concat(key, "</span></div>\n                <div class=\"colAuto expanderIcon\">\n                  <svg width=\"24px\" height=\"24px\" viewBox=\"0 0 24 24\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                      <!-- Generator: Sketch 61.2 (89653) - https://sketch.com -->\n                      <title>Page 1</title>\n                      <desc>Created with Sketch.</desc>\n                      <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                          <g id=\"Artboard\">\n                              <path d=\"M17.3273272,9.26005993 C17.7359848,8.888553 18.3684331,8.91866959 18.7399401,9.32732721 C19.0828695,9.70454962 19.0835873,10.2724576 18.7602482,10.6497962 L18.6726728,10.7399401 L12.4999929,16.3514608 L6.32732721,10.7399401 C5.91866959,10.3684331 5.888553,9.73598482 6.26005993,9.32732721 C6.6029894,8.95010479 7.16825947,8.89542621 7.57461521,9.18144646 L7.67267279,9.26005993 L12.499,13.649 L17.3273272,9.26005993 Z\" id=\"Path\" fill=\"#979797\" fill-rule=\"nonzero\"></path>\n                          </g>\n                      </g>\n                  </svg>\n                </div>\n              </div>");
    inner += "<div id=\"groupStyleList".concat(groupnum, "\" class=\"rowAuto expanderContent\">");

    for (var i = 0; i < groupOfStyles.length; i++) {
      var checked = groupOfStyles[i].isSelected ? "checked" : "";
      var checkbox = "<div class=\"squareCheckbox\">\n        <input type=\"checkbox\" ".concat(checked, " id=\"chkTextStyleItem").concat(stylenum, "\"/>\n        <label></label>\n        <span>").concat(groupOfStyles[i].name, "</span>\n      </div>");
      inner += "<div id=\"textStyleItem".concat(stylenum, "\" onclick=\"onTextStyleItemChanged(").concat(stylenum, ")\" class=\"leftPanelListItem alignVerticalCenter\">").concat(checkbox, " </div>");
      stylenum++;
    }

    inner += "</div>";
    groupnum++;
  });
  var lstTextStyles = document.getElementById('lstTextStyles');
  lstTextStyles.innerHTML = inner;
  clearWorkzone();
};

window.onExpanderClicked = function (index) {
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

window.onTextStyleItemChanged = function (index) {
  var realIndex = mapping[index];
  globalTextStyles[realIndex].isSelected = !globalTextStyles[realIndex].isSelected;
  var selectedDiv = document.getElementById("textStyleItem" + index);
  var selectedCheck = document.getElementById("chkTextStyleItem" + index);
  var selected = globalTextStyles[realIndex].isSelected ? "selected" : "";
  selectedDiv.className = "leftPanelListItem alignVerticalCenter " + selected;
  selectedCheck.checked = globalTextStyles[realIndex].isSelected;

  for (var i = 0; i < globalTextStyles.length; i++) {
    globalTextStyles[i].isChosen = false;
  }

  DrawSelectedStylesList();
};

window.clearWorkzone = function () {
  document.getElementById('emptyState').className = "emptyState fadeIn";
  document.getElementById("workZoneTitle").className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeOut";
  listOfStyles.className = "scrollable movingYFadeInitialState workZone movingYFadeOut";
  document.getElementById('lblIncludeLibraries').innerHTML = "Include all enabled libraries styles";
};

window.onStyleClicked = function (index) {
  var realIndex = mapping[index];
  var stylenum = 0;
  Object.keys(globalGroupedTextStyles).forEach(function (key) {
    var groupOfStyles = globalGroupedTextStyles[key];

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
  globalTextStyles[realIndex].isChosen = true;
  var btnMerge = document.getElementById('btnMerge');
  btnMerge.disabled = false;
};

window.DrawSelectedStylesList = function () {
  var inner = "";
  var counter = 0;
  var stylenum = 0;
  Object.keys(globalGroupedTextStyles).forEach(function (key) {
    var groupOfStyles = globalGroupedTextStyles[key];

    for (var i = 0; i < groupOfStyles.length; i++) {
      if (groupOfStyles[i].isSelected) {
        var selected = groupOfStyles[i].isChosen ? "selected" : "";
        var checked = groupOfStyles[i].isChosen ? "checked" : "";
        var checkbox = "<div class=\"colAuto roundCheckbox\">\n                          <input type=\"checkbox\" ".concat(checked, " id=\"workZoneItemCheck").concat(stylenum, "\"/>\n                          <label></label>\n                        </div>");
        var contrastMode = groupOfStyles[i].contrastMode ? "bgContrastMode" : "";
        inner += "<div id=\"workZoneStyle".concat(stylenum, "\" class=\"thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ").concat(selected, "\" onclick=\"onStyleClicked(").concat(stylenum, ")\">\n                  ").concat(checkbox, "\n                  <div class=\"colAvailable verticalLayout thumbnailData\" id=\"workZoneStyleThumbnail").concat(stylenum, "\" >\n                    <div class=\"rowAvailable padded ").concat(contrastMode, "\"><div class=\"thumbnail\" style='background-image:url(\"").concat(groupOfStyles[i].thumbnail, "\")'></div></div>\n                    <div class=\"rowAuto primaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(groupOfStyles[i].name, " (").concat(groupOfStyles[i].libraryName, ")</span></div>\n                    <div class=\"rowAuto secondaryText displayFlex\"><span class=\"alignHorizontalCenter\">").concat(groupOfStyles[i].description, "</span></div>\n                  </div>\n                </div>");
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
  cancelAssignation();
});
document.getElementById('btnMerge').addEventListener("click", function () {
  window.postMessage('ExecuteMerge', globalTextStyles);
});
document.getElementById('chkIncludeLibraries').addEventListener("click", function () {
  var check = document.getElementById('chkIncludeLibraries');
  if (check.checked) window.postMessage('GetAllStylesList');else window.postMessage('GetLocalStylesList');
});

/***/ })

/******/ });
//# sourceMappingURL=resources_mergetextstylesfromlist.js.map