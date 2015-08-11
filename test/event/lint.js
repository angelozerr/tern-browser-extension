var util = require('../util-lint')

exports['test getElementById validation'] = function () {
  // Unknown id 'XXX'
  util.assertLint("<html><input id='MyInput' /><script>document.addEventListener('XXX'</script>", {
    'messages': [{'message': "Unknown event 'XXX'",
      'from': 62,
      'to': 67,
      'severity': 'warning',
    'file': 'test1.html'}]
  }, ['browser'])

  // known module
  util.assertLint("<html><input id='MyInput' /><script>document.addEventListener('click'</script>", {
    messages: []
  }, ['browser'])

}

if (module == require.main) require('test').run(exports)
