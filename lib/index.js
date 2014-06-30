/*
 * Copyright 2014 Joyent, Inc.  All rights reserved.
 */

var s_prim = require('./primitive.js');
var s_manufacturing = require('./manufacturing/index.js');
var s_vmapi = require('./vmapi/index.js');

module.exports = {
	base: s_prim.base,
	qual: s_prim.qual,
	manufacturing: s_manufacturing,
	vmapi: s_vmapi
};
