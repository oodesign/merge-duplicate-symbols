const Helpers = require("./Helpers");


var currentSelectedStyles = [];
var currentMergeMatrix;

function MergeTextStyles(context) {
  var layersChangedCounter = 0;
  var overridesChangedCounter = 0;
  var styleToKeep = currentMergeMatrix.cells().indexOfObject(currentMergeMatrix.selectedCell());

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

      if(style.correlativeStyles!=null)
      {
        //console.log(style.name+" has "+style.correlativeStyles.length+" correlative styles.")
        var countercorrelative=0;
        for(var i = 0;i<style.correlativeStyles.length;i++)
        {
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
  if(currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library!=null)
  {
    foreignStyleReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(currentSelectedStyles[styleToKeep].textStyle,currentSelectedStyles[styleToKeep].library);
    foreignStyle = AppController.sharedInstance().librariesController().importShareableObjectReference_intoDocument(foreignStyleReference,context.document.documentData());
  }

  layersWithOtherStyles.forEach(function (layer) {
    if(currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library!=null)
    {
        layer.setSharedStyle(foreignStyle.localSharedStyle());
    }
    else
    {
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
        if(context.document.documentData().foreignTextStyles().indexOf(style.originalStyle) > -1)
        {
          context.document.documentData().foreignTextStyles().removeObject(style.originalStyle);
          //console.log("Removed style: "+style.name);
        }

        if(style.correlativeStyles!=null){
          for(var i = 0;i<style.correlativeStyles.length;i++)
          {
            if(context.document.documentData().foreignTextStyles().indexOf(style.correlativeStyles[i]) > -1)
            {
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

  context.document.showMessage("Yo ho! We updated " + layersChangedCounter + " text layers and " + overridesChangedCounter + " overrides.");
}

function getTextPredicate(style){
  var predicate;
  if(style.originalStyle!=null)
    predicate = NSPredicate.predicateWithFormat("(sharedStyle.objectID == %@) OR (sharedStyle.objectID == %@)", style.originalStyle.localShareID(), style.originalStyle.remoteShareID());
  else
    predicate = NSPredicate.predicateWithFormat("sharedStyle.objectID == %@", style.textStyle.objectID());

  return predicate;
}

function getLayerPredicate(style){
  var predicate;
  if(style.originalStyle!=null)
    predicate = NSPredicate.predicateWithFormat("(sharedStyle.objectID == %@) OR (sharedStyle.objectID == %@)", style.originalStyle.localShareID(), style.originalStyle.remoteShareID());
  else
    predicate = NSPredicate.predicateWithFormat("sharedStyle.objectID == %@", style.layerStyle.objectID());

  return predicate;
}

function MergeLayerStyles(context) {
  var layersChangedCounter = 0;
  var overridesChangedCounter = 0;
  var styleToKeep = currentMergeMatrix.cells().indexOfObject(currentMergeMatrix.selectedCell());

  var layers = Helpers.getAllLayers(context);
  var layersWithOtherStyles = NSMutableArray.array();
  currentSelectedStyles.forEach(function (style) {
    if (style.layerStyle != currentSelectedStyles[styleToKeep].layerStyle) {
      var predicate = getLayerPredicate(style),
        layersWithSameStyle = layers.filteredArrayUsingPredicate(predicate),
        instanceLoop = layersWithSameStyle.objectEnumerator(),
        instance;

      while (instance = instanceLoop.nextObject()) {
        layersWithOtherStyles.addObject(instance);
      }

      if(style.correlativeStyles!=null)
      {
        //console.log(style.name+" has "+style.correlativeStyles.length+" correlative styles.")
        var countercorrelative=0;
        for(var i = 0;i<style.correlativeStyles.length;i++)
        {
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
  if(currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library!=null)
  {
    foreignStyleReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(currentSelectedStyles[styleToKeep].layerStyle,currentSelectedStyles[styleToKeep].library);
    foreignStyle = AppController.sharedInstance().librariesController().importShareableObjectReference_intoDocument(foreignStyleReference,context.document.documentData());
  }

  //console.log("We found "+layersWithOtherStyles.count()+" using this style");

  layersWithOtherStyles.forEach(function (layer) {
    if(currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library!=null)
    {
        layer.setSharedStyle(foreignStyle.localSharedStyle());
    }
    else
    {
      layer.setSharedStyle(currentSelectedStyles[styleToKeep].layerStyle);
    }

    layersChangedCounter++;
  });

  overridesChangedCounter += UpdateLayerOverrides(currentSelectedStyles, styleToKeep, context, foreignStyle);

  currentSelectedStyles.forEach(function (style) {
    if (style.layerStyle != currentSelectedStyles[styleToKeep].layerStyle) {

      if (style.foreign && (style.library == null)) {
        //console.log("You're trying to remove a library style");
        if(context.document.documentData().foreignLayerStyles().indexOf(style.originalStyle) > -1)
        {
          context.document.documentData().foreignLayerStyles().removeObject(style.originalStyle);
          //console.log("Removed style: "+style.name);
        }

        if(style.correlativeStyles!=null){
          for(var i = 0;i<style.correlativeStyles.length;i++)
          {
            if(context.document.documentData().foreignLayerStyles().indexOf(style.correlativeStyles[i]) > -1)
            {
              context.document.documentData().foreignLayerStyles().removeObject(style.correlativeStyles[i]);
              //console.log("Removed correlative");
            }
          }
        }
      }
      else {
        context.document.documentData().layerStyles().removeSharedStyle(style.layerStyle);
        //console.log("Removed style: "+style.name);
      }
    }
  });

  context.document.showMessage("Yo ho! We updated " + layersChangedCounter + " layers and " + overridesChangedCounter + " overrides.");
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

        getAllOverridesThatWeShouldReplace(availableOverride,currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance,0,context); 
        //console.log(allOverridesThatWeShouldReplace);

        for(var i=0;i<allOverridesThatWeShouldReplace.length;i++)
        {
          if(currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library!=null)
          {
            symbolInstance.setValue_forOverridePoint_(foreignStyle.localSharedStyle().objectID(), allOverridesThatWeShouldReplace[i].overridePoint());
          }
          else
          {
            symbolInstance.setValue_forOverridePoint_(currentSelectedStyles[styleToKeep].textStyle.objectID(), allOverridesThatWeShouldReplace[i].overridePoint());
          }

          overridesChangedCounter++;
        }
    });
  });

  return overridesChangedCounter;
}

function UpdateLayerOverrides(currentSelectedStyles, styleToKeep, context, foreignStyle) {

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

        getAllLayerOverridesThatWeShouldReplace(availableOverride,currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance,0,context); 
        //console.log(allOverridesThatWeShouldReplace);

        for(var i=0;i<allOverridesThatWeShouldReplace.length;i++)
        {
          if(currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library!=null)
          {
            symbolInstance.setValue_forOverridePoint_(foreignStyle.localSharedStyle().objectID(), allOverridesThatWeShouldReplace[i].overridePoint());
          }
          else
          {
            symbolInstance.setValue_forOverridePoint_(currentSelectedStyles[styleToKeep].layerStyle.objectID(), allOverridesThatWeShouldReplace[i].overridePoint());
          }

          overridesChangedCounter++;
        }
    });
  });

  return overridesChangedCounter;
}

function getAllLayerOverridesThatWeShouldReplace(availableOverride,currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, level, context){
  var verbose=false;

  if(verbose) console.log(symbolInstance.name()+"("+level+")"+": ---   Name:"+availableOverride.overridePoint().layerName()+"    -    CV:"+availableOverride.currentValue()+"   -   DV:"+availableOverride.defaultValue());

  if(availableOverride.children() == null)
  {
      currentSelectedStyles.forEach(function (style) {
        if (style.layerStyle != currentSelectedStyles[styleToKeep].layerStyle) {
          if(Helpers.isString(availableOverride.currentValue()))
          {
            if ((availableOverride.currentValue().toString().indexOf(style.layerStyle.objectID()) > -1)
              || (style.originalStyle!=null && (availableOverride.currentValue().toString().indexOf(style.originalStyle.localShareID()) > -1))
              || (style.originalStyle!=null && (availableOverride.currentValue().toString().indexOf(style.originalStyle.remoteShareID()) > -1))
            ) {
              if(verbose) console.log("Adding it");
              allOverridesThatWeShouldReplace.push(availableOverride);
            }

            if(style.correlativeStyles!=null){

              if(verbose) console.log("Checking overrides: "+style.name+" has "+style.correlativeStyles.length+" correlative styles.")
              for(var i = 0;i<style.correlativeStyles.length;i++)
              {
                if ((availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].localObject().objectID()) > -1)
                  || (style.originalStyle!=null && (availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].localShareID()) > -1))
                  || (style.originalStyle!=null && (availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].remoteShareID()) > -1))
                ) {
                  if(verbose) console.log("Adding it - correlative");
                  allOverridesThatWeShouldReplace.push(availableOverride);
                }
              }
            }
          }
        }
      });
  }
  else
  {
    if(verbose) console.log("Digging deeper because it has "+availableOverride.children().length+" children");
    availableOverride.children().forEach(function(child){
      getAllLayerOverridesThatWeShouldReplace(child,currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, level+1, context)
    });
  }
}

