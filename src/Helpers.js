const sketch = require('sketch');
const dom = require('sketch/dom');
var ShapePath = require('sketch/dom').ShapePath;
var Text = require('sketch/dom').Text;
var DeltaE = require('delta-e');
var D3 = require('d3-color');
var fs = require('@skpm/fs');

export var document = sketch.getSelectedDocument();
var symbols;
var libraries = dom.getLibraries();

var settingsFile;
var logsEnabled = false, timingEnabled = false;
var librariesEnabledByDefault = true;
var acquiredLicense = "Single";

export const valStatus = {
  app: 'app',
  no: 'no',
  over: 'over',
  noCon: 'nocon',
  tOut: 'tOut'
}

export const commands = {
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

function _0x5dcb(_0xc74784,_0x2d93e8){var _0x2b08b9=_0x2b08();return _0x5dcb=function(_0x5dcb8b,_0x2ed1ce){_0x5dcb8b=_0x5dcb8b-0x1a3;var _0x1653b3=_0x2b08b9[_0x5dcb8b];return _0x1653b3;},_0x5dcb(_0xc74784,_0x2d93e8);}function _0x2b08(){var _0x145166=['Team\x20license','initWithData_encoding','Double','pipe','Merge\x20Duplicates\x20-\x20Registering\x20license:\x20Team\x20license','success','indexOf','Could\x20not\x20authenticate.\x20Error\x20code:','10015978UEXffj','alloc','---','setStandardOutput','305pjYaBL','Single','setStandardError','setLaunchPath','9738432ahQQxx','195308dxPBgw','uses','8tjmxvY',')\x20exceeded\x20license\x20(','app','2347390DAwYlq','1698210vvzTyz','purchase','readDataToEndOfFile','setArguments','over','Team','variants','Merge\x20Duplicates\x20-\x20Registering\x20license:\x20','7574728ryxVZD','tOut','log','116502vuPaVb','/usr/bin/curl'];_0x2b08=function(){return _0x145166;};return _0x2b08();}(function(_0x52847e,_0x47ad0d){var _0x409500=_0x5dcb,_0x54a9cc=_0x52847e();while(!![]){try{var _0x27564f=-parseInt(_0x409500(0x1a9))/0x1+parseInt(_0x409500(0x1ae))/0x2+parseInt(_0x409500(0x1af))/0x3+-parseInt(_0x409500(0x1b7))/0x4+-parseInt(_0x409500(0x1a4))/0x5*(parseInt(_0x409500(0x1ba))/0x6)+-parseInt(_0x409500(0x1c4))/0x7*(-parseInt(_0x409500(0x1ab))/0x8)+parseInt(_0x409500(0x1a8))/0x9;if(_0x27564f===_0x47ad0d)break;else _0x54a9cc['push'](_0x54a9cc['shift']());}catch(_0x36ae94){_0x54a9cc['push'](_0x54a9cc['shift']());}}}(_0x2b08,0xef128));export function curl_async(_0x24e86a,_0x438ab4){var _0x33a52f=_0x5dcb,_0x3aec88=NSTask[_0x33a52f(0x1c5)]()['init']();_0x3aec88[_0x33a52f(0x1a7)](_0x33a52f(0x1bb)),_0x3aec88[_0x33a52f(0x1b2)](_0x24e86a);var _0xd0ddf0=NSPipe[_0x33a52f(0x1bf)](),_0xe990b4=NSPipe['pipe']();_0x3aec88[_0x33a52f(0x1a3)](_0xd0ddf0),_0x3aec88[_0x33a52f(0x1a6)](_0xe990b4),_0x3aec88['launch'](),_0x3aec88['waitUntilExit']();var _0x390176=_0x3aec88['terminationStatus']();if(_0x390176==0x0){var _0x4a7b6b=_0xd0ddf0['fileHandleForReading']()[_0x33a52f(0x1b1)](),_0x509eee=NSString[_0x33a52f(0x1c5)]()[_0x33a52f(0x1bd)](_0x4a7b6b,NSUTF8StringEncoding),_0x52bff0=tryParseJSON(_0x509eee);if(_0x52bff0[_0x33a52f(0x1c1)]){if(!_0x438ab4){if(_0x52bff0[_0x33a52f(0x1b0)]!=null){if(_0x52bff0[_0x33a52f(0x1b0)][_0x33a52f(0x1b5)]['indexOf'](_0x33a52f(0x1b4))>0x0)acquiredLicense=_0x33a52f(0x1bc);else{if(_0x52bff0[_0x33a52f(0x1b0)][_0x33a52f(0x1b5)]['indexOf']('2')>0x0)acquiredLicense=_0x33a52f(0x1be);else acquiredLicense=_0x33a52f(0x1a5);}}return valStatus[_0x33a52f(0x1ad)];}else{if(_0x52bff0[_0x33a52f(0x1b0)]!=null){if(_0x52bff0[_0x33a52f(0x1b0)][_0x33a52f(0x1b5)][_0x33a52f(0x1c2)]('Team')>0x0)return clog(_0x33a52f(0x1c0)),valStatus['app'];else{var _0x213c2b=0x1;return acquiredLicense=_0x33a52f(0x1a5),_0x52bff0['purchase'][_0x33a52f(0x1b5)]['indexOf']('2')>0x0&&(_0x213c2b=0x2,acquiredLicense=_0x33a52f(0x1be)),_0x52bff0['uses']>_0x213c2b?(clog('Merge\x20Duplicates\x20-\x20Registering\x20license:\x20'+acquiredLicense+'\x20-\x20Seats\x20('+_0x52bff0[_0x33a52f(0x1aa)]+_0x33a52f(0x1ac)+_0x213c2b+').'),valStatus[_0x33a52f(0x1b3)]):(clog(_0x33a52f(0x1b6)+acquiredLicense),valStatus[_0x33a52f(0x1ad)]);}}else return valStatus[_0x33a52f(0x1ad)];}}else return valStatus['no'];}else return _0x390176==0x1c?(console[_0x33a52f(0x1b9)]('Connection\x20timed\x20out.\x20Error\x20code:'+_0x390176),acquiredLicense=_0x33a52f(0x1c6),valStatus[_0x33a52f(0x1b8)]):(console[_0x33a52f(0x1b9)](_0x33a52f(0x1c3)+_0x390176),valStatus['noCon']);}

//d9-03


//d9-04
(function(_0x5101f7,_0x1c091a){var _0x2f6848=_0x5444,_0x39ca90=_0x5101f7();while(!![]){try{var _0xde8778=-parseInt(_0x2f6848(0x13a))/0x1*(parseInt(_0x2f6848(0x130))/0x2)+-parseInt(_0x2f6848(0x135))/0x3+-parseInt(_0x2f6848(0x133))/0x4+-parseInt(_0x2f6848(0x12c))/0x5+-parseInt(_0x2f6848(0x139))/0x6*(parseInt(_0x2f6848(0x12a))/0x7)+parseInt(_0x2f6848(0x12d))/0x8*(parseInt(_0x2f6848(0x137))/0x9)+parseInt(_0x2f6848(0x134))/0xa;if(_0xde8778===_0x1c091a)break;else _0x39ca90['push'](_0x39ca90['shift']());}catch(_0x26d8f6){_0x39ca90['push'](_0x39ca90['shift']());}}}(_0x5e82,0x64843));export function IsInTrial(){var _0x445b8a=_0x5444;try{var _0x1fe0e1=jsonFromFile(MSPluginManager['mainPluginsFolderURL']()[_0x445b8a(0x12e)]()+_0x445b8a(0x138));if(_0x1fe0e1!=null&&_0x1fe0e1[_0x445b8a(0x13b)]!=null)return _0x1fe0e1[_0x445b8a(0x13b)];else return null;}catch(_0x4ac1c6){return null;}}export function ExiGuthrie(){var _0x6c70a1=_0x5444;try{var _0x582986=jsonFromFile(MSPluginManager[_0x6c70a1(0x136)]()[_0x6c70a1(0x12e)]()+'/merge.json');if(_0x582986!=null&&_0x582986[_0x6c70a1(0x12f)]!=null)return Guthrie(_0x582986[_0x6c70a1(0x12f)],![]);else return![];}catch(_0x5d3366){return![];}}export function Guthrie(_0x14ca37,_0x5c33c9){var _0x30c544=_0x5444,_0x3fc276=['-d','product_permalink=mergeduplicatesymbols','-d',_0x30c544(0x12b)+_0x14ca37+'','-d',_0x30c544(0x131)+_0x5c33c9[_0x30c544(0x13c)]()+'','-m','5',_0x30c544(0x132)];return curl_async(_0x3fc276,_0x5c33c9);}function _0x5444(_0x8bc37a,_0x334ebb){var _0x5e8212=_0x5e82();return _0x5444=function(_0x544499,_0x5c1352){_0x544499=_0x544499-0x12a;var _0x409873=_0x5e8212[_0x544499];return _0x409873;},_0x5444(_0x8bc37a,_0x334ebb);}function _0x5e82(){var _0x4262b8=['20198280rOChxC','1395204vmraMV','mainPluginsFolderURL','368955frUgQO','/merge.json','18xCmVUE','1MXVfwa','startTime','toString','289639jZwSks','license_key=','569310EeNsNN','24VzZjjD','path','licenseKey','1308806jbuvnX','increment_uses_count=','https://api.gumroad.com/v2/licenses/verify','1494536cxlsmF'];_0x5e82=function(){return _0x4262b8;};return _0x5e82();}
//d9-04

export function tryParseJSON(jsonString) {
  try {
    var o = JSON.parse(jsonString);
    if (o && typeof o === "object" && o !== null) {
      return o;
    }
  }
  catch (e) { }

  return false;
}


export function writeTextToFile(text, filePath) {
  var t = NSString.stringWithFormat("%@", text),
    f = NSString.stringWithFormat("%@", filePath);
  fs.writeFileSync(f, JSON.stringify(text), { encoding: 'utf8' });
}

export function readFromFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
}

