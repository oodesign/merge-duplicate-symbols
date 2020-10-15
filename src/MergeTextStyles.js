import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import { debugLog } from './Helpers';
const Helpers = require("./Helpers");
var UI = require('sketch/ui')

const webviewMTSFLIdentifier = 'merge-textstylesfromlist.webview'
const webviewMDTSIdentifier = 'merge-duplicatetextstyles.webview'
const webviewMSTSIdentifier = 'merge-similartextstyles.webview'

var checkingAlsoLibraries = false;
var currentSelectedStyles = [];


function MergeTextStyles(context, styleToKeepIndex) {
  var layersChangedCounter = 0;
  var overridesChangedCounter = 0;
  var styleToKeep = currentSelectedStyles[styleToKeepIndex];
  var styleToApply = styleToKeep.textStyle;
  Helpers.clog("Merging styles. Keep '" + styleToKeep.name + "'");

  if (styleToKeep.foreign) {
    styleToApply = Helpers.importTextStyleFromLibrary(styleToKeep);
  }

  currentSelectedStyles.forEach(function (style) {
    var instances = style.textStyle.getAllInstancesLayers();

    Helpers.clog("-- Updating "+ instances.length + "instances to " + styleToKeep.name);
    instances.forEach(function (instance) {

      instance.sharedStyle = styleToApply;
      instance.style.syncWithSharedStyle(styleToApply);
      layersChangedCounter++;
    });

    var relatedOverrides = Helpers.getRelatedOverrides(context, style.textStyle.id, "textStyle");
    Helpers.clog("-- Updating "+ relatedOverrides.length + "related overrides to " + styleToKeep.name);
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


  return [layersChangedCounter, overridesChangedCounter];
}


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
    var mergedStyles = 0;
    var affectedLayers = [0, 0];
    for (var i = 0; i < editedStylesWithSimilarStyles.length; i++) {
      if (!editedStylesWithSimilarStyles[i].isUnchecked && editedStylesWithSimilarStyles[i].selectedIndex >= 0) {
        currentSelectedStyles = [];
        for (var j = 0; j < editedStylesWithSimilarStyles[i].similarStyles.length; j++) {
          currentSelectedStyles.push(stylesWithSimilarStyles[i].similarStyles[j]);
          mergedStyles++;
        }

        var results = MergeTextStyles(context, editedStylesWithSimilarStyles[i].selectedIndex);
        affectedLayers[0] += results[0];
        affectedLayers[1] += results[1];

        duplicatesSolved++;
      }
    }
    onShutdown(webviewMSTSIdentifier);

    if (duplicatesSolved <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    }
    else {
      Helpers.clog("Updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
      UI.message("Yo ho! We updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
    }

  });

  webContents.on('RecalculateStyles', (includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) => {
    Helpers.clog("RecalculateStyles");
    stylesWithSimilarStyles = Helpers.FindAllSimilarTextStyles(context, includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);
    webContents.executeJavaScript(`DrawResultsList(${JSON.stringify(stylesWithSimilarStyles)})`).catch(console.error);
  });

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

  var onlyDuplicatedTextStyles;
  var mergeSession = [];


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

    onlyDuplicatedTextStyles = Helpers.getDuplicateTextStyles(context, includeLibraries);
    if (onlyDuplicatedTextStyles.length > 0) {

      Helpers.GetSpecificTextStyleData(context, onlyDuplicatedTextStyles, 0);
      mergeSession = [];
      for (var i = 0; i < onlyDuplicatedTextStyles.length; i++) {
        mergeSession.push({
          "textStyleWithDuplicates": onlyDuplicatedTextStyles[i],
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
    onShutdown(webviewMDTSIdentifier);
  });



  webContents.on('RecalculateDuplicates', (includeLibraries) => {
    Helpers.clog("Recalculating duplicates");
    CalculateDuplicates(includeLibraries);
    webContents.executeJavaScript(`DrawStylesList(${JSON.stringify(mergeSession)})`).catch(console.error);
  });

  webContents.on('GetSelectedStyleData', (index) => {
    Helpers.GetSpecificTextStyleData(context, onlyDuplicatedTextStyles, index);
    webContents.executeJavaScript(`ReDrawAfterGettingData(${JSON.stringify(mergeSession[index].textStyleWithDuplicates)},${index})`).catch(console.error);
  });

  webContents.on('ExecuteMerge', (editedMergeSession) => {
    Helpers.clog("Executing Merge");
    var duplicatesSolved = 0;
    var mergedStyles = 0;
    var affectedLayers = [0, 0];

    for (var i = 0; i < editedMergeSession.length; i++) {
      Helpers.clog("-- Merging " + mergeSession[i].textStyleWithDuplicates.name);
      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        currentSelectedStyles = [];
        for (var j = 0; j < mergeSession[i].textStyleWithDuplicates.duplicates.length; j++) {
          currentSelectedStyles.push(mergeSession[i].textStyleWithDuplicates.duplicates[j]);
          mergedStyles++;
        }

        var results = MergeTextStyles(context, editedMergeSession[i].selectedIndex);
        affectedLayers[0] += results[0];
        affectedLayers[1] += results[1];

        duplicatesSolved++;
      }
    }

    onShutdown(webviewMDTSIdentifier);
    if (duplicatesSolved <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    }
    else {
      Helpers.clog("Wpdated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
      UI.message("Yo ho! We updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
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


  var definedTextStyles;
  var definedAllTextStyles;
  var styleCounter = 0;

  if (!Helpers.getLibrariesEnabled()) {
    Helpers.clog("Get local styles list");
    definedTextStyles = Helpers.getDefinedTextStyles(context, false);
    styleCounter = definedTextStyles.length;
    checkingAlsoLibraries = false;
  }

  if (Helpers.getLibrariesEnabled()) {
    Helpers.clog("Get all (including libraries) styles list");
    definedAllTextStyles = Helpers.getDefinedTextStyles(context, true);
    styleCounter = definedAllTextStyles.length;
    checkingAlsoLibraries = true;
  }

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
    if (!Helpers.getLibrariesEnabled())
      webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedTextStyles)},${Helpers.getLibrariesEnabled()})`).catch(console.error);
    else
      webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedAllTextStyles)},${Helpers.getLibrariesEnabled()})`).catch(console.error);

  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('GetLocalStylesList', () => {
    Helpers.clog("Get local styles list");
    if (definedTextStyles == null)
      definedTextStyles = Helpers.getDefinedTextStyles(context, false);

    checkingAlsoLibraries = false;
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedTextStyles)})`).catch(console.error);
  });

  webContents.on('GetAllStylesList', () => {
    Helpers.clog("Get all (including libraries) styles list");
    if (definedAllTextStyles == null)
      definedAllTextStyles = Helpers.getDefinedTextStyles(context, true);

    checkingAlsoLibraries = true;
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedAllTextStyles)})`).catch(console.error);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewMTSFLIdentifier);
  });

  webContents.on('ExecuteMerge', (editedGlobalTextStyles) => {
    Helpers.clog("Executing Merge");
    currentSelectedStyles = [];
    var selectedIndex = -1;
    var counter = 0;

    if (!checkingAlsoLibraries) {
      for (var i = 0; i < definedTextStyles.length; i++) {
        definedTextStyles[i].isSelected = editedGlobalTextStyles[i].isSelected;
        definedTextStyles[i].isChosen = editedGlobalTextStyles[i].isChosen;
        if (editedGlobalTextStyles[i].isChosen) selectedIndex = counter;
        if (editedGlobalTextStyles[i].isSelected) {
          currentSelectedStyles.push(definedTextStyles[i]);
          counter++;
        }
      }
    }
    else {
      for (var i = 0; i < definedAllTextStyles.length; i++) {
        definedAllTextStyles[i].isSelected = editedGlobalTextStyles[i].isSelected;
        definedAllTextStyles[i].isChosen = editedGlobalTextStyles[i].isChosen;
        if (editedGlobalTextStyles[i].isChosen) selectedIndex = counter;
        if (editedGlobalTextStyles[i].isSelected) {
          currentSelectedStyles.push(definedAllTextStyles[i]);
          counter++;
        }
      }
    }

    var affectedLayers = MergeTextStyles(context, selectedIndex);

    Helpers.clog("Updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
    UI.message("Yo ho! We updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");

    onShutdown(webviewMTSFLIdentifier);
  });
};

