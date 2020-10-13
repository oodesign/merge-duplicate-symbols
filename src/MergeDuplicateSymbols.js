import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import { debugLog } from './Helpers';
const Helpers = require("./Helpers");

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
  for (var i = 0; i < symbolToMerge.duplicates.length; i++) {
    if (i != symbolToKeep) {
      if (!symbolToMerge.duplicates[i].isForeign)
        symbolsRemoved++;

      var instancesOfSymbol = symbolToMerge.duplicates[i].symbolInstances;
      var overridesOfSymbol = symbolToMerge.duplicates[i].symbolOverrides;
      var wasUnlinked = false;


      Helpers.clog("------ Checking if symbol to merge is foreign");
      if (symbolToMerge.duplicates[i].isForeign && (symbolToMerge.duplicates[i].externalLibrary == null)) {
        symbolToMerge.duplicates[i].symbol.unlinkFromLibrary();
        wasUnlinked = true;
      }


      Helpers.clog("---- Updating instances");
      instancesOfSymbol.forEach(function (instance) {
        Helpers.clog("------ Updating instance " + instance.name + ", in artboard " + instance.getParentArtboard().name);
        instance.master = symbolToApply;
        instancesChanged++;
      });

      Helpers.clog("---- Updating overrides");
      overridesOfSymbol.forEach(function (override) {
        var instanceLayer = Helpers.document.getLayerWithID(override.instance.id);
        var instanceOverride = instanceLayer.overrides.filter(function (ov) {
          return ov.id == override.override.id;
        });

        // var overridesMap = new Map();
        // instanceLayer.overrides.forEach(function (override) {
        //   Helpers.debugLog("IsDefault:" + override.isDefault);
        //   if (!override.isDefault) {
        //     overridesMap.set(override.affectedLayer.name.toString(), override);
        //   }
        // });

        try {
          Helpers.clog("------ Updating override for " + instanceLayer.name);
          Helpers.clog("------ "+instanceLayer.name+" has "+instanceLayer.overrides.length+" overrides");
          instanceLayer.setOverrideValue(instanceOverride[0], symbolToApply.symbolId.toString());
          Helpers.clog("------ After replace, "+instanceLayer.name+" has "+instanceLayer.overrides.length+" overrides");

          // overridesMap.forEach(function (override, layerName) {
          //   var overridesToTryToKeep = instanceLayer.overrides.filter(function (ov) {
          //     return ov.layerName == layerName;
          //   });
          //   if (overridesToTryToKeep.length > 0) {
          //     Helpers.debugLog("Replaced symbol had an override on layer '" + layerName + "'. Will update '" + override.value + "' to " + override.value.toString());
          //     instanceLayer.setOverrideValue(overridesToTryToKeep[0], override.value.toString());
          //   }
          // });
        } catch (e) {
          Helpers.clog("---- ERROR: Couldn't update override for " + instanceLayer.name);
        }
      });

    }
  }

  symbolsToRemove.forEach(function (symbolToRemove) {
    symbolToRemove.remove();
  });

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

  var selection = context.selection;
  if (selection.count() < 2) {
    context.document.showMessage("Wop! Select at least two symbols and run the plugin again :)");
    onShutdown(webviewMSSIdentifier);
  } else {
    var areAllSymbols = true;
    for (var i = 0; i < selection.count(); i++) {
      if (selection[i].class() != "MSSymbolMaster") {
        areAllSymbols = false;
      }
    }
    if (!areAllSymbols) {
      context.document.showMessage("Only symbols can be merged");
    } else {
      Helpers.clog("Loading webview");
      browserWindow.loadURL(require('../resources/mergeselectedsymbols.html'));
    }
  }

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript(`LaunchMerge(${JSON.stringify(selection.count())})`).catch(console.error);
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

    context.document.showMessage("Hey ho! You just removed " + mergeResults[0] + " symbols" + replacedStuff + " Amazing!");

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

  var duplicatedSymbols;
  var documentSymbols = Helpers.getDocumentSymbols(context, Helpers.getLibrariesEnabled());
  var mergeSession = [];

  var numberOfSymbols = Helpers.countAllSymbols(context, Helpers.getLibrariesEnabled());
  Helpers.clog("Local symbols: " + numberOfSymbols[0] + ". Library symbols:" + numberOfSymbols[1] + ". Libraries enabled:" + Helpers.getLibrariesEnabled());
  browserWindow.loadURL(require('../resources/mergeduplicatesymbols.html'));
  Helpers.clog("Webview called");

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Processing duplicates. Include libraries: " + includeLibraries);
    duplicatedSymbols = Helpers.getDuplicateSymbols(context, documentSymbols, includeLibraries, false);
    Helpers.clog("-- Found " + duplicatedSymbols.length + " duplicates");
    if (duplicatedSymbols.length > 0) {
      Helpers.GetSpecificSymbolData(context, duplicatedSymbols, 0);
      mergeSession = [];
      for (var i = 0; i < duplicatedSymbols.length; i++) {
        mergeSession.push({
          "symbolWithDuplicates": duplicatedSymbols[i],
          "selectedIndex": -1,
          "isUnchecked": false,
          "isProcessed": (i == 0) ? true : false
        });
      }
    }
    Helpers.clog("End of processing duplicates");
  }

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript(`LaunchMerge(${JSON.stringify(numberOfSymbols[0])},${JSON.stringify(numberOfSymbols[1])},${Helpers.getLibrariesEnabled()})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  })

  webContents.on('Cancel', () => {
    onShutdown(webviewIdentifier);
  });

  webContents.on('GetSelectedSymbolData', (index) => {
    Helpers.GetSpecificSymbolData(context, duplicatedSymbols, index);
    webContents.executeJavaScript(`ReDrawAfterGettingData(${JSON.stringify(duplicatedSymbols[index])},${index})`).catch(console.error);
  });

  webContents.on('RecalculateDuplicates', (includeLibraries) => {
    if (includeLibraries != null)
      CalculateDuplicates(includeLibraries);
    else
      CalculateDuplicates(Helpers.getLibrariesEnabled());

    Helpers.clog("Drawing duplicates to webview");
    webContents.executeJavaScript(`DrawDuplicateSymbols(${JSON.stringify(mergeSession)})`).catch(console.error);
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

        var localMergeResults = MergeSymbols(mergeSession[i].symbolWithDuplicates, mergeSession[i].selectedIndex);
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
      context.document.showMessage("Hey ho! You just removed " + mergeResults[0] + " symbols" + replacedStuff + " Amazing!");
    }
    else {
      Helpers.clog("Completed merge. No symbols were merged.");
      context.document.showMessage("No symbols were merged.");
    }
  });


};

export function onShutdown(webviewID) {
  const existingWebview = getWebview(webviewID)
  if (existingWebview) {
    existingWebview.close()
  }
}