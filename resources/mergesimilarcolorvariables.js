// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})
var globalStylesWithSimilarStyles;
var globalStyleDisplayed = 0;
var globalFiltersAppliedNum = 2;

window.UpdateSettings = (includeLibraries) => {
  if (includeLibraries != null)
    document.getElementById('chkIncludeLibraries').checked = includeLibraries;
}


window.DrawResultsList = (stylesWithSimilarStyles) => {

  window.postMessage("nativeLog", "WV - Drawing results list");
  globalStylesWithSimilarStyles = stylesWithSimilarStyles;



  if (globalStylesWithSimilarStyles.length > 0) {
    var lstResultingStyles = document.getElementById('lstResultingStyles');
    var btnMerge = document.getElementById('btnMerge');
    var inner = "";
    var checkedCounter = 0;
    for (var i = 0; i < globalStylesWithSimilarStyles.length; i++) {
      var hasSelection = (globalStylesWithSimilarStyles[i].selectedIndex >= 0);
      var labelFor = hasSelection ? `for="resultStyleCheck${i}"` : "";
      var checked = (hasSelection && !globalStylesWithSimilarStyles[i].isUnchecked) ? "checked" : "";
      var handler = hasSelection ? `onclick="onSelectedStyleCheckChanged(${i})"` : "";
      var isSelected = (i == globalStyleDisplayed);
      var selected = isSelected ? "selected" : "";

      if (hasSelection && !globalStylesWithSimilarStyles[i].isUnchecked) checkedCounter++;

      var checkbox = `<div class="squareCheckbox">
      <input type="checkbox" ${checked} id="resultStyleCheck${i}" ${handler}/>
      <label ${labelFor}></label>
      <div class="text">${globalStylesWithSimilarStyles[i].referenceStyle.name}</div>
    </div>`;

      inner += `<div id="resultStyle${i}" onclick="onSelectedStyleChanged(${i})" class="leftPanelListItem alignVerticalCenter ${selected}">${checkbox} </div>`
    }

    document.getElementById('resultsPanel').className = "colAuto leftPanel";

    window.postMessage("nativeLog", "WV - Drawing left panel style list");
    lstResultingStyles.innerHTML = inner;

    btnMerge.disabled = (checkedCounter == 0);
    document.getElementById('lblIncludeLibraries').innerHTML = (checkedCounter != 0) ? "Include all enabled libraries color variables (you may lose the current selection)" : "Include all enabled libraries color variables";

    DrawStyleList(globalStyleDisplayed);
  }
  else {
    window.postMessage("nativeLog", "WV - No similar color variables. Drawing empty state.");
    document.getElementById('resultsPanel').className = "colAuto leftPanel collapsed";
    document.getElementById('listOfStyles').className = "scrollable movingYFadeInitialState workZone movingYFadeOut";
    document.getElementById("workZoneTitle").className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeOut";
    document.getElementById('emptyStateMessage').innerHTML = "We couldn't find any color variables that are that similar.";
    document.getElementById('emptyState').className = "emptyState fadeIn";

    document.getElementById("resultsTitle").innerHTML = "";
    document.getElementById("resultsDescription").innerHTML = "";
  }
}

window.onSelectedStyleCheckChanged = (index) => {
  window.postMessage("nativeLog", "WV - Include style changed");
  globalStylesWithSimilarStyles[index].isUnchecked = !globalStylesWithSimilarStyles[index].isUnchecked;
  DrawStylesList(globalStylesWithSimilarStyles);
  DrawStyleList(globalStyleDisplayed);
}

window.onSelectedStyleChanged = (index) => {
  window.postMessage("nativeLog", "WV - Left panel list selected style changed.");
  for (var i = 0; i < globalStylesWithSimilarStyles.length; i++) {
    var otherDiv = document.getElementById("resultStyle" + i);
    otherDiv.className = "leftPanelListItem alignVerticalCenter";
  }

  var selectedDiv = document.getElementById("resultStyle" + index);
  selectedDiv.className = "leftPanelListItem alignVerticalCenter selected";

  DrawStyleList(index);
}

window.onStyleClicked = (index, selectedStyle) => {
  window.postMessage("nativeLog", "WV - Style clicked. Updating selection status.");
  for (var i = 0; i < globalStylesWithSimilarStyles[selectedStyle].similarStyles.length; i++) {
    var otherCheck = document.getElementById("duplicateItemCheck" + i);
    otherCheck.checked = false;
    var otherDiv = document.getElementById("duplicateItem" + i);
    otherDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter";
  }

  var selectedCheck = document.getElementById("duplicateItemCheck" + index);
  selectedCheck.checked = true;
  var selectedDiv = document.getElementById("duplicateItem" + index);
  selectedDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected";

  globalStylesWithSimilarStyles[selectedStyle].selectedIndex = index;
  DrawResultsList(globalStylesWithSimilarStyles);
}

