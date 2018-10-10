/*
 * Copyright 2018 Joyent, Inc.  All rights reserved.
 */

var schema_util = require('../util.js');
var s_prim = require('../primitive.js');
var base = s_prim.base;
var qual = s_prim.qual;

var q_contype = {
	desc: 'Is a valid console class',
	_q: {
		'enum': [ 'serial', 'vga' ]
	}
};

var s_contype_r = schema_util.qualify(base.str.nonempty.req, q_contype);

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

var q_serial = {
	desc: 'Describes a usable serial console device name',
	_q: {
		'enum': [ 'ttya', 'ttyb', 'ttyc' ]
	}
};

var s_serial_r = schema_util.qualify(base.str.nonempty.req, q_serial);

var q_status = {
	desc: 'Is a valid CN status',
	_q: {
		'enum': [ 'unsetup', 'unknown', 'running', 'rebooting', '' ]
	}
};

var s_status_r = schema_util.qualify(base.str.req, q_status);

var q_si_ostype = {
	desc: 'Is a valid CN OS',
	_q: {
		'enum': [ 'SunOS' ]
	}
};

var s_si_ostype_r = schema_util.qualify(base.str.nonempty.req, q_si_ostype);

var q_zpool_profile = {
	desc: 'Names a valid ZFS pool topology',
	_q: {
		'enum': [ 'striped', 'mirror', 'raidz3', 'raidz2', 'raidz' ]
	}
};

var s_zpool_profile_r = schema_util.qualify(base.str.nonempty.req,
    q_zpool_profile);

var s_si_disk = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'Size in GB': base.intg.pos.req
	}
};

var s_si_disks = {
	'type': 'object',
	'patternProperties': {
		'^c[0-9]+t\\s+$': s_si_disk
	}
};

var s_si_disks_r = schema_util.qualify(s_si_disks, qual.U.req);

var s_si_agent = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'name': base.str.nonempty.req,
		'version': base.str.nonempty.req
	}
};

var s_v4addr_or_empty = schema_util.any_of(base.str.v4addr.opt,
    base.str.empty.opt);

var q_si_nic_status = {
	desc: 'Is a valid NIC link status',
	_q: {
		'enum': [ 'up', 'down', 'unknown' ]
	}
};

var s_si_nic_status_r = schema_util.qualify(base.str.req, q_si_nic_status);
var s_v4addr_or_empty_r = schema_util.qualify(s_v4addr_or_empty, qual.U.req);

var s_si_nic = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'MAC Address': base.str.etheraddr.req,
		'ip4addr': s_v4addr_or_empty_r,
		'Link Status': s_si_nic_status_r,
		'NIC Names': base.arr.str.nonempty.req
	}
};

var s_si_nics = {
	'type': 'object',
	'patternProperties': {
		'^\\s+$': s_si_nic
	}
};

var s_si_nics_r = schema_util.qualify(s_si_nics, qual.U.req);

var s_si_vnic = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'MAC Address': base.str.etheraddr.req,
		'ip4addr': s_v4addr_or_empty_r,
		'Link Status': s_si_nic_status_r,
		'Host Interface': base.str.nonempty.req,
		'VLAN': base.intg.vlanid.req
	}
};

var s_si_vnics = {
	'type': 'object',
	'patternProperties': {
		'^\\s+$': s_si_vnic
	}
};

var s_si_vnics_r = schema_util.qualify(s_si_vnics, qual.U.req);

var q_lacp_mode = {
	desc: 'Is a valid LACP mode',
	_q: {
		'enum': [ 'off', 'active', 'passive' ]
	}
};

var s_lacp_mode_r = schema_util.qualify(base.str.nonempty.req, q_lacp_mode);

var s_si_aggr = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'LACP mode': s_lacp_mode_r,
		'Interfaces': base.arr.str.nonempty.req
	}
};

var s_si_aggrs = {
	'type': 'object',
	'patternProperties': {
		'^\\s+$': s_si_aggr
	}
};

var s_si_aggrs_r = schema_util.qualify(s_si_aggrs, qual.U.req);

var q_si_disklist = {
	desc: 'Is a sysinfo-style list of disk devices',
	_q: {
		/* JSSTYLED */
		'pattern': '^(?:c[0-9]+t[^,]+,)*(?:c[0-9]+t\\s+)$'
	}
};

var s_si_disklist_r = schema_util.qualify(base.str.nonempty.req, q_si_disklist);

