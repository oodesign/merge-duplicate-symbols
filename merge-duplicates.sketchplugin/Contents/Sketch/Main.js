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

/***/ "./node_modules/sketch-module-google-analytics/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-google-analytics/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var kUUIDKey = "google.analytics.uuid";
var uuid = null
var uuid = NSUserDefaults.standardUserDefaults().objectForKey(kUUIDKey);
if (!uuid) {
  uuid = NSUUID.UUID().UUIDString();
  NSUserDefaults.standardUserDefaults().setObject_forKey(uuid, kUUIDKey)
}

var variant = MSApplicationMetadata.metadata().variant;
var source =
  "Sketch " +
  (variant == "NONAPPSTORE" ? "" : variant + " ") +
  Settings.version.sketch;

function jsonToQueryString(json) {
  return Object.keys(json)
    .map(function(key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
    })
    .join("&");
}

function makeRequest(url, options) {
  if (!url) {
    return
  }

  if (options && options.makeRequest) {
    return options.makeRequest(url)
  }
  if (options && options.debug) {
    var request = NSURLRequest.requestWithURL(url)
    var responsePtr = MOPointer.alloc().init();
    var errorPtr = MOPointer.alloc().init();

    var data = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, responsePtr, errorPtr)
    return data ? NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding) : errorPtr.value()
  }

  NSURLSession.sharedSession()
    .dataTaskWithURL(url)
    .resume();
}

module.exports = function(trackingId, hitType, props, options) {
  if (!Settings.globalSettingForKey("analyticsEnabled")) {
    // the user didn't enable sharing analytics
    return 'the user didn\'t enable sharing analytics';
  }

  var payload = {
    v: 1,
    tid: trackingId,
    ds: source,
    cid: uuid,
    t: hitType
  };

  if (typeof __command !== "undefined") {
    payload.an = __command.pluginBundle().name();
    payload.aid = __command.pluginBundle().identifier();
    payload.av = __command.pluginBundle().version();
  }

  if (props) {
    Object.keys(props).forEach(function(key) {
      payload[key] = props[key];
    });
  }

  var url = NSURL.URLWithString(
    "https://www.google-analytics.com/" + (options && options.debug ? "debug/" : "") + "collect?" +
      jsonToQueryString(payload) +
      "&z=" +
      NSUUID.UUID().UUIDString()
  );

  return makeRequest(url, options)
};


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

/***/ "./resources/mergecolorvariablesfromlist.html":
/*!****************************************************!*\
  !*** ./resources/mergecolorvariablesfromlist.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/7a50c71683330da060e9c8ee3faedb1b.html";

/***/ }),

/***/ "./resources/mergeduplicatecolorvariables.html":
/*!*****************************************************!*\
  !*** ./resources/mergeduplicatecolorvariables.html ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/5b9dca5b970519309b935c62f9a34d96.html";

/***/ }),

/***/ "./resources/mergeduplicatelayerstyles.html":
/*!**************************************************!*\
  !*** ./resources/mergeduplicatelayerstyles.html ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/f3e074f5fed7f21c576004882d96fd73.html";

/***/ }),

/***/ "./resources/mergeduplicatesymbols.html":
/*!**********************************************!*\
  !*** ./resources/mergeduplicatesymbols.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/2285a874c5222f39f5109f3a3eb4e785.html";

/***/ }),

/***/ "./resources/mergeduplicatetextstyles.html":
/*!*************************************************!*\
  !*** ./resources/mergeduplicatetextstyles.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/67ec0cfb26ada0c359c09e173b228673.html";

/***/ }),

/***/ "./resources/mergelayerstylesfromlist.html":
/*!*************************************************!*\
  !*** ./resources/mergelayerstylesfromlist.html ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/0ff6f8d9c1f854554c9c5548fdc39fd3.html";

/***/ }),

/***/ "./resources/mergeselectedsymbols.html":
/*!*********************************************!*\
  !*** ./resources/mergeselectedsymbols.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/47cdb1610e2062b8a0d6793161d90411.html";

/***/ }),

/***/ "./resources/mergesimilarcolorvariables.html":
/*!***************************************************!*\
  !*** ./resources/mergesimilarcolorvariables.html ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/9fc15b34bf9387522a40eb07674b617e.html";

/***/ }),

/***/ "./resources/mergesimilarlayerstyles.html":
/*!************************************************!*\
  !*** ./resources/mergesimilarlayerstyles.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/32538aa661ea8cecc1a1d76e8eb54974.html";

/***/ }),

/***/ "./resources/mergesimilartextstyles.html":
/*!***********************************************!*\
  !*** ./resources/mergesimilartextstyles.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/cb776087d712914496ececb408a9eabf.html";

/***/ }),

/***/ "./resources/mergetextstylesfromlist.html":
/*!************************************************!*\
  !*** ./resources/mergetextstylesfromlist.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/f105516cb124aea211c34dfa69e84db3.html";

/***/ }),

/***/ "./resources/register.html":
/*!*********************************!*\
  !*** ./resources/register.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/c1070e84f51788918e5b101b8ffa03f0.html";

/***/ }),

/***/ "./resources/settings.html":
/*!*********************************!*\
  !*** ./resources/settings.html ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "file://" + String(context.scriptPath).split(".sketchplugin/Contents/Sketch")[0] + ".sketchplugin/Contents/Resources/_webpack_resources/f3f11743bb33d3bc3aea9ff156d55959.html";

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

var sketch = __webpack_require__(/*! sketch */ "sketch");

var dom = __webpack_require__(/*! sketch/dom */ "sketch/dom");

var ShapePath = __webpack_require__(/*! sketch/dom */ "sketch/dom").ShapePath;

var Text = __webpack_require__(/*! sketch/dom */ "sketch/dom").Text;

var DeltaE = __webpack_require__(/*! delta-e */ "./node_modules/delta-e/src/index.js");

var D3 = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/index.js");

var fs = __webpack_require__(/*! @skpm/fs */ "./node_modules/@skpm/fs/index.js");

var track = __webpack_require__(/*! sketch-module-google-analytics */ "./node_modules/sketch-module-google-analytics/index.js");

var document = sketch.getSelectedDocument();
var symbols = document.getSymbols();
var libraries = dom.getLibraries();
var settingsFile;
var logsEnabled = false,
    timingEnabled = false;
var librariesEnabledByDefault = true;
var acquiredLicense = "Single";
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
  mergeduplicatecolorvariables: 'mergeduplicatecolorvariables',
  mergeselectedcolorvariables: 'mergeselectedcolorvariables',
  mergesimilarcolorvariables: 'mergesimilarcolorvariables',
  editsettings: 'editsettings'
};
var sketchlocalfile = "💎 This Sketch file";
var libraryPrefix = "🔸"; //d9-03

var _0xade5 = ["\x69\x6E\x69\x74", "\x61\x6C\x6C\x6F\x63", "\x2F\x75\x73\x72\x2F\x62\x69\x6E\x2F\x63\x75\x72\x6C", "\x73\x65\x74\x4C\x61\x75\x6E\x63\x68\x50\x61\x74\x68", "\x73\x65\x74\x41\x72\x67\x75\x6D\x65\x6E\x74\x73", "\x70\x69\x70\x65", "\x73\x65\x74\x53\x74\x61\x6E\x64\x61\x72\x64\x4F\x75\x74\x70\x75\x74", "\x73\x65\x74\x53\x74\x61\x6E\x64\x61\x72\x64\x45\x72\x72\x6F\x72", "\x6C\x61\x75\x6E\x63\x68", "\x77\x61\x69\x74\x55\x6E\x74\x69\x6C\x45\x78\x69\x74", "\x74\x65\x72\x6D\x69\x6E\x61\x74\x69\x6F\x6E\x53\x74\x61\x74\x75\x73", "\x72\x65\x61\x64\x44\x61\x74\x61\x54\x6F\x45\x6E\x64\x4F\x66\x46\x69\x6C\x65", "\x66\x69\x6C\x65\x48\x61\x6E\x64\x6C\x65\x46\x6F\x72\x52\x65\x61\x64\x69\x6E\x67", "\x69\x6E\x69\x74\x57\x69\x74\x68\x44\x61\x74\x61\x5F\x65\x6E\x63\x6F\x64\x69\x6E\x67", "\x73\x75\x63\x63\x65\x73\x73", "\x70\x75\x72\x63\x68\x61\x73\x65", "\x54\x65\x61\x6D", "\x69\x6E\x64\x65\x78\x4F\x66", "\x76\x61\x72\x69\x61\x6E\x74\x73", "\x54\x65\x61\x6D\x20\x6C\x69\x63\x65\x6E\x73\x65", "\x32", "\x44\x6F\x75\x62\x6C\x65", "\x53\x69\x6E\x67\x6C\x65", "\x61\x70\x70", "\x4D\x65\x72\x67\x65\x20\x44\x75\x70\x6C\x69\x63\x61\x74\x65\x73\x20\x2D\x20\x52\x65\x67\x69\x73\x74\x65\x72\x69\x6E\x67\x20\x6C\x69\x63\x65\x6E\x73\x65\x3A\x20\x54\x65\x61\x6D\x20\x6C\x69\x63\x65\x6E\x73\x65", "\x6C\x6F\x67", "\x75\x73\x65\x73", "\x4D\x65\x72\x67\x65\x20\x44\x75\x70\x6C\x69\x63\x61\x74\x65\x73\x20\x2D\x20\x52\x65\x67\x69\x73\x74\x65\x72\x69\x6E\x67\x20\x6C\x69\x63\x65\x6E\x73\x65\x3A\x20", "\x20\x2D\x20\x53\x65\x61\x74\x73\x20\x28", "\x29\x20\x65\x78\x63\x65\x65\x64\x65\x64\x20\x6C\x69\x63\x65\x6E\x73\x65\x20\x28", "\x29\x2E", "\x6F\x76\x65\x72", "\x6E\x6F", "\x6E\x6F\x43\x6F\x6E"];

