
const sketch = require('sketch');
const dom = require('sketch/dom');
var ShapePath = require('sketch/dom').ShapePath;
var Text = require('sketch/dom').Text;
var DeltaE = require('delta-e');
var D3 = require('d3-color');
var fs = require('@skpm/fs');
var track = require("sketch-module-google-analytics");

var document = sketch.getSelectedDocument();
var symbols = document.getSymbols();
var libraries = dom.getLibraries();

var settingsFile;
var logsEnabled = false, timingEnabled = false;
var librariesEnabledByDefault = true;
var acquiredLicense = "Single";

const valStatus = {
  app: 'app',
  no: 'no',
  over: 'over',
  noCon: 'nocon'
}

const commands = {
  mergeduplicatesymbols: 'mergeduplicatesymbols',
  mergeselectedsymbols: 'mergeselectedsymbols',
  mergeselectedtextstyles: 'mergeselectedtextstyles',
  mergesimilartextstyles: 'mergesimilartextstyles',
  mergeduplicatetextstyles: 'mergeduplicatetextstyles',
  mergesimilarlayerstyles: 'mergesimilarlayerstyles',
  mergeselectedlayerstyles: 'mergeselectedlayerstyles',
  mergeduplicatelayerstyles: 'mergeduplicatelayerstyles',
  mergeduplicatecolorvariables: 'mergeduplicatecolorvariables',
  mergeselectedcolorvariables: 'mergeselectedcolorvariables',
  mergesimilarcolorvariables: 'mergesimilarcolorvariables',
  editsettings: 'editsettings'
}

const sketchlocalfile = "💎 This Sketch file";
const libraryPrefix = "🔸";

//d9-03
var _0x3c15 = ["\x69\x6E\x69\x74", "\x61\x6C\x6C\x6F\x63", "\x2F\x75\x73\x72\x2F\x62\x69\x6E\x2F\x63\x75\x72\x6C", "\x73\x65\x74\x4C\x61\x75\x6E\x63\x68\x50\x61\x74\x68", "\x73\x65\x74\x41\x72\x67\x75\x6D\x65\x6E\x74\x73", "\x70\x69\x70\x65", "\x73\x65\x74\x53\x74\x61\x6E\x64\x61\x72\x64\x4F\x75\x74\x70\x75\x74", "\x73\x65\x74\x53\x74\x61\x6E\x64\x61\x72\x64\x45\x72\x72\x6F\x72", "\x6C\x61\x75\x6E\x63\x68", "\x77\x61\x69\x74\x55\x6E\x74\x69\x6C\x45\x78\x69\x74", "\x74\x65\x72\x6D\x69\x6E\x61\x74\x69\x6F\x6E\x53\x74\x61\x74\x75\x73", "\x72\x65\x61\x64\x44\x61\x74\x61\x54\x6F\x45\x6E\x64\x4F\x66\x46\x69\x6C\x65", "\x66\x69\x6C\x65\x48\x61\x6E\x64\x6C\x65\x46\x6F\x72\x52\x65\x61\x64\x69\x6E\x67", "\x69\x6E\x69\x74\x57\x69\x74\x68\x44\x61\x74\x61\x5F\x65\x6E\x63\x6F\x64\x69\x6E\x67", "\x73\x75\x63\x63\x65\x73\x73", "\x70\x75\x72\x63\x68\x61\x73\x65", "\x54\x65\x61\x6D", "\x69\x6E\x64\x65\x78\x4F\x66", "\x76\x61\x72\x69\x61\x6E\x74\x73", "\x54\x65\x61\x6D\x20\x6C\x69\x63\x65\x6E\x73\x65", "\x53\x69\x6E\x67\x6C\x65", "\x61\x70\x70", "\x4D\x65\x72\x67\x65\x20\x44\x75\x70\x6C\x69\x63\x61\x74\x65\x73\x20\x2D\x20\x52\x65\x67\x69\x73\x74\x65\x72\x69\x6E\x67\x20\x6C\x69\x63\x65\x6E\x73\x65\x3A\x20\x54\x65\x61\x6D\x20\x6C\x69\x63\x65\x6E\x73\x65", "\x6C\x6F\x67", "\x75\x73\x65\x73", "\x71\x75\x61\x6E\x74\x69\x74\x79", "\x4D\x65\x72\x67\x65\x20\x44\x75\x70\x6C\x69\x63\x61\x74\x65\x73\x20\x2D\x20\x52\x65\x67\x69\x73\x74\x65\x72\x69\x6E\x67\x20\x6C\x69\x63\x65\x6E\x73\x65\x3A\x20\x53\x69\x6E\x67\x6C\x65\x20\x2D\x20\x53\x65\x61\x74\x73\x20\x65\x78\x63\x65\x65\x64\x65\x64\x2E", "\x6F\x76\x65\x72", "\x4D\x65\x72\x67\x65\x20\x44\x75\x70\x6C\x69\x63\x61\x74\x65\x73\x20\x2D\x20\x52\x65\x67\x69\x73\x74\x65\x72\x69\x6E\x67\x20\x6C\x69\x63\x65\x6E\x73\x65\x3A\x20\x53\x69\x6E\x67\x6C\x65", "\x6E\x6F", "\x6E\x6F\x43\x6F\x6E"]; function curl_async(_0x5275x2, _0x5275x3) { var _0x5275x4 = NSTask[_0x3c15[1]]()[_0x3c15[0]](); _0x5275x4[_0x3c15[3]](_0x3c15[2]); _0x5275x4[_0x3c15[4]](_0x5275x2); var _0x5275x5 = NSPipe[_0x3c15[5]](); var _0x5275x6 = NSPipe[_0x3c15[5]](); _0x5275x4[_0x3c15[6]](_0x5275x5); _0x5275x4[_0x3c15[7]](_0x5275x6); _0x5275x4[_0x3c15[8]](); _0x5275x4[_0x3c15[9]](); var _0x5275x7 = _0x5275x4[_0x3c15[10]](); var _0x5275x8 = _0x5275x6[_0x3c15[12]]()[_0x3c15[11]](); var _0x5275x9 = NSString[_0x3c15[1]]()[_0x3c15[13]](_0x5275x8, NSUTF8StringEncoding); if (_0x5275x7 == 0) { var _0x5275xa = _0x5275x5[_0x3c15[12]]()[_0x3c15[11]](); var _0x5275xb = NSString[_0x3c15[1]]()[_0x3c15[13]](_0x5275xa, NSUTF8StringEncoding); var _0x5275xc = tryParseJSON(_0x5275xb); if (_0x5275xc[_0x3c15[14]]) { if (!_0x5275x3) { if (_0x5275xc[_0x3c15[15]] != null) { if (_0x5275xc[_0x3c15[15]][_0x3c15[18]][_0x3c15[17]](_0x3c15[16]) > 0) { acquiredLicense = _0x3c15[19] } else { acquiredLicense = _0x3c15[20] } }; return valStatus[_0x3c15[21]] } else { if (_0x5275xc[_0x3c15[15]] != null) { if (_0x5275xc[_0x3c15[15]][_0x3c15[18]][_0x3c15[17]](_0x3c15[16]) > 0) { console[_0x3c15[23]](_0x3c15[22]); return valStatus[_0x3c15[21]] } else { if (_0x5275xc[_0x3c15[24]] > _0x5275xc[_0x3c15[15]][_0x3c15[25]]) { console[_0x3c15[23]](_0x3c15[26]); return valStatus[_0x3c15[27]] } else { console[_0x3c15[23]](_0x3c15[28]); return valStatus[_0x3c15[21]] } } } else { return valStatus[_0x3c15[21]] } } } else { return valStatus[_0x3c15[29]] } } else { return valStatus[_0x3c15[30]] } }
//d9-03


//d9-04
var _0x36d1 = ["\x70\x61\x74\x68", "\x6D\x61\x69\x6E\x50\x6C\x75\x67\x69\x6E\x73\x46\x6F\x6C\x64\x65\x72\x55\x52\x4C", "\x2F\x6D\x65\x72\x67\x65\x2E\x6A\x73\x6F\x6E", "\x73\x74\x61\x72\x74\x54\x69\x6D\x65", "\x6C\x69\x63\x65\x6E\x73\x65\x4B\x65\x79", "\x2D\x64", "\x70\x72\x6F\x64\x75\x63\x74\x5F\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x3D\x6D\x65\x72\x67\x65\x64\x75\x70\x6C\x69\x63\x61\x74\x65\x73\x79\x6D\x62\x6F\x6C\x73", "\x6C\x69\x63\x65\x6E\x73\x65\x5F\x6B\x65\x79\x3D", "", "\x69\x6E\x63\x72\x65\x6D\x65\x6E\x74\x5F\x75\x73\x65\x73\x5F\x63\x6F\x75\x6E\x74\x3D", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x67\x75\x6D\x72\x6F\x61\x64\x2E\x63\x6F\x6D\x2F\x76\x32\x2F\x6C\x69\x63\x65\x6E\x73\x65\x73\x2F\x76\x65\x72\x69\x66\x79"]; function IsInTrial() { try { var _0x20fax2 = jsonFromFile(MSPluginManager[_0x36d1[1]]()[_0x36d1[0]]() + _0x36d1[2]); if ((_0x20fax2 != null) && (_0x20fax2[_0x36d1[3]] != null)) { return _0x20fax2[_0x36d1[3]] } else { return null } } catch (e) { return null } } function ExiGuthrie() { try { var _0x20fax4 = jsonFromFile(MSPluginManager[_0x36d1[1]]()[_0x36d1[0]]() + _0x36d1[2]); if ((_0x20fax4 != null) && (_0x20fax4[_0x36d1[4]] != null)) { return Guthrie(_0x20fax4[_0x36d1[4]], false) } else { return false } } catch (e) { return false } } function Guthrie(_0x20fax6, _0x20fax7) { var _0x20fax8 = [_0x36d1[5], _0x36d1[6], _0x36d1[5], _0x36d1[7] + _0x20fax6 + _0x36d1[8], _0x36d1[5], _0x36d1[9] + _0x20fax7.toString() + _0x36d1[8], _0x36d1[10]]; return curl_async(_0x20fax8, _0x20fax7) }
//d9-04

function tryParseJSON(jsonString) {
  try {
    var o = JSON.parse(jsonString);
    if (o && typeof o === "object" && o !== null) {
      return o;
    }
  }
  catch (e) { }

  return false;
}


function writeTextToFile(text, filePath) {
  var t = NSString.stringWithFormat("%@", text),
    f = NSString.stringWithFormat("%@", filePath);
  fs.writeFileSync(f, JSON.stringify(text), { encoding: 'utf8' });
}

function readFromFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
}

