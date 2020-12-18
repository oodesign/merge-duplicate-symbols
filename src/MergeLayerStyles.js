import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import { debugLog } from './Helpers';
var UI = require('sketch/ui')
const Helpers = require("./Helpers");

const webviewMLSFLIdentifier = 'merge-layerstylesfromlist.webview'
const webviewMDLSIdentifier = 'merge-duplicatelayerstyles.webview'
const webviewMSLSIdentifier = 'merge-similarlayerstyles.webview'

var checkingAlsoLibraries = false;
var currentSelectedStyles = [];

function MergeLayerStyles(context, styleToKeepIndex) {
  var layersChangedCounter = 0;
  var overridesChangedCounter = 0;
  var styleToKeep = currentSelectedStyles[styleToKeepIndex];
  var styleToApply = styleToKeep.layerStyle;
  var stylesToRemove = [];
  Helpers.clog("Merging styles. Keep '" + styleToKeep.name + "'");


  if (styleToKeep.isForeign) {
    var existingLs = Helpers.document.sharedLayerStyles.filter(function (ls) {
      return ls.id == styleToKeep.layerStyle.id;
    });

    if (existingLs.length <= 0) {
      Helpers.clog("Importing style from library " + styleToKeep.libraryName);
      styleToApply = Helpers.importLayerStyleFromLibrary(styleToKeep);
    }
    else
      Helpers.clog("Style not imported (as it's already in document)");
  }

  for (var i = 0; i < currentSelectedStyles.length; i++) {
    if (i != styleToKeepIndex) {
      stylesToRemove.push(currentSelectedStyles[i].layerStyle);
    }
  }

  currentSelectedStyles.forEach(function (style) {
    var instances = style.layerStyle.getAllInstancesLayers();

    Helpers.clog("-- Updating " + instances.length + "instances to " + styleToKeep.name);
    instances.forEach(function (instance) {
      instance.sharedStyle = styleToApply;
      instance.style.syncWithSharedStyle(styleToApply);
      layersChangedCounter++;
    });

    var relatedOverrides = Helpers.getRelatedOverrides(context, style.layerStyle.id, "layerStyle");
    Helpers.clog("-- Updating " + relatedOverrides.length + "related overrides to " + styleToKeep.name);
    relatedOverrides.forEach(function (override) {
      var instanceLayer = Helpers.document.getLayerWithID(override.instance.id);
      var instanceOverride = instanceLayer.overrides.filter(function (ov) {
        return ov.id == override.override.id;
      });

      try {
        Helpers.clog("------ Updating override for " + instanceLayer.name);
        instanceLayer.setOverrideValue(instanceOverride[0], styleToApply.id.toString());
        overridesChangedCounter++;
      } catch (e) {
        Helpers.clog("---- ERROR: Couldn't update override for " + instanceLayer.name);
      }
    });
  });

  stylesToRemove.forEach(function (styleToRemove) {
    var removeAtIndex = -1;
    for (var i = 0; i < Helpers.document.sharedLayerStyles.length; i++) {
      if (Helpers.document.sharedLayerStyles[i].id == styleToRemove.id) removeAtIndex = i;
    }
    if (removeAtIndex > -1) Helpers.document.sharedLayerStyles.splice(removeAtIndex, 1);
  });

  return [layersChangedCounter, overridesChangedCounter];
}


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
    var mergedStyles = 0;
    var affectedLayers = [0, 0];
    for (var i = 0; i < editedStylesWithSimilarStyles.length; i++) {
      if (!editedStylesWithSimilarStyles[i].isUnchecked && editedStylesWithSimilarStyles[i].selectedIndex >= 0) {
        currentSelectedStyles = [];
        for (var j = 0; j < editedStylesWithSimilarStyles[i].similarStyles.length; j++) {
          currentSelectedStyles.push(stylesWithSimilarStyles[i].similarStyles[j]);
          mergedStyles++;
        }

        var results = MergeLayerStyles(context, editedStylesWithSimilarStyles[i].selectedIndex);
        affectedLayers[0] += results[0];
        affectedLayers[1] += results[1];

        duplicatesSolved++;
      }
    }

    onShutdown(webviewMSLSIdentifier);

    if (duplicatesSolved <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    }
    else {
      Helpers.clog("Updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
      UI.message("Yo ho! We updated " + affectedLayers[0] + " layers and " + affectedLayers[1] + " overrides.");
    }

  });

  webContents.on('RecalculateStyles', (includeAllLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowXYBlurSpread) => {
    Helpers.clog("RecalculateStyles");
    stylesWithSimilarStyles = Helpers.FindAllSimilarLayerStyles(context, includeAllLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowXYBlurSpread);
    webContents.executeJavaScript(`DrawResultsList(${JSON.stringify(stylesWithSimilarStyles)})`).catch(console.error);
  });

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

    layerStylesMap = Helpers.getLayerStylesMap(context, onlyDuplicatedLayerStyles);

    // console.log("layerStylesMap:")
    // layerStylesMap.forEach(function (value, key) {
    //   console.log("---- -- " + key.name + " - Direct:" + value.directInstances.length + " - Indirect:" + value.instancesWithOverrides.length);
    // });

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
    var stringify = JSON.stringify(Helpers.getReducedLayerStyleData(onlyDuplicatedLayerStyles[index]))
    webContents.executeJavaScript(`ReDrawAfterGettingData(${stringify},${index})`).catch(console.error);
  });

  webContents.on('ExecuteMerge', (editedMergeSession) => {
    Helpers.clog("Executing Merge");

    var duplicatesSolved = 0;
    var mergedStyles = 0;
    var affectedLayers = [0, 0];

    for (var i = 0; i < editedMergeSession.length; i++) {
      Helpers.clog("-- Merging " + mergeSession[i].layerStyleWithDuplicates.name);
      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        currentSelectedStyles = [];
        for (var j = 0; j < mergeSession[i].layerStyleWithDuplicates.duplicates.length; j++) {
          currentSelectedStyles.push(mergeSession[i].layerStyleWithDuplicates.duplicates[j]);
          mergedStyles++;
        }

        var results = MergeLayerStyles(context, editedMergeSession[i].selectedIndex);
        affectedLayers[0] += results[0];
        affectedLayers[1] += results[1];

        duplicatesSolved++;
      }
    }

    onShutdown(webviewMDLSIdentifier);
    if (duplicatesSolved <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    }
    else {
      Helpers.clog("Updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
      UI.message("Yo ho! We updated " + affectedLayers[0] + " layers and " + affectedLayers[1] + " overrides.");
    }

  });
};

