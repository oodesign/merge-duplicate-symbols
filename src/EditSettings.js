import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
const Helpers = require("./Helpers");
const webviewEsIdentifier = 'merge-duplicates.webviewSettings';

var globalSettingsFile;

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
  globalSettingsFile = Helpers.getSettings();

  browserWindow.once('ready-to-show', () => {
    browserWindow.show()
  })

  webContents.on('did-finish-load', () => {
    webContents.executeJavaScript(`AssignSettings(${Helpers.getLogsEnabled()},${Helpers.getLibrariesEnabled()})`).catch(console.error);
  })

  webContents.on('nativeLog', s => {
    Helpers.clog(s);
  });

  webContents.on('Cancel', () => {
    onShutdown(webviewEsIdentifier);
  });

  webContents.on('AcceptSettings', (logsEnabled, librariesEnabledByDefault) => {
    //d9-06
    var _0x243758=_0x1341;function _0x5b45(){var _0x3fa45b=['9WkjPkK','32QxUtep','10331330esoxtb','1261088tnVBkO','1009788znpocN','3gLefAM','startTime','path','8659356fthuGA','/merge.json','72695fOOgwR','licenseKey','mainPluginsFolderURL','2262281vnyMAF','2450884TCIXzo'];_0x5b45=function(){return _0x3fa45b;};return _0x5b45();}(function(_0x1bd1fd,_0x4a6c13){var _0x1e39e7=_0x1341,_0x3cd4d7=_0x1bd1fd();while(!![]){try{var _0x2c1cd4=parseInt(_0x1e39e7(0x113))/0x1+-parseInt(_0x1e39e7(0x10e))/0x2*(-parseInt(_0x1e39e7(0x114))/0x3)+-parseInt(_0x1e39e7(0x112))/0x4+-parseInt(_0x1e39e7(0x10a))/0x5+-parseInt(_0x1e39e7(0x117))/0x6+-parseInt(_0x1e39e7(0x10d))/0x7*(-parseInt(_0x1e39e7(0x110))/0x8)+parseInt(_0x1e39e7(0x10f))/0x9*(-parseInt(_0x1e39e7(0x111))/0xa);if(_0x2c1cd4===_0x4a6c13)break;else _0x3cd4d7['push'](_0x3cd4d7['shift']());}catch(_0x35e0b6){_0x3cd4d7['push'](_0x3cd4d7['shift']());}}}(_0x5b45,0xb0380));function _0x1341(_0x547f8b,_0x26b0a8){var _0x5b4509=_0x5b45();return _0x1341=function(_0x1341dc,_0x1d8411){_0x1341dc=_0x1341dc-0x10a;var _0x18878a=_0x5b4509[_0x1341dc];return _0x18878a;},_0x1341(_0x547f8b,_0x26b0a8);}var jsonDef;if(globalSettingsFile!=null&&globalSettingsFile[_0x243758(0x10b)]!=null)jsonDef={'licenseKey':''+globalSettingsFile[_0x243758(0x10b)],'logs':logsEnabled,'librariesEnabledByDefault':librariesEnabledByDefault};else globalSettingsFile!=null&&globalSettingsFile[_0x243758(0x115)]!=null&&(jsonDef={'startTime':''+globalSettingsFile[_0x243758(0x115)],'logs':logsEnabled,'librariesEnabledByDefault':librariesEnabledByDefault});Helpers['writeTextToFile'](jsonDef,MSPluginManager[_0x243758(0x10c)]()[_0x243758(0x116)]()+_0x243758(0x118)),onShutdown(webviewEsIdentifier);
    //d9-06
  });
}

export function onShutdown(webviewID) {
  const existingWebview = getWebview(webviewID)
  if (existingWebview) {
    existingWebview.close()
  }
}