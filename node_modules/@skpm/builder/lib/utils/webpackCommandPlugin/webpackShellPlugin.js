'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.sketchtoolRunCommand = sketchtoolRunCommand;
exports.default = WebpackShellPlugin;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _semver = require('semver');

var _semver2 = _interopRequireDefault(_semver);

var _getSketchPath = require('@skpm/internal-utils/get-sketch-path');

var _getSketchPath2 = _interopRequireDefault(_getSketchPath);

var _exec = require('@skpm/internal-utils/exec');

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sketchtoolRunCommand(output, commandIdentifier, options = {}) {
  let command = '';

  if (options.pre) {
    command += options.pre;
    command += ' ';
  }

  command += `"${(0, _getSketchPath2.default)(options.app || process.env.SKETCH_PATH)}/Contents/Resources/sketchtool/bin/sketchtool" run "${output}" "${commandIdentifier}"`;

  if (options.withoutActivating) {
    command += ' --without-activating';
  }

  if (options.waitForExit) {
    command += ' --wait-for-exit';
  }

  if (options.withoutWaitingForPlugin) {
    command += ' --without-waiting-for-plugin';
  }

  if (options.context) {
    command += ` --context="${JSON.stringify(options.context).replace(/"/g, '\\"')}"`;
  }

  if (options.post) {
    command += ' ';
    command += options.post;
  }

  if (options.handleError === false) {
    return command;
  }

  const handleError =
  // check if the run command doesn't exist
  'if (echo "$res" | grep "Unknown command ‘run’"); then ' + 'echo "Only available on Sketch 43+"; ' +
  // check if we can't find sketch
  'elif (echo "$res" | grep "such file or directory"); then ' + 'echo "Looks like we can\'t find Sketch.app.\\nYou can specify where to look for it by running:\\n\\necho \\"sketchPath: ABSOLUTE/PATH/TO/Sketch.app\\" > ~/.skpmrc"; ' +
  // not sure why else doesn't work
  'elif (true); then ' + 'echo "$res"; ' + 'fi';

  // run the command and redirect the stderr to stdout so that we can check against it
  return `res=$(${command} 2>&1); ${handleError}`;
}

function WebpackShellPlugin(options) {
  return {
    apply(compiler) {
      compiler.hooks.beforeCompile.tapPromise('ShutdownExistingPlugin', () => {
        if (!options || !options.pluginIdentifier) {
          return Promise.resolve({ stdout: '' });
        }
        return (0, _exec.exec)(sketchtoolRunCommand(_path2.default.join(__dirname, '../../../shutdown-plugin.sketchplugin'), 'shutdown-plugin', _extends({}, options.sketchVersion && _semver2.default.satisfies(options.sketchVersion, '>= 45.0.0') ? { withoutActivating: true } : {}, {
          context: { pluginIdentifier: options.pluginIdentifier },
          app: options.app
        })), {
          shell: '/bin/bash'
        }).catch(() => {});
      });

      compiler.hooks.afterEmit.tapPromise('Run Sketch Command', () => {
        if (!options || !options.script) {
          return Promise.resolve();
        }

        return (0, _exec.exec)(options.script, {
          shell: '/bin/bash',
          maxBuffer: 1024 * 1000 // 1mb
        }).then(res => {
          if (res.stderr) {
            console.error(res.stderr);
          }
          if (res.stdout.trim().length > 0) {
            res.stdout.trim().split('\n').forEach(line => {
              console.log(line);
            });
          }
        }).catch(err => {
          console.error(`${_chalk2.default.red('error')} Error while running the command after build`);
          console.error(err);
          throw err;
        });
      });
    }
  };
}