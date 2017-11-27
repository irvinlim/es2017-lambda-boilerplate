module.exports = function() {
    var asyncFunctionProto = Object.getPrototypeOf(async function() {});
    return (
        asyncFunctionProto !== function() {}.prototype &&
        Object.getPrototypeOf(asyncFunctionProto) === Function.prototype
    );
};
