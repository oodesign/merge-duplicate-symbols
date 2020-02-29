'use strict';

var yesno = require('../yesno');


function handleResponse (ok) { }


yesno.ask("Are you sure you want to 'rm-rf /' ?", null, handleResponse);
