/*
 * Copyright 2014 Joyent, Inc.  All rights reserved.
 */

var schema_util = require('../util.js');
var s_prim = require('../primitive.js');
var base = s_prim.base;
var qual = s_prim.qual;
var s_traits = require('./traits.js');

var s_overprovision = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'ram': base.flt.pos.opt,
		'disk': base.flt.pos.opt,
		'cpu': base.flt.pos.opt,
		'io': base.flt.pos.opt,
		'net': base.flt.pos.opt
	}
};

var q_si_nic_status = {
	desc: 'Is a valid NIC link status',
	_q: {
		'enum': [ 'up', 'down', 'unknown' ]
	}
};

var s_si_nic_status_r = schema_util.qualify(base.str.req, q_si_nic_status);

var s_si_nic = {
	'type': 'object',
	'properties': {
		'Link Status': s_si_nic_status_r,
		'NIC Names': base.arr.str.nonempty.req
	}
};

var s_si_nics = {
	'type': 'object',
	'additionalProperties': s_si_nic
};

var s_si_nics_r = schema_util.qualify(s_si_nics, qual.U.req);

var s_sysinfo = {
	'type': 'object',
	'properties': {
		'CPU Total Cores': base.intg.pos.req,
		'Network Interfaces': s_si_nics_r,
		'Live Image': base.str.nonempty.req,
		'SDC Version': base.str.nonempty.opt
	}
};

var s_sysinfo_r = schema_util.qualify(s_sysinfo, qual.U.req);

var q_state = {
	desc: 'Describes an instance state',
	_q: {
		'enum': [
			'configured',
			'incomplete',
			'stopped',
			'failed',
			'ready',
			'mounted',
			'running',
			'shutting_down',
			'down',
			'receiving',
			'provisioning'
		]
	}
};

// Normally we'd use s_state_r in s_vm.property.state below, but we've
// decided to loosen that check to a non-empty string for now.
var s_state_r = schema_util.qualify(base.str.nonempty.req, q_state);

var s_vm = {
	'type': 'object',
	'properties': {
		'owner_uuid': base.str.uuid.req,
		'max_physical_memory': base.intg.pos.req,
		'quota': base.flt.nonneg.opt,
		'cpu_cap': base.intg.pos.opt,
		'last_modified': base.str.date.req,
		'state': base.str.nonempty.req
	}
};

var s_vms = {
	'type': 'object',
	'patternProperties': {},
	'additionalProperties': s_vm
};

s_vms.patternProperties[qual.str.uuid._q.pattern] = s_vm;

var q_reservation_ratio = {
	desc: 'Describes a valid DRAM reservation ratio',
	_q: { 'minimum': 0, 'maximum': 1 }
};

var s_reservation_ratio_r = schema_util.qualify(base.flt.req,
    q_reservation_ratio);

var s_server = {
	'type': 'object',
	'properties': {
		'uuid': base.str.uuid.req,
		'memory_available_bytes': base.intg.nonneg.req,
		'memory_total_bytes': base.intg.pos.req,
		'disk_pool_size_bytes': base.intg.pos.req,
		'disk_pool_alloc_bytes': base.intg.nonneg.req,
		'disk_system_used_bytes': base.intg.nonneg.req,
		'disk_installed_images_used_bytes': base.intg.nonneg.req,
		'disk_cores_quota_used_bytes': base.intg.nonneg.req,
		'disk_zone_quota_bytes': base.intg.nonneg.req,
		'disk_kvm_quota_bytes': base.intg.nonneg.req,
		'disk_kvm_zvol_volsize_bytes': base.intg.nonneg.req,
		'reserved': base.bool.req,
		'setup': base.bool.req,
		'reservation_ratio': s_reservation_ratio_r,
		'overprovision_ratios': s_overprovision,
		'sysinfo': s_sysinfo_r,
		'traits': s_traits,
		'vms': s_vms
	}
};

module.exports = s_server;
