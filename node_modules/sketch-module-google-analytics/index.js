var Settings = require("sketch/settings");

var kUUIDKey = "google.analytics.uuid";
var uuid = null
var uuid = NSUserDefaults.standardUserDefaults().objectForKey(kUUIDKey);
if (!uuid) {
  uuid = NSUUID.UUID().UUIDString();
  NSUserDefaults.standardUserDefaults().setObject_forKey(uuid, kUUIDKey)
}

var sketchVersion = Settings.version.sketch
var variant = sketchVersion >= 72 ? BCSketchInfo.shared().metadata().variant : MSApplicationMetadata.metadata().variant
var source =
  "Sketch " +
  (variant == "NONAPPSTORE" ? "" : variant + " ") +
  sketchVersion;

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