function getAllOverridesThatWeShouldReplace(availableOverride,currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, level, context){
  
  //console.log(symbolInstance.name()+"("+level+")"+": ---   Name:"+availableOverride.overridePoint().layerName()+"    -    CV:"+availableOverride.currentValue()+"   -   DV:"+availableOverride.defaultValue());

  if(availableOverride.children() == null)
  {
      currentSelectedStyles.forEach(function (style) {
        if (style.textStyle != currentSelectedStyles[styleToKeep].textStyle) {
          if(Helpers.isString(availableOverride.currentValue()))
          {
            if ((availableOverride.currentValue().toString().indexOf(style.textStyle.objectID()) > -1)
              || (style.originalStyle!=null && (availableOverride.currentValue().toString().indexOf(style.originalStyle.localShareID()) > -1))
              || (style.originalStyle!=null && (availableOverride.currentValue().toString().indexOf(style.originalStyle.remoteShareID()) > -1))
            ) {
              //console.log("Adding it");
              allOverridesThatWeShouldReplace.push(availableOverride);
            }

            if(style.correlativeStyles!=null){

              //console.log("Checking overrides: "+style.name+" has "+style.correlativeStyles.length+" correlative styles.")
              for(var i = 0;i<style.correlativeStyles.length;i++)
              {
                if ((availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].localObject().objectID()) > -1)
                  || (style.originalStyle!=null && (availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].localShareID()) > -1))
                  || (style.originalStyle!=null && (availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].remoteShareID()) > -1))
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
  else
  {
    //console.log("Digging deeper because it has "+availableOverride.children().length+" children");
    availableOverride.children().forEach(function(child){
      getAllOverridesThatWeShouldReplace(child,currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, level+1, context)
    });
  }
}

function CreateMergeMatrix(isLayerStyle, selectedStyles,mergeDecisionList, windowHeight,okbutton, width, context, mergingSimilarStyles, similarStylesList) {
  var cellHeight = 100;
  if(!mergingSimilarStyles)
    okbutton.setEnabled(false);

  currentSelectedStyles = selectedStyles;

  var mergeButtonFormat = NSButtonCell.alloc().init();
  if(mergingSimilarStyles)
  {
    mergeButtonFormat.setBezelStyle(0);
    mergeButtonFormat.setButtonType(NSButtonTypeMomentaryChange);
  }
  else
  {
    mergeButtonFormat.setBezelStyle(3);
    mergeButtonFormat.setButtonType(NSPushOnPushOffButton);
  }
  var mergeMatrixHeight = ((selectedStyles.length+1) * cellHeight);
  mergeDecisionList.setHasVerticalScroller((windowHeight < mergeMatrixHeight));

  var mergeMatrix = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
    NSMakeRect(0, 0, width, mergeMatrixHeight),
    NSRadioModeMatrix,
    mergeButtonFormat,
    selectedStyles.length,
    1
  );
  mergeMatrix.setCellSize(CGSizeMake(width, cellHeight));
  mergeDecisionList.setDocumentView(mergeMatrix);



  var mergecells = mergeMatrix.cells();
  for (var j = 0; j < mergecells.length; j++) {
    var layer;
    var colorBrightness;
    var layerWidth = width*2, layerHeight = 100;

    if(isLayerStyle)
    {

      layer = MSOvalShape.alloc().init();
      layer.frame = MSRect.rectWithRect(NSMakeRect(0,0,100,100));
      layer.style = selectedStyles[j].layerStyle.style();
      if(layer.style().firstEnabledFill()!=null)
        colorBrightness = Helpers.brightnessByColor("#"+layer.style().firstEnabledFill().color().immutableModelObject().hexValue().toString());
    }
    else
    {
      layer = MSTextLayer.new();
      layer.stringValue = "The quick brown fox";
      layer.style = selectedStyles[j].textStyle.style();

      context.document.currentPage().addLayer(layer);
      layerWidth = layer.frame().width();
      layerHeight = layer.frame().height();
      layer.removeFromParent();
      
      colorBrightness = Helpers.brightnessByColor("#"+layer.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue().toString());
    }


    var rectangle = MSRectangleShape.alloc().init();
    rectangle.frame = MSRect.rectWithRect(NSMakeRect(0,0,layerWidth,layerHeight));
    var fill = rectangle.style().addStylePartOfType(0);
    
    fill.color = Helpers.getColorDependingOnBrightness(colorBrightness);
    

    var group = MSLayerGroup.new();
    group.layers = [rectangle, layer];
    context.document.currentPage().addLayer(group);

    rectangle.select_byExpandingSelection(true,false);
    layer.select_byExpandingSelection(true, true);
    var action = context.document.actionsController().actionForID("MSAlignLayersCenterAction");


    if(action.validate()) {
      action.doPerformAction(null);
    }


    var exportRequest = MSExportRequest.exportRequestsFromExportableLayer_inRect_useIDForName_(
      group,
      group.absoluteInfluenceRect(),
      false
    ).firstObject()

    exportRequest.format = "png"

    var scaleX = width / exportRequest.rect().size.width;
    var scaleY = (cellHeight - 50) / exportRequest.rect().size.height;

    if (scaleX < scaleY)
      exportRequest.scale = scaleX;
    else
      exportRequest.scale = scaleY;

    var colorSpace = NSColorSpace.sRGBColorSpace()
    var exporter = MSExporter.exporterForRequest_colorSpace_(exportRequest, colorSpace)
    var imageRep = exporter.bitmapImageRep();

    var image = NSImage.alloc().init().autorelease();
    image.addRepresentation(imageRep);
    mergecells.objectAtIndex(j).setImagePosition(NSImageAbove);
    mergecells.objectAtIndex(j).setImage(image);


    var styleNameToDisplay = selectedStyles[j].name;
    if (selectedStyles[j].foreign)
      styleNameToDisplay += " ("+selectedStyles[j].libraryName+")";

    var textInfo;
    if(!mergingSimilarStyles)
    {
      if(isLayerStyle)
      {
        textInfo = styleNameToDisplay + "\n" ;
        if(selectedStyles[j].layerStyle.style().firstEnabledFill()!=null)
          textInfo += "Fill: #"+selectedStyles[j].layerStyle.style().firstEnabledFill().color().immutableModelObject().hexValue().toString();
          
        if(selectedStyles[j].layerStyle.style().firstEnabledFill()!=null && selectedStyles[j].layerStyle.style().firstEnabledBorder()!=null)
          textInfo += " - ";

        if(selectedStyles[j].layerStyle.style().firstEnabledBorder()!=null)
          textInfo += "Border: #"+selectedStyles[j].layerStyle.style().firstEnabledBorder().color().immutableModelObject().hexValue().toString();

      }
      else
      {
        var fontString = String(selectedStyles[j].attributes.NSFont);
        var font = fontString.substring(1, fontString.indexOf("pt."));
        var formatInfo = "" + font + "pt";
        var alignment = Helpers.getAlignment(selectedStyles[j].attributes.NSParagraphStyle.alignment());

        textInfo = styleNameToDisplay + "\n" + formatInfo + " - " + alignment;
      }
    }
    else
    {
      var ttTitle=selectedStyles[j].name;
      var slength=0;
      try{
        slength = selectedStyles[j].name.toString().length();
      }
      catch{
        slength = selectedStyles[j].name.toString().length;
      }


      if(slength > 60)
      {
        ttTitle = selectedStyles[j].name.substring(0,59)+"...";
      }

      if(similarStylesList[j]==1)
        textInfo = "There are 2 styles like this one (with the same selected attributes). \n'"+ttTitle + "' and one else.";
      else
        textInfo = "There are "+(similarStylesList[j]+1)+" styles like this one (with the same selected attributes).\n '"+ttTitle + "' and "+similarStylesList[j]+" more.";

    }

    

    mergecells.objectAtIndex(j).setTitle(textInfo);

    if(!mergingSimilarStyles)
    {
      okbutton.setTitle("Merge this "+selectedStyles.length+" styles");

      mergecells.objectAtIndex(j).setCOSJSTargetFunction(function (sender) {
        if(selectedStyles.length > 1)
        {
          okbutton.setEnabled(true);
        }
      });
    }

    group.removeFromParent();
  }

  currentMergeMatrix = mergeMatrix;
}

function handleMergeTextStylesResponse(window, responseCode) {
  if (responseCode == "1000") {
    return true;
  }
  else {
    return false;
  }

  return null;
}

function handleMergeDuplicateTextStylesResponse(window, responseCode) {
   if (responseCode == "1000") {
        return "OK";
    }
    else if (responseCode == "1001") {
        return "DONT MERGE";
    }
    else if (responseCode == "1002") {
        return "CONTINUE LATER";
    }

    return null;
}






function getDuplicateLayerStyles(context, allStyles) {
    
  var layerStylesNames = [];
  var layerDuplicatedStylesNames = [];

  for (var i = 0; i < allStyles.length; i++) {
    var style = allStyles[i];

    var compareName = style.name.replace("(Lib)","");
    compareName = compareName.replace("(Ext)","");

    if(Helpers.getIndexOf(compareName,layerStylesNames)>-1){
      if(Helpers.getIndexOf(compareName,layerDuplicatedStylesNames)<0){
        layerDuplicatedStylesNames.push(compareName);
      }  
    }

    layerStylesNames.push(compareName);
  }

  return layerDuplicatedStylesNames;

}

function createStylesList(isLayerStyle,definedTextStyles, windowHeight,mergeDecisionList, emptyStateText,okbutton, context) {
  var cellWidth = 300;
  var cellHeight = 25;
  var matrixHeight = ((definedTextStyles.length+1) * cellHeight);


  mergeDecisionList.addSubview(emptyStateText);
  CreateMergeMatrix(isLayerStyle, [],mergeDecisionList, windowHeight,okbutton, 360, context);

  var buttonFormat = NSButtonCell.alloc().init();
  buttonFormat.setButtonType(NSSwitchButton);

  var matrix = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
    NSMakeRect(0, 0, cellWidth, matrixHeight),
    NSHighlightModeMatrix,
    buttonFormat,
    definedTextStyles.length,
    1
  );

  matrix.setCellSize(CGSizeMake(cellWidth, cellHeight));

  var cells = matrix.cells();
  for (var i = 0; i < definedTextStyles.length; i++) {

    if(definedTextStyles[i].name.length > 45)
    {
      var trimmedTitle = definedTextStyles[i].name.substring(0,44)+"...";
      cells.objectAtIndex(i).setTitle(trimmedTitle);
    }
    else
      cells.objectAtIndex(i).setTitle(definedTextStyles[i].name);

      //[matrix setToolTip:definedTextStyles[i].name forCell:[matrix cellAtRow:i column:0]];
      matrix.setToolTip_forCell(definedTextStyles[i].name, matrix.cellAtRow_column(i,0));
    cells.objectAtIndex(i).setCOSJSTargetFunction(function (sender) {

      var selectedStyles = [];
      var cells = matrix.cells();

      for (var i = 0; i < cells.length; i++) {
        if (cells.objectAtIndex(i).state() == 1) {
          selectedStyles.push(definedTextStyles[i]);
        }
      }


      if (selectedStyles.length > 1)
      {
        emptyStateText.removeFromSuperview();
      }
      else
        mergeDecisionList.addSubview(emptyStateText);

      CreateMergeMatrix(isLayerStyle, selectedStyles,mergeDecisionList, windowHeight,okbutton, 360, context);

    });
  }

  var listContainer = NSScrollView.alloc().initWithFrame(NSMakeRect(0, 30, cellWidth, windowHeight));
  listContainer.setDocumentView(matrix);
  listContainer.drawsBackground = false;



  if (windowHeight < matrixHeight)
    listContainer.setHasVerticalScroller(true);

  return listContainer;

}