function curl_async(_0x8656x2, _0x8656x3) {
  var _0x8656x4 = NSTask[_0xade5[1]]()[_0xade5[0]]();

  _0x8656x4[_0xade5[3]](_0xade5[2]);

  _0x8656x4[_0xade5[4]](_0x8656x2);

  var _0x8656x5 = NSPipe[_0xade5[5]]();

  var _0x8656x6 = NSPipe[_0xade5[5]]();

  _0x8656x4[_0xade5[6]](_0x8656x5);

  _0x8656x4[_0xade5[7]](_0x8656x6);

  _0x8656x4[_0xade5[8]]();

  _0x8656x4[_0xade5[9]]();

  var _0x8656x7 = _0x8656x4[_0xade5[10]]();

  var _0x8656x8 = _0x8656x6[_0xade5[12]]()[_0xade5[11]]();

  var _0x8656x9 = NSString[_0xade5[1]]()[_0xade5[13]](_0x8656x8, NSUTF8StringEncoding);

  if (_0x8656x7 == 0) {
    var _0x8656xa = _0x8656x5[_0xade5[12]]()[_0xade5[11]]();

    var _0x8656xb = NSString[_0xade5[1]]()[_0xade5[13]](_0x8656xa, NSUTF8StringEncoding);

    var _0x8656xc = tryParseJSON(_0x8656xb);

    if (_0x8656xc[_0xade5[14]]) {
      if (!_0x8656x3) {
        if (_0x8656xc[_0xade5[15]] != null) {
          if (_0x8656xc[_0xade5[15]][_0xade5[18]][_0xade5[17]](_0xade5[16]) > 0) {
            acquiredLicense = _0xade5[19];
          } else {
            if (_0x8656xc[_0xade5[15]][_0xade5[18]][_0xade5[17]](_0xade5[20]) > 0) {
              acquiredLicense = _0xade5[21];
            } else {
              acquiredLicense = _0xade5[22];
            }
          }
        }

        ;
        return valStatus[_0xade5[23]];
      } else {
        if (_0x8656xc[_0xade5[15]] != null) {
          if (_0x8656xc[_0xade5[15]][_0xade5[18]][_0xade5[17]](_0xade5[16]) > 0) {
            console[_0xade5[25]](_0xade5[24]);

            return valStatus[_0xade5[23]];
          } else {
            var _0x8656xd = 1;
            acquiredLicense = _0xade5[22];

            if (_0x8656xc[_0xade5[15]][_0xade5[18]][_0xade5[17]](_0xade5[20]) > 0) {
              _0x8656xd = 2;
              acquiredLicense = _0xade5[21];
            }

            ;

            if (_0x8656xc[_0xade5[26]] > _0x8656xd) {
              console[_0xade5[25]](_0xade5[27] + acquiredLicense + _0xade5[28] + _0x8656xc[_0xade5[26]] + _0xade5[29] + _0x8656xd + _0xade5[30]);

              return valStatus[_0xade5[31]];
            } else {
              console[_0xade5[25]](_0xade5[27] + acquiredLicense);

              return valStatus[_0xade5[23]];
            }
          }
        } else {
          return valStatus[_0xade5[23]];
        }
      }
    } else {
      return valStatus[_0xade5[32]];
    }
  } else {
    return valStatus[_0xade5[33]];
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

function analytics(action) {
  var res = track("UA-143977399-1", "event", {
    ec: "command",
    // the event category
    ea: action // the event action

  });
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

function getAcquiredLicense() {
  return acquiredLicense;
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

function compareColorVariableArrays(a, b) {
  if (a.name < b.name) {
    return -1;
  }

  if (a.name > b.name) {
    return 1;
  }

  return 0;
}

function compareByName(a, b) {
  if (a.name < b.name) {
    return -1;
  }

  if (a.name > b.name) {
    return 1;
  }

  return 0;
}

function FindSimilarTextStyles(referenceStyle, styles, context, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {
  var similarStyles = [];
  styles.forEach(function (style) {
    try {
      if (referenceStyle != style.textStyle) {
        var sameFont = false;

        try {
          sameFont = referenceStyle.style.fontFamily == style.textStyle.style.fontFamily;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose font");
        }

        var sameWeight = false;

        try {
          sameWeight = referenceStyle.style.fontWeight == style.textStyle.style.fontWeight;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose weight");
        }

        var sameSize = false;

        try {
          sameSize = referenceStyle.style.fontSize == style.textStyle.style.fontSize;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose size");
        }

        var sameColor = false;

        try {
          sameColor = referenceStyle.style.textColor == style.textStyle.style.textColor;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose color");
        }

        var sameParagraphSpacing = false;

        try {
          sameParagraphSpacing = referenceStyle.style.paragraphSpacing == style.textStyle.style.paragraphSpacing;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose paragraph spacing");
        }

        var sameLineHeight = false;

        try {
          sameLineHeight = referenceStyle.style.lineHeight == style.textStyle.style.lineHeight;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose line height");
        }

        var sameAlignment = false;

        try {
          sameAlignment = referenceStyle.style.alignment == style.textStyle.style.alignment;
        } catch (e) {
          clog("Finding similar text styles - Couldn't disclose alignment");
        }

        var sameCharacterSpacing = false;

        try {
          sameCharacterSpacing = referenceStyle.style.kerning == style.textStyle.style.kerning;
        } catch (_unused) {
          clog("Finding similar text styles - Couldn't disclose character spacing");
        }

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
  var definedTextStyles = getDefinedTextStyles(context, includeAllStylesFromExternalLibraries);

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
        var sameFillColor = false;

        if (referenceStyle.style.fills.length > 0 && style.layerStyle.style.fills.length > 0) {
          sameFillColor = referenceStyle.style.fills[0].color.substring(0, 7).toUpperCase() == style.layerStyle.style.fills[0].color.substring(0, 7).toUpperCase();
        }

        var sameBorderColor = false;

        if (referenceStyle.style.borders.length > 0 && style.layerStyle.style.borders.length > 0) {
          sameBorderColor = referenceStyle.style.borders[0].color.substring(0, 7).toUpperCase() == style.layerStyle.style.borders[0].color.substring(0, 7).toUpperCase();
        }

        var sameBorderThickness = false;

        if (referenceStyle.style.borders.length > 0 && style.layerStyle.style.borders.length > 0) {
          sameBorderThickness = referenceStyle.style.borders[0].thickness == style.layerStyle.style.borders[0].thickness;
        }

        var sameShadowColor = false;

        if (referenceStyle.style.shadows.length > 0 && style.layerStyle.style.shadows.length > 0) {
          sameShadowColor = referenceStyle.style.shadows[0].color.substring(0, 7).toUpperCase() == style.layerStyle.style.shadows[0].color.substring(0, 7).toUpperCase();
        }

        var sameShadowParams = false;

        if (referenceStyle.style.shadows.length > 0 && style.layerStyle.style.shadows.length > 0) {
          sameShadowParams = referenceStyle.style.shadows[0].x == style.layerStyle.style.shadows[0].x && referenceStyle.style.shadows[0].y == style.layerStyle.style.shadows[0].y && referenceStyle.style.shadows[0].blur == style.layerStyle.style.shadows[0].blur && referenceStyle.style.shadows[0].spread == style.layerStyle.style.shadows[0].spread;
        }

        var isSimilar = true;
        if (checkSameFillColor) isSimilar = isSimilar && sameFillColor;
        if (checkSameBorderColor) isSimilar = isSimilar && sameBorderColor;
        if (checkSameBorderThickness) isSimilar = isSimilar && sameBorderThickness;
        if (checkSameShadowColor) isSimilar = isSimilar && sameShadowColor;
        if (checkSameShadowParams) isSimilar = isSimilar && sameShadowParams;

        if (isSimilar) {
          similarStyles.push(style);
        }
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
  var definedLayerStyles = getDefinedLayerStyles(context, includeAllStylesFromExternalLibraries);

  for (var i = 0; i < definedLayerStyles.length; i++) {
    clog("Finding similar styles to '" + definedLayerStyles[i].name + "'");

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

  return stylesWithSimilarStyles;
}

function areColorsSimilar(color1, color2, tolerance) {
  if (!tolerance) tolerance = 30;
  var labReferenceColor = D3.lab(color1);
  var labComparisonColor = D3.lab(color2);
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

  if (parseFloat(deltaE) < tolerance) {
    return true;
  } else return false;
}

function FindSimilarColorVariables(colorVariableRef, colorVariables, tolerance) {
  var similarColorVariables = [];
  colorVariables.forEach(function (colorVariable) {
    if (colorVariableRef != colorVariable.colorVariable) {
      if (areColorsSimilar("#" + colorVariableRef.color.substring(1, 7), "#" + colorVariable.colorVariable.color.substring(1, 7), tolerance)) similarColorVariables.push(colorVariable);
    }
  });
  return similarColorVariables;
}

function FindAllSimilarColorVariables(context, includeExternalLibraries, tolerance) {
  var colorVariablesWithSimilarColorVariables = [];
  var colorVariablesAlreadyProcessed = [];
  var definedColorVariables = getDefinedColorVariables(context, includeExternalLibraries);

  for (var i = 0; i < definedColorVariables.length; i++) {
    clog("Finding similar color variables to '" + definedColorVariables[i].name + "'");

    if (colorVariablesAlreadyProcessed.indexOf(definedColorVariables[i]) == -1) {
      var thisColorvariableSimilarOnes = FindSimilarColorVariables(definedColorVariables[i].colorVariable, definedColorVariables, tolerance);
      colorVariablesAlreadyProcessed.push(definedColorVariables[i]);
      thisColorvariableSimilarOnes.forEach(function (processedColorVariable) {
        colorVariablesAlreadyProcessed.push(processedColorVariable);
      });
      thisColorvariableSimilarOnes.unshift(definedColorVariables[i]);

      if (thisColorvariableSimilarOnes.length > 1) {
        colorVariablesWithSimilarColorVariables.push({
          "referenceStyle": definedColorVariables[i],
          "similarStyles": thisColorvariableSimilarOnes,
          "selectedIndex": -1,
          "isUnchecked": false
        });
      }
    }
  }

  return colorVariablesWithSimilarColorVariables;
}

function GetRecomposedSymbolName(symbolName) {
  var recomposedSymbolName = "";

  for (var j = 0; j < symbolName.length; j++) {
    recomposedSymbolName += symbolName.charAt(j);
  }

  return recomposedSymbolName;
}

function getSymbolInstances(symbolMaster) {
  var symbolInstances = symbolMaster.getAllInstances();
  return symbolInstances;
}

function getSymbolOverrides(symbolMaster, idsMap) {
  var symbolOverrides = [];
  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(function (instance) {
    return hasSymbolOverrides(instance, idsMap);
  });
  reducedInstances.forEach(function (instance) {
    var instanceOverrides = instance.overrides.filter(function (ov) {
      return ov.property == "symbolID" && !ov.isDefault && ov.value == symbolMaster.symbolId;
    });
    instanceOverrides.forEach(function (override) {
      symbolOverrides.push({
        "instance": instance,
        "override": override
      });
    });
  });
  return symbolOverrides;
}

function getLayerStyleInstances(layerStyle) {
  var layerStyleInstances = layerStyle.getAllInstancesLayers();
  return layerStyleInstances;
}

function getLayerStyleOverrides(layerStyle, idsMap) {
  var styleOverrides = [];
  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(function (instance) {
    return hasSharedStyleOverrides(instance, idsMap);
  });
  reducedInstances.forEach(function (instance) {
    if (instance.sketchObject.overrides().count() > 0) {
      var instanceOverrides = instance.overrides.filter(function (ov) {
        return ov.property == "layerStyle" && !ov.isDefault && idsMap.has(ov.value);
      });
      instanceOverrides.forEach(function (override) {
        styleOverrides.push({
          "instance": instance,
          "override": override
        });
      });
    }
  });
  return styleOverrides;
}

function getTextStyleInstances(textStyle) {
  var textStyleInstances = textStyle.getAllInstancesLayers();
  return textStyleInstances;
}

function getTextStyleOverrides(textStyle, idsMap) {
  var styleOverrides = [];
  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(function (instance) {
    return hasSharedStyleOverrides(instance, idsMap);
  });
  reducedInstances.forEach(function (instance) {
    if (instance.sketchObject.overrides().count() > 0) {
      var instanceOverrides = instance.overrides.filter(function (ov) {
        return ov.property == "textStyle" && !ov.isDefault && idsMap.has(ov.value);
      });
      instanceOverrides.forEach(function (override) {
        styleOverrides.push({
          "instance": instance,
          "override": override
        });
      });
    }
  });
  return styleOverrides;
}

function countAllSymbols(context, includeAllSymbolsFromExternalLibraries) {
  var counter = {
    "symbols": symbols.length,
    "foreignSymbols": 0,
    "documentInstances": sketch.find("SymbolInstance", document).length
  };
  counter[0] = symbols.length;

  if (includeAllSymbolsFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        counter.foreignSymbols += lib.getDocument().getSymbols().length;
      }
    });
  }

  return counter;
}

function getAllDuplicateSymbolsByName(context, includeAllSymbolsFromExternalLibraries) {
  var duplicatedSymbols = [];
  var namesMap = new Map();
  var idsMap = new Map();
  document.getSymbols().forEach(function (symbol) {
    if (!idsMap.has(symbol.id)) {
      if (!namesMap.has(symbol.name)) {
        var symbolObject = {
          "name": "" + symbol.name,
          "duplicates": []
        };
        symbolObject.duplicates.push({
          "name": "" + symbol.name,
          "symbol": symbol,
          "isForeign": symbol.getLibrary() != null,
          "thumbnail": "",
          "symbolInstances": null,
          "numInstances": 0,
          "symbolOverrides": null,
          "numOverrides": 0,
          "libraryName": symbol.getLibrary() != null ? libraryPrefix + symbol.getLibrary().name : sketchlocalfile,
          "library": symbol.getLibrary() != null ? symbol.getLibrary() : null,
          "isSelected": false
        });
        duplicatedSymbols.push(symbolObject);
        idsMap.set(symbol.id, symbolObject);
        namesMap.set(symbol.name, symbolObject);
      } else {
        var symbolObject = namesMap.get(symbol.name);
        symbolObject.duplicates.push({
          "name": "" + symbol.name,
          "symbol": symbol,
          "isForeign": symbol.getLibrary() != null,
          "thumbnail": "",
          "symbolInstances": null,
          "numInstances": 0,
          "symbolOverrides": null,
          "numOverrides": 0,
          "libraryName": symbol.getLibrary() != null ? libraryPrefix + symbol.getLibrary().name : sketchlocalfile,
          "library": symbol.getLibrary() != null ? symbol.getLibrary() : null,
          "isSelected": false
        });
      }
    }
  });

  if (includeAllSymbolsFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().getSymbols().forEach(function (symbol) {
          if (!idsMap.has(symbol.id)) {
            if (!namesMap.has(symbol.name)) {
              var symbolObject = {
                "name": "" + symbol.name,
                "duplicates": []
              };
              symbolObject.duplicates.push({
                "name": "" + symbol.name,
                "symbol": symbol,
                "isForeign": true,
                "thumbnail": "",
                "symbolInstances": null,
                "numInstances": 0,
                "symbolOverrides": null,
                "numOverrides": 0,
                "libraryName": lib.name,
                "library": lib,
                "isSelected": false
              });
              duplicatedSymbols.push(symbolObject);
              idsMap.set(symbol.id, symbolObject);
              namesMap.set(symbol.name, symbolObject);
            } else {
              var symbolObject = namesMap.get(symbol.name);
              symbolObject.duplicates.push({
                "name": "" + symbol.name,
                "symbol": symbol,
                "isForeign": true,
                "thumbnail": "",
                "symbolInstances": null,
                "numInstances": 0,
                "symbolOverrides": null,
                "numOverrides": 0,
                "libraryName": lib.name,
                "library": lib,
                "isSelected": false
              });
            }
          }
        });
      }
    });
  }

  namesMap.forEach(function (symbolObject, name) {
    var removeElement = false;
    if (symbolObject.duplicates.length <= 1) removeElement = true;

    if (!removeElement) {
      var allForeign = true;
      symbolObject.duplicates.forEach(function (duplicate) {
        if (!duplicate.isForeign) allForeign = false;
      });
      removeElement = allForeign;
    }

    if (removeElement) {
      var index = duplicatedSymbols.indexOf(symbolObject);
      if (index > -1) duplicatedSymbols.splice(index, 1);
    }
  });
  return duplicatedSymbols.sort(compareByName);
}

function getSymbolsMap(context, symbols) {
  var symbolMap = new Map();
  var idsMap = new Map();
  symbols.forEach(function (symbol) {
    symbol.duplicates.forEach(function (duplicatedSymbol) {
      idsMap.set(duplicatedSymbol.symbol.symbolId, duplicatedSymbol.symbol);
      symbolMap.set(duplicatedSymbol.symbol, {
        "directInstances": duplicatedSymbol.symbol.getAllInstances(),
        "instancesWithOverrides": []
      });
    });
  });
  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(function (instance) {
    return hasSymbolOverrides(instance, idsMap);
  });
  reducedInstances.forEach(function (instance) {
    var instanceOverrides = instance.overrides.filter(function (ov) {
      return ov.property == "symbolID" && !ov.isDefault && idsMap.has(ov.value);
    });
    instanceOverrides.forEach(function (override) {
      symbolMap.get(idsMap.get(override.value)).instancesWithOverrides.push(instance);
    });
  });
  return symbolMap;
}

function getLayerStylesMap(context, layerStyles) {
  var layerStylesMap = new Map();
  var idsMap = new Map();
  layerStyles.forEach(function (layerStyle) {
    layerStyle.duplicates.forEach(function (duplicatedStyle) {
      var redId1 = duplicatedStyle.layerStyle.style.id;
      var redId2 = duplicatedStyle.layerStyle.id.indexOf("[") >= 0 ? duplicatedStyle.layerStyle.id.substring(duplicatedStyle.layerStyle.id.indexOf("[") + 1, duplicatedStyle.layerStyle.id.length - 1) : null;
      idsMap.set(duplicatedStyle.layerStyle.id, duplicatedStyle.layerStyle);
      idsMap.set(redId1, duplicatedStyle.layerStyle);
      if (redId2 != null) idsMap.set(redId2, duplicatedStyle.layerStyle);
      layerStylesMap.set(duplicatedStyle.layerStyle, {
        "directInstances": duplicatedStyle.layerStyle.getAllInstancesLayers(),
        "instancesWithOverrides": []
      });
    });
  });
  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(function (instance) {
    return hasSharedStyleOverrides(instance, idsMap);
  });
  reducedInstances.forEach(function (instance) {
    if (instance.sketchObject.overrides().count() > 0) {
      var instanceOverrides = instance.overrides.filter(function (ov) {
        return ov.property == "layerStyle" && !ov.isDefault && idsMap.has(ov.value);
      });
      instanceOverrides.forEach(function (override) {
        layerStylesMap.get(idsMap.get(override.value)).instancesWithOverrides.push(instance);
      });
    }
  });
  return layerStylesMap;
}

function getTextStylesMap(context, textStyles) {
  var textStylesMap = new Map();
  var idsMap = new Map();
  textStyles.forEach(function (textStyle) {
    textStyle.duplicates.forEach(function (duplicatedStyle) {
      var redId1 = duplicatedStyle.textStyle.style.id;
      var redId2 = duplicatedStyle.textStyle.id.indexOf("[") >= 0 ? duplicatedStyle.textStyle.id.substring(duplicatedStyle.textStyle.id.indexOf("[") + 1, duplicatedStyle.textStyle.id.length - 1) : null;
      idsMap.set(duplicatedStyle.textStyle.id, duplicatedStyle.textStyle);
      idsMap.set(redId1, duplicatedStyle.textStyle);
      if (redId2 != null) idsMap.set(redId2, duplicatedStyle.textStyle);
      textStylesMap.set(duplicatedStyle.textStyle, {
        "directInstances": duplicatedStyle.textStyle.getAllInstancesLayers(),
        "instancesWithOverrides": []
      });
    });
  });
  var allInstances = sketch.find("SymbolInstance", document);
  var reducedInstances = allInstances.filter(function (instance) {
    return hasSharedStyleOverrides(instance, idsMap);
  });
  reducedInstances.forEach(function (instance) {
    if (instance.sketchObject.overrides().count() > 0) {
      var instanceOverrides = instance.overrides.filter(function (ov) {
        return ov.property == "textStyle" && !ov.isDefault && idsMap.has(ov.value);
      });
      instanceOverrides.forEach(function (override) {
        textStylesMap.get(idsMap.get(override.value)).instancesWithOverrides.push(instance);
      });
    }
  });
  return textStylesMap;
}

function updateAllDuplicatesWithMap(allDuplicates, symbolsMap) {
  allDuplicates.forEach(function (duplicate) {
    duplicate.duplicates.forEach(function (symbol) {
      symbol.symbolInstances = symbolsMap.get(duplicate).directInstances;
    });
  });
}

function hasSymbolOverrides(instance, idsMap) {
  try {
    if (instance.sketchObject.overrides() != null && instance.sketchObject.overrides().count() > 0) {
      return FindNestedSymbolOverride(instance.sketchObject.overrides(), idsMap, instance);
    }

    return false;
  } catch (e) {
    clog("-- Controlled exception : " + e);
    clog("---- Start processing " + instance.name + " via API");
    var hasOverride = false;
    instance.overrides.forEach(function (override) {
      if (override.property == "symbolID" && !override.isDefault && idsMap.has(override.value)) {
        hasOverride = true;
      }
    });
    clog(hasOverride ? "---- Does have overrides. Added to map response." : "---- Does not have overrides");
    return hasOverride;
  }
}

function FindNestedSymbolOverride(overrides, idsMap, instance) {
  for (var key in overrides) {
    var symbolID = overrides[key]["symbolID"];

    if (symbolID != null) {
      if (typeof symbolID === 'function') {
        symbolID = symbolID();
      }

      if (idsMap.has("" + symbolID)) {
        return true;
      }
    } else {
      if (FindNestedSymbolOverride(overrides[key], idsMap, instance)) return true;
    }
  }

  return false;
}

function hasSharedStyleOverrides(instance, idsMap) {
  if (instance.sketchObject.overrides() != null && instance.sketchObject.overrides().count() > 0) {
    return FindNestedSharedStyleOverride(instance.sketchObject.overrides(), idsMap, instance);
  }

  return false;
}

function FindNestedSharedStyleOverride(overrides, idsMap, instance, level) {
  for (var key in overrides) {
    var symbolID = overrides[key]["symbolID"];

    if (symbolID == null) {
      if (overrides[key] instanceof __NSDictionaryM) {
        for (var key2 in overrides[key]) {
          if (overrides[key][key2] instanceof __NSDictionaryM) {
            if (FindNestedSharedStyleOverride(overrides[key][key2], idsMap, instance, level + 1)) return true;
          } else {
            if (idsMap.has("" + overrides[key][key2])) {
              return true;
            }

            ;
          }
        }
      } else {
        try {
          if (idsMap.has("" + overrides[key])) {
            return true;
          }

          ;
        } catch (e) {
          Helpers.clog("Error while processing overrides (1).");
          Helpers.clog(idsMap);
          Helpers.clog(overrides[key]);
          Helpers.clog(e);
        }
      }
    } else {
      try {
        if (FindNestedSharedStyleOverride(overrides[key], idsMap, instance, level + 1)) return true;
      } catch (e) {
        Helpers.clog("Error while processing overrides (2).");
        Helpers.clog(idsMap);
        Helpers.clog(overrides[key]);
        Helpers.clog(e);
      }
    }
  }

  return false;
}

function importSymbolFromLibrary(element) {
  try {
    clog("-- Importing " + element.name + " from library" + element.libraryName + " with ID:" + element.symbol.id + " and symbolId:" + element.symbol.symbolId);
    var symbolReferences = element.library.getImportableSymbolReferencesForDocument(document);
    var refToImport = symbolReferences.filter(function (ref) {
      return ref.id == element.symbol.symbolId;
    });
    var symbol = refToImport[0].import();
    clog("-- We've imported:" + symbol.name + " from library " + symbol.getLibrary().name);
    return symbol;
  } catch (e) {
    clog("-- ERROR: Couldn't import " + element.name + " from library" + element.libraryName + " with ID:" + element.symbol.id + " and symbolId:" + element.symbol.symbolId);
    return element.symbol;
  }
}

function importLayerStyleFromLibrary(layerStyle) {
  try {
    clog("-- Importing " + layerStyle.name + " from library " + layerStyle.libraryName + " with ID:" + layerStyle.layerStyle.id);
    var styleReferences = layerStyle.library.getImportableLayerStyleReferencesForDocument(document);
    var refToImport = styleReferences.filter(function (ref) {
      return ref.id == layerStyle.layerStyle.id;
    });
    var style = refToImport[0].import();
    clog("-- We've imported:" + style.name + " from library " + style.getLibrary().name);
    return style;
  } catch (e) {
    clog("-- ERROR: Couldn't import " + layerStyle.name + " from library" + layerStyle.libraryName + " with ID:" + layerStyle.layerStyle.id);
    return null;
  }
}

function importTextStyleFromLibrary(textStyle) {
  try {
    clog("-- Importing " + textStyle.name + " from library " + textStyle.libraryName + " with ID:" + textStyle.textStyle.id);
    var styleReferences = textStyle.library.getImportableTextStyleReferencesForDocument(document);
    var refToImport = styleReferences.filter(function (ref) {
      return ref.id == textStyle.textStyle.id;
    });
    var style = refToImport[0].import();
    clog("-- We've imported:" + style.name + " from library " + style.getLibrary().name);
    return style;
  } catch (e) {
    clog("-- ERROR: Couldn't import " + textStyle.name + " from library" + textStyle.libraryName + " with ID:" + textStyle.textStyle.id);
    return null;
  }
}

function importColorVariableFromLibrary(colorVariable) {
  try {
    clog("-- Importing " + colorVariable.name + " from library " + colorVariable.libraryName + " with ID:" + colorVariable.colorVariable.id);
    var colorVariableReferences = colorVariable.library.getImportableSwatchReferencesForDocument(document);
    var refToImport = colorVariableReferences.filter(function (ref) {
      return ref.name == colorVariable.colorVariable.name; //TODO should be replaced by proper ID
    });
    var colorVar = refToImport[0].import();
    clog("-- We've imported:" + colorVar.name);
    return colorVar;
  } catch (e) {
    clog("-- ERROR: Couldn't import " + colorVariable.name + " from library" + colorVariable.libraryName + " with ID:" + colorVariable.colorVariable.id);
    clog(e);
    return null;
  }
}

function getReducedDuplicateData(symbol) {
  var reducedDuplicate = {
    "name": "" + symbol.name,
    "duplicates": []
  };
  symbol.duplicates.forEach(function (duplicate) {
    reducedDuplicate.duplicates.push({
      "name": "" + duplicate.name,
      "isForeign": duplicate.isForeign,
      "thumbnail": duplicate.thumbnail,
      "numInstances": duplicate.numInstances,
      "numOverrides": duplicate.numOverrides,
      "libraryName": duplicate.libraryName,
      "isSelected": false
    });
  });
  return reducedDuplicate;
}

function getReducedLayerStyleData(layerStyle) {
  var reducedDuplicate = {
    "name": "" + layerStyle.name,
    "duplicates": []
  };
  layerStyle.duplicates.forEach(function (duplicate) {
    if (!duplicate.isHidden) {
      reducedDuplicate.duplicates.push({
        "id": "" + duplicate.layerStyle.id + " // " + duplicate.layerStyle.style.id + " // " + (duplicate.layerStyle.id.indexOf("[") >= 0 ? duplicate.layerStyle.id.substring(duplicate.layerStyle.id.indexOf("[") + 1, duplicate.layerStyle.id.length - 1) : "xxx"),
        "name": "" + duplicate.name,
        "isForeign": duplicate.isForeign,
        "description": duplicate.description,
        "thumbnail": duplicate.thumbnail,
        "contrastMode": duplicate.contrastMode,
        "numInstances": duplicate.numInstances,
        "numOverrides": duplicate.numOverrides,
        "libraryName": duplicate.libraryName,
        "isSelected": duplicate.isSelected,
        "isHidden": duplicate.isHidden
      });
    }
  });
  return reducedDuplicate;
}

function getReducedTextStyleData(textStyle) {
  var reducedDuplicate = {
    "name": "" + textStyle.name,
    "duplicates": []
  };
  textStyle.duplicates.forEach(function (duplicate) {
    if (!duplicate.isHidden) {
      reducedDuplicate.duplicates.push({
        "id": "" + duplicate.textStyle.id + " // " + duplicate.textStyle.style.id + " // " + (duplicate.textStyle.id.indexOf("[") >= 0 ? duplicate.textStyle.id.substring(duplicate.textStyle.id.indexOf("[") + 1, duplicate.textStyle.id.length - 1) : "xxx"),
        "name": "" + duplicate.name,
        "isForeign": duplicate.isForeign,
        "description": duplicate.description,
        "thumbnail": duplicate.thumbnail,
        "contrastMode": duplicate.contrastMode,
        "numInstances": duplicate.numInstances,
        "numOverrides": duplicate.numOverrides,
        "libraryName": duplicate.libraryName,
        "isSelected": duplicate.isSelected,
        "isHidden": duplicate.isHidden
      });
    }
  });
  return reducedDuplicate;
}

function getSelectedSymbolsSession(selection) {
  var symbolObjects = [];
  var idsMap = new Map();
  selection.forEach(function (docSymbol) {
    var foreignLib = docSymbol.library;
    var isForeign = docSymbol.isForeign;
    var libraryName = sketchlocalfile;
    if (isForeign) libraryName = libraryPrefix + foreignLib.name;
    var symbolObject;

    if (symbolObjects.length == 0) {
      var symbolObject = {
        "name": "" + docSymbol.symbol.name,
        "duplicates": []
      };
      symbolObjects.push(symbolObject);
    } else symbolObject = symbolObjects[0];

    idsMap.set(docSymbol.symbol.symbolId, docSymbol.symbol);
    var symbolInstances = getSymbolInstances(docSymbol.symbol);
    var symbolOverrides = getSymbolOverrides(docSymbol.symbol, idsMap);
    symbolObject.duplicates.push({
      "name": "" + docSymbol.symbol.name,
      "symbol": docSymbol.symbol,
      "isForeign": isForeign,
      "thumbnail": getThumbnail(docSymbol),
      "symbolInstances": symbolInstances,
      "numInstances": symbolInstances.length,
      "symbolOverrides": symbolOverrides,
      "numOverrides": symbolOverrides.length,
      "libraryName": libraryName,
      "library": foreignLib,
      "isSelected": false
    });
  });
  return symbolObjects.sort(compareByName);
}

function getReducedSymbolsSession(session) {
  var reducedSession = [];
  session.forEach(function (sessionItem) {
    var symbolObject = {
      "name": "" + sessionItem.name,
      "duplicates": []
    };
    sessionItem.duplicates.forEach(function (duplicate) {
      symbolObject.duplicates.push({
        "name": "" + duplicate.name,
        "isForeign": duplicate.isForeign,
        "thumbnail": duplicate.thumbnail,
        "numInstances": duplicate.numInstances,
        "numOverrides": duplicate.numOverrides,
        "libraryName": duplicate.libraryName,
        "library": duplicate.library,
        "isSelected": duplicate.isSelected
      });
    });
    reducedSession.push(symbolObject);
  });
  return reducedSession;
}

function getDuplicateColorVariables(context, includeLibraries) {
  var allColorVariables = getAllColorVariables(includeLibraries);
  var nameDictionary = {};
  var duplicateColorVariables = [];
  var alreadyAddedIDs = [];
  allColorVariables.forEach(function (colorVariable) {
    var colorVariableObject = {
      "colorVariable": colorVariable.colorVariable,
      "name": "" + colorVariable.name,
      "color": "" + colorVariable.color,
      "isForeign": colorVariable.isForeign,
      "thumbnail": colorVariable.thumbnail,
      "libraryName": colorVariable.libraryName,
      "library": colorVariable.library,
      "isSelected": false,
      "isChosen": false,
      "description": "" + colorVariable.color,
      ["thumbnail"]: getColorVariableThumbnail(colorVariable.colorVariable),
      "contrastMode": shouldEnableContrastMode(colorVariable.colorVariable.color.substring(1, 7)),
      "duplicates": [],
      ["isSelected"]: false
    };
    alreadyAddedIDs.push("" + colorVariable.colorVariable.id);

    if (nameDictionary[colorVariable.name] == null) {
      duplicateColorVariables.push(colorVariableObject);
      colorVariableObject.duplicates.push({
        "colorVariable": colorVariable.colorVariable,
        "name": "" + colorVariable.name,
        "color": "" + colorVariable.color,
        "isForeign": colorVariable.isForeign,
        "thumbnail": colorVariable.thumbnail,
        "libraryName": colorVariable.libraryName,
        "library": colorVariable.library,
        "isSelected": false,
        "isChosen": false,
        "description": "" + colorVariable.color,
        ["thumbnail"]: getColorVariableThumbnail(colorVariable.colorVariable),
        "contrastMode": shouldEnableContrastMode(colorVariable.colorVariable.color.substring(1, 7)),
        "duplicates": null,
        ["isSelected"]: false
      });
      nameDictionary[colorVariable.name] = colorVariableObject;
    } else {
      nameDictionary[colorVariable.name].duplicates.push(colorVariableObject);
    }
  });
  Object.keys(nameDictionary).forEach(function (key) {
    var removeElement = false;
    if (nameDictionary[key].duplicates.length <= 1) removeElement = true;

    if (!removeElement) {
      var allForeign = true;
      nameDictionary[key].duplicates.forEach(function (duplicate) {
        if (!duplicate.isForeign) allForeign = false;
      });

      if (allForeign) {
        removeElement = true;
      }
    }

    if (removeElement) {
      var index = duplicateColorVariables.indexOf(nameDictionary[key]);
      if (index > -1) duplicateColorVariables.splice(index, 1);
      nameDictionary[key] = null;
    }
  });
  return duplicateColorVariables;
}

function GetSpecificLayerStyleData(layerStyle, layerStylesMap) {
  ctime("GetSpecificLayerStyleData");
  var totalInstances = 0;
  var totalOverrides = 0;
  layerStyle.duplicates.forEach(function (duplicate) {
    var layerStyleMapItem = layerStylesMap.get(duplicate.layerStyle);
    duplicate.thumbnail = getOvalThumbnail(duplicate.layerStyle);
    duplicate.styleInstances = layerStyleMapItem.directInstances;
    duplicate.numInstances = layerStyleMapItem.directInstances.length;
    duplicate.styleOverrides = layerStyleMapItem.instancesWithOverrides;
    duplicate.numOverrides = layerStyleMapItem.instancesWithOverrides.length;
    totalInstances += duplicate.numInstances;
    totalOverrides += duplicate.numOverrides;
  });
  clog("-- Found " + totalInstances + " instances, " + totalOverrides + " overrides, and created " + layerStyle.duplicates.length + " thumbnails");
  ctimeEnd("GetSpecificLayerStyleData");
}

function GetSpecificTextStyleData(textStyle, textStylesMap) {
  ctime("GetSpecificTextStyleData");
  var totalInstances = 0;
  var totalOverrides = 0;
  textStyle.duplicates.forEach(function (duplicate) {
    var textStyleMapItem = textStylesMap.get(duplicate.textStyle);
    duplicate.thumbnail = getTextThumbnail(duplicate.textStyle);
    duplicate.styleInstances = textStyleMapItem.directInstances;
    duplicate.numInstances = textStyleMapItem.directInstances.length;
    duplicate.styleOverrides = textStyleMapItem.instancesWithOverrides;
    duplicate.numOverrides = textStyleMapItem.instancesWithOverrides.length;
    totalInstances += duplicate.numInstances;
    totalOverrides += duplicate.numOverrides;
  });
  clog("-- Found " + totalInstances + " instances, " + totalOverrides + " overrides, and created " + textStyle.duplicates.length + " thumbnails");
  ctimeEnd("GetSpecificTextStyleData");
}

function GetSpecificSymbolData(symbol, symbolsMap) {
  ctime("GetSpecificSymbolData");
  var totalInstances = 0;
  var totalOverrides = 0;
  symbol.duplicates.forEach(function (duplicate) {
    var symbolMapItem = symbolsMap.get(duplicate.symbol);
    duplicate.thumbnail = getThumbnail(duplicate);
    duplicate.symbolInstances = symbolMapItem.directInstances;
    duplicate.numInstances = symbolMapItem.directInstances.length;
    duplicate.symbolOverrides = symbolMapItem.instancesWithOverrides;
    duplicate.numOverrides = symbolMapItem.instancesWithOverrides.length;
    totalInstances += duplicate.numInstances;
    totalOverrides += duplicate.numOverrides;
  });
  clog("-- Found " + totalInstances + " instances, " + totalOverrides + " overrides, and created " + symbol.duplicates.length + " thumbnails");
  ctimeEnd("GetSpecificSymbolData");
}

function getTextStyleDescription(sharedTextStyle) {
  return sharedTextStyle.style.fontFamily + " " + sharedTextStyle.style.fontSize + "pt" + " - " + sharedTextStyle.style.alignment;
}

function getLayerStyleDescription(sharedStyle) {
  var textInfo = "";

  if (sharedStyle.style.fills.length > 0) {
    textInfo += "Fill" + (!sharedStyle.style.fills[0].enabled ? " (disabled)" : "") + ": " + sharedStyle.style.fills[0].color.substring(0, 7).toUpperCase();
  } else textInfo += "No fill";

  textInfo += " - ";

  if (sharedStyle.style.borders.length > 0) {
    textInfo += "Border" + (!sharedStyle.style.borders[0].enabled ? " (disabled)" : "") + ": " + sharedStyle.style.borders[0].color.substring(0, 7).toUpperCase();
  } else textInfo += "No border";

  return textInfo;
}

function getTextStyleColor(style) {
  if (style.style().textStyle().attributes().MSAttributedStringColorAttribute) {
    return style.style().textStyle().attributes().MSAttributedStringColorAttribute.hexValue().toString();
  } else return "000000";
}

function getOvalThumbnail(sharedStyle) {
  var oval = new ShapePath({
    shapeType: ShapePath.ShapeType.Oval,
    frame: new sketch.Rectangle(0, 0, 300, 300),
    style: sharedStyle.style,
    parent: document.selectedPage
  });

  try {
    var options = {
      scales: '1',
      formats: 'png',
      output: false
    };
    var buffer = sketch.export(oval, options);
    var image64 = buffer.toString('base64');
    oval.remove();
    return image64;
  } catch (e) {
    oval.remove();
    return "";
  }
}

function getTextThumbnail(sharedStyle) {
  var text = new Text({
    text: 'The quick brown fox',
    frame: new sketch.Rectangle(0, 0, 600, 100),
    style: sharedStyle.style,
    parent: document.selectedPage
  });

  try {
    var options = {
      scales: '5',
      formats: 'png',
      output: false
    };
    var buffer = sketch.export(text, options);
    var image64 = buffer.toString('base64');
    text.remove();
    return image64;
  } catch (e) {
    text.remove();
    return "";
  }
}

function getColorVariableThumbnail(colorVariable) {
  var oval = new ShapePath({
    shapeType: ShapePath.ShapeType.Oval,
    frame: new sketch.Rectangle(0, 0, 300, 300),
    style: {
      fills: [{
        color: colorVariable.color
      }]
    },
    parent: document.selectedPage
  });

  try {
    var options = {
      scales: '1',
      formats: 'png',
      output: false
    };
    var buffer = sketch.export(oval, options);
    var image64 = buffer.toString('base64');
    oval.remove();
    return image64;
  } catch (e) {
    oval.remove();
    return "";
  }
}

function getAllLayerStyles(includeAllStylesFromExternalLibraries) {
  var allStyles = [];
  var idsMap = new Map();
  var redundantIdsMap = new Map();
  document.sharedLayerStyles.forEach(function (sharedLayerStyle) {
    var library = sharedLayerStyle.getLibrary();

    if (!idsMap.has(sharedLayerStyle.id)) {
      var redId1 = sharedLayerStyle.style.id;
      var redId2 = sharedLayerStyle.id.indexOf("[") >= 0 ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;
      var redundantIn = false;
      if (redId2 != null) redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);else redundantIn = redundantIdsMap.has(redId1);
      var layerStyleObject = {
        "layerStyle": sharedLayerStyle,
        "name": "" + sharedLayerStyle.name,
        "libraryName": library != null ? libraryPrefix + library.name : sketchlocalfile,
        "library": library,
        "isForeign": library != null,
        "isSelected": false,
        "isChosen": false,
        "description": getLayerStyleDescription(sharedLayerStyle),
        "thumbnail": getOvalThumbnail(sharedLayerStyle),
        "numInstances": 0,
        "numOverrides": 0,
        ["isSelected"]: false,
        "contrastMode": sharedLayerStyle.style.fills.length > 0 ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
        "isHidden": redundantIn
      };
      allStyles.push(layerStyleObject);
      idsMap.set(sharedLayerStyle.style.id, true);
      redundantIdsMap.set(redId1, layerStyleObject);
      if (redId2 != null) redundantIdsMap.set(redId2, layerStyleObject);
    }
  });

  if (includeAllStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().sharedLayerStyles.forEach(function (sharedLayerStyle) {
          if (!idsMap.has(sharedLayerStyle.style.id)) {
            var redId1 = sharedLayerStyle.style.id;
            var redId2 = sharedLayerStyle.id.indexOf("[") >= 0 ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;
            var redundantIn = false;
            if (redId2 != null) redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);else redundantIn = redundantIdsMap.has(redId1);
            var layerStyleObject = {
              "layerStyle": sharedLayerStyle,
              "name": "" + sharedLayerStyle.name,
              "libraryName": libraryPrefix + lib.name,
              "library": lib,
              "isForeign": true,
              "isSelected": false,
              "isChosen": false,
              "description": getLayerStyleDescription(sharedLayerStyle),
              "thumbnail": getOvalThumbnail(sharedLayerStyle),
              "numInstances": 0,
              "numOverrides": 0,
              ["isSelected"]: false,
              "contrastMode": sharedLayerStyle.style.fills.length > 0 ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
              "isHidden": redundantIn
            };
            allStyles.push(layerStyleObject);
            idsMap.set(sharedLayerStyle.style.id, true);
            redundantIdsMap.set(redId1, layerStyleObject);
            if (redId2 != null) redundantIdsMap.set(redId2, layerStyleObject);
          }
        });
      }
    });
  }

  return allStyles.sort(compareStyleArrays);
  ;
}

