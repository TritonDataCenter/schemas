/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var extend = require('xtend');
var h = require('./helpers');
var s_cnapi = require('../lib/index.js').cnapi;
var test = require('tape');


test('All cnapi schemas', h.validateAll.bind(null, s_cnapi));