function createMergeDecisionList(rect) {
  var mergeContainer = NSScrollView.alloc().initWithFrame(rect);
  mergeContainer.setHasVerticalScroller(false);
  return mergeContainer;
}

function createEmptyStateText(message, frame) {
  var boundingRect;
  if(frame!=null)
    boundingRect = frame;
  else
    boundingRect = NSMakeRect(80, 220, 250, 180);

  var textMessage = NSTextField.alloc().initWithFrame(boundingRect);
  textMessage.setBezeled(false);
  textMessage.setDrawsBackground(false);
  textMessage.setEditable(false);
  textMessage.setSelectable(false);
  textMessage.setStringValue(message);
  return textMessage;
}




export function MergeSimilarLayerStyles(context) {
  

  var window = NSAlert.alloc().init();
  var windowWidth = 700;
  var windowHeight = 500;
  var checkHeight=30;


  var windowTitle = "Merge similar layer styles";
  var windowInformativeText = "Choose the attributes you want to compare. We will find styles that share this same attributes and show them in the right list as a preview. When you're ready, hit 'Let's merge!' and you'll be able to merge them (or not) one by one.";
  window.setMessageText(windowTitle);
  window.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path()));
  window.setInformativeText(windowInformativeText);

  var content = Helpers.createView(NSMakeRect(0, 0, windowWidth, windowHeight));
  window.setAccessoryView(content);
  var okbutton = window.addButtonWithTitle("Let's merge!");
  okbutton.setEnabled(true);
  window.addButtonWithTitle("Cancel");

  var checkOptions=["Fill color", "Border color", "Border thickness", "Shadow color", "Shadow X,Y,Blur,Spread"];

  var cellWidth = 200;
  var cellHeight = 25;
  var matrixHeight = ((checkOptions.length+2) * cellHeight);
  var buttonFormat = NSButtonCell.alloc().init();
  buttonFormat.setButtonType(NSSwitchButton);

  var mergeDecisionList = createMergeDecisionList(NSMakeRect(210, checkHeight, 480, (windowHeight-checkHeight)));
  mergeDecisionList.drawsBackground = false;
  content.addSubview(mergeDecisionList);
  var emptyStateText = createEmptyStateText("Looks like there are no styles that share the same selected attributes.", NSMakeRect(60, 220, 400, 180));

  var matrix = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
    NSMakeRect(0, 0, cellWidth, matrixHeight),
    NSHighlightModeMatrix,
    buttonFormat,
    checkOptions.length,
    1
  );

  var stylesWithSimilarStyles;
  var totalStylesToMerge=0;

  matrix.setCellSize(CGSizeMake(cellWidth, cellHeight));

   var includeAllCheckbox = NSButton.alloc().initWithFrame(NSMakeRect(0,0,400,checkHeight))
    includeAllCheckbox.setButtonType(NSSwitchButton)
    includeAllCheckbox.setBezelStyle(0);
    includeAllCheckbox.setTitle("Include all enabled libraries styles (even if not in use)")
    includeAllCheckbox.setState(NSOffState) // or NSOnState

    includeAllCheckbox.setCOSJSTargetFunction(function (sender) {
      stylesWithSimilarStyles = LoadSimilarLayerStyles(context, matrix,mergeDecisionList, okbutton, windowHeight, checkOptions, emptyStateText, includeAllCheckbox);
      totalStylesToMerge = getTotalStylesWithSimilarStyles(stylesWithSimilarStyles);
    });

    content.addSubview(includeAllCheckbox);

  var cells = matrix.cells();
  for (var i = 0; i < checkOptions.length; i++) {
    
    cells.objectAtIndex(i).setTitle(checkOptions[i]);

    //Toggle on Fill color, Border color
    if(i<=1)
      cells.objectAtIndex(i).setState(NSOnState);
    
    
    cells.objectAtIndex(i).setCOSJSTargetFunction(function (sender) {
      stylesWithSimilarStyles = LoadSimilarLayerStyles(context, matrix,mergeDecisionList, okbutton, windowHeight, checkOptions, emptyStateText, includeAllCheckbox);
      totalStylesToMerge = getTotalStylesWithSimilarStyles(stylesWithSimilarStyles);
    });
  }


  stylesWithSimilarStyles = Helpers.FindAllSimilarLayerStyles(context, false,true,
                                                                            true,
                                                                            false,
                                                                            false,
                                                                            false
                                                                          );


    
  var headersStyleList = [];
  var countersStyleList=[];
  for (var i = 0; i < stylesWithSimilarStyles.length; i++) {
    if(stylesWithSimilarStyles[i].similarStyles.length>0)
    {
      headersStyleList.push(stylesWithSimilarStyles[i].referenceStyle);
      countersStyleList.push(stylesWithSimilarStyles[i].similarStyles.length);
      totalStylesToMerge++;
    }
  }

  if(headersStyleList.length>0)
    CreateMergeMatrix(true, headersStyleList,mergeDecisionList, windowHeight,okbutton, 480, context, true, countersStyleList);
  else
  {
      mergeDecisionList.addSubview(emptyStateText);
      okbutton.setEnabled(false);
  }

   
  

  var listContainer = NSScrollView.alloc().initWithFrame(NSMakeRect(0, 0, cellWidth, windowHeight));
  listContainer.setDocumentView(matrix);
  listContainer.drawsBackground = false;

  if (windowHeight < matrixHeight)
    listContainer.setHasVerticalScroller(true);


  content.addSubview(listContainer);

  var separator = Helpers.createSeparator(NSMakeRect(201, checkHeight, 1, (windowHeight-checkHeight)));
  content.addSubview(separator);

  

  var responseCode = handleMergeTextStylesResponse(window, window.runModal());
  if (responseCode) {
    MergeSimilarLayerStylesLoop(context, stylesWithSimilarStyles, totalStylesToMerge);
  }
    
}


