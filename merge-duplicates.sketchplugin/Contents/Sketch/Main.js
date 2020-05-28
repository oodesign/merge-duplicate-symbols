var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@skpm/fs/index.js":
/*!****************************************!*\
  !*** ./node_modules/@skpm/fs/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO: async. Should probably be done with NSFileHandle and some notifications
// TODO: file descriptor. Needs to be done with NSFileHandle
var Buffer = __webpack_require__(/*! buffer */ "buffer").Buffer;
var utils = __webpack_require__(/*! ./utils */ "./node_modules/@skpm/fs/utils.js");
var parseStat = utils.parseStat;
var fsError = utils.fsError;
var fsErrorForPath = utils.fsErrorForPath;
var encodingFromOptions = utils.encodingFromOptions;
var NOT_IMPLEMENTED = utils.NOT_IMPLEMENTED;

module.exports.constants = {
  F_OK: 0,
  R_OK: 4,
  W_OK: 2,
  X_OK: 1
};

module.exports.access = NOT_IMPLEMENTED("access");

module.exports.accessSync = function(path, mode) {
  mode = mode | 0;
  var fileManager = NSFileManager.defaultManager();

  switch (mode) {
    case 0:
      canAccess = module.exports.existsSync(path);
      break;
    case 1:
      canAccess = Boolean(Number(fileManager.isExecutableFileAtPath(path)));
      break;
    case 2:
      canAccess = Boolean(Number(fileManager.isWritableFileAtPath(path)));
      break;
    case 3:
      canAccess =
        Boolean(Number(fileManager.isExecutableFileAtPath(path))) &&
        Boolean(Number(fileManager.isWritableFileAtPath(path)));
      break;
    case 4:
      canAccess = Boolean(Number(fileManager.isReadableFileAtPath(path)));
      break;
    case 5:
      canAccess =
        Boolean(Number(fileManager.isReadableFileAtPath(path))) &&
        Boolean(Number(fileManager.isExecutableFileAtPath(path)));
      break;
    case 6:
      canAccess =
        Boolean(Number(fileManager.isReadableFileAtPath(path))) &&
        Boolean(Number(fileManager.isWritableFileAtPath(path)));
      break;
    case 7:
      canAccess =
        Boolean(Number(fileManager.isReadableFileAtPath(path))) &&
        Boolean(Number(fileManager.isWritableFileAtPath(path))) &&
        Boolean(Number(fileManager.isExecutableFileAtPath(path)));
      break;
  }

  if (!canAccess) {
    throw new Error("Can't access " + String(path));
  }
};

module.exports.appendFile = NOT_IMPLEMENTED("appendFile");

module.exports.appendFileSync = function(file, data, options) {
  if (!module.exports.existsSync(file)) {
    return module.exports.writeFileSync(file, data, options);
  }

  var handle = NSFileHandle.fileHandleForWritingAtPath(file);
  handle.seekToEndOfFile();

  var encoding = encodingFromOptions(options, "utf8");

  var nsdata = Buffer.from(
    data,
    encoding === "NSData" || encoding === "buffer" ? undefined : encoding
  ).toNSData();

  handle.writeData(nsdata);
};

module.exports.chmod = NOT_IMPLEMENTED("chmod");

module.exports.chmodSync = function(path, mode) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  fileManager.setAttributes_ofItemAtPath_error(
    {
      NSFilePosixPermissions: mode
    },
    path,
    err
  );

  if (err.value() !== null) {
    throw fsErrorForPath(path, undefined, err.value());
  }
};

module.exports.chown = NOT_IMPLEMENTED("chown");
module.exports.chownSync = NOT_IMPLEMENTED("chownSync");

module.exports.close = NOT_IMPLEMENTED("close");
module.exports.closeSync = NOT_IMPLEMENTED("closeSync");

module.exports.copyFile = NOT_IMPLEMENTED("copyFile");

module.exports.copyFileSync = function(path, dest, flags) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  fileManager.copyItemAtPath_toPath_error(path, dest, err);

  if (err.value() !== null) {
    throw fsErrorForPath(path, false, err.value());
  }
};

module.exports.createReadStream = NOT_IMPLEMENTED("createReadStream");
module.exports.createWriteStream = NOT_IMPLEMENTED("createWriteStream");

module.exports.exists = NOT_IMPLEMENTED("exists");

module.exports.existsSync = function(path) {
  var fileManager = NSFileManager.defaultManager();
  return Boolean(Number(fileManager.fileExistsAtPath(path)));
};

module.exports.fchmod = NOT_IMPLEMENTED("fchmod");
module.exports.fchmodSync = NOT_IMPLEMENTED("fchmodSync");
module.exports.fchown = NOT_IMPLEMENTED("fchown");
module.exports.fchownSync = NOT_IMPLEMENTED("fchownSync");
module.exports.fdatasync = NOT_IMPLEMENTED("fdatasync");
module.exports.fdatasyncSync = NOT_IMPLEMENTED("fdatasyncSync");
module.exports.fstat = NOT_IMPLEMENTED("fstat");
module.exports.fstatSync = NOT_IMPLEMENTED("fstatSync");
module.exports.fsync = NOT_IMPLEMENTED("fsync");
module.exports.fsyncSync = NOT_IMPLEMENTED("fsyncSync");
module.exports.ftruncate = NOT_IMPLEMENTED("ftruncate");
module.exports.ftruncateSync = NOT_IMPLEMENTED("ftruncateSync");
module.exports.futimes = NOT_IMPLEMENTED("futimes");
module.exports.futimesSync = NOT_IMPLEMENTED("futimesSync");

module.exports.lchmod = NOT_IMPLEMENTED("lchmod");
module.exports.lchmodSync = NOT_IMPLEMENTED("lchmodSync");
module.exports.lchown = NOT_IMPLEMENTED("lchown");
module.exports.lchownSync = NOT_IMPLEMENTED("lchownSync");

module.exports.link = NOT_IMPLEMENTED("link");

module.exports.linkSync = function(existingPath, newPath) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  fileManager.linkItemAtPath_toPath_error(existingPath, newPath, err);

  if (err.value() !== null) {
    throw fsErrorForPath(existingPath, undefined, err.value());
  }
};

module.exports.lstat = NOT_IMPLEMENTED("lstat");

module.exports.lstatSync = function(path) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var result = fileManager.attributesOfItemAtPath_error(path, err);

  if (err.value() !== null) {
    throw fsErrorForPath(path, undefined, err.value());
  }

  return parseStat(result);
};

module.exports.mkdir = NOT_IMPLEMENTED("mkdir");

module.exports.mkdirSync = function(path, options) {
  var mode = 0o777;
  var recursive = false;
  if (options && options.mode) {
    mode = options.mode;
  }
  if (options && options.recursive) {
    recursive = options.recursive;
  }
  if (typeof options === "number") {
    mode = options;
  }
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  fileManager.createDirectoryAtPath_withIntermediateDirectories_attributes_error(
    path,
    recursive,
    {
      NSFilePosixPermissions: mode
    },
    err
  );

  if (err.value() !== null) {
    throw new Error(err.value());
  }
};

module.exports.mkdtemp = NOT_IMPLEMENTED("mkdtemp");

module.exports.mkdtempSync = function(path) {
  function makeid() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
  var tempPath = path + makeid();
  module.exports.mkdirSync(tempPath);
  return tempPath;
};

module.exports.open = NOT_IMPLEMENTED("open");
module.exports.openSync = NOT_IMPLEMENTED("openSync");

module.exports.read = NOT_IMPLEMENTED("read");

module.exports.readdir = NOT_IMPLEMENTED("readdir");

module.exports.readdirSync = function(path, options) {
  var encoding = encodingFromOptions(options, "utf8");
  var fileManager = NSFileManager.defaultManager();
  var paths = fileManager.subpathsAtPath(path);
  var arr = [];
  for (var i = 0; i < paths.length; i++) {
    var pathName = paths[i];
    arr.push(encoding === "buffer" ? Buffer.from(pathName) : String(pathName));
  }
  return arr;
};

module.exports.readFile = NOT_IMPLEMENTED("readFile");

module.exports.readFileSync = function(path, options) {
  var encoding = encodingFromOptions(options, "buffer");
  var fileManager = NSFileManager.defaultManager();
  var data = fileManager.contentsAtPath(path);
  if (!data) {
    throw fsErrorForPath(path, false);
  }

  var buffer = Buffer.from(data);

  if (encoding === "buffer") {
    return buffer;
  } else if (encoding === "NSData") {
    return buffer.toNSData();
  } else {
    return buffer.toString(encoding);
  }
};

module.exports.readlink = NOT_IMPLEMENTED("readlink");

module.exports.readlinkSync = function(path) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var result = fileManager.destinationOfSymbolicLinkAtPath_error(path, err);

  if (err.value() !== null) {
    throw fsErrorForPath(path, undefined, err.value());
  }

  return String(result);
};

module.exports.readSync = NOT_IMPLEMENTED("readSync");

module.exports.realpath = NOT_IMPLEMENTED("realpath");
module.exports.realpath.native = NOT_IMPLEMENTED("realpath.native");

module.exports.realpathSync = function(path) {
  return String(NSString.stringWithString(path).stringByResolvingSymlinksInPath());
};

module.exports.realpathSync.native = NOT_IMPLEMENTED("realpathSync.native");

module.exports.rename = NOT_IMPLEMENTED("rename");

module.exports.renameSync = function(oldPath, newPath) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  fileManager.moveItemAtPath_toPath_error(oldPath, newPath, err);

  var error = err.value();

  if (error !== null) {
    // if there is already a file, we need to overwrite it
    if (
      String(error.domain()) === "NSCocoaErrorDomain" &&
      Number(error.code()) === 516
    ) {
      var err2 = MOPointer.alloc().init();
      fileManager.replaceItemAtURL_withItemAtURL_backupItemName_options_resultingItemURL_error(
        NSURL.fileURLWithPath(newPath),
        NSURL.fileURLWithPath(oldPath),
        null,
        NSFileManagerItemReplacementUsingNewMetadataOnly,
        null,
        err2
      );
      if (err2.value() !== null) {
        throw fsErrorForPath(oldPath, undefined, err2.value());
      }
    } else {
      throw fsErrorForPath(oldPath, undefined, error);
    }
  }
};

module.exports.rmdir = NOT_IMPLEMENTED("rmdir");

module.exports.rmdirSync = function(path) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var isDirectory = module.exports.lstatSync(path).isDirectory();
  if (!isDirectory) {
    throw fsError("ENOTDIR", {
      path: path,
      syscall: "rmdir"
    });
  }
  fileManager.removeItemAtPath_error(path, err);

  if (err.value() !== null) {
    throw fsErrorForPath(path, true, err.value(), "rmdir");
  }
};

module.exports.stat = NOT_IMPLEMENTED("stat");

// the only difference with lstat is that we resolve symlinks
//
// > lstat() is identical to stat(), except that if pathname is a symbolic
// > link, then it returns information about the link itself, not the file
// > that it refers to.
// http://man7.org/linux/man-pages/man2/lstat.2.html
module.exports.statSync = function(path) {
  return module.exports.lstatSync(module.exports.realpathSync(path));
};

module.exports.symlink = NOT_IMPLEMENTED("symlink");

module.exports.symlinkSync = function(target, path) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var result = fileManager.createSymbolicLinkAtPath_withDestinationPath_error(
    path,
    target,
    err
  );

  if (err.value() !== null) {
    throw new Error(err.value());
  }
};

module.exports.truncate = NOT_IMPLEMENTED("truncate");

module.exports.truncateSync = function(path, len) {
  var hFile = NSFileHandle.fileHandleForUpdatingAtPath(sFilePath);
  hFile.truncateFileAtOffset(len || 0);
  hFile.closeFile();
};

module.exports.unlink = NOT_IMPLEMENTED("unlink");

module.exports.unlinkSync = function(path) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var isDirectory = module.exports.lstatSync(path).isDirectory();
  if (isDirectory) {
    throw fsError("EPERM", {
      path: path,
      syscall: "unlink"
    });
  }
  var result = fileManager.removeItemAtPath_error(path, err);

  if (err.value() !== null) {
    throw fsErrorForPath(path, false, err.value());
  }
};

module.exports.unwatchFile = NOT_IMPLEMENTED("unwatchFile");

module.exports.utimes = NOT_IMPLEMENTED("utimes");

module.exports.utimesSync = function(path, aTime, mTime) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var result = fileManager.setAttributes_ofItemAtPath_error(
    {
      NSFileModificationDate: aTime
    },
    path,
    err
  );

  if (err.value() !== null) {
    throw fsErrorForPath(path, undefined, err.value());
  }
};

module.exports.watch = NOT_IMPLEMENTED("watch");
module.exports.watchFile = NOT_IMPLEMENTED("watchFile");

module.exports.write = NOT_IMPLEMENTED("write");

module.exports.writeFile = NOT_IMPLEMENTED("writeFile");

module.exports.writeFileSync = function(path, data, options) {
  var encoding = encodingFromOptions(options, "utf8");

  var nsdata = Buffer.from(
    data,
    encoding === "NSData" || encoding === "buffer" ? undefined : encoding
  ).toNSData();

  nsdata.writeToFile_atomically(path, true);
};

module.exports.writeSync = NOT_IMPLEMENTED("writeSync");


/***/ }),

/***/ "./node_modules/@skpm/fs/utils.js":
/*!****************************************!*\
  !*** ./node_modules/@skpm/fs/utils.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports.parseStat = function parseStat(result) {
  return {
    dev: String(result.NSFileDeviceIdentifier),
    // ino: 48064969, The file system specific "Inode" number for the file.
    mode: result.NSFileType | result.NSFilePosixPermissions,
    nlink: Number(result.NSFileReferenceCount),
    uid: String(result.NSFileOwnerAccountID),
    gid: String(result.NSFileGroupOwnerAccountID),
    // rdev: 0, A numeric device identifier if the file is considered "special".
    size: Number(result.NSFileSize),
    // blksize: 4096, The file system block size for i/o operations.
    // blocks: 8, The number of blocks allocated for this file.
    atimeMs:
      Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000,
    mtimeMs:
      Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000,
    ctimeMs:
      Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000,
    birthtimeMs:
      Number(result.NSFileCreationDate.timeIntervalSince1970()) * 1000,
    atime: new Date(
      Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000 + 0.5
    ), // the 0.5 comes from the node source. Not sure why it's added but in doubt...
    mtime: new Date(
      Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000 + 0.5
    ),
    ctime: new Date(
      Number(result.NSFileModificationDate.timeIntervalSince1970()) * 1000 + 0.5
    ),
    birthtime: new Date(
      Number(result.NSFileCreationDate.timeIntervalSince1970()) * 1000 + 0.5
    ),
    isBlockDevice: function() {
      return result.NSFileType === NSFileTypeBlockSpecial;
    },
    isCharacterDevice: function() {
      return result.NSFileType === NSFileTypeCharacterSpecial;
    },
    isDirectory: function() {
      return result.NSFileType === NSFileTypeDirectory;
    },
    isFIFO: function() {
      return false;
    },
    isFile: function() {
      return result.NSFileType === NSFileTypeRegular;
    },
    isSocket: function() {
      return result.NSFileType === NSFileTypeSocket;
    },
    isSymbolicLink: function() {
      return result.NSFileType === NSFileTypeSymbolicLink;
    }
  };
};

var ERRORS = {
  EPERM: {
    message: "operation not permitted",
    errno: -1
  },
  ENOENT: {
    message: "no such file or directory",
    errno: -2
  },
  EACCES: {
    message: "permission denied",
    errno: -13
  },
  ENOTDIR: {
    message: "not a directory",
    errno: -20
  },
  EISDIR: {
    message: "illegal operation on a directory",
    errno: -21
  }
};

function fsError(code, options) {
  var error = new Error(
    code +
      ": " +
      ERRORS[code].message +
      ", " +
      (options.syscall || "") +
      (options.path ? " '" + options.path + "'" : "")
  );

  Object.keys(options).forEach(function(k) {
    error[k] = options[k];
  });

  error.code = code;
  error.errno = ERRORS[code].errno;

  return error;
}

module.exports.fsError = fsError;

module.exports.fsErrorForPath = function fsErrorForPath(
  path,
  shouldBeDir,
  err,
  syscall
) {
  var fileManager = NSFileManager.defaultManager();
  var doesExist = fileManager.fileExistsAtPath(path);
  if (!doesExist) {
    return fsError("ENOENT", {
      path: path,
      syscall: syscall || "open"
    });
  }
  var isReadable = fileManager.isReadableFileAtPath(path);
  if (!isReadable) {
    return fsError("EACCES", {
      path: path,
      syscall: syscall || "open"
    });
  }
  if (typeof shouldBeDir !== "undefined") {
    var isDirectory = module.exports.lstatSync(path).isDirectory();
    if (isDirectory && !shouldBeDir) {
      return fsError("EISDIR", {
        path: path,
        syscall: syscall || "read"
      });
    } else if (!isDirectory && shouldBeDir) {
      return fsError("ENOTDIR", {
        path: path,
        syscall: syscall || "read"
      });
    }
  }
  return new Error(err || "Unknown error while manipulating " + path);
};

module.exports.encodingFromOptions = function encodingFromOptions(
  options,
  defaultValue
) {
  return options && options.encoding
    ? String(options.encoding)
    : options
    ? String(options)
    : defaultValue;
};

module.exports.NOT_IMPLEMENTED = function NOT_IMPLEMENTED(name) {
  return function() {
    throw new Error(
      "fs." +
        name +
        " is not implemented yet. If you feel like implementing it, any contribution will be gladly accepted on https://github.com/skpm/fs"
    );
  };
};


/***/ }),

/***/ "./node_modules/@skpm/promise/index.js":
/*!*********************************************!*\
  !*** ./node_modules/@skpm/promise/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* from https://github.com/taylorhakes/promise-polyfill */

function promiseFinally(callback) {
  var constructor = this.constructor;
  return this.then(
    function(value) {
      return constructor.resolve(callback()).then(function() {
        return value;
      });
    },
    function(reason) {
      return constructor.resolve(callback()).then(function() {
        return constructor.reject(reason);
      });
    }
  );
}

function noop() {}

/**
 * @constructor
 * @param {Function} fn
 */
function Promise(fn) {
  if (!(this instanceof Promise))
    throw new TypeError("Promises must be constructed via new");
  if (typeof fn !== "function") throw new TypeError("not a function");
  /** @type {!number} */
  this._state = 0;
  /** @type {!boolean} */
  this._handled = false;
  /** @type {Promise|undefined} */
  this._value = undefined;
  /** @type {!Array<!Function>} */
  this._deferreds = [];

  doResolve(fn, this);
}

function handle(self, deferred) {
  while (self._state === 3) {
    self = self._value;
  }
  if (self._state === 0) {
    self._deferreds.push(deferred);
    return;
  }
  self._handled = true;
  Promise._immediateFn(function() {
    var cb = self._state === 1 ? deferred.onFulfilled : deferred.onRejected;
    if (cb === null) {
      (self._state === 1 ? resolve : reject)(deferred.promise, self._value);
      return;
    }
    var ret;
    try {
      ret = cb(self._value);
    } catch (e) {
      reject(deferred.promise, e);
      return;
    }
    resolve(deferred.promise, ret);
  });
}

function resolve(self, newValue) {
  try {
    // Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    if (newValue === self)
      throw new TypeError("A promise cannot be resolved with itself.");
    if (
      newValue &&
      (typeof newValue === "object" || typeof newValue === "function")
    ) {
      var then = newValue.then;
      if (newValue instanceof Promise) {
        self._state = 3;
        self._value = newValue;
        finale(self);
        return;
      } else if (typeof then === "function") {
        doResolve(then.bind(newValue), self);
        return;
      }
    }
    self._state = 1;
    self._value = newValue;
    finale(self);
  } catch (e) {
    reject(self, e);
  }
}

function reject(self, newValue) {
  self._state = 2;
  self._value = newValue;
  finale(self);
}

function finale(self) {
  if (self._state === 2 && self._deferreds.length === 0) {
    Promise._immediateFn(function() {
      if (!self._handled) {
        Promise._unhandledRejectionFn(self._value, self);
      }
    });
  }

  for (var i = 0, len = self._deferreds.length; i < len; i++) {
    handle(self, self._deferreds[i]);
  }
  self._deferreds = null;
}

/**
 * @constructor
 */
function Handler(onFulfilled, onRejected, promise) {
  this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
  this.onRejected = typeof onRejected === "function" ? onRejected : null;
  this.promise = promise;
}

/**
 * Take a potentially misbehaving resolver function and make sure
 * onFulfilled and onRejected are only called once.
 *
 * Makes no guarantees about asynchrony.
 */
function doResolve(fn, self) {
  var done = false;
  try {
    fn(
      function(value) {
        if (done) {
          Promise._multipleResolvesFn("resolve", self, value);
          return;
        }
        done = true;
        resolve(self, value);
      },
      function(reason) {
        if (done) {
          Promise._multipleResolvesFn("reject", self, reason);
          return;
        }
        done = true;
        reject(self, reason);
      }
    );
  } catch (ex) {
    if (done) {
      Promise._multipleResolvesFn("reject", self, ex);
      return;
    }
    done = true;
    reject(self, ex);
  }
}

Promise.prototype["catch"] = function(onRejected) {
  return this.then(null, onRejected);
};

Promise.prototype.then = function(onFulfilled, onRejected) {
  // @ts-ignore
  var prom = new this.constructor(noop);

  handle(this, new Handler(onFulfilled, onRejected, prom));
  return prom;
};

Promise.prototype["finally"] = promiseFinally;

Promise.all = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(arr)) {
      return reject(new TypeError("Promise.all accepts an array"));
    }

    var args = Array.prototype.slice.call(arr);
    if (args.length === 0) return resolve([]);
    var remaining = args.length;

    function res(i, val) {
      try {
        if (val && (typeof val === "object" || typeof val === "function")) {
          var then = val.then;
          if (typeof then === "function") {
            then.call(
              val,
              function(val) {
                res(i, val);
              },
              reject
            );
            return;
          }
        }
        args[i] = val;
        if (--remaining === 0) {
          resolve(args);
        }
      } catch (ex) {
        reject(ex);
      }
    }

    for (var i = 0; i < args.length; i++) {
      res(i, args[i]);
    }
  });
};

Promise.resolve = function(value) {
  if (value && typeof value === "object" && value.constructor === Promise) {
    return value;
  }

  return new Promise(function(resolve) {
    resolve(value);
  });
};

Promise.reject = function(value) {
  return new Promise(function(resolve, reject) {
    reject(value);
  });
};

Promise.race = function(arr) {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(arr)) {
      return reject(new TypeError("Promise.race accepts an array"));
    }

    for (var i = 0, len = arr.length; i < len; i++) {
      Promise.resolve(arr[i]).then(resolve, reject);
    }
  });
};

// Use polyfill for setImmediate for performance gains
Promise._immediateFn = setImmediate;

Promise._unhandledRejectionFn = function _unhandledRejectionFn(err, promise) {
  if (
    typeof process !== "undefined" &&
    process.listenerCount &&
    (process.listenerCount("unhandledRejection") ||
      process.listenerCount("uncaughtException"))
  ) {
    process.emit("unhandledRejection", err, promise);
    process.emit("uncaughtException", err, "unhandledRejection");
  } else if (typeof console !== "undefined" && console) {
    console.warn("Possible Unhandled Promise Rejection:", err);
  }
};

Promise._multipleResolvesFn = function _multipleResolvesFn(
  type,
  promise,
  value
) {
  if (typeof process !== "undefined" && process.emit) {
    process.emit("multipleResolves", type, promise, value);
  }
};

module.exports = Promise;


/***/ }),

/***/ "./node_modules/d3-color/src/color.js":
/*!********************************************!*\
  !*** ./node_modules/d3-color/src/color.js ***!
  \********************************************/
/*! exports provided: Color, darker, brighter, default, rgbConvert, rgb, Rgb, hslConvert, hsl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Color", function() { return Color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "darker", function() { return darker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "brighter", function() { return brighter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return color; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbConvert", function() { return rgbConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Rgb", function() { return Rgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hslConvert", function() { return hslConvert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hsl", function() { return hsl; });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "./node_modules/d3-color/src/define.js");


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Color, color, {
  copy: function(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? new Rgb(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? new Rgb((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Rgb, rgb, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(")
      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
      + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Hsl, hsl, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(Color, {
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(")
        + (this.h || 0) + ", "
        + (this.s || 0) * 100 + "%, "
        + (this.l || 0) * 100 + "%"
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}


/***/ }),

/***/ "./node_modules/d3-color/src/cubehelix.js":
/*!************************************************!*\
  !*** ./node_modules/d3-color/src/cubehelix.js ***!
  \************************************************/
/*! exports provided: default, Cubehelix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return cubehelix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cubehelix", function() { return Cubehelix; });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "./node_modules/d3-color/src/define.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-color/src/math.js");




var A = -0.14861,
    B = +1.78277,
    C = -0.29227,
    D = -0.90649,
    E = +1.97294,
    ED = E * D,
    EB = E * B,
    BC_DA = B * C - D * A;

function cubehelixConvert(o) {
  if (o instanceof Cubehelix) return new Cubehelix(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof _color_js__WEBPACK_IMPORTED_MODULE_1__["Rgb"])) o = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["rgbConvert"])(o);
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      l = (BC_DA * b + ED * r - EB * g) / (BC_DA + ED - EB),
      bl = b - l,
      k = (E * (g - l) - C * bl) / D,
      s = Math.sqrt(k * k + bl * bl) / (E * l * (1 - l)), // NaN if l=0 or l=1
      h = s ? Math.atan2(k, bl) * _math_js__WEBPACK_IMPORTED_MODULE_2__["rad2deg"] - 120 : NaN;
  return new Cubehelix(h < 0 ? h + 360 : h, s, l, o.opacity);
}

function cubehelix(h, s, l, opacity) {
  return arguments.length === 1 ? cubehelixConvert(h) : new Cubehelix(h, s, l, opacity == null ? 1 : opacity);
}

function Cubehelix(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Cubehelix, cubehelix, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(_color_js__WEBPACK_IMPORTED_MODULE_1__["Color"], {
  brighter: function(k) {
    k = k == null ? _color_js__WEBPACK_IMPORTED_MODULE_1__["brighter"] : Math.pow(_color_js__WEBPACK_IMPORTED_MODULE_1__["brighter"], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? _color_js__WEBPACK_IMPORTED_MODULE_1__["darker"] : Math.pow(_color_js__WEBPACK_IMPORTED_MODULE_1__["darker"], k);
    return new Cubehelix(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = isNaN(this.h) ? 0 : (this.h + 120) * _math_js__WEBPACK_IMPORTED_MODULE_2__["deg2rad"],
        l = +this.l,
        a = isNaN(this.s) ? 0 : this.s * l * (1 - l),
        cosh = Math.cos(h),
        sinh = Math.sin(h);
    return new _color_js__WEBPACK_IMPORTED_MODULE_1__["Rgb"](
      255 * (l + a * (A * cosh + B * sinh)),
      255 * (l + a * (C * cosh + D * sinh)),
      255 * (l + a * (E * cosh)),
      this.opacity
    );
  }
}));


/***/ }),

/***/ "./node_modules/d3-color/src/define.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-color/src/define.js ***!
  \*********************************************/
/*! exports provided: default, extend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extend", function() { return extend; });
/* harmony default export */ __webpack_exports__["default"] = (function(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
});

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}


/***/ }),

/***/ "./node_modules/d3-color/src/index.js":
/*!********************************************!*\
  !*** ./node_modules/d3-color/src/index.js ***!
  \********************************************/
/*! exports provided: color, rgb, hsl, lab, hcl, lch, gray, cubehelix */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-color/src/color.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "color", function() { return _color_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rgb", function() { return _color_js__WEBPACK_IMPORTED_MODULE_0__["rgb"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hsl", function() { return _color_js__WEBPACK_IMPORTED_MODULE_0__["hsl"]; });

/* harmony import */ var _lab_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lab.js */ "./node_modules/d3-color/src/lab.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lab", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "hcl", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__["hcl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lch", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__["lch"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "gray", function() { return _lab_js__WEBPACK_IMPORTED_MODULE_1__["gray"]; });

/* harmony import */ var _cubehelix_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cubehelix.js */ "./node_modules/d3-color/src/cubehelix.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "cubehelix", function() { return _cubehelix_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });






/***/ }),

/***/ "./node_modules/d3-color/src/lab.js":
/*!******************************************!*\
  !*** ./node_modules/d3-color/src/lab.js ***!
  \******************************************/