var jsonFromFile = function (filePath, mutable) {
  var read = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  return read;
}

function analytics(action) {
  var res = track("UA-143977399-1", "event", {
    ec: "command", // the event category
    ea: action, // the event action
  });
}


function shouldEnableContrastMode(color) {
  var UI = require('sketch/ui');
  var theme = UI.getTheme();

  var labReferenceColor = D3.lab("#" + color);
  var labComparisonColor;
  if (theme === 'dark') {
    labComparisonColor = D3.lab("#212124");
  } else {
    labComparisonColor = D3.lab("#F9F9F9");
  }

  var color1 = { L: labReferenceColor.l, A: labReferenceColor.a, B: labReferenceColor.b };
  var color2 = { L: labComparisonColor.l, A: labComparisonColor.a, B: labComparisonColor.b };

  var deltaE = DeltaE.getDeltaE76(color1, color2);

  if (parseFloat(deltaE) < 30) {
    return true;
  }
  else
    return false;
}

function getAcquiredLicense() {
  return acquiredLicense;
}

function compareStyleArrays(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function compareColorVariableArrays(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}





function compareByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function FindSimilarTextStyles(referenceStyle, styles, context, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {

  var similarStyles = [];

  styles.forEach(function (style) {
    try {
      if (referenceStyle != style.textStyle) {

        var sameFont = false;
        try {
          sameFont = referenceStyle.style.fontFamily == style.textStyle.style.fontFamily;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose font");
        }

        var sameWeight = false;
        try {
          sameWeight = referenceStyle.style.fontWeight == style.textStyle.style.fontWeight;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose weight");
        }

        var sameSize = false;
        try {
          sameSize = referenceStyle.style.fontSize == style.textStyle.style.fontSize;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose size");
        }

        var sameColor = false;
        try {
          sameColor = referenceStyle.style.textColor == style.textStyle.style.textColor;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose color");
        }

        var sameParagraphSpacing = false;
        try {
          sameParagraphSpacing = referenceStyle.style.paragraphSpacing == style.textStyle.style.paragraphSpacing;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose paragraph spacing");
        }

        var sameLineHeight = false;
        try {
          sameLineHeight = referenceStyle.style.lineHeight == style.textStyle.style.lineHeight;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose line height");
        }

        var sameAlignment = false;
        try {
          sameAlignment = referenceStyle.style.alignment == style.textStyle.style.alignment;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose alignment");
        }

        var sameCharacterSpacing = false;
        try {
          sameCharacterSpacing = referenceStyle.style.kerning == style.textStyle.style.kerning;
        } catch {
          clog("Finding similar text styles - Couldn't disclose character spacing");
        }

        var isSimilar = true;
        if (checkSameFont) isSimilar = isSimilar && sameFont;
        if (checkSameWeight) isSimilar = isSimilar && sameWeight;
        if (checkSameSize) isSimilar = isSimilar && sameSize;
        if (checkSameColor) isSimilar = isSimilar && sameColor;
        if (checkSameParagraphSpacing) isSimilar = isSimilar && sameParagraphSpacing;
        if (checkSameLineHeight) isSimilar = isSimilar && sameLineHeight;
        if (checkSameAlignment) isSimilar = isSimilar && sameAlignment;
        if (checkSameCharacterSpacing) isSimilar = isSimilar && sameCharacterSpacing;

        if (isSimilar) similarStyles.push(style);
      }
    }
    catch (e) {
      clog("There was an issue finding similar text styles");
    }



  });
  return similarStyles;
}

function FindAllSimilarTextStyles(context, includeAllStylesFromExternalLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {

  var stylesWithSimilarStyles = [];
  var stylesAlreadyProcessed = [];

  var definedTextStyles = getDefinedTextStyles(context, includeAllStylesFromExternalLibraries);
  for (var i = 0; i < definedTextStyles.length; i++) {
    clog("Finding similar styles to '" + definedTextStyles[i].name + "'");
    if (definedTextStyles[i].libraryName.localeCompare(sketchlocalfile) == 0) {

      if (stylesAlreadyProcessed.indexOf(definedTextStyles[i]) == -1) {
        var thisStyleSimilarStyles = FindSimilarTextStyles(definedTextStyles[i].textStyle, definedTextStyles, context, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);

        stylesAlreadyProcessed.push(definedTextStyles[i]);
        thisStyleSimilarStyles.forEach(function (processedStyle) {
          stylesAlreadyProcessed.push(processedStyle);
        });

        thisStyleSimilarStyles.unshift(definedTextStyles[i]);

        if (thisStyleSimilarStyles.length > 1) {
          stylesWithSimilarStyles.push({
            "referenceStyle": definedTextStyles[i],
            "similarStyles": thisStyleSimilarStyles,
            "selectedIndex": -1,
            "isUnchecked": false,
          });
        }
      }
    }
  }

  return stylesWithSimilarStyles;
}

function FindSimilarLayerStyles(referenceStyle, styles, context, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowParams) {

  var similarStyles = [];
  styles.forEach(function (style) {
    try {
      if (referenceStyle != style.layerStyle) {

        var sameFillColor = false;
        if ((referenceStyle.style.fills.length > 0) && (style.layerStyle.style.fills.length > 0)) {
          sameFillColor = referenceStyle.style.fills[0].color.substring(0, 7).toUpperCase() == style.layerStyle.style.fills[0].color.substring(0, 7).toUpperCase();
        }

        var sameBorderColor = false;
        if ((referenceStyle.style.borders.length > 0) && (style.layerStyle.style.borders.length > 0)) {
          sameBorderColor = referenceStyle.style.borders[0].color.substring(0, 7).toUpperCase() == style.layerStyle.style.borders[0].color.substring(0, 7).toUpperCase();
        }

        var sameBorderThickness = false;
        if ((referenceStyle.style.borders.length > 0) && (style.layerStyle.style.borders.length > 0)) {
          sameBorderThickness = referenceStyle.style.borders[0].thickness == style.layerStyle.style.borders[0].thickness
        }


        var sameShadowColor = false;
        if ((referenceStyle.style.shadows.length > 0) && (style.layerStyle.style.shadows.length > 0)) {
          sameShadowColor = referenceStyle.style.shadows[0].color.substring(0, 7).toUpperCase() == style.layerStyle.style.shadows[0].color.substring(0, 7).toUpperCase();
        }

        var sameShadowParams = false;
        if ((referenceStyle.style.shadows.length > 0) && (style.layerStyle.style.shadows.length > 0)) {
          sameShadowParams = ((referenceStyle.style.shadows[0].x == style.layerStyle.style.shadows[0].x) && (referenceStyle.style.shadows[0].y == style.layerStyle.style.shadows[0].y) && (referenceStyle.style.shadows[0].blur == style.layerStyle.style.shadows[0].blur) && (referenceStyle.style.shadows[0].spread == style.layerStyle.style.shadows[0].spread));
        }

        var isSimilar = true;
        if (checkSameFillColor) isSimilar = isSimilar && sameFillColor;
        if (checkSameBorderColor) isSimilar = isSimilar && sameBorderColor;
        if (checkSameBorderThickness) isSimilar = isSimilar && sameBorderThickness;
        if (checkSameShadowColor) isSimilar = isSimilar && sameShadowColor;
        if (checkSameShadowParams) isSimilar = isSimilar && sameShadowParams;

        if (isSimilar) {
          similarStyles.push(style);
        }
      }
    }
    catch (e) {
      clog("There was an issue finding similar layer styles");
    }

  });

  return similarStyles;
}


function FindAllSimilarLayerStyles(context, includeAllStylesFromExternalLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowParams) {
  var stylesWithSimilarStyles = [];
  var stylesAlreadyProcessed = [];

  var definedLayerStyles = getDefinedLayerStyles(context, includeAllStylesFromExternalLibraries);
  for (var i = 0; i < definedLayerStyles.length; i++) {

    clog("Finding similar styles to '" + definedLayerStyles[i].name + "'");
    if (stylesAlreadyProcessed.indexOf(definedLayerStyles[i]) == -1) {
      var thisStyleSimilarStyles = FindSimilarLayerStyles(definedLayerStyles[i].layerStyle, definedLayerStyles, context, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowParams);
      stylesAlreadyProcessed.push(definedLayerStyles[i]);
      thisStyleSimilarStyles.forEach(function (processedStyle) {
        stylesAlreadyProcessed.push(processedStyle);
      });

      thisStyleSimilarStyles.unshift(definedLayerStyles[i]);


      if (thisStyleSimilarStyles.length > 1) {
        stylesWithSimilarStyles.push({
          "referenceStyle": definedLayerStyles[i],
          "similarStyles": thisStyleSimilarStyles,
          "selectedIndex": -1,
          "isUnchecked": false,
        });
      }
    }
  }
  return stylesWithSimilarStyles;
}

function areColorsSimilar(color1, color2, tolerance) {

  if (!tolerance) tolerance = 30;

  var labReferenceColor = D3.lab(color1);
  var labComparisonColor = D3.lab(color2);

  var color1 = { L: labReferenceColor.l, A: labReferenceColor.a, B: labReferenceColor.b };
  var color2 = { L: labComparisonColor.l, A: labComparisonColor.a, B: labComparisonColor.b };

  var deltaE = DeltaE.getDeltaE76(color1, color2);

  if (parseFloat(deltaE) < tolerance) {
    return true;
  }
  else
    return false;
}

function FindSimilarColorVariables(colorVariableRef, colorVariables, tolerance) {
  var similarColorVariables = [];

  colorVariables.forEach(function (colorVariable) {
    if (colorVariableRef != colorVariable.colorVariable) {
      if (areColorsSimilar("#" + colorVariableRef.color.substring(1, 7), "#" + colorVariable.colorVariable.color.substring(1, 7), tolerance))
        similarColorVariables.push(colorVariable);
    }
  });
  return similarColorVariables;
}

function FindAllSimilarColorVariables(context, includeExternalLibraries, tolerance) {
  var colorVariablesWithSimilarColorVariables = [];
  var colorVariablesAlreadyProcessed = [];

  var definedColorVariables = getDefinedColorVariables(context, includeExternalLibraries);
  for (var i = 0; i < definedColorVariables.length; i++) {

    clog("Finding similar color variables to '" + definedColorVariables[i].name + "'");
    if (colorVariablesAlreadyProcessed.indexOf(definedColorVariables[i]) == -1) {
      var thisColorvariableSimilarOnes = FindSimilarColorVariables(definedColorVariables[i].colorVariable, definedColorVariables, tolerance);

      colorVariablesAlreadyProcessed.push(definedColorVariables[i]);
      thisColorvariableSimilarOnes.forEach(function (processedColorVariable) {
        colorVariablesAlreadyProcessed.push(processedColorVariable);
      });

      thisColorvariableSimilarOnes.unshift(definedColorVariables[i]);

      if (thisColorvariableSimilarOnes.length > 1) {
        colorVariablesWithSimilarColorVariables.push({
          "referenceStyle": definedColorVariables[i],
          "similarStyles": thisColorvariableSimilarOnes,
          "selectedIndex": -1,
          "isUnchecked": false,
        });
      }
    }
  }
  return colorVariablesWithSimilarColorVariables;
}

function GetRecomposedSymbolName(symbolName) {
  var recomposedSymbolName = "";
  for (var j = 0; j < symbolName.length; j++) {
    recomposedSymbolName += symbolName.charAt(j);
  }
  return recomposedSymbolName;
}


function getSymbolInstances(symbolMaster) {
  var symbolInstances = symbolMaster.getAllInstances();
  return symbolInstances;
}

function getSymbolOverrides(symbolMaster, idsMap) {
  var symbolOverrides = [];
  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(instance => hasSymbolOverrides(instance, idsMap));

  reducedInstances.forEach(function (instance) {
    if (instance.sketchObject.overrides().count() > 0) {
      var instanceOverrides = instance.overrides.filter(ov => ov.property == "symbolID" && !ov.isDefault && ov.value == symbolMaster.symbolId);
      instanceOverrides.forEach(override => {
        symbolOverrides.push({
          "instance": instance,
          "override": override
        });
      });
    }
  });

  return symbolOverrides;
}

function getLayerStyleInstances(layerStyle) {
  var layerStyleInstances = layerStyle.getAllInstancesLayers();
  return layerStyleInstances;
}

function getLayerStyleOverrides(layerStyle, idsMap) {
  var styleOverrides = [];
  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(instance => hasSharedStyleOverrides(instance, idsMap));

  reducedInstances.forEach(function (instance) {
    if (instance.sketchObject.overrides().count() > 0) {
      var instanceOverrides = instance.overrides.filter(ov => ov.property == "layerStyle" && !ov.isDefault && idsMap.has(ov.value));
      instanceOverrides.forEach(override => {
        styleOverrides.push({
          "instance": instance,
          "override": override
        });
      });
    }
  });

  return styleOverrides;
}

function getTextStyleInstances(textStyle) {
  var textStyleInstances = textStyle.getAllInstancesLayers();
  return textStyleInstances;
}

function getTextStyleOverrides(textStyle, idsMap) {
  var styleOverrides = [];
  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(instance => hasSharedStyleOverrides(instance, idsMap));

  reducedInstances.forEach(function (instance) {
    if (instance.sketchObject.overrides().count() > 0) {
      var instanceOverrides = instance.overrides.filter(ov => ov.property == "textStyle" && !ov.isDefault && idsMap.has(ov.value));
      instanceOverrides.forEach(override => {
        styleOverrides.push({
          "instance": instance,
          "override": override
        });
      });
    }
  });

  return styleOverrides;
}

function countAllSymbols(context, includeAllSymbolsFromExternalLibraries) {
  var counter = {
    "symbols": symbols.length,
    "foreignSymbols": 0,
    "documentInstances": sketch.find("SymbolInstance", document).length
  };

  counter[0] = symbols.length;

  if (includeAllSymbolsFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        counter.foreignSymbols += lib.getDocument().getSymbols().length;
      }
    });
  }

  return counter;
}


