/**
 * Functional tests for object rest/spread properties
 *
 * @see http://node.green/#ESNEXT-candidate--stage-3--object-rest-spread-properties
 */

const runTest = require('./utils/runner');
const path = filename => `esnext-object-rest-spread-properties/${filename}.js`;

/**
 * @see http://node.green/#ESNEXT-candidate--stage-3--object-rest-spread-properties-object-rest-properties
 */
it('object rest properties', function() {
    expect(runTest(path('object-rest'))).toEqual(true);
});

/**
 * @see http://node.green/#ESNEXT-candidate--stage-3--object-rest-spread-properties-object-spread-properties
 */
it('object spread properties', function() {
    expect(runTest(path('object-spread'))).toEqual(true);
});
