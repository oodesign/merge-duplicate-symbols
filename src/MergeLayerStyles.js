import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
var UI = require('sketch/ui')
const Helpers = require("./Helpers");

const webviewMLSFLIdentifier = 'merge-layerstylesfromlist.webview'
const webviewMDLSIdentifier = 'merge-duplicatelayerstyles.webview'
const webviewMSLSIdentifier = 'merge-similarlayerstyles.webview'

var checkingAlsoLibraries = false;

function MergeLayerStyles(stylesToMerge, styleToKeep, basePercent, totalToMerge, webContents) {

  Helpers.dlog("-- Starting Merge Layer Styles (" + stylesToMerge.length + "). Style to keep is:" + styleToKeep);

  var stylesToRemove = [];
  var styleToApply;
  var instancesChanged = 0;
  var overridesChanged = 0;
  var stylesRemoved = 0;
  var idsMap = new Map();

  Helpers.dlog("---- Processing styles to remove");
  styleToApply = stylesToMerge[styleToKeep].layerStyle;

  Helpers.dlog("---- styleToApply(1):");
  Helpers.dlog(styleToApply);

  if (stylesToMerge[styleToKeep].isForeign) {
    Helpers.dlog("---- styleToApply is foreign");

    if (stylesToMerge[styleToKeep].localStyle) {
      Helpers.dlog("---- styleToApply takes localStyle");
      styleToApply = stylesToMerge[styleToKeep].localStyle.layerStyle;
    }
    else {
      Helpers.dlog("---- styleToApply is imported from library");
      styleToApply = Helpers.importLayerStyleFromLibrary(stylesToMerge[styleToKeep]);
    }
  }


  Helpers.dlog("---- styleToApply)(2):");
  Helpers.dlog(styleToApply);

  var tasksToPerform = 0, tasksExecuted = 0;
  var progress = basePercent;
  var instancesToChange = 0, overridesToChange = 0;
  var instOverMap = new Map();


  Helpers.dlog("---- Getting all related styles instances and overrides");


  var layerStylesMap = Helpers.getSimpleLayerStylesMap(context, stylesToMerge);
  layerStylesMap.forEach((value, key) => {
    console.log(key.name + " has " + value.directInstances.length + " direct instances, " + value.localStyleDirectInstances.length + " local style instances, and " + value.instancesWithOverrides.length + " overrides. ");
    instancesToChange += value.directInstances.length + value.localStyleDirectInstances.length;
    overridesChanged += value.instancesWithOverrides.length;
  });


  for (var i = 0; i < stylesToMerge.length; i++) {
    if (i != styleToKeep) {
      // idsMap.set(stylesToMerge[i].layerStyle.id)
      stylesToRemove.push(stylesToMerge[i].layerStyle);

      // var instancesOfStyle = Helpers.getLayerStyleInstances(stylesToMerge[i].layerStyle);
      // var styleOverrides = Helpers.getLayerStyleOverrides(stylesToMerge[i].layerStyle, idsMap);

      // instOverMap.set(stylesToMerge[i], {
      //   "instancesOfStyle": instancesOfStyle,
      //   "styleOverrides": styleOverrides
      // });

      // instancesToChange += instancesOfStyle.length;
      // overridesToChange += styleOverrides.length;
    }
  }

  tasksToPerform = instancesToChange + overridesToChange;

  Helpers.ctime("Merging layer style:" + stylesToMerge[styleToKeep].name);
  webContents.executeJavaScript(`ShowMergeProgress()`).catch(console.error);

  for (var i = 0; i < stylesToMerge.length; i++) {
    if (i != styleToKeep) {
      if (!stylesToMerge[i].isForeign)
        stylesRemoved++;

      Helpers.ctime("-- Taking instances and overrides");
      var instancesOfStyle = layerStylesMap.get(stylesToMerge[i]).directInstances.concat(layerStylesMap.get(stylesToMerge[i]).localStyleDirectInstances);
      var styleOverrides = layerStylesMap.get(stylesToMerge[i]).instancesWithOverrides;
      Helpers.ctimeEnd("-- Taking instances and overrides");


      Helpers.ctime("-- Unlinking from library");
      Helpers.dlog("------ Checking if symbol to merge is foreign");
      if (stylesToMerge[i].isForeign) {
        // Uncomment
        // stylesToMerge[i].layerStyle.unlinkFromLibrary();
      }
      Helpers.ctimeEnd("-- Unlinking from library");


      var message = "Merging " + stylesToMerge[styleToKeep].name;

      Helpers.ctime("-- Updating overrides");
      Helpers.dlog("---- Updating overrides (" + styleOverrides.length + ")");
      styleOverrides.forEach(function (override) {
        try {
          Helpers.dlog("------ Updating override for " + override.instance.name);
          // Uncomment
          // override.instance.setOverrideValue(override.override, styleToApply.id.toString());
          overridesChanged++;
          tasksExecuted++;
          progress = Math.floor(basePercent + ((tasksExecuted * 100 / tasksToPerform) / totalToMerge));
          var message2 = "Updating overrides (" + overridesChanged + " of " + overridesToChange + ")";
          webContents.executeJavaScript(`UpdateMergeProgress(${progress}, ${JSON.stringify(message)}, ${JSON.stringify(message2)})`).catch(console.error);
        } catch (e) {
          Helpers.dlog("---- ERROR: Couldn't update override for " + override.instance.name);
          Helpers.dlog(e);
        }
      });
      Helpers.ctimeEnd("-- Updating overrides");


      Helpers.ctime("-- Updating instances");
      Helpers.dlog("---- Updating instances (" + instancesOfStyle.length + ") to styleToApply:" + styleToApply.name);
      instancesOfStyle.forEach(function (instance) {

        Helpers.dlog(instance);
        var isInDocument = (Helpers.sketch.find('[id=instance.id]').length > 0);

        try {
          Helpers.dlog("------ Updating instance " + instance.name + ", in artboard " + instance.getParentArtboard().name + ". isInDocument: " + isInDocument);
        }
        catch (e) {
          Helpers.dlog("------ Updating instance " + instance.name + ". Instance doesn't belong to any specific artboard." + ". isInDocument: " + isInDocument);
        }

        // Uncomment
        // instance.sharedStyle = styleToApply;
        // instance.style.syncWithSharedStyle(styleToApply);

        tasksExecuted++;
        instancesChanged++;
        progress = Math.floor(basePercent + ((tasksExecuted * 100 / tasksToPerform) / totalToMerge));
        var message2 = "Updating instances (" + instancesChanged + " of " + instancesToChange + ")";
        webContents.executeJavaScript(`UpdateMergeProgress(${progress}, ${JSON.stringify(message)}, ${JSON.stringify(message2)})`).catch(console.error);
      });

      Helpers.ctimeEnd("-- Updating instances");

    }
  }

  Helpers.ctimeEnd("Merging layer style:" + stylesToMerge[styleToKeep].name);
  Helpers.dlog("---- Finalized instance and override replacement.");

  var sharedStylesToRemove = Helpers.document.sharedLayerStyles.filter(sharedStyle => isMarkedForRemove(sharedStyle, stylesToRemove));

  Helpers.dlog("---- Removing discarded layer styles (" + sharedStylesToRemove.length + ").");
  webContents.executeJavaScript(`UpdateMergeProgress(${progress}, ${JSON.stringify(message)}, "Removing discarded layer styles")`).catch(console.error);


  Helpers.ctime("Removing discarded styles");
  sharedStylesToRemove.forEach(sharedStyleToRemove => {
    Helpers.dlog("------ Removing " + sharedStyleToRemove.name + " (" + sharedStyleToRemove.id + ") from sharedLayerStyles.");
    // Uncomment
    // sharedStyleToRemove.unlinkFromLibrary();
    Helpers.dlog("-------- Unlinked from library.");
    var styleIndex = Helpers.document.sharedLayerStyles.findIndex(sL => sL.id == sharedStyleToRemove.id);
    Helpers.dlog("-------- Located in sharedLayerStyles (" + styleIndex + ").");
    Helpers.document.sharedLayerStyles.splice(styleIndex, 1);
    Helpers.dlog("-------- Removed from sharedLayerStyles.");
  });
  Helpers.ctimeEnd("Removing discarded styles");

  Helpers.dlog("---- Merge completed.");

  return [stylesRemoved, instancesChanged, overridesChanged];

}

