'use strict';

exports.handler = function(event, context, callback) {
    const asyncTest = require('./async-test');

    // Import fixture script based on Lambda event.
    const fixtureScript = require(event.FunctionalTest.Fixture.ScriptPath);

    // Run the function and get a result.
    let result;

    // Reset async test results.
    asyncTest.reset();

    // Run the fixture script within a Promise, in case it returns a Promise.
    Promise.resolve()
        .then(() => {
            return fixtureScript();
        })
        .then(result => {
            // If used async, return asyncResult instead.
            if (asyncTest.getUsed()) {
                result = asyncTest.getResult();
            }

            return callback(null, result);
        })
        .catch(err => {
            // Catch errors.
            return callback(err);
        });
};
