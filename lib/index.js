/*
 * Copyright 2015 Joyent, Inc.
 */

var s_prim = require('./primitive.js');
var s_manufacturing = require('./manufacturing/index.js');
var s_vmapi = require('./vmapi/index.js');
var s_cnapi = require('./cnapi/index.js');
var s_dapi = require('./dapi/index.js');
var s_sdc = require('./sdc/index.js');
var s_cloudapi = require('./cloudapi/index.js');

module.exports = {
	base: s_prim.base,
	qual: s_prim.qual,
	cnapi: s_cnapi,
	dapi: s_dapi,
	manufacturing: s_manufacturing,
	vmapi: s_vmapi,
	sdc: s_sdc,
	cloudapi: s_cloudapi
};
