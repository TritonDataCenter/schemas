/*
 * Copyright (c) 2015 Joyent, Inc.  All rights reserved.
 */

var s_create_network = require('./networks.js');
var s_create_vlan = require('./vlans.js');

module.exports = {
	create_network: s_create_network,
	create_vlan: s_create_vlan
};
