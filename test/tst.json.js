/*
 * Copyright (c) 2015, Joyent, Inc.
 */

/*
 * Test whether schemas going through JSON.stringify -> JSON.parse
 * still works.
 */

var h = require('./helpers');
var test = require('tape');

var base = require('../').base;


function stringifyAndParse(o) {
	var s = JSON.stringify(o);
	return JSON.parse(s);
}


test('str.req', function (t) {
	var schema = stringifyAndParse(base.str.req);
	h.expectSuccess(t, schema, '');
	h.expectSuccess(t, schema, 'abc');
	t.end();
});

test('str.uuid.req', function (t) {
	var schema = stringifyAndParse(base.str.uuid.req);

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


test('str.v4addr.req', function (t) {
	var schema = stringifyAndParse(base.str.v4addr.req);

	h.expectSuccess(t, schema, '10.0.0.1');

	h.expectSingleValidationError(t, schema, '', '', h.msg.v4addr);
	h.expectSingleValidationError(t, schema, 'a.b.c.d', '', h.msg.v4addr);
	h.expectSingleValidationError(t, schema, '10.0.0.', '', h.msg.v4addr);
	t.end();
});
