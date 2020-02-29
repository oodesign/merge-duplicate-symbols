// disable the context menu (eg. the right click menu) to have a more native feel
// document.addEventListener('contextmenu', (e) => {
//   e.preventDefault()
// })
var globalStylesWithSimilarStyles;
var globalStyleDisplayed = 0;
var globalFiltersAppliedNum = 2;

window.DrawResultsList = (stylesWithSimilarStyles) => {
  globalStylesWithSimilarStyles = stylesWithSimilarStyles;

  if (globalFiltersAppliedNum > 0) {
    document.getElementById('filtersAppliedNum').innerHTML = globalFiltersAppliedNum;
    document.getElementById('filterCounter').className = "filterCounter";
  }
  else
    document.getElementById('filterCounter').className = "notDisplayed";

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
      <span>${globalStylesWithSimilarStyles[i].referenceStyle.name}</span>
    </div>`;

      inner += `<div id="resultStyle${i}" onclick="onSelectedStyleChanged(${i})" class="leftPanelListItem alignVerticalCenter ${selected}">${checkbox} </div>`
    }

    document.getElementById('resultsPanel').className = "colAuto leftPanel";

    lstResultingStyles.innerHTML = inner;

    btnMerge.disabled = (checkedCounter == 0);
    document.getElementById('lblIncludeLibraries').innerHTML = (checkedCounter != 0) ? "Include all enabled libraries text styles (you may lose the current selection)" : "Include all enabled libraries text styles";

    DrawStyleList(globalStyleDisplayed);
  }
  else {
    document.getElementById('resultsPanel').className = "colAuto leftPanel collapsed";
    document.getElementById('listOfStyles').className = "scrollable movingYFadeInitialState workZone movingYFadeOut";
    document.getElementById("workZoneTitle").className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeOut";
    document.getElementById('emptyStateMessage').innerHTML = "We couldn't find any styles that share the selected set of attributes.";
    document.getElementById('emptyState').className = "emptyState fadeIn";

    document.getElementById("resultsTitle").innerHTML = "";
    document.getElementById("resultsDescription").innerHTML = "";
  }
}

window.onSelectedStyleCheckChanged = (index) => {
  globalStylesWithSimilarStyles[index].isUnchecked = !globalStylesWithSimilarStyles[index].isUnchecked;
  DrawStylesList(globalStylesWithSimilarStyles);
  DrawStyleList(globalStyleDisplayed);
}

window.onSelectedStyleChanged = (index) => {
  for (var i = 0; i < globalStylesWithSimilarStyles.length; i++) {
    var otherDiv = document.getElementById("resultStyle" + i);
    otherDiv.className = "leftPanelListItem alignVerticalCenter";
  }

  var selectedDiv = document.getElementById("resultStyle" + index);
  selectedDiv.className = "leftPanelListItem alignVerticalCenter selected";

  DrawStyleList(index);
}

window.onStyleClicked = (index, selectedStyle) => {
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
  globalStyleDisplayed = index;
  var inner = "";
  for (var i = 0; i < globalStylesWithSimilarStyles[index].similarStyles.length; i++) {
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
                  <div class="rowAvailable padded ${contrastMode}"><div class="thumbnail" style='background-image:url("${globalStylesWithSimilarStyles[index].similarStyles[i].thumbnail}")'></div></div>
                  <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">${globalStylesWithSimilarStyles[index].similarStyles[i].name} (${globalStylesWithSimilarStyles[index].similarStyles[i].libraryName})</span></div>
                  <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">${globalStylesWithSimilarStyles[index].similarStyles[i].description}</span></div>
                </div>
              </div>`;
  }

  var resultsTitle = document.getElementById("resultsTitle");
  var resultsDescription = document.getElementById("resultsDescription");
  resultsTitle.innerHTML = globalStylesWithSimilarStyles[index].referenceStyle.name;
  resultsDescription.innerHTML = "There are " + globalStylesWithSimilarStyles[index].similarStyles.length + " styles with this same attributes. The style you decide to keep will be applied to all text layers & overrides using any of the discarded styles, and the discarded styles will be removed from the local file.";


  document.getElementById('emptyState').className = "emptyState fadeOut";
  document.getElementById('listOfStyles').innerHTML = inner;
  document.getElementById("workZoneTitle").className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeIn";
  listOfStyles.className = "scrollable movingYFadeInitialState workZone movingYFadeIn";

}

window.cancelAssignation = () => {
  window.postMessage('Cancel');
}

document.getElementById('btnCancel').addEventListener("click", () => {
  cancelAssignation();
});

document.getElementById('btnMerge').addEventListener("click", () => {
  window.postMessage('ExecuteMerge', globalStylesWithSimilarStyles);
});

document.getElementById('filterHeader').addEventListener("click", () => {
  onFilterExpanderClicked();
});

document.getElementById('chkIncludeLibraries').addEventListener("click", () => {
  onFilterChanged();
});

document.getElementById('btnFindMatchingStyles').addEventListener("click", () => {
  onFilterChanged();
});

document.getElementById('btnEmptyState').addEventListener("click", () => {
  onFilterChanged();
});




window.onFilterChanged = () => {
  var includeAllLibraries = document.getElementById('chkIncludeLibraries').checked;
  var checkSameFont = document.getElementById('checkSameFont').checked;
  var checkSameWeight = document.getElementById('checkSameWeight').checked;
  var checkSameSize = document.getElementById('checkSameSize').checked;
  var checkSameColor = document.getElementById('checkSameColor').checked;
  var checkSameParagraphSpacing = document.getElementById('checkSameParagraphSpacing').checked;
  var checkSameLineHeight = document.getElementById('checkSameLineHeight').checked;
  var checkSameAlignment = document.getElementById('checkSameAlignment').checked;
  var checkSameCharacterSpacing = document.getElementById('checkSameCharacterSpacing').checked;
  window.postMessage("RecalculateStyles", includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);

  globalFiltersAppliedNum = 0;
  globalFiltersAppliedNum += (checkSameFont ? 1 : 0)
  globalFiltersAppliedNum += (checkSameWeight ? 1 : 0)
  globalFiltersAppliedNum += (checkSameSize ? 1 : 0)
  globalFiltersAppliedNum += (checkSameColor ? 1 : 0)
  globalFiltersAppliedNum += (checkSameParagraphSpacing ? 1 : 0)
  globalFiltersAppliedNum += (checkSameLineHeight ? 1 : 0)
  globalFiltersAppliedNum += (checkSameAlignment ? 1 : 0)
  globalFiltersAppliedNum += (checkSameCharacterSpacing ? 1 : 0)
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

