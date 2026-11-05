import BrowserWindow from 'sketch-module-web-view'
const Helpers = require("./Helpers");
var UI = require('sketch/ui')

const webviewMTSFLIdentifier = 'merge-textstylesfromlist.webview'
const webviewMDTSIdentifier = 'merge-duplicatetextstyles.webview'
const webviewMSTSIdentifier = 'merge-similartextstyles.webview'

var checkingAlsoLibraries = false;
var currentSelectedStyles = [];


function MergeTextStyles(stylesToMerge, styleToKeep, basePercent, totalToMerge, webContents) {

  Helpers.clog("-- Starting Merge Layer Styles (" + stylesToMerge.length + "). Style to keep is:" + styleToKeep);

  var stylesToRemove = [];
  var styleToApply;
  var instancesChanged = 0;
  var overridesChanged = 0;
  var stylesRemoved = 0;
  var idsMap = new Map();

  Helpers.trace("4.0", "MergeTextStyles - start. Styles: " + stylesToMerge.length + ", index to keep: " + styleToKeep);
  Helpers.clog("---- Processing styles to remove");
  styleToApply = stylesToMerge[styleToKeep].textStyle;
  Helpers.trace("4.1", "Style to keep: '" + stylesToMerge[styleToKeep].name + "' (" + stylesToMerge[styleToKeep].libraryName + "), foreign: " + stylesToMerge[styleToKeep].isForeign);

  if (stylesToMerge[styleToKeep].isForeign) {
    var alreadyInDoc = (Helpers.document.sharedTextStyles.filter(ls => ls.id == stylesToMerge[styleToKeep].textStyle.id)).length > 0;
    Helpers.trace("4.2", "Style to keep is from a library. Already in document: " + alreadyInDoc);
    if (!alreadyInDoc) {
      Helpers.trace("4.2.1", "Importing style from library");
      styleToApply = Helpers.importTextStyleFromLibrary(stylesToMerge[styleToKeep]);
      Helpers.trace("4.2.2", "Imported");
    }
  }

  var tasksToPerform = 0, tasksExecuted = 0;
  var progress = basePercent;
  var instancesToChange = 0, overridesToChange = 0;
  var instOverMap = new Map();


  Helpers.clog("---- Getting all related styles instances and overrides");

  Helpers.trace("4.3", "Collecting instances and overrides of styles to remove");
  for (var i = 0; i < stylesToMerge.length; i++) {
    if (i != styleToKeep) {
      Helpers.trace("4.3." + (i + 1), "Style to remove: '" + stylesToMerge[i].name + "' (" + stylesToMerge[i].libraryName + ")");
      idsMap.set(stylesToMerge[i].textStyle.id)
      stylesToRemove.push(stylesToMerge[i].textStyle);

      var instancesOfStyle = Helpers.getTextStyleInstances(stylesToMerge[i].textStyle);
      var styleOverrides = Helpers.getTextStyleOverrides(stylesToMerge[i].textStyle, idsMap);

      instOverMap.set(stylesToMerge[i], {
        "instancesOfStyle": instancesOfStyle,
        "styleOverrides": styleOverrides
      });

      instancesToChange += instancesOfStyle.length;
      overridesToChange += styleOverrides.length;
    }
  }

  tasksToPerform = instancesToChange + overridesToChange;
  Helpers.trace("4.4", "Instances to change: " + instancesToChange + ", overrides to change: " + overridesToChange);

  Helpers.ctime("Merging text style:" + stylesToMerge[styleToKeep].name);
  webContents.executeJavaScript(`ShowMergeProgress()`).catch(console.error);

  for (var i = 0; i < stylesToMerge.length; i++) {
    if (i != styleToKeep) {
      if (!stylesToMerge[i].isForeign)
        stylesRemoved++;

      Helpers.ctime("-- Taking instances and overrides");
      var instancesOfStyle = instOverMap.get(stylesToMerge[i]).instancesOfStyle;
      var styleOverrides = instOverMap.get(stylesToMerge[i]).styleOverrides;
      Helpers.ctimeEnd("-- Taking instances and overrides");


      Helpers.trace("4.5." + (i + 1), "Merging '" + stylesToMerge[i].name + "' (" + stylesToMerge[i].libraryName + ")");
      Helpers.ctime("-- Unlinking from library");
      Helpers.clog("------ Checking if symbol to merge is foreign");
      if (stylesToMerge[i].isForeign) {
        Helpers.trace("4.5." + (i + 1) + ".a", "Unlinking from library");
        stylesToMerge[i].textStyle.unlinkFromLibrary();
      }
      Helpers.trace("4.5." + (i + 1) + ".b", "Updating " + styleOverrides.length + " overrides");
      Helpers.ctimeEnd("-- Unlinking from library");


      var message = "Merging " + stylesToMerge[styleToKeep].name;

      Helpers.ctime("-- Updating overrides");
      Helpers.clog("---- Updating overrides (" + styleOverrides.length + ")");
      styleOverrides.forEach(function (override) {
        try {
          Helpers.clog("------ Updating override for " + override.instance.name);
          override.instance.setOverrideValue(override.override, styleToApply.id.toString());
          overridesChanged++;
          tasksExecuted++;
          progress = Math.floor(basePercent + ((tasksExecuted * 100 / tasksToPerform) / totalToMerge));
          var message2 = "Updating overrides (" + overridesChanged + " of " + overridesToChange + ")";
          webContents.executeJavaScript(`UpdateMergeProgress(${progress}, ${JSON.stringify(message)}, ${JSON.stringify(message2)})`).catch(console.error);
        } catch (e) {
          Helpers.clog("---- ERROR: Couldn't update override for " + override.instance.name);
          Helpers.clog(e);
        }
      });
      Helpers.ctimeEnd("-- Updating overrides");


      Helpers.trace("4.5." + (i + 1) + ".c", "Updating " + instancesOfStyle.length + " instances");
      Helpers.ctime("-- Updating instances");
      Helpers.clog("---- Updating instances (" + instancesOfStyle.length + ")");
      var traceStyleIndex = i + 1;
      var traceInstanceIndex = 0;
      instancesOfStyle.forEach(function (instance) {
        traceInstanceIndex++;
        Helpers.trace("4.5." + traceStyleIndex + ".c." + traceInstanceIndex, "Instance '" + instance.name + "': setting sharedStyle and syncing");
        try {
          Helpers.clog("------ Updating instance " + instance.name + ", in artboard " + instance.getParentArtboard().name);
        }
        catch (e) {
          Helpers.clog("------ Updating instance " + instance.name + ". Instance doesn't belong to any specific artboard.");
        }

        instance.sharedStyle = styleToApply;
        instance.style.syncWithSharedStyle(styleToApply);

        tasksExecuted++;
        instancesChanged++;
        progress = Math.floor(basePercent + ((tasksExecuted * 100 / tasksToPerform) / totalToMerge));
        var message2 = "Updating instances (" + instancesChanged + " of " + instancesToChange + ")";
        webContents.executeJavaScript(`UpdateMergeProgress(${progress}, ${JSON.stringify(message)}, ${JSON.stringify(message2)})`).catch(console.error);
      });

      Helpers.ctimeEnd("-- Updating instances");

    }
  }

  Helpers.ctimeEnd("Merging text style:" + stylesToMerge[styleToKeep].name);
  Helpers.clog("---- Finalized instance and override replacement.");

  Helpers.trace("4.6", "Finding shared styles to remove");
  var sharedStylesToRemove = Helpers.document.sharedTextStyles.filter(sharedStyle => isMarkedForRemove(sharedStyle, stylesToRemove));
  Helpers.trace("4.7", "Removing " + sharedStylesToRemove.length + " shared styles");

  Helpers.clog("---- Removing discarded text styles (" + sharedStylesToRemove.length + ").");
  webContents.executeJavaScript(`UpdateMergeProgress(${progress}, ${JSON.stringify(message)}, "Removing discarded text styles")`).catch(console.error);


  Helpers.ctime("Removing discarded styles");
  sharedStylesToRemove.forEach(sharedStyleToRemove => {
    Helpers.trace("4.7.x", "Removing '" + sharedStyleToRemove.name + "'");
    Helpers.clog("------ Removing " + sharedStyleToRemove.name + " (" + sharedStyleToRemove.id + ") from sharedTextStyles.");
    sharedStyleToRemove.unlinkFromLibrary();
    Helpers.clog("-------- Unlinked from library.");
    var styleIndex = Helpers.document.sharedTextStyles.findIndex(sL => sL.id == sharedStyleToRemove.id);
    Helpers.clog("-------- Located in sharedTextStyles (" + styleIndex + ").");
    Helpers.document.sharedTextStyles.splice(styleIndex, 1);
    Helpers.clog("-------- Removed from sharedTextStyles.");
  });
  Helpers.ctimeEnd("Removing discarded styles");

  Helpers.clog("---- Merge completed.");
  Helpers.trace("4.8", "MergeTextStyles - done. Removed " + stylesRemoved + ", instances " + instancesChanged + ", overrides " + overridesChanged);

  return [stylesRemoved, instancesChanged, overridesChanged];

}

