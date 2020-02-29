import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
const Helpers = require("./Helpers");

const webviewMTSFLIdentifier = 'merge-textstylesfromlist.webview'
const webviewMDTSIdentifier = 'merge-duplicatetextstyles.webview'
const webviewMSTSIdentifier = 'merge-similartextstyles.webview'

var checkingAlsoLibraries = false;
var currentSelectedStyles = [];


function getTextPredicate(style) {
  var predicate;
  if (style.originalStyle != null)
    predicate = NSPredicate.predicateWithFormat("(sharedStyle.objectID == %@) OR (sharedStyle.objectID == %@)", style.originalStyle.localShareID(), style.originalStyle.remoteShareID());
  else
    predicate = NSPredicate.predicateWithFormat("sharedStyle.objectID == %@", style.textStyle.objectID());

  return predicate;
}

function MergeTextStyles(context, styleToKeep) {
  var layersChangedCounter = 0;
  var overridesChangedCounter = 0;

  var layers = Helpers.getAllTextLayers(context);
  var layersWithOtherStyles = NSMutableArray.array();
  currentSelectedStyles.forEach(function (style) {
    if (style.textStyle != currentSelectedStyles[styleToKeep].textStyle) {
      var predicate = getTextPredicate(style),
        layersWithSameStyle = layers.filteredArrayUsingPredicate(predicate),
        instanceLoop = layersWithSameStyle.objectEnumerator(),
        instance;

      while (instance = instanceLoop.nextObject()) {
        layersWithOtherStyles.addObject(instance);
      }

      if (style.correlativeStyles != null) {
        //console.log(style.name+" has "+style.correlativeStyles.length+" correlative styles.")
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

        //console.log(countercorrelative+" layers had a correlative style applied");
      }
    }
  });

  var foreignStyleReference, foreignStyle;
  if (currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library != null) {
    foreignStyleReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(currentSelectedStyles[styleToKeep].textStyle, currentSelectedStyles[styleToKeep].library);
    foreignStyle = AppController.sharedInstance().librariesController().importShareableObjectReference_intoDocument(foreignStyleReference, context.document.documentData());
  }

  layersWithOtherStyles.forEach(function (layer) {
    if (currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library != null) {
      layer.setSharedStyle(foreignStyle.localSharedStyle());
    }
    else {
      layer.setSharedStyle(currentSelectedStyles[styleToKeep].textStyle);
    }

    layersChangedCounter++;
  });



  //overridesChangedCounter += LogTextOverrides(currentSelectedStyles, styleToKeep, context);
  overridesChangedCounter += UpdateTextOverrides(currentSelectedStyles, styleToKeep, context, foreignStyle);

  currentSelectedStyles.forEach(function (style) {
    if (style.textStyle != currentSelectedStyles[styleToKeep].textStyle) {

      if (style.foreign && (style.library == null)) {
        //console.log("You're trying to remove a library style");
        if (context.document.documentData().foreignTextStyles().indexOf(style.originalStyle) > -1) {
          context.document.documentData().foreignTextStyles().removeObject(style.originalStyle);
          //console.log("Removed style: "+style.name);
        }

        if (style.correlativeStyles != null) {
          for (var i = 0; i < style.correlativeStyles.length; i++) {
            if (context.document.documentData().foreignTextStyles().indexOf(style.correlativeStyles[i]) > -1) {
              context.document.documentData().foreignTextStyles().removeObject(style.correlativeStyles[i]);
              //console.log("Removed correlative");
            }
          }
        }
      }
      else {
        context.document.documentData().layerTextStyles().removeSharedStyle(style.textStyle);
        //console.log("Removed style: "+style.name);
      }
    }
  });

  return [layersChangedCounter, overridesChangedCounter];
}

function getAllTextOverridesThatWeShouldReplace(availableOverride, currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, level, context) {

  //console.log(symbolInstance.name()+"("+level+")"+": ---   Name:"+availableOverride.overridePoint().layerName()+"    -    CV:"+availableOverride.currentValue()+"   -   DV:"+availableOverride.defaultValue());

  if (availableOverride.children() == null) {
    currentSelectedStyles.forEach(function (style) {
      if (style.textStyle != currentSelectedStyles[styleToKeep].textStyle) {
        if (Helpers.isString(availableOverride.currentValue())) {
          if ((availableOverride.currentValue().toString().indexOf(style.textStyle.objectID()) > -1)
            || (style.originalStyle != null && (availableOverride.currentValue().toString().indexOf(style.originalStyle.localShareID()) > -1))
            || (style.originalStyle != null && (availableOverride.currentValue().toString().indexOf(style.originalStyle.remoteShareID()) > -1))
          ) {
            //console.log("Adding it");
            allOverridesThatWeShouldReplace.push(availableOverride);
          }

          if (style.correlativeStyles != null) {

            //console.log("Checking overrides: "+style.name+" has "+style.correlativeStyles.length+" correlative styles.")
            for (var i = 0; i < style.correlativeStyles.length; i++) {
              if ((availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].localObject().objectID()) > -1)
                || (style.originalStyle != null && (availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].localShareID()) > -1))
                || (style.originalStyle != null && (availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].remoteShareID()) > -1))
              ) {
                //console.log("Adding it - correlative");
                allOverridesThatWeShouldReplace.push(availableOverride);
              }
            }
          }
        }
      }
    });
  }
  else {
    //console.log("Digging deeper because it has "+availableOverride.children().length+" children");
    availableOverride.children().forEach(function (child) {
      getAllTextOverridesThatWeShouldReplace(child, currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, level + 1, context)
    });
  }
}

