/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var extend = require('xtend');
var h = require('./helpers');
var s_dapi = require('../lib/index.js').dapi;
var test = require('tape');


test('All dapi schemas', h.validateAll.bind(null, s_dapi));
