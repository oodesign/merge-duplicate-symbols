var globalThis=this,global=this;function __skpm_run(e,n){globalThis.context=n;try{var t=function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";function o(){NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("http://www.mergeduplicates.com/"))}function r(){NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("https://github.com/oodesign/merge-duplicate-symbols/issues"))}function i(){var e=encodeURI("License issues"),n=encodeURI("Hi!\n\nLooks like something is not working properly with my Merge Duplicates license.\n\nThis is the e-mail account I used to get my license on Gumroad:\nAnd this is my license key:\n\nMay you please take a look and come back to me as soon as possible?\n\nThank you!  ");NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("mailto:licensing@oodesign.me?subject="+e+"&body="+n))}t.r(n),t.d(n,"documentation",(function(){return o})),t.d(n,"report_issue",(function(){return r})),t.d(n,"report_licensing",(function(){return i}))}]);if("default"===e&&"function"==typeof t)t(n);else{if("function"!=typeof t[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');t[e](n)}}catch(o){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw o;process.emit("uncaughtException",o,"uncaughtException")}}globalThis.documentation=__skpm_run.bind(this,"documentation"),globalThis.onRun=__skpm_run.bind(this,"default"),globalThis.report_issue=__skpm_run.bind(this,"report_issue"),globalThis.report_licensing=__skpm_run.bind(this,"report_licensing");