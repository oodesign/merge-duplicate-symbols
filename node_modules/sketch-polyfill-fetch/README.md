# sketch-polyfill-fetch

A [fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) polyfill for sketch inspired by [unfetch](https://github.com/developit/unfetch). It is automatically included (when needed) when using [skpm](https://github.com/skpm/skpm).

## Installation

> :warning: There is no need to install it if you are using [skpm](https://github.com/skpm/skpm)!

```bash
npm i -S sketch-polyfill-fetch
```

## Usage

Using skpm:

```js
export default () => {
  fetch("https://google.com")
    .then(response => response.text())
    .then(text => console.log(text))
    .catch(e => console.error(e));
};
```

Without skpm:

```js
const fetch = require("sketch-polyfill-fetch");

var onRun = function() {
  fetch("https://google.com")
    .then(response => response.text())
    .then(text => console.log(text))
    .catch(e => console.error(e));
};
```

> :warning: only https URLs are supported due a MacOS limitation