/*! exports provided: gray, default, Lab, lch, hcl, Hcl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gray", function() { return gray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return lab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Lab", function() { return Lab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lch", function() { return lch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hcl", function() { return hcl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Hcl", function() { return Hcl; });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "./node_modules/d3-color/src/define.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-color/src/math.js");




// https://observablehq.com/@mbostock/lab-and-rgb
var K = 18,
    Xn = 0.96422,
    Yn = 1,
    Zn = 0.82521,
    t0 = 4 / 29,
    t1 = 6 / 29,
    t2 = 3 * t1 * t1,
    t3 = t1 * t1 * t1;

function labConvert(o) {
  if (o instanceof Lab) return new Lab(o.l, o.a, o.b, o.opacity);
  if (o instanceof Hcl) return hcl2lab(o);
  if (!(o instanceof _color_js__WEBPACK_IMPORTED_MODULE_1__["Rgb"])) o = Object(_color_js__WEBPACK_IMPORTED_MODULE_1__["rgbConvert"])(o);
  var r = rgb2lrgb(o.r),
      g = rgb2lrgb(o.g),
      b = rgb2lrgb(o.b),
      y = xyz2lab((0.2225045 * r + 0.7168786 * g + 0.0606169 * b) / Yn), x, z;
  if (r === g && g === b) x = z = y; else {
    x = xyz2lab((0.4360747 * r + 0.3850649 * g + 0.1430804 * b) / Xn);
    z = xyz2lab((0.0139322 * r + 0.0971045 * g + 0.7141733 * b) / Zn);
  }
  return new Lab(116 * y - 16, 500 * (x - y), 200 * (y - z), o.opacity);
}

function gray(l, opacity) {
  return new Lab(l, 0, 0, opacity == null ? 1 : opacity);
}

function lab(l, a, b, opacity) {
  return arguments.length === 1 ? labConvert(l) : new Lab(l, a, b, opacity == null ? 1 : opacity);
}

function Lab(l, a, b, opacity) {
  this.l = +l;
  this.a = +a;
  this.b = +b;
  this.opacity = +opacity;
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Lab, lab, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(_color_js__WEBPACK_IMPORTED_MODULE_1__["Color"], {
  brighter: function(k) {
    return new Lab(this.l + K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  darker: function(k) {
    return new Lab(this.l - K * (k == null ? 1 : k), this.a, this.b, this.opacity);
  },
  rgb: function() {
    var y = (this.l + 16) / 116,
        x = isNaN(this.a) ? y : y + this.a / 500,
        z = isNaN(this.b) ? y : y - this.b / 200;
    x = Xn * lab2xyz(x);
    y = Yn * lab2xyz(y);
    z = Zn * lab2xyz(z);
    return new _color_js__WEBPACK_IMPORTED_MODULE_1__["Rgb"](
      lrgb2rgb( 3.1338561 * x - 1.6168667 * y - 0.4906146 * z),
      lrgb2rgb(-0.9787684 * x + 1.9161415 * y + 0.0334540 * z),
      lrgb2rgb( 0.0719453 * x - 0.2289914 * y + 1.4052427 * z),
      this.opacity
    );
  }
}));

function xyz2lab(t) {
  return t > t3 ? Math.pow(t, 1 / 3) : t / t2 + t0;
}

function lab2xyz(t) {
  return t > t1 ? t * t * t : t2 * (t - t0);
}

function lrgb2rgb(x) {
  return 255 * (x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055);
}

function rgb2lrgb(x) {
  return (x /= 255) <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
}

function hclConvert(o) {
  if (o instanceof Hcl) return new Hcl(o.h, o.c, o.l, o.opacity);
  if (!(o instanceof Lab)) o = labConvert(o);
  if (o.a === 0 && o.b === 0) return new Hcl(NaN, 0 < o.l && o.l < 100 ? 0 : NaN, o.l, o.opacity);
  var h = Math.atan2(o.b, o.a) * _math_js__WEBPACK_IMPORTED_MODULE_2__["rad2deg"];
  return new Hcl(h < 0 ? h + 360 : h, Math.sqrt(o.a * o.a + o.b * o.b), o.l, o.opacity);
}

function lch(l, c, h, opacity) {
  return arguments.length === 1 ? hclConvert(l) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function hcl(h, c, l, opacity) {
  return arguments.length === 1 ? hclConvert(h) : new Hcl(h, c, l, opacity == null ? 1 : opacity);
}

function Hcl(h, c, l, opacity) {
  this.h = +h;
  this.c = +c;
  this.l = +l;
  this.opacity = +opacity;
}

function hcl2lab(o) {
  if (isNaN(o.h)) return new Lab(o.l, 0, 0, o.opacity);
  var h = o.h * _math_js__WEBPACK_IMPORTED_MODULE_2__["deg2rad"];
  return new Lab(o.l, Math.cos(h) * o.c, Math.sin(h) * o.c, o.opacity);
}

Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Hcl, hcl, Object(_define_js__WEBPACK_IMPORTED_MODULE_0__["extend"])(_color_js__WEBPACK_IMPORTED_MODULE_1__["Color"], {
  brighter: function(k) {
    return new Hcl(this.h, this.c, this.l + K * (k == null ? 1 : k), this.opacity);
  },
  darker: function(k) {
    return new Hcl(this.h, this.c, this.l - K * (k == null ? 1 : k), this.opacity);
  },
  rgb: function() {
    return hcl2lab(this).rgb();
  }
}));


/***/ }),

/***/ "./node_modules/d3-color/src/math.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-color/src/math.js ***!
  \*******************************************/
/*! exports provided: deg2rad, rad2deg */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deg2rad", function() { return deg2rad; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rad2deg", function() { return rad2deg; });
var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;


/***/ }),

/***/ "./node_modules/delta-e/src/dE00.js":
/*!******************************************!*\
  !*** ./node_modules/delta-e/src/dE00.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @class dE00
 * @classdesc
 * The CIE2000 color difference algorithm.
 * http://en.wikipedia.org/wiki/Color_difference#CIEDE2000
 * @constructs dE00
 * @memberOf DeltaE
 * @property {object} x1 The LAB color configuration object.
 * @property {number} x1.L The lightness value, on scale of 0-100.
 * @property {number} x1.A The chroma value, on scale of -128 to 128.
 * @property {number} x1.B The hue value, on scale of -128 to 128.
 * @property {object} x2 The LAB color configuration object.
 * @property {number} x2.L The lightness value, on scale of 0-100.
 * @property {number} x2.A The chroma value, on scale of -128 to 128.
 * @property {number} x2.B The hue value, on scale of -128 to 128.
 * @property {object} weights The weights configuration object.
 * @property {number} weights.lightness A weight factor to apply to lightness.
 * @property {number} weights.chroma A weight factor to apply to chroma.
 * @property {number} weights.hue A weight factor to apply to hue.
 * @example
 * var deltaE = new dE00(
 *     {L:50, A:50, B:50},
 *     {L:100, A:50, B:50},
 * );
 * console.log(deltaE.getDeltaE());
 */
function dE00(x1, x2, weights) {
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    
    this.x1 = x1;
    this.x2 = x2;
    
    this.weights = weights || {};
    this.ksubL = this.weights.lightness || 1;
    this.ksubC = this.weights.chroma || 1;
    this.ksubH = this.weights.hue || 1;
    
    // Delta L Prime
    this.deltaLPrime = x2.L - x1.L;
    
    // L Bar
    this.LBar = (x1.L + x2.L) / 2;
    
    // C1 & C2
    this.C1 = sqrt(pow(x1.A, 2) + pow(x1.B, 2));
    this.C2 = sqrt(pow(x2.A, 2) + pow(x2.B, 2));
    
    // C Bar
    this.CBar = (this.C1 + this.C2) / 2;
    
    // A Prime 1
    this.aPrime1 = x1.A +
        (x1.A / 2) *
        (1 - sqrt(
            pow(this.CBar, 7) /
            (pow(this.CBar, 7) + pow(25, 7))
        ));

    // A Prime 2
    this.aPrime2 = x2.A +
        (x2.A / 2) *
        (1 - sqrt(
            pow(this.CBar, 7) /
            (pow(this.CBar, 7) + pow(25, 7))
        ));

    // C Prime 1
    this.CPrime1 = sqrt(
        pow(this.aPrime1, 2) +
        pow(x1.B, 2)
    );
    
    // C Prime 2
    this.CPrime2 = sqrt(
        pow(this.aPrime2, 2) +
        pow(x2.B, 2)
    );
    
    // C Bar Prime
    this.CBarPrime = (this.CPrime1 + this.CPrime2) / 2;
    
    // Delta C Prime
    this.deltaCPrime = this.CPrime2 - this.CPrime1;
    
    // S sub L
    this.SsubL = 1 + (
        (0.015 * pow(this.LBar - 50, 2)) /
        sqrt(20 + pow(this.LBar - 50, 2))
    );
    
    // S sub C
    this.SsubC = 1 + 0.045 * this.CBarPrime;
    
    /**
     * Properties set in getDeltaE method, for access to convenience functions
     */
    // h Prime 1
    this.hPrime1 = 0;
    
    // h Prime 2
    this.hPrime2 = 0;
    
    // Delta h Prime
    this.deltahPrime = 0;
    
    // Delta H Prime
    this.deltaHPrime = 0;
    
    // H Bar Prime
    this.HBarPrime = 0;
    
    // T
    this.T = 0;
    
    // S sub H
    this.SsubH = 0;
    
    // R sub T
    this.RsubT = 0;
}

/**
 * Returns the deltaE value.
 * @method
 * @returns {number}
 */
dE00.prototype.getDeltaE = function() {
    var sqrt = Math.sqrt;
    var sin = Math.sin;
    var pow = Math.pow;
    
    // h Prime 1
    this.hPrime1 = this.gethPrime1();
    
    // h Prime 2
    this.hPrime2 = this.gethPrime2();
    
    // Delta h Prime
    this.deltahPrime = this.getDeltahPrime();
    
    // Delta H Prime
    this.deltaHPrime = 2 * sqrt(this.CPrime1 * this.CPrime2) * sin(this.degreesToRadians(this.deltahPrime) / 2);
    
    // H Bar Prime
    this.HBarPrime = this.getHBarPrime();
    
    // T
    this.T = this.getT();
    
    // S sub H
    this.SsubH = 1 + 0.015 * this.CBarPrime * this.T;
    
    // R sub T
    this.RsubT = this.getRsubT();
    
    // Put it all together!
    var lightness = this.deltaLPrime / (this.ksubL * this.SsubL);
    var chroma = this.deltaCPrime / (this.ksubC * this.SsubC);
    var hue = this.deltaHPrime / (this.ksubH * this.SsubH);
   
    return sqrt(
        pow(lightness, 2) +
        pow(chroma, 2) +
        pow(hue, 2) +
        this.RsubT * chroma * hue
    );
};

/**
 * Returns the RT variable calculation.
 * @method
 * @returns {number}
 */
dE00.prototype.getRsubT = function() {
    var sin = Math.sin;
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    var exp = Math.exp;
    
    return -2 *
        sqrt(
            pow(this.CBarPrime, 7) /
            (pow(this.CBarPrime, 7) + pow(25, 7))
        ) *
        sin(this.degreesToRadians(
            60 *
            exp(
                -(
                    pow(
                        (this.HBarPrime - 275) / 25, 2
                    )
                )
            )
        ));
};

/**
 * Returns the T variable calculation.
 * @method
 * @returns {number}
 */
dE00.prototype.getT = function() {
    var cos = Math.cos;
    
    return 1 -
        0.17 * cos(this.degreesToRadians(this.HBarPrime - 30)) +
        0.24 * cos(this.degreesToRadians(2 * this.HBarPrime)) +
        0.32 * cos(this.degreesToRadians(3 * this.HBarPrime + 6)) -
        0.20 * cos(this.degreesToRadians(4 * this.HBarPrime - 63));
};

/**
 * Returns the H Bar Prime variable calculation.
 * @method
 * @returns {number}
 */
dE00.prototype.getHBarPrime= function() {
    var abs = Math.abs;
    
    if (abs(this.hPrime1 - this.hPrime2) > 180) {
        return (this.hPrime1 + this.hPrime2 + 360) / 2
    }
    
    return (this.hPrime1 + this.hPrime2) / 2
};

/**
 * Returns the Delta h Prime variable calculation.
 * @method
 * @returns {number}
 */
dE00.prototype.getDeltahPrime = function() {
    var abs = Math.abs;
    
    // When either C′1 or C′2 is zero, then Δh′ is irrelevant and may be set to
    // zero.
    if (0 === this.C1 || 0 === this.C2) {
        return 0;
    }
    
    if (abs(this.hPrime1 - this.hPrime2) <= 180) {
        return this.hPrime2 - this.hPrime1;
    }
    
    if (this.hPrime2 <= this.hPrime1) {
        return this.hPrime2 - this.hPrime1 + 360;
    } else {
        return this.hPrime2 - this.hPrime1 - 360;
    }
};

/**
 * Returns the h Prime 1 variable calculation.
 * @method
 * @returns {number}
 */
dE00.prototype.gethPrime1 = function() {
    return this._gethPrimeFn(this.x1.B, this.aPrime1);
};

/**
 * Returns the h Prime 2 variable calculation.
 * @method
 * @returns {number}
 */
dE00.prototype.gethPrime2 = function() {
    return this._gethPrimeFn(this.x2.B, this.aPrime2);
};

/**
 * A helper function to calculate the h Prime 1 and h Prime 2 values.
 * @method
 * @private
 * @returns {number}
 */
dE00.prototype._gethPrimeFn = function(x, y) {
    var hueAngle;
    
    if (x === 0 && y === 0) {
        return 0;
    }
    
    hueAngle = this.radiansToDegrees(Math.atan2(x, y));
    
    if (hueAngle >= 0) {
        return hueAngle;
    } else {
        return hueAngle + 360;
    }
};

/**
 * Gives the radian equivalent of a specified degree angle.
 * @method
 * @returns {number}
 */
dE00.prototype.radiansToDegrees = function(radians) {
    return radians * (180 / Math.PI);
};

/**
 * Gives the degree equivalent of a specified radian.
 * @method
 * @returns {number}
 */
dE00.prototype.degreesToRadians = function(degrees) {
    return degrees * (Math.PI / 180);
};

module.exports = dE00;

/***/ }),

/***/ "./node_modules/delta-e/src/dE76.js":
/*!******************************************!*\
  !*** ./node_modules/delta-e/src/dE76.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @class dE76
 * @classdesc
 * The CIE76 color difference algorithm: a simple euclidean distance calculation.
 * http://en.wikipedia.org/wiki/Color_difference#CIE76
 * @constructs dE76
 * @memberOf DeltaE
 * @property {object} x1 The LAB color configuration object.
 * @property {number} x1.L The lightness value, on scale of 0-100.
 * @property {number} x1.A The chroma value, on scale of -128 to 128.
 * @property {number} x1.B The hue value, on scale of -128 to 128.
 * @property {object} x2 The LAB color configuration object.
 * @property {number} x2.L The lightness value, on scale of 0-100.
 * @property {number} x2.A The chroma value, on scale of -128 to 128.
 * @property {number} x2.B The hue value, on scale of -128 to 128.
 * @example
 * var deltaE = new dE76(
 *     {L:50, A:50, B:50},
 *     {L:100, A:50, B:50},
 * );
 * console.log(deltaE.getDeltaE());
 */
function dE76(x1, x2) {
    this.x1 = x1;
    this.x2 = x2;
}

/**
 * Returns the dE76 value.
 * @method
 * @returns {number}
 */
dE76.prototype.getDeltaE = function() {
    var x1 = this.x1;
    var x2 = this.x2;
    
    return Math.sqrt(
        Math.pow(x2.L - x1.L, 2) +
        Math.pow(x2.A - x1.A, 2) +
        Math.pow(x2.B - x1.B, 2)
    );
};

module.exports = dE76;

/***/ }),

/***/ "./node_modules/delta-e/src/dE94.js":
/*!******************************************!*\
  !*** ./node_modules/delta-e/src/dE94.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @class dE94
 * @classdesc
 * The CIE94 algorithm: an iteration of the CIE76 algorithm.
 * http://en.wikipedia.org/wiki/Color_difference#CIE94
 * @constructs dE94
 * @memberOf DeltaE
 * @property {object} x1 The LAB color configuration object.
 * @property {number} x1.L The lightness value, on scale of 0-100.
 * @property {number} x1.A The chroma value, on scale of -128 to 128.
 * @property {number} x1.B The hue value, on scale of -128 to 128.
 * @property {object} x2 The LAB color configuration object.
 * @property {number} x2.L The lightness value, on scale of 0-100.
 * @property {number} x2.A The chroma value, on scale of -128 to 128.
 * @property {number} x2.B The hue value, on scale of -128 to 128.
 * @property {object} weights The weights configuration object.
 * @property {number} weights.lightness A weight factor to apply to lightness.
 * @property {number} weights.chroma A weight factor to apply to chroma.
 * @property {number} weights.hue A weight factor to apply to hue.
 * @example
 * var deltaE = new dE94(
 *     {L:50, A:50, B:50},
 *     {L:100, A:50, B:50},
 * );
 * console.log(deltaE.getDeltaE());
 */
function dE94(x1, x2, weights) {
    this.x1 = x1;
    this.x2 = x2;
    
    this.weights = weights || {};
    this.weights.lightness = this.weights.lightness || 1;
    this.weights.chroma = this.weights.chroma || 1;
    this.weights.hue = this.weights.hue || 1;
    
    if (1 === this.weights.lightness) {
        this.weights.K1 = 0.045;
        this.weights.K2 = 0.015;
    } else {
        this.weights.K1 = 0.048;
        this.weights.K2 = 0.014;
    }
}

/**
 * Returns the dE94 value.
 * @method
 * @returns {number}
 */
dE94.prototype.getDeltaE = function() {
    var x1 = this.x1;
    var x2 = this.x2;
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    
    return sqrt(
        pow(this.calculateL(x1, x2), 2) +
        pow(this.calculateA(x1, x2), 2) +
        pow(this.calculateB(x1, x2), 2)
    );
};

/**
 * Calculates the lightness value.
 * @method
 * @returns {number}
 */
dE94.prototype.calculateL = function(x1, x2) {
    return (x1.L - x2.L) / this.weights.lightness;
};

/**
 * Calculates the chroma value.
 * @method
 * @returns {number}
 */
dE94.prototype.calculateA = function(x1, x2) {
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    
    //top
    var c1 = sqrt(pow(x1.A, 2) + pow(x1.B, 2));
    var c2 = sqrt(pow(x2.A, 2) + pow(x2.B, 2));
    var cab = c1 - c2;
    
    // bottom
    var sc = 1 + (this.weights.K1 * c1);
    
    return cab / (this.weights.chroma * sc);
};

/**
 * Calculates the hue value.
 * @method
 * @returns {number}
 */
dE94.prototype.calculateB = function(x1, x2) {
    var sqrt = Math.sqrt;
    var pow = Math.pow;
    
    // cab
    var c1 = sqrt(pow(x1.A, 2) + pow(x1.B, 2));
    var c2 = sqrt(pow(x2.A, 2) + pow(x2.B, 2));
    var cab = c1 - c2;
    
    // top
    var a = x1.A - x2.A;
    var b = x1.B - x2.B;
    var hab = sqrt(
        pow(a, 2) +
        pow(b, 2) -
        pow(cab, 2)
    );
    
    // bottom
    var c1 = sqrt(pow(x1.A, 2) + pow(x1.B, 2));
    var sh = 1 + (this.weights.K2 * c1);
    
    return hab / sh;
};

module.exports = dE94;

/***/ }),

/***/ "./node_modules/delta-e/src/index.js":
/*!*******************************************!*\
  !*** ./node_modules/delta-e/src/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @class DeltaE
 * @classdesc
 * A package of dE76, dE94, and dE00 algorithms.
 * @constructs DeltaE
 * @example
 * var DeltaE = new DeltaE();
 * var labColor1 = {L: 50, A: 50, B: 50};
 * var labColor2 = {L: 20, A: 20, B: 20};
 * 
 * DeltaE.getDeltaE94(labColor1, labColor2);
 */
var dE76 = __webpack_require__(/*! ./dE76 */ "./node_modules/delta-e/src/dE76.js");
var dE94 = __webpack_require__(/*! ./dE94 */ "./node_modules/delta-e/src/dE94.js");
var dE00 = __webpack_require__(/*! ./dE00 */ "./node_modules/delta-e/src/dE00.js");

function DeltaE() {}

/**
 * The CIE76 color difference algorithm: a simple euclidean distance calculation.
 * http://en.wikipedia.org/wiki/Color_difference#CIE76
 * @property {object} x1 The LAB color configuration object.
 * @property {number} x1.L The lightness value, on scale of 0-100.
 * @property {number} x1.A The chroma value, on scale of -128 to 128.
 * @property {number} x1.B The hue value, on scale of -128 to 128.
 * @property {object} x2 The LAB color configuration object.
 * @property {number} x2.L The lightness value, on scale of 0-100.
 * @property {number} x2.A The chroma value, on scale of -128 to 128.
 * @property {number} x2.B The hue value, on scale of -128 to 128.
 * @returns {number} The computed dE76 value.
 * @example
 * var labColor1 = {L: 50, A: 50, B: 50};
 * var labColor2 = {L: 20, A: 20, B: 20};
 * 
 * DeltaE.getDeltaE76(labColor1, labColor2);
 */
DeltaE.prototype.getDeltaE76 = function(lab1, lab2) {
    var deltaE = new dE76(lab1, lab2);
    return deltaE.getDeltaE();
};

/**
 * The CIE94 algorithm: an iteration of the CIE76 algorithm.
 * http://en.wikipedia.org/wiki/Color_difference#CIE94
 * @property {object} x1 The LAB color configuration object.
 * @property {number} x1.L The lightness value, on scale of 0-100.
 * @property {number} x1.A The chroma value, on scale of -128 to 128.
 * @property {number} x1.B The hue value, on scale of -128 to 128.
 * @property {object} x2 The LAB color configuration object.
 * @property {number} x2.L The lightness value, on scale of 0-100.
 * @property {number} x2.A The chroma value, on scale of -128 to 128.
 * @property {number} x2.B The hue value, on scale of -128 to 128.
 * @property {object} weights The weights configuration object.
 * @property {number} weights.lightness A weight factor to apply to lightness.
 * @property {number} weights.chroma A weight factor to apply to chroma.
 * @property {number} weights.hue A weight factor to apply to hue.
 * @returns {number} The computed dE94 value.
 * @example
 * var labColor1 = {L: 50, A: 50, B: 50};
 * var labColor2 = {L: 20, A: 20, B: 20};
 * 
 * DeltaE.getDeltaE94(labColor1, labColor2);
 */
DeltaE.prototype.getDeltaE94 = function(lab1, lab2) {
    var deltaE = new dE94(lab1, lab2);
    return deltaE.getDeltaE();
};

/**
 * The CIE2000 color difference algorithm.
 * http://en.wikipedia.org/wiki/Color_difference#CIEDE2000
 * @property {object} x1 The LAB color configuration object.
 * @property {number} x1.L The lightness value, on scale of 0-100.
 * @property {number} x1.A The chroma value, on scale of -128 to 128.
 * @property {number} x1.B The hue value, on scale of -128 to 128.
 * @property {object} x2 The LAB color configuration object.
 * @property {number} x2.L The lightness value, on scale of 0-100.
 * @property {number} x2.A The chroma value, on scale of -128 to 128.
 * @property {number} x2.B The hue value, on scale of -128 to 128.
 * @property {object} weights The weights configuration object.
 * @property {number} weights.lightness A weight factor to apply to lightness.
 * @property {number} weights.chroma A weight factor to apply to chroma.
 * @property {number} weights.hue A weight factor to apply to hue.
 * @returns {number} The computed dE00 value.
 * @example
 * var labColor1 = {L: 50, A: 50, B: 50};
 * var labColor2 = {L: 20, A: 20, B: 20};
 * 
 * DeltaE.getDeltaE00(labColor1, labColor2);
 */
DeltaE.prototype.getDeltaE00 = function(lab1, lab2) {
    var deltaE = new dE00(lab1, lab2);
    return deltaE.getDeltaE();
};

module.exports = new DeltaE;

/***/ }),

/***/ "./node_modules/mocha-js-delegate/index.js":
/*!*************************************************!*\
  !*** ./node_modules/mocha-js-delegate/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* globals MOClassDescription, NSObject, NSSelectorFromString, NSClassFromString, MOPropertyDescription */