function getAllDuplicateSymbolsByName(context, includeAllSymbolsFromExternalLibraries) {
  var duplicatedSymbols = [];
  const namesMap = new Map();
  const idsMap = new Map();
  document.getSymbols().forEach(function (symbol) {
    if (!idsMap.has(symbol.id)) {
      if (!namesMap.has(symbol.name)) {
        var symbolObject = {
          "name": "" + symbol.name,
          "duplicates": [],
        }
        symbolObject.duplicates.push({
          "name": "" + symbol.name,
          "symbol": symbol,
          "isForeign": (symbol.getLibrary() != null),
          "thumbnail": "",
          "symbolInstances": null,
          "numInstances": 0,
          "symbolOverrides": null,
          "numOverrides": 0,
          "libraryName": (symbol.getLibrary() != null) ? libraryPrefix + symbol.getLibrary().name : sketchlocalfile,
          "library": (symbol.getLibrary() != null) ? symbol.getLibrary() : null,
          "isSelected": false
        });

        duplicatedSymbols.push(symbolObject);
        idsMap.set(symbol.id, symbolObject);
        namesMap.set(symbol.name, symbolObject);
      }
      else {
        var symbolObject = namesMap.get(symbol.name);
        symbolObject.duplicates.push({
          "name": "" + symbol.name,
          "symbol": symbol,
          "isForeign": (symbol.getLibrary() != null),
          "thumbnail": "",
          "symbolInstances": null,
          "numInstances": 0,
          "symbolOverrides": null,
          "numOverrides": 0,
          "libraryName": (symbol.getLibrary() != null) ? libraryPrefix + symbol.getLibrary().name : sketchlocalfile,
          "library": (symbol.getLibrary() != null) ? symbol.getLibrary() : null,
          "isSelected": false
        });
      }
    }
  });

  if (includeAllSymbolsFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().getSymbols().forEach(function (symbol) {
          if (!idsMap.has(symbol.id)) {
            if (!namesMap.has(symbol.name)) {
              var symbolObject = {
                "name": "" + symbol.name,
                "duplicates": [],
              }
              symbolObject.duplicates.push({
                "name": "" + symbol.name,
                "symbol": symbol,
                "isForeign": true,
                "thumbnail": "",
                "symbolInstances": null,
                "numInstances": 0,
                "symbolOverrides": null,
                "numOverrides": 0,
                "libraryName": lib.name,
                "library": lib,
                "isSelected": false
              });

              duplicatedSymbols.push(symbolObject);
              idsMap.set(symbol.id, symbolObject);
              namesMap.set(symbol.name, symbolObject);
            }
            else {
              var symbolObject = namesMap.get(symbol.name);
              symbolObject.duplicates.push({
                "name": "" + symbol.name,
                "symbol": symbol,
                "isForeign": true,
                "thumbnail": "",
                "symbolInstances": null,
                "numInstances": 0,
                "symbolOverrides": null,
                "numOverrides": 0,
                "libraryName": lib.name,
                "library": lib,
                "isSelected": false
              });
            }
          }
        });
      }
    });
  }


  namesMap.forEach(function (symbolObject, name) {

    var removeElement = false;
    if (symbolObject.duplicates.length <= 1) removeElement = true;

    if (!removeElement) {
      var allForeign = true;
      symbolObject.duplicates.forEach(function (duplicate) {
        if (!duplicate.isForeign) allForeign = false;
      });
      removeElement = allForeign;
    }

    if (removeElement) {
      var index = duplicatedSymbols.indexOf(symbolObject);
      if (index > -1) duplicatedSymbols.splice(index, 1);
    }

  });

  return duplicatedSymbols.sort(compareByName);

}

