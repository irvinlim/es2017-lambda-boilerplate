module.exports = function() {
    (async function() {
        await Promise.resolve();
        var e = await 'foo';
        if (e === 'foo') {
            asyncTestPassed();
        }
    })();
};
