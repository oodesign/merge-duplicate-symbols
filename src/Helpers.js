
var fs = require('@skpm/fs');

const valStatus = {
  app: 'app',
  no: 'no',
  over: 'over'
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

//d9-03
function curl_async(args, isRegistering) {
  var task = NSTask.alloc().init();
  task.setLaunchPath("/usr/bin/curl");
  task.setArguments(args);
  var outputPipe = NSPipe.pipe();
  var errorPipe = NSPipe.pipe();
  task.setStandardOutput(outputPipe);
  task.setStandardError(errorPipe);
  task.launch();
  task.waitUntilExit();
  var status = task.terminationStatus();

  var errorData = errorPipe.fileHandleForReading().readDataToEndOfFile();
  var errorString = NSString.alloc().initWithData_encoding(errorData, NSUTF8StringEncoding);

  if (status == 0) {
    var responseData = outputPipe.fileHandleForReading().readDataToEndOfFile();
    var responseString = NSString.alloc().initWithData_encoding(responseData, NSUTF8StringEncoding);
    var parsed = tryParseJSON(responseString);
    if (parsed.success) {
      if (!isRegistering) {
        return valStatus.app;
      }
      else {
        if (parsed.purchase != null) {
          if (parsed.uses > parsed.purchase.quantity)
            return valStatus.over;
          else
            return valStatus.app;
        }
        else
          return valStatus.app;
      }
    }
    else
      return valStatus.no;
  } else {
    //console.log("error:"+errorString);
  }
}

// var _0x802a=["\x69\x6E\x69\x74","\x61\x6C\x6C\x6F\x63","\x2F\x75\x73\x72\x2F\x62\x69\x6E\x2F\x63\x75\x72\x6C","\x73\x65\x74\x4C\x61\x75\x6E\x63\x68\x50\x61\x74\x68","\x73\x65\x74\x41\x72\x67\x75\x6D\x65\x6E\x74\x73","\x70\x69\x70\x65","\x73\x65\x74\x53\x74\x61\x6E\x64\x61\x72\x64\x4F\x75\x74\x70\x75\x74","\x73\x65\x74\x53\x74\x61\x6E\x64\x61\x72\x64\x45\x72\x72\x6F\x72","\x6C\x61\x75\x6E\x63\x68","\x77\x61\x69\x74\x55\x6E\x74\x69\x6C\x45\x78\x69\x74","\x74\x65\x72\x6D\x69\x6E\x61\x74\x69\x6F\x6E\x53\x74\x61\x74\x75\x73","\x72\x65\x61\x64\x44\x61\x74\x61\x54\x6F\x45\x6E\x64\x4F\x66\x46\x69\x6C\x65","\x66\x69\x6C\x65\x48\x61\x6E\x64\x6C\x65\x46\x6F\x72\x52\x65\x61\x64\x69\x6E\x67","\x69\x6E\x69\x74\x57\x69\x74\x68\x44\x61\x74\x61\x5F\x65\x6E\x63\x6F\x64\x69\x6E\x67","\x73\x75\x63\x63\x65\x73\x73","\x61\x70\x70","\x70\x75\x72\x63\x68\x61\x73\x65","\x75\x73\x65\x73","\x71\x75\x61\x6E\x74\x69\x74\x79","\x6F\x76\x65\x72","\x6E\x6F"];function curl_async(_0xea21x2,_0xea21x3){var _0xea21x4=NSTask[_0x802a[1]]()[_0x802a[0]]();_0xea21x4[_0x802a[3]](_0x802a[2]);_0xea21x4[_0x802a[4]](_0xea21x2);var _0xea21x5=NSPipe[_0x802a[5]]();var _0xea21x6=NSPipe[_0x802a[5]]();_0xea21x4[_0x802a[6]](_0xea21x5);_0xea21x4[_0x802a[7]](_0xea21x6);_0xea21x4[_0x802a[8]]();_0xea21x4[_0x802a[9]]();var _0xea21x7=_0xea21x4[_0x802a[10]]();var _0xea21x8=_0xea21x6[_0x802a[12]]()[_0x802a[11]]();var _0xea21x9=NSString[_0x802a[1]]()[_0x802a[13]](_0xea21x8,NSUTF8StringEncoding);if(_0xea21x7== 0){var _0xea21xa=_0xea21x5[_0x802a[12]]()[_0x802a[11]]();var _0xea21xb=NSString[_0x802a[1]]()[_0x802a[13]](_0xea21xa,NSUTF8StringEncoding);var _0xea21xc=tryParseJSON(_0xea21xb);if(_0xea21xc[_0x802a[14]]){if(!_0xea21x3){return valStatus[_0x802a[15]]}else {if(_0xea21xc[_0x802a[16]]!= null){if(_0xea21xc[_0x802a[17]]> _0xea21xc[_0x802a[16]][_0x802a[18]]){return valStatus[_0x802a[19]]}else {return valStatus[_0x802a[15]]}}else {return valStatus[_0x802a[15]]}}}else {return valStatus[_0x802a[20]]}}else {}}

//d9-03


//d9-04
function IsInTrial() {
  try {
    var trialJson = jsonFromFile(MSPluginManager.mainPluginsFolderURL().path() + '/merge.json');
    if ((trialJson != null) && (trialJson.startTime != null))
      return trialJson.startTime;
    else
      return null;
  } catch (e) {
    return null;
  }
}

function ExiGuthrie() {
  console.log("Validating");
  try {
    var licenseJson = jsonFromFile(MSPluginManager.mainPluginsFolderURL().path() + '/merge.json');
    console.log(licenseJson);
    if ((licenseJson != null) && (licenseJson.licenseKey != null))
      return Guthrie(licenseJson.licenseKey, false);
    else
      return false;
  } catch (e) {
    return false;
  }
}

function Guthrie(licenseKey, isRegistering) {
  var args = ["-d", "product_permalink=mergeduplicatesymbols", "-d", "license_key=" + licenseKey + "", "-d", "increment_uses_count=" + isRegistering.toString() + "", "https://api.gumroad.com/v2/licenses/verify"];
  return curl_async(args, isRegistering);
}

// var _0x2589=["\x70\x61\x74\x68","\x6D\x61\x69\x6E\x50\x6C\x75\x67\x69\x6E\x73\x46\x6F\x6C\x64\x65\x72\x55\x52\x4C","\x2F\x53\x74\x79\x6C\x65\x4D\x65\x2E\x6A\x73\x6F\x6E","\x73\x74\x61\x72\x74\x54\x69\x6D\x65","\x6C\x69\x63\x65\x6E\x73\x65\x4B\x65\x79","\x2D\x64","\x70\x72\x6F\x64\x75\x63\x74\x5F\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x3D\x73\x6B\x65\x74\x63\x68\x73\x74\x79\x6C\x65\x72","\x6C\x69\x63\x65\x6E\x73\x65\x5F\x6B\x65\x79\x3D","","\x69\x6E\x63\x72\x65\x6D\x65\x6E\x74\x5F\x75\x73\x65\x73\x5F\x63\x6F\x75\x6E\x74\x3D","\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x67\x75\x6D\x72\x6F\x61\x64\x2E\x63\x6F\x6D\x2F\x76\x32\x2F\x6C\x69\x63\x65\x6E\x73\x65\x73\x2F\x76\x65\x72\x69\x66\x79"];function IsInTrial(){try{var _0xa485x2=jsonFromFile(MSPluginManager[_0x2589[1]]()[_0x2589[0]]()+ _0x2589[2]);if((_0xa485x2!= null)&& (_0xa485x2[_0x2589[3]]!= null)){return _0xa485x2[_0x2589[3]]}else {return null}}catch(e){return null}}function ExiGuthrie(){try{var _0xa485x4=jsonFromFile(MSPluginManager[_0x2589[1]]()[_0x2589[0]]()+ _0x2589[2]);if((_0xa485x4!= null)&& (_0xa485x4[_0x2589[4]]!= null)){return Guthrie(_0xa485x4[_0x2589[4]],false)}else {return false}}catch(e){return false}}function Guthrie(_0xa485x6,_0xa485x7){var _0xa485x8=[_0x2589[5],_0x2589[6],_0x2589[5],_0x2589[7]+ _0xa485x6+ _0x2589[8],_0x2589[5],_0x2589[9]+ _0xa485x7.toString()+ _0x2589[8],_0x2589[10]];return curl_async(_0xa485x8,_0xa485x7)}

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
  console.log("reading json:"+filePath);
  var read = JSON.parse(fs.readFileSync(filePath, { encoding: 'utf8' }));
  return read;
}