export function MergeSimilarTextStyles(context) {
  

  var window = NSAlert.alloc().init();
  var windowWidth = 700;
  var windowHeight = 500;
  var checkHeight=30;

  

  var windowTitle = "Merge similar text styles";
  var windowInformativeText = "Choose the attributes you want to compare. We will find styles that share this same attributes and show them in the right list as a preview. When you're ready, hit 'Let's merge!' and you'll be able to merge them (or not) one by one.";
  window.setMessageText(windowTitle);
  window.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path()));
  window.setInformativeText(windowInformativeText);

  var content = Helpers.createView(NSMakeRect(0, 0, windowWidth, windowHeight));
  window.setAccessoryView(content);
  var okbutton = window.addButtonWithTitle("Let's merge!");
  okbutton.setEnabled(true);
  window.addButtonWithTitle("Cancel");

  var checkOptions=["Font family", "Font weight","Font size", "Color", "Alignment", "Character spacing", "Line height", "Paragraph spacing"];

  var cellWidth = 200;
  var cellHeight = 25;
  var matrixHeight = ((checkOptions.length+2) * cellHeight);
  var buttonFormat = NSButtonCell.alloc().init();
  buttonFormat.setButtonType(NSSwitchButton);

  var mergeDecisionList = createMergeDecisionList(NSMakeRect(210, checkHeight, 480, (windowHeight-checkHeight)));
  mergeDecisionList.drawsBackground = false;
  content.addSubview(mergeDecisionList);
  var emptyStateText = createEmptyStateText("Looks like there are no styles that share the same selected attributes.", NSMakeRect(60, 220, 400, 180));

  var matrix = NSMatrix.alloc().initWithFrame_mode_prototype_numberOfRows_numberOfColumns(
    NSMakeRect(0, 0, cellWidth, matrixHeight),
    NSHighlightModeMatrix,
    buttonFormat,
    checkOptions.length,
    1
  );

  var stylesWithSimilarStyles;
  var totalStylesToMerge=0;

  matrix.setCellSize(CGSizeMake(cellWidth, cellHeight));

   var includeAllCheckbox = NSButton.alloc().initWithFrame(NSMakeRect(0,0,400,checkHeight))
    includeAllCheckbox.setButtonType(NSSwitchButton)
    includeAllCheckbox.setBezelStyle(0);
    includeAllCheckbox.setTitle("Include all enabled libraries styles (even if not in use)")
    includeAllCheckbox.setState(NSOffState) // or NSOnState

    includeAllCheckbox.setCOSJSTargetFunction(function (sender) {
      stylesWithSimilarStyles = LoadSimilarTextStyles(context, matrix,mergeDecisionList, okbutton, windowHeight, checkOptions, emptyStateText, includeAllCheckbox);
      totalStylesToMerge = getTotalStylesWithSimilarStyles(stylesWithSimilarStyles);
    });

    content.addSubview(includeAllCheckbox);

  var cells = matrix.cells();
  for (var i = 0; i < checkOptions.length; i++) {
    
    cells.objectAtIndex(i).setTitle(checkOptions[i]);

    //Toggle on FontFamily, FontWeight, FontSize, Color
    if(i<=3)
      cells.objectAtIndex(i).setState(NSOnState);
    
    
    cells.objectAtIndex(i).setCOSJSTargetFunction(function (sender) {
      stylesWithSimilarStyles = LoadSimilarTextStyles(context, matrix,mergeDecisionList, okbutton, windowHeight, checkOptions, emptyStateText, includeAllCheckbox);
      totalStylesToMerge = getTotalStylesWithSimilarStyles(stylesWithSimilarStyles);
    });
  }


  stylesWithSimilarStyles = Helpers.FindAllSimilarTextStyles(context, false,true,
                                                                            true,
                                                                            true,
                                                                            true,
                                                                            false,
                                                                            false,
                                                                            false,
                                                                            false
                                                                          );
    
  var headersStyleList = [];
  var countersStyleList=[];
  for (var i = 0; i < stylesWithSimilarStyles.length; i++) {
    if(stylesWithSimilarStyles[i].similarStyles.length>0)
    {
      headersStyleList.push(stylesWithSimilarStyles[i].referenceStyle);
      countersStyleList.push(stylesWithSimilarStyles[i].similarStyles.length);
      totalStylesToMerge++;
    }
  }

  if(headersStyleList.length>0)
    CreateMergeMatrix(false, headersStyleList,mergeDecisionList, windowHeight,okbutton, 480, context, true, countersStyleList);
  else
  {
      mergeDecisionList.addSubview(emptyStateText);
      okbutton.setEnabled(false);
  }

   
  

  var listContainer = NSScrollView.alloc().initWithFrame(NSMakeRect(0, 0, cellWidth, windowHeight));
  listContainer.setDocumentView(matrix);
  listContainer.drawsBackground = false;

  if (windowHeight < matrixHeight)
    listContainer.setHasVerticalScroller(true);


  content.addSubview(listContainer);

  var separator = Helpers.createSeparator(NSMakeRect(201, checkHeight, 1, (windowHeight-checkHeight)));
  content.addSubview(separator);

  

  var responseCode = handleMergeTextStylesResponse(window, window.runModal());
  if (responseCode) {
    MergeSimilarTextStylesLoop(context, stylesWithSimilarStyles, totalStylesToMerge);
  }
    
}

