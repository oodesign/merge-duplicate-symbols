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
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/register.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/register.js":
/*!*******************************!*\
  !*** ./resources/register.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});
document.getElementById('btnGetPlugin').addEventListener('click', function () {
  window.postMessage('OpenPluginWeb');
});
document.getElementById('btnStartTrial').addEventListener('click', function () {
  window.postMessage('StartTrial');
});
document.getElementById('btnContinueTrial').addEventListener('click', function () {
  window.postMessage('ContinueTrial');
});
document.getElementById('btnLetsStart').addEventListener('click', function () {
  window.postMessage('LetsStart');
});
document.getElementById('btnLetsStartTrial').addEventListener('click', function () {
  window.postMessage('LetsStartTrial');
});
document.getElementById('btnNavRegistration').addEventListener('click', function () {
  document.getElementById('ctaForm').className = "yFadeOut";
  document.getElementById('registerForm').className = "yFadeIn";
  document.getElementById('inputLicense').focus();
});
document.getElementById('btnGoBack').addEventListener('click', function () {
  document.getElementById('registerForm').className = "";
  document.getElementById('ctaForm').className = "yFadeIn";
  document.getElementById('warningMessage').className = "rowAuto warningText";
});
document.getElementById('btnRegister').addEventListener('click', function () {
  document.getElementById('warningMessage').className = "rowAuto warningText";
  window.postMessage('RegisterKey', document.getElementById("inputLicense").value);
});

window.ShowRegistrationComplete = function () {
  document.getElementById('ctaForm').className = "yFadeOut";
  document.getElementById('registerForm').className = "yFadeOut";
  document.getElementById('confirmationForm').className = "yFadeIn";
};

window.ShowTrialStarted = function () {
  document.getElementById('ctaForm').className = "yFadeOut";
  document.getElementById('startTrialForm').className = "yFadeIn";
};

window.ShowRegistrationFail = function () {
  document.getElementById('warningMessage').className = "rowAuto warningText warningTextVisible";
};

window.cancelAssignation = function () {
  window.postMessage('Cancel');
};

window.SetTrialMode = function (remainingDays) {
  document.getElementById('registerMessage').innerHTML = "Merge Duplicates helps you remove duplicate symbols and styles.<br/>\n                                                        You still have <span class=\"primaryText\"><b>" + remainingDays + " days</b></span> to push it to the limit. Go merge everything! ";
  document.getElementById('btnStartTrial').className = "btnStartTrial notDisplayed";
  document.getElementById('btnContinueTrial').className = "btnStartTrial";
};

window.SetExpiredMode = function () {
  document.getElementById('registerMessage').innerHTML = "Looks like your trial expired. Maybe it's a good time to get it? ";
  document.getElementById('btnStartTrial').className = "btnStartTrial notDisplayed";
  document.getElementById('btnContinueTrial').className = "btnStartTrial notDisplayed";
};

window.SetOverMode = function () {
  document.getElementById('registerHeader').innerHTML = "All seats are busy \uD83D\uDE48!";
  document.getElementById('registerMessage').innerHTML = "Looks like this license has already been installed on as many devices as it was purchased for. Maybe it's a good time to get another one? <br/><br/>\n                                                          If you think this is a mistake please <a href=\"mailto:licensing@oodesign.me\">contact us</a>.";
  document.getElementById('btnStartTrial').className = "btnStartTrial notDisplayed";
  document.getElementById('btnContinueTrial').className = "btnStartTrial notDisplayed";
};

window.SetOverModeInReg = function () {
  // document.getElementById('warningMessage').innerHTML = `Looks like this license has already been installed on as many devices as it was purchased for. Maybe it's a good time to get another one? <br/><br/>
  //                                                         If you think this is a mistake please <a href="mailto:licensing@oodesign.me">contact us</a>.`;
  // document.getElementById('warningMessage').className = "rowAuto warningText warningTextVisible";
  document.getElementById('registerForm').className = "";
  document.getElementById('ctaForm').className = "yFadeIn";
  document.getElementById('warningMessage').className = "rowAuto warningText";
};

/***/ })

/******/ });
//# sourceMappingURL=resources_register.js.map