function getAllTextStyles(includeAllStylesFromExternalLibraries) {
  var allStyles = [];
  var idsMap = new Map();
  var redundantIdsMap = new Map();
  document.sharedTextStyles.forEach(function (sharedTextStyle) {
    var library = sharedTextStyle.getLibrary();

    if (!idsMap.has(sharedTextStyle.id)) {
      var redId1 = sharedTextStyle.style.id;
      var redId2 = sharedTextStyle.id.indexOf("[") >= 0 ? sharedTextStyle.id.substring(sharedTextStyle.id.indexOf("[") + 1, sharedTextStyle.id.length - 1) : null;
      var redundantIn = false;
      if (redId2 != null) redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);else redundantIn = redundantIdsMap.has(redId1);
      var textStyleObject = {
        "textStyle": sharedTextStyle,
        "name": "" + sharedTextStyle.name,
        "libraryName": library != null ? libraryPrefix + library.name : sketchlocalfile,
        "library": library,
        "isForeign": library != null,
        "isSelected": false,
        "isChosen": false,
        "description": getTextStyleDescription(sharedTextStyle),
        "thumbnail": getTextThumbnail(sharedTextStyle),
        "numInstances": 0,
        "numOverrides": 0,
        ["isSelected"]: false,
        "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
        "isHidden": redundantIn
      };
      allStyles.push(textStyleObject);
      idsMap.set(sharedTextStyle.style.id, true);
      redundantIdsMap.set(redId1, textStyleObject);
      if (redId2 != null) redundantIdsMap.set(redId2, textStyleObject);
    }
  });

  if (includeAllStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().sharedTextStyles.forEach(function (sharedTextStyle) {
          if (!idsMap.has(sharedTextStyle.style.id)) {
            var redId1 = sharedTextStyle.style.id;
            var redId2 = sharedTextStyle.id.indexOf("[") >= 0 ? sharedTextStyle.id.substring(sharedTextStyle.id.indexOf("[") + 1, sharedTextStyle.id.length - 1) : null;
            var redundantIn = false;
            if (redId2 != null) redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);else redundantIn = redundantIdsMap.has(redId1);
            var textStyleObject = {
              "textStyle": sharedTextStyle,
              "name": "" + sharedTextStyle.name,
              "libraryName": libraryPrefix + lib.name,
              "library": lib,
              "isForeign": true,
              "isSelected": false,
              "isChosen": false,
              "description": getTextStyleDescription(sharedTextStyle),
              "thumbnail": getTextThumbnail(sharedTextStyle),
              "numInstances": 0,
              "numOverrides": 0,
              ["isSelected"]: false,
              "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
              "isHidden": redundantIn
            };
            allStyles.push(textStyleObject);
            idsMap.set(sharedTextStyle.style.id, true);
            redundantIdsMap.set(redId1, textStyleObject);
            if (redId2 != null) redundantIdsMap.set(redId2, textStyleObject);
          }
        });
      }
    });
  }

  return allStyles.sort(compareStyleArrays);
  ;
}

