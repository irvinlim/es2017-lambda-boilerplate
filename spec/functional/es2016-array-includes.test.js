/**
 * Functional tests for Array.prototype.includes
 *
 * @see http://node.green/#ES2016-features-Array-prototype-includes
 */

const runTest = require('./utils/runner');
const path = filename => `es2016-array-includes/${filename}.js`;

/**
 * @see http://node.green/#ES2016-features-Array-prototype-includes-Array-prototype-includes
 * @ignore babel-plugin-array-includes is not complete
 */
it('Array.prototype.includes');

/**
 * @see http://node.green/#ES2016-features-Array-prototype-includes-Array-prototype-includes-is-generic
 * @ignore babel-plugin-array-includes is not complete
 */
it('Array.prototype.includes is generic');

/**
 * @see http://node.green/#ES2016-features-Array-prototype-includes--TypedArray--prototype-includes
 */
it('%TypedArray%.prototype.includes', function() {
    expect(runTest(path('typedarray'))).toEqual(true);
});
