const asyncTestPassed = require('../../utils/async-test').asyncTestPassed;

module.exports = function() {
    async function* generator() {
        yield 42;
    }

    var iterator = generator();
    return iterator.next().then(function(step) {
        if (
            iterator[Symbol.asyncIterator]() === iterator &&
            step.done === false &&
            step.value === 42
        )
            asyncTestPassed();
    });
};
