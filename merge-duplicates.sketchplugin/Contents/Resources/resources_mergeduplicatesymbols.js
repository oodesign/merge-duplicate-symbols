!function(e){var t={};function n(l){if(t[l])return t[l].exports;var a=t[l]={i:l,l:!1,exports:{}};return e[l].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(l,a,function(t){return e[t]}.bind(null,a));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n;document.addEventListener("contextmenu",(function(e){e.preventDefault()}));var l=0,a=!1,c=0,i=0,o=1;window.LaunchMerge=function(e,t){c=e,i=t,"loading"==document.readyState?document.addEventListener("DOMContentLoaded",GetSymbols):GetSymbols()},window.GetSymbols=function(){setTimeout((function(){var e="We're looking for duplicates...";c>100&&(e="We're looking for duplicates...<br/><br/>Wow, you have "+c+" symbols here (and "+i+" in linked libraries)! 🙈<br/> This may take a while... Wanna go get a coffee?"),window.ShowProgress(e),window.postMessage("RecalculateDuplicates",document.getElementById("chkIncludeLibraries").checked)}),200)},window.DrawDuplicateSymbols=function(e){window.HideProgress(),l>=(n=e).length&&(l=0);var t=document.getElementById("lstDuplicateSymbols"),a=document.getElementById("btnMerge"),c="",i=0;if(n.length>0){for(var o=0;o<n.length;o++){var s=n[o].selectedIndex>=0,d=s?'for="duplicatedSymbolCheck'.concat(o,'"'):"",r=s&&!n[o].isUnchecked?"checked":"",m=s?'onclick="onSelectedSymbolCheckChanged('.concat(o,')"'):"",u=o==l?"selected":"";s&&!n[o].isUnchecked&&i++;var y='<div class="squareCheckbox">\n      <input type="checkbox" '.concat(r,' id="duplicatedSymbolCheck').concat(o,'" ').concat(m,"/>\n      <label ").concat(d,"></label>\n      <span>").concat(e[o].symbolWithDuplicates.name,"</span>\n    </div>");c+='<div id="duplicatedSymbol'.concat(o,'" onclick="onSelectedSymbolChanged(').concat(o,')" class="leftPanelListItem alignVerticalCenter ').concat(u,'">').concat(y," </div>")}t.innerHTML=c,a.disabled=0==i,document.getElementById("lblIncludeLibraries").innerHTML=0!=i?"Include all enabled libraries symbols (you may lose the current selection)":"Include all enabled libraries symbols",DrawSymbolList(l),ShowLayout()}else HideLayout()},window.ShowLayout=function(e){document.getElementById("resultsPanel").className="colAuto leftPanel",document.getElementById("btnCancel").className="btnSecondary",document.getElementById("btnMerge").className="btnPrimary",document.getElementById("chkLibraries").className="roundCheckbox",document.getElementById("btnOK").className="notDisplayed"},window.HideLayout=function(e){document.getElementById("emptyState").className="emptyState fadeIn",document.getElementById("resultsPanel").className="colAuto leftPanel collapsed",document.getElementById("btnCancel").className="notDisplayed",document.getElementById("btnMerge").className="notDisplayed",document.getElementById("chkLibraries").className="notDisplayed",document.getElementById("btnOK").className="btnPrimary"},window.onSelectedSymbolCheckChanged=function(e){n[e].isUnchecked=!n[e].isUnchecked,DrawDuplicateSymbols(n),DrawSymbolList(l)},window.onSelectedSymbolChanged=function(e){if(!a){for(var t=0;t<n.length;t++){document.getElementById("duplicatedSymbol"+t).className="leftPanelListItem alignVerticalCenter"}document.getElementById("duplicatedSymbol"+e).className="leftPanelListItem alignVerticalCenter selected",n[e].isProcessed?DrawSymbolList(e):(a=!0,window.postMessage("GetSelectedSymbolData",e),document.getElementById("listOfSymbols").className="movingYFadeInitialState workZone movingYFadeOut"+(0==o?" cardsView":""),document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeOut",window.ShowProgress(""))}},window.ShowProgress=function(e){document.getElementById("progressLayer").className="progressCircle offDownCenter fadeIn",document.getElementById("loadingMessage").innerHTML=e,document.getElementById("listOfSymbols").className="movingYFadeInitialState movingYFadeOut"+(0==o?" cardsView":"")},window.HideProgress=function(){document.getElementById("progressLayer").className="progressCircle offDownCenter fadeOut"},window.ReDrawAfterGettingData=function(e,t){n[t].isProcessed=!0,a=!1;for(var l=0;l<n[t].symbolWithDuplicates.duplicates.length;l++)n[t].symbolWithDuplicates.duplicates[l].thumbnail=e.duplicates[l].thumbnail,n[t].symbolWithDuplicates.duplicates[l].symbolInstances=e.duplicates[l].symbolInstances,n[t].symbolWithDuplicates.duplicates[l].numInstances=e.duplicates[l].numInstances,n[t].symbolWithDuplicates.duplicates[l].symbolOverrides=e.duplicates[l].symbolOverrides,n[t].symbolWithDuplicates.duplicates[l].numOverrides=e.duplicates[l].numOverrides;window.HideProgress(100),DrawSymbolList(t),document.getElementById("listOfSymbols").className="movingYFadeInitialState workZone movingYFadeIn"+(0==o?" cardsView":""),document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeIn"},window.onSymbolClicked=function(e,t){for(var l=0;l<n[t].symbolWithDuplicates.duplicates.length;l++){document.getElementById("duplicateItemCheck"+l).checked=!1,document.getElementById("duplicateItem"+l).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter"}document.getElementById("duplicateItemCheck"+e).checked=!0,document.getElementById("duplicateItem"+e).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected",n[t].isUnchecked=!1,n[t].selectedIndex=e,DrawDuplicateSymbols(n)},window.DrawSymbolList=function(e){l=e;for(var t="",a=0;a<n[e].symbolWithDuplicates.duplicates.length;a++){var c=n[e].selectedIndex==a,i=c?"selected":"",s='<div class="colAuto roundCheckbox">\n      <input type="checkbox" '.concat(c?"checked":"",' id="duplicateItemCheck').concat(a,'"/>\n      <label></label>\n    </div>');t+='<div id="duplicateItem'.concat(a,'" class="thumbnailContainer symbolPreview  alignVerticalCenter ').concat(i,'" onclick="onSymbolClicked(').concat(a,", ").concat(e,')">\n                ').concat(s,'\n                <div class="colAvailable verticalLayout thumbnailData" id="duplicateItemThumbnail').concat(a,'" >\n                  <div class="rowAvailable thumbnail" style=\'background-image:url("').concat(n[e].symbolWithDuplicates.duplicates[a].thumbnail,'")\'></div>\n                  <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">').concat(n[e].symbolWithDuplicates.duplicates[a].numInstances," instances - Used in ").concat(n[e].symbolWithDuplicates.duplicates[a].numOverrides,' overrides</span></div>\n                  <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">').concat(n[e].symbolWithDuplicates.duplicates[a].libraryName,"</span></div>\n                </div>\n              </div>")}var d=document.getElementById("resultsTitle"),r=document.getElementById("resultsDescription");d.innerHTML=n[e].symbolWithDuplicates.name,r.innerHTML="There are "+n[e].symbolWithDuplicates.duplicates.length+" symbols with this name. Choose the one you want to keep and press OK. The other symbols will be removed, and all of their instances will be replaced by the one you chose to keep.",document.getElementById("viewSelector").classList.remove("notDisplayed");var m=document.getElementById("listOfSymbols");m.innerHTML=t,m.className="movingYFadeInitialState workZone movingYFadeIn"+(0==o?" cardsView":"")},document.getElementById("chkIncludeLibraries").addEventListener("click",(function(){window.ShowProgress(""),window.postMessage("RecalculateDuplicates",document.getElementById("chkIncludeLibraries").checked)})),window.cancelAssignation=function(){window.postMessage("Cancel")},document.getElementById("btnCancel").addEventListener("click",(function(){cancelAssignation()})),document.getElementById("btnMerge").addEventListener("click",(function(){window.postMessage("ExecuteMerge",n)})),document.getElementById("btnOK").addEventListener("click",(function(){cancelAssignation()})),document.getElementById("btnCardView").addEventListener("click",(function(){o=0,document.getElementById("listOfSymbols").classList.add("cardsView"),document.getElementById("btnListView").classList.remove("selected"),document.getElementById("btnCardView").classList.add("selected")})),document.getElementById("btnListView").addEventListener("click",(function(){o=1,document.getElementById("listOfSymbols").classList.remove("cardsView"),document.getElementById("btnCardView").classList.remove("selected"),document.getElementById("btnListView").classList.add("selected")}))}]);