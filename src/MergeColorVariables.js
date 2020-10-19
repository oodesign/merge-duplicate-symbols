import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import { debugLog } from './Helpers';
const sketch = require('sketch');
var UI = require('sketch/ui')
const Helpers = require("./Helpers");

const webviewMDCVIdentifier = 'merge-duplicatecolorvariables.webview'
const webviewMCVFLIdentifier = 'merge-colorvariablesfromlist.webview'
const webviewMSCVIdentifier = 'merge-similarcolorvariables.webview'

var checkingAlsoLibraries = false;
var currentSelectedColorVariables = [];

function MergeColorVariables(context, colorVariableToKeepIndex) {
  var layersChangedCounter = 0;
  var overridesChangedCounter = 0;
  var colorVariableToKeep = currentSelectedColorVariables[colorVariableToKeepIndex];
  var colorVariableToApply = colorVariableToKeep.colorVariable;
  var colorVariablesToRemove = [];
  Helpers.clog("Merging color variables. Keep '" + colorVariableToKeep.name + "'");

  if (colorVariableToKeep.foreign) {
    var existingCV = Helpers.document.swatches.filter(function (sw) {
      return sw.id == colorVariableToKeep.colorVariable.id;
    });
    if (existingCV.length <= 0) {
      Helpers.clog("Importing color variable from library " + colorVariableToKeep.libraryName);
      colorVariableToApply = Helpers.importColorVariableFromLibrary(colorVariableToKeep);
    }
    else
      Helpers.clog("Color variable not imported (as it's already in document)");
  }

  for (var i = 0; i < currentSelectedColorVariables.length; i++) {
    if (i != colorVariableToKeepIndex) {
      colorVariablesToRemove.push(currentSelectedColorVariables[i].colorVariable);
    }
  }

  currentSelectedColorVariables.forEach(function (colorVariable) {
    doUseColorSwatchesInLayers(colorVariable, colorVariablesToRemove);
    doUseColorSwatchesInStyles(colorVariable, colorVariablesToRemove);
  });

  colorVariablesToRemove.forEach(function (colorVariableToRemove) {
    var removeAtIndex = -1;
    for (var i = 0; i < Helpers.document.swatches.length; i++) {
      if (Helpers.document.swatches[i].id == colorVariableToRemove.id) removeAtIndex = i;
    }
    if (removeAtIndex > -1) Helpers.document.swatches.splice(removeAtIndex, 1);
  });

  return [layersChangedCounter, overridesChangedCounter];
}

function doUseColorSwatchesInLayers(colorVariable, colorVariablesToRemove) {
  // When you open an existing document in Sketch 69, the color assets in the document will be migrated to Color Swatches. However, layers using those colors will not be changed to use the new swatches. This plugin takes care of this
  const allLayers = sketch.find('*') // TODO: optimise this query: ShapePath, SymbolMaster, Text, SymbolInstance
  allLayers.forEach(layer => {
    layer.style.fills
      .concat(layer.style.borders)
      .filter(item => item.fillType == 'Color')
      .forEach(item => {
        colorVariablesToRemove.forEach(cvToRemove => {
          if (item.color == cvToRemove.color)
            item.color = colorVariable.colorVariable.referencingColor;
        });
      })
    // Previous actions don't work for Text Layer colors that are colored using TextColor, so let's fix that:
    if (layer.style.textColor) {
      colorVariablesToRemove.forEach(cvToRemove => {
        if (layer.style.textColor == cvToRemove.color)
          layer.style.textColor = colorVariable.colorVariable.referencingColor;
      });
    }
  })
}

