var s_cnapi = require('../lib/index.js').cnapi;
var mod_jsonschema = require('json-schema');

console.dir(mod_jsonschema.validate(s_cnapi.server));