window.DrawStyleList = (index) => {
  window.postMessage("nativeLog", "WV - Drawing color variables");
  globalStyleDisplayed = index;
  var inner = "";
  for (var i = 0; i < globalStylesWithSimilarStyles[index].similarStyles.length; i++) {
    window.postMessage("nativeLog", "WV --- Drawing style: " + globalStylesWithSimilarStyles[index].similarStyles[i].name);

    var isSelected = (globalStylesWithSimilarStyles[index].selectedIndex == i)
    var selected = isSelected ? "selected" : "";
    var checked = isSelected ? "checked" : "";

    var checkbox = `<div class="colAuto roundCheckbox">
      <input type="checkbox" ${checked} id="duplicateItemCheck${i}"/>
      <label></label>
    </div>`;

    var contrastMode = globalStylesWithSimilarStyles[index].similarStyles[i].contrastMode ? "bgContrastMode" : "";

    inner += `<div id="duplicateItem${i}" class="thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter ${selected}" onclick="onStyleClicked(${i}, ${index})">
                ${checkbox}
                <div class="colAvailable verticalLayout thumbnailData" id="duplicateItemThumbnail${i}" >
                  <div class="rowAvailable padded ${contrastMode}"><div class="thumbnail" style='background-image:url("data:image/png;base64,${globalStylesWithSimilarStyles[index].similarStyles[i].thumbnail}")'></div></div>
                  <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">${globalStylesWithSimilarStyles[index].similarStyles[i].name} (${globalStylesWithSimilarStyles[index].similarStyles[i].libraryName})</span></div>
                  <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">${globalStylesWithSimilarStyles[index].similarStyles[i].description}</span></div>
                </div>
              </div>`;
  }

  var resultsTitle = document.getElementById("resultsTitle");
  var resultsDescription = document.getElementById("resultsDescription");
  resultsTitle.innerHTML = globalStylesWithSimilarStyles[index].referenceStyle.name;
  resultsDescription.innerHTML = "There are " + globalStylesWithSimilarStyles[index].similarStyles.length + " color variables with this same attributes. The style you decide to keep will be applied to all layers & overrides using any of the discarded styles, and the discarded styles will be removed from the local file.";


  document.getElementById('emptyState').className = "emptyState fadeOut";
  document.getElementById('listOfStyles').innerHTML = inner;
  document.getElementById("workZoneTitle").className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeIn";
  document.getElementById('listOfStyles').className = "scrollable movingYFadeInitialState workZone movingYFadeIn";

  window.postMessage("nativeLog", "WV - Completed drawing color variables");
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
  window.postMessage('ExecuteMerge', globalStylesWithSimilarStyles);
});

document.getElementById('filterHeader').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Show/hide filters");
  onFilterExpanderClicked();
});

document.getElementById('chkIncludeLibraries').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Include libraries check changed");
  onFilterChanged();
});

document.getElementById('btnFindMatchingStyles').addEventListener("click", () => {
  onFilterChanged();
});

document.getElementById('btnEmptyState').addEventListener("click", () => {
  onFilterChanged();
});

document.getElementById('toleranceSlider').addEventListener("input", () => {
  document.getElementById('toleranceVal').innerHTML = "(" + document.getElementById('toleranceSlider').value + ")";
});






window.onFilterChanged = () => {
  window.postMessage("nativeLog", "WV - Find matching color variables");
  var includeAllLibraries = document.getElementById('chkIncludeLibraries').checked;
  var tolerance = document.getElementById('toleranceSlider').value;
  window.postMessage("RecalculateVariables", includeAllLibraries, tolerance);

  globalFiltersAppliedNum = 0;
  globalFiltersAppliedNum += (checkSameFillColor ? 1 : 0)
  globalFiltersAppliedNum += (checkSameBorderColor ? 1 : 0)
  globalFiltersAppliedNum += (checkSameBorderThickness ? 1 : 0)
  globalFiltersAppliedNum += (checkSameShadowColor ? 1 : 0)
  globalFiltersAppliedNum += (checkSameShadowXYBlurSpread ? 1 : 0)
}


window.onFilterExpanderClicked = () => {
  var filterArea = document.getElementById("filterArea");
  if (filterArea.className.toString().indexOf("collapsed") >= 0) {
    filterArea.className = "colAuto filterArea verticalLayout";
  }
  else {
    filterArea.className = "colAuto filterArea verticalLayout collapsed";
  }
}

