/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var extend = require('xtend');
var h = require('./helpers');
var s_cloudapi = require('../lib/index.js').cloudapi;
var test = require('tape');


test('All cloudapi schemas', h.validateAll.bind(null, s_cloudapi));


test('CreateFabricNetwork', function (t) {
	var schema = s_cloudapi.CreateFabricNetwork;
	var baseParams = {
		'name': 'asdf',
		'subnet': '1.2.3.4/16',
		'provision_start_ip': '1.2.3.4',
		'provision_end_ip': '1.2.3.4',
		'resolvers': ['1.1.1.1'],
		'vlan_id': 4,
		'routes': {
			'1.2.3.4/32': '1.1.1.1'
		}
	};

	h.expectValidationErrors(t, schema, {}, [
		h.errMissing('name'),
		h.errMissing('provision_end_ip'),
		h.errMissing('provision_start_ip'),
		h.errMissing('resolvers'),
		h.errMissing('subnet'),
		h.errMissing('vlan_id')
	]);

	h.expectSingleValidationError(t, schema,
		extend(baseParams, { 'name': {} }),
		'name', h.msg.objStr);

	h.expectSingleValidationError(t, schema,
		extend(baseParams, { 'provision_start_ip': 'a' }),
		'provision_start_ip', h.msg.v4addr);

	h.expectSingleValidationError(t, schema,
		extend(baseParams, { 'provision_end_ip': 'a' }),
		'provision_end_ip', h.msg.v4addr);

	h.expectSingleValidationError(t, schema,
		extend(baseParams, { 'resolvers': 'a' }),
		'resolvers', h.msg.strArr);

	h.expectSingleValidationError(t, schema,
		extend(baseParams, { 'routes': 'a' }),
		'routes', h.msg.strObj);

	h.expectSingleValidationError(t, schema,
		extend(baseParams, { 'vlan_id': 'a' }),
		'vlan_id', h.msg.strInt);

	t.end();
});


test('CreateFabricVLAN', function (t) {
	var schema = s_cloudapi.CreateFabricVLAN;
	var baseParams = {
		'description': 'asdf',
		'name': 'asdf',
		'vlan_id': 4
	};

	h.expectValidationErrors(t, schema, {}, [
		h.errMissing('name'),
		h.errMissing('vlan_id')
	]);

	h.expectSingleValidationError(t, schema,
		extend(baseParams, { 'description': {} }),
		'description', h.msg.objStr);

	h.expectSingleValidationError(t, schema,
		extend(baseParams, { 'name': {} }),
		'name', h.msg.objStr);

	h.expectSingleValidationError(t, schema,
		extend(baseParams, { 'vlan_id': 'a' }),
		'vlan_id', h.msg.strInt);

	t.end();
});


test('UpdateConfig', function (t) {
	var schema = s_cloudapi.UpdateConfig;

	h.expectSingleValidationError(t, schema,
	    { 'default_network': 'asdf' },
		'default_network', h.msg.uuid);

	h.expectSuccess(t, schema,
	    { 'default_network': '47c7466a-1813-470c-8805-0384f399566e' },
		'default_network', h.msg.uuid);

	t.end();
});
