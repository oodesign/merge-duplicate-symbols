// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})
var globalMergeSession;
var globalSymbolDisplayed = 0;
var isLoadingSymbolData = false;
var globalNumberOfSymbolsInDocument = 0;
var globalNumberOfSymbolsInLibraries = 0;
var globalNumberOfInstancesInDocument = 0;
var globalView = 1;
var includeLibrariesSetting = false;

window.LaunchMerge = (numberOfLocalSymbols, numberOfLibrarySymbols, numberOfInstancesInDocument, includeLibraries) => {
  globalNumberOfSymbolsInDocument = numberOfLocalSymbols;
  globalNumberOfSymbolsInLibraries = numberOfLibrarySymbols;
  globalNumberOfInstancesInDocument = numberOfInstancesInDocument;
  includeLibrariesSetting = includeLibraries;

  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', GetSymbols);
  } else {
    GetSymbols();
  }
}

window.GetSymbols = () => {
  window.postMessage("nativeLog", "WV - Get symbols");

  document.getElementById('chkIncludeLibraries').checked = includeLibrariesSetting;

  setTimeout(function () {
    var message = "We're looking for duplicates...";
    if (((globalNumberOfSymbolsInDocument + globalNumberOfSymbolsInLibraries) > 500) || (globalNumberOfInstancesInDocument > 5000)) {
      var andLinkedLibraries = (globalNumberOfSymbolsInLibraries > 0) ? "(and " + globalNumberOfSymbolsInLibraries + " in linked libraries)" : ""
      message = "We're looking for duplicates...<br/><br/>Wow, you have " + globalNumberOfSymbolsInDocument + " symbols here " + andLinkedLibraries + "! 🙈<br/> This may take a while... Wanna go get a coffee?"
    }
    window.ShowProgress(message);
    window.postMessage('RecalculateDuplicates');
  }, 200);
}



window.DrawDuplicateSymbols = (mergeSession) => {
  window.postMessage("nativeLog", "WV - Drawing duplicate symbols list");
  window.HideProgress();

  globalMergeSession = mergeSession;

  if (globalSymbolDisplayed >= globalMergeSession.length)
    globalSymbolDisplayed = 0;
  var lstDuplicateSymbols = document.getElementById('lstDuplicateSymbols');
  var btnMerge = document.getElementById('btnMerge');
  var inner = "";
  var checkedCounter = 0;

  if (globalMergeSession.length > 0) {

    for (var i = 0; i < globalMergeSession.length; i++) {
      var hasSelection = (globalMergeSession[i].selectedIndex >= 0);
      var labelFor = hasSelection ? `for="duplicatedSymbolCheck${i}"` : "";
      var checked = (hasSelection && !globalMergeSession[i].isUnchecked) ? "checked" : "";
      var handler = hasSelection ? `onclick="onSelectedSymbolCheckChanged(${i})"` : "";
      var isSelected = (i == globalSymbolDisplayed);
      var selected = isSelected ? "selected" : "";

      if (hasSelection && !globalMergeSession[i].isUnchecked) checkedCounter++;

      var checkbox = `<div class="squareCheckbox">
      <input type="checkbox" ${checked} id="duplicatedSymbolCheck${i}" ${handler}/>
      <label ${labelFor}></label>
      <span>${mergeSession[i].symbolWithDuplicates.name}</span>
    </div>`;

      inner += `<div id="duplicatedSymbol${i}" onclick="onSelectedSymbolChanged(${i})" class="leftPanelListItem alignVerticalCenter ${selected}">${checkbox} </div>`
    }

    window.postMessage("nativeLog", "WV - Drawing left panel symbol list");
    lstDuplicateSymbols.innerHTML = inner;
    btnMerge.disabled = (checkedCounter == 0);


    document.getElementById('lblIncludeLibraries').innerHTML = (checkedCounter != 0) ? "Include all enabled libraries symbols (you may lose the current selection)" : "Include all enabled libraries symbols";
    DrawSymbolList(globalSymbolDisplayed);
    ShowLayout();
  }
  else {
    HideLayout();
  }
}


window.ShowLayout = (index) => {
  window.postMessage("nativeLog", "WV - Show layout");
  document.getElementById('resultsPanel').className = "colAuto leftPanel";
  document.getElementById('btnCancel').className = "btnSecondary";
  document.getElementById('btnMerge').className = "btnPrimary";
  document.getElementById('chkLibraries').className = "roundCheckbox";
  document.getElementById('btnOK').className = "notDisplayed";
}

