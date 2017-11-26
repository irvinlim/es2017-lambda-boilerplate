'use strict';

exports.handler = function(event, context, callback) {
    // Import fixture script based on Lambda event.
    const fixtureScript = require(event.EndToEndTest.Fixture.ScriptPath);

    // Run the function and get a result.
    let result;

    try {
        result = fixtureScript();
    } catch (err) {
        return callback(err);
    }

    return callback(null, result);
};
