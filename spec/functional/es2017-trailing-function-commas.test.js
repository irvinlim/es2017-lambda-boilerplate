/**
 * Functional tests for trailing commas in function syntax
 *
 * @see http://node.green/#ES2017-features-trailing-commas-in-function-syntax
 */

const runTest = require('./utils/runner');
const path = filename => `es2017-trailing-function-commas/${filename}.js`;

/**
 * @see http://node.green/#ES2017-features-trailing-commas-in-function-syntax-in-parameter-lists
 */
it('in parameter lists', function() {
    expect(runTest(path('parameters'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-trailing-commas-in-function-syntax-in-argument-lists
 */
it('in argument lists', function() {
    expect(runTest(path('arguments'))).toEqual(true);
});
