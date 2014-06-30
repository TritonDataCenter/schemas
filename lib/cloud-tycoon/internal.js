/*
 * Copyright 2014 Joyent, Inc.  All rights reserved.
 */

var schema_util = require('../../util.js');
var s_prim = require('../../primitive.js');
var base = s_prim.base;
var qual = s_prim.qual;

var s_str_or_null = schema_util.type([ base.str.nonempty.opt, 'null' ]);
var s_strs_or_null = schema_util.type([ base.arr.str.nonempty.opt, 'null' ]);

var s_scmd = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'scmd': base.str.nonempty.req,
		'addr': s_str_or_null,
		'args': s_strs_or_null,
		'tag': base.str.nonempty.opt
	}
};

var s_error = {
	'type': 'object',
	'additionalProperties': true,
	'properties': {
		'message': base.str.nonempty.req
	}
};

var s_scmd_result = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'err': s_error,
		'done': base.bool.opt,
		'tag': base.str.nonempty.opt,
		'data': base.arr.any.opt,
		'messages': base.arr.str.nonempty.opt
	}
};

module.exports = {
	scmd: s_scmd,
	scmd_result: s_scmd_result
};
