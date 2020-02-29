'use strict';

var yesno = require('../yesno');


yesno.askAsync('Are you ready for the future?', true).then(function (ok) {
    if (ok) {
        console.log('Ready! :)');
    } else {
        console.log('Not Ready :(');
    }
});
