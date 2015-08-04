var util = require('../util-lint')

exports['test querySelector syntax validation'] = function () {
  // CSS Selector => OK
  util.assertLint("<html><input id='MyInput' /><script>document.querySelector('div a');</script>", {
    'messages': []
  }, ['browser'])

  // syntax error for CSS selector
  util.assertLint("<html><input id='MyInput' /><script>document.querySelector('> div a');</script>", {
    'messages': [{'message': "Invalid CSS selectors '> div a': Unexpected token '>' at line 1, col 1.",
      'from': 59,
      'to': 60,
      'severity': 'error',
    'file': 'test1.html'}]
  }, ['browser'])

}

exports['test querySelector #ID exist validation'] = function () {
  // Unknown XXXX element id
  util.assertLint("<html><input id='MyInput' /><script>document.querySelector('#XXXX');</script>", {
    messages: [{'message': "Unknown element id '#XXXX'",
      'from': 60,
      'to': 65,
      'severity': 'warning',
    'file': 'test1.html'}]
  }, ['browser'])

  // known element id
  util.assertLint("<html><input id='MyInput' /><script>document.querySelector('#MyInput');</script>", {
    messages: []
  }, ['browser'])

}

if (module == require.main) require('test').run(exports)
