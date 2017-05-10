/*
 * Copyright 2017 Joyent, Inc.  All rights reserved.
 */

var s_dapi_nic_tag_reqs = require('./nic-tags.js');
var s_dapi_traits = require('./traits.js');
var s_dapi_server = require('./server.js');

module.exports = {
	nic_tag_reqs: s_dapi_nic_tag_reqs,
	traits: s_dapi_traits,
	server: s_dapi_server
};
