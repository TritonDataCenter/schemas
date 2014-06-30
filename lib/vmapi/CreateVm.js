/*
 * Copyright 2014 Joyent, Inc.  All rights reserved.
 */

var schema_util = require('../util.js');
var s_prim = require('../primitive.js');
var base = s_prim.base;
var qual = s_prim.qual;

var s_network_full = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'uuid': base.str.uuid.opt,
		'name': base.str.nonempty.opt,
		'primary': base.bool.opt,
		'ip': base.str.v4addr.opt,
		'allow_dhcp_spoofing': base.bool.opt,
		'allow_ip_spoofing': base.bool.opt,
		'allow_mac_spoofing': base.bool.opt,
		'allow_restricted_traffic': base.bool.opt,
		'allow_unfiltered_promisc': base.bool.opt
	}
};

var s_network = {
	'type': [ s_network_full, base.str.uuid.opt ]
};

var s_networks_r = schema_util.array_of(s_network, qual.U.req);

var q_disk_block_size = {
	desc: 'Is a valid disk block size in bytes',
	_q: {
		'enum': [ 512, 1024, 2048, 4096, 8192, 16384,
		    32768, 65536, 131072 ]
	}
};

var s_disk_block_size = schema_util.qualify(base.intg.pos.opt,
    q_disk_block_size);

var q_disk_compression = {
	desc: 'Is a valid ZFS compression algorithm',
	_q: {
		'enum': [ 'on', 'off', 'gzip', 'gzip-1', 'gzip-2', 'gzip-3',
		    'gzip-4', 'gzip-5', 'gzip-6', 'gzip-7', 'gzip-8', 'gzip-9',
		    'lz4', 'lzjb', 'zle' ]
	}
};

var s_disk_compression = schema_util.qualify(base.str.opt, q_disk_compression);

var q_disk_media = {
	desc: 'Is a valid KVM disk media type',
	_q: {
		'enum': [ 'disk', 'cdrom' ]
	}
};

var s_disk_media = schema_util.qualify(base.str.opt, q_disk_media);

var q_disk_model = {
	desc: 'Is a valid KVM disk model/driver type',
	_q: {
		'enum': [ 'virtio', 'ide', 'scsi' ]
	}
};

var s_disk_model = schema_util.qualify(base.str.opt, q_disk_model);

var s_kvm_disk_common = {
	'type': 'object',
	'properties': {
		'block_size': s_disk_block_size,
		'boot': base.bool.opt,
		'compression': s_disk_compression,
		'nocreate': base.bool.opt,
		'refreservation': base.intg.pos.opt,
		'media': s_disk_media,
		'model': s_disk_model
	}
};

var s_kvm_image_disk = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'image_uuid': base.str.uuid.req,
		'size': base.intg.pos.opt
	},
	'extends': s_kvm_disk_common
};

var s_kvm_user_disk = {
	'type': 'object',
	'additionalProperties': false,
	'properties': {
		'size': base.intg.pos.req
	},
	'extends': s_kvm_disk_common
};

var s_kvm_disks_r = {
	'type': 'array',
	'items': [ s_kvm_image_disk ],
	'additionalItems': s_kvm_user_disk,
	'required': true
};

var q_comma_sep = {
	desc: 'Is a comma-separated list',
	_q: {
		/* JSSTYLED */
		'pattern': /^(?:\w,)*\w+$/
	}
};

var s_comma_sep = schema_util.qualify(base.str.nonempty.opt, q_comma_sep);

var s_createvm_common = {
	'type': 'object',
	'properties': {
		'owner_uuid': base.str.uuid.req,
		'networks': s_networks_r,
		'brand': base.str.nonempty.req,
		'ram': base.intg.pos.opt,
		'alias': base.str.nonempty.opt,
		'autoboot': base.bool.opt,
		'cpu_cap': base.intg.pos.opt,
		'cpu_shares': base.intg.pos.opt,
		'customer_metadata': base.obj.opt,
		'delegate_dataset': base.bool.opt,
		'dns_domain': base.str.nonempty.opt,
		'do_not_inventory': base.bool.opt,
		'firewall_enabled': base.bool.opt,
		'fs_allowed': s_comma_sep,
		'indestructible_delegated': base.bool.opt,
		'indestructible_zoneroot': base.bool.opt,
		'internal_metadata': base.obj.opt,
		'limit_priv': s_comma_sep,
		'maintain_resolvers': base.bool.opt,
		'max_locked_memory': base.intg.nonneg.opt,
		'max_lwps': base.intg.pos.opt,
		'max_physical_memory': base.intg.pos.opt,
		'max_swap': base.intg.pos.opt,
		'mdata_exec_timeout': base.intg.pos.opt,
		'package_name': base.str.nonempty.opt,
		'package_version': base.str.nonempty.opt,
		'quota': base.intg.pos.opt,
		'resolvers': base.arr.str.nonempty.opt,
		'server_uuid': base.str.uuid.opt,
		'zfs_data_compression': s_disk_compression,
		'zfs_io_priority': base.intg.nonneg.opt,
		'tags': base.obj.opt,
		'tmpfs': base.intg.pos.opt
	}
};

var q_kvm_cpu = {
	desc: 'Is a valid QEMU CPU type',
	_q: {
		'enum': [ 'host', 'qemu64' ]
	}
};

var s_kvm_cpu = schema_util.qualify(base.str.opt, q_kvm_cpu);

var q_nic_model = {
	desc: 'Is a valid QEMU NIC type',
	_q: {
		'enum': [ 'e1000g', 'rtl8139', 'virtio' ]
	}
};

var s_nic_model = schema_util.qualify(base.str.opt, q_nic_model);

/*
 * We'd probably prefer to simply have the KVM schemas inherit from both
 * this and the common one; however, due to a bug in json-schema, such
 * multiple inheritance does not work even though it is documented.
 */
var s_createvm_kvm_common = {
	'type': 'object',
	'properties': {
		'cpu_type': s_kvm_cpu,
		'vcpus': base.intg.pos.opt,
		'disk_driver': s_disk_model,
		'nic_driver': s_nic_model
	},
	'extends': s_createvm_common
};

var s_createvm_os_pkg_payload = {
	'type': 'object',
	'properties': {
		'billing_id': base.str.uuid.req,
		'image_uuid': base.str.uuid.req
	},
	'extends': s_createvm_common
};

var s_createvm_os_manual_payload = {
	'type': 'object',
	'properties': {
		'image_uuid': base.str.uuid.req
	},
	'extends': s_createvm_common
};

var s_createvm_kvm_pkg_payload = {
	'type': 'object',
	'properties': {
		'billing_id': base.str.uuid.req,
		'disks': s_kvm_disks_r
	},
	'extends': s_createvm_kvm_common
};

var s_createvm_kvm_manual_payload = {
	'type': 'object',
	'properties': {
		'disks': s_kvm_disks_r
	},
	'extends': s_createvm_kvm_common
};

var s_createvm_payload = {
	'type': [ s_createvm_os_pkg_payload,
	    s_createvm_os_manual_payload, s_createvm_kvm_pkg_payload,
	    s_createvm_kvm_manual_payload ]
};

module.exports = s_createvm_payload;
