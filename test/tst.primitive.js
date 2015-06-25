/*
 * Copyright (c) 2015, Joyent, Inc.
 */

/*
 * Test some of the primitive types (in primitive.js).
 */

var h = require('./helpers');
var test = require('tape');

var base = require('../').base;


test('str', function (t) {
	var schema = base.str;
	h.expectSuccess(t, schema, '');
	h.expectSuccess(t, schema, 'abc');
	t.end();
});

test('str.uuid', function (t) {
	var schema = base.str.uuid.req;

	h.expectSuccess(t, schema, 'fd2cc906-8938-11e3-beab-4359c665ac99');

	h.expectSingleValidationError(t, schema, '', '', h.msg.uuid);
	h.expectSingleValidationError(t, schema, 'abc',	'', h.msg.uuid);
	h.expectSingleValidationError(t, schema,
		'fd2cc906-8938-11e3-beab-4359c665ac99a', '', h.msg.uuid);
	h.expectSingleValidationError(t, schema,
		'fd2cc906-8938-11e3-beab-4359c665ac9', '', h.msg.uuid);
	h.expectSingleValidationError(t, schema,
		'Fd2cc906-8938-11e3-beab-4359c665ac99', '', h.msg.uuid);
	h.expectSingleValidationError(t, schema,
		'Gd2cc906-8938-11e3-beab-4359c665ac99', '', h.msg.uuid);
	h.expectSingleValidationError(t, schema,
		'gd2cc906-8938-11e3-beab-4359c665ac99', '', h.msg.uuid);
	t.end();
});

test('str.v4addr', function (t) {
	var schema = base.str.v4addr.req;

	h.expectSuccess(t, schema, '10.0.0.1');

	h.expectSingleValidationError(t, schema, '', '', h.msg.v4addr);
	h.expectSingleValidationError(t, schema, 'a.b.c.d', '', h.msg.v4addr);
	h.expectSingleValidationError(t, schema, '10.0.0.', '', h.msg.v4addr);
	t.end();
});

test('str.netname', function (t) {
	var schema = base.str.netname.req;

	h.expectSuccess(t, schema, 'admin');
	h.expectSuccess(t, schema, 'external');
	h.expectSuccess(t, schema, 'Joyent-SDC-Public');
	h.expectSuccess(t, schema, 'foo.bar');
	h.expectSuccess(t, schema, 'foo_bar');
	h.expectSuccess(t, schema, 'PO-ZombieLand-10.20.30.0/24');

	h.expectSingleValidationError(t, schema, '☃', '', h.msg.netname);
	h.expectSingleValidationError(t, schema, 'abc☃', '', h.msg.netname);
	h.expectSingleValidationError(t, schema, 'a', '', h.msg.netname);
	h.expectSingleValidationError(t, schema, '_foo', '', h.msg.netname);
	h.expectSingleValidationError(t, schema, '4chan', '', h.msg.netname);

	var longName = '';
	for (var i = 0; i < 256; i++) {
		longName += 'a';
	}
	h.expectSuccess(t, schema, longName);
	longName += 'b'; // one over the length limit
	h.expectSingleValidationError(t, schema, longName, '', h.msg.netname);

	t.end();
});
