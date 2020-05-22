// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})
var globalMergeSession;
var globalStyleDisplayed = 0;
var isLoadingStyleData = false;
var includeLibrariesSetting = false;

window.DrawStylesList = (mergeSession, includeLibraries) => {
  window.postMessage("nativeLog", "WV - Drawing duplicate styles list");
  globalMergeSession = mergeSession;
  includeLibrariesSetting = includeLibraries;

  if(includeLibraries!=null)
    document.getElementById('chkIncludeLibraries').checked = includeLibrariesSetting;

  if (globalStyleDisplayed >= globalMergeSession.length)
    globalStyleDisplayed = 0;
  var lstDuplicateStyles = document.getElementById('lstDuplicateStyles');
  var btnMerge = document.getElementById('btnMerge');
  var inner = "";
  var checkedCounter = 0;

  for (var i = 0; i < globalMergeSession.length; i++) {
    var hasSelection = (globalMergeSession[i].selectedIndex >= 0);
    var labelFor = hasSelection ? `for="duplicatedStyleCheck${i}"` : "";
    var checked = (hasSelection && !globalMergeSession[i].isUnchecked) ? "checked" : "";
    var handler = hasSelection ? `onclick="onSelectedStyleCheckChanged(${i})"` : "";
    var isSelected = (i == globalStyleDisplayed);
    var selected = isSelected ? "selected" : "";

    if (hasSelection && !globalMergeSession[i].isUnchecked) checkedCounter++;

    var checkbox = `<div class="squareCheckbox">
      <input type="checkbox" ${checked} id="duplicatedStyleCheck${i}" ${handler}/>
      <label ${labelFor}></label>
      <span>${mergeSession[i].layerStyleWithDuplicates.name}</span>
    </div>`;

    inner += `<div id="duplicatedStyle${i}" onclick="onSelectedStyleChanged(${i})" class="leftPanelListItem alignVerticalCenter ${selected}">${checkbox} </div>`
  }

  window.postMessage("nativeLog", "WV - Drawing left panel style list");
  lstDuplicateStyles.innerHTML = inner;
  btnMerge.disabled = (checkedCounter == 0);

  document.getElementById('lblIncludeLibraries').innerHTML = (checkedCounter != 0) ? "Include all enabled libraries layer styles (you may lose the current selection)" : "Include all enabled libraries layer styles";

  DrawStyleList(globalStyleDisplayed);
}

window.onSelectedStyleCheckChanged = (index) => {
  window.postMessage("nativeLog", "WV - Include style changed");
  globalMergeSession[index].isUnchecked = !globalMergeSession[index].isUnchecked;
  DrawStylesList(globalMergeSession);
  DrawStyleList(globalStyleDisplayed);
}

window.onSelectedStyleChanged = (index) => {
  window.postMessage("nativeLog", "WV - Left panel list selected style changed");
  if (!isLoadingStyleData) {
    for (var i = 0; i < globalMergeSession.length; i++) {
      var otherDiv = document.getElementById("duplicatedStyle" + i);
      otherDiv.className = "leftPanelListItem alignVerticalCenter";
    }

    var selectedDiv = document.getElementById("duplicatedStyle" + index);
    selectedDiv.className = "leftPanelListItem alignVerticalCenter selected";

    if (!globalMergeSession[index].isProcessed) {
      isLoadingStyleData = true;
      window.postMessage("GetSelectedStyleData", index);
      document.getElementById('listOfStyles').className = "movingYFadeInitialState workZone movingYFadeOut";
      document.getElementById('workZoneTitle').className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeOut";
      window.ShowProgress("");
    }
    else
      DrawStyleList(index);
  }
}

window.ShowProgress = (message) => {

  window.postMessage("nativeLog", "WV - Show progress");
  document.getElementById('progressLayer').className = "progressCircle offDownCenter fadeIn";
  document.getElementById('loadingMessage').innerHTML = message;
  document.getElementById('listOfStyles').className = "movingYFadeInitialState movingYFadeOut";
};

window.HideProgress = () => {
  window.postMessage("nativeLog", "WV - Hide progress");
  document.getElementById('progressLayer').className = "progressCircle offDownCenter fadeOut";
};

