!function(e){var t={};function n(o){if(t[o])return t[o].exports;var a=t[o]={i:o,l:!1,exports:{}};return e[o].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(o,a,function(t){return e[t]}.bind(null,a));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){var n,o;document.addEventListener("contextmenu",(function(e){e.preventDefault()}));var a=[];window.BuildMapping=function(){a=[],Object.keys(o).forEach((function(e){for(var t=o[e],l=0;l<t.length;l++)a.push(n.indexOf(t[l]))}))},window.DrawStyleList=function(e){n=e;var t,a=(t="libraryName",function(e){return e.reduce((function(e,n){var o=n[t];return e[o]=(e[o]||[]).concat(n),e}),{})})(e);a=function(e){var t=[];for(var n in e)t[t.length]=n;t.sort();for(var o={},a=0;a<t.length;a++)o[t[a]]=e[t[a]];return o}(a),o=a,BuildMapping();var l="",c=0,i=0;Object.keys(a).forEach((function(e){var t=a[e];l+='<div id="groupStyleHeader'.concat(c,'" class="rowAuto horizontalLayout groupHeader" onClick="onExpanderClicked(').concat(c,')">\n                <div class="colAvailable alignVerticalCenter"><span class="">').concat(e,'</span></div>\n                <div class="colAuto expanderIcon">\n                  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n                      \x3c!-- Generator: Sketch 61.2 (89653) - https://sketch.com --\x3e\n                      <title>Page 1</title>\n                      <desc>Created with Sketch.</desc>\n                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n                          <g id="Artboard">\n                              <path d="M17.3273272,9.26005993 C17.7359848,8.888553 18.3684331,8.91866959 18.7399401,9.32732721 C19.0828695,9.70454962 19.0835873,10.2724576 18.7602482,10.6497962 L18.6726728,10.7399401 L12.4999929,16.3514608 L6.32732721,10.7399401 C5.91866959,10.3684331 5.888553,9.73598482 6.26005993,9.32732721 C6.6029894,8.95010479 7.16825947,8.89542621 7.57461521,9.18144646 L7.67267279,9.26005993 L12.499,13.649 L17.3273272,9.26005993 Z" id="Path" fill="#979797" fill-rule="nonzero"></path>\n                          </g>\n                      </g>\n                  </svg>\n                </div>\n              </div>'),l+='<div id="groupStyleList'.concat(c,'" class="rowAuto expanderContent">');for(var n=0;n<t.length;n++){var o=t[n].isSelected?"checked":"",r='<div class="squareCheckbox">\n        <input type="checkbox" '.concat(o,' id="chkTextStyleItem').concat(i,'"/>\n        <label></label>\n        <span>').concat(t[n].name,"</span>\n      </div>");l+='<div id="textStyleItem'.concat(i,'" onclick="onTextStyleItemChanged(').concat(i,')" class="leftPanelListItem alignVerticalCenter">').concat(r," </div>"),i++}l+="</div>",c++})),document.getElementById("lstTextStyles").innerHTML=l,clearWorkzone()},window.onExpanderClicked=function(e){var t=document.getElementById("groupStyleHeader"+e),n=document.getElementById("groupStyleList"+e);t.className.toString().indexOf("collapsed")>=0?(t.className="rowAuto horizontalLayout groupHeader",n.className="rowAuto expanderContent"):(t.className="rowAuto horizontalLayout groupHeader collapsed",n.className="rowAuto expanderContent notDisplayed")},window.onTextStyleItemChanged=function(e){var t=a[e];n[t].isSelected=!n[t].isSelected;var o=document.getElementById("textStyleItem"+e),l=document.getElementById("chkTextStyleItem"+e),c=n[t].isSelected?"selected":"";o.className="leftPanelListItem alignVerticalCenter "+c,l.checked=n[t].isSelected;for(var i=0;i<n.length;i++)n[i].isChosen=!1;DrawSelectedStylesList()},window.clearWorkzone=function(){document.getElementById("emptyState").className="emptyState fadeIn",document.getElementById("workZoneTitle").className="colAvailable verticalLayout movingYFadeInitialState movingYFadeOut",listOfStyles.className="scrollable movingYFadeInitialState workZone movingYFadeOut",document.getElementById("lblIncludeLibraries").innerHTML="Include all enabled libraries styles"},window.onStyleClicked=function(e){var t=a[e],l=0;Object.keys(o).forEach((function(e){for(var t=o[e],n=0;n<t.length;n++){if(t[n].isSelected){var a=document.getElementById("workZoneItemCheck"+l),c=document.getElementById("workZoneStyle"+l);a.checked=!1,c.className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter"}t[n].isChosen=!1,l++}}));var c=document.getElementById("workZoneItemCheck"+e),i=document.getElementById("workZoneStyle"+e);c.checked=!0,i.className="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected",n[t].isChosen=!0,document.getElementById("btnMerge").disabled=!1},window.DrawSelectedStylesList=function(){var e="",t=0,n=0;Object.keys(o).forEach((function(a){for(var l=o[a],c=0;c<l.length;c++){if(l[c].isSelected){var i=l[c].isChosen?"selected":"",r=l[c].isChosen?"checked":"",d='<div class="colAuto roundCheckbox">\n                          <input type="checkbox" '.concat(r,' id="workZoneItemCheck').concat(n,'"/>\n                          <label></label>\n                        </div>'),s=l[c].contrastMode?"bgContrastMode":"";e+='<div id="workZoneStyle'.concat(n,'" class="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ').concat(i,'" onclick="onStyleClicked(').concat(n,')">\n                  ').concat(d,'\n                  <div class="colAvailable verticalLayout thumbnailData" id="workZoneStyleThumbnail').concat(n,'" >\n                    <div class="rowAvailable padded ').concat(s,'"><div class="thumbnail" style=\'background-image:url("').concat(l[c].thumbnail,'")\'></div></div>\n                    <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">').concat(l[c].name," (").concat(l[c].libraryName,')</span></div>\n                    <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">').concat(l[c].description,"</span></div>\n                  </div>\n                </div>"),t++}n++}}));var a=document.getElementById("listOfStyles"),l=document.getElementById("workZoneTitle");t>0?(document.getElementById("emptyState").className="emptyState fadeOut",l.className="colAvailable verticalLayout movingYFadeInitialState movingYFadeIn",a.innerHTML=e,a.className="scrollable movingYFadeInitialState workZone movingYFadeIn",document.getElementById("lblIncludeLibraries").innerHTML="Include all enabled libraries styles (you may lose the current selection)"):clearWorkzone()},window.cancelAssignation=function(){window.postMessage("Cancel")},document.getElementById("btnCancel").addEventListener("click",(function(){cancelAssignation()})),document.getElementById("btnMerge").addEventListener("click",(function(){window.postMessage("ExecuteMerge",n)})),document.getElementById("chkIncludeLibraries").addEventListener("click",(function(){document.getElementById("chkIncludeLibraries").checked?window.postMessage("GetAllStylesList"):window.postMessage("GetLocalStylesList")}))}]);