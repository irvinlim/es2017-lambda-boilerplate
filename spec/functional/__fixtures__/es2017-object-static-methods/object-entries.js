module.exports = function() {
    var obj = Object.create({ a: 'qux', d: 'qux' });
    obj.a = 'foo';
    obj.b = 'bar';
    obj.c = 'baz';
    var e = Object.entries(obj);
    return (
        Array.isArray(e) &&
        e.length === 3 &&
        String(e[0]) === 'a,foo' &&
        String(e[1]) === 'b,bar' &&
        String(e[2]) === 'c,baz'
    );
};
