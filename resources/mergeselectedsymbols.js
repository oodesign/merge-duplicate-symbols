// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
})
var globalMergeSession;
var globalSelectedSymbol = -1;
var globalNumberOfSymbolsInDocument = 0;
var globalView = 1;

window.LaunchMerge = (numberOfSymbols) => {
  globalNumberOfSymbolsInDocument = numberOfSymbols;
  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', GetSymbols);
  } else {
    GetSymbols();
  }
}

window.GetSymbols = () => {
  setTimeout(function () {
    var message = "We're loading thumbnails...";
    if (globalNumberOfSymbolsInDocument > 10)
      message = "We're loading thumbnails...<br/><br/>Wop, you have " + globalNumberOfSymbolsInDocument + " symbols here! 🙈<br/> This may take a while..."
    window.ShowProgress(message);
    window.postMessage('GetSymbolData');
  }, 200);
}


window.ShowProgress = (message) => {

  document.getElementById('progressLayer').className = "progressCircle offDownCenter fadeIn";
  document.getElementById('loadingMessage').innerHTML = message;
  document.getElementById('listOfSymbols').className = "movingYFadeInitialState movingYFadeOut" + (globalView == 0 ? " cardsView" : "");
};

window.HideProgress = () => {
  document.getElementById('progressLayer').className = "progressCircle offDownCenter fadeOut";
};

window.onSymbolClicked = (index) => {

  var symbolWithDuplicates = globalMergeSession[0];
  var btnMerge = document.getElementById('btnMerge');
  for (var i = 0; i < symbolWithDuplicates.duplicates.length; i++) {
    var otherCheck = document.getElementById("duplicateItemCheck" + i);
    otherCheck.checked = false;
    var otherDiv = document.getElementById("duplicateItem" + i);
    otherDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter";
    symbolWithDuplicates.duplicates[i].isSelected = false;
  }

  var selectedCheck = document.getElementById("duplicateItemCheck" + index);
  selectedCheck.checked = true;
  var selectedDiv = document.getElementById("duplicateItem" + index);
  selectedDiv.className = "thumbnailContainer symbolPreview horizontalLayout alignVerticalCenter selected";

  btnMerge.disabled = false;

  symbolWithDuplicates.duplicates[index].isSelected = true;
  globalSelectedSymbol = index;
  DrawSymbolList(globalMergeSession);
}


window.DrawSymbolList = (mergeSession) => {

  window.HideProgress();
  globalMergeSession = mergeSession;
  var symbolWithDuplicates = globalMergeSession[0];

  var inner = "";
  for (var i = 0; i < symbolWithDuplicates.duplicates.length; i++) {

    var selected = symbolWithDuplicates.duplicates[i].isSelected ? "selected" : "";
    var checked = symbolWithDuplicates.duplicates[i].isSelected ? "checked" : "";

    var checkbox = `<div class="colAuto roundCheckbox">
      <input type="checkbox" ${checked} id="duplicateItemCheck${i}"/>
      <label></label>
    </div>`;

    inner += `<div id="duplicateItem${i}" class="thumbnailContainer symbolPreview alignVerticalCenter ${selected}" onclick="onSymbolClicked(${i})">
                ${checkbox}
                <div class="colAvailable verticalLayout thumbnailData" id="duplicateItemThumbnail${i}" >
                  <div class="rowAvailable thumbnail" style='background-image:url("${symbolWithDuplicates.duplicates[i].thumbnail}")'></div>
                  <div class="rowAuto primaryText displayFlex"><span class="alignHorizontalCenter">${symbolWithDuplicates.duplicates[i].name} (${symbolWithDuplicates.duplicates[i].libraryName})</span></div>
                  <div class="rowAuto secondaryText displayFlex"><span class="alignHorizontalCenter">${symbolWithDuplicates.duplicates[i].numInstances} instances - Used in ${symbolWithDuplicates.duplicates[i].numOverrides} overrides</span></div>
                </div>
                </div>
              </div>`;
  }

  var resultsTitle = document.getElementById("resultsTitle");
  var resultsDescription = document.getElementById("resultsDescription");
  resultsTitle.innerHTML = "Merging selected symbols";
  resultsDescription.innerHTML = "You're about to merge this symbols. Choose the one you want to keep and press OK. The other symbols will be removed, and all of their instances will be replaced by the one you chose to keep.";
  document.getElementById("viewSelector").classList.remove("notDisplayed");


  var listOfSymbols = document.getElementById('listOfSymbols');
  listOfSymbols.innerHTML = inner;
  listOfSymbols.className = "scrollable movingYFadeInitialState workZone movingYFadeIn" + (globalView == 0 ? " cardsView" : "");
}

window.cancelAssignation = () => {
  window.postMessage('Cancel');
}

document.getElementById('btnCancel').addEventListener("click", () => {
  cancelAssignation();
});

document.getElementById('btnMerge').addEventListener("click", () => {
  window.postMessage('ExecuteMerge', globalMergeSession, globalSelectedSymbol);
});

document.getElementById('btnCardView').addEventListener("click", () => {
  globalView = 0;
  document.getElementById('listOfSymbols').classList.add("cardsView");
  document.getElementById('btnListView').classList.remove("selected");
  document.getElementById('btnCardView').classList.add("selected");
});

document.getElementById('btnListView').addEventListener("click", () => {
  globalView = 1;
  document.getElementById('listOfSymbols').classList.remove("cardsView");
  document.getElementById('btnCardView').classList.remove("selected");
  document.getElementById('btnListView').classList.add("selected");
  
});

