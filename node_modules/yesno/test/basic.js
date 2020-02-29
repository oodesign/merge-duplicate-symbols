'use strict';

var yesno = require('../yesno');


yesno.ask('Are you sure you want to continue?', true, function (ok) {
    if (ok) {
        console.log('Yay!');
    } else {
        console.log('Nope.');
    }
});
