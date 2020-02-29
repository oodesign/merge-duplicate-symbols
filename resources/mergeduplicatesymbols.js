// disable the context menu (eg. the right click menu) to have a more native feel
// document.addEventListener('contextmenu', (e) => {
//   e.preventDefault()
// })
var globalMergeSession;

window.DrawDuplicateSymbols = (mergeSession) => {
  globalMergeSession = mergeSession;
  document.getElementById('lstDuplicateSymbols').size=mergeSession.length;
  for(var i=0;i<mergeSession.length;i++)
  { 
    var opt = document.createElement("option");
    opt.value= i;
    opt.innerHTML = mergeSession[i].name;
    document.getElementById('lstDuplicateSymbols').appendChild(opt);
  }
  document.getElementById('lstDuplicateSymbols').selectedIndex=0;
  window.postMessage('GetSymbolData',document.getElementById('lstDuplicateSymbols').selectedIndex);
  DrawSymbolList(0);
}

window.onSelectedSymbolChanged = () => {

  DrawSymbolList(document.getElementById('lstDuplicateSymbols').selectedIndex);
  
  //window.postMessage('GetSymbolData',document.getElementById('lstDuplicateSymbols').selectedIndex);
}

window.DrawSymbolList = (index) => {
  var inner="";
  for (var i = 0; i < globalMergeSession[index].duplicatedSymbolsData.length; i++) {
    inner += `<div class="thumbnailContainer stylePreview"><div class="thumbnail" id="duplicateSymbol${i}" style='background-image:url("${globalMergeSession[index].duplicatedSymbolsData[i].thumbnail}")'></div></div>`;
  }

  var listOfSymbols = document.getElementById('listOfSymbols');
  listOfSymbols.innerHTML = inner;
  listOfSymbols.className= "scrollable movingYFadeInitialState movingYFadeIn";
}

window.cancelAssignation = () => {
  window.postMessage('Cancel');
}

document.getElementById('btnCancel').addEventListener("click", () => {
  cancelAssignation();
});

