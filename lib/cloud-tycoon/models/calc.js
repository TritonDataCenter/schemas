/*
 * Copyright 2014 Joyent, Inc.  All rights reserved.
 */

var schema_util = require('../../util.js');
var s_prim = require('../../primitive.js');
var base = s_prim.base;
var qual = s_prim.qual;

var q_opcode = {
	desc: 'Is a valid CT Calc model opcode',
	_q: { 'enum': [ 'add', 'sub', 'div', 'mul', 'set' ] }
};

var s_str_opcode_r = schema_util.type('string', q_opcode, qual.U.req);

var s_insn = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'op': s_str_opcode_r,
		'value': base.intg.req
	}
};

var s_result = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'pre': base.intg.req,
		'insn': schema_util.qualify(s_insn, qual.U.req),
		'addr': s_prim.base.intg.req,
		'post': s_prim.base.intg.req
	}
};

module.exports = {
	insn: s_insn,
	result: s_result
};
