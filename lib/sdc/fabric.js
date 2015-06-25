/*
 * Copyright (c) 2015 Joyent, Inc.
 */

var schema_util = require('../util.js');
var s_prim = require('../primitive.js');
var base = s_prim.base;
var qual = s_prim.qual;

var q_underlay_mtu = {
	'desc': 'MTU of the Underlay Network',
	_q: {
		'default': 9000
	}
};

var q_overlay_mtu = {
	'desc': 'MTU of the Overlay Network',
	_q: {
		'default': 8500
	}
};


var q_underlay_asgn = {
	'desc': 'How should CN underlay assignments be made?',
	_q: {
		'enum': [ 'manual', 'automatic' ]
	}
};

var s_underlay_mtu_r = schema_util.qualify(base.intg.mtu.req, q_underlay_mtu);
var s_overlay_mtu_r = schema_util.qualify(base.intg.mtu.req, q_overlay_mtu);
var s_underlay_asgn_r = schema_util.qualify(base.str.req, q_underlay_asgn);

/*
 * TODO It would be great if we could get the schema to be able to validate the
 * requirement that if sdc_underlay_pool is set, that sdc_underlay_assignment is
 * set to automatic.
 */
var s_fabric_config = {
	'type': 'object',
	'properties': {
		'default_underlay_mtu': s_underlay_mtu_r,
		'default_overlay_mtu': s_overlay_mtu_r,
		'sdc_nat_pool': base.str.opt,
		'sdc_underlay_assignment': s_underlay_asgn_r,
		'sdc_underlay_tag': base.str.req,
		'sdc_underlay_pool': base.str.opt,
		// The names used for the default Fabric network and VLAN
		// for new users, but the napi-ufds-watcher.
		'default_network_name': base.str.netname.opt,
		'default_vlan_name': base.str.netname.opt
	}
};

module.exports = s_fabric_config;
