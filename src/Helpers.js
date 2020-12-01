
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

const debugLogEnabled = true;

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

function GetTextBasedOnCount(number) {
  if (number != 1) {
    return " styles ";
  }
  else {
    return " style ";
  }
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

function brightnessByColor(color) {
  var color = "" + color, isHEX = color.indexOf("#") == 0, isRGB = color.indexOf("rgb") == 0;
  if (isHEX) {
    var m = color.substr(1).match(color.length == 7 ? /(\S{2})/g : /(\S{1})/g);
    if (m) var r = parseInt(m[0], 16), g = parseInt(m[1], 16), b = parseInt(m[2], 16);
  }
  if (isRGB) {
    var m = color.match(/(\d+){3}/g);
    if (m) var r = m[0], g = m[1], b = m[2];
  }
  if (typeof r != "undefined") return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}

function getAcquiredLicense() {
  return acquiredLicense;
}


function containsIDOrViceversa(id1, id2) {
  var contains = false;
  //console.log("Comparing_ "+id1+" -VS- "+id2);

  //Compare if id1 contains id2

  var splitId2 = id2.toString().split("[")[1];
  if (splitId2 == null) splitId2 = id2.toString().split("[")[0];
  if (splitId2 == null) splitId2 = id2.toString();

  if (splitId2 != null) {
    var compareId2 = splitId2.replace("]", "");
    if (id1.toString().indexOf(compareId2) > -1) {
      //console.log("id1 contains id2");
      contains = true;
    }
  }


  //Compare if id2 contains id1

  var splitId1 = id1.toString().split("[")[1];
  if (splitId1 == null) splitId1 = id1.toString().split("[")[0];
  if (splitId1 == null) splitId1 = id1.toString();

  if (splitId1 != null) {
    var compareId1 = splitId1.replace("]", "");
    if (id2.toString().indexOf(compareId1) > -1) {
      //console.log("id2 contains id1");
      contains = true;
    }
  }

  return contains;
}

function indexOfForeignStyle(array, style) {

  var index = -1;
  for (var i = 0; i < array.length; i++) {
    if (array[i].remoteShareID != null) {
      if (containsIDOrViceversa(array[i].remoteShareID, style.remoteShareID())) {
        // console.log("Found it on:"+array[i].remoteShareID+"  --  "+style.remoteShareID());
        return i;
      }
    }

    if (array[i].duplicates != null) {
      for (var j = 0; j < array[i].duplicates.length; j++) {
        if (array[i].duplicates[j].remoteShareID != null) {
          // console.log("Looking in duplicates remoteShareID:"+array[i].duplicates[j].remoteShareID+"  --  "+style.remoteShareID());
          if (containsIDOrViceversa(array[i].duplicates[j].remoteShareID, style.remoteShareID())) {
            var positions = [i, j];
            // console.log("Looking in duplicates remoteShareID:"+array[i].duplicates[j].remoteShareID+"  --  "+style.remoteShareID());
            return positions;
          }
        }
      }
    }
  }
  return index;
}


function isString(obj) {
  try {
    return obj.isKindOfClass(NSString) == 1;
  } catch {
    return false;
  }
}

function containsTextStyle(array, textStyle) {
  var contains = array.filter(function (obj) {
    return obj.textStyle == textStyle;
  }).length >= 1;

  return contains;
}

function containsLayerStyle(array, layerStyle) {
  var contains = array.filter(function (obj) {
    return obj.layerStyle == layerStyle;
  }).length >= 1;

  return contains;
}

function createView(frame) {
  var view = NSView.alloc().initWithFrame(frame);

  return view;
}


function createSeparator(frame) {
  var separator = NSView.alloc().initWithFrame(frame);
  separator.setWantsLayer(1);
  separator.layer().setBackgroundColor(getColorDependingOnTheme());
  return separator;
}

function getColorDependingOnTheme() {
  var UI = require('sketch/ui');
  var theme = UI.getTheme()

  if (theme === 'dark') {
    return CGColorCreateGenericRGB(70 / 255, 70 / 255, 70 / 255, 1.0);
  } else {
    return CGColorCreateGenericRGB(204 / 255, 204 / 255, 204 / 255, 1.0);
  }
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





function compareSymbolNames(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

function alreadyInList(array, style) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].originalStyle != null) {
      if (array[i].originalStyle.remoteShareID().localeCompare(style.objectID()) == 0) {
        return true;
      }
    }
  }
  return false;
}

