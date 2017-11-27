module.exports = function() {
    var object = { a: 1 };
    var B = typeof Symbol === 'function' ? Symbol('b') : 'b';
    object[B] = 2;
    var O = Object.defineProperty(object, 'c', { value: 3 });
    var D = Object.getOwnPropertyDescriptors(O);

    return (
        D.a.value === 1 &&
        D.a.enumerable === true &&
        D.a.configurable === true &&
        D.a.writable === true &&
        D[B].value === 2 &&
        D[B].enumerable === true &&
        D[B].configurable === true &&
        D[B].writable === true &&
        D.c.value === 3 &&
        D.c.enumerable === false &&
        D.c.configurable === false &&
        D.c.writable === false
    );
};