module.exports = function MochaDelegate(definition, superclass) {
  var uniqueClassName =
    'MochaJSDelegate_DynamicClass_' + NSUUID.UUID().UUIDString()

  var delegateClassDesc = MOClassDescription.allocateDescriptionForClassWithName_superclass_(
    uniqueClassName,
    superclass || NSObject
  )

  // Storage
  var handlers = {}
  var ivars = {}

  // Define an instance method
  function setHandlerForSelector(selectorString, func) {
    var handlerHasBeenSet = selectorString in handlers
    var selector = NSSelectorFromString(selectorString)

    handlers[selectorString] = func

    /*
      For some reason, Mocha acts weird about arguments: https://github.com/logancollins/Mocha/issues/28
      We have to basically create a dynamic handler with a likewise dynamic number of predefined arguments.
    */
    if (!handlerHasBeenSet) {
      var args = []
      var regex = /:/g
      while (regex.exec(selectorString)) {
        args.push('arg' + args.length)
      }

      // eslint-disable-next-line no-eval
      var dynamicFunction = eval(
        '(function (' +
          args.join(', ') +
          ') { return handlers[selectorString].apply(this, arguments); })'
      )

      delegateClassDesc.addInstanceMethodWithSelector_function(
        selector,
        dynamicFunction
      )
    }
  }

  // define a property
  function setIvar(key, value) {
    var ivarHasBeenSet = key in handlers

    ivars[key] = value

    if (!ivarHasBeenSet) {
      delegateClassDesc.addInstanceVariableWithName_typeEncoding(key, '@')
      var description = MOPropertyDescription.new()
      description.name = key
      description.typeEncoding = '@'
      description.weak = true
      description.ivarName = key
      delegateClassDesc.addProperty(description)
    }
  }

  this.getClass = function() {
    return NSClassFromString(uniqueClassName)
  }

  this.getClassInstance = function(instanceVariables) {
    var instance = NSClassFromString(uniqueClassName).new()
    Object.keys(ivars).forEach(function(key) {
      instance[key] = ivars[key]
    })
    Object.keys(instanceVariables || {}).forEach(function(key) {
      instance[key] = instanceVariables[key]
    })
    return instance
  }
  // alias
  this.new = this.getClassInstance

  // Convenience
  if (typeof definition === 'object') {
    Object.keys(definition).forEach(
      function(key) {
        if (typeof definition[key] === 'function') {
          setHandlerForSelector(key, definition[key])
        } else {
          setIvar(key, definition[key])
        }
      }
    )
  }

  delegateClassDesc.registerClass()
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/browser-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/browser-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function parseHexColor(color) {
  // Check the string for incorrect formatting.
  if (!color || color[0] !== '#') {
    if (
      color &&
      typeof color.isKindOfClass === 'function' &&
      color.isKindOfClass(NSColor)
    ) {
      return color
    }
    throw new Error(
      'Incorrect color formating. It should be an hex color: #RRGGBBAA'
    )
  }

  // append FF if alpha channel is not specified.
  var source = color.substr(1)
  if (source.length === 3) {
    source += 'F'
  } else if (source.length === 6) {
    source += 'FF'
  }
  // Convert the string from #FFF format to #FFFFFF format.
  var hex
  if (source.length === 4) {
    for (var i = 0; i < 4; i += 1) {
      hex += source[i]
      hex += source[i]
    }
  } else if (source.length === 8) {
    hex = source
  } else {
    return NSColor.whiteColor()
  }

  var r = parseInt(hex.slice(0, 2), 16)
  var g = parseInt(hex.slice(2, 4), 16)
  var b = parseInt(hex.slice(4, 6), 16)
  var a = parseInt(hex.slice(6, 8), 16)

  return NSColor.colorWithSRGBRed_green_blue_alpha(r, g, b, a)
}

module.exports = function(browserWindow, panel, webview) {
  // keep reference to the subviews
  browserWindow._panel = panel
  browserWindow._webview = webview
  browserWindow._destroyed = false

  browserWindow.destroy = function() {
    return panel.close()
  }

  browserWindow.close = function() {
    if (panel.delegate().utils && panel.delegate().utils.parentWindow) {
      var shouldClose = true
      browserWindow.emit('close', {
        get defaultPrevented() {
          return !shouldClose
        },
        preventDefault: function() {
          shouldClose = false
        },
      })
      if (shouldClose) {
        panel.delegate().utils.parentWindow.endSheet(panel)
      }
      return
    }

    if (!browserWindow.isClosable()) {
      return
    }

    panel.performClose(null)
  }

  function focus(focused) {
    if (!browserWindow.isVisible()) {
      return
    }
    if (focused) {
      NSApplication.sharedApplication().activateIgnoringOtherApps(true)
      panel.makeKeyAndOrderFront(null)
    } else {
      panel.orderBack(null)
      NSApp.mainWindow().makeKeyAndOrderFront(null)
    }
  }

  browserWindow.focus = focus.bind(this, true)
  browserWindow.blur = focus.bind(this, false)

  browserWindow.isFocused = function() {
    return panel.isKeyWindow()
  }

  browserWindow.isDestroyed = function() {
    return browserWindow._destroyed
  }

  browserWindow.show = function() {
    // This method is supposed to put focus on window, however if the app does not
    // have focus then "makeKeyAndOrderFront" will only show the window.
    NSApp.activateIgnoringOtherApps(true)

    if (panel.delegate().utils && panel.delegate().utils.parentWindow) {
      return panel.delegate().utils.parentWindow.beginSheet_completionHandler(
        panel,
        __mocha__.createBlock_function('v16@?0q8', function() {
          browserWindow.emit('closed')
        })
      )
    }

    return panel.makeKeyAndOrderFront(null)
  }

  browserWindow.showInactive = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.hide = function() {
    return panel.orderOut(null)
  }

  browserWindow.isVisible = function() {
    return panel.isVisible()
  }

  browserWindow.isModal = function() {
    return false
  }

  browserWindow.maximize = function() {
    if (!browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }
  browserWindow.unmaximize = function() {
    if (browserWindow.isMaximized()) {
      panel.zoom(null)
    }
  }

  browserWindow.isMaximized = function() {
    if ((panel.styleMask() & NSResizableWindowMask) !== 0) {
      return panel.isZoomed()
    }
    var rectScreen = NSScreen.mainScreen().visibleFrame()
    var rectWindow = panel.frame()
    return (
      rectScreen.origin.x == rectWindow.origin.x &&
      rectScreen.origin.y == rectWindow.origin.y &&
      rectScreen.size.width == rectWindow.size.width &&
      rectScreen.size.height == rectWindow.size.height
    )
  }

  browserWindow.minimize = function() {
    return panel.miniaturize(null)
  }

  browserWindow.restore = function() {
    return panel.deminiaturize(null)
  }

  browserWindow.isMinimized = function() {
    return panel.isMiniaturized()
  }

  browserWindow.setFullScreen = function(fullscreen) {
    if (fullscreen !== browserWindow.isFullscreen()) {
      panel.toggleFullScreen(null)
    }
  }

  browserWindow.isFullscreen = function() {
    return panel.styleMask() & NSFullScreenWindowMask
  }

  browserWindow.setAspectRatio = function(aspectRatio /* , extraSize */) {
    // Reset the behaviour to default if aspect_ratio is set to 0 or less.
    if (aspectRatio > 0.0) {
      panel.setAspectRatio(NSMakeSize(aspectRatio, 1.0))
    } else {
      panel.setResizeIncrements(NSMakeSize(1.0, 1.0))
    }
  }

  browserWindow.setBounds = function(bounds, animate) {
    if (!bounds) {
      return
    }

    // Do nothing if in fullscreen mode.
    if (browserWindow.isFullscreen()) {
      return
    }

    const newBounds = Object.assign(browserWindow.getBounds(), bounds)

    // TODO: Check size constraints since setFrame does not check it.
    // var size = bounds.size
    // size.SetToMax(GetMinimumSize());
    // gfx::Size max_size = GetMaximumSize();
    // if (!max_size.IsEmpty())
    //   size.SetToMin(max_size);

    var cocoaBounds = NSMakeRect(
      newBounds.x,
      0,
      newBounds.width,
      newBounds.height
    )
    // Flip Y coordinates based on the primary screen
    var screen = NSScreen.screens().firstObject()
    cocoaBounds.origin.y = NSHeight(screen.frame()) - newBounds.y

    panel.setFrame_display_animate(cocoaBounds, true, animate)
  }

  browserWindow.getBounds = function() {
    const cocoaBounds = panel.frame()
    var mainScreenRect = NSScreen.screens()
      .firstObject()
      .frame()
    return {
      x: cocoaBounds.origin.x,
      y: Math.round(NSHeight(mainScreenRect) - cocoaBounds.origin.y),
      width: cocoaBounds.size.width,
      height: cocoaBounds.size.height,
    }
  }

  browserWindow.setContentBounds = function(bounds, animate) {
    // TODO:
    browserWindow.setBounds(bounds, animate)
  }

  browserWindow.getContentBounds = function() {
    // TODO:
    return browserWindow.getBounds()
  }

  browserWindow.setSize = function(width, height, animate) {
    // TODO: handle resizing around center
    return browserWindow.setBounds({ width: width, height: height }, animate)
  }

  browserWindow.getSize = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.width, bounds.height]
  }

  browserWindow.setContentSize = function(width, height, animate) {
    // TODO: handle resizing around center
    return browserWindow.setContentBounds(
      { width: width, height: height },
      animate
    )
  }

  browserWindow.getContentSize = function() {
    var bounds = browserWindow.getContentBounds()
    return [bounds.width, bounds.height]
  }

  browserWindow.setMinimumSize = function(width, height) {
    const minSize = CGSizeMake(width, height)
    panel.setContentMinSize(minSize)
  }

  browserWindow.getMinimumSize = function() {
    const size = panel.contentMinSize()
    return [size.width, size.height]
  }

  browserWindow.setMaximumSize = function(width, height) {
    const maxSize = CGSizeMake(width, height)
    panel.setContentMaxSize(maxSize)
  }

  browserWindow.getMaximumSize = function() {
    const size = panel.contentMaxSize()
    return [size.width, size.height]
  }

  browserWindow.setResizable = function(resizable) {
    return browserWindow._setStyleMask(resizable, NSResizableWindowMask)
  }

  browserWindow.isResizable = function() {
    return panel.styleMask() & NSResizableWindowMask
  }

  browserWindow.setMovable = function(movable) {
    return panel.setMovable(movable)
  }
  browserWindow.isMovable = function() {
    return panel.isMovable()
  }

  browserWindow.setMinimizable = function(minimizable) {
    return browserWindow._setStyleMask(minimizable, NSMiniaturizableWindowMask)
  }

  browserWindow.isMinimizable = function() {
    return panel.styleMask() & NSMiniaturizableWindowMask
  }

  browserWindow.setMaximizable = function(maximizable) {
    if (panel.standardWindowButton(NSWindowZoomButton)) {
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(maximizable)
    }
  }

  browserWindow.isMaximizable = function() {
    return (
      panel.standardWindowButton(NSWindowZoomButton) &&
      panel.standardWindowButton(NSWindowZoomButton).isEnabled()
    )
  }

  browserWindow.setFullScreenable = function(fullscreenable) {
    browserWindow._setCollectionBehavior(
      fullscreenable,
      NSWindowCollectionBehaviorFullScreenPrimary
    )
    // On EL Capitan this flag is required to hide fullscreen button.
    browserWindow._setCollectionBehavior(
      !fullscreenable,
      NSWindowCollectionBehaviorFullScreenAuxiliary
    )
  }

  browserWindow.isFullScreenable = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorFullScreenPrimary
  }

  browserWindow.setClosable = function(closable) {
    browserWindow._setStyleMask(closable, NSClosableWindowMask)
  }

  browserWindow.isClosable = function() {
    return panel.styleMask() & NSClosableWindowMask
  }

  browserWindow.setAlwaysOnTop = function(top, level, relativeLevel) {
    var windowLevel = NSNormalWindowLevel
    var maxWindowLevel = CGWindowLevelForKey(kCGMaximumWindowLevelKey)
    var minWindowLevel = CGWindowLevelForKey(kCGMinimumWindowLevelKey)

    if (top) {
      if (level === 'normal') {
        windowLevel = NSNormalWindowLevel
      } else if (level === 'torn-off-menu') {
        windowLevel = NSTornOffMenuWindowLevel
      } else if (level === 'modal-panel') {
        windowLevel = NSModalPanelWindowLevel
      } else if (level === 'main-menu') {
        windowLevel = NSMainMenuWindowLevel
      } else if (level === 'status') {
        windowLevel = NSStatusWindowLevel
      } else if (level === 'pop-up-menu') {
        windowLevel = NSPopUpMenuWindowLevel
      } else if (level === 'screen-saver') {
        windowLevel = NSScreenSaverWindowLevel
      } else if (level === 'dock') {
        // Deprecated by macOS, but kept for backwards compatibility
        windowLevel = NSDockWindowLevel
      } else {
        windowLevel = NSFloatingWindowLevel
      }
    }

    var newLevel = windowLevel + (relativeLevel || 0)
    if (newLevel >= minWindowLevel && newLevel <= maxWindowLevel) {
      panel.setLevel(newLevel)
    } else {
      throw new Error(
        'relativeLevel must be between ' +
          minWindowLevel +
          ' and ' +
          maxWindowLevel
      )
    }
  }

  browserWindow.isAlwaysOnTop = function() {
    return panel.level() !== NSNormalWindowLevel
  }

  browserWindow.moveTop = function() {
    return panel.orderFrontRegardless()
  }

  browserWindow.center = function() {
    panel.center()
  }

  browserWindow.setPosition = function(x, y, animate) {
    return browserWindow.setBounds({ x: x, y: y }, animate)
  }

  browserWindow.getPosition = function() {
    var bounds = browserWindow.getBounds()
    return [bounds.x, bounds.y]
  }

  browserWindow.setTitle = function(title) {
    panel.setTitle(title)
  }

  browserWindow.getTitle = function() {
    return String(panel.title())
  }

  var attentionRequestId = 0
  browserWindow.flashFrame = function(flash) {
    if (flash) {
      attentionRequestId = NSApp.requestUserAttention(NSInformationalRequest)
    } else {
      NSApp.cancelUserAttentionRequest(attentionRequestId)
      attentionRequestId = 0
    }
  }

  browserWindow.getNativeWindowHandle = function() {
    return panel
  }

  browserWindow.getNativeWebViewHandle = function() {
    return webview
  }

  browserWindow.loadURL = function(url) {
    // When frameLocation is a file, prefix it with the Sketch Resources path
    if (/^(?!https?|file).*\.html?$/.test(url)) {
      if (typeof __command !== 'undefined' && __command.pluginBundle()) {
        url =
          'file://' +
          __command
            .pluginBundle()
            .urlForResourceNamed(url)
            .path()
      }
    }

    if (/^file:\/\/.*\.html?$/.test(url)) {
      // ensure URLs containing spaces are properly handled
      url = NSString.alloc().initWithString(url)
      url = url.stringByAddingPercentEncodingWithAllowedCharacters(
        NSCharacterSet.URLQueryAllowedCharacterSet()
      )
      webview.loadFileURL_allowingReadAccessToURL(
        NSURL.URLWithString(url),
        NSURL.URLWithString('file:///')
      )
      return
    }

    const properURL = NSURL.URLWithString(url)
    const urlRequest = NSURLRequest.requestWithURL(properURL)

    webview.loadRequest(urlRequest)
  }

  browserWindow.reload = function() {
    webview.reload()
  }

  browserWindow.setHasShadow = function(hasShadow) {
    return panel.setHasShadow(hasShadow)
  }

  browserWindow.hasShadow = function() {
    return panel.hasShadow()
  }

  browserWindow.setOpacity = function(opacity) {
    return panel.setAlphaValue(opacity)
  }

  browserWindow.getOpacity = function() {
    return panel.alphaValue()
  }

  browserWindow.setVisibleOnAllWorkspaces = function(visible) {
    return browserWindow._setCollectionBehavior(
      visible,
      NSWindowCollectionBehaviorCanJoinAllSpaces
    )
  }

  browserWindow.isVisibleOnAllWorkspaces = function() {
    var collectionBehavior = panel.collectionBehavior()
    return collectionBehavior & NSWindowCollectionBehaviorCanJoinAllSpaces
  }

  browserWindow.setIgnoreMouseEvents = function(ignore) {
    return panel.setIgnoresMouseEvents(ignore)
  }

  browserWindow.setContentProtection = function(enable) {
    panel.setSharingType(enable ? NSWindowSharingNone : NSWindowSharingReadOnly)
  }

  browserWindow.setAutoHideCursor = function(autoHide) {
    panel.setDisableAutoHideCursor(autoHide)
  }

  browserWindow.setVibrancy = function(type) {
    var effectView = browserWindow._vibrantView

    if (!type) {
      if (effectView == null) {
        return
      }

      effectView.removeFromSuperview()
      panel.setVibrantView(null)
      return
    }

    if (effectView == null) {
      var contentView = panel.contentView()
      effectView = NSVisualEffectView.alloc().initWithFrame(
        contentView.bounds()
      )
      browserWindow._vibrantView = effectView

      effectView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
      effectView.setBlendingMode(NSVisualEffectBlendingModeBehindWindow)
      effectView.setState(NSVisualEffectStateActive)
      effectView.setFrame(contentView.bounds())
      contentView.addSubview_positioned_relativeTo(
        effectView,
        NSWindowBelow,
        null
      )
    }

    var vibrancyType = NSVisualEffectMaterialLight

    if (type === 'appearance-based') {
      vibrancyType = NSVisualEffectMaterialAppearanceBased
    } else if (type === 'light') {
      vibrancyType = NSVisualEffectMaterialLight
    } else if (type === 'dark') {
      vibrancyType = NSVisualEffectMaterialDark
    } else if (type === 'titlebar') {
      vibrancyType = NSVisualEffectMaterialTitlebar
    } else if (type === 'selection') {
      vibrancyType = NSVisualEffectMaterialSelection
    } else if (type === 'menu') {
      vibrancyType = NSVisualEffectMaterialMenu
    } else if (type === 'popover') {
      vibrancyType = NSVisualEffectMaterialPopover
    } else if (type === 'sidebar') {
      vibrancyType = NSVisualEffectMaterialSidebar
    } else if (type === 'medium-light') {
      vibrancyType = NSVisualEffectMaterialMediumLight
    } else if (type === 'ultra-dark') {
      vibrancyType = NSVisualEffectMaterialUltraDark
    }

    effectView.setMaterial(vibrancyType)
  }

  browserWindow._setBackgroundColor = function(colorName) {
    var color = parseHexColor(colorName)
    webview.setValue_forKey(false, 'drawsBackground')
    panel.backgroundColor = color
  }

  browserWindow._invalidate = function() {
    panel.flushWindow()
    panel.contentView().setNeedsDisplay(true)
  }

  browserWindow._setStyleMask = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setStyleMask(panel.styleMask() | flag)
    } else {
      panel.setStyleMask(panel.styleMask() & ~flag)
    }
    // Change style mask will make the zoom button revert to default, probably
    // a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._setCollectionBehavior = function(on, flag) {
    var wasMaximizable = browserWindow.isMaximizable()
    if (on) {
      panel.setCollectionBehavior(panel.collectionBehavior() | flag)
    } else {
      panel.setCollectionBehavior(panel.collectionBehavior() & ~flag)
    }
    // Change collectionBehavior will make the zoom button revert to default,
    // probably a bug of Cocoa or macOS.
    browserWindow.setMaximizable(wasMaximizable)
  }

  browserWindow._showWindowButton = function(button) {
    var view = panel.standardWindowButton(button)
    view.superview().addSubview_positioned_relative(view, NSWindowAbove, null)
  }
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/constants.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  JS_BRIDGE: '__skpm_sketchBridge',
  START_MOVING_WINDOW: '__skpm_startMovingWindow',
  EXECUTE_JAVASCRIPT: '__skpm_executeJS',
  EXECUTE_JAVASCRIPT_SUCCESS: '__skpm_executeJS_success_',
  EXECUTE_JAVASCRIPT_ERROR: '__skpm_executeJS_error_',
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/dispatch-first-click.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var tagsToFocus =
  '["text", "textarea", "date", "datetime-local", "email", "number", "month", "password", "search", "tel", "time", "url", "week" ]'

module.exports = function(webView, event) {
  var point = webView.convertPoint_fromView(event.locationInWindow(), null)
  return (
    'var el = document.elementFromPoint(' + // get the DOM element that match the event
    point.x +
    ', ' +
    point.y +
    '); ' +
    'if (el && ' + // some tags need to be focused instead of clicked
    tagsToFocus +
    '.indexOf(el.type) >= 0 && ' +
    'el.focus' +
    ') {' +
    'el.focus();' + // so focus them
    '} else if (el) {' +
    'el.dispatchEvent(new Event("click", {bubbles: true}))' + // click the others
    '}'
  )
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/execute-javascript.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/execute-javascript.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Promise) {var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

module.exports = function(webview, browserWindow) {
  function executeJavaScript(script, userGesture, callback) {
    if (typeof userGesture === 'function') {
      callback = userGesture
      userGesture = false
    }
    var fiber = coscript.createFiber()

    // if the webview is not ready yet, defer the execution until it is
    if (
      webview.navigationDelegate().state &&
      webview.navigationDelegate().state.wasReady == 0
    ) {
      return new Promise(function(resolve, reject) {
        browserWindow.once('ready-to-show', function() {
          executeJavaScript(script, userGesture, callback)
            .then(resolve)
            .catch(reject)
          fiber.cleanup()
        })
      })
    }

    return new Promise(function(resolve, reject) {
      var requestId = Math.random()

      browserWindow.webContents.on(
        CONSTANTS.EXECUTE_JAVASCRIPT_SUCCESS + requestId,
        function(res) {
          try {
            if (callback) {
              callback(null, res)
            }
            resolve(res)
          } catch (err) {
            reject(err)
          }
          fiber.cleanup()
        }
      )
      browserWindow.webContents.on(
        CONSTANTS.EXECUTE_JAVASCRIPT_ERROR + requestId,
        function(err) {
          try {
            if (callback) {
              callback(err)
              resolve()
            } else {
              reject(err)
            }
          } catch (err2) {
            reject(err2)
          }
          fiber.cleanup()
        }
      )

      webview.evaluateJavaScript_completionHandler(
        module.exports.wrapScript(script, requestId),
        null
      )
    })
  }

  return executeJavaScript
}

module.exports.wrapScript = function(script, requestId) {
  return (
    'window.' +
    CONSTANTS.EXECUTE_JAVASCRIPT +
    '(' +
    requestId +
    ', ' +
    JSON.stringify(script) +
    ')'
  )
}

module.exports.injectScript = function(webView) {
  var source =
    'window.' +
    CONSTANTS.EXECUTE_JAVASCRIPT +
    ' = function(id, script) {' +
    '  try {' +
    '    var res = eval(script);' +
    '    if (res && typeof res.then === "function" && typeof res.catch === "function") {' +
    '      res.then(function (res2) {' +
    '        window.postMessage("' +
    CONSTANTS.EXECUTE_JAVASCRIPT_SUCCESS +
    '" + id, res2);' +
    '      })' +
    '      .catch(function (err) {' +
    '        window.postMessage("' +
    CONSTANTS.EXECUTE_JAVASCRIPT_ERROR +
    '" + id, err);' +
    '      })' +
    '    } else {' +
    '      window.postMessage("' +
    CONSTANTS.EXECUTE_JAVASCRIPT_SUCCESS +
    '" + id, res);' +
    '    }' +
    '  } catch (err) {' +
    '    window.postMessage("' +
    CONSTANTS.EXECUTE_JAVASCRIPT_ERROR +
    '" + id, err);' +
    '  }' +
    '}'
  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    source,
    0,
    true
  )
  webView
    .configuration()
    .userContentController()
    .addUserScript(script)
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@skpm/promise/index.js */ "./node_modules/@skpm/promise/index.js")))

/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/fitSubview.js":
/*!***************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/fitSubview.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function addEdgeConstraint(edge, subview, view, constant) {
  view.addConstraint(
    NSLayoutConstraint.constraintWithItem_attribute_relatedBy_toItem_attribute_multiplier_constant(
      subview,
      edge,
      NSLayoutRelationEqual,
      view,
      edge,
      1,
      constant
    )
  )
}
module.exports = function fitSubviewToView(subview, view, constants) {
  constants = constants || []
  subview.setTranslatesAutoresizingMaskIntoConstraints(false)

  addEdgeConstraint(NSLayoutAttributeLeft, subview, view, constants[0] || 0)
  addEdgeConstraint(NSLayoutAttributeTop, subview, view, constants[1] || 0)
  addEdgeConstraint(NSLayoutAttributeRight, subview, view, constants[2] || 0)
  addEdgeConstraint(NSLayoutAttributeBottom, subview, view, constants[3] || 0)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* let's try to match the API from Electron's Browser window
(https://github.com/electron/electron/blob/master/docs/api/browser-window.md) */
var EventEmitter = __webpack_require__(/*! events */ "events")
var buildBrowserAPI = __webpack_require__(/*! ./browser-api */ "./node_modules/sketch-module-web-view/lib/browser-api.js")
var buildWebAPI = __webpack_require__(/*! ./webview-api */ "./node_modules/sketch-module-web-view/lib/webview-api.js")
var fitSubviewToView = __webpack_require__(/*! ./fitSubview */ "./node_modules/sketch-module-web-view/lib/fitSubview.js")
var dispatchFirstClick = __webpack_require__(/*! ./dispatch-first-click */ "./node_modules/sketch-module-web-view/lib/dispatch-first-click.js")
var injectClientMessaging = __webpack_require__(/*! ./inject-client-messaging */ "./node_modules/sketch-module-web-view/lib/inject-client-messaging.js")
var movableArea = __webpack_require__(/*! ./movable-area */ "./node_modules/sketch-module-web-view/lib/movable-area.js")
var executeJavaScript = __webpack_require__(/*! ./execute-javascript */ "./node_modules/sketch-module-web-view/lib/execute-javascript.js")
var setDelegates = __webpack_require__(/*! ./set-delegates */ "./node_modules/sketch-module-web-view/lib/set-delegates.js")

function BrowserWindow(options) {
  options = options || {}

  var identifier = options.identifier || NSUUID.UUID().UUIDString()
  var threadDictionary = NSThread.mainThread().threadDictionary()

  var existingBrowserWindow = BrowserWindow.fromId(identifier)

  // if we already have a window opened, reuse it
  if (existingBrowserWindow) {
    return existingBrowserWindow
  }

  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (options.modal && !options.parent) {
    throw new Error('A modal needs to have a parent.')
  }

  // Long-running script
  var fiber = coscript.createFiber()

  // Window size
  var width = options.width || 800
  var height = options.height || 600
  var mainScreenRect = NSScreen.screens()
    .firstObject()
    .frame()
  var cocoaBounds = NSMakeRect(
    typeof options.x !== 'undefined'
      ? options.x
      : Math.round((NSWidth(mainScreenRect) - width) / 2),
    typeof options.y !== 'undefined'
      ? NSHeight(mainScreenRect) - options.y
      : Math.round((NSHeight(mainScreenRect) - height) / 2),
    width,
    height
  )

  if (options.titleBarStyle && options.titleBarStyle !== 'default') {
    options.frame = false
  }

  var useStandardWindow = options.windowType !== 'textured'
  var styleMask = NSTitledWindowMask

  // this is commented out because the toolbar doesn't appear otherwise :thinking-face:
  // if (!useStandardWindow || options.frame === false) {
  //   styleMask = NSFullSizeContentViewWindowMask
  // }
  if (options.minimizable !== false) {
    styleMask |= NSMiniaturizableWindowMask
  }
  if (options.closable !== false) {
    styleMask |= NSClosableWindowMask
  }
  if (options.resizable !== false) {
    styleMask |= NSResizableWindowMask
  }
  if (!useStandardWindow || options.transparent || options.frame === false) {
    styleMask |= NSTexturedBackgroundWindowMask
  }

  var panel = NSPanel.alloc().initWithContentRect_styleMask_backing_defer(
    cocoaBounds,
    styleMask,
    NSBackingStoreBuffered,
    true
  )

  var wkwebviewConfig = WKWebViewConfiguration.alloc().init()
  var webView = WKWebView.alloc().initWithFrame_configuration(
    CGRectMake(0, 0, options.width || 800, options.height || 600),
    wkwebviewConfig
  )
  injectClientMessaging(webView)
  webView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)
  setDelegates(browserWindow, panel, webView, options)

  if (options.windowType === 'desktop') {
    panel.setLevel(kCGDesktopWindowLevel - 1)
    // panel.setCanBecomeKeyWindow(false)
    panel.setCollectionBehavior(
      NSWindowCollectionBehaviorCanJoinAllSpaces |
        NSWindowCollectionBehaviorStationary |
        NSWindowCollectionBehaviorIgnoresCycle
    )
  }

  if (
    typeof options.minWidth !== 'undefined' ||
    typeof options.minHeight !== 'undefined'
  ) {
    browserWindow.setMinimumSize(options.minWidth || 0, options.minHeight || 0)
  }

  if (
    typeof options.maxWidth !== 'undefined' ||
    typeof options.maxHeight !== 'undefined'
  ) {
    browserWindow.setMaximumSize(
      options.maxWidth || 10000,
      options.maxHeight || 10000
    )
  }

  // if (options.focusable === false) {
  //   panel.setCanBecomeKeyWindow(false)
  // }

  if (options.transparent || options.frame === false) {
    panel.titlebarAppearsTransparent = true
    panel.titleVisibility = NSWindowTitleHidden
    panel.setOpaque(0)
    panel.isMovableByWindowBackground = true
    var toolbar2 = NSToolbar.alloc().initWithIdentifier(
      'titlebarStylingToolbar'
    )
    toolbar2.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar2)
  }

  if (options.titleBarStyle === 'hiddenInset') {
    var toolbar = NSToolbar.alloc().initWithIdentifier('titlebarStylingToolbar')
    toolbar.setShowsBaselineSeparator(false)
    panel.setToolbar(toolbar)
  }

  if (options.frame === false || !options.useContentSize) {
    browserWindow.setSize(width, height)
  }

  if (options.center) {
    browserWindow.center()
  }

  if (options.alwaysOnTop) {
    browserWindow.setAlwaysOnTop(true)
  }

  if (options.fullscreen) {
    browserWindow.setFullScreen(true)
  }
  browserWindow.setFullScreenable(!!options.fullscreenable)

  const title =
    options.title ||
    (typeof __command !== 'undefined' && __command.pluginBundle()
      ? __command.pluginBundle().name()
      : undefined)
  if (title) {
    browserWindow.setTitle(title)
  }

  var backgroundColor = options.backgroundColor
  if (options.transparent) {
    backgroundColor = NSColor.clearColor()
  }
  if (!backgroundColor && options.frame === false && options.vibrancy) {
    backgroundColor = NSColor.clearColor()
  }

  browserWindow._setBackgroundColor(
    backgroundColor || NSColor.windowBackgroundColor()
  )

  if (options.hasShadow === false) {
    browserWindow.setHasShadow(false)
  }

  if (typeof options.opacity !== 'undefined') {
    browserWindow.setOpacity(options.opacity)
  }

  options.webPreferences = options.webPreferences || {}

  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.devTools !== false,
      'developerExtrasEnabled'
    )
  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.javascript !== false,
      'javaScriptEnabled'
    )
  webView
    .configuration()
    .preferences()
    .setValue_forKey(!!options.webPreferences.plugins, 'plugInsEnabled')
  webView
    .configuration()
    .preferences()
    .setValue_forKey(
      options.webPreferences.minimumFontSize || 0,
      'minimumFontSize'
    )

  if (options.webPreferences.zoomFactor) {
    webView.setMagnification(options.webPreferences.zoomFactor)
  }

  var contentView = panel.contentView()

  if (options.frame !== false) {
    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)
  } else {
    // In OSX 10.10, adding subviews to the root view for the NSView hierarchy
    // produces warnings. To eliminate the warnings, we resize the contentView
    // to fill the window, and add subviews to that.
    // http://crbug.com/380412
    contentView.setAutoresizingMask(NSViewWidthSizable | NSViewHeightSizable)
    fitSubviewToView(contentView, contentView.superview())

    webView.setFrame(contentView.bounds())
    contentView.addSubview(webView)

    // The fullscreen button should always be hidden for frameless window.
    if (panel.standardWindowButton(NSWindowFullScreenButton)) {
      panel.standardWindowButton(NSWindowFullScreenButton).setHidden(true)
    }

    if (!options.titleBarStyle || options.titleBarStyle === 'default') {
      // Hide the window buttons.
      panel.standardWindowButton(NSWindowZoomButton).setHidden(true)
      panel.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true)
      panel.standardWindowButton(NSWindowCloseButton).setHidden(true)

      // Some third-party macOS utilities check the zoom button's enabled state to
      // determine whether to show custom UI on hover, so we disable it here to
      // prevent them from doing so in a frameless app window.
      panel.standardWindowButton(NSWindowZoomButton).setEnabled(false)
    }
  }

  if (options.vibrancy) {
    browserWindow.setVibrancy(options.vibrancy)
  }

  // Set maximizable state last to ensure zoom button does not get reset
  // by calls to other APIs.
  browserWindow.setMaximizable(options.maximizable !== false)

  panel.setHidesOnDeactivate(options.hidesOnDeactivate !== false)

  if (options.remembersWindowFrame) {
    panel.setFrameAutosaveName(identifier)
    panel.setFrameUsingName_force(panel.frameAutosaveName(), false)
  }

  if (options.acceptsFirstMouse) {
    browserWindow.on('focus', function(event) {
      if (event.type() === NSEventTypeLeftMouseDown) {
        browserWindow.webContents
          .executeJavaScript(dispatchFirstClick(webView, event))
          .catch(() => {})
      }
    })
  }

  executeJavaScript.injectScript(webView)
  movableArea.injectScript(webView)
  movableArea.setupHandler(browserWindow)

  if (options.show !== false) {
    browserWindow.show()
  }

  browserWindow.on('closed', function() {
    browserWindow._destroyed = true
    threadDictionary.removeObjectForKey(identifier)
    fiber.cleanup()
  })

  threadDictionary[identifier] = panel

  fiber.onCleanup(function() {
    if (!browserWindow._destroyed) {
      browserWindow.destroy()
    }
  })

  return browserWindow
}

BrowserWindow.fromId = function(identifier) {
  var threadDictionary = NSThread.mainThread().threadDictionary()

  if (threadDictionary[identifier]) {
    return BrowserWindow.fromPanel(threadDictionary[identifier], identifier)
  }

  return undefined
}

BrowserWindow.fromPanel = function(panel, identifier) {
  var browserWindow = new EventEmitter()
  browserWindow.id = identifier

  if (!panel || !panel.contentView) {
    throw new Error('needs to pass an NSPanel')
  }

  var webView = null
  var subviews = panel.contentView().subviews()
  for (var i = 0; i < subviews.length; i += 1) {
    if (
      !webView &&
      !subviews[i].isKindOfClass(WKInspectorWKWebView) &&
      subviews[i].isKindOfClass(WKWebView)
    ) {
      webView = subviews[i]
    }
  }

  if (!webView) {
    throw new Error('The panel needs to have a webview')
  }

  buildBrowserAPI(browserWindow, panel, webView)
  buildWebAPI(browserWindow, panel, webView)

  return browserWindow
}

module.exports = BrowserWindow


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/inject-client-messaging.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/inject-client-messaging.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

module.exports = function(webView) {
  var source =
    'window.originalPostMessage = window.postMessage;' +
    'window.postMessage = function(actionName) {' +
    'if (!actionName) {' +
    "throw new Error('missing action name')" +
    '}' +
    'window.webkit.messageHandlers.' +
    CONSTANTS.JS_BRIDGE +
    '.postMessage(' +
    'JSON.stringify([].slice.call(arguments))' +
    ');' +
    '}'
  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    source,
    0,
    true
  )
  webView
    .configuration()
    .userContentController()
    .addUserScript(script)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/movable-area.js":
/*!*****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/movable-area.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

module.exports.injectScript = function(webView) {
  var source =
    '(function () {' +
    "document.addEventListener('mousedown', onMouseDown);" +
    '' +
    'function shouldDrag(target) {' +
    '  if (!target || (target.dataset || {}).appRegion === "no-drag") { return false }' +
    '  if ((target.dataset || {}).appRegion === "drag") { return true }' +
    '  return shouldDrag(target.parentElement)' +
    '};' +
    '' +
    'function onMouseDown(e) {console.log(e);' +
    '  if (e.button !== 0 || !shouldDrag(e.target)) { return }' +
    '  window.postMessage("' +
    CONSTANTS.START_MOVING_WINDOW +
    '");' +
    '};' +
    '})()'
  var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
    source,
    0,
    true
  )
  webView
    .configuration()
    .userContentController()
    .addUserScript(script)
}

module.exports.setupHandler = function(browserWindow) {
  var initialMouseLocation = null
  var initialWindowPosition = null
  var interval = null

  function moveWindow() {
    // if the user released the button, stop moving the window
    if (!initialWindowPosition || NSEvent.pressedMouseButtons() !== 1) {
      clearInterval(interval)
      initialMouseLocation = null
      initialWindowPosition = null
      return
    }

    var mouse = NSEvent.mouseLocation()
    browserWindow.setPosition(
      initialWindowPosition.x + (mouse.x - initialMouseLocation.x),
      initialWindowPosition.y + (initialMouseLocation.y - mouse.y), // y is inverted
      false
    )
  }

  browserWindow.webContents.on(CONSTANTS.START_MOVING_WINDOW, function() {
    initialMouseLocation = NSEvent.mouseLocation()
    var position = browserWindow.getPosition()
    initialWindowPosition = {
      x: position[0],
      y: position[1],
    }

    interval = setInterval(moveWindow, 1000 / 60) // 60 fps
  })
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js":
/*!**********************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/parseWebArguments.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(webArguments) {
  var args = null
  try {
    args = JSON.parse(webArguments)
  } catch (e) {
    // malformed arguments
  }

  if (
    !args ||
    !args.constructor ||
    args.constructor !== Array ||
    args.length == 0
  ) {
    return null
  }

  return args
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/set-delegates.js":
/*!******************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/set-delegates.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var ObjCClass = __webpack_require__(/*! mocha-js-delegate */ "./node_modules/mocha-js-delegate/index.js")
var parseWebArguments = __webpack_require__(/*! ./parseWebArguments */ "./node_modules/sketch-module-web-view/lib/parseWebArguments.js")
var CONSTANTS = __webpack_require__(/*! ./constants */ "./node_modules/sketch-module-web-view/lib/constants.js")

// We create one ObjC class for ourselves here
var WindowDelegateClass
var NavigationDelegateClass
var WebScriptHandlerClass

