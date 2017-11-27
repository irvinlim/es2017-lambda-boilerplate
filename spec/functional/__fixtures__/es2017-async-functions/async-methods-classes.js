const asyncTestPassed = require('../../utils/async-test').asyncTestPassed;

module.exports = function() {
    class C {
        async a() {
            return await Promise.resolve('foo');
        }
    }
    var p = new C().a();
    if (!(p instanceof Promise)) {
        return false;
    }
    return p.then(function(result) {
        if (result === 'foo') {
            asyncTestPassed();
        }
    });
};
