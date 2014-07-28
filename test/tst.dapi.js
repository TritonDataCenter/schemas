var s_dapi = require('../lib/index.js').dapi;
var mod_jsonschema = require('json-schema');

console.dir(mod_jsonschema.validate(s_dapi.trait));
console.dir(mod_jsonschema.validate(s_dapi.server));