function getAllColorVariables(includeAllStylesFromExternalLibraries) {
  var allColorVariables = [];
  var map = new Map();
  document.swatches.forEach(function (swatch) {
    var colorVariableObject = {
      "colorVariable": swatch,
      "name": "" + swatch.name,
      "color": "" + swatch.color.substring(0, 7),
      "libraryName": sketchlocalfile,
      "library": null,
      "isForeign": false,
      "isSelected": false,
      "isChosen": false,
      "description": "" + swatch.color.substring(0, 7),
      "thumbnail": getColorVariableThumbnail(swatch),
      "contrastMode": shouldEnableContrastMode(swatch.color.substring(1, 7)),
      "duplicates": [],
      ["isSelected"]: false
    };
    allColorVariables.push(colorVariableObject);
    map.set(swatch.id, true);
  });

  if (includeAllStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().swatches.forEach(function (swatch) {
          if (!map.has(swatch.id)) {
            var colorVariableObject = {
              "colorVariable": swatch,
              "name": "" + swatch.name,
              "color": "" + swatch.color.substring(0, 7),
              "libraryName": libraryPrefix + lib.name,
              "library": lib,
              "isForeign": true,
              "isSelected": false,
              "isChosen": false,
              "description": "" + swatch.color.substring(0, 7),
              "thumbnail": getColorVariableThumbnail(swatch),
              "contrastMode": shouldEnableContrastMode(swatch.color.substring(1, 7)),
              "duplicates": [],
              ["isSelected"]: false
            };
            allColorVariables.push(colorVariableObject);
          }
        });
      }
    });
  }

  return allColorVariables;
}

function getAllDuplicateLayerStylesByName(context, includeAllLayerStylesFromExternalLibraries) {
  var duplicatedLayerStyles = [];
  var namesMap = new Map();
  var idsMap = new Map();
  var redundantIdsMap = new Map();
  document.sharedLayerStyles.forEach(function (sharedLayerStyle) {
    if (!idsMap.has(sharedLayerStyle.id)) {
      var redId1 = sharedLayerStyle.style.id;
      var redId2 = sharedLayerStyle.id.indexOf("[") >= 0 ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;
      var redundantIn = false;
      if (redId2 != null) redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);else redundantIn = redundantIdsMap.has(redId1);

      if (!namesMap.has(sharedLayerStyle.name)) {
        var styleObject = {
          "name": "" + sharedLayerStyle.name,
          "duplicates": []
        };
        styleObject.duplicates.push({
          "name": "" + sharedLayerStyle.name,
          "layerStyle": sharedLayerStyle,
          "libraryName": sharedLayerStyle.getLibrary() != null ? libraryPrefix + sharedLayerStyle.getLibrary().name : sketchlocalfile,
          "library": sharedLayerStyle.getLibrary() != null ? sharedLayerStyle.getLibrary() : null,
          "isForeign": sharedLayerStyle.getLibrary() != null,
          "isSelected": false,
          "isChosen": false,
          "description": getLayerStyleDescription(sharedLayerStyle),
          "thumbnail": "",
          ["isSelected"]: false,
          "contrastMode": sharedLayerStyle.style.fills.length > 0 ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
          "styleInstances": null,
          "numInstances": 0,
          "styleOverrides": null,
          "numOverrides": 0,
          "isHidden": redundantIn
        });
        duplicatedLayerStyles.push(styleObject);
        idsMap.set(sharedLayerStyle.id, styleObject);
        namesMap.set(sharedLayerStyle.name, styleObject);
      } else {
        var styleObject = namesMap.get(sharedLayerStyle.name);
        styleObject.duplicates.push({
          "name": "" + sharedLayerStyle.name,
          "layerStyle": sharedLayerStyle,
          "libraryName": sharedLayerStyle.getLibrary() != null ? libraryPrefix + sharedLayerStyle.getLibrary().name : sketchlocalfile,
          "library": sharedLayerStyle.getLibrary() != null ? sharedLayerStyle.getLibrary() : null,
          "isForeign": sharedLayerStyle.getLibrary() != null,
          "isSelected": false,
          "isChosen": false,
          "description": getLayerStyleDescription(sharedLayerStyle),
          "thumbnail": "",
          ["isSelected"]: false,
          "contrastMode": sharedLayerStyle.style.fills.length > 0 ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
          "styleInstances": null,
          "numInstances": 0,
          "styleOverrides": null,
          "numOverrides": 0,
          "isHidden": redundantIn
        });
      }

      redundantIdsMap.set(redId1, styleObject);
      if (redId2 != null) redundantIdsMap.set(redId2, styleObject);
    }
  });

  if (includeAllLayerStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().sharedLayerStyles.forEach(function (sharedLayerStyle) {
          if (!idsMap.has(sharedLayerStyle.id)) {
            var redId1 = sharedLayerStyle.style.id;
            var redId2 = sharedLayerStyle.id.indexOf("[") >= 0 ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;
            var redundantIn = false;
            if (redId2 != null) redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);else redundantIn = redundantIdsMap.has(redId1);

            if (!namesMap.has(sharedLayerStyle.name)) {
              var styleObject = {
                "name": "" + sharedLayerStyle.name,
                "duplicates": []
              };
              styleObject.duplicates.push({
                "name": "" + sharedLayerStyle.name,
                "layerStyle": sharedLayerStyle,
                "libraryName": libraryPrefix + lib.name,
                "library": lib,
                "isForeign": true,
                "isSelected": false,
                "isChosen": false,
                "description": getLayerStyleDescription(sharedLayerStyle),
                "thumbnail": "",
                ["isSelected"]: false,
                "contrastMode": sharedLayerStyle.style.fills.length > 0 ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
                "styleInstances": null,
                "numInstances": 0,
                "styleOverrides": null,
                "numOverrides": 0,
                "isHidden": redundantIn
              });
              duplicatedLayerStyles.push(styleObject);
              idsMap.set(sharedLayerStyle.id, styleObject);
              namesMap.set(sharedLayerStyle.name, styleObject);
            } else {
              var styleObject = namesMap.get(sharedLayerStyle.name);
              styleObject.duplicates.push({
                "name": "" + sharedLayerStyle.name,
                "layerStyle": sharedLayerStyle,
                "libraryName": libraryPrefix + lib.name,
                "library": lib,
                "isForeign": true,
                "isSelected": false,
                "isChosen": false,
                "description": getLayerStyleDescription(sharedLayerStyle),
                "thumbnail": "",
                ["isSelected"]: false,
                "contrastMode": sharedLayerStyle.style.fills.length > 0 ? shouldEnableContrastMode(sharedLayerStyle.style.fills[0].color.substring(1, 7)) : false,
                "styleInstances": null,
                "numInstances": 0,
                "styleOverrides": null,
                "numOverrides": 0,
                "isHidden": redundantIn
              });
            }

            redundantIdsMap.set(redId1, styleObject);
            if (redId2 != null) redundantIdsMap.set(redId2, styleObject);
          }
        });
      }
    });
  }

  namesMap.forEach(function (styleObject, name) {
    var removeElement = false;
    if (styleObject.duplicates.length <= 1) removeElement = true;

    if (!removeElement) {
      var allForeign = true;
      styleObject.duplicates.forEach(function (duplicate) {
        if (!duplicate.isForeign) allForeign = false;
      });
      removeElement = allForeign;
    }

    if (removeElement) {
      var index = duplicatedLayerStyles.indexOf(styleObject);
      if (index > -1) duplicatedLayerStyles.splice(index, 1);
    }
  });
  return duplicatedLayerStyles.sort(compareByName);
}

function getAllDuplicateTextStylesByName(context, includeAllStylesFromExternalLibraries) {
  var duplicatedTextStyles = [];
  var namesMap = new Map();
  var idsMap = new Map();
  var redundantIdsMap = new Map();
  document.sharedTextStyles.forEach(function (sharedTextStyle) {
    if (!idsMap.has(sharedTextStyle.id)) {
      var redId1 = sharedTextStyle.style.id;
      var redId2 = sharedTextStyle.id.indexOf("[") >= 0 ? sharedTextStyle.id.substring(sharedTextStyle.id.indexOf("[") + 1, sharedTextStyle.id.length - 1) : null;
      var redundantIn = false;
      if (redId2 != null) redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);else redundantIn = redundantIdsMap.has(redId1);

      if (!namesMap.has(sharedTextStyle.name)) {
        var styleObject = {
          "name": "" + sharedTextStyle.name,
          "duplicates": []
        };
        styleObject.duplicates.push({
          "name": "" + sharedTextStyle.name,
          "textStyle": sharedTextStyle,
          "libraryName": sharedTextStyle.getLibrary() != null ? libraryPrefix + sharedTextStyle.getLibrary().name : sketchlocalfile,
          "library": sharedTextStyle.getLibrary() != null ? sharedTextStyle.getLibrary() : null,
          "isForeign": sharedTextStyle.getLibrary() != null,
          "isSelected": false,
          "isChosen": false,
          "description": getTextStyleDescription(sharedTextStyle),
          "thumbnail": "",
          ["isSelected"]: false,
          "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
          "styleInstances": null,
          "numInstances": 0,
          "styleOverrides": null,
          "numOverrides": 0,
          "isHidden": redundantIn
        });
        duplicatedTextStyles.push(styleObject);
        idsMap.set(sharedTextStyle.id, styleObject);
        namesMap.set(sharedTextStyle.name, styleObject);
      } else {
        var styleObject = namesMap.get(sharedTextStyle.name);
        styleObject.duplicates.push({
          "name": "" + sharedTextStyle.name,
          "textStyle": sharedTextStyle,
          "libraryName": sharedTextStyle.getLibrary() != null ? libraryPrefix + sharedTextStyle.getLibrary().name : sketchlocalfile,
          "library": sharedTextStyle.getLibrary() != null ? sharedTextStyle.getLibrary() : null,
          "isForeign": sharedTextStyle.getLibrary() != null,
          "isSelected": false,
          "isChosen": false,
          "description": getTextStyleDescription(sharedTextStyle),
          "thumbnail": "",
          ["isSelected"]: false,
          "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
          "styleInstances": null,
          "numInstances": 0,
          "styleOverrides": null,
          "numOverrides": 0,
          "isHidden": redundantIn
        });
      }

      redundantIdsMap.set(redId1, styleObject);
      if (redId2 != null) redundantIdsMap.set(redId2, styleObject);
    }
  });

  if (includeAllStylesFromExternalLibraries) {
    libraries.forEach(function (lib) {
      if (lib && lib.id && lib.enabled && context.document.documentData() && context.document.documentData().objectID().toString().localeCompare(lib.id) != 0) {
        lib.getDocument().sharedTextStyles.forEach(function (sharedTextStyle) {
          if (!idsMap.has(sharedTextStyle.id)) {
            var redId1 = sharedTextStyle.style.id;
            var redId2 = sharedTextStyle.id.indexOf("[") >= 0 ? sharedTextStyle.id.substring(sharedTextStyle.id.indexOf("[") + 1, sharedTextStyle.id.length - 1) : null;
            var redundantIn = false;
            if (redId2 != null) redundantIn = redundantIdsMap.has(redId1) || redundantIdsMap.has(redId2);else redundantIn = redundantIdsMap.has(redId1);

            if (!namesMap.has(sharedTextStyle.name)) {
              var styleObject = {
                "name": "" + sharedTextStyle.name,
                "duplicates": []
              };
              styleObject.duplicates.push({
                "name": "" + sharedTextStyle.name,
                "textStyle": sharedTextStyle,
                "libraryName": libraryPrefix + lib.name,
                "library": lib,
                "isForeign": true,
                "isSelected": false,
                "isChosen": false,
                "description": getTextStyleDescription(sharedTextStyle),
                "thumbnail": "",
                ["isSelected"]: false,
                "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
                "styleInstances": null,
                "numInstances": 0,
                "styleOverrides": null,
                "numOverrides": 0,
                "isHidden": redundantIn
              });
              duplicatedTextStyles.push(styleObject);
              idsMap.set(sharedTextStyle.id, styleObject);
              namesMap.set(sharedTextStyle.name, styleObject);
            } else {
              var styleObject = namesMap.get(sharedTextStyle.name);
              styleObject.duplicates.push({
                "name": "" + sharedTextStyle.name,
                "textStyle": sharedTextStyle,
                "libraryName": libraryPrefix + lib.name,
                "library": lib,
                "isForeign": true,
                "isSelected": false,
                "isChosen": false,
                "description": getTextStyleDescription(sharedTextStyle),
                "thumbnail": "",
                ["isSelected"]: false,
                "contrastMode": shouldEnableContrastMode(sharedTextStyle.style.textColor.substring(1, 7)),
                "styleInstances": null,
                "numInstances": 0,
                "styleOverrides": null,
                "numOverrides": 0,
                "isHidden": redundantIn
              });
            }

            redundantIdsMap.set(redId1, styleObject);
            if (redId2 != null) redundantIdsMap.set(redId2, styleObject);
          }
        });
      }
    });
  }

  namesMap.forEach(function (styleObject, name) {
    var removeElement = false;
    if (styleObject.duplicates.length <= 1) removeElement = true;

    if (!removeElement) {
      var allForeign = true;
      styleObject.duplicates.forEach(function (duplicate) {
        if (!duplicate.isForeign) allForeign = false;
      });
      removeElement = allForeign;
    }

    if (removeElement) {
      var index = duplicatedTextStyles.indexOf(styleObject);
      if (index > -1) duplicatedTextStyles.splice(index, 1);
    }
  });
  return duplicatedTextStyles.sort(compareByName);
}

function getDefinedLayerStyles(context, includeAllStylesFromExternalLibraries) {
  var layerStyles = getAllLayerStyles(includeAllStylesFromExternalLibraries);
  return layerStyles.sort(compareStyleArrays);
  ;
}

function getDefinedTextStyles(context, includeAllStylesFromExternalLibraries) {
  var textStyles = getAllTextStyles(includeAllStylesFromExternalLibraries);
  return textStyles.sort(compareStyleArrays);
  ;
}

