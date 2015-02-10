/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var extend = require('xtend');
var h = require('./helpers');
var s_vmapi = require('../lib/index.js').vmapi;
var test = require('tape');


test('All vmapi schemas', h.validateAll.bind(null, s_vmapi));


test('CreateVm', function (t) {
	var schema = s_vmapi.CreateVm;
	var baseParams = {
		owner_uuid: 'e123542b-255d-49fa-ae56-6dbdd4e5a3d0',
		brand: 'joyent',
		networks: ['e123542b-255d-49fa-ae56-6dbdd4e5a3d0'],
		disks: [],
		internal_metadata: {'foo': 'bar'}
	};

	// Required params. The "undefined" in the property names is not
	// correct, but not sure if anything's relying on it right now.
	h.expectValidationErrors(t, schema, {}, [
		h.errMissing('undefined.brand'),
		h.errMissing('undefined.disks'),
		h.errMissing('undefined.networks'),
		h.errMissing('undefined.owner_uuid')
	]);

	h.expectSingleValidationError(t, schema,
		extend(baseParams, { 'internal_metadata': 'a' }),
		'undefined.internal_metadata', h.msg.strObj);

	t.end();
});
