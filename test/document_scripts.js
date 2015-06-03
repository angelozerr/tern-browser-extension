"use strict";

var tern = require("tern/lib/tern"), 
    assert = require('assert'), 
    browser = require("../browser-extension");

exports['test extract one script'] = function() {
  var document = new browser.DOMDocument("<html>\n<script>\nvar a = [];</script>\n</html>");
  var scripts = document.scripts;
  assert.equal(scripts, "      \n        \nvar a = [];         \n       ");
}

exports['test extract several scripts'] = function() {
  var document = new browser.DOMDocument("<html>\n<script>\nvar a = [];</script>\n<script>\nvar b = [];</script>\n</html>");
  var scripts = document.scripts;
  assert.equal(scripts, "      \n        \nvar a = [];         \n        \nvar b = [];         \n       ");
}

if (module == require.main) require('test').run(exports)