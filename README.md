# Joyent Schemas

Repository: <https://github.com/joyent/schemas>
Browsing: <https://github.com/joyent/schemas>
Who: Everyone
Tickets/bugs: <https://devhub.joyent.com/jira/browse/TOOLS>


# Overview

This repository provides a centralised place to store all schemas used
by Joyent APIs, tools, and databases.  Locating all schemas in one place
(rather than placing each of them with their providers/primary
consumers) enables multiple consumers of multiple object and payload
formats to get them without having to depend on service packages just to
consume their JSON schemas.

# Repository

    deps/           Git submodules and/or commited 3rd-party deps should go
		    here. See "node_modules/" for node.js deps.
    docs/           Project docs (restdown)
    lib/            Schemas and schema-related utilities.
    node_modules/   Node.js deps, populated at build time.
    test/           Test suite (using node-tap)
    tools/          Miscellaneous dev/upgrade/deployment tools and data.
    GNUmakefile     Build descriptions
    package.json    npm module info (holds the project version)
    README.md       You're reading it.


# Development

Before commiting/pushing run `gmake prepush` and, if possible, get a
code review.  In general, you should only be changing schemas when
you're also changing consumers (i.e., to extend them).  Each schema has
its own compatibility and versioning rules that are generally set forth
in the documentation of the schema's primary owner (e.g., the service or
tools that act on objects conforming to the schema).

Do not integrate if any prepush check fails.  No exceptions.

# Testing

    gmake test

Do not integrate if any test fails.  No exceptions.

# Schemas

All schemas must themselves conform to the schema documented at
<http://tools.ietf.org/html/draft-zyp-json-schema-03>.  The
`json-schema` module and its wrapper, `jsprim`, are the preferred means
of validating objects against these schemas.

# Futures

These schemas, including their descriptive metadata, are broadly
sufficient for automatic generation of API documentation.  It would be
nice if there were tools for doing so, at least so that tables of
properties and similar information could be included in human-readable
prose.
