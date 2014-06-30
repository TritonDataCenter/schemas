/*
 * Copyright 2014 Joyent, Inc.  All rights reserved.
 */

var schema_util = require('../util.js');
var s_prim = require('../primitive.js');
var base = s_prim.base;
var qual = s_prim.qual;

var base_part_number_re = /^[1-9][0-9][0-9]-[0-9][0-9][0-9][0-9]$/;
var part_number_re = /^[1-9][0-9][0-9]-[0-9][0-9][0-9][0-9](-[0-9][0-9])?$/;

var q_base_part_number = {
	desc: 'Is a valid Joyent base part number',
	_q: {
		'pattern': base_part_number_re
	}
};

var q_part_number = {
	desc: 'Is a valid Joyent part number',
	_q: {
		'pattern': part_number_re
	}
};

var s_base_part_number_r = schema_util.qualify(base.str.nonempty.req,
    q_base_part_number);
var s_part_number_r = schema_util.qualify(base.str.nonempty.req, q_part_number);

var s_ref = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'uri': base.str.uri.req,
		'title': base.str.nonempty.req
	}
};

var s_refs = schema_util.array_of(s_ref);
var s_refs_r = schema_util.qualify(s_refs, qual.U.req);

var q_engineering_rev = {
	desc: 'Is a valid engineering part number revision',
	_q: {
		'enum': [ 1 ]
	}
};

var s_engineering_rev = schema_util.qualify(base.intg.opt, q_engineering_rev);

var q_revenue_rev = {
	desc: 'Is a valid revenue part number revision',
	_q: {
		'minimum': 50,
		'maximum': 99
	}
};

var s_revenue_rev = schema_util.qualify(base.intg.opt, q_revenue_rev);
var s_rev = schema_util.any_of(s_engineering_rev, s_revenue_rev);
var s_rev_r = schema_util.qualify(s_rev, qual.U.req);

var s_constituent = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'pn': s_part_number_r,
		'qty': base.intg.pos.opt
	}
};

var s_constituents = schema_util.array_of(s_constituent);

var q_rsrc_class = {
	desc: 'Is a valid server resource class',
	_q: {
		'enum': [ 'cpu', 'memory', 'storage', 'nic' ]
	}
};

var s_rsrc_class = schema_util.qualify(base.str.opt, q_rsrc_class);

var s_resource = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'class': s_rsrc_class,
		'type': base.str.nonempty.req,
		'size': base.intg.pos.req,
		'qty': base.intg.pos.req
	}
};

var s_resources = schema_util.array_of(s_resource);

var s_third_party_part = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'pn': s_base_part_number_r,
		'mfg': base.str.nonempty.req,
		'mfgpn': base.str.nonempty.req,
		'desc': base.str.nonempty.req,
		'alias': base.str.nonempty,
		'resources': s_resources,
		'refs': s_refs_r,
		'eol': base.str.date.opt
	}
};

var s_first_party_part = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'pn': s_base_part_number_r,
		'desc': base.str.nonempty.req,
		'alias': base.str.nonempty.opt,
		'dashroll': base.intg.pos.req,
		'rev': s_rev_r,
		'resources': s_resources,
		'refs': s_refs,
		'eol': base.str.date.opt,
		'constituents': s_constituents
	}
};

var s_part = {
	'type': [ s_first_party_part, s_third_party_part ]
};

var s_manufacturer = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'name': base.str.nonempty.req,
		'title': base.str.nonempty.req,
		'refs': s_refs
	}
};

var s_manufacturers = schema_util.array_of(s_manufacturer);

module.exports = {
	part: s_part,
	manufacturers: s_manufacturers
};
