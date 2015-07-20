# tern-browser-extension

[![Build Status](https://secure.travis-ci.org/angelozerr/tern-browser-extension.png)](http://travis-ci.org/angelozerr/tern-browser-extension)
[![NPM version](https://img.shields.io/npm/v/tern-browser-extension.svg)](https://www.npmjs.org/package/tern-browser-extension)  

[tern-browser-extension](https://github.com/angelozerr/tern-browser-extension) is a tern plugin which extends [browser.json](https://github.com/marijnh/tern/blob/master/defs/browser.json) and provides the following features : 

## Use tern inside HTML

Use tern inside HTML. The plugin extracts JavaScript code from scripts elements before creating the acorn AST.
The plugin also resolves script tags with the `src` attribute and [HTML Imports](https://w3c.github.io/webcomponents/spec/imports/).

## Element ID

 * get completion for element ids when document.getElementById is used:

![CodeMirror & GetElementById completion](https://github.com/angelozerr/tern-browser-extension/wiki/images/CodeMirror_GetElementByIdCompletions.png)

 * go at the definition of the attribute id : 
 
![CodeMirror & GetElementById definition](https://github.com/angelozerr/tern-browser-extension/wiki/images/CodeMirror_GetElementByIdDefinition.png)
 
 * validate element id if the editor supports [tern-lint](https://github.com/angelozerr/tern-lint) : 

![CodeMirror & GetElementById validation](https://github.com/angelozerr/tern-browser-extension/wiki/images/CodeMirror_GetElementByIdValidation.png) 

 * returns the well HTML element instance (eg : HTMLInputElement) when getElementById or createElement is used.
 
## CSS Selector

 * get completion for CSS ID selector when document.querySelector is used:

![CodeMirror & QuerySelector completion](https://github.com/angelozerr/tern-browser-extension/wiki/images/CodeMirror_QuerySelectorCompletions.png)

* validate syntax of CSS selector if the editor supports [tern-lint](https://github.com/angelozerr/tern-lint) : 

![CodeMirror & QuerySelector validation](https://github.com/angelozerr/tern-browser-extension/wiki/images/CodeMirror_QuerySelectorValidation.png) 

