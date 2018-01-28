module.exports = function() {
    var p1 = Promise.resolve('foo');
    var p2 = Promise.reject('bar');
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
        score += arguments.length === 0;
        check();
    }
    p1.then(thenFn);
    p1.finally(finallyFn);
    p1.finally(function() {
        // should return a new Promise
        score += p1.finally() !== p1;
        check();
    });
    p2.catch(catchFn);
    p2.finally(finallyFn);
    function check() {
        if (score === 5) asyncTestPassed();
    }
};
