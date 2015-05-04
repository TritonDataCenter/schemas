/*
 * Copyright (c) 2015, Joyent, Inc.
 */

var extend = require('xtend');
var h = require('./helpers');
var s_manufacturing = require('../lib/index.js').manufacturing;
var test = require('tape');


test('All manufacturing schemas', h.validateAll.bind(null, s_manufacturing));
