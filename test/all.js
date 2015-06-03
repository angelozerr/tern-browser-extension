exports['test Document scripts'] = require('./document_scripts');
exports['test Document element IDs'] = require('./document_ids');
exports['test HTML completions'] = require('./html_completions');
exports['test HTML typeAt'] = require('./html_definition');

if (require.main === module) require("test").run(exports);