window.ReDrawAfterGettingData = (symbolData, index) => {
  window.postMessage("nativeLog", "WV - Redraw after getting style data");
  globalMergeSession[index].isProcessed = true;
  isLoadingStyleData = false;

  for (var i = 0; i < globalMergeSession[index].layerStyleWithDuplicates.duplicates.length; i++) {
    globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].thumbnail = symbolData.duplicates[i].thumbnail;
  }

  window.HideProgress(100);
  DrawStyleList(index);
  document.getElementById('listOfStyles').className = "movingYFadeInitialState workZone movingYFadeIn";
  document.getElementById('workZoneTitle').className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeIn";
}

window.onStyleClicked = (index, selectedStyle) => {
  window.postMessage("nativeLog", "WV - Style clicked. Updating selection status.");
  for (var i = 0; i < globalMergeSession[selectedStyle].layerStyleWithDuplicates.duplicates.length; i++) {
    var otherCheck = document.getElementById("duplicateItemCheck" + i);
    otherCheck.checked = false;
    var otherDiv = document.getElementById("duplicateItem" + i);
    otherDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter";
  }
  var selectedCheck = document.getElementById("duplicateItemCheck" + index);
  selectedCheck.checked = true;
  var selectedDiv = document.getElementById("duplicateItem" + index);
  selectedDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected";

  globalMergeSession[selectedStyle].isUnchecked = false;
  globalMergeSession[selectedStyle].selectedIndex = index;
  DrawStylesList(globalMergeSession);
}

window.DrawStyleList = (index) => {
  window.postMessage("nativeLog", "WV - Drawing styles");
  globalStyleDisplayed = index;
  var inner = "";
  for (var i = 0; i < globalMergeSession[index].layerStyleWithDuplicates.duplicates.length; i++) {
    window.postMessage("nativeLog", "WV --- Drawing style: "+globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].name);

    var isSelected = (globalMergeSession[index].selectedIndex == i)
    var selected = isSelected ? "selected" : "";
    var checked = isSelected ? "checked" : "";

    var checkbox = `<div class="colAuto roundCheckbox">
      <input type="checkbox" ${checked} id="duplicateItemCheck${i}"/>
      <label></label>
    </div>`;

    var contrastMode = globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].contrastMode ? "bgContrastMode" : "";

    inner += `<div id="duplicateItem${i}" class="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ${selected}" onclick="onStyleClicked(${i}, ${index})">
                ${checkbox}
                <div class="colAvailable verticalLayout thumbnailData" id="duplicateItemThumbnail${i}" >
                  <div class="rowAvailable padded ${contrastMode}"><div class="thumbnail" style='background-image:url("${globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].thumbnail}")'></div></div>
                  <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">${globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].name} (${globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].libraryName})</span></div>
                  <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">${globalMergeSession[index].layerStyleWithDuplicates.duplicates[i].description}</span></div>
                </div>
              </div>`;
  }

  var resultsTitle = document.getElementById("resultsTitle");
  var resultsDescription = document.getElementById("resultsDescription");
  resultsTitle.innerHTML = globalMergeSession[index].layerStyleWithDuplicates.name;
  resultsDescription.innerHTML = "There are " + globalMergeSession[index].layerStyleWithDuplicates.duplicates.length + " styles with this name. The style you decide to keep will be applied to all layers & overrides using any of the discarded styles, and the discarded styles will be removed from the local file.";

  var listOfStyles = document.getElementById('listOfStyles');
  listOfStyles.innerHTML = inner;
  listOfStyles.className = "movingYFadeInitialState workZone movingYFadeIn";

  window.postMessage("nativeLog", "WV - Completed drawing styles");
}

window.cancelAssignation = () => {
  window.postMessage('Cancel');
}

document.getElementById('chkIncludeLibraries').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Include libraries changed");
  window.postMessage('RecalculateDuplicates', document.getElementById('chkIncludeLibraries').checked);
});

document.getElementById('btnCancel').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Cancel");
  cancelAssignation();
});

document.getElementById('btnMerge').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Execute merge");
  window.postMessage('ExecuteMerge', globalMergeSession);
});

