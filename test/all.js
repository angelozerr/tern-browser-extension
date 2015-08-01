exports['test extract scripts'] = require('./dom/extract_scripts');
exports['test extract elements id'] = require('./dom/extract_ids');
exports['test HTML Element ID completions'] = require('./element/completions');
exports['test HTML Element ID definition'] = require('./element/definition');
exports['test HTML Element ID lint'] = require('./element/lint');
exports['test HTML CSS Selectors completions'] = require('./selector/completions');
exports['test HTML CSS Selectors definition'] = require('./selector/definition');
exports['test HTML CSS Selectors validation'] = require('./selector/lint');
exports['test file resolution'] = require('./file/resolution');

if (require.main === module) require("test").run(exports);
