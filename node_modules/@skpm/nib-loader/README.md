# Nib Loader

_Instructs WebPack to compile and emit the required XIB or NIB as file and to return an function to interact with it._

## Install

> ⚠️  The loader is already included in skpm by default so if you come from skpm, you do not have to do anything.

```bash
npm install --save-dev @skpm/nib-loader
```

Add the following rule to your WebPack config:

```js
{
  test: /\.(xib|nib)$/,
  use: [
    {
      loader: '@skpm/nib-loader',
      options: {}
    }
  ]
}
```

## Usage

- Create a new xib file:
  - open XCode and create a new "Cocoa Framework" project located in your skpm project with the "Objective-C" language.
  - create a new file with the "View" template
  - Use the Interface Builder to design your view
- Add the following in your plugin command:

  ```js
  const NibUI = require('../xcode-project-name/view-name.xib')

  var nib = NibUI()

  let dialog = NSAlert.alloc().init()
  dialog.setAccessoryView(nib.getRoot())
  dialog.runModal()
  ```

  The `NibUI` function returns an object with 2 methods:

  - `getRoot` which returns the root view
  - `getOwner` which returns the File Owner Class instance

  The object will also be populated with the Views that have an Identifier set. For example, let's say your nib contains a view with the identifier `button`. Then you can access this view using `nib.button`.

### Handling events from the xib

You might need to handle some events happening in your view (for example when the user clicks on a button).

TBD (to be documented)

## Options

Same as [file-loader](https://github.com/skpm/file-loader).