var jsonFromFile = function (filePath, mutable) {
  var read = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  return read;
}



export function shouldEnableContrastMode(color) {
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

export function getAcquiredLicense() {
  return acquiredLicense;
}

export function compareStyleArrays(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export function compareColorVariableArrays(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}





export function compareByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

export function FindSimilarTextStyles(referenceStyle, styles, context, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {

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

export function FindAllSimilarTextStyles(context, includeAllStylesFromExternalLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {

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

export function FindSimilarLayerStyles(referenceStyle, styles, context, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowParams) {

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


export function FindAllSimilarLayerStyles(context, includeAllStylesFromExternalLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowParams) {
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

export function areColorsSimilar(color1, color2, tolerance) {

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

export function FindSimilarColorVariables(colorVariableRef, colorVariables, tolerance) {
  var similarColorVariables = [];

  colorVariables.forEach(function (colorVariable) {
    if (colorVariableRef != colorVariable.colorVariable) {
      if (areColorsSimilar("#" + colorVariableRef.color.substring(1, 7), "#" + colorVariable.colorVariable.color.substring(1, 7), tolerance))
        similarColorVariables.push(colorVariable);
    }
  });
  return similarColorVariables;
}

export function FindAllSimilarColorVariables(context, includeExternalLibraries, tolerance) {
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

export function GetRecomposedSymbolName(symbolName) {
  var recomposedSymbolName = "";
  for (var j = 0; j < symbolName.length; j++) {
    recomposedSymbolName += symbolName.charAt(j);
  }
  return recomposedSymbolName;
}


export function getSymbolInstances(symbolMaster) {
  var symbolInstances = symbolMaster.getAllInstances();
  return symbolInstances;
}

export function getSymbolOverrides(symbolMaster, idsMap) {
  var symbolOverrides = [];
  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(instance => hasSymbolOverrides(instance, idsMap));

  reducedInstances.forEach(function (instance) {

    var instanceOverrides = instance.overrides.filter(ov => ov.property == "symbolID" && !ov.isDefault && ov.value == symbolMaster.symbolId);
    instanceOverrides.forEach(override => {
      symbolOverrides.push({
        "instance": instance,
        "override": override
      });
    });
  });

  return symbolOverrides;
}

export function getLayerStyleInstances(layerStyle) {
  var layerStyleInstances = layerStyle.getAllInstancesLayers();
  return layerStyleInstances;
}

export function getLayerStyleOverrides(layerStyle, idsMap) {
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

export function getTextStyleInstances(textStyle) {
  var textStyleInstances = textStyle.getAllInstancesLayers();
  return textStyleInstances;
}

export function getTextStyleOverrides(textStyle, idsMap) {
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

export function countAllSymbols(context, includeAllSymbolsFromExternalLibraries) {
  if (!symbols) symbols = document.getSymbols();
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


export function getAllDuplicateSymbolsByName(context, includeAllSymbolsFromExternalLibraries) {
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

export function getSymbolsMap(context, symbols) {
  var symbolMap = new Map();
  var idsMap = new Map();
  if (!symbols) symbols = document.getSymbols();
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
    var instanceOverrides = instance.overrides.filter(ov => ov.property == "symbolID" && !ov.isDefault && idsMap.has(ov.value));
    instanceOverrides.forEach(override => {
      symbolMap.get(idsMap.get(override.value)).instancesWithOverrides.push(instance);
    });
  });

  return symbolMap;
}

export function getLayerStylesMap(context, layerStyles) {

  var layerStylesMap = new Map();
  var idsMap = new Map();
  layerStyles.forEach(function (layerStyle) {
    dlog(layerStyle.name + " has " + layerStyle.duplicates.length + " duplicates")
    layerStyle.duplicates.forEach(function (duplicatedStyle) {
      var redId1 = duplicatedStyle.layerStyle.style.id;
      var redId2 = (duplicatedStyle.layerStyle.id.indexOf("[") >= 0) ? duplicatedStyle.layerStyle.id.substring(duplicatedStyle.layerStyle.id.indexOf("[") + 1, duplicatedStyle.layerStyle.id.length - 1) : null;
      dlog("-- Scanning style " + duplicatedStyle.name + ". redId1: " + redId1 + ". redId2: " + redId2);
      idsMap.set(duplicatedStyle.layerStyle.id, duplicatedStyle.layerStyle);
      idsMap.set(redId1, duplicatedStyle.layerStyle);
      if (redId2 != null) idsMap.set(redId2, duplicatedStyle.layerStyle);
      dlog("-- Saved idsMap")
      dlog(idsMap)
      layerStylesMap.set(duplicatedStyle.layerStyle, {
        "directInstances": duplicatedStyle.layerStyle.getAllInstancesLayers(),
        "instancesWithOverrides": []
      });

      dlog("-- Set layerStylesMap")
      dlog(layerStylesMap.get(duplicatedStyle.layerStyle))
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

export function getTextStylesMap(context, textStyles) {

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



export function updateAllDuplicatesWithMap(allDuplicates, symbolsMap) {
  allDuplicates.forEach(duplicate => {
    duplicate.duplicates.forEach(symbol => {
      symbol.symbolInstances = symbolsMap.get(duplicate).directInstances;
    });
  });
}

export function hasSymbolOverrides(instance, idsMap) {
  try {
    if ((instance.sketchObject.overrides() != null) && (instance.sketchObject.overrides().count() > 0)) {
      return FindNestedSymbolOverride(instance.sketchObject.overrides(), idsMap, instance);
    }

    return false;
  } catch (e) {
    clog("-- Controlled exception : " + e);
    clog("---- Start processing " + instance.name + " via API");
    var hasOverride = false;
    instance.overrides.forEach(override => {
      if ((override.property == "symbolID") && !override.isDefault && idsMap.has(override.value)) {
        hasOverride = true;
      }
    });
    clog(hasOverride ? "---- Does have overrides. Added to map response." : "---- Does not have overrides");
    return hasOverride;
  }
}


export function FindNestedSymbolOverride(overrides, idsMap, instance) {

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

export function hasSharedStyleOverrides(instance, idsMap) {
  try {
    if (instance.sketchObject.overrides() != null && instance.sketchObject.overrides().count() > 0) {
      return FindNestedSharedStyleOverride(instance.sketchObject.overrides(), idsMap, instance);
    }
  } catch (e) {
    clog("Couldn't access overrides information for an instance '" + instance.name + "'.");
  }

  return false;
}

export function FindNestedSharedStyleOverride(overrides, idsMap, instance, level) {
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
          clog("Error while processing overrides (1).");
          clog(idsMap);
          clog(overrides[key]);
          clog(e);
        }
      }
    }
    else {
      try {
        if (FindNestedSharedStyleOverride(overrides[key], idsMap, instance, level + 1)) return true;
      } catch (e) {
        clog("Error while processing overrides (2).");
        clog(idsMap);
        clog(overrides[key]);
        clog(e);
      }
    }
  }
  return false;
}

export function importSymbolFromLibrary(element) {
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

export function importLayerStyleFromLibrary(layerStyle) {
  try {
    dlog("-- Importing " + layerStyle.name + " from library " + layerStyle.libraryName + " with ID:" + layerStyle.layerStyle.id);
    var styleReferences = layerStyle.library.getImportableLayerStyleReferencesForDocument(document);
    dlog("styleReferences");
    dlog(styleReferences);
    var refToImport = styleReferences.filter(function (ref) {
      return ref.id == layerStyle.layerStyle.id;
    });

    dlog("refToImport");
    dlog(refToImport);
    dlog(refToImport[0]);

    var style = refToImport[0].import();
    dlog("-- We've imported:" + style.name + " from library " + style.getLibrary().name);

    return style;
  } catch (e) {
    clog("-- ERROR: Couldn't import " + layerStyle.name + " from library" + layerStyle.libraryName + " with ID:" + layerStyle.layerStyle.id);
    return null;
  }
}

export function importTextStyleFromLibrary(textStyle) {

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

export function importColorVariableFromLibrary(colorVariable) {

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

export function getReducedDuplicateData(symbol) {
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

export function getReducedLayerStyleData(layerStyle) {
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

export function getReducedTextStyleData(textStyle) {
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

export function getSelectedSymbolsSession(selection) {

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


export function getReducedSymbolsSession(session) {

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

export function getDuplicateColorVariables(context, includeLibraries) {

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

export function GetSpecificLayerStyleData(layerStyle, layerStylesMap) {
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

export function GetSpecificTextStyleData(textStyle, textStylesMap) {
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

export function GetSpecificSymbolData(symbol, symbolsMap) {
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

export function getTextStyleDescription(sharedTextStyle) {
  return sharedTextStyle.style.fontFamily + " " + sharedTextStyle.style.fontSize + "pt" + " - " + sharedTextStyle.style.alignment;
}

export function getLayerStyleDescription(sharedStyle) {
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

export function getTextStyleColor(style) {
  if (style.style().textStyle().attributes().MSAttributedStringColorAttribute) {
    return style.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue().toString();
  }
  else
    return "000000";
}

export function getOvalThumbnail(sharedStyle) {
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



export function getTextThumbnail(sharedStyle) {
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

export function getColorVariableThumbnail(colorVariable) {
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

export function getAllLayerStyles(includeAllStylesFromExternalLibraries) {
  var allStyles = [];
  const idsMap = new Map();

  if (includeAllStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().sharedLayerStyles.forEach(function (sharedLayerStyle) {
          if (sharedLayerStyle.getLibrary() == null) {
            var id1 = sharedLayerStyle.id;
            var id2 = (sharedLayerStyle.id.indexOf("[") >= 0) ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;

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
              "isHidden": false,
              "addedBy": "🟠" + ((sharedLayerStyle.getLibrary() != null) ? " 🪐" : "L"),
              "styleId": id1 + " - " + id2,
              "localStyle": null
            }

            allStyles.push(layerStyleObject);
            idsMap.set(id1 + "---" + lib.id, layerStyleObject);
            if (id2) idsMap.set(id2 + "---" + lib.id, layerStyleObject);
          }
        });
      }
    });
  }

  document.sharedLayerStyles.forEach(function (sharedLayerStyle) {
    var id1 = sharedLayerStyle.id;
    var id2 = (sharedLayerStyle.id.indexOf("[") >= 0) ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;


    var id1Comparison = id1 + ((sharedLayerStyle.getLibrary() != null) ? "---" + sharedLayerStyle.getLibrary().id : "");
    var id2Comparison = id2 + ((sharedLayerStyle.getLibrary() != null) ? "---" + sharedLayerStyle.getLibrary().id : "");

    if (sharedLayerStyle.name.includes("Ultraviolet/500")) {
      dlog(sharedLayerStyle.name + ": " + sharedLayerStyle.id);
      dlog(sharedLayerStyle.sketchObject.isForeign());

      if (!idsMap.has(id1Comparison) && !idsMap.has(id2Comparison)) {
        dlog("-- Adding it to list");
      }
      else {
        if (idsMap.get(id2Comparison)) {
          dlog("-- Hit id2Comparison");
        }
        if (idsMap.get(id1Comparison)) {
          dlog("-- Hit id1Comparison");
        }
      }
    }

    var layerStyleObject = {
      "layerStyle": sharedLayerStyle,
      "name": "" + sharedLayerStyle.name,
      "libraryName": (sharedLayerStyle.getLibrary() != null) ? libraryPrefix + sharedLayerStyle.getLibrary().name : sketchlocalfile,
      "library": sharedLayerStyle.getLibrary(),
      "isForeign": (sharedLayerStyle.getLibrary() != null),
      "isSelected": false,
      "isChosen": false,
      "description": getLayerStyleDescription(sharedLayerStyle),
      "thumbnail": getOvalThumbnail(sharedLayerStyle),
      "numInstances": 0,
      "numOverrides": 0,
      "isSelected": false,
      "contrastMode": (sharedLayerStyle.style.fills.length > 0) ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
      "isHidden": (sharedLayerStyle.getLibrary() != null),
      "addedBy": "🔵" + ((sharedLayerStyle.getLibrary() != null) ? " 🪐" : "L"),
      "styleId": id1 + " - " + id2,
      "localStyle": null
    }


    if (!idsMap.has(id1Comparison) && !idsMap.has(id2Comparison)) {
      allStyles.push(layerStyleObject);
      idsMap.set(id1Comparison, layerStyleObject);
      if (id2) idsMap.set(id2Comparison, layerStyleObject);
    }
    else {
      if (idsMap.get(id2Comparison)) {
        idsMap.get(id2Comparison).localStyle = layerStyleObject;
        idsMap.get(id2Comparison).addedBy += "👻";
      }
      if (idsMap.get(id1Comparison)) {
        idsMap.get(id1Comparison).localStyle = layerStyleObject;
        idsMap.get(id1Comparison).addedBy += "👻";
      }
    }
  });

  //dlog(allStyles.sort(compareStyleArrays))
  return allStyles.sort(compareStyleArrays);

}


export function getAllTextStyles(includeAllStylesFromExternalLibraries) {
  var allStyles = [];
  const idsMap = new Map();
  const redundantIdsMap = new Map();

  document.sharedTextStyles.forEach(function (sharedTextStyle) {
    var library = sharedTextStyle.getLibrary();
    if (!idsMap.has(sharedTextStyle.id)) {
      var redId1 = sharedTextStyle.style.id;
      var redId2 = (sharedTextStyle.id.indexOf("[") >= 0) ? sharedTextStyle.id.substring(sharedTextStyle.id.indexOf("[") + 1, sharedTextStyle.id.length - 1) : null;
      var redundantIn = false;
      if (redId2 != null)
        redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);
      else
        redundantIn = redundantIdsMap.has(redId1);

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
        "numInstances": 0,
        "numOverrides": 0,
        "isSelected": false,
        "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
        "isHidden": redundantIn
      }

      allStyles.push(textStyleObject);
      idsMap.set(sharedTextStyle.style.id, true);
      redundantIdsMap.set(redId1, textStyleObject);
      if (redId2 != null) redundantIdsMap.set(redId2, textStyleObject);
    }
  });

  if (includeAllStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().sharedTextStyles.forEach(function (sharedTextStyle) {
          if (!idsMap.has(sharedTextStyle.style.id)) {
            var redId1 = sharedTextStyle.style.id;
            var redId2 = (sharedTextStyle.id.indexOf("[") >= 0) ? sharedTextStyle.id.substring(sharedTextStyle.id.indexOf("[") + 1, sharedTextStyle.id.length - 1) : null;
            var redundantIn = false;
            if (redId2 != null)
              redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);
            else
              redundantIn = redundantIdsMap.has(redId1)

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
              "numInstances": 0,
              "numOverrides": 0,
              "isSelected": false,
              "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
              "isHidden": redundantIn
            }
            allStyles.push(textStyleObject);
            idsMap.set(sharedTextStyle.style.id, true);
            redundantIdsMap.set(redId1, textStyleObject);
            if (redId2 != null) redundantIdsMap.set(redId2, textStyleObject);
          }
        });
      }
    });
  }

  return allStyles.sort(compareStyleArrays);;

}


export function getAllColorVariables(includeAllStylesFromExternalLibraries) {
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


export function getAllDuplicateLayerStylesByName(context, includeAllLayerStylesFromExternalLibraries) {
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
    if (!removeElement && (styleObject.duplicates.filter(dup => !dup.isHidden).length <= 1)) {
      removeElement = true;
    }

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


export function getAllDuplicateTextStylesByName(context, includeAllStylesFromExternalLibraries) {
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

export function getDefinedLayerStyles(context, includeAllStylesFromExternalLibraries) {
  var layerStyles = getAllLayerStyles(includeAllStylesFromExternalLibraries);
  return layerStyles.sort(compareStyleArrays);
  ;
}
export function getDefinedTextStyles(context, includeAllStylesFromExternalLibraries) {
  var textStyles = getAllTextStyles(includeAllStylesFromExternalLibraries);
  return textStyles.sort(compareStyleArrays);
  ;
}
export function getDefinedColorVariables(context, includeAllStylesFromExternalLibraries) {
  var colorVariables = getAllColorVariables(includeAllStylesFromExternalLibraries);
  return colorVariables.sort(compareColorVariableArrays);
  ;
}

export function getImageData64(data) {
  var imageData = data;
  var mimeType = "image/png";
  return NSString.stringWithFormat(
    "data:%@;base64,%@",
    mimeType,
    imageData.base64EncodedStringWithOptions(0)
  );
}

export function getNSImageData(nsImage) {
  var data = nsImage
  var cgRef = nsImage.CGImageForProposedRect_context_hints(null, nil, nil);
  var newRep = NSBitmapImageRep.alloc().initWithCGImage(cgRef);
  newRep.setSize(nsImage.size());   // if you want the same resolution
  var pngData = newRep.representationUsingType_properties(NSPNGFileType, nil);
  return getImageData64(pngData)
}

export function getThumbnail(element) {
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

export function clog(message) {
  if (logsEnabled)
    console.log(message);
}

export function dlog(message) {
  // console.log(message);
}

export function ctime(message) {
  if (timingEnabled)
    console.time(message);
}

export function ctimeEnd(message) {
  if (timingEnabled)
    console.timeEnd(message);
}

export function getLogsEnabled() {
  return logsEnabled;
}

export function getTimingEnabled() {
  return timingEnabled;
}

export function getLibrariesEnabled() {
  return librariesEnabledByDefault;
}



export function getSettings() {
  return settingsFile;
}

//d9-05
function _0x50a9(){var _0x29eac4=['log','719112OoSKxK','4976799FsziqJ','mainPluginsFolderURL','logs','564504phVgmJ','45kWlqRt','librariesEnabledByDefault','4oSGExC','826330YLnmIb','7631197kwbInw','40lFwQGD','13109844zvqAcU','1050048iGbTue','4VJvNqv'];_0x50a9=function(){return _0x29eac4;};return _0x50a9();}(function(_0x337c5c,_0x661ce3){var _0x2c7bdb=_0x109e,_0x4723ec=_0x337c5c();while(!![]){try{var _0x3eccbe=parseInt(_0x2c7bdb(0xbc))/0x1*(-parseInt(_0x2c7bdb(0xc5))/0x2)+parseInt(_0x2c7bdb(0xb9))/0x3*(-parseInt(_0x2c7bdb(0xbf))/0x4)+parseInt(_0x2c7bdb(0xc2))/0x5*(parseInt(_0x2c7bdb(0xb8))/0x6)+parseInt(_0x2c7bdb(0xc1))/0x7+parseInt(_0x2c7bdb(0xc4))/0x8+parseInt(_0x2c7bdb(0xbd))/0x9*(parseInt(_0x2c7bdb(0xc0))/0xa)+parseInt(_0x2c7bdb(0xc3))/0xb;if(_0x3eccbe===_0x661ce3)break;else _0x4723ec['push'](_0x4723ec['shift']());}catch(_0x374d0e){_0x4723ec['push'](_0x4723ec['shift']());}}}(_0x50a9,0xf3797));function _0x109e(_0x9076a4,_0x2bbf5d){var _0x50a909=_0x50a9();return _0x109e=function(_0x109e8d,_0x55841c){_0x109e8d=_0x109e8d-0xb8;var _0x36716f=_0x50a909[_0x109e8d];return _0x36716f;},_0x109e(_0x9076a4,_0x2bbf5d);}export function LoadSettings(){var _0x6bfa3c=_0x109e;try{settingsFile=readFromFile(MSPluginManager[_0x6bfa3c(0xba)]()['path']()+'/merge.json');if(settingsFile!=null&&settingsFile['logs']!=null)logsEnabled=settingsFile[_0x6bfa3c(0xbb)];if(settingsFile!=null&&settingsFile[_0x6bfa3c(0xbe)]!=null)librariesEnabledByDefault=settingsFile[_0x6bfa3c(0xbe)];}catch(_0x2e5383){return console[_0x6bfa3c(0xc6)](_0x2e5383),null;}}
//d9-05
// module.exports = { getSymbolInstances, compareStyleArrays, FindAllSimilarTextStyles, FindSimilarTextStyles, FindAllSimilarLayerStyles, FindSimilarLayerStyles, getAllLayerStyles, getDefinedTextStyles, IsInTrial, ExiGuthrie, Guthrie, valStatus, writeTextToFile, commands, getSelectedSymbolsSession, GetSpecificSymbolData, GetSpecificLayerStyleData, GetSpecificTextStyleData, shouldEnableContrastMode, countAllSymbols, writeTextToFile, readFromFile, LoadSettings, clog, getLogsEnabled, getSettings, getLibrariesEnabled, getAcquiredLicense, document, importSymbolFromLibrary, importLayerStyleFromLibrary, getSymbolOverrides, getSymbolInstances, importTextStyleFromLibrary, getDefinedColorVariables, importColorVariableFromLibrary, getDuplicateColorVariables, FindAllSimilarColorVariables, getAllDuplicateSymbolsByName, getSymbolsMap, updateAllDuplicatesWithMap, ctime, ctimeEnd, sketchlocalfile, getTimingEnabled, getReducedDuplicateData, getReducedSymbolsSession, getAllDuplicateLayerStylesByName, getLayerStylesMap, getReducedLayerStyleData, getLayerStyleInstances, getLayerStyleOverrides, getAllTextStyles, getAllDuplicateTextStylesByName, dlog, getTextStylesMap, getReducedTextStyleData, getTextStyleInstances, getTextStyleOverrides };