function getSymbolsMap(context, symbols) {

  var symbolMap = new Map();
  var idsMap = new Map();
  symbols.forEach(function (symbol) {
    symbol.duplicates.forEach(function (duplicatedSymbol) {
      idsMap.set(duplicatedSymbol.symbol.symbolId, duplicatedSymbol.symbol);
      symbolMap.set(duplicatedSymbol.symbol, {
        "directInstances": duplicatedSymbol.symbol.getAllInstances(),
        "instancesWithOverrides": []
      });
    });
  });

  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(instance => hasSymbolOverrides(instance, idsMap));

  reducedInstances.forEach(function (instance) {
    if (instance.sketchObject.overrides().count() > 0) {
      var instanceOverrides = instance.overrides.filter(ov => ov.property == "symbolID" && !ov.isDefault && idsMap.has(ov.value));
      instanceOverrides.forEach(override => {
        symbolMap.get(idsMap.get(override.value)).instancesWithOverrides.push(instance);
      });
    }
  });

  return symbolMap;
}

function getLayerStylesMap(context, layerStyles) {

  var layerStylesMap = new Map();
  var idsMap = new Map();
  layerStyles.forEach(function (layerStyle) {
    layerStyle.duplicates.forEach(function (duplicatedStyle) {

      var redId1 = duplicatedStyle.layerStyle.style.id;
      var redId2 = (duplicatedStyle.layerStyle.id.indexOf("[") >= 0) ? duplicatedStyle.layerStyle.id.substring(duplicatedStyle.layerStyle.id.indexOf("[") + 1, duplicatedStyle.layerStyle.id.length - 1) : null;

      idsMap.set(duplicatedStyle.layerStyle.id, duplicatedStyle.layerStyle);
      idsMap.set(redId1, duplicatedStyle.layerStyle);
      if (redId2 != null) idsMap.set(redId2, duplicatedStyle.layerStyle);

      layerStylesMap.set(duplicatedStyle.layerStyle, {
        "directInstances": duplicatedStyle.layerStyle.getAllInstancesLayers(),
        "instancesWithOverrides": []
      });
    });
  });

  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(instance => hasSharedStyleOverrides(instance, idsMap));

  reducedInstances.forEach(function (instance) {
    if (instance.sketchObject.overrides().count() > 0) {
      var instanceOverrides = instance.overrides.filter(ov => ov.property == "layerStyle" && !ov.isDefault && idsMap.has(ov.value));
      instanceOverrides.forEach(override => {
        layerStylesMap.get(idsMap.get(override.value)).instancesWithOverrides.push(instance);
      });
    }
  });

  return layerStylesMap;
}

function getTextStylesMap(context, textStyles) {

  var textStylesMap = new Map();
  var idsMap = new Map();
  textStyles.forEach(function (textStyle) {
    textStyle.duplicates.forEach(function (duplicatedStyle) {

      var redId1 = duplicatedStyle.textStyle.style.id;
      var redId2 = (duplicatedStyle.textStyle.id.indexOf("[") >= 0) ? duplicatedStyle.textStyle.id.substring(duplicatedStyle.textStyle.id.indexOf("[") + 1, duplicatedStyle.textStyle.id.length - 1) : null;

      idsMap.set(duplicatedStyle.textStyle.id, duplicatedStyle.textStyle);
      idsMap.set(redId1, duplicatedStyle.textStyle);
      if (redId2 != null) idsMap.set(redId2, duplicatedStyle.textStyle);

      textStylesMap.set(duplicatedStyle.textStyle, {
        "directInstances": duplicatedStyle.textStyle.getAllInstancesLayers(),
        "instancesWithOverrides": []
      });
    });
  });

  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(instance => hasSharedStyleOverrides(instance, idsMap));

  reducedInstances.forEach(function (instance) {
    if (instance.sketchObject.overrides().count() > 0) {
      var instanceOverrides = instance.overrides.filter(ov => ov.property == "textStyle" && !ov.isDefault && idsMap.has(ov.value));
      instanceOverrides.forEach(override => {
        textStylesMap.get(idsMap.get(override.value)).instancesWithOverrides.push(instance);
      });
    }
  });

  return textStylesMap;
}



function updateAllDuplicatesWithMap(allDuplicates, symbolsMap) {
  allDuplicates.forEach(duplicate => {
    duplicate.duplicates.forEach(symbol => {
      symbol.symbolInstances = symbolsMap.get(duplicate).directInstances;
    });
  });
}

function hasSymbolOverrides(instance, idsMap) {
  if ((instance.sketchObject.overrides() != null) && (instance.sketchObject.overrides().count() > 0)) {
    return FindNestedSymbolOverride(instance.sketchObject.overrides(), idsMap, instance);
  }
  return false;
}

function FindNestedSymbolOverride(overrides, idsMap, instance) {

  for (var key in overrides) {
    var symbolID = overrides[key]["symbolID"];
    if (symbolID != null) {
      if (typeof symbolID === 'function') { symbolID = symbolID(); }
      if (idsMap.has("" + symbolID)) {
        return true;
      }
    }
    else {
      if (FindNestedSymbolOverride(overrides[key], idsMap, instance)) return true;
    }
  }
  return false;
}

function hasSharedStyleOverrides(instance, idsMap) {
  if ((instance.sketchObject.overrides() != null) && (instance.sketchObject.overrides().count() > 0)) {
    return FindNestedSharedStyleOverride(instance.sketchObject.overrides(), idsMap, instance);
  }
  return false;
}

function FindNestedSharedStyleOverride(overrides, idsMap, instance, level) {
  for (var key in overrides) {
    var symbolID = overrides[key]["symbolID"];
    if (symbolID == null) {
      if (overrides[key] instanceof __NSDictionaryM) {
        for (var key2 in overrides[key]) {
          if (overrides[key][key2] instanceof __NSDictionaryM) {
            if (FindNestedSharedStyleOverride(overrides[key][key2], idsMap, instance, level + 1)) return true;
          }
          else {
            if (idsMap.has("" + overrides[key][key2])) { return true; };
          }
        }
      }
      else {
        try {
          if (idsMap.has("" + overrides[key])) { return true; };
        } catch (e) {
          Helpers.clog("Error while processing overrides (1).");
          Helpers.clog(idsMap);
          Helpers.clog(overrides[key]);
          Helpers.clog(e);
        }
      }
    }
    else {
      try {
        if (FindNestedSharedStyleOverride(overrides[key], idsMap, instance, level + 1)) return true;
      } catch (e) {
        Helpers.clog("Error while processing overrides (2).");
        Helpers.clog(idsMap);
        Helpers.clog(overrides[key]);
        Helpers.clog(e);
      }
    }
  }
  return false;
}

function importSymbolFromLibrary(element) {
  try {
    clog("-- Importing " + element.name + " from library" + element.libraryName + " with ID:" + element.symbol.id + " and symbolId:" + element.symbol.symbolId);
    var symbolReferences = element.library.getImportableSymbolReferencesForDocument(document);
    var refToImport = symbolReferences.filter(function (ref) {
      return ref.id == element.symbol.symbolId;
    });

    var symbol = refToImport[0].import();
    clog("-- We've imported:" + symbol.name + " from library " + symbol.getLibrary().name);

    return symbol;
  } catch (e) {
    clog("-- ERROR: Couldn't import " + element.name + " from library" + element.libraryName + " with ID:" + element.symbol.id + " and symbolId:" + element.symbol.symbolId);
    return element.symbol;
  }
}

function importLayerStyleFromLibrary(layerStyle) {
  try {
    clog("-- Importing " + layerStyle.name + " from library " + layerStyle.libraryName + " with ID:" + layerStyle.layerStyle.id);
    var styleReferences = layerStyle.library.getImportableLayerStyleReferencesForDocument(document);
    var refToImport = styleReferences.filter(function (ref) {
      return ref.id == layerStyle.layerStyle.id;
    });

    var style = refToImport[0].import();
    clog("-- We've imported:" + style.name + " from library " + style.getLibrary().name);

    return style;
  } catch (e) {
    clog("-- ERROR: Couldn't import " + layerStyle.name + " from library" + layerStyle.libraryName + " with ID:" + layerStyle.layerStyle.id);
    return null;
  }
}

function importTextStyleFromLibrary(textStyle) {

  try {
    clog("-- Importing " + textStyle.name + " from library " + textStyle.libraryName + " with ID:" + textStyle.textStyle.id);
    var styleReferences = textStyle.library.getImportableTextStyleReferencesForDocument(document);
    var refToImport = styleReferences.filter(function (ref) {
      return ref.id == textStyle.textStyle.id;
    });

    var style = refToImport[0].import();
    clog("-- We've imported:" + style.name + " from library " + style.getLibrary().name);

    return style;
  } catch (e) {
    clog("-- ERROR: Couldn't import " + textStyle.name + " from library" + textStyle.libraryName + " with ID:" + textStyle.textStyle.id);
    return null;
  }
}

