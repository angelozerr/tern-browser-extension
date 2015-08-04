'use strict'

var fs = require('fs'), path = require('path'), assert = require('assert')
var tern = require('tern/lib/tern')
require('../browser-extension.js')

var projectDir = path.resolve(__dirname, '..')
var resolve = function (pth) {
  return path.resolve(projectDir, pth)
}
var browser = JSON.parse(fs
  .readFileSync(resolve('node_modules/tern/defs/browser.json')), 'utf8')
var ecma5 = JSON.parse(fs
  .readFileSync(resolve('node_modules/tern/defs/ecma5.json')), 'utf8')

var allDefs = {
  browser: browser,
  ecma5: ecma5
}

var defaultQueryOptions = {
  types: true,
  docs: false,
  urls: false,
  origins: true
}

function createServer (defs, options) {
  var plugins = {}
  if (options) {
    plugins['browser-extension'] = options
  } else {
    plugins['browser-extension'] = {}
  }
  var server = new tern.Server({
    plugins: plugins,
    defs: defs
  })
  return server
}

exports.assertCompletion = function (text, expected, name, substraction, options) {
  var defs = []
  var defNames = ['ecma5', 'browser']
  if (defNames) {
    for (var i = 0; i < defNames.length; i++) {
      var def = allDefs[defNames[i]]
      defs.push(def)
    }
  }
  var queryOptions = defaultQueryOptions
  if (!substraction) substraction = 0

  var server = createServer(defs, options)
  server.addFile('test1.html', text)
  server.request({
    query: {
      type: 'completions',
      file: 'test1.html',
      end: text.length - substraction,
      types: queryOptions.types,
      docs: queryOptions.docs,
      urls: queryOptions.urls,
      origins: queryOptions.origins,
      caseInsensitive: true,
      lineCharPositions: true,
      expandWordForward: false,
      guess: false
    }
  }, function (err, resp) {
    if (err)
      throw err
    var actualMessages = resp.messages
    var expectedMessages = expected.messages

    if (name) {
      var actualItem = {}
      var completions = resp['completions']
      if (completions) {
        completions.forEach(function (item) {
          if (item['name'] === name) actualItem = item
        })
      }
      assert.equal(JSON.stringify(actualItem), JSON.stringify(expected))
    } else {
      assert.equal(JSON.stringify(resp), JSON.stringify(expected))
    }
  })
}

exports.assertDefinition = function (text, expected, name, substraction) {
  var defs = []
  var defNames = ['ecma5', 'browser']
  if (defNames) {
    for (var i = 0; i < defNames.length; i++) {
      var def = allDefs[defNames[i]]
      defs.push(def)
    }
  }
  var queryOptions = defaultQueryOptions
  if (!substraction) substraction = 0
  var server = createServer(defs, {})
  server.addFile('test1.html', text)
  server.request({
    query: {
      type: 'definition',
      file: 'test1.html',
      end: text.length - substraction,
      lineCharPositions: true
    }
  }, function (err, resp) {
    if (err)
      throw err
    var actualMessages = resp.messages
    var expectedMessages = expected.messages

    if (name) {
      var actualItem = {}
      var completions = resp['completions']
      if (completions) {
        completions.forEach(function (item) {
          if (item['name'] === name) actualItem = item
        })
      }
      assert.equal(JSON.stringify(actualItem), JSON.stringify(expected))
    } else {
      assert.equal(JSON.stringify(resp), JSON.stringify(expected))
    }
  })
}