function getIndexOf(text, array) {

  for (var i = 0; i < array.length; i++) {
    if (array[i].localeCompare(text) == 0)
      return i;
  }
  return -1;
}

function FindSimilarTextStyles(referenceStyle, styles, context, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {

  var similarStyles = [];

  styles.forEach(function (style) {
    try {
      if (referenceStyle != style.textStyle) {
        //debugLog("["+referenceStyle.name+"] and ["+style.name+"]");

        var sameFont = false;
        try {
          sameFont = referenceStyle.style.fontFamily == style.textStyle.style.fontFamily;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose font");
        }
        //debugLog("---Font? "+sameFont);

        var sameWeight = false;
        try {
          sameWeight = referenceStyle.style.fontWeight == style.textStyle.style.fontWeight;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose weight");
        }
        //debugLog("---FontWeight? "+sameWeight);

        var sameSize = false;
        try {
          sameSize = referenceStyle.style.fontSize == style.textStyle.style.fontSize;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose size");
        }
        //debugLog("---FontSize? "+sameSize);

        var sameColor = false;
        try {
          sameColor = referenceStyle.style.textColor == style.textStyle.style.textColor;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose color");
        }
        //debugLog("---Color? "+sameColor);

        var sameParagraphSpacing = false;
        try {
          sameParagraphSpacing = referenceStyle.style.paragraphSpacing == style.textStyle.style.paragraphSpacing;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose paragraph spacing");
        }
        //debugLog("---Paragraph Spacing? "+sameParagraphSpacing);

        var sameLineHeight = false;
        try {
          sameLineHeight = referenceStyle.style.lineHeight == style.textStyle.style.lineHeight;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose line height");
        }
        //debugLog("---Line height? "+sameLineHeight);

        var sameAlignment = false;
        try {
          sameAlignment = referenceStyle.style.alignment == style.textStyle.style.alignment;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose alignment");
        }
        //debugLog("---Alignment? "+sameAlignment);

        var sameCharacterSpacing = false;
        try {
          sameCharacterSpacing = referenceStyle.style.kerning == style.textStyle.style.kerning;
        } catch {
          clog("Finding similar text styles - Couldn't disclose character spacing");
        }
        //debugLog("---Character Spacing? "+sameCharacterSpacing + "-  Comparing ["+referenceStyle.style().textStyle().attributes().NSKern+"] with ["+style.textStyle.style().textStyle().attributes().NSKern+"]" );

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
        //debugLog("[" + referenceStyle.name + "] and [" + style.layerStyle.name + "]");

        var sameFillColor = false;
        if ((referenceStyle.style.fills.length > 0) && (style.layerStyle.style.fills.length > 0)) {
          sameFillColor = referenceStyle.style.fills[0].color.substring(0, 7).toUpperCase() == style.layerStyle.style.fills[0].color.substring(0, 7).toUpperCase();
        }
        //debugLog("---Fill? " + sameFillColor);

        var sameBorderColor = false;
        if ((referenceStyle.style.borders.length > 0) && (style.layerStyle.style.borders.length > 0)) {
          sameBorderColor = referenceStyle.style.borders[0].color.substring(0, 7).toUpperCase() == style.layerStyle.style.borders[0].color.substring(0, 7).toUpperCase();
        }
        //debugLog("---BorderColor? " + sameBorderColor);

        var sameBorderThickness = false;
        if ((referenceStyle.style.borders.length > 0) && (style.layerStyle.style.borders.length > 0)) {
          sameBorderThickness = referenceStyle.style.borders[0].thickness == style.layerStyle.style.borders[0].thickness
        }
        //debugLog("---BorderThickness? " + sameBorderThickness);


        var sameShadowColor = false;
        if ((referenceStyle.style.shadows.length > 0) && (style.layerStyle.style.shadows.length > 0)) {
          sameShadowColor = referenceStyle.style.shadows[0].color.substring(0, 7).toUpperCase() == style.layerStyle.style.shadows[0].color.substring(0, 7).toUpperCase();
        }
        //debugLog("---ShadowColor? " + sameShadowColor);

        var sameShadowParams = false;
        if ((referenceStyle.style.shadows.length > 0) && (style.layerStyle.style.shadows.length > 0)) {
          sameShadowParams = ((referenceStyle.style.shadows[0].x == style.layerStyle.style.shadows[0].x) && (referenceStyle.style.shadows[0].y == style.layerStyle.style.shadows[0].y) && (referenceStyle.style.shadows[0].blur == style.layerStyle.style.shadows[0].blur) && (referenceStyle.style.shadows[0].spread == style.layerStyle.style.shadows[0].spread));
        }
        //debugLog("---ShadowParams? " + sameShadowParams);

        var isSimilar = true;
        if (checkSameFillColor) isSimilar = isSimilar && sameFillColor;
        if (checkSameBorderColor) isSimilar = isSimilar && sameBorderColor;
        if (checkSameBorderThickness) isSimilar = isSimilar && sameBorderThickness;
        if (checkSameShadowColor) isSimilar = isSimilar && sameShadowColor;
        if (checkSameShadowParams) isSimilar = isSimilar && sameShadowParams;

        if (isSimilar) similarStyles.push(style);
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
  // console.log("getSymbolInstances. Symbol is " + (symbolMaster != null));
  // console.log(symbolMaster);
  var symbolInstances = symbolMaster.getAllInstances();
  return symbolInstances;
}

function getSymbolOverrides(symbolMaster, idsMap) {
  var symbolOverrides = [];
  // var instances = sketch.find("[type='SymbolInstance']", document);
  // instances.forEach(function (instance) {
  //   instance.overrides.forEach(function (override) {
  //     if ((override.property.localeCompare("symbolID") == 0) /*&& (override.isDefault == 0)*/) {
  //       if (override.value.localeCompare(symbolMaster.symbolId) == 0) {
  //         symbolOverrides.push({
  //           "instance": instance,
  //           "override": override
  //         });
  //       }
  //     }
  //   });
  // });

  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(instance => hasOverrides2(instance, idsMap));

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

function getRelatedOverrides(context, id, property) {
  var overrides = NSMutableArray.array();
  var instances = sketch.find("[type='SymbolInstance']", document);
  instances.forEach(function (instance) {
    instance.overrides.forEach(function (override) {
      if ((override.property.localeCompare(property) == 0) /*&& (override.isDefault == 0)*/) {
        if (override.value.localeCompare(id) == 0) {
          overrides.push({
            "instance": instance,
            "override": override
          });
        }
      }
    });
  });

  return overrides;
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
              namesMap.set(symbol.name, true);
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

  return duplicatedSymbols.sort(compareSymbolNames);

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
  var reducedInstances = allInstances.filter(instance => hasOverrides2(instance, idsMap));

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



function updateAllDuplicatesWithMap(allDuplicates, symbolsMap) {
  allDuplicates.forEach(duplicate => {
    duplicate.duplicates.forEach(symbol => {
      symbol.symbolInstances = symbolsMap.get(duplicate).directInstances;
    });
  });
}

function hasOverrides2(instance, idsMap) {
  if ((instance.sketchObject.overrides() != null) && (instance.sketchObject.overrides().count() > 0)) {
    return FindNestedOverride(instance.sketchObject.overrides(), idsMap);
  }
  return false;
}

function FindNestedOverride(overrides, idsMap) {
  for (var key in overrides) {
    var symbolID = overrides[key]["symbolID"];
    if (symbolID != null) {
      if (typeof symbolID === 'function') { symbolID = symbolID(); }
      if (idsMap.has("" + symbolID)) {
        return true;
      }
    }
    else {
      return FindNestedOverride(overrides[key], idsMap);
    }
  }
  return false;
}

function getDocumentSymbols(context, includeAllSymbolsFromExternalLibraries) {
  var symbols = [];
  const map = new Map();
  document.getSymbols().forEach(function (symbol) {
    if (!map.has(symbol.id)) {
      map.set(symbol.id, true);
      symbols.push({
        "symbol": symbol,
        "foreign": (symbol.getLibrary() != null),
        "library": (symbol.getLibrary() != null) ? symbol.getLibrary() : null
      });
    }
  });

  if (includeAllSymbolsFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().getSymbols().forEach(function (symbol) {
          if (!map.has(symbol.id)) {
            symbols.push({
              "symbol": symbol,
              "foreign": true,
              "library": lib
            });
          }
        });
      }
    });
  }

  return symbols;
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
    return null;
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



function debugLog(message) {
  if (debugLogEnabled) console.log(message);
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

function getSelectedSymbolsSession(selection) {

  var symbolObjects = [];
  var idsMap = new Map();

  selection.forEach(function (docSymbol) {
    var foreignLib = docSymbol.library;
    var isForeign = docSymbol.foreign;
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

  return symbolObjects.sort(compareSymbolNames);

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
      "foreign": colorVariable.foreign,
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
        "foreign": colorVariable.foreign,
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
        if (!duplicate.foreign) allForeign = false;
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

function GetSpecificLayerStyleData(context, layerStyles, index) {

  clog("Processing text style metadata for: " + layerStyles[index].name);
  // ctime("GetSpecificLayerStyleData");
  for (var i = 0; i < layerStyles[index].duplicates.length; i++) {
    layerStyles[index].duplicates[i].thumbnail = getOvalThumbnail(layerStyles[index].duplicates[i].layerStyle);
  }
  // ctimeEnd("GetSpecificLayerStyleData");
}

function GetSpecificTextStyleData(context, textStyles, index) {

  clog("Processing text style metadata for: " + textStyles[index].name);
  // ctime("GetSpecificLayerStyleData");
  for (var i = 0; i < textStyles[index].duplicates.length; i++) {
    textStyles[index].duplicates[i].thumbnail = getTextThumbnail(textStyles[index].duplicates[i].textStyle);
  }
  // ctimeEnd("GetSpecificLayerStyleData");
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

function importForeignSymbol(symbol, library) {
  var objectReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(symbol, library);

  return AppController.sharedInstance().librariesController().importShareableObjectReference_intoDocument(objectReference, data);
}

function getAllLayerStyles(includeAllStylesFromExternalLibraries) {
  var allStyles = [];
  const map = new Map();

  document.sharedLayerStyles.forEach(function (sharedLayerStyle) {

    var library = sharedLayerStyle.getLibrary();

    var layerStyleObject = {
      "layerStyle": sharedLayerStyle,
      "name": "" + sharedLayerStyle.name,
      "libraryName": (library != null) ? libraryPrefix + library.name : sketchlocalfile,
      "library": library,
      "foreign": (library != null),
      "isSelected": false,
      "isChosen": false,
      "description": getLayerStyleDescription(sharedLayerStyle),
      "thumbnail": getOvalThumbnail(sharedLayerStyle),
      "duplicates": [],
      "isSelected": false,
      "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false
    }

    allStyles.push(layerStyleObject);
    map.set(sharedLayerStyle.style.id, true);
  });

  if (includeAllStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().sharedLayerStyles.forEach(function (sharedLayerStyle) {
          if (!map.has(sharedLayerStyle.style.id)) {
            var layerStyleObject = {
              "layerStyle": sharedLayerStyle,
              "name": "" + sharedLayerStyle.name,
              "libraryName": libraryPrefix + lib.name,
              "library": lib,
              "foreign": true,
              "isSelected": false,
              "isChosen": false,
              "description": getLayerStyleDescription(sharedLayerStyle),
              "thumbnail": getOvalThumbnail(sharedLayerStyle),
              "duplicates": [],
              "isSelected": false,
              "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false
            }
            allStyles.push(layerStyleObject);
          }
        });
      }
    });
  }

  return allStyles;

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
      "foreign": (library != null),
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
              "foreign": true,
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
      "foreign": false,
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
              "foreign": true,
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


function getDuplicateLayerStyles(context, includeAllStylesFromExternalLibraries) {

  var allStyles = [];
  var nameDictionary = {};
  const map = new Map();

  document.sharedLayerStyles.forEach(function (sharedLayerStyle) {

    var library = sharedLayerStyle.getLibrary();

    var layerStyleObject = {
      "layerStyle": sharedLayerStyle,
      "name": "" + sharedLayerStyle.name,
      "libraryName": (library != null) ? libraryPrefix + library.name : sketchlocalfile,
      "library": library,
      "foreign": (library != null),
      "isSelected": false,
      "isChosen": false,
      "description": getLayerStyleDescription(sharedLayerStyle),
      "thumbnail": "",
      "duplicates": [],
      "isSelected": false,
      "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false
    }

    if (nameDictionary[sharedLayerStyle.name] == null) {
      layerStyleObject.duplicates.push({
        "layerStyle": sharedLayerStyle,
        "name": "" + sharedLayerStyle.name,
        "libraryName": (library != null) ? libraryPrefix + library.name : sketchlocalfile,
        "library": library,
        "foreign": (library != null),
        "isSelected": false,
        "isChosen": false,
        "description": getLayerStyleDescription(sharedLayerStyle),
        "thumbnail": "",
        "duplicates": null,
        "isSelected": false,
        "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false
      });
      allStyles.push(layerStyleObject);
      map.set(sharedLayerStyle.style.id, true);
      nameDictionary[sharedLayerStyle.name] = layerStyleObject;
    }
    else {
      nameDictionary[sharedLayerStyle.name].duplicates.push(layerStyleObject);
    }
  });

  if (includeAllStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().sharedLayerStyles.forEach(function (sharedLayerStyle) {
          if (!map.has(sharedLayerStyle.style.id)) {
            var layerStyleObject = {
              "layerStyle": sharedLayerStyle,
              "name": "" + sharedLayerStyle.name,
              "libraryName": libraryPrefix + lib.name,
              "library": lib,
              "foreign": true,
              "isSelected": false,
              "isChosen": false,
              "description": getLayerStyleDescription(sharedLayerStyle),
              "thumbnail": "",
              "duplicates": [],
              "isSelected": false,
              "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false
            }

            if (nameDictionary[sharedLayerStyle.name] == null) {
              layerStyleObject.duplicates.push({
                "layerStyle": sharedLayerStyle,
                "name": "" + sharedLayerStyle.name,
                "libraryName": libraryPrefix + lib.name,
                "library": lib,
                "foreign": true,
                "isSelected": false,
                "isChosen": false,
                "description": getLayerStyleDescription(sharedLayerStyle),
                "thumbnail": "",
                "duplicates": null,
                "isSelected": false,
                "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false
              });
            }
            else {
              nameDictionary[sharedLayerStyle.name].duplicates.push(layerStyleObject);
            }
          }
        });
      }
    });
  }

  // ctimeEnd("getDuplicateExternalSymbols");

  Object.keys(nameDictionary).forEach(function (key) {
    var removeElement = false;
    if (nameDictionary[key].duplicates.length <= 1) removeElement = true;

    if (!removeElement) {
      var allForeign = true;
      nameDictionary[key].duplicates.forEach(function (duplicate) {
        if (!duplicate.foreign) allForeign = false;
      });
      if (allForeign) {
        removeElement = true;
      }
    }

    if (removeElement) {
      var index = allStyles.indexOf(nameDictionary[key]);
      if (index > -1) allStyles.splice(index, 1);
      nameDictionary[key] = null;
    }
  });

  return allStyles;

}

function getDuplicateTextStyles(context, includeAllStylesFromExternalLibraries) {

  var allStyles = [];
  var nameDictionary = {};
  const map = new Map();

  document.sharedTextStyles.forEach(function (sharedTextStyle) {

    var library = sharedTextStyle.getLibrary();

    var textStyleObject = {
      "textStyle": sharedTextStyle,
      "name": "" + sharedTextStyle.name,
      "libraryName": (library != null) ? libraryPrefix + library.name : sketchlocalfile,
      "library": library,
      "foreign": (library != null),
      "isSelected": false,
      "isChosen": false,
      "description": getTextStyleDescription(sharedTextStyle),
      "thumbnail": "",
      "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
      "duplicates": [],
      "isSelected": false
    }

    if (nameDictionary[sharedTextStyle.name] == null) {
      textStyleObject.duplicates.push({
        "textStyle": sharedTextStyle,
        "name": "" + sharedTextStyle.name,
        "libraryName": (library != null) ? libraryPrefix + library.name : sketchlocalfile,
        "library": library,
        "foreign": (library != null),
        "isSelected": false,
        "isChosen": false,
        "description": getTextStyleDescription(sharedTextStyle),
        "thumbnail": "",
        "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
        "duplicates": null,
        "isSelected": false
      });
      allStyles.push(textStyleObject);
      map.set(sharedTextStyle.style.id, true);
      nameDictionary[sharedTextStyle.name] = textStyleObject;
    }
    else {
      nameDictionary[sharedTextStyle.name].duplicates.push(textStyleObject);
    }
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
              "foreign": true,
              "isSelected": false,
              "isChosen": false,
              "description": getTextStyleDescription(sharedTextStyle),
              "thumbnail": "",
              "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
              "duplicates": [],
              "isSelected": false
            }

            if (nameDictionary[sharedTextStyle.name] == null) {
              textStyleObject.duplicates.push({
                "textStyle": sharedTextStyle,
                "name": "" + sharedTextStyle.name,
                "libraryName": libraryPrefix + lib.name,
                "library": lib,
                "foreign": true,
                "isSelected": false,
                "isChosen": false,
                "description": getTextStyleDescription(sharedTextStyle),
                "thumbnail": "",
                "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
                "duplicates": null,
                "isSelected": false
              });
              allStyles.push(textStyleObject);
              nameDictionary[sharedTextStyle.name] = textStyleObject;
            }
            else {
              nameDictionary[sharedTextStyle.name].duplicates.push(textStyleObject);
            }
          }
        });
      }
    });
  }

  Object.keys(nameDictionary).forEach(function (key) {
    var removeElement = false;
    if (nameDictionary[key].duplicates.length <= 1) removeElement = true;

    if (!removeElement) {
      var allForeign = true;
      nameDictionary[key].duplicates.forEach(function (duplicate) {
        if (!duplicate.foreign) allForeign = false;
      });
      if (allForeign) {
        removeElement = true;
      }
    }

    if (removeElement) {
      var index = allStyles.indexOf(nameDictionary[key]);
      if (index > -1) allStyles.splice(index, 1);
      nameDictionary[key] = null;
    }
  });

  return allStyles;

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
        var originLibrary = element.symbol.getLibrary();
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