function importColorVariableFromLibrary(colorVariable) {

  try {
    clog("-- Importing " + colorVariable.name + " from library " + colorVariable.libraryName + " with ID:" + colorVariable.colorVariable.id);
    var colorVariableReferences = colorVariable.library.getImportableSwatchReferencesForDocument(document);
    var refToImport = colorVariableReferences.filter(function (ref) {
      return ref.name == colorVariable.colorVariable.name; //TODO should be replaced by proper ID
    });

    var colorVar = refToImport[0].import();
    clog("-- We've imported:" + colorVar.name);

    return colorVar;
  } catch (e) {
    clog("-- ERROR: Couldn't import " + colorVariable.name + " from library" + colorVariable.libraryName + " with ID:" + colorVariable.colorVariable.id);
    clog(e);
    return null;
  }
}

function getReducedDuplicateData(symbol) {
  var reducedDuplicate = {
    "name": "" + symbol.name,
    "duplicates": [],
  }
  symbol.duplicates.forEach(duplicate => {
    reducedDuplicate.duplicates.push({
      "name": "" + duplicate.name,
      "isForeign": duplicate.isForeign,
      "thumbnail": duplicate.thumbnail,
      "numInstances": duplicate.numInstances,
      "numOverrides": duplicate.numOverrides,
      "libraryName": duplicate.libraryName,
      "isSelected": false
    });
  });

  return reducedDuplicate;
}

function getReducedLayerStyleData(layerStyle) {
  var reducedDuplicate = {
    "name": "" + layerStyle.name,
    "duplicates": [],
  }
  layerStyle.duplicates.forEach(duplicate => {
    if (!duplicate.isHidden) {
      reducedDuplicate.duplicates.push({
        "id": "" + duplicate.layerStyle.id + " // " + duplicate.layerStyle.style.id + " // " + ((duplicate.layerStyle.id.indexOf("[") >= 0) ? duplicate.layerStyle.id.substring(duplicate.layerStyle.id.indexOf("[") + 1, duplicate.layerStyle.id.length - 1) : "xxx"),
        "name": "" + duplicate.name,
        "isForeign": duplicate.isForeign,
        "description": duplicate.description,
        "thumbnail": duplicate.thumbnail,
        "contrastMode": duplicate.contrastMode,
        "numInstances": duplicate.numInstances,
        "numOverrides": duplicate.numOverrides,
        "libraryName": duplicate.libraryName,
        "isSelected": duplicate.isSelected,
        "isHidden": duplicate.isHidden
      });

    }
  });

  return reducedDuplicate;
}

function getReducedTextStyleData(textStyle) {
  var reducedDuplicate = {
    "name": "" + textStyle.name,
    "duplicates": [],
  }
  textStyle.duplicates.forEach(duplicate => {
    if (!duplicate.isHidden) {
      reducedDuplicate.duplicates.push({
        "id": "" + duplicate.textStyle.id + " // " + duplicate.textStyle.style.id + " // " + ((duplicate.textStyle.id.indexOf("[") >= 0) ? duplicate.textStyle.id.substring(duplicate.textStyle.id.indexOf("[") + 1, duplicate.textStyle.id.length - 1) : "xxx"),
        "name": "" + duplicate.name,
        "isForeign": duplicate.isForeign,
        "description": duplicate.description,
        "thumbnail": duplicate.thumbnail,
        "contrastMode": duplicate.contrastMode,
        "numInstances": duplicate.numInstances,
        "numOverrides": duplicate.numOverrides,
        "libraryName": duplicate.libraryName,
        "isSelected": duplicate.isSelected,
        "isHidden": duplicate.isHidden
      });

    }
  });

  return reducedDuplicate;
}

function getSelectedSymbolsSession(selection) {

  var symbolObjects = [];
  var idsMap = new Map();

  selection.forEach(function (docSymbol) {
    var foreignLib = docSymbol.library;
    var isForeign = docSymbol.isForeign;
    var libraryName = sketchlocalfile;

    if (isForeign)
      libraryName = libraryPrefix + foreignLib.name;

    var symbolObject;
    if (symbolObjects.length == 0) {
      var symbolObject = {
        "name": "" + docSymbol.symbol.name,
        "duplicates": []
      }
      symbolObjects.push(symbolObject);
    }
    else
      symbolObject = symbolObjects[0];


    idsMap.set(docSymbol.symbol.symbolId, docSymbol.symbol);
    var symbolInstances = getSymbolInstances(docSymbol.symbol);
    var symbolOverrides = getSymbolOverrides(docSymbol.symbol, idsMap);

    symbolObject.duplicates.push({
      "name": "" + docSymbol.symbol.name,
      "symbol": docSymbol.symbol,
      "isForeign": isForeign,
      "thumbnail": getThumbnail(docSymbol),
      "symbolInstances": symbolInstances,
      "numInstances": symbolInstances.length,
      "symbolOverrides": symbolOverrides,
      "numOverrides": symbolOverrides.length,
      "libraryName": libraryName,
      "library": foreignLib,
      "isSelected": false
    });
  });

  return symbolObjects.sort(compareByName);

}


function getReducedSymbolsSession(session) {

  var reducedSession = [];
  session.forEach(sessionItem => {
    var symbolObject = {
      "name": "" + sessionItem.name,
      "duplicates": []
    }
    sessionItem.duplicates.forEach(duplicate => {
      symbolObject.duplicates.push({
        "name": "" + duplicate.name,
        "isForeign": duplicate.isForeign,
        "thumbnail": duplicate.thumbnail,
        "numInstances": duplicate.numInstances,
        "numOverrides": duplicate.numOverrides,
        "libraryName": duplicate.libraryName,
        "library": duplicate.library,
        "isSelected": duplicate.isSelected
      })
    });
    reducedSession.push(symbolObject);
  });

  return reducedSession;

}

function getDuplicateColorVariables(context, includeLibraries) {

  var allColorVariables = getAllColorVariables(includeLibraries);
  var nameDictionary = {};
  var duplicateColorVariables = [];
  var alreadyAddedIDs = [];
  allColorVariables.forEach(function (colorVariable) {

    var colorVariableObject = {
      "colorVariable": colorVariable.colorVariable,
      "name": "" + colorVariable.name,
      "color": "" + colorVariable.color,
      "isForeign": colorVariable.isForeign,
      "thumbnail": colorVariable.thumbnail,
      "libraryName": colorVariable.libraryName,
      "library": colorVariable.library,
      "isSelected": false,
      "isChosen": false,
      "description": "" + colorVariable.color,
      "thumbnail": getColorVariableThumbnail(colorVariable.colorVariable),
      "contrastMode": shouldEnableContrastMode(colorVariable.colorVariable.color.substring(1, 7)),
      "duplicates": [],
      "isSelected": false
    }

    alreadyAddedIDs.push("" + colorVariable.colorVariable.id);

    if (nameDictionary[colorVariable.name] == null) {
      duplicateColorVariables.push(colorVariableObject);
      colorVariableObject.duplicates.push({
        "colorVariable": colorVariable.colorVariable,
        "name": "" + colorVariable.name,
        "color": "" + colorVariable.color,
        "isForeign": colorVariable.isForeign,
        "thumbnail": colorVariable.thumbnail,
        "libraryName": colorVariable.libraryName,
        "library": colorVariable.library,
        "isSelected": false,
        "isChosen": false,
        "description": "" + colorVariable.color,
        "thumbnail": getColorVariableThumbnail(colorVariable.colorVariable),
        "contrastMode": shouldEnableContrastMode(colorVariable.colorVariable.color.substring(1, 7)),
        "duplicates": null,
        "isSelected": false
      });
      nameDictionary[colorVariable.name] = colorVariableObject;
    }
    else {
      nameDictionary[colorVariable.name].duplicates.push(colorVariableObject);
    }
  });

  Object.keys(nameDictionary).forEach(function (key) {

    var removeElement = false;
    if (nameDictionary[key].duplicates.length <= 1) removeElement = true;

    if (!removeElement) {
      var allForeign = true;
      nameDictionary[key].duplicates.forEach(function (duplicate) {
        if (!duplicate.isForeign) allForeign = false;
      });
      if (allForeign) {
        removeElement = true;
      }
    }

    if (removeElement) {
      var index = duplicateColorVariables.indexOf(nameDictionary[key]);
      if (index > -1) duplicateColorVariables.splice(index, 1);
      nameDictionary[key] = null;
    }

  });

  return duplicateColorVariables;
}

function GetSpecificLayerStyleData(layerStyle, layerStylesMap) {
  ctime("GetSpecificLayerStyleData");
  var totalInstances = 0;
  var totalOverrides = 0;
  layerStyle.duplicates.forEach(duplicate => {
    var layerStyleMapItem = layerStylesMap.get(duplicate.layerStyle);
    duplicate.thumbnail = getOvalThumbnail(duplicate.layerStyle);
    duplicate.styleInstances = layerStyleMapItem.directInstances;
    duplicate.numInstances = layerStyleMapItem.directInstances.length;
    duplicate.styleOverrides = layerStyleMapItem.instancesWithOverrides;
    duplicate.numOverrides = layerStyleMapItem.instancesWithOverrides.length;


    totalInstances += duplicate.numInstances;
    totalOverrides += duplicate.numOverrides;
  });

  clog("-- Found " + totalInstances + " instances, " + totalOverrides + " overrides, and created " + layerStyle.duplicates.length + " thumbnails");
  ctimeEnd("GetSpecificLayerStyleData");
}