function getTotalStylesWithSimilarStyles(stylesWithSimilarStyles)
{
  var totalStylesToMerge = 0;
  for (var i = 0; i < stylesWithSimilarStyles.length; i++) {
    if(stylesWithSimilarStyles[i].similarStyles.length>0)
    {
      totalStylesToMerge++;
    }
  }
  return totalStylesToMerge;
}

function MergeSimilarTextStylesLoop(context, stylesWithSimilarStyles, totalStylesToMerge){

  var continuous = true, skipped=false;
  var mergedTotalStyles = 0;
  var mergedResultingStyles = 0;
  var index=0;
  for(var k=0;k<stylesWithSimilarStyles.length;k++)
  {
    skipped=false;
    
    var textStyles = [];

    if(stylesWithSimilarStyles[k].similarStyles.length > 0)
    {
      index++;

      textStyles.push(stylesWithSimilarStyles[k].referenceStyle);
      for(var n=0;n<stylesWithSimilarStyles[k].similarStyles.length;n++)
      {
        textStyles.push(stylesWithSimilarStyles[k].similarStyles[n]);
      }
      

      var window = NSAlert.alloc().init();
      var windowWidth = 500;
      var windowHeight = 500;

      var windowTitle = "Merge similar text styles ("+index+" of "+totalStylesToMerge+")";
      var windowInformativeText = "You're about to merge this text styles. Choose the one you want to keep and press Merge. The style you decided to keep will be applied to all layers (and overrides) using the discarded styles, and the discarded styles will be removed.";
      window.setMessageText(windowTitle);
      window.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path()));
      window.setInformativeText(windowInformativeText);


      var content = Helpers.createView(NSMakeRect(0, 0, windowWidth, windowHeight));
      window.setAccessoryView(content);
      var okbutton = window.addButtonWithTitle("Choose the style to keep");
      okbutton.setEnabled(false);
      window.addButtonWithTitle("Don't merge this one");
      window.addButtonWithTitle("Continue later");

      var mergeDecisionList = createMergeDecisionList(NSMakeRect(0, 0, windowWidth, windowHeight));
      mergeDecisionList.drawsBackground = false;
      content.addSubview(mergeDecisionList);

      
      CreateMergeMatrix(false,textStyles,mergeDecisionList, windowHeight,okbutton, windowWidth, context);

      var responseCode = handleMergeDuplicateTextStylesResponse(window, window.runModal());
      if(responseCode == "OK"){
        MergeTextStyles(context);
        mergedTotalStyles += textStyles.length;
        mergedResultingStyles+=1;
      }
      else if(responseCode == "CONTINUE LATER")
      {
          if(mergedResultingStyles>0)
            context.document.showMessage("Cool, we'll continue later! Meanwhile, "+mergedTotalStyles+Helpers.GetTextBasedOnCount(mergedTotalStyles)+"were merged into "+k+Helpers.GetTextBasedOnCount(k));
          else
            context.document.showMessage("Cool, we'll continue later! Meanwhile, no text styles were merged");
            
          continuous = false;
      }
      else if(responseCode == "DONT MERGE")
      {
        skipped=true;
      }

      if(!continuous)
          break;
    }
  }

  if(continuous)
  {
      if(mergedResultingStyles>0)
      {
        context.document.showMessage("Hey ho! "+mergedTotalStyles+Helpers.GetTextBasedOnCount(mergedTotalStyles)+"were merged into "+mergedResultingStyles+Helpers.GetTextBasedOnCount(mergedResultingStyles));
      }
      else
      {
          if(!skipped)
            context.document.showMessage("It seems there are no styles (with the same name) to merge");
          else
            context.document.showMessage("Sure, let's continue later.");

          return null;
      }
  }
}


