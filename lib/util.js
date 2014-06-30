/*
 * Copyright 2014 Joyent, Inc.  All rights reserved.
 */

var mod_assert = require('assert-plus');
var VError = require('verror');

function
_apply_qualifier(s, q)
{
	Object.keys(q._q).forEach(function (k) {
		if (typeof (s[k]) !== 'undefined') {
			throw (new VError(
			    'qualifier key "%s" conflicts with schema', s[k]));
		}
		s[k] = q._q[k];
	});

	return (0);
}

function
type(/* typename, ... */)
{
	var typename;
	var args;
	var s;

	mod_assert.ok(arguments.length >= 1);
	mod_assert.string(arguments[0], 'arguments[0]');

	typename = arguments[0];
	args = Array.prototype.slice.call(arguments, 1);
	s = { 'type': typename };

	mod_assert.arrayOfObject(args, 'args');

	/*
	 * Apply qualifiers.  We don't just use qualify() because it's
	 * needlessly expensive in object creation and duplication.
	 */
	args.forEach(function (q) {
		_apply_qualifier(s, q);
	});

	return (s);
}

function
qualify(/* schema, ... */)
{
	var schema;
	var args;
	var qs = {};

	mod_assert.ok(arguments.length >= 2);
	mod_assert.object(arguments[0], 'arguments[0]');

	schema = arguments[0];
	args = Array.prototype.slice.call(arguments, 1);
	mod_assert.arrayOfObject(args, 'args');

	Object.keys(schema).forEach(function (k) {
		qs[k] = schema[k];
	});

	args.forEach(function (q) {
		_apply_qualifier(qs, q);
	});

	return (qs);
}

function
any_of(/* schema, ... */)
{
	return (Array.prototype.slice.call(arguments, 0));
}

function
array_of(/* schema, ... */)
{
	var schema;
	var args;
	var as;

	mod_assert.ok(arguments.length >= 1);
	mod_assert.object(arguments[0], 'arguments[0]');

	schema = arguments[0];
	args = Array.prototype.slice.call(arguments, 1);
	as = {
		'type': 'array',
		'items': schema
	};

	mod_assert.arrayOfObject(args, 'args');

	args.forEach(function (q) {
		_apply_qualifier(as, q);
	});

	return (as);
}

module.exports = {
	type: type,
	any_of: any_of,
	array_of: array_of,
	qualify: qualify
};
