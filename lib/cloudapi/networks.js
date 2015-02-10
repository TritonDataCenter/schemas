/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var schema_util = require('../util.js');
var s_prim = require('../primitive.js');
var base = s_prim.base;
var qual = s_prim.qual;

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
		'routes': base.obj.opt,
		'vlan_id': base.intg.vlanid.req
	},
	'additionalProperties': false
};

var s_get_network = {
	'type': 'object',
	'properties': {
		'vlan_id': base.intg.vlanid.req,
		'id': base.str.uuid.opt
	},
	'additionalProperties': false,
	'required': [ 'vlan_id', 'id' ]
};

var s_list_networks = {
	'type': 'object',
	'properties': {
		'vlan_id': base.intg.vlanid.req
	},
	'additionalProperties': false,
	'required': [ 'vlan_id' ]
};

module.exports = {
    CreateFabricNetwork: s_create_network,
    DeleteFabricNetwork: s_get_network,
    GetFabricNetwork: s_get_network,
    ListFabricNetworks: s_list_networks
};