function isMarkedForRemove(sharedTextStyle, stylesToRemove) {
  var redId1 = sharedTextStyle.style.id;
  var redId2 = (sharedTextStyle.id.indexOf("[") >= 0) ? sharedTextStyle.id.substring(sharedTextStyle.id.indexOf("[") + 1, sharedTextStyle.id.length - 1) : null;
  return (stylesToRemove.filter(str => (str.id == sharedTextStyle.id) || (str.id == redId1) || (str.id == redId2)).length > 0);
}

export function MergeDuplicateTextStyles(context) {

  Helpers.clog("----- Merge duplicate text styles -----");

  Helpers.trace("1.0", "MergeDuplicateTextStyles - start");
  const options = {
    identifier: webviewMDTSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  Helpers.trace("1.1", "Creating window '" + webviewMDTSIdentifier + "'. Already registered from before: " + (NSThread.mainThread().threadDictionary()[webviewMDTSIdentifier] != null));
  var browserWindow;
  try {
    browserWindow = new BrowserWindow(options);
  } catch (e) {
    Helpers.traceError("1.1", e);
    throw e;
  }
  Helpers.trace("1.2", "Window created. Rewiring close button");
  Helpers.enableDirectClose(browserWindow);
  const webContents = browserWindow.webContents;
  Helpers.trace("1.3", "Window ready. Libraries enabled: " + Helpers.getLibrariesEnabled());

  var onlyDuplicatedTextStyles, textStylesMap;
  var mergeSession = [];
  var mergeSessionMap = new Map();


  try {
    Helpers.trace("1.4", "Calculating duplicates");
    CalculateDuplicates(Helpers.getLibrariesEnabled());
  } catch (e) {
    Helpers.traceError("1.4", e);
    throw e;
  }

  if (onlyDuplicatedTextStyles.length > 0) {
    Helpers.trace("1.5", "Loading window HTML");
    browserWindow.loadURL(require('../resources/mergeduplicatetextstyles.html'));
  }
  else {
    Helpers.trace("1.5", "No duplicates found. Closing window");
    UI.message("Looks like there are no text styles with the same name.");
    onShutdown(webviewMDTSIdentifier);
  }

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Finding duplicate text styles. Including libraries:" + includeLibraries);
    Helpers.trace("1.4.1", "Getting duplicate text styles by name");
    onlyDuplicatedTextStyles = Helpers.getAllDuplicateTextStylesByName(context, includeLibraries);
    Helpers.trace("1.4.2", "Found " + onlyDuplicatedTextStyles.length + " names with duplicates. Building styles map");
    textStylesMap = Helpers.getTextStylesMap(context, onlyDuplicatedTextStyles);

    if (onlyDuplicatedTextStyles.length > 0) {

      Helpers.trace("1.4.3", "Getting data (thumbnails, instances) for first style");
      Helpers.GetSpecificTextStyleData(onlyDuplicatedTextStyles[0], textStylesMap);
      Helpers.trace("1.4.4", "Building merge session");
      mergeSession = [];
      onlyDuplicatedTextStyles.forEach(duplicate => {
        var reducedStyle = Helpers.getReducedTextStyleData(duplicate);
        mergeSessionMap.set(reducedStyle, duplicate);
        mergeSession.push({
          "textStyleWithDuplicates": reducedStyle,
          "selectedIndex": -1,
          "isUnchecked": false,
          "isProcessed": (mergeSession.length == 0)
        });
      });
      Helpers.trace("1.4.5", "Merge session ready: " + mergeSession.length + " items");
    }
  }

  browserWindow.once('ready-to-show', () => {
    Helpers.trace("1.6", "Window ready to show");
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    Helpers.trace("1.7", "HTML loaded. Drawing styles list");
    webContents.executeJavaScript(`DrawStylesList(${JSON.stringify(mergeSession)}, ${Helpers.getLibrariesEnabled()})`).catch(e => Helpers.traceError("1.7 (DrawStylesList in window)", e));
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('Cancel', () => {
    Helpers.trace("1.8", "Cancel pressed. Closing window");
    onShutdown(webviewMDTSIdentifier);
  });



  webContents.on('RecalculateDuplicates', (includeLibraries) => {
    Helpers.clog("Recalculating duplicates");
    Helpers.trace("1.9", "Recalculating duplicates. Include libraries: " + includeLibraries);
    try {
      CalculateDuplicates(includeLibraries);
    } catch (e) {
      Helpers.traceError("1.9", e);
      throw e;
    }
    webContents.executeJavaScript(`DrawStylesList(${JSON.stringify(mergeSession)})`).catch(console.error);
  });

  webContents.on('GetSelectedStyleData', (index) => {
    Helpers.trace("1.10", "Getting data for style at index " + index);
    try {
      Helpers.GetSpecificTextStyleData(onlyDuplicatedTextStyles[index], textStylesMap);
    } catch (e) {
      Helpers.traceError("1.10", e);
      throw e;
    }
    var stringify = JSON.stringify(Helpers.getReducedTextStyleData(onlyDuplicatedTextStyles[index]));
    webContents.executeJavaScript(`ReDrawAfterGettingData(${stringify},${index})`).catch(console.error);
  });

  webContents.on('ExecuteMerge', (editedMergeSession) => {
    Helpers.clog("Executing Merge");
    Helpers.trace("1.11", "Merge button pressed. Items: " + editedMergeSession.length);

    var duplicatesSolved = 0;
    var mergeResults = [0, 0, 0];

    var totalToMerge = editedMergeSession.filter(ems => !ems.isUnchecked && ems.selectedIndex >= 0).length;

    for (var i = 0; i < editedMergeSession.length; i++) {
      Helpers.clog("-- Merging " + mergeSession[i].textStyleWithDuplicates.name);
      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        Helpers.clog("-- Merging " + mergeSession[i].textStyleWithDuplicates.name);
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        var mergeobject = mergeSessionMap.get(mergeSession[i].textStyleWithDuplicates);
        var basePercent = (duplicatesSolved * 100 / editedMergeSession.length);

        Helpers.trace("1.11." + (i + 1), "Merging '" + mergeSession[i].textStyleWithDuplicates.name + "'");
        var localMergeResults;
        try {
          localMergeResults = MergeTextStyles(mergeobject.duplicates, mergeSession[i].selectedIndex, basePercent, totalToMerge, webContents);
        } catch (e) {
          Helpers.traceError("1.11." + (i + 1), e);
          throw e;
        }
        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];

        duplicatesSolved++;
      }
    }

    Helpers.trace("1.12", "Merge finished. Closing window");
    onShutdown(webviewMDTSIdentifier);
    
    if (mergeResults[0] <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    }
    else {
      var replacedStuff = "";
      if (mergeResults[1] > 0 && mergeResults[2])
        replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";
      else if (mergeResults[1] > 0)
        replacedStuff = " and replaced " + mergeResults[1] + " instances.";
      else if (mergeResults[2] > 0)
        replacedStuff = " and updated " + mergeResults[2] + " overrides.";
      else
        replacedStuff = ".";


      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " text styles" + replacedStuff);

      UI.message("Hey ho! You just removed " + mergeResults[0] + " text styles" + replacedStuff + " Amazing!");
    }


  });
};

