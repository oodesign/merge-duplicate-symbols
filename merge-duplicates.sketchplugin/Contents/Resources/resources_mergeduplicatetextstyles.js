!function(e){var t={};function n(l){if(t[l])return t[l].exports;var a=t[l]={i:l,l:!1,exports:{}};return e[l].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(l,a,function(t){return e[t]}.bind(null,a));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n;document.addEventListener("contextmenu",(function(e){e.preventDefault()}));var l=0,a=!1;window.DrawStylesList=function(e){l>=(n=e).length&&(l=0);for(var t=document.getElementById("lstDuplicateStyles"),a=document.getElementById("btnMerge"),i="",c=0,o=0;o<n.length;o++){var d=n[o].selectedIndex>=0,s=d?'for="duplicatedStyleCheck'.concat(o,'"'):"",r=d&&!n[o].isUnchecked?"checked":"",u=d?'onclick="onSelectedStyleCheckChanged('.concat(o,')"'):"",m=o==l?"selected":"";d&&!n[o].isUnchecked&&c++;var y='<div class="squareCheckbox">\n      <input type="checkbox" '.concat(r,' id="duplicatedStyleCheck').concat(o,'" ').concat(u,"/>\n      <label ").concat(s,"></label>\n      <span>").concat(e[o].textStyleWithDuplicates.name,"</span>\n    </div>");i+='<div id="duplicatedStyle'.concat(o,'" onclick="onSelectedStyleChanged(').concat(o,')" class="leftPanelListItem alignVerticalCenter ').concat(m,'">').concat(y," </div>")}t.innerHTML=i,a.disabled=0==c,document.getElementById("lblIncludeLibraries").innerHTML=0!=c?"Include all enabled libraries text styles (you may lose the current selection)":"Include all enabled libraries text styles",DrawStyleList(l)},window.onSelectedStyleCheckChanged=function(e){n[e].isUnchecked=!n[e].isUnchecked,DrawStylesList(n),DrawStyleList(l)},window.onSelectedStyleChanged=function(e){if(!a){for(var t=0;t<n.length;t++){document.getElementById("duplicatedStyle"+t).className="leftPanelListItem alignVerticalCenter"}document.getElementById("duplicatedStyle"+e).className="leftPanelListItem alignVerticalCenter selected",n[e].isProcessed?DrawStyleList(e):(a=!0,window.postMessage("GetSelectedStyleData",e),document.getElementById("listOfStyles").className="movingYFadeInitialState workZone movingYFadeOut",document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeOut",window.ShowProgress(""))}},window.ShowProgress=function(e){document.getElementById("progressLayer").className="progressCircle offDownCenter fadeIn",document.getElementById("loadingMessage").innerHTML=e,document.getElementById("listOfStyles").className="movingYFadeInitialState movingYFadeOut"},window.HideProgress=function(){document.getElementById("progressLayer").className="progressCircle offDownCenter fadeOut"},window.ReDrawAfterGettingData=function(e,t){n[t].isProcessed=!0,a=!1;for(var l=0;l<n[t].textStyleWithDuplicates.duplicates.length;l++)n[t].textStyleWithDuplicates.duplicates[l].thumbnail=e.duplicates[l].thumbnail;window.HideProgress(100),DrawStyleList(t),document.getElementById("listOfStyles").className="movingYFadeInitialState workZone movingYFadeIn",document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeIn"},window.onStyleClicked=function(e,t){for(var l=0;l<n[t].textStyleWithDuplicates.duplicates.length;l++){document.getElementById("duplicateItemCheck"+l).checked=!1,document.getElementById("duplicateItem"+l).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter"}document.getElementById("duplicateItemCheck"+e).checked=!0,document.getElementById("duplicateItem"+e).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected",n[t].isUnchecked=!1,n[t].selectedIndex=e,DrawStylesList(n)},window.DrawStyleList=function(e){l=e;for(var t="",a=0;a<n[e].textStyleWithDuplicates.duplicates.length;a++){var i=n[e].selectedIndex==a,c=i?"selected":"",o='<div class="colAuto roundCheckbox">\n      <input type="checkbox" '.concat(i?"checked":"",' id="duplicateItemCheck').concat(a,'"/>\n      <label></label>\n    </div>'),d=n[e].textStyleWithDuplicates.duplicates[a].contrastMode?"bgContrastMode":"";t+='<div id="duplicateItem'.concat(a,'" class="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ').concat(c,'" onclick="onStyleClicked(').concat(a,", ").concat(e,')">\n                ').concat(o,'\n                <div class="colAvailable verticalLayout thumbnailData" id="duplicateItemThumbnail').concat(a,'" >\n                  <div class="rowAvailable padded ').concat(d,'"><div class="thumbnail" style=\'background-image:url("').concat(n[e].textStyleWithDuplicates.duplicates[a].thumbnail,'")\'></div></div>\n                  <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">').concat(n[e].textStyleWithDuplicates.duplicates[a].name," (").concat(n[e].textStyleWithDuplicates.duplicates[a].libraryName,')</span></div>\n                  <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">').concat(n[e].textStyleWithDuplicates.duplicates[a].description,"</span></div>\n                </div>\n              </div>")}var s=document.getElementById("resultsTitle"),r=document.getElementById("resultsDescription");s.innerHTML=n[e].textStyleWithDuplicates.name,r.innerHTML="There are "+n[e].textStyleWithDuplicates.duplicates.length+" styles with this name. The style you decide to keep will be applied to all layers & overrides using any of the discarded styles, and the discarded styles will be removed from the local file.";var u=document.getElementById("listOfStyles");u.innerHTML=t,u.className="scrollable movingYFadeInitialState workZone movingYFadeIn"},window.cancelAssignation=function(){window.postMessage("Cancel")},document.getElementById("chkIncludeLibraries").addEventListener("click",(function(){window.postMessage("RecalculateDuplicates",document.getElementById("chkIncludeLibraries").checked)})),document.getElementById("btnCancel").addEventListener("click",(function(){cancelAssignation()})),document.getElementById("btnMerge").addEventListener("click",(function(){window.postMessage("ExecuteMerge",n)}))}]);