var s_sysinfo = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'Live Image': base.str.nonempty.req,
		'System Type': s_si_ostype_r,
		'Boot Time': base.intg.nonneg.req,
		'Datacenter Name': base.str.nonempty.req,
		'SDC Version': base.str.nonempty.req,
		'Manufacturer': base.str.req,
		'Product': base.str.req,
		'Serial Number': base.str.req,
		'SKU Number': base.str.req,
		'HW Version': base.str.req,
		'HW Family': base.str.req,
		'Setup': base.bool.req,
		'VM Capable': base.bool.req,
		'Bhyve Capable': base.bool.opt,
		'Bhyve Max Vcpus': base.intg.nonneg.opt,
		'CPU Type': base.str.nonempty.req,
		'CPU Virtualization': base.str.req,
		'CPU Physical Cores': base.intg.pos.req,
		'UUID': base.str.uuid.req,
		'Hostname': base.str.hostname.opt,
		'HVM API': base.bool.opt,
		'CPU Total Cores': base.intg.pos.req,
		'MiB of Memory': base.intg.pos.req,
		'Zpool': base.str.nonempty.req,
		'Zpool Disks': s_si_disklist_r,
		'Zpool Profile': s_zpool_profile_r,
		'Zpool Creation': base.intg.nonneg.req,
		'Zpool Size in GiB': base.intg.nonneg.req,
		'Disks': s_si_disks_r,
		'Boot Parameters': base.obj.req,
		'SDC Agents': schema_util.array_of(s_si_agent, qual.U.req),
		'Network Interfaces': s_si_nics_r,
		'Virtual Network Interfaces': s_si_vnics_r,
		'Link Aggregations': s_si_aggrs_r
	}
};

var s_sysinfo_r = schema_util.qualify(s_sysinfo, qual.U.req);

var q_zonestate = {
	desc: 'Describes an internal zone state',
	_q: {
		// ZONE_STATE_STR_* from libzonecfg/common/zonecfg_impl.h
		'enum': [ 'configured', 'incomplete', 'installed', 'ready',
		    'mounted', 'running', 'shutting_down', 'down' ]
	}
};

var s_zonestate_r = schema_util.qualify(base.str.nonempty.req, q_zonestate);

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

var s_state_r = schema_util.qualify(base.str.nonempty.req, q_state);

var s_vm = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'uuid': base.str.uuid.req,
		'owner_uuid': base.str.uuid.req,
		'quota': base.intg.nonneg.req,
		'max_physical_memory': base.intg.pos.req,
		'zone_state': s_zonestate_r,
		'state': s_state_r,
		'brand': base.str.nonempty.req,
		'cpu_cap': base.intg.pos.req,
		'last_modified': base.str.date.req
	}
};

var s_vms = {
	'type': 'object',
	'patternProperties': {}
};

s_vms.patternProperties[qual.str.uuid._q.pattern] = s_vm;

var s_vms_r = schema_util.qualify(s_vms, qual.U.req);

var s_server = {
	'type': 'object',
	'properties': {
		'boot_params': base.obj.req,
		'boot_platform': base.str.nonempty.req,
		'current_platform': base.str.nonempty.req,
		'comments': base.str.opt,
		'created': base.str.date.req,
		'datacenter': base.str.date.req,
		'default_console': s_contype_r,
		'disk_cores_quota_bytes': base.intg.nonneg.req,
		'disk_installed_images_used_bytes': base.intg.nonneg.req,
		'disk_kvm_quota_bytes': base.intg.nonneg.req,
		'disk_kvm_zvol_used_bytes': base.intg.nonneg.req,
		'disk_kvm_zvol_volsize_bytes': base.intg.nonneg.req,
		'disk_pool_size_bytes': base.intg.pos.req,
		'disk_zone_quota_bytes': base.intg.nonneg.req,
		'headnode': base.bool.req,
		'hostname': base.str.hostname.opt,
		'kernel_flags': base.obj.req,
		'last_boot': base.str.date.req,
		'last_heartbeat': base.str.date.req,
		'memory_arc_bytes': base.intg.nonneg.req,
		'memory_available_bytes': base.intg.nonneg.req,
		'memory_provisionable_bytes': base.intg.nonneg.req,
		'memory_total_bytes': base.intg.pos.req,
		'overprovision_ratio': base.flt.pos.opt,
		'overprovision_ratios': s_overprovision,
		'rack_identifier': base.str.req,
		'ram': base.intg.pos.req,
		'reservation_ratio': base.flt.pos.req,
		'reserved': base.bool.req,
		'reservoir': base.bool.req,
		'serial': s_serial_r,
		'setting_up': base.bool.req,
		'setup': base.bool.req,
		'status': s_status_r,
		'sysinfo': s_sysinfo_r,
		'traits': base.obj.req,
		'transitional_status': s_status_r,
		'unreserved_cpu': base.intg.nonneg.req,
		'unreserved_disk': base.intg.nonneg.req,
		'unreserved_ram': base.intg.nonneg.req,
		'uuid': base.str.uuid.req,
		'vms': s_vms_r
	}
};

module.exports = s_server;
