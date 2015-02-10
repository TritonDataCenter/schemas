/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var extend = require('xtend');
var h = require('./helpers');
var s_sdc = require('../lib/index.js').sdc;
var test = require('tape');


test('All sdc schemas', h.validateAll.bind(null, s_sdc));
