const asyncTestPassed = require('../../utils/async-test').asyncTestPassed;

module.exports = function() {
    return (async function() {
        await Promise.resolve();
        var a1 = await new Promise(function(resolve) {
            setTimeout(resolve, 800, 'foo');
        });
        var a2 = await new Promise(function(resolve) {
            setTimeout(resolve, 800, 'bar');
        });
        if (a1 + a2 === 'foobar') {
            asyncTestPassed();
        }
    })();
};
