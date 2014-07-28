var s_vmapi = require('../lib/index.js').vmapi;
var mod_jsonschema = require('json-schema');

console.dir(mod_jsonschema.validate(s_vmapi.CreateVm));
