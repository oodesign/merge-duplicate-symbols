'use strict';

var yesno = require('../yesno');


yesno.options.yes  = [ 'ja', 'si' ];
yesno.options.no   = [ 'nein', 'no' ];



yesno.ask('How is your multi-lingual?', true, function (ok) {
    if (ok) {
        console.log('Yay!');
    } else {
        console.log('Nope.');
    }
});
