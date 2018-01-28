/**
 * Functional tests for Asynchronous Iterators
 *
 * @see http://node.green/#ES2018-features-Asynchronous-Iterators
 */

const runTest = require('./utils/runner');
const path = filename => `es2018-asynchronous-iterators/${filename}.js`;

/**
 * @see http://node.green/#ES2018-features-Asynchronous-Iterators-async-generators
 */
it('async generators', function() {
    expect(runTest(path('async-generators'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2018-features-Asynchronous-Iterators-for-await-of-loops
 */
it('for-await-of loops', function() {
    expect(runTest(path('for-await-of-loops'))).toEqual(true);
});
