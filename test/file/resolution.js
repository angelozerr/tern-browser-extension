'use strict'

var tern = require('tern/lib/tern'),
  assert = require('assert'),
  sinon = require('sinon'),
  browser = require('../../browser-extension')

exports['test resolve script tag'] = function () {
  var mockServer = sinon.mock(new tern.Server({plugins: {}, defs: []}))
  mockServer.object._browserExtension = { resolveFiles: true }
  mockServer.expects('addFile').withArgs('js/lib.js', null, 'templates/index.html').twice()
  mockServer.expects('addFile').withArgs('templates/js/lib.js', null, 'templates/index.html').once()
  new browser.DOMDocument("<html><script src='../js/lib.js'></script></html>", {name: 'templates/index.html'}, null, mockServer.object)
  new browser.DOMDocument("<html><script src='/js/lib.js'></script></html>", {name: 'templates/index.html'}, null, mockServer.object)
  new browser.DOMDocument("<html><script src='js/lib.js'></script></html>", {name: 'templates/index.html'}, null, mockServer.object)
  mockServer.verify()
}

exports['test resolve html import tag'] = function () {
  var mockServer = sinon.mock(new tern.Server({plugins: {}, defs: []}))
  mockServer.object._browserExtension = { resolveFiles: true }
  mockServer.expects('addFile').withArgs('components/x-lib.html', null, 'templates/index.html').twice()
  mockServer.expects('addFile').withArgs('templates/components/x-lib.html', null, 'templates/index.html').once()
  new browser.DOMDocument("<html><link rel=import href='../components/x-lib.html'></html>", {name: 'templates/index.html'}, null, mockServer.object)
  new browser.DOMDocument("<html><link rel=import href='/components/x-lib.html'></html>", {name: 'templates/index.html'}, null, mockServer.object)
  new browser.DOMDocument("<html><link rel=import href='components/x-lib.html'></html>", {name: 'templates/index.html'}, null, mockServer.object)
  mockServer.verify()
}

if (module == require.main) require('test').run(exports)