function doUseColorSwatchesInStyles(colorVariable, colorVariablesToRemove) {
  // This method traverses all Layer and Text Styles, and makes sure they use Color Swatches that exist in the document.
  const stylesCanBeUpdated = []

  const allLayerStyles = Helpers.document.sharedLayerStyles
  allLayerStyles.forEach(style => {
    style.getAllInstances().forEach(styleInstance => {
      if (!styleInstance.isOutOfSyncWithSharedStyle(style)) {
        stylesCanBeUpdated.push({ instance: styleInstance, style: style })
      }
    })
    style.style.fills.concat(style.style.borders).forEach(item => {
      if (item.fillType == 'Color') {
        colorVariablesToRemove.forEach(cvToRemove => {
          if (item.color == cvToRemove.color)
            item.color = colorVariable.colorVariable.referencingColor;
        });
      }
    })
    // TODO: This could also work with gradients...
  })

  const allTextStyles = Helpers.document.sharedTextStyles
  allTextStyles.forEach(style => {
    style.getAllInstances().forEach(styleInstance => {
      if (!styleInstance.isOutOfSyncWithSharedStyle(style)) {
        stylesCanBeUpdated.push({ instance: styleInstance, style: style })
      }
    })
    const currentStyle = style.style
    colorVariablesToRemove.forEach(cvToRemove => {
      if (currentStyle.textColor == cvToRemove.color)
        currentStyle.textColor = colorVariable.colorVariable.referencingColor;
    });
  })
  // Finally, update all layers that use a style we updated...
  stylesCanBeUpdated.forEach(pair => {
    pair.instance.syncWithSharedStyle(pair.style)
  })
}

