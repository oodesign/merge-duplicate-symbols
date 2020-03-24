var DeltaE = require('delta-e');
var D3 = require('d3-color');
var fs = require('@skpm/fs');

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
  mergeduplicatelayerstyles: 'mergeduplicatelayerstyles'
}

const sketchlocalfile = "   💎 This Sketch file";
const libraryPrefix = "🔸 ";

//d9-03
var _0x28fb = ["\x69\x6E\x69\x74", "\x61\x6C\x6C\x6F\x63", "\x2F\x75\x73\x72\x2F\x62\x69\x6E\x2F\x63\x75\x72\x6C", "\x73\x65\x74\x4C\x61\x75\x6E\x63\x68\x50\x61\x74\x68", "\x73\x65\x74\x41\x72\x67\x75\x6D\x65\x6E\x74\x73", "\x70\x69\x70\x65", "\x73\x65\x74\x53\x74\x61\x6E\x64\x61\x72\x64\x4F\x75\x74\x70\x75\x74", "\x73\x65\x74\x53\x74\x61\x6E\x64\x61\x72\x64\x45\x72\x72\x6F\x72", "\x6C\x61\x75\x6E\x63\x68", "\x77\x61\x69\x74\x55\x6E\x74\x69\x6C\x45\x78\x69\x74", "\x74\x65\x72\x6D\x69\x6E\x61\x74\x69\x6F\x6E\x53\x74\x61\x74\x75\x73", "\x72\x65\x61\x64\x44\x61\x74\x61\x54\x6F\x45\x6E\x64\x4F\x66\x46\x69\x6C\x65", "\x66\x69\x6C\x65\x48\x61\x6E\x64\x6C\x65\x46\x6F\x72\x52\x65\x61\x64\x69\x6E\x67", "\x69\x6E\x69\x74\x57\x69\x74\x68\x44\x61\x74\x61\x5F\x65\x6E\x63\x6F\x64\x69\x6E\x67", "\x73\x75\x63\x63\x65\x73\x73", "\x61\x70\x70", "\x70\x75\x72\x63\x68\x61\x73\x65", "\x75\x73\x65\x73", "\x71\x75\x61\x6E\x74\x69\x74\x79", "\x6F\x76\x65\x72", "\x6E\x6F", "\x6E\x6F\x43\x6F\x6E"]; function curl_async(_0x1cd5x2, _0x1cd5x3) { var _0x1cd5x4 = NSTask[_0x28fb[1]]()[_0x28fb[0]](); _0x1cd5x4[_0x28fb[3]](_0x28fb[2]); _0x1cd5x4[_0x28fb[4]](_0x1cd5x2); var _0x1cd5x5 = NSPipe[_0x28fb[5]](); var _0x1cd5x6 = NSPipe[_0x28fb[5]](); _0x1cd5x4[_0x28fb[6]](_0x1cd5x5); _0x1cd5x4[_0x28fb[7]](_0x1cd5x6); _0x1cd5x4[_0x28fb[8]](); _0x1cd5x4[_0x28fb[9]](); var _0x1cd5x7 = _0x1cd5x4[_0x28fb[10]](); var _0x1cd5x8 = _0x1cd5x6[_0x28fb[12]]()[_0x28fb[11]](); var _0x1cd5x9 = NSString[_0x28fb[1]]()[_0x28fb[13]](_0x1cd5x8, NSUTF8StringEncoding); if (_0x1cd5x7 == 0) { var _0x1cd5xa = _0x1cd5x5[_0x28fb[12]]()[_0x28fb[11]](); var _0x1cd5xb = NSString[_0x28fb[1]]()[_0x28fb[13]](_0x1cd5xa, NSUTF8StringEncoding); var _0x1cd5xc = tryParseJSON(_0x1cd5xb); if (_0x1cd5xc[_0x28fb[14]]) { if (!_0x1cd5x3) { return valStatus[_0x28fb[15]] } else { if (_0x1cd5xc[_0x28fb[16]] != null) { if (_0x1cd5xc[_0x28fb[17]] > _0x1cd5xc[_0x28fb[16]][_0x28fb[18]]) { return valStatus[_0x28fb[19]] } else { return valStatus[_0x28fb[15]] } } else { return valStatus[_0x28fb[15]] } } } else { return valStatus[_0x28fb[20]] } } else { return valStatus[_0x28fb[21]] } }
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

