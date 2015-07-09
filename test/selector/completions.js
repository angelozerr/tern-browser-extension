"use strict";

var util = require("../util");

exports['test querySelector completion'] = function() {
  
  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector(''", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":61},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'#MyInput'","type": "Attr", "origin": "test1.html", "displayName":"#MyInput"}
                  ]
  }, null, 1);
  
  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('#'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":62},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'#MyInput'","type": "Attr", "origin": "test1.html", "displayName":"#MyInput"}
                  ]
  }, null, 1);
  
  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('M'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":62},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'#MyInput'","type": "Attr", "origin": "test1.html", "displayName":"#MyInput"}
    ]
  }, null, 1);

  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('X'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":62},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[
    ]
  }, null, 1);
  
}

exports['test querySelector completion with before content'] = function() {
  
  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('div '", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":65},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'div #MyInput'","type": "Attr", "origin": "test1.html", "displayName":"#MyInput"}
                  ]
  }, null, 1);
  
  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('div #'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":66},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'div #MyInput'","type": "Attr", "origin": "test1.html", "displayName":"#MyInput"}
                  ]
  }, null, 1);
  
  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('div M'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":66},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'div #MyInput'","type": "Attr", "origin": "test1.html", "displayName":"#MyInput"}
    ]
  }, null, 1);

  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('div X'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":66},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[
    ]
  }, null, 1);
  
}

exports['test querySelector completion with after content'] = function() {
  
  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector(' div'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":65},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'#MyInput div'","type": "Attr", "origin": "test1.html", "displayName":"#MyInput"}
                  ]
  }, null, 5);
  
  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('# div'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":66},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'#MyInput div'","type": "Attr", "origin": "test1.html", "displayName":"#MyInput"}
                  ]
  }, null, 5);
  
  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('M div'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":66},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'#MyInput div'","type": "Attr", "origin": "test1.html", "displayName":"#MyInput"}
    ]
  }, null, 5);

  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('X div'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":66},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[
    ]
  }, null, 5);
  
}

exports['test querySelector completion with before+after content'] = function() {
  
  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('div  div'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":69},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'div #MyInput div'","type": "Attr", "origin": "test1.html", "displayName":"#MyInput"}
                  ]
  }, null, 5);
  
  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('div # div'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":70},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'div #MyInput div'","type": "Attr", "origin": "test1.html", "displayName":"#MyInput"}
                  ]
  }, null, 5);
  
  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('div M div'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":70},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[{"name":"'div #MyInput div'","type": "Attr", "origin": "test1.html", "displayName":"#MyInput"}
    ]
  }, null, 5);

  util.assertCompletion("<html><input id='MyInput' /><script>document.querySelector('div X div'", {
    "start":{"line":0,"ch":59},
    "end":{"line":0,"ch":70},
    "isProperty":false,
    "isObjectKey":false,
    "completions":[
    ]
  }, null, 5);
  
}

if (module == require.main) require('test').run(exports)