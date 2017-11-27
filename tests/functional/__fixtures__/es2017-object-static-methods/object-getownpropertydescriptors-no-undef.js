module.exports = function() {
    var P = new Proxy(
        { a: 1 },
        {
            getOwnPropertyDescriptor: function(t, k) {},
        }
    );
    return !Object.getOwnPropertyDescriptors(P).hasOwnProperty('a');
};
