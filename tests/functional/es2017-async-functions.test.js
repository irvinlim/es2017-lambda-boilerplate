/**
 * Functional tests for async functions
 *
 * @see http://node.green/#ES2017-features-async-functions
 */

const runTest = require('./utils/runner');
const path = filename => `es2017-async-functions/${filename}.js`;

/**
 * @see http://node.green/#ES2017-features-async-functions-return
 */
it('return', function() {
    expect(runTest(path('return'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-async-functions-throw
 */
it('throw', function() {
    expect(runTest(path('throw'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-async-functions-no-line-break-between-async-and-function
 */
it('no line break between async and function', function() {
    expect(runTest(path('async-function-line-break'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-async-functions-no--prototype--property
 * @ignore Transformed function has a prototype
 */
it('no "prototype" property');

/**
 * @see http://node.green/#ES2017-features-async-functions-await
 */
it('await', function() {
    expect(runTest(path('await'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-async-functions-await--rejection
 */
it('await, rejection', function() {
    expect(runTest(path('await-rejection'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-async-functions-must-await-a-value
 */
it('must await a value', function() {
    expect(runTest(path('must-await-value'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-async-functions-can-await-non-Promise-values
 */
it('can await non-Promise values', function() {
    expect(runTest(path('await-non-promise'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-async-functions-cannot-await-in-parameters
 */
it('cannot await in parameters', function() {
    expect(runTest(path('await-parameters'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-async-functions-async-methods--object-literals
 */
it('async methods, object literals', function() {
    expect(runTest(path('async-methods-object-literals'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-async-functions-async-methods--classes
 */
it('async methods, classes', function() {
    expect(runTest(path('async-methods-classes'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-async-functions-async-arrow-functions
 */
it('async arrow functions', function() {
    expect(runTest(path('async-arrow-functions'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-async-functions-correct-prototype-chain
 * @ignore Transformed function has incorrect prototype chain
 */
it('correct prototype chain');

/**
 * @see http://node.green/#ES2017-features-async-functions-async-function-prototype--Symbol-toStringTag
 * @ignore Transformed function is not %AsyncFunction%
 */
it('async function prototype, Symbol.toStringTag');

/**
 * @see http://node.green/#ES2017-features-async-functions-async-function-constructor
 * @ignore Transformed function is not Promise
 */
it('async function constructor');
