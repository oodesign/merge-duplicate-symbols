!function(e){var t={};function n(l){if(t[l])return t[l].exports;var a=t[l]={i:l,l:!1,exports:{}};return e[l].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,l){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(n.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(l,a,function(t){return e[t]}.bind(null,a));return l},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n;document.addEventListener("contextmenu",(function(e){e.preventDefault()}));var l=0;window.UpdateSettings=function(e){null!=e&&(document.getElementById("chkIncludeLibraries").checked=e)},window.DrawResultsList=function(e){if(window.postMessage("nativeLog","WV - Drawing results list"),(n=e).length>0){for(var t=document.getElementById("lstResultingStyles"),a=document.getElementById("btnMerge"),i="",o=0,c=0;c<n.length;c++){var s=n[c].selectedIndex>=0,d=s?'for="resultStyleCheck'.concat(c,'"'):"",r=s&&!n[c].isUnchecked?"checked":"",u=s?'onclick="onSelectedStyleCheckChanged('.concat(c,')"'):"",m=c==l?"selected":"";s&&!n[c].isUnchecked&&o++;var g='<div class="squareCheckbox">\n      <input type="checkbox" '.concat(r,' id="resultStyleCheck').concat(c,'" ').concat(u,"/>\n      <label ").concat(d,'></label>\n      <div class="text">').concat(n[c].referenceStyle.name,"</div>\n    </div>");i+='<div id="resultStyle'.concat(c,'" onclick="onSelectedStyleChanged(').concat(c,')" class="leftPanelListItem alignVerticalCenter ').concat(m,'">').concat(g," </div>")}document.getElementById("resultsPanel").className="colAuto leftPanel",window.postMessage("nativeLog","WV - Drawing left panel style list"),t.innerHTML=i,a.disabled=0==o,document.getElementById("lblIncludeLibraries").innerHTML=0!=o?"Include all enabled libraries color variables (you may lose the current selection)":"Include all enabled libraries color variables",DrawStyleList(l)}else window.postMessage("nativeLog","WV - No similar color variables. Drawing empty state."),document.getElementById("resultsPanel").className="colAuto leftPanel collapsed",document.getElementById("listOfStyles").className="scrollable movingYFadeInitialState workZone movingYFadeOut",document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeOut",document.getElementById("emptyStateMessage").innerHTML="We couldn't find any color variables that are that similar.",document.getElementById("emptyState").className="emptyState fadeIn",document.getElementById("resultsTitle").innerHTML="",document.getElementById("resultsDescription").innerHTML=""},window.onSelectedStyleCheckChanged=function(e){window.postMessage("nativeLog","WV - Include style changed"),n[e].isUnchecked=!n[e].isUnchecked,DrawStylesList(n),DrawStyleList(l)},window.onSelectedStyleChanged=function(e){window.postMessage("nativeLog","WV - Left panel list selected style changed.");for(var t=0;t<n.length;t++){document.getElementById("resultStyle"+t).className="leftPanelListItem alignVerticalCenter"}document.getElementById("resultStyle"+e).className="leftPanelListItem alignVerticalCenter selected",DrawStyleList(e)},window.onStyleClicked=function(e,t){window.postMessage("nativeLog","WV - Style clicked. Updating selection status.");for(var l=0;l<n[t].similarStyles.length;l++){document.getElementById("duplicateItemCheck"+l).checked=!1,document.getElementById("duplicateItem"+l).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter"}document.getElementById("duplicateItemCheck"+e).checked=!0,document.getElementById("duplicateItem"+e).className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected",n[t].selectedIndex=e,DrawResultsList(n)},window.DrawStyleList=function(e){window.postMessage("nativeLog","WV - Drawing color variables"),l=e;for(var t="",a=0;a<n[e].similarStyles.length;a++){window.postMessage("nativeLog","WV --- Drawing style: "+n[e].similarStyles[a].name);var i=n[e].selectedIndex==a,o=i?"selected":"",c='<div class="colAuto roundCheckbox">\n      <input type="checkbox" '.concat(i?"checked":"",' id="duplicateItemCheck').concat(a,'"/>\n      <label></label>\n    </div>'),s=n[e].similarStyles[a].contrastMode?"bgContrastMode":"";t+='<div id="duplicateItem'.concat(a,'" class="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ').concat(o,'" onclick="onStyleClicked(').concat(a,", ").concat(e,')">\n                ').concat(c,'\n                <div class="colAvailable verticalLayout thumbnailData" id="duplicateItemThumbnail').concat(a,'" >\n                  <div class="rowAvailable padded ').concat(s,'"><div class="thumbnail" style=\'background-image:url("data:image/png;base64,').concat(n[e].similarStyles[a].thumbnail,'")\'></div></div>\n                  <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">').concat(n[e].similarStyles[a].name," (").concat(n[e].similarStyles[a].libraryName,')</span></div>\n                  <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">').concat(n[e].similarStyles[a].description,"</span></div>\n                </div>\n              </div>")}var d=document.getElementById("resultsTitle"),r=document.getElementById("resultsDescription");d.innerHTML=n[e].referenceStyle.name,r.innerHTML="There are "+n[e].similarStyles.length+" color variables with this same attributes. The style you decide to keep will be applied to all layers & overrides using any of the discarded styles, and the discarded styles will be removed from the local file.",document.getElementById("emptyState").className="emptyState fadeOut",document.getElementById("listOfStyles").innerHTML=t,document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeIn",document.getElementById("listOfStyles").className="scrollable movingYFadeInitialState workZone movingYFadeIn",window.postMessage("nativeLog","WV - Completed drawing color variables")},window.cancelAssignation=function(){window.postMessage("Cancel")},document.getElementById("btnCancel").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Cancel"),cancelAssignation()})),document.getElementById("btnMerge").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Execute merge"),window.postMessage("ExecuteMerge",n)})),document.getElementById("filterHeader").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Show/hide filters"),onFilterExpanderClicked()})),document.getElementById("chkIncludeLibraries").addEventListener("click",(function(){window.postMessage("nativeLog","WV - Include libraries check changed"),onFilterChanged()})),document.getElementById("btnFindMatchingStyles").addEventListener("click",(function(){onFilterChanged()})),document.getElementById("btnEmptyState").addEventListener("click",(function(){onFilterChanged()})),document.getElementById("toleranceSlider").addEventListener("input",(function(){document.getElementById("toleranceVal").innerHTML="("+document.getElementById("toleranceSlider").value+")"})),window.onFilterChanged=function(){window.postMessage("nativeLog","WV - Find matching color variables");var e=document.getElementById("chkIncludeLibraries").checked,t=document.getElementById("toleranceSlider").value;window.postMessage("RecalculateVariables",e,t),0,checkSameFillColor?1:0,checkSameBorderColor?1:0,checkSameBorderThickness?1:0,checkSameShadowColor?1:0,checkSameShadowXYBlurSpread?1:0},window.onFilterExpanderClicked=function(){var e=document.getElementById("filterArea");e.className.toString().indexOf("collapsed")>=0?e.className="colAuto filterArea verticalLayout":e.className="colAuto filterArea verticalLayout collapsed"}}]);