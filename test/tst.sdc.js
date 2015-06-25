/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var extend = require('xtend');
var h = require('./helpers');
var s_sdc = require('../lib/index.js').sdc;
var test = require('tape');


test('All sdc schemas', h.validateAll.bind(null, s_sdc));

test('fabric_cfg', function (t) {
	var schema = s_sdc.sdc_app;

	// baseline
	h.expectSuccess(t, schema, {
		fabric_cfg: {
			default_underlay_mtu: 576,
			default_overlay_mtu: 700,
			sdc_underlay_assignment: 'manual',
			sdc_underlay_tag: 'sdc_underlay'
		}
	});

	// default_network_name and default_vlan_name
	h.expectSuccess(t, schema, {
		fabric_cfg: {
			default_underlay_mtu: 576,
			default_overlay_mtu: 700,
			sdc_underlay_assignment: 'manual',
			sdc_underlay_tag: 'sdc_underlay',
			default_network_name: 'Fuzzy-Wuzzy',
			default_vlan_name: 'Wazza-Bear'
		}
	});
	h.expectSingleValidationError(t, schema, {
		fabric_cfg: {
			default_underlay_mtu: 576,
			default_overlay_mtu: 700,
			sdc_underlay_assignment: 'manual',
			sdc_underlay_tag: 'sdc_underlay',
			default_network_name: 'Fuzzy-☃',
			default_vlan_name: 'Wazza-Bear'
		}
	}, 'fabric_cfg.default_network_name', h.msg.netname);

	t.end();
});
