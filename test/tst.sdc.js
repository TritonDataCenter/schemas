/*
 * Copyright 2015 Joyent, Inc.
 */

var s_sdc = require('../lib/index.js').sdc;
var mod_jsonschema = require('json-schema');

console.dir(mod_jsonschema.validate(s_sdc.sdc_app));