function GetTextBasedOnCount(number){
  if(number!=1){
      return " styles ";
  }
  else
  {
      return " style ";
  }
}

function brightnessByColor (color) {
  var color = "" + color, isHEX = color.indexOf("#") == 0, isRGB = color.indexOf("rgb") == 0;
  if (isHEX) {
    var m = color.substr(1).match(color.length == 7 ? /(\S{2})/g : /(\S{1})/g);
    if (m) var r = parseInt(m[0], 16), g = parseInt(m[1], 16), b = parseInt(m[2], 16);
  }
  if (isRGB) {
    var m = color.match(/(\d+){3}/g);
    if (m) var r = m[0], g = m[1], b = m[2];
  }
  if (typeof r != "undefined") return ((r*299)+(g*587)+(b*114))/1000;
}


function containsIDOrViceversa(id1,id2){
  var contains = false;
  //console.log("Comparing_ "+id1+" -VS- "+id2);

  //Compare if id1 contains id2

  var splitId2 = id2.toString().split("[")[1];
  if(splitId2==null) splitId2 = id2.toString().split("[")[0];
  if(splitId2==null) splitId2 = id2.toString();

  if(splitId2!=null)
  {
    var compareId2 = splitId2.replace("]","");
    if(id1.toString().indexOf(compareId2)>-1)
    {
      //console.log("id1 contains id2");
      contains=true;
    }
  }


  //Compare if id2 contains id1

  var splitId1 = id1.toString().split("[")[1];
  if(splitId1==null) splitId1 = id1.toString().split("[")[0];
  if(splitId1==null) splitId1 = id1.toString();

  if(splitId1!=null)
  {
    var compareId1 = splitId1.replace("]","");
    if(id2.toString().indexOf(compareId1)>-1)
    {
      //console.log("id2 contains id1");
      contains=true;
    }
  }

  return contains;
}

