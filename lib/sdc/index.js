/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var s_fabric_cfg = require('./fabric.js');

var s_sdc_app = {
	'type': 'object',
	'properties': {
		'fabric_cfg': s_fabric_cfg
	}
};

module.exports = {
	sdc_app: s_sdc_app
};
