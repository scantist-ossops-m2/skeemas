var glob = require('glob');

/**
 * Load up the tests from the JSON Schema Test Suite (https://github.com/json-schema/JSON-Schema-Test-Suite)
 */
describe('JSON Schema Test Suite -', function() {
	function addTests(description, files) {
		describe(description, function() {
			files.forEach(function(file) {
				if(!/\/(additionalItems|default|disallow|divisibleBy|enum|format|items|maximum|maxItems|maxLength|minimum|minItems|minLength|pattern|ref|required|type|uniqueItems)\.json/.test(file)) return;
				// if(!/\/(ref)\.json/.test(file)) return;

				// Load the suite
				require(file).forEach(function(suite) {
					describe(suite.description, function() {
						// Load the tests
						suite.tests.forEach(function(test) {

							// Create individula tests
							it(test.description, function() {
								var result = validate(test.data, suite.schema);
								assert.strictEqual(result.valid, test.valid, test.valid ? 'validates the instance' : 'invalidates the instance');
							});

						});
					});
				});
			});
		});
	}

	var draft3 = glob.sync('./json-schema-test-suite/tests/draft3/{**/,}*.json', { cwd:__dirname });
	addTests('draft3:', draft3);

	// var draft4 = glob.sync('./json-schema-test-suite/tests/draft4/{**/,}*.json', { cwd:__dirname });
	// addTests('draft4:', draft4);
});
