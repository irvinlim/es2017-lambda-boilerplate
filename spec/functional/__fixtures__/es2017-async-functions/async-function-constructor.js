const asyncTestPassed = require('../../utils/async-test').asyncTestPassed;

module.exports = function() {
    var a = async function() {}.constructor("return 'foo';");
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
