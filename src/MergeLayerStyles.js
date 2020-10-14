import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
var UI = require('sketch/ui')
const Helpers = require("./Helpers");

const webviewMLSFLIdentifier = 'merge-layerstylesfromlist.webview'
const webviewMDLSIdentifier = 'merge-duplicatelayerstyles.webview'
const webviewMSLSIdentifier = 'merge-similarlayerstyles.webview'

var checkingAlsoLibraries = false;
var currentSelectedStyles = [];


function getLayerPredicate(style) {
  var predicate;
  if (style.originalStyle != null)
    predicate = NSPredicate.predicateWithFormat("(sharedStyle.objectID == %@) OR (sharedStyle.objectID == %@)", style.originalStyle.localShareID(), style.originalStyle.remoteShareID());
  else
    predicate = NSPredicate.predicateWithFormat("sharedStyle.objectID == %@", style.layerStyle.objectID());

  return predicate;
}

function MergeLayerStyles(context, styleToKeep) {
  var layersChangedCounter = 0;
  var overridesChangedCounter = 0;


  Helpers.clog("Merging styles. Keep '" + currentSelectedStyles[styleToKeep].name + "'");

  var layers = Helpers.getAllLayers(context);
  var layersWithOtherStyles = NSMutableArray.array();


  currentSelectedStyles.forEach(function (style) {
    if (style.layerStyle != currentSelectedStyles[styleToKeep].layerStyle) {
      var predicate = getLayerPredicate(style),
        layersWithSameStyle = layers.filteredArrayUsingPredicate(predicate),
        instanceLoop = layersWithSameStyle.objectEnumerator(),
        instance;

      while (instance = instanceLoop.nextObject()) {
        layersWithOtherStyles.addObject(instance);
      }

      if (style.correlativeStyles != null) {
        var countercorrelative = 0;
        for (var i = 0; i < style.correlativeStyles.length; i++) {
          var predicateCorrelative = NSPredicate.predicateWithFormat("sharedStyle.objectID == %@", style.correlativeStyles[i].localObject().objectID()),
            layersWithSameStyleCorrelative = layers.filteredArrayUsingPredicate(predicateCorrelative),
            instanceLoopCorrelative = layersWithSameStyle.objectEnumerator(),
            instanceCorrelative;

          while (instanceCorrelative = instanceLoopCorrelative.nextObject()) {
            layersWithOtherStyles.addObject(instanceCorrelative);
            countercorrelative++;
          }
        }
      }
    }
  });

  Helpers.clog("Merging styles -- Found " + layersWithOtherStyles.length + " layers using the discarded styles");

  var foreignStyleReference, foreignStyle;
  if (currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library != null) {

    Helpers.clog("Merging styles -- Selected style is foreign");
    foreignStyleReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(currentSelectedStyles[styleToKeep].layerStyle, currentSelectedStyles[styleToKeep].library);
    foreignStyle = AppController.sharedInstance().librariesController().importShareableObjectReference_intoDocument(foreignStyleReference, context.document.documentData());
    Helpers.clog("Merging styles -- Added reference to foreign style");
  }

  layersWithOtherStyles.forEach(function (layer) {
    if (currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library != null) {
      Helpers.clog("Merging styles -- Assigning style (foreign) to layer '" + layer.name() + "'");
      layer.setSharedStyle(foreignStyle.localSharedStyle());
    }
    else {
      Helpers.clog("Merging styles -- Assigning style to layer '" + layer.name() + "'");
      layer.setSharedStyle(currentSelectedStyles[styleToKeep].layerStyle);
    }

    layersChangedCounter++;
  });

  Helpers.clog("Merging styles -- Updating layer overrides");
  overridesChangedCounter += UpdateLayerOverrides(currentSelectedStyles, styleToKeep, context, foreignStyle);
  Helpers.clog("Merging styles -- Updated layer overrides");

  currentSelectedStyles.forEach(function (style) {
    if (style.layerStyle != currentSelectedStyles[styleToKeep].layerStyle) {

      Helpers.clog("Merging styles -- Removing style '" + style.name + "'");
      if (style.foreign && (style.library == null)) {
        if (context.document.documentData().foreignLayerStyles().indexOf(style.originalStyle) > -1) {
          Helpers.clog("Merging styles -- Removing style from foreignLayerStyles");
          context.document.documentData().foreignLayerStyles().removeObject(style.originalStyle);
        }

        if (style.correlativeStyles != null) {
          for (var i = 0; i < style.correlativeStyles.length; i++) {
            if (context.document.documentData().foreignLayerStyles().indexOf(style.correlativeStyles[i]) > -1) {
              Helpers.clog("Merging styles -- Removing also style '" + style.correlativeStyles[i].localObject().name() + "' from foreignLayerStyles");
              context.document.documentData().foreignLayerStyles().removeObject(style.correlativeStyles[i]);
            }
          }
        }
      }
      else {
        Helpers.clog("Merging styles -- Removing shared style from layerStyles");
        context.document.documentData().layerStyles().removeSharedStyle(style.layerStyle);
      }
    }
  });

  Helpers.clog("Merging styles -- Completed");

  return [layersChangedCounter, overridesChangedCounter];
}

