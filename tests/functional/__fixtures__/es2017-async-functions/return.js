const asyncTestPassed = require('../../utils/async-test').asyncTestPassed;

module.exports = function() {
    async function a() {
        return 'foo';
    }
    var p = a();
    if (!(p instanceof Promise)) {
        return false;
    }
    return p.then(function(result) {
        if (result === 'foo') {
            asyncTestPassed();
        }
    });
};
