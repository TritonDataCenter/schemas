var s_cloudapi = require('../lib/index.js').cloudapi;
var mod_jsonschema = require('json-schema');

console.dir(mod_jsonschema.validate(s_cloudapi.create_network));
console.dir(mod_jsonschema.validate(s_cloudapi.create_vlan));
