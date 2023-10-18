MODULE_NAME=exec

$(MODULE_NAME).tar: LICENSE README.md exec.js
	tar cf $@ $?

test: test-arguments test-exec

test-arguments: test/arguments.js
	@qjs $?

test-exec: test/_exec.js | test/exec.js
	@qjs $|

test/_exec.js: test/std-mock.js | exec.js
	@esbuild $| --bundle \
		--outfile=$@ \
		--format=esm \
		--alias:std=./$< \
		--target=es2020

release: clean test | $(MODULE_NAME).tar
	qm-release -name $(MODULE_NAME) -tag $(TAG) -archive $|

clean:
	rm -f $(MODULE_NAME).tar test/_exec.js

.PHONY: clean release test
