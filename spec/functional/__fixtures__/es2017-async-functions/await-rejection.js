const asyncTestPassed = require('../../utils/async-test').asyncTestPassed;

module.exports = function() {
    return (async function() {
        await Promise.resolve();
        try {
            var a1 = await new Promise(function(_, reject) {
                setTimeout(reject, 800, 'foo');
            });
        } catch (e) {
            if (e === 'foo') {
                asyncTestPassed();
            }
        }
    })();
};
