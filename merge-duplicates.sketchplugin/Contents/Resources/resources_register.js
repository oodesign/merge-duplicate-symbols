!function(e){var t={};function n(a){if(t[a])return t[a].exports;var o=t[a]={i:a,l:!1,exports:{}};return e[a].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(a,o,function(t){return e[t]}.bind(null,o));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){document.addEventListener("contextmenu",(function(e){e.preventDefault()})),document.getElementById("btnGetPlugin").addEventListener("click",(function(){window.postMessage("OpenPluginWeb")})),document.getElementById("btnStartTrial").addEventListener("click",(function(){window.postMessage("StartTrial")})),document.getElementById("btnContinueTrial").addEventListener("click",(function(){window.postMessage("ContinueTrial")})),document.getElementById("btnLetsStart").addEventListener("click",(function(){window.postMessage("LetsStart")})),document.getElementById("btnLetsStartTrial").addEventListener("click",(function(){window.postMessage("LetsStartTrial")})),document.getElementById("btnNavRegistration").addEventListener("click",(function(){document.getElementById("ctaForm").className="yFadeOut",document.getElementById("registerForm").className="yFadeIn",document.getElementById("inputLicense").focus()})),document.getElementById("btnGoBack").addEventListener("click",(function(){document.getElementById("registerForm").className="",document.getElementById("ctaForm").className="yFadeIn",document.getElementById("warningMessage").className="rowAuto warningText"})),document.getElementById("btnRegister").addEventListener("click",(function(){document.getElementById("warningMessage").className="rowAuto warningText",window.postMessage("RegisterKey",document.getElementById("inputLicense").value)})),window.ShowRegistrationComplete=function(){document.getElementById("ctaForm").className="yFadeOut",document.getElementById("registerForm").className="yFadeOut",document.getElementById("confirmationForm").className="yFadeIn"},window.ShowTrialStarted=function(){document.getElementById("ctaForm").className="yFadeOut",document.getElementById("startTrialForm").className="yFadeIn"},window.ShowRegistrationFail=function(){document.getElementById("warningMessage").className="rowAuto warningText warningTextVisible"},window.cancelAssignation=function(){window.postMessage("Cancel")},window.SetTrialMode=function(e){document.getElementById("registerMessage").innerHTML='Merge Duplicates helps you remove duplicate symbols and styles.<br/>\n                                                        You still have <span class="primaryText"><b>'+e+" days</b></span> to push it to the limit. Go merge everything! ",document.getElementById("btnStartTrial").className="btnStartTrial notDisplayed",document.getElementById("btnContinueTrial").className="btnStartTrial"},window.SetExpiredMode=function(){document.getElementById("registerMessage").innerHTML="Looks like your trial expired. Maybe it's a good time to get it? ",document.getElementById("btnStartTrial").className="btnStartTrial notDisplayed",document.getElementById("btnContinueTrial").className="btnStartTrial notDisplayed"},window.SetOverMode=function(){document.getElementById("registerHeader").innerHTML="All seats are busy 🙈!",document.getElementById("registerMessage").innerHTML='Looks like this license has already been installed on as many devices as it was purchased for. Maybe it\'s a good time to get another one? <br/><br/>\n                                                          If you think this is a mistake please <a href="mailto:licensing@oodesign.me">contact us</a>.',document.getElementById("btnStartTrial").className="btnStartTrial notDisplayed",document.getElementById("btnContinueTrial").className="btnStartTrial notDisplayed"},window.SetOverModeInReg=function(){document.getElementById("registerForm").className="",document.getElementById("ctaForm").className="yFadeIn",document.getElementById("warningMessage").className="rowAuto warningText"}}]);