function indexOfForeignStyle(array, style){
  var index=-1;
  for(var i=0;i<array.length;i++){
    if(array[i].remoteShareID!=null)
    {
      if(containsIDOrViceversa(array[i].remoteShareID,style.remoteShareID()))
        index = i;
    }
  }
  return index;
}

function getColorDependingOnBrightness(colorBrightness){
  if(colorBrightness!=null)
  {

    var UI = require('sketch/ui');
    var theme = UI.getTheme()

    if (theme === 'dark') {
      if((colorBrightness > 100) && (colorBrightness < 130))
        return MSColor.colorWithRed_green_blue_alpha(0.35, 0.35, 0.35, 1);
      else
        return MSColor.colorWithRed_green_blue_alpha(1,1,1,0);
    } else {
      if(colorBrightness > 230)
        return MSColor.colorWithRed_green_blue_alpha(0.8, 0.8, 0.8, 1);
      else
        return MSColor.colorWithRed_green_blue_alpha(1,1,1,0);
    }
  }
  else
  {
    return MSColor.colorWithRed_green_blue_alpha(1,1,1,0);
  }
}

function isString(obj){
  try{
    return obj.isKindOfClass(NSString) == 1;
  }catch{
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

function getColorDependingOnTheme()
{
  var UI = require('sketch/ui');
  var theme = UI.getTheme()

  if (theme === 'dark') {
    return CGColorCreateGenericRGB(70 / 255, 70 / 255, 70 / 255, 1.0);
  } else {
    return CGColorCreateGenericRGB(204 / 255, 204 / 255, 204 / 255, 1.0);
  }
}

function compareStyleArrays( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

function alreadyInList(array, style){
  for(var i=0;i<array.length;i++){
    if(array[i].originalStyle!=null){
      if(array[i].originalStyle.remoteShareID().localeCompare(style.objectID())==0)
      {
          return true;
      }
    }
  }
  return false;
}

function getIndexOf(text,array){

  for(var i=0;i<array.length;i++){
    if(array[i].localeCompare(text) == 0)
    return i;
  }
  return -1;
}

function FindSimilarTextStyles(referenceStyle, styles, context, checkSameFont,checkSameWeight,checkSameSize,checkSameColor,checkSameParagraphSpacing,checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing){

  var similarStyles = [];

  styles.forEach(function(style){
    if(referenceStyle != style.textStyle)
    {
      //console.log("["+referenceStyle.name()+"] and ["+style.name()+"]");

      var sameFont = referenceStyle.style().textStyle().attributes().NSFont.familyName() == style.textStyle.style().textStyle().attributes().NSFont.familyName();
      //console.log("---Font? "+sameFont);

      var sameWeight = NSFontManager.sharedFontManager().weightOfFont_(referenceStyle.style().textStyle().attributes().NSFont) == NSFontManager.sharedFontManager().weightOfFont_(style.textStyle.style().textStyle().attributes().NSFont);
      //console.log("---FontWeight? "+sameWeight);

      var sameSize = referenceStyle.style().textStyle().attributes().NSFont.pointSize() == style.textStyle.style().textStyle().attributes().NSFont.pointSize();
      //console.log("---FontSize? "+sameSize);

      var sameColor = referenceStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue() == style.textStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue();
      //console.log("---Color? "+sameColor);

      var sameParagraphSpacing = referenceStyle.style().textStyle().attributes().NSParagraphStyle.paragraphSpacing() == style.textStyle.style().textStyle().attributes().NSParagraphStyle.paragraphSpacing();
      //console.log("---Paragraph Spacing? "+sameParagraphSpacing);

      var sameLineHeight = referenceStyle.style().textStyle().attributes().NSParagraphStyle.minimumLineHeight() == style.textStyle.style().textStyle().attributes().NSParagraphStyle.minimumLineHeight();
      //console.log("---Line height? "+sameLineHeight);

      var sameAlignment = referenceStyle.style().textStyle().attributes().NSParagraphStyle.alignment() == style.textStyle.style().textStyle().attributes().NSParagraphStyle.alignment();
      //console.log("---Alignment? "+sameAlignment);

      var sameCharacterSpacing = false;
      try{ 
        sameCharacterSpacing = referenceStyle.style().textStyle().attributes().NSKern.toString() == style.textStyle.style().textStyle().attributes().NSKern.toString();
      }catch{
        sameCharacterSpacing = referenceStyle.style().textStyle().attributes().NSKern == style.textStyle.style().textStyle().attributes().NSKern;
      }
      //console.log("---Character Spacing? "+sameCharacterSpacing + "-  Comparing ["+referenceStyle.style().textStyle().attributes().NSKern+"] with ["+style.textStyle.style().textStyle().attributes().NSKern+"]" );

      var isSimilar = true;
      if(checkSameFont) isSimilar = isSimilar && sameFont;
      if(checkSameWeight) isSimilar = isSimilar && sameWeight;
      if(checkSameSize) isSimilar = isSimilar && sameSize;
      if(checkSameColor) isSimilar = isSimilar && sameColor;
      if(checkSameParagraphSpacing) isSimilar = isSimilar && sameParagraphSpacing;
      if(checkSameLineHeight) isSimilar = isSimilar && sameLineHeight;
      if(checkSameAlignment) isSimilar = isSimilar && sameAlignment;
      if(checkSameCharacterSpacing) isSimilar = isSimilar && sameCharacterSpacing;

      if(isSimilar) similarStyles.push(style);
    }

    

  });

  

  //console.log(referenceStyle.name()+" has "+similarStyles.length+" similar styles.");
  return similarStyles;
}

function FindAllSimilarTextStyles(context, includeAllStylesFromExternalLibraries, checkSameFont,checkSameWeight,checkSameSize,checkSameColor,checkSameParagraphSpacing,checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing){

  var stylesWithSimilarStyles = [];
  var stylesAlreadyProcessed = [];

  var definedTextStyles = getDefinedTextStyles(context, includeAllStylesFromExternalLibraries, null);
  for (var i = 0; i < definedTextStyles.length; i++) {
    
    if(definedTextStyles[i].libraryName.localeCompare("local")==0)
    {

      if(stylesAlreadyProcessed.indexOf(definedTextStyles[i])==-1)
      {
        var thisStyleSimilarStyles = FindSimilarTextStyles(definedTextStyles[i].textStyle, definedTextStyles, context, checkSameFont,checkSameWeight,checkSameSize,checkSameColor,checkSameParagraphSpacing,checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);



        stylesAlreadyProcessed.push(definedTextStyles[i]);
        thisStyleSimilarStyles.forEach(function (processedStyle){
          stylesAlreadyProcessed.push(processedStyle);
        });

        stylesWithSimilarStyles.push({
          "referenceStyle": definedTextStyles[i],
          "similarStyles": thisStyleSimilarStyles
        });


        //console.log("PROCESSED STYLES");
        //console.log(stylesAlreadyProcessed);
        //stylesAlreadyProcessed.forEach(function (processedStyle){
        //  console.log("--- "+processedStyle.name);
        //});
      }
      else{
        //console.log("Style ["+definedTextStyles[i].name+"] was already processed");
      }
    }
  }

  //console.log("STYLES WITH SIMILAR STYLES");
  //stylesWithSimilarStyles.forEach(function (styleWithSimilarStyles){
  //  console.log("-- ["+styleWithSimilarStyles.referenceStyle.name+"] has "+styleWithSimilarStyles.similarStyles.length+" similar styles");
  //  styleWithSimilarStyles.similarStyles.forEach(function (similarStyle){
  //    console.log("----- "+similarStyle.name);
  //  });
  //});

  return stylesWithSimilarStyles;
}

function FindSimilarLayerStyles(referenceStyle, styles, context, checkSameFillColor,checkSameBorderColor,checkSameBorderThickness,checkSameShadowColor,checkSameShadowParams){

  var similarStyles = [];

  styles.forEach(function(style){
    if(referenceStyle != style.layerStyle)
    {
      //console.log("["+referenceStyle.name()+"] and ["+style.layerStyle.name()+"]");
      
      var sameFillColor=false;
      if(referenceStyle.style().firstEnabledFill()!=null && style.layerStyle.style().firstEnabledFill()!=null)
      {
        sameFillColor = referenceStyle.style().firstEnabledFill().color().immutableModelObject().hexValue().toString() == style.layerStyle.style().firstEnabledFill().color().immutableModelObject().hexValue().toString();
      }
      //console.log("---Fill? "+sameFillColor);

      var sameBorderColor=false;
      if(referenceStyle.style().firstEnabledBorder()!=null && style.layerStyle.style().firstEnabledBorder()!=null)
      {
       sameBorderColor = referenceStyle.style().firstEnabledBorder().color().immutableModelObject().hexValue().toString() == style.layerStyle.style().firstEnabledBorder().color().immutableModelObject().hexValue().toString();
      }
      //console.log("---BorderColor? "+sameBorderColor);

      var sameBorderThickness=false;
      if(referenceStyle.style().firstEnabledBorder()!=null && style.layerStyle.style().firstEnabledBorder()!=null)
      {
       sameBorderThickness = referenceStyle.style().firstEnabledBorder().thickness() == style.layerStyle.style().firstEnabledBorder().thickness();
      }
      //console.log("---BorderThickness? "+sameBorderThickness);


      var sameShadowColor=false;
      if(referenceStyle.style().firstEnabledShadow()!=null && style.layerStyle.style().firstEnabledShadow()!=null)
      {
       sameShadowColor = referenceStyle.style().firstEnabledShadow().color().immutableModelObject().hexValue().toString() == style.layerStyle.style().firstEnabledShadow().color().immutableModelObject().hexValue().toString();
      }
      //console.log("---ShadowColor? "+sameShadowColor);

      var sameShadowParams=false;
      if(referenceStyle.style().firstEnabledShadow()!=null && style.layerStyle.style().firstEnabledShadow()!=null)
      {
       sameShadowParams = (referenceStyle.style().firstEnabledShadow().offsetX() == style.layerStyle.style().firstEnabledShadow().offsetX()) && (referenceStyle.style().firstEnabledShadow().offsetY() == style.layerStyle.style().firstEnabledShadow().offsetY()) && (referenceStyle.style().firstEnabledShadow().blurRadius() == style.layerStyle.style().firstEnabledShadow().blurRadius()) && (referenceStyle.style().firstEnabledShadow().spread() == style.layerStyle.style().firstEnabledShadow().spread());
      }
      //console.log("---ShadowParams? "+sameShadowParams);

      var isSimilar = true;
      if(checkSameFillColor) isSimilar = isSimilar && sameFillColor;
      if(checkSameBorderColor) isSimilar = isSimilar && sameBorderColor;
      if(checkSameBorderThickness) isSimilar = isSimilar && sameBorderThickness;
      if(checkSameShadowColor) isSimilar = isSimilar && sameShadowColor;
      if(checkSameShadowParams) isSimilar = isSimilar && sameShadowParams;

      if(isSimilar) similarStyles.push(style);
    }

    

  });

  

  //console.log(referenceStyle.name()+" has "+similarStyles.length+" similar styles.");
  return similarStyles;
}

function FindAllSimilarLayerStyles(context, includeAllStylesFromExternalLibraries, checkSameFillColor,checkSameBorderColor,checkSameBorderThickness,checkSameShadowColor,checkSameShadowParams){

  var stylesWithSimilarStyles = [];
  var stylesAlreadyProcessed = [];

  var definedLayerStyles = getDefinedLayerStyles(context, includeAllStylesFromExternalLibraries, null);
  for (var i = 0; i < definedLayerStyles.length; i++) {
    if(definedLayerStyles[i].libraryName.localeCompare("local")==0)
    {
      if(stylesAlreadyProcessed.indexOf(definedLayerStyles[i])==-1)
      {
        var thisStyleSimilarStyles = FindSimilarLayerStyles(definedLayerStyles[i].layerStyle, definedLayerStyles, context, checkSameFillColor,checkSameBorderColor,checkSameBorderThickness,checkSameShadowColor,checkSameShadowParams);



        stylesAlreadyProcessed.push(definedLayerStyles[i]);
        thisStyleSimilarStyles.forEach(function (processedStyle){
          stylesAlreadyProcessed.push(processedStyle);
        });

        stylesWithSimilarStyles.push({
          "referenceStyle": definedLayerStyles[i],
          "similarStyles": thisStyleSimilarStyles
        });


        //console.log("PROCESSED STYLES");
        //console.log(stylesAlreadyProcessed);
        //stylesAlreadyProcessed.forEach(function (processedStyle){
        //  console.log("--- "+processedStyle.name);
        //});
      }
      else{
        //console.log("Style ["+definedLayerStyles[i].name+"] was already processed");
      }
    }
  }



  //console.log("STYLES WITH SIMILAR STYLES");
  //stylesWithSimilarStyles.forEach(function (styleWithSimilarStyles){
  //  console.log("-- ["+styleWithSimilarStyles.referenceStyle.name+"] has "+styleWithSimilarStyles.similarStyles.length+" similar styles");
  //  styleWithSimilarStyles.similarStyles.forEach(function (similarStyle){
  //    console.log("----- "+similarStyle.name);
  //  });
  //});

  return stylesWithSimilarStyles;
}

function getDefinedTextStyles(context, includeAllStylesFromExternalLibraries, styleName) {
  var textStyles = [];
  var localTextStyles = context.document.documentData().layerTextStyles().objects();


  //console.log("Local text styles:"+context.document.documentData().layerTextStyles().objects().count());
  
  for (var i = 0; i < localTextStyles.count(); i++) {
    var style = localTextStyles.objectAtIndex(i);
    var attributes = style.style().textStyle().attributes();

    if(styleName!=null){
      if(styleName.localeCompare(style.name())==0){
        textStyles.push({
          "attributes": attributes,
          "textStyle": style,
          "name": style.name(),
          "libraryName": "local",
          "foreign": false
        });
      }
    }
    else
    {
      textStyles.push({
        "attributes": attributes,
        "textStyle": style,
        "name": style.name(),
        "libraryName": "local",
        "foreign": false
      });
    }


    //console.log("--Local:"+localTextStyles.objectAtIndex(i).objectID());
  }

  //console.log("TS:"+textStyles.length);
  //console.log("Foreign text styles:"+context.document.documentData().foreignTextStyles().count());

  context.document.documentData().foreignTextStyles().forEach(style => {
    var attributes = style.localObject().style().textStyle().attributes();

    var indexOfForeign = indexOfForeignStyle(textStyles, style);

    if(indexOfForeign==-1){
      if(styleName!=null){
          if(styleName.localeCompare(style.localObject().name())==0){
            textStyles.push({
              "originalStyle": style,
              "attributes": attributes,
              "textStyle": style.localObject(),
              "name": style.localObject().name()+"(Lib)",
              "libraryName": style.sourceLibraryName(),
              "foreign": true,
              "localShareID": style.localShareID(),
              "remoteShareID": style.remoteShareID(),
              "correlativeStyles":[]
            });
          }
      }
      else
      {
        textStyles.push({
          "originalStyle": style,
          "attributes": attributes,
          "textStyle": style.localObject(),
          "name": style.localObject().name()+"(Lib)",
          "libraryName": style.sourceLibraryName(),
          "foreign": true,
          "localShareID": style.localShareID(),
          "remoteShareID": style.remoteShareID(),
          "correlativeStyles":[]
        });
      }
    }
    else
    {
      //console.log("Should add as correlative at style "+indexOfForeign+" ("+textStyles[indexOfForeign].name+")")
      textStyles[indexOfForeign].correlativeStyles.push(style);
    }

    //console.log("--Foreign:"+style.localObject().objectID()+"  -  "+style.localObject().name());
    //console.log("----localShareID:"+style.localShareID())
    //console.log("----remoteShareID:"+style.remoteShareID())
  });

  if(includeAllStylesFromExternalLibraries)
  {

  //console.log("Libraries--------");
    
    var libraries = NSApp.delegate().librariesController().availableLibraries();

    libraries.forEach(function (lib) {
      if(lib.enabled())
      {

       
        //console.log("--"+lib.name()+": "+lib.document().layerTextStyles().objects().count()+" styles");
        lib.document().layerTextStyles().objects().forEach(function (libraryStyle){
           //console.log("----Library:"+libraryStyle.objectID());
          if(!alreadyInList(textStyles, libraryStyle))
          {
            if(styleName!=null){
              if(styleName.localeCompare(libraryStyle.name())==0){

                var attributes = libraryStyle.style().textStyle().attributes();

                textStyles.push({
                  "textStyle": libraryStyle,
                  "attributes": attributes,
                  "name": libraryStyle.name() + "(Ext)",
                  "libraryName": lib.name(),
                  "foreign": true,
                  "library": lib
                });
              }
            }
            else
            {
              var attributes = libraryStyle.style().textStyle().attributes();

              textStyles.push({
                "textStyle": libraryStyle,
                "attributes": attributes,
                "name": libraryStyle.name() + "(Ext)",
                "libraryName": lib.name(),
                "foreign": true,
                "library": lib
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

function getDefinedLayerStyles(context, includeAllStylesFromExternalLibraries, styleName) {
  var layerStyles = [];
  var localLayerStyles = context.document.documentData().layerStyles().objects();


  //console.log("Local layer styles:"+context.document.documentData().layerStyles().objects().count());
  
  for (var i = 0; i < localLayerStyles.count(); i++) {
    var style = localLayerStyles.objectAtIndex(i);

    if(styleName!=null){
      if(styleName.localeCompare(style.name())==0){
        layerStyles.push({
          "layerStyle": style,
          "name": style.name(),
          "libraryName": "local",
          "foreign": false
        });
      }
    }
    else
    {
      layerStyles.push({
        "layerStyle": style,
        "name": style.name(),
        "libraryName": "local",
        "foreign": false
      });
    }


    //console.log("--Local:"+localLayerStyles.objectAtIndex(i).objectID());
  }

  //console.log("LS:"+layerStyles.length);
  //console.log("Foreign layer styles:"+context.document.documentData().foreignLayerStyles().count());

  context.document.documentData().foreignLayerStyles().forEach(style => {

    var indexOfForeign = indexOfForeignStyle(layerStyles, style);

    if(indexOfForeign==-1){
      if(styleName!=null){
          if(styleName.localeCompare(style.localObject().name())==0){
            layerStyles.push({
              "originalStyle": style,
              "layerStyle": style.localObject(),
              "name": style.localObject().name()+"(Lib)",
              "libraryName": style.sourceLibraryName(),
              "foreign": true,
              "localShareID": style.localShareID(),
              "remoteShareID": style.remoteShareID(),
              "correlativeStyles":[]
            });
          }
      }
      else
      {
        layerStyles.push({
          "originalStyle": style,
          "layerStyle": style.localObject(),
          "name": style.localObject().name()+"(Lib)",
          "libraryName": style.sourceLibraryName(),
          "foreign": true,
          "localShareID": style.localShareID(),
          "remoteShareID": style.remoteShareID(),
          "correlativeStyles":[]
        });
      }
    }
    else
    {
      //console.log("Should add as correlative at style "+indexOfForeign+" ("+layerStyles[indexOfForeign].name+")")
      layerStyles[indexOfForeign].correlativeStyles.push(style);
    }

    //console.log("--Foreign:"+style.localObject().objectID()+"  -  "+style.localObject().name());
    //console.log("----localShareID:"+style.localShareID())
    //console.log("----remoteShareID:"+style.remoteShareID())
  });

  if(includeAllStylesFromExternalLibraries)
  {

  //console.log("Libraries--------");
    
    var libraries = NSApp.delegate().librariesController().libraries();

    libraries.forEach(function (lib) {
      if(lib.enabled())
      {

        //console.log("--"+lib.name()+": "+lib.document().layerStyles().objects().count()+" styles");
        lib.document().layerStyles().objects().forEach(function (libraryStyle){
          //console.log("----Library:"+libraryStyle.objectID());
          if(!alreadyInList(layerStyles, libraryStyle))
          {
            if(styleName!=null){
              if(styleName.localeCompare(libraryStyle.name())==0){
                layerStyles.push({
                  "layerStyle": libraryStyle,
                  "name": libraryStyle.name() + "(Ext)",
                  "libraryName": lib.name(),
                  "foreign": true,
                  "library": lib
                });
              }
            }
            else
            {
              layerStyles.push({
                "layerStyle": libraryStyle,
                "name": libraryStyle.name() + "(Ext)",
                "libraryName": lib.name(),
                "foreign": true,
                "library": lib
              });
            }
          }
        });
      }
    });
  }

  layerStyles = layerStyles.sort(compareStyleArrays);

  return layerStyles;
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
  console.log("getthumbnail");
  console.log(element);
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

module.exports = { GetTextBasedOnCount, getBase64, brightnessByColor, getColorDependingOnBrightness,isString,getAlignment, getSymbolInstances, containsTextStyle, containsLayerStyle,createView, getAllTextLayers, getAllLayers, createSeparator, getColorDependingOnTheme, compareStyleArrays, alreadyInList, getIndexOf, FindAllSimilarTextStyles, FindSimilarTextStyles, FindAllSimilarLayerStyles, FindSimilarLayerStyles, getDefinedLayerStyles, getDefinedTextStyles, indexOfForeignStyle, IsInTrial, ExiGuthrie, Guthrie,valStatus,writeTextToFile, commands};