function MergeSimilarLayerStylesLoop(context, stylesWithSimilarStyles, totalStylesToMerge){

  var continuous = true, skipped=false;
  var mergedTotalStyles = 0;
  var mergedResultingStyles = 0;
  var index=0;
  for(var k=0;k<stylesWithSimilarStyles.length;k++)
  {
    skipped=false;
    
    var layerStyles = [];

    if(stylesWithSimilarStyles[k].similarStyles.length > 0)
    {
      index++;

      layerStyles.push(stylesWithSimilarStyles[k].referenceStyle);
      for(var n=0;n<stylesWithSimilarStyles[k].similarStyles.length;n++)
      {
        layerStyles.push(stylesWithSimilarStyles[k].similarStyles[n]);
      }
      

      var window = NSAlert.alloc().init();
      var windowWidth = 500;
      var windowHeight = 500;

      var windowTitle = "Merge similar text styles ("+index+" of "+totalStylesToMerge+")";
      var windowInformativeText = "You're about to merge this layer styles. Choose the one you want to keep and press Merge. The style you decided to keep will be applied to all layers (and overrides) using the discarded styles, and the discarded styles will be removed.";
      window.setMessageText(windowTitle);
      window.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path()));
      window.setInformativeText(windowInformativeText);


      var content = Helpers.createView(NSMakeRect(0, 0, windowWidth, windowHeight));
      window.setAccessoryView(content);
      var okbutton = window.addButtonWithTitle("Choose the style to keep");
      okbutton.setEnabled(false);
      window.addButtonWithTitle("Don't merge this one");
      window.addButtonWithTitle("Continue later");

      var mergeDecisionList = createMergeDecisionList(NSMakeRect(0, 0, windowWidth, windowHeight));
      mergeDecisionList.drawsBackground = false;
      content.addSubview(mergeDecisionList);

      
      CreateMergeMatrix(true,layerStyles,mergeDecisionList, windowHeight,okbutton, windowWidth, context);

      var responseCode = handleMergeDuplicateTextStylesResponse(window, window.runModal());
      if(responseCode == "OK"){
        MergeLayerStyles(context);
        mergedTotalStyles += layerStyles.length;
        mergedResultingStyles+=1;
      }
      else if(responseCode == "CONTINUE LATER")
      {
          if(mergedResultingStyles>0)
            context.document.showMessage("Cool, we'll continue later! Meanwhile, "+mergedTotalStyles+Helpers.GetTextBasedOnCount(mergedTotalStyles)+"were merged into "+k+Helpers.GetTextBasedOnCount(k));
          else
            context.document.showMessage("Cool, we'll continue later! Meanwhile, no text styles were merged");
            
          continuous = false;
      }
      else if(responseCode == "DONT MERGE")
      {
        skipped=true;
      }

      if(!continuous)
          break;
    }
  }

  if(continuous)
  {
      if(mergedResultingStyles>0)
      {
        context.document.showMessage("Hey ho! "+mergedTotalStyles+Helpers.GetTextBasedOnCount(mergedTotalStyles)+"were merged into "+mergedResultingStyles+Helpers.GetTextBasedOnCount(mergedResultingStyles));
      }
      else
      {
          if(!skipped)
            context.document.showMessage("It seems there are no styles (with the same name) to merge");
          else
            context.document.showMessage("Sure, let's continue later.");

          return null;
      }
  }
}

function LoadSimilarLayerStyles(context, matrix,mergeDecisionList, okbutton, windowHeight, checkOptions, emptyStateText, includeAllCheckbox){
  var selectedOptions = [];
  var cells = matrix.cells();
  var checked = (includeAllCheckbox.stringValue()==1);

  for (var i = 0; i < cells.length; i++) {
    if (cells.objectAtIndex(i).state() == 1) {
      selectedOptions.push(checkOptions[i]);
    }
  }

  //TODO Use checkbox to bool include all libraries
  var stylesWithSimilarStyles = Helpers.FindAllSimilarLayerStyles(context, checked,selectedOptions.indexOf("Fill color")>-1,
                                                                        selectedOptions.indexOf("Border color")>-1,
                                                                        selectedOptions.indexOf("Border thickness")>-1,
                                                                        selectedOptions.indexOf("Shadow color")>-1,
                                                                        selectedOptions.indexOf("Shadow X,Y,Blur,Spread")>-1
                                                                      );

  var headersStyleList = [];
  var countersStyleList=[];
  for (var i = 0; i < stylesWithSimilarStyles.length; i++) {
    if(stylesWithSimilarStyles[i].similarStyles.length>0)
    {
      headersStyleList.push(stylesWithSimilarStyles[i].referenceStyle);
      countersStyleList.push(stylesWithSimilarStyles[i].similarStyles.length);
    }
  }


  emptyStateText.removeFromSuperview();
  
  if(headersStyleList.length<=0)
  {
      mergeDecisionList.addSubview(emptyStateText);
      okbutton.setEnabled(false);
  }
  else
      okbutton.setEnabled(true);

  CreateMergeMatrix(true, headersStyleList,mergeDecisionList, windowHeight,okbutton, 480, context, true, countersStyleList);

  return stylesWithSimilarStyles;
}