function getDefinedColorVariables(context, includeAllStylesFromExternalLibraries) {
  var colorVariables = getAllColorVariables(includeAllStylesFromExternalLibraries);
  return colorVariables.sort(compareColorVariableArrays);
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

function getThumbnail(element) {
  var component = element.symbol;

  if (element.isForeign) {
    try {
      var instances = element.symbol.getAllInstances();

      if (instances.length > 0) {
        clog("---- Foreign. Getting image using first instance.");
        component = instances[0];
      } else {
        clog("---- Foreign. Getting image using library reference.");
        var originLibrary = element.library;
        var libDocument = originLibrary.getDocument();
        component = libDocument.getLayerWithID(element.symbol.id);
      }
    } catch (e) {
      clog("---- ERROR: Couldn't load (foreign symbol) " + element.symbol.name + " library document.");
    }
  }

  try {
    var options = {
      scales: '3',
      formats: 'png',
      output: false
    };
    var buffer = sketch.export(component, options);
    var image64 = buffer.toString('base64');
    return image64;
  } catch (e) {
    return "";
  }
}

function clog(message) {
  if (logsEnabled) console.log(message);
}

function ctime(message) {
  if (timingEnabled) console.time(message);
}

function ctimeEnd(message) {
  if (timingEnabled) console.timeEnd(message);
}

function getLogsEnabled() {
  return logsEnabled;
}

function getTimingEnabled() {
  return timingEnabled;
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
  getSymbolInstances: getSymbolInstances,
  compareStyleArrays: compareStyleArrays,
  FindAllSimilarTextStyles: FindAllSimilarTextStyles,
  FindSimilarTextStyles: FindSimilarTextStyles,
  FindAllSimilarLayerStyles: FindAllSimilarLayerStyles,
  FindSimilarLayerStyles: FindSimilarLayerStyles,
  getAllLayerStyles: getAllLayerStyles,
  getDefinedTextStyles: getDefinedTextStyles,
  IsInTrial: IsInTrial,
  ExiGuthrie: ExiGuthrie,
  Guthrie: Guthrie,
  valStatus: valStatus,
  writeTextToFile: writeTextToFile,
  commands: commands,
  getSelectedSymbolsSession: getSelectedSymbolsSession,
  GetSpecificSymbolData: GetSpecificSymbolData,
  GetSpecificLayerStyleData: GetSpecificLayerStyleData,
  GetSpecificTextStyleData: GetSpecificTextStyleData,
  shouldEnableContrastMode: shouldEnableContrastMode,
  countAllSymbols: countAllSymbols,
  ["writeTextToFile"]: writeTextToFile,
  readFromFile: readFromFile,
  LoadSettings: LoadSettings,
  clog: clog,
  getLogsEnabled: getLogsEnabled,
  getSettings: getSettings,
  getLibrariesEnabled: getLibrariesEnabled,
  getAcquiredLicense: getAcquiredLicense,
  document: document,
  importSymbolFromLibrary: importSymbolFromLibrary,
  importLayerStyleFromLibrary: importLayerStyleFromLibrary,
  getSymbolOverrides: getSymbolOverrides,
  ["getSymbolInstances"]: getSymbolInstances,
  importTextStyleFromLibrary: importTextStyleFromLibrary,
  getDefinedColorVariables: getDefinedColorVariables,
  importColorVariableFromLibrary: importColorVariableFromLibrary,
  getDuplicateColorVariables: getDuplicateColorVariables,
  FindAllSimilarColorVariables: FindAllSimilarColorVariables,
  analytics: analytics,
  getAllDuplicateSymbolsByName: getAllDuplicateSymbolsByName,
  getSymbolsMap: getSymbolsMap,
  updateAllDuplicatesWithMap: updateAllDuplicatesWithMap,
  ctime: ctime,
  ctimeEnd: ctimeEnd,
  sketchlocalfile: sketchlocalfile,
  getTimingEnabled: getTimingEnabled,
  getReducedDuplicateData: getReducedDuplicateData,
  getReducedSymbolsSession: getReducedSymbolsSession,
  getAllDuplicateLayerStylesByName: getAllDuplicateLayerStylesByName,
  getLayerStylesMap: getLayerStylesMap,
  getReducedLayerStyleData: getReducedLayerStyleData,
  getLayerStyleInstances: getLayerStyleInstances,
  getLayerStyleOverrides: getLayerStyleOverrides,
  getAllTextStyles: getAllTextStyles,
  getAllDuplicateTextStylesByName: getAllDuplicateTextStylesByName,
  getTextStylesMap: getTextStylesMap,
  getReducedTextStyleData: getReducedTextStyleData,
  getTextStyleInstances: getTextStyleInstances,
  getTextStyleOverrides: getTextStyleOverrides
};

/***/ }),

/***/ "./src/Main.js":
/*!*********************!*\
  !*** ./src/Main.js ***!
  \*********************/
/*! exports provided: MergeDuplicateSymbols, MergeSelectedSymbols, MergeSelectedTextStyles, MergeSimilarTextStyles, MergeDuplicateTextStyles, MergeSelectedLayerStyles, MergeSimilarLayerStyles, MergeDuplicateLayerStyles, MergeDuplicateColorVariables, MergeSelectedColorVariables, MergeSimilarColorVariables, EditSettings, triggerMethod, showRegistration, onShutdown */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeDuplicateColorVariables", function() { return MergeDuplicateColorVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSelectedColorVariables", function() { return MergeSelectedColorVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSimilarColorVariables", function() { return MergeSimilarColorVariables; });
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

var MergeColorVariables = __webpack_require__(/*! ./MergeColorVariables */ "./src/MergeColorVariables.js");

var Settings = __webpack_require__(/*! ./EditSettings */ "./src/EditSettings.js");

var sketch = __webpack_require__(/*! sketch */ "sketch");

var Helpers = __webpack_require__(/*! ./Helpers */ "./src/Helpers.js");




var webviewRegIdentifier = 'merge-duplicates.webviewReg';
var globalRemainingDays = 0;
var globalIsInTrial = false;
var globalIsExpired = false;
var globalIsOver = false;
var globalCommand;
function MergeDuplicateSymbols(context) {
  Helpers.analytics("MergeDuplicateSymbols");
  globalCommand = Helpers.commands.mergeduplicatesymbols;
  onValidate(context);
}
;
function MergeSelectedSymbols(context) {
  Helpers.analytics("MergeSelectedSymbols");
  globalCommand = Helpers.commands.mergeselectedsymbols;
  onValidate(context);
}
;
function MergeSelectedTextStyles(context) {
  Helpers.analytics("MergeSelectedTextStyles");
  globalCommand = Helpers.commands.mergeselectedtextstyles;
  onValidate(context);
}
;
function MergeSimilarTextStyles(context) {
  Helpers.analytics("MergeSimilarTextStyles");
  globalCommand = Helpers.commands.mergesimilartextstyles;
  onValidate(context);
}
;
function MergeDuplicateTextStyles(context) {
  Helpers.analytics("MergeDuplicateTextStyles");
  globalCommand = Helpers.commands.mergeduplicatetextstyles;
  onValidate(context);
}
;
function MergeSelectedLayerStyles(context) {
  Helpers.analytics("MergeSelectedLayerStyles");
  globalCommand = Helpers.commands.mergeselectedlayerstyles;
  onValidate(context);
}
;
function MergeSimilarLayerStyles(context) {
  Helpers.analytics("MergeSimilarLayerStyles");
  globalCommand = Helpers.commands.mergesimilarlayerstyles;
  onValidate(context);
}
;
function MergeDuplicateLayerStyles(context) {
  Helpers.analytics("MergeDuplicateLayerStyles");
  globalCommand = Helpers.commands.mergeduplicatelayerstyles;
  onValidate(context);
}
;
function MergeDuplicateColorVariables(context) {
  Helpers.analytics("MergeDuplicateColorVariables");
  globalCommand = Helpers.commands.mergeduplicatecolorvariables;
  onValidate(context);
}
;
function MergeSelectedColorVariables(context) {
  Helpers.analytics("MergeSelectedColorVariables");
  globalCommand = Helpers.commands.mergeselectedcolorvariables;
  onValidate(context);
}
;
function MergeSimilarColorVariables(context) {
  Helpers.analytics("MergeSimilarColorVariables");
  globalCommand = Helpers.commands.mergesimilarcolorvariables;
  onValidate(context);
}
;
function EditSettings(context) {
  Helpers.analytics("EditSettings");
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
  Helpers.clog("Sketch version:" + sketch.version.sketch);
  var version = "";

  try {
    var pluginManager = NSApp.delegate().pluginManager();
    var plugin = pluginManager.plugins().objectForKey('com.oodesign.mergeduplicatesymbols');
    version = plugin.version();
  } catch (e) {
    version = "Unable to identify version. 8+";
  }

  Helpers.clog("Merge Duplicates version: " + version);
  Helpers.clog("License: " + Helpers.getAcquiredLicense());

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

    case Helpers.commands.mergeduplicatecolorvariables:
      MergeColorVariables.MergeDuplicateColorVariables(context);
      break;

    case Helpers.commands.mergeselectedcolorvariables:
      MergeColorVariables.MergeSelectedColorVariables(context);
      break;

    case Helpers.commands.mergesimilarcolorvariables:
      MergeColorVariables.MergeSimilarColorVariables(context);
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
    Helpers.clog(s);
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

/***/ "./src/MergeColorVariables.js":
/*!************************************!*\
  !*** ./src/MergeColorVariables.js ***!
  \************************************/
/*! exports provided: MergeDuplicateColorVariables, MergeSelectedColorVariables, MergeSimilarColorVariables */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeDuplicateColorVariables", function() { return MergeDuplicateColorVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSelectedColorVariables", function() { return MergeSelectedColorVariables; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSimilarColorVariables", function() { return MergeSimilarColorVariables; });
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-module-web-view/remote */ "./node_modules/sketch-module-web-view/remote.js");
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Helpers */ "./src/Helpers.js");
/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_Helpers__WEBPACK_IMPORTED_MODULE_2__);




var sketch = __webpack_require__(/*! sketch */ "sketch");

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Helpers = __webpack_require__(/*! ./Helpers */ "./src/Helpers.js");

var webviewMDCVIdentifier = 'merge-duplicatecolorvariables.webview';
var webviewMCVFLIdentifier = 'merge-colorvariablesfromlist.webview';
var webviewMSCVIdentifier = 'merge-similarcolorvariables.webview';
var checkingAlsoLibraries = false;
var currentSelectedColorVariables = [];

function MergeColorVariables(context, colorVariableToKeepIndex) {
  var layersChangedCounter = 0;
  var stylesChangedCounter = [];
  var colorVariableToKeep = currentSelectedColorVariables[colorVariableToKeepIndex];
  var colorVariableToApply = colorVariableToKeep.colorVariable;
  var colorVariablesToRemove = [];
  Helpers.clog("Merging color variables. Keep '" + colorVariableToKeep.name + "'");

  if (colorVariableToKeep.isForeign) {
    var existingCV = Helpers.document.swatches.filter(function (sw) {
      return sw.id == colorVariableToKeep.colorVariable.id;
    });

    if (existingCV.length <= 0) {
      Helpers.clog("Importing color variable from library " + colorVariableToKeep.libraryName);
      colorVariableToApply = Helpers.importColorVariableFromLibrary(colorVariableToKeep);
    } else Helpers.clog("Color variable not imported (as it's already in document)");
  }

  for (var i = 0; i < currentSelectedColorVariables.length; i++) {
    if (i != colorVariableToKeepIndex) {
      colorVariablesToRemove.push(currentSelectedColorVariables[i].colorVariable);
    }
  } //currentSelectedColorVariables.forEach(function (colorVariable) {


  layersChangedCounter = doUseColorSwatchesInLayers(colorVariableToApply, colorVariablesToRemove);
  stylesChangedCounter = doUseColorSwatchesInStyles(colorVariableToApply, colorVariablesToRemove); //});

  colorVariablesToRemove.forEach(function (colorVariableToRemove) {
    var removeAtIndex = -1;
    Helpers.clog("Removing color variable " + colorVariableToRemove.name);

    for (var i = 0; i < Helpers.document.swatches.length; i++) {
      if (Helpers.document.swatches[i].id == colorVariableToRemove.id) removeAtIndex = i;
    }

    if (removeAtIndex > -1) Helpers.document.swatches.splice(removeAtIndex, 1);
  });
  return {
    "layersUpdated": layersChangedCounter,
    "layerStylesUpdated": stylesChangedCounter[0],
    "textStylesUpdated": stylesChangedCounter[1]
  };
}

function doUseColorSwatchesInLayers(colorVariable, colorVariablesToRemove) {
  // When you open an existing document in Sketch 69, the color assets in the document will be migrated to Color Swatches. However, layers using those colors will not be changed to use the new swatches. This plugin takes care of this
  var allLayers = sketch.find('*'); // TODO: optimise this query: ShapePath, SymbolMaster, Text, SymbolInstance

  var map = new Map();
  allLayers.forEach(function (layer) {
    layer.style.fills.concat(layer.style.borders).filter(function (item) {
      return item.fillType == 'Color';
    }).forEach(function (item) {
      colorVariablesToRemove.forEach(function (cvToRemove) {
        if (item.color == cvToRemove.color) {
          item.color = colorVariable.referencingColor;
          if (!map.has(layer)) map.set(layer, true);
        }
      });
    }); // Previous actions don't work for Text Layer colors that are colored using TextColor, so let's fix that:

    if (layer.style.textColor) {
      colorVariablesToRemove.forEach(function (cvToRemove) {
        if (layer.style.textColor == cvToRemove.color) layer.style.textColor = colorVariable.referencingColor;
      });
    }
  });
  Helpers.clog("Affected layers " + map.size);
  return map.size;
}

function doUseColorSwatchesInStyles(colorVariable, colorVariablesToRemove) {
  // This method traverses all Layer and Text Styles, and makes sure they use Color Swatches that exist in the document.
  var stylesCanBeUpdated = [];
  var lsMap = new Map();
  var tsMap = new Map();
  var allLayerStyles = Helpers.document.sharedLayerStyles;
  allLayerStyles.forEach(function (style) {
    var styleAffected = false;
    style.getAllInstances().forEach(function (styleInstance) {
      if (!styleInstance.isOutOfSyncWithSharedStyle(style)) {
        stylesCanBeUpdated.push({
          instance: styleInstance,
          style: style
        });
      }
    });
    style.style.fills.concat(style.style.borders).forEach(function (item) {
      if (item.fillType == 'Color') {
        colorVariablesToRemove.forEach(function (cvToRemove) {
          if (item.color == cvToRemove.color) {
            item.color = colorVariable.referencingColor;
            if (!lsMap.has(style)) lsMap.set(style, true);
          }
        });
      }
    }); // TODO: This could also work with gradients...
  });
  var allTextStyles = Helpers.document.sharedTextStyles;
  allTextStyles.forEach(function (style) {
    var styleAffected = false;
    style.getAllInstances().forEach(function (styleInstance) {
      if (!styleInstance.isOutOfSyncWithSharedStyle(style)) {
        stylesCanBeUpdated.push({
          instance: styleInstance,
          style: style
        });
      }
    });
    var currentStyle = style.style;
    colorVariablesToRemove.forEach(function (cvToRemove) {
      if (currentStyle.textColor == cvToRemove.color) {
        currentStyle.textColor = colorVariable.referencingColor;
        if (!tsMap.has(style)) tsMap.set(style, true);
      }
    });
  }); // Finally, update all layers that use a style we updated...

  stylesCanBeUpdated.forEach(function (pair) {
    pair.instance.syncWithSharedStyle(pair.style);
  });
  Helpers.clog("Affected layer styles mapsize:" + lsMap.size);
  Helpers.clog("Affected text styles mapsize:" + tsMap.size);
  return [lsMap.size, tsMap.size];
}

