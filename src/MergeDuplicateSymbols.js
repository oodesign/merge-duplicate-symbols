import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
var UI = require('sketch/ui')
var Helpers = require("./Helpers");

const webviewIdentifier = 'merge-duplicates.webview'
const webviewMSSIdentifier = 'merge-selected-symbols.webview'



function MergeSymbols(symbolToMerge, symbolToKeep) {


  Helpers.clog("-- Starting Merge Symbols");

  var symbolsToRemove = [];
  var symbolToApply;
  var instancesChanged = 0;
  var overridesChanged = 0;
  var symbolsRemoved = 0;


  Helpers.clog("---- Processing symbols to remove");
  symbolToApply = symbolToMerge.duplicates[symbolToKeep].symbol;
  if (symbolToMerge.duplicates[symbolToKeep].isForeign) {
    symbolToApply = Helpers.importSymbolFromLibrary(symbolToMerge.duplicates[symbolToKeep]);
  }

  for (var i = 0; i < symbolToMerge.duplicates.length; i++) {
    if (i != symbolToKeep) {
      symbolsToRemove.push(symbolToMerge.duplicates[i].symbol);
    }
  }

  Helpers.clog("---- Processing instances and overrides to update");
  Helpers.ctime("Merging symbol:" + symbolToMerge.name);
  for (var i = 0; i < symbolToMerge.duplicates.length; i++) {
    if (i != symbolToKeep) {
      if (!symbolToMerge.duplicates[i].isForeign)
        symbolsRemoved++;

      Helpers.ctime("-- Taking instances and overrides");
      var instancesOfSymbol = symbolToMerge.duplicates[i].symbolInstances;
      var instancesWithOverrides = symbolToMerge.duplicates[i].symbolOverrides;
      var wasUnlinked = false;
      Helpers.ctimeEnd("-- Taking instances and overrides");


      Helpers.ctime("-- Unlinking from library");
      Helpers.clog("------ Checking if symbol to merge is foreign");
      if (symbolToMerge.duplicates[i].isForeign && (symbolToMerge.duplicates[i].externalLibrary == null)) {
        symbolToMerge.duplicates[i].symbol.unlinkFromLibrary();
        wasUnlinked = true;
      }
      Helpers.ctimeEnd("-- Unlinking from library");


      Helpers.ctime("-- Updating overrides");
      Helpers.clog("---- Updating overrides (" + instancesWithOverrides.length + ")");
      instancesWithOverrides.forEach(function (instanceWithOverrides) {
        var overrides = instanceWithOverrides.overrides.filter(ov => ov.value == symbolToMerge.duplicates[i].symbol.symbolId);
        overrides.forEach(override => {
          try {
            Helpers.clog("------ Updating override for " + instanceWithOverrides.name);
            instanceWithOverrides.setOverrideValue(override, symbolToApply.symbolId.toString());
          } catch (e) {
            Helpers.clog("---- ERROR: Couldn't update override for " + instanceWithOverrides.name);
          }
        });
      });
      Helpers.ctimeEnd("-- Updating overrides");


      Helpers.ctime("-- Updating instances");
      Helpers.clog("---- Updating instances (" + instancesOfSymbol.length + ")");
      instancesOfSymbol.forEach(function (instance) {
        try {
          Helpers.clog("------ Updating instance " + instance.name + ", in artboard " + instance.getParentArtboard().name);
        }
        catch (e) {
          Helpers.clog("------ Updating instance " + instance.name + ". Instance doesn't belong to any specific artboard.");
        }
        instance.master = symbolToApply;
        instancesChanged++;
      });

      Helpers.ctimeEnd("-- Updating instances");

    }
  }
  Helpers.ctimeEnd("Merging symbol:" + symbolToMerge.name);

  Helpers.clog("---- Finalized intance and override replacement.");
  Helpers.clog("---- Removing discarded symbols.");


  symbolsToRemove.forEach(function (symbolToRemove) {
    symbolToRemove.remove();
  });

  Helpers.clog("---- Merge completed.");

  return [symbolsRemoved, instancesChanged, overridesChanged];
}


