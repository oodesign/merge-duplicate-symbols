"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _terser = require("terser");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable
  arrow-body-style
*/
const buildTerserOptions = ({
  ecma,
  warnings,
  parse = {},
  compress = {},
  mangle,
  module,
  output,
  toplevel,
  nameCache,
  ie8,
  /* eslint-disable camelcase */
  keep_classnames,
  keep_fnames,
  /* eslint-enable camelcase */
  safari10
} = {}) => ({
  ecma,
  warnings,
  parse: _objectSpread({}, parse),
  compress: typeof compress === 'boolean' ? compress : _objectSpread({}, compress),
  // eslint-disable-next-line no-nested-ternary
  mangle: mangle == null ? true : typeof mangle === 'boolean' ? mangle : _objectSpread({}, mangle),
  output: _objectSpread({
    shebang: true,
    comments: false,
    beautify: false,
    semicolons: true
  }, output),
  module,
  // Ignoring sourceMap from options
  sourceMap: null,
  toplevel,
  nameCache,
  ie8,
  keep_classnames,
  keep_fnames,
  safari10
});
const buildComments = (options, terserOptions, extractedComments) => {
  const condition = {};
  const commentsOpts = terserOptions.output.comments;

  // Use /^\**!|@preserve|@license|@cc_on/i RegExp
  if (typeof options.extractComments === 'boolean') {
    condition.preserve = commentsOpts;
    condition.extract = /^\**!|@preserve|@license|@cc_on/i;
  } else if (typeof options.extractComments === 'string' || options.extractComments instanceof RegExp) {
    // extractComments specifies the extract condition and commentsOpts specifies the preserve condition
    condition.preserve = commentsOpts;
    condition.extract = options.extractComments;
  } else if (typeof options.extractComments === 'function') {
    condition.preserve = commentsOpts;
    condition.extract = options.extractComments;
  } else if (Object.prototype.hasOwnProperty.call(options.extractComments, 'condition')) {
    // Extract condition is given in extractComments.condition
    condition.preserve = commentsOpts;
    condition.extract = options.extractComments.condition;
  } else {
    // No extract condition is given. Extract comments that match commentsOpts instead of preserving them
    condition.preserve = false;
    condition.extract = commentsOpts;
  }

  // Ensure that both conditions are functions
  ['preserve', 'extract'].forEach(key => {
    let regexStr;
    let regex;
    switch (typeof condition[key]) {
      case 'boolean':
        condition[key] = condition[key] ? () => true : () => false;
        break;
      case 'function':
        break;
      case 'string':
        if (condition[key] === 'all') {
          condition[key] = () => true;
          break;
        }
        if (condition[key] === 'some') {
          condition[key] = (astNode, comment) => {
            return comment.type === 'comment2' && /^\**!|@preserve|@license|@cc_on/i.test(comment.value);
          };
          break;
        }
        regexStr = condition[key];
        condition[key] = (astNode, comment) => {
          return new RegExp(regexStr).test(comment.value);
        };
        break;
      default:
        regex = condition[key];
        condition[key] = (astNode, comment) => regex.test(comment.value);
    }
  });

  // Redefine the comments function to extract and preserve
  // comments according to the two conditions
  return (astNode, comment) => {
    if (condition.extract(astNode, comment)) {
      const commentText = comment.type === 'comment2' ? `/*${comment.value}*/` : `//${comment.value}`;

      // Don't include duplicate comments
      if (!extractedComments.includes(commentText)) {
        extractedComments.push(commentText);
      }
    }
    return condition.preserve(astNode, comment);
  };
};
const minify = options => {
  const {
    file,
    input,
    inputSourceMap,
    extractComments,
    minify: minifyFn
  } = options;
  if (minifyFn) {
    return minifyFn({
      [file]: input
    }, inputSourceMap);
  }

  // Copy terser options
  const terserOptions = buildTerserOptions(options.terserOptions);

  // Let terser generate a SourceMap
  if (inputSourceMap) {
    terserOptions.sourceMap = true;
  }
  const extractedComments = [];
  if (extractComments) {
    terserOptions.output.comments = buildComments(options, terserOptions, extractedComments);
  }
  const {
    error,
    map,
    code,
    warnings
  } = (0, _terser.minify)({
    [file]: input
  }, terserOptions);
  return {
    error,
    map,
    code,
    warnings,
    extractedComments
  };
};
var _default = exports.default = minify;