window.HideLayout = (index) => {
  window.postMessage("nativeLog", "WV - Hide layout");
  document.getElementById('emptyState').className = "emptyState fadeIn";
  document.getElementById('resultsPanel').className = "colAuto leftPanel collapsed";
  document.getElementById('btnCancel').className = "notDisplayed";
  document.getElementById('btnMerge').className = "notDisplayed";
  document.getElementById('chkLibraries').className = "notDisplayed";
  document.getElementById('btnOK').className = "btnPrimary";
}

window.onSelectedSymbolCheckChanged = (index) => {
  window.postMessage("nativeLog", "WV - Include symbol changed");
  globalMergeSession[index].isUnchecked = !globalMergeSession[index].isUnchecked;
  DrawDuplicateSymbols(globalMergeSession);
  DrawSymbolList(globalSymbolDisplayed);
}

window.onSelectedSymbolChanged = (index) => {
  window.postMessage("nativeLog", "WV - Left panel list selected symbol changed");
  if (!isLoadingSymbolData) {
    for (var i = 0; i < globalMergeSession.length; i++) {
      var otherDiv = document.getElementById("duplicatedSymbol" + i);
      otherDiv.className = "leftPanelListItem alignVerticalCenter";
    }

    var selectedDiv = document.getElementById("duplicatedSymbol" + index);
    selectedDiv.className = "leftPanelListItem alignVerticalCenter selected";

    if (!globalMergeSession[index].isProcessed) {
      isLoadingSymbolData = true;
      window.postMessage("GetSelectedSymbolData", index);
      document.getElementById('listOfSymbols').className = "movingYFadeInitialState workZone movingYFadeOut" + (globalView == 0 ? " cardsView" : "");
      document.getElementById('workZoneTitle').className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeOut";
      window.ShowProgress("");
    }
    else
      DrawSymbolList(index);
  }
}

window.ShowProgress = (message) => {
  window.postMessage("nativeLog", "WV - Show progress");
  document.getElementById('progressLayer').className = "progressCircle offDownCenter fadeIn";
  document.getElementById('loadingMessage').innerHTML = message;
  document.getElementById('listOfSymbols').className = "movingYFadeInitialState movingYFadeOut" + (globalView == 0 ? " cardsView" : "");
};

window.HideProgress = () => {
  window.postMessage("nativeLog", "WV - Hide progress");
  document.getElementById('progressLayer').className = "progressCircle offDownCenter fadeOut";
};

window.ReDrawAfterGettingData = (symbolData, index) => {

  window.postMessage("nativeLog", "WV - Redraw after getting symbol data");
  globalMergeSession[index].isProcessed = true;
  isLoadingSymbolData = false;

  for (var i = 0; i < globalMergeSession[index].symbolWithDuplicates.duplicates.length; i++) {
    globalMergeSession[index].symbolWithDuplicates.duplicates[i].thumbnail = symbolData.duplicates[i].thumbnail;
    globalMergeSession[index].symbolWithDuplicates.duplicates[i].symbolInstances = symbolData.duplicates[i].symbolInstances;
    globalMergeSession[index].symbolWithDuplicates.duplicates[i].numInstances = symbolData.duplicates[i].numInstances;
    globalMergeSession[index].symbolWithDuplicates.duplicates[i].symbolOverrides = symbolData.duplicates[i].symbolOverrides;
    globalMergeSession[index].symbolWithDuplicates.duplicates[i].numOverrides = symbolData.duplicates[i].numOverrides;
  }

  window.HideProgress(100);
  DrawSymbolList(index);
  document.getElementById('listOfSymbols').className = "movingYFadeInitialState workZone movingYFadeIn" + (globalView == 0 ? " cardsView" : "");
  document.getElementById('workZoneTitle').className = "colAvailable verticalLayout movingYFadeInitialState movingYFadeIn";
}



