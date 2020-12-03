/*
 * Copyright 2020 Joyent, Inc.
 */

var schema_util = require('../util.js');
var s_prim = require('../primitive.js');
var base = s_prim.base;

var s_create_vpc = {
	'type': 'object',
	'properties': {
		'name': base.str.netname.opt,
		'description': base.str.opt,
		'cidr': base.str.v4cidr.req
	},
	'additionalProperties': false
};

var s_update_vpc = {
	'type': 'object',
	'properties': {
		'id': base.str.uuid.req,
		'name': base.str.netname.opt,
		'description': base.str.opt,
		'vpc_id': base.str.uuid.req
	},
	'additionalProperties': false,
	'required': ['vpc_id', 'id']
};

var s_get_vpc = {
	'type': 'object',
	'properties': {
		'id': base.str.uuid.opt,
		'vpc_id': base.str.uuid.req
	},
	'additionalProperties': false,
	'required': ['vpc_id', 'id']
};

var s_list_vpcs = {
	'type': 'object',
	'properties': {
		'vpc_id': base.str.uuid.req
	},
	'additionalProperties': false,
	'required': ['vpc_id']
};

var s_create_vpc_network = {
	'type': 'object',
	'properties': {
		'name': base.str.netname.req,
		'description': base.str.opt,
		'subnet': base.str.req,
		'provision_start_ip': base.str.v4addr.req,
		'provision_end_ip': base.str.v4addr.req,
		'gateway': base.str.v4addr.opt,
		'resolvers':
			schema_util.array_of(base.str.v4addr.opt),
		'routes': base.obj.opt,
		'vpc_id': base.str.uuid.req
	},
	'additionalProperties': false
};

var s_update_vpc_network = {
	'type': 'object',
	'properties': {
		'id': base.str.uuid.req,
		'name': base.str.netname.opt,
		'routes': base.obj.opt,
		'description': base.str.opt,
		'resolvers':
			schema_util.array_of(base.str.v4addr.opt),
		'provision_start_ip': base.str.v4addr.opt,
		'provision_end_ip': base.str.v4addr.opt,
		'vpc_id': base.str.uuid.req
	},
	'additionalProperties': false,
	'required': [ 'vpc_id', 'id' ]
};

var s_get_vpc_network = {
	'type': 'object',
	'properties': {
		'vpc_id': base.intg.uuid.req,
		'id': base.str.uuid.opt
	},
	'additionalProperties': false,
	'required': [ 'vpc_id', 'id' ]
};

var s_list_vpc_networks = {
	'type': 'object',
	'properties': {
		'vpc_id': base.str.uuid.req
	},
	'additionalProperties': false,
	'required': [ 'vpc_id' ]
};

module.exports = {
	CreateVPC: s_create_vpc,
	DeleteVPC: s_get_vpc,
	UpdateVPC: s_update_vpc,
	GetVPC: s_get_vpc,
	ListVPCs: s_list_vpcs,

	CreateVPCNetwork: s_create_vpc_network,
	DeleteVPCNetwork: s_get_vpc_network,
	UpdateVPCNetwork: s_update_vpc_network,
	GetVPCNetwork: s_get_vpc_network,
	ListVPCNetworks: s_list_vpc_networks
};
