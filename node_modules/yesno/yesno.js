'use strict';

var options = {
    yes: [ 'yes', 'y' ],
    no:  [ 'no', 'n' ]
};


function defaultInvalidHandler (question, defaultvalue, callback, yesvalues, novalues) {
    process.stdout.write('\nInvalid Response.\n');
    process.stdout.write('Answer either yes : (' + yesvalues.join(', ')+') \n');
    process.stdout.write('Or no: (' + novalues.join(', ') + ') \n\n');
    ask(question, defaultvalue, callback, yesvalues, novalues);
}

var invalidHandlerFunction = defaultInvalidHandler;


function onInvalidHandler (callback) {
    invalidHandlerFunction = callback;
}


function ask (question, defaultvalue, callback, yesvalues, novalues) {
    if (!invalidHandlerFunction) {
        invalidHandlerFunction = defaultInvalidHandler;
    }

    yesvalues = yesvalues ? yesvalues : options.yes;
    novalues  = novalues  ? novalues : options.no;

    yesvalues = yesvalues.map(function (v) { return v.toLowerCase(); });
    novalues  = novalues.map(function (v) { return v.toLowerCase(); });

    process.stdout.write(question + ' ');
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', function (val) {
        var result;
        var cleaned = val.trim().toLowerCase();

        if (cleaned == '' && defaultvalue != null) {
            result = defaultvalue;
        }
        else if (yesvalues.indexOf(cleaned) >= 0) {
            result = true;
        }
        else if (novalues.indexOf(cleaned) >= 0) {
            result = false;
        }
        else {
            invalidHandlerFunction(question, defaultvalue, callback, yesvalues, novalues);
            return;
        }

        process.stdin.unref();
        callback(result);
    }).resume();
}


function askAsync (question, defaultvalue, yesvalues, novalues) {
    return new Promise(function (resolve, reject) {
        ask (question, defaultvalue, function (askResult) {
            resolve(askResult);
        }, yesvalues, novalues)
    });
}


module.exports = {
    ask: ask,
    askAsync: askAsync,
    onInvalidHandler: onInvalidHandler,
    options: options
};
