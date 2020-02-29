### Intro

yesno is a super simple nodejs library for issuing and handling responses to boolean (or rather, binary) questions 


### Installation

```bash
npm install yesno
```

### API

Promise based (returns a promise):
```
askAsync(
    <string> question, 
    <boolean|null> default_value,
    <array|null> yes_values,
    <array|null> no_values
)
```


Callback based:
```
ask(
    <string> question, 
    <boolean|null> default_value,
    <function> response_handler,
    <array|null> yes_values,
    <array|null> no_values
)
```

If `yes_values` or `no_values` aren't supplied, yesno falls back on accepting `yes`, `y` , `no`, and `n`.

All yesno responses are case insensitive.


### Example

```javascript
var yesno = require('yesno');

yesno.ask('Are you sure you want to continue?', true, function (ok) {
    if (ok) {
        console.log("Yay!");
    } else {
        console.log("Nope.");
    }
});
```



### Examples

##### Custom Yes/No response values

```javascript
var yesno = require('yesno');

yesno.ask('Dude, Is this groovy or what?',true, function (ok) {
    if (ok) {
        console.log("Tubular.");
    } else {
        console.log("Aw, why you gotta be like that?")
    }
}, ['groovy'], ['or what']);
```

Now the question only responds to `groovy` as yes and `or what` as no.


##### Promisified ask

If you're on a newer version of node (8+) you can use the promisified `askAsync` function:

```javascript
var yesno = require('yesno');

async function main() {
    var ok = await yesno.askAsync('Are you sure you want to continue?', true);
    if (ok) {
        console.log('Yay!');
    } else {
        console.log('Nope.');
    }
}

main();
```


##### No default value

Sometimes you may want to ensure the user didn't accidentally accept a default. You can disable the default response by passing null as the default_value parameter

```javascript
var yesno = require('yesno');

var handleResponse = function (ok) {
    ...
};

yesno.ask("Are you sure you want to 'rm-rf /' ?", null, handleResponse);
```

##### Globally changing Yes/No respones values

You can change the built in yes/no accepted responses by altering yesno's options attribute:

```javascript
var yesno = require('yesno');

yesno.options.yes  = [ 'ja', 'si' ];
yesno.options.no   = [ 'nein', 'no' ];
```

##### Handling invalid responses

By default, if the user enters a value that isn't recognized as an acceptable response, it will
print out a message like: 

    Invalid response.
    Answer either yes : (yes, y)
    Or no : (no, n)

and re-ask the question. If you want to change this behavior, you can set the invalid handler before asking your question:

```javascript
var yesno = require('yesno');

yesno.onInvalidHandler(function (question, default_value, callback, yes_values, no_values) {
    process.stdout.write("\n Whoa. That was not a good answer. Well. No more tries for you.");
    process.exit(1);
});

// ask a question
```

### Todo

- Allow supplying your own stdin/stdout streams so it doesn't always write to the process?
- Put in some error handling
