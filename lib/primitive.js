/*
 * Copyright 2015 Joyent, Inc.
 */

var schema_util = require('./util.js');

var uuid_re = '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$';
/* JSSTYLED */
var v4addr_re = '^(?:(?:\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.){3}(?:\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])$';
var etheraddr_re = '^(?:[0-9a-f][0-9a-f]:){5}[0-9a-f]{2}$';

var qual = {
	U: {
		req: {
			desc: 'Is required in containing objects',
			_q: { 'required': true }
		}
	},
	arr: {
		nonempty: {
			desc: 'Has at least one element',
			_q: { 'minItems': 1 }
		}
	},
	str: {
		empty: {
			desc: 'Is an empty string',
			_q: { 'maxLength': 0 }
		},
		nonempty: {
			desc: 'Has length greater than 0',
			_q: { 'minLength': 1 }
		},
		bool: {
			desc: 'Names a uni-case boolean value',
			_q: { 'enum': [ 'true', 'false', 'TRUE', 'FALSE' ] }
		},
		uuid: {
			desc: 'Is a string-formatted RFC 4122 identifier',
			_q: { 'pattern': uuid_re }
		},
		uri: {
			desc: 'Is a URI',
			_q: { 'format': 'uri' }
		},
		date: {
			desc: 'Is an ISO 8601 date and/or time',
			_q: { 'format': 'date-time' }
		},
		v4addr: {
			desc: 'Is a valid dotted-quad IPv4 address',
			_q: { 'pattern': v4addr_re }
		},
		hostname: {
			desc: 'Is a valid hostname',
			_q: { 'format': 'host-name' }
		},
		etheraddr: {
			desc: 'Is a valid colon-delimited Ethernet address',
			_q: { 'pattern': etheraddr_re }
		}
	},
	intg: {
		pos: {
			desc: 'Is positive',
			_q: { 'minimum': 1 }
		},
		nonneg: {
			desc: 'Is nonnegative',
			_q: { 'minimum': 0 }
		},
		pct: {
			desc: 'Is a percentage of a whole',
			_q: {
				'minimum': 0,
				'maximum': 100
			}
		},
		port: {
			desc: 'Is a valid TCP or UDP port number',
			_q: {
				'minimum': 1,
				'maximum': 65535
			}
		},
		vlanid: {
			desc: 'Is an 802.1q VLAN ID',
			_q: {
				'minimum': 2,
				'maximum': 4095
			}
		},
		mtu: {
			desc: 'Is a Maximum Transmission Unit',
			_q: {
				'minimum': 576,
				'maximum': 9000
			}
		}
	},
	flt: {
		pos: {
			desc: 'Is positive',
			_q: { 'minimum': 0, 'exclusiveMinimum': true }
		},
		nonneg: {
			desc: 'Is nonnegative',
			_q: { 'minimum': 0 }
		},
		pct: {
			desc: 'Is a percentage of a whole',
			_q: {
				'minimum': 0,
				'maximum': 100
			}
		}
	}
};

/*
 * The required format here is that each JSON-schema object must be named '_s'
 * at the level where it belongs.  This is needed to ensure that qualifiers
 * need not share the namespace with the JSON schema itself.
 *
 * Schema components follow a simple pattern:
 *
 * [ arr [ . qualifier... ] . ] type [ . qualifier... ] . { opt | req }
 *
 * Types prefixed by 'arr' are arrays of the base type.  The qualifiers
 * following 'arr', if any, apply to the array itself; qualifiers following
 * the base type apply to the base type, with the exception of the final
 * { 'opt' | 'req' }, which always applies to the entire type with respect
 * to containing objects.
 *
 * There may be any number of qualifiers appropriate to the base type.
 * The order of qualifiers is not specified but likely should be.
 *
 * Every type has two variants: one optional (leaf 'opt'), the other
 * required (leaf 'req').  This is relevant only within a containing object
 * type.
 */
var base = {
	any: {
		_s: schema_util.type('any')
	},
	str: {
		_s: schema_util.type('string'),
		empty: {
			_s: schema_util.type('string', qual.str.empty)
		},
		nonempty: {
			_s: schema_util.type('string', qual.str.nonempty)
		},
		bool: {
			_s: schema_util.type('string', qual.str.bool)
		},
		uuid: {
			_s: schema_util.type('string', qual.str.uuid)
		},
		uri: {
			_s: schema_util.type('string', qual.str.uri)
		},
		date: {
			_s: schema_util.type('string', qual.str.date)
		},
		v4addr: {
			_s: schema_util.type('string', qual.str.v4addr)
		},
		hostname: {
			_s: schema_util.type('string', qual.str.hostname)
		},
		etheraddr: {
			_s: schema_util.type('string', qual.str.etheraddr)
		}
	},
	intg: {
		_s: schema_util.type('integer'),
		pos: {
			_s: schema_util.type('integer', qual.intg.pos)
		},
		nonneg: {
			_s: schema_util.type('integer', qual.intg.nonneg)
		},
		pct: {
			_s: schema_util.type('integer', qual.intg.pct)
		},
		port: {
			_s: schema_util.type('integer', qual.intg.port)
		},
		vlanid: {
			_s: schema_util.type('integer', qual.intg.vlanid)
		},
		mtu: {
			_s: schema_util.type('integer', qual.intg.mtu)
		}
	},
	bool: {
		_s: schema_util.type('boolean')
	},
	obj: {
		_s: schema_util.type('object')
	},
	flt: {
		_s: schema_util.type('number'),
		pos: {
			_s: schema_util.type('number', qual.flt.pos)
		},
		nonneg: {
			_s: schema_util.type('number', qual.flt.nonneg)
		},
		pct: {
			_s: schema_util.type('number', qual.flt.pct)
		}
	}
};

function
populate(src, s_dst, v_dst, vn_dst)
{
	Object.keys(src).forEach(function (t) {
		switch (t) {
		case '_s':
			s_dst.opt = src._s;
			s_dst.req = schema_util.qualify(src._s, qual.U.req);

			v_dst.opt = schema_util.array_of(src._s);
			v_dst.req = schema_util.array_of(src._s, qual.U.req);
			vn_dst.opt = schema_util.array_of(src._s,
			    qual.arr.nonempty);
			vn_dst.req = schema_util.array_of(src._s,
			    qual.arr.nonempty, qual.U.req);
			break;
		default:
			if (typeof (s_dst[t]) !== 'object')
				s_dst[t] = {};
			if (typeof (v_dst[t]) !== 'object')
				v_dst[t] = {};
			if (typeof (vn_dst[t]) !== 'object')
				vn_dst[t] = {};

			populate(src[t], s_dst[t], v_dst[t], vn_dst[t]);
			break;
		}
	});
}

module.exports = (function () {
	var schemas = {
		arr: {
			nonempty: {}
		}
	};

	populate(base, schemas, schemas.arr, schemas.arr.nonempty);

	return ({ base: schemas, qual: qual });
})();
