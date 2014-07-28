/*
 * Copyright 2014 Joyent, Inc.  All rights reserved.
 */

var schema_util = require('../util.js');
var s_prim = require('../primitive.js');
var base = s_prim.base;
var qual = s_prim.qual;

var s_trait = {
	'type': [ base.bool.opt, base.str.nonempty.opt,
	    base.arr.str.nonempty.opt ]
};

var s_traits = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'^\s+$': s_trait
	}
};

module.exports = s_traits;
