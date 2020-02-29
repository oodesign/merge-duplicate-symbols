'use strict';

exports.__esModule = true;
exports.xcodeprojLoader = exports.nibLoader = exports.commandResourceLoader = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const WEBPACK_DIRECTORY = '_webpack_resources';

const resourceRegex = /^(?!.*\.(jsx?|tsx?|json|nib|xib|framework|xcodeproj|xcworkspace|xcworkspacedata|pbxproj)$).*/; // match everything except .jsx?, .tsx?, json, xib and nib

const commandResourceLoader = exports.commandResourceLoader = {
  test: resourceRegex,
  use: {
    loader: '@skpm/file-loader',
    query: {
      raw: true,
      outputPath(url) {
        return _path2.default.posix.join('..', 'Resources', WEBPACK_DIRECTORY, url);
      },
      publicPath(url) {
        return `"file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/${WEBPACK_DIRECTORY}/${url}"`;
      }
    }
  }
};

const nibRegex = /\.(nib|xib)?$/; // match xib or nib

const nibLoader = exports.nibLoader = {
  test: nibRegex,
  use: {
    loader: '@skpm/nib-loader',
    query: {
      raw: true,
      outputPath(url) {
        return _path2.default.posix.join('..', 'Resources', WEBPACK_DIRECTORY, url);
      },
      publicPath(url) {
        return `${WEBPACK_DIRECTORY}/${url}`;
      }
    }
  }
};

const xcodeprojRegex = /\.(framework|xcodeproj|xcworkspace|xcworkspacedata|pbxproj)?$/; // match xcodeproj

const xcodeprojLoader = exports.xcodeprojLoader = {
  test: xcodeprojRegex,
  use: {
    loader: '@skpm/xcodeproj-loader',
    query: {
      raw: true,
      outputPath(url) {
        return _path2.default.posix.join('..', 'Resources', WEBPACK_DIRECTORY, url);
      },
      publicPath(url) {
        return `${WEBPACK_DIRECTORY}/${url}`;
      }
    }
  }
};