function GetSpecificTextStyleData(textStyle, textStylesMap) {
  ctime("GetSpecificTextStyleData");
  var totalInstances = 0;
  var totalOverrides = 0;
  textStyle.duplicates.forEach(duplicate => {
    var textStyleMapItem = textStylesMap.get(duplicate.textStyle);
    duplicate.thumbnail = getTextThumbnail(duplicate.textStyle);
    duplicate.styleInstances = textStyleMapItem.directInstances;
    duplicate.numInstances = textStyleMapItem.directInstances.length;
    duplicate.styleOverrides = textStyleMapItem.instancesWithOverrides;
    duplicate.numOverrides = textStyleMapItem.instancesWithOverrides.length;


    totalInstances += duplicate.numInstances;
    totalOverrides += duplicate.numOverrides;
  });

  clog("-- Found " + totalInstances + " instances, " + totalOverrides + " overrides, and created " + textStyle.duplicates.length + " thumbnails");
  ctimeEnd("GetSpecificTextStyleData");
}

function GetSpecificSymbolData(symbol, symbolsMap) {
  ctime("GetSpecificSymbolData");
  var totalInstances = 0;
  var totalOverrides = 0;
  symbol.duplicates.forEach(duplicate => {
    var symbolMapItem = symbolsMap.get(duplicate.symbol);
    duplicate.thumbnail = getThumbnail(duplicate);
    duplicate.symbolInstances = symbolMapItem.directInstances;
    duplicate.numInstances = symbolMapItem.directInstances.length;
    duplicate.symbolOverrides = symbolMapItem.instancesWithOverrides;
    duplicate.numOverrides = symbolMapItem.instancesWithOverrides.length;

    totalInstances += duplicate.numInstances;
    totalOverrides += duplicate.numOverrides;
  });
  clog("-- Found " + totalInstances + " instances, " + totalOverrides + " overrides, and created " + symbol.duplicates.length + " thumbnails");
  ctimeEnd("GetSpecificSymbolData");
}

function getTextStyleDescription(sharedTextStyle) {
  return sharedTextStyle.style.fontFamily + " " + sharedTextStyle.style.fontSize + "pt" + " - " + sharedTextStyle.style.alignment;
}

function getLayerStyleDescription(sharedStyle) {
  var textInfo = "";

  if (sharedStyle.style.fills.length > 0) {
    textInfo += "Fill" + ((!sharedStyle.style.fills[0].enabled) ? " (disabled)" : "") + ": " + sharedStyle.style.fills[0].color.substring(0, 7).toUpperCase();
  }
  else
    textInfo += "No fill";

  textInfo += " - ";

  if (sharedStyle.style.borders.length > 0) {
    textInfo += "Border" + ((!sharedStyle.style.borders[0].enabled) ? " (disabled)" : "") + ": " + sharedStyle.style.borders[0].color.substring(0, 7).toUpperCase();
  }
  else
    textInfo += "No border";

  return textInfo;
}

function getTextStyleColor(style) {
  if (style.style().textStyle().attributes().MSAttributedStringColorAttribute) {
    return style.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue().toString();
  }
  else
    return "000000";
}

function getOvalThumbnail(sharedStyle) {
  const oval = new ShapePath({
    shapeType: ShapePath.ShapeType.Oval,
    frame: new sketch.Rectangle(0, 0, 300, 300),
    style: sharedStyle.style,
    parent: document.selectedPage
  });
  try {
    const options = { scales: '1', formats: 'png', output: false };
    var buffer = sketch.export(oval, options);
    var image64 = buffer.toString('base64');
    oval.remove();
    return image64;
  } catch (e) {
    oval.remove();
    return "";
  }
}



function getTextThumbnail(sharedStyle) {
  var text = new Text({
    text: 'The quick brown fox',
    frame: new sketch.Rectangle(0, 0, 600, 100),
    style: sharedStyle.style,
    parent: document.selectedPage
  })
  try {
    const options = { scales: '5', formats: 'png', output: false };
    var buffer = sketch.export(text, options);
    var image64 = buffer.toString('base64');
    text.remove();
    return image64;
  } catch (e) {
    text.remove();
    return "";
  }
}

function getColorVariableThumbnail(colorVariable) {
  const oval = new ShapePath({
    shapeType: ShapePath.ShapeType.Oval,
    frame: new sketch.Rectangle(0, 0, 300, 300),
    style: {
      fills: [{ color: colorVariable.color }],
    },
    parent: document.selectedPage
  });
  try {
    const options = { scales: '1', formats: 'png', output: false };
    var buffer = sketch.export(oval, options);
    var image64 = buffer.toString('base64');
    oval.remove();
    return image64;
  } catch (e) {
    oval.remove();
    return "";
  }
}

function getAllLayerStyles(includeAllStylesFromExternalLibraries) {
  var allStyles = [];
  const idsMap = new Map();
  const redundantIdsMap = new Map();

  document.sharedLayerStyles.forEach(function (sharedLayerStyle) {
    var library = sharedLayerStyle.getLibrary();
    if (!idsMap.has(sharedLayerStyle.id)) {
      var redId1 = sharedLayerStyle.style.id;
      var redId2 = (sharedLayerStyle.id.indexOf("[") >= 0) ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;
      var redundantIn = false;
      if (redId2 != null)
        redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);
      else
        redundantIn = redundantIdsMap.has(redId1);

      var layerStyleObject = {
        "layerStyle": sharedLayerStyle,
        "name": "" + sharedLayerStyle.name,
        "libraryName": (library != null) ? libraryPrefix + library.name : sketchlocalfile,
        "library": library,
        "isForeign": (library != null),
        "isSelected": false,
        "isChosen": false,
        "description": getLayerStyleDescription(sharedLayerStyle),
        "thumbnail": getOvalThumbnail(sharedLayerStyle),
        "numInstances": 0,
        "numOverrides": 0,
        "isSelected": false,
        "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
        "isHidden": redundantIn
      }

      allStyles.push(layerStyleObject);
      idsMap.set(sharedLayerStyle.style.id, true);
      redundantIdsMap.set(redId1, layerStyleObject);
      if (redId2 != null) redundantIdsMap.set(redId2, layerStyleObject);
    }
  });

  if (includeAllStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().sharedLayerStyles.forEach(function (sharedLayerStyle) {
          if (!idsMap.has(sharedLayerStyle.style.id)) {
            var redId1 = sharedLayerStyle.style.id;
            var redId2 = (sharedLayerStyle.id.indexOf("[") >= 0) ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;
            var redundantIn = false;
            if (redId2 != null)
              redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);
            else
              redundantIn = redundantIdsMap.has(redId1)

            var layerStyleObject = {
              "layerStyle": sharedLayerStyle,
              "name": "" + sharedLayerStyle.name,
              "libraryName": libraryPrefix + lib.name,
              "library": lib,
              "isForeign": true,
              "isSelected": false,
              "isChosen": false,
              "description": getLayerStyleDescription(sharedLayerStyle),
              "thumbnail": getOvalThumbnail(sharedLayerStyle),
              "numInstances": 0,
              "numOverrides": 0,
              "isSelected": false,
              "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
              "isHidden": redundantIn
            }
            allStyles.push(layerStyleObject);
            idsMap.set(sharedLayerStyle.style.id, true);
            redundantIdsMap.set(redId1, layerStyleObject);
            if (redId2 != null) redundantIdsMap.set(redId2, layerStyleObject);
          }
        });
      }
    });
  }


  return allStyles.sort(compareStyleArrays);;

}



function getAllTextStyles(includeAllStylesFromExternalLibraries) {
  var allStyles = [];
  const map = new Map();

  document.sharedTextStyles.forEach(function (sharedTextStyle) {

    var library = sharedTextStyle.getLibrary();

    var textStyleObject = {
      "textStyle": sharedTextStyle,
      "name": "" + sharedTextStyle.name,
      "libraryName": (library != null) ? libraryPrefix + library.name : sketchlocalfile,
      "library": library,
      "isForeign": (library != null),
      "isSelected": false,
      "isChosen": false,
      "description": getTextStyleDescription(sharedTextStyle),
      "thumbnail": getTextThumbnail(sharedTextStyle),
      "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
      "duplicates": [],
      "isSelected": false
    }

    allStyles.push(textStyleObject);
    map.set(sharedTextStyle.style.id, true);

  });

  if (includeAllStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().sharedTextStyles.forEach(function (sharedTextStyle) {
          if (!map.has(sharedTextStyle.style.id)) {
            var textStyleObject = {
              "textStyle": sharedTextStyle,
              "name": "" + sharedTextStyle.name,
              "libraryName": libraryPrefix + lib.name,
              "library": lib,
              "isForeign": true,
              "isSelected": false,
              "isChosen": false,
              "description": getTextStyleDescription(sharedTextStyle),
              "thumbnail": getTextThumbnail(sharedTextStyle),
              "thumbnail": "",
              "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
              "duplicates": [],
              "isSelected": false
            }
            allStyles.push(textStyleObject);
          }
        });
      }
    });
  }

  return allStyles;

}

