import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
const Helpers = require("./Helpers");

const webviewIdentifier = 'merge-duplicates.webview'
const webviewMSSIdentifier = 'merge-selected-symbols.webview'

function generateUUID() {
  var d = new Date().getTime();
  if (Date.now) {
    d = Date.now(); //high-precision timer
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
};



//   function getSymbolInstances(context, symbolMaster) {
//     var symbolInstances = NSMutableArray.array();

//     var pages = context.document.pages(), pageLoop = pages.objectEnumerator(), page;

//     while (page = pageLoop.nextObject()) {
//       var predicate = NSPredicate.predicateWithFormat("className == 'MSSymbolInstance' && symbolMaster == %@", symbolMaster),
//         instances = page.children().filteredArrayUsingPredicate(predicate),
//         instanceLoop = instances.objectEnumerator(),
//         instance;

//       while (instance = instanceLoop.nextObject()) {
//         symbolInstances.addObject(instance);
//       }
//     }

//     return symbolInstances;
//   }

// function getSymbolOverrides(context, symbolMaster) {
//   var symbolOverrides = NSMutableArray.array();

//   var pages = context.document.pages(), pageLoop = pages.objectEnumerator(), page;

//   while (page = pageLoop.nextObject()) {
//     var predicate = NSPredicate.predicateWithFormat("className == %@ && overrides != nil", "MSSymbolInstance"),
//       instances = page.children().filteredArrayUsingPredicate(predicate),
//       instanceLoop = instances.objectEnumerator(),
//       instance;

//     while (instance = instanceLoop.nextObject()) {
//       var overrides = instance.overrides();
//       FindOverrideSymbolID(instance, overrides, symbolOverrides, symbolMaster, 0);
//     }
//   }
//   return symbolOverrides;
// }

function GetSymbolsByName(name, context) {
  var allSymbols = context.document.documentData().allSymbols();
  var matchingSymbols = [];
  for (var i = 0; i < allSymbols.count(); i++) {
    var symbolName = allSymbols[i].name().toString();
    if (symbolName.localeCompare(name) == 0) {
      matchingSymbols.push(allSymbols[i]);
    }
  }
  return matchingSymbols;
}

function FindSymbolInstances(context, originalSymbol, duplicateSymbolsByName) {
  var instancesPerSymbol = [];
  for (var i = 0; i < duplicateSymbolsByName.length; i++) {
    instancesPerSymbol[i] = NSMutableArray.array();
  }

  for (var i = 0; i < duplicateSymbolsByName.length; i++) {
    var symbolInstances = getSymbolInstances(context, duplicateSymbolsByName[i]);
    instancesPerSymbol[i] = symbolInstances;
  }

  return instancesPerSymbol;
}

function FindSymbolOverrides(context, originalSymbol, duplicateSymbolsByName) {
  var overridesPerSymbol = [];
  for (var i = 0; i < duplicateSymbolsByName.length; i++) {
    overridesPerSymbol[i] = NSMutableArray.array();
  }


  for (var i = 0; i < duplicateSymbolsByName.length; i++) {
    var symbolOverrides = getSymbolOverrides(context, duplicateSymbolsByName[i]);
    overridesPerSymbol[i] = symbolOverrides;
  }

  return overridesPerSymbol;
}


function MergeSymbols(symbolToMerge, symbolToKeep) {

  var symbolsIDsToRemove = [];
  var symbolToApply;
  var instancesChanged = 0;
  var overridesChanged = 0;
  var symbolsRemoved = 0;

  if (symbolToMerge.duplicates[symbolToKeep].externalLibrary == null) {
    symbolToApply = symbolToMerge.duplicates[symbolToKeep].symbol;
  } else {
    //console.log("Importing symbol from library");
    var foreignSymbolReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(symbolToMerge.duplicates[symbolToKeep].symbol, symbolToMerge.duplicates[symbolToKeep].externalLibrary);
    var foreignSymbol = AppController.sharedInstance().librariesController().importShareableObjectReference_intoDocument(foreignSymbolReference, context.document.documentData());
    symbolToApply = foreignSymbol.symbolMaster();
  }

  for (var i = 0; i < symbolToMerge.duplicates.length; i++) {
    if (i != symbolToKeep) {
      if (symbolsIDsToRemove.indexOf(symbolToMerge.duplicates[i].symbol.symbolID()) < 0)
        symbolsIDsToRemove.push(symbolToMerge.duplicates[i].symbol.symbolID());
    }
  }

  for (var i = 0; i < symbolToMerge.duplicates.length; i++) {
    if (i != symbolToKeep) {

      if (!symbolToMerge.duplicates[i].isForeign)
        symbolsRemoved++;

      var instancesOfSymbol = symbolToMerge.duplicates[i].symbolInstances;
      var overridesOfSymbol = symbolToMerge.duplicates[i].symbolOverrides;
      var wasUnlinked = false;

      if (symbolToMerge.duplicates[i].isForeign && (symbolToMerge.duplicates[i].externalLibrary == null)) {
        // console.log("About to remove this symbol ↓");
        // console.log(symbolToMerge.duplicates[i].symbol);
        // console.log(symbolToMerge.duplicates[i].symbol.foreignObject());
        symbolToMerge.duplicates[i].symbol.foreignObject().unlinkFromRemote();
        wasUnlinked = true;
      }

      if (symbolToMerge.duplicates[symbolToKeep].externalLibrary == null) {
        // console.log("Replacing instance for External symbol (" + symbolToMerge.duplicates[symbolToKeep].libraryName + ")");
        for (var k = 0; k < instancesOfSymbol.length; k++) {
          instancesOfSymbol[k].changeInstanceToSymbol(symbolToApply);
          instancesChanged++;
        }
      } else {

        for (var k = 0; k < instancesOfSymbol.length; k++) {
          instancesOfSymbol[k].changeInstanceToSymbol(foreignSymbol.symbolMaster());
          instancesChanged++;
        }
      }

      for (var k = 0; k < overridesOfSymbol.length; k++) {
        var overridesToReplace = [];
        var currentOverrides = NSMutableDictionary.dictionaryWithDictionary(overridesOfSymbol[k].overrides());

        var overrideOuterKeys = currentOverrides.allKeys();

        for (var x = 0; x < overrideOuterKeys.count(); x++) {
          var keyIndex = overrideOuterKeys.objectAtIndex(x);
          var ascOverride = currentOverrides[keyIndex].toString().replace(/[^\x20-\x7E]+/g, "");

          if (currentOverrides[keyIndex] == null || !(/\S/.test(ascOverride))) {
            //Internal overrides. Don't consider.
          }
          else {
            if (currentOverrides[keyIndex].allKeys != null) {
              var overrideInnerKeys = currentOverrides[keyIndex].allKeys();
              var innerNewOverride = {};
              for (var y = 0; y < overrideInnerKeys.count(); y++) {
                var innerkeyIndex = overrideInnerKeys.objectAtIndex(y);
                var shallbereplaced = false;
                for (var t = 0; t < symbolsIDsToRemove.length; t++) {
                  if (currentOverrides[keyIndex]["symbolID"] != null && currentOverrides[keyIndex]["symbolID"].indexOf(symbolsIDsToRemove[t]) > -1)
                    shallbereplaced = true;
                }
                if (shallbereplaced) {
                  if (overridesToReplace.indexOf(keyIndex) < 0)
                    overridesToReplace.push(keyIndex);
                }
              }
            }
          }
        }

        overridesOfSymbol[k].overridePoints().forEach(function (overridePoint) {
          if (overridePoint.toString().indexOf("symbolID") > -1) {
            var shallbereplaced = false;
            for (t = 0; t < overridesToReplace.length; t++) {
              if (overridePoint.toString().indexOf(overridesToReplace[t]) > -1) {
                shallbereplaced = true;
              }
            }
            if (shallbereplaced) {
              // console.log("Replacing an override. Foreign:" + (symbolToMerge.duplicates[symbolToKeep].externalLibrary != null));
              overridesOfSymbol[k].setValue_forOverridePoint_(symbolToApply.symbolID(), overridePoint);
              overridesChanged++;
            }
          }
        });

      }

      if (!symbolToMerge.duplicates[i].isForeign) {
        symbolToMerge.duplicates[i].symbol.removeFromParent();
        //console.log("Removed symbol " + symbolToMerge.duplicates[i].name);
      }
      else {
        if (wasUnlinked) {
          //console.log("Was unlinked");
          symbolToMerge.duplicates[i].symbol.removeFromParent();
        }

        context.document.documentData().foreignSymbols().removeObject(symbolToMerge.duplicates[i].symbol);
        //console.log("Removed foreign from foreignSymbols (" + symbolToMerge.duplicates[i].name + ")");
      }

    }
  }

  return [symbolsRemoved, instancesChanged, overridesChanged];
}

export function MergeSelectedSymbols(context) {

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

      browserWindow.loadURL(require('../resources/mergeselectedsymbols.html'));
    }
  }

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
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
    console.log(s);
  })

  webContents.on('Cancel', () => {
    onShutdown(webviewMSSIdentifier);
  });

  webContents.on('ExecuteMerge', (editedMergeSession, selectedIndex) => {
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

    context.document.showMessage("Hey ho! You just removed " + mergeResults[0] + " symbols" + replacedStuff + " Amazing!");

    onShutdown(webviewMSSIdentifier);
  });
};