export function MergeSelectedLayerStyles(context) {

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

  var definedLayerStyles;
  var definedAllLayerStyles;
  var styleCounter = 0;

  if (!Helpers.getLibrariesEnabled()) {
    Helpers.clog("Get local styles list");
    definedLayerStyles = Helpers.getDefinedLayerStyles(context, false);
    styleCounter = definedLayerStyles.length;
    checkingAlsoLibraries = false;
  }
  else {
    Helpers.clog("Get all (including libraries) styles list");
    definedAllLayerStyles = Helpers.getDefinedLayerStyles(context, true);
    styleCounter = definedAllLayerStyles.length;
    checkingAlsoLibraries = true;
  }

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
    if (!Helpers.getLibrariesEnabled())
      webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedLayerStyles)},${Helpers.getLibrariesEnabled()})`).catch(console.error);
    else
      webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedAllLayerStyles)},${Helpers.getLibrariesEnabled()})`).catch(console.error);

  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('GetLocalStylesList', () => {
    Helpers.clog("Get local styles list");
    if (definedLayerStyles == null)
      definedLayerStyles = Helpers.getDefinedLayerStyles(context, false);

    checkingAlsoLibraries = false;
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedLayerStyles)})`).catch(console.error);
  });

  webContents.on('GetAllStylesList', () => {
    Helpers.clog("Get all (including libraries) styles list");
    if (definedAllLayerStyles == null)
      definedAllLayerStyles = Helpers.getDefinedLayerStyles(context, true);

    checkingAlsoLibraries = true;
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedAllLayerStyles)})`).catch(console.error);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewMLSFLIdentifier);
  });

  webContents.on('ExecuteMerge', (editedGlobalLayerStyles) => {
    Helpers.clog("Executing Merge");
    currentSelectedStyles = [];
    var selectedIndex = -1;
    var counter = 0;
    if (!checkingAlsoLibraries) {
      for (var i = 0; i < definedLayerStyles.length; i++) {
        definedLayerStyles[i].isSelected = editedGlobalLayerStyles[i].isSelected;
        definedLayerStyles[i].isChosen = editedGlobalLayerStyles[i].isChosen;
        if (editedGlobalLayerStyles[i].isChosen) selectedIndex = counter;
        if (editedGlobalLayerStyles[i].isSelected) {
          currentSelectedStyles.push(definedLayerStyles[i]);
          counter++;
        }
      }
    }
    else {
      for (var i = 0; i < definedAllLayerStyles.length; i++) {
        definedAllLayerStyles[i].isSelected = editedGlobalLayerStyles[i].isSelected;
        definedAllLayerStyles[i].isChosen = editedGlobalLayerStyles[i].isChosen;
        if (editedGlobalLayerStyles[i].isChosen) selectedIndex = counter;
        if (editedGlobalLayerStyles[i].isSelected) {
          currentSelectedStyles.push(definedAllLayerStyles[i]);
          counter++;
        }
      }
    }

    var affectedLayers = MergeLayerStyles(context, selectedIndex);

    Helpers.clog("Updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
    UI.message("Yo ho! We updated " + affectedLayers[0] + " layers and " + affectedLayers[1] + " overrides.");

    onShutdown(webviewMLSFLIdentifier);
  });
};

