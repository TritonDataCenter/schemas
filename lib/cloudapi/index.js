/*
 * Copyright 2020 Joyent, Inc.
 */

var modules = [
	require('./config.js'),
	require('./networks.js'),
	require('./vlans.js'),
	require('./vpc.js')
];

var m;
var s;

for (m in modules) {
	for (s in modules[m]) {
		module.exports[s] = modules[m][s];
	}
}
