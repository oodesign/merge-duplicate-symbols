# `Promise` for Sketch

A [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) polyfill for Sketch that uses `setImmediate` (which itself uses [fibers](https://developer.sketch.com/reference/api/#async)) and makes `process` emit `multipleResolves`, `unhandledRejection` and `uncaughtException` when it should.