var jsonFromFile = function (filePath, mutable) {
  var read = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  return read;
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

function indexOfForeignStyle2(array, style) {

  var index = -1;
  for (var i = 0; i < array.length; i++) {
    if (array[i].duplicates != null) {
      for (var j = 0; j < array[i].duplicates.length; j++) {
        if (array[i].duplicates[j].remoteShareID != null) {
          // console.log("Looking in duplicates remoteShareID:"+array[i].duplicates[j].remoteShareID+"  --  "+style.remoteShareID());
          if (containsIDOrViceversa(array[i].duplicates[j].remoteShareID, style.objectID())) {
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

function getColorDependingOnBrightness(colorBrightness) {
  if (colorBrightness != null) {

    var UI = require('sketch/ui');
    var theme = UI.getTheme()

    if (theme === 'dark') {
      if ((colorBrightness > 100) && (colorBrightness < 130))
        return MSColor.colorWithRed_green_blue_alpha(0.35, 0.35, 0.35, 1);
      else
        return MSColor.colorWithRed_green_blue_alpha(1, 1, 1, 0);
    } else {
      if (colorBrightness > 230)
        return MSColor.colorWithRed_green_blue_alpha(0.8, 0.8, 0.8, 1);
      else
        return MSColor.colorWithRed_green_blue_alpha(1, 1, 1, 0);
    }
  }
  else {
    return MSColor.colorWithRed_green_blue_alpha(1, 1, 1, 0);
  }
}

function isString(obj) {
  try {
    return obj.isKindOfClass(NSString) == 1;
  } catch{
    return false;
  }
}

function getAlignment(alignment) {
  switch (alignment) {
    case 0:
      return "Left";
      break;
    case 1:
      return "Right";
      break;
    case 2:
      return "Center";
      break;
    case 3:
      return "Justified";
      break;
    default:
      return "Natural";
      break;
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

function getAllTextLayers(context) {
  var layers = NSMutableArray.array();
  context.document.pages().forEach(function (page) {
    var predicate = NSPredicate.predicateWithFormat("className == 'MSTextLayer'"),
      instances = page.children().filteredArrayUsingPredicate(predicate),
      instanceLoop = instances.objectEnumerator(),
      instance;

    while (instance = instanceLoop.nextObject()) {
      layers.addObject(instance);
    }
  });
  return layers;
}

function getAllLayers(context) {
  var layers = NSMutableArray.array();

  context.document.pages().forEach(function (page) {
    var instances = page.children(),
      instanceLoop = instances.objectEnumerator(),
      instance;

    while (instance = instanceLoop.nextObject()) {
      layers.addObject(instance);
    }
  });
  return layers;
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
    if (referenceStyle != style.textStyle) {
      //console.log("["+referenceStyle.name()+"] and ["+style.name()+"]");

      var sameFont = referenceStyle.style().textStyle().attributes().NSFont.familyName() == style.textStyle.style().textStyle().attributes().NSFont.familyName();
      //console.log("---Font? "+sameFont);

      var sameWeight = NSFontManager.sharedFontManager().weightOfFont_(referenceStyle.style().textStyle().attributes().NSFont) == NSFontManager.sharedFontManager().weightOfFont_(style.textStyle.style().textStyle().attributes().NSFont);
      //console.log("---FontWeight? "+sameWeight);

      var sameSize = referenceStyle.style().textStyle().attributes().NSFont.pointSize() == style.textStyle.style().textStyle().attributes().NSFont.pointSize();
      //console.log("---FontSize? "+sameSize);

      console.log("ref:" + referenceStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue());
      console.log("style:" + style.textStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue());
      var sameColor = referenceStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue() == style.textStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue();
      //console.log("---Color? "+sameColor);

      var sameParagraphSpacing = referenceStyle.style().textStyle().attributes().NSParagraphStyle.paragraphSpacing() == style.textStyle.style().textStyle().attributes().NSParagraphStyle.paragraphSpacing();
      //console.log("---Paragraph Spacing? "+sameParagraphSpacing);

      var sameLineHeight = referenceStyle.style().textStyle().attributes().NSParagraphStyle.minimumLineHeight() == style.textStyle.style().textStyle().attributes().NSParagraphStyle.minimumLineHeight();
      //console.log("---Line height? "+sameLineHeight);

      var sameAlignment = referenceStyle.style().textStyle().attributes().NSParagraphStyle.alignment() == style.textStyle.style().textStyle().attributes().NSParagraphStyle.alignment();
      //console.log("---Alignment? "+sameAlignment);

      var sameCharacterSpacing = false;
      try {
        sameCharacterSpacing = referenceStyle.style().textStyle().attributes().NSKern.toString() == style.textStyle.style().textStyle().attributes().NSKern.toString();
      } catch{
        sameCharacterSpacing = referenceStyle.style().textStyle().attributes().NSKern == style.textStyle.style().textStyle().attributes().NSKern;
      }
      //console.log("---Character Spacing? "+sameCharacterSpacing + "-  Comparing ["+referenceStyle.style().textStyle().attributes().NSKern+"] with ["+style.textStyle.style().textStyle().attributes().NSKern+"]" );

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



  });
  return similarStyles;
}

function FindAllSimilarTextStyles(context, includeAllStylesFromExternalLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {

  var stylesWithSimilarStyles = [];
  var stylesAlreadyProcessed = [];

  var definedTextStyles = getDefinedTextStyles(context, includeAllStylesFromExternalLibraries, null);
  for (var i = 0; i < definedTextStyles.length; i++) {

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
    if (referenceStyle != style.layerStyle) {
      //console.log("["+referenceStyle.name()+"] and ["+style.layerStyle.name()+"]");

      var sameFillColor = false;
      if (referenceStyle.style().firstEnabledFill() != null && style.layerStyle.style().firstEnabledFill() != null) {
        sameFillColor = referenceStyle.style().firstEnabledFill().color().immutableModelObject().hexValue().toString() == style.layerStyle.style().firstEnabledFill().color().immutableModelObject().hexValue().toString();
      }
      //console.log("---Fill? "+sameFillColor);

      var sameBorderColor = false;
      if (referenceStyle.style().firstEnabledBorder() != null && style.layerStyle.style().firstEnabledBorder() != null) {
        sameBorderColor = referenceStyle.style().firstEnabledBorder().color().immutableModelObject().hexValue().toString() == style.layerStyle.style().firstEnabledBorder().color().immutableModelObject().hexValue().toString();
      }
      //console.log("---BorderColor? "+sameBorderColor);

      var sameBorderThickness = false;
      if (referenceStyle.style().firstEnabledBorder() != null && style.layerStyle.style().firstEnabledBorder() != null) {
        sameBorderThickness = referenceStyle.style().firstEnabledBorder().thickness() == style.layerStyle.style().firstEnabledBorder().thickness();
      }
      //console.log("---BorderThickness? "+sameBorderThickness);


      var sameShadowColor = false;
      if (referenceStyle.style().firstEnabledShadow() != null && style.layerStyle.style().firstEnabledShadow() != null) {
        sameShadowColor = referenceStyle.style().firstEnabledShadow().color().immutableModelObject().hexValue().toString() == style.layerStyle.style().firstEnabledShadow().color().immutableModelObject().hexValue().toString();
      }
      //console.log("---ShadowColor? "+sameShadowColor);

      var sameShadowParams = false;
      if (referenceStyle.style().firstEnabledShadow() != null && style.layerStyle.style().firstEnabledShadow() != null) {
        sameShadowParams = (referenceStyle.style().firstEnabledShadow().offsetX() == style.layerStyle.style().firstEnabledShadow().offsetX()) && (referenceStyle.style().firstEnabledShadow().offsetY() == style.layerStyle.style().firstEnabledShadow().offsetY()) && (referenceStyle.style().firstEnabledShadow().blurRadius() == style.layerStyle.style().firstEnabledShadow().blurRadius()) && (referenceStyle.style().firstEnabledShadow().spread() == style.layerStyle.style().firstEnabledShadow().spread());
      }
      //console.log("---ShadowParams? "+sameShadowParams);

      var isSimilar = true;
      if (checkSameFillColor) isSimilar = isSimilar && sameFillColor;
      if (checkSameBorderColor) isSimilar = isSimilar && sameBorderColor;
      if (checkSameBorderThickness) isSimilar = isSimilar && sameBorderThickness;
      if (checkSameShadowColor) isSimilar = isSimilar && sameShadowColor;
      if (checkSameShadowParams) isSimilar = isSimilar && sameShadowParams;

      if (isSimilar) similarStyles.push(style);
    }

  });

  return similarStyles;
}

function FindAllSimilarLayerStyles(context, includeAllStylesFromExternalLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowParams) {
  var stylesWithSimilarStyles = [];
  var stylesAlreadyProcessed = [];

  var definedLayerStyles = getDefinedLayerStyles(context, includeAllStylesFromExternalLibraries, null);
  for (var i = 0; i < definedLayerStyles.length; i++) {
    if (definedLayerStyles[i].libraryName.localeCompare(sketchlocalfile) == 0) {
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
  }
  return stylesWithSimilarStyles;
}

function getDefinedTextStyles(context, includeAllStylesFromExternalLibraries, styleName) {
  var textStyles = [];
  var localTextStyles = context.document.documentData().layerTextStyles().objects();


  //console.log("Local text styles:"+context.document.documentData().layerTextStyles().objects().count());

  for (var i = 0; i < localTextStyles.count(); i++) {
    var style = localTextStyles.objectAtIndex(i);
    var attributes = style.style().textStyle().attributes();

    if (styleName != null) {
      if (styleName.localeCompare(style.name()) == 0) {
        textStyles.push({
          "attributes": attributes,
          "textStyle": style,
          "name": "" + style.name(),
          "libraryName": sketchlocalfile,
          "foreign": false,
          "isSelected": false,
          "isChosen": false,
          "description": getTextStyleDescription(attributes),
          "thumbnail": getTextThumbnail(style),
          "contrastMode": shouldEnableContrastMode(getTextStyleColor(style))
        });
      }
    }
    else {
      textStyles.push({
        "attributes": attributes,
        "textStyle": style,
        "name": "" + style.name(),
        "libraryName": sketchlocalfile,
        "foreign": false,
        "isSelected": false,
        "isChosen": false,
        "description": getTextStyleDescription(attributes),
        "thumbnail": getTextThumbnail(style),
        "contrastMode": shouldEnableContrastMode(getTextStyleColor(style))
      });
    }


    //console.log("--Local:"+localTextStyles.objectAtIndex(i).objectID());
  }

  //console.log("TS:"+textStyles.length);
  //console.log("Foreign text styles:"+context.document.documentData().foreignTextStyles().count());

  context.document.documentData().foreignTextStyles().forEach(style => {
    var attributes = style.localObject().style().textStyle().attributes();

    var indexOfForeign = indexOfForeignStyle(textStyles, style);
    var foreignLib = getLibraryByID(style.libraryID());

    if (indexOfForeign == -1) {
      if (styleName != null) {
        if (styleName.localeCompare(style.localObject().name()) == 0) {
          textStyles.push({
            "originalStyle": style,
            "attributes": attributes,
            "textStyle": style.localObject(),
            "name": "" + style.localObject().name(),
            "libraryName": libraryPrefix + ((foreignLib != null) ? foreignLib.name() : "This library is not available"),
            "foreign": true,
            "localShareID": style.localShareID(),
            "remoteShareID": style.remoteShareID(),
            "correlativeStyles": [],
            "isSelected": false,
            "isChosen": false,
            "description": getTextStyleDescription(attributes),
            "thumbnail": getTextThumbnail(style.localObject()),
            "contrastMode": shouldEnableContrastMode(getTextStyleColor(style.localObject()))
          });
        }
      }
      else {
        textStyles.push({
          "originalStyle": style,
          "attributes": attributes,
          "textStyle": style.localObject(),
          "name": "" + style.localObject().name(),
          "libraryName": libraryPrefix + ((foreignLib != null) ? foreignLib.name() : "This library is not available"),
          "foreign": true,
          "localShareID": style.localShareID(),
          "remoteShareID": style.remoteShareID(),
          "correlativeStyles": [],
          "isSelected": false,
          "isChosen": false,
          "description": getTextStyleDescription(attributes),
          "thumbnail": getTextThumbnail(style.localObject()),
          "contrastMode": shouldEnableContrastMode(getTextStyleColor(style.localObject()))
        });
      }
    }
    else {
      //console.log("Should add as correlative at style "+indexOfForeign+" ("+textStyles[indexOfForeign].name+")")
      textStyles[indexOfForeign].correlativeStyles.push(style);
    }

    //console.log("--Foreign:"+style.localObject().objectID()+"  -  "+style.localObject().name());
    //console.log("----localShareID:"+style.localShareID())
    //console.log("----remoteShareID:"+style.remoteShareID())
  });

  if (includeAllStylesFromExternalLibraries) {

    //console.log("Libraries--------");

    var libraries = NSApp.delegate().librariesController().availableLibraries();

    libraries.forEach(function (lib) {

      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {


        //console.log("--"+lib.name()+": "+lib.document().layerTextStyles().objects().count()+" styles");
        lib.document().layerTextStyles().objects().forEach(function (libraryStyle) {
          //console.log("----Library:"+libraryStyle.objectID());
          if (!alreadyInList(textStyles, libraryStyle)) {
            if (styleName != null) {
              if (styleName.localeCompare(libraryStyle.name()) == 0) {

                var attributes = libraryStyle.style().textStyle().attributes();

                textStyles.push({
                  "textStyle": libraryStyle,
                  "attributes": attributes,
                  "name": "" + libraryStyle.name(),
                  "libraryName": libraryPrefix + lib.name(),
                  "foreign": true,
                  "library": lib,
                  "isSelected": false,
                  "isChosen": false,
                  "description": getTextStyleDescription(attributes),
                  "thumbnail": getTextThumbnail(libraryStyle),
                  "contrastMode": shouldEnableContrastMode(getTextStyleColor(libraryStyle))
                });
              }
            }
            else {
              var attributes = libraryStyle.style().textStyle().attributes();

              textStyles.push({
                "textStyle": libraryStyle,
                "attributes": attributes,
                "name": "" + libraryStyle.name(),
                "libraryName": libraryPrefix + lib.name(),
                "foreign": true,
                "library": lib,
                "isSelected": false,
                "isChosen": false,
                "description": getTextStyleDescription(attributes),
                "thumbnail": getTextThumbnail(libraryStyle),
                "contrastMode": shouldEnableContrastMode(getTextStyleColor(libraryStyle))
              });
            }
          }
        });
      }
    });
  }

  textStyles = textStyles.sort(compareStyleArrays);

  return textStyles;
}


function GetRecomposedSymbolName(symbol) {
  var symbolName = symbol.name();
  var recomposedSymbolName = "";
  for (var j = 0; j < symbolName.length(); j++) {
    recomposedSymbolName += symbolName.charAt(j);
  }
  return recomposedSymbolName;
}


function getSymbolInstances(context, symbolMaster) {
  var symbolInstances = NSMutableArray.array();

  var pages = context.document.pages(), pageLoop = pages.objectEnumerator(), page;

  while (page = pageLoop.nextObject()) {
    var predicate = NSPredicate.predicateWithFormat("className == 'MSSymbolInstance' && symbolMaster == %@", symbolMaster),
      instances = page.children().filteredArrayUsingPredicate(predicate),
      instanceLoop = instances.objectEnumerator(),
      instance;

    while (instance = instanceLoop.nextObject()) {
      symbolInstances.addObject(instance);
    }
  }

  return symbolInstances;
}

function getSymbolOverrides(context, symbolMaster) {
  var symbolOverrides = NSMutableArray.array();

  var pages = context.document.pages(), pageLoop = pages.objectEnumerator(), page;

  while (page = pageLoop.nextObject()) {
    var predicate = NSPredicate.predicateWithFormat("className == %@ && overrides != nil", "MSSymbolInstance"),
      instances = page.children().filteredArrayUsingPredicate(predicate),
      instanceLoop = instances.objectEnumerator(),
      instance;

    while (instance = instanceLoop.nextObject()) {
      var overrides = instance.overrides();
      FindOverrideSymbolID(instance, overrides, symbolOverrides, symbolMaster, 0);
    }
  }
  return symbolOverrides;
}

function FindOverrideSymbolID(instance, overrides, symbolOverrides, symbolMaster, level) {
  for (var key in overrides) {
    var symbolID = overrides[key]["symbolID"];
    if (symbolID == null) {
      FindOverrideSymbolID(instance, overrides[key], symbolOverrides, symbolMaster, level + 1);
    }
    else {
      if (typeof symbolID === 'function') {
        symbolID = symbolID();
      }
      if (symbolID.localeCompare(symbolMaster.symbolID()) == 0) {
        symbolOverrides.addObject(instance);
      }
    }
  }

  return symbolID;
}

function IsForeign(context, refSymbol) {
  for (var i = 0; i < context.document.documentData().foreignSymbols().length; i++) {
    if (context.document.documentData().foreignSymbols()[i].symbolMaster() == refSymbol)
      return true;
  }
  return false;
}

function countAllSymbols(context, includeAllSymbolsFromExternalLibraries) {
  var counter = [0, 0];
  counter[0] = context.document.documentData().allSymbols().length;

  if (includeAllSymbolsFromExternalLibraries) {
    var libraries = NSApp.delegate().librariesController().libraries();
    libraries.forEach(function (lib) {
      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {
        counter[1] += lib.document().allSymbols().length;
      }
    });
  }
  return counter;
}

function getDuplicateSymbols(context, selection, includeAllSymbolsFromExternalLibraries, mergingSelected) {
  // console.time("getDuplicateSymbols");

  var allSymbols = [];
  var nameDictionary = {};
  var alreadyAddedIDs = [];
  selection.forEach(function (symbol) {

    var recomposedSymbolName = mergingSelected ? "mergingselected" : GetRecomposedSymbolName(symbol);
    var isForeign = IsForeign(context, symbol);
    // if (isForeign) console.log(symbol);
    var foreignLib = isForeign ? getLibraryByID(symbol.foreignObject().libraryID()) : null;
    var libraryName = sketchlocalfile;

    if (isForeign) {
      libraryName = libraryPrefix;
      libraryName += (foreignLib != null) ? foreignLib.name() : "This library is not available";
    }

    var symbolObject = {
      "name": "" + symbol.name(),
      "symbol": symbol,
      "isForeign": isForeign,
      "thumbnail": "",
      "symbolInstances": null,
      "numInstances": 0,
      "symbolOverrides": null,
      "numOverrides": 0,
      "libraryName": libraryName,
      "duplicates": [],
      "isSelected": false
    }
    symbolObject.duplicates.push({
      "name": "" + symbol.name(),
      "symbol": symbol,
      "isForeign": isForeign,
      "thumbnail": "",
      "symbolInstances": null,
      "numInstances": 0,
      "symbolOverrides": null,
      "numOverrides": 0,
      "libraryName": libraryName,
      "duplicates": null,
      "isSelected": false
    });

    if (recomposedSymbolName.localeCompare("Button/Secondary/_Regular/_Secondary") == 0) {
      //console.log("Local symbol '" + symbolObject.name + "'. Foreign:" + symbolObject.isForeign);
      //console.log(symbol);
    }

    if (isForeign)
      alreadyAddedIDs.push("" + symbol.foreignObject().remoteShareID());
    else {
      try {
        alreadyAddedIDs.push("" + symbol.symbolID());
      } catch{
        console.log("Trying to merge a component that is not a symbol.");
        console.log(symbol);
      }
    }

    if (nameDictionary[recomposedSymbolName] == null) {
      allSymbols.push(symbolObject);


      nameDictionary[recomposedSymbolName] = symbolObject;
    }
    else {
      nameDictionary[recomposedSymbolName].duplicates.push(symbolObject);
    }
  });

  // console.log(alreadyAddedIDs);
  // console.time("getDuplicateExternalSymbols");

  if (includeAllSymbolsFromExternalLibraries) {
    var libraries = NSApp.delegate().librariesController().libraries();

    var counterLibs = 0;
    var counterLibSymbols = 0;
    libraries.forEach(function (lib) {

      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {
        counterLibs += lib.document().allSymbols().length;
      }
    });

    libraries.forEach(function (lib) {

      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {
        lib.document().allSymbols().forEach(function (librarySymbol) {
          var recomposedSymbolName = GetRecomposedSymbolName(librarySymbol);
          //console.log("Library symbol ID: "+librarySymbol.symbolID())
          var existsAlready = (alreadyAddedIDs.indexOf("" + librarySymbol.symbolID()) >= 0);
          // if(existsAlready) console.log("exists already: " + existsAlready);

          if (!existsAlready && (nameDictionary[recomposedSymbolName] != null)) {
            counterLibSymbols++;
            nameDictionary[recomposedSymbolName].duplicates.push({
              "name": "" + librarySymbol.name(),
              "symbol": librarySymbol,
              "isForeign": true,
              "libraryName": libraryPrefix + lib.name(),
              "duplicates": [],
              "externalLibrary": lib,
              "isSelected": false
            });
          }
        });
      }
    });
  }
  // console.timeEnd("getDuplicateExternalSymbols");

  Object.keys(nameDictionary).forEach(function (key) {
    if (nameDictionary[key].duplicates.length <= 1) {
      var index = allSymbols.indexOf(nameDictionary[key]);
      if (index > -1) allSymbols.splice(index, 1);
      nameDictionary[key] = null;
    }
  });

  // console.log(allSymbols);
  // console.timeEnd("getDuplicateSymbols");

  return allSymbols;
}

function GetSpecificLayerStyleData(context, layerStyles, index) {

  // console.time("GetSpecificLayerStyleData");
  for (var i = 0; i < layerStyles[index].duplicates.length; i++) {
    layerStyles[index].duplicates[i].thumbnail = getOvalThumbnail(layerStyles[index].duplicates[i].layerStyle);
  }
  // console.timeEnd("GetSpecificLayerStyleData");
}

function GetSpecificTextStyleData(context, textStyles, index) {

  // console.time("GetSpecificLayerStyleData");
  for (var i = 0; i < textStyles[index].duplicates.length; i++) {
    textStyles[index].duplicates[i].thumbnail = getTextThumbnail(textStyles[index].duplicates[i].textStyle);
  }
  // console.timeEnd("GetSpecificLayerStyleData");
}

function GetSpecificSymbolData(context, symbols, index) {

  // console.time("GetSpecificSymbolData");
  for (var i = 0; i < symbols[index].duplicates.length; i++) {
    var instances = getSymbolInstances(context, symbols[index].duplicates[i].symbol);
    var overrides = getSymbolOverrides(context, symbols[index].duplicates[i].symbol);
    var width = (300 / symbols[index].duplicates[i].symbol.frame().height()) * symbols[index].duplicates[i].symbol.frame().width();
    //console.log("It was:"+symbols[index].duplicates[i].symbol.frame().width()+"x"+symbols[index].duplicates[i].symbol.frame().height()+", but generating thumbnail at "+width+"x300");
    symbols[index].duplicates[i].thumbnail = getBase64(symbols[index].duplicates[i].symbol, width, 300);
    symbols[index].duplicates[i].symbolInstances = instances;
    symbols[index].duplicates[i].numInstances = instances.length;
    symbols[index].duplicates[i].symbolOverrides = overrides;
    symbols[index].duplicates[i].numOverrides = overrides.length;
  }
  // console.timeEnd("GetSpecificSymbolData");
}

function getTextStyleDescription(attributes) {
  var textInfo = "";
  var fontString = String(attributes.NSFont);
  var font = fontString.substring(1, fontString.indexOf("pt."));
  var formatInfo = "" + font + "pt";
  var alignment = getAlignment(attributes.NSParagraphStyle.alignment());
  textInfo = formatInfo + " - " + alignment;
  return textInfo;
}

function getLayerStyleDescription(style) {
  var textInfo = "";
  if (style.style().firstEnabledFill() != null)
    textInfo += "Fill: #" + style.style().firstEnabledFill().color().immutableModelObject().hexValue().toString();

  if (style.style().firstEnabledFill() != null && style.style().firstEnabledBorder() != null)
    textInfo += " - ";

  if (style.style().firstEnabledBorder() != null)
    textInfo += "Border: #" + style.style().firstEnabledBorder().color().immutableModelObject().hexValue().toString();

  return textInfo;
}

function getLayerStyleColor(style) {
  if (style.style().firstEnabledFill() != null)
    return style.style().firstEnabledFill().color().immutableModelObject().hexValue().toString();
  else if (style.style().firstEnabledBorder() != null)
    return style.style().firstEnabledBorder().color().immutableModelObject().hexValue().toString();
}

function getTextStyleColor(style) {
  if (style.style().textStyle().attributes().MSAttributedStringColorAttribute) {
    return style.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue().toString();
  }
  else
    return "000000";
}

function getOvalThumbnail(style) {
  var layer = MSOvalShape.alloc().init();
  layer.frame = MSRect.rectWithRect(NSMakeRect(0, 0, 100, 100));
  layer.style = style.style();
  context.document.currentPage().addLayer(layer);
  var base64 = getBase64(layer, 300, 300);
  layer.removeFromParent();
  return base64;
}

function importForeignSymbol(symbol, library) {
  var objectReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(symbol, library);

  return AppController.sharedInstance().librariesController().importShareableObjectReference_intoDocument(objectReference, data);
}

function getTextThumbnail(style) {
  var layer = MSTextLayer.new();
  layer.stringValue = "The quick brown fox";
  layer.style = style.style();
  context.document.currentPage().addLayer(layer);
  var base64 = getBase64(layer, 600, 100);
  layer.removeFromParent();
  return base64;
}

function getDuplicateLayerStyles(context, includeAllStylesFromExternalLibraries) {

  var allStyles = [];
  var nameDictionary = {};


  context.document.documentData().layerStyles().objects().forEach(function (localLayerStyle) {

    var layerStyleObject = {
      "layerStyle": localLayerStyle,
      "name": "" + localLayerStyle.name(),
      "libraryName": sketchlocalfile,
      "foreign": false,
      "isSelected": false,
      "isChosen": false,
      "description": getLayerStyleDescription(localLayerStyle),
      "thumbnail": "",//getOvalThumbnail(localLayerStyle),
      "duplicates": [],
      "isSelected": false,
      "contrastMode": shouldEnableContrastMode(getLayerStyleColor(localLayerStyle))
    }
    layerStyleObject.duplicates.push({
      "layerStyle": localLayerStyle,
      "name": "" + localLayerStyle.name(),
      "libraryName": sketchlocalfile,
      "foreign": false,
      "isSelected": false,
      "isChosen": false,
      "description": getLayerStyleDescription(localLayerStyle),
      "thumbnail": "",//getOvalThumbnail(localLayerStyle),
      "duplicates": null,
      "isSelected": false,
      "contrastMode": shouldEnableContrastMode(getLayerStyleColor(localLayerStyle))
    });

    if (nameDictionary[localLayerStyle.name()] == null) {
      allStyles.push(layerStyleObject);
      nameDictionary[localLayerStyle.name()] = layerStyleObject;
    }
    else {
      nameDictionary[localLayerStyle.name()].duplicates.push(layerStyleObject);
    }
  });




  context.document.documentData().foreignLayerStyles().forEach(foreignStyle => {

    var indexOfForeign = indexOfForeignStyle(allStyles, foreignStyle);
    var foreignLib = getLibraryByID(foreignStyle.libraryID());
    if (indexOfForeign == -1) {
      var layerStyleObject = {
        "originalStyle": foreignStyle,
        "layerStyle": foreignStyle.localObject(),
        "name": "" + foreignStyle.localObject().name(),
        "libraryName": libraryPrefix + ((foreignLib != null) ? foreignLib.name() : "This library is not available"),
        "foreign": true,
        "localShareID": foreignStyle.localShareID(),
        "remoteShareID": foreignStyle.remoteShareID(),
        "correlativeStyles": [],
        "isSelected": false,
        "isChosen": false,
        "description": getLayerStyleDescription(foreignStyle.localObject()),
        "thumbnail": "",//getOvalThumbnail(foreignStyle.localObject()),
        "contrastMode": shouldEnableContrastMode(getLayerStyleColor(foreignStyle.localObject())),
        "duplicates": [],
        "isSelected": false
      }
      layerStyleObject.duplicates.push({
        "originalStyle": foreignStyle,
        "layerStyle": foreignStyle.localObject(),
        "name": "" + foreignStyle.localObject().name(),
        "libraryName": libraryPrefix + ((foreignLib != null) ? foreignLib.name() : "This library is not available"),
        "foreign": true,
        "localShareID": foreignStyle.localShareID(),
        "remoteShareID": foreignStyle.remoteShareID(),
        "correlativeStyles": [],
        "isTakenOver": false,
        "isSelected": false,
        "isChosen": false,
        "description": getLayerStyleDescription(foreignStyle.localObject()),
        "thumbnail": "",//getOvalThumbnail(foreignStyle.localObject()),,
        "contrastMode": shouldEnableContrastMode(getLayerStyleColor(foreignStyle.localObject())),
        "duplicates": null,
        "isSelected": false
      });

      if (nameDictionary[foreignStyle.localObject().name()] == null) {
        allStyles.push(layerStyleObject);
        nameDictionary[foreignStyle.localObject().name()] = layerStyleObject;
      }
      else {
        nameDictionary[foreignStyle.localObject().name()].duplicates.push(layerStyleObject);
      }
    }
    else {
      if (typeof (indexOfForeign) === 'number')
        allStyles[indexOfForeign].correlativeStyles.push(foreignStyle);
      else
        allStyles[indexOfForeign[0]].duplicates[indexOfForeign[1]].correlativeStyles.push(foreignStyle);

      // console.log("indexOfForeign: "+indexOfForeign +" , while allStyles.length is: "+allStyles.length);
      // console.log(allStyles[indexOfForeign]);
      // console.log(indexOfForeign);
      //allStyles[indexOfForeign[0]].duplicates[indexOfForeign[1]].correlativeStyles.push(style);
    }

  });





  // console.time("getDuplicateExternalSymbols");

  if (includeAllStylesFromExternalLibraries) {
    var libraries = NSApp.delegate().librariesController().libraries();
    libraries.forEach(function (lib) {
      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {

        lib.document().layerStyles().objects().forEach(function (libraryStyle) {

          var indexOfForeign = indexOfForeignStyle2(allStyles, libraryStyle);
          if ((indexOfForeign != null) && (indexOfForeign != -1)) {
            if (indexOfForeign[1] == 0)
              allStyles.splice([indexOfForeign[0]], 1);
            else
              allStyles[indexOfForeign[0]].duplicates.splice(indexOfForeign[1], 1);
          }

          if (nameDictionary[libraryStyle.name()] != null) {
            nameDictionary[libraryStyle.name()].duplicates.push({
              "layerStyle": libraryStyle,
              "name": "" + libraryStyle.name(),
              "libraryName": libraryPrefix + lib.name(),
              "foreign": true,
              "library": lib,
              "isSelected": false,
              "isChosen": false,
              "description": getLayerStyleDescription(libraryStyle),
              "thumbnail": "",//getOvalThumbnail(libraryStyle),
              "contrastMode": shouldEnableContrastMode(getLayerStyleColor(libraryStyle)),
              "duplicates": [],
              "isSelected": false
            });
          }
        });
      }
    });
  }

  // console.timeEnd("getDuplicateExternalSymbols");

  Object.keys(nameDictionary).forEach(function (key) {
    if (nameDictionary[key].duplicates.length <= 1) {
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


  context.document.documentData().layerTextStyles().objects().forEach(function (localTextStyle) {

    var attributes = localTextStyle.style().textStyle().attributes();

    var textStyleObject = {
      "attributes": attributes,
      "textStyle": localTextStyle,
      "name": "" + localTextStyle.name(),
      "libraryName": sketchlocalfile,
      "foreign": false,
      "isSelected": false,
      "isChosen": false,
      "description": getTextStyleDescription(attributes),
      "thumbnail": "",//getTextThumbnail(localTextStyle),,
      "contrastMode": shouldEnableContrastMode(getTextStyleColor(localTextStyle)),
      "duplicates": [],
      "isSelected": false
    }
    textStyleObject.duplicates.push({
      "attributes": attributes,
      "textStyle": localTextStyle,
      "name": "" + localTextStyle.name(),
      "libraryName": sketchlocalfile,
      "foreign": false,
      "isSelected": false,
      "isChosen": false,
      "description": getTextStyleDescription(attributes),
      "thumbnail": "",//getTextThumbnail(localTextStyle),,
      "contrastMode": shouldEnableContrastMode(getTextStyleColor(localTextStyle)),
      "duplicates": null,
      "isSelected": false
    });

    if (nameDictionary[localTextStyle.name()] == null) {
      allStyles.push(textStyleObject);
      nameDictionary[localTextStyle.name()] = textStyleObject;
    }
    else {
      nameDictionary[localTextStyle.name()].duplicates.push(textStyleObject);
    }
  });




  context.document.documentData().foreignTextStyles().forEach(foreignStyle => {

    var indexOfForeign = indexOfForeignStyle(allStyles, foreignStyle);
    var foreignLib = getLibraryByID(foreignStyle.libraryID());

    var attributes = foreignStyle.localObject().style().textStyle().attributes();

    if (indexOfForeign == -1) {
      var textStyleObject = {
        "originalStyle": foreignStyle,
        "attributes": attributes,
        "textStyle": foreignStyle.localObject(),
        "name": "" + foreignStyle.localObject().name(),
        "libraryName": libraryPrefix + ((foreignLib != null) ? foreignLib.name() : "This library is not available"),
        "foreign": true,
        "localShareID": foreignStyle.localShareID(),
        "remoteShareID": foreignStyle.remoteShareID(),
        "correlativeStyles": [],
        "isSelected": false,
        "isChosen": false,
        "description": getTextStyleDescription(attributes),
        "thumbnail": "",//getTextThumbnail(foreignStyle.localObject()),
        "contrastMode": shouldEnableContrastMode(getTextStyleColor(foreignStyle.localObject())),
        "duplicates": [],
        "isSelected": false
      }
      textStyleObject.duplicates.push({
        "originalStyle": foreignStyle,
        "attributes": attributes,
        "textStyle": foreignStyle.localObject(),
        "name": "" + foreignStyle.localObject().name(),
        "libraryName": libraryPrefix + ((foreignLib != null) ? foreignLib.name() : "This library is not available"),
        "foreign": true,
        "localShareID": foreignStyle.localShareID(),
        "remoteShareID": foreignStyle.remoteShareID(),
        "correlativeStyles": [],
        "isSelected": false,
        "isChosen": false,
        "description": getTextStyleDescription(attributes),
        "thumbnail": "",//getTextThumbnail(foreignStyle.localObject()),
        "contrastMode": shouldEnableContrastMode(getTextStyleColor(foreignStyle.localObject())),
        "duplicates": null,
        "isSelected": false
      });

      if (nameDictionary[foreignStyle.localObject().name()] == null) {
        allStyles.push(textStyleObject);
        nameDictionary[foreignStyle.localObject().name()] = textStyleObject;
      }
      else {
        nameDictionary[foreignStyle.localObject().name()].duplicates.push(textStyleObject);
      }
    }
    else {
      if (typeof (indexOfForeign) === 'number')
        allStyles[indexOfForeign].correlativeStyles.push(foreignStyle);
      else
        allStyles[indexOfForeign[0]].duplicates[indexOfForeign[1]].correlativeStyles.push(foreignStyle);

      // console.log("indexOfForeign: "+indexOfForeign +" , while allStyles.length is: "+allStyles.length);
      // console.log(allStyles[indexOfForeign]);
      // console.log(indexOfForeign);
      //allStyles[indexOfForeign[0]].duplicates[indexOfForeign[1]].correlativeStyles.push(style);
    }

  });





  // console.time("getDuplicateExternalSymbols");

  if (includeAllStylesFromExternalLibraries) {
    var libraries = NSApp.delegate().librariesController().libraries();
    libraries.forEach(function (lib) {
      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {
        lib.document().layerTextStyles().objects().forEach(function (libraryStyle) {

          var indexOfForeign = indexOfForeignStyle2(allStyles, libraryStyle);

          var attributes = libraryStyle.style().textStyle().attributes();

          if ((indexOfForeign != null) && (indexOfForeign != -1)) {
            if (indexOfForeign[1] == 0)
              allStyles.splice([indexOfForeign[0]], 1);
            else
              allStyles[indexOfForeign[0]].duplicates.splice(indexOfForeign[1], 1);
          }

          if (nameDictionary[libraryStyle.name()] != null) {
            nameDictionary[libraryStyle.name()].duplicates.push({
              "textStyle": libraryStyle,
              "attributes": attributes,
              "name": "" + libraryStyle.name(),
              "libraryName": libraryPrefix + lib.name(),
              "foreign": true,
              "library": lib,
              "isSelected": false,
              "isChosen": false,
              "description": getTextStyleDescription(attributes),
              "thumbnail": "",//getTextThumbnail(libraryStyle),
              "contrastMode": shouldEnableContrastMode(getTextStyleColor(libraryStyle)),
              "duplicates": [],
              "isSelected": false
            });
          }
        });
      }
    });
  }

  // console.timeEnd("getDuplicateExternalSymbols");

  Object.keys(nameDictionary).forEach(function (key) {
    if (nameDictionary[key].duplicates.length <= 1) {
      var index = allStyles.indexOf(nameDictionary[key]);
      if (index > -1) allStyles.splice(index, 1);
      nameDictionary[key] = null;
    }
  });

  return allStyles;

}



function getLibraryByID(libID) {
  var libraries = NSApp.delegate().librariesController().libraries();
  for (var i = 0; i < libraries.length; i++) {
    var lib = libraries[i];
    if (lib && lib.libraryID() && lib.libraryID().toString().localeCompare(libID) == 0) {
      return lib;
    }
  }

  return null;
}


function getDefinedLayerStyles(context, includeAllStylesFromExternalLibraries, styleName) {
  var layerStyles = [];
  var localLayerStyles = context.document.documentData().layerStyles().objects();

  for (var i = 0; i < localLayerStyles.count(); i++) {
    var style = localLayerStyles.objectAtIndex(i);

    if (styleName != null) {
      if (styleName.localeCompare(style.name()) == 0) {
        layerStyles.push({
          "layerStyle": style,
          "name": "" + style.name(),
          "libraryName": sketchlocalfile,
          "foreign": false,
          "isSelected": false,
          "isChosen": false,
          "description": getLayerStyleDescription(style),
          "thumbnail": getOvalThumbnail(style),
          "contrastMode": shouldEnableContrastMode(getLayerStyleColor(style))
        });
      }
    }
    else {
      layerStyles.push({
        "layerStyle": style,
        "name": "" + style.name(),
        "libraryName": sketchlocalfile,
        "foreign": false,
        "isSelected": false,
        "isChosen": false,
        "description": getLayerStyleDescription(style),
        "thumbnail": getOvalThumbnail(style),
        "contrastMode": shouldEnableContrastMode(getLayerStyleColor(style))
      });
    }

  }

  context.document.documentData().foreignLayerStyles().forEach(style => {

    var indexOfForeign = indexOfForeignStyle(layerStyles, style);
    var foreignLib = getLibraryByID(style.libraryID());

    if (indexOfForeign == -1) {
      if (styleName != null) {
        if (styleName.localeCompare(style.localObject().name()) == 0) {
          layerStyles.push({
            "originalStyle": style,
            "layerStyle": style.localObject(),
            "name": "" + style.localObject().name(),
            "libraryName": libraryPrefix + ((foreignLib != null) ? foreignLib.name() : "This library is not available"),
            "foreign": true,
            "localShareID": style.localShareID(),
            "remoteShareID": style.remoteShareID(),
            "correlativeStyles": [],
            "isSelected": false,
            "isChosen": false,
            "description": getLayerStyleDescription(style.localObject()),
            "thumbnail": getOvalThumbnail(style.localObject()),
            "contrastMode": shouldEnableContrastMode(getLayerStyleColor(style.localObject()))
          });
        }
      }
      else {
        layerStyles.push({
          "originalStyle": style,
          "layerStyle": style.localObject(),
          "name": "" + style.localObject().name(),
          "libraryName": libraryPrefix + ((foreignLib != null) ? foreignLib.name() : "This library is not available"),
          "foreign": true,
          "localShareID": style.localShareID(),
          "remoteShareID": style.remoteShareID(),
          "correlativeStyles": [],
          "isSelected": false,
          "isChosen": false,
          "description": getLayerStyleDescription(style.localObject()),
          "thumbnail": getOvalThumbnail(style.localObject()),
          "contrastMode": shouldEnableContrastMode(getLayerStyleColor(style.localObject()))
        });
      }
    }
    else {
      layerStyles[indexOfForeign].correlativeStyles.push(style);
    }

  });

  if (includeAllStylesFromExternalLibraries) {

    //console.log("Libraries--------");

    var libraries = NSApp.delegate().librariesController().libraries();

    libraries.forEach(function (lib) {

      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {

        lib.document().layerStyles().objects().forEach(function (libraryStyle) {
          //console.log("----Library:"+libraryStyle.objectID());
          if (!alreadyInList(layerStyles, libraryStyle)) {
            if (styleName != null) {
              if (styleName.localeCompare(libraryStyle.name()) == 0) {
                layerStyles.push({
                  "layerStyle": libraryStyle,
                  "name": "" + libraryStyle.name(),
                  "libraryName": libraryPrefix + lib.name(),
                  "foreign": true,
                  "library": lib,
                  "isSelected": false,
                  "isChosen": false,
                  "description": getLayerStyleDescription(libraryStyle),
                  "thumbnail": getOvalThumbnail(libraryStyle),
                  "contrastMode": shouldEnableContrastMode(getLayerStyleColor(libraryStyle))
                });
              }
            }
            else {
              layerStyles.push({
                "layerStyle": libraryStyle,
                "name": "" + libraryStyle.name(),
                "libraryName": libraryPrefix + lib.name(),
                "foreign": true,
                "library": lib,
                "isSelected": false,
                "isChosen": false,
                "description": getLayerStyleDescription(libraryStyle),
                "thumbnail": getOvalThumbnail(libraryStyle),
                "contrastMode": shouldEnableContrastMode(getLayerStyleColor(libraryStyle))
              });
            }
          }
        });
      }
    });
  }

  layerStyles = layerStyles.sort(compareStyleArrays);
  return layerStyles = layerStyles.sort(compareStyleArrays);
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

function getThumbnail(element, width, height) {
  var exportRequest = MSExportRequest.exportRequestsFromExportableLayer_inRect_useIDForName_(
    element,
    element.absoluteInfluenceRect(),
    false
  ).firstObject();

  exportRequest.format = "png"


  var scaleX = width / exportRequest.rect().size.width;
  var scaleY = height / exportRequest.rect().size.height;

  if (scaleX < scaleY)
    exportRequest.scale = scaleX;
  else
    exportRequest.scale = scaleY;

  var colorSpace = NSColorSpace.sRGBColorSpace()
  var exporter = MSExporter.exporterForRequest_colorSpace_(exportRequest, colorSpace)
  var imageRep = exporter.bitmapImageRep()

  var image = NSImage.alloc().init().autorelease();
  image.addRepresentation(imageRep);

  return image;
}

function getBase64(element, width, height) {
  var image = getThumbnail(element, width, height);
  return "" + getNSImageData(image);
}

module.exports = { GetTextBasedOnCount, getBase64, brightnessByColor, getColorDependingOnBrightness, isString, getAlignment, getSymbolInstances, containsTextStyle, containsLayerStyle, createView, getAllTextLayers, getAllLayers, createSeparator, getColorDependingOnTheme, compareStyleArrays, alreadyInList, getIndexOf, FindAllSimilarTextStyles, FindSimilarTextStyles, FindAllSimilarLayerStyles, FindSimilarLayerStyles, getDefinedLayerStyles, getDefinedTextStyles, indexOfForeignStyle, IsInTrial, ExiGuthrie, Guthrie, valStatus, writeTextToFile, commands, getDuplicateSymbols, importForeignSymbol, GetSpecificSymbolData, getDuplicateLayerStyles, GetSpecificLayerStyleData, getDuplicateTextStyles, GetSpecificTextStyleData, shouldEnableContrastMode, countAllSymbols };