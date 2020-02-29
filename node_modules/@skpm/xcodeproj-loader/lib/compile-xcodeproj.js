const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

function addDependencies(addDependency, filePath) {
  function walk(currentPath) {
    if (fs.statSync(currentPath).isDirectory()) {
      const content = fs.readdirSync(currentPath);
      content.forEach(c => walk(path.join(currentPath, c)));
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

  execFile(
    'xcodebuild',
    ['build', '-workspace', projectPath, '-scheme', path.basename(projectPath, path.extname(projectPath)), '-configuration', 'release', '-quiet', '-derivedDataPath', outputPath, 'COMMAND_LINE_BUILD=1'], { encoding: 'utf8' },
    error => cb(error),
  );
};