export function MergeSelectedTextStyles(context) {

  Helpers.clog("----- Merge selected text styles -----");

  Helpers.trace("2.0", "MergeSelectedTextStyles - start");
  const options = {
    identifier: webviewMTSFLIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  Helpers.trace("2.1", "Creating window '" + webviewMTSFLIdentifier + "'. Already registered from before: " + (NSThread.mainThread().threadDictionary()[webviewMTSFLIdentifier] != null));
  var browserWindow;
  try {
    browserWindow = new BrowserWindow(options);
  } catch (e) {
    Helpers.traceError("2.1", e);
    throw e;
  }
  Helpers.trace("2.2", "Window created. Rewiring close button");
  Helpers.enableDirectClose(browserWindow);
  const webContents = browserWindow.webContents;
  Helpers.trace("2.3", "Window ready. Libraries enabled: " + Helpers.getLibrariesEnabled());

  var allTextStyles;
  var styleCounter = 0;

  Helpers.clog("Get text styles list. Libraries included:" + Helpers.getLibrariesEnabled());

  Helpers.trace("2.4", "Getting all text styles");
  try {
    allTextStyles = Helpers.getAllTextStyles(Helpers.getLibrariesEnabled());
  } catch (e) {
    Helpers.traceError("2.4", e);
    throw e;
  }
  styleCounter = allTextStyles.length;
  Helpers.trace("2.5", "Text styles found: " + styleCounter);
  checkingAlsoLibraries = Helpers.getLibrariesEnabled();
  Helpers.clog("allTextStyles:" + allTextStyles.length);

  if (styleCounter > 1) {
    Helpers.trace("2.6", "Loading window HTML");
    browserWindow.loadURL(require('../resources/mergetextstylesfromlist.html'));
  }
  else {
    if (styleCounter == 1)
      UI.message("There's only 1 text style. No need to merge.");
    else
      UI.message("Looks like there are no text styles.");

    Helpers.trace("2.6", "Not enough text styles. Closing window");
    onShutdown(webviewMTSFLIdentifier);
  }

  browserWindow.once('ready-to-show', () => {
    Helpers.trace("2.7", "Window ready to show");
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    Helpers.trace("2.8", "HTML loaded. Drawing styles list");
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(allTextStyles)},${Helpers.getLibrariesEnabled()})`).catch(e => Helpers.traceError("2.8 (DrawStyleList in window)", e));
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('GetStylesList', (librariesEnabled) => {
    Helpers.clog("Get styles list");
    Helpers.trace("2.9", "Reloading styles list. Include libraries: " + librariesEnabled);
    try {
      allTextStyles = Helpers.getAllTextStyles(librariesEnabled);
    } catch (e) {
      Helpers.traceError("2.9", e);
      throw e;
    }

    checkingAlsoLibraries = librariesEnabled;
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(allTextStyles)})`).catch(console.error);
  });

  webContents.on('Cancel', () => {
    Helpers.trace("2.10", "Cancel pressed. Closing window");
    onShutdown(webviewMTSFLIdentifier);
  });

  webContents.on('ExecuteMerge', (editedGlobalTextStyles) => {
    Helpers.clog("Executing Merge");
    Helpers.trace("2.11", "Merge button pressed");
    var selectedIndex = -1;
    var stylesToMerge = [];

    //Create merge structure
    for (var i = 0; i < allTextStyles.length; i++) {
      allTextStyles[i].isSelected = editedGlobalTextStyles[i].isSelected;
      allTextStyles[i].isChosen = editedGlobalTextStyles[i].isChosen;

      if (allTextStyles[i].isSelected) {
        if (allTextStyles[i].isChosen) {
          selectedIndex = stylesToMerge.length;
        }
        stylesToMerge.push(allTextStyles[i]);
      }
    }

    Helpers.trace("2.12", "Styles selected: " + stylesToMerge.length + ", index to keep: " + selectedIndex);
    var mergeResults;
    try {
      mergeResults = MergeTextStyles(stylesToMerge, selectedIndex, 0, 1, webContents);
    } catch (e) {
      Helpers.traceError("2.12", e);
      throw e;
    }

    Helpers.trace("2.13", "Merge finished. Closing window");
    onShutdown(webviewMTSFLIdentifier);

    if (mergeResults[0] <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    }
    else {
      var replacedStuff = "";
      if (mergeResults[1] > 0 && mergeResults[2])
        replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";
      else if (mergeResults[1] > 0)
        replacedStuff = " and replaced " + mergeResults[1] + " instances.";
      else if (mergeResults[2] > 0)
        replacedStuff = " and updated " + mergeResults[2] + " overrides.";
      else
        replacedStuff = ".";


      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " text styles" + replacedStuff);

      UI.message("Hey ho! You just removed " + mergeResults[0] + " text styles" + replacedStuff + " Amazing!");
    }
  });
};

