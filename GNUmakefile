#
# Copyright (c) 2014, Joyent, Inc. All rights reserved.
#

#
# Files
#
JS_FILES	:= $(shell find lib -name '*.js')
JSON_FILES	 = package.json
JSL_CONF_NODE	 = tools/jsl.node.conf
JSL_FILES_NODE	 = $(JS_FILES)
JSSTYLE_FILES	 = $(JS_FILES)
JSSTYLE_FLAGS	 = -f tools/jsstyle.conf

include ./tools/mk/Makefile.defs

#
# Repo-specific targets
#
.PHONY: all
all:

.PHONY: test
test:

include ./tools/mk/Makefile.deps
include ./tools/mk/Makefile.targ
