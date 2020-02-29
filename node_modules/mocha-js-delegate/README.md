# MochaJSDelegate

## What is it?

`MochaJSDelegate` is a way for scripts written in CocoaScript ([Mocha](https://github.com/logancollins/Mocha)) to create delegates for use with native Obj-C classes. This was originally written for use in Sketch 3+.

## How do I use it?

The following example will create a `WebView` and set its frame delegate:

```javascript
const sketch = require("sketch");
const MochaJSDelegate = require("mocha-js-delegate");

/*
  This is so our script's JSContext sticks around,
  instead of being destroyed as soon as the current execution block is finished.
*/
const fiber = sketch.Async.createFiber();

// Create a WebView
var webView = WebView.new();

// Create a delegate
var delegate = new MochaJSDelegate({
  // define a property
  counter: 1,

  // define an instance method
  "webView:didFinishLoadForFrame:": function(webView, webFrame) {
    // access counter
    const counter = this.counter;
    sketch.UI.message("Loaded! " + counter);

    fiber.cleanup();
  }
});

// Set WebView's frame load delegate
webView.setFrameLoadDelegate(
  delegate.new({
    // set the property during the initialisation
    counter: 4
  })
);
webView.setMainFrameURL("http://google.com/");
```

There are a few other convenience methods `MochaJSDelegate` makes available, for more information check out the source.

## How does it work?

`MochaJSDelegate` leverages [Mocha's](https://github.com/logancollins/Mocha) methods for manipulating the Objective-C runtime. Each delegate creates an `NSObject` subclass, creates method implementations corresponding to your selectors, and ensures that your function is invoked when they are called. (Mocha makes this really easy, once you wade through the source and figure it all out.)

## Notes/Caveats:

- Every time you create a `MochaJSDelegate`, a new `NSObject` subclass is created. I've taken pains to ensure none of them is likely to conflict with any others floating around the runtime, so the only issue one might have is a bunch of classes being created in the runtime.
