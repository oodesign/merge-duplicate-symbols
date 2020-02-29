'use strict';

var spawn = require('child_process').exec;
var tap   = require('tap');


spawn('echo "y" | node ' + __dirname + '/basic.js', function (err, stdout, stderr) {
	tap.equal(err, null);
	tap.equal(stdout.toString(), 'Are you sure you want to continue? Yay!\n');
	tap.equal(stderr.toString(), '');
});

spawn('echo "groovy" | node ' + __dirname + '/custom-response-values.js', function (err, stdout, stderr) {
	tap.equal(err, null);
	tap.equal(stdout.toString(), 'Dude, Is this groovy or what? Tubular.\n');
	tap.equal(stderr.toString(), '');
});

spawn('echo "\n" | node ' + __dirname + '/no-default-value.js', function (err, stdout, stderr) {
	tap.equal(err, null);
	var expectedResult = "Are you sure you want to 'rm-rf /' ?\r\nInvalid Response.\nAnswer either yes : (yes, y)\nOr no: (no, n";
	tap.ok(stdout.toString().indexOf(expectedResult), 0);
	tap.equal(stderr.toString(), '');
});

spawn('echo "nein" | node ' + __dirname + '/global-change-yesno-values.js', function (err, stdout, stderr) {
	tap.equal(err, null);
	tap.equal(stdout.toString(), 'How is your multi-lingual? Nope.\n');
	tap.equal(stderr.toString(), '');
});

spawn('echo "ja" | node ' + __dirname + '/global-change-yesno-values.js', function (err, stdout, stderr) {
	tap.equal(err, null);
	tap.equal(stdout.toString(), 'How is your multi-lingual? Yay!\n');
	tap.equal(stderr.toString(), '');
});

spawn('echo "eep" | node ' + __dirname + '/custom-invalid-response-handler.js', function (err, stdout, stderr) {
	tap.equal(err, null);
	tap.equal(stdout.toString(), 'Ready to continue? \n Whoa. That was not a good answer. Well. No more tries for you.');
	tap.equal(stderr.toString(), '');
});

spawn('echo "y" | node ' + __dirname + '/promisified-ask.js', function (err, stdout, stderr) {
	tap.equal(err, null);
	tap.equal(stdout.toString(), 'Are you ready for the future? Ready! :)\n');
	tap.equal(stderr.toString(), '');
});