function UpdateTextOverrides(currentSelectedStyles, styleToKeep, context, foreignStyle) {

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

      getAllTextOverridesThatWeShouldReplace(availableOverride, currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, 0, context);
      //console.log(allOverridesThatWeShouldReplace);

      for (var i = 0; i < allOverridesThatWeShouldReplace.length; i++) {
        if (currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library != null) {
          symbolInstance.setValue_forOverridePoint_(foreignStyle.localSharedStyle().objectID(), allOverridesThatWeShouldReplace[i].overridePoint());
        }
        else {
          symbolInstance.setValue_forOverridePoint_(currentSelectedStyles[styleToKeep].textStyle.objectID(), allOverridesThatWeShouldReplace[i].overridePoint());
        }

        overridesChangedCounter++;
      }
    });
  });

  return overridesChangedCounter;
}

function getDuplicateTextStyles(context, allStyles) {

  var textStylesNames = [];
  var layerDuplicatedStylesNames = [];

  for (var i = 0; i < allStyles.length; i++) {
    var style = allStyles[i];

    if (Helpers.getIndexOf(style.name, textStylesNames) > -1) {
      if (Helpers.getIndexOf(style.name, layerDuplicatedStylesNames) < 0) {
        layerDuplicatedStylesNames.push(style.name);
      }
    }

    textStylesNames.push(style.name);
  }

  return layerDuplicatedStylesNames;

}

export function MergeSimilarTextStyles(context) {

  const options = {
    identifier: webviewMSTSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;

  var stylesWithSimilarStyles;

  browserWindow.loadURL(require('../resources/mergesimilartextstyles.html'));


  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
  })

  webContents.on('nativeLog', s => {
    console.log(s);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewMSTSIdentifier);
  });

  webContents.on('ExecuteMerge', (editedStylesWithSimilarStyles) => {
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

    if (duplicatesSolved <= 0)
      context.document.showMessage("No styles were merged");
    else
      context.document.showMessage("Yo ho! We updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");

  });

  webContents.on('RecalculateStyles', (includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) => {
    stylesWithSimilarStyles = Helpers.FindAllSimilarTextStyles(context, includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);
    webContents.executeJavaScript(`DrawResultsList(${JSON.stringify(stylesWithSimilarStyles)})`).catch(console.error);
  });

}

export function MergeDuplicateTextStyles(context) {
  const options = {
    identifier: webviewMDTSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;

  var onlyDuplicatedTextStyles;
  var mergeSession = [];
  CalculateDuplicates(true);

  if (onlyDuplicatedTextStyles.length > 0) {
    browserWindow.loadURL(require('../resources/mergeduplicatetextstyles.html'));
  }
  else {
    context.document.showMessage("Looks like there are no text styles with the same name.");
    onShutdown(webviewMDTSIdentifier);
  }

  function CalculateDuplicates(includeLibraries) {
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
    webContents.executeJavaScript(`DrawStylesList(${JSON.stringify(mergeSession)})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    console.log(s);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewMDTSIdentifier);
  });



  webContents.on('RecalculateDuplicates', (includeLibraries) => {
    CalculateDuplicates(includeLibraries);
    webContents.executeJavaScript(`DrawStylesList(${JSON.stringify(mergeSession)})`).catch(console.error);
  });

  webContents.on('GetSelectedStyleData', (index) => {
    Helpers.GetSpecificTextStyleData(context, onlyDuplicatedTextStyles, index);
    webContents.executeJavaScript(`ReDrawAfterGettingData(${JSON.stringify(mergeSession[index].textStyleWithDuplicates)},${index})`).catch(console.error);
  });

  webContents.on('ExecuteMerge', (editedMergeSession) => {
    var duplicatesSolved = 0;
    var mergedStyles = 0;
    var affectedLayers = [0, 0];

    for (var i = 0; i < editedMergeSession.length; i++) {
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
    if (duplicatesSolved <= 0)
      context.document.showMessage("No styles were merged");
    else
    context.document.showMessage("Yo ho! We updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");

  });
};

export function MergeSelectedTextStyles(context) {
  const options = {
    identifier: webviewMTSFLIdentifier,
    width: 1200,
    height: 700,
    show: false,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(options);
  const webContents = browserWindow.webContents;


  var definedTextStyles = Helpers.getDefinedTextStyles(context, false, null);
  var definedAllTextStyles;

  if (definedTextStyles.length > 1) {
    browserWindow.loadURL(require('../resources/mergetextstylesfromlist.html'));
  }
  else if (definedTextStyles.length == 1)
    context.document.showMessage("There's only 1 text style. No need to merge.");
  else
    context.document.showMessage("Looks like there are no layer styles.");

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedTextStyles)})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    console.log(s);
  });

  webContents.on('GetLocalStylesList', () => {
    checkingAlsoLibraries = false;
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedTextStyles)})`).catch(console.error);
  });

  webContents.on('GetAllStylesList', () => {
    if (definedAllTextStyles == null)
      definedAllTextStyles = Helpers.getDefinedTextStyles(context, true, null);

    checkingAlsoLibraries = true;
    webContents.executeJavaScript(`DrawStyleList(${JSON.stringify(definedAllTextStyles)})`).catch(console.error);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewMTSFLIdentifier);
  });

  webContents.on('ExecuteMerge', (editedGlobalTextStyles) => {
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

    context.document.showMessage("Yo ho! We updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");

    onShutdown(webviewMTSFLIdentifier);
  });
};