function LoadSimilarTextStyles(context, matrix,mergeDecisionList, okbutton, windowHeight, checkOptions, emptyStateText, includeAllCheckbox){
  var selectedOptions = [];
  var cells = matrix.cells();
  var checked = (includeAllCheckbox.stringValue()==1);

  for (var i = 0; i < cells.length; i++) {
    if (cells.objectAtIndex(i).state() == 1) {
      selectedOptions.push(checkOptions[i]);
    }
  }

  //TODO Use checkbox to bool include all libraries
  var stylesWithSimilarStyles = Helpers.FindAllSimilarTextStyles(context, checked,selectedOptions.indexOf("Font family")>-1,
                                                                        selectedOptions.indexOf("Font weight")>-1,
                                                                        selectedOptions.indexOf("Font size")>-1,
                                                                        selectedOptions.indexOf("Color")>-1,
                                                                        selectedOptions.indexOf("Paragraph spacing")>-1,
                                                                        selectedOptions.indexOf("Line height")>-1,
                                                                        selectedOptions.indexOf("Alignment")>-1,
                                                                        selectedOptions.indexOf("Character spacing")>-1
                                                                      );

  var headersStyleList = [];
  var countersStyleList=[];
  for (var i = 0; i < stylesWithSimilarStyles.length; i++) {
    if(stylesWithSimilarStyles[i].similarStyles.length>0)
    {
      headersStyleList.push(stylesWithSimilarStyles[i].referenceStyle);
      countersStyleList.push(stylesWithSimilarStyles[i].similarStyles.length);
    }
  }


  emptyStateText.removeFromSuperview();
  
  if(headersStyleList.length<=0)
  {
      mergeDecisionList.addSubview(emptyStateText);
      okbutton.setEnabled(false);
  }
  else
      okbutton.setEnabled(true);

  CreateMergeMatrix(false, headersStyleList,mergeDecisionList, windowHeight,okbutton, 480, context, true, countersStyleList);

  return stylesWithSimilarStyles;
}

export function MergeSelectedTextStyles(context) {

    var doc = context.document;
    var definedTextStyles = Helpers.getDefinedTextStyles(context, false,null);

    if(definedTextStyles.length > 1)
    {

      var window = NSAlert.alloc().init();
      var windowWidth = 700;
      var windowHeight = 500;
      var checkHeight=30;

      

      var windowTitle = "Merge text styles (from list)";
      var windowInformativeText = "Select the styles you want to merge from the list on the left, choose the one you want to keep on the right list, and hit Merge. The style you decided to keep will be applied to all layers (and overrides) using the discarded styles, and the discarded styles will be removed.";
      window.setMessageText(windowTitle);
      window.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path()));
      window.setInformativeText(windowInformativeText);


      var emptyStateText = createEmptyStateText("Please, choose at least 2 Text Styles you'd like to merge from the list on the left.");
      var mergeDecisionList = createMergeDecisionList(NSMakeRect(310, checkHeight, 380, (windowHeight-checkHeight)));

      var content = Helpers.createView(NSMakeRect(0, 0, windowWidth, windowHeight));
      window.setAccessoryView(content);
      var okbutton = window.addButtonWithTitle("Choose the style to keep");
      okbutton.setEnabled(false);
      window.addButtonWithTitle("Cancel");

      var stylesList = createStylesList(false, definedTextStyles, (windowHeight-checkHeight),mergeDecisionList,emptyStateText,okbutton, context);
      content.addSubview(stylesList);

      var separator = Helpers.createSeparator(NSMakeRect(301, checkHeight, 1, (windowHeight-checkHeight)));
      content.addSubview(separator);

      mergeDecisionList.drawsBackground = false;
      content.addSubview(mergeDecisionList);

      mergeDecisionList.addSubview(emptyStateText);

      var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(0,0,400,checkHeight))
      checkbox.setButtonType(NSSwitchButton)
      checkbox.setBezelStyle(0);
      checkbox.setTitle("Include all enabled libraries styles (even if not in use)")
      checkbox.setState(NSOffState) // or NSOnState

      checkbox.setCOSJSTargetFunction(function (sender) {
        var checked = (checkbox.stringValue()==1);
        stylesList.removeFromSuperview();
        stylesList = createStylesList(false, Helpers.getDefinedTextStyles(context, checked,null), (windowHeight-checkHeight),mergeDecisionList,emptyStateText,okbutton, context);
        content.addSubview(stylesList);
      });

      content.addSubview(checkbox);

      var responseCode = handleMergeTextStylesResponse(window, window.runModal());
      if (responseCode) {
        MergeTextStyles(context);
      }
    }
    else if(definedTextStyles.length == 1)
      doc.showMessage("There's only 1 text style. No need to merge.");
    else
      doc.showMessage("Looks like there are no text styles.");

};

export function MergeDuplicateTextStyles(context) {

    var doc = context.document;
    var duplicateTextStylesNames = getDuplicateLayerStyles(context,Helpers.getDefinedTextStyles(context,false,null));
    if(duplicateTextStylesNames.length > 0)
      LaunchMergeTextStylesWindow(duplicateTextStylesNames, context);
    else
      doc.showMessage("Looks like there are no text styles with the same name.");

        
};

export function MergeDuplicateLayerStyles(context) {

    var doc = context.document;
    var duplicateLayerStylesNames = getDuplicateLayerStyles(context, Helpers.getDefinedLayerStyles(context,false, null));
    if(duplicateLayerStylesNames.length > 0)
      LaunchMergeLayerStylesWindow(duplicateLayerStylesNames, context);
    else
      doc.showMessage("Looks like there are no layer styles with the same name.");
        
};

export function MergeSelectedLayerStyles(context) {

    var doc = context.document;
    var definedLayerStyles = Helpers.getDefinedLayerStyles(context, false, null);
    
    if(definedLayerStyles.length > 1)
    {
      var window = NSAlert.alloc().init();
      var windowWidth = 700;
      var windowHeight = 500;
      var checkHeight=30;

      
    
      var windowTitle = "Merge layer styles (from list)";
      var windowInformativeText = "Select the styles you want to merge from the list on the left, choose the one you want to keep on the right list, and hit Merge. The style you decided to keep will be applied to all layers (and overrides) using the discarded styles, and the discarded styles will be removed.";
      window.setMessageText(windowTitle);
      window.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path()));
      window.setInformativeText(windowInformativeText);


      var emptyStateText = createEmptyStateText("Please, choose at least 2 Layer Styles you'd like to merge from the list on the left.");
      var mergeDecisionList = createMergeDecisionList(NSMakeRect(310, checkHeight, 380, (windowHeight-checkHeight)));

      var content = Helpers.createView(NSMakeRect(0, 0, windowWidth, windowHeight));
      window.setAccessoryView(content);
      var okbutton = window.addButtonWithTitle("Choose the style to keep");
      okbutton.setEnabled(false);
      window.addButtonWithTitle("Cancel");

      var stylesList = createStylesList(true, definedLayerStyles, (windowHeight-checkHeight),mergeDecisionList,emptyStateText,okbutton, context);
      content.addSubview(stylesList);

      var separator = Helpers.createSeparator(NSMakeRect(301, checkHeight, 1, (windowHeight-checkHeight)));
      content.addSubview(separator);

      mergeDecisionList.drawsBackground = true;
      content.addSubview(mergeDecisionList);


      var checkbox = NSButton.alloc().initWithFrame(NSMakeRect(0,0,400,checkHeight))
      checkbox.setButtonType(NSSwitchButton)
      checkbox.setBezelStyle(0);
      checkbox.setTitle("Include all enabled libraries styles (even if not in use)")
      checkbox.setState(NSOffState) // or NSOnState

      checkbox.setCOSJSTargetFunction(function (sender) {
        var checked = (checkbox.stringValue()==1);


        stylesList.removeFromSuperview();
        stylesList = createStylesList(true, Helpers.getDefinedLayerStyles(context, checked, null), (windowHeight-checkHeight),mergeDecisionList,emptyStateText,okbutton, context);
        content.addSubview(stylesList);
      });

      content.addSubview(checkbox);


      var responseCode = handleMergeTextStylesResponse(window, window.runModal());
      if (responseCode) {
        MergeLayerStyles(context);
      }
    }
    else if(definedLayerStyles.length == 1)
      doc.showMessage("There's only 1 layer style. No need to merge.");
    else
      doc.showMessage("Looks like there are no layer styles.");

};

