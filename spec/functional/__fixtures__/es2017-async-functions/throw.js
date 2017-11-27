const asyncTestPassed = require('../../utils/async-test').asyncTestPassed;

module.exports = function() {
    async function a() {
        throw 'foo';
    }
    var p = a();
    if (!(p instanceof Promise)) {
        return false;
    }
    return p.catch(function(result) {
        if (result === 'foo') {
            asyncTestPassed();
        }
    });
};
