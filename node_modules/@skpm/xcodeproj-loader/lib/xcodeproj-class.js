/* eslint-disable no-var, prefer-template, prefer-arrow-callback, global-require, no-param-reassign, vars-on-top */
/* globals NSClassFromString, __command, __mocha__, NSURL */

var CONTAINS_EXT = /\.framework$/;

function xcodeprojClass(frameworkName) {
  if (typeof __command === 'undefined' || !__command.pluginBundle()) {
    throw new Error('missing plugin bundle :thinking_face:');
  }

  if (CONTAINS_EXT.test(frameworkName)) {
    frameworkName = frameworkName.replace(CONTAINS_EXT, '');
  }

  var frameworkPath = __command
    .pluginBundle()
    .url()
    .path()
    .stringByAppendingPathComponent('Contents')
    .stringByAppendingPathComponent('Resources');

  var parts = frameworkName.split('/');
  parts.forEach(function fixPath(part, i) {
    if (i !== parts.length - 1) {
      frameworkPath = frameworkPath.stringByAppendingPathComponent(part);
    } else {
      frameworkName = part;
    }
  });

  return {
    getClass(className) {
      var existingClass = NSClassFromString(className);
      if (!existingClass) {
        if (
          !__mocha__.loadFrameworkWithName_inDirectory(
            frameworkName,
            frameworkPath,
          )
        ) {
          throw new Error("Couldn't load framework " + frameworkName);
        }
        existingClass = NSClassFromString(className);
      }

      if (!existingClass) {
        throw new Error("Couldn't find class " + className);
      }

      return existingClass;
    },
    getNib(nibName, delegate) {
      var bundleURL = NSURL.fileURLWithPath(
        frameworkPath.stringByAppendingPathComponent(frameworkName) +
          '.framework',
      );

      try {
        return require('@skpm/nib-loader/lib/nib-class')(
          nibName,
          delegate,
          bundleURL,
        );
      } catch (err) {
        if (
          !__mocha__.loadFrameworkWithName_inDirectory(
            frameworkName,
            frameworkPath,
          )
        ) {
          throw new Error("Couldn't load framework " + frameworkName);
        }

        return require('@skpm/nib-loader/lib/nib-class')(
          nibName,
          delegate,
          bundleURL,
        );
      }
    },
  };
}

module.exports = xcodeprojClass;
