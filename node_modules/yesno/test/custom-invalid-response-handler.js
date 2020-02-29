'use strict';

var yesno = require('../yesno');


yesno.onInvalidHandler(function (question, default_value, callback, yes_values, no_values) {
    process.stdout.write("\n Whoa. That was not a good answer. Well. No more tries for you.");
});

yesno.ask('Ready to continue?', true, function (ok) {
    if (ok) {
        console.log('Yes.');
    } else {
        console.log('No.');
    }
}, [ 'groovy' ], [ 'or what' ]);
