'use strict'

var util = require('../util')

exports['test addEventListener completion'] = function () {
  util.assertCompletion("<html><input id='MyInput' /><script>document.addEventListener('cl'", {
    'start': {'line': 0,'ch': 62},
    'end': {'line': 0,'ch': 66},
    'isProperty': false,
    'isObjectKey': false,
    'completions': [{"name":"'click'","type":"string","origin":"browser-extension","displayName":"click"},
                    {"name":"'close'","type":"string","origin":"browser-extension","displayName":"close"}
    ]
  }, null, 1)
}

if (module == require.main) require('test').run(exports)
