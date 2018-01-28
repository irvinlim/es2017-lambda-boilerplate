module.exports = function() {
    var score = 0;
    Promise.reject('foobar')
        .finally(function() {
            return Promise.reject('foo');
        })
        .catch(function(result) {
            score += result === 'foo';
            check();
            return Promise.reject('foobar');
        })
        .finally(function() {
            throw new Error('bar');
        })
        .catch(function(result) {
            score += result.message === 'bar';
            check();
        });
    function check() {
        if (score === 2) asyncTestPassed();
    }
};