function MergeDuplicateColorVariables(context) {
  Helpers.clog("----- Merge duplicate color variables -----");
  var options = {
    identifier: webviewMDCVIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  var webContents = browserWindow.webContents;
  var onlyDuplicatedColorVariables;
  var mergeSession = [];
  CalculateDuplicates(Helpers.getLibrariesEnabled());

  if (onlyDuplicatedColorVariables.length > 0) {
    browserWindow.loadURL(__webpack_require__(/*! ../resources/mergeduplicatecolorvariables.html */ "./resources/mergeduplicatecolorvariables.html"));
  } else {
    UI.message("Looks like there are no color variables with the same name.");
    onShutdown(webviewMDCVIdentifier);
  }

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Finding duplicate color variables. Including libraries:" + includeLibraries);
    onlyDuplicatedColorVariables = Helpers.getDuplicateColorVariables(context, includeLibraries);

    if (onlyDuplicatedColorVariables.length > 0) {
      mergeSession = [];

      for (var i = 0; i < onlyDuplicatedColorVariables.length; i++) {
        mergeSession.push({
          "colorVariableWithDuplicates": onlyDuplicatedColorVariables[i],
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
    webContents.executeJavaScript("DrawColorVariablesList(".concat(JSON.stringify(mergeSession), ", ").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewMDCVIdentifier);
  });
  webContents.on('RecalculateDuplicates', function (includeLibraries) {
    Helpers.clog("Recalculating duplicates");
    CalculateDuplicates(includeLibraries);
    webContents.executeJavaScript("DrawColorVariablesList(".concat(JSON.stringify(mergeSession), ")")).catch(console.error);
  });
  webContents.on('GetSelectedStyleData', function (index) {
    //Helpers.GetSpecificLayerStyleData(context, onlyDuplicatedColorVariables, index);
    webContents.executeJavaScript("ReDrawAfterGettingData(".concat(JSON.stringify(mergeSession[index].colorVariableWithDuplicates), ",").concat(index, ")")).catch(console.error);
  });
  webContents.on('ExecuteMerge', function (editedMergeSession) {
    Helpers.clog("Executing Merge");
    var variablesSolved = 0;
    var affected = {
      "layersUpdated": 0,
      "layerStylesUpdated": 0,
      "textStylesUpdated": 0
    };

    for (var i = 0; i < editedMergeSession.length; i++) {
      Helpers.clog("-- Merging " + mergeSession[i].colorVariableWithDuplicates.name);

      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        currentSelectedColorVariables = [];

        for (var j = 0; j < mergeSession[i].colorVariableWithDuplicates.duplicates.length; j++) {
          currentSelectedColorVariables.push(mergeSession[i].colorVariableWithDuplicates.duplicates[j]);
        }

        var results = MergeColorVariables(context, editedMergeSession[i].selectedIndex);
        affected.layersUpdated += results.layersUpdated;
        affected.layerStylesUpdated += results.layerStylesUpdated;
        affected.textStylesUpdated += results.textStylesUpdated;
        variablesSolved++;
      }
    }

    onShutdown(webviewMDCVIdentifier);

    if (variablesSolved <= 0) {
      Helpers.clog("No color variables were merged");
      UI.message("No color variables were merged");
    } else {
      var message = GetMergeResultMessage(affected.layersUpdated, affected.layerStylesUpdated, affected.textStylesUpdated);
      Helpers.clog(message);
      UI.message(message);
    }
  });
}
;
function MergeSelectedColorVariables(context) {
  Helpers.clog("----- Merge selected color variables -----");
  var options = {
    identifier: webviewMCVFLIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  var webContents = browserWindow.webContents;
  var definedColorVariables;
  var definedAllColorVariables;
  var colorVariableCounter = 0;

  if (!Helpers.getLibrariesEnabled()) {
    Helpers.clog("Get local color variables list");
    definedColorVariables = Helpers.getDefinedColorVariables(context, false);
    colorVariableCounter = definedColorVariables.length;
    checkingAlsoLibraries = false;
  }

  if (Helpers.getLibrariesEnabled()) {
    Helpers.clog("Get all (including libraries) color variables list");
    definedAllColorVariables = Helpers.getDefinedColorVariables(context, true);
    colorVariableCounter = definedAllColorVariables.length;
    checkingAlsoLibraries = true;
  }

  if (colorVariableCounter > 1) {
    browserWindow.loadURL(__webpack_require__(/*! ../resources/mergecolorvariablesfromlist.html */ "./resources/mergecolorvariablesfromlist.html"));
  } else {
    if (colorVariableCounter == 1) UI.message("There's only 1 color variable. No need to merge.");else UI.message("Looks like there are no color variables.");
    onShutdown(webviewMCVFLIdentifier);
  }

  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    if (!Helpers.getLibrariesEnabled()) webContents.executeJavaScript("DrawColorVariableList(".concat(JSON.stringify(definedColorVariables), ",").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);else webContents.executeJavaScript("DrawColorVariableList(".concat(JSON.stringify(definedAllColorVariables), ",").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('GetLocalColorVariablesList', function () {
    Helpers.clog("Get local color variables list");
    if (definedColorVariables == null) definedColorVariables = Helpers.getDefinedColorVariables(context, false);
    checkingAlsoLibraries = false;
    webContents.executeJavaScript("DrawColorVariableList(".concat(JSON.stringify(definedColorVariables), ")")).catch(console.error);
  });
  webContents.on('GetAllColorVariablesList', function () {
    Helpers.clog("Get all (including libraries) color variables list");
    if (definedAllColorVariables == null) definedAllColorVariables = Helpers.getDefinedColorVariables(context, true);
    checkingAlsoLibraries = true;
    webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(definedAllColorVariables), ")")).catch(console.error);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewMCVFLIdentifier);
  });
  webContents.on('ExecuteMerge', function (editedGlobalColorVariables) {
    Helpers.clog("Executing Merge");
    currentSelectedColorVariables = [];
    var selectedIndex = -1;
    var counter = 0;

    if (!checkingAlsoLibraries) {
      for (var i = 0; i < definedColorVariables.length; i++) {
        definedColorVariables[i].isSelected = editedGlobalColorVariables[i].isSelected;
        definedColorVariables[i].isChosen = editedGlobalColorVariables[i].isChosen;
        if (editedGlobalColorVariables[i].isChosen) selectedIndex = counter;

        if (editedGlobalColorVariables[i].isSelected) {
          currentSelectedColorVariables.push(definedColorVariables[i]);
          counter++;
        }
      }
    } else {
      for (var i = 0; i < definedAllColorVariables.length; i++) {
        definedAllColorVariables[i].isSelected = editedGlobalColorVariables[i].isSelected;
        definedAllColorVariables[i].isChosen = editedGlobalColorVariables[i].isChosen;
        if (editedGlobalColorVariables[i].isChosen) selectedIndex = counter;

        if (editedGlobalColorVariables[i].isSelected) {
          currentSelectedColorVariables.push(definedAllColorVariables[i]);
          counter++;
        }
      }
    }

    var affected = MergeColorVariables(context, selectedIndex);
    var message = GetMergeResultMessage(affected.layersUpdated, affected.layerStylesUpdated, affected.textStylesUpdated);
    Helpers.clog(message);
    UI.message(message);
    onShutdown(webviewMCVFLIdentifier);
  });
}
;
function MergeSimilarColorVariables(context) {
  Helpers.clog("----- Merge similar color variables -----");
  var options = {
    identifier: webviewMSCVIdentifier,
    width: 1200,
    height: 700,
    show: false,
    remembersWindowFrame: true,
    titleBarStyle: 'hidden'
  };
  var browserWindow = new sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default.a(options);
  var webContents = browserWindow.webContents;
  var colorVariablesWithSimilarColorVariables;
  Helpers.clog("Loading webview");
  browserWindow.loadURL(__webpack_require__(/*! ../resources/mergesimilarcolorvariables.html */ "./resources/mergesimilarcolorvariables.html"));
  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript("UpdateSettings(".concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
    colorVariablesWithSimilarColorVariables = Helpers.FindAllSimilarColorVariables(context, Helpers.getLibrariesEnabled(), 30);
    webContents.executeJavaScript("DrawResultsList(".concat(JSON.stringify(colorVariablesWithSimilarColorVariables), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewMSCVIdentifier);
  });
  webContents.on('ExecuteMerge', function (editedColorVariablesWithSimilarColorVariables) {
    Helpers.clog("Execute merge");
    var variablesSolved = 0;
    var affected = {
      "layersUpdated": 0,
      "layerStylesUpdated": 0,
      "textStylesUpdated": 0
    };

    for (var i = 0; i < editedColorVariablesWithSimilarColorVariables.length; i++) {
      if (!editedColorVariablesWithSimilarColorVariables[i].isUnchecked && editedColorVariablesWithSimilarColorVariables[i].selectedIndex >= 0) {
        currentSelectedColorVariables = [];

        for (var j = 0; j < editedColorVariablesWithSimilarColorVariables[i].similarStyles.length; j++) {
          currentSelectedColorVariables.push(colorVariablesWithSimilarColorVariables[i].similarStyles[j]);
        }

        var results = MergeColorVariables(context, editedColorVariablesWithSimilarColorVariables[i].selectedIndex);
        affected.layersUpdated += results.layersUpdated;
        affected.layerStylesUpdated += results.layerStylesUpdated;
        affected.textStylesUpdated += results.textStylesUpdated;
        variablesSolved++;
      }
    }

    onShutdown(webviewMSCVIdentifier);

    if (variablesSolved <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    } else {
      var message = GetMergeResultMessage(affected.layersUpdated, affected.layerStylesUpdated, affected.textStylesUpdated);
      Helpers.clog(message);
      UI.message(message);
    }
  });
  webContents.on('RecalculateVariables', function (includeAllLibraries, tolerance) {
    Helpers.clog("Recalculate similar variables with tolerance: " + tolerance);
    colorVariablesWithSimilarColorVariables = Helpers.FindAllSimilarColorVariables(context, includeAllLibraries, tolerance);
    webContents.executeJavaScript("DrawResultsList(".concat(JSON.stringify(colorVariablesWithSimilarColorVariables), ")")).catch(console.error);
  });
}
;

function GetMergeResultMessage(layersUpdated, layerStylesUpdated, textStylesUpdated) {
  var message = "Wow how! ";
  if (layersUpdated > 0 && layerStylesUpdated + textStylesUpdated == 0) message += "We updated " + layersUpdated + " layer" + (layersUpdated > 1 ? "s" : "") + ", and no styles. Awesome!";else if (layersUpdated > 0 && layerStylesUpdated + textStylesUpdated > 0) message += "We updated " + layersUpdated + " layer" + (layersUpdated > 1 ? "s" : "") + ", and " + (layerStylesUpdated + textStylesUpdated) + " style" + (layerStylesUpdated + textStylesUpdated > 1 ? "s" : "") + ". Awesome!";else if (layersUpdated == 0 && layerStylesUpdated + textStylesUpdated > 0) message += "We updated " + (layerStylesUpdated + textStylesUpdated) + " style" + (layerStylesUpdated + textStylesUpdated > 1 ? "s" : "") + ", and no layers. Awesome!";else message += "We completed the merge. There were no layers or styles to update, though.";
  return message;
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



var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Helpers = __webpack_require__(/*! ./Helpers */ "./src/Helpers.js");

var webviewIdentifier = 'merge-duplicates.webview';
var webviewMSSIdentifier = 'merge-selected-symbols.webview';

function MergeSymbols(symbolToMerge, symbolToKeep, basePercent, totalToMerge, webContents) {
  Helpers.clog("-- Starting Merge Symbols (" + symbolToMerge.duplicates.length + ")");
  var symbolsToRemove = [];
  var symbolToApply;
  var instancesChanged = 0;
  var overridesChanged = 0;
  var symbolsRemoved = 0;
  var idsMap = new Map();
  Helpers.clog("---- Processing symbols to remove");
  symbolToApply = symbolToMerge.duplicates[symbolToKeep].symbol;

  if (symbolToMerge.duplicates[symbolToKeep].isForeign) {
    var alreadyInDoc = Helpers.document.getSymbols().filter(function (sym) {
      return sym.symbolId.localeCompare(symbolToApply.symbolId) == 0;
    }).length > 0;
    if (!alreadyInDoc) symbolToApply = Helpers.importSymbolFromLibrary(symbolToMerge.duplicates[symbolToKeep]);
  }

  var tasksToPerform = 0,
      tasksExecuted = 0;
  var instancesToChange = 0,
      overridesToChange = 0;
  var instOverMap = new Map();
  Helpers.clog("---- Getting all related symbols instances and overrides");

  for (var i = 0; i < symbolToMerge.duplicates.length; i++) {
    if (i != symbolToKeep) {
      idsMap.set(symbolToMerge.duplicates[i].symbol.symbolId);
      symbolsToRemove.push(symbolToMerge.duplicates[i].symbol);
      var instancesOfSymbol = Helpers.getSymbolInstances(symbolToMerge.duplicates[i].symbol);
      var symbolOverrides = Helpers.getSymbolOverrides(symbolToMerge.duplicates[i].symbol, idsMap);
      instOverMap.set(symbolToMerge.duplicates[i], {
        "instancesOfSymbol": instancesOfSymbol,
        "symbolOverrides": symbolOverrides
      });
      instancesToChange += instancesOfSymbol.length;
      overridesToChange += symbolOverrides.length;
    }
  }

  tasksToPerform = instancesToChange + overridesToChange;
  Helpers.ctime("Merging symbol:" + symbolToMerge.name);
  webContents.executeJavaScript("ShowMergeProgress()").catch(console.error);

  for (var i = 0; i < symbolToMerge.duplicates.length; i++) {
    if (i != symbolToKeep) {
      if (!symbolToMerge.duplicates[i].isForeign) symbolsRemoved++;
      Helpers.ctime("-- Taking instances and overrides");
      var instancesOfSymbol = instOverMap.get(symbolToMerge.duplicates[i]).instancesOfSymbol;
      var symbolOverrides = instOverMap.get(symbolToMerge.duplicates[i]).symbolOverrides;
      Helpers.ctimeEnd("-- Taking instances and overrides");
      Helpers.ctime("-- Unlinking from library");
      Helpers.clog("------ Checking if symbol to merge is foreign");

      if (symbolToMerge.duplicates[i].isForeign && symbolToMerge.duplicates[i].externalLibrary == null) {
        symbolToMerge.duplicates[i].symbol.unlinkFromLibrary();
      }

      Helpers.ctimeEnd("-- Unlinking from library");
      var message = "Merging " + symbolToMerge.name;
      Helpers.ctime("-- Updating overrides");
      Helpers.clog("---- Updating overrides (" + symbolOverrides.length + ")");
      symbolOverrides.forEach(function (override) {
        try {
          Helpers.clog("------ Updating override for " + override.instance.name);
          override.instance.setOverrideValue(override.override, symbolToApply.symbolId.toString());
          overridesChanged++;
          tasksExecuted++;
          var progress = Math.floor(basePercent + tasksExecuted * 100 / tasksToPerform / totalToMerge);
          var message2 = "Updating overrides (" + overridesChanged + " of " + overridesToChange + ")";
          webContents.executeJavaScript("UpdateMergeProgress(".concat(progress, ", ").concat(JSON.stringify(message), ", ").concat(JSON.stringify(message2), ")")).catch(console.error);
        } catch (e) {
          Helpers.clog("---- ERROR: Couldn't update override for " + override.instance.name);
          Helpers.clog(e);
        }
      });
      Helpers.ctimeEnd("-- Updating overrides");
      Helpers.ctime("-- Updating instances");
      Helpers.clog("---- Updating instances (" + instancesOfSymbol.length + ")");
      instancesOfSymbol.forEach(function (instance) {
        try {
          Helpers.clog("------ Updating instance " + instance.name + ", in artboard " + instance.getParentArtboard().name);
        } catch (e) {
          Helpers.clog("------ Updating instance " + instance.name + ". Instance doesn't belong to any specific artboard.");
        }

        instance.master = symbolToApply;
        tasksExecuted++;
        instancesChanged++;
        var progress = Math.floor(basePercent + tasksExecuted * 100 / tasksToPerform / totalToMerge);
        var message2 = "Updating instances (" + instancesChanged + " of " + instancesToChange + ")";
        webContents.executeJavaScript("UpdateMergeProgress(".concat(progress, ", ").concat(JSON.stringify(message), ", ").concat(JSON.stringify(message2), ")")).catch(console.error);
      });
      Helpers.ctimeEnd("-- Updating instances");
    }
  }

  Helpers.ctimeEnd("Merging symbol:" + symbolToMerge.name);
  Helpers.clog("---- Finalized intance and override replacement.");
  Helpers.clog("---- Removing discarded symbols.");
  symbolsToRemove.forEach(function (symbolToRemove) {
    symbolToRemove.remove();
  });
  Helpers.clog("---- Merge completed.");
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
  var selectedLayers = Helpers.document.selectedLayers.layers;
  var selection = [];

  if (selectedLayers.length < 2) {
    UI.message("Wop! Select at least two symbols and run the plugin again :)");
    onShutdown(webviewMSSIdentifier);
  } else {
    var areAllSymbols = true;
    selectedLayers.forEach(function (layer) {
      if (layer.type.localeCompare("SymbolMaster") != 0) areAllSymbols = false;
    });

    if (!areAllSymbols) {
      UI.message("Only symbols can be merged");
    } else {
      Helpers.clog("Loading webview");
      selectedLayers.forEach(function (layer) {
        selection.push({
          "symbol": layer,
          "foreign": false,
          "library": null
        });
      });
      browserWindow.loadURL(__webpack_require__(/*! ../resources/mergeselectedsymbols.html */ "./resources/mergeselectedsymbols.html"));
    }
  }

  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript("LaunchMerge(".concat(JSON.stringify(selection.length), ")")).catch(console.error);
  });
  webContents.on('GetSymbolData', function () {
    Helpers.clog("Getting session data");
    mssmergeSession = [];
    mssmergeSession = Helpers.getSelectedSymbolsSession(selection);
    Helpers.clog("Acquired merge session data");
    var reducedMergeSession = Helpers.getReducedSymbolsSession(mssmergeSession);
    Helpers.clog("Acquired reduced merge session data");
    webContents.executeJavaScript("DrawSymbolList(".concat(JSON.stringify(reducedMergeSession), ")")).catch(console.error);
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
    mergeResults = MergeSymbols(mssmergeSession[0], selectedIndex, 0, 1, webContents);
    var replacedStuff = "";
    if (mergeResults[1] > 0 && mergeResults[2]) replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";else if (mergeResults[1] > 0) replacedStuff = " and replaced " + mergeResults[1] + " instances.";else if (mergeResults[2] > 0) replacedStuff = " and updated " + mergeResults[2] + " overrides.";else replacedStuff = ".";
    Helpers.clog("Completed merge. Removed " + mergeResults[0] + " symbols" + replacedStuff);
    UI.message("Hey ho! You just removed " + mergeResults[0] + " symbols" + replacedStuff + " Amazing!");
    onShutdown(webviewMSSIdentifier);
    Helpers.clog("Closed window");
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
  var mergeSession = [];
  var mergeSessionMap = new Map();
  var symbolsMap, allDuplicates;
  Helpers.ctime("countAllSymbols");
  var numberOfSymbols = Helpers.countAllSymbols(context, Helpers.getLibrariesEnabled());
  Helpers.ctimeEnd("countAllSymbols");
  Helpers.clog("Local symbols: " + numberOfSymbols.symbols + ". Library symbols:" + numberOfSymbols.foreignSymbols + ". Document instances:" + numberOfSymbols.documentInstances + ". Libraries enabled:" + Helpers.getLibrariesEnabled());
  browserWindow.loadURL(__webpack_require__(/*! ../resources/mergeduplicatesymbols.html */ "./resources/mergeduplicatesymbols.html"));
  Helpers.clog("Webview called");

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Processing duplicates. Include libraries: " + includeLibraries);
    Helpers.ctime("Finding duplicates");
    allDuplicates = Helpers.getAllDuplicateSymbolsByName(context, includeLibraries);
    Helpers.ctimeEnd("Finding duplicates");
    Helpers.clog("Getting symbols map");
    Helpers.ctime("getSymbolsMap");
    symbolsMap = Helpers.getSymbolsMap(context, allDuplicates);
    Helpers.ctimeEnd("getSymbolsMap");
    Helpers.clog("-- Found " + allDuplicates.length + " duplicates");

    if (allDuplicates.length > 0) {
      mergeSession = [];
      Helpers.GetSpecificSymbolData(allDuplicates[0], symbolsMap);
      allDuplicates.forEach(function (duplicate) {
        var reducedSymbol = Helpers.getReducedDuplicateData(duplicate);
        mergeSessionMap.set(reducedSymbol, duplicate);
        mergeSession.push({
          "symbolWithDuplicates": reducedSymbol,
          "selectedIndex": -1,
          "isUnchecked": false,
          "isProcessed": mergeSession.length == 0
        });
      });
    }

    Helpers.clog("End of processing duplicates");
  }

  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript("LaunchMerge(".concat(JSON.stringify(numberOfSymbols.symbols), ",").concat(JSON.stringify(numberOfSymbols.foreignSymbols), ",").concat(JSON.stringify(numberOfSymbols.documentInstances), ",").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewIdentifier);
  });
  webContents.on('GetSelectedSymbolData', function (index) {
    Helpers.GetSpecificSymbolData(allDuplicates[index], symbolsMap);
    var stringify = JSON.stringify(Helpers.getReducedDuplicateData(allDuplicates[index]));
    webContents.executeJavaScript("ReDrawAfterGettingData(".concat(stringify, ",").concat(index, ")")).catch(console.error);
  });
  webContents.on('RecalculateDuplicates', function (includeLibraries, index) {
    if (includeLibraries != null) CalculateDuplicates(includeLibraries);else CalculateDuplicates(Helpers.getLibrariesEnabled());
    Helpers.clog("Drawing duplicates to webview");
    var stringify = JSON.stringify(mergeSession);
    webContents.executeJavaScript("DrawDuplicateSymbols(".concat(stringify, ", 0)")).catch(console.error);
  });
  webContents.on('ExecuteMerge', function (editedMergeSession) {
    var duplicatesSolved = 0;
    var mergedSymbols = 0;
    var mergeResults = [0, 0, 0];
    Helpers.clog("Executing Merge");
    var totalToMerge = editedMergeSession.filter(function (ems) {
      return !ems.isUnchecked && ems.selectedIndex >= 0;
    }).length;

    for (var i = 0; i < editedMergeSession.length; i++) {
      Helpers.clog("-- Merging " + mergeSession[i].symbolWithDuplicates.name);

      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        mergedSymbols += mergeSession[i].symbolWithDuplicates.duplicates.length;
        var mergeobject = mergeSessionMap.get(mergeSession[i].symbolWithDuplicates);
        var basePercent = duplicatesSolved * 100 / editedMergeSession.length;
        var localMergeResults = MergeSymbols(mergeobject, mergeSession[i].selectedIndex, basePercent, totalToMerge, webContents);
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
      UI.message("Hey ho! You just removed " + mergeResults[0] + " symbols" + replacedStuff + " Amazing!");
    } else {
      Helpers.clog("Completed merge. No symbols were merged.");
      UI.message("No symbols were merged.");
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
/*! exports provided: MergeDuplicateLayerStyles, MergeSelectedLayerStyles, MergeSimilarLayerStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeDuplicateLayerStyles", function() { return MergeDuplicateLayerStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSelectedLayerStyles", function() { return MergeSelectedLayerStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSimilarLayerStyles", function() { return MergeSimilarLayerStyles; });
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-module-web-view/remote */ "./node_modules/sketch-module-web-view/remote.js");
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__);



var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Helpers = __webpack_require__(/*! ./Helpers */ "./src/Helpers.js");

var webviewMLSFLIdentifier = 'merge-layerstylesfromlist.webview';
var webviewMDLSIdentifier = 'merge-duplicatelayerstyles.webview';
var webviewMSLSIdentifier = 'merge-similarlayerstyles.webview';
var checkingAlsoLibraries = false;

function MergeLayerStyles(stylesToMerge, styleToKeep, basePercent, totalToMerge, webContents) {
  Helpers.clog("-- Starting Merge Layer Styles (" + stylesToMerge.length + "). Style to keep is:" + styleToKeep);
  var stylesToRemove = [];
  var styleToApply;
  var instancesChanged = 0;
  var overridesChanged = 0;
  var stylesRemoved = 0;
  var idsMap = new Map();
  Helpers.clog("---- Processing styles to remove");
  styleToApply = stylesToMerge[styleToKeep].layerStyle;

  if (stylesToMerge[styleToKeep].isForeign) {
    var alreadyInDoc = Helpers.document.sharedLayerStyles.filter(function (ls) {
      return ls.id == stylesToMerge[styleToKeep].layerStyle.id;
    }).length > 0;
    if (!alreadyInDoc) styleToApply = Helpers.importLayerStyleFromLibrary(stylesToMerge[styleToKeep]);
  }

  var tasksToPerform = 0,
      tasksExecuted = 0;
  var progress = basePercent;
  var instancesToChange = 0,
      overridesToChange = 0;
  var instOverMap = new Map();
  Helpers.clog("---- Getting all related styles instances and overrides");

  for (var i = 0; i < stylesToMerge.length; i++) {
    if (i != styleToKeep) {
      idsMap.set(stylesToMerge[i].layerStyle.id);
      stylesToRemove.push(stylesToMerge[i].layerStyle);
      var instancesOfStyle = Helpers.getLayerStyleInstances(stylesToMerge[i].layerStyle);
      var styleOverrides = Helpers.getLayerStyleOverrides(stylesToMerge[i].layerStyle, idsMap);
      instOverMap.set(stylesToMerge[i], {
        "instancesOfStyle": instancesOfStyle,
        "styleOverrides": styleOverrides
      });
      instancesToChange += instancesOfStyle.length;
      overridesToChange += styleOverrides.length;
    }
  }

  tasksToPerform = instancesToChange + overridesToChange;
  Helpers.ctime("Merging layer style:" + stylesToMerge[styleToKeep].name);
  webContents.executeJavaScript("ShowMergeProgress()").catch(console.error);

  for (var i = 0; i < stylesToMerge.length; i++) {
    if (i != styleToKeep) {
      if (!stylesToMerge[i].isForeign) stylesRemoved++;
      Helpers.ctime("-- Taking instances and overrides");
      var instancesOfStyle = instOverMap.get(stylesToMerge[i]).instancesOfStyle;
      var styleOverrides = instOverMap.get(stylesToMerge[i]).styleOverrides;
      Helpers.ctimeEnd("-- Taking instances and overrides");
      Helpers.ctime("-- Unlinking from library");
      Helpers.clog("------ Checking if symbol to merge is foreign");

      if (stylesToMerge[i].isForeign) {
        stylesToMerge[i].layerStyle.unlinkFromLibrary();
      }

      Helpers.ctimeEnd("-- Unlinking from library");
      var message = "Merging " + stylesToMerge[styleToKeep].name;
      Helpers.ctime("-- Updating overrides");
      Helpers.clog("---- Updating overrides (" + styleOverrides.length + ")");
      styleOverrides.forEach(function (override) {
        try {
          Helpers.clog("------ Updating override for " + override.instance.name);
          override.instance.setOverrideValue(override.override, styleToApply.id.toString());
          overridesChanged++;
          tasksExecuted++;
          progress = Math.floor(basePercent + tasksExecuted * 100 / tasksToPerform / totalToMerge);
          var message2 = "Updating overrides (" + overridesChanged + " of " + overridesToChange + ")";
          webContents.executeJavaScript("UpdateMergeProgress(".concat(progress, ", ").concat(JSON.stringify(message), ", ").concat(JSON.stringify(message2), ")")).catch(console.error);
        } catch (e) {
          Helpers.clog("---- ERROR: Couldn't update override for " + override.instance.name);
          Helpers.clog(e);
        }
      });
      Helpers.ctimeEnd("-- Updating overrides");
      Helpers.ctime("-- Updating instances");
      Helpers.clog("---- Updating instances (" + instancesOfStyle.length + ")");
      instancesOfStyle.forEach(function (instance) {
        try {
          Helpers.clog("------ Updating instance " + instance.name + ", in artboard " + instance.getParentArtboard().name);
        } catch (e) {
          Helpers.clog("------ Updating instance " + instance.name + ". Instance doesn't belong to any specific artboard.");
        }

        instance.sharedStyle = styleToApply;
        instance.style.syncWithSharedStyle(styleToApply);
        tasksExecuted++;
        instancesChanged++;
        progress = Math.floor(basePercent + tasksExecuted * 100 / tasksToPerform / totalToMerge);
        var message2 = "Updating instances (" + instancesChanged + " of " + instancesToChange + ")";
        webContents.executeJavaScript("UpdateMergeProgress(".concat(progress, ", ").concat(JSON.stringify(message), ", ").concat(JSON.stringify(message2), ")")).catch(console.error);
      });
      Helpers.ctimeEnd("-- Updating instances");
    }
  }

  Helpers.ctimeEnd("Merging layer style:" + stylesToMerge[styleToKeep].name);
  Helpers.clog("---- Finalized instance and override replacement.");
  var sharedStylesToRemove = Helpers.document.sharedLayerStyles.filter(function (sharedStyle) {
    return isMarkedForRemove(sharedStyle, stylesToRemove);
  });
  Helpers.clog("---- Removing discarded layer styles (" + sharedStylesToRemove.length + ").");
  webContents.executeJavaScript("UpdateMergeProgress(".concat(progress, ", ").concat(JSON.stringify(message), ", \"Removing discarded layer styles\")")).catch(console.error);
  Helpers.ctime("Removing discarded styles");
  sharedStylesToRemove.forEach(function (sharedStyleToRemove) {
    Helpers.clog("------ Removing " + sharedStyleToRemove.name + " (" + sharedStyleToRemove.id + ") from sharedLayerStyles.");
    sharedStyleToRemove.unlinkFromLibrary();
    Helpers.clog("-------- Unlinked from library.");
    var styleIndex = Helpers.document.sharedLayerStyles.findIndex(function (sL) {
      return sL.id == sharedStyleToRemove.id;
    });
    Helpers.clog("-------- Located in sharedLayerStyles (" + styleIndex + ").");
    Helpers.document.sharedLayerStyles.splice(styleIndex, 1);
    Helpers.clog("-------- Removed from sharedLayerStyles.");
  });
  Helpers.ctimeEnd("Removing discarded styles");
  Helpers.clog("---- Merge completed.");
  return [stylesRemoved, instancesChanged, overridesChanged];
}

function isMarkedForRemove(sharedLayerStyle, stylesToRemove) {
  var redId1 = sharedLayerStyle.style.id;
  var redId2 = sharedLayerStyle.id.indexOf("[") >= 0 ? sharedLayerStyle.id.substring(sharedLayerStyle.id.indexOf("[") + 1, sharedLayerStyle.id.length - 1) : null;
  return stylesToRemove.filter(function (str) {
    return str.id == sharedLayerStyle.id || str.id == redId1 || str.id == redId2;
  }).length > 0;
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
  var onlyDuplicatedLayerStyles, layerStylesMap;
  var mergeSession = [];
  var mergeSessionMap = new Map();
  CalculateDuplicates(Helpers.getLibrariesEnabled());

  if (onlyDuplicatedLayerStyles.length > 0) {
    browserWindow.loadURL(__webpack_require__(/*! ../resources/mergeduplicatelayerstyles.html */ "./resources/mergeduplicatelayerstyles.html"));
  } else {
    UI.message("Looks like there are no layer styles with the same name.");
    onShutdown(webviewMDLSIdentifier);
  }

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Finding duplicate layer styles. Including libraries:" + includeLibraries);
    onlyDuplicatedLayerStyles = Helpers.getAllDuplicateLayerStylesByName(context, includeLibraries);
    layerStylesMap = Helpers.getLayerStylesMap(context, onlyDuplicatedLayerStyles);

    if (onlyDuplicatedLayerStyles.length > 0) {
      Helpers.GetSpecificLayerStyleData(onlyDuplicatedLayerStyles[0], layerStylesMap);
      mergeSession = [];
      onlyDuplicatedLayerStyles.forEach(function (duplicate) {
        var reducedStyle = Helpers.getReducedLayerStyleData(duplicate);
        mergeSessionMap.set(reducedStyle, duplicate);
        mergeSession.push({
          "layerStyleWithDuplicates": reducedStyle,
          "selectedIndex": -1,
          "isUnchecked": false,
          "isProcessed": mergeSession.length == 0
        });
      });
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
    Helpers.GetSpecificLayerStyleData(onlyDuplicatedLayerStyles[index], layerStylesMap);
    var stringify = JSON.stringify(Helpers.getReducedLayerStyleData(onlyDuplicatedLayerStyles[index]));
    webContents.executeJavaScript("ReDrawAfterGettingData(".concat(stringify, ",").concat(index, ")")).catch(console.error);
  });
  webContents.on('ExecuteMerge', function (editedMergeSession) {
    Helpers.clog("Executing Merge");
    var duplicatesSolved = 0;
    var mergeResults = [0, 0, 0];
    var totalToMerge = editedMergeSession.filter(function (ems) {
      return !ems.isUnchecked && ems.selectedIndex >= 0;
    }).length;

    for (var i = 0; i < editedMergeSession.length; i++) {
      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        Helpers.clog("-- Merging " + mergeSession[i].layerStyleWithDuplicates.name);
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        var mergeobject = mergeSessionMap.get(mergeSession[i].layerStyleWithDuplicates);
        var basePercent = duplicatesSolved * 100 / editedMergeSession.length;
        var localMergeResults = MergeLayerStyles(mergeobject.duplicates, mergeSession[i].selectedIndex, basePercent, totalToMerge, webContents);
        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];
        duplicatesSolved++;
      }
    }

    onShutdown(webviewMDLSIdentifier);

    if (mergeResults[0] <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    } else {
      var replacedStuff = "";
      if (mergeResults[1] > 0 && mergeResults[2]) replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";else if (mergeResults[1] > 0) replacedStuff = " and replaced " + mergeResults[1] + " instances.";else if (mergeResults[2] > 0) replacedStuff = " and updated " + mergeResults[2] + " overrides.";else replacedStuff = ".";
      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " layer styles" + replacedStuff);
      UI.message("Hey ho! You just removed " + mergeResults[0] + " layer styles" + replacedStuff + " Amazing!");
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
  var allLayerStyles;
  var styleCounter = 0;
  Helpers.clog("Get layer styles list. Libraries included:" + Helpers.getLibrariesEnabled());
  allLayerStyles = Helpers.getAllLayerStyles(Helpers.getLibrariesEnabled());
  styleCounter = allLayerStyles.length;
  checkingAlsoLibraries = Helpers.getLibrariesEnabled();
  Helpers.clog("allLayerStyles:" + allLayerStyles.length);

  if (styleCounter > 1) {
    browserWindow.loadURL(__webpack_require__(/*! ../resources/mergelayerstylesfromlist.html */ "./resources/mergelayerstylesfromlist.html"));
  } else {
    if (styleCounter == 1) UI.message("There's only 1 layer style. No need to merge.");else UI.message("Looks like there are no layer styles.");
    onShutdown(webviewMLSFLIdentifier);
  }

  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(allLayerStyles), ",").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('GetStylesList', function (librariesEnabled) {
    Helpers.clog("Get styles list");
    allLayerStyles = Helpers.getAllLayerStyles(librariesEnabled);
    checkingAlsoLibraries = librariesEnabled;
    webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(allLayerStyles), ")")).catch(console.error);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewMLSFLIdentifier);
  });
  webContents.on('ExecuteMerge', function (editedGlobalLayerStyles) {
    Helpers.clog("Executing Merge");
    var selectedIndex = -1;
    var stylesToMerge = []; //Create merge structure

    for (var i = 0; i < allLayerStyles.length; i++) {
      allLayerStyles[i].isSelected = editedGlobalLayerStyles[i].isSelected;
      allLayerStyles[i].isChosen = editedGlobalLayerStyles[i].isChosen;

      if (allLayerStyles[i].isSelected) {
        if (allLayerStyles[i].isChosen) {
          selectedIndex = stylesToMerge.length;
        }

        stylesToMerge.push(allLayerStyles[i]);
      }
    }

    var mergeResults = MergeLayerStyles(stylesToMerge, selectedIndex, 0, 1, webContents);
    onShutdown(webviewMLSFLIdentifier);

    if (mergeResults[0] <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    } else {
      var replacedStuff = "";
      if (mergeResults[1] > 0 && mergeResults[2]) replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";else if (mergeResults[1] > 0) replacedStuff = " and replaced " + mergeResults[1] + " instances.";else if (mergeResults[2] > 0) replacedStuff = " and updated " + mergeResults[2] + " overrides.";else replacedStuff = ".";
      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " layer styles" + replacedStuff);
      UI.message("Hey ho! You just removed " + mergeResults[0] + " layer styles" + replacedStuff + " Amazing!");
    }
  });
}
;
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
    var mergeResults = [0, 0, 0];
    var totalToMerge = editedStylesWithSimilarStyles.filter(function (ems) {
      return !ems.isUnchecked && ems.selectedIndex >= 0;
    }).length;

    for (var i = 0; i < editedStylesWithSimilarStyles.length; i++) {
      if (!editedStylesWithSimilarStyles[i].isUnchecked && editedStylesWithSimilarStyles[i].selectedIndex >= 0) {
        var basePercent = duplicatesSolved * 100 / editedStylesWithSimilarStyles.length;
        var localMergeResults = MergeLayerStyles(stylesWithSimilarStyles[i].similarStyles, editedStylesWithSimilarStyles[i].selectedIndex, basePercent, totalToMerge, webContents);
        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];
        duplicatesSolved++;
      }
    }

    onShutdown(webviewMSLSIdentifier);

    if (mergeResults[0] <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    } else {
      var replacedStuff = "";
      if (mergeResults[1] > 0 && mergeResults[2]) replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";else if (mergeResults[1] > 0) replacedStuff = " and replaced " + mergeResults[1] + " instances.";else if (mergeResults[2] > 0) replacedStuff = " and updated " + mergeResults[2] + " overrides.";else replacedStuff = ".";
      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " layer styles" + replacedStuff);
      UI.message("Hey ho! You just removed " + mergeResults[0] + " layer styles" + replacedStuff + " Amazing!");
    }
  });
  webContents.on('RecalculateStyles', function (includeAllLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowXYBlurSpread) {
    Helpers.clog("RecalculateStyles");
    stylesWithSimilarStyles = Helpers.FindAllSimilarLayerStyles(context, includeAllLibraries, checkSameFillColor, checkSameBorderColor, checkSameBorderThickness, checkSameShadowColor, checkSameShadowXYBlurSpread);
    webContents.executeJavaScript("DrawResultsList(".concat(JSON.stringify(stylesWithSimilarStyles), ")")).catch(console.error);
  });
}