function isMarkedForRemove(sharedLayerStyle, stylesToRemove) {
  var redId1 = sharedLayerStyle.style.id;
  var redId2 = (sharedLayerStyle.id.indexOf("[") >= 0) ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;
  return (stylesToRemove.filter(str => (str.id == sharedLayerStyle.id) || (str.id == redId1) || (str.id == redId2)).length > 0);
}

export function MergeDuplicateLayerStyles(context) {

  Helpers.clog("----- Merge duplicate layer styles -----");

  const options = {
    identifier: webviewMDLSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;

  var onlyDuplicatedLayerStyles, layerStylesMap;
  var mergeSession = [];
  var mergeSessionMap = new Map();

  CalculateDuplicates(Helpers.getLibrariesEnabled());

  if (onlyDuplicatedLayerStyles.length > 0) {
    browserWindow.loadURL(require('../resources/mergeduplicatelayerstyles.html'));
  }
  else {
    UI.message("Looks like there are no layer styles with the same name.");
    onShutdown(webviewMDLSIdentifier);
  }

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Finding duplicate layer styles. Including libraries:" + includeLibraries);
    onlyDuplicatedLayerStyles = Helpers.getAllDuplicateLayerStylesByName(context, includeLibraries);
    console.log(onlyDuplicatedLayerStyles);

    layerStylesMap = Helpers.getLayerStylesMap(context, onlyDuplicatedLayerStyles);
    console.log(layerStylesMap);

    if (onlyDuplicatedLayerStyles.length > 0) {
      Helpers.GetSpecificLayerStyleData(onlyDuplicatedLayerStyles[0], layerStylesMap);
      mergeSession = [];
      onlyDuplicatedLayerStyles.forEach(duplicate => {
        var reducedStyle = Helpers.getReducedLayerStyleData(duplicate);
        mergeSessionMap.set(reducedStyle, duplicate);
        mergeSession.push({
          "layerStyleWithDuplicates": reducedStyle,
          "selectedIndex": -1,
          "isUnchecked": false,
          "isProcessed": (mergeSession.length == 0)
        });
      });
      console.log(mergeSession);
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
    onShutdown(webviewMDLSIdentifier);
  });

  webContents.on('RecalculateDuplicates', (includeLibraries) => {
    Helpers.clog("Recalculating duplicates");
    CalculateDuplicates(includeLibraries);
    webContents.executeJavaScript(`DrawStylesList(${JSON.stringify(mergeSession)})`).catch(console.error);
  });

  webContents.on('GetSelectedStyleData', (index) => {
    Helpers.GetSpecificLayerStyleData(onlyDuplicatedLayerStyles[index], layerStylesMap);
    var stringify = JSON.stringify(Helpers.getReducedLayerStyleData(onlyDuplicatedLayerStyles[index]));
    webContents.executeJavaScript(`ReDrawAfterGettingData(${stringify},${index})`).catch(console.error);
  });

  webContents.on('ExecuteMerge', (editedMergeSession) => {
    Helpers.clog("Executing Merge");

    var duplicatesSolved = 0;
    var mergeResults = [0, 0, 0];

    var totalToMerge = editedMergeSession.filter(ems => !ems.isUnchecked && ems.selectedIndex >= 0).length;

    for (var i = 0; i < editedMergeSession.length; i++) {
      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        Helpers.clog("-- Merging " + mergeSession[i].layerStyleWithDuplicates.name);
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        var mergeobject = mergeSessionMap.get(mergeSession[i].layerStyleWithDuplicates);
        var basePercent = (duplicatesSolved * 100 / editedMergeSession.length);

        var localMergeResults = MergeLayerStyles(mergeobject.duplicates, mergeSession[i].selectedIndex, basePercent, totalToMerge, webContents);
        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];

        duplicatesSolved++;
      }
    }

    onShutdown(webviewMDLSIdentifier);
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


      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " layer styles" + replacedStuff);

      UI.message("Hey ho! You just removed " + mergeResults[0] + " layer styles" + replacedStuff + " Amazing!");
    }

  });
};