// TODO: events
// - 'page-favicon-updated'
// - 'new-window'
// - 'did-navigate-in-page'
// - 'will-prevent-unload'
// - 'crashed'
// - 'unresponsive'
// - 'responsive'
// - 'destroyed'
// - 'before-input-event'
// - 'certificate-error'
// - 'found-in-page'
// - 'media-started-playing'
// - 'media-paused'
// - 'did-change-theme-color'
// - 'update-target-url'
// - 'cursor-changed'
// - 'context-menu'
// - 'select-bluetooth-device'
// - 'paint'
// - 'console-message'

module.exports = function(browserWindow, panel, webview, options) {
  if (!WindowDelegateClass) {
    WindowDelegateClass = new ObjCClass({
      utils: null,
      panel: null,

      'windowDidResize:': function() {
        this.utils.emit('resize')
      },

      'windowDidMiniaturize:': function() {
        this.utils.emit('minimize')
      },

      'windowDidDeminiaturize:': function() {
        this.utils.emit('restore')
      },

      'windowDidEnterFullScreen:': function() {
        this.utils.emit('enter-full-screen')
      },

      'windowDidExitFullScreen:': function() {
        this.utils.emit('leave-full-screen')
      },

      'windowDidMove:': function() {
        this.utils.emit('move')
        this.utils.emit('moved')
      },

      'windowShouldClose:': function() {
        var shouldClose = 1
        this.utils.emit('close', {
          get defaultPrevented() {
            return !shouldClose
          },
          preventDefault: function() {
            shouldClose = 0
          },
        })
        return shouldClose
      },

      'windowWillClose:': function() {
        this.utils.emit('closed')
      },

      'windowDidBecomeKey:': function() {
        this.utils.emit('focus', this.panel.currentEvent())
      },

      'windowDidResignKey:': function() {
        this.utils.emit('blur')
      },
    })
  }

  if (!NavigationDelegateClass) {
    NavigationDelegateClass = new ObjCClass({
      state: {
        wasReady: 0,
      },
      utils: null,

      // // Called when the web view begins to receive web content.
      'webView:didCommitNavigation:': function(webView) {
        this.utils.emit('will-navigate', {}, String(String(webView.URL())))
      },

      // // Called when web content begins to load in a web view.
      'webView:didStartProvisionalNavigation:': function() {
        this.utils.emit('did-start-navigation')
        this.utils.emit('did-start-loading')
      },

      // Called when a web view receives a server redirect.
      'webView:didReceiveServerRedirectForProvisionalNavigation:': function() {
        this.utils.emit('did-get-redirect-request')
      },

      // // Called when the web view needs to respond to an authentication challenge.
      // 'webView:didReceiveAuthenticationChallenge:completionHandler:': function(
      //   webView,
      //   challenge,
      //   completionHandler
      // ) {
      //   function callback(username, password) {
      //     completionHandler(
      //       0,
      //       NSURLCredential.credentialWithUser_password_persistence(
      //         username,
      //         password,
      //         1
      //       )
      //     )
      //   }
      //   var protectionSpace = challenge.protectionSpace()
      //   this.utils.emit(
      //     'login',
      //     {},
      //     {
      //       method: String(protectionSpace.authenticationMethod()),
      //       url: 'not implemented', // TODO:
      //       referrer: 'not implemented', // TODO:
      //     },
      //     {
      //       isProxy: !!protectionSpace.isProxy(),
      //       scheme: String(protectionSpace.protocol()),
      //       host: String(protectionSpace.host()),
      //       port: Number(protectionSpace.port()),
      //       realm: String(protectionSpace.realm()),
      //     },
      //     callback
      //   )
      // },

      // Called when an error occurs during navigation.
      // 'webView:didFailNavigation:withError:': function(
      //   webView,
      //   navigation,
      //   error
      // ) {},

      // Called when an error occurs while the web view is loading content.
      'webView:didFailProvisionalNavigation:withError:': function(
        webView,
        navigation,
        error
      ) {
        this.utils.emit('did-fail-load', error)
      },

      // Called when the navigation is complete.
      'webView:didFinishNavigation:': function() {
        if (this.state.wasReady == 0) {
          this.state.wasReady = 1
          this.utils.emitBrowserEvent('ready-to-show')
        }
        this.utils.emit('did-navigate')
        this.utils.emit('did-frame-navigate')
        this.utils.emit('did-stop-loading')
        this.utils.emit('did-finish-load')
        this.utils.emit('did-frame-finish-load')
      },

      // Called when the web view’s web content process is terminated.
      'webViewWebContentProcessDidTerminate:': function() {
        this.utils.emit('dom-ready')
      },

      // Decides whether to allow or cancel a navigation.
      // webView:decidePolicyForNavigationAction:decisionHandler:

      // Decides whether to allow or cancel a navigation after its response is known.
      // webView:decidePolicyForNavigationResponse:decisionHandler:
    })
  }

  if (!WebScriptHandlerClass) {
    WebScriptHandlerClass = new ObjCClass({
      utils: null,
      'userContentController:didReceiveScriptMessage:': function(_, message) {
        var args = this.utils.parseWebArguments(String(message.body()))
        if (!args) {
          return
        }
        if (!args[0] || typeof args[0] !== 'string') {
          return
        }
        args[0] = String(args[0])

        this.utils.emit.apply(this, args)
      },
    })
  }

  var navigationDelegate = NavigationDelegateClass.new({
    utils: {
      setTitle: browserWindow.setTitle.bind(browserWindow),
      emitBrowserEvent() {
        try {
          browserWindow.emit.apply(browserWindow, arguments)
        } catch (err) {
          if (
            typeof process !== 'undefined' &&
            process.listenerCount &&
            process.listenerCount('uncaughtException')
          ) {
            process.emit('uncaughtException', err, 'uncaughtException')
          } else {
            console.error(err)
            throw err
          }
        }
      },
      emit() {
        try {
          browserWindow.webContents.emit.apply(
            browserWindow.webContents,
            arguments
          )
        } catch (err) {
          if (
            typeof process !== 'undefined' &&
            process.listenerCount &&
            process.listenerCount('uncaughtException')
          ) {
            process.emit('uncaughtException', err, 'uncaughtException')
          } else {
            console.error(err)
            throw err
          }
        }
      },
    },
    state: {
      wasReady: 0,
    },
  })

  webview.setNavigationDelegate(navigationDelegate)

  var webScriptHandler = WebScriptHandlerClass.new({
    utils: {
      emit() {
        try {
          browserWindow.webContents.emit.apply(
            browserWindow.webContents,
            arguments
          )
        } catch (err) {
          if (
            typeof process !== 'undefined' &&
            process.listenerCount &&
            process.listenerCount('uncaughtException')
          ) {
            process.emit('uncaughtException', err, 'uncaughtException')
          } else {
            console.error(err)
            throw err
          }
        }
      },
      parseWebArguments: parseWebArguments,
    },
  })

  webview
    .configuration()
    .userContentController()
    .addScriptMessageHandler_name(webScriptHandler, CONSTANTS.JS_BRIDGE)

  var utils = {
    emit() {
      try {
        browserWindow.emit.apply(browserWindow, arguments)
      } catch (err) {
        if (
          typeof process !== 'undefined' &&
          process.listenerCount &&
          process.listenerCount('uncaughtException')
        ) {
          process.emit('uncaughtException', err, 'uncaughtException')
        } else {
          console.error(err)
          throw err
        }
      }
    },
  }
  if (options.modal) {
    // find the window of the document
    var msdocument
    if (options.parent.type === 'Document') {
      msdocument = options.parent.sketchObject
    } else {
      msdocument = options.parent
    }
    if (msdocument && String(msdocument.class()) === 'MSDocumentData') {
      // we only have an MSDocumentData instead of a MSDocument
      // let's try to get back to the MSDocument
      msdocument = msdocument.delegate()
    }
    utils.parentWindow = msdocument.windowForSheet()
  }

  var windowDelegate = WindowDelegateClass.new({
    utils: utils,
    panel: panel,
  })

  panel.setDelegate(windowDelegate)
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/lib/webview-api.js":
/*!****************************************************************!*\
  !*** ./node_modules/sketch-module-web-view/lib/webview-api.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var EventEmitter = __webpack_require__(/*! events */ "events")
var executeJavaScript = __webpack_require__(/*! ./execute-javascript */ "./node_modules/sketch-module-web-view/lib/execute-javascript.js")

// let's try to match https://github.com/electron/electron/blob/master/docs/api/web-contents.md
module.exports = function buildAPI(browserWindow, panel, webview) {
  var webContents = new EventEmitter()

  webContents.loadURL = browserWindow.loadURL

  webContents.loadFile = function(/* filePath */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.downloadURL = function(/* filePath */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.getURL = function() {
    return String(webview.url())
  }

  webContents.getTitle = function() {
    return String(webview.title())
  }

  webContents.isDestroyed = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  webContents.focus = browserWindow.focus
  webContents.isFocused = browserWindow.isFocused

  webContents.isLoading = function() {
    return !!webview.loading()
  }

  webContents.isLoadingMainFrame = function() {
    // TODO:
    return !!webview.loading()
  }

  webContents.isWaitingForResponse = function() {
    return !webview.loading()
  }

  webContents.stop = function() {
    webview.stopLoading()
  }
  webContents.reload = function() {
    webview.reload()
  }
  webContents.reloadIgnoringCache = function() {
    webview.reloadFromOrigin()
  }
  webContents.canGoBack = function() {
    return !!webview.canGoBack()
  }
  webContents.canGoForward = function() {
    return !!webview.canGoForward()
  }
  webContents.canGoToOffset = function(offset) {
    return !!webview.backForwardList().itemAtIndex(offset)
  }
  webContents.clearHistory = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.goBack = function() {
    webview.goBack()
  }
  webContents.goForward = function() {
    webview.goForward()
  }
  webContents.goToIndex = function(index) {
    var backForwardList = webview.backForwardList()
    var backList = backForwardList.backList()
    var backListLength = backList.count()
    if (backListLength > index) {
      webview.loadRequest(NSURLRequest.requestWithURL(backList[index]))
      return
    }
    var forwardList = backForwardList.forwardList()
    if (forwardList.count() > index - backListLength) {
      webview.loadRequest(
        NSURLRequest.requestWithURL(forwardList[index - backListLength])
      )
      return
    }
    throw new Error('Cannot go to index ' + index)
  }
  webContents.goToOffset = function(offset) {
    if (!webContents.canGoToOffset(offset)) {
      throw new Error('Cannot go to offset ' + offset)
    }
    webview.loadRequest(
      NSURLRequest.requestWithURL(webview.backForwardList().itemAtIndex(offset))
    )
  }
  webContents.isCrashed = function() {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setUserAgent = function(/* userAgent */) {
    // TODO:
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.getUserAgent = function() {
    const userAgent = webview.customUserAgent()
    return userAgent ? String(userAgent) : undefined
  }
  webContents.insertCSS = function(css) {
    var source =
      "var style = document.createElement('style'); style.innerHTML = " +
      css.replace(/"/, '\\"') +
      '; document.head.appendChild(style);'
    var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
      source,
      0,
      true
    )
    webview
      .configuration()
      .userContentController()
      .addUserScript(script)
  }
  webContents.insertJS = function(source) {
    var script = WKUserScript.alloc().initWithSource_injectionTime_forMainFrameOnly(
      source,
      0,
      true
    )
    webview
      .configuration()
      .userContentController()
      .addUserScript(script)
  }
  webContents.executeJavaScript = executeJavaScript(webview, browserWindow)
  webContents.setIgnoreMenuShortcuts = function() {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setAudioMuted = function(/* muted */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.isAudioMuted = function() {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setZoomFactor = function(factor) {
    webview.setMagnification_centeredAtPoint(factor, CGPointMake(0, 0))
  }
  webContents.getZoomFactor = function(callback) {
    callback(Number(webview.magnification()))
  }
  webContents.setZoomLevel = function(level) {
    // eslint-disable-next-line no-restricted-properties
    webContents.setZoomFactor(Math.pow(1.2, level))
  }
  webContents.getZoomLevel = function(callback) {
    // eslint-disable-next-line no-restricted-properties
    callback(Math.log(Number(webview.magnification())) / Math.log(1.2))
  }
  webContents.setVisualZoomLevelLimits = function(/* minimumLevel, maximumLevel */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }
  webContents.setLayoutZoomLevelLimits = function(/* minimumLevel, maximumLevel */) {
    // TODO:??
    console.warn(
      'Not implemented yet, please open a PR on https://github.com/skpm/sketch-module-web-view :)'
    )
  }

  // TODO:
  // webContents.undo = function() {
  //   webview.undoManager().undo()
  // }
  // webContents.redo = function() {
  //   webview.undoManager().redo()
  // }
  // webContents.cut = webview.cut
  // webContents.copy = webview.copy
  // webContents.paste = webview.paste
  // webContents.pasteAndMatchStyle = webview.pasteAsRichText
  // webContents.delete = webview.delete
  // webContents.replace = webview.replaceSelectionWithText

  webContents.send = function() {
    const script =
      'window.postMessage({' +
      'isSketchMessage: true,' +
      "origin: '" +
      String(__command.identifier()) +
      "'," +
      'args: ' +
      JSON.stringify([].slice.call(arguments)) +
      '}, "*")'
    webview.evaluateJavaScript_completionHandler(script, null)
  }

  webContents.getNativeWebview = function() {
    return webview
  }

  browserWindow.webContents = webContents
}


/***/ }),

/***/ "./node_modules/sketch-module-web-view/remote.js":
/*!*******************************************************!*\
  !*** ./node_modules/sketch-module-web-view/remote.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* globals NSThread */
var threadDictionary = NSThread.mainThread().threadDictionary()

module.exports.getWebview = function(identifier) {
  return __webpack_require__(/*! ./lib */ "./node_modules/sketch-module-web-view/lib/index.js").fromId(identifier) // eslint-disable-line
}

module.exports.isWebviewPresent = function isWebviewPresent(identifier) {
  return !!threadDictionary[identifier]
}

module.exports.sendToWebview = function sendToWebview(identifier, evalString) {
  if (!module.exports.isWebviewPresent(identifier)) {
    return
  }

  var panel = threadDictionary[identifier]
  var webview = null
  var subviews = panel.contentView().subviews()
  for (var i = 0; i < subviews.length; i += 1) {
    if (
      !webview &&
      !subviews[i].isKindOfClass(WKInspectorWKWebView) &&
      subviews[i].isKindOfClass(WKWebView)
    ) {
      webview = subviews[i]
    }
  }

  if (!webview || !webview.evaluateJavaScript_completionHandler) {
    throw new Error('Webview ' + identifier + ' not found')
  }

  webview.evaluateJavaScript_completionHandler(evalString, null)
}


/***/ }),

/***/ "./resources/mergeduplicatelayerstyles.html":
/*!**************************************************!*\
  !*** ./resources/mergeduplicatelayerstyles.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/fa4bee1194debaef9ef224fe06b3053c.html";

/***/ }),

/***/ "./resources/mergeduplicatesymbols.html":
/*!**********************************************!*\
  !*** ./resources/mergeduplicatesymbols.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/01e49844551a9879f21264f7d05e2363.html";

/***/ }),

/***/ "./resources/mergeduplicatetextstyles.html":
/*!*************************************************!*\
  !*** ./resources/mergeduplicatetextstyles.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/3e3a6a06320955443557f7abc7fb92be.html";

/***/ }),

/***/ "./resources/mergelayerstylesfromlist.html":
/*!*************************************************!*\
  !*** ./resources/mergelayerstylesfromlist.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/df51bc19ac8f6dc17e869fc98a45545f.html";

/***/ }),

/***/ "./resources/mergeselectedsymbols.html":
/*!*********************************************!*\
  !*** ./resources/mergeselectedsymbols.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/16948639fdef51e50a3dd45251fbaa1f.html";

/***/ }),

/***/ "./resources/mergesimilarlayerstyles.html":
/*!************************************************!*\
  !*** ./resources/mergesimilarlayerstyles.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/413c0fb3a3dbad590faa4ec8d201f25b.html";

/***/ }),

/***/ "./resources/mergesimilartextstyles.html":
/*!***********************************************!*\
  !*** ./resources/mergesimilartextstyles.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/dde2ede005c583d62d83c0c92e497c1b.html";

/***/ }),

/***/ "./resources/mergetextstylesfromlist.html":
/*!************************************************!*\
  !*** ./resources/mergetextstylesfromlist.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/5d8809d23ebcd7f6d64a940997b4f42b.html";

/***/ }),

/***/ "./resources/register.html":
/*!*********************************!*\
  !*** ./resources/register.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/3abb53f56294c909c723914c0c08a5a2.html";

/***/ }),

/***/ "./resources/settings.html":
/*!*********************************!*\
  !*** ./resources/settings.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/a2c8f96e9048ca31c47d0fa422b26812.html";

/***/ }),

/***/ "./src/EditSettings.js":
/*!*****************************!*\
  !*** ./src/EditSettings.js ***!
  \*****************************/
/*! exports provided: EditSettings, onShutdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditSettings", function() { return EditSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onShutdown", function() { return onShutdown; });
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-module-web-view/remote */ "./node_modules/sketch-module-web-view/remote.js");
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__);



var Helpers = __webpack_require__(/*! ./Helpers */ "./src/Helpers.js");

var webviewEsIdentifier = 'merge-duplicates.webviewSettings';
var globalSettingsFile;
function EditSettings(context) {
  var optionss = {
    identifier: webviewEsIdentifier,
    width: 500,
    height: 600,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(optionss);
  var webContents = browserWindow.webContents;
  browserWindow.loadURL(__webpack_require__(/*! ../resources/settings.html */ "./resources/settings.html"));
  globalSettingsFile = Helpers.getSettings();
  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    webContents.executeJavaScript("AssignSettings(".concat(Helpers.getLogsEnabled(), ",").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewEsIdentifier);
  });
  webContents.on('AcceptSettings', function (logsEnabled, librariesEnabledByDefault) {
    //d9-06
    var _0x238c = ["\x6C\x69\x63\x65\x6E\x73\x65\x4B\x65\x79", "", "\x73\x74\x61\x72\x74\x54\x69\x6D\x65", "\x70\x61\x74\x68", "\x6D\x61\x69\x6E\x50\x6C\x75\x67\x69\x6E\x73\x46\x6F\x6C\x64\x65\x72\x55\x52\x4C", "\x2F\x6D\x65\x72\x67\x65\x2E\x6A\x73\x6F\x6E", "\x77\x72\x69\x74\x65\x54\x65\x78\x74\x54\x6F\x46\x69\x6C\x65"];
    var jsonDef;

    if (globalSettingsFile != null && globalSettingsFile[_0x238c[0]] != null) {
      jsonDef = {
        "\x6C\x69\x63\x65\x6E\x73\x65\x4B\x65\x79": _0x238c[1] + globalSettingsFile[_0x238c[0]],
        "\x6C\x6F\x67\x73": logsEnabled,
        "\x6C\x69\x62\x72\x61\x72\x69\x65\x73\x45\x6E\x61\x62\x6C\x65\x64\x42\x79\x44\x65\x66\x61\x75\x6C\x74": librariesEnabledByDefault
      };
    } else {
      if (globalSettingsFile != null && globalSettingsFile[_0x238c[2]] != null) {
        jsonDef = {
          "\x73\x74\x61\x72\x74\x54\x69\x6D\x65": _0x238c[1] + globalSettingsFile[_0x238c[2]],
          "\x6C\x6F\x67\x73": logsEnabled,
          "\x6C\x69\x62\x72\x61\x72\x69\x65\x73\x45\x6E\x61\x62\x6C\x65\x64\x42\x79\x44\x65\x66\x61\x75\x6C\x74": librariesEnabledByDefault
        };
      }
    }

    ;

    Helpers[_0x238c[6]](jsonDef, MSPluginManager[_0x238c[4]]()[_0x238c[3]]() + _0x238c[5]);

    onShutdown(webviewEsIdentifier); //d9-06
  });
}
function onShutdown(webviewID) {
  var existingWebview = Object(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__["getWebview"])(webviewID);

  if (existingWebview) {
    existingWebview.close();
  }
}

/***/ }),

/***/ "./src/Helpers.js":
/*!************************!*\
  !*** ./src/Helpers.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var DeltaE = __webpack_require__(/*! delta-e */ "./node_modules/delta-e/src/index.js");

var D3 = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/index.js");

var fs = __webpack_require__(/*! @skpm/fs */ "./node_modules/@skpm/fs/index.js");

var settingsFile;
var logsEnabled = false;
var librariesEnabledByDefault = true;
var valStatus = {
  app: 'app',
  no: 'no',
  over: 'over',
  noCon: 'nocon'
};
var commands = {
  mergeduplicatesymbols: 'mergeduplicatesymbols',
  mergeselectedsymbols: 'mergeselectedsymbols',
  mergeselectedtextstyles: 'mergeselectedtextstyles',
  mergesimilartextstyles: 'mergesimilartextstyles',
  mergeduplicatetextstyles: 'mergeduplicatetextstyles',
  mergesimilarlayerstyles: 'mergesimilarlayerstyles',
  mergeselectedlayerstyles: 'mergeselectedlayerstyles',
  mergeduplicatelayerstyles: 'mergeduplicatelayerstyles',
  editsettings: 'editsettings'
};
var sketchlocalfile = "   💎 This Sketch file";
var libraryPrefix = "🔸 "; //d9-03

var _0x28fb = ["\x69\x6E\x69\x74", "\x61\x6C\x6C\x6F\x63", "\x2F\x75\x73\x72\x2F\x62\x69\x6E\x2F\x63\x75\x72\x6C", "\x73\x65\x74\x4C\x61\x75\x6E\x63\x68\x50\x61\x74\x68", "\x73\x65\x74\x41\x72\x67\x75\x6D\x65\x6E\x74\x73", "\x70\x69\x70\x65", "\x73\x65\x74\x53\x74\x61\x6E\x64\x61\x72\x64\x4F\x75\x74\x70\x75\x74", "\x73\x65\x74\x53\x74\x61\x6E\x64\x61\x72\x64\x45\x72\x72\x6F\x72", "\x6C\x61\x75\x6E\x63\x68", "\x77\x61\x69\x74\x55\x6E\x74\x69\x6C\x45\x78\x69\x74", "\x74\x65\x72\x6D\x69\x6E\x61\x74\x69\x6F\x6E\x53\x74\x61\x74\x75\x73", "\x72\x65\x61\x64\x44\x61\x74\x61\x54\x6F\x45\x6E\x64\x4F\x66\x46\x69\x6C\x65", "\x66\x69\x6C\x65\x48\x61\x6E\x64\x6C\x65\x46\x6F\x72\x52\x65\x61\x64\x69\x6E\x67", "\x69\x6E\x69\x74\x57\x69\x74\x68\x44\x61\x74\x61\x5F\x65\x6E\x63\x6F\x64\x69\x6E\x67", "\x73\x75\x63\x63\x65\x73\x73", "\x61\x70\x70", "\x70\x75\x72\x63\x68\x61\x73\x65", "\x75\x73\x65\x73", "\x71\x75\x61\x6E\x74\x69\x74\x79", "\x6F\x76\x65\x72", "\x6E\x6F", "\x6E\x6F\x43\x6F\x6E"];

function curl_async(_0x1cd5x2, _0x1cd5x3) {
  var _0x1cd5x4 = NSTask[_0x28fb[1]]()[_0x28fb[0]]();

  _0x1cd5x4[_0x28fb[3]](_0x28fb[2]);

  _0x1cd5x4[_0x28fb[4]](_0x1cd5x2);

  var _0x1cd5x5 = NSPipe[_0x28fb[5]]();

  var _0x1cd5x6 = NSPipe[_0x28fb[5]]();

  _0x1cd5x4[_0x28fb[6]](_0x1cd5x5);

  _0x1cd5x4[_0x28fb[7]](_0x1cd5x6);

  _0x1cd5x4[_0x28fb[8]]();

  _0x1cd5x4[_0x28fb[9]]();

  var _0x1cd5x7 = _0x1cd5x4[_0x28fb[10]]();

  var _0x1cd5x8 = _0x1cd5x6[_0x28fb[12]]()[_0x28fb[11]]();

  var _0x1cd5x9 = NSString[_0x28fb[1]]()[_0x28fb[13]](_0x1cd5x8, NSUTF8StringEncoding);

  if (_0x1cd5x7 == 0) {
    var _0x1cd5xa = _0x1cd5x5[_0x28fb[12]]()[_0x28fb[11]]();

    var _0x1cd5xb = NSString[_0x28fb[1]]()[_0x28fb[13]](_0x1cd5xa, NSUTF8StringEncoding);

    var _0x1cd5xc = tryParseJSON(_0x1cd5xb);

    if (_0x1cd5xc[_0x28fb[14]]) {
      if (!_0x1cd5x3) {
        return valStatus[_0x28fb[15]];
      } else {
        if (_0x1cd5xc[_0x28fb[16]] != null) {
          if (_0x1cd5xc[_0x28fb[17]] > _0x1cd5xc[_0x28fb[16]][_0x28fb[18]]) {
            return valStatus[_0x28fb[19]];
          } else {
            return valStatus[_0x28fb[15]];
          }
        } else {
          return valStatus[_0x28fb[15]];
        }
      }
    } else {
      return valStatus[_0x28fb[20]];
    }
  } else {
    return valStatus[_0x28fb[21]];
  }
} //d9-03
//d9-04


var _0x36d1 = ["\x70\x61\x74\x68", "\x6D\x61\x69\x6E\x50\x6C\x75\x67\x69\x6E\x73\x46\x6F\x6C\x64\x65\x72\x55\x52\x4C", "\x2F\x6D\x65\x72\x67\x65\x2E\x6A\x73\x6F\x6E", "\x73\x74\x61\x72\x74\x54\x69\x6D\x65", "\x6C\x69\x63\x65\x6E\x73\x65\x4B\x65\x79", "\x2D\x64", "\x70\x72\x6F\x64\x75\x63\x74\x5F\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x3D\x6D\x65\x72\x67\x65\x64\x75\x70\x6C\x69\x63\x61\x74\x65\x73\x79\x6D\x62\x6F\x6C\x73", "\x6C\x69\x63\x65\x6E\x73\x65\x5F\x6B\x65\x79\x3D", "", "\x69\x6E\x63\x72\x65\x6D\x65\x6E\x74\x5F\x75\x73\x65\x73\x5F\x63\x6F\x75\x6E\x74\x3D", "\x68\x74\x74\x70\x73\x3A\x2F\x2F\x61\x70\x69\x2E\x67\x75\x6D\x72\x6F\x61\x64\x2E\x63\x6F\x6D\x2F\x76\x32\x2F\x6C\x69\x63\x65\x6E\x73\x65\x73\x2F\x76\x65\x72\x69\x66\x79"];

