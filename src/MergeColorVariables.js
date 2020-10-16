import BrowserWindow from 'sketch-module-web-view'
import { getWebview } from 'sketch-module-web-view/remote'
import { debugLog } from './Helpers';
var UI = require('sketch/ui')
const Helpers = require("./Helpers");

const webviewMCVFLIdentifier = 'merge-colorvariablesfromlist.webview'

var checkingAlsoLibraries = false;
var currentSelectedStyles = [];

export function MergeSelectedColorVariables(context) {

  Helpers.clog("----- Merge selected color variables -----");

};