export function MergeSelectedSymbols(context) {

  Helpers.clog("----- Merge selected symbols -----");

  const options = {
    identifier: webviewMSSIdentifier,
    width: 900,
    height: 700,
    remembersWindowFrame: true,
    show: false,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;
  var mssmergeSession = [];

  var selectedLayers = Helpers.document.selectedLayers.layers;
  var selection = [];


  if (selectedLayers.length < 2) {
    UI.message("Wop! Select at least two symbols and run the plugin again :)");
    onShutdown(webviewMSSIdentifier);
  } else {
    var areAllSymbols = true;
    selectedLayers.forEach(function (layer) {
      if (layer.type.localeCompare("SymbolMaster") != 0)
        areAllSymbols = false;
    });
    if (!areAllSymbols) {
      UI.message("Only symbols can be merged");
    } else {
      Helpers.clog("Loading webview");
      selectedLayers.forEach(function (layer) {
        selection.push({
          "symbol": layer,
          "foreign": false,
          "library": null
        });
      });
      browserWindow.loadURL(require('../resources/mergeselectedsymbols.html'));
    }
  }

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript(`LaunchMerge(${JSON.stringify(selection.length)})`).catch(console.error);
  })

  webContents.on('GetSymbolData', () => {
    mssmergeSession = [];
    mssmergeSession = Helpers.getDuplicateSymbols(context, selection, false, true);
    for (var i = 0; i < mssmergeSession.length; i++) {
      Helpers.GetSpecificSymbolData(context, mssmergeSession, i);
    }
    webContents.executeJavaScript(`DrawSymbolList(${JSON.stringify(mssmergeSession)})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  })

  webContents.on('Cancel', () => {
    onShutdown(webviewMSSIdentifier);
  });

  webContents.on('ExecuteMerge', (editedMergeSession, selectedIndex) => {
    Helpers.clog("Execute merge. Selected symbol: " + mssmergeSession[0].duplicates[selectedIndex].name);
    var mergeResults = [0, 0, 0];

    mergeResults = MergeSymbols(mssmergeSession[0], selectedIndex);

    var replacedStuff = "";
    if (mergeResults[1] > 0 && mergeResults[2])
      replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";
    else if (mergeResults[1] > 0)
      replacedStuff = " and replaced " + mergeResults[1] + " instances.";
    else if (mergeResults[2] > 0)
      replacedStuff = " and updated " + mergeResults[2] + " overrides.";
    else
      replacedStuff = ".";


    Helpers.clog("Completed merge. Removed " + mergeResults[0] + " symbols" + replacedStuff);

    UI.message("Hey ho! You just removed " + mergeResults[0] + " symbols" + replacedStuff + " Amazing!");

    onShutdown(webviewMSSIdentifier);
  });
};

export function MergeDuplicateSymbols(context) {

  Helpers.clog("----- Merge duplicate symbols (with the same name) -----");

  const options = {
    identifier: webviewIdentifier,
    width: 1200,
    height: 700,
    remembersWindowFrame: true,
    show: false,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;

  var mergeSession = [];
  var mergeSessionMap = new Map();
  var symbolsMap, allDuplicates;


  Helpers.ctime("countAllSymbols");
  var numberOfSymbols = Helpers.countAllSymbols(context, Helpers.getLibrariesEnabled());
  Helpers.ctimeEnd("countAllSymbols");


  Helpers.clog("Local symbols: " + numberOfSymbols.symbols + ". Library symbols:" + numberOfSymbols.foreignSymbols + ". Document instances:" + numberOfSymbols.documentInstances + ". Libraries enabled:" + Helpers.getLibrariesEnabled());



  browserWindow.loadURL(require('../resources/mergeduplicatesymbols.html'));
  Helpers.clog("Webview called");

  function CalculateDuplicates(includeLibraries) {

    Helpers.clog("Processing duplicates. Include libraries: " + includeLibraries);

    Helpers.ctime("Finding duplicates");
    allDuplicates = Helpers.getAllDuplicateSymbolsByName(context, includeLibraries);
    Helpers.ctimeEnd("Finding duplicates");

    Helpers.ctime("getSymbolsMap");
    symbolsMap = Helpers.getSymbolsMap(context, allDuplicates);
    Helpers.ctimeEnd("getSymbolsMap");

    symbolsMap.forEach(function (symbolMapItem, symbol) {
      Helpers.clog("-- Symbol " + symbol.name + " has " + symbolMapItem.directInstances.length + " direct instances, and " + symbolMapItem.instancesWithOverrides.length + " instancesWithOverrides");
    });

    Helpers.clog("-- Found " + allDuplicates.length + " duplicates");
    if (allDuplicates.length > 0) {
      mergeSession = [];
      Helpers.GetSpecificSymbolData(allDuplicates[0], symbolsMap);
      allDuplicates.forEach(duplicate => {
        var reducedSymbol = getReducedDuplicateData(duplicate);
        mergeSessionMap.set(reducedSymbol, duplicate);
        mergeSession.push({
          "symbolWithDuplicates": reducedSymbol,
          "selectedIndex": -1,
          "isUnchecked": false,
          "isProcessed": (mergeSession.length == 0) ? true : false
        });
      });
    }
    Helpers.clog("End of processing duplicates");
  }

  function getReducedDuplicateData(symbol) {
    var reducedDuplicate = {
      "name": "" + symbol.name,
      "duplicates": [],
    }
    symbol.duplicates.forEach(duplicate => {
      reducedDuplicate.duplicates.push({
        "name": "" + duplicate.name,
        "isForeign": duplicate.isForeign,
        "thumbnail": duplicate.thumbnail,
        "numInstances": duplicate.numInstances,
        "numOverrides": duplicate.numOverrides,
        "libraryName": duplicate.libraryName,
        "isSelected": false
      });
    });

    return reducedDuplicate;
  }

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript(`LaunchMerge(${JSON.stringify(numberOfSymbols.symbols)},${JSON.stringify(numberOfSymbols.foreignSymbols)},${JSON.stringify(numberOfSymbols.documentInstances)},${Helpers.getLibrariesEnabled()})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  })

  webContents.on('Cancel', () => {
    onShutdown(webviewIdentifier);
  });

  webContents.on('GetSelectedSymbolData', (index) => {
    Helpers.GetSpecificSymbolData(allDuplicates[index], symbolsMap);
    var stringify = JSON.stringify(getReducedDuplicateData(allDuplicates[index]))
    webContents.executeJavaScript(`ReDrawAfterGettingData(${stringify},${index})`).catch(console.error);
  });

  webContents.on('RecalculateDuplicates', (includeLibraries) => {
    if (includeLibraries != null)
      CalculateDuplicates(includeLibraries);
    else
      CalculateDuplicates(Helpers.getLibrariesEnabled());

    Helpers.clog("Drawing duplicates to webview");
    var stringify = JSON.stringify(mergeSession);
    webContents.executeJavaScript(`DrawDuplicateSymbols(${stringify})`).catch(console.error);
  });

  webContents.on('ExecuteMerge', (editedMergeSession) => {
    var duplicatesSolved = 0;
    var mergedSymbols = 0;
    var mergeResults = [0, 0, 0];
    Helpers.clog("Executing Merge");
    for (var i = 0; i < editedMergeSession.length; i++) {
      Helpers.clog("-- Merging " + mergeSession[i].symbolWithDuplicates.name);
      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        for (var j = 0; j < mergeSession[i].symbolWithDuplicates.duplicates.length; j++) {
          mergedSymbols++;
        }

        var localMergeResults = MergeSymbols(mergeSessionMap.get(mergeSession[i].symbolWithDuplicates), mergeSession[i].selectedIndex);
        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];

        duplicatesSolved++;
      }
    }

    onShutdown(webviewIdentifier);

    var replacedStuff = "";
    if (mergeResults[1] > 0 && mergeResults[2])
      replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";
    else if (mergeResults[1] > 0)
      replacedStuff = " and replaced " + mergeResults[1] + " instances.";
    else if (mergeResults[2] > 0)
      replacedStuff = " and updated " + mergeResults[2] + " overrides.";
    else
      replacedStuff = ".";

    if (duplicatesSolved > 0) {
      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " symbols" + replacedStuff);
      UI.message("Hey ho! You just removed " + mergeResults[0] + " symbols" + replacedStuff + " Amazing!");
    }
    else {
      Helpers.clog("Completed merge. No symbols were merged.");
      UI.message("No symbols were merged.");
    }
  });


};

export function onShutdown(webviewID) {
  const existingWebview = getWebview(webviewID)
  if (existingWebview) {
    existingWebview.close()
  }
}