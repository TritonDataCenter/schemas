/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var schema_util = require('../util.js');
var s_prim = require('../primitive.js');
var base = s_prim.base;
var qual = s_prim.qual;

var s_update_config = {
	'type': 'object',
	'properties': {
		'default_network': base.str.uuid.req
	},
	'additionalProperties': false
};

module.exports = {
    UpdateConfig: s_update_config
};