function getBase64(element, width, height) {
  var image = getThumbnail(component, width, height);
  return "" + getNSImageData(image);
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

module.exports = { GetTextBasedOnCount, getBase64, brightnessByColor, isString, getSymbolInstances, containsTextStyle, containsLayerStyle, createView, createSeparator, getColorDependingOnTheme, compareStyleArrays, alreadyInList, getIndexOf, FindAllSimilarTextStyles, FindSimilarTextStyles, FindAllSimilarLayerStyles, FindSimilarLayerStyles, getDefinedLayerStyles, getDefinedTextStyles, indexOfForeignStyle, IsInTrial, ExiGuthrie, Guthrie, valStatus, writeTextToFile, commands, getSelectedSymbolsSession, importForeignSymbol, GetSpecificSymbolData, getDuplicateLayerStyles, GetSpecificLayerStyleData, getDuplicateTextStyles, GetSpecificTextStyleData, shouldEnableContrastMode, countAllSymbols, EditSettings, writeTextToFile, readFromFile, LoadSettings, clog, getLogsEnabled, getSettings, getLibrariesEnabled, getAcquiredLicense, getDocumentSymbols, debugLog, document, importSymbolFromLibrary, importLayerStyleFromLibrary, getSymbolOverrides, getSymbolInstances, getRelatedOverrides, importTextStyleFromLibrary, getDefinedColorVariables, importColorVariableFromLibrary, getDuplicateColorVariables, FindAllSimilarColorVariables, analytics, getAllDuplicateSymbolsByName, getSymbolsMap, updateAllDuplicatesWithMap, ctime, ctimeEnd, sketchlocalfile, getTimingEnabled, getReducedDuplicateData, getReducedSymbolsSession };