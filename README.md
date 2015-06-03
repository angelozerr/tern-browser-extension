# tern-browser-extension

[![Build Status](https://secure.travis-ci.org/angelozerr/tern-browser-extension.png)](http://travis-ci.org/angelozerr/tern-browser-extension)
[![NPM version](https://img.shields.io/npm/v/tern-browser-extension.svg)](https://www.npmjs.org/package/tern-browser-extension)  

[tern-browser-extension](https://github.com/angelozerr/tern-browser-extension) is a tern plugin which extends [browser.json](https://github.com/marijnh/tern/blob/master/defs/browser.json) and provides the following features : 

 * use tern inside HTML. The plugin extract JavaScript code from scripts elements before creating the acorn AST.
 * get completion for element ids when document.getElementById is used
 * returns the well HTML element instance (eg : HTMLInputElement) when getElementById or createElement is used.