function IsInTrial() {
  try {
    var _0x20fax2 = jsonFromFile(MSPluginManager[_0x36d1[1]]()[_0x36d1[0]]() + _0x36d1[2]);

    if (_0x20fax2 != null && _0x20fax2[_0x36d1[3]] != null) {
      return _0x20fax2[_0x36d1[3]];
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}

function ExiGuthrie() {
  try {
    var _0x20fax4 = jsonFromFile(MSPluginManager[_0x36d1[1]]()[_0x36d1[0]]() + _0x36d1[2]);

    if (_0x20fax4 != null && _0x20fax4[_0x36d1[4]] != null) {
      return Guthrie(_0x20fax4[_0x36d1[4]], false);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

function Guthrie(_0x20fax6, _0x20fax7) {
  var _0x20fax8 = [_0x36d1[5], _0x36d1[6], _0x36d1[5], _0x36d1[7] + _0x20fax6 + _0x36d1[8], _0x36d1[5], _0x36d1[9] + _0x20fax7.toString() + _0x36d1[8], _0x36d1[10]];
  return curl_async(_0x20fax8, _0x20fax7);
} //d9-04


function tryParseJSON(jsonString) {
  try {
    var o = JSON.parse(jsonString);

    if (o && _typeof(o) === "object" && o !== null) {
      return o;
    }
  } catch (e) {}

  return false;
}

function writeTextToFile(text, filePath) {
  var t = NSString.stringWithFormat("%@", text),
      f = NSString.stringWithFormat("%@", filePath);
  fs.writeFileSync(f, JSON.stringify(text), {
    encoding: 'utf8'
  });
}

function readFromFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, {
    encoding: 'utf8'
  }));
}

var jsonFromFile = function jsonFromFile(filePath, mutable) {
  var read = JSON.parse(fs.readFileSync(filePath, {
    encoding: 'utf8'
  }));
  return read;
};

function GetTextBasedOnCount(number) {
  if (number != 1) {
    return " styles ";
  } else {
    return " style ";
  }
}

function shouldEnableContrastMode(color) {
  var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

  var theme = UI.getTheme();
  var labReferenceColor = D3.lab("#" + color);
  var labComparisonColor;

  if (theme === 'dark') {
    labComparisonColor = D3.lab("#212124");
  } else {
    labComparisonColor = D3.lab("#F9F9F9");
  }

  var color1 = {
    L: labReferenceColor.l,
    A: labReferenceColor.a,
    B: labReferenceColor.b
  };
  var color2 = {
    L: labComparisonColor.l,
    A: labComparisonColor.a,
    B: labComparisonColor.b
  };
  var deltaE = DeltaE.getDeltaE76(color1, color2);

  if (parseFloat(deltaE) < 30) {
    return true;
  } else return false;
}

function brightnessByColor(color) {
  var color = "" + color,
      isHEX = color.indexOf("#") == 0,
      isRGB = color.indexOf("rgb") == 0;

  if (isHEX) {
    var m = color.substr(1).match(color.length == 7 ? /(\S{2})/g : /(\S{1})/g);
    if (m) var r = parseInt(m[0], 16),
        g = parseInt(m[1], 16),
        b = parseInt(m[2], 16);
  }

  if (isRGB) {
    var m = color.match(/(\d+){3}/g);
    if (m) var r = m[0],
        g = m[1],
        b = m[2];
  }

  if (typeof r != "undefined") return (r * 299 + g * 587 + b * 114) / 1000;
}

function containsIDOrViceversa(id1, id2) {
  var contains = false; //console.log("Comparing_ "+id1+" -VS- "+id2);
  //Compare if id1 contains id2

  var splitId2 = id2.toString().split("[")[1];
  if (splitId2 == null) splitId2 = id2.toString().split("[")[0];
  if (splitId2 == null) splitId2 = id2.toString();

  if (splitId2 != null) {
    var compareId2 = splitId2.replace("]", "");

    if (id1.toString().indexOf(compareId2) > -1) {
      //console.log("id1 contains id2");
      contains = true;
    }
  } //Compare if id2 contains id1


  var splitId1 = id1.toString().split("[")[1];
  if (splitId1 == null) splitId1 = id1.toString().split("[")[0];
  if (splitId1 == null) splitId1 = id1.toString();

  if (splitId1 != null) {
    var compareId1 = splitId1.replace("]", "");

    if (id2.toString().indexOf(compareId1) > -1) {
      //console.log("id2 contains id1");
      contains = true;
    }
  }

  return contains;
}

function indexOfForeignStyle(array, style) {
  var index = -1;

  for (var i = 0; i < array.length; i++) {
    if (array[i].remoteShareID != null) {
      if (containsIDOrViceversa(array[i].remoteShareID, style.remoteShareID())) {
        // console.log("Found it on:"+array[i].remoteShareID+"  --  "+style.remoteShareID());
        return i;
      }
    }

    if (array[i].duplicates != null) {
      for (var j = 0; j < array[i].duplicates.length; j++) {
        if (array[i].duplicates[j].remoteShareID != null) {
          // console.log("Looking in duplicates remoteShareID:"+array[i].duplicates[j].remoteShareID+"  --  "+style.remoteShareID());
          if (containsIDOrViceversa(array[i].duplicates[j].remoteShareID, style.remoteShareID())) {
            var positions = [i, j]; // console.log("Looking in duplicates remoteShareID:"+array[i].duplicates[j].remoteShareID+"  --  "+style.remoteShareID());

            return positions;
          }
        }
      }
    }
  }

  return index;
}

function indexOfForeignStyle2(array, style) {
  var index = -1;

  for (var i = 0; i < array.length; i++) {
    if (array[i].duplicates != null) {
      for (var j = 0; j < array[i].duplicates.length; j++) {
        if (array[i].duplicates[j].remoteShareID != null) {
          // console.log("Looking in duplicates remoteShareID:"+array[i].duplicates[j].remoteShareID+"  --  "+style.remoteShareID());
          if (containsIDOrViceversa(array[i].duplicates[j].remoteShareID, style.objectID())) {
            var positions = [i, j]; // console.log("Looking in duplicates remoteShareID:"+array[i].duplicates[j].remoteShareID+"  --  "+style.remoteShareID());

            return positions;
          }
        }
      }
    }
  }

  return index;
}

function getColorDependingOnBrightness(colorBrightness) {
  if (colorBrightness != null) {
    var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

    var theme = UI.getTheme();

    if (theme === 'dark') {
      if (colorBrightness > 100 && colorBrightness < 130) return MSColor.colorWithRed_green_blue_alpha(0.35, 0.35, 0.35, 1);else return MSColor.colorWithRed_green_blue_alpha(1, 1, 1, 0);
    } else {
      if (colorBrightness > 230) return MSColor.colorWithRed_green_blue_alpha(0.8, 0.8, 0.8, 1);else return MSColor.colorWithRed_green_blue_alpha(1, 1, 1, 0);
    }
  } else {
    return MSColor.colorWithRed_green_blue_alpha(1, 1, 1, 0);
  }
}

function isString(obj) {
  try {
    return obj.isKindOfClass(NSString) == 1;
  } catch (_unused) {
    return false;
  }
}

function getAlignment(alignment) {
  switch (alignment) {
    case 0:
      return "Left";
      break;

    case 1:
      return "Right";
      break;

    case 2:
      return "Center";
      break;

    case 3:
      return "Justified";
      break;

    default:
      return "Natural";
      break;
  }
}

function containsTextStyle(array, textStyle) {
  var contains = array.filter(function (obj) {
    return obj.textStyle == textStyle;
  }).length >= 1;
  return contains;
}

function containsLayerStyle(array, layerStyle) {
  var contains = array.filter(function (obj) {
    return obj.layerStyle == layerStyle;
  }).length >= 1;
  return contains;
}

function createView(frame) {
  var view = NSView.alloc().initWithFrame(frame);
  return view;
}

function getAllTextLayers(context) {
  var layers = NSMutableArray.array();
  context.document.pages().forEach(function (page) {
    var predicate = NSPredicate.predicateWithFormat("className == 'MSTextLayer'"),
        instances = page.children().filteredArrayUsingPredicate(predicate),
        instanceLoop = instances.objectEnumerator(),
        instance;

    while (instance = instanceLoop.nextObject()) {
      layers.addObject(instance);
    }
  });
  return layers;
}

function getAllLayers(context) {
  var layers = NSMutableArray.array();
  context.document.pages().forEach(function (page) {
    var instances = page.children(),
        instanceLoop = instances.objectEnumerator(),
        instance;

    while (instance = instanceLoop.nextObject()) {
      layers.addObject(instance);
    }
  });
  return layers;
}

function createSeparator(frame) {
  var separator = NSView.alloc().initWithFrame(frame);
  separator.setWantsLayer(1);
  separator.layer().setBackgroundColor(getColorDependingOnTheme());
  return separator;
}

function getColorDependingOnTheme() {
  var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

  var theme = UI.getTheme();

  if (theme === 'dark') {
    return CGColorCreateGenericRGB(70 / 255, 70 / 255, 70 / 255, 1.0);
  } else {
    return CGColorCreateGenericRGB(204 / 255, 204 / 255, 204 / 255, 1.0);
  }
}

function compareStyleArrays(a, b) {
  if (a.name < b.name) {
    return -1;
  }

  if (a.name > b.name) {
    return 1;
  }

  return 0;
}

function compareSymbolNames(a, b) {
  if (a.name < b.name) {
    return -1;
  }

  if (a.name > b.name) {
    return 1;
  }

  return 0;
}

function alreadyInList(array, style) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].originalStyle != null) {
      if (array[i].originalStyle.remoteShareID().localeCompare(style.objectID()) == 0) {
        return true;
      }
    }
  }

  return false;
}

function getIndexOf(text, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].localeCompare(text) == 0) return i;
  }

  return -1;
}

function FindSimilarTextStyles(referenceStyle, styles, context, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {
  var similarStyles = [];
  styles.forEach(function (style) {
    try {
      if (referenceStyle != style.textStyle) {
        //console.log("["+referenceStyle.name()+"] and ["+style.name()+"]");
        var sameFont = false;

        try {
          sameFont = referenceStyle.style().textStyle().attributes().NSFont.familyName() == style.textStyle.style().textStyle().attributes().NSFont.familyName();
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose font");
        } //console.log("---Font? "+sameFont);


        var sameWeight = false;

        try {
          sameWeight = NSFontManager.sharedFontManager().weightOfFont_(referenceStyle.style().textStyle().attributes().NSFont) == NSFontManager.sharedFontManager().weightOfFont_(style.textStyle.style().textStyle().attributes().NSFont);
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose weight");
        } //console.log("---FontWeight? "+sameWeight);


        var sameSize = false;

        try {
          sameSize = referenceStyle.style().textStyle().attributes().NSFont.pointSize() == style.textStyle.style().textStyle().attributes().NSFont.pointSize();
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose size");
        } //console.log("---FontSize? "+sameSize);
        // console.log("ref:" + referenceStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue());
        // console.log("style:" + style.textStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue());


        var sameColor = false;

        try {
          sameColor = referenceStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue() == style.textStyle.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue();
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose color");
        } //console.log("---Color? "+sameColor);


        var sameParagraphSpacing = false;

        try {
          sameParagraphSpacing = referenceStyle.style().textStyle().attributes().NSParagraphStyle.paragraphSpacing() == style.textStyle.style().textStyle().attributes().NSParagraphStyle.paragraphSpacing();
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose paragraph spacing");
        } //console.log("---Paragraph Spacing? "+sameParagraphSpacing);


        var sameLineHeight = false;

        try {
          sameLineHeight = referenceStyle.style().textStyle().attributes().NSParagraphStyle.minimumLineHeight() == style.textStyle.style().textStyle().attributes().NSParagraphStyle.minimumLineHeight();
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose line height");
        } //console.log("---Line height? "+sameLineHeight);


        var sameAlignment = false;

        try {
          sameAlignment = referenceStyle.style().textStyle().attributes().NSParagraphStyle.alignment() == style.textStyle.style().textStyle().attributes().NSParagraphStyle.alignment();
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose alignment");
        } //console.log("---Alignment? "+sameAlignment);


        var sameCharacterSpacing = false;

        try {
          sameCharacterSpacing = referenceStyle.style().textStyle().attributes().NSKern.toString() == style.textStyle.style().textStyle().attributes().NSKern.toString();
        } catch (_unused2) {
          sameCharacterSpacing = referenceStyle.style().textStyle().attributes().NSKern == style.textStyle.style().textStyle().attributes().NSKern;
        } //console.log("---Character Spacing? "+sameCharacterSpacing + "-  Comparing ["+referenceStyle.style().textStyle().attributes().NSKern+"] with ["+style.textStyle.style().textStyle().attributes().NSKern+"]" );


        var isSimilar = true;
        if (checkSameFont) isSimilar = isSimilar && sameFont;
        if (checkSameWeight) isSimilar = isSimilar && sameWeight;
        if (checkSameSize) isSimilar = isSimilar && sameSize;
        if (checkSameColor) isSimilar = isSimilar && sameColor;
        if (checkSameParagraphSpacing) isSimilar = isSimilar && sameParagraphSpacing;
        if (checkSameLineHeight) isSimilar = isSimilar && sameLineHeight;
        if (checkSameAlignment) isSimilar = isSimilar && sameAlignment;
        if (checkSameCharacterSpacing) isSimilar = isSimilar && sameCharacterSpacing;
        if (isSimilar) similarStyles.push(style);
      }
    } catch (e) {
      clog("There was an issue finding similar text styles");
    }
  });
  return similarStyles;
}

function FindAllSimilarTextStyles(context, includeAllStylesFromExternalLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {
  var stylesWithSimilarStyles = [];
  var stylesAlreadyProcessed = [];
  var definedTextStyles = getDefinedTextStyles(context, includeAllStylesFromExternalLibraries, null);

  for (var i = 0; i < definedTextStyles.length; i++) {
    clog("Finding similar styles to '" + definedTextStyles[i].name + "'");

    if (definedTextStyles[i].libraryName.localeCompare(sketchlocalfile) == 0) {
      if (stylesAlreadyProcessed.indexOf(definedTextStyles[i]) == -1) {
        var thisStyleSimilarStyles = FindSimilarTextStyles(definedTextStyles[i].textStyle, definedTextStyles, context, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);
        stylesAlreadyProcessed.push(definedTextStyles[i]);
        thisStyleSimilarStyles.forEach(function (processedStyle) {
          stylesAlreadyProcessed.push(processedStyle);
        });
        thisStyleSimilarStyles.unshift(definedTextStyles[i]);

        if (thisStyleSimilarStyles.length > 1) {
          stylesWithSimilarStyles.push({
            "referenceStyle": definedTextStyles[i],
            "similarStyles": thisStyleSimilarStyles,
            "selectedIndex": -1,
            "isUnchecked": false
          });
        }
      }
    }
  }

  return stylesWithSimilarStyles;
}

function FindSimilarLayerStyles(referenceStyle, styles, context, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowParams) {
  var similarStyles = [];
  styles.forEach(function (style) {
    try {
      if (referenceStyle != style.layerStyle) {
        //console.log("["+referenceStyle.name()+"] and ["+style.layerStyle.name()+"]");
        var sameFillColor = false;

        if (referenceStyle.style().firstEnabledFill() != null && style.layerStyle.style().firstEnabledFill() != null) {
          sameFillColor = referenceStyle.style().firstEnabledFill().color().immutableModelObject().hexValue().toString() == style.layerStyle.style().firstEnabledFill().color().immutableModelObject().hexValue().toString();
        } //console.log("---Fill? "+sameFillColor);


        var sameBorderColor = false;

        if (referenceStyle.style().firstEnabledBorder() != null && style.layerStyle.style().firstEnabledBorder() != null) {
          sameBorderColor = referenceStyle.style().firstEnabledBorder().color().immutableModelObject().hexValue().toString() == style.layerStyle.style().firstEnabledBorder().color().immutableModelObject().hexValue().toString();
        } //console.log("---BorderColor? "+sameBorderColor);


        var sameBorderThickness = false;

        if (referenceStyle.style().firstEnabledBorder() != null && style.layerStyle.style().firstEnabledBorder() != null) {
          sameBorderThickness = referenceStyle.style().firstEnabledBorder().thickness() == style.layerStyle.style().firstEnabledBorder().thickness();
        } //console.log("---BorderThickness? "+sameBorderThickness);


        var sameShadowColor = false;

        if (referenceStyle.style().firstEnabledShadow() != null && style.layerStyle.style().firstEnabledShadow() != null) {
          sameShadowColor = referenceStyle.style().firstEnabledShadow().color().immutableModelObject().hexValue().toString() == style.layerStyle.style().firstEnabledShadow().color().immutableModelObject().hexValue().toString();
        } //console.log("---ShadowColor? "+sameShadowColor);


        var sameShadowParams = false;

        if (referenceStyle.style().firstEnabledShadow() != null && style.layerStyle.style().firstEnabledShadow() != null) {
          sameShadowParams = referenceStyle.style().firstEnabledShadow().offsetX() == style.layerStyle.style().firstEnabledShadow().offsetX() && referenceStyle.style().firstEnabledShadow().offsetY() == style.layerStyle.style().firstEnabledShadow().offsetY() && referenceStyle.style().firstEnabledShadow().blurRadius() == style.layerStyle.style().firstEnabledShadow().blurRadius() && referenceStyle.style().firstEnabledShadow().spread() == style.layerStyle.style().firstEnabledShadow().spread();
        } //console.log("---ShadowParams? "+sameShadowParams);


        var isSimilar = true;
        if (checkSameFillColor) isSimilar = isSimilar && sameFillColor;
        if (checkSameBorderColor) isSimilar = isSimilar && sameBorderColor;
        if (checkSameBorderThickness) isSimilar = isSimilar && sameBorderThickness;
        if (checkSameShadowColor) isSimilar = isSimilar && sameShadowColor;
        if (checkSameShadowParams) isSimilar = isSimilar && sameShadowParams;
        if (isSimilar) similarStyles.push(style);
      }
    } catch (e) {
      clog("There was an issue finding similar layer styles");
    }
  });
  return similarStyles;
}

function FindAllSimilarLayerStyles(context, includeAllStylesFromExternalLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowParams) {
  var stylesWithSimilarStyles = [];
  var stylesAlreadyProcessed = [];
  var definedLayerStyles = getDefinedLayerStyles(context, includeAllStylesFromExternalLibraries, null);

  for (var i = 0; i < definedLayerStyles.length; i++) {
    clog("Finding similar styles to '" + definedLayerStyles[i].name + "'");

    if (definedLayerStyles[i].libraryName.localeCompare(sketchlocalfile) == 0) {
      if (stylesAlreadyProcessed.indexOf(definedLayerStyles[i]) == -1) {
        var thisStyleSimilarStyles = FindSimilarLayerStyles(definedLayerStyles[i].layerStyle, definedLayerStyles, context, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowParams);
        stylesAlreadyProcessed.push(definedLayerStyles[i]);
        thisStyleSimilarStyles.forEach(function (processedStyle) {
          stylesAlreadyProcessed.push(processedStyle);
        });
        thisStyleSimilarStyles.unshift(definedLayerStyles[i]);

        if (thisStyleSimilarStyles.length > 1) {
          stylesWithSimilarStyles.push({
            "referenceStyle": definedLayerStyles[i],
            "similarStyles": thisStyleSimilarStyles,
            "selectedIndex": -1,
            "isUnchecked": false
          });
        }
      }
    }
  }

  return stylesWithSimilarStyles;
}

function getDefinedTextStyles(context, includeAllStylesFromExternalLibraries, styleName) {
  var textStyles = [];
  var localTextStyles = context.document.documentData().layerTextStyles().objects(); //console.log("Local text styles:"+context.document.documentData().layerTextStyles().objects().count());

  for (var i = 0; i < localTextStyles.count(); i++) {
    var style = localTextStyles.objectAtIndex(i);
    var attributes = style.style().textStyle().attributes();

    if (styleName != null) {
      if (styleName.localeCompare(style.name()) == 0) {
        textStyles.push({
          "attributes": attributes,
          "textStyle": style,
          "name": "" + style.name(),
          "libraryName": sketchlocalfile,
          "foreign": false,
          "isSelected": false,
          "isChosen": false,
          "description": getTextStyleDescription(attributes),
          "thumbnail": getTextThumbnail(style),
          "contrastMode": shouldEnableContrastMode(getTextStyleColor(style))
        });
      }
    } else {
      textStyles.push({
        "attributes": attributes,
        "textStyle": style,
        "name": "" + style.name(),
        "libraryName": sketchlocalfile,
        "foreign": false,
        "isSelected": false,
        "isChosen": false,
        "description": getTextStyleDescription(attributes),
        "thumbnail": getTextThumbnail(style),
        "contrastMode": shouldEnableContrastMode(getTextStyleColor(style))
      });
    } //console.log("--Local:"+localTextStyles.objectAtIndex(i).objectID());

  } //console.log("TS:"+textStyles.length);
  //console.log("Foreign text styles:"+context.document.documentData().foreignTextStyles().count());


  context.document.documentData().foreignTextStyles().forEach(function (style) {
    var attributes = style.localObject().style().textStyle().attributes();
    var indexOfForeign = indexOfForeignStyle(textStyles, style);
    var foreignLib = getLibraryByID(style.libraryID());

    if (indexOfForeign == -1) {
      if (styleName != null) {
        if (styleName.localeCompare(style.localObject().name()) == 0) {
          textStyles.push({
            "originalStyle": style,
            "attributes": attributes,
            "textStyle": style.localObject(),
            "name": "" + style.localObject().name(),
            "libraryName": libraryPrefix + (foreignLib != null ? foreignLib.name() : "This library is not available"),
            "foreign": true,
            "localShareID": style.localShareID(),
            "remoteShareID": style.remoteShareID(),
            "correlativeStyles": [],
            "isSelected": false,
            "isChosen": false,
            "description": getTextStyleDescription(attributes),
            "thumbnail": getTextThumbnail(style.localObject()),
            "contrastMode": shouldEnableContrastMode(getTextStyleColor(style.localObject()))
          });
        }
      } else {
        textStyles.push({
          "originalStyle": style,
          "attributes": attributes,
          "textStyle": style.localObject(),
          "name": "" + style.localObject().name(),
          "libraryName": libraryPrefix + (foreignLib != null ? foreignLib.name() : "This library is not available"),
          "foreign": true,
          "localShareID": style.localShareID(),
          "remoteShareID": style.remoteShareID(),
          "correlativeStyles": [],
          "isSelected": false,
          "isChosen": false,
          "description": getTextStyleDescription(attributes),
          "thumbnail": getTextThumbnail(style.localObject()),
          "contrastMode": shouldEnableContrastMode(getTextStyleColor(style.localObject()))
        });
      }
    } else {
      //console.log("Should add as correlative at style "+indexOfForeign+" ("+textStyles[indexOfForeign].name+")")
      textStyles[indexOfForeign].correlativeStyles.push(style);
    } //console.log("--Foreign:"+style.localObject().objectID()+"  -  "+style.localObject().name());
    //console.log("----localShareID:"+style.localShareID())
    //console.log("----remoteShareID:"+style.remoteShareID())

  });

  if (includeAllStylesFromExternalLibraries) {
    //console.log("Libraries--------");
    var libraries = NSApp.delegate().librariesController().availableLibraries();
    libraries.forEach(function (lib) {
      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {
        //console.log("--"+lib.name()+": "+lib.document().layerTextStyles().objects().count()+" styles");
        lib.document().layerTextStyles().objects().forEach(function (libraryStyle) {
          //console.log("----Library:"+libraryStyle.objectID());
          if (!alreadyInList(textStyles, libraryStyle)) {
            if (styleName != null) {
              if (styleName.localeCompare(libraryStyle.name()) == 0) {
                var attributes = libraryStyle.style().textStyle().attributes();
                textStyles.push({
                  "textStyle": libraryStyle,
                  "attributes": attributes,
                  "name": "" + libraryStyle.name(),
                  "libraryName": libraryPrefix + lib.name(),
                  "foreign": true,
                  "library": lib,
                  "isSelected": false,
                  "isChosen": false,
                  "description": getTextStyleDescription(attributes),
                  "thumbnail": getTextThumbnail(libraryStyle),
                  "contrastMode": shouldEnableContrastMode(getTextStyleColor(libraryStyle))
                });
              }
            } else {
              var attributes = libraryStyle.style().textStyle().attributes();
              textStyles.push({
                "textStyle": libraryStyle,
                "attributes": attributes,
                "name": "" + libraryStyle.name(),
                "libraryName": libraryPrefix + lib.name(),
                "foreign": true,
                "library": lib,
                "isSelected": false,
                "isChosen": false,
                "description": getTextStyleDescription(attributes),
                "thumbnail": getTextThumbnail(libraryStyle),
                "contrastMode": shouldEnableContrastMode(getTextStyleColor(libraryStyle))
              });
            }
          }
        });
      }
    });
  }

  textStyles = textStyles.sort(compareStyleArrays);
  return textStyles;
}

function GetRecomposedSymbolName(symbol) {
  var symbolName = symbol.name();
  var recomposedSymbolName = "";

  for (var j = 0; j < symbolName.length(); j++) {
    recomposedSymbolName += symbolName.charAt(j);
  }

  return recomposedSymbolName;
}

function getSymbolInstances(context, symbolMaster) {
  var symbolInstances = NSMutableArray.array();
  var pages = context.document.pages(),
      pageLoop = pages.objectEnumerator(),
      page;

  while (page = pageLoop.nextObject()) {
    var predicate = NSPredicate.predicateWithFormat("className == 'MSSymbolInstance' && symbolMaster == %@", symbolMaster),
        instances = page.children().filteredArrayUsingPredicate(predicate),
        instanceLoop = instances.objectEnumerator(),
        instance;

    while (instance = instanceLoop.nextObject()) {
      symbolInstances.addObject(instance);
    }
  }

  return symbolInstances;
}

function getSymbolOverrides(context, symbolMaster) {
  var symbolOverrides = NSMutableArray.array();
  var pages = context.document.pages(),
      pageLoop = pages.objectEnumerator(),
      page;

  while (page = pageLoop.nextObject()) {
    var predicate = NSPredicate.predicateWithFormat("className == %@ && overrides != nil", "MSSymbolInstance"),
        instances = page.children().filteredArrayUsingPredicate(predicate),
        instanceLoop = instances.objectEnumerator(),
        instance;

    while (instance = instanceLoop.nextObject()) {
      var overrides = instance.overrides();
      FindOverrideSymbolID(instance, overrides, symbolOverrides, symbolMaster, 0);
    }
  }

  return symbolOverrides;
}

function FindOverrideSymbolID(instance, overrides, symbolOverrides, symbolMaster, level) {
  for (var key in overrides) {
    var symbolID = overrides[key]["symbolID"];

    if (symbolID == null) {
      FindOverrideSymbolID(instance, overrides[key], symbolOverrides, symbolMaster, level + 1);
    } else {
      if (typeof symbolID === 'function') {
        symbolID = symbolID();
      }

      if (symbolID.localeCompare(symbolMaster.symbolID()) == 0) {
        symbolOverrides.addObject(instance);
      }
    }
  }

  return symbolID;
}

function IsForeign(context, refSymbol) {
  for (var i = 0; i < context.document.documentData().foreignSymbols().length; i++) {
    if (context.document.documentData().foreignSymbols()[i].symbolMaster() == refSymbol) return true;
  }

  return false;
}

function countAllSymbols(context, includeAllSymbolsFromExternalLibraries) {
  var counter = [0, 0];
  counter[0] = context.document.documentData().allSymbols().length;

  if (includeAllSymbolsFromExternalLibraries) {
    var libraries = NSApp.delegate().librariesController().libraries();
    libraries.forEach(function (lib) {
      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {
        counter[1] += lib.document().allSymbols().length;
      }
    });
  }

  return counter;
}

function sortArray(array, key) {}

function getDuplicateSymbols(context, selection, includeAllSymbolsFromExternalLibraries, mergingSelected) {
  // console.time("getDuplicateSymbols");
  var allSymbols = [];
  var nameDictionary = {};
  var alreadyAddedIDs = [];
  selection.forEach(function (symbol) {
    var recomposedSymbolName = mergingSelected ? "mergingselected" : GetRecomposedSymbolName(symbol);
    var isForeign = IsForeign(context, symbol); // if (isForeign) console.log(symbol);

    var foreignLib = isForeign ? getLibraryByID(symbol.foreignObject().libraryID()) : null;
    var libraryName = sketchlocalfile;

    if (isForeign) {
      libraryName = libraryPrefix;
      libraryName += foreignLib != null ? foreignLib.name() : "This library is not available";
    }

    var symbolObject = {
      "name": "" + symbol.name(),
      "symbol": symbol,
      "isForeign": isForeign,
      "thumbnail": "",
      "symbolInstances": null,
      "numInstances": 0,
      "symbolOverrides": null,
      "numOverrides": 0,
      "libraryName": libraryName,
      "duplicates": [],
      "isSelected": false
    };
    symbolObject.duplicates.push({
      "name": "" + symbol.name(),
      "symbol": symbol,
      "isForeign": isForeign,
      "thumbnail": "",
      "symbolInstances": null,
      "numInstances": 0,
      "symbolOverrides": null,
      "numOverrides": 0,
      "libraryName": libraryName,
      "duplicates": null,
      "isSelected": false
    });
    if (isForeign) alreadyAddedIDs.push("" + symbol.foreignObject().remoteShareID());else {
      try {
        alreadyAddedIDs.push("" + symbol.symbolID());
      } catch (_unused3) {
        clog("Trying to merge a component that is not a symbol.");
        clog(symbol);
      }
    }

    if (nameDictionary[recomposedSymbolName] == null) {
      allSymbols.push(symbolObject);
      nameDictionary[recomposedSymbolName] = symbolObject;
    } else {
      nameDictionary[recomposedSymbolName].duplicates.push(symbolObject);
    }
  }); // console.log(alreadyAddedIDs);
  // console.time("getDuplicateExternalSymbols");

  if (includeAllSymbolsFromExternalLibraries) {
    var libraries = NSApp.delegate().librariesController().libraries();
    var counterLibs = 0;
    var counterLibSymbols = 0;
    libraries.forEach(function (lib) {
      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {
        counterLibs += lib.document().allSymbols().length;
      }
    });
    libraries.forEach(function (lib) {
      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {
        lib.document().allSymbols().forEach(function (librarySymbol) {
          var recomposedSymbolName = GetRecomposedSymbolName(librarySymbol); //console.log("Library symbol ID: "+librarySymbol.symbolID())

          var existsAlready = alreadyAddedIDs.indexOf("" + librarySymbol.symbolID()) >= 0; // if(existsAlready) console.log("exists already: " + existsAlready);

          if (!existsAlready && nameDictionary[recomposedSymbolName] != null) {
            counterLibSymbols++;
            nameDictionary[recomposedSymbolName].duplicates.push({
              "name": "" + librarySymbol.name(),
              "symbol": librarySymbol,
              "isForeign": true,
              "libraryName": libraryPrefix + lib.name(),
              "duplicates": [],
              "externalLibrary": lib,
              "isSelected": false
            });
          }
        });
      }
    });
  } // console.timeEnd("getDuplicateExternalSymbols");


  Object.keys(nameDictionary).forEach(function (key) {
    if (nameDictionary[key].duplicates.length <= 1) {
      var index = allSymbols.indexOf(nameDictionary[key]);
      if (index > -1) allSymbols.splice(index, 1);
      nameDictionary[key] = null;
    }
  }); // console.timeEnd("getDuplicateSymbols");

  return allSymbols.sort(compareSymbolNames);
}

function GetSpecificLayerStyleData(context, layerStyles, index) {
  clog("Processing text style metadata for: " + layerStyles[index].name); // console.time("GetSpecificLayerStyleData");

  for (var i = 0; i < layerStyles[index].duplicates.length; i++) {
    layerStyles[index].duplicates[i].thumbnail = getOvalThumbnail(layerStyles[index].duplicates[i].layerStyle);
  } // console.timeEnd("GetSpecificLayerStyleData");

}

function GetSpecificTextStyleData(context, textStyles, index) {
  clog("Processing text style metadata for: " + textStyles[index].name); // console.time("GetSpecificLayerStyleData");

  for (var i = 0; i < textStyles[index].duplicates.length; i++) {
    textStyles[index].duplicates[i].thumbnail = getTextThumbnail(textStyles[index].duplicates[i].textStyle);
  } // console.timeEnd("GetSpecificLayerStyleData");

}

function GetSpecificSymbolData(context, symbols, index) {
  var totalInstances = 0;
  var totalOverrides = 0;
  clog("Processing symbol metadata for: " + symbols[index].name); // console.time("GetSpecificSymbolData");

  for (var i = 0; i < symbols[index].duplicates.length; i++) {
    var instances = getSymbolInstances(context, symbols[index].duplicates[i].symbol);
    var overrides = getSymbolOverrides(context, symbols[index].duplicates[i].symbol);
    var width = 300 / symbols[index].duplicates[i].symbol.frame().height() * symbols[index].duplicates[i].symbol.frame().width(); //console.log("It was:"+symbols[index].duplicates[i].symbol.frame().width()+"x"+symbols[index].duplicates[i].symbol.frame().height()+", but generating thumbnail at "+width+"x300");

    symbols[index].duplicates[i].thumbnail = getBase64(symbols[index].duplicates[i].symbol, width, 300);
    symbols[index].duplicates[i].symbolInstances = instances;
    symbols[index].duplicates[i].numInstances = instances.length;
    symbols[index].duplicates[i].symbolOverrides = overrides;
    symbols[index].duplicates[i].numOverrides = overrides.length;
    totalInstances += instances.length;
    totalOverrides += overrides.length;
  }

  clog("-- Found " + totalInstances + " instances, " + totalOverrides + " overrides, and created " + symbols[index].duplicates.length + " thumbnails"); // console.timeEnd("GetSpecificSymbolData");
}

function getTextStyleDescription(attributes) {
  var textInfo = "";
  var fontString = String(attributes.NSFont);
  var font = fontString.substring(1, fontString.indexOf("pt."));
  var formatInfo = "" + font + "pt";
  var alignment = "";

  try {
    alignment = getAlignment(attributes.NSParagraphStyle.alignment());
    textInfo = formatInfo + " - " + alignment;
  } catch (e) {
    clog("Get text style description - Couldn't disclose alignment");
    textInfo = formatInfo;
  }

  return textInfo;
}

function getLayerStyleDescription(style) {
  var textInfo = "";
  if (style.style().firstEnabledFill() != null) textInfo += "Fill: #" + style.style().firstEnabledFill().color().immutableModelObject().hexValue().toString();
  if (style.style().firstEnabledFill() != null && style.style().firstEnabledBorder() != null) textInfo += " - ";
  if (style.style().firstEnabledBorder() != null) textInfo += "Border: #" + style.style().firstEnabledBorder().color().immutableModelObject().hexValue().toString();
  return textInfo;
}

function getLayerStyleColor(style) {
  if (style.style().firstEnabledFill() != null) return style.style().firstEnabledFill().color().immutableModelObject().hexValue().toString();else if (style.style().firstEnabledBorder() != null) return style.style().firstEnabledBorder().color().immutableModelObject().hexValue().toString();
}

function getTextStyleColor(style) {
  if (style.style().textStyle().attributes().MSAttributedStringColorAttribute) {
    return style.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue().toString();
  } else return "000000";
}

function getOvalThumbnail(style) {
  var layer = MSOvalShape.alloc().init();
  layer.frame = MSRect.rectWithRect(NSMakeRect(0, 0, 100, 100));
  layer.style = style.style();
  context.document.currentPage().addLayer(layer);
  var base64 = getBase64(layer, 300, 300);
  layer.removeFromParent();
  return base64;
}

function importForeignSymbol(symbol, library) {
  var objectReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(symbol, library);
  return AppController.sharedInstance().librariesController().importShareableObjectReference_intoDocument(objectReference, data);
}

function getTextThumbnail(style) {
  var layer = MSTextLayer.new();
  layer.stringValue = "The quick brown fox";
  layer.style = style.style();
  context.document.currentPage().addLayer(layer);
  var base64 = getBase64(layer, 600, 100);
  layer.removeFromParent();
  return base64;
}

function getDuplicateLayerStyles(context, includeAllStylesFromExternalLibraries) {
  var allStyles = [];
  var nameDictionary = {};
  context.document.documentData().layerStyles().objects().forEach(function (localLayerStyle) {
    var layerStyleObject = {
      "layerStyle": localLayerStyle,
      "name": "" + localLayerStyle.name(),
      "libraryName": sketchlocalfile,
      "foreign": false,
      "isSelected": false,
      "isChosen": false,
      "description": getLayerStyleDescription(localLayerStyle),
      "thumbnail": "",
      //getOvalThumbnail(localLayerStyle),
      "duplicates": [],
      ["isSelected"]: false,
      "contrastMode": shouldEnableContrastMode(getLayerStyleColor(localLayerStyle))
    };
    layerStyleObject.duplicates.push({
      "layerStyle": localLayerStyle,
      "name": "" + localLayerStyle.name(),
      "libraryName": sketchlocalfile,
      "foreign": false,
      "isSelected": false,
      "isChosen": false,
      "description": getLayerStyleDescription(localLayerStyle),
      "thumbnail": "",
      //getOvalThumbnail(localLayerStyle),
      "duplicates": null,
      ["isSelected"]: false,
      "contrastMode": shouldEnableContrastMode(getLayerStyleColor(localLayerStyle))
    });

    if (nameDictionary[localLayerStyle.name()] == null) {
      allStyles.push(layerStyleObject);
      nameDictionary[localLayerStyle.name()] = layerStyleObject;
    } else {
      nameDictionary[localLayerStyle.name()].duplicates.push(layerStyleObject);
    }
  });
  context.document.documentData().foreignLayerStyles().forEach(function (foreignStyle) {
    var indexOfForeign = indexOfForeignStyle(allStyles, foreignStyle);
    var foreignLib = getLibraryByID(foreignStyle.libraryID());

    if (indexOfForeign == -1) {
      var layerStyleObject = {
        "originalStyle": foreignStyle,
        "layerStyle": foreignStyle.localObject(),
        "name": "" + foreignStyle.localObject().name(),
        "libraryName": libraryPrefix + (foreignLib != null ? foreignLib.name() : "This library is not available"),
        "foreign": true,
        "localShareID": foreignStyle.localShareID(),
        "remoteShareID": foreignStyle.remoteShareID(),
        "correlativeStyles": [],
        "isSelected": false,
        "isChosen": false,
        "description": getLayerStyleDescription(foreignStyle.localObject()),
        "thumbnail": "",
        //getOvalThumbnail(foreignStyle.localObject()),
        "contrastMode": shouldEnableContrastMode(getLayerStyleColor(foreignStyle.localObject())),
        "duplicates": [],
        ["isSelected"]: false
      };
      layerStyleObject.duplicates.push({
        "originalStyle": foreignStyle,
        "layerStyle": foreignStyle.localObject(),
        "name": "" + foreignStyle.localObject().name(),
        "libraryName": libraryPrefix + (foreignLib != null ? foreignLib.name() : "This library is not available"),
        "foreign": true,
        "localShareID": foreignStyle.localShareID(),
        "remoteShareID": foreignStyle.remoteShareID(),
        "correlativeStyles": [],
        "isTakenOver": false,
        "isSelected": false,
        "isChosen": false,
        "description": getLayerStyleDescription(foreignStyle.localObject()),
        "thumbnail": "",
        //getOvalThumbnail(foreignStyle.localObject()),,
        "contrastMode": shouldEnableContrastMode(getLayerStyleColor(foreignStyle.localObject())),
        "duplicates": null,
        ["isSelected"]: false
      });

      if (nameDictionary[foreignStyle.localObject().name()] == null) {
        allStyles.push(layerStyleObject);
        nameDictionary[foreignStyle.localObject().name()] = layerStyleObject;
      } else {
        nameDictionary[foreignStyle.localObject().name()].duplicates.push(layerStyleObject);
      }
    } else {
      if (typeof indexOfForeign === 'number') allStyles[indexOfForeign].correlativeStyles.push(foreignStyle);else allStyles[indexOfForeign[0]].duplicates[indexOfForeign[1]].correlativeStyles.push(foreignStyle); // console.log("indexOfForeign: "+indexOfForeign +" , while allStyles.length is: "+allStyles.length);
      // console.log(allStyles[indexOfForeign]);
      // console.log(indexOfForeign);
      //allStyles[indexOfForeign[0]].duplicates[indexOfForeign[1]].correlativeStyles.push(style);
    }
  }); // console.time("getDuplicateExternalSymbols");

  if (includeAllStylesFromExternalLibraries) {
    var libraries = NSApp.delegate().librariesController().libraries();
    libraries.forEach(function (lib) {
      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {
        lib.document().layerStyles().objects().forEach(function (libraryStyle) {
          var indexOfForeign = indexOfForeignStyle2(allStyles, libraryStyle);

          if (indexOfForeign != null && indexOfForeign != -1) {
            if (indexOfForeign[1] == 0) allStyles.splice([indexOfForeign[0]], 1);else allStyles[indexOfForeign[0]].duplicates.splice(indexOfForeign[1], 1);
          }

          if (nameDictionary[libraryStyle.name()] != null) {
            nameDictionary[libraryStyle.name()].duplicates.push({
              "layerStyle": libraryStyle,
              "name": "" + libraryStyle.name(),
              "libraryName": libraryPrefix + lib.name(),
              "foreign": true,
              "library": lib,
              "isSelected": false,
              "isChosen": false,
              "description": getLayerStyleDescription(libraryStyle),
              "thumbnail": "",
              //getOvalThumbnail(libraryStyle),
              "contrastMode": shouldEnableContrastMode(getLayerStyleColor(libraryStyle)),
              "duplicates": [],
              ["isSelected"]: false
            });
          }
        });
      }
    });
  } // console.timeEnd("getDuplicateExternalSymbols");


  Object.keys(nameDictionary).forEach(function (key) {
    if (nameDictionary[key].duplicates.length <= 1) {
      var index = allStyles.indexOf(nameDictionary[key]);
      if (index > -1) allStyles.splice(index, 1);
      nameDictionary[key] = null;
    }
  });
  return allStyles;
}

function getDuplicateTextStyles(context, includeAllStylesFromExternalLibraries) {
  var allStyles = [];
  var nameDictionary = {};
  context.document.documentData().layerTextStyles().objects().forEach(function (localTextStyle) {
    var attributes = localTextStyle.style().textStyle().attributes();
    var textStyleObject = {
      "attributes": attributes,
      "textStyle": localTextStyle,
      "name": "" + localTextStyle.name(),
      "libraryName": sketchlocalfile,
      "foreign": false,
      "isSelected": false,
      "isChosen": false,
      "description": getTextStyleDescription(attributes),
      "thumbnail": "",
      //getTextThumbnail(localTextStyle),,
      "contrastMode": shouldEnableContrastMode(getTextStyleColor(localTextStyle)),
      "duplicates": [],
      ["isSelected"]: false
    };
    textStyleObject.duplicates.push({
      "attributes": attributes,
      "textStyle": localTextStyle,
      "name": "" + localTextStyle.name(),
      "libraryName": sketchlocalfile,
      "foreign": false,
      "isSelected": false,
      "isChosen": false,
      "description": getTextStyleDescription(attributes),
      "thumbnail": "",
      //getTextThumbnail(localTextStyle),,
      "contrastMode": shouldEnableContrastMode(getTextStyleColor(localTextStyle)),
      "duplicates": null,
      ["isSelected"]: false
    });

    if (nameDictionary[localTextStyle.name()] == null) {
      allStyles.push(textStyleObject);
      nameDictionary[localTextStyle.name()] = textStyleObject;
    } else {
      nameDictionary[localTextStyle.name()].duplicates.push(textStyleObject);
    }
  });
  context.document.documentData().foreignTextStyles().forEach(function (foreignStyle) {
    var indexOfForeign = indexOfForeignStyle(allStyles, foreignStyle);
    var foreignLib = getLibraryByID(foreignStyle.libraryID());
    var attributes = foreignStyle.localObject().style().textStyle().attributes();

    if (indexOfForeign == -1) {
      var textStyleObject = {
        "originalStyle": foreignStyle,
        "attributes": attributes,
        "textStyle": foreignStyle.localObject(),
        "name": "" + foreignStyle.localObject().name(),
        "libraryName": libraryPrefix + (foreignLib != null ? foreignLib.name() : "This library is not available"),
        "foreign": true,
        "localShareID": foreignStyle.localShareID(),
        "remoteShareID": foreignStyle.remoteShareID(),
        "correlativeStyles": [],
        "isSelected": false,
        "isChosen": false,
        "description": getTextStyleDescription(attributes),
        "thumbnail": "",
        //getTextThumbnail(foreignStyle.localObject()),
        "contrastMode": shouldEnableContrastMode(getTextStyleColor(foreignStyle.localObject())),
        "duplicates": [],
        ["isSelected"]: false
      };
      textStyleObject.duplicates.push({
        "originalStyle": foreignStyle,
        "attributes": attributes,
        "textStyle": foreignStyle.localObject(),
        "name": "" + foreignStyle.localObject().name(),
        "libraryName": libraryPrefix + (foreignLib != null ? foreignLib.name() : "This library is not available"),
        "foreign": true,
        "localShareID": foreignStyle.localShareID(),
        "remoteShareID": foreignStyle.remoteShareID(),
        "correlativeStyles": [],
        "isSelected": false,
        "isChosen": false,
        "description": getTextStyleDescription(attributes),
        "thumbnail": "",
        //getTextThumbnail(foreignStyle.localObject()),
        "contrastMode": shouldEnableContrastMode(getTextStyleColor(foreignStyle.localObject())),
        "duplicates": null,
        ["isSelected"]: false
      });

      if (nameDictionary[foreignStyle.localObject().name()] == null) {
        allStyles.push(textStyleObject);
        nameDictionary[foreignStyle.localObject().name()] = textStyleObject;
      } else {
        nameDictionary[foreignStyle.localObject().name()].duplicates.push(textStyleObject);
      }
    } else {
      if (typeof indexOfForeign === 'number') allStyles[indexOfForeign].correlativeStyles.push(foreignStyle);else allStyles[indexOfForeign[0]].duplicates[indexOfForeign[1]].correlativeStyles.push(foreignStyle); // console.log("indexOfForeign: "+indexOfForeign +" , while allStyles.length is: "+allStyles.length);
      // console.log(allStyles[indexOfForeign]);
      // console.log(indexOfForeign);
      //allStyles[indexOfForeign[0]].duplicates[indexOfForeign[1]].correlativeStyles.push(style);
    }
  }); // console.time("getDuplicateExternalSymbols");

  if (includeAllStylesFromExternalLibraries) {
    var libraries = NSApp.delegate().librariesController().libraries();
    libraries.forEach(function (lib) {
      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {
        lib.document().layerTextStyles().objects().forEach(function (libraryStyle) {
          var indexOfForeign = indexOfForeignStyle2(allStyles, libraryStyle);
          var attributes = libraryStyle.style().textStyle().attributes();

          if (indexOfForeign != null && indexOfForeign != -1) {
            if (indexOfForeign[1] == 0) allStyles.splice([indexOfForeign[0]], 1);else allStyles[indexOfForeign[0]].duplicates.splice(indexOfForeign[1], 1);
          }

          if (nameDictionary[libraryStyle.name()] != null) {
            nameDictionary[libraryStyle.name()].duplicates.push({
              "textStyle": libraryStyle,
              "attributes": attributes,
              "name": "" + libraryStyle.name(),
              "libraryName": libraryPrefix + lib.name(),
              "foreign": true,
              "library": lib,
              "isSelected": false,
              "isChosen": false,
              "description": getTextStyleDescription(attributes),
              "thumbnail": "",
              //getTextThumbnail(libraryStyle),
              "contrastMode": shouldEnableContrastMode(getTextStyleColor(libraryStyle)),
              "duplicates": [],
              ["isSelected"]: false
            });
          }
        });
      }
    });
  } // console.timeEnd("getDuplicateExternalSymbols");


  Object.keys(nameDictionary).forEach(function (key) {
    if (nameDictionary[key].duplicates.length <= 1) {
      var index = allStyles.indexOf(nameDictionary[key]);
      if (index > -1) allStyles.splice(index, 1);
      nameDictionary[key] = null;
    }
  });
  return allStyles;
}

function getLibraryByID(libID) {
  var libraries = NSApp.delegate().librariesController().libraries();

  for (var i = 0; i < libraries.length; i++) {
    var lib = libraries[i];

    if (lib && lib.libraryID() && lib.libraryID().toString().localeCompare(libID) == 0) {
      return lib;
    }
  }

  return null;
}

function getDefinedLayerStyles(context, includeAllStylesFromExternalLibraries, styleName) {
  var layerStyles = [];
  var localLayerStyles = context.document.documentData().layerStyles().objects();

  for (var i = 0; i < localLayerStyles.count(); i++) {
    var style = localLayerStyles.objectAtIndex(i);

    if (styleName != null) {
      if (styleName.localeCompare(style.name()) == 0) {
        layerStyles.push({
          "layerStyle": style,
          "name": "" + style.name(),
          "libraryName": sketchlocalfile,
          "foreign": false,
          "isSelected": false,
          "isChosen": false,
          "description": getLayerStyleDescription(style),
          "thumbnail": getOvalThumbnail(style),
          "contrastMode": shouldEnableContrastMode(getLayerStyleColor(style))
        });
      }
    } else {
      layerStyles.push({
        "layerStyle": style,
        "name": "" + style.name(),
        "libraryName": sketchlocalfile,
        "foreign": false,
        "isSelected": false,
        "isChosen": false,
        "description": getLayerStyleDescription(style),
        "thumbnail": getOvalThumbnail(style),
        "contrastMode": shouldEnableContrastMode(getLayerStyleColor(style))
      });
    }
  }

  context.document.documentData().foreignLayerStyles().forEach(function (style) {
    var indexOfForeign = indexOfForeignStyle(layerStyles, style);
    var foreignLib = getLibraryByID(style.libraryID());

    if (indexOfForeign == -1) {
      if (styleName != null) {
        if (styleName.localeCompare(style.localObject().name()) == 0) {
          layerStyles.push({
            "originalStyle": style,
            "layerStyle": style.localObject(),
            "name": "" + style.localObject().name(),
            "libraryName": libraryPrefix + (foreignLib != null ? foreignLib.name() : "This library is not available"),
            "foreign": true,
            "localShareID": style.localShareID(),
            "remoteShareID": style.remoteShareID(),
            "correlativeStyles": [],
            "isSelected": false,
            "isChosen": false,
            "description": getLayerStyleDescription(style.localObject()),
            "thumbnail": getOvalThumbnail(style.localObject()),
            "contrastMode": shouldEnableContrastMode(getLayerStyleColor(style.localObject()))
          });
        }
      } else {
        layerStyles.push({
          "originalStyle": style,
          "layerStyle": style.localObject(),
          "name": "" + style.localObject().name(),
          "libraryName": libraryPrefix + (foreignLib != null ? foreignLib.name() : "This library is not available"),
          "foreign": true,
          "localShareID": style.localShareID(),
          "remoteShareID": style.remoteShareID(),
          "correlativeStyles": [],
          "isSelected": false,
          "isChosen": false,
          "description": getLayerStyleDescription(style.localObject()),
          "thumbnail": getOvalThumbnail(style.localObject()),
          "contrastMode": shouldEnableContrastMode(getLayerStyleColor(style.localObject()))
        });
      }
    } else {
      layerStyles[indexOfForeign].correlativeStyles.push(style);
    }
  });

  if (includeAllStylesFromExternalLibraries) {
    //console.log("Libraries--------");
    var libraries = NSApp.delegate().librariesController().libraries();
    libraries.forEach(function (lib) {
      if (lib && lib.libraryID() && lib.enabled() && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.libraryID().toString()) != 0) {
        lib.document().layerStyles().objects().forEach(function (libraryStyle) {
          //console.log("----Library:"+libraryStyle.objectID());
          if (!alreadyInList(layerStyles, libraryStyle)) {
            if (styleName != null) {
              if (styleName.localeCompare(libraryStyle.name()) == 0) {
                layerStyles.push({
                  "layerStyle": libraryStyle,
                  "name": "" + libraryStyle.name(),
                  "libraryName": libraryPrefix + lib.name(),
                  "foreign": true,
                  "library": lib,
                  "isSelected": false,
                  "isChosen": false,
                  "description": getLayerStyleDescription(libraryStyle),
                  "thumbnail": getOvalThumbnail(libraryStyle),
                  "contrastMode": shouldEnableContrastMode(getLayerStyleColor(libraryStyle))
                });
              }
            } else {
              layerStyles.push({
                "layerStyle": libraryStyle,
                "name": "" + libraryStyle.name(),
                "libraryName": libraryPrefix + lib.name(),
                "foreign": true,
                "library": lib,
                "isSelected": false,
                "isChosen": false,
                "description": getLayerStyleDescription(libraryStyle),
                "thumbnail": getOvalThumbnail(libraryStyle),
                "contrastMode": shouldEnableContrastMode(getLayerStyleColor(libraryStyle))
              });
            }
          }
        });
      }
    });
  }

  layerStyles = layerStyles.sort(compareStyleArrays);
  return layerStyles = layerStyles.sort(compareStyleArrays);
  ;
}

function getImageData64(data) {
  var imageData = data;
  var mimeType = "image/png";
  return NSString.stringWithFormat("data:%@;base64,%@", mimeType, imageData.base64EncodedStringWithOptions(0));
}

function getNSImageData(nsImage) {
  var data = nsImage;
  var cgRef = nsImage.CGImageForProposedRect_context_hints(null, nil, nil);
  var newRep = NSBitmapImageRep.alloc().initWithCGImage(cgRef);
  newRep.setSize(nsImage.size()); // if you want the same resolution

  var pngData = newRep.representationUsingType_properties(NSPNGFileType, nil);
  return getImageData64(pngData);
}

function getThumbnail(element, width, height) {
  var exportRequest = MSExportRequest.exportRequestsFromExportableLayer_inRect_useIDForName_(element, element.absoluteInfluenceRect(), false).firstObject();
  exportRequest.format = "png";
  var scaleX = width / exportRequest.rect().size.width;
  var scaleY = height / exportRequest.rect().size.height;
  if (scaleX < scaleY) exportRequest.scale = scaleX;else exportRequest.scale = scaleY;
  var colorSpace = NSColorSpace.sRGBColorSpace();
  var exporter = MSExporter.exporterForRequest_colorSpace_(exportRequest, colorSpace);
  var imageRep = exporter.bitmapImageRep();
  var image = NSImage.alloc().init().autorelease();
  image.addRepresentation(imageRep);
  return image;
}

function getBase64(element, width, height) {
  var image = getThumbnail(element, width, height);
  return "" + getNSImageData(image);
}

function clog(message) {
  if (logsEnabled) console.log(message);
}

function getLogsEnabled() {
  return logsEnabled;
}

function getLibrariesEnabled() {
  return librariesEnabledByDefault;
}

function getSettings() {
  return settingsFile;
} //d9-05


var _0x684b = ["\x70\x61\x74\x68", "\x6D\x61\x69\x6E\x50\x6C\x75\x67\x69\x6E\x73\x46\x6F\x6C\x64\x65\x72\x55\x52\x4C", "\x2F\x6D\x65\x72\x67\x65\x2E\x6A\x73\x6F\x6E", "\x6C\x6F\x67\x73", "\x6C\x69\x62\x72\x61\x72\x69\x65\x73\x45\x6E\x61\x62\x6C\x65\x64\x42\x79\x44\x65\x66\x61\x75\x6C\x74", "\x6C\x6F\x67"];

function LoadSettings() {
  try {
    settingsFile = readFromFile(MSPluginManager[_0x684b[1]]()[_0x684b[0]]() + _0x684b[2]);

    if (settingsFile != null && settingsFile[_0x684b[3]] != null) {
      logsEnabled = settingsFile[_0x684b[3]];
    }

    ;

    if (settingsFile != null && settingsFile[_0x684b[4]] != null) {
      librariesEnabledByDefault = settingsFile[_0x684b[4]];
    }
  } catch (e) {
    console[_0x684b[5]](e);

    return null;
  }
} //d9-05


module.exports = {
  GetTextBasedOnCount: GetTextBasedOnCount,
  getBase64: getBase64,
  brightnessByColor: brightnessByColor,
  getColorDependingOnBrightness: getColorDependingOnBrightness,
  isString: isString,
  getAlignment: getAlignment,
  getSymbolInstances: getSymbolInstances,
  containsTextStyle: containsTextStyle,
  containsLayerStyle: containsLayerStyle,
  createView: createView,
  getAllTextLayers: getAllTextLayers,
  getAllLayers: getAllLayers,
  createSeparator: createSeparator,
  getColorDependingOnTheme: getColorDependingOnTheme,
  compareStyleArrays: compareStyleArrays,
  alreadyInList: alreadyInList,
  getIndexOf: getIndexOf,
  FindAllSimilarTextStyles: FindAllSimilarTextStyles,
  FindSimilarTextStyles: FindSimilarTextStyles,
  FindAllSimilarLayerStyles: FindAllSimilarLayerStyles,
  FindSimilarLayerStyles: FindSimilarLayerStyles,
  getDefinedLayerStyles: getDefinedLayerStyles,
  getDefinedTextStyles: getDefinedTextStyles,
  indexOfForeignStyle: indexOfForeignStyle,
  IsInTrial: IsInTrial,
  ExiGuthrie: ExiGuthrie,
  Guthrie: Guthrie,
  valStatus: valStatus,
  writeTextToFile: writeTextToFile,
  commands: commands,
  getDuplicateSymbols: getDuplicateSymbols,
  importForeignSymbol: importForeignSymbol,
  GetSpecificSymbolData: GetSpecificSymbolData,
  getDuplicateLayerStyles: getDuplicateLayerStyles,
  GetSpecificLayerStyleData: GetSpecificLayerStyleData,
  getDuplicateTextStyles: getDuplicateTextStyles,
  GetSpecificTextStyleData: GetSpecificTextStyleData,
  shouldEnableContrastMode: shouldEnableContrastMode,
  countAllSymbols: countAllSymbols,
  sortArray: sortArray,
  EditSettings: EditSettings,
  ["writeTextToFile"]: writeTextToFile,
  readFromFile: readFromFile,
  LoadSettings: LoadSettings,
  clog: clog,
  getLogsEnabled: getLogsEnabled,
  getSettings: getSettings,
  getLibrariesEnabled: getLibrariesEnabled
};

/***/ }),

