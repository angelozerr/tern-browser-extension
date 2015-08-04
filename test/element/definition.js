'use strict'

var util = require('../util')

exports['test getElementById definition NOK'] = function () {
  util.assertDefinition("<html><input id='MyInput' /><script>document.getElementById('My'", {
  }, null, 1)
}

exports['test getElementById definition OK'] = function () {
  util.assertDefinition("<html><input id='MyInput' /><script>document.getElementById('MyInput'", {
    'origin': 'test1.html',
    'start': {'line': 0,'ch': 17},
    'end': {'line': 0,'ch': 24},
    'file': 'test1.html',
    'contextOffset': 17,
    'context': "<html><input id='MyInput' /><script>document.getEl"
  }, null, 1)
}

if (module == require.main) require('test').run(exports)
