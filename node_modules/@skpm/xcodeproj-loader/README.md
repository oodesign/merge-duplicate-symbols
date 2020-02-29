# Xcodeproj Loader

_Instructs WebPack to compile and emit the required xcodeproj as file and to return an object to interact with it._

## Install

> ⚠️ The loader is already included in skpm by default so if you come from skpm, you do not have to do anything.

```bash
npm install --save-dev @skpm/xcodeproj-loader
```

Add the following rule to your WebPack config:

```js
{
  test: /\.(framework|xcodeproj|xcworkspace|xcworkspacedata|pbxproj)$/,
  use: [
    {
      loader: '@skpm/xcodeproj-loader',
      options: {}
    }
  ]
}
```

## Usage

- Create a new framework
- Add the following in your plugin command:

  ```js
  const framework = require('../xcode-project-name/project-name.xcodeproj/project.pbxproj');

  const nativeClass = framework.getClass('NativeClassName');
  const ui = framework.getNib('NativeNibFile');
  ```

## Options

Same as [file-loader](https://github.com/skpm/file-loader).
