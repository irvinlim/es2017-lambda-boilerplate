'use strict';

let usedAsync = false;
let asyncResult = false;

module.exports = {
    reset: function() {
        usedAsync = false;
        asyncResult = false;
    },
    asyncTestPassed: function() {
        usedAsync = true;
        asyncResult = true;
    },
    getUsed: function() {
        return usedAsync;
    },
    getResult: function() {
        return asyncResult;
    },
};
