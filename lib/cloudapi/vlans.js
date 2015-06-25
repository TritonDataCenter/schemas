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
		'name': base.str.netname.req,
		'description': base.str.opt
	},
	'additionalProperties': false
};

var s_get_vlan = {
	'type': 'object',
	'properties': {
		'vlan_id': base.intg.vlanid.req
	},
	'additionalProperties': false
};

var s_update_vlan = {
	'type': 'object',
	'properties': {
		'vlan_id': base.intg.vlanid.req,
		'name': base.str.netname.opt,
		'description': base.str.opt
	},
	'additionalProperties': false
};

module.exports = {
    CreateFabricVLAN: s_create_vlan,
    DeleteFabricVLAN: s_get_vlan,
    GetFabricVLAN: s_get_vlan,
    UpdateFabricVLAN: s_update_vlan
};
