const asyncTestPassed = require('../../utils/async-test').asyncTestPassed;

module.exports = function() {
    var o = {
        async a() {
            return await Promise.resolve('foo');
        },
    };
    var p = o.a();
    if (!(p instanceof Promise)) {
        return false;
    }
    return p.then(function(result) {
        if (result === 'foo') {
            asyncTestPassed();
        }
    });
};
