/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var schema_util = require('../util.js');
var s_prim = require('../primitive.js');
var base = s_prim.base;
var qual = s_prim.qual;

var s_create_vlan = {
	'type': 'object',
	'properties': {
		'vlan_id': base.intg.vlanid.req,
		'name': base.str.req,
		'description': base.str.opt
	},
	'additionalProperties': false
};

module.exports = s_create_vlan;
