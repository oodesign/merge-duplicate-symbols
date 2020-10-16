import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import { debugLog } from './Helpers';
var UI = require('sketch/ui')
const Helpers = require("./Helpers");

const webviewMCVFLIdentifier = 'merge-colorvariablesfromlist.webview'

var checkingAlsoLibraries = false;
var currentSelectedStyles = [];

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
    currentSelectedStyles = [];
    var selectedIndex = -1;
    var counter = 0;

    if (!checkingAlsoLibraries) {
      for (var i = 0; i < definedColorVariables.length; i++) {
        definedColorVariables[i].isSelected = editedGlobalColorVariables[i].isSelected;
        definedColorVariables[i].isChosen = editedGlobalColorVariables[i].isChosen;
        if (editedGlobalColorVariables[i].isChosen) selectedIndex = counter;
        if (editedGlobalColorVariables[i].isSelected) {
          currentSelectedStyles.push(definedColorVariables[i]);
          counter++;
        }
      }
    }
    else {
      for (var i = 0; i < definedAllColorVariables.length; i++) {
        definedAllColorVariables[i].isSelected = editedGlobalTextStyles[i].isSelected;
        definedAllColorVariables[i].isChosen = editedGlobalTextStyles[i].isChosen;
        if (editedGlobalTextStyles[i].isChosen) selectedIndex = counter;
        if (editedGlobalTextStyles[i].isSelected) {
          currentSelectedStyles.push(definedAllColorVariables[i]);
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