function UpdateLayerOverrides(currentSelectedStyles, styleToKeep, context, foreignStyle) {

  var overridesChangedCounter = 0;
  var allSymbolInstances = NSMutableArray.array();
  context.document.documentData().allSymbols().forEach(function (symbolMaster) {
    var instances = Helpers.getSymbolInstances(context, symbolMaster),
      instanceLoop = instances.objectEnumerator(),
      instance;

    while (instance = instanceLoop.nextObject()) {
      allSymbolInstances.addObject(instance);
    }
  });

  allSymbolInstances.forEach(function (symbolInstance) {
    var overridePointsToReplace = [];
    var overrides = symbolInstance.overrides();

    symbolInstance.availableOverrides().forEach(function (availableOverride) {

      var allOverridesThatWeShouldReplace = [];

      getAllLayerOverridesThatWeShouldReplace(availableOverride, currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, 0, context);

      for (var i = 0; i < allOverridesThatWeShouldReplace.length; i++) {
        if (currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library != null) {
          symbolInstance.setValue_forOverridePoint_(foreignStyle.localSharedStyle().objectID(), allOverridesThatWeShouldReplace[i].overridePoint());
        }
        else {
          symbolInstance.setValue_forOverridePoint_(currentSelectedStyles[styleToKeep].layerStyle.objectID(), allOverridesThatWeShouldReplace[i].overridePoint());
        }

        overridesChangedCounter++;
      }
    });
  });

  return overridesChangedCounter;
}

function getAllLayerOverridesThatWeShouldReplace(availableOverride, currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, level, context) {
  var verbose = false;

  if (verbose) console.log(symbolInstance.name() + "(" + level + ")" + ": ---   Name:" + availableOverride.overridePoint().layerName() + "    -    CV:" + availableOverride.currentValue() + "   -   DV:" + availableOverride.defaultValue());

  if (availableOverride.children() == null) {
    currentSelectedStyles.forEach(function (style) {
      if (style.layerStyle != currentSelectedStyles[styleToKeep].layerStyle) {
        if (Helpers.isString(availableOverride.currentValue())) {
          if ((availableOverride.currentValue().toString().indexOf(style.layerStyle.objectID()) > -1)
            || (style.originalStyle != null && (availableOverride.currentValue().toString().indexOf(style.originalStyle.localShareID()) > -1))
            || (style.originalStyle != null && (availableOverride.currentValue().toString().indexOf(style.originalStyle.remoteShareID()) > -1))
          ) {
            if (verbose) console.log("Adding it");
            allOverridesThatWeShouldReplace.push(availableOverride);
          }

          if (style.correlativeStyles != null) {

            if (verbose) console.log("Checking overrides: " + style.name + " has " + style.correlativeStyles.length + " correlative styles.")
            for (var i = 0; i < style.correlativeStyles.length; i++) {
              if ((availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].localObject().objectID()) > -1)
                || (style.originalStyle != null && (availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].localShareID()) > -1))
                || (style.originalStyle != null && (availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].remoteShareID()) > -1))
              ) {
                if (verbose) console.log("Adding it - correlative");
                allOverridesThatWeShouldReplace.push(availableOverride);
              }
            }
          }
        }
      }
    });
  }
  else {
    if (verbose) console.log("Digging deeper because it has " + availableOverride.children().length + " children");
    availableOverride.children().forEach(function (child) {
      getAllLayerOverridesThatWeShouldReplace(child, currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, level + 1, context)
    });
  }
}

function getDuplicateLayerStyles(context, allStyles) {

  var layerStylesNames = [];
  var layerDuplicatedStylesNames = [];

  for (var i = 0; i < allStyles.length; i++) {
    var style = allStyles[i];

    if (Helpers.getIndexOf(style.name, layerStylesNames) > -1) {
      if (Helpers.getIndexOf(style.name, layerDuplicatedStylesNames) < 0) {
        layerDuplicatedStylesNames.push(style.name);
      }
    }

    layerStylesNames.push(style.name);
  }

  return layerDuplicatedStylesNames;

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

  var onlyDuplicatedLayerStyles;
  var mergeSession = [];
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
    onlyDuplicatedLayerStyles = Helpers.getDuplicateLayerStyles(context, includeLibraries);
    if (onlyDuplicatedLayerStyles.length > 0) {
      Helpers.GetSpecificLayerStyleData(context, onlyDuplicatedLayerStyles, 0);
      mergeSession = [];
      for (var i = 0; i < onlyDuplicatedLayerStyles.length; i++) {
        mergeSession.push({
          "layerStyleWithDuplicates": onlyDuplicatedLayerStyles[i],
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
    Helpers.GetSpecificLayerStyleData(context, onlyDuplicatedLayerStyles, index);
    webContents.executeJavaScript(`ReDrawAfterGettingData(${JSON.stringify(mergeSession[index].layerStyleWithDuplicates)},${index})`).catch(console.error);
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
      Helpers.clog("Wpdated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
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
    definedLayerStyles = Helpers.getDefinedLayerStyles(context, false, null);
    styleCounter = definedLayerStyles.length;
    checkingAlsoLibraries = false;
  }
  else {
    Helpers.clog("Get all (including libraries) styles list");
    definedAllLayerStyles = Helpers.getDefinedLayerStyles(context, true, null);
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
      definedLayerStyles = Helpers.getDefinedLayerStyles(context, false, null);

    checkingAlsoLibraries = false;
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedLayerStyles)})`).catch(console.error);
  });

  webContents.on('GetAllStylesList', () => {
    Helpers.clog("Get all (including libraries) styles list");
    if (definedAllLayerStyles == null)
      definedAllLayerStyles = Helpers.getDefinedLayerStyles(context, true, null);

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

