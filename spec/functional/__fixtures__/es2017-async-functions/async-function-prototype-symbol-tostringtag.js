module.exports = function() {
    return (
        Object.getPrototypeOf(async function() {})[Symbol.toStringTag] ==
        'AsyncFunction'
    );
};
