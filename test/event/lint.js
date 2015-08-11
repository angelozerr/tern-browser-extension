var util = require('../util-lint')

exports['test addEventListener validation'] = function () {
  // Unknown event 'XXX'
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