function LaunchMergeTextStylesWindow(duplicateTextStylesNames, context){

  var continuous = true, skipped=false;
  var mergedTotalStyles = 0;
  var mergedResultingStyles = 0;

  for(var k=0;k<duplicateTextStylesNames.length;k++)
  {
    skipped=false;
    var compareName = duplicateTextStylesNames[k].replace("(Lib)","");
    compareName = compareName.replace("(Ext)","");
    var textStyles = Helpers.getDefinedTextStyles(context,false, compareName);

    var window = NSAlert.alloc().init();
    var windowWidth = 500;
    var windowHeight = 500;

    var windowTitle = "Merge text styles with the same name ("+(k+1)+" of "+duplicateTextStylesNames.length+")";
    var windowInformativeText = "You're about to merge this text styles. Choose the one you want to keep and press Merge. The style you decided to keep will be applied to all layers (and overrides) using the discarded styles, and the discarded styles will be removed.";
    window.setMessageText(windowTitle);
    window.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path()));
    window.setInformativeText(windowInformativeText);


    var content = Helpers.createView(NSMakeRect(0, 0, windowWidth, windowHeight));
    window.setAccessoryView(content);
    var okbutton = window.addButtonWithTitle("Choose the style to keep");
    okbutton.setEnabled(false);
    window.addButtonWithTitle("Don't merge this one");
    window.addButtonWithTitle("Continue later");

    var mergeDecisionList = createMergeDecisionList(NSMakeRect(0, 0, windowWidth, windowHeight));
    mergeDecisionList.drawsBackground = false;
    content.addSubview(mergeDecisionList);

    
    CreateMergeMatrix(false,textStyles,mergeDecisionList, windowHeight,okbutton, windowWidth, context);

    var responseCode = handleMergeDuplicateTextStylesResponse(window, window.runModal());
    if(responseCode == "OK"){
      MergeTextStyles(context);
      mergedTotalStyles += textStyles.length;
      mergedResultingStyles+=1;
    }
    else if(responseCode == "CONTINUE LATER")
    {
        if(mergedResultingStyles>0)
          context.document.showMessage("Cool, we'll continue later! Meanwhile, "+mergedTotalStyles+Helpers.GetTextBasedOnCount(mergedTotalStyles)+"were merged into "+k+Helpers.GetTextBasedOnCount(k));
        else
          context.document.showMessage("Cool, we'll continue later! Meanwhile, no text styles were merged");
          
        continuous = false;
    }
    else if(responseCode == "DONT MERGE")
    {
      skipped=true;
    }

    if(!continuous)
        break;
  }

  if(continuous)
  {
      if(mergedResultingStyles>0)
      {
        context.document.showMessage("Hey ho! "+mergedTotalStyles+Helpers.GetTextBasedOnCount(mergedTotalStyles)+"were merged into "+mergedResultingStyles+Helpers.GetTextBasedOnCount(mergedResultingStyles));
      }
      else
      {
          if(!skipped)
            context.document.showMessage("It seems there are no styles (with the same name) to merge");
          else
            context.document.showMessage("Sure, let's continue later.");

          return null;
      }
  }
}

function LaunchMergeLayerStylesWindow(duplicateLayerStylesNames, context){

  var continuous = true, skipped=false;
  var mergedTotalStyles = 0;
  var mergedResultingStyles = 0;

  for(var k=0;k<duplicateLayerStylesNames.length;k++)
  {
    skipped=false;
    var layerStyles=[];
    var layerStyles = Helpers.getDefinedLayerStyles(context,false, duplicateLayerStylesNames[k]);

    var window = NSAlert.alloc().init();
    var windowWidth = 500;
    var windowHeight = 500;

    var windowTitle = "Merge layer styles with the same name ("+(k+1)+" of "+duplicateLayerStylesNames.length+")";
    var windowInformativeText = "You're about to merge this layer styles. Choose the one you want to keep and press Merge. The style you decided to keep will be applied to all layers (and overrides) using the discarded styles, and the discarded styles will be removed.";
    window.setMessageText(windowTitle);
    window.setIcon(NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path()));
    window.setInformativeText(windowInformativeText);


    var content = Helpers.createView(NSMakeRect(0, 0, windowWidth, windowHeight));
    window.setAccessoryView(content);
    var okbutton = window.addButtonWithTitle("Choose the style to keep");
    okbutton.setEnabled(false);
    window.addButtonWithTitle("Don't merge this one");
    window.addButtonWithTitle("Continue later");

    var mergeDecisionList = createMergeDecisionList(NSMakeRect(0, 0, windowWidth, windowHeight));
    mergeDecisionList.drawsBackground = false;
    content.addSubview(mergeDecisionList);

    
    CreateMergeMatrix(true,layerStyles,mergeDecisionList, windowHeight,okbutton, windowWidth, context);

    var responseCode = handleMergeDuplicateTextStylesResponse(window, window.runModal());
    if(responseCode == "OK"){
      MergeLayerStyles(context);
      mergedTotalStyles += layerStyles.length;
      mergedResultingStyles+=1;
    }
    else if(responseCode == "CONTINUE LATER")
    {
        if(mergedResultingStyles>0)
          context.document.showMessage("Cool, we'll continue later! Meanwhile, "+mergedTotalStyles+Helpers.GetTextBasedOnCount(mergedTotalStyles)+"were merged into "+k+Helpers.GetTextBasedOnCount(k));
        else
          context.document.showMessage("Cool, we'll continue later! Meanwhile, no layer styles were merged");
          
        continuous = false;
    }
    else if(responseCode == "DONT MERGE")
    {
      skipped=true;
    }


    if(!continuous)
        break;
  }

  if(continuous)
  {
      if(mergedResultingStyles>0)
      {
        context.document.showMessage("Hey ho! "+mergedTotalStyles+Helpers.GetTextBasedOnCount(mergedTotalStyles)+"were merged into "+mergedResultingStyles+Helpers.GetTextBasedOnCount(mergedResultingStyles));
      }
      else
      {
          if(!skipped)
            context.document.showMessage("It seems there are no styles (with the same name) to merge");
          else
            context.document.showMessage("Sure, let's continue later.");

          return null;
      }
  }
}
