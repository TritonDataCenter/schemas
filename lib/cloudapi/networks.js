/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var schema_util = require('../util.js');
var s_prim = require('../primitive.js');
var base = s_prim.base;
var qual = s_prim.qual;

var s_routes = {
	'type': 'object',
	'additionalProperties': true
};

var s_routes_r = schema_util.qualify(s_routes, qual.U.req);

var s_create_network = {
	'type': 'object',
	'properties': {
		'name': base.str.req,
		'description': base.str.opt,
		'subnet': base.str.req,
		'provision_start_ip': base.str.v4addr.req,
		'provision_end_ip': base.str.v4addr.req,
		'gateway': base.str.v4addr.opt,
		'resolvers':
		    schema_util.array_of(base.str.v4addr.opt, qual.U.req),
		'routes': s_routes_r
	},
	'additionalProperties': false
};

module.exports = s_create_network;
