/**
 * Functional tests for Object static mathods
 *
 * @see http://node.green/#ES2017-features-Object-static-methods
 */

const runTest = require('./utils/runner');
const path = filename => `es2017-object-static-methods/${filename}.js`;

/**
 * @see http://node.green/#ES2017-features-Object-static-methods-Object-values
 */
it('Object.values', function() {
    expect(runTest(path('object-values'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-Object-static-methods-Object-entries
 */
it('Object.entries', function() {
    expect(runTest(path('object-entries'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2017-features-Object-static-methods-Object-getOwnPropertyDescriptors
 * @ignore No babel transform available
 */
it('Object.getOwnPropertyDescriptors');

/**
 * @see http://node.green/#ES2017-features-Object-static-methods-Object-getOwnPropertyDescriptors-doesn-t-provide-undefined-descriptors
 * @ignore No babel transform available
 */
it("Object.getOwnPropertyDescriptors doesn't provide undefined descriptors");
