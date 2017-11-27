const asyncTestPassed = require('../../utils/async-test').asyncTestPassed;

module.exports = function() {
    return (async function() {
        await Promise.resolve();
        var e = await 'foo';
        if (e === 'foo') {
            asyncTestPassed();
        }
    })();
};
