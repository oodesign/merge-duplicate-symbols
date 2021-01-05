import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
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

  Helpers.clog("---- Processing styles to remove");
  styleToApply = stylesToMerge[styleToKeep].textStyle;

  if (stylesToMerge[styleToKeep].isForeign) {
    var alreadyInDoc = (Helpers.document.sharedTextStyles.filter(ls => ls.id == stylesToMerge[styleToKeep].textStyle.id)).length > 0;
    if (!alreadyInDoc)
      styleToApply = Helpers.importTextStyleFromLibrary(stylesToMerge[styleToKeep]);
  }

  var tasksToPerform = 0, tasksExecuted = 0;
  var progress = basePercent;
  var instancesToChange = 0, overridesToChange = 0;
  var instOverMap = new Map();


  Helpers.clog("---- Getting all related styles instances and overrides");

  for (var i = 0; i < stylesToMerge.length; i++) {
    if (i != styleToKeep) {
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


      Helpers.ctime("-- Unlinking from library");
      Helpers.clog("------ Checking if symbol to merge is foreign");
      if (stylesToMerge[i].isForeign) {
        stylesToMerge[i].textStyle.unlinkFromLibrary();
      }
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


      Helpers.ctime("-- Updating instances");
      Helpers.clog("---- Updating instances (" + instancesOfStyle.length + ")");
      instancesOfStyle.forEach(function (instance) {
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

  var sharedStylesToRemove = Helpers.document.sharedTextStyles.filter(sharedStyle => isMarkedForRemove(sharedStyle, stylesToRemove));

  Helpers.clog("---- Removing discarded text styles (" + sharedStylesToRemove.length + ").");
  webContents.executeJavaScript(`UpdateMergeProgress(${progress}, ${JSON.stringify(message)}, "Removing discarded text styles")`).catch(console.error);


  Helpers.ctime("Removing discarded styles");
  sharedStylesToRemove.forEach(sharedStyleToRemove => {
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

  return [stylesRemoved, instancesChanged, overridesChanged];

}

function isMarkedForRemove(sharedTextStyle, stylesToRemove) {
  var redId1 = sharedTextStyle.style.id;
  var redId2 = (sharedTextStyle.id.indexOf("[") >= 0) ? sharedTextStyle.id.substring(sharedTextStyle.id.indexOf("[") + 1, sharedTextStyle.id.length - 1) : null;
  return (stylesToRemove.filter(str => (str.id == sharedTextStyle.id) || (str.id == redId1) || (str.id == redId2)).length > 0);
}

export function MergeDuplicateTextStyles(context) {

  Helpers.clog("----- Merge duplicate text styles -----");

  const options = {
    identifier: webviewMDTSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;

  var onlyDuplicatedTextStyles, textStylesMap;
  var mergeSession = [];
  var mergeSessionMap = new Map();


  CalculateDuplicates(Helpers.getLibrariesEnabled());

  if (onlyDuplicatedTextStyles.length > 0) {
    browserWindow.loadURL(require('../resources/mergeduplicatetextstyles.html'));
  }
  else {
    UI.message("Looks like there are no text styles with the same name.");
    onShutdown(webviewMDTSIdentifier);
  }

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Finding duplicate text styles. Including libraries:" + includeLibraries);
    onlyDuplicatedTextStyles = Helpers.getAllDuplicateTextStylesByName(context, includeLibraries);
    textStylesMap = Helpers.getTextStylesMap(context, onlyDuplicatedTextStyles);

    if (onlyDuplicatedTextStyles.length > 0) {

      Helpers.GetSpecificTextStyleData(onlyDuplicatedTextStyles[0], textStylesMap);
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
    }
  }

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript(`DrawStylesList(${JSON.stringify(mergeSession)}, ${Helpers.getLibrariesEnabled()})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewMDTSIdentifier);
  });



  webContents.on('RecalculateDuplicates', (includeLibraries) => {
    Helpers.clog("Recalculating duplicates");
    CalculateDuplicates(includeLibraries);
    webContents.executeJavaScript(`DrawStylesList(${JSON.stringify(mergeSession)})`).catch(console.error);
  });

  webContents.on('GetSelectedStyleData', (index) => {
    Helpers.GetSpecificTextStyleData(onlyDuplicatedTextStyles[index], textStylesMap);
    var stringify = JSON.stringify(Helpers.getReducedTextStyleData(onlyDuplicatedTextStyles[index]));
    webContents.executeJavaScript(`ReDrawAfterGettingData(${stringify},${index})`).catch(console.error);
  });

  webContents.on('ExecuteMerge', (editedMergeSession) => {
    Helpers.clog("Executing Merge");

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

        var localMergeResults = MergeTextStyles(mergeobject.duplicates, mergeSession[i].selectedIndex, basePercent, totalToMerge, webContents);
        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];

        duplicatesSolved++;
      }
    }

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

  const options = {
    identifier: webviewMTSFLIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;

  var allTextStyles;
  var styleCounter = 0;

  Helpers.clog("Get text styles list. Libraries included:" + Helpers.getLibrariesEnabled());

  allTextStyles = Helpers.getAllTextStyles(Helpers.getLibrariesEnabled());
  styleCounter = allTextStyles.length;
  checkingAlsoLibraries = Helpers.getLibrariesEnabled();
  Helpers.clog("allTextStyles:" + allTextStyles.length);

  if (styleCounter > 1) {
    browserWindow.loadURL(require('../resources/mergetextstylesfromlist.html'));
  }
  else {
    if (styleCounter == 1)
      UI.message("There's only 1 text style. No need to merge.");
    else
      UI.message("Looks like there are no text styles.");

    onShutdown(webviewMTSFLIdentifier);
  }

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(allTextStyles)},${Helpers.getLibrariesEnabled()})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('GetStylesList', (librariesEnabled) => {
    Helpers.clog("Get styles list");
    allTextStyles = Helpers.getAllTextStyles(librariesEnabled);

    checkingAlsoLibraries = librariesEnabled;
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(allTextStyles)})`).catch(console.error);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewMTSFLIdentifier);
  });

  webContents.on('ExecuteMerge', (editedGlobalTextStyles) => {
    Helpers.clog("Executing Merge");
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

    var mergeResults = MergeTextStyles(stylesToMerge, selectedIndex, 0, 1, webContents);

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

  const options = {
    identifier: webviewMSTSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;

  var stylesWithSimilarStyles;

  Helpers.clog("Loading webview");
  browserWindow.loadURL(require('../resources/mergesimilartextstyles.html'));


  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript(`UpdateSettings(${Helpers.getLibrariesEnabled()})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewMSTSIdentifier);
  });

  webContents.on('ExecuteMerge', (editedStylesWithSimilarStyles) => {
    Helpers.clog("Execute merge");
    var duplicatesSolved = 0;
    var mergeResults = [0, 0, 0];

    var totalToMerge = editedStylesWithSimilarStyles.filter(ems => !ems.isUnchecked && ems.selectedIndex >= 0).length;

    for (var i = 0; i < editedStylesWithSimilarStyles.length; i++) {
      if (!editedStylesWithSimilarStyles[i].isUnchecked && editedStylesWithSimilarStyles[i].selectedIndex >= 0) {
        var basePercent = (duplicatesSolved * 100 / editedStylesWithSimilarStyles.length);
        var localMergeResults = MergeTextStyles(stylesWithSimilarStyles[i].similarStyles, editedStylesWithSimilarStyles[i].selectedIndex, basePercent, totalToMerge, webContents);

        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];

        duplicatesSolved++;
      }
    }

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
    stylesWithSimilarStyles = Helpers.FindAllSimilarTextStyles(context, includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);
    webContents.executeJavaScript(`DrawResultsList(${JSON.stringify(stylesWithSimilarStyles)})`).catch(console.error);
  });

}
