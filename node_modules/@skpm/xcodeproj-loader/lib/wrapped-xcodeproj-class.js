const path = require('path');

module.exports = function xcodeprojClass(frameworkName) {
  return `module.exports = require('${
    path.resolve(__dirname, 'xcodeproj-class.js')
  }')('${frameworkName}');`;
};
