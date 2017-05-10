/*
 * Copyright 2017 Joyent, Inc.  All rights reserved.
 */

var s_prim = require('../primitive.js');
var base = s_prim.base;

var s_nic_tag_reqs = {
	type: 'array',
	items: base.arr.str.nonempty.opt
};

module.exports = s_nic_tag_reqs;