export function MergeSelectedLayerStyles(context) {

  var layerStylesMap;

  Helpers.clog("----- Merge selected text styles -----");

  const options = {
    identifier: webviewMLSFLIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;

  var allLayerStyles;
  var styleCounter = 0;

  Helpers.clog("Get layer styles list. Libraries included:" + Helpers.getLibrariesEnabled());
  allLayerStyles = Helpers.getAllLayerStyles(Helpers.getLibrariesEnabled());
  styleCounter = allLayerStyles.length;
  checkingAlsoLibraries = Helpers.getLibrariesEnabled();
  Helpers.clog("allLayerStyles:" + allLayerStyles.length);


  console.log("Pre layerStylesMap");
  layerStylesMap = Helpers.getSimpleLayerStylesMap(context, allLayerStyles);
  console.log("Post layerStylesMap");

  var counter = 0;
  layerStylesMap.forEach((value, key) => {
    if (key.name == "Tints/Active") {
      console.log(key.name + " has " + value.directInstances.length + " direct instances, " + value.localStyleDirectInstances.length + " local style instances, and " + value.instancesWithOverrides.length + " overrides. ");
      // console.log("value.directInstances");
      // console.log(value.directInstances);
      // console.log("value.localStyleDirectInstances");
      // console.log(value.localStyleDirectInstances);
      // console.log("value.instancesWithOverrides");
      // console.log(value.instancesWithOverrides);
      counter++;
    }
  });

  if (styleCounter > 1) {
    browserWindow.loadURL(require('../resources/mergelayerstylesfromlist.html'));
  }
  else {
    if (styleCounter == 1)
      UI.message("There's only 1 layer style. No need to merge.");
    else
      UI.message("Looks like there are no layer styles.");

    onShutdown(webviewMLSFLIdentifier);
  }

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })


  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(allLayerStyles)},${Helpers.getLibrariesEnabled()})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('GetSpecificLayerStyleInfo', (index) => {
    // Helpers.GetSpecificLayerStyleData(allLayerStyles[0], layerStylesMap);
    //webContents.executeJavaScript(`PopulateSpecificLayerStyle(${JSON.stringify(allLayerStyles)})`).catch(console.error);
  });


  webContents.on('GetStylesList', (librariesEnabled) => {
    Helpers.clog("Get styles list");
    allLayerStyles = Helpers.getAllLayerStyles(librariesEnabled);

    checkingAlsoLibraries = librariesEnabled;
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(allLayerStyles)})`).catch(console.error);
  });


  webContents.on('Cancel', () => {
    onShutdown(webviewMLSFLIdentifier);
  });

  webContents.on('ExecuteMerge', (editedGlobalLayerStyles) => {
    Helpers.clog("Executing Merge");
    var selectedIndex = -1;
    var stylesToMerge = [];

    //Create merge structure
    for (var i = 0; i < allLayerStyles.length; i++) {
      allLayerStyles[i].isSelected = editedGlobalLayerStyles[i].isSelected;
      allLayerStyles[i].isChosen = editedGlobalLayerStyles[i].isChosen;

      if (allLayerStyles[i].isSelected) {
        if (allLayerStyles[i].isChosen) {
          selectedIndex = stylesToMerge.length;
        }
        stylesToMerge.push(allLayerStyles[i]);
      }
    }

    var mergeResults = MergeLayerStyles(stylesToMerge, selectedIndex, 0, 1, webContents);

    onShutdown(webviewMLSFLIdentifier);

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


      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " layer styles" + replacedStuff);

      UI.message("Hey ho! You just removed " + mergeResults[0] + " layer styles" + replacedStuff + " Amazing!");
    }
  });
};

export function MergeSimilarLayerStyles(context) {

  Helpers.clog("----- Merge similar layer styles -----");

  const options = {
    identifier: webviewMSLSIdentifier,
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
  browserWindow.loadURL(require('../resources/mergesimilarlayerstyles.html'));


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
    onShutdown(webviewMSLSIdentifier);
  });

  webContents.on('ExecuteMerge', (editedStylesWithSimilarStyles) => {
    Helpers.clog("Execute merge");
    var duplicatesSolved = 0;
    var mergeResults = [0, 0, 0];

    var totalToMerge = editedStylesWithSimilarStyles.filter(ems => !ems.isUnchecked && ems.selectedIndex >= 0).length;

    for (var i = 0; i < editedStylesWithSimilarStyles.length; i++) {
      if (!editedStylesWithSimilarStyles[i].isUnchecked && editedStylesWithSimilarStyles[i].selectedIndex >= 0) {
        var basePercent = (duplicatesSolved * 100 / editedStylesWithSimilarStyles.length);
        var localMergeResults = MergeLayerStyles(stylesWithSimilarStyles[i].similarStyles, editedStylesWithSimilarStyles[i].selectedIndex, basePercent, totalToMerge, webContents);

        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];

        duplicatesSolved++;
      }
    }

    onShutdown(webviewMSLSIdentifier);

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


      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " layer styles" + replacedStuff);

      UI.message("Hey ho! You just removed " + mergeResults[0] + " layer styles" + replacedStuff + " Amazing!");
    }

  });

  webContents.on('RecalculateStyles', (includeAllLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowXYBlurSpread) => {
    Helpers.clog("RecalculateStyles");
    stylesWithSimilarStyles = Helpers.FindAllSimilarLayerStyles(context, includeAllLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowXYBlurSpread);

    webContents.executeJavaScript(`DrawResultsList(${JSON.stringify(stylesWithSimilarStyles)})`).catch(console.error);
  });

}