export function MergeDuplicateSymbols(context) {

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
  var mergeSession = [];

  var numberOfSymbols = Helpers.countAllSymbols(context, true);
  browserWindow.loadURL(require('../resources/mergeduplicatesymbols.html'));

  function CalculateDuplicates(includeLibraries) {
    duplicatedSymbols = Helpers.getDuplicateSymbols(context, context.document.documentData().allSymbols(), includeLibraries, false);
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
  }

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    //CalculateDuplicates(true);
    // console.log("didfinishload");
    webContents.executeJavaScript(`LaunchMerge(${JSON.stringify(numberOfSymbols[0])},${JSON.stringify(numberOfSymbols[1])})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    console.log(s);
  })

  webContents.on('Cancel', () => {
    onShutdown(webviewIdentifier);
  });

  webContents.on('GetSelectedSymbolData', (index) => {
    Helpers.GetSpecificSymbolData(context, duplicatedSymbols, index);
    webContents.executeJavaScript(`ReDrawAfterGettingData(${JSON.stringify(duplicatedSymbols[index])},${index})`).catch(console.error);
  });

  webContents.on('RecalculateDuplicates', (includeLibraries) => {
    CalculateDuplicates(includeLibraries);
    webContents.executeJavaScript(`DrawDuplicateSymbols(${JSON.stringify(mergeSession)})`).catch(console.error);
  });

  webContents.on('ExecuteMerge', (editedMergeSession) => {
    var duplicatesSolved = 0;
    var mergedSymbols = 0;
    var mergeResults = [0, 0, 0];
    for (var i = 0; i < editedMergeSession.length; i++) {
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

    if (duplicatesSolved > 0)
      context.document.showMessage("Hey ho! You just removed " + mergeResults[0] + " symbols" + replacedStuff + " Amazing!");
    else
      context.document.showMessage("No symbols were merged.");
  });


};

export function onShutdown(webviewID) {
  const existingWebview = getWebview(webviewID)
  if (existingWebview) {
    existingWebview.close()
  }
}