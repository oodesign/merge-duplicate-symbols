# Google Analytics for Sketch plugin

Module to add some analytics to your Sketch plugin. It respects the Sketch privacy settings of the users so you don't have to worry about it.

## Installation

```bash
npm install --save sketch-module-google-analytics
```

## Usage

```js
const track = require("sketch-module-google-analytics");

track(trackingId, hitType, payload, options);
```

Where

- `trackingId` is the tracking ID / web property ID. The format is `UA-XXXX-Y`. All collected data is associated by this ID.
- `hitType` is the type of hit. Must be one of 'pageview', 'screenview', 'event', 'transaction', 'item', 'social', 'exception', 'timing'.
- `payload` (_optional_) is an object representing the additional properties you want to track. Depending on the `hitType`, some might be required.
- `options` (_optional_) (see [#Debugging](#debugging)).

## Examples

```js
const track = require("sketch-module-google-analytics");

track("UA-XXXX-Y", "event", {
  ec: "command", // the event category
  ea: "start", // the event action
  ev: "my-command" // the event value
});
```

## Properties documentation

For more information about the properties you can use, check [the google analytics documentation](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters).

The module already sets some for you:

- Protocol Version (`v`)
- Tracking ID / Web Property ID (`tid`)
- Data Source (`ds`) (example: `Sketch 53.2`)
- Client ID (`cid`)
- Cache Buster (`z`)
- Hit Type (`t`)
- Application Name (`an`) (which is the name of your plugin)
- Application ID (`aid`) (which is the identifier of your plugin)
- Application Version (`av`) (which is the version of your plugin)

## Debugging

By default, `sketch-module-google-analytics` doesn't return any information whether the call has been successful or not.

You can set the `debug` option to get feedback:

```js
const result = track("UA-XXXX-Y", "event", {}, { debug: true });
```

> Important: hits sent with the debug options will not show up in reports. They are for debugging only.

## License

MIT
