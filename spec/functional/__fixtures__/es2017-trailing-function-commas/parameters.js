module.exports = function() {
    return typeof function f(a, b, ) {} === 'function';
};
