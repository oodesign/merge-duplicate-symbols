/* eslint-disable
  multiline-ternary,
*/
const os = require('os');
const path = require('path');
const fs = require('fs');
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');
const schema = require('./options.json');
const compileNib = require('./compile-nib');
const nibClass = require('./wrapped-nib-class');

module.exports = function loader(content) {
  if (!this.emitFile) throw new Error('Nib Loader\n\nemitFile is required from module system');

  const options = loaderUtils.getOptions(this) || {};

  validateOptions(schema, options, 'Nib Loader');

  const context = options.context || this.rootContext || (this.options && this.options.context);

  let url = loaderUtils.interpolateName(this, options.name, {
    context,
    content,
    regExp: options.regExp,
  });

  const parsedPath = path.parse(this.resourcePath);

  if (parsedPath.ext === '.xib') {
    // will be compiled to nib so change the ext
    url = url.replace(/\.xib$/, '.nib');
  }

  let outputPath = url;

  if (options.outputPath) {
    if (typeof options.outputPath === 'function') {
      outputPath = options.outputPath(url);
    } else {
      outputPath = path.posix.join(options.outputPath, url);
    }
  }

  if (options.useRelativePath) {
    const filePath = this.resourcePath;

    const issuer = options.context
      ? context
      : (
        this._module &&
        this._module.issuer &&
        this._module.issuer.context
      );

    const relativeUrl = issuer && path.relative(issuer, filePath)
      .split(path.sep)
      .join('/');

    const relativePath = relativeUrl && `${path.dirname(relativeUrl)}/`;
    // eslint-disable-next-line no-bitwise
    if (~relativePath.indexOf('../')) {
      outputPath = path.posix.join(outputPath, relativePath, url);
    } else {
      outputPath = path.posix.join(relativePath, url);
    }
  }

  let publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

  if (options.publicPath) {
    if (typeof options.publicPath === 'function') {
      publicPath = options.publicPath(url);
    } else if (options.publicPath.endsWith('/')) {
      publicPath = options.publicPath + url;
    } else {
      publicPath = `${options.publicPath}/${url}`;
    }

    if (!options.raw) {
      publicPath = JSON.stringify(publicPath);
    }
  }

  if (options.emitFile === undefined || options.emitFile) {
    if (parsedPath.ext === '.nib') {
      // we already have a nib so no need to compile the xib
      this.emitFile(outputPath, content);
      return nibClass(publicPath);
    }

    const callback = this.async();

    const nibPath = path.join(os.tmpdir(), `webpack-${parsedPath.name}.nib`);

    compileNib(this, nibPath, (error) => {
      if (error) {
        return callback(new Error(`Error compiling nib: ${error.message}`));
      }

      return fs.readFile(nibPath, (err, result) => {
        try {
          fs.unlinkSync(nibPath);
        } catch (_err) {
          // don't care
        }

        if (error) {
          return callback(new Error(`Error reading compiled nib: ${error.message}`));
        }
        this.emitFile(outputPath, result);
        return callback(null, nibClass(publicPath));
      });
    });
    return undefined;
  }

  return nibClass(publicPath);
};

module.exports.raw = true;