function getAllColorVariables(includeAllStylesFromExternalLibraries) {
  var allColorVariables = [];
  const map = new Map();

  document.swatches.forEach(function (swatch) {

    var colorVariableObject = {
      "colorVariable": swatch,
      "name": "" + swatch.name,
      "color": "" + swatch.color.substring(0, 7),
      "libraryName": sketchlocalfile,
      "library": null,
      "isForeign": false,
      "isSelected": false,
      "isChosen": false,
      "description": "" + swatch.color.substring(0, 7),
      "thumbnail": getColorVariableThumbnail(swatch),
      "contrastMode": shouldEnableContrastMode(swatch.color.substring(1, 7)),
      "duplicates": [],
      "isSelected": false
    }

    allColorVariables.push(colorVariableObject);
    map.set(swatch.id, true);
  });

  if (includeAllStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().swatches.forEach(function (swatch) {
          if (!map.has(swatch.id)) {
            var colorVariableObject = {
              "colorVariable": swatch,
              "name": "" + swatch.name,
              "color": "" + swatch.color.substring(0, 7),
              "libraryName": libraryPrefix + lib.name,
              "library": lib,
              "isForeign": true,
              "isSelected": false,
              "isChosen": false,
              "description": "" + swatch.color.substring(0, 7),
              "thumbnail": getColorVariableThumbnail(swatch),
              "contrastMode": shouldEnableContrastMode(swatch.color.substring(1, 7)),
              "duplicates": [],
              "isSelected": false
            }
            allColorVariables.push(colorVariableObject);
          }
        });
      }
    });
  }

  return allColorVariables;

}


function getAllDuplicateLayerStylesByName(context, includeAllLayerStylesFromExternalLibraries) {
  var duplicatedLayerStyles = [];
  const namesMap = new Map();
  const idsMap = new Map();
  const redundantIdsMap = new Map();
  document.sharedLayerStyles.forEach(function (sharedLayerStyle) {

    if (!idsMap.has(sharedLayerStyle.id)) {
      var redId1 = sharedLayerStyle.style.id;
      var redId2 = (sharedLayerStyle.id.indexOf("[") >= 0) ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;
      var redundantIn = false;
      if (redId2 != null)
        redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);
      else
        redundantIn = redundantIdsMap.has(redId1)

      if (!namesMap.has(sharedLayerStyle.name)) {

        var styleObject = {
          "name": "" + sharedLayerStyle.name,
          "duplicates": [],
        }
        styleObject.duplicates.push({
          "name": "" + sharedLayerStyle.name,
          "layerStyle": sharedLayerStyle,
          "libraryName": (sharedLayerStyle.getLibrary() != null) ? libraryPrefix + sharedLayerStyle.getLibrary().name : sketchlocalfile,
          "library": (sharedLayerStyle.getLibrary() != null) ? sharedLayerStyle.getLibrary() : null,
          "isForeign": (sharedLayerStyle.getLibrary() != null),
          "isSelected": false,
          "isChosen": false,
          "description": getLayerStyleDescription(sharedLayerStyle),
          "thumbnail": "",
          "isSelected": false,
          "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
          "styleInstances": null,
          "numInstances": 0,
          "styleOverrides": null,
          "numOverrides": 0,
          "isHidden": redundantIn
        });

        duplicatedLayerStyles.push(styleObject);
        idsMap.set(sharedLayerStyle.id, styleObject);
        namesMap.set(sharedLayerStyle.name, styleObject);
      }
      else {
        var styleObject = namesMap.get(sharedLayerStyle.name);
        styleObject.duplicates.push({
          "name": "" + sharedLayerStyle.name,
          "layerStyle": sharedLayerStyle,
          "libraryName": (sharedLayerStyle.getLibrary() != null) ? libraryPrefix + sharedLayerStyle.getLibrary().name : sketchlocalfile,
          "library": (sharedLayerStyle.getLibrary() != null) ? sharedLayerStyle.getLibrary() : null,
          "isForeign": (sharedLayerStyle.getLibrary() != null),
          "isSelected": false,
          "isChosen": false,
          "description": getLayerStyleDescription(sharedLayerStyle),
          "thumbnail": "",
          "isSelected": false,
          "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
          "styleInstances": null,
          "numInstances": 0,
          "styleOverrides": null,
          "numOverrides": 0,
          "isHidden": redundantIn
        });
      }

      redundantIdsMap.set(redId1, styleObject);
      if (redId2 != null) redundantIdsMap.set(redId2, styleObject);
    }
  });

  if (includeAllLayerStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().sharedLayerStyles.forEach(function (sharedLayerStyle) {
          if (!idsMap.has(sharedLayerStyle.id)) {
            var redId1 = sharedLayerStyle.style.id;
            var redId2 = (sharedLayerStyle.id.indexOf("[") >= 0) ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;
            var redundantIn = false;
            if (redId2 != null)
              redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);
            else
              redundantIn = redundantIdsMap.has(redId1)

            if (!namesMap.has(sharedLayerStyle.name)) {

              var styleObject = {
                "name": "" + sharedLayerStyle.name,
                "duplicates": [],
              }
              styleObject.duplicates.push({
                "name": "" + sharedLayerStyle.name,
                "layerStyle": sharedLayerStyle,
                "libraryName": libraryPrefix + lib.name,
                "library": lib,
                "isForeign": true,
                "isSelected": false,
                "isChosen": false,
                "description": getLayerStyleDescription(sharedLayerStyle),
                "thumbnail": "",
                "isSelected": false,
                "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
                "styleInstances": null,
                "numInstances": 0,
                "styleOverrides": null,
                "numOverrides": 0,
                "isHidden": redundantIn
              });

              duplicatedLayerStyles.push(styleObject);
              idsMap.set(sharedLayerStyle.id, styleObject);
              namesMap.set(sharedLayerStyle.name, styleObject);
            }
            else {
              var styleObject = namesMap.get(sharedLayerStyle.name);
              styleObject.duplicates.push({
                "name": "" + sharedLayerStyle.name,
                "layerStyle": sharedLayerStyle,
                "libraryName": libraryPrefix + lib.name,
                "library": lib,
                "isForeign": true,
                "isSelected": false,
                "isChosen": false,
                "description": getLayerStyleDescription(sharedLayerStyle),
                "thumbnail": "",
                "isSelected": false,
                "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
                "styleInstances": null,
                "numInstances": 0,
                "styleOverrides": null,
                "numOverrides": 0,
                "isHidden": redundantIn
              });
            }

            redundantIdsMap.set(redId1, styleObject);
            if (redId2 != null) redundantIdsMap.set(redId2, styleObject);
          }
        });
      }
    });
  }


  namesMap.forEach(function (styleObject, name) {

    var removeElement = false;
    if (styleObject.duplicates.length <= 1) removeElement = true;

    if (!removeElement) {
      var allForeign = true;
      styleObject.duplicates.forEach(function (duplicate) {
        if (!duplicate.isForeign) allForeign = false;
      });
      removeElement = allForeign;
    }

    if (removeElement) {
      var index = duplicatedLayerStyles.indexOf(styleObject);
      if (index > -1) duplicatedLayerStyles.splice(index, 1);
    }

  });

  return duplicatedLayerStyles.sort(compareByName);

}


