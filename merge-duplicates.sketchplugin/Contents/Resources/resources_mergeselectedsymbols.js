!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n;document.addEventListener("contextmenu",(function(e){e.preventDefault()}));var o=-1,i=0,a=1;window.LaunchMerge=function(e){i=e,"loading"==document.readyState?document.addEventListener("DOMContentLoaded",GetSymbols):GetSymbols()},window.GetSymbols=function(){setTimeout((function(){var e="We're loading thumbnails...";i>10&&(e="We're loading thumbnails...<br/><br/>Wop, you have "+i+" symbols here! 🙈<br/> This may take a while..."),window.ShowProgress(e),window.postMessage("GetSymbolData")}),200)},window.ShowProgress=function(e){document.getElementById("progressLayer").className="progressCircle offDownCenter fadeIn",document.getElementById("loadingMessage").innerHTML=e,document.getElementById("listOfSymbols").className="movingYFadeInitialState movingYFadeOut"+(0==a?" cardsView":"")},window.HideProgress=function(){document.getElementById("progressLayer").className="progressCircle offDownCenter fadeOut"},window.onSymbolClicked=function(e){for(var t=n[0],i=document.getElementById("btnMerge"),a=0;a<t.duplicates.length;a++){document.getElementById("duplicateItemCheck"+a).checked=!1,document.getElementById("duplicateItem"+a).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter",t.duplicates[a].isSelected=!1}document.getElementById("duplicateItemCheck"+e).checked=!0,document.getElementById("duplicateItem"+e).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected",i.disabled=!1,t.duplicates[e].isSelected=!0,o=e,DrawSymbolList(n)},window.DrawSymbolList=function(e){window.HideProgress();for(var t=(n=e)[0],o="",i=0;i<t.duplicates.length;i++){var l=t.duplicates[i].isSelected?"selected":"",c=t.duplicates[i].isSelected?"checked":"",s='<div class="colAuto roundCheckbox">\n      <input type="checkbox" '.concat(c,' id="duplicateItemCheck').concat(i,'"/>\n      <label></label>\n    </div>');o+='<div id="duplicateItem'.concat(i,'" class="thumbnailContainer symbolPreview alignVerticalCenter ').concat(l,'" onclick="onSymbolClicked(').concat(i,')">\n                ').concat(s,'\n                <div class="colAvailable verticalLayout thumbnailData" id="duplicateItemThumbnail').concat(i,'" >\n                  <div class="rowAvailable thumbnail" style=\'background-image:url("').concat(t.duplicates[i].thumbnail,'")\'></div>\n                  <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">').concat(t.duplicates[i].name," (").concat(t.duplicates[i].libraryName,')</span></div>\n                  <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">').concat(t.duplicates[i].numInstances," instances - Used in ").concat(t.duplicates[i].numOverrides," overrides</span></div>\n                </div>\n                </div>\n              </div>")}var d=document.getElementById("resultsTitle"),r=document.getElementById("resultsDescription");d.innerHTML="Merging selected symbols",r.innerHTML="You're about to merge this symbols. Choose the one you want to keep and press OK. The other symbols will be removed, and all of their instances will be replaced by the one you chose to keep.",document.getElementById("viewSelector").classList.remove("notDisplayed");var u=document.getElementById("listOfSymbols");u.innerHTML=o,u.className="scrollable movingYFadeInitialState workZone movingYFadeIn"+(0==a?" cardsView":"")},window.cancelAssignation=function(){window.postMessage("Cancel")},document.getElementById("btnCancel").addEventListener("click",(function(){cancelAssignation()})),document.getElementById("btnMerge").addEventListener("click",(function(){window.postMessage("ExecuteMerge",n,o)})),document.getElementById("btnCardView").addEventListener("click",(function(){a=0,document.getElementById("listOfSymbols").classList.add("cardsView"),document.getElementById("btnListView").classList.remove("selected"),document.getElementById("btnCardView").classList.add("selected")})),document.getElementById("btnListView").addEventListener("click",(function(){a=1,document.getElementById("listOfSymbols").classList.remove("cardsView"),document.getElementById("btnCardView").classList.remove("selected"),document.getElementById("btnListView").classList.add("selected")}))}]);