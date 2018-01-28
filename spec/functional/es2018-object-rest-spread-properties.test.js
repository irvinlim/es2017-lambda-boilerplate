/**
 * Functional tests for object rest/spread properties
 *
 * @see http://node.green/#ES2018-features-object-rest-spread-properties
 */

const runTest = require('./utils/runner');
const path = filename => `es2018-object-rest-spread-properties/${filename}.js`;

/**
 * @see http://node.green/#ES2018-features-object-rest-spread-properties-object-rest-properties
 */
it('object rest properties', function() {
    expect(runTest(path('object-rest'))).toEqual(true);
});

/**
 * @see http://node.green/#ES2018-features-object-rest-spread-properties-object-spread-properties
 */
it('object spread properties', function() {
    expect(runTest(path('object-spread'))).toEqual(true);
});