window.onSymbolClicked = (index, selectedSymbol) => {
  window.postMessage("nativeLog", "WV - Symbol clicked. Updating selection status.");
  for (var i = 0; i < globalMergeSession[selectedSymbol].symbolWithDuplicates.duplicates.length; i++) {
    var otherCheck = document.getElementById("duplicateItemCheck" + i);
    otherCheck.checked = false;
    var otherDiv = document.getElementById("duplicateItem" + i);
    otherDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter";
  }
  var selectedCheck = document.getElementById("duplicateItemCheck" + index);
  selectedCheck.checked = true;
  var selectedDiv = document.getElementById("duplicateItem" + index);
  selectedDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected";

  globalMergeSession[selectedSymbol].isUnchecked = false;
  globalMergeSession[selectedSymbol].selectedIndex = index;
  DrawDuplicateSymbols(globalMergeSession);
}

window.DrawSymbolList = (index) => {
  window.postMessage("nativeLog", "WV - Drawing symbols");
  globalSymbolDisplayed = index;
  var inner = "";
  for (var i = 0; i < globalMergeSession[index].symbolWithDuplicates.duplicates.length; i++) {


    window.postMessage("nativeLog", "WV --- Drawing symbol: " + globalMergeSession[index].symbolWithDuplicates.duplicates[i].name);

    var isSelected = (globalMergeSession[index].selectedIndex == i)
    var selected = isSelected ? "selected" : "";
    var checked = isSelected ? "checked" : "";

    var checkbox = `<div class="colAuto roundCheckbox">
      <input type="checkbox" ${checked} id="duplicateItemCheck${i}"/>
      <label></label>
    </div>`;


    inner += `<div id="duplicateItem${i}" class="thumbnailContainer symbolPreview  alignVerticalCenter ${selected}" onclick="onSymbolClicked(${i}, ${index})">
                ${checkbox}
                <div class="colAvailable verticalLayout thumbnailData" id="duplicateItemThumbnail${i}" >
                  <div class="rowAvailable thumbnail" style='background-image:url("data:image/png;base64,${globalMergeSession[index].symbolWithDuplicates.duplicates[i].thumbnail}")'></div>
                  <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">${globalMergeSession[index].symbolWithDuplicates.duplicates[i].numInstances} instances - Used in ${globalMergeSession[index].symbolWithDuplicates.duplicates[i].numOverrides} overrides</span></div>
                  <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">${globalMergeSession[index].symbolWithDuplicates.duplicates[i].libraryName}</span></div>
                </div>
              </div>`;
  }


  var resultsTitle = document.getElementById("resultsTitle");
  var resultsDescription = document.getElementById("resultsDescription");
  resultsTitle.innerHTML = globalMergeSession[index].symbolWithDuplicates.name;
  resultsDescription.innerHTML = "There are " + globalMergeSession[index].symbolWithDuplicates.duplicates.length + " symbols with this name. Choose the one you want to keep and press OK. The other symbols will be removed, and all of their instances will be replaced by the one you chose to keep.";
  document.getElementById("viewSelector").classList.remove("notDisplayed");


  var listOfSymbols = document.getElementById('listOfSymbols');
  listOfSymbols.innerHTML = inner;
  listOfSymbols.className = "movingYFadeInitialState workZone movingYFadeIn" + (globalView == 0 ? " cardsView" : "");

  window.postMessage("nativeLog", "WV - Completed drawing symbols");
}

document.getElementById('chkIncludeLibraries').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Include libraries check changed");
  window.ShowProgress("");
  window.postMessage('RecalculateDuplicates', document.getElementById('chkIncludeLibraries').checked);
});

window.cancelAssignation = () => {
  window.postMessage('Cancel');
}

document.getElementById('btnCancel').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Cancel");
  cancelAssignation();
});

document.getElementById('btnMerge').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Execute merge");
  window.postMessage('ExecuteMerge', globalMergeSession);
});

document.getElementById('btnOK').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - OK-Close");
  cancelAssignation();
});

document.getElementById('btnCardView').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Changed to cards view");
  globalView = 0;
  document.getElementById('listOfSymbols').classList.add("cardsView");
  document.getElementById('btnListView').classList.remove("selected");
  document.getElementById('btnCardView').classList.add("selected");
});

document.getElementById('btnListView').addEventListener("click", () => {
  window.postMessage("nativeLog", "WV - Change to list view");
  globalView = 1;
  document.getElementById('listOfSymbols').classList.remove("cardsView");
  document.getElementById('btnCardView').classList.remove("selected");
  document.getElementById('btnListView').classList.add("selected");

});