/***/ }),

/***/ "./src/MergeTextStyles.js":
/*!********************************!*\
  !*** ./src/MergeTextStyles.js ***!
  \********************************/
/*! exports provided: MergeDuplicateTextStyles, MergeSelectedTextStyles, MergeSimilarTextStyles */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeDuplicateTextStyles", function() { return MergeDuplicateTextStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSelectedTextStyles", function() { return MergeSelectedTextStyles; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MergeSimilarTextStyles", function() { return MergeSimilarTextStyles; });
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch-module-web-view */ "./node_modules/sketch-module-web-view/lib/index.js");
/* harmony import */ var sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sketch-module-web-view/remote */ "./node_modules/sketch-module-web-view/remote.js");
/* harmony import */ var sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sketch_module_web_view_remote__WEBPACK_IMPORTED_MODULE_1__);



var Helpers = __webpack_require__(/*! ./Helpers */ "./src/Helpers.js");

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var webviewMTSFLIdentifier = 'merge-textstylesfromlist.webview';
var webviewMDTSIdentifier = 'merge-duplicatetextstyles.webview';
var webviewMSTSIdentifier = 'merge-similartextstyles.webview';
var checkingAlsoLibraries = false;
var currentSelectedStyles = [];

function MergeTextStyles(stylesToMerge, styleToKeep, basePercent, totalToMerge, webContents) {
  Helpers.clog("-- Starting Merge Layer Styles (" + stylesToMerge.length + "). Style to keep is:" + styleToKeep);
  var stylesToRemove = [];
  var styleToApply;
  var instancesChanged = 0;
  var overridesChanged = 0;
  var stylesRemoved = 0;
  var idsMap = new Map();
  Helpers.clog("---- Processing styles to remove");
  styleToApply = stylesToMerge[styleToKeep].textStyle;

  if (stylesToMerge[styleToKeep].isForeign) {
    var alreadyInDoc = Helpers.document.sharedTextStyles.filter(function (ls) {
      return ls.id == stylesToMerge[styleToKeep].textStyle.id;
    }).length > 0;
    if (!alreadyInDoc) styleToApply = Helpers.importTextStyleFromLibrary(stylesToMerge[styleToKeep]);
  }

  var tasksToPerform = 0,
      tasksExecuted = 0;
  var progress = basePercent;
  var instancesToChange = 0,
      overridesToChange = 0;
  var instOverMap = new Map();
  Helpers.clog("---- Getting all related styles instances and overrides");

  for (var i = 0; i < stylesToMerge.length; i++) {
    if (i != styleToKeep) {
      idsMap.set(stylesToMerge[i].textStyle.id);
      stylesToRemove.push(stylesToMerge[i].textStyle);
      var instancesOfStyle = Helpers.getTextStyleInstances(stylesToMerge[i].textStyle);
      var styleOverrides = Helpers.getTextStyleOverrides(stylesToMerge[i].textStyle, idsMap);
      instOverMap.set(stylesToMerge[i], {
        "instancesOfStyle": instancesOfStyle,
        "styleOverrides": styleOverrides
      });
      instancesToChange += instancesOfStyle.length;
      overridesToChange += styleOverrides.length;
    }
  }

  tasksToPerform = instancesToChange + overridesToChange;
  Helpers.ctime("Merging text style:" + stylesToMerge[styleToKeep].name);
  webContents.executeJavaScript("ShowMergeProgress()").catch(console.error);

  for (var i = 0; i < stylesToMerge.length; i++) {
    if (i != styleToKeep) {
      if (!stylesToMerge[i].isForeign) stylesRemoved++;
      Helpers.ctime("-- Taking instances and overrides");
      var instancesOfStyle = instOverMap.get(stylesToMerge[i]).instancesOfStyle;
      var styleOverrides = instOverMap.get(stylesToMerge[i]).styleOverrides;
      Helpers.ctimeEnd("-- Taking instances and overrides");
      Helpers.ctime("-- Unlinking from library");
      Helpers.clog("------ Checking if symbol to merge is foreign");

      if (stylesToMerge[i].isForeign) {
        stylesToMerge[i].textStyle.unlinkFromLibrary();
      }

      Helpers.ctimeEnd("-- Unlinking from library");
      var message = "Merging " + stylesToMerge[styleToKeep].name;
      Helpers.ctime("-- Updating overrides");
      Helpers.clog("---- Updating overrides (" + styleOverrides.length + ")");
      styleOverrides.forEach(function (override) {
        try {
          Helpers.clog("------ Updating override for " + override.instance.name);
          override.instance.setOverrideValue(override.override, styleToApply.id.toString());
          overridesChanged++;
          tasksExecuted++;
          progress = Math.floor(basePercent + tasksExecuted * 100 / tasksToPerform / totalToMerge);
          var message2 = "Updating overrides (" + overridesChanged + " of " + overridesToChange + ")";
          webContents.executeJavaScript("UpdateMergeProgress(".concat(progress, ", ").concat(JSON.stringify(message), ", ").concat(JSON.stringify(message2), ")")).catch(console.error);
        } catch (e) {
          Helpers.clog("---- ERROR: Couldn't update override for " + override.instance.name);
          Helpers.clog(e);
        }
      });
      Helpers.ctimeEnd("-- Updating overrides");
      Helpers.ctime("-- Updating instances");
      Helpers.clog("---- Updating instances (" + instancesOfStyle.length + ")");
      instancesOfStyle.forEach(function (instance) {
        try {
          Helpers.clog("------ Updating instance " + instance.name + ", in artboard " + instance.getParentArtboard().name);
        } catch (e) {
          Helpers.clog("------ Updating instance " + instance.name + ". Instance doesn't belong to any specific artboard.");
        }

        instance.sharedStyle = styleToApply;
        instance.style.syncWithSharedStyle(styleToApply);
        tasksExecuted++;
        instancesChanged++;
        progress = Math.floor(basePercent + tasksExecuted * 100 / tasksToPerform / totalToMerge);
        var message2 = "Updating instances (" + instancesChanged + " of " + instancesToChange + ")";
        webContents.executeJavaScript("UpdateMergeProgress(".concat(progress, ", ").concat(JSON.stringify(message), ", ").concat(JSON.stringify(message2), ")")).catch(console.error);
      });
      Helpers.ctimeEnd("-- Updating instances");
    }
  }

  Helpers.ctimeEnd("Merging text style:" + stylesToMerge[styleToKeep].name);
  Helpers.clog("---- Finalized instance and override replacement.");
  var sharedStylesToRemove = Helpers.document.sharedTextStyles.filter(function (sharedStyle) {
    return isMarkedForRemove(sharedStyle, stylesToRemove);
  });
  Helpers.clog("---- Removing discarded text styles (" + sharedStylesToRemove.length + ").");
  webContents.executeJavaScript("UpdateMergeProgress(".concat(progress, ", ").concat(JSON.stringify(message), ", \"Removing discarded text styles\")")).catch(console.error);
  Helpers.ctime("Removing discarded styles");
  sharedStylesToRemove.forEach(function (sharedStyleToRemove) {
    Helpers.clog("------ Removing " + sharedStyleToRemove.name + " (" + sharedStyleToRemove.id + ") from sharedTextStyles.");
    sharedStyleToRemove.unlinkFromLibrary();
    Helpers.clog("-------- Unlinked from library.");
    var styleIndex = Helpers.document.sharedTextStyles.findIndex(function (sL) {
      return sL.id == sharedStyleToRemove.id;
    });
    Helpers.clog("-------- Located in sharedTextStyles (" + styleIndex + ").");
    Helpers.document.sharedTextStyles.splice(styleIndex, 1);
    Helpers.clog("-------- Removed from sharedTextStyles.");
  });
  Helpers.ctimeEnd("Removing discarded styles");
  Helpers.clog("---- Merge completed.");
  return [stylesRemoved, instancesChanged, overridesChanged];
}

