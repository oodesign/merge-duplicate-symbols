const MergeSymbols = require("./MergeDuplicateSymbols");
const MergeStyles = require("./MergeStyles");
const Helpers = require("./Helpers");
import BrowserWindow from 'sketch-module-web-view';
import { getWebview } from 'sketch-module-web-view/remote';
import UI from 'sketch/ui'
const webviewRegIdentifier = 'merge-duplicates.webviewReg';

var globalRemainingDays = 0;
var globalIsInTrial = false;
var globalIsExpired = false;
var globalIsOver = false;

var globalCommand;


export function MergeDuplicateSymbols(context) {
  globalCommand = Helpers.commands.mergeduplicatesymbols;
  onValidate(context);
};

export function MergeSelectedSymbols(context) {
  globalCommand = Helpers.commands.mergeselectedsymbols;
  onValidate(context);
};

export function MergeSelectedTextStyles(context) {
  globalCommand = Helpers.commands.mergeselectedtextstyles;
  onValidate(context);
};

export function MergeSimilarTextStyles(context) {
  globalCommand = Helpers.commands.mergesimilartextstyles;
  onValidate(context);
};

export function MergeDuplicateTextStyles(context) {
  globalCommand = Helpers.commands.mergeduplicatetextstyles;
  onValidate(context);
};

export function MergeSelectedLayerStyles(context) {
  globalCommand = Helpers.commands.mergeselectedlayerstyles;
  onValidate(context);
};

export function MergeSimilarLayerStyles(context) {
  globalCommand = Helpers.commands.mergesimilarlayerstyles;
  onValidate(context);
};

export function MergeDuplicateLayerStyles(context) {
  globalCommand = Helpers.commands.mergeduplicatelayerstyles;
  onValidate(context);
};

//d9-01

function onValidate(context) {
  var state = Helpers.ExiGuthrie();
  if (state == Helpers.valStatus.app) {
    triggerMethod(context)
  }
  else {
    if (state == Helpers.valStatus.over) {
      globalIsOver = true;
      showRegistration(context);
    }
    else {
      var trialDate = Helpers.IsInTrial();
      var startTrialDate = new Date(parseInt(trialDate));
      if (trialDate != null) {
        var Difference_In_Time = startTrialDate - Date.now();
        var Difference_In_Days = Math.floor(Math.abs(Difference_In_Time / (1000 * 3600 * 24)));
        globalRemainingDays = 7 - Difference_In_Days;
        if (globalRemainingDays > 0)
          globalIsInTrial = true;
        else
          globalIsExpired = true;


        showRegistration(context);
      }
      else {
        showRegistration(context);
      }
    }
  }
}
//var _0xd76e=["\x61\x70\x70","\x76\x61\x6C\x53\x74\x61\x74\x75\x73","\x6F\x76\x65\x72","\x6E\x6F\x77","\x61\x62\x73","\x66\x6C\x6F\x6F\x72"];export function onValidate(_0xb471x2){var _0xb471x3=Helpers.ExiGuthrie();if(_0xb471x3== Helpers[_0xd76e[1]][_0xd76e[0]]){scanTextLayers(_0xb471x2)}else {if(_0xb471x3== Helpers[_0xd76e[1]][_0xd76e[2]]){globalIsOver= true;showRegistration(_0xb471x2)}else {var _0xb471x4=Helpers.IsInTrial();var _0xb471x5= new Date(parseInt(_0xb471x4));if(_0xb471x4!= null){var _0xb471x6=_0xb471x5- Date[_0xd76e[3]]();var _0xb471x7=Math[_0xd76e[5]](Math[_0xd76e[4]](_0xb471x6/ (1000* 3600* 24)));globalRemainingDays= 7- _0xb471x7;if(globalRemainingDays> 0){globalIsInTrial= true}else {globalIsExpired= true};showRegistration(_0xb471x2)}else {showRegistration(_0xb471x2)}}}}

//d9-01

export function triggerMethod(context) {
  console.log("I'm triggering " + globalCommand);
  switch (globalCommand) {
    case Helpers.commands.mergeduplicatesymbols:
      MergeSymbols.MergeDuplicateSymbols(context);
      break;
    case Helpers.commands.mergeselectedsymbols:
      MergeSymbols.MergeSelectedSymbols(context);
      break;
    case Helpers.commands.mergeduplicatetextstyles:
        MergeStyles.MergeDuplicateTextStyles(context);
      break;
    case Helpers.commands.mergeselectedtextstyles:
        MergeStyles.MergeSelectedTextStyles(context);
      break;
    case Helpers.commands.mergesimilartextstyles:
        MergeStyles.MergeSimilarTextStyles(context);
      break;
    case Helpers.commands.mergeduplicatelayerstyles:
        MergeStyles.MergeDuplicateLayerStyles(context);
      break;
    case Helpers.commands.mergeselectedlayerstyles:
        MergeStyles.MergeSelectedLayerStyles(context);
      break;
    case Helpers.commands.mergesimilarlayerstyles:
        MergeStyles.MergeSimilarLayerStyles(context);
      break;
  }
}