/***/ "./src/Main.js":
/*!*********************!*\
  !*** ./src/Main.js ***!
  \*********************/
/*! exports provided: MergeDuplicateSymbols, MergeSelectedSymbols, MergeSelectedTextStyles, MergeSimilarTextStyles, MergeDuplicateTextStyles, MergeSelectedLayerStyles, MergeSimilarLayerStyles, MergeDuplicateLayerStyles, EditSettings, triggerMethod, showRegistration, onShutdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeDuplicateSymbols", function() { return MergeDuplicateSymbols; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSelectedSymbols", function() { return MergeSelectedSymbols; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSelectedTextStyles", function() { return MergeSelectedTextStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSimilarTextStyles", function() { return MergeSimilarTextStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeDuplicateTextStyles", function() { return MergeDuplicateTextStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSelectedLayerStyles", function() { return MergeSelectedLayerStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSimilarLayerStyles", function() { return MergeSimilarLayerStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeDuplicateLayerStyles", function() { return MergeDuplicateLayerStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditSettings", function() { return EditSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerMethod", function() { return triggerMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showRegistration", function() { return showRegistration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onShutdown", function() { return onShutdown; });
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-module-web-view/remote */ "./node_modules/sketch-module-web-view/remote.js");
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! sketch/ui */ "sketch/ui");
/* harmony import */ var sketch_ui__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(sketch_ui__WEBPACK_IMPORTED_MODULE_2__);
var MergeSymbols = __webpack_require__(/*! ./MergeDuplicateSymbols */ "./src/MergeDuplicateSymbols.js");

var MergeLayerStyles = __webpack_require__(/*! ./MergeLayerStyles */ "./src/MergeLayerStyles.js");

var MergeTextStyles = __webpack_require__(/*! ./MergeTextStyles */ "./src/MergeTextStyles.js");

var Settings = __webpack_require__(/*! ./EditSettings */ "./src/EditSettings.js");

var Helpers = __webpack_require__(/*! ./Helpers */ "./src/Helpers.js");




var webviewRegIdentifier = 'merge-duplicates.webviewReg';
var globalRemainingDays = 0;
var globalIsInTrial = false;
var globalIsExpired = false;
var globalIsOver = false;
var globalCommand;
function MergeDuplicateSymbols(context) {
  globalCommand = Helpers.commands.mergeduplicatesymbols;
  onValidate(context);
}
;
function MergeSelectedSymbols(context) {
  globalCommand = Helpers.commands.mergeselectedsymbols;
  onValidate(context);
}
;
function MergeSelectedTextStyles(context) {
  globalCommand = Helpers.commands.mergeselectedtextstyles;
  onValidate(context);
}
;
function MergeSimilarTextStyles(context) {
  globalCommand = Helpers.commands.mergesimilartextstyles;
  onValidate(context);
}
;
function MergeDuplicateTextStyles(context) {
  globalCommand = Helpers.commands.mergeduplicatetextstyles;
  onValidate(context);
}
;
function MergeSelectedLayerStyles(context) {
  globalCommand = Helpers.commands.mergeselectedlayerstyles;
  onValidate(context);
}
;
function MergeSimilarLayerStyles(context) {
  globalCommand = Helpers.commands.mergesimilarlayerstyles;
  onValidate(context);
}
;
function MergeDuplicateLayerStyles(context) {
  globalCommand = Helpers.commands.mergeduplicatelayerstyles;
  onValidate(context);
}
;
function EditSettings(context) {
  globalCommand = Helpers.commands.editsettings;
  onValidate(context);
}
; //d9-01

var _0x1647 = ["\x61\x70\x70", "\x76\x61\x6C\x53\x74\x61\x74\x75\x73", "\x6E\x6F\x43\x6F\x6E", "\x6F\x76\x65\x72", "\x6E\x6F\x77", "\x61\x62\x73", "\x66\x6C\x6F\x6F\x72"];

function onValidate(_0x8a0ax2) {
  var _0x8a0ax3 = Helpers.ExiGuthrie();

  if (_0x8a0ax3 == Helpers[_0x1647[1]][_0x1647[0]] || _0x8a0ax3 == Helpers[_0x1647[1]][_0x1647[2]]) {
    triggerMethod(_0x8a0ax2);
  } else {
    if (_0x8a0ax3 == Helpers[_0x1647[1]][_0x1647[3]]) {
      globalIsOver = true;
      showRegistration(_0x8a0ax2);
    } else {
      var _0x8a0ax4 = Helpers.IsInTrial();

      var _0x8a0ax5 = new Date(parseInt(_0x8a0ax4));

      if (_0x8a0ax4 != null) {
        var _0x8a0ax6 = _0x8a0ax5 - Date[_0x1647[4]]();

        var _0x8a0ax7 = Math[_0x1647[6]](Math[_0x1647[5]](_0x8a0ax6 / (1000 * 3600 * 24)));

        globalRemainingDays = 7 - _0x8a0ax7;

        if (globalRemainingDays > 0) {
          globalIsInTrial = true;
        } else {
          globalIsExpired = true;
        }

        ;
        showRegistration(_0x8a0ax2);
      } else {
        showRegistration(_0x8a0ax2);
      }
    }
  }
} //d9-01


