"use strict";

var util = require("./util");

exports['test getElementById completion'] = function() {
  util.assertCompletion("<html><input id='MyInput' /><script>document.getElementById(''", {
    "start":{"line":0,"ch":60},
    "end":{"line":0,"ch":62},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'MyInput'","displayName":"MyInput"}
                  ]
  }, null, 1);
}

if (module == require.main) require('test').run(exports)