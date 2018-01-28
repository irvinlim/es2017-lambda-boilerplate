/**
 * Functional tests for Promise.prototype.finally
 *
 * @see http://node.green/#ES2018-features-Promise-prototype-finally
 */

const runTest = require('./utils/runner');
const path = filename => `es2018-promise-prototype-finally/${filename}.js`;

/**
 * @see http://node.green/#ES2018-features-Promise-prototype-finally-basic-support
 */
it('basic support', function() {
    expect(runTest(path('basic-support'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2018-features-Promise-prototype-finally-don-t-change-resolution-value
 */
it("don't change resolution value", function() {
    expect(runTest(path('don-t-change-resolution-value'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2018-features-Promise-prototype-finally-change-rejection-value
 */
it('change rejection value', function() {
    expect(runTest(path('change-rejection-value'))).toEqual(true);
});
