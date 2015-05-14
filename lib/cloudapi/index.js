/*
 * Copyright (c) 2015 Joyent, Inc.  All rights reserved.
 */

var modules = [
	require('./config.js'),
	require('./networks.js'),
	require('./vlans.js')
];

var m;
var s;

for (m in modules) {
	for (s in modules[m]) {
		module.exports[s] = modules[m][s];
	}
}
