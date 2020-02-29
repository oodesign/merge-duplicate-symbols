'use strict';

var yesno = require('../yesno');


yesno.ask('Dude, Is this groovy or what?', true, function (ok) {
    if (ok) {
        console.log('Tubular.');
    } else {
        console.log('Aw, why you gotta be like that?');
    }
}, [ 'groovy' ], [ 'or what' ]);
