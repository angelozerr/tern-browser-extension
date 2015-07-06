var util = require("../util-lint");

exports['test getElementById validation'] = function() {
  
  //Unknown id 'XXX'
  util.assertLint("<html><input id='MyInput' /><script>document.getElementById('XXX');</script>", {
    "messages":[{"message":"Unknown element id 'XXX'",
                 "from":60,
                 "to":65,
                 "severity":"warning",
                 "file":"test1.html"}]
  }, ["browser"]);
  
  // known module
  util.assertLint("<html><input id='MyInput' /><script>document.getElementById('MyInput');</script>", {
          messages : []
  }, ["browser"]);
  
}

if (module == require.main) require("test").run(exports);