export function MergeSimilarTextStyles(context) {

  Helpers.clog("----- Merge similar text styles -----");

  Helpers.trace("3.0", "MergeSimilarTextStyles - start");
  const options = {
    identifier: webviewMSTSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  Helpers.trace("3.1", "Creating window '" + webviewMSTSIdentifier + "'. Already registered from before: " + (NSThread.mainThread().threadDictionary()[webviewMSTSIdentifier] != null));
  var browserWindow;
  try {
    browserWindow = new BrowserWindow(options);
  } catch (e) {
    Helpers.traceError("3.1", e);
    throw e;
  }
  Helpers.trace("3.2", "Window created. Rewiring close button");
  Helpers.enableDirectClose(browserWindow);
  const webContents = browserWindow.webContents;
  Helpers.trace("3.3", "Window ready. Libraries enabled: " + Helpers.getLibrariesEnabled());

  var stylesWithSimilarStyles;

  Helpers.clog("Loading webview");
  Helpers.trace("3.4", "Loading window HTML");
  browserWindow.loadURL(require('../resources/mergesimilartextstyles.html'));


  browserWindow.once('ready-to-show', () => {
    Helpers.trace("3.5", "Window ready to show");
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    Helpers.trace("3.6", "HTML loaded. Sending settings to window");
    webContents.executeJavaScript(`UpdateSettings(${Helpers.getLibrariesEnabled()})`).catch(e => Helpers.traceError("3.6 (UpdateSettings in window)", e));
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('Cancel', () => {
    Helpers.trace("3.7", "Cancel pressed. Closing window");
    onShutdown(webviewMSTSIdentifier);
  });

  webContents.on('ExecuteMerge', (editedStylesWithSimilarStyles) => {
    Helpers.clog("Execute merge");
    Helpers.trace("3.9", "Merge button pressed. Groups: " + editedStylesWithSimilarStyles.length);
    var duplicatesSolved = 0;
    var mergeResults = [0, 0, 0];

    var totalToMerge = editedStylesWithSimilarStyles.filter(ems => !ems.isUnchecked && ems.selectedIndex >= 0).length;

    for (var i = 0; i < editedStylesWithSimilarStyles.length; i++) {
      if (!editedStylesWithSimilarStyles[i].isUnchecked && editedStylesWithSimilarStyles[i].selectedIndex >= 0) {
        var basePercent = (duplicatesSolved * 100 / editedStylesWithSimilarStyles.length);
        Helpers.trace("3.9." + (i + 1), "Merging group '" + stylesWithSimilarStyles[i].referenceStyle.name + "'");
        var localMergeResults;
        try {
          localMergeResults = MergeTextStyles(stylesWithSimilarStyles[i].similarStyles, editedStylesWithSimilarStyles[i].selectedIndex, basePercent, totalToMerge, webContents);
        } catch (e) {
          Helpers.traceError("3.9." + (i + 1), e);
          throw e;
        }

        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];

        duplicatesSolved++;
      }
    }

    Helpers.trace("3.10", "Merge finished. Closing window");
    onShutdown(webviewMSTSIdentifier);

    if (mergeResults[0] <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    }
    else {
      var replacedStuff = "";
      if (mergeResults[1] > 0 && mergeResults[2])
        replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";
      else if (mergeResults[1] > 0)
        replacedStuff = " and replaced " + mergeResults[1] + " instances.";
      else if (mergeResults[2] > 0)
        replacedStuff = " and updated " + mergeResults[2] + " overrides.";
      else
        replacedStuff = ".";


      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " text styles" + replacedStuff);

      UI.message("Hey ho! You just removed " + mergeResults[0] + " text styles" + replacedStuff + " Amazing!");
    }

  });

  webContents.on('RecalculateStyles', (includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) => {
    Helpers.clog("RecalculateStyles");
    Helpers.trace("3.8", "'Find matching styles' pressed. Include libraries: " + includeAllLibraries);
    try {
      stylesWithSimilarStyles = Helpers.FindAllSimilarTextStyles(context, includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);
    } catch (e) {
      Helpers.traceError("3.8", e);
      throw e;
    }
    Helpers.trace("3.8.1", "Found " + stylesWithSimilarStyles.length + " groups. Drawing results");
    webContents.executeJavaScript(`DrawResultsList(${JSON.stringify(stylesWithSimilarStyles)})`).catch(e => Helpers.traceError("3.8.1 (DrawResultsList in window)", e));
  });

}