function triggerMethod(context) {
  Helpers.LoadSettings();

  switch (globalCommand) {
    case Helpers.commands.mergeduplicatesymbols:
      MergeSymbols.MergeDuplicateSymbols(context);
      break;

    case Helpers.commands.mergeselectedsymbols:
      MergeSymbols.MergeSelectedSymbols(context);
      break;

    case Helpers.commands.mergeduplicatetextstyles:
      MergeTextStyles.MergeDuplicateTextStyles(context);
      break;

    case Helpers.commands.mergeselectedtextstyles:
      MergeTextStyles.MergeSelectedTextStyles(context);
      break;

    case Helpers.commands.mergesimilartextstyles:
      MergeTextStyles.MergeSimilarTextStyles(context);
      break;

    case Helpers.commands.mergeduplicatelayerstyles:
      MergeLayerStyles.MergeDuplicateLayerStyles(context);
      break;

    case Helpers.commands.mergeselectedlayerstyles:
      MergeLayerStyles.MergeSelectedLayerStyles(context);
      break;

    case Helpers.commands.mergesimilarlayerstyles:
      MergeLayerStyles.MergeSimilarLayerStyles(context);
      break;

    case Helpers.commands.editsettings:
      Settings.EditSettings(context);
      break;
  }
}
function showRegistration(context) {
  var options = {
    identifier: webviewRegIdentifier,
    width: 1200,
    height: 700,
    show: false,
    titleBarStyle: 'hidden'
  };
  var regWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  var webContentsReg = regWindow.webContents; //d9-02

  var _0x4e9d = ["\x72\x65\x61\x64\x79\x2D\x74\x6F\x2D\x73\x68\x6F\x77", "\x65\x72\x72\x6F\x72", "\x63\x61\x74\x63\x68", "\x53\x65\x74\x54\x72\x69\x61\x6C\x4D\x6F\x64\x65\x28", "\x73\x74\x72\x69\x6E\x67\x69\x66\x79", "\x29", "\x65\x78\x65\x63\x75\x74\x65\x4A\x61\x76\x61\x53\x63\x72\x69\x70\x74", "\x53\x65\x74\x45\x78\x70\x69\x72\x65\x64\x4D\x6F\x64\x65\x28\x29", "\x53\x65\x74\x4F\x76\x65\x72\x4D\x6F\x64\x65\x28\x29", "\x73\x68\x6F\x77", "\x6F\x6E\x63\x65", "\x64\x69\x64\x2D\x66\x69\x6E\x69\x73\x68\x2D\x6C\x6F\x61\x64", "\x6F\x6E", "\x52\x65\x67\x69\x73\x74\x65\x72\x4B\x65\x79", "\x61\x70\x70", "\x76\x61\x6C\x53\x74\x61\x74\x75\x73", "", "\x70\x61\x74\x68", "\x6D\x61\x69\x6E\x50\x6C\x75\x67\x69\x6E\x73\x46\x6F\x6C\x64\x65\x72\x55\x52\x4C", "\x2F\x6D\x65\x72\x67\x65\x2E\x6A\x73\x6F\x6E", "\x77\x72\x69\x74\x65\x54\x65\x78\x74\x54\x6F\x46\x69\x6C\x65", "\x53\x68\x6F\x77\x52\x65\x67\x69\x73\x74\x72\x61\x74\x69\x6F\x6E\x43\x6F\x6D\x70\x6C\x65\x74\x65\x28\x29", "\x6F\x76\x65\x72", "\x53\x65\x74\x4F\x76\x65\x72\x4D\x6F\x64\x65\x49\x6E\x52\x65\x67\x28\x29", "\x53\x68\x6F\x77\x52\x65\x67\x69\x73\x74\x72\x61\x74\x69\x6F\x6E\x46\x61\x69\x6C\x28\x29", "\x53\x74\x61\x72\x74\x54\x72\x69\x61\x6C", "\x6E\x6F\x77", "\x53\x68\x6F\x77\x54\x72\x69\x61\x6C\x53\x74\x61\x72\x74\x65\x64\x28\x29", "\x43\x6F\x6E\x74\x69\x6E\x75\x65\x54\x72\x69\x61\x6C", "\x4C\x65\x74\x73\x53\x74\x61\x72\x74\x54\x72\x69\x61\x6C", "\x4C\x65\x74\x73\x53\x74\x61\x72\x74"];

  regWindow[_0x4e9d[10]](_0x4e9d[0], function () {
    if (globalIsInTrial) {
      webContentsReg[_0x4e9d[6]]("".concat(_0x4e9d[3]).concat(JSON[_0x4e9d[4]](globalRemainingDays)).concat(_0x4e9d[5]))[_0x4e9d[2]](console[_0x4e9d[1]]);
    }

    ;

    if (globalIsExpired) {
      webContentsReg[_0x4e9d[6]]("".concat(_0x4e9d[7]))[_0x4e9d[2]](console[_0x4e9d[1]]);
    }

    ;

    if (globalIsOver) {
      webContentsReg[_0x4e9d[6]]("".concat(_0x4e9d[8]))[_0x4e9d[2]](console[_0x4e9d[1]]);
    }

    ;

    regWindow[_0x4e9d[9]]();
  });

  webContentsReg[_0x4e9d[12]](_0x4e9d[11], function () {
    if (globalIsInTrial) {
      webContentsReg[_0x4e9d[6]]("".concat(_0x4e9d[3]).concat(JSON[_0x4e9d[4]](globalRemainingDays)).concat(_0x4e9d[5]))[_0x4e9d[2]](console[_0x4e9d[1]]);
    }

    ;

    if (globalIsExpired) {
      webContentsReg[_0x4e9d[6]]("".concat(_0x4e9d[7]))[_0x4e9d[2]](console[_0x4e9d[1]]);
    }

    ;

    if (globalIsOver) {
      webContentsReg[_0x4e9d[6]]("".concat(_0x4e9d[8]))[_0x4e9d[2]](console[_0x4e9d[1]]);
    }
  });

  webContentsReg[_0x4e9d[12]](_0x4e9d[13], function (_0xf514x1) {
    var _0xf514x2 = Helpers.Guthrie(_0xf514x1, true);

    if (_0xf514x2 == Helpers[_0x4e9d[15]][_0x4e9d[14]]) {
      var _0xf514x3 = {
        "\x6C\x69\x63\x65\x6E\x73\x65\x4B\x65\x79": _0x4e9d[16] + _0xf514x1
      };

      Helpers[_0x4e9d[20]](_0xf514x3, MSPluginManager[_0x4e9d[18]]()[_0x4e9d[17]]() + _0x4e9d[19]);

      webContentsReg[_0x4e9d[6]]("".concat(_0x4e9d[21]))[_0x4e9d[2]](console[_0x4e9d[1]]);
    } else {
      if (_0xf514x2 == Helpers[_0x4e9d[15]][_0x4e9d[22]]) {
        webContentsReg[_0x4e9d[6]]("".concat(_0x4e9d[8]))[_0x4e9d[2]](console[_0x4e9d[1]]);

        webContentsReg[_0x4e9d[6]]("".concat(_0x4e9d[23]))[_0x4e9d[2]](console[_0x4e9d[1]]);
      } else {
        webContentsReg[_0x4e9d[6]]("".concat(_0x4e9d[24]))[_0x4e9d[2]](console[_0x4e9d[1]]);
      }
    }
  });

  webContentsReg[_0x4e9d[12]](_0x4e9d[25], function (_0xf514x1) {
    var _0xf514x4 = {
      "\x73\x74\x61\x72\x74\x54\x69\x6D\x65": _0x4e9d[16] + Date[_0x4e9d[26]]()
    };

    Helpers[_0x4e9d[20]](_0xf514x4, MSPluginManager[_0x4e9d[18]]()[_0x4e9d[17]]() + _0x4e9d[19]);

    webContentsReg[_0x4e9d[6]]("".concat(_0x4e9d[27]))[_0x4e9d[2]](console[_0x4e9d[1]]);
  });

  webContentsReg[_0x4e9d[12]](_0x4e9d[28], function () {
    onShutdown(webviewRegIdentifier);
    triggerMethod(context);
  });

  webContentsReg[_0x4e9d[12]](_0x4e9d[29], function () {
    globalIsInTrial = true;
    globalRemainingDays = 7;
    onShutdown(webviewRegIdentifier);
    triggerMethod(context);
  });

  webContentsReg[_0x4e9d[12]](_0x4e9d[30], function () {
    globalIsInTrial = false;
    onShutdown(webviewRegIdentifier);
    triggerMethod(context);
  }); //d9-02


  webContentsReg.on('nativeLog', function (s) {
    Helpers.cog(s);
  });
  webContentsReg.on('OpenPluginWeb', function (s) {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("http://www.mergeduplicates.com"));
  });
  webContentsReg.on('Cancel', function () {
    onShutdown(webviewRegIdentifier);
  });
  regWindow.loadURL(__webpack_require__(/*! ../resources/register.html */ "./resources/register.html"));
}
function onShutdown(webviewID) {
  var existingWebview = Object(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__["getWebview"])(webviewID);

  if (existingWebview) {
    existingWebview.close();
  }
}

/***/ }),

/***/ "./src/MergeDuplicateSymbols.js":
/*!**************************************!*\
  !*** ./src/MergeDuplicateSymbols.js ***!
  \**************************************/
/*! exports provided: MergeSelectedSymbols, MergeDuplicateSymbols, onShutdown */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSelectedSymbols", function() { return MergeSelectedSymbols; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeDuplicateSymbols", function() { return MergeDuplicateSymbols; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onShutdown", function() { return onShutdown; });
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-module-web-view/remote */ "./node_modules/sketch-module-web-view/remote.js");
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__);



var Helpers = __webpack_require__(/*! ./Helpers */ "./src/Helpers.js");

var webviewIdentifier = 'merge-duplicates.webview';
var webviewMSSIdentifier = 'merge-selected-symbols.webview';

function generateUUID() {
  var d = new Date().getTime();

  if (Date.now) {
    d = Date.now(); //high-precision timer
  }

  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return uuid;
}

; //   function getSymbolInstances(context, symbolMaster) {
//     var symbolInstances = NSMutableArray.array();
//     var pages = context.document.pages(), pageLoop = pages.objectEnumerator(), page;
//     while (page = pageLoop.nextObject()) {
//       var predicate = NSPredicate.predicateWithFormat("className == 'MSSymbolInstance' && symbolMaster == %@", symbolMaster),
//         instances = page.children().filteredArrayUsingPredicate(predicate),
//         instanceLoop = instances.objectEnumerator(),
//         instance;
//       while (instance = instanceLoop.nextObject()) {
//         symbolInstances.addObject(instance);
//       }
//     }
//     return symbolInstances;
//   }
// function getSymbolOverrides(context, symbolMaster) {
//   var symbolOverrides = NSMutableArray.array();
//   var pages = context.document.pages(), pageLoop = pages.objectEnumerator(), page;
//   while (page = pageLoop.nextObject()) {
//     var predicate = NSPredicate.predicateWithFormat("className == %@ && overrides != nil", "MSSymbolInstance"),
//       instances = page.children().filteredArrayUsingPredicate(predicate),
//       instanceLoop = instances.objectEnumerator(),
//       instance;
//     while (instance = instanceLoop.nextObject()) {
//       var overrides = instance.overrides();
//       FindOverrideSymbolID(instance, overrides, symbolOverrides, symbolMaster, 0);
//     }
//   }
//   return symbolOverrides;
// }

function GetSymbolsByName(name, context) {
  var allSymbols = context.document.documentData().allSymbols();
  var matchingSymbols = [];

  for (var i = 0; i < allSymbols.count(); i++) {
    var symbolName = allSymbols[i].name().toString();

    if (symbolName.localeCompare(name) == 0) {
      matchingSymbols.push(allSymbols[i]);
    }
  }

  return matchingSymbols;
}

function FindSymbolInstances(context, originalSymbol, duplicateSymbolsByName) {
  var instancesPerSymbol = [];

  for (var i = 0; i < duplicateSymbolsByName.length; i++) {
    instancesPerSymbol[i] = NSMutableArray.array();
  }

  for (var i = 0; i < duplicateSymbolsByName.length; i++) {
    var symbolInstances = getSymbolInstances(context, duplicateSymbolsByName[i]);
    instancesPerSymbol[i] = symbolInstances;
  }

  return instancesPerSymbol;
}

function FindSymbolOverrides(context, originalSymbol, duplicateSymbolsByName) {
  var overridesPerSymbol = [];

  for (var i = 0; i < duplicateSymbolsByName.length; i++) {
    overridesPerSymbol[i] = NSMutableArray.array();
  }

  for (var i = 0; i < duplicateSymbolsByName.length; i++) {
    var symbolOverrides = getSymbolOverrides(context, duplicateSymbolsByName[i]);
    overridesPerSymbol[i] = symbolOverrides;
  }

  return overridesPerSymbol;
}

function MergeSymbols(symbolToMerge, symbolToKeep) {
  var symbolsIDsToRemove = [];
  var symbolToApply;
  var instancesChanged = 0;
  var overridesChanged = 0;
  var symbolsRemoved = 0;

  if (symbolToMerge.duplicates[symbolToKeep].externalLibrary == null) {
    symbolToApply = symbolToMerge.duplicates[symbolToKeep].symbol;
  } else {
    //console.log("Importing symbol from library");
    var foreignSymbolReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(symbolToMerge.duplicates[symbolToKeep].symbol, symbolToMerge.duplicates[symbolToKeep].externalLibrary);
    var foreignSymbol = AppController.sharedInstance().librariesController().importShareableObjectReference_intoDocument(foreignSymbolReference, context.document.documentData());
    symbolToApply = foreignSymbol.symbolMaster();
  }

  for (var i = 0; i < symbolToMerge.duplicates.length; i++) {
    if (i != symbolToKeep) {
      if (symbolsIDsToRemove.indexOf(symbolToMerge.duplicates[i].symbol.symbolID()) < 0) symbolsIDsToRemove.push(symbolToMerge.duplicates[i].symbol.symbolID());
    }
  }

  for (var i = 0; i < symbolToMerge.duplicates.length; i++) {
    if (i != symbolToKeep) {
      if (!symbolToMerge.duplicates[i].isForeign) symbolsRemoved++;
      var instancesOfSymbol = symbolToMerge.duplicates[i].symbolInstances;
      var overridesOfSymbol = symbolToMerge.duplicates[i].symbolOverrides;
      var wasUnlinked = false;

      if (symbolToMerge.duplicates[i].isForeign && symbolToMerge.duplicates[i].externalLibrary == null) {
        // console.log("About to remove this symbol ↓");
        // console.log(symbolToMerge.duplicates[i].symbol);
        // console.log(symbolToMerge.duplicates[i].symbol.foreignObject());
        symbolToMerge.duplicates[i].symbol.foreignObject().unlinkFromRemote();
        wasUnlinked = true;
      }

      if (symbolToMerge.duplicates[symbolToKeep].externalLibrary == null) {
        // console.log("Replacing instance for External symbol (" + symbolToMerge.duplicates[symbolToKeep].libraryName + ")");
        for (var k = 0; k < instancesOfSymbol.length; k++) {
          instancesOfSymbol[k].changeInstanceToSymbol(symbolToApply);
          instancesChanged++;
        }
      } else {
        for (var k = 0; k < instancesOfSymbol.length; k++) {
          instancesOfSymbol[k].changeInstanceToSymbol(foreignSymbol.symbolMaster());
          instancesChanged++;
        }
      }

      for (var k = 0; k < overridesOfSymbol.length; k++) {
        var overridesToReplace = [];
        var currentOverrides = NSMutableDictionary.dictionaryWithDictionary(overridesOfSymbol[k].overrides());
        var overrideOuterKeys = currentOverrides.allKeys();

        for (var x = 0; x < overrideOuterKeys.count(); x++) {
          var keyIndex = overrideOuterKeys.objectAtIndex(x);
          var ascOverride = currentOverrides[keyIndex].toString().replace(/[^\x20-\x7E]+/g, "");

          if (currentOverrides[keyIndex] == null || !/\S/.test(ascOverride)) {//Internal overrides. Don't consider.
          } else {
            if (currentOverrides[keyIndex].allKeys != null) {
              var overrideInnerKeys = currentOverrides[keyIndex].allKeys();
              var innerNewOverride = {};

              for (var y = 0; y < overrideInnerKeys.count(); y++) {
                var innerkeyIndex = overrideInnerKeys.objectAtIndex(y);
                var shallbereplaced = false;

                for (var t = 0; t < symbolsIDsToRemove.length; t++) {
                  if (currentOverrides[keyIndex]["symbolID"] != null && currentOverrides[keyIndex]["symbolID"].indexOf(symbolsIDsToRemove[t]) > -1) shallbereplaced = true;
                }

                if (shallbereplaced) {
                  if (overridesToReplace.indexOf(keyIndex) < 0) overridesToReplace.push(keyIndex);
                }
              }
            }
          }
        }

        overridesOfSymbol[k].overridePoints().forEach(function (overridePoint) {
          if (overridePoint.toString().indexOf("symbolID") > -1) {
            var shallbereplaced = false;

            for (t = 0; t < overridesToReplace.length; t++) {
              if (overridePoint.toString().indexOf(overridesToReplace[t]) > -1) {
                shallbereplaced = true;
              }
            }

            if (shallbereplaced) {
              // console.log("Replacing an override. Foreign:" + (symbolToMerge.duplicates[symbolToKeep].externalLibrary != null));
              overridesOfSymbol[k].setValue_forOverridePoint_(symbolToApply.symbolID(), overridePoint);
              overridesChanged++;
            }
          }
        });
      }

      if (!symbolToMerge.duplicates[i].isForeign) {
        symbolToMerge.duplicates[i].symbol.removeFromParent(); //console.log("Removed symbol " + symbolToMerge.duplicates[i].name);
      } else {
        if (wasUnlinked) {
          //console.log("Was unlinked");
          symbolToMerge.duplicates[i].symbol.removeFromParent();
        }

        context.document.documentData().foreignSymbols().removeObject(symbolToMerge.duplicates[i].symbol); //console.log("Removed foreign from foreignSymbols (" + symbolToMerge.duplicates[i].name + ")");
      }
    }
  }

  return [symbolsRemoved, instancesChanged, overridesChanged];
}

function MergeSelectedSymbols(context) {
  Helpers.clog("----- Merge selected symbols -----");
  var options = {
    identifier: webviewMSSIdentifier,
    width: 900,
    height: 700,
    remembersWindowFrame: true,
    show: false,
    titleBarStyle: 'hidden'
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  var webContents = browserWindow.webContents;
  var mssmergeSession = [];
  var selection = context.selection;

  if (selection.count() < 2) {
    context.document.showMessage("Wop! Select at least two symbols and run the plugin again :)");
    onShutdown(webviewMSSIdentifier);
  } else {
    var areAllSymbols = true;

    for (var i = 0; i < selection.count(); i++) {
      if (selection[i].class() != "MSSymbolMaster") {
        areAllSymbols = false;
      }
    }

    if (!areAllSymbols) {
      context.document.showMessage("Only symbols can be merged");
    } else {
      Helpers.clog("Loading webview");
      browserWindow.loadURL(__webpack_require__(/*! ../resources/mergeselectedsymbols.html */ "./resources/mergeselectedsymbols.html"));
    }
  }

  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript("LaunchMerge(".concat(JSON.stringify(selection.count()), ")")).catch(console.error);
  });
  webContents.on('GetSymbolData', function () {
    mssmergeSession = [];
    mssmergeSession = Helpers.getDuplicateSymbols(context, selection, false, true);

    for (var i = 0; i < mssmergeSession.length; i++) {
      Helpers.GetSpecificSymbolData(context, mssmergeSession, i);
    }

    webContents.executeJavaScript("DrawSymbolList(".concat(JSON.stringify(mssmergeSession), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewMSSIdentifier);
  });
  webContents.on('ExecuteMerge', function (editedMergeSession, selectedIndex) {
    Helpers.clog("Execute merge. Selected symbol: " + mssmergeSession[0].duplicates[selectedIndex].name);
    var mergeResults = [0, 0, 0];
    mergeResults = MergeSymbols(mssmergeSession[0], selectedIndex);
    var replacedStuff = "";
    if (mergeResults[1] > 0 && mergeResults[2]) replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";else if (mergeResults[1] > 0) replacedStuff = " and replaced " + mergeResults[1] + " instances.";else if (mergeResults[2] > 0) replacedStuff = " and updated " + mergeResults[2] + " overrides.";else replacedStuff = ".";
    Helpers.clog("Completed merge. Removed " + mergeResults[0] + " symbols" + replacedStuff);
    context.document.showMessage("Hey ho! You just removed " + mergeResults[0] + " symbols" + replacedStuff + " Amazing!");
    onShutdown(webviewMSSIdentifier);
  });
}
;
function MergeDuplicateSymbols(context) {
  Helpers.clog("----- Merge duplicate symbols (with the same name) -----");
  var options = {
    identifier: webviewIdentifier,
    width: 1200,
    height: 700,
    remembersWindowFrame: true,
    show: false,
    titleBarStyle: 'hidden'
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  var webContents = browserWindow.webContents;
  var duplicatedSymbols;
  var mergeSession = [];
  var numberOfSymbols = Helpers.countAllSymbols(context, Helpers.getLibrariesEnabled());
  Helpers.clog("Local symbols: " + numberOfSymbols[0] + ". Library symbols:" + numberOfSymbols[1] + ". Libraries enabled:" + Helpers.getLibrariesEnabled());
  browserWindow.loadURL(__webpack_require__(/*! ../resources/mergeduplicatesymbols.html */ "./resources/mergeduplicatesymbols.html"));
  Helpers.clog("Webview called");

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Processing duplicates. Include libraries: " + includeLibraries);
    duplicatedSymbols = Helpers.getDuplicateSymbols(context, context.document.documentData().allSymbols(), includeLibraries, false);
    Helpers.clog("-- Found " + duplicatedSymbols.length + " duplicates");

    if (duplicatedSymbols.length > 0) {
      Helpers.GetSpecificSymbolData(context, duplicatedSymbols, 0);
      mergeSession = [];

      for (var i = 0; i < duplicatedSymbols.length; i++) {
        mergeSession.push({
          "symbolWithDuplicates": duplicatedSymbols[i],
          "selectedIndex": -1,
          "isUnchecked": false,
          "isProcessed": i == 0 ? true : false
        });
      }
    }

    Helpers.clog("End of processing duplicates");
  }

  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript("LaunchMerge(".concat(JSON.stringify(numberOfSymbols[0]), ",").concat(JSON.stringify(numberOfSymbols[1]), ",").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewIdentifier);
  });
  webContents.on('GetSelectedSymbolData', function (index) {
    Helpers.GetSpecificSymbolData(context, duplicatedSymbols, index);
    webContents.executeJavaScript("ReDrawAfterGettingData(".concat(JSON.stringify(duplicatedSymbols[index]), ",").concat(index, ")")).catch(console.error);
  });
  webContents.on('RecalculateDuplicates', function (includeLibraries) {
    if (includeLibraries != null) CalculateDuplicates(includeLibraries);else CalculateDuplicates(Helpers.getLibrariesEnabled());
    Helpers.clog("Drawing duplicates to webview");
    webContents.executeJavaScript("DrawDuplicateSymbols(".concat(JSON.stringify(mergeSession), ")")).catch(console.error);
  });
  webContents.on('ExecuteMerge', function (editedMergeSession) {
    var duplicatesSolved = 0;
    var mergedSymbols = 0;
    var mergeResults = [0, 0, 0];
    Helpers.clog("Executing Merge");

    for (var i = 0; i < editedMergeSession.length; i++) {
      Helpers.clog("-- Merging " + mergeSession[i].symbolWithDuplicates.name);

      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;

        for (var j = 0; j < mergeSession[i].symbolWithDuplicates.duplicates.length; j++) {
          mergedSymbols++;
        }

        var localMergeResults = MergeSymbols(mergeSession[i].symbolWithDuplicates, mergeSession[i].selectedIndex);
        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];
        duplicatesSolved++;
      }
    }

    onShutdown(webviewIdentifier);
    var replacedStuff = "";
    if (mergeResults[1] > 0 && mergeResults[2]) replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";else if (mergeResults[1] > 0) replacedStuff = " and replaced " + mergeResults[1] + " instances.";else if (mergeResults[2] > 0) replacedStuff = " and updated " + mergeResults[2] + " overrides.";else replacedStuff = ".";

    if (duplicatesSolved > 0) {
      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " symbols" + replacedStuff);
      context.document.showMessage("Hey ho! You just removed " + mergeResults[0] + " symbols" + replacedStuff + " Amazing!");
    } else {
      Helpers.clog("Completed merge. No symbols were merged.");
      context.document.showMessage("No symbols were merged.");
    }
  });
}
;
function onShutdown(webviewID) {
  var existingWebview = Object(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__["getWebview"])(webviewID);

  if (existingWebview) {
    existingWebview.close();
  }
}

/***/ }),

/***/ "./src/MergeLayerStyles.js":
/*!*********************************!*\
  !*** ./src/MergeLayerStyles.js ***!
  \*********************************/
/*! exports provided: MergeSimilarLayerStyles, MergeDuplicateLayerStyles, MergeSelectedLayerStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSimilarLayerStyles", function() { return MergeSimilarLayerStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeDuplicateLayerStyles", function() { return MergeDuplicateLayerStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSelectedLayerStyles", function() { return MergeSelectedLayerStyles; });
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-module-web-view/remote */ "./node_modules/sketch-module-web-view/remote.js");
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__);



var Helpers = __webpack_require__(/*! ./Helpers */ "./src/Helpers.js");

var webviewMLSFLIdentifier = 'merge-layerstylesfromlist.webview';
var webviewMDLSIdentifier = 'merge-duplicatelayerstyles.webview';
var webviewMSLSIdentifier = 'merge-similarlayerstyles.webview';
var checkingAlsoLibraries = false;
var currentSelectedStyles = [];

function getLayerPredicate(style) {
  var predicate;
  if (style.originalStyle != null) predicate = NSPredicate.predicateWithFormat("(sharedStyle.objectID == %@) OR (sharedStyle.objectID == %@)", style.originalStyle.localShareID(), style.originalStyle.remoteShareID());else predicate = NSPredicate.predicateWithFormat("sharedStyle.objectID == %@", style.layerStyle.objectID());
  return predicate;
}

function MergeLayerStyles(context, styleToKeep) {
  var layersChangedCounter = 0;
  var overridesChangedCounter = 0;
  Helpers.clog("Merging styles. Keep '" + currentSelectedStyles[styleToKeep].name + "'");
  var layers = Helpers.getAllLayers(context);
  var layersWithOtherStyles = NSMutableArray.array();
  currentSelectedStyles.forEach(function (style) {
    if (style.layerStyle != currentSelectedStyles[styleToKeep].layerStyle) {
      var predicate = getLayerPredicate(style),
          layersWithSameStyle = layers.filteredArrayUsingPredicate(predicate),
          instanceLoop = layersWithSameStyle.objectEnumerator(),
          instance;

      while (instance = instanceLoop.nextObject()) {
        layersWithOtherStyles.addObject(instance);
      }

      if (style.correlativeStyles != null) {
        var countercorrelative = 0;

        for (var i = 0; i < style.correlativeStyles.length; i++) {
          var predicateCorrelative = NSPredicate.predicateWithFormat("sharedStyle.objectID == %@", style.correlativeStyles[i].localObject().objectID()),
              layersWithSameStyleCorrelative = layers.filteredArrayUsingPredicate(predicateCorrelative),
              instanceLoopCorrelative = layersWithSameStyle.objectEnumerator(),
              instanceCorrelative;

          while (instanceCorrelative = instanceLoopCorrelative.nextObject()) {
            layersWithOtherStyles.addObject(instanceCorrelative);
            countercorrelative++;
          }
        }
      }
    }
  });
  Helpers.clog("Merging styles -- Found " + layersWithOtherStyles.length + " layers using the discarded styles");
  var foreignStyleReference, foreignStyle;

  if (currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library != null) {
    Helpers.clog("Merging styles -- Selected style is foreign");
    foreignStyleReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(currentSelectedStyles[styleToKeep].layerStyle, currentSelectedStyles[styleToKeep].library);
    foreignStyle = AppController.sharedInstance().librariesController().importShareableObjectReference_intoDocument(foreignStyleReference, context.document.documentData());
    Helpers.clog("Merging styles -- Added reference to foreign style");
  }

  layersWithOtherStyles.forEach(function (layer) {
    if (currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library != null) {
      Helpers.clog("Merging styles -- Assigning style (foreign) to layer '" + layer.name() + "'");
      layer.setSharedStyle(foreignStyle.localSharedStyle());
    } else {
      Helpers.clog("Merging styles -- Assigning style to layer '" + layer.name() + "'");
      layer.setSharedStyle(currentSelectedStyles[styleToKeep].layerStyle);
    }

    layersChangedCounter++;
  });
  Helpers.clog("Merging styles -- Updating layer overrides");
  overridesChangedCounter += UpdateLayerOverrides(currentSelectedStyles, styleToKeep, context, foreignStyle);
  Helpers.clog("Merging styles -- Updated layer overrides");
  currentSelectedStyles.forEach(function (style) {
    if (style.layerStyle != currentSelectedStyles[styleToKeep].layerStyle) {
      Helpers.clog("Merging styles -- Removing style '" + style.name + "'");

      if (style.foreign && style.library == null) {
        if (context.document.documentData().foreignLayerStyles().indexOf(style.originalStyle) > -1) {
          Helpers.clog("Merging styles -- Removing style from foreignLayerStyles");
          context.document.documentData().foreignLayerStyles().removeObject(style.originalStyle);
        }

        if (style.correlativeStyles != null) {
          for (var i = 0; i < style.correlativeStyles.length; i++) {
            if (context.document.documentData().foreignLayerStyles().indexOf(style.correlativeStyles[i]) > -1) {
              Helpers.clog("Merging styles -- Removing also style '" + style.correlativeStyles[i].localObject().name() + "' from foreignLayerStyles");
              context.document.documentData().foreignLayerStyles().removeObject(style.correlativeStyles[i]);
            }
          }
        }
      } else {
        Helpers.clog("Merging styles -- Removing shared style from layerStyles");
        context.document.documentData().layerStyles().removeSharedStyle(style.layerStyle);
      }
    }
  });
  Helpers.clog("Merging styles -- Completed");
  return [layersChangedCounter, overridesChangedCounter];
}

function UpdateLayerOverrides(currentSelectedStyles, styleToKeep, context, foreignStyle) {
  var overridesChangedCounter = 0;
  var allSymbolInstances = NSMutableArray.array();
  context.document.documentData().allSymbols().forEach(function (symbolMaster) {
    var instances = Helpers.getSymbolInstances(context, symbolMaster),
        instanceLoop = instances.objectEnumerator(),
        instance;

    while (instance = instanceLoop.nextObject()) {
      allSymbolInstances.addObject(instance);
    }
  });
  allSymbolInstances.forEach(function (symbolInstance) {
    var overridePointsToReplace = [];
    var overrides = symbolInstance.overrides();
    symbolInstance.availableOverrides().forEach(function (availableOverride) {
      var allOverridesThatWeShouldReplace = [];
      getAllLayerOverridesThatWeShouldReplace(availableOverride, currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, 0, context);

      for (var i = 0; i < allOverridesThatWeShouldReplace.length; i++) {
        if (currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library != null) {
          symbolInstance.setValue_forOverridePoint_(foreignStyle.localSharedStyle().objectID(), allOverridesThatWeShouldReplace[i].overridePoint());
        } else {
          symbolInstance.setValue_forOverridePoint_(currentSelectedStyles[styleToKeep].layerStyle.objectID(), allOverridesThatWeShouldReplace[i].overridePoint());
        }

        overridesChangedCounter++;
      }
    });
  });
  return overridesChangedCounter;
}

