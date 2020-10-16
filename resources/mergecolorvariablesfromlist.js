// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', (e) => {
  //e.preventDefault()
})
var globalColorVariables;
var globalGroupedColorVariables;
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
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

window.BuildMapping = () => {
  mapping = [];
  Object.keys(globalGroupedColorVariables).forEach(function (key) {
    var groupOfColorVariables = globalGroupedColorVariables[key];
    for (var i = 0; i < groupOfColorVariables.length; i++) {
      mapping.push(globalColorVariables.indexOf(groupOfColorVariables[i]));
    }
  });
}

window.DrawColorVariableList = (colorVariables, includeLibraries) => {
  window.postMessage("nativeLog", "WV - Drawing styles grouped list");
  globalColorVariables = colorVariables;
  includeLibrariesSetting = includeLibraries;

  if(includeLibraries!=null)
    document.getElementById('chkIncludeLibraries').checked = includeLibrariesSetting;

  const groupByLibraryName = groupBy('libraryName');
  var groupedColorVariables = groupByLibraryName(colorVariables);
  groupedColorVariables = sortOnKeys(groupedColorVariables);
  globalGroupedColorVariables = groupedColorVariables;
  window.postMessage("nativeLog", "WV - Grouped variables");
  BuildMapping();
  window.postMessage("nativeLog", "WV - Built mapping");
  var inner = "";
  var groupnum = 0;
  var variableNum = 0;
  Object.keys(groupedColorVariables).forEach(function (key) {
    var groupOfColorVariables = groupedColorVariables[key];

    inner += `<div id="groupColorVariableHeader${groupnum}" class="rowAuto horizontalLayout groupHeader" onClick="onExpanderClicked(${groupnum})">
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

    inner += `<div id="groupColorVariableList${groupnum}" class="rowAuto expanderContent">`;

    for (var i = 0; i < groupOfColorVariables.length; i++) {
      var checked = groupOfColorVariables[i].isSelected ? "checked" : "";

      var checkbox = `<div class="squareCheckbox">
        <input type="checkbox" ${checked} id="chkColorVariableItem${variableNum}"/>
        <label></label>
        <span>${groupOfColorVariables[i].name}</span>
      </div>`;

      inner += `<div id="colorVariableItem${variableNum}" onclick="onColorVariableItemChanged(${variableNum})" class="leftPanelListItem alignVerticalCenter">${checkbox} </div>`
      variableNum++;
    }

    inner += `</div>`;
    groupnum++;

  });

  window.postMessage("nativeLog", "WV - Drawing left panel color variable list");
  var lstColorVariables = document.getElementById('lstColorVariables');
  lstColorVariables.innerHTML = inner;

  clearWorkzone();
}

window.onExpanderClicked = (index) => {
  window.postMessage("nativeLog", "WV - Expanding "+index);
  var groupColorVariableHeader = document.getElementById("groupColorVariableHeader" + index);
  var groupColorVariableList = document.getElementById("groupColorVariableList" + index);
  if (groupColorVariableHeader.className.toString().indexOf("collapsed") >= 0) {
    groupColorVariableHeader.className = "rowAuto horizontalLayout groupHeader";
    groupColorVariableList.className = "rowAuto expanderContent";
  }
  else {
    groupColorVariableHeader.className = "rowAuto horizontalLayout groupHeader collapsed";
    groupColorVariableList.className = "rowAuto expanderContent notDisplayed";
  }
}

window.onColorVariableItemChanged = (index) => {
  window.postMessage("nativeLog", "WV - Color variable item changed");
  var realIndex = mapping[index];
  globalColorVariables[realIndex].isSelected = !globalColorVariables[realIndex].isSelected;
  var selectedDiv = document.getElementById("colorVariableItem" + index);
  var selectedCheck = document.getElementById("chkColorVariableItem" + index);
  var selected = globalColorVariables[realIndex].isSelected ? "selected" : "";
  selectedDiv.className = "leftPanelListItem alignVerticalCenter " + selected;
  selectedCheck.checked = globalColorVariables[realIndex].isSelected;

  for (var i = 0; i < globalColorVariables.length; i++) {
    globalColorVariables[i].isChosen = false;
  }

  DrawSelectedVariablesList();
}

window.clearWorkzone = () => {
  window.postMessage("nativeLog", "WV - Clear workzone");
  document.getElementById('emptyState').className = "emptyState fadeIn";
  document.getElementById("workZoneTitle").className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeOut";
  listOfColorVariables.className = "scrollable movingYFadeInitialState workZone movingYFadeOut";
  document.getElementById('lblIncludeLibraries').innerHTML = "Include all enabled libraries styles";
}

window.onColorVariableClicked = (index) => {
  window.postMessage("nativeLog", "WV - Layer style changed");
  var realIndex = mapping[index];

  var variableNum = 0;
  Object.keys(globalGroupedColorVariables).forEach(function (key) {
    var groupOfColorVariables = globalGroupedColorVariables[key];
    for (var i = 0; i < groupOfColorVariables.length; i++) {
      if (groupOfColorVariables[i].isSelected) {
        var otherCheck = document.getElementById("workZoneItemCheck" + variableNum);
        var otherColorVariable = document.getElementById("workZoneColorVariable" + variableNum);
        otherCheck.checked = false;
        otherColorVariable.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter";
      }
      groupOfColorVariables[i].isChosen = false;
      variableNum++;
    }
  });

  var selectedCheck = document.getElementById("workZoneItemCheck" + index);
  var selectedColorVariable = document.getElementById("workZoneColorVariable" + index);
  selectedCheck.checked = true;
  selectedColorVariable.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected";
  globalColorVariables[realIndex].isChosen = true;

  var btnMerge = document.getElementById('btnMerge');
  btnMerge.disabled = false;
}

window.DrawSelectedVariablesList = () => {
  window.postMessage("nativeLog", "WV - Draw color variables");
  var inner = "";
  var counter = 0;

  var variableNum = 0;
  Object.keys(globalGroupedColorVariables).forEach(function (key) {
    var groupOfColorVariables = globalGroupedColorVariables[key];
    for (var i = 0; i < groupOfColorVariables.length; i++) {
      if (groupOfColorVariables[i].isSelected) {
        var selected = groupOfColorVariables[i].isChosen ? "selected" : "";
        var checked = groupOfColorVariables[i].isChosen ? "checked" : "";

        var checkbox = `<div class="colAuto roundCheckbox">
                          <input type="checkbox" ${checked} id="workZoneItemCheck${variableNum}"/>
                          <label></label>
                        </div>`;


        var contrastMode = groupOfColorVariables[i].contrastMode ? "bgContrastMode" : "";

        inner += `<div id="workZoneColorVariable${variableNum}" class="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ${selected}" onclick="onColorVariableClicked(${variableNum})">
                  ${checkbox}
                  <div class="colAvailable verticalLayout thumbnailData" id="workZoneColorVariableThumbnail${variableNum}" >
                    <div class="rowAvailable padded ${contrastMode}"><div class="thumbnail" style='background-image:url("data:image/png;base64,${groupOfColorVariables[i].thumbnail}")'></div></div>
                    <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">${groupOfColorVariables[i].name} (${groupOfColorVariables[i].libraryName})</span></div>
                    <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">${groupOfColorVariables[i].description}</span></div>
                  </div>
                </div>`;

        counter++;
      }
      variableNum++;
    }
  });


  var listOfColorVariables = document.getElementById('listOfColorVariables');
  var workZoneTitle = document.getElementById("workZoneTitle");

  if (counter > 0) {
    document.getElementById('emptyState').className = "emptyState fadeOut";
    workZoneTitle.className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeIn";
    listOfColorVariables.innerHTML = inner;
    listOfColorVariables.className = "scrollable movingYFadeInitialState workZone movingYFadeIn";
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
  window.postMessage('ExecuteMerge', globalColorVariables);
});

document.getElementById('chkIncludeLibraries').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Include libraries check changed");
  var check = document.getElementById('chkIncludeLibraries');
  if (check.checked)
    window.postMessage('GetAllColorVariablesList');
  else
    window.postMessage('GetLocalColorVariablesList');
});



