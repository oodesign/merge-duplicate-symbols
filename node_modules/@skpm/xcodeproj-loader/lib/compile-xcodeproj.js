const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

function addDependencies(addDependency, filePath) {
  function walk(currentPath) {
    if (fs.statSync(currentPath).isDirectory()) {
      const content = fs.readdirSync(currentPath);
      content.forEach((c) => walk(path.join(currentPath, c)));
    } else {
      addDependency(currentPath);
    }
  }

  walk(filePath);
}

module.exports = function compileNib(loader, projectPath, outputPath, cb) {
  // Tell webpack to cache the compiled file and to track changes to the source files
  if (loader.cacheable) {
    loader.cacheable();
  }

  addDependencies(
    loader.addDependency ? loader.addDependency.bind(loader) : () => {},
    path.dirname(projectPath),
  );

  const projectFile = path.join(projectPath, 'project.xcworkspace');
  const scheme = path.basename(projectPath, path.extname(projectPath));

  execFile(
    'xcodebuild',
    [
      'build',
      '-workspace',
      fs.existsSync(projectFile) ? projectFile : projectPath,
      '-scheme',
      scheme,
      '-configuration',
      'release',
      '-quiet',
      '-derivedDataPath',
      outputPath,
      'COMMAND_LINE_BUILD=1',
    ],
    { 
      encoding: 'utf8',
      maxBuffer: 200 * 1024 * 1024, // default 200 * 1024
    },
    (error) => cb(error),
  );
};