function getAllLayerOverridesThatWeShouldReplace(availableOverride, currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, level, context) {
  var verbose = false;
  if (verbose) console.log(symbolInstance.name() + "(" + level + ")" + ": ---   Name:" + availableOverride.overridePoint().layerName() + "    -    CV:" + availableOverride.currentValue() + "   -   DV:" + availableOverride.defaultValue());

  if (availableOverride.children() == null) {
    currentSelectedStyles.forEach(function (style) {
      if (style.layerStyle != currentSelectedStyles[styleToKeep].layerStyle) {
        if (Helpers.isString(availableOverride.currentValue())) {
          if (availableOverride.currentValue().toString().indexOf(style.layerStyle.objectID()) > -1 || style.originalStyle != null && availableOverride.currentValue().toString().indexOf(style.originalStyle.localShareID()) > -1 || style.originalStyle != null && availableOverride.currentValue().toString().indexOf(style.originalStyle.remoteShareID()) > -1) {
            if (verbose) console.log("Adding it");
            allOverridesThatWeShouldReplace.push(availableOverride);
          }

          if (style.correlativeStyles != null) {
            if (verbose) console.log("Checking overrides: " + style.name + " has " + style.correlativeStyles.length + " correlative styles.");

            for (var i = 0; i < style.correlativeStyles.length; i++) {
              if (availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].localObject().objectID()) > -1 || style.originalStyle != null && availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].localShareID()) > -1 || style.originalStyle != null && availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].remoteShareID()) > -1) {
                if (verbose) console.log("Adding it - correlative");
                allOverridesThatWeShouldReplace.push(availableOverride);
              }
            }
          }
        }
      }
    });
  } else {
    if (verbose) console.log("Digging deeper because it has " + availableOverride.children().length + " children");
    availableOverride.children().forEach(function (child) {
      getAllLayerOverridesThatWeShouldReplace(child, currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, level + 1, context);
    });
  }
}

function getDuplicateLayerStyles(context, allStyles) {
  var layerStylesNames = [];
  var layerDuplicatedStylesNames = [];

  for (var i = 0; i < allStyles.length; i++) {
    var style = allStyles[i];

    if (Helpers.getIndexOf(style.name, layerStylesNames) > -1) {
      if (Helpers.getIndexOf(style.name, layerDuplicatedStylesNames) < 0) {
        layerDuplicatedStylesNames.push(style.name);
      }
    }

    layerStylesNames.push(style.name);
  }

  return layerDuplicatedStylesNames;
}

function MergeSimilarLayerStyles(context) {
  Helpers.clog("----- Merge similar layer styles -----");
  var options = {
    identifier: webviewMSLSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  var webContents = browserWindow.webContents;
  var stylesWithSimilarStyles;
  Helpers.clog("Loading webview");
  browserWindow.loadURL(__webpack_require__(/*! ../resources/mergesimilarlayerstyles.html */ "./resources/mergesimilarlayerstyles.html"));
  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript("UpdateSettings(".concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewMSLSIdentifier);
  });
  webContents.on('ExecuteMerge', function (editedStylesWithSimilarStyles) {
    Helpers.clog("Execute merge");
    var duplicatesSolved = 0;
    var mergedStyles = 0;
    var affectedLayers = [0, 0];

    for (var i = 0; i < editedStylesWithSimilarStyles.length; i++) {
      if (!editedStylesWithSimilarStyles[i].isUnchecked && editedStylesWithSimilarStyles[i].selectedIndex >= 0) {
        currentSelectedStyles = [];

        for (var j = 0; j < editedStylesWithSimilarStyles[i].similarStyles.length; j++) {
          currentSelectedStyles.push(stylesWithSimilarStyles[i].similarStyles[j]);
          mergedStyles++;
        }

        var results = MergeLayerStyles(context, editedStylesWithSimilarStyles[i].selectedIndex);
        affectedLayers[0] += results[0];
        affectedLayers[1] += results[1];
        duplicatesSolved++;
      }
    }

    onShutdown(webviewMSLSIdentifier);

    if (duplicatesSolved <= 0) {
      Helpers.clog("No styles were merged");
      context.document.showMessage("No styles were merged");
    } else {
      Helpers.clog("Updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
      context.document.showMessage("Yo ho! We updated " + affectedLayers[0] + " layers and " + affectedLayers[1] + " overrides.");
    }
  });
  webContents.on('RecalculateStyles', function (includeAllLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowXYBlurSpread) {
    Helpers.clog("RecalculateStyles");
    stylesWithSimilarStyles = Helpers.FindAllSimilarLayerStyles(context, includeAllLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowXYBlurSpread);
    webContents.executeJavaScript("DrawResultsList(".concat(JSON.stringify(stylesWithSimilarStyles), ")")).catch(console.error);
  });
}
function MergeDuplicateLayerStyles(context) {
  Helpers.clog("----- Merge duplicate layer styles -----");
  var options = {
    identifier: webviewMDLSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  var webContents = browserWindow.webContents;
  var onlyDuplicatedLayerStyles;
  var mergeSession = [];
  CalculateDuplicates(Helpers.getLibrariesEnabled());

  if (onlyDuplicatedLayerStyles.length > 0) {
    browserWindow.loadURL(__webpack_require__(/*! ../resources/mergeduplicatelayerstyles.html */ "./resources/mergeduplicatelayerstyles.html"));
  } else {
    context.document.showMessage("Looks like there are no layer styles with the same name.");
    onShutdown(webviewMDLSIdentifier);
  }

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Finding duplicate layer styles. Including libraries:" + includeLibraries);
    onlyDuplicatedLayerStyles = Helpers.getDuplicateLayerStyles(context, includeLibraries);

    if (onlyDuplicatedLayerStyles.length > 0) {
      Helpers.GetSpecificLayerStyleData(context, onlyDuplicatedLayerStyles, 0);
      mergeSession = [];

      for (var i = 0; i < onlyDuplicatedLayerStyles.length; i++) {
        mergeSession.push({
          "layerStyleWithDuplicates": onlyDuplicatedLayerStyles[i],
          "selectedIndex": -1,
          "isUnchecked": false,
          "isProcessed": i == 0 ? true : false
        });
      }
    }
  }

  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript("DrawStylesList(".concat(JSON.stringify(mergeSession), ", ").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewMDLSIdentifier);
  });
  webContents.on('RecalculateDuplicates', function (includeLibraries) {
    Helpers.clog("Recalculating duplicates");
    CalculateDuplicates(includeLibraries);
    webContents.executeJavaScript("DrawStylesList(".concat(JSON.stringify(mergeSession), ")")).catch(console.error);
  });
  webContents.on('GetSelectedStyleData', function (index) {
    Helpers.GetSpecificLayerStyleData(context, onlyDuplicatedLayerStyles, index);
    webContents.executeJavaScript("ReDrawAfterGettingData(".concat(JSON.stringify(mergeSession[index].layerStyleWithDuplicates), ",").concat(index, ")")).catch(console.error);
  });
  webContents.on('ExecuteMerge', function (editedMergeSession) {
    Helpers.clog("Executing Merge");
    var duplicatesSolved = 0;
    var mergedStyles = 0;
    var affectedLayers = [0, 0];

    for (var i = 0; i < editedMergeSession.length; i++) {
      Helpers.clog("-- Merging " + mergeSession[i].layerStyleWithDuplicates.name);

      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        currentSelectedStyles = [];

        for (var j = 0; j < mergeSession[i].layerStyleWithDuplicates.duplicates.length; j++) {
          currentSelectedStyles.push(mergeSession[i].layerStyleWithDuplicates.duplicates[j]);
          mergedStyles++;
        }

        var results = MergeLayerStyles(context, editedMergeSession[i].selectedIndex);
        affectedLayers[0] += results[0];
        affectedLayers[1] += results[1];
        duplicatesSolved++;
      }
    }

    onShutdown(webviewMDLSIdentifier);

    if (duplicatesSolved <= 0) {
      Helpers.clog("No styles were merged");
      context.document.showMessage("No styles were merged");
    } else {
      Helpers.clog("Wpdated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
      context.document.showMessage("Yo ho! We updated " + affectedLayers[0] + " layers and " + affectedLayers[1] + " overrides.");
    }
  });
}
;
function MergeSelectedLayerStyles(context) {
  Helpers.clog("----- Merge selected text styles -----");
  var options = {
    identifier: webviewMLSFLIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  var webContents = browserWindow.webContents;
  var definedLayerStyles;
  var definedAllLayerStyles;
  var styleCounter = 0;

  if (!Helpers.getLibrariesEnabled()) {
    Helpers.clog("Get local styles list");
    definedLayerStyles = Helpers.getDefinedLayerStyles(context, false, null);
    styleCounter = definedLayerStyles.length;
    checkingAlsoLibraries = false;
  } else {
    Helpers.clog("Get all (including libraries) styles list");
    definedAllLayerStyles = Helpers.getDefinedLayerStyles(context, true, null);
    styleCounter = definedAllLayerStyles.length;
    checkingAlsoLibraries = true;
  }

  if (styleCounter > 1) {
    browserWindow.loadURL(__webpack_require__(/*! ../resources/mergelayerstylesfromlist.html */ "./resources/mergelayerstylesfromlist.html"));
  } else {
    if (styleCounter == 1) context.document.showMessage("There's only 1 layer style. No need to merge.");else context.document.showMessage("Looks like there are no layer styles.");
    onShutdown(webviewMLSFLIdentifier);
  }

  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    if (!Helpers.getLibrariesEnabled()) webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(definedLayerStyles), ",").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);else webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(definedAllLayerStyles), ",").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('GetLocalStylesList', function () {
    Helpers.clog("Get local styles list");
    if (definedLayerStyles == null) definedLayerStyles = Helpers.getDefinedLayerStyles(context, false, null);
    checkingAlsoLibraries = false;
    webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(definedLayerStyles), ")")).catch(console.error);
  });
  webContents.on('GetAllStylesList', function () {
    Helpers.clog("Get all (including libraries) styles list");
    if (definedAllLayerStyles == null) definedAllLayerStyles = Helpers.getDefinedLayerStyles(context, true, null);
    checkingAlsoLibraries = true;
    webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(definedAllLayerStyles), ")")).catch(console.error);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewMLSFLIdentifier);
  });
  webContents.on('ExecuteMerge', function (editedGlobalLayerStyles) {
    Helpers.clog("Executing Merge");
    currentSelectedStyles = [];
    var selectedIndex = -1;
    var counter = 0;

    if (!checkingAlsoLibraries) {
      for (var i = 0; i < definedLayerStyles.length; i++) {
        definedLayerStyles[i].isSelected = editedGlobalLayerStyles[i].isSelected;
        definedLayerStyles[i].isChosen = editedGlobalLayerStyles[i].isChosen;
        if (editedGlobalLayerStyles[i].isChosen) selectedIndex = counter;

        if (editedGlobalLayerStyles[i].isSelected) {
          currentSelectedStyles.push(definedLayerStyles[i]);
          counter++;
        }
      }
    } else {
      for (var i = 0; i < definedAllLayerStyles.length; i++) {
        definedAllLayerStyles[i].isSelected = editedGlobalLayerStyles[i].isSelected;
        definedAllLayerStyles[i].isChosen = editedGlobalLayerStyles[i].isChosen;
        if (editedGlobalLayerStyles[i].isChosen) selectedIndex = counter;

        if (editedGlobalLayerStyles[i].isSelected) {
          currentSelectedStyles.push(definedAllLayerStyles[i]);
          counter++;
        }
      }
    }

    var affectedLayers = MergeLayerStyles(context, selectedIndex);
    Helpers.clog("Updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
    context.document.showMessage("Yo ho! We updated " + affectedLayers[0] + " layers and " + affectedLayers[1] + " overrides.");
    onShutdown(webviewMLSFLIdentifier);
  });
}
;

/***/ }),

/***/ "./src/MergeTextStyles.js":
/*!********************************!*\
  !*** ./src/MergeTextStyles.js ***!
  \********************************/
/*! exports provided: MergeSimilarTextStyles, MergeDuplicateTextStyles, MergeSelectedTextStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSimilarTextStyles", function() { return MergeSimilarTextStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeDuplicateTextStyles", function() { return MergeDuplicateTextStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSelectedTextStyles", function() { return MergeSelectedTextStyles; });
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-module-web-view/remote */ "./node_modules/sketch-module-web-view/remote.js");
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__);



var Helpers = __webpack_require__(/*! ./Helpers */ "./src/Helpers.js");

var webviewMTSFLIdentifier = 'merge-textstylesfromlist.webview';
var webviewMDTSIdentifier = 'merge-duplicatetextstyles.webview';
var webviewMSTSIdentifier = 'merge-similartextstyles.webview';
var checkingAlsoLibraries = false;
var currentSelectedStyles = [];

function getTextPredicate(style) {
  var predicate;
  if (style.originalStyle != null) predicate = NSPredicate.predicateWithFormat("(sharedStyle.objectID == %@) OR (sharedStyle.objectID == %@)", style.originalStyle.localShareID(), style.originalStyle.remoteShareID());else predicate = NSPredicate.predicateWithFormat("sharedStyle.objectID == %@", style.textStyle.objectID());
  return predicate;
}

function MergeTextStyles(context, styleToKeep) {
  var layersChangedCounter = 0;
  var overridesChangedCounter = 0;
  Helpers.clog("Merging styles. Keep '" + currentSelectedStyles[styleToKeep].name + "'");
  var layers = Helpers.getAllTextLayers(context);
  var layersWithOtherStyles = NSMutableArray.array();
  currentSelectedStyles.forEach(function (style) {
    if (style.textStyle != currentSelectedStyles[styleToKeep].textStyle) {
      var predicate = getTextPredicate(style),
          layersWithSameStyle = layers.filteredArrayUsingPredicate(predicate),
          instanceLoop = layersWithSameStyle.objectEnumerator(),
          instance;

      while (instance = instanceLoop.nextObject()) {
        layersWithOtherStyles.addObject(instance);
      }

      if (style.correlativeStyles != null) {
        //console.log(style.name+" has "+style.correlativeStyles.length+" correlative styles.")
        var countercorrelative = 0;

        for (var i = 0; i < style.correlativeStyles.length; i++) {
          var predicateCorrelative = NSPredicate.predicateWithFormat("sharedStyle.objectID == %@", style.correlativeStyles[i].localObject().objectID()),
              layersWithSameStyleCorrelative = layers.filteredArrayUsingPredicate(predicateCorrelative),
              instanceLoopCorrelative = layersWithSameStyle.objectEnumerator(),
              instanceCorrelative;

          while (instanceCorrelative = instanceLoopCorrelative.nextObject()) {
            layersWithOtherStyles.addObject(instanceCorrelative);
            countercorrelative++;
          }
        } //console.log(countercorrelative+" layers had a correlative style applied");

      }
    }
  });
  var foreignStyleReference, foreignStyle;

  if (currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library != null) {
    foreignStyleReference = MSShareableObjectReference.referenceForShareableObject_inLibrary(currentSelectedStyles[styleToKeep].textStyle, currentSelectedStyles[styleToKeep].library);
    foreignStyle = AppController.sharedInstance().librariesController().importShareableObjectReference_intoDocument(foreignStyleReference, context.document.documentData());
  }

  layersWithOtherStyles.forEach(function (layer) {
    if (currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library != null) {
      layer.setSharedStyle(foreignStyle.localSharedStyle());
    } else {
      layer.setSharedStyle(currentSelectedStyles[styleToKeep].textStyle);
    }

    layersChangedCounter++;
  }); //overridesChangedCounter += LogTextOverrides(currentSelectedStyles, styleToKeep, context);

  overridesChangedCounter += UpdateTextOverrides(currentSelectedStyles, styleToKeep, context, foreignStyle);
  currentSelectedStyles.forEach(function (style) {
    if (style.textStyle != currentSelectedStyles[styleToKeep].textStyle) {
      if (style.foreign && style.library == null) {
        //console.log("You're trying to remove a library style");
        if (context.document.documentData().foreignTextStyles().indexOf(style.originalStyle) > -1) {
          context.document.documentData().foreignTextStyles().removeObject(style.originalStyle); //console.log("Removed style: "+style.name);
        }

        if (style.correlativeStyles != null) {
          for (var i = 0; i < style.correlativeStyles.length; i++) {
            if (context.document.documentData().foreignTextStyles().indexOf(style.correlativeStyles[i]) > -1) {
              context.document.documentData().foreignTextStyles().removeObject(style.correlativeStyles[i]); //console.log("Removed correlative");
            }
          }
        }
      } else {
        context.document.documentData().layerTextStyles().removeSharedStyle(style.textStyle); //console.log("Removed style: "+style.name);
      }
    }
  });
  return [layersChangedCounter, overridesChangedCounter];
}

function getAllTextOverridesThatWeShouldReplace(availableOverride, currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, level, context) {
  //console.log(symbolInstance.name()+"("+level+")"+": ---   Name:"+availableOverride.overridePoint().layerName()+"    -    CV:"+availableOverride.currentValue()+"   -   DV:"+availableOverride.defaultValue());
  if (availableOverride.children() == null) {
    currentSelectedStyles.forEach(function (style) {
      if (style.textStyle != currentSelectedStyles[styleToKeep].textStyle) {
        if (Helpers.isString(availableOverride.currentValue())) {
          if (availableOverride.currentValue().toString().indexOf(style.textStyle.objectID()) > -1 || style.originalStyle != null && availableOverride.currentValue().toString().indexOf(style.originalStyle.localShareID()) > -1 || style.originalStyle != null && availableOverride.currentValue().toString().indexOf(style.originalStyle.remoteShareID()) > -1) {
            //console.log("Adding it");
            allOverridesThatWeShouldReplace.push(availableOverride);
          }

          if (style.correlativeStyles != null) {
            //console.log("Checking overrides: "+style.name+" has "+style.correlativeStyles.length+" correlative styles.")
            for (var i = 0; i < style.correlativeStyles.length; i++) {
              if (availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].localObject().objectID()) > -1 || style.originalStyle != null && availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].localShareID()) > -1 || style.originalStyle != null && availableOverride.currentValue().toString().indexOf(style.correlativeStyles[i].remoteShareID()) > -1) {
                //console.log("Adding it - correlative");
                allOverridesThatWeShouldReplace.push(availableOverride);
              }
            }
          }
        }
      }
    });
  } else {
    //console.log("Digging deeper because it has "+availableOverride.children().length+" children");
    availableOverride.children().forEach(function (child) {
      getAllTextOverridesThatWeShouldReplace(child, currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, level + 1, context);
    });
  }
}

function UpdateTextOverrides(currentSelectedStyles, styleToKeep, context, foreignStyle) {
  var overridesChangedCounter = 0;
  var allSymbolInstances = NSMutableArray.array();
  context.document.documentData().allSymbols().forEach(function (symbolMaster) {
    var instances = Helpers.getSymbolInstances(context, symbolMaster),
        instanceLoop = instances.objectEnumerator(),
        instance;

    while (instance = instanceLoop.nextObject()) {
      allSymbolInstances.addObject(instance);
    }
  });
  allSymbolInstances.forEach(function (symbolInstance) {
    var overridePointsToReplace = [];
    var overrides = symbolInstance.overrides();
    symbolInstance.availableOverrides().forEach(function (availableOverride) {
      var allOverridesThatWeShouldReplace = [];
      getAllTextOverridesThatWeShouldReplace(availableOverride, currentSelectedStyles, styleToKeep, allOverridesThatWeShouldReplace, symbolInstance, 0, context); //console.log(allOverridesThatWeShouldReplace);

      for (var i = 0; i < allOverridesThatWeShouldReplace.length; i++) {
        if (currentSelectedStyles[styleToKeep].foreign && currentSelectedStyles[styleToKeep].library != null) {
          symbolInstance.setValue_forOverridePoint_(foreignStyle.localSharedStyle().objectID(), allOverridesThatWeShouldReplace[i].overridePoint());
        } else {
          symbolInstance.setValue_forOverridePoint_(currentSelectedStyles[styleToKeep].textStyle.objectID(), allOverridesThatWeShouldReplace[i].overridePoint());
        }

        overridesChangedCounter++;
      }
    });
  });
  return overridesChangedCounter;
}

function getDuplicateTextStyles(context, allStyles) {
  var textStylesNames = [];
  var layerDuplicatedStylesNames = [];

  for (var i = 0; i < allStyles.length; i++) {
    var style = allStyles[i];

    if (Helpers.getIndexOf(style.name, textStylesNames) > -1) {
      if (Helpers.getIndexOf(style.name, layerDuplicatedStylesNames) < 0) {
        layerDuplicatedStylesNames.push(style.name);
      }
    }

    textStylesNames.push(style.name);
  }

  return layerDuplicatedStylesNames;
}

function MergeSimilarTextStyles(context) {
  Helpers.clog("----- Merge similar text styles -----");
  var options = {
    identifier: webviewMSTSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  var webContents = browserWindow.webContents;
  var stylesWithSimilarStyles;
  Helpers.clog("Loading webview");
  browserWindow.loadURL(__webpack_require__(/*! ../resources/mergesimilartextstyles.html */ "./resources/mergesimilartextstyles.html"));
  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript("UpdateSettings(".concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewMSTSIdentifier);
  });
  webContents.on('ExecuteMerge', function (editedStylesWithSimilarStyles) {
    Helpers.clog("Execute merge");
    var duplicatesSolved = 0;
    var mergedStyles = 0;
    var affectedLayers = [0, 0];

    for (var i = 0; i < editedStylesWithSimilarStyles.length; i++) {
      if (!editedStylesWithSimilarStyles[i].isUnchecked && editedStylesWithSimilarStyles[i].selectedIndex >= 0) {
        currentSelectedStyles = [];

        for (var j = 0; j < editedStylesWithSimilarStyles[i].similarStyles.length; j++) {
          currentSelectedStyles.push(stylesWithSimilarStyles[i].similarStyles[j]);
          mergedStyles++;
        }

        var results = MergeTextStyles(context, editedStylesWithSimilarStyles[i].selectedIndex);
        affectedLayers[0] += results[0];
        affectedLayers[1] += results[1];
        duplicatesSolved++;
      }
    }

    onShutdown(webviewMSTSIdentifier);

    if (duplicatesSolved <= 0) {
      Helpers.clog("No styles were merged");
      context.document.showMessage("No styles were merged");
    } else {
      Helpers.clog("Updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
      context.document.showMessage("Yo ho! We updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
    }
  });
  webContents.on('RecalculateStyles', function (includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {
    Helpers.clog("RecalculateStyles");
    stylesWithSimilarStyles = Helpers.FindAllSimilarTextStyles(context, includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);
    webContents.executeJavaScript("DrawResultsList(".concat(JSON.stringify(stylesWithSimilarStyles), ")")).catch(console.error);
  });
}
function MergeDuplicateTextStyles(context) {
  Helpers.clog("----- Merge duplicate text styles -----");
  var options = {
    identifier: webviewMDTSIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  var webContents = browserWindow.webContents;
  var onlyDuplicatedTextStyles;
  var mergeSession = [];
  CalculateDuplicates(Helpers.getLibrariesEnabled());

  if (onlyDuplicatedTextStyles.length > 0) {
    browserWindow.loadURL(__webpack_require__(/*! ../resources/mergeduplicatetextstyles.html */ "./resources/mergeduplicatetextstyles.html"));
  } else {
    context.document.showMessage("Looks like there are no text styles with the same name.");
    onShutdown(webviewMDTSIdentifier);
  }

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Finding duplicate text styles. Including libraries:" + includeLibraries);
    onlyDuplicatedTextStyles = Helpers.getDuplicateTextStyles(context, includeLibraries);

    if (onlyDuplicatedTextStyles.length > 0) {
      Helpers.GetSpecificTextStyleData(context, onlyDuplicatedTextStyles, 0);
      mergeSession = [];

      for (var i = 0; i < onlyDuplicatedTextStyles.length; i++) {
        mergeSession.push({
          "textStyleWithDuplicates": onlyDuplicatedTextStyles[i],
          "selectedIndex": -1,
          "isUnchecked": false,
          "isProcessed": i == 0 ? true : false
        });
      }
    }
  }

  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript("DrawStylesList(".concat(JSON.stringify(mergeSession), ", ").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewMDTSIdentifier);
  });
  webContents.on('RecalculateDuplicates', function (includeLibraries) {
    Helpers.clog("Recalculating duplicates");
    CalculateDuplicates(includeLibraries);
    webContents.executeJavaScript("DrawStylesList(".concat(JSON.stringify(mergeSession), ")")).catch(console.error);
  });
  webContents.on('GetSelectedStyleData', function (index) {
    Helpers.GetSpecificTextStyleData(context, onlyDuplicatedTextStyles, index);
    webContents.executeJavaScript("ReDrawAfterGettingData(".concat(JSON.stringify(mergeSession[index].textStyleWithDuplicates), ",").concat(index, ")")).catch(console.error);
  });
  webContents.on('ExecuteMerge', function (editedMergeSession) {
    Helpers.clog("Executing Merge");
    var duplicatesSolved = 0;
    var mergedStyles = 0;
    var affectedLayers = [0, 0];

    for (var i = 0; i < editedMergeSession.length; i++) {
      Helpers.clog("-- Merging " + mergeSession[i].textStyleWithDuplicates.name);

      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        currentSelectedStyles = [];

        for (var j = 0; j < mergeSession[i].textStyleWithDuplicates.duplicates.length; j++) {
          currentSelectedStyles.push(mergeSession[i].textStyleWithDuplicates.duplicates[j]);
          mergedStyles++;
        }

        var results = MergeTextStyles(context, editedMergeSession[i].selectedIndex);
        affectedLayers[0] += results[0];
        affectedLayers[1] += results[1];
        duplicatesSolved++;
      }
    }

    onShutdown(webviewMDTSIdentifier);

    if (duplicatesSolved <= 0) {
      Helpers.clog("No styles were merged");
      context.document.showMessage("No styles were merged");
    } else {
      Helpers.clog("Wpdated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
      context.document.showMessage("Yo ho! We updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
    }
  });
}
;
function MergeSelectedTextStyles(context) {
  Helpers.clog("----- Merge selected text styles -----");
  var options = {
    identifier: webviewMTSFLIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  var webContents = browserWindow.webContents;
  var definedTextStyles;
  var definedAllTextStyles;
  var styleCounter = 0;

  if (!Helpers.getLibrariesEnabled()) {
    Helpers.clog("Get local styles list");
    definedTextStyles = Helpers.getDefinedTextStyles(context, false, null);
    styleCounter = definedTextStyles.length;
  }

  if (Helpers.getLibrariesEnabled()) {
    Helpers.clog("Get all (including libraries) styles list");
    definedAllTextStyles = Helpers.getDefinedTextStyles(context, true, null);
    styleCounter = definedAllTextStyles.length;
  }

  if (styleCounter > 1) {
    browserWindow.loadURL(__webpack_require__(/*! ../resources/mergetextstylesfromlist.html */ "./resources/mergetextstylesfromlist.html"));
  } else {
    if (styleCounter == 1) context.document.showMessage("There's only 1 text style. No need to merge.");else context.document.showMessage("Looks like there are no text styles.");
    onShutdown(webviewMTSFLIdentifier);
  }

  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    if (!Helpers.getLibrariesEnabled()) webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(definedTextStyles), ",").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);else webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(definedAllTextStyles), ",").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('GetLocalStylesList', function () {
    Helpers.clog("Get local styles list");
    if (definedTextStyles == null) definedTextStyles = Helpers.getDefinedTextStyles(context, false, null);
    checkingAlsoLibraries = false;
    webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(definedTextStyles), ")")).catch(console.error);
  });
  webContents.on('GetAllStylesList', function () {
    Helpers.clog("Get all (including libraries) styles list");
    if (definedAllTextStyles == null) definedAllTextStyles = Helpers.getDefinedTextStyles(context, true, null);
    checkingAlsoLibraries = true;
    webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(definedAllTextStyles), ")")).catch(console.error);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewMTSFLIdentifier);
  });
  webContents.on('ExecuteMerge', function (editedGlobalTextStyles) {
    Helpers.clog("Executing Merge");
    currentSelectedStyles = [];
    var selectedIndex = -1;
    var counter = 0;

    if (!checkingAlsoLibraries) {
      for (var i = 0; i < definedTextStyles.length; i++) {
        definedTextStyles[i].isSelected = editedGlobalTextStyles[i].isSelected;
        definedTextStyles[i].isChosen = editedGlobalTextStyles[i].isChosen;
        if (editedGlobalTextStyles[i].isChosen) selectedIndex = counter;

        if (editedGlobalTextStyles[i].isSelected) {
          currentSelectedStyles.push(definedTextStyles[i]);
          counter++;
        }
      }
    } else {
      for (var i = 0; i < definedAllTextStyles.length; i++) {
        definedAllTextStyles[i].isSelected = editedGlobalTextStyles[i].isSelected;
        definedAllTextStyles[i].isChosen = editedGlobalTextStyles[i].isChosen;
        if (editedGlobalTextStyles[i].isChosen) selectedIndex = counter;

        if (editedGlobalTextStyles[i].isSelected) {
          currentSelectedStyles.push(definedAllTextStyles[i]);
          counter++;
        }
      }
    }

    var affectedLayers = MergeTextStyles(context, selectedIndex);
    Helpers.clog("Updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
    context.document.showMessage("Yo ho! We updated " + affectedLayers[0] + " text layers and " + affectedLayers[1] + " overrides.");
    onShutdown(webviewMTSFLIdentifier);
  });
}
;

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['MergeDuplicateSymbols'] = __skpm_run.bind(this, 'MergeDuplicateSymbols');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown');
globalThis['onRun'] = __skpm_run.bind(this, 'default');
globalThis['MergeSelectedSymbols'] = __skpm_run.bind(this, 'MergeSelectedSymbols');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown');
globalThis['MergeSelectedTextStyles'] = __skpm_run.bind(this, 'MergeSelectedTextStyles');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown');
globalThis['MergeSimilarTextStyles'] = __skpm_run.bind(this, 'MergeSimilarTextStyles');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown');
globalThis['MergeSimilarLayerStyles'] = __skpm_run.bind(this, 'MergeSimilarLayerStyles');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown');
globalThis['MergeSelectedLayerStyles'] = __skpm_run.bind(this, 'MergeSelectedLayerStyles');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown');
globalThis['MergeDuplicateLayerStyles'] = __skpm_run.bind(this, 'MergeDuplicateLayerStyles');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown');
globalThis['MergeDuplicateTextStyles'] = __skpm_run.bind(this, 'MergeDuplicateTextStyles');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown');
globalThis['EditSettings'] = __skpm_run.bind(this, 'EditSettings');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown')

//# sourceMappingURL=Main.js.map