export function showRegistration(context) {

  var options = {
    identifier: webviewRegIdentifier,
    width: 1200,
    height: 700,
    show: false,
    titleBarStyle: 'hidden'
  }

  var regWindow = new BrowserWindow(options)

  const webContentsReg = regWindow.webContents;

  //d9-02
  regWindow.once('ready-to-show', () => {
    if (globalIsInTrial) {
      webContentsReg.executeJavaScript(`SetTrialMode(${JSON.stringify(globalRemainingDays)})`).catch(console.error);
    }
    if (globalIsExpired) {
      webContentsReg.executeJavaScript(`SetExpiredMode()`).catch(console.error);
    }
    if (globalIsOver) {
      webContentsReg.executeJavaScript(`SetOverMode()`).catch(console.error);
    }

    regWindow.show()
  });

  webContentsReg.on('did-finish-load', () => {
    if (globalIsInTrial) {
      webContentsReg.executeJavaScript(`SetTrialMode(${JSON.stringify(globalRemainingDays)})`).catch(console.error);
    }
    if (globalIsExpired) {
      webContentsReg.executeJavaScript(`SetExpiredMode()`).catch(console.error);
    }
    if (globalIsOver) {
      webContentsReg.executeJavaScript(`SetOverMode()`).catch(console.error);
    }
  })

  webContentsReg.on('RegisterKey', (licenseKey) => {
    var state = Helpers.Guthrie(licenseKey, true);
    if (state == Helpers.valStatus.app) {
      var licenseplain = {
        "licenseKey": "" + licenseKey
      }
      Helpers.writeTextToFile(licenseplain, MSPluginManager.mainPluginsFolderURL().path() + '/merge.json');
      webContentsReg.executeJavaScript(`ShowRegistrationComplete()`).catch(console.error);
    }
    else {
      if (state == Helpers.valStatus.over) {
        webContentsReg.executeJavaScript(`SetOverMode()`).catch(console.error);
        webContentsReg.executeJavaScript(`SetOverModeInReg()`).catch(console.error);
      }
      else
        webContentsReg.executeJavaScript(`ShowRegistrationFail()`).catch(console.error);
    }
  });



  webContentsReg.on('StartTrial', (licenseKey) => {
    var trialStart = {
      "startTime": "" + Date.now()
    }
    Helpers.writeTextToFile(trialStart, MSPluginManager.mainPluginsFolderURL().path() + '/merge.json');
    webContentsReg.executeJavaScript(`ShowTrialStarted()`).catch(console.error);

  });


  webContentsReg.on('ContinueTrial', () => {
    console.log("w1");
    onShutdown(webviewRegIdentifier);
    console.log("w2");
    //scanTextLayers(context);
    console.log("w3");
  });

  webContentsReg.on('LetsStartTrial', () => {
    globalIsInTrial = true;
    globalRemainingDays = 7;
    onShutdown(webviewRegIdentifier);
    //scanTextLayers(context);
  });

  webContentsReg.on('LetsStart', () => {
    globalIsInTrial = false;
    onShutdown(webviewRegIdentifier);
    //scanTextLayers(context);
  });
  //var _0xbf12 = ["\x72\x65\x61\x64\x79\x2D\x74\x6F\x2D\x73\x68\x6F\x77", "\x65\x72\x72\x6F\x72", "\x63\x61\x74\x63\x68", "\x53\x65\x74\x54\x72\x69\x61\x6C\x4D\x6F\x64\x65\x28", "\x73\x74\x72\x69\x6E\x67\x69\x66\x79", "\x29", "\x65\x78\x65\x63\x75\x74\x65\x4A\x61\x76\x61\x53\x63\x72\x69\x70\x74", "\x53\x65\x74\x45\x78\x70\x69\x72\x65\x64\x4D\x6F\x64\x65\x28\x29", "\x53\x65\x74\x4F\x76\x65\x72\x4D\x6F\x64\x65\x28\x29", "\x73\x68\x6F\x77", "\x6F\x6E\x63\x65", "\x64\x69\x64\x2D\x66\x69\x6E\x69\x73\x68\x2D\x6C\x6F\x61\x64", "\x6F\x6E", "\x52\x65\x67\x69\x73\x74\x65\x72\x4B\x65\x79", "\x61\x70\x70", "\x76\x61\x6C\x53\x74\x61\x74\x75\x73", "", "\x70\x61\x74\x68", "\x6D\x61\x69\x6E\x50\x6C\x75\x67\x69\x6E\x73\x46\x6F\x6C\x64\x65\x72\x55\x52\x4C", "\x2F\x53\x74\x79\x6C\x65\x4D\x65\x2E\x6A\x73\x6F\x6E", "\x77\x72\x69\x74\x65\x54\x65\x78\x74\x54\x6F\x46\x69\x6C\x65", "\x53\x68\x6F\x77\x52\x65\x67\x69\x73\x74\x72\x61\x74\x69\x6F\x6E\x43\x6F\x6D\x70\x6C\x65\x74\x65\x28\x29", "\x6F\x76\x65\x72", "\x53\x65\x74\x4F\x76\x65\x72\x4D\x6F\x64\x65\x49\x6E\x52\x65\x67\x28\x29", "\x53\x68\x6F\x77\x52\x65\x67\x69\x73\x74\x72\x61\x74\x69\x6F\x6E\x46\x61\x69\x6C\x28\x29", "\x53\x74\x61\x72\x74\x54\x72\x69\x61\x6C", "\x6E\x6F\x77", "\x53\x68\x6F\x77\x54\x72\x69\x61\x6C\x53\x74\x61\x72\x74\x65\x64\x28\x29", "\x43\x6F\x6E\x74\x69\x6E\x75\x65\x54\x72\x69\x61\x6C", "\x4C\x65\x74\x73\x53\x74\x61\x72\x74\x54\x72\x69\x61\x6C", "\x4C\x65\x74\x73\x53\x74\x61\x72\x74"]; regWindow[_0xbf12[10]](_0xbf12[0], () => { if (globalIsInTrial) { webContentsReg[_0xbf12[6]]((_0xbf12[3] + (JSON[_0xbf12[4]](globalRemainingDays)) + _0xbf12[5]))[_0xbf12[2]](console[_0xbf12[1]]) }; if (globalIsExpired) { webContentsReg[_0xbf12[6]](_0xbf12[7])[_0xbf12[2]](console[_0xbf12[1]]) }; if (globalIsOver) { webContentsReg[_0xbf12[6]](_0xbf12[8])[_0xbf12[2]](console[_0xbf12[1]]) }; regWindow[_0xbf12[9]]() }); webContentsReg[_0xbf12[12]](_0xbf12[11], () => { if (globalIsInTrial) { webContentsReg[_0xbf12[6]]((_0xbf12[3] + (JSON[_0xbf12[4]](globalRemainingDays)) + _0xbf12[5]))[_0xbf12[2]](console[_0xbf12[1]]) }; if (globalIsExpired) { webContentsReg[_0xbf12[6]](_0xbf12[7])[_0xbf12[2]](console[_0xbf12[1]]) }; if (globalIsOver) { webContentsReg[_0xbf12[6]](_0xbf12[8])[_0xbf12[2]](console[_0xbf12[1]]) } }); webContentsReg[_0xbf12[12]](_0xbf12[13], (_0x875bx1) => { var _0x875bx2 = Helpers.Guthrie(_0x875bx1, true); if (_0x875bx2 == Helpers[_0xbf12[15]][_0xbf12[14]]) { var _0x875bx3 = { "\x6C\x69\x63\x65\x6E\x73\x65\x4B\x65\x79": _0xbf12[16] + _0x875bx1 }; Helpers[_0xbf12[20]](_0x875bx3, MSPluginManager[_0xbf12[18]]()[_0xbf12[17]]() + _0xbf12[19]); webContentsReg[_0xbf12[6]](_0xbf12[21])[_0xbf12[2]](console[_0xbf12[1]]) } else { if (_0x875bx2 == Helpers[_0xbf12[15]][_0xbf12[22]]) { webContentsReg[_0xbf12[6]](_0xbf12[8])[_0xbf12[2]](console[_0xbf12[1]]); webContentsReg[_0xbf12[6]](_0xbf12[23])[_0xbf12[2]](console[_0xbf12[1]]) } else { webContentsReg[_0xbf12[6]](_0xbf12[24])[_0xbf12[2]](console[_0xbf12[1]]) } } }); webContentsReg[_0xbf12[12]](_0xbf12[25], (_0x875bx1) => { var _0x875bx4 = { "\x73\x74\x61\x72\x74\x54\x69\x6D\x65": _0xbf12[16] + Date[_0xbf12[26]]() }; Helpers[_0xbf12[20]](_0x875bx4, MSPluginManager[_0xbf12[18]]()[_0xbf12[17]]() + _0xbf12[19]); webContentsReg[_0xbf12[6]](_0xbf12[27])[_0xbf12[2]](console[_0xbf12[1]]) }); webContentsReg[_0xbf12[12]](_0xbf12[28], () => { onShutdown(webviewRegIdentifier); scanTextLayers(context) }); webContentsReg[_0xbf12[12]](_0xbf12[29], () => { globalIsInTrial = true; globalRemainingDays = 7; onShutdown(webviewRegIdentifier); scanTextLayers(context) }); webContentsReg[_0xbf12[12]](_0xbf12[30], () => { globalIsInTrial = false; onShutdown(webviewRegIdentifier); scanTextLayers(context) })

  //d9-02

  webContentsReg.on('nativeLog', s => {
    console.log(s);
  })

  webContentsReg.on('OpenPluginWeb', s => {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("http://www.mergeduplicates.com"));
  })

  webContentsReg.on('Cancel', () => {
    onShutdown(webviewRegIdentifier);
  });

  regWindow.loadURL(require('../resources/register.html'));
}


export function onShutdown(webviewID) {
  const existingWebview = getWebview(webviewID)
  if (existingWebview) {
    existingWebview.close()
  }
}