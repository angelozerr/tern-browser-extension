"use strict";

var tern = require("tern/lib/tern"), 
    assert = require('assert'), 
    browser = require("../../browser-extension");

exports['test elements ids'] = function() {
  var document = new browser.DOMDocument("<html><div id='MyId' /></html>");
  var ids = document.ids, attr = ids["MyId"];
  assert.notEqual(attr, null);
  assert.equal(JSON.stringify(attr, null, ' '), JSON.stringify({
    "start": 15,
    "end": 19,
    "ownerElement": "div"
   }, null, ' '))
}

if (module == require.main) require('test').run(exports)