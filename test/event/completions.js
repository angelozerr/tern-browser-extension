'use strict'

var util = require('../util')

exports['test getElementById completion'] = function () {
  util.assertCompletion("<html><input id='MyInput' /><script>document.addEventListener('cl'", {
    'start': {'line': 0,'ch': 62},
    'end': {'line': 0,'ch': 66},
    'isProperty': false,
    'isObjectKey': false,
    'completions': [{"name":"'click'","displayName":"click"},
                    {"name":"'close'","displayName":"close"}
    ]
  }, null, 1)
}

if (module == require.main) require('test').run(exports)