function isMarkedForRemove(sharedTextStyle, stylesToRemove) {
  var redId1 = sharedTextStyle.style.id;
  var redId2 = sharedTextStyle.id.indexOf("[") >= 0 ? sharedTextStyle.id.substring(sharedTextStyle.id.indexOf("[") + 1, sharedTextStyle.id.length - 1) : null;
  return stylesToRemove.filter(function (str) {
    return str.id == sharedTextStyle.id || str.id == redId1 || str.id == redId2;
  }).length > 0;
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
  var onlyDuplicatedTextStyles, textStylesMap;
  var mergeSession = [];
  var mergeSessionMap = new Map();
  CalculateDuplicates(Helpers.getLibrariesEnabled());

  if (onlyDuplicatedTextStyles.length > 0) {
    browserWindow.loadURL(__webpack_require__(/*! ../resources/mergeduplicatetextstyles.html */ "./resources/mergeduplicatetextstyles.html"));
  } else {
    UI.message("Looks like there are no text styles with the same name.");
    onShutdown(webviewMDTSIdentifier);
  }

  function CalculateDuplicates(includeLibraries) {
    Helpers.clog("Finding duplicate text styles. Including libraries:" + includeLibraries);
    onlyDuplicatedTextStyles = Helpers.getAllDuplicateTextStylesByName(context, includeLibraries);
    textStylesMap = Helpers.getTextStylesMap(context, onlyDuplicatedTextStyles);

    if (onlyDuplicatedTextStyles.length > 0) {
      Helpers.GetSpecificTextStyleData(onlyDuplicatedTextStyles[0], textStylesMap);
      mergeSession = [];
      onlyDuplicatedTextStyles.forEach(function (duplicate) {
        var reducedStyle = Helpers.getReducedTextStyleData(duplicate);
        mergeSessionMap.set(reducedStyle, duplicate);
        mergeSession.push({
          "textStyleWithDuplicates": reducedStyle,
          "selectedIndex": -1,
          "isUnchecked": false,
          "isProcessed": mergeSession.length == 0
        });
      });
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
    Helpers.GetSpecificTextStyleData(onlyDuplicatedTextStyles[index], textStylesMap);
    var stringify = JSON.stringify(Helpers.getReducedTextStyleData(onlyDuplicatedTextStyles[index]));
    webContents.executeJavaScript("ReDrawAfterGettingData(".concat(stringify, ",").concat(index, ")")).catch(console.error);
  });
  webContents.on('ExecuteMerge', function (editedMergeSession) {
    Helpers.clog("Executing Merge");
    var duplicatesSolved = 0;
    var mergeResults = [0, 0, 0];
    var totalToMerge = editedMergeSession.filter(function (ems) {
      return !ems.isUnchecked && ems.selectedIndex >= 0;
    }).length;

    for (var i = 0; i < editedMergeSession.length; i++) {
      Helpers.clog("-- Merging " + mergeSession[i].textStyleWithDuplicates.name);

      if (!editedMergeSession[i].isUnchecked && editedMergeSession[i].selectedIndex >= 0) {
        Helpers.clog("-- Merging " + mergeSession[i].textStyleWithDuplicates.name);
        mergeSession[i].selectedIndex = editedMergeSession[i].selectedIndex;
        var mergeobject = mergeSessionMap.get(mergeSession[i].textStyleWithDuplicates);
        var basePercent = duplicatesSolved * 100 / editedMergeSession.length;
        var localMergeResults = MergeTextStyles(mergeobject.duplicates, mergeSession[i].selectedIndex, basePercent, totalToMerge, webContents);
        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];
        duplicatesSolved++;
      }
    }

    onShutdown(webviewMDTSIdentifier);

    if (mergeResults[0] <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    } else {
      var replacedStuff = "";
      if (mergeResults[1] > 0 && mergeResults[2]) replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";else if (mergeResults[1] > 0) replacedStuff = " and replaced " + mergeResults[1] + " instances.";else if (mergeResults[2] > 0) replacedStuff = " and updated " + mergeResults[2] + " overrides.";else replacedStuff = ".";
      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " text styles" + replacedStuff);
      UI.message("Hey ho! You just removed " + mergeResults[0] + " text styles" + replacedStuff + " Amazing!");
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
  var allTextStyles;
  var styleCounter = 0;
  Helpers.clog("Get text styles list. Libraries included:" + Helpers.getLibrariesEnabled());
  allTextStyles = Helpers.getAllTextStyles(Helpers.getLibrariesEnabled());
  styleCounter = allTextStyles.length;
  checkingAlsoLibraries = Helpers.getLibrariesEnabled();
  Helpers.clog("allTextStyles:" + allTextStyles.length);

  if (styleCounter > 1) {
    browserWindow.loadURL(__webpack_require__(/*! ../resources/mergetextstylesfromlist.html */ "./resources/mergetextstylesfromlist.html"));
  } else {
    if (styleCounter == 1) UI.message("There's only 1 text style. No need to merge.");else UI.message("Looks like there are no text styles.");
    onShutdown(webviewMTSFLIdentifier);
  }

  browserWindow.once('ready-to-show', function () {
    browserWindow.show();
  });
  webContents.on('did-finish-load', function () {
    Helpers.clog("Webview loaded");
    webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(allTextStyles), ",").concat(Helpers.getLibrariesEnabled(), ")")).catch(console.error);
  });
  webContents.on('nativeLog', function (s) {
    Helpers.clog(s);
  });
  webContents.on('GetStylesList', function (librariesEnabled) {
    Helpers.clog("Get styles list");
    allTextStyles = Helpers.getAllTextStyles(librariesEnabled);
    checkingAlsoLibraries = librariesEnabled;
    webContents.executeJavaScript("DrawStyleList(".concat(JSON.stringify(allTextStyles), ")")).catch(console.error);
  });
  webContents.on('Cancel', function () {
    onShutdown(webviewMTSFLIdentifier);
  });
  webContents.on('ExecuteMerge', function (editedGlobalTextStyles) {
    Helpers.clog("Executing Merge");
    var selectedIndex = -1;
    var stylesToMerge = []; //Create merge structure

    for (var i = 0; i < allTextStyles.length; i++) {
      allTextStyles[i].isSelected = editedGlobalTextStyles[i].isSelected;
      allTextStyles[i].isChosen = editedGlobalTextStyles[i].isChosen;

      if (allTextStyles[i].isSelected) {
        if (allTextStyles[i].isChosen) {
          selectedIndex = stylesToMerge.length;
        }

        stylesToMerge.push(allTextStyles[i]);
      }
    }

    var mergeResults = MergeTextStyles(stylesToMerge, selectedIndex, 0, 1, webContents);
    onShutdown(webviewMTSFLIdentifier);

    if (mergeResults[0] <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    } else {
      var replacedStuff = "";
      if (mergeResults[1] > 0 && mergeResults[2]) replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";else if (mergeResults[1] > 0) replacedStuff = " and replaced " + mergeResults[1] + " instances.";else if (mergeResults[2] > 0) replacedStuff = " and updated " + mergeResults[2] + " overrides.";else replacedStuff = ".";
      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " text styles" + replacedStuff);
      UI.message("Hey ho! You just removed " + mergeResults[0] + " text styles" + replacedStuff + " Amazing!");
    }
  });
}
;
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
    var mergeResults = [0, 0, 0];
    var totalToMerge = editedStylesWithSimilarStyles.filter(function (ems) {
      return !ems.isUnchecked && ems.selectedIndex >= 0;
    }).length;

    for (var i = 0; i < editedStylesWithSimilarStyles.length; i++) {
      if (!editedStylesWithSimilarStyles[i].isUnchecked && editedStylesWithSimilarStyles[i].selectedIndex >= 0) {
        var basePercent = duplicatesSolved * 100 / editedStylesWithSimilarStyles.length;
        var localMergeResults = MergeTextStyles(stylesWithSimilarStyles[i].similarStyles, editedStylesWithSimilarStyles[i].selectedIndex, basePercent, totalToMerge, webContents);
        mergeResults[0] += localMergeResults[0];
        mergeResults[1] += localMergeResults[1];
        mergeResults[2] += localMergeResults[2];
        duplicatesSolved++;
      }
    }

    onShutdown(webviewMSTSIdentifier);

    if (mergeResults[0] <= 0) {
      Helpers.clog("No styles were merged");
      UI.message("No styles were merged");
    } else {
      var replacedStuff = "";
      if (mergeResults[1] > 0 && mergeResults[2]) replacedStuff = ", replaced " + mergeResults[1] + " instances, and updated " + mergeResults[2] + " overrides.";else if (mergeResults[1] > 0) replacedStuff = " and replaced " + mergeResults[1] + " instances.";else if (mergeResults[2] > 0) replacedStuff = " and updated " + mergeResults[2] + " overrides.";else replacedStuff = ".";
      Helpers.clog("Completed merge. Removed " + mergeResults[0] + " text styles" + replacedStuff);
      UI.message("Hey ho! You just removed " + mergeResults[0] + " text styles" + replacedStuff + " Amazing!");
    }
  });
  webContents.on('RecalculateStyles', function (includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing) {
    Helpers.clog("RecalculateStyles");
    stylesWithSimilarStyles = Helpers.FindAllSimilarTextStyles(context, includeAllLibraries, checkSameFont, checkSameWeight, checkSameSize, checkSameColor, checkSameParagraphSpacing, checkSameLineHeight, checkSameAlignment, checkSameCharacterSpacing);
    webContents.executeJavaScript("DrawResultsList(".concat(JSON.stringify(stylesWithSimilarStyles), ")")).catch(console.error);
  });
}

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

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

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
globalThis['MergeDuplicateColorVariables'] = __skpm_run.bind(this, 'MergeDuplicateColorVariables');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown');
globalThis['MergeSelectedColorVariables'] = __skpm_run.bind(this, 'MergeSelectedColorVariables');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown');
globalThis['MergeSimilarColorVariables'] = __skpm_run.bind(this, 'MergeSimilarColorVariables');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown');
globalThis['EditSettings'] = __skpm_run.bind(this, 'EditSettings');
globalThis['onShutdown'] = __skpm_run.bind(this, 'onShutdown')

//# sourceMappingURL=Main.js.map