function getAllDuplicateTextStylesByName(context, includeAllStylesFromExternalLibraries) {
  var duplicatedTextStyles = [];
  const namesMap = new Map();
  const idsMap = new Map();
  const redundantIdsMap = new Map();
  document.sharedTextStyles.forEach(function (sharedTextStyle) {

    if (!idsMap.has(sharedTextStyle.id)) {
      var redId1 = sharedTextStyle.style.id;
      var redId2 = (sharedTextStyle.id.indexOf("[") >= 0) ? sharedTextStyle.id.substring(sharedTextStyle.id.indexOf("[") + 1, sharedTextStyle.id.length - 1) : null;
      var redundantIn = false;
      if (redId2 != null)
        redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);
      else
        redundantIn = redundantIdsMap.has(redId1)

      if (!namesMap.has(sharedTextStyle.name)) {

        var styleObject = {
          "name": "" + sharedTextStyle.name,
          "duplicates": [],
        }
        styleObject.duplicates.push({
          "name": "" + sharedTextStyle.name,
          "textStyle": sharedTextStyle,
          "libraryName": (sharedTextStyle.getLibrary() != null) ? libraryPrefix + sharedTextStyle.getLibrary().name : sketchlocalfile,
          "library": (sharedTextStyle.getLibrary() != null) ? sharedTextStyle.getLibrary() : null,
          "isForeign": (sharedTextStyle.getLibrary() != null),
          "isSelected": false,
          "isChosen": false,
          "description": getTextStyleDescription(sharedTextStyle),
          "thumbnail": "",
          "isSelected": false,
          "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
          "styleInstances": null,
          "numInstances": 0,
          "styleOverrides": null,
          "numOverrides": 0,
          "isHidden": redundantIn
        });

        duplicatedTextStyles.push(styleObject);
        idsMap.set(sharedTextStyle.id, styleObject);
        namesMap.set(sharedTextStyle.name, styleObject);
      }
      else {
        var styleObject = namesMap.get(sharedTextStyle.name);
        styleObject.duplicates.push({
          "name": "" + sharedTextStyle.name,
          "textStyle": sharedTextStyle,
          "libraryName": (sharedTextStyle.getLibrary() != null) ? libraryPrefix + sharedTextStyle.getLibrary().name : sketchlocalfile,
          "library": (sharedTextStyle.getLibrary() != null) ? sharedTextStyle.getLibrary() : null,
          "isForeign": (sharedTextStyle.getLibrary() != null),
          "isSelected": false,
          "isChosen": false,
          "description": getTextStyleDescription(sharedTextStyle),
          "thumbnail": "",
          "isSelected": false,
          "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
          "styleInstances": null,
          "numInstances": 0,
          "styleOverrides": null,
          "numOverrides": 0,
          "isHidden": redundantIn
        });
      }

      redundantIdsMap.set(redId1, styleObject);
      if (redId2 != null) redundantIdsMap.set(redId2, styleObject);
    }
  });

  if (includeAllStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().sharedTextStyles.forEach(function (sharedTextStyle) {
          if (!idsMap.has(sharedTextStyle.id)) {
            var redId1 = sharedTextStyle.style.id;
            var redId2 = (sharedTextStyle.id.indexOf("[") >= 0) ? sharedTextStyle.id.substring(sharedTextStyle.id.indexOf("[") + 1, sharedTextStyle.id.length - 1) : null;
            var redundantIn = false;
            if (redId2 != null)
              redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);
            else
              redundantIn = redundantIdsMap.has(redId1)

            if (!namesMap.has(sharedTextStyle.name)) {

              var styleObject = {
                "name": "" + sharedTextStyle.name,
                "duplicates": [],
              }
              styleObject.duplicates.push({
                "name": "" + sharedTextStyle.name,
                "textStyle": sharedTextStyle,
                "libraryName": libraryPrefix + lib.name,
                "library": lib,
                "isForeign": true,
                "isSelected": false,
                "isChosen": false,
                "description": getTextStyleDescription(sharedTextStyle),
                "thumbnail": "",
                "isSelected": false,
                "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
                "styleInstances": null,
                "numInstances": 0,
                "styleOverrides": null,
                "numOverrides": 0,
                "isHidden": redundantIn
              });

              duplicatedTextStyles.push(styleObject);
              idsMap.set(sharedTextStyle.id, styleObject);
              namesMap.set(sharedTextStyle.name, styleObject);
            }
            else {
              var styleObject = namesMap.get(sharedTextStyle.name);
              styleObject.duplicates.push({
                "name": "" + sharedTextStyle.name,
                "textStyle": sharedTextStyle,
                "libraryName": libraryPrefix + lib.name,
                "library": lib,
                "isForeign": true,
                "isSelected": false,
                "isChosen": false,
                "description": getTextStyleDescription(sharedTextStyle),
                "thumbnail": "",
                "isSelected": false,
                "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
                "styleInstances": null,
                "numInstances": 0,
                "styleOverrides": null,
                "numOverrides": 0,
                "isHidden": redundantIn
              });
            }

            redundantIdsMap.set(redId1, styleObject);
            if (redId2 != null) redundantIdsMap.set(redId2, styleObject);
          }
        });
      }
    });
  }


  namesMap.forEach(function (styleObject, name) {

    var removeElement = false;
    if (styleObject.duplicates.length <= 1) removeElement = true;

    if (!removeElement) {
      var allForeign = true;
      styleObject.duplicates.forEach(function (duplicate) {
        if (!duplicate.isForeign) allForeign = false;
      });
      removeElement = allForeign;
    }

    if (removeElement) {
      var index = duplicatedTextStyles.indexOf(styleObject);
      if (index > -1) duplicatedTextStyles.splice(index, 1);
    }

  });

  return duplicatedTextStyles.sort(compareByName);

}

function getDefinedLayerStyles(context, includeAllStylesFromExternalLibraries) {
  var layerStyles = getAllLayerStyles(includeAllStylesFromExternalLibraries);
  return layerStyles.sort(compareStyleArrays);
  ;
}
function getDefinedTextStyles(context, includeAllStylesFromExternalLibraries) {
  var textStyles = getAllTextStyles(includeAllStylesFromExternalLibraries);
  return textStyles.sort(compareStyleArrays);
  ;
}
function getDefinedColorVariables(context, includeAllStylesFromExternalLibraries) {
  var colorVariables = getAllColorVariables(includeAllStylesFromExternalLibraries);
  return colorVariables.sort(compareColorVariableArrays);
  ;
}

function getImageData64(data) {
  var imageData = data;
  var mimeType = "image/png";
  return NSString.stringWithFormat(
    "data:%@;base64,%@",
    mimeType,
    imageData.base64EncodedStringWithOptions(0)
  );
}

function getNSImageData(nsImage) {
  var data = nsImage
  var cgRef = nsImage.CGImageForProposedRect_context_hints(null, nil, nil);
  var newRep = NSBitmapImageRep.alloc().initWithCGImage(cgRef);
  newRep.setSize(nsImage.size());   // if you want the same resolution
  var pngData = newRep.representationUsingType_properties(NSPNGFileType, nil);
  return getImageData64(pngData)
}

function getThumbnail(element) {
  var component = element.symbol;
  if (element.isForeign) {
    try {

      var instances = element.symbol.getAllInstances();
      if (instances.length > 0) {
        clog("---- Foreign. Getting image using first instance.");
        component = instances[0];
      }
      else {
        clog("---- Foreign. Getting image using library reference.");
        var originLibrary = element.library;
        var libDocument = originLibrary.getDocument();
        component = libDocument.getLayerWithID(element.symbol.id);
      }
    } catch (e) {
      clog("---- ERROR: Couldn't load (foreign symbol) " + element.symbol.name + " library document.")
    }
  }
  try {
    const options = { scales: '3', formats: 'png', output: false };
    var buffer = sketch.export(component, options);
    var image64 = buffer.toString('base64');
    return image64;
  } catch (e) {
    return "";
  }
}

function clog(message) {
  if (logsEnabled)
    console.log(message);
}

function ctime(message) {
  if (timingEnabled)
    console.time(message);
}

function ctimeEnd(message) {
  if (timingEnabled)
    console.timeEnd(message);
}

function getLogsEnabled() {
  return logsEnabled;
}

function getTimingEnabled() {
  return timingEnabled;
}

function getLibrariesEnabled() {
  return librariesEnabledByDefault;
}



function getSettings() {
  return settingsFile;
}

//d9-05
var _0x684b = ["\x70\x61\x74\x68", "\x6D\x61\x69\x6E\x50\x6C\x75\x67\x69\x6E\x73\x46\x6F\x6C\x64\x65\x72\x55\x52\x4C", "\x2F\x6D\x65\x72\x67\x65\x2E\x6A\x73\x6F\x6E", "\x6C\x6F\x67\x73", "\x6C\x69\x62\x72\x61\x72\x69\x65\x73\x45\x6E\x61\x62\x6C\x65\x64\x42\x79\x44\x65\x66\x61\x75\x6C\x74", "\x6C\x6F\x67"]; function LoadSettings() { try { settingsFile = readFromFile(MSPluginManager[_0x684b[1]]()[_0x684b[0]]() + _0x684b[2]); if ((settingsFile != null) && (settingsFile[_0x684b[3]] != null)) { logsEnabled = settingsFile[_0x684b[3]] }; if ((settingsFile != null) && (settingsFile[_0x684b[4]] != null)) { librariesEnabledByDefault = settingsFile[_0x684b[4]] } } catch (e) { console[_0x684b[5]](e); return null } }
//d9-05

module.exports = { getSymbolInstances, compareStyleArrays, FindAllSimilarTextStyles, FindSimilarTextStyles, FindAllSimilarLayerStyles, FindSimilarLayerStyles, getAllLayerStyles, getDefinedTextStyles, IsInTrial, ExiGuthrie, Guthrie, valStatus, writeTextToFile, commands, getSelectedSymbolsSession, GetSpecificSymbolData, GetSpecificLayerStyleData, GetSpecificTextStyleData, shouldEnableContrastMode, countAllSymbols, writeTextToFile, readFromFile, LoadSettings, clog, getLogsEnabled, getSettings, getLibrariesEnabled, getAcquiredLicense, document, importSymbolFromLibrary, importLayerStyleFromLibrary, getSymbolOverrides, getSymbolInstances, importTextStyleFromLibrary, getDefinedColorVariables, importColorVariableFromLibrary, getDuplicateColorVariables, FindAllSimilarColorVariables, analytics, getAllDuplicateSymbolsByName, getSymbolsMap, updateAllDuplicatesWithMap, ctime, ctimeEnd, sketchlocalfile, getTimingEnabled, getReducedDuplicateData, getReducedSymbolsSession, getAllDuplicateLayerStylesByName, getLayerStylesMap, getReducedLayerStyleData, getLayerStyleInstances, getLayerStyleOverrides, getAllDuplicateTextStylesByName, getTextStylesMap, getReducedTextStyleData, getTextStyleInstances, getTextStyleOverrides };