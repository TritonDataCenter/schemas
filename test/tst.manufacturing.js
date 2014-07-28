var s_mfg = require('../lib/index.js').manufacturing;
var mod_jsonschema = require('json-schema');

console.dir(mod_jsonschema.validate(s_mfg.part));
console.dir(mod_jsonschema.validate(s_mfg.manufacturers));
