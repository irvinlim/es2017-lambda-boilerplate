module.exports = function() {
    var score = 0;
    function thenFn(result) {
        score += result === 'foo';
        check();
    }
    function catchFn(result) {
        score += result === 'bar';
        check();
    }
    function finallyFn() {
        score++;
        check();
        return Promise.resolve('foobar');
    }
    Promise.resolve('foo')
        .finally(finallyFn)
        .then(thenFn);
    Promise.reject('bar')
        .finally(finallyFn)
        .catch(catchFn);
    function check() {
        if (score === 4) asyncTestPassed();
    }
};
