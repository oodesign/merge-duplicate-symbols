const { execFile } = require('child_process');

module.exports = function compileNib(loader, nibPath, cb) {
  // Tell webpack to cache the compiled file and to track changes to the source files
  if (loader.cacheable) {
    loader.cacheable();
    loader.addDependency(loader.resourcePath);
  }

  execFile('/usr/bin/ibtool', ['--compile', nibPath, loader.resourcePath], { encoding: 'utf8' }, cb);
};
