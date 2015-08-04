'use strict'

var util = require('../util')

exports['test querySelector definition NOK'] = function () {
  util.assertDefinition("<html><input id='MyInput' /><script>document.querySelector('#My'", {
  }, null, 1)
}

exports['test querySelector definition OK'] = function () {
  util.assertDefinition("<html><input id='MyInput' /><script>document.querySelector('#MyInput'", {
    'origin': 'test1.html',
    'start': {'line': 0,'ch': 17},
    'end': {'line': 0,'ch': 24},
    'file': 'test1.html',
    'contextOffset': 17,
    'context': "<html><input id='MyInput' /><script>document.query"
  }, null, 1)
}

if (module == require.main) require('test').run(exports)
