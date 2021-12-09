// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})
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

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    refinedValue = (value.indexOf("(Master")>0) ? value.substring(0, value.indexOf("(Master")) : value;
    objectsByKeyValue[refinedValue] = (objectsByKeyValue[refinedValue] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

window.BuildMapping = () => {
  mapping = [];
  Object.keys(globalGroupedLayerStyles).forEach(function (key) {
    var groupOfStyles = globalGroupedLayerStyles[key];
    for (var i = 0; i < groupOfStyles.length; i++) {
      mapping.push(globalLayerStyles.indexOf(groupOfStyles[i]));
    }
  });
}

window.DrawStyleList = (layerStyles, includeLibraries) => {
  window.postMessage("nativeLog", "WV - Drawing styles grouped list");
  globalLayerStyles = layerStyles;
  includeLibrariesSetting = includeLibraries;

  if (includeLibraries != null)
    document.getElementById('chkIncludeLibraries').checked = includeLibrariesSetting;

  const groupByLibraryName = groupBy('libraryName');
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

    inner += `<div id="groupStyleHeader${groupnum}" class="rowAuto horizontalLayout groupHeader" onClick="onExpanderClicked(${groupnum})">
                <div class="colAvailable alignVerticalCenter"><span class="">${key}</span></div>
                <div class="colAuto expanderIcon">
                  <svg width="24px" height="24px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      
                      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <g id="Artboard">
                              <path d="M17.3273272,9.26005993 C17.7359848,8.888553 18.3684331,8.91866959 18.7399401,9.32732721 C19.0828695,9.70454962 19.0835873,10.2724576 18.7602482,10.6497962 L18.6726728,10.7399401 L12.4999929,16.3514608 L6.32732721,10.7399401 C5.91866959,10.3684331 5.888553,9.73598482 6.26005993,9.32732721 C6.6029894,8.95010479 7.16825947,8.89542621 7.57461521,9.18144646 L7.67267279,9.26005993 L12.499,13.649 L17.3273272,9.26005993 Z" id="Path" fill="#979797" fill-rule="nonzero"></path>
                          </g>
                      </g>
                  </svg>
                </div>
              </div>`;

    inner += `<div id="groupStyleList${groupnum}" class="rowAuto expanderContent">`;

    for (var i = 0; i < groupOfStyles.length; i++) {
      var isHidden = groupOfStyles[i].isHidden ? "notDisplayed" : "";
      
      var checked = groupOfStyles[i].isSelected ? "checked" : "";

      var checkbox = `<div class="squareCheckbox">
        <input type="checkbox" ${checked} id="chkLayerStyleItem${stylenum}"/>
        <label></label>
        <div class="text">${groupOfStyles[i].name}</div>
      </div>`;

      inner += `<div id="layerStyleItem${stylenum}" onclick="onLayerStyleItemChanged(${stylenum})" class="leftPanelListItem alignVerticalCenter ${isHidden}">${checkbox} </div>`
      stylenum++;
    }

    inner += `</div>`;
    groupnum++;

  });

  window.postMessage("nativeLog", "WV - Drawing left panel style list");
  var lstLayerStyles = document.getElementById('lstLayerStyles');
  lstLayerStyles.innerHTML = inner;

  clearWorkzone();
}

window.ShowMergeProgress = (progress) => {
  HideLayout();
  document.getElementById('progressCircle').className = "progressCircle offDownCenter fadeIn";
}
window.UpdateMergeProgress = (progress, message, message2) => {
  document.getElementById('progressRing').setProgress(progress);
  document.getElementById('mergeloadingMessage').innerHTML = message;
  document.getElementById('mergeloadingMessage2').innerHTML = message2;
}

window.HideLayout = () => {
  //window.postMessage("nativeLog", "WV - Hide layout");
  document.getElementById('resultsPanel').className = "colAuto leftPanel collapsed";
  document.getElementById('workZoneTitle').className = "colAvailable verticalLayout movingYFadeInitialState fadeOut";
  document.getElementById('contentList').className = "rowAvailable listOfStyles fadeOut";
  document.getElementById('btnCancel').className = "notDisplayed";
  document.getElementById('btnMerge').className = "notDisplayed";
  document.getElementById('chkLibraries').className = "notDisplayed";
}

window.onExpanderClicked = (index) => {
  window.postMessage("nativeLog", "WV - Expanding " + index);
  var groupStyleHeader = document.getElementById("groupStyleHeader" + index);
  var groupStyleList = document.getElementById("groupStyleList" + index);
  if (groupStyleHeader.className.toString().indexOf("collapsed") >= 0) {
    groupStyleHeader.className = "rowAuto horizontalLayout groupHeader";
    groupStyleList.className = "rowAuto expanderContent";
  }
  else {
    groupStyleHeader.className = "rowAuto horizontalLayout groupHeader collapsed";
    groupStyleList.className = "rowAuto expanderContent notDisplayed";
  }
}

window.onLayerStyleItemChanged = (index) => {
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

  //window.postMessage("GetSpecificLayerStyleInfo", realIndex);

  DrawSelectedStylesList();
}

window.clearWorkzone = () => {
  window.postMessage("nativeLog", "WV - Clear workzone");
  document.getElementById('emptyState').className = "emptyState fadeIn";
  document.getElementById("workZoneTitle").className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeOut";
  listOfStyles.className = "scrollable movingYFadeInitialState workZone movingYFadeOut";
  document.getElementById('lblIncludeLibraries').innerHTML = "Include all enabled libraries styles";
}

window.onStyleClicked = (index) => {
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
}

window.DrawSelectedStylesList = () => {
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

        var checkbox = `<div class="colAuto roundCheckbox">
                          <input type="checkbox" ${checked} id="workZoneItemCheck${stylenum}"/>
                          <label></label>
                        </div>`;


        var contrastMode = groupOfStyles[i].contrastMode ? "bgContrastMode" : "";

        inner += `<div id="workZoneStyle${stylenum}" class="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ${selected}" onclick="onStyleClicked(${stylenum})">
                  ${checkbox}
                  <div class="colAvailable verticalLayout thumbnailData" id="workZoneStyleThumbnail${stylenum}" >
                    <div class="rowAvailable padded ${contrastMode}"><div class="thumbnail" style='background-image:url("data:image/png;base64,${groupOfStyles[i].thumbnail}")'></div></div>
                    <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">${groupOfStyles[i].name} (${groupOfStyles[i].libraryName})</span></div>
                    <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">${groupOfStyles[i].description}</span></div>
                    <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">${groupOfStyles[i].styleId}</span></div>
                    <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">${groupOfStyles[i].addedBy}</span></div>
                  </div>
                </div>`;

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
  }
  else {
    clearWorkzone();
  }
}

window.cancelAssignation = () => {
  window.postMessage('Cancel');
}

document.getElementById('btnCancel').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Cancel");
  cancelAssignation();
});

document.getElementById('btnMerge').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Execute merge");
  window.postMessage('ExecuteMerge', globalLayerStyles);
});

document.getElementById('chkIncludeLibraries').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Include libraries check changed");
  var check = document.getElementById('chkIncludeLibraries');
  window.postMessage('GetStylesList', check.checked);
});



