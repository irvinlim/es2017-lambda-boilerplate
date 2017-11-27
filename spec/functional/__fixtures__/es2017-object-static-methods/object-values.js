module.exports = function() {
    var obj = Object.create({ a: 'qux', d: 'qux' });
    obj.a = 'foo';
    obj.b = 'bar';
    obj.c = 'baz';
    var v = Object.values(obj);
    return Array.isArray(v) && String(v) === 'foo,bar,baz';
};