export function MergeDuplicateColorVariables(context) {

  Helpers.clog("----- Merge duplicate color variables -----");

  const options = {
    identifier: webviewMDCVIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;

  var onlyDuplicatedColorVariables;
  var mergeSession = [];
  CalculateDuplicates(Helpers.getLibrariesEnabled());

  if (onlyDuplicatedColorVariables.length > 0) {
    browserWindow.loadURL(require('../resources/mergeduplicatecolorvariables.html'));
  }
  else {
    UI.message("Looks like there are no color variables with the same name.");
    onShutdown(webviewMDCVIdentifier);
  }

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Finding duplicate color variables. Including libraries:" + includeLibraries);
    onlyDuplicatedColorVariables = Helpers.getDuplicateColorVariables(context, includeLibraries);
    if (onlyDuplicatedColorVariables.length > 0) {
      //Helpers.GetSpecificLayerStyleData(context, onlyDuplicatedColorVariables, 0);
      mergeSession = [];
      for (var i = 0; i < onlyDuplicatedColorVariables.length; i++) {
        mergeSession.push({
          "colorVariableWithDuplicates": onlyDuplicatedColorVariables[i],
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
    webContents.executeJavaScript(`DrawColorVariablesList(${JSON.stringify(mergeSession)}, ${Helpers.getLibrariesEnabled()})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewMDCVIdentifier);
  });

  webContents.on('RecalculateDuplicates', (includeLibraries) => {
    Helpers.clog("Recalculating duplicates");
    CalculateDuplicates(includeLibraries);
    webContents.executeJavaScript(`DrawColorVariablesList(${JSON.stringify(mergeSession)})`).catch(console.error);
  });

  webContents.on('GetSelectedStyleData', (index) => {
    //Helpers.GetSpecificLayerStyleData(context, onlyDuplicatedColorVariables, index);
    webContents.executeJavaScript(`ReDrawAfterGettingData(${JSON.stringify(mergeSession[index].colorVariableWithDuplicates)},${index})`).catch(console.error);
  });

  webContents.on('ExecuteMerge', (editedMergeSession) => {
    Helpers.clog("Executing Merge");

    var duplicatesSolved = 0;
    var mergedColorVariables = 0;
    var affectedLayers = [0, 0];

    for (var i = 0; i < editedMergeSession.length; i++) {
      Helpers.clog("-- Merging " + mergeSession[i].colorVariableWithDuplicates.name);
      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        currentSelectedColorVariables = [];
        for (var j = 0; j < mergeSession[i].colorVariableWithDuplicates.duplicates.length; j++) {
          currentSelectedColorVariables.push(mergeSession[i].colorVariableWithDuplicates.duplicates[j]);
          mergedColorVariables++;
        }

        var results = MergeColorVariables(context, editedMergeSession[i].selectedIndex);
        affectedLayers[0] += results[0];
        affectedLayers[1] += results[1];

        duplicatesSolved++;
      }
    }

    onShutdown(webviewMDCVIdentifier);
    if (duplicatesSolved <= 0) {
      Helpers.clog("No color variables were merged");
      UI.message("No color variables were merged");
    }
    else {
      Helpers.clog("Updated " + affectedLayers[0] + " layers");
      UI.message("Yo ho! We updated " + affectedLayers[0] + " layers");
    }

  });
};

export function MergeSelectedColorVariables(context) {

  Helpers.clog("----- Merge selected color variables -----");

  const options = {
    identifier: webviewMCVFLIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;


  var definedColorVariables;
  var definedAllColorVariables;
  var colorVariableCounter = 0;

  if (!Helpers.getLibrariesEnabled()) {
    Helpers.clog("Get local color variables list");
    definedColorVariables = Helpers.getDefinedColorVariables(context, false);
    colorVariableCounter = definedColorVariables.length;
    checkingAlsoLibraries = false;
  }

  if (Helpers.getLibrariesEnabled()) {
    Helpers.clog("Get all (including libraries) color variables list");
    definedAllColorVariables = Helpers.getDefinedColorVariables(context, true);
    colorVariableCounter = definedAllColorVariables.length;
    checkingAlsoLibraries = true;
  }

  if (colorVariableCounter > 1) {
    browserWindow.loadURL(require('../resources/mergecolorvariablesfromlist.html'));
  }
  else {
    if (colorVariableCounter == 1)
      UI.message("There's only 1 color variable. No need to merge.");
    else
      UI.message("Looks like there are no color variables.");

    onShutdown(webviewMCVFLIdentifier);
  }


  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    Helpers.clog("Webview loaded");
    if (!Helpers.getLibrariesEnabled())
      webContents.executeJavaScript(`DrawColorVariableList(${JSON.stringify(definedColorVariables)},${Helpers.getLibrariesEnabled()})`).catch(console.error);
    else
      webContents.executeJavaScript(`DrawColorVariableList(${JSON.stringify(definedAllColorVariables)},${Helpers.getLibrariesEnabled()})`).catch(console.error);

  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('GetLocalColorVariablesList', () => {
    Helpers.clog("Get local color variables list");
    if (definedColorVariables == null)
      definedColorVariables = Helpers.getDefinedColorVariables(context, false);

    checkingAlsoLibraries = false;
    webContents.executeJavaScript(`DrawColorVariableList(${JSON.stringify(definedColorVariables)})`).catch(console.error);
  });

  webContents.on('GetAllColorVariablesList', () => {
    Helpers.clog("Get all (including libraries) color variables list");
    if (definedAllColorVariables == null)
      definedAllColorVariables = Helpers.getDefinedColorVariables(context, true);

    checkingAlsoLibraries = true;
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedAllColorVariables)})`).catch(console.error);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewMCVFLIdentifier);
  });

  webContents.on('ExecuteMerge', (editedGlobalColorVariables) => {
    Helpers.clog("Executing Merge");
    currentSelectedColorVariables = [];
    var selectedIndex = -1;
    var counter = 0;

    if (!checkingAlsoLibraries) {
      for (var i = 0; i < definedColorVariables.length; i++) {
        definedColorVariables[i].isSelected = editedGlobalColorVariables[i].isSelected;
        definedColorVariables[i].isChosen = editedGlobalColorVariables[i].isChosen;
        if (editedGlobalColorVariables[i].isChosen) selectedIndex = counter;
        if (editedGlobalColorVariables[i].isSelected) {
          currentSelectedColorVariables.push(definedColorVariables[i]);
          counter++;
        }
      }
    }
    else {
      for (var i = 0; i < definedAllColorVariables.length; i++) {
        definedAllColorVariables[i].isSelected = editedGlobalColorVariables[i].isSelected;
        definedAllColorVariables[i].isChosen = editedGlobalColorVariables[i].isChosen;
        if (editedGlobalColorVariables[i].isChosen) selectedIndex = counter;
        if (editedGlobalColorVariables[i].isSelected) {
          currentSelectedColorVariables.push(definedAllColorVariables[i]);
          counter++;
        }
      }
    }

    var affectedLayers = MergeColorVariables(context, selectedIndex);

    Helpers.clog("Updated " + affectedLayers[0] + " layers and " + affectedLayers[1] + " overrides.");
    UI.message("Yo ho! We updated " + affectedLayers[0] + " layers and " + affectedLayers[1] + " overrides.");

    onShutdown(webviewMCVFLIdentifier);
  });

};

export function MergeSimilarColorVariables(context) {

  Helpers.clog("----- Merge similar color variables -----");

};

