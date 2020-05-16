import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
const Helpers = require("./Helpers");
const webviewEsIdentifier = 'merge-duplicates.webviewSettings';

var globalSettingsFile;
var globalLogsEnabled = false;

export function EditSettings(context) {
  const optionss = {
    identifier: webviewEsIdentifier,
    width: 500,
    height: 600,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  }
  const browserWindow = new BrowserWindow(optionss);
  const webContents = browserWindow.webContents;


  browserWindow.loadURL(require('../resources/settings.html'));

  try {
    globalSettingsFile = Helpers.readFromFile(MSPluginManager.mainPluginsFolderURL().path() + '/merge.json');
    if ((globalSettingsFile != null) && (globalSettingsFile.logs != null))
      globalLogsEnabled = globalSettingsFile.logs;
  } catch (e) {
    console.log(e);
    return null;
  }


  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    webContents.executeJavaScript(`AssignSettings(${globalLogsEnabled})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    console.log(s);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewEsIdentifier);
  });

  webContents.on('AcceptSettings', (logsEnabled) => {
    var jsonDef;

    if ((globalSettingsFile != null) && (globalSettingsFile.licenseKey != null)) {
      jsonDef = {
        "licenseKey": "" + globalSettingsFile.licenseKey,
        "logs": logsEnabled
      }
    }
    else if ((globalSettingsFile != null) && (globalSettingsFile.startTime != null)) {
      jsonDef = {
        "startTime": "" + globalSettingsFile.startTime,
        "logs": logsEnabled
      }
    }
    Helpers.writeTextToFile(jsonDef, MSPluginManager.mainPluginsFolderURL().path() + '/merge.json');
    onShutdown(webviewEsIdentifier);
  });
}

export function onShutdown(webviewID) {
  const existingWebview = getWebview(webviewID)
  if (existingWebview) {
    existingWebview.close()
  }
}