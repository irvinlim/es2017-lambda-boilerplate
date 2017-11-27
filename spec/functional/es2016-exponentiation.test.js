/**
 * Functional tests for exponentiation (**) operator
 *
 * @see http://node.green/#ES2016-features-exponentiation------operator
 */

const runTest = require('./utils/runner');
const path = filename => `es2016-exponentiation/${filename}.js`;

/**
 * @see http://node.green/#ES2016-features-exponentiation------operator-basic-support
 */
it('basic support', function() {
    expect(runTest(path('basic-support'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2016-features-exponentiation------operator-assignment
 */
it('assignment', function() {
    expect(runTest(path('assignment'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2016-features-exponentiation------operator-early-syntax-error-for-unary-negation-without-parens
 */
it('early syntax error for unary negation without parens', function() {
    expect(runTest(path('unary-negation-without-parens'))).toEqual(true);
});
